<template>
  <div class="root">
    <Table :height="tableHeight" border :data="data" :columns="columns" :size="size"
           @on-row-click="onRowClick" @on-sort-change="onSortChange"
           @on-row-dblclick="onRowDbClick"
           :highlight-row="highlightRow"/>
    <div class="hyz-page">
      <Page :total="total" :current="page" :page-size="pageSize" 
            show-sizer show-elevator show-total placement="top"
            @on-change="changePage"
            @on-page-size-change="pageSizeChange"	/>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['dataSource', 'columns', 'size', 'highlightRow', 'height'],
    data() {
      return {
        page: 1,
        pageSize: 10,
      }
    },
    computed: {
      data() {
        let {page, pageSize, dataSource} = this
        if ((this.page - 1) * pageSize >= dataSource.length) {
          this.page = Math.max(1, this.page - 1)
        }
        const start = (this.page - 1) * pageSize
        const end = Math.min(this.page *  pageSize, dataSource ? dataSource.length : 0)
        let result = []
        for (let i = start; i < end; i++) {
          result.push(dataSource[i])
        }
        return result
      },
      total() {
        return this.dataSource ? this.dataSource.length : 0
      },
      tableHeight() {
        if(this.height) return this.height
        
        if(this.data.length >= 10) {
          return window.innerHeight < 750 ? 450 : 521
        } else {
          return ''
        }
      }
    },
    watch: {
      // dataSource() {
      //   this.page = 1
      //   this.pageSize = 10
      // }
    },
    methods: {
      changePage (v) {
        this.page = v
      },
      pageSizeChange(v) {
        this.pageSize = v
      },
      onRowClick(v) {
        this.$emit('on-row-click', v)
      },
      onSortChange(column,key,order){
        this.$emit('on-sort-change', column,key,order)
      },
      onRowDbClick(v) {
        this.$emit('on-row-dblclick', v)
      }
    }
  }
</script>
