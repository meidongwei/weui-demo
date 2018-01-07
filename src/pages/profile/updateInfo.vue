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
            :value="proName"/>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>性别</p>
        </div>
        <div class="weui-cell__bd" style="display:flex;justify-content:flex-end;">
          <div style="margin-right: 15px;">
            <input v-model="proSex" value="1" id="boy" type="radio"
              style=""/>
            <label for="boy">男</label>
          </div>
          <div>
            <input v-model="proSex" value="2" id="girl" type="radio"/>
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
            placeholder="请输入验证码"
            :value="proBirthday"/>
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
      theme: '',
      proName: '',
      proSex: 0,
      proBirthday: ''
    }
  },
  methods: {
    getTheme () {
      this.theme = localStorage.getItem('theme')
    }
  },
  created () {
    this.getTheme()
    this.proName = this.$route.query.proName
    this.proSex = this.$route.query.proSex
    this.proBirthday = this.$route.query.proBirthday
  }
}
</script>

<style scoped>
</style>
