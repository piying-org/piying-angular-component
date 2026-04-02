import { Component, viewChild, input, Signal, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  AttributesDirective,
  PI_INPUT_OPTIONS_TOKEN,
  PiyingView,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonToolbar } from '@ionic/angular/standalone';
import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
type Prop = JSX.IonToolbar;
type SlotDefine = v.BaseSchema<any, any, any> | undefined;
function TransformFn(slot: string) {
  return (a: SlotDefine) => {
    return a ? v.pipe(a, actions.attributes.top.patch({ slot: slot })) : a;
  };
}
@Component({
  selector: 'app-ion-toolbar',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, IonToolbar, PurePipe, SelectorlessOutlet],
})
export class IonToolbarFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  readonly PiyingView = PiyingView;
  color = input<Prop['color']>();

  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN);
  end = input<SlotDefine, SlotDefine>(undefined, {
    transform: TransformFn('end'),
  });
  primary = input<SlotDefine, SlotDefine>(undefined, {
    transform: TransformFn('primary'),
  });
  secondary = input<SlotDefine, SlotDefine>(undefined, {
    transform: TransformFn('secondary'),
  });
  start = input<SlotDefine, SlotDefine>(undefined, {
    transform: TransformFn('start'),
  });

  templateInput = (schema: Signal<any>) => {
    return {
      schema: schema,
      options: this.parentPyOptions!,
      selectorless: true,
    };
  };
}
