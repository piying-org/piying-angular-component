import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-ion-card-content',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonCardContentNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  slot = input<TemplateRef<any>>();
}
