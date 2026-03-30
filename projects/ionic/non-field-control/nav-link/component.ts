import { Component, viewChild, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonNavLink;

@Component({
  selector: 'app-ion-nav-link',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonNavLinkNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  component = input<Prop['component']>();
  componentProps = input<Prop['componentProps']>();
  routerDirection = input<Prop['routerDirection']>();
  routerAnimation = input<Prop['routerAnimation']>();
}
