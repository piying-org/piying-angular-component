import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, model, TemplateRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { StrOrTemplateComponent } from '@piying/angular-daisyui/helper';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { AlertColor, Color, computedWithPrev, IconConfig } from '@piying/angular-daisyui/util';
import { AttributesDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import clsx from 'clsx';
function goPage(value: number) {
  return { type: 'go' as const, value };
}
@Component({
  selector: 'app-pagination',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    MatIcon,
    NgTemplateOutlet,
    NgClass,
    CssPrefixPipe,
    StrOrTemplateComponent,
    SelectorlessOutlet,
    PurePipe,
    FormsModule,
  ],
})
export class PaginationNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  templateRef = viewChild.required('templateRef');
  direction = input<'vertical' | 'horizontal'>();
  sizeOptions = input<number[]>();
  optionsLabel = input<(size: number, index: number, count: number) => string>();
  value = model.required<{ index: number; size: number }>();
  count = input.required<number>();

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return clsx(this.#theme.addPrefix('join'), this.#theme.addPrefix2('join', this.direction()));
  });

  maxPageCount$$ = computed(() => {
    return Math.ceil(this.count() / this.value().size);
  });
  pageRange$$ = computed(() => {
    let list = [];
    let current = this.value().index;
    let fullStart = current - 4 < 0;
    let fullEnd = current + 5 > this.maxPageCount$$();
    if (fullStart) {
      let index = current - 1;
      while (index !== -1) {
        list.unshift(goPage(index));
        index--;
      }
    } else {
      let index = current - 1;
      while (index !== -1 && current - index !== 2) {
        list.unshift(goPage(index));
        index--;
      }
      list.push({ type: 'prev', value: 5 });
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

      while (index < this.maxPageCount$$() && index - current !== 2) {
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
    let field = this.#field?.();
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
