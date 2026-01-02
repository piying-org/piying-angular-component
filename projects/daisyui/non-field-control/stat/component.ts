import { JsonPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, inject, input, Signal, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying/angular-core';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { AttributesDirective, PI_INPUT_OPTIONS_TOKEN, PiyingView } from '@piying/view-angular';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { PurePipe } from '@cyia/ngx-common/pipe';
@Component({
  selector: 'app-stat',
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
export class StatNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  readonly PiyingView = PiyingView;

  templateRef = viewChild.required('templateRef');
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  title = input();
  titleClass = input<string>();
  value = input();
  valueClass = input<string>();
  desc = input();
  descClass = input<string>();
  figure = input();
  figureClass = input<string>();

  templateInput = (schema: Signal<any>) => {
    return {
      schema: schema,
      options: this.parentPyOptions!,
      selectorless: true,
    };
  };
}
