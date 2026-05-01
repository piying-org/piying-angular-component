import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Size } from '@piying-lib/angular-core';
import { AttributesDirective } from '@piying/view-angular';

import { NavigationItem } from './navigation.types';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
const routerLinkActiveOptions = { exact: true };
/*
 * MenuTreeNFCC - 导航菜单树组件
 *
 * 用途: 用于显示具有层级结构的导航菜单，支持多种导航项类型（basic/divider/group）
 * 特性:
 *   - 支持横向和纵向布局
 *   - 支持不同尺寸显示
 *   - 可自定义菜单项模板
 *   - 集成 Angular Router，支持路由激活状态显示
 *
 * 使用场景: 侧边栏导航、顶部导航菜单等需要层级结构的导航场景
 */
@Component({
  selector: 'app-menu-tree',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    CssPrefixPipe,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    MatIconModule,
    MergeClassPipe,
  ],
})
export class MenuTreeNFCC {
  static __version = 2;
  readonly routerLinkActiveOptions = routerLinkActiveOptions;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;

  templateRef = viewChild.required('templateRef');
  /** 菜单项列表 */
  list = input<NavigationItem[]>([]);

  /** 尺寸大小 */
  size = input<Size>();
  /** 方向 */
  direction = input<'horizontal' | 'vertical'>();

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('menu'),
      this.#theme.addPrefix2('menu', this.direction()),
      this.#theme.setSize('menu', this.size()),
    );
  });
}
