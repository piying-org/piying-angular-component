import { Component, computed, inject, input, viewChild } from '@angular/core';
import {
  PiyingViewGroupBase,
  PiyingView,
  PI_INPUT_OPTIONS_TOKEN,
  AttributesDirective,
  EventsDirective,
} from '@piying/view-angular';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
/*
 * EditableGroupFGC - 可编辑组组件
 *
 * 用途: 用于动态管理可增删的组数据，支持键值对和单值两种模式
 * 特性:
 *   - 支持添加和删除组项
 *   - 支持横向和纵向布局
 *   - 支持设置最小长度限制
 *   - 支持自定义新增项的初始值
 *   - 支持键值对模式（通过 groupKeySchema）
 *   - 集成 piying-view 字段系统
 *
 * 使用场景: 动态表单项、可增删的数据组、键值对列表等需要动态管理组数据的场景
 */
@Component({
  selector: 'app-editable-group',
  templateUrl: './component.html',
  imports: [
    NgTemplateOutlet,
    FormsModule,
    MergeClassPipe,
    CssPrefixPipe,
    AttributesDirective,
    EventsDirective,
    SelectorlessOutlet,
    PurePipe,
  ],
})
export class EditableGroupFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  PiyingView = PiyingView;
  layout = input<'row' | 'columen'>('row');
  disableAdd = input(false);
  addMode = input(0);
  disableRemove = input(false);
  addPosition = input<'top' | 'bottom'>('bottom');
  initValue = input<(index: number | undefined) => any>();
  minLength = input<number>(0);
  isRecord$$ = computed(() => {
    return !!this.field$$().form.control!.config$().groupKeySchema;
  });
  wrapperClass$$ = computed(() => {
    return this.layout() === 'row' ? 'flex gap-2 items-center' : 'flex flex-col gap-2';
  });
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });

  #keySchema$$ = computed(() => {
    return this.field$$().form.control!.config$().groupKeySchema;
  });
  #valueSchema$$ = computed(() => {
    return this.field$$().form.control!.config$().groupValueSchema;
  });
  keySchemaOptions$$ = computed(() => {
    return {
      schema: this.#keySchema$$(),
      options: {
        ...this.parentPyOptions!(),
        context: {
          ...this.parentPyOptions!().context,
          parent: this.parentPyOptions!().context,
          parentField: this.field$$(),
        },
      },
      selectorless: true,
    };
  });
  valueSchemaOptions$$ = computed(() => {
    return {
      schema: this.#valueSchema$$(),
      options: {
        ...this.parentPyOptions!(),
        context: {
          ...this.parentPyOptions!().context,
          parent: this.parentPyOptions!().context,
          parentField: this.field$$(),
        },
      },
      selectorless: true,
    };
  });
  addNewInputs = (
    input: Record<string, any>,
    newValueFn: ((index: number | undefined) => any) | undefined,
    model: any,
  ) => {
    return {
      ...input,
      model: newValueFn?.(model),
    };
  };
  addNew(newValue?: SelectorlessOutlet<PiyingView>, newKey?: SelectorlessOutlet<PiyingView>) {
    if (newKey && newValue) {
      const keyForm = newKey.componentInstance!.form$$()!;
      const valueForm = newValue.componentInstance!.form$$()!;
      this.field$$().action.set(valueForm.value, keyForm.value);
      keyForm.reset();
      valueForm.reset();
    } else if (newValue) {
      const form = newValue.componentInstance!.form$$()!;
      this.field$$().action.set(form.value);
      form.reset();
    } else {
      const index = this.field$$().children!().length;
      this.field$$().action.set(this.initValue()?.(index), index);
    }
  }

  removeItem(key: number) {
    this.field$$().action.remove(key);
  }
}
