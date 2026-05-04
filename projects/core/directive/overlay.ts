import { Directive } from '@angular/core';
import { CdkConnectedOverlay as CdkConnectedOverlayDEF } from '@angular/cdk/overlay';
@Directive({
  selector: '[cdkConnectedOverlay]',
})
export class CdkConnectedOverlay extends CdkConnectedOverlayDEF {
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
  }
  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.disposeResizeUpdate?.();
  }
}
