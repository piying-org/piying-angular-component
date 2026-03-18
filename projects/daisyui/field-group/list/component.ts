import { NgTemplateOutlet } from '@angular/common';
import { Component, input, viewChild } from '@angular/core';

import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

/**
 * 列表组
 *
 * 用于将表单字段以列表形式垂直排列展示，支持自定义标题样式。
 * 适合字段较多、需要清晰层级结构的场景，如设置列表、表单项清单等。
 */
@Component({
  selector: 'app-list',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, CssPrefixPipe, MergeClassPipe],
})
export class ListFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  /** 标题 CSS 类名 */
  titleClass = input();
}
