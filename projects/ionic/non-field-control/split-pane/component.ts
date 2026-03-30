import { Component, viewChild, TemplateRef, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonSplitPane;

@Component({
  selector: 'app-ion-split-pane',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonSplitPaneNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  contentId = input<Prop['contentId']>();
  disabled = input<Prop['disabled']>();
  when = input<Prop['when']>();
  ionSplitPaneVisible = output<Prop['onIonSplitPaneVisible']>();
  slot = input<{ default: TemplateRef<any> }>();
}
