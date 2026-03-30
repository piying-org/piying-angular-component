import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonInputPasswordToggle } from '@ionic/angular/standalone';
import { JSX } from '@ionic/core';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
type Prop = JSX.IonInputPasswordToggle;

@Component({
  selector: 'app-ion-input-password-toggle',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, IonInputPasswordToggle, FormsModule],
})
export class IonInputPasswordToggleFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  hideIcon = input<Prop['hideIcon']>();
  showIcon = input<Prop['showIcon']>();
  mode = input<Prop['mode']>();
  // type = input<Prop['type']>();
}
