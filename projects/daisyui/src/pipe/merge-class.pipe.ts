import { inject, Pipe, PipeTransform } from '@angular/core';
import { ThemeService } from '@piying/angular-daisyui/service';
import clsx from 'clsx';
@Pipe({ name: 'mergeClass' })
export class MergeClassPipe implements PipeTransform {
  #theme = inject(ThemeService);

  transform(...args: (string | undefined)[]) {
    return clsx(args);
  }
}
