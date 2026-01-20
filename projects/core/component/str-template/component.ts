import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { BaseControl, PI_INPUT_OPTIONS_TOKEN, PiyingView } from '@piying/view-angular';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isSchema } from '../../util';

@Component({
  selector: 'app-str-or-template',
  templateUrl: './component.html',
  imports: [PurePipe, NgTemplateOutlet, MatIcon, SelectorlessOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StrOrTemplateComponent),
      multi: true,
    },
  ],
})
export class StrOrTemplateComponent extends BaseControl {
  static __version = 2;
  readonly PiyingView = PiyingView;
  templateRef = viewChild.required('templateRef');
  content = input();
  context = input();
  content$$ = computed(() => {
    return this.content() ?? this.value$();
  });
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  schemaOptions$$ = computed(() => {
    return {
      ...this.parentPyOptions!(),
      context: { ...this.parentPyOptions!().context, ...(this.context() as any) },
    };
  });

  isString(input: any) {
    return typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean';
  }
  isTemplateRef(input: any) {
    return input instanceof TemplateRef;
  }
  isObject(input: any) {
    return typeof input === 'object';
  }
  isSchema = isSchema;
  piyingInput = (schema: any, options: any) => {
    return {
      schema,
      options,
      selectorless: true,
    };
  };
}
