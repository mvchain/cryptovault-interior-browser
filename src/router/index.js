import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_production')
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/AdministratorSettings',
    component: Layout,
    redirect: '/AdministratorSettings/Setting',

    name: 'AdministratorSettings',
    meta: { title: '设置', icon: 'teacher', adminType: '0/1/2/3' },
    children: [
      {
        path: 'Setting',
        name: 'Setting',
        component: _import('AdministratorSettings/index'),
        meta: { title: '管理员设置', icon: 'teacher', adminType: '0/1/2/3' }
      }
    ]
  },
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/user',
    name: 'userManage',
    meta: { title: '用户', icon: 'teacher', adminType: '0/1' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: _import('userManage/user'),
        meta: { title: '用户管理', icon: 'teacher', adminType: '0/1' }
      }
    ]
  },
  {
    path: '/rechargeWithdraw',
    component: Layout,
    redirect: '/rechargeWithdraw/recharge',
    name: 'rechargeWithdraw',
    meta: { title: '充提管理', icon: 'dragstore', adminType: '0/1/2/3' },
    children: [
      {
        path: 'recharge',
        name: 'recharge',
        component: _import('rechargeWithdraw/recharge'),
        meta: { title: '充值记录', icon: 'dragstore', adminType: '0/1/2/3' }
      },
      {
        path: 'withdraw',
        name: 'withdraw',
        component: _import('rechargeWithdraw/withdraw'),
        meta: { title: '提币记录', icon: 'dragstore', adminType: '0/1/2/3' }
      },
    ]
  },
  {
    path: '/crowdfunding',
    component: Layout,
    redirect: '/crowdfunding/project',
    name: 'crowdfunding',
    meta: { title: '众筹管理', icon: 'wallet', adminType: '0/1' },
    children: [
      {
        path: 'project',
        name: 'project',
        component: _import('crowdfunding/project'),
        meta: { title: '项目管理', icon: 'wallet', adminType: '0/1' }
      },
      {
        path: 'order',
        name: 'order',
        component: _import('crowdfunding/order'),
        meta: { title: '订单提现', icon: 'wallet', adminType: '0/1' }
      }
    ]
  },
  {
    path: '/tokenManage',
    component: Layout,
    redirect: '/tokenManage/token',
    name: 'tokenManage',
    meta: { title: '币种', icon: 'teacher', adminType: '0/1' },
    children: [
      {
        path: 'token',
        name: 'token',
        component: _import('tokenManage/token'),
        meta: { title: '币种管理', icon: 'teacher', adminType: '0/1' }
      }
    ]
  },

  {
    path: '/transaction',
    component: Layout,
    redirect: '/transaction/rechargeData',
    name: 'dataStatistics',
    meta: { title: '交易管理', icon: 'list', adminType: '0/1/2/3' },
    children: [
      {
        path: 'pending',
        name: 'pending',
        component: _import('transaction/pending'),
        meta: { title: '挂单记录', icon: 'list', adminType: '0/1/2/3' }
      },
      {
        path: 'carryOut',
        name: 'carryOut',
        component: _import('transaction/carryOut'),
        meta: { title: '成交记录', icon: 'list', adminType: '0/1/2/3' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

