import { Injectable, Injector, signal } from '@angular/core';
import { IonModal } from '@ionic/angular/standalone';
import { JSX } from '@ionic/core';
import { merge } from 'es-toolkit';
import * as v from 'valibot';
type Prop = JSX.IonModal;
export type FormDialogOptions<
  Schema extends v.BaseSchema<any, any, any> = v.BaseSchema<any, any, any>,
  ReturnValue = any,
> = {
  id: number;

  title: string;
  schema: Schema;
  value?: v.InferInput<Schema>;
  cancelButton?: any;
  submitButton?: any;

  applyValue?: (value: v.InferOutput<Schema>) => Promise<ReturnValue | undefined>;
  injector: Injector;
  close: (modal: IonModal, value: any) => Promise<any>;
  modalProp?: Prop;
  context?: Record<string, any>;
};
type ResolvedOption = Omit<FormDialogOptions, 'close'> & {
  close: (value: any) => Promise<any>;
};
@Injectable({
  providedIn: 'root',
})
export class FormDialogService {
  readonly #list$ = signal<ResolvedOption[]>([]);
  private nextId = 0;

  list$$ = this.#list$.asReadonly();

  open<Schema extends v.BaseSchema<any, any, any>, ReturnValue>(
    options: Omit<FormDialogOptions<Schema, ReturnValue>, 'id' | 'close'>,
  ) {
    const id = this.nextId++;
    const p = Promise.withResolvers<ReturnValue | undefined>();
    this.#addToList(
      merge(
        { ...this.#defaultOption },
        {
          ...options,
          id,
          close: async (modal: IonModal, result?: ReturnValue) => {
            await modal.dismiss();
            p.resolve(result);
            this.#remove(id);
          },
        },
      ),
    );

    return p.promise;
  }

  #addToList(item: ResolvedOption) {
    this.#list$.update((current) => [...current, item]);
  }

  #remove(id: number): void {
    this.#list$.update((current) => current.filter((item) => item.id !== id));
  }
  #defaultOption?: Partial<Omit<FormDialogOptions<any>, 'id'>>;
  // closeAll() {
  //   this.#list$.set([]);
  // }
  setDefaultOption(option: Partial<Omit<FormDialogOptions<any>, 'id'>>) {
    this.#defaultOption = option;
  }
}
