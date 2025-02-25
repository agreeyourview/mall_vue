<template>
  <div class="box-main">
    <el-card>
      <el-row :gutter="20">
        <el-col :md="12" :lg="6">
          <div class="searchBoxClass searchTextClass">
           订单编号:
            <el-input class="searchBtnClass" v-model="orderCode" maxlength="128" />
          </div>
        </el-col>
        <el-col :md="12" :lg="6">
          <div class="searchBoxClass searchTextClass">
            收货人:
            <el-input class="searchBtnClass" v-model="consignee" maxlength="128" />
          </div>
        </el-col>
        <el-col :md="12" :lg="6">
          <div class="searchBoxClass searchTextClass">
            订单状态:
            <el-select class="searchBtnClass" v-model="orderStatus" style="width: 100%" placeholder=" ">
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
      <el-row class="mb10">
        <MallTable :page="pageNum" :pagesize="30" :tableCol="tableCol" :tableData="tableData"
          :tableHeight="`calc(100vh - 236px)`" style="border: #dcdfe6 solid 1px;"
          :tableHeader="{ background: 'var(--el-color-primary)', color: '#fff' }">
          <template v-slot="scopes">
            <template v-if="scopes.item.prop == 'status'">
              <el-tag v-if="scopes.scope.row.status == 0" type="danger">未支付</el-tag>
              <el-tag v-else-if="scopes.scope.row.status == 1" type="warning">未发货</el-tag>
              <el-tag v-else-if="scopes.scope.row.status == 2" type="success">已发货</el-tag>
              <el-tag v-else="scopes.scope.row.status==3">已完成</el-tag>
            </template>
            <div v-else-if="scopes.item.prop == 'operation'" style="display: flex;justify-content: space-between;">
              <i class="iconfont icon-caidan pointer" style="font-size: 24px;"
                @click="detailsDialogShow(scopes.scope.row)" />
              <el-button type="success" v-show="scopes.scope.row.status == 1"
                @click="operationDialogShow(scopes.scope.row)">发货登记</el-button>
            </div>
            <span v-else>{{ scopes.scope.row[`${scopes.item.prop}`] }}</span>
          </template>
        </MallTable>
      </el-row>
      <el-row justify="end">
        <el-pagination v-model:current-page="pageNum" :total="pageTotal" @current-change="pageChange" :page-size="30"
          layout="prev, pager, next" />
      </el-row>
    </el-card>

    <MallDialog :dialogVisible="operationDialogVisible" :width="'500px'" :destroy="true" title="发货登记"
      @close="operationDialogClose()">
      <template v-slot:main>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
          <el-form-item prop="courierId" label="快递编号">
            <el-input v-model="form.courierId" />
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button @click="operationDialogClose()">取消</el-button>
        <el-button type="primary" @click="operationDialogConfirm()">确认</el-button>
      </template>
    </MallDialog>

    <MallDialog :dialogVisible="detailsDialogVisible" :width="'1000px'" :destroy="true" title="订单详情"
      @close="detailsDialogClose()">
      <template v-slot:main>
        <el-row :gutter="20" class="mb20">
          <el-col :span="12">
            <el-row :gutter="20" class="mb10">
              <el-col :span="8">收件人</el-col>
              <el-col :span="16">{{ detailsData.consignee }}</el-col>
            </el-row>
            <el-row :gutter="20" class="mb10">
              <el-col :span="8">收件地址</el-col>
              <el-col :span="16">{{ detailsData.address }}</el-col>
            </el-row>
            <el-row :gutter="20" class="mb10">
              <el-col :span="8">收件电话</el-col>
              <el-col :span="16">{{ detailsData.tel }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">订单价格</el-col>
              <el-col :span="16"><span style="color: #8b0000;">￥{{ detailsData.price }}</span></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="20" class="mb10">
              <el-col :span="8">订单状态</el-col>
              <el-col :span="16">
                <el-tag v-if="detailsData.status == 0" type="danger">未支付</el-tag>
                <el-tag v-else-if="detailsData.status == 1" type="warning">未发货</el-tag>
                <el-tag v-else-if="detailsData.status == 2" type="success">已发货</el-tag>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="mb10">
              <el-col :span="8">创建日期</el-col>
              <el-col :span="16">{{ detailsData.createDate }}</el-col>
            </el-row>
            <el-row :gutter="20" class="mb10">
              <el-col :span="8">下单日期</el-col>
              <el-col :span="16">{{ detailsData.confirmDate }}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">发货日期</el-col>
              <el-col :span="16">{{ detailsData.sendDate }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="mb10" style="font-weight: bold;">订单详情</div>
        <el-row>
          <MallTable :page="1" :pagesize="30" :tableCol="detailsTableCol" :tableData="detailsTableData" />
        </el-row>
      </template>
    </MallDialog>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, getCurrentInstance, nextTick } from 'vue';
import { Search, RefreshRight, Picture as IconPicture } from '@element-plus/icons-vue';
import { ElMessage, dayjs } from 'element-plus';
import MallTable from '../components/MallTable.vue';
import MallDialog from '../components/MallDialog.vue';
import api from '../api/index'
import { dateFormat } from '../utils/publicData';
const { proxy } = getCurrentInstance()
const emit = defineEmits([
  'pageName'
])
emit('pageName', 'order')

onMounted(() => {
  getTotalData()
  getData()
})
const sendCount = ref(0)
const monthCount = ref(0)
const monthSales = ref(0)
const totalSales = ref(0)
const getTotalData = async () => {
  const res = await api.get('/order/total/admin')
  if (res.code == 0) {
    sendCount.value = res.result.sendCount
    monthCount.value = res.result.monthCount
    monthSales.value = res.result.monthSales
    totalSales.value = res.result.totalSales
  }
}

//搜索
const statusOptions = [
  // { id: 1, label: "未支付", value: 0 },
  { id: 2, label: "未发货", value: 1 },
  { id: 3, label: "已发货", value: 2 },
  // { id: 4, label: "已完成", value: 3 },
]
const orderCode = ref('')
const consignee = ref('')
const orderStatus = ref('')
let historyData = {}
const searchFun = () => {
  historyData = {}
  orderCode.value ? historyData.orderCode = orderCode.value : null
  consignee.value ? historyData.consignee = consignee.value : null
  orderStatus.value != null ? historyData.status = orderStatus.value : null
  getData()
}
const resetFun = () => {
  historyData = {}
  orderCode.value = null
  consignee.value = null
  orderStatus.value = null
  getData()
}

const tableCol = [
  { id: 1, label: "订单号", prop: "orderCode", minWidth: 120 },
  { id: 2, label: "收货人", prop: "consignee", minWidth: 120 },
  { id: 3, label: "收货地址", prop: "address", minWidth: 120 },
  { id: 4, label: "收货人电话", prop: "tel", minWidth: 120 },
  { id: 5, label: "订单价格", prop: "price", minWidth: 120 },
  { id: 6, label: "订单状态", prop: "status", minWidth: 120 },
  { id: 7, label: "操作", prop: "operation", minWidth: 120, fixed: "right" },

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
  const res = await api.get('/order/admin?' + new URLSearchParams(query))
  if (res.code == 0) {
    tableData.value = res.result.records
    pageTotal.value = res.result.total
  }
}

//表单校验
const rules = reactive({
  courierId: [
    { required: true, message: "请输入快递编号", trigger: ['blur'] }
  ]
})
const formRef = ref()
let form = reactive({
  id: null,
  courierId: null
})

//查看详情
const detailsDialogVisible = ref()
const detailsData = ref({})
const detailsTableCol = [
  { id: 1, label: "商品名字", prop: "goodsName", minWidth: 120 },
  { id: 2, label: "商品价格", prop: "goodsPrice", minWidth: 120 },
  { id: 3, label: "商品规格", prop: "specificationName", minWidth: 120 },
  { id: 4, label: "商品数量", prop: "num", minWidth: 120 }
]
const detailsTableData = ref([])
const detailsDialogClose = () => {
  detailsDialogVisible.value = false
}
const detailsDialogShow = async (data) => {
  const res = await api.get(`/order/${data.id}`)
  if (res.code == 0) {
    res.result.createDate = res.result.createDate ? dayjs(res.result.createDate * 1).format(dateFormat) : null
    res.result.confirmDate = res.result.confirmDate ? dayjs(res.result.confirmDate * 1).format(dateFormat) : null
    res.result.sendDate = res.result.sendDate ? dayjs(res.result.sendDate * 1).format(dateFormat) : null
    detailsData.value = res.result
    detailsTableData.value = res.result.goodsInfo
    detailsDialogVisible.value = true
  }
}

//发货登记
const operationDialogVisible = ref(false)
const operationDialogShow = (data) => {
  form.id = data.id
  operationDialogVisible.value = true
}
const operationDialogClose = () => {
  formRef.value.resetFields()
  operationDialogVisible.value = false
}
const operationDialogConfirm = async () => {
  await formRef.value.validate(async (valid) => {
    if (valid) {
      const params = { courierId: form.courierId }
      const res = await api.patch(`/order/${form.id}`, params)
      if (res.code == 0) {
        ElMessage.success(res.message)
        operationDialogClose()
        getTotalData()
        getData()
      } else {
        ElMessage.error(res.message)
      }
    }
  })
}
</script>
<style></style>