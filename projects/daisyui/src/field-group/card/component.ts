import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { Color, Size, useTwClass } from '@piying/angular-daisyui/util';

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
        let key = field.keyPath?.slice(-1)[0];
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
