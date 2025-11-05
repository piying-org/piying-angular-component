import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { StrOrTemplateComponent } from '@piying/angular-daisyui/helper/str-template/component';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import clsx from 'clsx';
@Component({
  selector: 'app-swap',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    PurePipe,
    NgTemplateOutlet,
    CssPrefixPipe,
    SelectorlessOutlet,
    StrOrTemplateComponent,
    NgClass,
    MergeClassPipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwapFCC),
      multi: true,
    },
  ],
})
export class SwapFCC extends BaseControl {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  templateRef = viewChild.required('templateRef');
  onContent = input<string | TemplateRef<any>>('✔️');
  offContent = input<string | TemplateRef<any>>('❌');
  indeterminateContent = input<string | TemplateRef<any>>();
  indeterminate = input<boolean>();
  rotate = input<boolean>();
  flip = input<boolean>();
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return clsx(
      this.rotate() ? this.#theme.addPrefix('swap-rotate') : undefined,
      this.flip() ? this.#theme.addPrefix('swap-flip') : undefined,
    );
  });
}
