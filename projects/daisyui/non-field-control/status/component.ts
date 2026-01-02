import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { Color, Size } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';
@Component({
  selector: 'app-status',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, CssPrefixPipe, TwPrefixPipe, MergeClassPipe],
})
export class StatusNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  content = input('Default');
  color = input<Color>();
  size = input<Size>();
  animatePing = input<boolean>();
  animateBounce = input<boolean>();

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.animatePing() ? this.#theme.addPrefix('animate-ping') : undefined,
      this.animateBounce() ? this.#theme.addPrefix('animate-bounce') : undefined,
      this.#theme.setColor('status', this.color()),
      this.#theme.setSize('status', this.size()),
    );
  });
}
