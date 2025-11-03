import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, linkedSignal, viewChild } from '@angular/core';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, PurePipe, CssPrefixPipe],
})
export class NavbarFGC extends PiyingViewGroupBase {
  static __version = 2;
  static index = 0;
}
