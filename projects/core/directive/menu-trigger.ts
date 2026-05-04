import { Injectable } from '@angular/core';
import { CdkMenuTrigger as CdkMenuTrigger2 } from '@angular/cdk/menu';
import { OverlayRef } from '@angular/cdk/overlay';

@Injectable()
export class CustomMenuTrigger extends CdkMenuTrigger2 {
  constructor() {
    super();
    this.menuStack.setHasFocus(true);
  }
  setOverlay(overlayRef: OverlayRef) {
    this.overlayRef = overlayRef;
  }

  override close(): void {
    this.overlayRef!.detach();
  }
}
