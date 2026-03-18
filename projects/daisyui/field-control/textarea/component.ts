import { Component, computed, forwardRef, inject, input, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { Color, Size } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
/**
 * 多行文本输入控件
 * 
 * 提供多行文本的输入功能，支持大段文本的编辑场景。
 * 适用于评论、描述、备注等需要大量文本输入的表单字段。
 */
@Component({
  selector: 'app-textarea',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, CssPrefixPipe, MergeClassPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaFCC),
      multi: true,
    },
  ],
})
export class TextareaFCC extends BaseControl {
  static __version = 2;

  /** 是否使用幽灵样式 */
  ghost = input<boolean>();
  templateRef = viewChild.required('templateRef');
  /** 颜色主题 */
  color = input<Color>();
  /** 尺寸大小 */
  size = input<Size>();
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('textarea', this.color()),
      this.#theme.setSize('textarea', this.size()),
      this.ghost() ? this.#theme.addPrefix('textarea-ghost') : undefined,
    );
  });
}
