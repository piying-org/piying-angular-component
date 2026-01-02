import { Component, computed, forwardRef, inject, input, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { Color, Size } from '@piying/angular-daisyui/util';
import { ThemeService } from '@piying/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { toDateStr } from '../calendar/date.util';
import { PurePipe } from '@cyia/ngx-common/pipe';
@Component({
  selector: 'app-input',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, CssPrefixPipe, MergeClassPipe, PurePipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFCC),
      multi: true,
    },
  ],
})
export class InputFCC extends BaseControl {
  static __version = 2;
  type = input<
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'datetime-local'
    | 'week'
    | 'month'
    | 'tel'
    | 'url'
    | 'search'
    | 'time'
  >('text');
  ghost = input<boolean>();
  templateRef = viewChild.required('templateRef');
  color = input<Color>();
  size = input<Size>();
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('input', this.color()),
      this.#theme.setSize('input', this.size()),
      this.ghost() ? this.#theme.addPrefix(`input-ghost`) : undefined,
    );
  });

  valueChange2(value: any, el: HTMLInputElement) {
    switch (this.type()) {
      case 'number': {
        this.valueChange(el.valueAsNumber);
        break;
      }
      case 'date': {
        this.valueChange(el.valueAsDate);
        break;
      }

      default: {
        this.valueChange(value);
        break;
      }
    }
  }
  inputFormat(value: any, type: string) {
    if (type === 'date' && value instanceof Date) {
      return toDateStr(value);
    }
    return value;
  }
}
