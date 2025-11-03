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
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import {
  Color,
  DefaultOptionConvert,
  OptionConvert,
  SelectOption,
  Size,
  transformOptions,
} from '@piying/angular-daisyui/util';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import clsx from 'clsx';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
@Component({
  selector: 'app-toggle',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgClass, CssPrefixPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleFCC),
      multi: true,
    },
  ],
})
export class ToggleFCC extends BaseControl {
  static __version = 2;

  templateRef = viewChild.required('templateRef');
  color = input<Color>();
  size = input<Size>();
  indeterminate = input<boolean>();
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('toggle', this.color()),
      this.#theme.setSize('toggle', this.size()),
    );
  });
}
