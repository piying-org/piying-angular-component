import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AttributesDirective,
  InsertFieldDirective,
  PI_INPUT_OPTIONS_TOKEN,
  PI_VIEW_FIELD_TOKEN,
  PiyingView,
} from '@piying/view-angular';

import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { CdkConnectedOverlayConfig, CdkOverlayOrigin } from '@angular/cdk/overlay';
import * as v from 'valibot';
import { CdkConnectedOverlay, CustomMenuTrigger } from '@piying-lib/angular-core';
import { MENU_TRIGGER, PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import { PickerRefService } from '../../picker-ref.service';
type InputProps = {
  triggerModel?: 'click' | 'contextmenu';
  content: v.BaseSchema<any, any, any>;
  overlayConfig: CdkConnectedOverlayConfig;
  originSource: 'event' | 'trigger';
  changeClose?: boolean;
};
@Component({
  selector: 'app-picker-ref-wrapper',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    SelectorlessOutlet,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    InsertFieldDirective,
  ],
  providers: [
    CustomMenuTrigger,
    {
      provide: MENU_TRIGGER,
      useExisting: CustomMenuTrigger,
    },
    PARENT_OR_NEW_MENU_STACK_PROVIDER,
    PickerRefService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickerRefWC {
  static index = 0;
  SelectorlessOutlet = SelectorlessOutlet;
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  cdkOverlay = viewChild.required<CdkConnectedOverlay>('ref');
  readonly PiyingView = PiyingView;
  menuTrigger = inject(CustomMenuTrigger);

  props$$ = computed(() => {
    const props = this.#field$$().props()['pickerRef'] as InputProps;
    props.triggerModel ??= 'contextmenu';
    props.originSource ??= 'event';
    props.changeClose ??= true;
    props.overlayConfig ??= {};
    return props;
  });

  /** 弹窗内容 */

  isOpen$ = signal(false);
  /** 弹窗配置 */
  position$ = signal('');
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  #field$$ = inject(PI_VIEW_FIELD_TOKEN);
  #service = inject(PickerRefService);

  // content应该是model
  contentInput$$ = computed(() => {
    return {
      schema: this.props$$().content,
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
    } as any;
  });
  contentOutput$$ = computed(() => {
    return {
      modelChange: (value: any) => {
        if (this.props$$().changeClose) {
          this.isOpen$.set(false);
        }
      },
    };
  });
  event$ = signal<any>(undefined);
  ngOnInit(): void {
    this.#service.rootField$$ = this.#field$$;
  }
  openRef(mode: string, event: PointerEvent) {
    this.event$.set(event);
    if (mode === 'contextmenu') {
      event.preventDefault();
    }
    if (mode === this.props$$().triggerModel) {
      this.isOpen$.set(true);
    }
  }

  outsideClick() {
    this.isOpen$.set(false);
  }
}
