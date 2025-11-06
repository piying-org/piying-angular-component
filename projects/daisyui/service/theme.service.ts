import { inject, Injectable } from '@angular/core';
import { CSSClassPrefixToken } from './token';
import { AlertColor, Color, Size } from '@piying/angular-daisyui/util';
import clsx from 'clsx';
type HasColorCmp =
  | 'btn'
  | 'badge'
  | 'chat-bubble'
  | 'status'
  | 'link'
  | 'step'
  | 'progress'
  | 'tooltip'
  | 'checkbox'
  | 'file-input'
  | 'radio'
  | 'range'
  | 'select'
  | 'input'
  | 'textarea'
  | 'toggle'
  | 'divider'
  | 'alert';
@Injectable()
export class ThemeService {
  readonly #prefix = inject(CSSClassPrefixToken, { optional: true }) ?? '';
  setColor<T extends HasColorCmp>(
    cmpPrefix: T,
    input: (T extends 'alert' ? AlertColor : Color) | undefined,
  ) {
    if (input === undefined) {
      return;
    }
    return `${this.#prefix}${cmpPrefix}-${input}`;
  }
  setSize(
    cmpPrefix:
      | 'btn'
      | 'badge'
      | 'card'
      | 'kbd'
      | 'status'
      | 'table'
      | 'dock'
      | 'menu'
      | 'tabs'
      | 'loading'
      | 'checkbox'
      | 'file-input'
      | 'radio'
      | 'range'
      | 'rating'
      | 'select'
      | 'input'
      | 'textarea'
      | 'toggle',
    input: Size | undefined,
  ) {
    if (input === undefined) {
      return;
    }
    return `${this.#prefix}${cmpPrefix}-${input}`;
  }
  addPrefix(str: string) {
    return this.#prefix ? `${this.#prefix}${str}` : str;
  }
  addPrefix2(cmpPrefix: string, str?: string) {
    if (str === undefined) {
      return;
    }
    return this.#prefix ? `${this.#prefix}${cmpPrefix}-${str}` : `${cmpPrefix}-${str}`;
  }
  addTwPrefix(str: string) {
    return this.#prefix ? `${this.#prefix}:${str}` : str;
  }
  setClass(...args: (string | undefined)[]) {
    return clsx(args);
  }
  addVarPrefix(name: string) {
    return this.#prefix ? `--${this.#prefix}${name}` : name;
  }
}
