import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';


interface component{

}
/**
 *
 * @param {React.FC} ReactModule react每个模块的工厂
 * @return {component} 工具类 工厂模式
 */
export const reactHOC = (ReactModule: React.FC):component => {
  return class JSComponent {
    id: string
    timmer: NodeJS.Timeout | null | number
    /**
     * Create a point.
     * @param {string} id 字符串 标示着唯一值
     */
    constructor(id: string) {
      this.id = id;
      this.timmer = null;
    }
    /**
     * 最终的渲染函数
     */
    renderDom() {
      if (document.getElementById(this.id)) {
        ReactDOM.render(
            <ConfigProvider locale={zhCN}>
              <ReactModule />
            </ConfigProvider>

            , document.getElementById(this.id));
      }
    }
    /**
     * 渲染逻辑层，主要是为了兼容 浏览器空闲时间的api 否则会造成某些情况下不渲染的bug
     */
    render() {
      this.renderDom();
      this.timmer = setInterval(() => {
        this.renderDom();
        if (document.getElementById(this.id)?.childElementCount != 0) {
          if (this.timmer) {
            clearInterval(Number(this.timmer));
            this.timmer = null;
          }
        }
      }, 200);
    }
    /**
     * 卸载函数
     */
    unRender() {
      const dom = document.getElementById(this.id);

      if (dom) {
        console.log('react unRender');
        const aaa = ReactDOM.unmountComponentAtNode(dom);
        console.log(aaa);
      }
    }
  };
};

