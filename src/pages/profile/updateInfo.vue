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
            v-model="memberName"
            >
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>性别</p>
        </div>
        <div class="weui-cell__bd" style="display:flex;justify-content:flex-end;">
          <div style="margin-right: 15px;">
            <input v-model="sex" value="1" id="boy" type="radio"/>
            <label for="boy">男</label>
          </div>
          <div>
            <input v-model="sex" value="2" id="girl" type="radio"/>
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
            v-model="birthday"
            @click="showPicker"/>
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
import httpUrl from '@/http_url'
// 引入 weui.js 目前用于 picker
import 'weui'
import weui from 'weui.js'
// weui.alert('alert')
export default {
  data () {
    return {
      theme: '',
      memberName: '',
      sex: 0,
      birthday: '',
      isShowSuccess: false,
      isShowFalse: false
    }
  },
  computed: {
    year () {
      return this.birthday.split('年')
    },
    month () {
      return this.year[1].split('月')
    },
    day () {
      return this.month[1].split('日')
    }
  },
  methods: {
    showPicker () {
      const _this = this
      // 使用 split() 方法去掉字符串中的“年月日”
      // 年：a[0]  月：b[0]  日：c[0]
      weui.datePicker({
        start: 1960,
        end: new Date().getFullYear(),
        defaultValue: [this.year[0], this.month[0], this.day[0]],
        // onChange (result) {
        //   console.log(result)
        // },
        onConfirm (result) {
          const arr = new Array()
          result.forEach(item => {
            arr.push(item.label)
          })
          _this.birthday = arr.join('')
        },
        id: 'datePicker'
      })
    },
    getDatas () {
      this.theme = localStorage.getItem('theme')
      this.memberName = localStorage.getItem('memberName')
      this.sex = localStorage.getItem('sex')
      this.birthday = localStorage.getItem('birthday')
      var dateArr = this.birthday.split('-')
      this.birthday = dateArr[0]+'年'+dateArr[1].replace(/^0/,'')
        +'月'+dateArr[2].replace(/^0/,'')+'日'
    },
    submitInfo () {
      axios.post(httpUrl.submitInfo,[
        this.memberName,
        this.sex,
        this.birthday
      ])
      .then(res => {
        if (res.data.errcode === 0) {
          this.isShowSuccess = true
          setTimeout(() => {
            this.isShowSuccess = false
          }, 2000)
          localStorage.memberName = this.memberName
          localStorage.sex = this.sex
          // 把 xx年xx月xx日 的日期转化成 xx-xx-xx 格式，并存入localStorage
          let arr = []
          arr.push(this.year[0], this.month[0], this.day[0])
          let date = arr.join('-')
          localStorage.birthday = date
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
    this.getDatas()
    // this.proName = this.$route.query.proName
    // this.proSex = this.$route.query.proSex
    // this.proBirthday = this.$route.query.proBirthday
  }
}
</script>

<style scoped>
</style>
