import { Component, viewChild, TemplateRef, input, inject, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonHeader } from '@ionic/angular/standalone';
type Prop = JSX.IonHeader;

@Component({
  selector: 'app-ion-header',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonHeader],
})
export class IonHeaderWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props = computed(() => {
    return this.field$$().props()['Header'] as Prop | undefined;
  });

}
