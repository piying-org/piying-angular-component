import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { Color, Size } from '@piying/angular-daisyui/util';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
@Component({
  selector: 'app-card',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, NgClass, CssPrefixPipe],
})
export class CardFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  size = input<Size>();

  bodyClass = input();
  figureClass = input();
  actionsClass = input('justify-end');
  titleKey = input('title');
  imageKey = input('image');
  actionsKey = input('actions');
  titleFiled$$ = computed(() => {
    return this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === this.titleKey();
      });
  });
  imageFiled$$ = computed(() => {
    return this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === this.imageKey();
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
        return !(key === this.titleKey() || key === this.imageKey() || key === this.actionsKey());
      });
  });
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(this.#theme.setSize('card', this.size()));
  });
}
