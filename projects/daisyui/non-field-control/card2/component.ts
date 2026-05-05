import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService, useTwClass } from '@piying-lib/angular-daisyui/service';
import { Size } from '@piying-lib/angular-core';

import {
  AttributesDirective,
  PI_INPUT_OPTIONS_TOKEN,
  PiyingView,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import * as v from 'valibot';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
/**
 * 卡片组
 *
 * 用于将表单字段组织成卡片式布局，支持标题、图片和操作区的自定义。
 * 适合需要突出显示每组字段、创建美观表单界面的场景，如用户资料编辑、表单 Wizard 等。
 */
@Component({
  selector: 'app-card2',
  templateUrl: './component.html',
  imports: [AttributesDirective, CssPrefixPipe, MergeClassPipe, SelectorlessOutlet, PurePipe],
})
export class CardNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  readonly PiyingView = PiyingView;
  /** 边框样式 */
  border = input<'border' | 'dash'>();
  /** 尺寸大小 */
  size = input<Size>();

  bodyClass = input<string>();
  figureClass = input<string>();
  actionsClass = input(useTwClass('justify-end'));
  title = input<v.BaseSchema<any, any, any>>();
  titleActions = input<v.BaseSchema<any, any, any>>();
  figure = input<v.BaseSchema<any, any, any>>();
  actions = input<v.BaseSchema<any, any, any>>();
  body = input<v.BaseSchema<any, any, any>>();
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  schemaOptions$$ = computed(() => {
    return {
      ...this.parentPyOptions!(),
      context: { ...this.parentPyOptions!().context },
    };
  });
  piyingInput = (schema: any, options: any) => {
    return {
      schema,
      options,
      selectorless: true,
    };
  };

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setSize('card', this.size()),
      this.#theme.addPrefix2('card', this.border()),
    );
  });
}
