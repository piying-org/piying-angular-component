import { Component, viewChild, TemplateRef, input, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonCol } from '@ionic/angular/standalone';
type Prop = JSX.IonCol;

@Component({
  selector: 'app-ion-col',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonCol],
})
export class IonColWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  field$$ = inject(PI_VIEW_FIELD_TOKEN);

  props = computed(() => {
    return this.field$$().props()['Col'] as Prop | undefined;
  });
}
