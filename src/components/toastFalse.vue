<template>
  <div v-if="isShowToast">
    <div class="weui-toast">
      <i style="color: #fff;margin-bottom: 5px;font-size: 40px;margin-top: 30px;"
        class="weui-icon-info-circle weui-icon_toast"></i>
      <!-- <p class="weui-toast__content">发送成功</p> -->
      <slot class="weui-toast__content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowToast: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>
