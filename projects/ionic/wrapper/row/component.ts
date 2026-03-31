import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input, TemplateRef } from '@angular/core';
import { IonRow } from '@ionic/angular/standalone';
import {
  AttributesDirective,
  InsertFieldDirective,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import { JSX } from '@ionic/core';

type Prop = JSX.IonRow;
@Component({
  selector: 'app-ion-row',
  templateUrl: './component.html',
  imports: [AttributesDirective, InsertFieldDirective, IonRow],
})
export class IonRowWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
