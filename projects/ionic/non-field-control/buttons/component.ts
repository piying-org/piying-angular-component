import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonButtons;

@Component({
  selector: 'app-ion-buttons',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonButtonsNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  collapse = input<Prop['collapse']>();

  slot = input<TemplateRef<any>>();
}
