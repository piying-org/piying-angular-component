import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AttributesDirective } from '@piying/view-angular';

/**
 * Toast 消息提示组件
 * 用于在页面角落显示短暂的消息提示，如成功、失败、警告等反馈信息
 * 通常在操作完成后自动消失，不影响用户继续操作
 */
@Component({
  selector: 'app-toast',
  templateUrl: './component.html',
  imports: [AttributesDirective, MatIcon, NgTemplateOutlet],
})
export class ToastNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
