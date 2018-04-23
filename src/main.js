// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './app.css';

import cm from './components/common/js'

// 引入自定义组件
import AppBtn from './components/common/AppBtn'

// 注册自定义组件
Vue.component('AppBtn', AppBtn);

Vue.config.productionTip = false
Vue.use(iView);

// 初始化全局通信总线
cm.bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})