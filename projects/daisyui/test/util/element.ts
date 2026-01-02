export function assertElementExist(parent: HTMLElement) {
  const view = parent.querySelector('piying-view')!;
  expect(view.checkVisibility({ opacityProperty: true, visibilityProperty: true })).toBeTrue();
  const children = parent.querySelectorAll('piying-view>*')!;
  expect(view.children.length).toBeGreaterThan(0);
  const result = [...children].some((child) => {
    return view.checkVisibility({ opacityProperty: true, visibilityProperty: true });
  });
  expect(result).toBeTrue();
  const allChildren = parent.querySelectorAll('piying-view *')!;
  allChildren.forEach((item) => {
    if (item instanceof HTMLElement) {
      expect(item.className.includes('undefined')).toBeFalse();
    }
  });
}
export function assertElementSelector(parent: HTMLElement, selector: string, not?: boolean) {
  const result = parent.querySelector(`piying-view ${selector}`);
  expect(not ? !result : result).toBeTruthy();
}
export function assertElementContent(parent: HTMLElement, selector: string, content: string) {
  const result = parent.querySelector(`piying-view>${selector}`)!;

  expect(result.textContent.trim()).toEqual(content);
}
export function checkElementVisibile(parent: Element, not?: boolean) {
  const result = parent.checkVisibility({ opacityProperty: true, visibilityProperty: true });
  expect(not ? !result : result).toBeTrue();
}
