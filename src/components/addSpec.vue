<template>
    <el-dialog :visible.sync="dialogVisible" title="新增规格">
      <template #content>
        <el-form :model="specForm" label-width="80px">
          <el-form-item label="规格名字">
            <el-input v-model="specForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="specForm.description"></el-input>
          </el-form-item>
          <el-form-item label="是否展示">
            <el-switch v-model="specForm.isShow"></el-switch>
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
  
  // 弹窗显示状态
  const dialogVisible = ref(true);
  
  // 规格表单数据
  const specForm = ref({
    name: '',
    description: '',
    isShow: true
  });
  
  // 处理保存逻辑
  const handleSave = () => {
    console.log('保存规格信息:', specForm.value);
    dialogVisible.value = false;
  };
  </script>
  
  <style scoped>
  /* 可根据需要添加样式 */
  </style>