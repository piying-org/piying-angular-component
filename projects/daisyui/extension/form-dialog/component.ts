import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { PI_INPUT_OPTIONS_TOKEN, PiyingView } from '@piying/view-angular';
/*
 * FormDialogContainer - 表单对话框容器组件
 *
 * 用途: 用于在对话框中显示和编辑表单数据
 * 特性:
 *   - 支持表单数据的读取和修改
 *   - 支持提交和取消操作
 *   - 支持加载状态显示
 *   - 支持自定义应用值的函数
 *   - 基于 CDK Dialog 实现
 *
 * 使用场景: 需要在对话框中编辑表单数据的场景，常用于新增、编辑操作
 */
@Component({
  templateUrl: './component.html',
  imports: [PiyingView, SelectorlessOutlet],
})
export class FormDialogContainer {
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  options$$ = inject(PI_INPUT_OPTIONS_TOKEN);
  #ref = inject(DialogRef);
  data = inject(DIALOG_DATA);
  changedValue = signal(this.data.value);
  loading$ = signal(false);
  async apply() {
    this.loading$.set(true);
    try {
      const result = (await this.data.applyValue?.(this.changedValue())) ?? this.changedValue();
      this.#ref.close(result);
    } catch (error) {
      throw error;
    } finally {
      this.loading$.set(false);
    }
  }
  close() {
    this.#ref.close();
  }
  modelChange(value: any) {
    this.changedValue.set(value);
  }
  formSubmit($event: Event) {
    return ($event?.target as HTMLFormElement | null)?.method === 'dialog';
  }
}
