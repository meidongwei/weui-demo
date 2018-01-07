<template>
  <div class="page">
    <div class="bg-white">
      <h4>请让服务员扫码收款</h4>
      <barcode :value="number" font-options="bold"
        style="margin: 20px 0;">
        Can't generate the barcode
      </barcode>
      <qriously :value="number" :size="155"></qriously>
    </div>
  </div>
</template>
<script>
import VueBarcode from 'vue-barcode'
export default {
  components: {
    barcode: VueBarcode
  },
  data () {
    return {
      number: '8000000001000001'
    }
  }
}
</script>
<style scoped>
.page {
  height: 100%;
  background-color: #313131;
  padding-top: 20px;
  box-sizing: border-box;
}
.bg-white {
  width: 320px;
  height: 450px;
  background-color: #fff;
  border-radius: 3px;
  margin: 0 auto;
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
