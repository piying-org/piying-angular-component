import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, linkedSignal, viewChild } from '@angular/core';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';

import {
  AttributesDirective,
  PiResolvedViewFieldConfig,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import clsx from 'clsx';

@Component({
  selector: 'app-list',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, CssPrefixPipe],
})
export class ListFGC extends PiyingViewGroupBase {
  static __version = 2;
}
