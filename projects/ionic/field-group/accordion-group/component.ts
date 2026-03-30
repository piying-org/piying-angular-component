import { NgTemplateOutlet } from '@angular/common';
import { Component, input, viewChild, output, TemplateRef } from '@angular/core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonAccordionGroup;

@Component({
  selector: 'app-ion-accordion-group',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonAccordionGroupFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  animated = input<Prop['animated']>();
  multiple = input<Prop['multiple']>();
  value = input<Prop['value']>();
  disabled = input<Prop['disabled']>();
  readonly = input<Prop['readonly']>();
  expand = input<Prop['expand']>();
  ionChange = output<Parameters<NonNullable<Prop['onIonChange']>>[0]>();
  // ionValueChange = output<Parameters<NonNullable<Prop['onIonValueChange']>>[0]>();
  slot = input<{ default: TemplateRef<any> }>();
}
