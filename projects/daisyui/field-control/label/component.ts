import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { MergeClassPipe } from '@piying-lib/angular-core';
import { CssPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { AttributesDirective, BaseControl } from '@piying/view-angular';

@Component({
  selector: 'app-label',
  templateUrl: 'component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, AttributesDirective, CssPrefixPipe, MergeClassPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LabelFCC),
      multi: true,
    },
  ],
})
// 只用来显示的
export class LabelFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  /** ---输入--- */
  /** @title 标签 */
  label = input<string>();
  /** @title 标签映射 */
  labelMap = input<Record<string, any>>();
  /** ---输出--- */
  display$$ = computed(() => {
    const value = this.label() ?? this.value$();
    const map = this.labelMap();
    return map ? map[value] : value;
  });
}
