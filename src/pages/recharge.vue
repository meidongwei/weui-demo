<template>
  <div>
    <!-- 循环 -->
    <div dis-hover v-for="(item, index) in rechargeList" :key="index" class="segment"
      :class="[item.status == 1 ? 'green' : 'red']">
      <div class="header">
        <h3 v-if="item.status == 1 ">充值金额：{{ (item.money + item.rewardmoney).toFixed(2) }}元</h3>
        <h3 v-else style="color: #eb6941;">取消消费：{{ (item.money + item.rewardmoney).toFixed(2) }}元</h3>
        <span>{{ item.finaltime }}</span>
      </div>
      <div class="address">充值门店：{{ item.ognname }}</div>
      <ul class="else">
        <li>实冲金额：{{ (item.money).toFixed(2) }}元</li>
        <li>奖励金额：{{ (item.rewardmoney).toFixed(2) }}元</li>
      </ul>
    </div>
    <!-- end 循环 -->

    <infinite-loading spinner="waveDots"
      @infinite="infiniteHandler">
      <span slot="no-more">
        没有更多信息了 : (
      </span>
      <span slot="no-results">
        暂无数据 : (
      </span>
    </infinite-loading>

    <!--BEGIN toast-->
    <toastFalse :isShowToast="isShowFalse">
      <p>{{ errmsg }}</p>
    </toastFalse>
    <!--end toast-->

  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import toastFalse from '@/components/toastFalse'
import axios from 'axios'
import httpUrl from '@/http_url'
export default {
  components: {
    InfiniteLoading,
    toastFalse
  },
  data () {
    return {
      rechargeList: [],
      // 每页显示条数
      pageSize: 5,
      isShowFalse: false,
      errmsg: ''
    }
  },
  methods: {
    infiniteHandler($state) {
      let bizContent = {}
      bizContent.cno = localStorage.getItem('memberno')
      bizContent.pageNo = Math.ceil(this.rechargeList.length / this.pageSize) + 1
      bizContent.pageSize = this.pageSize

      let param = new URLSearchParams()
      param.append("bizContent", JSON.stringify(bizContent))

      axios.post(httpUrl.getRechargeDatas, param)
      .then(res => {
        if (res.data.errcode === 0) {
          if (res.data.res.length > 0) {
            this.rechargeList = this.rechargeList.concat(res.data.res)
            $state.loaded()
          } else {
            $state.complete()
          }
        } else {
          this.errmsg = res.data.errmsg
          this.isShowFalse = true
          setTimeout(() => {
            this.isShowFalse = false
          }, 2000)
        }
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
.segment {
  max-width: 340px;
  padding: 15px;
  margin: 20px auto 0;
  background-color: #fff;
  box-shadow: 0 0 2px lightgray;
  border-top: 3px solid #45c38a;
  box-sizing: border-box;
}
.green {
  border-top: 3px solid #45c38a;
}
.red {
  border-top: 3px solid #eb6941;
}
.header {
  display: flex;
  justify-content: space-between;
}
.header > h3 {
  font-size: 16px;
  color: #45c38a;
  margin-bottom: 5px;
}
.header > span {
  font-size: 12px;
  color: #999;
}
.address {
  font-size: 13px;
  color: #333;
  margin-bottom: 5px;
}
.else > li {
  list-style: none;
  font-size: 12px;
  color: #999;
}
</style>
