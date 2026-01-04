import { Component, computed, inject, input, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { PI_INPUT_OPTIONS_TOKEN, PI_VIEW_FIELD_TOKEN, PiyingView } from '@piying/view-angular';

import { MatIconModule } from '@angular/material/icon';
import { PurePipe } from '@cyia/ngx-common/pipe';
@Component({
  selector: 'app-list-template',
  templateUrl: './component.html',
  imports: [SelectorlessOutlet, MatIconModule, PurePipe],
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
