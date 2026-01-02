import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying/angular-core';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { Color, Size } from '@piying/angular-core';
import { AttributesDirective } from '@piying/view-angular';
// todo 设计上存在问题,可能不需要这个组件
@Component({
  selector: 'app-badge',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    NgClass,
    CssPrefixPipe,
    SelectorlessOutlet,
    StrOrTemplateComponent,
  ],
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
