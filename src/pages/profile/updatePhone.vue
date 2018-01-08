<template>
  <div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>手机</p>
        </div>
        <div class="weui-cell__ft">{{ proPhone }}</div>
        <a @click="handleSendCode" class="weui-btn weui-btn_mini weui-btn_default"
          style="margin-left: 10px;"
          :style="[{'border': '1px solid' + theme}, {'color': theme}]"
          href="javascript:;">发送验证码</a>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>验证码</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"
            style="text-align:right;"
            placeholder="请输入验证码"
            :value="verCode"/>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <a class="weui-btn weui-btn_default"
      style="width: 320px;"
      :style="[{'border': '1px solid' + theme}, {'color': theme}]"
      href="javascript:;">下一步</a>



      <!--BEGIN toast-->
      <div id="toast" v-if="isShowSuccess">
          <!-- <div class="weui-mask_transparent"></div> -->
          <div class="weui-toast">
              <i class="weui-icon-success-no-circle weui-icon_toast"></i>
              <p class="weui-toast__content">发送成功</p>
          </div>
      </div>
      <div id="toast" v-if="isShowFalse">
          <!-- <div class="weui-mask_transparent"></div> -->
          <div class="weui-toast" style="padding-top: 10px;">
              <i style="color: #fff;margin-bottom: 5px;"
                class="weui-icon-info-circle weui-icon_toast"></i>
              <p class="weui-toast__content">发送失败</p>
          </div>
      </div>
      <!--end toast-->





  </div>
</template>

<script>
import axios from 'axios'
import { httpUrl } from '@/http_url'
export default {
  data () {
    return {
      theme: '',
      proPhone: 0,
      isShowSuccess: false,
      isShowFalse: false,
      verCode: ''
    }
  },
  methods: {
    getTheme () {
      this.theme = localStorage.getItem('theme')
    },
    handleSendCode () {
      axios.post(httpUrl.handleSendCode, this.proPhone)
      .then(res => {
        if (res.data.status) {
          // console.log('发送成功')
          this.isShowSuccess = true
          setTimeout(() => {
            this.isShowSuccess = false
          }, 2000)
          // 模拟用户输入
          this.verCode = '3dxbr6'
        } else {
          // console.log('发送失败')
          this.isShowFalse = true
          setTimeout(() => {
            this.isShowFalse = false
          }, 2000)
        }
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.getTheme()
    this.proPhone = this.$route.query.proPhone
  }
}
</script>

<style scoped>
</style>
