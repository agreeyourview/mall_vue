<template>
    <el-dialog :visible.sync="dialogVisible" title="新增用户">
      <template #content>
        <el-form :model="userForm" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="userForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userForm.gender">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="userForm.age" type="number"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="userForm.address"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const dialogVisible = ref(true);
  const userForm = ref({
    userName: '',
    gender: '男',
    age: null,
    address: ''
  });
  
  const handleSave = () => {
    // 处理保存逻辑，可发送请求到后端保存用户信息
    console.log('保存用户信息:', userForm.value);
    dialogVisible.value = false;
  };
  </script>
  
  <style scoped>
  /* 可根据需要添加样式 */
  </style>