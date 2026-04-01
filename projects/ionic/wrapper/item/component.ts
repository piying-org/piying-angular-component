import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective, InsertFieldDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonItem } from '@ionic/angular/standalone';
type Prop = JSX.IonItem;

@Component({
  selector: 'app-ion-item',
  templateUrl: './component.html',
  imports: [AttributesDirective, InsertFieldDirective, IonItem],
})
export class IonItemWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  button = input<Prop['button']>();
  detail = input<Prop['detail']>();
  detailIcon = input<Prop['detailIcon']>();
  disabled = input<Prop['disabled']>();
  download = input<Prop['download']>();
  href = input<Prop['href']>();
  rel = input<Prop['rel']>();
  lines = input<Prop['lines']>();
  routerAnimation = input<Prop['routerAnimation']>();
  routerDirection = input<Prop['routerDirection']>();
  target = input<Prop['target']>();
  type = input<Prop['type']>();
}
