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
  // header = output<Parameters<NonNullable<Prop['onHeader']>>[0]>();
  // subHeader = output<Parameters<NonNullable<Prop['onSubHeader']>>[0]>();
  // message = output<Parameters<NonNullable<Prop['onMessage']>>[0]>();
  // multiple = output<Parameters<NonNullable<Prop['onMultiple']>>[0]>();
  // options = output<Parameters<NonNullable<Prop['onOptions']>>[0]>();
}
