import { actions, PiyingViewGroup } from '@piying/view-angular';
import { DivNFCC, DivWC, StrOrTemplateComponent } from '@piying-lib/angular-core';
import {
  IonCheckboxFCC,
  IonDatetimeButtonFCC,
  IonInputFCC,
  IonRadioGroupFCC,
  IonSelectFCC,
  IonTextareaFCC,
  IonToggleFCC,
} from '@piying-lib/angular-ionic/field-control';
import {
  IonAvatarWC,
  IonBackdropWC,
  IonChipWC,
  IonColWC,
  IonFooterWC,
  IonGridWC,
  IonHeaderWC,
  IonInfiniteScrollWC,
  IonInputPasswordToggleWC,
  IonLoadingWC,
  IonRefresherWC,
  IonRowWC,
  IonSkeletonTextWC,
} from '../wrapper';
import { computed } from '@angular/core';

function title2label<T>() {
  return actions.inputs.mapAsync<T>((field) => {
    let title$$ = computed(() => field.props()['title']);
    return (value) => {
      return {
        ...value,
        label: value.label ?? title$$(),
      };
    };
  });
}
// todo title转换
export const PresetDefine = {
  types: {
    string: {
      type: IonInputFCC,
      actions: [title2label()],
    },
    password: {
      type: IonInputFCC,
      actions: [
        actions.wrappers.set([{ type: IonInputPasswordToggleWC }]),
        actions.inputs.set({ type: 'password' }),
        title2label(),
      ],
    },
    radioGroup: { type: IonRadioGroupFCC },
    boolean: { type: IonCheckboxFCC, actions: [title2label()] },
    date: {
      type: IonDatetimeButtonFCC,
    },
    select: { type: IonSelectFCC, actions: [title2label()] },
    toggle: { type: IonToggleFCC, actions: [title2label()] },
    textarea: { type: IonTextareaFCC, actions: [title2label()] },
    object: { type: PiyingViewGroup },
    tuple: { type: PiyingViewGroup },
    div: { type: DivNFCC },
    'common-data': { type: StrOrTemplateComponent },
  },
  wrappers: {
    div: { type: DivWC },
    avatar: { type: IonAvatarWC },
    backdrop: { type: IonBackdropWC },
    chip: { type: IonChipWC },
    col: { type: IonColWC },
    footer: { type: IonFooterWC },
    grid: { type: IonGridWC },
    header: { type: IonHeaderWC },
    'infinite-scroll': { type: IonInfiniteScrollWC },
    loading: { type: IonLoadingWC },
    refresher: { type: IonRefresherWC },
    row: { type: IonRowWC },
    'skeleton-text': { type: IonSkeletonTextWC },
  },
};
