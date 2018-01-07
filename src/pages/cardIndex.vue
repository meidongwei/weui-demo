<template>
  <div>
    <!-- card -->
    <div :style="{'background-color': theme}" class="card">
      <div class="card-header">
        <div class="card-logo-box">
          <div class="card-logo">
            <img :src="cardLogoSrc" alt="logo">
          </div>
          <div class="card-words">
            <h3>{{ cardName }}</h3>
            <p v-if="cardType === 1">普通会员</p>
            <p v-if="cardType === 2">高级会员</p>
            <p v-if="cardType === 3">铂金会员</p>
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
          <span v-if="isShow">完善信息</span>
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
      <router-link to="/suiStore" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>适用门店</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
    </div>
    <!-- 按钮 -->
    <a class="weui-btn weui-btn_plain-primary"
      style="width: 188px;"
      :style="[{'border': '1px solid' + theme}, {'color': theme}]"
      href="javascript:;">进入微信卡包</a>
  </div>
</template>

<script>
import 'vue-awesome/icons/qrcode'
import Icon from 'vue-awesome/components/Icon'
import axios from 'axios'
import { httpUrl } from '@/http_url'
export default {
  components: {
    Icon
  },
  data () {
    return {
      theme: '',
      cardName: '',
      cardType: 0,
      cardLogoSrc: '',
      cardNum: 0,
      score: 0,
      prestore: 0,
      isShow: true
    }
  },
  methods: {
    getCardDatas () {
      axios.get(httpUrl.getCardDatas)
      .then(res => {
        this.theme = res.data.getCardDatas.theme
        this.themeStorage()
        this.cardName = res.data.getCardDatas.cardName
        this.cardType = res.data.getCardDatas.cardType
        this.cardLogoSrc = res.data.getCardDatas.cardLogoSrc
        this.cardNum = res.data.getCardDatas.cardNum
        this.score = res.data.getCardDatas.score
        this.prestore = res.data.getCardDatas.prestore
        this.isShow = res.data.getCardDatas.isShow
      })
      .catch(err => console.log(err))
    },
    themeStorage () {
      if (typeof(Storage) !== "undefined") {
        localStorage.theme = this.theme;
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
  background: url('../assets/05.png');
  background-size: 300px;
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
