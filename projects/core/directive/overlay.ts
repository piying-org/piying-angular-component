import { Directive, input } from '@angular/core';
import { CdkConnectedOverlay as CdkConnectedOverlayDEF } from '@angular/cdk/overlay';
import { CustomMenuTrigger } from './menu-trigger';
@Directive({
  selector: '[cdkConnectedOverlay]',
})
export class CdkConnectedOverlay extends CdkConnectedOverlayDEF {
  menuTrigger = input<CustomMenuTrigger>();
  disposeResizeUpdate?: () => void;

  override attachOverlay(): void {
    super.attachOverlay();
    this.disposeResizeUpdate?.();
    const ob = new ResizeObserver(() => {
      this.overlayRef.getConfig().positionStrategy!.apply();
    });

    ob.observe(this.overlayRef.overlayElement);
    this.disposeResizeUpdate = () => {
      this.disposeResizeUpdate = undefined;
      ob.disconnect();
    };
    this.menuTrigger()?.setOverlay(this.overlayRef);
  }
  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.disposeResizeUpdate?.();
  }
}
