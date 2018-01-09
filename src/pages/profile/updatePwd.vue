<template>
  <div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>旧密码</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"
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
          <input class="weui-input" type="text"
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
          <input class="weui-input" type="text"
            style="text-align:right;"
            placeholder="请再次输入你的新密码"
            v-model="password"/>
        </div>
      </div>
    </div>
    <!-- 验证提示信息 -->
    <div class="checkMsg">
      <span v-if="isShowOld" style="color: red;">旧密码输入错误</span>
      <span v-if="isShowNew" style="color: red;">两次密码输入不一致</span>
      <span v-if="isShowNull" style="color: red;">密码不能为空</span>
    </div>
    <!-- 按钮 -->
    <a class="weui-btn weui-btn_default"
      style="width: 320px;"
      :style="[{'border': '1px solid' + theme}, {'color': theme}]"
      href="javascript:;" @click="submitPwd">保存</a>


      <!--BEGIN toast-->
      <div id="toast" v-if="isShowSuccess">
          <!-- <div class="weui-mask_transparent"></div> -->
          <div class="weui-toast">
              <i class="weui-icon-success-no-circle weui-icon_toast"></i>
              <p class="weui-toast__content">保存成功</p>
          </div>
      </div>
      <div id="toast" v-if="isShowFalse">
          <!-- <div class="weui-mask_transparent"></div> -->
          <div class="weui-toast">
              <i style="color: #fff;margin-bottom: 5px;font-size: 40px;margin-top: 30px;"
                class="weui-icon-info-circle weui-icon_toast"></i>
              <p class="weui-toast__content">保存失败</p>
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
      password: '',
      isShowSuccess: false,
      isShowFalse: false,
      isShowOld: false,
      isShowNew: false,
      isShowNull: false,
      oldPwd: '',
      newPwd: ''
    }
  },
  methods: {
    getTheme () {
      this.theme = localStorage.getItem('theme')
    },
    submitPwd () {
      this.isShowNew = false
      this.isShowOld = false
      if (this.oldPwd !== '' && this.newPwd !== '' && this.password !== '') {
        this.isShowNull = false
        if (this.checkNewPwd()) {
          // console.log('进入提交方法')
          axios.post(httpUrl.submitPwd, this.password)
          .then(res => {
            if (res.data.status) {
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
        }
      } else {
        this.isShowNull = true
      }
    },
    // checkOldPwd () {
    //   return axios.post(httpUrl.checkOldPwd, this.oldPwd)
    //   .then(res => {
    //     if (res.data.status) {
    //       this.isShowOld = false
    //       return true
    //     } else {
    //       this.isShowOld = true
    //       return false
    //     }
    //   })
    //   .catch(err => console.log(err))
    // },
    checkNewPwd () {
      if (this.newPwd === this.password) {
        this.isShowNew = false
        return true
      } else {
        this.isShowNew = true
        return false
      }
    }
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
