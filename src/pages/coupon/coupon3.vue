<template>
  <div>
    <div v-for="item in coupons" class="item">
      <div class="left" v-if="item.type === 0">
        <div>
          ¥
          <span style="font-size: 30px;">
            {{ parseInt(item.deductamount/100) }}
          </span>
        </div>
      </div>
      <div class="left" v-if="item.type === 1">
        <div>
          <span style="font-size: 30px;">
            菜
          </span>
        </div>
      </div>
      <div class="right">
        <h3>{{ item.couponname }}</h3>
        <p v-if="item.useflag === 1" class="text">使用条件：消费满{{ parseInt(item.useamount/100) }}元可用</p>
        <p v-if="item.useflag === 0" class="text">使用条件：消费每满{{ parseInt(item.useamount/100) }}元可用</p>
        <p class="date">有效期：{{ item.startdate }} 至 {{ item.enddate }}</p>
      </div>
    </div>
    <!-- spinner: bubbles  circles  spiral  waveDots -->
    <div class="loadmore" v-if="!isTriggerFirstLoad">
      <button @click="isTriggerFirstLoad = true" >加载更多</button>
    </div>
    <infinite-loading spinner="waveDots" v-else
      @infinite="infiniteHandler">
      <span slot="no-more">
        没有更多信息了 : (
      </span>
      <span slot="no-results">
        暂无数据 : (
      </span>
    </infinite-loading>

    <!--BEGIN toast-->
    <toastFalse :isShowToast="isShowMsg">
      <p>{{ errmsg }}</p>
    </toastFalse>
    <!--end toast-->

  </div>
</template>
<script>
import axios from 'axios'
import httpUrl from '@/http_url'
import InfiniteLoading from 'vue-infinite-loading'
import toastFalse from '@/components/toastFalse'
export default {
  components: {
    InfiniteLoading,
    toastFalse
  },
  data () {
    return {
      coupons: [],
      couponNum: 0,
      pageSize: 5,
      isTriggerFirstLoad: false,
      isShowMsg: false,
      errmsg: ''
    }
  },
  methods: {
    infiniteHandler ($state) {
      let a = {
        memberid: Number(localStorage.getItem('memberid')),
        pageNo: Math.ceil(this.coupons.length / this.pageSize) + 1,
        pageSize: this.pageSize,
        status: 2
      }
      let data = 'bizContent=' + JSON.stringify(a)
      axios({
        method: 'post',
        url: httpUrl.getCouponList,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
      .then(res => {
        if (res.data.errcode === 0) {
          this.couponNum = res.data.res.rowCount
          if (res.data.res.coupons.length > 0) {
            this.coupons = this.coupons.concat(res.data.res.coupons)
            localStorage.coupons3 = JSON.stringify(this.coupons)
            $state.loaded()
          } else {
            // 显示： 没有更多信息了
            $state.complete()
          }
        } else {
          this.errmsg = res.data.errmsg
          this.isShowMsg = true
          setTimeout(() => {
            this.isShowMsg = false
          }, 2000)
        }
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.coupons = JSON.parse(localStorage.coupons3)
  }
}
</script>
<style scoped>
.item {
  display: flex;
  border: 1px solid #eeeeee;
  background-color: #fff;
  margin: 10px 15px;
  padding: 10px 0;
  height: 100px;
  box-sizing: border-box;
  border-left: 4px dotted #999999;
  position: relative;
}
.item:before {
  content: '';
  background-color: #999999;
  height: 100px;
  width: 2px;
  position: absolute;
  left: -4px;
  top: -1px;
}
.item .left {
  width: 90px;
  border-right: 1px solid #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  color: #999999;
}
.item .right {
  padding: 0 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  flex-grow: 0;
}
.item .right h3 {
  font-size: 18px;
  font-weight: normal;
    color: #999999;
}
.item .right .text {
  color: #c1c1c1;
  font-size: 14px;
}
.item .right .date {
  font-size: 12px;
  color: #c1c1c1;
}
</style>
