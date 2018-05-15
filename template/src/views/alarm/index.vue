<template>
  <div style="display:flex;">
    <app-menu :value="menuList" :module="module" @toggle="onToggle"></app-menu>
    <router-view id="indexView" class="app-container" :class="width"></router-view>
  </div>
</template>

<script>
import AppMenu from '@/components/layout/AppMenu'
import {appRouter} from '@/router/defines'
export default {
  components: {AppMenu},
  data() {
    const module = 'alarm'
    return {
      openNames: this.$store.state.app.openSlideMenu,
      menuList: _.find(appRouter.children, {name: module}).children,
      width: '',
      module,
    }
  },
  methods: {
    onToggle(v) {
      this.width = v ? 'collapsed-width' : 'expand-width'
    }
  },
  watch: {
  }
}
</script>

<style lang="less">
  @import "~@/styles/theme.less";
  .collapsed-width {
    width: calc(~'100% - @{collapsed-menu-width}')
  }
  .expand-width {
    width: calc(~'100% - @{normal-menu-width}')
  }
</style>
