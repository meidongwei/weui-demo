<template>
  <div>
    <!-- 带说明、跳转的列表项 -->
    <!-- <div v-if="mobile!=='undefined'" class="weui-cells" style="margin-bottom: 20px;">
      <router-link :to="{name: 'updatePhone'}" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>手机</p>
        </div>
        <div class="weui-cell__ft">{{ mobile }}</div>
      </router-link>
    </div> -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <router-link :to="{name: 'updatePhone2'}" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>手机</p>
        </div>
        <div v-if="mobile!=='undefined'" class="weui-cell__ft">{{ mobile }}</div>
        <div v-else class="weui-cell__ft">请绑定手机号</div>
      </router-link>
    </div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <router-link :to="{name: 'updateInfo'}"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>姓名</p>
        </div>
        <div class="weui-cell__ft">{{ memberName }}</div>
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
          <p v-if="birthday !== 'undefined'">{{ birthday }}</p>
          <p v-else>请选择</p>
        </div>
      </router-link>
    </div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
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
      <p>重置失败</p>
    </toastFalse>
    <!--end toast-->



  </div>
</template>

<script>
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
      isShowResetFalse: false
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
      let bizContent = {}
      bizContent.cno = localStorage.getItem('memberno')

      let param = new URLSearchParams()
      param.append("bizContent", JSON.stringify(bizContent))

      axios.post(httpUrl.resetPwd, param)
      .then(res => {
        if (res.data.errcode === 0) {
          this.isShowResetSuccess = true
          setTimeout(() => {
            this.isShowResetSuccess = false
          }, 2000)
        } else {
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
  }
}
</script>

<style>
</style>
