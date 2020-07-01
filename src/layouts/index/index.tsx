import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Tabs } from 'antd';
import './styles.scss';
const { TabPane } = Tabs;
import menu from '@/menu';
import { EMenuType, IMenuBean } from '@/menu/interface';
import Body from '../components/body';
import { useDispatch } from 'react-redux';
// 根据url获取当前有没有这个tab
const getTab = (url: string): IMenuBean | undefined => {
  if (url == '/') {
    return undefined;
  }
  let result: IMenuBean | undefined = undefined;
  let stop = false;
  let index = 0;
  let _menu: IMenuBean[] | undefined = menu;
  while (!stop) {
    if (!_menu || !_menu[index]) {
      return;
    }
    if (url == _menu[index].path && EMenuType.Item != _menu[index].type) {
      return;
    } else if (url.startsWith(_menu[index].path) &&
    _menu[index].type == EMenuType.Item) {
      result = _menu[index];
      stop = true;
    } else if (url.startsWith(_menu[index].path)) {
      _menu = _menu[index].children;
      index = 0;
    } else {
      index++;
    }
  }

  return result;
};
const Index: React.FC = () => {
  const dispatch = useDispatch();
  const [tabs, setTabs] = useState<{
    title: string, key: string, id: string
   }[]>([]);
  const history = useRef<{url:string}[]>([]);
  const [activeKey, setActiveKey] = useState<null | string>(null);
  const lastTab = useRef('');
  const url = useRouteMatch().url;
  useEffect(() => {
    const activeTab = getTab(url);
    let hastab = false;
    for (const iterator of tabs) {
      if (iterator.key == activeTab?.path) {
        hastab = true;
        break;
      }
    }
    if (activeTab) {
      setActiveKey(activeTab.path);
      lastTab.current = activeTab.path;
      if (!hastab) {
        setTabs(
            [...tabs,
              {
                title: activeTab.title,
                key: activeTab.path,
                id: activeTab.path,
              },
            ],
        );
      }
    }
  }, [dispatch, history, tabs, url]);

  const routerHistory = useHistory();
  const tabsClick = (url: string) => {
    routerHistory.push(url);
    // props.history.block()
  };
  const pushHistory=useCallback(()=>{
    history.current.push({ url: url });
  }, [url]);
  useEffect(()=>{
    pushHistory();
  }, [pushHistory, url]);
  const edit = (
      targetKey: React.MouseEvent | React.KeyboardEvent | string,
      action: 'add' | 'remove',
  ) => {
    console.log(targetKey, action);
    if (action == 'remove') {
      let index: null | number = null;
      console.log(tabs, targetKey);
      tabs.forEach((item, i) => {
        if (item.key == targetKey) {
          index = i;
          return;
        }
      });
      console.log(index);
      if (index != null) {
        if (activeKey == targetKey) {
          const reHistory = history.current.reverse();
          reHistory.shift();
          console.log('yes', reHistory);
          for (const iterator of reHistory) {
            let findLast = false;
            for (const tab of tabs) {
              if (tab.key==iterator.url) {
                routerHistory.push(iterator.url);
                findLast = true;
                break;
              }
            }
            if (findLast) {
              break;
            }
          }
          // routerHistory.push(history[]);
        }
        const newtabs = [...tabs.slice(0, index), ...tabs.slice(index + 1)];
        console.log(newtabs);
        setTabs(newtabs);
        if (window.jsmodules && typeof targetKey == 'string') {
          window.jsmodules[targetKey.replace(/\//g, '')].unRender();
        }
      }
    }
  };

  // const activeKey2 = activeKey ? activeKey.path : lastTab.current
  const showKey = activeKey ? activeKey : lastTab.current;
  return (
    <div className='egu-saas-layout-content'>
      <Tabs
        hideAdd={true}
        type="editable-card"
        activeKey={showKey}
        onTabClick={tabsClick}
        onEdit={edit}
        className='egu-saas-layout-content-tabs flex'
      >
        {tabs.map((pane) => (
          <TabPane
            forceRender={true}
            tab={pane.title}
            key={pane.key}
            className={`
                        egu-saas-layout-content-tabs-tabpane
                        ${activeKey == pane.key ?
                        'egu-saas-layout-content-tabs-tabpane-height-max' :
                          ''}`
            }
          >
            {/* 最终渲染用的组件 */}
            <Body id={pane.id} />
          </TabPane>
        ))}
      </Tabs>

    </div>

  );
};

export default Index;
