import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input } from '@angular/core';
import { JSX } from '@ionic/core';
import { AttributesDirective } from '@piying/view-angular';
type Prop = JSX.IonInputPasswordToggle;

@Component({
  selector: 'app-ion-input-password-toggle',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonInputPasswordToggleNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  showIcon = input<Prop['showIcon']>();
  hideIcon = input<Prop['hideIcon']>();
  // type = input<Prop['type']>();
}
