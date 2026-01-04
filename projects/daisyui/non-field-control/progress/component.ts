import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Color } from '@piying-lib/angular-core';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-progress',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, CssPrefixPipe, MergeClassPipe, PurePipe],
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
