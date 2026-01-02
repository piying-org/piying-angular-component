import {
  Component,
  computed,
  provideZonelessChangeDetection,
  reflectComponentType,
  signal,
  Type,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { PiyingView } from '@piying/view-angular';
import { PiViewConfig } from '@piying/view-angular';
import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { FieldArray, FieldControl, FieldGroup } from '@piying/view-angular-core';
import { PiyingViewGroup } from '@piying/view-angular';
import * as NFCCGroup from '@piying/angular-daisyui/non-field-control';
import * as FCCGroup from '@piying/angular-daisyui/field-control';
import * as FGCGroup from '@piying/angular-daisyui/field-group';
import * as WrapperGroup from '@piying/angular-daisyui/wrapper';
import * as v from 'valibot';
import { CSSClassPrefixToken, ThemeService } from '@piying/angular-daisyui/service';
import { provideRouter } from '@angular/router';
import { ExtComponentGroup, ExtWrapperGroup } from '@piying/angular-daisyui/extension';

export type Schema2 =
  | v.BaseSchema<any, any, any>
  | v.SchemaWithPipe<
      readonly [
        v.BaseSchema<any, any, any>,
        ...(v.BaseSchema<any, any, any> | v.PipeAction<any, any, v.BaseIssue<unknown>>)[],
      ]
    >;
const selectorPrefix = 'app-';
export async function createSchemaComponent(
  schema: WritableSignal<Schema2>,
  model: WritableSignal<any>,
  options?: {
    context?: any;
    fieldGlobalConfig?: PiViewConfig;
  },
  moduleOptions?: TestModuleMetadata,
) {
  const list = [
    ...Object.values(NFCCGroup),
    ...Object.values(FCCGroup),
    ...Object.values(FGCGroup),
    ...Object.values(ExtComponentGroup),
  ] as Type<any>[];
  const defaultWrapper = [...Object.values(WrapperGroup), ...Object.values(ExtWrapperGroup)].reduce(
    (obj, item) => {
      const result = reflectComponentType(item);
      if (!result) {
        return obj;
      }
      obj[
        result.selector.startsWith(selectorPrefix)
          ? result.selector.slice(selectorPrefix.length)
          : result.selector
      ] = {
        type: item,
      };
      return obj;
    },
    {} as Record<string, any>,
  );

  const defaultComp = list.reduce(
    (obj, item) => {
      const result = reflectComponentType(item);
      if (!result) {
        return obj;
      }

      obj[result.selector.slice(selectorPrefix.length)] = {
        type: item,
      };
      return obj;
    },
    {} as Record<string, any>,
  );
  @Component({
    template: `<piying-view
      [schema]="schema$()"
      [(model)]="model$"
      (modelChange)="mdChange()"
      [options]="options"
      #view
    ></piying-view>`,
    standalone: true,
    imports: [PiyingView],
  })
  class TestComp {
    view = viewChild.required('view', { read: PiyingView });
    field$$ = computed(() => this.view().resolvedField$());
    form$ = computed(() => this.view()?.form$$() as FieldGroup | FieldArray | FieldControl);
    schema$ = schema;
    model$ = model;
    options = {
      ...options,
      fieldGlobalConfig: {
        ...options?.fieldGlobalConfig,
        types: {
          object: {
            type: PiyingViewGroup,
          },
          loose_object: {
            type: PiyingViewGroup,
          },
          intersect: {
            type: PiyingViewGroup,
          },
          union: {
            type: PiyingViewGroup,
          },
          array: {
            type: PiyingViewGroup,
          },
          tuple: {
            type: PiyingViewGroup,
          },
          'intersect-group': {
            type: PiyingViewGroup,
          },
          ...defaultComp,
          string: {
            type: FCCGroup.InputFCC,
          },
          ...options?.fieldGlobalConfig?.types,
        },
        wrappers: {
          ...defaultWrapper,
        },
      },
    };
    changeIndex$ = signal(0);
    resolvedField$ = computed(() => this.view()?.resolvedField$());
    mdChange() {
      this.changeIndex$.update((index) => index + 1);
    }
  }
  await TestBed.configureTestingModule({
    imports: [TestComp],
    providers: [
      provideZonelessChangeDetection(),
      ThemeService,
      { provide: CSSClassPrefixToken, useValue: 'pc-' },
      provideRouter([]),
    ],
    ...moduleOptions,
  }).compileComponents();
  const fixture = TestBed.createComponent(TestComp);
  await fixture.whenStable();
  fixture.detectChanges();
  return {
    fixture: fixture,
    instance: fixture.componentInstance,
    element: fixture.nativeElement as HTMLElement,
    field$$: fixture.componentInstance.field$$,
  };
}
