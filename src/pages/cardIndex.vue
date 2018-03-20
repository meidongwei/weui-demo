<template>
  <div class="index-wrap">
    <!-- card -->
    <div class="card-wrap">
      <div class="card">
        <img :src="imgUrl">
        <div class="card-header">
          <div class="card-logo-box">
            <div class="card-logo">
              <img :src="cardLogoSrc" alt="logo">
            </div>
            <div class="card-words">
              <h3>{{ memberName }}</h3>
              <p>{{ cardType }}</p>
            </div>
          </div>
          <router-link to="/qrCode" class="card-qrcode-box">
            <icon name="qrcode" scale="2" style="color:#fff;"></icon>
          </router-link>
        </div>
        <div class="card-num-box">
          <p>{{ cardNum }}</p>
        </div>
      </div>
    </div>
    <!-- 积分和预存 -->
    <div class="weui-flex scoreBox">
      <div class="weui-flex__item score">
        <p>积分</p>
        <h3>{{ score }}</h3>
      </div>
      <div class="weui-flex__item prestore">
        <p>预存</p>
        <h3>{{ prestore }}</h3>
      </div>
    </div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;margin-top: 0;">
      <router-link to="/profile" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p style="font-size:15px;">个人资料</p>
        </div>
        <div class="weui-cell__ft">
          <span style="font-size:13px;">完善信息</span>
        </div>
      </router-link>
      <!-- <router-link to="/coupon" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p style="font-size:15px;">优惠券</p>
        </div>
        <div class="weui-cell__ft"  style="font-size:13px;">
          <span style="color: #de3939;">{{ couponNum1 }}</span>张
        </div>
      </router-link> -->
      <router-link to="/consume" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p style="font-size:15px;">消费查询</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
      <router-link to="/recharge" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p style="font-size:15px;">充值查询</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
      <!-- <router-link to="/suiStore" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>适用门店</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link> -->
    </div>
    <!-- 按钮 -->
    <!-- <a class="weui-btn weui-btn_plain-primary"
      style="width: 190px; margin-bottom: 50px;
      font-size: 17px; height: 40px; line-height: 40px;"
      href="javascript:;">进入微信卡包</a> -->



    <!--BEGIN toast-->
    <toastFalse :isShowToast="isShowMsg">
      <p>{{ errmsg }}</p>
    </toastFalse>
    <!--end toast-->



  </div>
</template>

<script>
import 'vue-awesome/icons/qrcode'
import Icon from 'vue-awesome/components/Icon'
import axios from 'axios'
import httpUrl from '@/http_url'
import toastFalse from '@/components/toastFalse'
export default {
  name: 'cardIndex',
  components: {
    Icon,
    toastFalse
  },
  data () {
    return {
      imgUrl: '',
      memberName: '',
      cardType: '',
      cardLogoSrc: '',
      cardNum: '',
      score: 0,
      prestore: 0,
      memberid: 0,
      mobile: '',
      sex: 0,
      birthday: '',
      isShowMsg: false,
      errmsg: '',
      // coupons1 未使用的优惠券
      // couponNum1 未使用的优惠券数量
      coupons1: [],
      couponNum1: 0
    }
  },
  methods: {
    getCardDatas () {
      axios.get(httpUrl.getCardDatas)
      .then(res => {
        if (res.data.errcode === 0) {

          // if (localStorage.getItem('imgUrl') === null) {
          //   this.imgUrl = res.data.res.cardface
          // } else {
          //   this.imgUrl = localStorage.getItem('imgUrl')
          // }
          this.imgUrl = res.data.res.cardface
          this.memberName = res.data.res.membername
          this.cardType = res.data.res.mgname
          this.cardLogoSrc = 'data:image/jpeg;base64,' + res.data.res.logo
          this.cardNum = res.data.res.memberno
          this.score = res.data.res.integral
          this.prestore = res.data.res.balance/100
          this.memberid = res.data.res.memberid
          this.mobile = res.data.res.mobile
          this.sex = res.data.res.sex
          this.birthday = res.data.res.birthday
          this.getCouponList()
          this.handleStorage()
        } else {
          this.errmsg = res.data.errmsg
          this.isShowMsg = true
          setTimeout(() => {
            this.isShowMsg = false
          }, 2000)
        }
      })
      .catch(err => console.log(err))
    },
    getCouponList () {
      let a = {}
      a.memberid = this.memberid
      a.pageNo = 1
      a.pageSize = 5
      a.status = 0

      let param = new URLSearchParams()
      param.append("bizContent", JSON.stringify(a))

      axios.post(httpUrl.getCouponList, param)
        .then(res => {
          if (res.data.errcode === 0) {
            this.coupons1 = res.data.res.coupons
            this.couponNum1 = res.data.res.rowCount
          } else {
            this.errmsg = res.data.errmsg
            this.isShowMsg = true
            setTimeout(() => {
              this.isShowMsg = false
            }, 2000)
          }
        })
        .catch(err => console.log(err))
    },
    handleStorage () {
      if (typeof(Storage) !== "undefined") {
        localStorage.memberName = this.memberName
        // localStorage.imgUrl = this.imgUrl
        localStorage.memberid = this.memberid
        localStorage.memberno = this.cardNum
        localStorage.mobile = this.mobile
        localStorage.sex = this.sex
        localStorage.birthday = this.birthday
        localStorage.coupons1 = JSON.stringify(this.coupons1)
        localStorage.couponNum1 = this.couponNum1
      } else {
        console.log('对不起，您的浏览器不支持 web 存储')
      }
    }
  },
  created () {
    this.getCardDatas()
  }
}
</script>

<style scoped>
.index-wrap {
  background: #fff;
  height: 100%;
}
.card-wrap {
  padding: 20px 25px 14px 25px;
}
.card {
  width: 100%;
  height: 100%;
  border-radius: 9px;
  position: relative;
}
@media (max-width: 320px) {
  .card-wrap .card > img {
    height: 175px;
  }
}
@media (min-width: 321px) {
  .card-wrap .card > img {
    height: 210.58px;
  }
}
@media (min-width: 414px) {
  .card-wrap .card > img {
    height: 235.84px;
  }
}
@media (min-width: 768px) {
  .card-wrap {
    display: flex;
    justify-content: center;
  }
  .card-wrap .card {
    width: 325px;
  }
}
.card > img {
  display: block;
  width: 100%;
  border-radius: 9px;
}
.card-header {
  width: 100%;
  position: absolute;
  top: 0;
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.card-logo-box {
  display: flex;
  align-items: center;
  flex-grow: 1;
}
.card-logo {
  margin-right: 10px;
}
.card-logo > img{
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
.card-words > h3 {
  font-weight: normal;
  font-size: 18px;
}
.card-words > p {
  font-size: 12px;
}
.card-qrcode-box {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 1px dashed #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-num-box {
  padding: 16px;
  font-size: 22px;
  color: #fff;
  letter-spacing: 1px;
  position: absolute;
  bottom: 0;
}
.card-num-box p {
  height: 22px;
  line-height: 22px;
}
.score,
.prestore {
  text-align: center;
}
.scoreBox {
  margin-bottom: 14px;
}
.score > p,
.prestore > p {
  color: #757575;
  font-size: 14px;
  height: 14px;
  line-height: 14px;
  margin-bottom: 6px;
}
.score > h3,
.prestore > h3 {
  color: #282828;
  font-size: 24px;
  font-weight: normal;
  height: 24px;
  line-height: 24px;
}
.score {
  border-right: 1px solid #e5e5e5;
}
.weui-cells .weui-cell {
  height: 35px;
}
.weui-cell {
  padding: 10px 25px;
}
</style>
