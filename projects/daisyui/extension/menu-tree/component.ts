import { JsonPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying/angular-daisyui/helper';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { Size } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';

import { NavigationItem } from './navigation.types';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
const routerLinkActiveOptions = { exact: false };
@Component({
  selector: 'app-menu-tree',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    NgClass,
    CssPrefixPipe,
    SelectorlessOutlet,
    StrOrTemplateComponent,

    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    MatIconModule,
    MergeClassPipe,
    JsonPipe,
    MergeClassPipe,
  ],
})
export class MenuTreeNFCC {
  static __version = 2;
  readonly routerLinkActiveOptions = routerLinkActiveOptions;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;

  templateRef = viewChild.required('templateRef');
  list = input<NavigationItem[]>([]);

  size = input<Size>();
  direction = input<'horizontal' | 'vertical'>();

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('menu'),
      this.#theme.addPrefix2('menu', this.direction()),
      this.#theme.setSize('menu', this.size()),
    );
  });
}
