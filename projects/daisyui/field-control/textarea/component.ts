import { Component, computed, forwardRef, inject, input, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { Color, Size } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
@Component({
  selector: 'app-textarea',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, CssPrefixPipe, MergeClassPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaFCC),
      multi: true,
    },
  ],
})
export class TextareaFCC extends BaseControl {
  static __version = 2;

  ghost = input<boolean>();
  templateRef = viewChild.required('templateRef');
  color = input<Color>();
  size = input<Size>();
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('textarea', this.color()),
      this.#theme.setSize('textarea', this.size()),
      this.ghost() ? this.#theme.addPrefix('textarea-ghost') : undefined,
    );
  });
}
