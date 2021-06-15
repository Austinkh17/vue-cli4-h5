import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils/index'
import './utils/rem'
import { Button, Tabbar, TabbarItem, Calendar } from 'vant'
import './styles/main.scss'

Vue.config.productionTip = false

Vue.use(utils)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Calendar)

router.beforeEach((to, from, next) => {
  to.meta.title && (document.title = to.meta.title)
  const userInfo = sessionStorage.getItem('userInfo') || null
  if (!userInfo && to.meta.auth) {
    next('/login')
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
