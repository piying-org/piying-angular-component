import { Component, viewChild, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonTabBar;

@Component({
  selector: 'app-ion-tab-bar',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonTabBarNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  selectedTab = input<Prop['selectedTab']>();
  translucent = input<Prop['translucent']>();
  ionTabBarChanged = output<Prop['onIonTabBarChanged']>();
  ionTabBarLoaded = output<Prop['onIonTabBarLoaded']>();
}
