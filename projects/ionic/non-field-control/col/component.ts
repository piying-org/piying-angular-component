import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonCol;

@Component({
  selector: 'app-ion-col',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonColNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  offset = input<Prop['offset']>();
  offsetXs = input<Prop['offsetXs']>();
  offsetSm = input<Prop['offsetSm']>();
  offsetMd = input<Prop['offsetMd']>();
  offsetLg = input<Prop['offsetLg']>();
  offsetXl = input<Prop['offsetXl']>();
  pull = input<Prop['pull']>();
  pullXs = input<Prop['pullXs']>();
  pullSm = input<Prop['pullSm']>();
  pullMd = input<Prop['pullMd']>();
  pullLg = input<Prop['pullLg']>();
  pullXl = input<Prop['pullXl']>();
  push = input<Prop['push']>();
  pushXs = input<Prop['pushXs']>();
  pushSm = input<Prop['pushSm']>();
  pushMd = input<Prop['pushMd']>();
  pushLg = input<Prop['pushLg']>();
  pushXl = input<Prop['pushXl']>();
  size = input<Prop['size']>();
  sizeXs = input<Prop['sizeXs']>();
  sizeSm = input<Prop['sizeSm']>();
  sizeMd = input<Prop['sizeMd']>();
  sizeLg = input<Prop['sizeLg']>();
  sizeXl = input<Prop['sizeXl']>();

  slot = input<{ default: TemplateRef<any> }>();
}
