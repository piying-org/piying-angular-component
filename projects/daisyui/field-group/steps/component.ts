import { NgTemplateOutlet, NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, input, model, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Color } from '@piying-lib/angular-core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import clsx from 'clsx';

@Component({
  selector: 'app-steps',
  templateUrl: './component.html',
  imports: [
    NgTemplateOutlet,
    CssPrefixPipe,
    MergeClassPipe,
    TwPrefixPipe,
    PurePipe,
    SelectorlessOutlet,
    StrOrTemplateComponent,
    NgComponentOutlet,
    AttributesDirective,
  ],
})
export class StepsFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  activatedIndex = model(0);
  activatedItem$$ = computed(() => this.field$$().children!()[this.activatedIndex()]);
  prevItem$$ = computed(() => {
    return this.children$$()[this.activatedIndex() - 1];
  });
  customAction = input();
  prev = input('⬅️');
  next = input('➡️');
  direction = input<'vertical' | 'horizontal'>();
  stepColor = input<Color>('primary');

  toPrev() {
    this.activatedIndex.update((value) => value - 1);
  }
  toNext() {
    this.activatedIndex.update((value) => value + 1);
  }
  isActivated(activatedIndex: number, currentIndex: number) {
    return activatedIndex >= currentIndex;
  }
  #theme = inject(ThemeService);
  wrapperClass$$ = computed(() => {
    return clsx(this.#theme.addPrefix('steps'), this.#theme.addPrefix2('steps', this.direction()));
  });
}
