import { Component, input, viewChild } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-theme-controller',
  templateUrl: './component.html',
  imports: [AttributesDirective],
})
export class ThemeControllerNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  value = input('synthwave');
}
