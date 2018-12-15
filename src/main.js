import App from './App.vue'

//引入全局样式,这是自定义的全局样式，可以没有
import './assets/styles/global.less';

//引入路由
import router from './router/router'

//引入全局状态树,并设置到全局$store
import store from "./store/index"
Vue.prototype.$store=store;


//全局设置elementUI尺寸为最小
Vue.prototype.$ELEMENT = { size: 'mini'};





new Vue({
  el: '#app',
    router,
  render: h => h(App)
})
