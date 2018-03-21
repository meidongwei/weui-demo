<template>
  <div>
    <div class="page__bd" style="margin-top: 20px;">
        <div class="weui-panel weui-panel_access">
            <div class="weui-panel__bd">
                <!-- 循环 -->
                <a v-for="(item, index) in suiStoreList" :key="index" href="javascript:;"
                  class="weui-media-box weui-media-box_appmsg sui-store">
                    <div class="weui-media-box__bd media-left">
                        <div class="media-left-header">
                          <h4 class="weui-media-box__title">{{ item.suiName }}</h4>
                          <span>{{ item.suiDistance }}公里</span>
                        </div>
                        <p class="weui-media-box__desc">{{ item.suiAddress }}</p>
                    </div>
                    <div class="weui-media-box__hd">
                        <icon name="map-marker" scale="2"></icon>
                    </div>
                </a>
                <!-- end 循环 -->
                <!-- bubbles  circles  spiral  waveDots -->
                <infinite-loading spinner="waveDots"
                  @infinite="infiniteHandler">
                  <span slot="no-more">
                    There is no more datas :(
                  </span>
                </infinite-loading>

            </div>
        </div>
      </div>

  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
import httpUrl from '@/http_url'
import 'vue-awesome/icons/map-marker'
import Icon from 'vue-awesome/components/Icon'
export default {
  components: {
    Icon,
    InfiniteLoading
  },
  data () {
    return {
      suiStoreList: [],
      // 每页显示条数
      number: 10
    }
  },
  methods: {
    infiniteHandler($state) {
      let bizContent = {}
      bizContent.page = this.suiStoreList.length / this.number + 1

      // let param = new URLSearchParams()
      // param.append("bizContent", JSON.stringify(bizContent))

      axios.get(httpUrl.getSuiStoreDatas+"&bizContent="+JSON.stringify(bizContent))
      .then(res => {
        if (res.data.errcode == 0) {
          this.suiStoreList = this.suiStoreList.concat(res.data.res.getSuiStoreList)
          $state.loaded()
          // if (this.suiStoreList.length / 10 === 10) {
          //   $state.complete()
          // }
        } else {
          $state.complete()
        }
      })
      .catch(err => console.log(err))
    }
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
