<template>
    <el-table ref='tableRef' :data="tableData" :height="tableHeight" :cell-style=tableRowClass :header-cell-style=tableHeader :border=border @sort-change="sortChange">
      <el-table-column
        v-if="page"
        label="No"
        type="index"
        :index="(page-1)*pagesize+1"
        :width="60">
      </el-table-column>
      <el-table-column
      v-for="(item,index) in tableCol"
      :key="index"
      :prop="item.prop"
      :label="item.label ? (item.labele ? $t(item.label)+item.labele : $t(item.label)) : ''"
      :width="item.width"
      :min-width="item.minWidth"
      :fixed="item.fixed ? item.fixed : null"
      :show-overflow-tooltip="item.tooltip ? false : true">
        <template #default="scope">
          <slot :item=item :scope=scope >
            <span>{{ scope.row[`${item.prop}`] }}</span>
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </template>
  <script setup>
  import { ref, watch, getCurrentInstance, onMounted } from 'vue';
  const { proxy } = getCurrentInstance()
  onMounted(()=>{
    getColWidth()
    //getSortData()
  })
  const props = defineProps({
    tableData: {}, //表格数据
    tableCol:{}, //表格列
    tableHeight:{}, //表格高度
    tableHeader:{}, //表头样式
    border:{  //表格内边框
      default:false
    },
    tableRowClass:{ //表格行样式
      default:null
    },
    page:{}, //表格索引、当前页
    pagesize:{}, //表格索引、每页行数
  })
  //滚动条置顶
  const tableRef = ref()
  watch(() => props.tableData, (newValue, oldValue) => {
    tableRef.value.setScrollTop(0)
  })
</script>