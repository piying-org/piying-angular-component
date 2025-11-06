export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {});
export type Color =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | (string & {});
//alert
export type AlertColor = 'info' | 'success' | 'warning' | 'error' | (string & {});

export interface IconConfig {
  fontIcon?: string;
  fontSet?: string;
  svgIcon?: string;
  inline?: boolean;
}
