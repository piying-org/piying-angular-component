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
  InsertFieldDirective,
  PI_INPUT_OPTIONS_TOKEN,
  PI_VIEW_FIELD_TOKEN,
  PiyingView,
} from '@piying/view-angular';

import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { CdkConnectedOverlayConfig, CdkOverlayOrigin } from '@angular/cdk/overlay';
import * as v from 'valibot';
import { CdkConnectedOverlay } from '@piying-lib/angular-core';
type InputProps = {
  triggerModel?: 'click' | 'contextmenu';
  content: v.BaseSchema<any, any, any>;
  overlayConfig: CdkConnectedOverlayConfig;
  originSource: 'event' | 'trigger';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickerRefWC {
  static index = 0;
  SelectorlessOutlet = SelectorlessOutlet;
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  cdkOverlay = viewChild.required<CdkConnectedOverlay>('ref');
  readonly PiyingView = PiyingView;
  props$$ = computed(() => {
    let props = this.#field$$().props() as InputProps;
    props.triggerModel ??= 'contextmenu';
    props.overlayConfig ??= {};
    return props;
  });

  /** 弹窗内容 */

  isOpen$ = signal(false);
  /** 弹窗配置 */
  position$ = signal('');
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  #field$$ = inject(PI_VIEW_FIELD_TOKEN);

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
        this.isOpen$.set(false);
      },
    };
  });
  event$ = signal<any>(undefined);
  openRef(mode: string, event: PointerEvent) {
    console.log(event);
    this.event$.set(event);
    event.preventDefault();
    if (mode === this.props$$().triggerModel) {
      this.isOpen$.set(true);
    }
  }
  outsideClick() {
    this.isOpen$.set(false);
  }
}
