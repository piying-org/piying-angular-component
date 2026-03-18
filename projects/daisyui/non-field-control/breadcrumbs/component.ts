import { Component, input, TemplateRef, viewChild } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconConfig } from '@piying-lib/angular-core';
import { MatIcon } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';

/**
 * 面包屑导航组件
 * 用于显示页面层级结构和当前位置，帮助用户了解所处位置并快速返回上级页面
 * 支持自定义标签、图标和 URL 配置
 */
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    NgTemplateOutlet,
    CssPrefixPipe,
    MergeClassPipe,
  ],
})
export class BreadcrumbsNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  /** 面包屑选项列表 */
  options = input<
    {
      label?: string;
      icon?: IconConfig;
      url: string;
      extraLink?: boolean;
      templateRef?: TemplateRef<any>;
    }[]
  >();
  /** 选项 CSS 类名 */
  optionClass = input();
}
