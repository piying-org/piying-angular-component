import { Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Color, Size } from '@piying/angular-daisyui/util';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
@Component({
  selector: 'app-button',
  templateUrl: './component.html',
  imports: [AttributesDirective, PurePipe, NgTemplateOutlet, NgClass,CssPrefixPipe],
})
export class ButtonNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Color>();
  style = input<'outline' | 'dash' | 'soft' | 'ghost' | 'link'>();
  size = input<Size>();
  active = input<boolean>();
  shape = input<'wide' | 'block' | 'square' | 'circle'>();
  content = input<any>('Default');
  clicked = input<(event: PointerEvent) => void | Promise<void>>();
  disabled = input(false);
  disableLoadingIcon = input(false);
  loadingIcon = input();
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
  isString(input: any) {
    return typeof input === 'string';
  }
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      'btn',
      this.#theme.setColor('btn', this.color()),
      this.#theme.setSize('btn', this.size()),
      this.style() ? this.#theme.addPrefix(`btn-${this.style()}`) : undefined,
      this.shape() ? this.#theme.addPrefix(`btn-${this.shape()}`) : undefined,
      this.active() ? this.#theme.addPrefix(`btn-active`) : undefined,
    );
  });
}
