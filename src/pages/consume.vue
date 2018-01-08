<template>
  <div>
    <Scroll :on-reach-bottom="handleReachBottom" height="580">
      <div dis-hover v-for="(item, index) in consumeList" :key="index" class="segment"
        :class="[item.isSuccess ? 'green' : 'red']">
        <div class="header">
          <h3 v-if="item.isSuccess">消费金额：{{ item.conMoney }}元</h3>
          <h3 v-else style="color: #eb6941;">取消消费：{{ item.conMoney }}元</h3>
          <span>{{ item.conDate }}</span>
        </div>
        <div class="address">消费门店：{{ item.conAddress }}</div>
        <ul class="else">
          <li>预存支付：{{ item.conPrestore }}元</li>
          <li>积分支付：{{ item.conScore }}元</li>
          <li>其他支付：{{ item.conElse }}元</li>
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
      consumeList: [],
      // 当前页面
      nowIndex: 1,
      // 每页显示条数
      number: 5,
      isShow: false
    }
  },
  methods: {
    getConsumeDatas () {
      axios.post(httpUrl.getConsumeDatas,[
        this.nowIndex,
        this.number
      ])
      .then(res => {
        if (this.consumeList == '') {
          this.consumeList = res.data.getConsumeList
        } else {
          if (res.data.getConsumeList == '') {
            this.consumeList = this.consumeList.concat(res.data.getConsumeList)
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
          this.getConsumeDatas()
          resolve();
        }, 2000);
      })
    }
  },
  created () {
    this.getConsumeDatas()
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
