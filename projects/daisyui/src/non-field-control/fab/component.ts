import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, signal, TemplateRef, viewChild } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { MatIcon } from '@angular/material/icon';
import clsx from 'clsx';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { Size, useDefaultClass } from '@piying/angular-daisyui/util';
import { MergeClassPipe } from '@piying/angular-daisyui/pipe/merge-class.pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
export interface IconConfig {
  fontIcon?: string;
  fontSet?: string;
  svgIcon?: string;
  inline?: boolean;
}
export interface FabOption {
  class?: string;
  label?: string;
  icon?: IconConfig;
  clicked?: (event: PointerEvent) => void | Promise<void>;
  templateRef?: TemplateRef<any>;
  attribute?: Record<string, any>;
}
class FabItem {
  isLoading$ = signal(false);
  option;
  constructor(option: FabOption) {
    this.option = option;
  }
  async onClick(event: PointerEvent) {
    if (!this.option.clicked) {
      return;
    }
    this.isLoading$.set(true);
    try {
      await this.option.clicked(event);
    } catch (error) {
      throw error;
    } finally {
      this.isLoading$.set(false);
    }
  }
  labelClass$$ = computed(() => {
    return this.option.attribute?.['class'] || this.option.class
      ? clsx(this.option.attribute?.['class'] ?? this.option.class)
      : 'btn btn-lg btn-circle';
  });
}
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
  ],
})
export class FabNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  content = input();
  options = input<FabOption[]>();
  flower = input(false);

  resolvedOptions$$ = computed(() => {
    return (
      this.options()?.map((option) => {
        return new FabItem(option);
      }) ?? []
    );
  });
  defaultClass = input<string>(useDefaultClass('btn-primary'));
  defaultIcon = input<FabOption>({
    label: 'D',
    class: 'btn btn-lg btn-circle btn-primary',
    attribute: { tabindex: '0' },
  });
  defaultIcon$$ = computed(() => {
    return new FabItem(this.defaultIcon());
  });

  closeIcon = input<FabOption | undefined>({
    label: '✕',
    class: 'btn btn-circle btn-lg btn-error',
  });
  closeIcon$$ = computed(() => {
    let item = this.closeIcon();
    return item ? new FabItem(item) : undefined;
  });
  mainIcon = input<FabOption>();
  mainIcon$$ = computed(() => {
    let item = this.mainIcon();
    return item ? new FabItem(item) : undefined;
  });
}
