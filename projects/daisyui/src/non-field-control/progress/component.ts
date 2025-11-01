import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, TemplateRef, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IconConfig } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-progress',
  templateUrl: './component.html',
  imports: [AttributesDirective, MatIcon, NgClass],
})
export class ProgressNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  type = input<'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'>();
  value = input<number | undefined>();
  max = input(100);
}
