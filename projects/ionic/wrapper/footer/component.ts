import { Component, viewChild, TemplateRef, input, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonFooter } from '@ionic/angular/standalone';
type Prop = JSX.IonFooter;

@Component({
  selector: 'app-ion-footer',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonFooter],
})
export class IonFooterNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props = computed(() => {
    return this.field$$().props()['Footer'] as Prop | undefined;
  });
}
