import { Component, computed, inject, input, model, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { AttributesDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import clsx from 'clsx';
function goPage(value: number) {
  return { type: 'go' as const, value };
}
/*
 * PaginationNFCC - 分页组件
 *
 * 用途: 用于分页显示大量数据，支持自定义每页条数和跳转页面
 * 特性:
 *   - 支持横向和纵向布局
 *   - 可配置每页显示条数选项
 *   - 支持自定义页码标签
 *   - 集成 piying-view 字段系统，自动同步分页属性
 *
 * 使用场景: 数据表格分页、列表分页等需要分页功能的场景
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './component.html',
  imports: [AttributesDirective, PurePipe, FormsModule, MergeClassPipe],
})
export class PaginationNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  templateRef = viewChild.required('templateRef');
  direction = input<'vertical' | 'horizontal'>();
  sizeOptions = input<number[]>();
  optionsLabel = input<(size: number, index: number, count: number) => string>();
  value = model.required<{ index: number; size: number }>();
  // todo 临时兼容
  valueChange = output<{ index: number; size: number }>();
  count = input.required<number>();

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return clsx(this.#theme.addPrefix('join'), this.#theme.addPrefix2('join', this.direction()));
  });

  maxPageCount$$ = computed(() => {
    return Math.ceil((this.count() ?? 0) / this.value().size);
  });
  pageRange$$ = computed(() => {
    let list = [];
    const current = this.value().index;
    const fullStart = current - 4 < 0;
    const fullEnd = current + 5 > this.maxPageCount$$();
    if (fullStart) {
      let index = current - 1;
      while (index !== -1) {
        list.unshift(goPage(index));
        index--;
      }
    } else {
      list.push({ type: 'prev', value: 5 });
      let index = current - 1;
      const tempList = [];
      while (index !== -1 && current - index < 3) {
        tempList.unshift(goPage(index));
        index--;
      }
      list = list.concat(tempList);
    }
    list.push(goPage(current));

    if (fullEnd) {
      let index = current + 1;
      while (index < this.maxPageCount$$()) {
        list.push(goPage(index));
        index++;
      }
    } else {
      let index = current + 1;
      while (index < this.maxPageCount$$() && index - current < 3) {
        list.push(goPage(index));
        index++;
      }
      list.push({ type: 'next', value: 5 });
    }
    return list;
  });
  #field = inject(PI_VIEW_FIELD_TOKEN, { optional: true });
  ngOnInit(): void {
    this.updatePageToProps();
  }
  gotoPage(value: number) {
    this.value.update((data) => {
      return { ...data, index: value };
    });
    this.updatePageToProps();
  }
  pageSizeChange(value: number) {
    this.value.update((item) => {
      return { ...item, size: value };
    });
    this.updatePageToProps();
  }
  updatePageToProps() {
    this.valueChange.emit(this.value());
    const field = this.#field?.();
    if (!field) {
      console.warn(`❌piying-view🗄️`);
      return;
    }
    field.props.update((data) => {
      return {
        ...data,
        pageQueryParams: this.value(),
      };
    });
  }
}
