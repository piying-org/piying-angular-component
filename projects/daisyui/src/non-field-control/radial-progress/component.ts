import { NgClass, NgTemplateOutlet, NgStyle } from '@angular/common';
import { Component, computed, input, TemplateRef, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IconConfig } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-radial-progress',
  templateUrl: './component.html',
  imports: [AttributesDirective, MatIcon, NgClass, NgStyle],
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
  wrapperStyle$$ = computed(() => {
    let obj: Record<string, string> = {};
    if (typeof this.strokeWidth() === 'string') {
      obj['--thickness'] = this.strokeWidth()!;
    }
    if (typeof this.value$$() === 'number') {
      obj['--value'] = `${this.value$$()}`;
    }
    return obj;
  });
}
