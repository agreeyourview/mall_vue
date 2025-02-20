<template>
    <el-dialog :visible.sync="dialogVisible" title="新增商品">
      <template #content>
        <el-form :model="shopForm" label-width="80px">
          <el-form-item label="商品图片">
            <el-input v-model="shopForm.image" placeholder="图片链接"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-input v-model="shopForm.category"></el-input>
          </el-form-item>
          <el-form-item label="商品名字">
            <el-input v-model="shopForm.name"></el-input>
          </el-form-item>
          <el-form-item label="是否展示">
            <el-switch v-model="shopForm.isShow"></el-switch>
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
  const shopForm = ref({
    image: '',
    category: '',
    name: '',
    isShow: true
  });
  
  const handleSave = () => {
    // 处理保存逻辑，可发送请求到后端保存商品信息
    console.log('保存商品信息:', shopForm.value);
    dialogVisible.value = false;
  };
  </script>
  
  <style scoped>
  /* 可根据需要添加样式 */
  </style>