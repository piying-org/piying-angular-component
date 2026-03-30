import { Injectable, signal } from '@angular/core';
import { JSX } from '@ionic/core';

type Prop = JSX.IonToast;

export type ToastItem = {
  id: number;
  class?: string;
} & Omit<Prop, 'isOpen'>;

type XPosition = 'start' | 'center' | 'end';
type YPosition = 'top' | 'middle' | 'bottom';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly #list$ = signal<ToastItem[]>([]);
  private readonly timeoutDelayIds = new Map<number, any>();
  private readonly timeoutDurationIds = new Map<number, any>();
  private nextId = 0;
  #position$ = signal<[XPosition, YPosition]>(['end', 'top']);
  position$$ = this.#position$.asReadonly();
  list$$ = this.#list$.asReadonly();

  add(options: Omit<ToastItem, 'id'> & { delay?: number }): number {
    const id = this.nextId++;
    const delay = options.delay;
    const item: ToastItem = {
      id,
      ...options,
      duration: options.duration ?? 5000,
    };
    if (!delay) {
      this.#addToList(item);
    } else {
      const timeoutId = setTimeout(() => {
        this.#addToList(item);
      }, delay);
      this.timeoutDelayIds.set(id, timeoutId);
    }

    return id;
  }
  #addToList(item: ToastItem) {
    this.#list$.update((current) => [...current, item]);
    const timeoutId = setTimeout(() => {
      this.remove(item.id);
    }, item.duration);

    this.timeoutDurationIds.set(item.id, timeoutId);
  }

  remove(id: number): void {
    if (this.timeoutDurationIds.has(id)) {
      clearTimeout(this.timeoutDurationIds.get(id)!);
      this.timeoutDurationIds.delete(id);
      this.#list$.update((current) => current.filter((item) => item.id !== id));
    }
    if (this.timeoutDelayIds.has(id)) {
      clearTimeout(this.timeoutDelayIds.get(id)!);
      this.timeoutDelayIds.delete(id);
    }
  }

  clear(): void {
    this.timeoutDurationIds.forEach((timeoutId) => clearTimeout(timeoutId));
    this.timeoutDurationIds.clear();
    this.timeoutDelayIds.forEach((timeoutId) => clearTimeout(timeoutId));
    this.timeoutDelayIds.clear();
    this.#list$.set([]);
  }
  setPosition(item: [XPosition, YPosition]) {
    this.#position$.set(item);
  }
}
