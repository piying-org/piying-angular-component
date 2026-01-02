import { NgTemplateOutlet } from '@angular/common';
import { Component, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'app-list',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, CssPrefixPipe, MergeClassPipe],
})
export class ListFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  titleClass = input();
}
