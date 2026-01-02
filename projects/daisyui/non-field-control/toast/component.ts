import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
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
