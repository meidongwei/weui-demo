<template>
  <div>
    <!-- 带说明、跳转的列表项 -->
    <div v-if="mobile!=='undefined'" class="weui-cells" style="margin-bottom: 20px;">
      <router-link :to="{name: 'updatePhone'}" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>手机</p>
        </div>
        <div class="weui-cell__ft">{{ mobile }}</div>
      </router-link>
    </div>
    <div v-else class="weui-cells" style="margin-bottom: 20px;">
      <router-link :to="{name: 'updatePhone2'}" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>手机</p>
        </div>
        <div class="weui-cell__ft">请绑定手机号</div>
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
          <p v-if="sex == 1">男</p>
          <p v-else>女</p>
        </div>
      </router-link>
      <router-link :to="{name: 'updateInfo'}"
        class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>生日</p>
        </div>
        <div class="weui-cell__ft">
          <p>{{ birthday }}</p>
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
    <div id="toast" v-if="isShowSuccess">
        <!-- <div class="weui-mask_transparent"></div> -->
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">操作成功</p>
        </div>
    </div>
    <div id="toast" v-if="isShowFalse">
        <!-- <div class="weui-mask_transparent"></div> -->
        <div class="weui-toast">
            <i style="color: #fff;margin-bottom: 5px;font-size: 40px;margin-top: 30px;"
              class="weui-icon-info-circle weui-icon_toast"></i>
            <p class="weui-toast__content">操作失败</p>
        </div>
    </div>
    <!--end toast-->



  </div>
</template>

<script>
import axios from 'axios'
import httpUrl from '@/http_url.js'
export default {
  data () {
    return {
      mobile: 0,
      memberName: '',
      sex: 0,
      birthday: '',
      isShowSuccess: false,
      isShowFalse: false
    }
  },
  methods: {
    getProfileDatas () {
      this.mobile = localStorage.getItem('mobile')
      this.memberName = localStorage.getItem('memberName')
      this.sex = localStorage.getItem('sex')
      this.birthday = localStorage.getItem('birthday')
      var dateArr = this.birthday.split('-')
      this.birthday = dateArr[0]+'年'+dateArr[1].replace(/^0/,'')
        +'月'+dateArr[2].replace(/^0/,'')+'日'
    },
    resetPwd () {
      axios.get(httpUrl.resetPwd)
      .then(res => {
        if (res.data.errcode === 0) {
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
    this.getProfileDatas()
  }
}
</script>

<style>
</style>
