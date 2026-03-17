import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

/**
 * 字段集组
 *
 * 用于将表单字段进行语义分组，使用 HTML fieldset 元素进行包裹。
 * 适合需要语义化分组、无障碍访问要求较高的场景，如表单区域划分等。
 */
@Component({
  selector: 'app-fieldset',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, CssPrefixPipe, MergeClassPipe],
})
export class FieldsetFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
