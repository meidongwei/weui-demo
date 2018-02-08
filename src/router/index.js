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
import coupon from '@/pages/coupon'
import coupon1 from '@/pages/coupon/coupon1'
import coupon2 from '@/pages/coupon/coupon2'
import coupon3 from '@/pages/coupon/coupon3'

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
      path: '/coupon',
      name: 'coupon',
      component: coupon,
      redirect: '/coupon/coupon1',
      children: [
        {
          path: 'coupon1',
          name: 'coupon1',
          component: coupon1
        },
        {
          path: 'coupon2',
          name: 'coupon2',
          component: coupon2
        },
        {
          path: 'coupon3',
          name: 'coupon3',
          component: coupon3
        }
      ]
    }
  ]
})
