import { Component, computed, inject, input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AttributesDirective } from '@piying/view-angular';

import { NgTemplateOutlet, NgClass } from '@angular/common';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
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
