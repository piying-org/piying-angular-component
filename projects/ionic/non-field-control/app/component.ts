import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonApp;

@Component({
  selector: 'app-ion-app',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonAppNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  slot = input<{ default: TemplateRef<any> }>();
}
