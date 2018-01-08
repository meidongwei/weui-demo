<template>
  <div>
    <Scroll :on-reach-bottom="handleReachBottom" height="580">
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
    </Scroll>
    <!--BEGIN toast-->
    <div id="toast" v-if="isShow">
        <!-- <div class="weui-mask_transparent"></div> -->
        <div class="weui-toast" style="padding-top: 10px;">
            <i style="color: #fff;margin-bottom: 5px;"
              class="weui-icon-info-circle weui-icon_toast"></i>
            <p class="weui-toast__content">没有数据了</p>
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
      rechargeList: [],
      // 当前页面
      nowIndex: 1,
      // 每页显示条数
      number: 5,
      isShow: false
    }
  },
  methods: {
    getRechargeDatas () {
      axios.post(httpUrl.getRechargeDatas,[
        this.nowIndex,
        this.number
      ])
      .then(res => {
        if (this.rechargeList == '') {
          this.rechargeList = res.data.getRechargeList
        } else {
          if (res.data.getRechargeList !== '') {
            this.rechargeList = this.rechargeList.concat(res.data.getRechargeList)
            this.nowIndex = this.nowIndex + 1
          } else {
            this.isShow = true
            setTimeout(() => {
              this.isShow = false
            }, 2000)
          }
        }
      })
      .catch(err => console.log(err))
    },
    handleReachBottom () {
      return new Promise(resolve => {
        setTimeout(() => {
          this.getRechargeDatas()
          resolve();
        }, 2000);
      })
    }
  },
  created () {
    this.getRechargeDatas()
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
