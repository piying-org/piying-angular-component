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
  PiyingView,
} from '@piying/view-angular';

import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { OverlayConfig } from '@angular/cdk/overlay';
import { CdkConnectedOverlay, CdkOverlayOrigin } from './overlay-directives';
@Component({
  selector: 'app-picker-ref',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    CssPrefixPipe,
    MergeClassPipe,
    StrOrTemplateComponent,
    SelectorlessOutlet,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    PurePipe,
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
