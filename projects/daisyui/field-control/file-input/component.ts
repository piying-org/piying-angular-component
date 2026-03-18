import { Component, computed, forwardRef, inject, input, output, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { Color, Size } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
/**
 * 文件上传控件
 *
 * 提供文件选择和上传功能，支持单文件和多文件选择。
 * 适用于需要上传文件的表单场景。
 */
@Component({
  selector: 'app-file-input',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, CssPrefixPipe, MergeClassPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputFCC),
      multi: true,
    },
  ],
})
export class FileInputFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  /** 颜色主题 */
  color = input<Color>();
  /** 尺寸大小 */
  size = input<Size>();
  /** 是否支持多文件选择 */
  multiple = input<boolean>();
  /** 是否使用幽灵样式 */
  ghost = input<boolean>();
  fileChange = output<File | File[]>();
  fileChanged(input: HTMLInputElement) {
    if (!input.files) {
      return;
    }
    if (this.multiple()) {
      this.valueAndTouchedChange([...input.files]);
      this.fileChange.emit([...input.files]);
    } else {
      this.valueAndTouchedChange(input.files[0]);
      this.fileChange.emit(input.files[0]);
    }
  }
  clicked(input: HTMLInputElement) {
    input.value = '';
  }
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('file-input', this.color()),
      this.#theme.setSize('file-input', this.size()),
      this.ghost() ? this.#theme.addPrefix(`file-input-ghost`) : undefined,
    );
  });
}
