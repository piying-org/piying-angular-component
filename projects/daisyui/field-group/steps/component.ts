import { NgTemplateOutlet, NgComponentOutlet } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  model,
  output,
  viewChild,
} from '@angular/core';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Color } from '@piying-lib/angular-core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import clsx from 'clsx';
/**
 * 步骤组
 *
 * 用于将表单字段组织成多步骤向导流程，支持步骤进度管理和前后切换。
 * 适合复杂表单分步填写的场景，如注册流程、配置向导、订单填写等。
 */
@Component({
  selector: 'app-steps',
  templateUrl: './component.html',
  imports: [
    NgTemplateOutlet,
    CssPrefixPipe,
    MergeClassPipe,
    TwPrefixPipe,
    PurePipe,
    NgComponentOutlet,
    AttributesDirective,
  ],
})
export class StepsFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  // todo model
  /** 当前激活的步骤索引 */
  activatedIndex = input(0);
  activatedIndex$ = linkedSignal(this.activatedIndex);
  activatedIndexChange = output<number>();

  activatedItem$$ = computed(() => this.field$$().children!()[this.activatedIndex$()]);
  prevItem$$ = computed(() => {
    return this.children$$()[this.activatedIndex$() - 1];
  });
  /** 自定义操作区域 */
  customAction = input();
  /** 上一步按钮内容 */
  prev = input('⬅️');
  /** 下一步按钮内容 */
  next = input('➡️');
  /** 步骤方向 */
  direction = input<'vertical' | 'horizontal'>();
  /** 步骤颜色 */
  stepColor = input<Color>('primary');

  toPrev() {
    this.activatedIndex$.update((value) => value - 1);
    this.activatedIndexChange.emit(this.activatedIndex$());
  }
  toNext() {
    this.activatedIndex$.update((value) => value + 1);
    this.activatedIndexChange.emit(this.activatedIndex$());
  }
  isActivated(activatedIndex: number, currentIndex: number) {
    return activatedIndex >= currentIndex;
  }
  #theme = inject(ThemeService);
  wrapperClass$$ = computed(() => {
    return clsx(this.#theme.addPrefix('steps'), this.#theme.addPrefix2('steps', this.direction()));
  });
}
