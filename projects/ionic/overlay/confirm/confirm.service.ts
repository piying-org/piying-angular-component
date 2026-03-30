import { Injectable, signal } from '@angular/core';
import { AlertButton, JSX } from '@ionic/core';

type Prop = JSX.IonAlert;

export type Button<T> = {
  close?: () => Promise<T>;
  class?: string;
  label: any;
};

type UnionCloseReturns<T extends readonly any[]> = T extends readonly []
  ? never
  : {
      [K in keyof T]: T[K] extends { close?: (...args: any[]) => infer R } ? R : never;
    }[number];

export type ConfirmItem<BList extends Button<any>[] = any[]> = {
  id: number;
  title: string;
  // message: string;
  // buttons?: BList;
  /** 是否为模态框 */
  modal?: boolean;
  class?: string;
} & Omit<Prop, 'buttons' | 'isOpen'> & { buttons?: AlertButton[] };
const Undefined$$ = Promise.resolve(undefined);
type Position = 'top' | 'middle' | 'bottom' | 'start' | 'end';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  readonly #list$ = signal<ConfirmItem[]>([]);
  private nextId = 0;

  list$$ = this.#list$.asReadonly();
  #position$ = signal<Position>('middle');
  position$$ = this.#position$.asReadonly();
  open<TB extends Button<any>[]>(options: Omit<ConfirmItem<TB>, 'id' | 'close'>) {
    const id = this.nextId++;
    options.buttons?.forEach((item) => {
      let oldHandle = item.handler;
      item.handler = async (value) => {
        let result = await oldHandle?.(value);
        // todo 类型
        p.resolve(result as any);
      };
    });
    const p = Promise.withResolvers<UnionCloseReturns<TB>>();
    this.#addToList({
      ...options,
      id,
    });

    return p.promise;
  }
  #addToList(item: ConfirmItem) {
    this.#list$.update((current) => [...current, item]);
  }

  remove(id: number): void {
    this.#list$.update((current) => current.filter((item) => item.id !== id));
  }
}
