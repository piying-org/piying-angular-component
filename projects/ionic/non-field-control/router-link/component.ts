import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonRouterLink;

@Component({
  selector: 'app-ion-router-link',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonRouterLinkNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  href = input<Prop['href']>();
  rel = input<Prop['rel']>();
  routerDirection = input<Prop['routerDirection']>();
  routerAnimation = input<Prop['routerAnimation']>();
  target = input<Prop['target']>();
  slot = input<TemplateRef<any>>();
}
