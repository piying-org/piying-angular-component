import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, linkedSignal, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { Color, Size } from '@piying/angular-daisyui/util';

import {
  AttributesDirective,
  PiResolvedViewFieldConfig,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import clsx from 'clsx';

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
