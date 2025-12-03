import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  linkedSignal,
  OnInit,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { SortDirection } from '@piying/angular-daisyui/service';
import {
  AttributesDirective,
  PI_VIEW_FIELD_TOKEN,
  PiyingViewWrapperBase,
} from '@piying/view-angular';

@Component({
  selector: 'app-filter-option',
  templateUrl: './component.html',
  imports: [MatIcon, FormsModule, CssPrefixPipe, MergeClassPipe, AttributesDirective, FormsModule],
})
export class FilterOptionNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #field = inject(PI_VIEW_FIELD_TOKEN);
  content: WritableSignal<string> = this.#field().props()['seachContent'];
}
