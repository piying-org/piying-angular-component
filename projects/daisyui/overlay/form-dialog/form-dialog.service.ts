import { Injectable, Injector, signal } from '@angular/core';
import * as v from 'valibot';

export interface FormDialogOptions<
  Schema extends v.BaseSchema<any, any, any> = v.BaseSchema<any, any, any>,
  ReturnValue = any,
> {
  id: number;

  title: string;
  schema: Schema;
  value?: v.InferInput<Schema>;
  cancelButton?: any;
  /** 是否为模态框 */
  modal?: boolean;
  applyValue?: (value: v.InferOutput<Schema>) => Promise<ReturnValue | undefined>;
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

  open<Schema extends v.BaseSchema<any, any, any>, ReturnValue>(options: Omit<FormDialogOptions<Schema, ReturnValue>, 'id' | 'close'>) {
    const id = this.nextId++;
    const p = Promise.withResolvers<ReturnValue | undefined>();
    this.#addToList({
      ...options,
      id,
      close: async (result?: ReturnValue) => {
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
