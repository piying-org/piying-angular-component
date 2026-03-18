import { Injectable, Injector, signal } from '@angular/core';

export interface FormDialogOptions<T = any> {
  id: number;

  title: string;
  schema: any;
  value?: T;
  cancelButton?: any;
  /** 是否为模态框 */
  modal?: boolean;
  applyValue?: (value: T) => Promise<T | undefined>;
  injector: Injector;
  close: (value: any) => Promise<any>;
}

@Injectable({
  providedIn: 'root',
})
export class FormDialogService {
  readonly #list$ = signal<FormDialogOptions[]>([]);
  private nextId = 0;

  list$$ = this.#list$.asReadonly();

  open<T = any>(options: Omit<FormDialogOptions<T>, 'id' | 'close'>) {
    const id = this.nextId++;
    const p = Promise.withResolvers<T | undefined>();
    this.#addToList({
      ...options,
      id,
      close: async (result?: T) => {
        p.resolve(result);
        this.#remove(id);
      },
    });

    return p.promise;
  }

  #addToList(item: FormDialogOptions) {
    this.#list$.update((current) => [...current, item]);
  }

  #remove(id: number): void {
    this.#list$.update((current) => current.filter((item) => item.id !== id));
  }

  // closeAll() {
  //   this.#list$.set([]);
  // }
}
