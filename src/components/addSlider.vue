<template>
    <el-dialog :visible.sync="dialogVisible" title="新增轮播图">
      <template #content>
        <el-form :model="sliderForm" label-width="80px">
          <el-form-item label="图片链接">
            <el-input v-model="sliderForm.image"></el-input>
          </el-form-item>
          <el-form-item label="说明">
            <el-input v-model="sliderForm.description"></el-input>
          </el-form-item>
          <el-form-item label="是否展示">
            <el-switch v-model="sliderForm.isShow"></el-switch>
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
  
  // 轮播图表单数据
  const sliderForm = ref({
    image: '',
    description: '',
    isShow: true
  });
  
  // 处理保存逻辑
  const handleSave = () => {
    console.log('保存轮播图信息:', sliderForm.value);
    dialogVisible.value = false;
  };
  </script>
  
  <style scoped>
  /* 可根据需要添加样式 */
  </style>