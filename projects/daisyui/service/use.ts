import { inject } from '@angular/core';
import { isString } from 'es-toolkit';
import { ThemeService } from './theme.service';

export function useDefaultClass(str?: string | string[]) {
  const theme = inject(ThemeService);
  return (isString(str) ? str.split(' ') : (str ?? []))
    .map((a) => {
      return theme.addPrefix(a);
    })
    .join(' ');
}
export function useTwClass(str?: string | string[]) {
  const theme = inject(ThemeService);
  return (isString(str) ? str.split(' ') : (str ?? []))
    .map((a) => {
      return theme.addTwPrefix(a);
    })
    .join(' ');
}
