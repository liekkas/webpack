<template>
  <div>
    <app-header :showType="showType" @show-panel="onShowPanel"></app-header>
    <transition>
      <router-view :key="key" class="app-module"></router-view>
    </transition>
    <transition name="showSlide"
                enter-active-class="animated fadeInRight"
                leave-active-class="animated fadeOutRight">
      <slide-panel v-if="showType === 'msg'" @hide-panel="showType = ''"
                   title="消息中心">
        <message-slide-panel slot="content"></message-slide-panel>           
      </slide-panel>
      <slide-panel v-else-if="showType === 'history'" @hide-panel="showType = ''"
                   title="最近操作">
        <history-slide-panel slot="content"></history-slide-panel>
      </slide-panel>
      <slide-panel v-else-if="showType === 'help'" @hide-panel="showType = ''"
                   title="帮助中心">
        <help-slide-panel slot="content"></help-slide-panel>             
      </slide-panel>
    </transition>
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader';
import SlidePanel from './common/SlidePanel';
import HelpSlidePanel from './common/HelpSlidePanel';
import HistorySlidePanel from './common/HistorySlidePanel';
import MessageSlidePanel from './common/MessageSlidePanel';
export default {
  components: {AppHeader, SlidePanel, HelpSlidePanel, HistorySlidePanel, MessageSlidePanel},
  data() {
    return {
      showType: ''
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + +new Date()
        : this.$route + +new Date()
    }
  },
  methods: {
    onShowPanel(v) {
      this.showType = this.showType == v ? '' : v
    }
  }
}
</script>

<style lang="less" scoped>
</style>

