import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, inject, input, model, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService, useTwClass } from '@piying-lib/angular-daisyui/service';
import { Size } from '@piying-lib/angular-core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { FieldLogicGroup, isFieldLogicGroup } from '@piying/view-angular-core';
/**
 * 标签页组
 *
 * 用于将表单字段组织成多标签页切换展示，支持多种标签样式和位置布局。
 * 适合字段较多需要分类管理、多配置项分页展示的场景，如系统设置、表单分组等。
 */
@Component({
  selector: 'app-tabs',
  templateUrl: './component.html',
  imports: [
    NgTemplateOutlet,
    AttributesDirective,
    CssPrefixPipe,
    MergeClassPipe,
    PurePipe,
    SelectorlessOutlet,
  ],
})
export class TabsFGC extends PiyingViewGroupBase {
  static __version = 2;

  static index = 0;
  templateRef = viewChild.required('templateRef');
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  /** 尺寸大小 */
  size = input<Size>();
  name = `pc-tabs-${TabsFGC.index++}`;
  /** 当前激活的标签页索引 */
  activatedIndex = model<number>();
  activateIndex$$ = computed(() => {
    return isFieldLogicGroup(this.field$$().form.control)
      ? (this.field$$().form.control as FieldLogicGroup).activateIndex$()
      : (this.activatedIndex() ?? 0);
  });
  /** 标签类型 */
  type = input<'box' | 'border' | 'lift' | undefined>();
  /** 标签页位置 */
  placement = input<'top' | 'bottom'>();
  /** 标签页内容区域 CSS 类名 */
  tabContentClass = input(useTwClass('bg-base-100 border-base-300 p-6'));
  /** 切换前的回调函数 */
  beforeChange = input<(index: number) => any>();
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setSize('tabs', this.size()),
      this.type() ? this.#theme.addPrefix(`tabs-${this.type()}`) : undefined,
      this.placement() ? this.#theme.addPrefix(`tabs-${this.placement()}`) : undefined,
    );
  });

  isUnion$$ = computed(() => {
    return (
      this.field$$().form.control instanceof FieldLogicGroup &&
      (this.field$$().form.control as FieldLogicGroup).type() === 'or'
    );
  });

  labelInputs = (input: any) => {
    return {
      content: input,
    };
  };
  constructor() {
    super();
    effect(() => {
      if (this.isUnion$$()) {
        const index = this.activatedIndex();
        if (typeof index !== 'number') {
          return;
        }
        const control = this.field$$().form.control as FieldLogicGroup;
        control.activateIndex$.set(index);
      }
    });
  }
  changeIndex(index: number) {
    if (this.beforeChange()) {
      this.beforeChange()!(index);
    }
    this.activatedIndex.set(index);
  }
}
