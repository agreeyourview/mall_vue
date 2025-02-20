<template>
    <el-container style="width: 100%;height: 100vh;">
    <el-aside :width="isCollapse?'64px':menuWidth+'px'" >
      <Menu :systemName="'Shop Management System'" :isCollapse="isCollapse" @maxMenuWidth="menuWidthFun"/>
    </el-aside>
    <el-container>
      <el-header>
        <Header :title="title" :isCollapseFun="isCollapseFun">
          <template v-slot:icon>
            <div v-if="!isCollapse"><Fold style="font-size: 18px;cursor: pointer;" /></div>
            <div v-else><Expand style="font-size: 18px;cursor: pointer;" /></div>
          </template>
        </Header>
      </el-header>
      <el-main style="height: calc(100vh - 60px);width: 100%;">
        <router-view @pageName="getPageName" :isCollapse="isCollapse"/>
      </el-main>
    </el-container>
  </el-container>
  </template>
  
<script setup>
import Menu from '../components/menu.vue';
import Header from '../components/header.vue';
import { Fold, Expand } from '@element-plus/icons-vue'
import { ref } from 'vue'
const title = ref('')
const getPageName = (e)=>{
  title.value = e
}
//菜单收展
const isCollapse = ref(false)
const menuWidth = ref(null)
const isCollapseFun = ()=>{
  isCollapse.value=!isCollapse.value
}
const menuWidthFun = (e) =>{
  menuWidth.value = e
}
  </script>
  
<style scoped>
.el-header{
  padding: 0;
  width: 100%;
}
.el-main{
  padding: 10px 10px 0 10px;
}
</style>