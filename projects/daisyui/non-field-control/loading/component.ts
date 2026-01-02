import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Size } from '@piying-lib/angular-core';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-loading',
  templateUrl: './component.html',
  imports: [AttributesDirective, MatIcon, NgClass, CssPrefixPipe, MergeClassPipe],
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
