<template>
  <div class="box-main">
    <el-card>
      <el-row :gutter="20">
        <el-col :md="12" :lg="6">
          <div class="searchBoxClass searchTextClass">
            商品名字:
            <el-input class="searchBtnClass" v-model="goodName" maxlength="128" />
          </div>
        </el-col>
        <el-col :md="12" :lg="6">
          <div class="searchBoxClass searchTextClass">
            商品分类:
            <el-select class="searchBtnClass" v-model="goodCategories" style="width: 100%" placeholder=" ">
              <el-option v-for="item in categoriesOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-col>
        <el-col :md="12" :lg="6">
          <div class="searchBoxClass searchTextClass">
          商品状态:
            <el-select class="searchBtnClass" v-model="goodStatus" style="width: 100%" placeholder=" ">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </el-col>
        <el-col :md="12" :lg="6">
          <el-button :icon="Search" type="primary" @click="searchFun()">搜索</el-button>
          <el-button :icon="RefreshRight" @click="resetFun()">重置</el-button>
        </el-col>
      </el-row>
      <el-divider />
      <el-row :gutter="20" class="mb20">
        <el-col>
          <el-button :icon="Plus" type="primary" @click="operationDialogShow(1)">新增</el-button>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <MallTable :page="pageNum" :pagesize="30" :tableCol="tableCol" :tableData="tableData"
          :tableHeight="`calc(100vh - 314px)`" style="border: #dcdfe6 solid 1px;"
          :tableHeader="{ background: 'var(--el-color-primary)', color: '#fff' }">
          <template v-slot="scopes">
            <template v-if="scopes.item.prop == 'status'">
              <el-tag v-if="scopes.scope.row.status == 1" type="success">上架中</el-tag>
              <el-tag v-else="scopes.scope.row.status==0" type="info">已下架</el-tag>
            </template>
            <template v-else-if="scopes.item.prop == 'imgUrl'">
              <img :src="scopes.scope.row.imgUrl ? basePath + scopes.scope.row.imgUrl : baseUrl"
                style="width: 45px;height: 60px">
            </template>
            <template v-else-if="scopes.item.prop == 'operation'">
              <div style="display: flex;align-items: center;">
                <el-popconfirm :confirm-button-text="确认"
                  :cancel-button-text="取消"
                  :title="scopes.scope.row.status == 0 ? '确认上架?' : '确认下架?'" @confirm="changeFun(scopes.scope.row)">
                  <template #reference>
                    <el-switch v-model="scopes.scope.row.status" :before-change="() => false" inline-prompt
                      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;margin-right: 12px;"
                      active-text="下架" inactive-text="上架" :active-value="1" :inactive-value="0" />
                  </template>
                </el-popconfirm>
                <el-icon v-if="scopes.scope.row.status == 0" :size="24" class="pointer" style="margin-right: 12px;"
                  @click="operationDialogShow(2, scopes.scope.row)">
                  <Edit />
                </el-icon>
              </div>
            </template>
            <span v-else>{{ scopes.scope.row[`${scopes.item.prop}`] }}</span>
          </template>
        </MallTable>
      </el-row>
      <el-row justify="end">
        <el-pagination v-model:current-page="pageNum" :total="pageTotal" @current-change="pageChange" :page-size="30"
          layout="prev, pager, next" />
      </el-row>
    </el-card>

    <MallDialog :dialogVisible="operationDialogVisible" :width="'1000px'" :destroy="true"
      :title="operationType == 1 ? '创建商品' : '修改商品'"
      @close="operationDialogClose()">
      <template v-slot:main>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="name" label="商品名称">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item prop="categories" label="商品类别">
                <el-select v-model="form.categories" style="width: 100%" placeholder=" ">
                  <el-option v-for="item in categoriesOptions" :key="item.value" :label="item.label"
                    :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item prop="imgUrl" label="商品图片">
                <MallUpload :imgData="form.imgUrl" :fileSize="2" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="description" label="商品描述">
                <el-input v-model="form.description" />
              </el-form-item>
              <el-form-item prop="num" label="商品库存">
                <el-input v-model="form.num" />
              </el-form-item>
              <el-form-item prop="price" label="商品价格">
                <el-input v-model="form.price" />
              </el-form-item>
              <el-form-item prop="specification" label="商品规格">
                <el-select v-model="form.specification" style="width: 100%" filterable placeholder=" " multiple
                  collapse-tags collapse-tags-tooltip>
                  <el-option v-for="item in specificationOptions" :key="item.value" :label="item.label"
                    :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="rollImg" label="商品展示图">
            <MallUploads :imgData="form.rollImg" :fileSize="2" />
          </el-form-item>
          <el-form-item prop="detailImg" label="商品明细图">
            <MallUploads :imgData="form.detailImg" :fileSize="2" />
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button @click="operationDialogClose()">取消</el-button>
        <el-button type="primary" @click="operationDialogConfirm()">确认</el-button>
      </template>
    </MallDialog>

  </div>
