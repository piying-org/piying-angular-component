import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  Signal,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { MatIcon } from '@angular/material/icon';
import clsx from 'clsx';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { IconConfig, Size, useDefaultClass } from '@piying/angular-daisyui/util';
import { MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';

export interface FabOption {
  class?: string;
  label?: string;
  icon?: IconConfig;
  clicked?: (event: PointerEvent) => void | Promise<void>;
  templateRef?: TemplateRef<any>;
}
class FabItem {
  isLoading$ = signal(false);
  option;
  autoClose;
  constructor(option: FabOption, autoClose: Signal<boolean>) {
    this.option = option;
    this.autoClose = autoClose;
  }
  async onClick(event: PointerEvent) {
    if (!this.option.clicked) {
      return;
    }
    this.isLoading$.set(true);
    if (this.autoClose()) {
      (document.activeElement as HTMLElement)?.blur();
    }
    try {
      await this.option.clicked(event);
    } catch (error) {
      throw error;
    } finally {
      this.isLoading$.set(false);
    }
  }
}
type FabMainOption = Omit<FabOption, 'clicked'>;
@Component({
  selector: 'app-fab',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    NgTemplateOutlet,
    MatIcon,
    AttributesDirective,
    CssPrefixPipe,
    MergeClassPipe,
    NgClass,
  ],
})
export class FabNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  options = input<FabOption[]>();
  flower = input(false);
  autoClose = input(true);
  resolvedOptions$$ = computed(() => {
    return (
      this.options()?.map((option) => {
        return new FabItem(option, this.autoClose);
      }) ?? []
    );
  });
  commonClass = input<string>(useDefaultClass('btn btn-lg btn-circle'));
  defaultIcon = input<FabOption>({
    label: 'D',
    class: useDefaultClass('btn-primary'),
  });
  closeIcon = input<FabOption | undefined>({
    label: '✕',
    class: useDefaultClass('btn-error'),
  });
  mainIcon = input<FabOption>();
  defaultIcon$$ = computed(() => {
    return new FabItem(this.defaultIcon(), this.autoClose);
  });
  closeIcon$$ = computed(() => {
    let item = this.closeIcon();
    return item ? new FabItem(item, this.autoClose) : undefined;
  });
  mainIcon$$ = computed(() => {
    let item = this.mainIcon();
    return item ? new FabItem(item, this.autoClose) : undefined;
  });
  #theme = inject(ThemeService);
  wrapperClass = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('fab'),
      this.flower() ? this.#theme.addPrefix(`fab-flower`) : undefined,
    );
  });
}
