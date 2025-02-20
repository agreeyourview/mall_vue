<template>
    <div class="layout-container">
      <div class="sidebar">
        <Menu />
      </div>
      <div class="main-content">
        <Header />
        <router-view></router-view>
      </div>
    </div>
    <el-container style="width: 100%;height: 100vh;">
    <el-aside :width="isCollapse?'64px':menuWidth+'px'" >
      <Menu :systemName="'BODYTECH Management System'" :menuList="menuList" :isCollapse="isCollapse" @maxMenuWidth="menuWidthFun"/>
    </el-aside>
    <el-container>
      <el-header>
        <Header :title="title" :isCollapse="isCollapse" :isCollapseFun="isCollapseFun"/>
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
  </script>
  
  <style scoped>
  .layout-container {
    display: flex;
    width: 100%;
    height: 100vh;
  }
  
  .sidebar {
    width: 200px;
  }
  
  .main-content {
    flex: 1;
  }
  </style>