import { Component, viewChild, input, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonSkeletonText } from '@ionic/angular/standalone';
type Prop = JSX.IonSkeletonText;

@Component({
  selector: 'app-ion-skeleton-text',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonSkeletonText],
})
export class IonSkeletonTextWC {
  static __version = 2;
  field$$ = inject(PI_VIEW_FIELD_TOKEN);

  props = computed(() => {
    return this.field$$().props()['SkeletonText'] as Prop | undefined;
  });
  loading = computed(() => {
    return this.field$$().props()['loading'] as Prop | undefined;
  });
}
