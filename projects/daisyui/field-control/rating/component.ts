import { Component, computed, forwardRef, inject, input, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { Size } from '@piying-lib/angular-core';
import { range } from 'es-toolkit';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
/**
 * 评分控件
 *
 * 提供星级或爱心形式的评分选择功能，支持半星选择。
 * 适用于评价、评级、评分等场景。
 */
@Component({
  selector: 'app-rating',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, CssPrefixPipe, MergeClassPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingFCC),
      multi: true,
    },
  ],
})
export class RatingFCC extends BaseControl {
  static index = 0;
  name = `rating-${RatingFCC.index++}`;
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  /** 尺寸大小 */
  size = input<Size>('md');

  /** 最小值 */
  min = input<number>(1);
  /** 最大值 */
  max = input<number>(5);
  /** 是否支持半星选择 */
  half = input<boolean>();
  /** 类型，支持星形或爱心形状 */
  type = input<'star' | 'star-2' | 'heart'>('star');
  list = computed(() => {
    return range(0, this.max());
  });
  itemClass$$ = computed(() => {
    return this.#theme.addPrefix2('mask', this.type());
  });
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(this.#theme.setSize('rating', this.size()));
  });
}
