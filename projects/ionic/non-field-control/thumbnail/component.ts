import { Component, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonThumbnail;

@Component({
  selector: 'app-ion-thumbnail',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonThumbnailNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
