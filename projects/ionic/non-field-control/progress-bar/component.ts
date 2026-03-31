import { Component, viewChild, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonProgressBar } from '@ionic/angular/standalone';
type Prop = JSX.IonProgressBar;

@Component({
  selector: 'app-ion-progress-bar',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, IonProgressBar],
})
export class IonProgressBarNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  type = input<Prop['type']>();
  reversed = input<Prop['reversed']>();
  value = input<Prop['value']>();
  buffer = input<Prop['buffer']>();
}
