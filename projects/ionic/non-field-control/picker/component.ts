import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonPicker;

@Component({
  selector: 'app-ion-picker',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonPickerNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  // backdropDismiss = input<Prop['backdropDismiss']>();
  // buttons = input<Prop['buttons']>();
  // cssClass = input<Prop['cssClass']>();
  // date = input<Prop['date']>();
  // elements = input<Prop['elements']>();
  mode = input<Prop['mode']>();
  // show = input<Prop['show']>();
  // subHeader = input<Prop['subHeader']>();
  // message = input<Prop['message']>();
  // title = input<Prop['title']>();
  // animated = input<Prop['animated']>();
  // keyboardActive = input<Prop['keyboardActive']>();
  // keyboardTopics = input<Prop['keyboardTopics']>();
  // translucent = input<Prop['translucent']>();
  // onDidDismiss = output<Parameters<NonNullable<Prop['onDidDismiss']>>[0]>();
  // onWillDismiss = output<Parameters<NonNullable<Prop['onWillDismiss']>>[0]>();
  // onDidPresent = output<Parameters<NonNullable<Prop['onDidPresent']>>[0]>();
  // onWillPresent = output<Parameters<NonNullable<Prop['onWillPresent']>>[0]>();
  slot = input<TemplateRef<any>>();
}
