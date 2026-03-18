import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';

import { PiyingViewGroupBase } from '@piying/view-angular';
import { FormsModule } from '@angular/forms';
/*
 * TableRowFGC - 表格行组件
 *
 * 用途: 作为表格行的容器组件，用于包裹表格行内的字段组
 * 特性:
 *   - 作为表格行的基类组件
 *   - 支持字段组功能
 *
 * 使用场景: table使用
 */
@Component({
  selector: 'tr',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet, FormsModule],
  providers: [],
})
export class TableRowFGC extends PiyingViewGroupBase {}
