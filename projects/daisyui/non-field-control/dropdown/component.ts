import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import {
  DefaultOptionConvert,
  OptionConvert,
  SelectOption,
  transformOptions,
} from '@piying/angular-daisyui/util';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import { ThemeService } from '@piying/angular-daisyui/service';
import { CssPrefixPipe, TwPrefixPipe } from '@piying/angular-daisyui/pipe';
import { MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { StrOrTemplateComponent } from '@piying/angular-daisyui/helper';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
@Component({
  selector: 'app-dropdown',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    NgTemplateOutlet,
    NgClass,
    CssPrefixPipe,
    MergeClassPipe,
    TwPrefixPipe,
    StrOrTemplateComponent,
    SelectorlessOutlet,
  ],
})
export class DropdownNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;

  templateRef = viewChild.required('templateRef');
  title = input('Default');
  titleClass = input<string>();
  align = input<'start' | 'center' | 'end'>();
  position = input<'top' | 'bottom' | 'left' | 'right'>();
  triggerAction = input<'hover' | 'open'>();
  content = input();
  contentClass = input<string>();
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('dropdown'),
      this.align() ? this.#theme.addPrefix(`dropdown-${this.align()}`) : undefined,
      this.position() ? this.#theme.addPrefix(`dropdown-${this.position()}`) : undefined,
      this.triggerAction() ? this.#theme.addPrefix(`dropdown-${this.triggerAction()}`) : undefined,
    );
  });
}
