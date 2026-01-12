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
import { OverlayConfig } from '@angular/cdk/overlay';
import { CdkConnectedOverlay, CdkOverlayOrigin } from './overlay-directives';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickerRefFCC extends BaseControl {
  static index = 0;
  SelectorlessOutlet = SelectorlessOutlet;
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  readonly PiyingView = PiyingView;
  trigger = input();
  content = input();
  changeClose = input<boolean>();
  isOpen$ = signal(false);
  overlayConfig = input<OverlayConfig>();
  position$ = signal('');
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  #field$$ = inject(PI_VIEW_FIELD_TOKEN);
  triggerInput$$ = computed(() => {
    return {
      model: this.value$,
      schema: this.trigger,
      options: computed(() => ({
        ...this.parentPyOptions!(),
        context: {
          ...this.parentPyOptions!().context,
          pickerValue: this.value$,
          parent: this.#field$$(),
          parentCtx: this.parentPyOptions!().context,
          root: this.parentPyOptions!().context?.['root'] ?? this.#field$$(),
          rootCtx: this.parentPyOptions!().context?.['rootCtx'] ?? this.parentPyOptions!().context,
        },
      })),
      selectorless: true,
    } as any;
  });
  // content应该是model
  contentInput$$ = computed(() => {
    return {
      schema: this.content,
      options: this.parentPyOptions!,
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
  openRef() {
    this.isOpen$.set(true);
  }
  outsideClick() {
    this.isOpen$.set(false);
  }
}
