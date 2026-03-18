import { Component, computed, inject } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { ToastService } from './toast.service';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import clsx from 'clsx';

@Component({
  selector: 'pi-toast-portal',
  templateUrl: './component.html',
  imports: [MergeClassPipe, CssPrefixPipe, TwPrefixPipe, CdkCopyToClipboard],
})
export class ToastPortal {
  toast = inject(ToastService);
  #theme = inject(ThemeService);
  containerClass$$ = computed(() => {
    return clsx(this.toast.position$$().map((item) => this.#theme.addPrefix(`toast-${item}`)));
  });
}
