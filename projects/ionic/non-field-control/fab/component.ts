import { Component, viewChild, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonFab;

@Component({
  selector: 'app-ion-fab',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonFabNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  horizontal = input<Prop['horizontal']>();
  vertical = input<Prop['vertical']>();
  edge = input<Prop['edge']>();
  activated = input<Prop['activated']>();
  // close = output<Prop['onClose']>();
  // toggle = output<Prop['onToggle']>();
  // slot = input < { default: TemplateRef<any> }();
}
