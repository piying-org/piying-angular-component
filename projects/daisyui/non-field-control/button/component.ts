import { Component, computed, inject, input, signal, TemplateRef, viewChild } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { Color, Size } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import * as v from 'valibot';

/**
 * 按钮组件
 * 用于触发操作或提交表单，是最常用的操作控件
 * 支持多种颜色、样式、尺寸、形状以及加载状态
 */
@Component({
  selector: 'app-button',
  templateUrl: './component.html',
  imports: [AttributesDirective, CssPrefixPipe, SelectorlessOutlet, MergeClassPipe, TwPrefixPipe],
})
export class ButtonNFCC {
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
  content = input<
    | string
    | TemplateRef<any>
    | v.BaseSchema<any, any, any>
    | {
        image?: { src?: string; alt?: string };
        icon?: { inline?: boolean; fontIcon?: string; fontSet?: string; svgIcon?: string };
        title?: string;
      }
  >('Default');
  /** 点击事件处理函数 */
  clicked = input<(event: PointerEvent) => void | Promise<void>>();
  /** 是否禁用 */
  disabled = input(false);
  /** 是否禁用加载图标 */
  disableLoadingIcon = input(false);
  isLoading$ = signal(false);

  async onClick(event: PointerEvent) {
    this.isLoading$.set(true);
    try {
      await this.clicked()?.(event);
    } catch (error) {
      throw error;
    } finally {
      this.isLoading$.set(false);
    }
  }

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
}
