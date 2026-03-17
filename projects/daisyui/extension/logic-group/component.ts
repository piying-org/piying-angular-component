import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, viewChild } from '@angular/core';

import { PiyingViewGroupBase } from '@piying/view-angular';
import { FieldLogicGroup } from '@piying/view-angular-core';
/*
 * logicGroupFGC - 逻辑组组件
 *
 * 用途: 用于根据逻辑条件控制子组件的激活状态
 * 特性:
 *   - 根据 FieldLogicGroup 的激活状态显示子组件
 *   - 自动过滤未激活的子组件
 *   - 集成 piying-view 字段系统
 *
 * 使用场景: 条件显示、逻辑控制、动态表单等需要根据逻辑条件控制组件显示的场景
 */

@Component({
  selector: 'app-logic-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet],
})
export class logicGroupFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  activateChildren$$ = computed(() => {
    const control = this.field$$().form.control! as FieldLogicGroup;
    return this.field$$().children!().filter((config, index1) => {
      return !!control.activatedChildren().find(([index2]) => index1 === index2);
    });
  });
}
