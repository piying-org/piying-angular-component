import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
/**
 * 导航栏组
 *
 * 用于将表单字段组织成导航栏布局，支持开始、中间、结束三个区域的智能分配。
 * 适合需要在顶部导航栏展示表单操作或导航项的场景，如搜索栏、工具栏等。
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, CssPrefixPipe, MergeClassPipe],
})
export class NavbarFGC extends PiyingViewGroupBase {
  static __version = 2;
  static index = 0;
  templateRef = viewChild.required('templateRef');
  start$$ = computed(() => {
    return this.children$$().find((field) => {
      return field.keyPath?.slice(-1)[0] === 'start';
    });
  });
  center$$ = computed(() => {
    return this.children$$().find((field) => {
      return field.keyPath?.slice(-1)[0] === 'center';
    });
  });
  end$$ = computed(() => {
    return this.children$$().find((field) => {
      return field.keyPath?.slice(-1)[0] === 'end';
    });
  });
  rest$$ = computed(() => {
    let defaultSlot = this.children$$().find((field) => {
      return field.keyPath?.slice(-1)[0] === 'default';
    });
    return defaultSlot
      ? [defaultSlot]
      : this.children$$().filter((field) => {
          return (
            field.keyPath?.slice(-1)[0] !== 'start' &&
            field.keyPath?.slice(-1)[0] !== 'center' &&
            field.keyPath?.slice(-1)[0] !== 'end'
          );
        });
  });
}
