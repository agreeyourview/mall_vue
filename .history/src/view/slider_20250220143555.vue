<template>
    <div class="slider-container">
      <!-- 新增按钮 -->
      <el-button type="success" @click="handleAddSlider">新增</el-button>
      <!-- 轮播图列表 -->
      <el-table :data="sliderList">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="image" label="图片">
          <template #default="scope">
            <img :src="scope.row.image" width="50" height="50">
          </template>
        </el-table-column>
        <el-table-column prop="description" label="说明"></el-table-column>
        <el-table-column prop="isShow" label="是否展示"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增轮播图弹窗 -->
      <AddSlider v-if="addSliderVisible" @close="addSliderVisible = false" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AddSlider from '../components/addSlider.vue';
  const emit = defineEmits([
  'pageName'
  ])
  emit('pageName', 'slider')
  // 轮播图列表数据
  const sliderList = ref([
    {
      id: 1,
      image: 'https://via.placeholder.com/50',
      description: '首页轮播图',
      isShow: true
    }
  ]);
  
  // 新增轮播图弹窗显示状态
  const addSliderVisible = ref(false);
  
  // 打开新增轮播图弹窗
  const handleAddSlider = () => {
    addSliderVisible.value = true;
  };
  
  // 处理删除逻辑
  const handleDelete = (id) => {
    console.log(`删除轮播图 ${id}`);
  };
  </script>
  
  <style scoped>
  .slider-container {
    padding: 20px;
  }
  </style>