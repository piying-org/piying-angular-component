import { Component, viewChild, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonImg } from '@ionic/angular/standalone';
type Prop = JSX.IonImg;

@Component({
  selector: 'app-ion-img',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonImg],
})
export class IonImgNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  alt = input<Prop['alt']>();
  src = input<Prop['src']>();
  ionImgWillLoad = output<Parameters<NonNullable<Prop['onIonImgWillLoad']>>[0]>();
  ionImgDidLoad = output<Parameters<NonNullable<Prop['onIonImgDidLoad']>>[0]>();
  ionError = output<Parameters<NonNullable<Prop['onIonError']>>[0]>();
}
