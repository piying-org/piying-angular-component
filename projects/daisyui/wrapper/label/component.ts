import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AttributesDirective,
  BaseControl,
  InsertFieldDirective,
  PI_VIEW_FIELD_TOKEN,
} from '@piying/view-angular';
import {
  DefaultOptionConvert,
  OptionConvert,
  SelectOption,
  transformOptions,
} from '@piying/angular-daisyui/util';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying/angular-daisyui/pipe';
@Component({
  selector: 'app-label-wrapper',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    NgTemplateOutlet,
    NgClass,
    CssPrefixPipe,
    MergeClassPipe,
    TwPrefixPipe,
    InsertFieldDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  labelInline$$ = computed(() => {
    return this.props$$()['labelInline'] ?? false;
  });
  labelPosition$$ = computed(() => {
    return this.props$$()['labelPosition'] ?? 'top';
  });
  isEnd$$ = computed(() => {
    let direction = this.labelPosition$$();
    return direction === 'bottom' || direction === 'end';
  });
  layout$$ = computed(() => {
    let direction = this.labelPosition$$();
    return direction === 'top' || direction === 'bottom' ? 'flex flex-col' : 'flex';
  });
}
