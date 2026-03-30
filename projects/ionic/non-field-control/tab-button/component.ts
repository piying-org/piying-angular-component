import { Component, viewChild, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonTabButton;

@Component({
  selector: 'app-ion-tab-button',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonTabButtonNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  disabled = input<Prop['disabled']>();
  download = input<Prop['download']>();
  href = input<Prop['href']>();
  rel = input<Prop['rel']>();
  layout = input<Prop['layout']>();
  selected = input<Prop['selected']>();
  tab = input<Prop['tab']>();
  target = input<Prop['target']>();
  // ionTabButtonClick = output<Parameters<NonNullable<Prop['onIonTabButtonClick']>>[0]>();
}
