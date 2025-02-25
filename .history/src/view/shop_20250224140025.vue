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
        <el-row :gutter="20">
          <MallTable ref="tableRef":page="pageNum" :pagesize="30" :tableCol="tableCol" 
          :tableData="shopList" :tableHeight="`calc(100vh - 236px)`" style="border: #dcdfe6 solid 1px;"
          :tableHeader="{ background: 'var(--el-color-primary)', color: '#fff' }"
          >
          <template v-slot="scopes">
            <template v-if="scopes.item.prop == 'image'">
              <img :src="scopes.scope.row.image" style="width: 60px;height: 60px">
            </template>
            <template v-else-if="scopes.item.prop == 'isShow'">
              <el-switch v-model="scopes.scope.row.isShow" active-color="#13ce66" inactive-color="#ff4949" active-text="上架" inactive-text="不上架"></el-switch>
            </template>
            <div v-else-if="scopes.item.prop == 'operation'" style="display: flex;justify-content: space-around;">
              <el-icon :size="24" class="pointer" @click="handleDetail(scopes.scope.row)">
                <List />
              </el-icon>
              <el-icon :size="24" class="pointer" @click="handleEdit(scopes.scope.row)">
                <Edit />
              </el-icon>
              <el-icon :size="24" class="pointer" @click="handleDelete(scopes.scope.row)">
                <Delete />
              </el-icon>
            </div>
            <span v-else>{{ scopes.scope.row[`${scopes.item.prop}`] }}</span>
          </template>
          </MallTable>
        </el-row>
        <el-row justify="end">
          <el-pagination v-model:current-page="pageNum" :total="pageTotal" @current-change="pageChange" :page-size="30" layout="prev, pager, next" />
        </el-row>
      </el-card>
      <MallDialog :dialogVisible="addShopVisible" :width="'1000px'" :destory="true"
      :title="'新增商品'" @close="addShopVisibleClose">
       <template v-slot:main>
         <el-form ref="addShopRef" :model="addShopForm" :rules="rules" label-width="100px">
            <el-form-item label="商品名字" prop="name">
              <el-input v-model="addShopForm.name" placeholder="请输入商品名字"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="addShopForm.price" placeholder="请输入商品价格"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="stock">
              <el-input v-model="addShopForm.stock" placeholder="请输入商品库存"></el-input>
            </el-form-item>
         </el-form>
       </template>
      </MallDialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AddShop from '../components/addShop.vue';
  import MallDialog from '../components/MallDialog.vue';
  import MallTable from '../components/MallTable.vue';
  import { Search, RefreshRight, List, Edit, Delete } from '@element-plus/icons-vue';
import { id } from 'element-plus/es/locales.mjs';
  const emit = defineEmits([
  'pageName'
  ])
  emit('pageName', 'shop')
  const searchForm = ref({
    productName: ''
  });
  
  const tableRef = ref(null);
  const tableCol = [
    { id: 1, label: '图片', prop: 'image', minWidth: 120 ,tooltip: true},
    { id: 2, label: '分类', prop: 'category', minWidth: 120 ,tooltip: true},
    { id: 3, label: '名称', prop: 'name', minWidth: 120 ,tooltip: true},
    { id: 4, label: '价格', prop: 'price', minWidth: 120 ,tooltip: true},
    { id: 5, label: '库存', prop: 'stock', minWidth: 120 ,tooltip: true},
    { id: 6, label: '销量', prop: 'sales', minWidth: 120 ,tooltip: true},
    { id: 7, label: '是否显示', prop: 'isShow', minWidth: 120 ,tooltip: true},
    { id: 8, label: '操作', prop:'operation', width: 150, fixed: 'right', tooltip: true},
  ]
  const pageNum = ref(1)
  const pageSize = ref(10)
  const pageTotal = ref(30)
  const shopList = ref([
    {
      id: 1,
      image: '',
      category: '水果',
      name: '苹果',
      price: 5.99,
      stock: 100,
      sales: 50,
      isShow: true
    },
    {
      id: 2,
      image: '',
      category: '蔬菜',
      name: 'lettuce',
      price: 3.99,
      stock: 80,
      sales:40,
      isShow: true
    }
  ]);
  
  const addShopVisible = ref(false);
  
  const handleSearch = () => {
    // 处理搜索逻辑
    console.log(searchForm.value);
  };

  const pageChange = (page) => {
    console.log(page);
  };
  const handleAddShop = () => {
    addShopVisible.value = true;
  };
  const addShopVisibleClose = () => {
    addShopVisible.value = false;
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
 