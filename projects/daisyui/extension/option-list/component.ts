import { Component, forwardRef, inject, input, signal, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AttributesDirective,
  BaseControl,
  PI_INPUT_OPTIONS_TOKEN,
  PiyingView,
} from '@piying/view-angular';
import {
  CommonSelectOptions,
  DefaultOptionConvert,
  OptionConvert,
  ResolvedOption,
  transformOption,
} from '@piying-lib/angular-core';
import { NgTemplateOutlet, SlicePipe } from '@angular/common';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
/*
 * OptionListFCC - 选项列表组件
 *
 * 用途: 用于显示可选择的选项列表，支持自定义选项模板和转换规则
 * 特性:
 *   - 支持动态选项数据（options）
 *   - 支持自定义选项模板（optionTemplate）
 *   - 支持选项转换器（optionConvert）
 *   - 实现了 ControlValueAccessor 接口，可直接用于表单
 *   - 集成 piying-view 字段系统
 *
 * 使用场景: 下拉选择、单选列表、选项选择等需要选项列表的场景
 */
@Component({
  selector: 'app-option-list',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    NgTemplateOutlet,
    SelectorlessOutlet,
    PurePipe,
    MergeClassPipe,
    AttributesDirective,
    SlicePipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OptionListFCC),
      multi: true,
    },
  ],
})
export class OptionListFCC extends BaseControl {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  readonly PiyingView = PiyingView;

  templateRef = viewChild.required('templateRef');
  /** 选项列表 */
  options = input<CommonSelectOptions[] | undefined, CommonSelectOptions>([], {
    transform: (input) => (input as any) ?? [],
  });
  /** 选项模板 */
  optionTemplate = input<Record<string, any>>();
  /** 选项转换器 */
  optionConvert = input<OptionConvert, Partial<OptionConvert>>(DefaultOptionConvert, {
    transform: (input) => ({ ...DefaultOptionConvert, ...input }),
  });
  multiple = input(false);
  maxListCount = input<number>();
  // listFilter=computed(() => {
  //   return this.field$$().props()['filter']
  // })
  transformOption = transformOption;
  optionInput = (content: any) => {
    return {
      content: signal(content),
    };
  };
  selectOption(item: ResolvedOption, activated?: boolean) {
    if (this.multiple()) {
      let list = [...(this.value$() ?? ([] as any[]))];
      const index = list.indexOf(item.value);
      if (activated && index > -1) {
        list.splice(index, 1);
      } else if (!activated && index === -1) {
        list.push(item.value);
      }
      this.valueAndTouchedChange(list);
    } else {
      this.valueAndTouchedChange(item.value);
    }
  }

  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  getInput$$ = (schema: any) => {
    return {
      schema: schema,
      options: this.parentPyOptions!,
      selectorless: true,
    } as any;
  };
  activateClass = (a: any, b: any) => {
    return a === b ? 'menu-active' : '';
  };
  activateClasslist = (a: any[], b: any) => {
    return a?.includes(b);
  };
}

// 加item/group和注册
