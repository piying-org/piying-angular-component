import { inject, Pipe, PipeTransform } from '@angular/core';
import clsx from 'clsx';
@Pipe({ name: 'mergeClass' })
export class MergeClassPipe implements PipeTransform {
  transform(...args: (string | undefined)[]) {
    return clsx(args);
  }
}
