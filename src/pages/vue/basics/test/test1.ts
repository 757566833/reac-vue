import Vue from 'vue';
import App from './App.vue';
import { vueHOC } from '@/util/vue';

Vue.config.productionTip = false;

export const JSComponent = vueHOC(App);
