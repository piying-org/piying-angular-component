import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';

/**
 * 字符串或模板渲染组件
 * 
 * 一个智能渲染组件，能够根据传入的内容自动判断类型并选择合适的渲染方式。
 * 支持字符串、数字、布尔值、TemplateRef 模板、Schema 对象以及包含 image/icon/title 的对象。
 * 
 * **功能特性**：
 * - 自动识别字符串类型并直接渲染
 * - 支持 Angular TemplateRef 模板渲染
 * - 支持 PiyingView Schema 渲染
 * - 支持特殊对象格式（image、icon、title）的渲染
 * - 支持上下文数据传递
 * 
 * **使用场景**：
 * - 需要动态渲染不同类型的 content 内容时
 * - 需要在表单中嵌入复杂内容（模板、Schema）时
 * - 需要统一处理多种数据类型显示时
 * 
 */
import { MatIcon } from '@angular/material/icon';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { BaseControl, PI_INPUT_OPTIONS_TOKEN, PiyingView } from '@piying/view-angular';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isSchema } from '../../util';

@Component({
  selector: 'app-str-or-template',
  templateUrl: './component.html',
  imports: [PurePipe, NgTemplateOutlet, MatIcon, SelectorlessOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StrOrTemplateComponent),
      multi: true,
    },
  ],
})
export class StrOrTemplateComponent extends BaseControl {
  static __version = 2;
  readonly PiyingView = PiyingView;
  templateRef = viewChild.required('templateRef');
  content = input();
  context = input();
  content$$ = computed(() => {
    return this.content() ?? this.value$();
  });
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  schemaOptions$$ = computed(() => {
    return {
      ...this.parentPyOptions!(),
      context: { ...this.parentPyOptions!().context, ...(this.context() as any) },
    };
  });

  isString(input: any) {
    return typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean';
  }
  isTemplateRef(input: any) {
    return input instanceof TemplateRef;
  }
  isObject(input: any) {
    return typeof input === 'object';
  }
  isSchema = isSchema;
  piyingInput = (schema: any, options: any) => {
    return {
      schema,
      options,
      selectorless: true,
    };
  };
}
