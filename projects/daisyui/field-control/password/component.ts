import { Component, computed, forwardRef, signal, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl } from '@piying/view-angular';

import { MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
/**
 * 密码输入控件
 * 
 * 提供带有密码可见性切换功能的输入框。
 * 适用于需要输入密码等敏感信息的场景。
 */
@Component({
  selector: 'app-password',
  templateUrl: './component.html',
  imports: [FormsModule, MergeClassPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputFCC),
      multi: true,
    },
  ],
})
export class PasswordInputFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  pendingValue$ = signal('');
  see$ = signal(false);
  type$$ = computed(() => {
    return this.see$() ? 'text' : 'password';
  });
  toggleSee() {
    this.see$.update((a) => !a);
  }
}
