import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

import toast from 'components/common/toast'



Vue.config.productionTip = false

//安装事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.gif')
})

//使用图片预览
Vue.use(preview)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
