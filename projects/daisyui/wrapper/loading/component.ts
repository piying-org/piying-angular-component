import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';

import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { Size } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
export interface LoadingOptions {
  type?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
  size?: Size;
}
@Component({
  selector: 'app-loading-wrapper',
  templateUrl: './component.html',
  imports: [FormsModule, MergeClassPipe, TwPrefixPipe, InsertFieldDirective, CssPrefixPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());

  loadingOptions$$ = computed(() => {
    const props = this.props$$();
    return (props['loading'] ?? {}) as LoadingOptions;
  });
  isLoading$$ = computed(() => {
    const props = this.props$$();
    return props['isLoading'] as boolean;
  });

  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    const { size, type } = this.loadingOptions$$();
    return this.#theme.setClass(
      this.#theme.setSize('loading', size),
      type ? this.#theme.addPrefix(`loading-${type}`) : undefined,
    );
  });
}
