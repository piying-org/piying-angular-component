import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, TemplateRef, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { Color, IconConfig, Size } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-loading',
  templateUrl: './component.html',
  imports: [AttributesDirective, MatIcon, NgClass,CssPrefixPipe],
})
export class LoadingNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  size = input<Size>();

  type = input<'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'>();
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setSize('loading', this.size()),
      this.type() ? this.#theme.addPrefix(`loading-${this.type()}`) : undefined,
    );
  });
}
