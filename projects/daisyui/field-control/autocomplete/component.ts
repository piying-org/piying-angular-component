import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  linkedSignal,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import {
  Color,
  CommonSelectOptions,
  DefaultOptionConvert,
  OptionConvert,
  SelectOption,
  Size,
  transformOptions,
} from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { toDateStr } from '../calendar/date.util';
import { PurePipe } from '@cyia/ngx-common/pipe';
const defaultFilterWith = (input: string, option: SelectOption) =>
  option.label?.includes(input) ||
  (typeof option.value === 'string' && option.value.toLocaleLowerCase().includes(input)) ||
  (typeof option.description === 'string' &&
    option.description.toLocaleLowerCase().includes(input));
const defaultSearchBy = (input: string) => input.toLocaleLowerCase();
/**
 * 文本输入控件
 *
 * 提供多种类型的文本输入功能，支持文本、密码、数字、日期等常见输入场景。
 * 适合作为表单中的基础输入组件使用。
 */
@Component({
  selector: 'app-autocomplete',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, CssPrefixPipe, MergeClassPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteFCC),
      multi: true,
    },
  ],
})
export class AutocompleteFCC extends BaseControl {
  static __version = 2;
  static index = 0;
  readonly listId = `autocomplete-${AutocompleteFCC.index++}`;
  /** 输入框类型 */
  type = input<
    | 'text'
    | 'password'
    | 'email'
    | 'datetime-local'
    | 'week'
    | 'month'
    | 'tel'
    | 'url'
    | 'search'
    | 'time'
  >('text');
  /** 是否使用幽灵样式 */
  ghost = input<boolean>();
  templateRef = viewChild.required('templateRef');
  /** 颜色主题 */
  color = input<Color>();
  /** 尺寸大小 */
  size = input<Size>();
  #theme = inject(ThemeService);

  options = input<CommonSelectOptions, CommonSelectOptions | undefined>([], {
    transform: (input) => input ?? [],
  });
  /** 选项转换器 */
  optionConvert = input<OptionConvert, Partial<OptionConvert>>(DefaultOptionConvert, {
    transform: (input) => ({ ...DefaultOptionConvert, ...input }),
  });
  resolvedOptions$$ = computed(() => transformOptions(this.options(), this.optionConvert()));

  allowCustom = input(false);
  maxCount = input(20);
  filterWith = input(defaultFilterWith);
  searchBy = input(defaultSearchBy);
  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('input', this.color()),
      this.#theme.setSize('input', this.size()),
      this.ghost() ? this.#theme.addPrefix(`input-ghost`) : undefined,
    );
  });
  searchOptions$$ = computed(() => {
    let content = this.searchContent$();
    if (!content) {
      return this.resolvedOptions$$().slice(0, this.maxCount());
    } else if (this.searchBy()) {
      content = this.searchBy()!(content);
    }

    const filterWith = this.filterWith();
    let count = 0;
    const list = [];
    for (const item of this.resolvedOptions$$()) {
      const result = filterWith ? filterWith(content, item) : true;
      if (result) {
        count++;
        list.push(item);
        if (count === this.maxCount()) {
          break;
        }
      }
    }
    return list;
  });

  searchContent$ = linkedSignal(() => this.value$() || '');

  searchChange(inputValue: any) {
    if (this.allowCustom()) {
      this.valueChange(inputValue);
    } else {
      let item = this.searchOptions$$().find(({ value }) => value === inputValue);
      if (item) {
        this.valueChange(inputValue);
      }
    }
  }
}
