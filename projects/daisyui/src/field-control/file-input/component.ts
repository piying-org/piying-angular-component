import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import {
  Color,
  DefaultOptionConvert,
  OptionConvert,
  SelectOption,
  Size,
  transformOptions,
} from '@piying/angular-daisyui/util';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
@Component({
  selector: 'app-file-input',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    NgTemplateOutlet,
    NgClass,
    CssPrefixPipe,
    MergeClassPipe,
  ],
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
  color = input<Color>();
  size = input<Size>();
  multiple = input<boolean>();
  ghost = input<boolean>();
  fileChange = output<File | File[]>();
  fileChanged(input: HTMLInputElement) {
    if (!input.files) {
      return;
    }
    if (this.multiple()) {
      this.valueChange([...input.files]);
      this.fileChange.emit([...input.files]);
    } else {
      this.valueChange(input.files[0]);
      this.fileChange.emit(input.files[0]);
    }
  }
  clicked(input: HTMLInputElement) {
    input.value = '';
  }
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('file-input', this.color()),
      this.#theme.setSize('file-input', this.size()),
      this.ghost() ? this.#theme.addPrefix(`file-input-ghost`) : undefined,
    );
  });
}
