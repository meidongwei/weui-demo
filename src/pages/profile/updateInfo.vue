<template>
  <div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>姓名</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"
            style="text-align:right;"
            placeholder="请输入姓名"
            value="李小明"/>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>性别</p>
        </div>
        <div class="weui-cell__bd" style="display:flex;justify-content:flex-end;">
          <div style="margin-right: 15px;">
            <input v-model="sex" value="0" id="boy" type="radio"
              style=""/>
            <label for="boy">男</label>
          </div>
          <div>
            <input v-model="sex" value="1" id="girl" type="radio"/>
            <label for="girl">女</label>
          </div>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>生日</p>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"
            style="text-align:right;"
            placeholder="请输入验证码"/>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <a class="weui-btn weui-btn_plain-primary"
      style="width: 320px;"
      :style="[{'border': '1px solid' + theme}, {'color': theme}]"
      href="javascript:;">进入微信卡包</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      theme: '#32b16c',
      sex: 0
    }
  }
}
</script>

<style scoped>
</style>
