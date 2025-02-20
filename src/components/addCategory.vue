<template>
    <el-dialog :visible.sync="dialogVisible" title="新增分类">
      <template #content>
        <el-form :model="categoryForm" label-width="80px">
          <el-form-item label="分类名字">
            <el-input v-model="categoryForm.name"></el-input>
          </el-form-item>
          <el-form-item label="是否展示">
            <el-switch v-model="categoryForm.isShow"></el-switch>
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
  const categoryForm = ref({
    name: '',
    isShow: true
  });
  
  const handleSave = () => {
    // 处理保存逻辑，可发送请求到后端保存分类信息
    console.log('保存分类信息:', categoryForm.value);
    dialogVisible.value = false;
  };
  </script>
  
  <style scoped>
  /* 可根据需要添加样式 */
  </style>