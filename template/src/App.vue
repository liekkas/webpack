<template>
  <div id="app">
    <router-view></router-view>
    <div class="fade-transition ivu-modal-mask loading" id="global-spin">
      <Spin class="div_window" fix>
        <Icon type="load-c" size=38 class="demo-spin-icon-load"></Icon>
      </Spin>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .div_window {
    width: 400px !important;
    height: 300px !important;
    position: fixed !important;
    left: 50% !important;
    top: 50% !important;
    margin-top: -150px;
    margin-left: -250px;
    background-color: rgba(220, 220, 220, 0) !important;
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .ivu-modal-mask.loading {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.1);
    height: 100%;
    z-index: 9999;
    display: none;
  }
</style>
