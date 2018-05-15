<template>
  <div style="padding: 24px;">
    <Input v-model="keyword" icon="search" placeholder="请输入您想了解的问题" 
           @on-click="search" @on-enter="search"></Input>
    
    <div style="margin: 18px 0; ">您可能需要以下文档</div>
    <p><a>操作使用说明书</a></p>
    <p><a>二次开发文档</a></p>
    <p><a>安装部署手册</a></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ''
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
  .ivu-input-icon:hover {
    cursor: pointer;
  }
</style>

