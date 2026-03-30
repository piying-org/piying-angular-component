import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonItemDivider;

@Component({
  selector: 'app-ion-item-divider',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonItemDividerNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  sticky = input<Prop['sticky']>();

  slot = input<{ start: TemplateRef<any>; default: TemplateRef<any>; end: TemplateRef<any> }>();
}
