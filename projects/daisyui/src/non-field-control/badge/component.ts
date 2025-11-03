import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { Color, Size } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-badge',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass,CssPrefixPipe],
})
export class BadgeNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Color>();
  size = input<Size>();
  // todo templateRef
  content = input('Badge');

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('badge', this.color()),
      this.#theme.setSize('badge', this.size()),
    );
  });
}
