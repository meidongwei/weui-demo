<template>
  <div style="padding-top: 10px;">
    <!-- 带说明、跳转的列表项 -->
    <!-- <div v-if="mobile!=='undefined'" class="weui-cells" style="margin-bottom: 20px;">
      <router-link :to="{name: 'updatePhone'}" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>手机</p>
        </div>
        <div class="weui-cell__ft">{{ mobile }}</div>
      </router-link>
    </div> -->
    <div class="weui-cells">
      <router-link :to="{name: 'updatePhone'}" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>手机</p>
        </div>
        <div v-if="mobile !== 'undefined' && mobile !== null" class="weui-cell__ft">{{ mobile }}</div>
        <div v-else class="weui-cell__ft">请绑定手机号</div>
      </router-link>
    </div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells">
      <router-link :to="{name: 'updateInfo'}"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>姓名</p>
        </div>
        <div v-if="memberName !== 'undefined' && memberName !== 'null'"
          class="weui-cell__ft">{{ memberName }}</div>
        <div v-else class="weui-cell__ft"></div>
      </router-link>
      <router-link :to="{name: 'updateInfo'}"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>性别</p>
        </div>
        <div class="weui-cell__ft">
          <p v-if="sex === 1">男</p>
          <p v-else-if="sex === 2">女</p>
          <p v-else>请选择</p>
        </div>
      </router-link>
      <router-link :to="{name: 'updateInfo'}"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>生日</p>
        </div>
        <div class="weui-cell__ft">
          <p v-if="birthday && birthday != 'undefined' && birthday != 'null'">{{ birthday }}</p>
          <p v-else>请选择</p>
        </div>
      </router-link>
    </div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells">
      <router-link to="/updatePwd" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>修改会员卡密码</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
      <a class="weui-cell weui-cell_access" href="javascript:;"
        @click="resetPwd">
        <div class="weui-cell__bd">
          <p>重置会员卡密码</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
    </div>


    <!--BEGIN toast-->
    <toastSuccess :isShowToast="isShowResetSuccess">
      <p>重置成功</p>
    </toastSuccess>
    <toastFalse :isShowToast="isShowResetFalse">
      <p>{{ errmsg }}</p>
    </toastFalse>
    <!--end toast-->



  </div>
</template>

<script>
import 'weui'
import weui from 'weui.js'
import toastSuccess from '@/components/toastSuccess'
import toastFalse from '@/components/toastFalse'
import axios from 'axios'
import httpUrl from '@/http_url.js'
export default {
  components: {
    toastSuccess,
    toastFalse
  },
  data () {
    return {
      mobile: 0,
      memberName: '',
      sex: 0,
      birthday: '',
      isShowResetSuccess: false,
      isShowResetFalse: false,
      errmsg: ''
    }
  },
  methods: {
    getProfileDatas () {
      this.mobile = localStorage.getItem('mobile')
      this.memberName = localStorage.getItem('memberName')
      this.sex = Number(localStorage.getItem('sex'))
      this.birthday = localStorage.getItem('birthday')
      // 2018-01-18 转 2018年1月18日
      // let dateArr = this.birthday.split('-')
      // this.birthday = this.birthday || dateArr[0]+'年'+dateArr[1].replace(/^0/,'')
      //   +'月'+dateArr[2].replace(/^0/,'')+'日'

      // 时间戳
      // this.birthday = this.birthday && new Date(this.birthday * 1000)
    },
    resetPwd () {
      let a = {
        cno: localStorage.getItem('memberno')
      }
      let data = 'bizContent=' + JSON.stringify(a)
      axios({
        method: 'post',
        url: httpUrl.resetPwd,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
      .then(res => {
        if (res.data.errcode === 0) {
          this.isShowResetSuccess = true
          setTimeout(() => {
            this.isShowResetSuccess = false
          }, 2000)
        } else {
          this.errmsg = res.data.errmsg
          this.isShowResetFalse = true
          setTimeout(() => {
            this.isShowResetFalse = false
          }, 2000)
        }
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.getProfileDatas()
    // 在 profile 页面 showPicker 方法中为 picker 设置自定义类名：
    // className: 'm-picker', 本页面初始化时获取 picker 对象，判断
    // picker 对象是否存在，如果存在就隐藏。
    if (document.getElementsByClassName('m-picker')[0] !== undefined) {
      weui.datePicker().hide()
    }
  }
}
</script>

<style scoped>
</style>
