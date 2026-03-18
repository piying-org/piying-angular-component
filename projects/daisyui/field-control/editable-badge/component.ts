import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '@piying/view-angular';

import { Color, Size } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
/**
 * 可编辑标签控件
 * 
 * 提供可直接点击编辑的标签显示功能，支持在显示和编辑状态之间切换。
 * 适用于需要Inline编辑的场景，如自定义标签、备注等。
 */
@Component({
  selector: 'app-editable-badge',
  templateUrl: './component.html',
  imports: [FormsModule, MergeClassPipe, CssPrefixPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableBadgeFCC),
      multi: true,
    },
  ],
})
export class EditableBadgeFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  isEdit$ = signal(false);
  editContent$ = linkedSignal(this.value$);
  /** 尺寸大小 */
  size = input<Size>('md');
  /** 颜色主题 */
  color = input<Color>();
  #theme = inject(ThemeService);

  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('badge'),
      this.#theme.setColor('badge', this.color()),
      this.#theme.setSize('badge', this.size()),
      // this.#theme.setSize('badge', this.style()),
    );
  });
  size$$ = computed(() => {
    let size = this.size();
    return {
      input: this.#theme.setSize('input', size),
      btn: this.#theme.setSize('btn', size === 'xl' ? 'sm' : 'xs'),
      text: this.#theme.setSize('text', size === 'md' ? 'base' : size) + '!',
    };
  });
  valueChange2() {
    this.isEdit$.set(false);
    this.valueChange(this.editContent$());
    this.editContent$.set('');
  }
}
