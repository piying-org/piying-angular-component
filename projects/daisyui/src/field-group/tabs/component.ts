import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, linkedSignal, signal, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { Color, Size, useTwClass } from '@piying/angular-daisyui/util';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import clsx from 'clsx';

@Component({
  selector: 'app-tabs',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet, AttributesDirective, MatIcon, NgClass, CssPrefixPipe, MergeClassPipe],
})
export class TabsFGC extends PiyingViewGroupBase {
  static __version = 2;

  static index = 0;
  templateRef = viewChild.required('templateRef');

  size = input<Size>();
  name = `pc-tabs-${TabsFGC.index++}`;
  activatedIndex = input(0);
  type = input<'box' | 'border' | 'lift' | undefined>();
  placement = input<'top' | 'bottom'>();
  tabContentClass = input(useTwClass('bg-base-100 border-base-300 p-6'));
  activatedIndex$ = linkedSignal(this.activatedIndex);
  toggleActivate(index: number) {
    this.activatedIndex$.set(index);
  }
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setSize('tabs', this.size()),
      this.type() ? this.#theme.addPrefix(`tabs-${this.type()}`) : undefined,
      this.placement() ? this.#theme.addPrefix(`tabs-${this.placement()}`) : undefined,
    );
  });
}
