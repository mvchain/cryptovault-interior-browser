import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/adminManage',
    component: Layout,
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/Admin/index'),
        meta: { title: '管理员设置', icon: 'user' }
      }
    ]
  },
  {
    path: '/RWManage',
    component: Layout,
    redirect: '/RWManage/withdraw',
    name: 'RWManage',
    meta: { title: '充提管理', icon: 'nested' },
    children: [
      {
        path: 'withdraw',
        name: 'Withdraw',
        component: () => import('@/views/Withdraw/index'),
        meta: { title: '提币管理', icon: 'nested' }
      },
      {
        path: 'recharge',
        name: 'Recharge',
        component: () => import('@/views/Recharge/index'),
        meta: { title: '充值管理', icon: 'nested' }
      }
    ]
  },
  {
    path: '/crowdfunding',
    component: Layout,
    redirect: '/crowdfunding/project',
    name: 'Crowdfunding',
    meta: { title: '众筹管理', icon: 'table' },
    children: [
      {
        path: 'project',
        name: 'Project',
        component: () => import('@/views/Project/index'),
        meta: { title: '项目管理', icon: 'table' }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/Order/index'),
        meta: { title: '订单管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/tokenManage',
    component: Layout,
    children: [
      {
        path: 'token',
        name: 'Token',
        component: () => import('@/views/Token/index'),
        meta: { title: '币种管理', icon: 'tree' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  routes: constantRouterMap
})
