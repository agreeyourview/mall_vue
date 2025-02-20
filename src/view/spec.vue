<template>
    <div class="spec-container">
      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="规格名字">
          <el-input v-model="searchForm.specName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="success" @click="handleAddSpec">新增</el-button>
        </el-form-item>
      </el-form>
      <!-- 规格列表 -->
      <el-table :data="specList">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="isShow" label="是否展示"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="warning" @click="handleEdit(scope.row.id)">修改</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增规格弹窗 -->
      <AddSpec v-if="addSpecVisible" @close="addSpecVisible = false" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AddSpec from '../components/addSpec.vue';
  
  // 搜索表单数据
  const searchForm = ref({
    specName: ''
  });
  
  // 规格列表数据
  const specList = ref([
    {
      id: 1,
      name: '500g装',
      description: '水果500克包装规格',
      isShow: true
    }
  ]);
  
  // 新增规格弹窗显示状态
  const addSpecVisible = ref(false);
  
  // 处理搜索逻辑
  const handleSearch = () => {
    console.log(searchForm.value);
  };
  
  // 打开新增规格弹窗
  const handleAddSpec = () => {
    addSpecVisible.value = true;
  };
  
  // 处理修改逻辑
  const handleEdit = (id) => {
    console.log(`修改规格 ${id}`);
  };
  
  // 处理删除逻辑
  const handleDelete = (id) => {
    console.log(`删除规格 ${id}`);
  };
  </script>
  
  <style scoped>
  .spec-container {
    padding: 20px;
  }
  </style>