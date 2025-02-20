<template>
    <div class="shop-container">
      <el-card>
        <el-row :gutter="20">
          <el-col :md="8" :lg="8">
            <div class="searchBoxClass searchTextClass">
              商品名字：
              <el-input class="searchBtnClass" maxlength="128" v-model="searchForm.productName" :placeholder="'请输入商品名字'"></el-input>
            </div>
          </el-col>
          <el-col :md="8" :lg="8">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="success" @click="handleAddShop">新增</el-button>
          </el-col>
          <el-col :md="8" :lg="8"></el-col>
        </el-row>
     
      <el-table :data="shopList">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="image" label="图片">
          <template #default="scope">
            <img :src="scope.row.image" width="50" height="50">
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类"></el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="isShow" label="是否展示"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="info" @click="handleDetail(scope.row.id)">详情</el-button>
            <el-button type="warning" @click="handleEdit(scope.row.id)">修改</el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
      <AddShop v-if="addShopVisible" @close="addShopVisible = false" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AddShop from '../components/addShop.vue';
  const emit = defineEmits([
  'pageName'
  ])
  emit('pageName', 'shop')
  const searchForm = ref({
    productName: ''
  });
  
  const shopList = ref([
    {
      id: 1,
      image: 'https://via.placeholder.com/50',
      category: '水果',
      name: '苹果',
      isShow: true
    }
  ]);
  
  const addShopVisible = ref(false);
  
  const handleSearch = () => {
    // 处理搜索逻辑
    console.log(searchForm.value);
  };
  
  const handleAddShop = () => {
    addShopVisible.value = true;
  };
  
  const handleDetail = (id) => {
    // 处理详情逻辑
    console.log(`查看商品 ${id} 详情`);
  };
  
  const handleEdit = (id) => {
    // 处理修改逻辑
    console.log(`修改商品 ${id}`);
  };
  
  const handleDelete = (id) => {
    // 处理删除逻辑
    console.log(`删除商品 ${id}`);
  };
  </script>
  
  <style scoped>
  .shop-container {
    padding: 20px;
  }
  </style>
 