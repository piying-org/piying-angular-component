import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonMenuToggle } from '@ionic/angular/standalone';
type Prop = JSX.IonMenuToggle;

@Component({
  selector: 'app-ion-menu-toggle',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonMenuToggle],
})
export class IonMenuToggleNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  menu = input<Prop['menu']>();
  autoHide = input<Prop['autoHide']>();

}
