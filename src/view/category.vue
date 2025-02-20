<template>
    <div class="category-container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="分类名字">
          <el-input v-model="searchForm.categoryName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="success" @click="handleAddCategory">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="categoryList">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="isShow" label="是否展示"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="warning" @click="handleEdit(scope.row.id)">修改</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AddCategory v-if="addCategoryVisible" @close="addCategoryVisible = false" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AddCategory from '../components/addCategory.vue';
  const emit = defineEmits([
  'pageName'
  ])
  emit('pageName', 'category')
  const searchForm = ref({
    categoryName: ''
  });
  
  const categoryList = ref([
    {
      id: 1,
      name: '水果',
      isShow: true
    }
  ]);
  
  const addCategoryVisible = ref(false);
  
  const handleSearch = () => {
    // 处理搜索逻辑
    console.log(searchForm.value);
  };
  
  const handleAddCategory = () => {
    addCategoryVisible.value = true;
  };
  
  const handleEdit = (id) => {
    // 处理修改逻辑
    console.log(`修改分类 ${id}`);
  };
  
  const handleDelete = (id) => {
    // 处理删除逻辑
    console.log(`删除分类 ${id}`);
  };
  </script>
  
  <style scoped>
  .category-container {
    padding: 20px;
  }
  </style>