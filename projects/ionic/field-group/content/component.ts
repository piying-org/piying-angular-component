import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input, TemplateRef, computed, output } from '@angular/core';
import { IonContent, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/angular/standalone';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { PropertyDirective } from '@piying-lib/angular-ionic/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';

type Prop = JSX.IonContent;

@Component({
  selector: 'app-ion-content',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    NgTemplateOutlet,
    IonContent,
    PropertyDirective,
    SelectorlessOutlet,
  ],
})
export class IonContentFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  color = input<Prop['color']>();
  fixedSlotPlacement = input<Prop['fixedSlotPlacement']>();
  forceOverscroll = input<Prop['forceOverscroll']>();
  fullscreen = input<Prop['fullscreen']>();
  scrollEvents = input<Prop['scrollEvents']>();
  scrollX = input<Prop['scrollX']>();
  scrollY = input<Prop['scrollY']>();

  ionScroll = output<Parameters<NonNullable<Prop['onIonScroll']>>[0]>();
  ionScrollEnd = output<Parameters<NonNullable<Prop['onIonScrollEnd']>>[0]>();
  ionScrollStart = output<Parameters<NonNullable<Prop['onIonScrollStart']>>[0]>();
  props = computed(() => {
    return {
      color: this.color(),
      fixedSlotPlacement: this.fixedSlotPlacement(),
      forceOverscroll: this.forceOverscroll(),
      fullscreen: this.fullscreen(),
      scrollEvents: this.scrollEvents(),
      scrollX: this.scrollX(),
      scrollY: this.scrollY(),
    };
  });
  title$$ = computed(() => {
    return this.field$$().props()['title'];
  });
  fixed = input<any, any>(undefined, {
    transform: (value) => {
      if (!value || value instanceof TemplateRef) {
        return value;
      }
      if (typeof value === 'string') {
        return { title: value, slot: 'fixed' };
      }
      return { ...value, slot: 'fixed' };
    },
  });
}
