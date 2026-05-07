import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { PiyingViewGroupBase } from '@piying/view-angular';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { PurePipe } from '@cyia/ngx-common/pipe';

@Component({
  selector: 'app-search-group',
  templateUrl: './component.html',
  standalone: true,
  imports: [NgTemplateOutlet, FormsModule, PurePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFGC extends PiyingViewGroupBase {
  searchPlaceholder = input('搜索配置');
  minHeight = input(`0px`);
  searchContent$ = signal('');
  #lazySubject = new Subject<string>();
  canHidden = (content: string, title?: string, description?: string, key?: any[]) => {
    if (!content) {
      return false;
    }
    return !(
      title?.includes(content) ||
      description?.includes(content) ||
      key?.join('.').includes(content)
    );
  };

  valueChange(event: any) {
    this.#lazySubject.next(event);
  }
  ngOnInit(): void {
    this.#lazySubject.pipe(debounceTime(200)).subscribe((value) => {
      this.searchContent$.set(value);
    });
  }
}
