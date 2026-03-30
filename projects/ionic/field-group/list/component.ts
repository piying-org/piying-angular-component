import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input, TemplateRef } from '@angular/core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'app-ion-list',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonListFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  lines = input<'full' | 'inset' | 'none'>();
  inset = input<boolean>();

  slot = input<{ default: TemplateRef<any> }>();
}
