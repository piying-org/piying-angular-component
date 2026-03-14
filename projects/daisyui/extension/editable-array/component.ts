import {
  Component,
  computed,
  inject,
  input,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import {
  PiyingViewGroupBase,
  PiyingView,
  PI_INPUT_OPTIONS_TOKEN,
  AttributesDirective,
  EventsDirective,
} from '@piying/view-angular';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
@Component({
  selector: 'app-editable-array',
  templateUrl: './component.html',
  imports: [
    NgTemplateOutlet,
    FormsModule,
    MergeClassPipe,
    CssPrefixPipe,
    AttributesDirective,
    EventsDirective,
  ],
})
export class EditableArrayFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  PiyingView = PiyingView;
  layout = input<'row' | 'columen'>('row');
  disableAdd = input(false);
  disableRemove = input(false);
  initPrefix = input<(index: number | undefined) => any>();
  minLength = input<number>(0);

  wrapperClass$$ = computed(() => {
    return this.layout() === 'row' ? 'flex gap-2 items-center' : 'flex flex-col gap-2';
  });

  addNew() {
    const index = this.field$$().children!().length;
    this.field$$().action.set(this.initPrefix()?.(index), index);
  }

  removeItem(key: number) {
    this.field$$().action.remove(key);
  }
}
