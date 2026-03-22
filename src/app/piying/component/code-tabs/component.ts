import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PI_INPUT_OPTIONS_TOKEN, PiyingView } from '@piying/view-angular';
import { CodeHighLightDirective } from './code-highlight.directive';

@Component({
  selector: 'code-tabs',
  templateUrl: './component.html',
  imports: [SelectorlessOutlet, CodeHighLightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeTabsNFCC {
  static index = 0;
  static __version = 2;
  name = `tabs-${CodeTabsNFCC.index++}`;
  templateRef = viewChild.required('templateRef');
  activatedIndex = signal(0);
  define = input.required();
  code = input.required<string>();
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN);
  readonly PiyingView = PiyingView;
  piyingInput = {
    schema: this.define,
    options: this.parentPyOptions,
    selectorless: true,
  };
}
