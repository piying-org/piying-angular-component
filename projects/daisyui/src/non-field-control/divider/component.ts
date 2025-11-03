import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { Color } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';
import clsx from 'clsx';
@Component({
  selector: 'app-divider',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, CssPrefixPipe],
})
export class DividerNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Color>();

  content = input('Default');
  direction = input<'horizontal' | 'vertical'>();
  contentPosition = input<'start' | 'end'>();
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('divider', this.color()),
      this.direction() ? `divider-${this.direction()}` : undefined,
      this.contentPosition() ? `divider-${this.contentPosition()}` : undefined,
    );
  });
}
