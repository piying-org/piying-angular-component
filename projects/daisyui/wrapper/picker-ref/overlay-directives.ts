/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Directionality, Direction } from '@angular/cdk/bidi';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import {
  ConnectedPosition,
  ScrollStrategy,
  createRepositionScrollStrategy,
  FlexibleConnectedPositionStrategyOrigin,
  FlexibleConnectedPositionStrategy,
  OverlayRef,
  ConnectedOverlayPositionChange,
  createOverlayRef,
  OverlayConfig,
  createFlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  EventEmitter,
  InjectionToken,
  Injector,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
/** Gets the target of an event while accounting for Shadow DOM. */
export function _getEventTarget<T extends EventTarget>(event: Event): T | null {
  // If an event is bound outside the Shadow DOM, the `event.target` will
  // point to the shadow root so we have to use `composedPath` instead.
  return (event.composedPath ? event.composedPath()[0] : event.target) as T | null;
}

/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
const defaultPositionList: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
  },
  {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
  },
  {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
  },
];

/** Injection token that determines the scroll handling while the connected overlay is open. */
export const CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>(
  'cdk-connected-overlay-scroll-strategy',
  {
    providedIn: 'root',
    factory: () => {
      const injector = inject(Injector);
      return () => createRepositionScrollStrategy(injector);
    },
  },
);

/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
@Directive({
  selector: '[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]',
  exportAs: 'cdkOverlayOrigin',
})
export class CdkOverlayOrigin {
  elementRef = inject(ElementRef);

  constructor(...args: unknown[]);
  constructor() {}
}

/**
 * Directive to facilitate declarative creation of an
 * Overlay using a FlexibleConnectedPositionStrategy.
 */
@Directive({
  selector: '[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]',
  exportAs: 'cdkConnectedOverlay',
  standalone: true,
})
export class CdkConnectedOverlay implements OnDestroy, OnChanges {
  private _dir = inject(Directionality, { optional: true });
  private _injector = inject(Injector);

  private _overlayRef: OverlayRef | undefined;
  private _backdropSubscription = Subscription.EMPTY;
  private _attachSubscription = Subscription.EMPTY;
  private _detachSubscription = Subscription.EMPTY;
  private _positionSubscription = Subscription.EMPTY;

  private _position?: FlexibleConnectedPositionStrategy;
  private _scrollStrategyFactory = inject(CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY);
  private _ngZone = inject(NgZone);

  /** 弹窗触发原点 */
  origin = input.required<CdkOverlayOrigin | FlexibleConnectedPositionStrategyOrigin>();
  /** 已注册的连接位置对 */
  positions = input<ConnectedPosition[]>();
  positions$$ = computed(() => {
    const pos = this.positions();
    return pos && pos.length ? pos : defaultPositionList;
  });

  /** 弹窗连接点相对于原点的 x 轴偏移量（像素） */
  offsetX = input<number>();
  /** 弹窗连接点相对于原点的 y 轴偏移量（像素） */
  offsetY = input<number>();
  /** 弹窗配置 */
  overlayConfig = input<OverlayConfig>();
  /** 弹窗与视口边缘之间的间距（像素） */
  viewportMargin = input(0);

  open = model(false);
  /** 是否可以通过用户交互关闭弹窗 */
  disableClose = input(false);
  /** 用于设置 transform origin 的 CSS 选择器 */
  transformOriginSelector = input<string>();
  /** 滚动时是否锁定弹窗位置 */
  lockPosition = input(false);
  /** 弹窗的宽高是否可以被约束以适应视口 */
  flexibleDimensions = input(false);
  /** 在启用灵活定位后，弹窗是否可以在首次打开后增长 */
  growAfterOpen = input(false);
  /** 如果提供的位置都不合适，弹窗是否可以被推到屏幕上 */
  push = input(false);
  /** 弹窗宽度是否与原点宽度匹配 */
  matchWidth = input(false);

