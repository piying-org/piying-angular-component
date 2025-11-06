import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IconConfig } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-toast',
  templateUrl: './component.html',
  imports: [AttributesDirective, MatIcon, NgTemplateOutlet],
})
export class ToastNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
