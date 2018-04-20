import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/read/:path*',
      name: 'Layout',
      component: Layout,
    },
    {
      path: '/loading',
      name: "Loading",
      component: Loading,
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置, 如果之前滚动条不在起始位置，则有 savedPosition
    //console.log("scrollBehavior: " + savedPosition);
    if (!savedPosition) return {x:0, y:0};
  }
})
