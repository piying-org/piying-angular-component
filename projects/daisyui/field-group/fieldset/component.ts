import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'app-fieldset',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, CssPrefixPipe, MergeClassPipe],
})
export class FieldsetFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
