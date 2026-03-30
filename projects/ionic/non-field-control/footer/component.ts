import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonFooter;

@Component({
  selector: 'app-ion-footer',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonFooterNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  collapse = input<Prop['collapse']>();
  translucent = input<Prop['translucent']>();

  slot = input<{ default: TemplateRef<any> }>();
}
