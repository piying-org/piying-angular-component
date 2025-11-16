import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
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
import { PI_INPUT_OPTIONS_TOKEN } from '@piying/view-angular';

@Component({
  selector: 'app-str-or-template',
  templateUrl: './component.html',
  imports: [PurePipe, NgTemplateOutlet, MatIcon, SelectorlessOutlet],
})
export class StrOrTemplateComponent {
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
    return typeof input === 'string';
  }
  isTemplateRef(input: any) {
    return input instanceof TemplateRef;
  }
  isObject(input: any) {
    return typeof input === 'object';
  }
  isSchema(input: any) {
    return (
      input && typeof input === 'object' && '~run' in input && 'kind' in input && 'type' in input
    );
  }
}
