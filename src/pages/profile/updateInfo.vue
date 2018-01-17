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
      <toastSuccess :isShowToast="isShowUpdateSuccess">
        <p>保存成功</p>
      </toastSuccess>
      <toastFalse :isShowToast="isShowUpdateFalse">
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
// 引入 weui.js 目前用于 picker
import 'weui'
import weui from 'weui.js'
// weui.alert('alert')
export default {
  components: {
    toastSuccess,
    toastFalse
  },
  data () {
    return {
      theme: '',
      memberName: '',
      sex: 0,
      birthday: '',
      isShowUpdateSuccess: false,
      isShowUpdateFalse: false
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
      let bizContent = {}
      bizContent.name = this.memberName
      bizContent.sex = this.sex
      bizContent.birth = this.birthday

      let param = new URLSearchParams()
      param.append("bizContent", JSON.stringify(bizContent))

      axios.post(httpUrl.submitInfo, param)
      .then(res => {
        if (res.data.errcode == 0) {
          this.isShowUpdateSuccess = true
          setTimeout(() => {
            this.isShowUpdateSuccess = false
          }, 2000)
          localStorage.memberName = this.memberName
          localStorage.sex = this.sex
          // 日期存入 localStorage 前
          // 先把 xx年xx月xx日 转化成 xx-xx-xx 格式
          let m = this.month[0]
          let d = this.day[0]
          m = m < 10 ? '0' + m : m
          d = d < 10 ? '0' + d : d
          let date = this.year[0] + '-' + m + '-' + d

          localStorage.birthday = date
        } else {
          this.isShowUpdateFalse = true
          setTimeout(() => {
            this.isShowUpdateFalse = false
          }, 2000)
        }
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.getDatas()
  }
}
</script>

<style scoped>
</style>
