import * as v from 'valibot';
import { NFCSchema, setComponent } from '@piying/view-angular-core';
import { actions } from '@piying/view-angular';
import { safeDefine } from '@@piying-define';
import {
  FunctionRouterConfig,
  ExampleFormRouterConfig,
  ExampleFieldControlRouterConfig,
  ExampleFieldGroupRouterConfig,
  ExampleNonFieldControlRouterConfig,
  ExampleExtensionRouterConfig,
  OverlayRouterConfig,
  WrapperRouterConfig,
} from '../../const/example.router.define';
export const MainPage = v.pipe(
  v.object({
    content: v.object({
      navbar: v.pipe(
        v.object({
          start: v.object({
            menu: v.pipe(
              NFCSchema,
              setComponent('button'),
              actions.inputs.patch({
                content: { icon: { fontIcon: 'menu' } },
                shape: 'square',
                style: 'ghost',
              }),
              actions.attributes.patch({
                for: 'drawer-0',
              }),
            ),
          }),
        }),
        setComponent('navbar'),
        actions.class.top('sticky top-0 bg-base-100 z-9'),
      ),
      router: v.pipe(NFCSchema, safeDefine.setComponent('router-outlet')),
    }),
    side: v.pipe(
      v.object({
        list: v.pipe(
          NFCSchema,
          setComponent('menu-tree'),
          actions.inputs.patch({
            list: [
              {
                title: 'field-control',
                type: 'group',
                children: ExampleFieldControlRouterConfig.map((item) => item.config),
              },
              {
                title: 'field-group',
                type: 'group',
                children: ExampleFieldGroupRouterConfig.map((item) => item.config),
              },
              {
                title: 'non-field-control',
                type: 'group',
                children: ExampleNonFieldControlRouterConfig.map((item) => item.config),
              },
              {
                title: 'wrapper',
                type: 'group',
                children: WrapperRouterConfig.map((item) => item.config),
              },
              {
                title: 'extension',
                type: 'group',
                children: ExampleExtensionRouterConfig.map((item) => item.config),
              },
              {
                title: 'form',
                type: 'group',
                children: ExampleFormRouterConfig.map((item) => item.config),
              },
              {
                title: 'overlay',
                type: 'group',
                children: OverlayRouterConfig.map((item) => item.config),
              },
              {
                title: 'function',
                type: 'group',
                children: FunctionRouterConfig.map((item) => item.config),
              },

              { type: 'divider' },

              {
                href: 'https://github.com/piying-org/piying-angular-component',
                title: 'repo',
                icon: { svgIcon: 'github' },
              },
              { type: 'divider' },

              {
                type: 'group',
                title: 'IONIC(dev)',
                children: [{ title: 'dev', router: { routerLink: './ionic/dev' } }],
              },
              // {
              //   type: 'group',
              //   title: 'mobile-dev',
              //   children: [{ title: 'dev', router: { routerLink: './mobile/dev' } }],
              // },
            ],
          }),
          actions.class.top('min-w-[250px]'),
        ),
      }),
      actions.wrappers.set([{ type: 'div' }]),
      actions.class.top('bg-base-100 h-full z-9'),
    ),
  }),
  setComponent('drawer'),
  actions.inputs.patch({
    contentClass: 'flex flex-col *:last:flex-1',
  }),
  actions.class.top('lg:drawer-open'),
);
