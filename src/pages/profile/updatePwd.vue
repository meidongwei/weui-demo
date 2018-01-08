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
            placeholder="请输入旧密码"/>
        </div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>新密码</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"
            style="text-align:right;"
            placeholder="请输入新密码"/>
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
      isShowFalse: false
    }
  },
  methods: {
    getTheme () {
      this.theme = localStorage.getItem('theme')
    },
    submitPwd () {
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
  },
  created () {
    this.getTheme()
  }
}
</script>

<style>
</style>
