<template>
  <div class="box-main">
    <el-card>
      <el-row :gutter="20" class="mb20">
        <el-col>
          <el-button :icon="Plus" type="primary" @click="operationDialogShow(1)">新增分类</el-button>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <MallTable :page="pageNum" :pagesize="30" :tableCol="tableCol" :tableData="tableData"
          :tableHeight="`calc(100vh - 236px)`" style="border: #dcdfe6 solid 1px;"
          :tableHeader="{ background: 'var(--el-color-primary)', color: '#fff' }">
          <template v-slot="scopes">
            <template v-if="scopes.item.prop == 'operation'">
              <el-icon :size="24" class="pointer" style="margin-right: 12px;"
                @click="operationDialogShow(2, scopes.scope.row)">
                <Edit />
              </el-icon>
              <el-popconfirm :confirm-button-text="确认"
                :cancel-button-text="取消" title="确认删除?" @confirm="deleteFun(scopes.scope.row)">
                <template #reference>
                  <el-icon :size="24" class="pointer">
                    <Delete />
                  </el-icon>
                </template>
              </el-popconfirm>
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

    <MallDialog :dialogVisible="operationDialogVisible" :width="'500px'"
      :title="operationType == 1 ? 创建分类 : 修改分类"
      @close="operationDialogClose()">
      <template v-slot:main>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
          <el-form-item prop="name" :label="分类的名字">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item prop="note" :label="分类的详情">
            <el-input v-model="form.note" type="textarea" rows="4" resize='none' />
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:footer>
        <el-button @click="operationDialogClose()"> 取消 </el-button>
        <el-button type="primary" @click="operationDialogConfirm()"> 确认 </el-button>
      </template>
    </MallDialog>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, getCurrentInstance } from 'vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import MallTable from '../components/MallTable.vue';
import MallDialog from '../components/MallDialog.vue';
import api from '../api/index'
const { proxy } = getCurrentInstance()
const emit = defineEmits([
  'pageName'
])
emit('pageName', 'category')
onMounted(() => {
  getData()
})
//表格
const tableCol = [
  { id: 1, label: "分类的名字", prop: "name", minWidth: 120 },
  { id: 2, label: "分类的详情", prop: "note", minWidth: 480 },
  { id: 3, label: "操作", prop: "operation", width: 120, fixed: "right" },
]
const tableData = ref([])
const pageNum = ref(1)
const pageTotal = ref(0)
const pageChange = (e) => {
  pageNum.value = e
  getData()
}
const getData = async () => {
  const query = { pageNum: pageNum.value, pageSize: 30 }
  const res = await api.get("/categories?" + new URLSearchParams(query))
  if (res.code == 0) {
    tableData.value = res.result.records
    pageTotal.value = res.result.total
  }
}
//表单校验
const rules = reactive({
  name: [
    { required: true, message: "请输入类别名称", trigger: ['blur'] },
  ],
})
const formRef = ref()
let form = reactive({
  name: null,
  note: null
})
const operationType = ref()
const getOne = async (data) => {
  const res = await api.get(`/categories/${data}`)
  if (res.code == 0) {
    form = Object.assign(form, { ...res.result })
  } else {
    ElMessage.error("数据异常，请重试")
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
  form.note = null
  operationDialogVisible.value = false
}
const operationDialogConfirm = async () => {
  await formRef.value.validate(async (valid) => {
    if (valid) {
      let params = { name: form.name }
      form.note ? params.note = form.note : null
      if (operationType.value == 1) {
        console.log(operationType.value);
        const res = await api.post("/categories", params)
        console.log(res);
        if (res.code == 0) {
          ElMessage.success(res.message)
          getData()
          operationDialogClose()
        } else {
          ElMessage.error(res.message)
        }
      } else {
        const res = await api.put(`/categories/${form.id}`, params)
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
  const res = await api.delete(`/categories/${data.id}`)
  if (res.code == 0) {
    ElMessage.success(res.message)
    getData()
  } else {
    ElMessage.error(res.message)
  }
}
</script>
<style></style>