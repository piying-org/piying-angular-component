export function assertElementExist(parent: HTMLElement) {
  let view = parent.querySelector('piying-view')!;
  expect(view.checkVisibility({ opacityProperty: true, visibilityProperty: true })).toBeTrue();
  let children = parent.querySelectorAll('piying-view>*')!;
  expect(view.children.length).toBeGreaterThan(0);
  let result = [...children].some((child) => {
    return view.checkVisibility({ opacityProperty: true, visibilityProperty: true });
  });
  expect(result).toBeTrue();
  let allChildren = parent.querySelectorAll('piying-view *')!;
  allChildren.forEach((item) => {
    expect(item.className.includes('undefined')).toBeFalse();
  });
}
export function assertElementSelector(parent: HTMLElement, selector: string, not?: boolean) {
  let result = parent.querySelector(`piying-view ${selector}`);
  expect(not ? !result : result).toBeTruthy();
}
export function assertElementContent(parent: HTMLElement, selector: string, content: string) {
  let result = parent.querySelector(`piying-view>${selector}`)!;

  expect(result.textContent.trim()).toEqual(content);
}
export function checkElementVisibile(parent: Element, not?: boolean) {
  let result = parent.checkVisibility({ opacityProperty: true, visibilityProperty: true });
  expect(not ? !result : result).toBeTrue();
}
