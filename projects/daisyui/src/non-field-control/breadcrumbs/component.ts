import { Component, input, viewChild } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconConfig } from '@piying/angular-daisyui/util';
import { MatIcon } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './component.html',
  imports: [AttributesDirective, RouterLink, RouterLinkActive, MatIcon, NgTemplateOutlet],
})
export class BreadcrumbsNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  // todo templateRef
  content = input('Badge');
  options = input<{ label?: string; icon?: IconConfig; url: string; extraLink?: boolean }[]>();
  optionClass = input();
}
