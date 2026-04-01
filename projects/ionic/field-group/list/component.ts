import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input, TemplateRef, computed } from '@angular/core';
import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/angular/standalone';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { PropertyDirective } from '@piying-lib/angular-ionic/directive';

type Prop = JSX.IonList;

@Component({
  selector: 'app-ion-list',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, IonList, IonItem, IonListHeader, IonLabel,PropertyDirective],
})
export class IonListFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  lines = input<Prop['lines']>();
  inset = input<Prop['inset']>();
  mode = input<Prop['mode']>();
  itemWrapper = input<boolean>();
  headerProperty = input<JSX.IonListHeader>();
  title$$ = computed(() => {
    return this.field$$().props()['title'];
  });
}
