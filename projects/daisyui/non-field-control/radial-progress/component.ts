import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-radial-progress',
  templateUrl: './component.html',
  imports: [AttributesDirective, MatIcon, NgClass, NgStyle, CssPrefixPipe, MergeClassPipe],
})
export class RadialProgressNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  value = input<number>(0);
  valueMap = input((value: number) => {
    return `${value * 100}%`;
  });
  strokeWidth = input<string>();
  value$$ = computed(() => {
    return this.value() * 100;
  });
  #theme = inject(ThemeService);
  wrapperStyle$$ = computed(() => {
    const obj: Record<string, string> = {};
    if (typeof this.strokeWidth() === 'string') {
      obj[this.#theme.addVarPrefix('thickness')] = this.strokeWidth()!;
    }
    if (typeof this.value$$() === 'number') {
      obj[this.#theme.addVarPrefix('value')] = `${this.value$$()}`;
    }
    return obj;
  });
}
