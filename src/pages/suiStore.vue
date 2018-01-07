<template>
  <div>
    <div class="page__bd" style="margin-top: 20px;">
        <div class="weui-panel weui-panel_access">
            <div class="weui-panel__bd">
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg sui-store">
                    <div class="weui-media-box__bd media-left">
                        <div class="media-left-header">
                          <h4 class="weui-media-box__title">北京房山中粮万科店</h4>
                          <span>240.90公里</span>
                        </div>
                        <p class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                    </div>
                    <div class="weui-media-box__hd">
                        <icon name="map-marker" scale="2"></icon>
                    </div>
                </a>
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg sui-store">
                    <div class="weui-media-box__bd media-left">
                        <div class="media-left-header">
                          <h4 class="weui-media-box__title">北京房山中粮万科店</h4>
                          <span>240.90公里</span>
                        </div>
                        <p class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                    </div>
                    <div class="weui-media-box__hd">
                        <icon name="map-marker" scale="2"></icon>
                    </div>
                </a>
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg sui-store">
                    <div class="weui-media-box__bd media-left">
                        <div class="media-left-header">
                          <h4 class="weui-media-box__title">北京房山中粮万科店</h4>
                          <span>240.90公里</span>
                        </div>
                        <p class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                    </div>
                    <div class="weui-media-box__hd">
                        <icon name="map-marker" scale="2"></icon>
                    </div>
                </a>
            </div>
        </div>
      </div>

  </div>
</template>

<script>
import 'vue-awesome/icons/map-marker'
import Icon from 'vue-awesome/components/Icon'
export default {
  components: {
    Icon
  }
}
</script>

<style scoped>
.media-left {
  border-right: 1px solid #e5e5e5;
  padding-right: 10px;
}
.media-left-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.media-left-header > span {
  font-size: 12px;
  color: #999;
}
.sui-store .weui-media-box__hd {
  margin-right: 0;
  margin-left: 10px;
  color: #32b16c;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