</template>
<script setup>
import { ref, onMounted, reactive, getCurrentInstance } from 'vue';
import { Search, RefreshRight, Plus, Edit} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import MallTable from '../components/MallTable.vue';
import MallDialog from '../components/MallDialog.vue';
import MallUpload from '../components/MallUpload.vue';
import MallUploads from '../components/MallUploads.vue';
import baseUrl from '../assets/img/login.jpg'
import api from '../api/index'
const { proxy } = getCurrentInstance()
const emit = defineEmits([
  'pageName'
])
emit('pageName', 'menu.good')
const basePath = window.httpurl +'/imgs/'
onMounted(() => {
  getData()
  getCategories()
  getSpecification()
})
//搜索
const goodName = ref(null)
const goodCategories = ref(null)
const goodStatus = ref(null)
let historyData = {}
const searchFun = () => {
  historyData = {}
  goodName.value ? historyData.name = goodName.value : null
  goodCategories.value ? historyData.categories = goodCategories.value : null
  goodStatus.value != null ? historyData.status = goodStatus.value : null
  getData()
}
const resetFun = () => {
  historyData = {}
  goodName.value = null
  goodCategories.value = null
  goodStatus.value = null
  getData()
}
//表格
const tableCol = [
  { id: 1, label: "商品的名字", prop: "name", minWidth: 120 },
  { id: 2, label: "商品的图片", prop: "imgUrl", minWidth: 120 },
  { id: 3, label: "商品的描述", prop: "description", minWidth: 120 },
  { id: 4, label: "商品的价格", prop: "price", minWidth: 120 },
  { id: 5, label: "商品的库存", prop: "num", minWidth: 120 },
  { id: 9, label: "商品的状态", prop: "status", minWidth: 120, fixed: "right" },
  { id: 10, label: "操作", prop: "operation", minWidth: 120, fixed: "right" },

]
const tableData = ref([])
const pageNum = ref(1)
const pageTotal = ref(0)
const pageChange = (e) => {
  pageNum.value = e
  getData()
}
const getData = async () => {
  const query = { pageNum: pageNum.value, pageSize: 30, ...historyData }
  const res = await api.get("/goods?" + new URLSearchParams(query))
  if (res.code == 0) {
    tableData.value = res.result.records
    pageTotal.value = res.result.total
  }
}

//表单校验
const rules = reactive({
  name: [
    { required: true, message: "请输入商品名称", trigger: ['blur'] }
  ],
  categories: [
    { required: true, message: "请选择商品类别", trigger: ['blur'] }
  ],
  imgUrl: [
    { required: true, message: "请选择商品图片", trigger: ['blur'] }
  ],
  description: [
    { required: true, message: "请输入商品描述", trigger: ['blur'] }
  ],
  num: [
    { required: true, message: "请输入商品库存", trigger: ['blur'] }
  ],
  price: [
    { required: true, message: "请输入商品价格", trigger: ['blur'] }
  ],
  specification: [
    { required: true, message: "请选择商品规格", trigger: ['blur'] }
  ],
  rollImg: [
    { required: true, message: "请选择商品展示图", trigger: ['blur'] }
  ],
  detailImg: [
    { required: true, message: "请选择商品详情图", trigger: ['blur'] }
  ],
})
//下拉框数据
const categoriesOptions = ref([])
const specificationOptions = ref([])
const statusOptions = [
  { id: 1, label: "上架中", value: 1 },
  { id: 2, label: "已下架", value: 0 },
]
const getCategories = async () => {
  const query = { pageSize: 999 }
  const res = await api.get("categories?" + new URLSearchParams(query))
  if (res.code == 0) {
    categoriesOptions.value = res.result.records.map(i => { return { id: i.id, label: i.name, value: i.id } })
  }
}
const getSpecification = async () => {
  const query = { pageSize: 999 }
  const res = await api.get("specification?" + new URLSearchParams(query))
  if (res.code == 0) {
    specificationOptions.value = res.result.records.map(i => { return { id: i.id, label: i.name, value: i.id + '' } })
  }
}
//弹框数据
const formRef = ref()
let form = reactive({
  name: null,
  categories: null,
  imgUrl: [],
  description: null,
  price: null,
  num: null,
  specification: [],
  rollImg: [],
  detailImg: []
})
const operationType = ref()

