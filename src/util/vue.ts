import Vue, { VueConstructor } from 'vue';
import CombinedVueInstance from 'vue/types';
export const vueHOC = (vue:VueConstructor)=>{
  return class JSComponent {
    id: string
    timmer: NodeJS.Timeout | null | number
    vue:CombinedVueInstance
    /**
     * Create a point.
     * @param {string} id 字符串 标示着唯一值
     */
    constructor(id: string) {
      this.id = id;
      this.timmer = null;
      this.vue = new Vue({
        render: (h) => h(vue),
      });
    }
    /**
     * 最终的渲染函数
     */
    renderDom() {
      if (window.document.querySelector(`#${this.id}`)) {
        this.vue.$mount(`#${this.id}`);
      }
    }
    /**
     * 渲染逻辑层，主要是为了兼容 浏览器空闲时间的api 否则会造成某些情况下不渲染的bug
     */
    render() {
      this.renderDom();
      this.timmer = setInterval(() => {
        this.renderDom();
        if (window.document.querySelector(`#${this.id}`)?.childElementCount != 0) {
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
      console.log('vue unRender');
      this.vue.$destroy();
    }
  };
};
