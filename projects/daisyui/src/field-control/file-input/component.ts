import { Component, computed, forwardRef, input, TemplateRef, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import {
  DefaultOptionConvert,
  OptionConvert,
  SelectOption,
  transformOptions,
} from '@piying/angular-daisyui/util';
import { NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'app-file-input',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputFCC),
      multi: true,
    },
  ],
})
export class FileInputFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  multiple = input<boolean>();
  fileChange(input: HTMLInputElement) {
    if (!input.files) {
      return;
    }
    if (this.multiple()) {
      this.valueChange([...input.files]);
    } else {
      this.valueChange(input.files[0]);
    }
  }
  clicked(input: HTMLInputElement) {
    input.value = '';
  }
}
