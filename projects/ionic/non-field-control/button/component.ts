import { Component, viewChild, TemplateRef, input, output, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonButton, IonSpinner } from '@ionic/angular/standalone';
import { StrOrTemplateComponent } from '../str-template';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
type Prop = JSX.IonButton;

@Component({
  selector: 'app-ion-button',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, IonButton, IonSpinner, SelectorlessOutlet],
})
export class IonButtonNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  buttonType = input<Prop['buttonType']>('button');
  disabled = input<Prop['disabled']>();
  expand = input<Prop['expand']>();
  fill = input<Prop['fill']>();
  routerDirection = input<Prop['routerDirection']>();
  routerAnimation = input<Prop['routerAnimation']>();
  download = input<Prop['download']>();
  href = input<Prop['href']>();
  rel = input<Prop['rel']>();
  shape = input<Prop['shape']>();
  size = input<Prop['size']>();
  strong = input<Prop['strong']>();
  target = input<Prop['target']>();
  type = input<Prop['type']>();
  form = input<Prop['form']>();
  ionFocus = output<Parameters<NonNullable<Prop['onIonFocus']>>[0]>();
  ionBlur = output<Parameters<NonNullable<Prop['onIonBlur']>>[0]>();
  slot = input<TemplateRef<any>>();
  icon = input(undefined, {
    transform: (value) => {
      if (!value || value instanceof TemplateRef) {
        return value;
      }
      if (typeof value === 'string') {
        return { icon: { name: value }, slot: 'icon-only' };
      }
      return { icon: value, slot: 'icon-only' };
    },
  });
  content = input<any>(undefined);
  start = input<any, any>(undefined, {
    transform: (value) => {
      if (!value || value instanceof TemplateRef) {
        return value;
      }
      if (typeof value === 'string') {
        return { title: value, slot: 'start' };
      }
      return { ...value, slot: 'start' };
    },
  });
  end = input<any, any>(undefined, {
    transform: (value) => {
      if (!value || value instanceof TemplateRef) {
        return value;
      }
      if (typeof value === 'string') {
        return { title: value, slot: 'end' };
      }
      return { ...value, slot: 'end' };
    },
  });
  clicked = input<(event: PointerEvent) => void | Promise<void>>();
  isLoading$ = signal(false);
  async onClick(event: PointerEvent) {
    this.isLoading$.set(true);
    try {
      await this.clicked()?.(event);
    } catch (error) {
      throw error;
    } finally {
      this.isLoading$.set(false);
    }
  }
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
}
