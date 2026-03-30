import { NgTemplateOutlet } from '@angular/common';
import { Component, input, viewChild, TemplateRef } from '@angular/core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonAccordion;

@Component({
  selector: 'app-ion-accordion',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonAccordionFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  value = input<Prop['value']>();
  disabled = input<Prop['disabled']>();
  readonly = input<Prop['readonly']>();
  toggleIcon = input<Prop['toggleIcon']>();
  toggleIconSlot = input<Prop['toggleIconSlot']>();

  slot = input<{ header: TemplateRef<any>; content: TemplateRef<any> }>();
}
