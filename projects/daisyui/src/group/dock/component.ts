import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, linkedSignal, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { PurePipe } from '@cyia/ngx-common/pipe';

import {
  AttributesDirective,
  PiResolvedViewFieldConfig,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import clsx from 'clsx';

@Component({
  selector: 'app-list',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, MatIcon],
})
export class ListFGC extends PiyingViewGroupBase {
  static __version = 2;
  activatedIndex = input(0);
  activatedIndex$ = linkedSignal(this.activatedIndex);
  toggleActivate(index: number) {
    this.activatedIndex$.set(index);
  }
}
