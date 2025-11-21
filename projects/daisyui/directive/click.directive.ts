import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
  selector: 'app-click',
})
export class ClickDirective {
  clicked = output();
  @HostListener('click', ['$event'])
  a(event: any) {
    this.clicked.emit(event);
  }
}
