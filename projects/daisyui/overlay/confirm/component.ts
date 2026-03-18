import { Component, computed, inject } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import clsx from 'clsx';
import { ConfirmService } from './confirm.service';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';

@Component({
  selector: 'pi-confirm-portal',
  templateUrl: './component.html',
  imports: [MergeClassPipe, CssPrefixPipe, TwPrefixPipe, SelectorlessOutlet, PurePipe],
})
export class ConfirmPortal {
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  service = inject(ConfirmService);
  #theme = inject(ThemeService);
  containerClass$$ = computed(() => {
    return clsx(this.#theme.addPrefix(`modal-${this.service.position$$()}`));
  });
  buttonContent = (content: any) => {
    return { content };
  };
}
