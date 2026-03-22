import * as v from 'valibot';
import { NFCSchema, setComponent } from '@piying/view-angular-core';
import { actions } from '@piying/view-angular';
import { RouterOutlet } from '@angular/router';
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
      router: v.pipe(
        NFCSchema,
        setComponent('div'),
        actions.directives.patch([{ type: RouterOutlet }]),
      ),
    }),
    side: v.pipe(
      v.object({
        list: v.pipe(
          NFCSchema,
          setComponent('menu-tree'),
          actions.inputs.patch({
            list: [
              {
                title: 'example',
                type: 'group',
                children: [
                  { title: 'button', router: { routerLink: './example/button' } },
                  { title: 'alert', router: { routerLink: './example/alert' } },
                  { title: 'avatar', router: { routerLink: './example/avatar' } },
                  { title: 'badge', router: { routerLink: './example/badge' } },
                  { title: 'breadcrumbs', router: { routerLink: './example/breadcrumbs' } },
                  { title: 'calendar', router: { routerLink: './example/calendar' } },
                  { title: 'card', router: { routerLink: './example/card' } },
                  { title: 'carousel', router: { routerLink: './example/carousel' } },
                  { title: 'category', router: { routerLink: './example/category' } },
                  { title: 'checkbox', router: { routerLink: './example/checkbox' } },
                  { title: 'divider', router: { routerLink: './example/divider' } },
                  { title: 'dock', router: { routerLink: './example/dock' } },
                  { title: 'drawer', router: { routerLink: './example/drawer' } },
                  { title: 'dropdown', router: { routerLink: './example/dropdown' } },
                  { title: 'editable-badge', router: { routerLink: './example/editable-badge' } },
                  { title: 'editable-group', router: { routerLink: './example/editable-group' } },
                  { title: 'fab', router: { routerLink: './example/fab' } },
                  { title: 'file-input', router: { routerLink: './example/file-input' } },
                  { title: 'file-input-button', router: { routerLink: './example/file-input-button' } },
                  { title: 'form', router: { routerLink: './example/form' } },
                  { title: 'group', router: { routerLink: './example/group' } },
                  { title: 'input-button', router: { routerLink: './example/input-button' } },
                  { title: 'kbd', router: { routerLink: './example/kbd' } },
                  { title: 'loading', router: { routerLink: './example/loading' } },
                  { title: 'logic', router: { routerLink: './example/logic' } },
                  { title: 'menu-tree', router: { routerLink: './example/menu-tree' } },
                  { title: 'pagination', router: { routerLink: './example/pagination' } },
                  { title: 'password', router: { routerLink: './example/password' } },
                  { title: 'progress', router: { routerLink: './example/progress' } },
                  { title: 'radial-progress', router: { routerLink: './example/radial-progress' } },
                  { title: 'radio', router: { routerLink: './example/radio' } },
                  { title: 'range', router: { routerLink: './example/range' } },
                  { title: 'rating', router: { routerLink: './example/rating' } },
                  { title: 'select', router: { routerLink: './example/select' } },
                  { title: 'stat', router: { routerLink: './example/stat' } },
                  { title: 'status', router: { routerLink: './example/status' } },
                  { title: 'steps', router: { routerLink: './example/steps' } },
                  { title: 'swap', router: { routerLink: './example/swap' } },
                  { title: 'table', router: { routerLink: './example/table' } },
                  { title: 'tabs', router: { routerLink: './example/tabs' } },
                  { title: 'textarea', router: { routerLink: './example/textarea' } },
                  { title: 'theme-controller', router: { routerLink: './example/theme-controller' } },
                  { title: 'toggle', router: { routerLink: './example/toggle' } },
                ],
              },

              { title: 'array', router: { routerLink: './component/array' } },
              { title: 'category', router: { routerLink: './component/category' } },
              { title: 'login', router: { routerLink: './component/login' } },
              { title: 'calendar', router: { routerLink: './component/calendar' } },
              { title: 'select', router: { routerLink: './component/select' } },
              { title: 'tabs', router: { routerLink: './component/tabs' } },
              { title: 'card', router: { routerLink: './component/card' } },
              { title: 'stat', router: { routerLink: './component/stat' } },
              { title: 'group', router: { routerLink: './component/group' } },
              { title: 'logic', router: { routerLink: './component/logic' } },
              { title: 'overlay', router: { routerLink: './component/overlay' } },
              { title: 'page-input', router: { routerLink: './component/page-input' } },
              { type: 'divider' },
              {
                type: 'group',
                title: 'PAGE',
                children: [{ title: 'login', router: { routerLink: '/login' } }],
              },
              { type: 'divider' },
              {
                type: 'group',
                title: 'DEMO',
                children: [
                  { title: 'Query Table2', router: { routerLink: './demo/query-table2' } },
                ],
              },
              { type: 'divider' },

              {
                type: 'group',
                title: 'DEMO LINK',
                children: [
                  {
                    router: { routerLink: '/demo1' },
                    title: 'demo1 link',
                  },
                  {
                    router: { routerLink: '/demo2' },
                    title: 'demo2 link',
                  },
                  {
                    title: 'group',
                    type: 'group',
                    children: [
                      {
                        router: { routerLink: '/demo3/child1' },
                        title: 'child1 link',
                      },
                      {
                        router: { routerLink: '/demo3/child2' },
                        title: 'child2 link',
                      },
                    ],
                  },
                  {
                    href: 'https://github.com/piying-org/piying-angular-component',
                    title: 'repo',
                    icon: { svgIcon: 'github' },
                  },
                ],
              },
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
