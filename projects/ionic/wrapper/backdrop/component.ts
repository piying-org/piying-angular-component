import { Component, viewChild, input, output, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonBackdrop } from '@ionic/angular/standalone';
type Prop = JSX.IonBackdrop;

@Component({
  selector: 'app-ion-backdrop',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonBackdrop],
})
export class IonBackdropWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props = computed(() => {
    return this.field$$().props()['Backdrop'] as Prop | undefined;
  });
}
