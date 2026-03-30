import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonSegmentContent;

@Component({
  selector: 'app-ion-segment-content',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonSegmentContentNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  slot = input<{ default: TemplateRef<any> }>();
}
