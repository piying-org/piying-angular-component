import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService, useTwClass } from '@piying-lib/angular-daisyui/service';
import { Size } from '@piying-lib/angular-core';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
@Component({
  selector: 'app-card',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, NgClass, CssPrefixPipe, MergeClassPipe],
})
export class CardFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  border = input<'border' | 'dash'>();
  size = input<Size>();

  bodyClass = input<string>();
  figureClass = input<string>();
  actionsClass = input(useTwClass('justify-end'));
  titleKey = input('title');
  figureKey = input('figure');
  actionsKey = input('actions');
  titleFiled$$ = computed(() => {
    return this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === this.titleKey();
      });
  });
  figureFiled$$ = computed(() => {
    return this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === this.figureKey();
      });
  });
  actionsFiled$$ = computed(() => {
    return this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === this.actionsKey();
      });
  });
  bodyChildren$$ = computed(() => {
    return this.field$$()
      .children?.()
      .filter((field) => {
        const key = field.keyPath?.slice(-1)[0];
        return !(key === this.titleKey() || key === this.figureKey() || key === this.actionsKey());
      });
  });
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setSize('card', this.size()),
      this.#theme.addPrefix2('card', this.border()),
    );
  });
}
