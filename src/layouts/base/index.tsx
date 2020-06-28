
import React, { useEffect, useCallback, useState } from 'react';
import './styles.scss';
import { Layout, Menu, Spin } from 'antd';
import Index from '@/layouts/index/index';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
import { IMenuBean, EMenuType } from '@/menu/interface';
import menu from '@/menu/index';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  getWebAuthority,
} from '@/services';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '@/redux/state';
import {
  setMenusOnBase,
  setAuthorityMapOnBase,
  setModuleMapOnBase,
} from '@/redux/action';

const mapAuthorityAndModule = (
    data: IMenuBean[],
    authorityMap: { [key: string]: boolean },
    moduleMap: { [key: string]: 'r' | 'v' },
): IMenuBean[] => {
  const menuData: IMenuBean[] = [];
  data.forEach((item) => {
    const obj = item.authority === undefined || authorityMap[item.authority];
    moduleMap[item.path] = item.module || 'r';
    if (!obj && item.type !== EMenuType.NoMenu) {
      return;
    }
    const call = { ...item };
    if (item.children) {
      call.children = mapAuthorityAndModule(
          item.children,
          authorityMap,
          moduleMap,
      );
      if (call.children.length === 0) {
        return;
      }
    }
    menuData.push(call);
  });
  return menuData;
};
const HeaderDom: React.FC = () => {
  const menus = useSelector(
      useCallback((storeData: IState) => storeData.menus, []),
  );
  const url = useRouteMatch().url;
  const [selected, setSelected] = useState(
    url.split('/')[1] ? url.split('/')[1] : '',
  );
  // let selected = ''
  // if (url.split('/')[1]) {
  //     selected = url.split('/')[1]
  // }
  useEffect(() => {
    if (url.split('/')[1]) {
      setSelected(url.split('/')[1]);
    }
  }, [url]);
  return <Header className='egu-layout-header flex' >
    {menus.map((item) => {
      return <Link
        key={item.path}
        to={item.path}
        className={
          `egu-layout-header-item ${selected == item.path.replace('/', '') ?
          'egu-layout-header-item-selected' : ''}`
        }
      >
        {item.title}
      </Link>;
    })}
  </Header>;
};
const HeaderMemo = React.memo(HeaderDom, () => {
  return true;
});

const getSelectedKey = (url: string, array: string[] = []) => {
  url = url.split('?')[0];
  if (url[url.length - 1] != '/') {
    url += '/';
  }
  const ex = /\/(.+?)\//;
  const data = url.match(ex);
  if (data) {
    const item = data[0].slice(0, data[0].length - 1);

    if (array.length == 0) {
      array.push(item);
    } else {
      array.push(`${array[array.length - 1]}${item}`);
    }


    url = url.replace(item, '');
    getSelectedKey(url, array);
  }
  return array;
};

const MenuDom: React.FC = () => {
  const menus = useSelector(
      useCallback((storeData: IState) => storeData.menus, []),
  );
  const [menu, setMenu] = useState<IMenuBean[]>([]);
  const url = useRouteMatch().url;
  const getMenu = useCallback(() => {
    let selected = '';
    if (url.split('/')[1]) {
      selected = url.split('/')[1];

      let _menu: IMenuBean[] | undefined = [];
      for (const iterator of menus) {
        if (iterator.path.replace(/\//g, '') == selected) {
          _menu = iterator.children;
        }
      }
      if (_menu) {
        setMenu(_menu);
      }
    }
  }, [menus, url]);
  useEffect(() => {
    getMenu();
  }, [url, menus, getMenu]);


  const renderMenu = (item: IMenuBean) => {
    if (item.type == EMenuType.Item) {
      return <Menu.Item key={item.path}>
        <Link to={item.path}>{item.title}</Link>
      </Menu.Item>;
    } if (item.type == EMenuType.SubMenu) {
      return <SubMenu
        key={item.path}
        title={
          <span>
            <span>{item.title}</span>
          </span>
        }
      >
        {item.children && item.children.map((item) => {
          return renderMenu(item);
        })}
      </SubMenu>;
    }
  };
  const value = getSelectedKey(url);

  return <Menu
    selectedKeys={value}
    defaultOpenKeys={value}
    theme="dark"
    mode="inline"
    defaultSelectedKeys={['1']}>
    {menu.map((item) => {
      return renderMenu(item);
    })}
  </Menu>;
};
const MenuMemo = React.memo(MenuDom, () => {
  return true;
});

const Base: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getAuthority =useCallback( async () => {
    setLoading(true);
    const authorityMap = await getWebAuthority();
    const moduleMap: { [key: string]: 'r' | 'v' } = {};
    const menus = mapAuthorityAndModule(menu, authorityMap, moduleMap);
    dispatch(setMenusOnBase(menus));
    dispatch(setAuthorityMapOnBase(authorityMap));
    dispatch(setModuleMapOnBase(moduleMap));
    setLoading(false);
  }, [dispatch]);
  useEffect(() => {
    getAuthority();
  }, [getAuthority]);
  return (
    <>
      <Spin
        size='large'
        spinning={loading}
        className={loading ?
      'egu-layout-loading max-HW' : 'disappear'
        }
        wrapperClassName={loading ?
        'egu-layout-loading-wrapper max-HW' :
         'disappear'
        }>
        <div className='max_HW' />
      </Spin>
      <Layout
        className={!loading ?'egu-layout' :'disappear'}
        style={{ height: '100vh' }}
      >
        <Sider>
          <div className='egu-layout-logo flex' />
          <MenuMemo />
        </Sider>
        <Layout className={'site-layout'}>
          <HeaderMemo />
          <Content>
            <Index />
          </Content>
        </Layout>
      </Layout>

      {/* </Spin> */}
    </>
  );
};
export default Base;

