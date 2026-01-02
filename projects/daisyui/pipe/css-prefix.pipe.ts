import { inject, Pipe, PipeTransform } from '@angular/core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
@Pipe({ name: 'cssPrefix' })
export class CssPrefixPipe implements PipeTransform {
  #theme = inject(ThemeService);
  transform(value: string) {
    return value
      .split(' ')
      .map((value) => this.#theme.addPrefix(value))
      .join(' ');
  }
}
