import React, { useEffect, useState, useCallback } from 'react';
// import system from 'systemjs/dist/system.js';
import './styles.scss';
import { Spin } from 'antd';
import { Http } from '@/http';
import { useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import { modulePath } from '@/config';
import { IState } from '@/redux/state';
import styled from 'styled-components';
const Padding = styled.div`
    height:100%;
    padding:12px
`;
const Body: React.FC<{ id: string }> = React.memo((props) => {
  console.log('body');
  const url = useRouteMatch().url;
  const moduleMap = useSelector(useCallback(
      (storeData:IState) => storeData.moduleMap
      , []),
  );
  const [loading, setLoading] = useState(false);
  const reRender =useCallback( () => {
    // 判断是为了迎合ts 理论上走到这个函数一定会有 jsmodules
    if (window.jsmodules) {
      try {
        window.jsmodules[props.id.replace(/\//g, '')].render();
      } catch (error) {
        console.log(error);
      }
    }
  }, [props.id]);
  const getComponent = useCallback(()=>{
    const module = new window.JSComponent(props.id.replace(/\//g, ''));

    if (window.jsmodules) {
      window.jsmodules[props.id.replace(/\//g, '')] = module;
    } else {
      window.jsmodules = {};
      window.jsmodules[props.id.replace(/\//g, '')] = module;
    }
    setLoading(false);
    reRender();
  }, [props.id, reRender]);

  const getComponetUrl =useCallback( (json:{[key:string]:any}, type:'r'|'v') => {
    console.log('getComponetUrl', json, props.id.replace(/\//g, ''));
    // 理论上走到这里必然会有asset
    const moduleJson = json[props.id.replace(/\//g, '')];
    if (moduleJson) {
      setLoading(true);
      if (moduleJson.js) {
        const modules = document.createElement('script');
        // 创建script标签;
        modules.type = 'text/javascript';
        modules.src = `${modulePath[type][ENV_MODE]}${moduleJson.js}`;
        modules.onload = getComponent; // 引入url;
        document.body.appendChild(modules);
      }
      if (moduleJson.css) {
        if (!document.getElementById(`${props.id.replace(/\//g, '')}css`)) {
          const link = document.createElement('link');
          link.type = 'text/css';
          link.rel = 'stylesheet';
          link.href = `${modulePath[type][ENV_MODE]}${moduleJson.css}`;
          link.id = `${props.id.replace(/\//g, '')}css`;
          document.body.appendChild(link);
        }
      }
    }
  }, [getComponent, props.id]);
  const getAsset = useCallback(async (type:'r'|'v') => {
    const modoleJson = await Http.getStatic(type);
    const json:{ [key: string]: any } = modoleJson?.text||{};
    switch (type) {
      case 'r':
        window.reactAssets = json;
        break;
      case 'v':
        window.vueAssets = json;
        break;

      default:
        break;
    }
    getComponetUrl(json, type);
  }, [getComponetUrl]);
  useEffect(() => {
    // 如果有静态文件的目录   如果有module的实体 且实体内有当然的模块实体
    console.log('useEffect', moduleMap);
    if (moduleMap) {
      const type = moduleMap[url];
      const jsmodules = window.jsmodules;
      const vueAssets = window.vueAssets;
      const reactAssets = window.reactAssets;
      if (
        (type=='r'&&reactAssets||type=='v'&&vueAssets)&&
        jsmodules&&
        jsmodules[props.id.replace(/\//g, '')]
      ) {
        reRender();
      } else if (type=='r'&&reactAssets) {
        // 如果只有静态文件
        getComponetUrl(reactAssets, type);
      } else if (type=='v'&&vueAssets) {
        getComponetUrl(vueAssets, type);
      } else {
        // 如果啥也没有
        console.log('getAsset');
        getAsset(type);
      }
    }
  }, [props.id, moduleMap, getComponetUrl, getAsset, reRender, url]);
  // window.sys
  return (
    <div className='egu-saas-layout-body'>
      <Spin spinning={loading} >
        <Padding>
          <div className='egu-saas-layout-root' id={props.id.replace(/\//g, '')} />
        </Padding>

      </Spin>
    </div>


  );
}, () => true);
Body.displayName = 'Body';
export default Body;
