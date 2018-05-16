<template>
  <div style="display:flex;">
    <app-menu :value="menuList" :module="module" @toggle="onToggle"></app-menu>
    <router-view id="indexView" class="app-container" :class="width"></router-view>
  </div>
</template>

<script>
import AppMenu from '@/components/layout/AppMenu'
export default {
  components: {AppMenu},
  data() {
    return {
      width: '',
      module: 'alarm',
    }
  },
  methods: {
    onToggle(v) {
      this.width = v ? 'collapsed-width' : 'expand-width'
    }
  },
  computed: {
    menuList() {
      const find = _.find(this.$store.getters.appMenus, {name: this.module})
      return find ? find.children : []
    }
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
