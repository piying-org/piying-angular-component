import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Color, Size } from '@piying-lib/angular-core';
import { AttributesDirective, EventsDirective } from '@piying/view-angular';
@Component({
  selector: 'app-badge',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, SelectorlessOutlet, EventsDirective],
})
export class BadgeNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;

  templateRef = viewChild.required('templateRef');
  style = input<'outline' | 'dash' | 'soft' | 'ghost'>();
  color = input<Color>();
  size = input<Size>();
  content = input('Badge');

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('badge'),
      this.#theme.setColor('badge', this.color()),
      this.#theme.setSize('badge', this.size()),
      this.#theme.setSize('badge', this.style()),
    );
  });
}
