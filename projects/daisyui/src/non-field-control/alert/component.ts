import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, TemplateRef, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { AlertColor, Color, IconConfig } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-alert',
  templateUrl: './component.html',
  imports: [AttributesDirective, MatIcon, NgTemplateOutlet, NgClass, CssPrefixPipe],
})
export class AlertNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<AlertColor>();

  content = input('Default');
  icon = input<IconConfig>();
  action = input<TemplateRef<any>>();

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(this.#theme.setColor('alert', this.color()));
  });
}
