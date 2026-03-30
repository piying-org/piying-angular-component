import { Component, viewChild, TemplateRef, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonButton;

@Component({
  selector: 'app-ion-button',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonButtonNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  buttonType = input<Prop['buttonType']>();
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
  ionFocus = output<Prop['onIonFocus']>();
  ionBlur = output<Prop['onIonBlur']>();
  slot = input<{
    default: TemplateRef<any>;
    'icon-only': TemplateRef<any>;
    start: TemplateRef<any>;
    end: TemplateRef<any>;
  }>();
}
