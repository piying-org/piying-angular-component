import { Component, computed, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { FilterOptionNFCC } from './filter-option/component';
import * as v from 'valibot';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
/*
 * OptionListLocalFilterWC - 选项列表本地过滤包装器组件
 *
 * 用途: 用于在客户端对选项列表进行本地过滤筛选
 * 特性:
 *   - 支持输入搜索内容进行过滤
 *   - 支持自定义过滤函数（filterWith）
 *   - 支持自定义过滤选项组件（filterDefine）
 *   - 自动同步过滤状态到选项列表
 *   - 集成 piying-view 字段系统
 *
 * 使用场景: 选项列表数据量较小，需要在客户端进行筛选的场景
 */
@Component({
  selector: 'app-local-filter',
  template: `<ng-template #templateRef> <ng-container insertField></ng-container></ng-template>`,
  imports: [InsertFieldDirective],
})
export class OptionListLocalFilterWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  searchContent = signal('');
  fileterOption = { type: 'local-filter' };
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  disabled$$ = computed(() => {
    return this.props$$()['disableLocalFilter'];
  });
  constructor() {
    this.field$$().props.update((a) => {
      return { ...a, searchContent: this.searchContent };
    });
    const localFilterDefine =
      this.props$$()['filterDefine'] ?? v.pipe(NFCSchema, setComponent(FilterOptionNFCC));

    const disabled = this.disabled$$();
    if (!disabled) {
      this.field$$().inputs.update((a) => {
        return {
          ...a,
          optionTemplate: {
            ...a?.['optionTemplate'],
            'local-filter': v.pipe(
              localFilterDefine,
              actions.props.patch({ seachContent: this.searchContent }),
            ),
          },
          options: [],
        };
      });
    }
    const filterWith =
      this.field$$().props()['filterWith'] ??
      ((list: any[], content: string) =>
        list.filter((item: any) => {
          if (typeof item === 'string') {
            return item.includes(content);
          } else if (typeof item === 'object' && item) {
            if (typeof item.label === 'string') {
              return item.label.includes(content);
            }
            if (typeof item.value === 'string') {
              return item.value.includes(content);
            }
          }
          return false;
        }));
    effect(() => {
      const content = this.searchContent();
      const list = this.field$$().props()['options'];
      let filterList = list;
      if (content) {
        filterList = filterWith(list, content);
      }
      untracked(() => {
        this.field$$().inputs.update((a) => {
          return {
            ...a,
            options: [this.fileterOption, ...filterList],
          };
        });
      });
    });
  }
}
