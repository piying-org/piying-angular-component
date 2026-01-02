import { Component, computed, forwardRef, inject, input, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { Color, Size } from '@piying-lib/angular-core';
import { NgClass } from '@angular/common';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
@Component({
  selector: 'app-toggle',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgClass, CssPrefixPipe, MergeClassPipe],
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
