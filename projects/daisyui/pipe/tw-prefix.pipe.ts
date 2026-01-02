import { inject, Pipe, PipeTransform } from '@angular/core';
import { ThemeService } from '@piying/angular-daisyui/service';

@Pipe({ name: 'twPrefix' })
export class TwPrefixPipe implements PipeTransform {
  #theme = inject(ThemeService);
  transform(value: string) {
    return value
      .split(' ')
      .map((value) => this.#theme.addTwPrefix(value))
      .join(' ');
  }
}
