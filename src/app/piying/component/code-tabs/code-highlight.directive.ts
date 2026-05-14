import { Directive, ElementRef, inject, input, SimpleChanges } from '@angular/core';
import { codeToHtml as _codeToHtml } from 'shiki';

@Directive({
  selector: '[codeHL]',
})
export class CodeHighLightDirective {
  codeHL = input.required<string>();
  elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  ngOnChanges(changes: SimpleChanges): void {
    _codeToHtml(this.codeHL(), {
      lang: 'ts',
      themes: {
        light: 'light-plus',
        dark: 'dark-plus',
      },
      colorReplacements: { '#fff': 'transparent' },
    }).then((str) => {
      this.elRef.nativeElement.innerHTML = str;
    });
  }
}
