import { Component, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-theme-controller',
  templateUrl: './component.html',
  imports: [AttributesDirective, CssPrefixPipe, MergeClassPipe],
})
export class ThemeControllerNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  value = input('synthwave');
}
