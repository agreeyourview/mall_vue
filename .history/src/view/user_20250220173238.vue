<template>
    <div class="user-container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="searchForm.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="success" @click="handleAddUser">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="userList">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="avatar" label="用户头像">
          <template #default="scope">
            <el-avatar :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-button type="warning" @click="handleDisable(scope.row.id)">禁用</el-button>
            <el-button type="success" @click="handleEnable(scope.row.id)">解禁</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AddUser v-if="addUserVisible" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AddUser from '../components/addUser.vue';
  const emit = defineEmits([
  'pageName'
  ])
  emit('pageName', 'user')
  const searchForm = ref({
    userName: '',
    address: ''
  });
  
  const userList = ref([
    {
      id: 1,
      avatar: 'https://via.placeholder.com/50',
      userName: '张三',
      gender: '男',
      age: 20,
      address: '北京市',
      status: '正常'
    }
  ]);
  
  const addUserVisible = ref(false);
  
  const handleSearch = () => {
    // 处理搜索逻辑
    console.log(searchForm.value);
  };
  
  const handleAddUser = () => {
    addUserVisible.value = true;
  };
  
  const handleDisable = (id) => {
    // 处理禁用逻辑
    console.log(`禁用用户 ${id}`);
  };
  
  const handleEnable = (id) => {
    // 处理解禁逻辑
    console.log(`解禁用户 ${id}`);
  };
  
  const handleDelete = (id) => {
    // 处理删除逻辑
    console.log(`删除用户 ${id}`);
  };
  </script>
  
  <style scoped>
  .user-container {
    padding: 20px;
  }
  </style>