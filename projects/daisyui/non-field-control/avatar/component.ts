import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { AttributesDirective } from '@piying/view-angular';

/**
 * 头像组件
 * 用于显示用户头像、图标或占位符，支持在线/离线状态指示
 * 可用于个人资料、列表项、评论等场景
 */
@Component({
  selector: 'app-avatar',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass],
})
export class AvatarNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  /** 占位符文本或内容 */
  placeholder = input<string>();
  /** 占位符 CSS 类名 */
  placeholderClass = input<string>('');
  /** 图片 URL */
  imgUrl = input<string>();
  /** 包装器 CSS 类名 */
  wrapperClass = input('w-24 rounded');
  /** 状态指示 */
  status = input<'online' | 'offline' | undefined>();
  #theme = inject(ThemeService);

  mainClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('avatar'),
      this.#theme.addPrefix2('avatar', this.status()),
      this.imgUrl() ? this.#theme.addPrefix2('avatar', 'placeholder') : undefined,
      this.placeholder() ? this.#theme.addPrefix2('avatar', 'placeholder') : undefined,
    );
  });
}
