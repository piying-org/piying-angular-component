import { Component, viewChild, TemplateRef, input, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
type Prop = JSX.IonCard;

@Component({
  selector: 'app-ion-card',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    NgTemplateOutlet,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent
],
})
export class IonCardFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  button = input<Prop['button']>();
  type = input<Prop['type']>();
  disabled = input<Prop['disabled']>();
  download = input<Prop['download']>();
  href = input<Prop['href']>();
  rel = input<Prop['rel']>();
  routerDirection = input<Prop['routerDirection']>();
  routerAnimation = input<Prop['routerAnimation']>();
  target = input<Prop['target']>();

  slot = input<TemplateRef<any>>();
  title$$ = computed(() => {
    return this.field$$().props()['title'];
  });
  description$$ = computed(() => {
    return this.field$$().props()['description'];
  });
}
