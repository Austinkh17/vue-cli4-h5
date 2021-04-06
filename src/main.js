import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils/index'
import 'lib-flexible'
import { Button, Tabbar, TabbarItem, Calendar } from 'vant'
import './styles/main.scss'

Vue.config.productionTip = false

Vue.use(utils)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Calendar)

function initRem() {
  const cale = window.screen.availWidth > 750 ? 2 : window.screen.availWidth / 375
  window.document.documentElement.style.fontSize = `${100 * cale}px`
}

window.addEventListener('resize', function() {
  initRem()
})

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
