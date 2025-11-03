import { NgClass } from '@angular/common';
import { Component, computed, input, viewChild } from '@angular/core';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { AttributesDirective } from '@piying/view-angular';
@Component({
  selector: 'app-avatar',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, CssPrefixPipe],
})
export class AvatarNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  placeholder = input<string>();
  placeholderClass = input<string>('');
  imgUrl = input<string>();
  wrapperClass = input('w-24 rounded');
  status = input<boolean | undefined>();
  classStatus$$ = computed(() => {
    let status = this.status();
    let classObj = {};
    if (status !== undefined) {
      classObj = {
        'avatar-online': status,
        'avatar-offline': !status,
      };
    }
    let imgUrl = this.imgUrl();
    if (imgUrl) {
      return classObj;
    } else {
      return { ...classObj, 'avatar-placeholder': true };
    }
  });
}
