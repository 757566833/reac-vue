import { IMenuBean, EMenuType, module } from './interface';
const basics: IMenuBean = {
  title: 'menu1',
  type: EMenuType.Header,
  path: '/basics/',
  authority: 'menu1',
  module: module.react,
  children: [
    {
      title: 'submenu1',
      type: EMenuType.SubMenu,
      path: '/basics/enterprise',
      authority: 'submenu1',
      children: [
        {
          title: 'menu11',
          type: EMenuType.Item,
          path: '/basics/enterprise/authentication',
          authority: 'menu11',
        },
        {
          title: 'menu12',
          type: EMenuType.Item,
          path: '/basics/enterprise/menu',
          authority: 'menu12',
        },
      ],
    },
    {
      title: 'submenu2',
      type: EMenuType.SubMenu,
      path: '/basics/test',
      authority: 'submenu2',
      children: [
        {
          title: 'menu21',
          type: EMenuType.Item,
          path: '/basics/test/test1',
          module: module.vue,
          authority: 'menu21',
        },
      ],
    },
  ],
};
export default basics;
