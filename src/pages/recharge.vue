<template>
  <div>
    <!-- 循环 -->
    <div dis-hover v-for="(item, index) in rechargeList" :key="index" class="segment"
      :class="[item.isSuccess ? 'green' : 'red']">
      <div class="header">
        <h3 v-if="item.isSuccess">充值金额：{{ item.recMoney }}元</h3>
        <h3 v-else style="color: #eb6941;">取消消费：{{ item.recMoney }}元</h3>
        <span>{{ item.recDate }}</span>
      </div>
      <div class="address">充值门店：{{ item.recAddress }}</div>
      <ul class="else">
        <li>实冲金额：{{ item.recActual }}元</li>
        <li>奖励金额：{{ item.recReward }}元</li>
      </ul>
    </div>
    <!-- end 循环 -->
    <!-- bubbles  circles  spiral  waveDots -->
    <infinite-loading spinner="waveDots"
      @infinite="infiniteHandler">
      <span slot="no-more">
        There is no more datas :(
      </span>
    </infinite-loading>

  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
import httpUrl from '@/http_url'
export default {
  components: {
    InfiniteLoading
  },
  data () {
    return {
      rechargeList: [],
      // 每页显示条数
      number: 5
    }
  },
  methods: {
    infiniteHandler($state) {
      axios.post(httpUrl.getRechargeDatas, {
        params: {
          page: this.rechargeList.length / this.number + 1,
        }
      })
      .then(res => {
        if (res.data.getRechargeList.length) {
          this.rechargeList = this.rechargeList.concat(res.data.getRechargeList)
          $state.loaded()
          // if (this.suiStoreList.length / 10 === 10) {
          //   $state.complete()
          // }
        } else {
          $state.complete()
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
