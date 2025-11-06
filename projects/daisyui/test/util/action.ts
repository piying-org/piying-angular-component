export function htmlInput(parent: HTMLElement, selector: string) {
  let result = parent.querySelector(`piying-view ${selector}`) as HTMLElement;
  result.click();
}
export function htmlInput2(parent: HTMLElement) {
  parent.click();
}
export function htmlFocus(parent: any) {
  (parent as HTMLInputElement).click();
  (parent as HTMLInputElement).focus();
}
