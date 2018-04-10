<template>
  <div style="padding-top: 10px;">
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>旧密码</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="password"
            style="text-align:right;"
            placeholder="请输入旧密码"
            v-model="oldPwd"/>
        </div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>新密码</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="password"
            style="text-align:right;"
            placeholder="请输入新密码"
            v-model="newPwd"/>
        </div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>确认新密码</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="password"
            style="text-align:right;"
            placeholder="请再次输入你的新密码"
            v-model="password"/>
        </div>
      </div>
    </div>

    <!-- 按钮 -->
    <a class="weui-btn weui-btn_plain-primary"
      style="width: 320px;"
      href="javascript:;" @click="submitPwd">保存</a>



    <!--BEGIN toast-->
    <toastFalse :isShowToast="isShowOldNull">
      <p>请输入旧密码</p>
    </toastFalse>
    <toastFalse :isShowToast="isShowNewNull">
      <p>请输入新密码</p>
    </toastFalse>
    <toastFalse :isShowToast="isShowPasswordNull">
      <p>请确认新密码</p>
    </toastFalse>
    <toastFalse :isShowToast="isShowCheckOldPwd">
      <p>旧密码不正确</p>
    </toastFalse>
    <toastFalse :isShowToast="isShowCheckNewPwd">
      <p>两次密码不一致</p>
    </toastFalse>
    <toastSuccess :isShowToast="isShowSuccess">
      <p>保存成功</p>
    </toastSuccess>
    <toastFalse :isShowToast="isShowFalse">
      <p>{{ errmsg }}</p>
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
      // 各种提示窗口
      isShowOldNull: false,
      isShowNewNull: false,
      isShowPasswordNull: false,
      isShowCheckOldPwd: false,
      isShowCheckNewPwd: false,
      isShowSuccess: false,
      isShowFalse: false,
      // 验证两次新密码需要的字段
      oldPwd: '',
      newPwd: '',
      // 要发送的密码（确认新密码字段）
      password: '',
      errmsg: ''
    }
  },
  methods: {
    submitPwd () {
      // 验证表单
      if (!this.checkForm()) {
        return
      }
      // 验证通过发送请求
      let bizContent = {}
      bizContent.cno = localStorage.getItem('memberno')
      bizContent.oldpwd = this.oldPwd
      bizContent.newpwd = this.password

      let a = {
        cno: localStorage.getItem('memberno'),
        oldpwd: this.oldPwd,
        newpwd: this.password
      }
      let data = 'bizContent=' + JSON.stringify(a)
      axios({
        method: 'post',
        url: httpUrl.submitPwd,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
      .then(res => {
        if (res.data.errcode === 0) {
          this.isShowSuccess = true
          setTimeout(() => {
            this.isShowSuccess = false
            this.$router.push({ name: 'profile' })
          }, 2000)
        } else {
          this.errmsg = res.data.errmsg
          this.isShowFalse = true
          setTimeout(() => {
            this.isShowFalse = false
          }, 2000)
        }
      })
      .catch(err => console.log(err))
    },
    checkForm () {
      if (this.oldPwd.length === 0) {
        this.isShowOldNull = true
        setTimeout(() => {
          this.isShowOldNull = false
        }, 2000)
        return false
      }
      if (this.newPwd.length === 0) {
        this.isShowNewNull = true
        setTimeout(() => {
          this.isShowNewNull = false
        }, 2000)
        return false
      }
      if (this.password.length === 0) {
        this.isShowPasswordNull = true
        setTimeout(() => {
          this.isShowPasswordNull = false
        }, 2000)
        return false
      }
      if (this.newPwd !== this.password) {
        this.isShowCheckNewPwd = true
        setTimeout(() => {
          this.isShowCheckNewPwd = false
        }, 2000)
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
.checkMsg {
  text-align: center;
  margin-bottom: 20px;
}
</style>
