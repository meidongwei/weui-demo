<template>
  <div style="padding-top: 10px;">
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom:20px;">
      <div class="weui-cell" style="position: relative;">
        <div class="weui-cell__bd">
          <p>手机</p>
        </div>
        <input class="weui-input" type="text"
          v-model="mobile" placeholder="请输入新手机号"
          style="width: 170px; text-align:right;font-size: 14px;
          position:absolute;right:100px;">
        <a @click="handleSendCode" class="weui-btn_plain-primary"
          style="padding:4px 6px;font-size:12px;border-radius:3px;
          position:absolute;right:15px;"
          href="javascript:;">发送验证码</a>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>验证码</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number"
            style="text-align:right;"
            placeholder="请输入验证码"
            v-model="verCode"/>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <a class="weui-btn weui-btn_plain-primary"
      @click="handleCheckNewMobile"
      style="width: 320px;"
      href="javascript:;">验证并保存</a>



      <!--BEGIN toast-->
      <toastSuccess :isShowToast="isShowSendCodeSuccess">
        <p>发送成功</p>
      </toastSuccess>
      <toastFalse :isShowToast="isShowSendCodeFalse">
        <p>{{ errmsg }}</p>
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
      <toastFalse :isShowToast="isShowPhoneError">
        <p>手机号错误</p>
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
      mobile: '',
      isShowSendCodeSuccess: false,
      isShowSendCodeFalse: false,
      isShowCheckSuccess: false,
      isShowCheckFalse: false,
      isShowPhoneNull: false,
      isShowCodeNull: false,
      isShowPhoneError: false,
      verCode: '',
      errmsg: ''
    }
  },
  methods: {

    handleCheckNewMobile () {
      // 验证表单
      if (!this.checkForm()) {
        return
      }
      // 验证手机号11位
      if (!this.checkPhone()) {
        return
      }
      // success 发送请求
      let a = {
        code: this.verCode,
        mobile: this.mobile,
        cno: localStorage.getItem('memberno')
      }
      let data = 'bizContent=' + JSON.stringify(a)
      axios({
        method: 'post',
        url: httpUrl.updateMemberMobile,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
      .then(res => {
        if (res.data.errcode === 0) {
          this.isShowCheckSuccess = true
          setTimeout(() => {
            this.isShowCheckSuccess = false
            this.$router.push({ name: 'profile' })
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

    // 验证手机号、验证码不为空
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

    // 验证手机号11位
    checkPhone () {
      let re = /^1\d{10}$/
      if (!re.test(this.mobile)) {
        this.isShowPhoneError = true
        setTimeout(() => {
          this.isShowPhoneError = false
        }, 2000)
        return false
      }
      return true
    },

    handleSendCode () {
      if (this.mobile.length !== 0) {
        if (this.checkPhone()) {
          let a = {
            mobile: this.mobile,
            cno: localStorage.getItem('memberno')
          }
          let data = 'bizContent=' + JSON.stringify(a)
          axios({
            method: 'post',
            url: httpUrl.handleSendCode,
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            },
            data: data
          })
          .then(res => {
            if (res.data.errcode === 0) {
              this.isShowSendCodeSuccess = true
              setTimeout(() => {
                this.isShowSendCodeSuccess = false
              }, 2000)
              // 模拟用户输入
              // this.verCode = '3dxbr6'
            } else {
              this.errmsg = res.data.errmsg
              this.isShowSendCodeFalse = true
              setTimeout(() => {
                this.isShowSendCodeFalse = false
              }, 2000)
            }
          })
          .catch(err => console.log(err))

        }
      } else {
        this.isShowPhoneNull = true
        setTimeout(() => {
          this.isShowPhoneNull = false
        }, 2000)
      }
    }
  }
}
</script>

<style scoped>
</style>
