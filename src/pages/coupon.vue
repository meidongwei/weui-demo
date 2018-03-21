<template>
  <div>
    <div class="tab">
      <router-link :to="{ name: 'coupon1' }" replace>
        未使用 (<span>{{ couponNum1 }}</span>)</router-link>
      <router-link :to="{ name: 'coupon2' }" replace>
        已使用（<span>{{ couponNum2 }}</span>）</router-link>
      <router-link :to="{ name: 'coupon3' }" replace>
        已过期（<span>{{ couponNum3 }}</span>）</router-link>
    </div>

    <router-view></router-view>

    <!-- loading toast -->
    <div v-if="loadingToast">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content">数据加载中</p>
      </div>
    </div>

    <!--BEGIN toast-->
    <toastFalse :isShowToast="isShowMsg">
      <p>{{ errmsg }}</p>
    </toastFalse>
    <!--end toast-->

    </div>
  </div>
</template>
<script>
import axios from 'axios'
import httpUrl from '@/http_url'
import toastFalse from '@/components/toastFalse'
export default {
  components: {
    toastFalse
  },
  data () {
    return {
      // coupons1: [], // 未使用的优惠券
      // coupons2: [], // 已使用的优惠券
      // coupons3: [], // 已过期的优惠券
      couponNum1: 0, // 未使用优惠券数量
      couponNum2: 0, // 已使用优惠券数量
      couponNum3: 0, // 已过期优惠券数量
      // 加载状态
      loadingToast: true,
      isShowMsg: false,
      errmsg: ''
    }
  },
  methods: {
    getCoupons2and3 () {
      // let memberid
      // location.search 可以截取到: ?memberid=123123
      // 判断浏览器地址是否包含查询参数
      // 如果包含就取参数的 value 值赋给 memberid
      // 如果不包含，就从本地取 memberid
      // if (location.search !== '') {
      //   memberid = Number(location.search.split('=')[1])
      // } else {
      //   memberid = Number(localStorage.getItem('memberid'))
      // }

      let a = {}
      a.memberid = Number(localStorage.getItem('memberid'))
      a.pageNo = 1
      a.pageSize = 5
      a.status = 1

      let b = {}
      b.memberid = memberid
      b.pageNo = 1
      b.pageSize = 5
      b.status = 2

      // let paramA = new URLSearchParams()
      // let paramB = new URLSearchParams()
      // paramA.append("bizContent", JSON.stringify(a))
      // paramB.append("bizContent", JSON.stringify(b))

      axios.all([
        axios.get(httpUrl.getCouponList+"&bizContent="+JSON.stringify(a)),
        axios.get(httpUrl.getCouponList+"&bizContent="+JSON.stringify(b))
      ])
      .then(
        axios.spread((resA, resB) => {
          this.loadingToast = false
          if (resA.data.errcode === 0) {
            this.couponNum2 = resA.data.res.rowCount
            localStorage.coupons2 = JSON.stringify(resA.data.res.coupons)
          } else {
            this.errmsg = res.data.errmsg
            this.isShowMsg = true
            setTimeout(() => {
              this.isShowMsg = false
            }, 2000)
          }
          if (resB.data.errcode === 0) {
            this.couponNum3 = resA.data.res.rowCount
            localStorage.coupons3 = JSON.stringify(resA.data.res.coupons)
          } else {
            this.errmsg = res.data.errmsg
            this.isShowMsg = true
            setTimeout(() => {
              this.isShowMsg = false
            }, 2000)
          }
        })
      )
      .catch(err => console.log(err))
    }
  },
  created () {
    this.couponNum1 = Number(localStorage.couponNum1)
    this.getCoupons2and3()
  }
}
</script>
<style scoped>
.tab {
  display: flex;
  padding: 0 15px;
  background-color: #ffffff;
  margin-bottom: 15px;
}
.tab a {
  display: block;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 8px;
  background-color: #ffffff;
  font-size: 14px;
  color: #404040;
}

.router-link-active {
  position: relative;
  display: flex;
}
.router-link-active:after {
  position: absolute;
  bottom: 0px;
  left: 7px;
  height: 2px;
  width: 100px;
  background: #e62f2f;
  content: '';
}

</style>
