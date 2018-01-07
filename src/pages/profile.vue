<template>
  <div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <router-link :to="{name: 'updatePhone', query: {proPhone: this.proPhone}}" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>手机</p>
        </div>
        <div class="weui-cell__ft">{{ proPhone }}</div>
      </router-link>
    </div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <router-link :to="{name: 'updateInfo',
        query: {proName: this.proName,proSex: this.proSex,proBirthday: this.proBirthday}}"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>姓名</p>
        </div>
        <div class="weui-cell__ft">{{ proName }}</div>
      </router-link>
      <router-link :to="{name: 'updateInfo',
        query: {proName: this.proName,proSex: this.proSex,proBirthday: this.proBirthday}}"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>性别</p>
        </div>
        <div class="weui-cell__ft">
          <p v-if="proSex === 1">男</p>
          <p v-else>女</p>
        </div>
      </router-link>
      <router-link :to="{name: 'updateInfo',
        query: {proName: this.proName,proSex: this.proSex,proBirthday: this.proBirthday}}"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>生日</p>
        </div>
        <div class="weui-cell__ft">
          <p>{{ proBirthday }}</p>
        </div>
      </router-link>
    </div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <router-link to="/updatePwd" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>修改会员卡密码</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>充值会员卡密码</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { httpUrl } from '@/http_url.js'
export default {
  data () {
    return {
      proPhone: 0,
      proName: '',
      proSex: 0,
      proBirthday: ''
    }
  },
  methods: {
    getProfileDatas () {
      axios.get(httpUrl.getProfileDatas)
      .then(res => {
        this.proPhone = res.data.getProfileDatas.proPhone
        this.proName = res.data.getProfileDatas.proName
        this.proSex = res.data.getProfileDatas.proSex
        this.proBirthday = res.data.getProfileDatas.proBirthday
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.getProfileDatas()
  }
}
</script>

<style>
</style>