const getOne = async (data) => {
  const res = await api.get(`/goods/${data}`)
  if (res.code == 0) {
    form = Object.assign(form, { ...res.result })
    form.imgUrl = [{ imgUrl: res.result.imgUrl, file: null }]
    form.rollImg = []
    form.detailImg = []
    if (typeof(res.result.rollImg) != 'string') {
      form.rollImg = res.result.rollImg.map(i => {
        return { url: i }
      })
    }else{
      form.rollImg.push({ url: res.result.rollImg })
    }
    if (typeof(res.result.detailImg) != 'string') {
      form.detailImg = res.result.detailImg.map(i => {
        return { url: i }
      })
    }else{
      form.detailImg.push({ url: res.result.detailImg })
    }
    
  }
}
//新增/修改
const operationDialogVisible = ref(false)
const operationDialogShow = async (type, data) => {
  if (type == 1) {
    operationType.value = 1
  } else {
    await getOne(data.id)
    operationType.value = 2
  }
  operationDialogVisible.value = true
}
const operationDialogClose = () => {
  formRef.value.resetFields()
  form.name = null
  form.categories = null
  form.imgUrl = []
  form.description = null
  form.price = null
  form.num = null
  form.specification = []
  form.rollImg = []
  form.detailImg = []
  operationDialogVisible.value = false
}
const operationDialogConfirm = async () => {
  await formRef.value.validate(async (valid) => {
    if (valid) {
      const params = new FormData()
      params.append('name', form.name)
      params.append('description', form.description)
      params.append('num', form.num)
      params.append('price', form.price)
      params.append('categories', form.categories)
      params.append('specification', form.specification)
      params.append('imgUrl', form.imgUrl[0].file ? form.imgUrl[0].file : null)
      form.rollImg.forEach(i => {
        if (i instanceof File) {
          params.append('rollImg', i)
        } else {
          params.append('rollImgs', i.url)
        }
      })
      form.detailImg.forEach(i => {
        if (i instanceof File) {
          params.append('detailImg', i)
        } else {
          params.append('detailImgs', i.url)
        }
      })

      if (operationType.value == 1) {
        const res = await api.post("/goods", params, { headers: { "Content-Type": "multipart/form-data" } })
        if (res.code == 0) {
          ElMessage.success(res.message)
          resetFun()
          operationDialogClose()
        } else {
          ElMessage.error(res.message)
        }
      } else {
        const res = await api.put(`/goods/${form.id}`, params, { headers: { "Content-Type": "multipart/form-data" } })
        if (res.code == 0) {
          ElMessage.success(res.message)
          getData()
          operationDialogClose()
        } else {
          ElMessage.error(res.message)
        }
      }
    }
  })
}
//删除
const deleteFun = async (data) => {
  const res = await api.delete(`/goods/${data.id}`)
  if (res.code == 0) {
    getData()
    ElMessage.success(res.message)
  } else {
    ElMessage.error(res.message)
  }
}

//上下架
const changeFun = async (data) => {
  if (data.status == 0) {
    const res = await api.patch(`/goods/changeOn/${data.id}`)
    if (res.code == 0) {
      getData()
      ElMessage.success(res.message)
    } else {
      ElMessage.error(res.message)
    }
  }
  if (data.status == 1) {
    const res = await api.patch(`/goods/changeOff/${data.id}`)
    if (res.code == 0) {
      getData()
      ElMessage.success(res.message)
    } else {
      ElMessage.error(res.message)
    }
  }
}
</script>
<style></style>