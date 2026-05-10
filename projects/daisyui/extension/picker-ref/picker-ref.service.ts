import { Injectable, Signal } from '@angular/core';
import { PiResolvedViewFieldConfig } from '@piying/view-angular';

@Injectable()
export class PickerRefService {
  rootField$$!: Signal<PiResolvedViewFieldConfig>;
  triggerField$$!: Signal<PiResolvedViewFieldConfig>;
}