  /** Event emitted when the backdrop is clicked. */
  @Output() readonly backdropClick = new EventEmitter<MouseEvent>();

  /** Event emitted when the position has changed. */
  @Output() readonly positionChange = new EventEmitter<ConnectedOverlayPositionChange>();

  /** Event emitted when the overlay has been attached. */
  @Output() readonly attach = new EventEmitter<void>();

  /** Event emitted when the overlay has been detached. */
  @Output() readonly detach = new EventEmitter<void>();

  /** Emits when there are keyboard events that are targeted at the overlay. */
  @Output() readonly overlayKeydown = new EventEmitter<KeyboardEvent>();

  /** Emits when there are mouse outside click events that are targeted at the overlay. */
  @Output() readonly overlayOutsideClick = new EventEmitter<MouseEvent>();

  // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
  defaultStrategy$$ = computed(() => {
    return this._scrollStrategyFactory();
  });

  _templatePortal = new TemplatePortal(
    inject<TemplateRef<any>>(TemplateRef),
    inject(ViewContainerRef),
  );
  /** The associated overlay reference. */
  get overlayRef(): OverlayRef {
    return this._overlayRef!;
  }

  /** The element's layout direction. */
  get dir(): Direction {
    return this._dir ? this._dir.value : 'ltr';
  }

  ngOnDestroy() {
    this._attachSubscription.unsubscribe();
    this._detachSubscription.unsubscribe();
    this._backdropSubscription.unsubscribe();
    this._positionSubscription.unsubscribe();
    this._overlayRef?.dispose();
    this.disposeResizeUpdate?.();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this._position) {
      this._updatePositionStrategy(this._position);
      this._overlayRef?.updateSize({
        width: this._getWidth(),
        minWidth: this.overlayConfig()?.minWidth,
        height: this.overlayConfig()?.height,
        minHeight: this.overlayConfig()?.minHeight,
      });

      if (changes['origin'] && this.open()) {
        this._position.apply();
      }
    }

