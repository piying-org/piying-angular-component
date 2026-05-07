import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { BaseControl, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { PurePipe } from '@cyia/ngx-common/pipe';

@Component({
  selector: 'readonly-value',
  templateUrl: './component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReadonlyValueFCC),
      multi: true,
    },
  ],
  imports: [PurePipe, MatChipsModule, MatIconModule],
})
export class ReadonlyValueFCC extends BaseControl {
  booleanMap = input<(value: boolean) => string>();
  #field$$ = inject(PI_VIEW_FIELD_TOKEN);
  title$$ = computed(() => this.#field$$().props()['title']);
  displayValue$$ = computed(() => {
    const options = (this.#field$$().props() as any)?.options as any[];
    if (options) {
      return options.find((item) => item.value === this.value$())?.label ?? '';
    }
    return this.value$();
  });
  valueType = (input: any) => {
    return Array.isArray(input) ? 'array' : typeof input;
  };
}
