import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AttributesDirective,
  InsertFieldDirective,
  PI_VIEW_FIELD_TOKEN,
} from '@piying/view-angular';

import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
@Component({
  selector: 'app-fieldset-wrapper',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, CssPrefixPipe, MergeClassPipe, InsertFieldDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldsetWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
}
