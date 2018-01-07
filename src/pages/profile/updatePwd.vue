<template>
  <div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>旧密码</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"
            style="text-align:right;"
            placeholder="请输入旧密码"/>
        </div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>新密码</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"
            style="text-align:right;"
            placeholder="请输入新密码"/>
        </div>
      </div>
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>确认新密码</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"
            style="text-align:right;"
            placeholder="请再次输入你的新密码"/>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <a class="weui-btn weui-btn_plain-primary"
      style="width: 320px;"
      :style="[{'border': '1px solid' + theme}, {'color': theme}]"
      href="javascript:;">保存</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      theme: ''
    }
  },
  methods: {
    getTheme () {
      this.theme = localStorage.getItem('theme')
    }
  },
  created () {
    this.getTheme()
  }
}
</script>

<style>
</style>
