import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, CssPrefixPipe, MergeClassPipe],
})
export class NavbarFGC extends PiyingViewGroupBase {
  static __version = 2;
  static index = 0;
  templateRef = viewChild.required('templateRef');
  start$$ = computed(() => {
    return this.children$$().find((field) => {
      return field.keyPath?.slice(-1)[0] === 'start';
    });
  });
  center$$ = computed(() => {
    return this.children$$().find((field) => {
      return field.keyPath?.slice(-1)[0] === 'center';
    });
  });
  end$$ = computed(() => {
    return this.children$$().find((field) => {
      return field.keyPath?.slice(-1)[0] === 'end';
    });
  });
  rest$$ = computed(() => {
    return this.children$$().filter((field) => {
      return (
        field.keyPath?.slice(-1)[0] !== 'start' &&
        field.keyPath?.slice(-1)[0] !== 'center' &&
        field.keyPath?.slice(-1)[0] !== 'end'
      );
    });
  });
}
