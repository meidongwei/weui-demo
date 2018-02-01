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
            v-model="memberName" :disabled="disabled"
            >
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>性别</p>
        </div>
        <div class="weui-cell__bd" style="display:flex;justify-content:flex-end;">
          <div style="margin-right: 15px;">
            <input v-model.number="sex" value="1" id="boy" type="radio"/>
            <label for="boy">男</label>
          </div>
          <div>
            <input v-model.number="sex" value="2" id="girl" type="radio"/>
            <label for="girl">女</label>
          </div>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>生日</p>
        </div>
        <div class="weui-cell__bd">
          <p class="weui-cell__ft"
            @click="flag && showPicker()"
            >{{ birthday }}</p>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <a class="weui-btn weui-btn_plain-primary"
      style="width: 320px;"
      href="javascript:;" @click="submitInfo">保存</a>



      <!--BEGIN toast-->
      <toastSuccess :isShowToast="isShowUpdateSuccess">
        <p>保存成功</p>
      </toastSuccess>
      <toastFalse :isShowToast="isShowUpdateFalse">
        <p>{{ errmsg }}</p>
      </toastFalse>
      <toastFalse :isShowToast="isShowNameNull">
        <p>姓名不能为空</p>
      </toastFalse>
      <toastFalse :isShowToast="isShowSexNull">
        <p>请选择性别</p>
      </toastFalse>
      <toastFalse :isShowToast="isShowBirthdayNull">
        <p>请选择生日</p>
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
      memberName: '',
      sex: 0,
      birthday: '',
      isShowUpdateSuccess: false,
      isShowUpdateFalse: false,
      isShowNameNull: false,
      isShowSexNull: false,
      isShowBirthdayNull: false,
      errmsg: '',
      disabled: false,
      flag: true
    }
  },
  // 使用 split() 方法去掉字符串中的“年月日”
  // 年：a[0]  月：b[0]  日：c[0]
  // computed: {
  //   year () {
  //     return this.birthday.split('年')
  //   },
  //   month () {
  //     return this.year[1].split('月')
  //   },
  //   day () {
  //     return this.month[1].split('日')
  //   }
  // },
  methods: {
    showPicker () {
      const _this = this

      weui.datePicker({
        start: 1960,
        end: new Date().getFullYear(),
        defaultValue: [1980, 6, 6],
        className: 'm-picker',
        onConfirm (result) {
          const arr = new Array()
          result.forEach(item => {
            if (item.value > 12) {
              arr.push(item.label)
            } else if (item.value < 10) {
              arr.push('0' + item.label)
            } else {
              arr.push(item.label)
            }
          })
          _this.birthday = arr.join('') // 1987-01-01
        },
        id: 'datePicker'
      })
    },
    getDatas () {
      // 判断有姓名的话，就设置 input 为 disabled 状态
      if (localStorage.getItem('memberName') !== 'null' && localStorage.getItem('memberName') !== '') {
        this.memberName = localStorage.getItem('memberName')
        this.disabled = true
      } else {
        this.memberName = ''
        this.disabled = false
      }
      this.sex = Number(localStorage.getItem('sex'))
      if (localStorage.getItem('birthday') === 'undefined') {
        this.birthday = '请选择'
        this.flag = true
      } else if (localStorage.getItem('birthday') === 'null') {
        this.birthday = '请选择'
        this.flag = true
      } else {
        this.birthday = localStorage.getItem('birthday')
        this.flag = false
      }
      this.memberid = Number(localStorage.getItem('memberid'))
      // 2018-01-18 转 2018年1月18日
      // var dateArr = this.birthday.split('-')
      // this.birthday = dateArr[0]+'年'+dateArr[1].replace(/^0/,'')
      //   +'月'+dateArr[2].replace(/^0/,'')+'日'
    },
    submitInfo () {
      if (this.memberName === 'undefined' || this.memberName === null ) {
        this.isShowNameNull = true
        setTimeout(() => {
          this.isShowNameNull = false
        }, 2000)
        return
      }

      if (this.sex === 0) {
        this.isShowSexNull = true
        setTimeout(() => {
          this.isShowSexNull = false
        }, 2000)
        return
      }

      if (this.birthday === '请选择') {
        this.isShowBirthdayNull = true
        setTimeout(() => {
          this.isShowBirthdayNull = false
        }, 2000)
        return
      }

      let bizContent = {}
      bizContent.membername = this.memberName
      bizContent.sex = this.sex
      bizContent.memberid = this.memberid
      // 2018年01月18日 转换成 2018-01-18
      let result = /^(\d+)年(\d+)月(\d+)日$/.exec(this.birthday)
      let y = result[1]
      let m = result[2]
      var d = result[3]
      let birthday = y + '-' + m + '-' + d

      bizContent.birthday = birthday

      let param = new URLSearchParams()
      param.append("bizContent", JSON.stringify(bizContent))

      axios.post(httpUrl.submitInfo, param)
      .then(res => {
        if (res.data.errcode === 0) {
          this.isShowUpdateSuccess = true
          setTimeout(() => {
            this.isShowUpdateSuccess = false
          }, 2000)
          localStorage.memberName = this.memberName
          localStorage.sex = this.sex
          localStorage.birthday = this.birthday
        } else {
          this.errmsg = res.data.errmsg
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
