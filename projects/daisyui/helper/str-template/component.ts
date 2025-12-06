import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  SimpleChanges,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { PI_INPUT_OPTIONS_TOKEN, PiyingView } from '@piying/view-angular';
import { isSchema } from '../../util/is';

@Component({
  selector: 'app-str-or-template',
  templateUrl: './component.html',
  imports: [PurePipe, NgTemplateOutlet, MatIcon, SelectorlessOutlet, PiyingView],
})
export class StrOrTemplateComponent {
  static __version = 2;
  readonly PiyingView = PiyingView;
  templateRef = viewChild.required('templateRef');
  content = input();
  context = input();
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  schemaOptions$$ = computed(() => {
    return {
      ...this.parentPyOptions!(),
      context: this.context(),
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
      selectorless: computed(() => true),
    };
  };
}
