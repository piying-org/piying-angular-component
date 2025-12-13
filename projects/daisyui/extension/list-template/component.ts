import { JsonPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, inject, input, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying/angular-daisyui/helper';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { Color, Size } from '@piying/angular-daisyui/util';
import {
  AttributesDirective,
  PI_INPUT_OPTIONS_TOKEN,
  PI_VIEW_FIELD_TOKEN,
  PiyingView,
} from '@piying/view-angular';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import * as v from 'valibot';
import { patchProps } from '@piying/view-angular-core';
import { PurePipe } from '@cyia/ngx-common/pipe';
@Component({
  selector: 'app-list-template',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    NgClass,
    CssPrefixPipe,
    SelectorlessOutlet,
    StrOrTemplateComponent,

    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    MatIconModule,
    MergeClassPipe,
    JsonPipe,
    MergeClassPipe,
    PurePipe,
  ],
})
export class ListTemplateNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  readonly PiyingView = PiyingView;

  templateRef = viewChild.required('templateRef');
  template = input.required<any>();
  list = input<any[]>([]);
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  field = inject(PI_VIEW_FIELD_TOKEN);
  templateInput$$ = (data: any) => {
    return {
      schema: this.template,
      options: computed(() => ({
        ...this.parentPyOptions!(),
        context: {
          ...this.parentPyOptions!().context,
          getParent: () => this.field(),
          getItem: () => data,
        },
      })),
      selectorless: true,
    };
  };
}
