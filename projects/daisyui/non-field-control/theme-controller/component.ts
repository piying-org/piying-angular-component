import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
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
