import { Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AttributesDirective, EventsDirective } from '@piying/view-angular';

import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';

import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Color, Size } from '@piying-lib/angular-core';
@Component({
  selector: 'app-input-button',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, MergeClassPipe, EventsDirective, CssPrefixPipe],
})
export class InputButtonNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  type = input<'reset' | 'submit'>('submit');
  color = input<Color>();
  style = input<'outline' | 'dash' | 'soft' | 'ghost' | 'link'>();
  size = input<Size>();
  shape = input<'wide' | 'block' | 'square' | 'circle'>();
  active = input<boolean>();
  clicked = input<(event: PointerEvent) => void | Promise<void>>();
  disabled = input(false);
  isLoading$ = signal(false);

  async onClick(event: PointerEvent) {
    this.isLoading$.set(true);
    try {
      await this.clicked()?.(event);
    } catch (error) {
      throw error;
    } finally {
      this.isLoading$.set(false);
    }
  }

  #theme = inject(ThemeService);
  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('btn'),
      this.#theme.setColor('btn', this.color()),
      this.#theme.setSize('btn', this.size()),
      this.style() ? this.#theme.addPrefix(`btn-${this.style()}`) : undefined,
      this.shape() ? this.#theme.addPrefix(`btn-${this.shape()}`) : undefined,
      this.active() ? this.#theme.addPrefix(`btn-active`) : undefined,
    );
  });
}
