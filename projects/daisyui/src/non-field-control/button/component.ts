import { Component, computed, input, signal, viewChild } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'app-button',
  templateUrl: './component.html',
  imports: [AttributesDirective, PurePipe, NgTemplateOutlet],
})
export class ButtonNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  content = input<any>('Default');
  clicked = input<(event: PointerEvent) => void | Promise<void>>();
  disabled = input(false);
  disableLoadingIcon = input(false);
  loadingIcon = input();
  isLoading$ = signal(false);

  async onClick(event: PointerEvent) {
    this.isLoading$.set(true);
    try {
      await this.clicked()?.(event);
    } catch (error) {
      throw error;
    } finally {
      this.isLoading$.set(false);
    }
  }
  isString(input: any) {
    return typeof input === 'string';
  }
}
