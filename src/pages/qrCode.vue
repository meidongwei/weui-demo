<template>
  <div class="page">
    <div class="bg-white">
      <h4>请让服务员扫码收款</h4>
      <barcode :value="number" font-options="bold"
        style="margin: 20px 0;">
        Can't generate the barcode
      </barcode>
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
  methods: {
    getPayNum () {
      let bizContent = {}
      bizContent.memberid = Number(localStorage.getItem('memberid'))

      let param = new URLSearchParams()
      param.append("bizContent", JSON.stringify(bizContent))

      axios.post(httpUrl.getPayNum, param)
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
}
.bg-white > h4 {
  font-weight: normal;
  color: #999;
  text-align: center;
  padding-top: 30px;
}
</style>
