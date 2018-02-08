<template>
  <router-view></router-view>
</template>

<script>
export default {
}
</script>

<style>
html, body {
  background-color: #f8f8f8;
}
.weui-btn_plain-primary {
  color: #32b16c;
  border: 1px solid #32b16c;
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
</style>
