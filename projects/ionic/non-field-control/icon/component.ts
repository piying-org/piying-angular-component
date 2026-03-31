import { Component, viewChild, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonIcon } from "@ionic/angular/standalone";
type Prop = JSX.IonIcon;

@Component({
  selector: 'app-ion-img',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, IonIcon],
})
export class IonIconNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  flipRtl = input<Prop['flipRtl']>();
  icon = input<Prop['icon']>();
  ios = input<Prop['ios']>();
  lazy = input<Prop['lazy']>();
  md = input<Prop['md']>();
  mode = input<Prop['mode']>();
  name = input<Prop['name']>();
  sanitize = input<Prop['sanitize']>();
  size = input<Prop['size']>();
  src = input<Prop['src']>();
}
