import Vue from 'vue'
import Router from 'vue-router'
import cardIndex from '@/pages/cardIndex'
import profile from '@/pages/profile'
import consume from '@/pages/consume'
import recharge from '@/pages/recharge'
import suiStore from '@/pages/suiStore'
import updatePhone from '@/pages/profile/updatePhone'
import updateInfo from '@/pages/profile/updateInfo'
import updatePwd from '@/pages/profile/updatePwd'
import qrCode from '@/pages/qrCode'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/cardIndex'
    },
    {
      path: '/cardIndex',
      name: 'cardIndex',
      component: cardIndex
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/consume',
      name: 'consume',
      component: consume
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge
    },
    {
      path: '/suiStore',
      name: suiStore,
      component: suiStore
    },
    {
      path: '/qrCode',
      name: 'qrCode',
      component: qrCode
    },
    {
      path: '/updatePhone',
      name: 'updatePhone',
      component: updatePhone
    },
    {
      path: '/updateInfo',
      component: updateInfo
    },
    {
      path: '/updatePwd',
      component: updatePwd
    }
  ]
})
