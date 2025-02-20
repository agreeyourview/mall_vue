<template>
    <div class="order-container">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="用户名字">
          <el-input v-model="searchForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="商品名字">
          <el-input v-model="searchForm.productName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="orderList">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="orderNo" label="订单编号"></el-table-column>
        <el-table-column prop="category" label="商品分类"></el-table-column>
        <el-table-column prop="productName" label="商品名"></el-table-column>
        <el-table-column prop="spec" label="商品规格"></el-table-column>
        <el-table-column prop="quantity" label="购买数量"></el-table-column>
        <el-table-column prop="userName" label="用户名字"></el-table-column>
        <el-table-column prop="purchaseTime" label="购买时间"></el-table-column>
        <el-table-column prop="status" label="订单状态"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const searchForm = ref({
    userName: '',
    productName: ''
  });
  
  const orderList = ref([
    {
      id: 1,
      orderNo: '20250220001',
      category: '水果',
      productName: '苹果',
      spec: '500g',
      quantity: 2,
      userName: '张三',
      purchaseTime: '2025-02-20 10:00',
      status: '已支付'
    }
  ]);
  
  const handleSearch = () => {
    // 处理搜索逻辑
    console.log(searchForm.value);
  };
  </script>
  
  <style scoped>
  .order-container {
    padding: 20px;
  }
  </style>