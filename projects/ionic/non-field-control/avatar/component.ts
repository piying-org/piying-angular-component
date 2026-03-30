import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonAvatar;

@Component({
  selector: 'app-ion-avatar',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonAvatarNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  slot = input<TemplateRef<any>>();
}
