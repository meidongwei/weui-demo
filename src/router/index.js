import Vue from 'vue'
import Router from 'vue-router'
import cardIndex from '@/pages/cardIndex'
import profile from '@/pages/profile'
import consume from '@/pages/consume'
import recharge from '@/pages/recharge'
import suiStore from '@/pages/suiStore'
import updatePhone from '@/pages/profile/updatePhone'
import updatePhone2 from '@/pages/profile/updatePhone2'
import updateInfo from '@/pages/profile/updateInfo'
import updatePwd from '@/pages/profile/updatePwd'
import qrCode from '@/pages/qrCode'
import saleTicket from '@/pages/saleTicket'

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
      path: '/updatePhone2',
      name: 'updatePhone2',
      component: updatePhone2
    },
    {
      path: '/updateInfo',
      name: 'updateInfo',
      component: updateInfo
    },
    {
      path: '/updatePwd',
      name: 'updatePwd',
      component: updatePwd
    },
    {
      path: '/saleTicket',
      name: 'saleTicket',
      component: saleTicket
    }
  ]
})
