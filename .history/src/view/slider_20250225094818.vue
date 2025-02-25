<template>
  <div class="box-main">
    <el-card>
      <el-row :gutter="20" class="mb20">
        <el-col>
          <el-button :icon="Plus" type="primary" @click="operationDialogShow(1)">{{ $t('eltext.btn.new') }}</el-button>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <MallTable :page="pageNum" :pagesize="30" :tableCol="tableCol" :tableData="tableData"
          :tableHeight="`calc(100vh - 236px)`" style="border: #dcdfe6 solid 1px;"
          :tableHeader="{ background: 'var(--el-color-primary)', color: '#fff' }">
          <template v-slot="scopes">
            <template v-if="scopes.item.prop == 'imgUrl'">
              <img :src="scopes.scope.row.imgUrl ? basePath + scopes.scope.row.imgUrl : baseUrl"
                style="width: 60px;height: 45px">
            </template>
            <template v-else-if="scopes.item.prop == 'operation'">
              <div style="display: flex;align-items: center;">
                <el-icon :size="24" class="pointer" style="margin-right: 12px;"
                  @click="operationDialogShow(2, scopes.scope.row)">
                  <Edit />
                </el-icon>
                <el-popconfirm :confirm-button-text="$t('eltext.btn.confirm')"
                  :cancel-button-text="$t('eltext.btn.cancel')" title="确认删除?" @confirm="deleteFun(scopes.scope.row)">
                  <template #reference>
                    <el-icon :size="24" class="pointer">
                      <Delete />
                    </el-icon>
                  </template>
                </el-popconfirm>
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

    <MallDialog :dialogVisible="operationDialogVisible" :width="'500px'" :destroy="true"
      :title="operationType == 1 ? '新增轮播图' : '修改轮播图'" @close="operationDialogClose()">
      <template v-slot:main>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
          <el-form-item prop="imgUrl" label="图片">
            <MallUpload :imgData="form.imgUrl" :fileSize="2" :uploadStyle="{ width: '198px', height: '148px'}"/>
          </el-form-item>
          <el-form-item prop="note" label="说明">
            <el-input v-model="form.note" type="textarea" rows="4" resize='none'></el-input>
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
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import MallTable from '@/components/MallTable.vue';
import MallTable from '../components/MallTable.vue';
import MallDialog from '@/components/MallDialog.vue';
import MallUpload from '@/components/MallUpload.vue';
import baseUrl from '@/assets/img/login.jpg'
import api from '@/api/index';
const emit = defineEmits([
  'pageName'
])
emit('pageName', 'banner')
const basePath = window.httpurl +'/imgs/'
onMounted(() => {
  getData()
})
//表格
const tableCol = [
  { id: 1, label: "banner.bannerImg", prop: "imgUrl", minWidth: 120 },
  { id: 2, label: "banner.bannerNote", prop: "note", minWidth: 120 },
  { id: 3, label: "base.operation", prop: "operation", width: 120, fixed: "right" },
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
  const res = await api.get("/banner?" + new URLSearchParams(query))
  if (res.code == 0) {
    tableData.value = res.result.records
    pageTotal.value = res.result.total
  }
}

//表单校验
const rules = reactive({
  imgUrl: [
    { required: true, message: "请选择图片", trigger: ['blur'] }
  ]
})
//弹框数据
const formRef = ref()
let form = reactive({
  note: null,
  imgUrl: [],
})
const operationType = ref()

const getOne = async (id) => {
  const res = await api.get(`/banner/${id}`)
  if (res.code == 0) {
    form = Object.assign(form, { ...res.result })
    form.imgUrl = [{ imgUrl: res.result.imgUrl, file: null }]
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
  form.note = null
  form.imgUrl = []
  operationDialogVisible.value = false
}
const operationDialogConfirm = async () => {
  await formRef.value.validate(async (valid) => {
    if (valid) {
      const params = new FormData()
      if(form.note) params.append('note', form.note)
      params.append('imgUrl', form.imgUrl[0].file ? form.imgUrl[0].file : null)
      if (operationType.value == 1) {
        const res = await api.post("/banner", params, { headers: { "Content-Type": "multipart/form-data" } })
        if (res.code == 0) {
          ElMessage.success(res.message)
          getData()
          operationDialogClose()
        } else {
          ElMessage.error(res.message)
        }
      } else {
        const res = await api.put(`/banner/${form.id}`, params, { headers: { "Content-Type": "multipart/form-data" } })
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
  const res = await api.delete(`/banner/${data.id}`)
  if (res.code == 0) {
    getData()
    ElMessage.success(res.message)
  } else {
    ElMessage.error(res.message)
  }
}
</script>
<style></style>