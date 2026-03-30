import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonCard;

@Component({
  selector: 'app-ion-card',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonCardNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  button = input<Prop['button']>();
  type = input<Prop['type']>();
  disabled = input<Prop['disabled']>();
  download = input<Prop['download']>();
  href = input<Prop['href']>();
  rel = input<Prop['rel']>();
  routerDirection = input<Prop['routerDirection']>();
  routerAnimation = input<Prop['routerAnimation']>();
  target = input<Prop['target']>();

  slot = input<{ default: TemplateRef<any> }>();
}
