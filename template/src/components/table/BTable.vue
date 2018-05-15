<template>
  <div>
    <Table :height="tableHeight" border :data="data" :columns="columns" :row-class-name="useHand ? rowClassName : empty"
           @on-row-click="onRowClick" :highlight-row="highlightRow" :size="size"
           @on-row-dblclick="onRowDbClick" @on-sort-change="onSortChange"/>
    <div class="hyz-page">
      <Page :total="pageData.total" :size="pageSize" :current="pageData.current" :page-size="pageData.pageSize" show-sizer show-elevator show-total placement="top" @on-change="currentChange" @on-page-size-change="pageSizeChange" />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data', 'columns', 'pageData', 'highlightRow', 'useHand', 'size', 'pageSize', 'height'],
    computed: {
      tableHeight() {
        if(this.height) return this.height
        
        if(this.data.length >= 10) {
          return window.innerHeight < 750 ? 450 : 521
        } else {
          return ''
        }
      }
    },
    methods: {
      currentChange(v) {
        this.pageData.current = v
        this.$emit('page-data-change');
      },
      pageSizeChange(v) {
        this.pageData.pageSize = v
        this.$emit('page-data-change');
      },
      onSortChange(column,key,order){
        this.$emit('on-sort-change', column,key,order)
      },
      onRowDbClick(v) {
        this.$emit('on-row-dblclick', v)
      },
      onRowClick(v) {
        this.$emit('on-row-click', v)
      },
      rowClassName() {
        return 'use-hand'
      },
      empty() {
        return ''
      }
    }
  };
</script>
<style lang="less">
  .hyz-page {
    margin: 10px 0 0;
    display: flex;
    justify-content: flex-end;
  }
  .hyz-page .ivu-select{
    position: relative;
  }
  .ivu-table .use-hand td {
    cursor: pointer;
  }
</style>
