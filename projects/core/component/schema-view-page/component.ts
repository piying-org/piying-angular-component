import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  input,
  resource,
  runInInjectionContext,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PiyingView } from '@piying/view-angular';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
const defaultValue = Promise.resolve(undefined);
/**
 * 文档/document
 * https://github.com/piying-org/piying-angular-component/blob/main/projects/core/component/schema-view-page/component.ts
 */
@Component({
  selector: 'div[pi-schema-view-page]',
  templateUrl: './component.html',
  standalone: true,
  imports: [SelectorlessOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[id]': 'id()' },
})
export class SchemaViewPage {
  static index = 0;
  id = input(`pi-page-${SchemaViewPage.index++}`);
  #route = inject(ActivatedRoute);
  #injector = inject(Injector);

  readonly PiyingView = PiyingView;
  #schema = this.#route.snapshot.data['schema']();
  #model = resource({
    loader: async () =>
      runInInjectionContext(
        this.#injector,
        () => this.#route.snapshot.data['model']?.() || defaultValue,
      ),
  });
  #options = this.#route.snapshot.data['options']();
  inputs = {
    schema: this.#schema,
    options: this.#options,
    model: this.#model.value,
    selectorless: true,
  };
}
