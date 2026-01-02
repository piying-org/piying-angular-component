import { Component, computed, forwardRef, inject, input, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { Color, Size } from '@piying-lib/angular-core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
@Component({
  selector: 'app-range',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    NgTemplateOutlet,
    NgClass,
    CssPrefixPipe,
    MergeClassPipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeFCC),
      multi: true,
    },
  ],
})
export class RangeFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Color>();
  size = input<Size>();
  min = input<number>();
  max = input<number>();
  step = input<number>();
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('range', this.color()),
      this.#theme.setSize('range', this.size()),
    );
  });
}
