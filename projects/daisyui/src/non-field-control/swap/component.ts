import { NgTemplateOutlet } from '@angular/common';
import { Component, forwardRef, input, TemplateRef, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
@Component({
  selector: 'app-swap',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, PurePipe, NgTemplateOutlet, CssPrefixPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwapFCC),
      multi: true,
    },
  ],
})
export class SwapFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  onRef = input<string | TemplateRef<any>>('✔️');
  offRef = input<string | TemplateRef<any>>('❌');

  isString(input: any) {
    return typeof input === 'string';
  }
}
