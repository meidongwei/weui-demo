<template>
  <div>
    <!-- 循环 -->
    <div dis-hover v-for="(item, index) in rechargeList" :key="index" class="segment"
      :class="[item.status == 1 ? 'green' : 'red']">
      <div class="header">
        <h3 v-if="item.status == 1 ">充值金额：<span>{{ (item.money/100 + item.rewardmoney/100).toFixed(2) }}</span></h3>
        <h3 v-if="item.status == 2 ">取消消费：<span style="color: #eb6941;">{{ (item.money/100 + item.rewardmoney/100).toFixed(2) }}</span></h3>
        <span>{{ showDate(item.finaltime) }}</span>
      </div>
      <div class="address">充值门店：{{ item.ognname }}</div>
      <ul class="else">
        <li>实充金额：{{ ((item.money)/100).toFixed(2) }}</li>
        <li>奖励金额：{{ (item.rewardmoney)/100 }}</li>
      </ul>
    </div>
    <!-- end 循环 -->

    <infinite-loading spinner="waveDots"
      @infinite="infiniteHandler">
      <span slot="no-more">
        没有更多信息了
      </span>
      <span slot="no-results" style="display: flex; justify-content: center; align-items:center;">
        <!-- 暂无数据 : ( -->
        <div></div>
        <img style="width: 120px;margin-top: 150px;" src="../assets/no-datas.png" alt="no-datas"/>
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
    // 时间戳转日期
    showDate (str) {
      let date = new Date(str)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // let Y = date.getFullYear() + '-'
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      let D = date.getDate() + ' '
      let h = date.getHours() + ':'
      let m = date.getMinutes()
      // let s = date.getSeconds()
      return M+D+h+m
    },
    infiniteHandler($state) {
      let a = {
        cno: localStorage.getItem('memberno'),
        pageNo: Math.ceil(this.rechargeList.length / this.pageSize) + 1,
        pageSize: this.pageSize
      }
      let data = 'bizContent=' + JSON.stringify(a)
      axios({
        method: 'post',
        url: httpUrl.getRechargeDatas,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
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
  color: #333333;
  margin-bottom: 5px;
  font-weight: normal;
}
.header > h3 > span {
  font-size: 18px;
  color: #45c38a;
  margin-bottom: 5px;
  font-weight: normal;
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