    if (changes['open']) {
      this.open() ? this.attachOverlay() : this.detachOverlay();
    }
    if (this._position && (changes['offsetX'] || changes['offsetY'])) {
      this._updatePositionStrategy(this._position);
    }
  }
  disposeResizeUpdate?: () => void;

  /** Creates an overlay */
  private _createOverlay() {
    const overlayRef = (this._overlayRef = createOverlayRef(this._injector, this._buildConfig()));
    this.disposeResizeUpdate?.();
    const ob = new ResizeObserver(() => {
      overlayRef.getConfig().positionStrategy!.apply();
    });

    // 开始观察 overlay 元素
    ob.observe(overlayRef.overlayElement);
    this.disposeResizeUpdate = () => {
      this.disposeResizeUpdate = undefined;
      ob.disconnect();
    };
    this._attachSubscription = overlayRef.attachments().subscribe(() => {
      this.attach.emit();
    });
    this._detachSubscription = overlayRef.detachments().subscribe(() => this.detach.emit());
    overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
      this.overlayKeydown.next(event);

      if (event.keyCode === ESCAPE && !this.disableClose() && !hasModifierKey(event)) {
        event.preventDefault();
        this.detachOverlay();
      }
    });

    this._overlayRef.outsidePointerEvents().subscribe((event: MouseEvent) => {
      const origin = this._getOriginElement();
      const target = _getEventTarget(event) as Element | null;

      if (!origin || (origin !== target && !origin.contains(target))) {
        this.overlayOutsideClick.next(event);
      }
    });
  }

  /** Builds the overlay config based on the directive's inputs */
  private _buildConfig(): OverlayConfig {
    const overlayConfig = new OverlayConfig({
      direction: this._dir || 'ltr',
      ...this.overlayConfig(),
    });

    if (!overlayConfig.scrollStrategy) {
      overlayConfig.scrollStrategy = this.defaultStrategy$$();
    }
    if (!overlayConfig.positionStrategy) {
      overlayConfig.positionStrategy = this._createPositionStrategy();
    }
    this._position = overlayConfig.positionStrategy as any;
    return overlayConfig;
  }

  /** Updates the state of a position strategy, based on the values of the directive inputs. */
  private _updatePositionStrategy(positionStrategy: FlexibleConnectedPositionStrategy) {
    const positions: ConnectedPosition[] = this.positions$$().map((currentPosition) => ({
      originX: currentPosition.originX,
      originY: currentPosition.originY,
      overlayX: currentPosition.overlayX,
      overlayY: currentPosition.overlayY,
      offsetX: currentPosition.offsetX || this.offsetX(),
      offsetY: currentPosition.offsetY || this.offsetY(),
      panelClass: currentPosition.panelClass || undefined,
    }));

    return positionStrategy
      .setOrigin(this._getOrigin())
      .withPositions(positions)
      .withFlexibleDimensions(this.flexibleDimensions())
      .withPush(this.push())
      .withGrowAfterOpen(this.growAfterOpen())
      .withViewportMargin(this.viewportMargin())
      .withLockedPosition(this.lockPosition())
      .withTransformOriginOn(this.transformOriginSelector()!);
  }

  /** Returns the position strategy of the overlay to be set on the overlay config */
  private _createPositionStrategy(): FlexibleConnectedPositionStrategy {
    const strategy = createFlexibleConnectedPositionStrategy(this._injector, this._getOrigin());
    this._updatePositionStrategy(strategy);
    return strategy;
  }

  private _getOrigin(): FlexibleConnectedPositionStrategyOrigin {
    const origin = this.origin();
    if (origin instanceof CdkOverlayOrigin) {
      return origin.elementRef;
    } else {
      return origin;
    }
  }

  private _getOriginElement(): Element | null {
    const origin = this.origin();
    if (origin instanceof CdkOverlayOrigin) {
      return origin.elementRef.nativeElement;
    }

    if (origin instanceof ElementRef) {
      return origin.nativeElement;
    }

    if (typeof Element !== 'undefined' && origin instanceof Element) {
      return origin;
    }

    return null;
  }

  private _getWidth() {
    if (this.overlayConfig()?.width) {
      return this.overlayConfig()!.width;
    }

    // Null check `getBoundingClientRect` in case this is called during SSR.
    return this.matchWidth()
      ? this._getOriginElement()?.getBoundingClientRect?.().width
      : undefined;
  }

  /** Attaches the overlay. */
  attachOverlay() {
    if (!this._overlayRef) {
      this._createOverlay();
    }

    const ref = this._overlayRef!;

    // Update the overlay size, in case the directive's inputs have changed
    ref.getConfig().hasBackdrop = this.overlayConfig()?.hasBackdrop;
    ref.updateSize({ width: this._getWidth() });

    if (!ref.hasAttached()) {
      ref.attach(this._templatePortal);
    }

    if (this.overlayConfig()?.hasBackdrop) {
      this._backdropSubscription = ref
        .backdropClick()
        .subscribe((event) => this.backdropClick.emit(event));
    } else {
      this._backdropSubscription.unsubscribe();
    }

    this._positionSubscription.unsubscribe();

    // Only subscribe to `positionChanges` if requested, because putting
    // together all the information for it can be expensive.
    if (this.positionChange.observers.length > 0) {
      this._positionSubscription = this._position!.positionChanges.pipe(
        takeWhile(() => this.positionChange.observers.length > 0),
      ).subscribe((position) => {
        this._ngZone.run(() => this.positionChange.emit(position));

        if (this.positionChange.observers.length === 0) {
          this._positionSubscription.unsubscribe();
        }
      });
    }

    this.open.set(true);
  }

  /** Detaches the overlay. */
  detachOverlay() {
    this._overlayRef?.detach();
    this._backdropSubscription.unsubscribe();
    this._positionSubscription.unsubscribe();
    this.open.set(false);
  }
}
