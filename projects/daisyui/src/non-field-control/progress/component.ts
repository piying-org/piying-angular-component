import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, inject, input, TemplateRef, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { Color, IconConfig } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-progress',
  templateUrl: './component.html',
  imports: [AttributesDirective, MatIcon, NgClass, CssPrefixPipe, MergeClassPipe, PurePipe],
})
export class ProgressNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Color>();
  value = input<number | undefined>();
  max = input(100);
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(this.#theme.setColor('progress', this.color()));
  });

  isNumber(value: any) {
    return typeof value === 'number';
  }
}
