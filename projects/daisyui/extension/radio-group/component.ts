import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  model,
  viewChild,
} from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService, useTwClass } from '@piying-lib/angular-daisyui/service';
import { Size } from '@piying-lib/angular-core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { FieldLogicGroup } from '@piying/view-angular-core';
/**
 * 标签页组
 *
 * 用于将表单字段组织成多标签页切换展示，支持多种标签样式和位置布局。
 * 适合字段较多需要分类管理、多配置项分页展示的场景，如系统设置、表单分组等。
 */
@Component({
  selector: 'app-radio-fgc',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet, AttributesDirective, CssPrefixPipe, MergeClassPipe],
})
export class RadioFGC extends PiyingViewGroupBase {
  static __version = 2;

  static index = 0;
  templateRef = viewChild.required('templateRef');
  readonly StrOrTemplateComponent = StrOrTemplateComponent;

  name = `pc-radio-${RadioFGC.index++}`;
  /** 当前激活的标签页索引 */
  activatedIndex = model(0);
  radioClass = input(useTwClass('pb-4'));
  /** 切换前的回调函数 */
  beforeChange = input<(index: number) => any>();

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
