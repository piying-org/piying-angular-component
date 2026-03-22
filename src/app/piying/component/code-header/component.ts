import { ChangeDetectionStrategy, Component, inject, input, viewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'code-header',
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeHeaderNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  title = input<string>();

  #router = inject(Router);
  url = (() => {
    const tree = this.#router.parseUrl(this.#router.routerState.snapshot.url);
    tree.fragment = null;
    tree.queryParams = {};
    return tree.toString();
  })();
}
