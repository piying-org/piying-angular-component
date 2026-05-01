import { Component, viewChild, input, computed } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonBackButton } from '@ionic/angular/standalone';
import { PropertyDirective } from '@piying-lib/angular-ionic/directive';
type Prop = JSX.IonBackButton;

@Component({
  selector: 'app-ion-back-button',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonBackButton, PropertyDirective],
})
export class IonBackButtonNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  defaultHref = input<Prop['defaultHref']>();
  disabled = input<Prop['disabled']>();
  icon = input<Prop['icon']>();
  mode = input<Prop['mode']>();
  routerAnimation = input<Prop['routerAnimation']>();
  text = input<Prop['text']>();
  type = input<Prop['type']>();
  props = computed(() => {
    return {
      color: this.color(),
      defaultHref: this.defaultHref(),
      disabled: this.disabled(),
      icon: this.icon(),
      mode: this.mode(),
      routerAnimation: this.routerAnimation(),
      text: this.text(),
      type: this.type(),
    };
  });
}
