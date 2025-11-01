export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
export type Color =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | undefined;

export interface IconConfig {
  fontIcon?: string;
  fontSet?: string;
  svgIcon?: string;
  inline?: boolean;
}
