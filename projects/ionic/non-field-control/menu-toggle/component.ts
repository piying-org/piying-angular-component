import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonMenuToggle;

@Component({
  selector: 'app-ion-menu-toggle',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonMenuToggleNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  menu = input<Prop['menu']>();
  autoHide = input<Prop['autoHide']>();

  slot = input<{ default: TemplateRef<any> }>();
}
