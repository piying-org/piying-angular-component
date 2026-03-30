import { Component, viewChild, TemplateRef, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonTabs;

@Component({
  selector: 'app-ion-tabs',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonTabsNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  // useRouter = input<Prop['useRouter']>();
  // ionNavWillLoad = output<Prop['onIonNavWillLoad']>();
  ionTabsWillChange = output<Prop['onIonTabsWillChange']>();
  ionTabsDidChange = output<Prop['onIonTabsDidChange']>();
  slot = input<{ top: TemplateRef<any>; bottom: TemplateRef<any> }>();
}
