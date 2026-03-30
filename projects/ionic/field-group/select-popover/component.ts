import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonSelectPopover;

@Component({
  selector: 'app-ion-select-popover',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonSelectPopoverFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  // header = output<Prop['onHeader']>();
  // subHeader = output<Prop['onSubHeader']>();
  // message = output<Prop['onMessage']>();
  // multiple = output<Prop['onMultiple']>();
  // options = output<Prop['onOptions']>();
}
