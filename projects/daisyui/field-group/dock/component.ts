import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, linkedSignal, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Size } from '@piying-lib/angular-core';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'app-dock',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, MatIcon, NgClass, CssPrefixPipe, MergeClassPipe],
})
export class DockFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  size = input<Size>();

  activatedIndex = input(0);

  activatedIndex$ = linkedSignal(this.activatedIndex);
  toggleActivate(index: number) {
    this.activatedIndex$.set(index);
  }

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(this.#theme.setSize('dock', this.size()));
  });
}
