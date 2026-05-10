import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';

import { CssPrefixPipe } from '@piying-lib/angular-daisyui/pipe';

@Component({
  selector: 'app-tooltip',
  templateUrl: './component.html',
  imports: [FormsModule, InsertFieldDirective, CssPrefixPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
}
