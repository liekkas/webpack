<template>
  <div>
    <div class="msg-item" v-for="(item,i) in data" :key="i">
      <p>\{{item.title}}</p>
      <p>\{{item.time}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {time: '2018-05-10 19:41:41', title: '修改菜单路由', content: '路由添加权限'},
        {time: '2018-05-10 19:41:41', title: '调整布局', content: '加入侧边栏'},
      ]
    }
  },
  methods: {
    search() {
      console.log('search ', this.keyword);
    }
  },
}
</script>

<style lang="less">
  @import '~@/styles/theme';
  .msg-item {
    border-bottom: 1px solid @border-color-base;
    padding: 10px 24px;
    &:hover {
      cursor: pointer;
      background-color: fade(@primary-color, 30%);
    }
    p:first-child {
      color: @primary-color;
    }
    p:last-child {
      color: @subsidiary-color;
    }
  }
</style>

