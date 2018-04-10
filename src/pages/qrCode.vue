<template>
  <div class="page">
    <div class="bg-white">
      <h4>请让服务员扫码收款</h4>
      <!-- width="1" -->
      <barcode :value="number" font-options="bold"
        style="margin: 20px 0;">
        加载中...
      </barcode>
      <p class="m-code">{{ this._number }}</p>
      <p>{{ errmsg }}</p>
      <qriously :value="number" :size="155"></qriously>
    </div>
  </div>
</template>
<script>
import VueBarcode from 'vue-barcode'
import axios from 'axios'
import httpUrl from '@/http_url'
export default {
  components: {
    barcode: VueBarcode
  },
  data () {
    return {
      number: '',
      errmsg: ''
    }
  },
  computed: {
    _number () {
      return this.number.replace(/\s/g,'')
        .replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ')
    }
  },
  methods: {
    getPayNum () {
      let a = {
        memberid: Number(localStorage.getItem('memberid'))
      }
      let data = 'bizContent=' + JSON.stringify(a)
      axios({
        method: 'post',
        url: httpUrl.getPayNum,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: data
      })
      .then(res => {
        if (res.data.errcode === 0) {
          this.number = res.data.res.payno
        } else {
          this.errmsg = res.data.errmsg
        }
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.getPayNum()
  }
}
</script>
<style scoped>
.page {
  padding: 20px 0;
  box-sizing: border-box;
  height: 100vh;
  background-color: #000;
}
.bg-white {
  width: 320px;
  height: 450px;
  background-color: #fff;
  border-radius: 3px;
  margin: 0 auto;
  /* box-shadow: 0 0 10px lightgray; */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative
}
.bg-white > h4 {
  font-weight: normal;
  color: #999;
  text-align: center;
  padding-top: 30px;
}
.m-code {
  /* border: 1px solid red; */
  position: absolute;
  top: 190px;
  background-color: #fff;
  width: 100%;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 18px;
}
</style>
