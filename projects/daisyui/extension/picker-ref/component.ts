import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AttributesDirective,
  BaseControl,
  PI_INPUT_OPTIONS_TOKEN,
  PI_VIEW_FIELD_TOKEN,
  PiyingView,
} from '@piying/view-angular';

import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { CdkConnectedOverlayConfig, CdkOverlayOrigin, OverlayConfig } from '@angular/cdk/overlay';
import * as v from 'valibot';
import { CdkConnectedOverlay, CustomMenuTrigger } from '@piying-lib/angular-core';
import { MENU_TRIGGER, PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
/*
 * PickerRefFCC - 选择器引用组件
 *
 * 用途: 用于触发选择器弹窗，支持自定义触发器和内容区域
 * 特性:
 *   - 支持自定义触发器内容（trigger）
 *   - 支持自定义弹窗内容（content）
 *   - 支持选择后自动关闭（changeClose）
 *   - 基于 CDK Overlay 实现弹窗定位
 *   - 实现了 ControlValueAccessor 接口，可直接用于表单
 *
 * 使用场景: 选择器、下拉选择、日期时间选择等需要弹窗选择的场景
 */
@Component({
  selector: 'app-picker-ref',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    SelectorlessOutlet,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickerRefFCC),
      multi: true,
    },
    CustomMenuTrigger,
    {
      provide: MENU_TRIGGER,
      useExisting: CustomMenuTrigger,
    },
    PARENT_OR_NEW_MENU_STACK_PROVIDER,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickerRefFCC extends BaseControl {
  static index = 0;
  SelectorlessOutlet = SelectorlessOutlet;
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  readonly PiyingView = PiyingView;
  /** 触发器内容 */
  trigger = input<v.BaseSchema<any, any, any>>();
  triggerModel = input<'click' | 'contextmenu'>('click');
  /** 弹窗内容 */
  content = input<v.BaseSchema<any, any, any>>();
  /** 选择后是否自动关闭 */
  changeClose = input<boolean>();
  isOpen$ = signal(false);
  /** 弹窗配置 */
  overlayConfig = input<CdkConnectedOverlayConfig>({ growAfterOpen: true, push: true });
  position$ = signal('');
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  #field$$ = inject(PI_VIEW_FIELD_TOKEN);
  menuTrigger = inject(CustomMenuTrigger);

  triggerInput$$ = computed(() => {
    return {
      model: this.value$,
      schema: this.trigger,
      options: computed(() => ({
        ...this.parentPyOptions!(),
        context: {
          ...this.parentPyOptions!().context,
          pickerValue: this.value$,
        },
      })),
      selectorless: true,
    } as any;
  });
  // content应该是model
  contentInput$$ = computed(() => {
    return {
      schema: this.content,
      options: computed(() => {
        return {
          ...this.parentPyOptions!(),
          context: {
            ...this.parentPyOptions!().context,
            close: () => {
              this.isOpen$.set(false);
            },
          },
        };
      }),
      selectorless: true,
      model: this.value$,
    } as any;
  });
  contentOutput$$ = computed(() => {
    return {
      modelChange: (value: any) => {
        this.valueAndTouchedChange(value);
        if (this.changeClose()) {
          this.isOpen$.set(false);
        }
      },
    };
  });
  openRef(mode: string) {
    if (mode === this.triggerModel()) {
      this.isOpen$.set(true);
    }
  }
  outsideClick() {
    this.isOpen$.set(false);
  }
}
