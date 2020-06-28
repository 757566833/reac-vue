declare module '*.css';
declare module '*.less';
declare module '*.png';

interface Window {
    jsmodules?: { [key: string]: any };
    reactAssets?:{ [key: string]: any },
    vueAssets?:{ [key: string]: any },
    httpApi: string;
    JSComponent: any;
    store: any
}

declare const ENV_MODE: 'development' | 'production';


declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
