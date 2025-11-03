import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { Color, Size } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';
import clsx from 'clsx';
@Component({
  selector: 'app-status',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass],
})
export class StatusNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  value = input('Default');
  color = input<Color>();
  size = input<Size>();
  animatePing = input<boolean>();
  animateBounce = input<boolean>();
  statusClass$$ = computed(() => {
    let list = [];
    if (this.color()) {
      list.push(`status-${this.color()}`);
    }
    if (this.size()) {
      list.push(`status-${this.size()}`);
    }
    return clsx(list);
  });
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('status', this.color()),
      this.#theme.setSize('status', this.size()),
    );
  });
}
