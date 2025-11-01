import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IconConfig } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-alert',
  templateUrl: './component.html',
  imports: [AttributesDirective, MatIcon, NgTemplateOutlet],
})
export class AlertNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  content = input('Default');
  icon = input<IconConfig>();
  action = input<TemplateRef<any>>();
}
