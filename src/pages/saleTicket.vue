<template>
  <div>
    <div class="tab">
      <a @click="handleChange1" :class="a===1?'active':''"
        href="javascript:;">未使用 (<span>{{ total1 }}</span>)</a>
      <a @click="handleChange2" :class="a===2?'active':''"
        href="javascript:;">已使用（<span>{{ total2 }}</span>）</a>
      <a @click="handleChange3" :class="a===3?'active':''"
        href="javascript:;">已过期（<span>{{ total3 }}</span>）</a>
    </div>
    <div v-if="this.a === 1" class="tab-panel">
      <div v-for="item in saleTicketsList" v-if="item.flag === 1" class="item">
        <div class="left">@</div>
        <div class="right">
          <h3>{{ item.suiName }}</h3>
          <p class="text">{{ item.suiText }}</p>
          <p class="date">有效期</p>
        </div>
      </div>
    </div>
    <div v-if="this.a === 2" class="tab-panel">
      <div v-for="item in saleTicketsList" v-if="item.flag === 2" class="item">
        <div class="left">@</div>
        <div class="right">
          <h3>{{ item.suiName }}</h3>
          <p class="text">{{ item.suiText }}</p>
          <p class="date">有效期</p>
        </div>
      </div>
    </div>
    <div v-if="this.a === 3" class="tab-panel">
      <div v-for="item in saleTicketsList" v-if="item.flag === 3" class="item">
        <div class="left">@</div>
        <div class="right">
          <h3>{{ item.suiName }}</h3>
          <p class="text">{{ item.suiText }}</p>
          <p class="date">有效期</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import httpUrl from '@/http_url'
export default {
  data () {
    return {
      a: 1,
      saleTicketsList: []
    }
  },
  computed: {
    total1 () {
      let arr = []
      for (let i=0;i<this.saleTicketsList.length;i++) {
        if (this.saleTicketsList[i].flag === 1) {
          arr.push(this.saleTicketsList[i])
        }
      }
      return arr.length
    },
    total2 () {
      let arr = []
      for (let i=0;i<this.saleTicketsList.length;i++) {
        if (this.saleTicketsList[i].flag === 2) {
          arr.push(this.saleTicketsList[i])
        }
      }
      return arr.length
    },
    total3 () {
      let arr = []
      for (let i=0;i<this.saleTicketsList.length;i++) {
        if (this.saleTicketsList[i].flag === 3) {
          arr.push(this.saleTicketsList[i])
        }
      }
      return arr.length
    }
  },
  methods: {
    handleChange1 () {
      this.a = 1
    },
    handleChange2 () {
      this.a = 2
    },
    handleChange3 () {
      this.a = 3
    },
    getDatas () {
      axios.get(httpUrl.getSaleTicketsList)
        .then(res => {
          if (res.data.errcode === 0) {
            // success
            this.saleTicketsList = res.data.res.getSaleTicketsList
          } else {
            console.log(res.data.errmsg)
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
.tab {
  display: flex;
  padding: 0 15px;
  background-color: #ffffff;
  margin-bottom: 15px;
}
.tab a {
  display: block;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 8px;
  background-color: #ffffff;
  font-size: 14px;
  color: #404040;
  /* border: 1px solid red; */
}
.tab > .active {
  position: relative;
  display: flex;
  /* border: 1px solid green; */
}
.tab > .active:after {
  position: absolute;
  bottom: 0px;
  left: 7px;
  height: 2px;
  width: 100px;
  background: #e62f2f;
  content: '';
}
.item {
  display: flex;
  border: 1px solid #eeeeee;
  background-color: #fff;
  margin: 10px 15px;
  padding: 10px 0;
  height: 100px;
  box-sizing: border-box;
  border-left: 4px dotted red;
  position: relative;
}
.item:before {
  content: '';
  background-color: red;
  height: 100px;
  width: 2px;
  position: absolute;
  left: -4px;
  top: -1px;
}
.item .left {
  width: 100px;
  border-right: 1px solid #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
}
.item .right {
  padding: 0 10px;
  /* flex-grow: 1; */
}
.item .right h3 {
  font-size: 18px;
  font-weight: normal;
}
.item .right .text {
  color: #999999;
  font-size: 14px;
}
.item .right .date {
  font-size: 12px;
  color: #999999;
}
</style>
