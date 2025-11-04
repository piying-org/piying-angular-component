import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, TemplateRef, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying/angular-daisyui/helper/str-template/component';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { AlertColor, Color, IconConfig } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-alert',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    MatIcon,
    NgTemplateOutlet,
    NgClass,
    CssPrefixPipe,
    StrOrTemplateComponent,
    SelectorlessOutlet,
  ],
})
export class AlertNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;

  templateRef = viewChild.required('templateRef');
  style = input<'outline' | 'dash' | 'soft'>();
  color = input<AlertColor>();
  direction = input<'vertical' | 'horizontal'>();
  content = input('Default');

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('alert'),
      this.#theme.setColor('alert', this.color()),
      this.#theme.addPrefix2('alert', this.style()),
      this.#theme.addPrefix2('alert', this.direction()),
    );
  });
}
