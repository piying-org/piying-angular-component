import { JsonPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  model,
  resource,
  Signal,
  signal,
  SimpleChange,
  untracked,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { StrOrTemplateComponent } from '@piying/angular-daisyui/helper';
import { computedWithPrev, isSchema } from '@piying/angular-daisyui/util';
import { range } from 'es-toolkit';

import {
  AttributesDirective,
  PiResolvedViewFieldConfig,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import clsx from 'clsx';
import * as v from 'valibot';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tr',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    NgTemplateOutlet,
    PurePipe,
    SelectorlessOutlet,
    StrOrTemplateComponent,
    JsonPipe,
    FormsModule,
  ],
  providers: [],
})
export class TableRowFGC extends PiyingViewGroupBase {

}
