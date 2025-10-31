import { Component, input, viewChild } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';

@Component({
  selector: 'app-badge',
  templateUrl: './component.html',
  imports: [AttributesDirective],
})
export class BadgeNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  // todo templateRef
  content = input('Badge');
}
