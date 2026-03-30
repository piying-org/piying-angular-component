import { Component, viewChild, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonMenuButton;

@Component({
  selector: 'app-ion-menu-button',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonMenuButtonNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  disabled = input<Prop['disabled']>();
  menu = input<Prop['menu']>();
  autoHide = input<Prop['autoHide']>();
  type = input<Prop['type']>();
}
