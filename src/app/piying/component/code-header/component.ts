import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { PI_INPUT_OPTIONS_TOKEN, PiyingView, PiyingViewGroupBase } from '@piying/view-angular';
import { codeToHtml as _codeToHtml } from 'shiki';

@Component({
  selector: 'code-header',
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeHeaderNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  title = input<string>();
}
