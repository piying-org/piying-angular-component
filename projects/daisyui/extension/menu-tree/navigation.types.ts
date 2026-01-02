import {
  ActivatedRoute,
  IsActiveMatchOptions,
  Params,
  RouterLinkActive,
  UrlTree,
} from '@angular/router';
import { IconConfig } from '@piying/angular-core';
export const ExactMatchOptions: IsActiveMatchOptions = {
  paths: 'exact',
  fragment: 'ignored',
  matrixParams: 'ignored',
  queryParams: 'exact',
};
export const SubsetMatchOptions: IsActiveMatchOptions = {
  paths: 'subset',
  fragment: 'ignored',
  matrixParams: 'ignored',
  queryParams: 'subset',
};
export interface NavigationItem {
  title?: string;
  subtitle?: string;
  type: 'basic' | 'divider' | 'group';
  hidden?: (item: NavigationItem) => boolean;
  disabled?: boolean;
  tooltip?: string;
  function?: (item: NavigationItem) => void;
  icon?: IconConfig;
  badge?: {
    title?: string;
    class?: string;
  };
  children?: NavigationItem[];
  router?: {
    queryParams?: Params;
    fragment?: string;
    queryParamsHandling?: string;
    state?: { [k: string]: any };
    info?: unknown;
    relativeTo?: ActivatedRoute | null;
    target?: string;
    preserveFragment?: boolean;
    skipLocationChange?: boolean;
    replaceUrl?: boolean;
    routerLink?: readonly any[] | string | UrlTree | null;
    activate?: {
      routerLinkActiveOptions?: RouterLinkActive['routerLinkActiveOptions'];
      ariaCurrentWhenActive?: RouterLinkActive['ariaCurrentWhenActive'];
    };
  };
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
}

export type NavigationMode = 'over' | 'side';

export type NavigationPosition = 'left' | 'right';
