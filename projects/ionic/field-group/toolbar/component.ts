import { Component, viewChild, input, Signal, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  AttributesDirective,
  PI_INPUT_OPTIONS_TOKEN,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonToolbar } from '@ionic/angular/standalone';
import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
type Prop = JSX.IonToolbar;
type SlotDefine = v.BaseSchema<any, any, any> | undefined;
function TransformFn(a: SlotDefine) {
  return a ? v.pipe(a, actions.attributes.top.patch({ slot: 'end' })) : a;
}
@Component({
  selector: 'app-ion-toolbar',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, IonToolbar],
})
export class IonToolbarFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();

  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN);
  end = input<SlotDefine, SlotDefine>(undefined, {
    transform: TransformFn,
  });
  primary = input<SlotDefine, SlotDefine>(undefined, {
    transform: TransformFn,
  });
  secondary = input<SlotDefine, SlotDefine>(undefined, {
    transform: TransformFn,
  });
  start = input<SlotDefine, SlotDefine>(undefined, {
    transform: TransformFn,
  });

  templateInput = (schema: Signal<any>) => {
    return {
      schema: schema,
      options: this.parentPyOptions!,
      selectorless: true,
    };
  };
}
