<template>
  <keep-alive include="cardIndex">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
}
</script>

<style>
html, body {
  background-color: #f8f8f8;
  margin:0;
  height:100%;
}
.weui-btn_plain-primary {
  color: #32b16c;
  border: 1px solid #32b16c;
}
.weui-btn_plain-primary:active {
  background-color: #e8e8e8;
}
.loadmore {
  display: flex;
  justify-content: center;
  padding: 0 15px;
}
.loadmore button {
  width: 100%;
  background: rgba(242, 242, 242, 0.8);
  border: none;
  padding: 5px 10px;
  color: #b3b3b3;
}
.loadmore button:hover {
  background: rgba(231, 231, 231, 0.8);
  color: #b3b3b3;
}
.weui-cells {
  margin-top: 0;
  margin-bottom: 10px;
}
.weui-cells .weui-cell__bd {
  font-size: 14px;
  color: #333333;
}
.weui-cells .weui-cell__ft {
  font-size: 14px;
  color: #666666;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #999; opacity:1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #999;
  opacity:1;
}
input:-ms-input-placeholder{
  color: #999;
  opacity:1;
}
input::-webkit-input-placeholder{
  color: #999;
  opacity:1;
}
</style>
