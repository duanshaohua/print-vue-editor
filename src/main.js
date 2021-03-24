import 'element-ui/lib/theme-chalk/index.css';
// import Vue from 'vue/dist/vue';
import Vue from 'vue'
import ElementUI from 'element-ui';
import App from './App.vue';
import './assets/style.less';
import Print from 'vue-print-nb'
Vue.use(Print);
Vue.use(ElementUI, { size: 'small' });
// 注册对象映射方法
Vue.prototype.$map = (to, from, checkKey = true) => {
  if (from != null) {
    for (let key in from) {
      if (checkKey) {
        if (key in to) {
          to[key] = from[key];
        }
      } else {
        to[key] = from[key];
      }
    }
  }
}

new Vue({
  render: h => h(App),
}).$mount('#app');
