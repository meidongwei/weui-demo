<template>
  <div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>姓名</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"
            style="text-align:right;"
            placeholder="请输入姓名"
            :value="proName"/>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>性别</p>
        </div>
        <div class="weui-cell__bd" style="display:flex;justify-content:flex-end;">
          <div style="margin-right: 15px;">
            <input v-model="proSex" value="1" id="boy" type="radio"
              style=""/>
            <label for="boy">男</label>
          </div>
          <div>
            <input v-model="proSex" value="2" id="girl" type="radio"/>
            <label for="girl">女</label>
          </div>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>生日</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"
            style="text-align:right;"
            placeholder="请输入验证码"
            :value="proBirthday"/>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <a class="weui-btn weui-btn_default"
      style="width: 320px;"
      :style="[{'border': '1px solid' + theme}, {'color': theme}]"
      href="javascript:;" @click="submitInfo">保存</a>



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
          <div class="weui-toast" style="padding-top: 10px;">
              <i style="color: #fff;margin-bottom: 5px;"
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
      proName: '',
      proSex: 0,
      proBirthday: '',
      isShowSuccess: false,
      isShowFalse: false
    }
  },
  methods: {
    getTheme () {
      this.theme = localStorage.getItem('theme')
    },
    submitInfo () {
      axios.post(httpUrl.submitInfo,[
        this.proName,
        this.proSex,
        this.proBirthday
      ])
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
    this.proName = this.$route.query.proName
    this.proSex = this.$route.query.proSex
    this.proBirthday = this.$route.query.proBirthday
  }
}
</script>

<style scoped>
</style>
