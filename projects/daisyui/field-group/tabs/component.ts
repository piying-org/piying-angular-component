import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, inject, input, linkedSignal, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService, useTwClass } from '@piying-lib/angular-daisyui/service';
import { Size } from '@piying-lib/angular-core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { FieldLogicGroup } from '@piying/view-angular-core';
@Component({
  selector: 'app-tabs',
  templateUrl: './component.html',
  imports: [
    NgTemplateOutlet,
    AttributesDirective,
    CssPrefixPipe,
    MergeClassPipe,
    PurePipe,
    SelectorlessOutlet,
  ],
})
export class TabsFGC extends PiyingViewGroupBase {
  static __version = 2;

  static index = 0;
  templateRef = viewChild.required('templateRef');
  StrOrTemplateComponent = StrOrTemplateComponent;
  size = input<Size>();
  name = `pc-tabs-${TabsFGC.index++}`;
  activatedIndex = input(0);
  type = input<'box' | 'border' | 'lift' | undefined>();
  placement = input<'top' | 'bottom'>();
  tabContentClass = input(useTwClass('bg-base-100 border-base-300 p-6'));
  isUnion = input(false);
  activatedIndex$ = linkedSignal(this.activatedIndex);
  beforeChange = input<(index: number) => any>();
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setSize('tabs', this.size()),
      this.type() ? this.#theme.addPrefix(`tabs-${this.type()}`) : undefined,
      this.placement() ? this.#theme.addPrefix(`tabs-${this.placement()}`) : undefined,
    );
  });
  labelInputs = (input: any) => {
    return {
      content: input,
    };
  };
  constructor() {
    super();
    effect(() => {
      const isUnion = this.isUnion();
      if (isUnion) {
        const index = this.activatedIndex$();
        const control = this.field$$().form.control as FieldLogicGroup;
        control.activateIndex$.set(index);
      }
    });
  }
  changeIndex(index: number) {
    if (this.beforeChange()) {
      this.beforeChange()!(index);
    }
    this.activatedIndex$.set(index);
  }
}
