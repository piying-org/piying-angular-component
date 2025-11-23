import {
  Component,
  computed,
  effect,
  forwardRef,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl, PiyingViewWrapperBase } from '@piying/view-angular';
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
  ],
})
export class LabelWC extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
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
  override ngOnInit(): void {}
  constructor() {
    super();
    effect(() => {
      let ref = this.fieldComponentAnchor();
      if (ref) {
        this.createComponent();
      } else {
        this.destroyComponentFn?.();
      }
    });
  }
}
