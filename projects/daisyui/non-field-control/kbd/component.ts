import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { Size } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';
@Component({
  selector: 'app-kbd',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, CssPrefixPipe, MergeClassPipe],
})
export class KbdNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  size = input<Size>();

  content = input('Default');
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(this.#theme.setSize('kbd', this.size()));
  });
}
