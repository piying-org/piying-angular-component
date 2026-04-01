import { Injectable, Injector, signal } from '@angular/core';
import { IonModal } from '@ionic/angular/standalone';
import { JSX } from '@ionic/core';
import { merge } from 'es-toolkit';
type Prop = JSX.IonModal;
export type FormDialogOptions<T = any> = {
  id: number;

  title: string;
  schema: any;
  value?: T;
  cancelButton?: any;
  submitButton?: any;

  applyValue?: (value: T) => Promise<T | undefined>;
  injector: Injector;
  close: (modal: IonModal, value: any) => Promise<any>;
  modalProp?: Prop;
  context?: Record<string, any>;
};
type ResolvedOption = Omit<FormDialogOptions, 'close'> & { close: (value: any) => Promise<any> };
@Injectable({
  providedIn: 'root',
})
export class FormDialogService {
  readonly #list$ = signal<ResolvedOption[]>([]);
  private nextId = 0;

  list$$ = this.#list$.asReadonly();

  open<T = any>(options: Omit<FormDialogOptions<T>, 'id' | 'close'>) {
    const id = this.nextId++;
    const p = Promise.withResolvers<T | undefined>();
    this.#addToList(
      merge(
        { ...this.#defaultOption },
        {
          ...options,
          id,
          close: async (modal: IonModal, result?: T) => {
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
  #defaultOption?: Partial<Omit<FormDialogOptions, 'id'>>;
  // closeAll() {
  //   this.#list$.set([]);
  // }
  setDefaultOption(option: Partial<Omit<FormDialogOptions, 'id'>>) {
    this.#defaultOption = option;
  }
}
