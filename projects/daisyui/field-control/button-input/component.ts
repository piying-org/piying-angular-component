import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { Color, Size } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import * as v from 'valibot';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * 按钮组件
 * 用于触发操作或提交表单，是最常用的操作控件
 * 支持多种颜色、样式、尺寸、形状以及加载状态
 */
@Component({
  selector: 'app-button-input',
  templateUrl: './component.html',
  imports: [AttributesDirective, CssPrefixPipe, SelectorlessOutlet, MergeClassPipe, TwPrefixPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonInputFCC),
      multi: true,
    },
  ],
})
export class ButtonInputFCC extends BaseControl {
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
  clicked = input<(event: PointerEvent) => string | Promise<string>>();
  /** 是否禁用 */
  disabled = input(false);
  /** 是否禁用加载图标 */
  disableLoadingIcon = input(false);
  /** ---输入--- */
  /** @title 禁止占位符显示 */
  disablePlaceholderShow = input<boolean>();
  /** @title 占位符
  @default '' */
  placeholder = input<string>('');
  /** @title 允许清空 */
  allowClear = input<boolean>();
  isLoading$ = signal(false);

  async onClick(event: PointerEvent) {
    this.isLoading$.set(true);
    try {
      const result = await this.clicked()?.(event);
      if (typeof result !== 'undefined') {
        this.valueChange(result);
      }
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
  clear() {
    this.valueChange(undefined);
  }
}
