import { Component, viewChild, input, inject, computed } from '@angular/core';
import { IonInputPasswordToggle } from '@ionic/angular/standalone';
import { JSX } from '@ionic/core';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
type Prop = JSX.IonInputPasswordToggle;

@Component({
  selector: 'app-ion-input-password-toggle',
  templateUrl: './component.html',
  imports: [IonInputPasswordToggle, InsertFieldDirective],
})
export class IonInputPasswordToggleWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  hideIcon = input<Prop['hideIcon']>();
  showIcon = input<Prop['showIcon']>();
  mode = input<Prop['mode']>();
  slot = viewChild.required('slot');

  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props = computed(() => {
    return this.field$$().props()['InputPasswordToggle'] as Prop | undefined;
  });

  ngOnInit(): void {
    this.field$$().inputs.update((value) => {
      return {
        ...value,
        slot: this.slot(),
      };
    });
  }
}
