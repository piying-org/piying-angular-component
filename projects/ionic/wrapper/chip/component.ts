import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonChip } from '@ionic/angular/standalone';
type Prop = JSX.IonChip;

@Component({
  selector: 'app-ion-chip',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, IonChip],
})
export class IonChipWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  outline = input<Prop['outline']>();
  disabled = input<Prop['disabled']>();
}
