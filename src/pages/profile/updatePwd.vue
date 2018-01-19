<template>
  <div>
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
    <a class="weui-btn weui-btn_default"
      style="width: 320px;"
      :style="[{'border': '1px solid' + theme}, {'color': theme}]"
      href="javascript:;" @click="submitPwd">保存</a>



    <!--BEGIN toast-->
    <toastFalse :isShowToast="isShowNull">
      <p>密码不能为空</p>
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
      <p>保存失败</p>
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
      // 要发送的密码（确认新密码字段）
      password: '',
      // 各种提示窗口
      isShowNull: false,
      isShowCheckOldPwd: false,
      isShowCheckNewPwd: false,
      isShowSuccess: false,
      isShowFalse: false,
      // 验证两次新密码需要的字段
      oldPwd: '',
      newPwd: '',
      // 验证旧密码返回的状态
      status: 0
    }
  },
  methods: {
    getTheme () {
      this.theme = localStorage.getItem('theme')
    },
    submitPwd () {
      // 验证旧密码、新密码、确认新密码是否为空
      if (this.oldPwd !== '' && this.newPwd !== '' && this.password !== '') {
        // 验证两次密码是否一致
        if (this.newPwd === this.password ? true : false) {
          // 所有验证通过，发送 password 到服务器
          let bizContent = {}
          bizContent.cno = localStorage.getItem('memberno')
          bizContent.oldpwd = this.oldPwd
          bizContent.newpwd = this.password

          let param = new URLSearchParams()
          param.append("bizContent", JSON.stringify(bizContent))

          axios.post(httpUrl.submitPwd, param)
          .then(res => {
            if (res.data.errcode == 0) {
              this.isShowSuccess = true
              setTimeout(() => {
                this.isShowSuccess = false
              }, 2000)
            } else {
              this.isShowFalse = true
              setTimeout(() => {
                this.isShowFalse = false
              }, 2000)
            }
          })
          .catch(err => console.log(err))
        } else {
          this.isShowCheckNewPwd = true
          setTimeout(() => {
            this.isShowCheckNewPwd = false
          }, 2000)
        }
      } else {
        this.isShowNull = true
        setTimeout(() => {
          this.isShowNull = false
        }, 2000)
      }
    },
    // 旧密码失焦事件，把返回的状态放在 status 里
    // checkOldPwd () {
    //   axios.post(httpUrl.checkOldPwd, this.oldPwd)
    //   .then(res => {
    //     this.status = res.data.errcode
    //   })
    //   .catch(err => console.log(err))
    // },
    // 验证两次密码是否一致的事件
    // checkNewPwd () {
    //   if (this.newPwd === this.password) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  },
  created () {
    this.getTheme()
  }
}
</script>

<style scoped>
.checkMsg {
  text-align: center;
  margin-bottom: 20px;
}
</style>
