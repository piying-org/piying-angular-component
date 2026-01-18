export function htmlClick(parent: HTMLElement, selector: string) {
  const result = parent.querySelector(`piying-view ${selector}`) as HTMLElement;
  result.click();
}
export function htmlClick2(parent: HTMLElement) {
  parent.click();
}
export function htmlFocus(parent: any) {
  (parent as HTMLInputElement).click();
  (parent as HTMLInputElement).focus();
}
