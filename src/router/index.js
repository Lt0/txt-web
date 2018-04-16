import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:file/:caption?',
      name: 'Layout',
      component: Layout,
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置, 如果之前滚动条不在起始位置，则有 savedPosition
    if (!savedPosition) return {x:0, y:0};
  }
})
