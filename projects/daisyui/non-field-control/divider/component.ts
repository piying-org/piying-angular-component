import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { Color } from '@piying/angular-core';
import { AttributesDirective } from '@piying/view-angular';
@Component({
  selector: 'app-divider',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, CssPrefixPipe, MergeClassPipe],
})
export class DividerNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Color>();
  direction = input<'horizontal' | 'vertical'>();
  contentPosition = input<'start' | 'end'>();

  content = input('Default');
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('divider', this.color()),
      this.#theme.addPrefix2('divider', this.direction()),
      this.#theme.addPrefix2('divider', this.contentPosition()),
    );
  });
}
