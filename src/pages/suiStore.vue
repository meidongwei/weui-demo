<template>
  <div>
    <div class="page__bd" style="margin-top: 20px;">
        <div class="weui-panel weui-panel_access">
            <div class="weui-panel__bd">

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

            </div>
        </div>
      </div>

  </div>
</template>

<script>
import axios from 'axios'
import { httpUrl } from '@/http_url'
import 'vue-awesome/icons/map-marker'
import Icon from 'vue-awesome/components/Icon'
export default {
  components: {
    Icon
  },
  data () {
    return {
      suiStoreList: [],
      nowIndex: 1,
      number: 5
    }
  },
  methods: {
    getSuiStoreDatas () {
      axios.get(httpUrl.getSuiStoreDatas,[
        this.nowIndex,
        this.number
      ])
      .then(res => {
        this.suiStoreList = res.data.getSuiStoreList
      })
      .catch(err => console.log(err))
    }
  },
  created () {
    this.getSuiStoreDatas()
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
