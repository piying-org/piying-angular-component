import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-theme-controller',
  templateUrl: './component.html',
  imports: [AttributesDirective, CssPrefixPipe],
})
export class ThemeControllerNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  value = input('synthwave');
}
