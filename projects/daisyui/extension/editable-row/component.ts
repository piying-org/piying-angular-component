import { Component, computed, inject, input, viewChild } from '@angular/core';
import {
  PiyingViewGroupBase,
  PiyingView,
  PI_INPUT_OPTIONS_TOKEN,
  AttributesDirective,
  EventsDirective,
} from '@piying/view-angular';
import type { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { NgTemplateOutlet, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MergeClassPipe, CssPrefixPipe } from '@piying-lib/angular-daisyui/pipe';

/*
 * EditableRowFGC - 可编辑行组件
 *
 * 用途: 用于动态管理表格风格的行数据，支持每行的增删改操作
 * 特性:
 *   - 表格布局展示，带有表头
 *   - 支持添加和删除行
 *   - 支持自定义操作按钮（编辑/删除）
 *   - 集成 piying-view 字段系统
 *
 * 使用场景: 需要以表格形式展示和编辑动态数据行的场景
 */
@Component({
  selector: 'app-editable-row',
  templateUrl: './component.html',
  imports: [
    NgTemplateOutlet,
    FormsModule,
    MergeClassPipe,
    CssPrefixPipe,
    AttributesDirective,
    EventsDirective,
    NgStyle,
  ],
  host: {
    class: 'block',
  },
})
export class EditableRowFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  PiyingView = PiyingView;
  /** 是否禁用添加 */
  disableAdd = input(false);
  /** 是否禁用删除 */
  disableRemove = input(false);
  /** 添加位置: top/bottom/none */
  addPosition = input<'top' | 'bottom' | 'none'>('bottom');
  /** 初始值生成函数 */
  initValue = input<(index: number | undefined) => any>();
  /** 最小行数 */
  minLength = input<number>(0);

  wrapperClass$$ = computed(() => {
    return '';
  });

  /** 每列占用的列数 (12列布局) */
  colSpan = computed(() => {
    const childrenCount = this.field$$().children!().length;
    if (childrenCount === 0) return '3';
    if (this.isRecord$$()) {
      return Math.max(1, Math.floor((8 - 1) / childrenCount)).toString();
    }
    return Math.max(1, Math.floor(9 / childrenCount)).toString();
  });

  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });

  #keySchema$$ = computed(() => {
    return this.field$$().form.control!.config$().groupKeySchema;
  });
  #valueSchema$$ = computed(() => {
    return this.field$$().form.control!.config$().groupValueSchema;
  });

  keySchemaOptions$$ = computed(() => {
    const opts = this.parentPyOptions!();
    return {
      schema: this.#keySchema$$(),
      options: {
        ...opts,
        context: {
          ...opts.context,
          parent: opts.context,
          parentField: this.field$$(),
        },
      },
      selectorless: true,
    };
  });

  valueSchemaOptions$$ = computed(() => {
    const opts = this.parentPyOptions!();
    return {
      schema: this.#valueSchema$$(),
      options: {
        ...opts,
        context: {
          ...opts.context,
          parent: opts.context,
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

  /** 判断是否为键值对模式 */
  isRecord$$ = computed(() => {
    return !!this.field$$().form.control!.config$().groupKeySchema;
  });

  propsTitle$$ = computed(() => {
    return this.field$$().arrayChild?.children.map((child) => child.props['title']);
  });
  gridCol$$ = computed(() => {
    const list = this.field$$().arrayChild?.children.map(
      (child) => child.props['col'] ?? 'minmax(0, 1fr)',
    );
    return { 'grid-template-columns': (list?.join(' ') ?? '') + ' auto' };
  });
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

  removeItem(index: number) {
    this.field$$().action.remove(index);
  }
}
