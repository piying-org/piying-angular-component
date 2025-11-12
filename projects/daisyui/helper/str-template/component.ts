import { NgTemplateOutlet } from '@angular/common';
import { Component, input, OnInit, TemplateRef, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { PurePipe } from '@cyia/ngx-common/pipe';

@Component({
  selector: 'app-str-or-template',
  templateUrl: './component.html',
  imports: [PurePipe, NgTemplateOutlet, MatIcon],
})
export class StrOrTemplateComponent {
  templateRef = viewChild.required('templateRef');
  content = input();
  context = input();
  isString(input: any) {
    return typeof input === 'string';
  }
  isTemplateRef(input: any) {
    return input instanceof TemplateRef;
  }
  isObject(input: any) {
    return typeof input === 'object';
  }
}
