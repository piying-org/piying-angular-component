import { Component, input, TemplateRef, viewChild } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconConfig } from '@piying/angular-daisyui/util';
import { MatIcon } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    NgTemplateOutlet,
    CssPrefixPipe,
    MergeClassPipe,
  ],
})
export class BreadcrumbsNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  options = input<
    {
      label?: string;
      icon?: IconConfig;
      url: string;
      extraLink?: boolean;
      templateRef?: TemplateRef<any>;
    }[]
  >();
  optionClass = input();
}
