import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonToolbar;

@Component({
  selector: 'app-ion-toolbar',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonToolbarNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();

  slot = input<{
    start: TemplateRef<any>;
    secondary: TemplateRef<any>;
    primary: TemplateRef<any>;
    end: TemplateRef<any>;
  }>();
}
