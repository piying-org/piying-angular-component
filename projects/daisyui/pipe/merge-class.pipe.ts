import { inject, Pipe, PipeTransform } from '@angular/core';
import clsx, { ClassValue } from 'clsx';
@Pipe({ name: 'mergeClass' })
export class MergeClassPipe implements PipeTransform {
  transform(...args: (ClassValue|string | undefined)[]) {
    return clsx(args);
  }
}
