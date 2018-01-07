<template>
  <div>
    <div class="segment">
      <div class="header">
        <h3>充值金额：580元</h3>
        <span>2018-1-1</span>
      </div>
      <div class="address">充值门店：河北人家</div>
      <ul class="else">
        <li>实冲金额：20元</li>
        <li>奖励金额：50元</li>
      </ul>
    </div>
    <div class="segment" style="border-top: 3px solid #eb6941;">
      <div class="header">
        <h3 style="color: #eb6941;">撤销充值：580元</h3>
        <span>2018-1-1</span>
      </div>
      <div class="address">充值门店：河北人家</div>
      <ul class="else">
        <li>实冲金额：20元</li>
        <li>奖励金额：50元</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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
