import { PiyingViewGroup } from '@piying/view-angular';
import { RouterOutlet } from '@angular/router';
import { DivNFCC, DivWC, StrOrTemplateComponent } from '@piying-lib/angular-core';
import { actions } from '@piying/view-angular';

// 核心包装器
import * as WCGroup from '@piying-lib/angular-daisyui/wrapper';
import * as NFCCGroup from '@piying-lib/angular-daisyui/non-field-control';
import * as FCCGroup from '@piying-lib/angular-daisyui/field-control';
import * as FGCGroup from '@piying-lib/angular-daisyui/field-group';
import { ExtComponentGroup, ExtWrapperGroup } from '@piying-lib/angular-daisyui/extension';
/**
 * 文档/document https://github.com/piying-org/piying-angular-component/blob/main/projects/daisyui/preset/define.ts */
export const PresetDefine = {
  types: {
    calendar: { type: FCCGroup.CalendarFCC },
    boolean: {
      type: FCCGroup.CheckboxFCC,
      actions: [
        actions.wrappers.set(['label-wrapper']),
        actions.props.patch({
          labelPosition: 'right',
        }),
      ],
    },
    checkbox: {
      type: FCCGroup.CheckboxFCC,
      actions: [
        actions.wrappers.set(['label-wrapper']),
        actions.props.patch({
          labelPosition: 'right',
        }),
      ],
    },
    'editable-badge': { type: FCCGroup.EditableBadgeFCC },
    'file-input': { type: FCCGroup.FileInputFCC },

    // 基础类型
    input: {
      type: FCCGroup.InputFCC,
      actions: [actions.wrappers.set(['label-wrapper'])],
    },
    string: {
      type: FCCGroup.InputFCC,
      actions: [actions.wrappers.set(['label-wrapper'])],
    },
    number: {
      type: FCCGroup.InputFCC,
      actions: [actions.inputs.set({ type: 'number' }), actions.wrappers.set(['label-wrapper'])],
    },
    date: {
      type: FCCGroup.InputFCC,
      actions: [actions.inputs.set({ type: 'date' }), actions.wrappers.set(['label-wrapper'])],
    },
    password: { type: FCCGroup.PasswordInputFCC },
    radio: {
      type: FCCGroup.RadioFCC,
      actions: [actions.wrappers.set(['label-wrapper'])],
    },
    range: {
      type: FCCGroup.RangeFCC,
      actions: [actions.wrappers.set(['label-wrapper'])],
    },
    rating: { type: FCCGroup.RatingFCC },
    select: {
      type: FCCGroup.SelectFCC,
      actions: [actions.wrappers.set(['label-wrapper'])],
    },
    picklist: {
      type: FCCGroup.SelectFCC,
      actions: [actions.wrappers.set(['label-wrapper'])],
    },
    swap: { type: FCCGroup.SwapFCC },
    textarea: {
      type: FCCGroup.TextareaFCC,
      actions: [actions.wrappers.set(['label-wrapper'])],
    },

    toggle: {
      type: FCCGroup.ToggleFCC,
      actions: [
        actions.wrappers.set(['label-wrapper']),
        actions.props.patch({
          labelPosition: 'right',
        }),
      ],
    },

    // 非字段控件
    alert: { type: NFCCGroup.AlertNFCC },
    avatar: { type: NFCCGroup.AvatarNFCC },
    badge: { type: NFCCGroup.BadgeNFCC },
    breadcrumbs: { type: NFCCGroup.BreadcrumbsNFCC },
    button: { type: NFCCGroup.ButtonNFCC },
    divider: { type: NFCCGroup.DividerNFCC },
    dropdown: { type: NFCCGroup.DropdownNFCC },
    fab: { type: NFCCGroup.FabNFCC },
    'file-input-button': { type: NFCCGroup.FileInputButtonNFCC },
    'input-button': { type: NFCCGroup.InputButtonNFCC },
    kbd: { type: NFCCGroup.KbdNFCC },
    loading: { type: NFCCGroup.LoadingNFCC },
    progress: { type: NFCCGroup.ProgressNFCC },
    'radial-progress': { type: NFCCGroup.RadialProgressNFCC },
    stat: { type: NFCCGroup.StatNFCC },
    status: { type: NFCCGroup.StatusNFCC },
    'theme-controller': { type: NFCCGroup.ThemeControllerNFCC },
    // 字段组
    accordion: { type: FGCGroup.AccordionFGC },
    card: { type: FGCGroup.CardFGC },
    carousel: { type: FGCGroup.CarouselFGC },
    dock: { type: FGCGroup.DockFGC },
    drawer: { type: FGCGroup.DrawerFGC },
    list: { type: FGCGroup.ListFGC },
    navbar: { type: FGCGroup.NavbarFGC },
    steps: { type: FGCGroup.StepsFGC },
    tabs: { type: FGCGroup.TabsFGC },
    // 扩展组件
    'checkbox-list': { type: ExtComponentGroup.CheckboxListFGC },
    'editable-group': { type: ExtComponentGroup.EditableArrayFGC },
    'list-template': { type: ExtComponentGroup.ListTemplateNFCC },
    'logic-group': { type: ExtComponentGroup.logicGroupFGC },
    'menu-tree': { type: ExtComponentGroup.MenuTreeNFCC },
    'option-list': { type: ExtComponentGroup.OptionListFCC },
    pagination: { type: ExtComponentGroup.PaginationNFCC },
    'picker-ref': { type: ExtComponentGroup.PickerRefFCC },
    table: { type: ExtComponentGroup.TableNFCC },
    tr: { type: ExtComponentGroup.TableRowFGC },
    'table-expand-cell': { type: ExtComponentGroup.TableExpandOneTableCell },
    // 特殊类型
    'router-outlet': { type: DivNFCC, actions: [actions.directives.set([{ type: RouterOutlet }])] },
    object: { type: PiyingViewGroup },
    div: { type: DivNFCC },
    'common-data': { type: StrOrTemplateComponent },
    'filter-option': {
      type: ExtWrapperGroup.FilterOptionNFCC,
    },
    'dock-tab': {
      type: ExtComponentGroup.DockTabNFCC,
    },
  },
  wrappers: {
    // 默认包装器
    // 和group冲突,应该去掉group
    fieldset: { type: WCGroup.FieldsetWC },
    form: { type: WCGroup.FormWC },
    'label-wrapper': { type: WCGroup.LabelWC },
    'loading-wrapper': { type: WCGroup.LoadingWC },
    'validate-tooltip-wrapper': { type: WCGroup.ValidateTooltipbWC },
    td: { type: WCGroup.TdWC },
    th: { type: WCGroup.ThWC },
    div: { type: DivWC },
    // 扩展包装器
    'sort-header': { type: ExtWrapperGroup.SortHeaderWC },
    'table-checkbox-all': { type: ExtWrapperGroup.TableCheckboxAllWC },
    'table-checkbox-body': { type: ExtWrapperGroup.TableCheckboxOneWC },
    'local-filter': { type: ExtWrapperGroup.OptionListLocalFilterWC },
  },
};
