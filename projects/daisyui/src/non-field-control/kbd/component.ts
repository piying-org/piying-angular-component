import { NgClass } from '@angular/common';
import { Component, computed, input, viewChild } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
@Component({
  selector: 'app-kbd',
  templateUrl: './component.html',
  imports: [AttributesDirective],
})
export class KbdNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  value = input('Default');
}
