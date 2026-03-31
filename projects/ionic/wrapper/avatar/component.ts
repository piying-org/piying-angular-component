import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonAvatar } from '@ionic/angular/standalone';
type Prop = JSX.IonAvatar;

@Component({
  selector: 'app-ion-avatar',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonAvatar],
})
export class IonAvatarWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
