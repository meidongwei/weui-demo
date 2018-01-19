<template>
  <div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>手机</p>
        </div>
        <input class="weui-input" type="text"
          v-model="mobile" placeholder="请输入新手机号"
          style="width: 170px; text-align:right;">
        <a @click="handleSendCode" class="weui-btn weui-btn_mini weui-btn_default"
          style="margin-left: 10px;padding-left: 6px; padding-right: 6px;"
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
            v-model="verCode"/>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <a class="weui-btn weui-btn_default"
      @click="handleCheckNewMobile"
      style="width: 320px;"
      :style="[{'border': '1px solid' + theme}, {'color': theme}]"
      href="javascript:;">验证并保存</a>



      <!--BEGIN toast-->
      <toastSuccess :isShowToast="isShowSendCodeSuccess">
        <p>发送成功</p>
      </toastSuccess>
      <toastFalse :isShowToast="isShowSendCodeFalse">
        <p>发送失败</p>
      </toastFalse>
      <toastSuccess :isShowToast="isShowCheckSuccess">
        <p>保存成功</p>
      </toastSuccess>
      <toastFalse :isShowToast="isShowCheckFalse">
        <p>{{ errmsg }}</p>
      </toastFalse>
      <toastFalse :isShowToast="isShowPhoneNull">
        <p>手机号不能为空</p>
      </toastFalse>
      <toastFalse :isShowToast="isShowCodeNull">
        <p>验证码不能为空</p>
      </toastFalse>
      <!--end toast-->





  </div>
</template>

<script>
import toastSuccess from '@/components/toastSuccess'
import toastFalse from '@/components/toastFalse'
import axios from 'axios'
import httpUrl from '@/http_url'
export default {
  components: {
    toastSuccess,
    toastFalse
  },
  data () {
    return {
      theme: '',
      mobile: '',
      isShowSendCodeSuccess: false,
      isShowSendCodeFalse: false,
      isShowCheckSuccess: false,
      isShowCheckFalse: false,
      isShowPhoneNull: false,
      isShowCodeNull: false,
      verCode: '',
      errmsg: ''
    }
  },
  methods: {
    getDatas () {
      this.theme = localStorage.getItem('theme')
    },
    handleCheckNewMobile () {
      // 验证表单
      if (!this.checkForm()) {
        return
      }
      // 验证通过发送请求
      let bizContent = {}
      bizContent.code = this.verCode
      bizContent.mobile = this.mobile
      bizContent.cno = localStorage.getItem('memberno')

      let param = new URLSearchParams()
      param.append("bizContent", JSON.stringify(bizContent))

      axios.post(httpUrl.updateMemberMobile, param)
      .then(res => {
        if (res.data.errcode === 0) {
          this.isShowCheckSuccess = true
          setTimeout(() => {
            this.isShowCheckSuccess = false
          }, 2000)
          localStorage.mobile = this.mobile
        } else {
          this.errmsg = res.data.errmsg
          this.isShowCheckFalse = true
          setTimeout(() => {
            this.isShowCheckFalse = false
          }, 2000)
        }
      })
      .catch(err => console.log(err))
    },
    checkForm () {
      if (this.mobile.length === 0) {
        this.isShowPhoneNull = true
        setTimeout(() => {
          this.isShowPhoneNull = false
        }, 2000)
        return false
      }
      if (this.verCode.length === 0) {
        this.isShowCodeNull = true
        setTimeout(() => {
          this.isShowCodeNull = false
        }, 2000)
        return false
      }
      return true
    },
    handleSendCode () {
      if (this.mobile !== '') {
        let bizContent = {}
        bizContent.mobile = this.mobile
        bizContent.cno = localStorage.getItem('memberno')

        let param = new URLSearchParams()
        param.append("bizContent", JSON.stringify(bizContent))

        axios.post(httpUrl.handleSendCode, param)
        .then(res => {
          if (res.data.errcode == 0) {
            this.isShowSendCodeSuccess = true
            setTimeout(() => {
              this.isShowSendCodeSuccess = false
            }, 2000)
            // 模拟用户输入
            // this.verCode = '3dxbr6'
          } else {
            this.isShowSendCodeFalse = true
            setTimeout(() => {
              this.isShowSendCodeFalse = false
            }, 2000)
          }
        })
        .catch(err => console.log(err))
      } else {
        this.isShowNull = true
        setTimeout(() => {
          this.isShowNull = false
        }, 2000)
      }
    }
  },
  created () {
    this.getDatas()
  }
}
</script>

<style scoped>
</style>
