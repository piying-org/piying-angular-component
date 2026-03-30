import { NgTemplateOutlet } from '@angular/common';
import { Component, input, viewChild } from '@angular/core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonSelectModal;

@Component({
  selector: 'app-ion-select-modal',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonSelectModalFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  header = input<Prop['header']>();
  cancelText = input<Prop['cancelText']>();
  multiple = input<Prop['multiple']>();
  options = input<Prop['options']>();
}
