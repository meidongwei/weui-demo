<template>
  <div>
    <!-- card -->
    <div :style="[{backgroundImage: 'url(' + imgUrl + ')' }]" class="card">
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
    <!-- 积分和预存 -->
    <div class="weui-flex">
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
    <div class="weui-cells" style="margin-bottom: 20px;">
      <router-link to="/profile" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>个人资料</p>
        </div>
        <div class="weui-cell__ft">
          <span>完善信息</span>
        </div>
      </router-link>
      <router-link to="/consume" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>消费查询</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
      <router-link to="/recharge" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>充值查询</p>
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
    <a class="weui-btn weui-btn_default m-btn-green"
      style="width: 188px;"
      href="javascript:;">进入微信卡包</a>



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
      errmsg: ''
    }
  },
  methods: {
    getCardDatas () {
      axios.get(httpUrl.getCardDatas)
      .then(res => {
        if (res.data.errcode === 0) {
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
    handleStorage () {
      if (typeof(Storage) !== "undefined") {
        localStorage.memberName = this.memberName
        localStorage.memberid = this.memberid
        localStorage.memberno = this.cardNum
        localStorage.mobile = this.mobile
        localStorage.sex = this.sex
        localStorage.birthday = this.birthday
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
.card {
  width: 325px;
  height: 194px;
  border-radius: 5px;
  margin: 20px auto 20px;
  box-shadow: 0 0 2px lightgray;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-header {
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
}
.score,
.prestore {
  text-align: center;
}
.score > p,
.prestore > p {
  color: #757575;
  font-size: 14px;
}
.score > h3,
.prestore > h3 {
  color: #282828;
  font-size: 24px;
}
.score {
  border-right: 1px solid #e5e5e5;
}
</style>
