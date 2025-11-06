import { inject } from '@angular/core';
import { ThemeService } from '@piying/angular-daisyui/service';
import { isString } from 'es-toolkit';

export function useDefaultClass(str?: string | string[]) {
  let theme = inject(ThemeService);
  return (isString(str) ? str.split(' ') : (str ?? []))
    .map((a) => {
      return theme.addPrefix(a);
    })
    .join(' ');
}
export function useTwClass(str?: string | string[]) {
  let theme = inject(ThemeService);
  return (isString(str) ? str.split(' ') : (str ?? []))
    .map((a) => {
      return theme.addTwPrefix(a);
    })
    .join(' ');
}
