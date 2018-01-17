<template>
  <div v-if="isShowToast">
    <div class="weui-toast">
      <i class="weui-icon-success-no-circle weui-icon_toast"></i>
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
