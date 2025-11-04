import { NgTemplateOutlet } from '@angular/common';
import { Component, input, OnInit, viewChild } from '@angular/core';
import { PurePipe } from '@cyia/ngx-common/pipe';

@Component({
  selector: 'app-str-or-template',
  templateUrl: './component.html',
  imports: [PurePipe, NgTemplateOutlet],
})
export class StrOrTemplateComponent {
  templateRef = viewChild.required('templateRef');
  content = input();
  context = input();
  isString(input: any) {
    return typeof input === 'string';
  }
}
