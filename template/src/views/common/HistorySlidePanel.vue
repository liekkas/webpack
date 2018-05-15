<template>
  <div style="padding: 24px;">
    <Timeline>
      <TimelineItem v-for="(item, i) in data" :key="i">
          <p class="title">{{item.title}}</p>
          <p class="time">{{item.time}}</p>
          <p class="content">{{item.content}}</p>
      </TimelineItem>
    </Timeline>
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
  .title{
    font-size: 14px;
    font-weight: bold;
  }
  .time{
    color: @subsidiary-color;
    line-height: 30px;
  }
  .content{
    padding-left: 5px;
  }
</style>

