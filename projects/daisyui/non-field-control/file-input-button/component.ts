import { Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { Color, Size } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';

/**
 * 文件输入按钮组件
 * 结合按钮样式和文件选择功能，用户点击按钮后可选择本地文件并触发处理逻辑
 * 支持单文件或多文件上传模式
 */
@Component({
  selector: 'app-button',
  templateUrl: './component.html',
  imports: [AttributesDirective, CssPrefixPipe, SelectorlessOutlet, MergeClassPipe, TwPrefixPipe],
})
export class FileInputButtonNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  templateRef = viewChild.required('templateRef');
  /** 颜色主题 */
  color = input<Color>();
  /** 按钮样式风格 */
  style = input<'outline' | 'dash' | 'soft' | 'ghost' | 'link'>();
  /** 尺寸大小 */
  size = input<Size>();
  /** 形状 */
  shape = input<'wide' | 'block' | 'square' | 'circle'>();
  /** 是否激活状态 */
  active = input<boolean>();
  /** 按钮内容 */
  content = input<any>('Default');
  /** 是否支持多文件选择 */
  multiple = input<boolean>();
  /** 点击事件处理函数 */
  clicked = input<(event: File[] | File) => Promise<void>>();
  /** 是否禁用 */
  disabled = input(false);
  /** 是否禁用加载图标 */
  disableLoadingIcon = input(false);
  /** 接受的文件类型 */
  accept = input();
  isLoading$ = signal(false);

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('btn'),
      this.#theme.setColor('btn', this.color()),
      this.#theme.setSize('btn', this.size()),
      this.style() ? this.#theme.addPrefix(`btn-${this.style()}`) : undefined,
      this.shape() ? this.#theme.addPrefix(`btn-${this.shape()}`) : undefined,
      this.active() ? this.#theme.addPrefix(`btn-active`) : undefined,
    );
  });

  async fileChange(input: HTMLInputElement) {
    if (!input.files || !input.files.length) {
      return;
    }
    let fileData;
    if (this.multiple()) {
      fileData = [...input.files];
    } else {
      fileData = input.files[0];
    }

    this.isLoading$.set(true);
    try {
      await this.clicked()?.(fileData);
    } catch (error) {
      throw error;
    } finally {
      this.isLoading$.set(false);
    }
  }
}
