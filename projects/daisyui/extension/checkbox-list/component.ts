import { Component, computed, forwardRef, inject, input, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PI_INPUT_OPTIONS_TOKEN, PiyingView, PiyingViewGroupBase } from '@piying/view-angular';

import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import * as v from 'valibot';
import { actions, formConfig } from '@piying/view-angular-core';
import { PurePipe } from '@cyia/ngx-common/pipe';
export interface CheckboxOption {
  value: any;
  inputs?: any;
  props?: any;
}
const Empty_Array: any[] = [];
/*
 * CheckboxListFGC - 复选框列表组件
 *
 * 用途: 用于显示可多选的复选框列表，支持动态选项和自定义配置
 * 特性:
 *   - 支持动态复选框选项（options）
 *   - 支持自定义每个选项的 Schema 和属性
 *   - 实现了 ControlValueAccessor 接口，可直接用于表单
 *   - 基于 piying-view 字段系统，支持动态验证和状态管理
 *   - 支持值的增删操作
 *
 * 使用场景: 多选列表、权限选择、标签选择等需要多选功能的场景
 */
@Component({
  selector: 'app-checkbox-list',
  templateUrl: './component.html',
  imports: [FormsModule, SelectorlessOutlet, PurePipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxListFGC),
      multi: true,
    },
  ],
})
export class CheckboxListFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  readonly PiyingView = PiyingView;
  /** 选项列表 */
  options = input<CheckboxOption[]>();
  #parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });

  templateSchema$$ = computed(() => {
    return this.field$$().form.control!.config$().groupValueSchema!;
  });
  schemaItemFn = (template: any, input: CheckboxOption) => {
    return v.pipe(
      v.optional(template),
      formConfig({
        transformer: {
          toModel(value, control) {
            return value ? input.value : undefined;
          },
          toView(value, control) {
            return !!value;
          },
        },
      }),
      actions.inputs.patch(input.inputs ?? {}),
      actions.props.patch(input.props ?? {}),
    );
  };
  schemaOptions$$ = (template: any, input: CheckboxOption, value: any[]) => {
    return {
      schema: template,
      options: this.#parentPyOptions!(),
      selectorless: true,
      model: value.includes(input.value),
    };
  };
  value$$ = computed<any[]>(() => {
    return this.field$$().form.control!.value$$() ?? Empty_Array;
  });
  modelOutput = (booleanValue: any) => {
    return {
      modelChange: (value: any) => {
        const list = this.value$$().slice();
        if (value) {
          this.field$$().action.set(value);
        } else {
          const index = list.findIndex((item) => item === booleanValue);
          this.field$$().action.remove(index);
        }
      },
    };
  };
}
