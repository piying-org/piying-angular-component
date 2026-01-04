import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { AttributesDirective } from '@piying/view-angular';
@Component({
  selector: 'app-avatar',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass],
})
export class AvatarNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  placeholder = input<string>();
  placeholderClass = input<string>('');
  imgUrl = input<string>();
  wrapperClass = input('w-24 rounded');
  status = input<'online' | 'offline' | undefined>();
  #theme = inject(ThemeService);

  mainClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('avatar'),
      this.#theme.addPrefix2('avatar', this.status()),
      this.imgUrl() ? this.#theme.addPrefix2('avatar', 'placeholder') : undefined,
    );
  });
}
