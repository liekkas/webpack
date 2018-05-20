<template>
  <div class="slide-panel">
    <div class="slide-panel-header">
      <h3>\{{title}}</h3>
      <Button shape="circle" type="ghost" size="small" 
              icon="close" @click="$emit('hide-panel')"></Button>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
  @import '~@/styles/theme';
  .slide-panel {
    position: absolute;
    right: 0;
    height:  calc(~"100% - @{header-height}");
    // bottom: 0;
    width: 300px;
    background-color: #fff;
    box-shadow: -3px -3px 8px rgba(0,0,0,.2);
    z-index: 999;
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      // height: 50px;
      border-bottom: 1px solid @border-color-base;
    }
  }
</style>

