import { Component, viewChild, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonImg;

@Component({
  selector: 'app-ion-img',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonImgNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  alt = input<Prop['alt']>();
  src = input<Prop['src']>();
  ionImgWillLoad = output<Prop['onIonImgWillLoad']>();
  ionImgDidLoad = output<Prop['onIonImgDidLoad']>();
  ionError = output<Prop['onIonError']>();
}
