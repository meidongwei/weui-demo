<template>
  <div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <router-link to="/updatePhone" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>手机</p>
        </div>
        <div class="weui-cell__ft">18503118888</div>
      </router-link>
    </div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <router-link to="/updateInfo" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>姓名</p>
        </div>
        <div class="weui-cell__ft">李小明</div>
      </router-link>
      <router-link to="/updateInfo" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>性别</p>
        </div>
        <div class="weui-cell__ft">
          <p>男</p>
        </div>
      </router-link>
      <router-link to="/updateInfo" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>生日</p>
        </div>
        <div class="weui-cell__ft">
          <p>1990-1-1</p>
        </div>
      </router-link>
    </div>
    <!-- 带说明、跳转的列表项 -->
    <div class="weui-cells" style="margin-bottom: 20px;">
      <router-link to="/updatePwd" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>修改会员卡密码</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
      <a class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>充值会员卡密码</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
