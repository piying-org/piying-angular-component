import { Component, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { AttributesDirective } from '@piying/view-angular';

/**
 * 主题控制器组件
 * 用于切换应用的主题样式，通常与主题切换功能配合使用
 * 可通过配置不同的主题值来改变整体配色方案
 */
@Component({
  selector: 'app-theme-controller',
  templateUrl: './component.html',
  imports: [AttributesDirective, CssPrefixPipe, MergeClassPipe],
})
export class ThemeControllerNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  value = input('synthwave');
}
