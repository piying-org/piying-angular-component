import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonItemOption;

@Component({
  selector: 'app-ion-item-option',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonItemOptionNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  disabled = input<Prop['disabled']>();
  download = input<Prop['download']>();
  expandable = input<Prop['expandable']>();
  href = input<Prop['href']>();
  rel = input<Prop['rel']>();
  target = input<Prop['target']>();
  type = input<Prop['type']>();

  slot = input<{
    start: TemplateRef<any>;
    top: TemplateRef<any>;
    'icon-only': TemplateRef<any>;
    default: TemplateRef<any>;
    end: TemplateRef<any>;
    bottom: TemplateRef<any>;
  }>();
}
