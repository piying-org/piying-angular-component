import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonHeader;

@Component({
  selector: 'app-ion-header',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonHeaderNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  collapse = input<Prop['collapse']>();
  translucent = input<Prop['translucent']>();

  slot = input<TemplateRef<any>>();
}
