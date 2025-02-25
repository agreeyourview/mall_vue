<template>
  <el-upload :limit="10" action="#" list-type="picture-card" :on-exceed="handleExceed" v-model:file-list="imglist" :multiple="true"
    :on-change="checkSize" :auto-upload="false">
    <el-icon>
      <Plus />
    </el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" style="width: 100%;height: 100%;" :src="file.url.includes('blob:') ? file.url : basePath + file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <!-- <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <el-icon>
              <ZoomIn />
            </el-icon>
          </span> -->
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <el-icon>
              <Delete />
            </el-icon>
          </span>
        </span>
      </div>
    </template>
    <template #tip>
      <div class="el-upload__tip"> 可以上传10张照片，单个不超过2M </div>
    </template>
  </el-upload>
  <!-- <el-dialog append-to-body v-model="dialogVisible">
    <img style="width: 100%;height: 100%;" :src="state.dialogImageUrl" alt="" />
  </el-dialog> -->
</template>
<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
const { proxy } = getCurrentInstance()
// let dialogVisible = ref(false);
const imglist = ref([])
let { imgData, fileSize } = defineProps({
  imgData: {   //数据
    default:[]
  },  
  fileSize: {} //上传大小
})
const basePath = window.httpurl +'/imgs/'
onMounted(()=>{
  imglist.value = imgData
})
//文件校验
const checkSize = (file) => {
  const isFormat = file.raw.type == 'image/png' || file.raw.type == 'image/jpeg'
  if (!isFormat) {
    ElMessage.error("上传照片格式错误" + "!")
    autoRemove(file)
  } else if (file.raw.size / 1024 / 1024 > fileSize) {
    ElMessage.error("上传图片过大"+ { size: fileSize }+ "!")
    autoRemove(file)
  } else {
    imgData.push(file.raw)
  }
}

// 自动删除
const autoRemove = (file) => {
  const index = imglist.value.indexOf(file);
  imglist.value.splice(index, 1);
};
// 删除
const handleRemove = (file) => {
  const index = imglist.value.indexOf(file);
  imglist.value.splice(index, 1);
  if(imglist.value.length != imgData.length) imgData.splice(index, 1);
  
};

// // 预览
// const handlePictureCardPreview = (file) => {
//   state.dialogImageUrl = file.url;
//   dialogVisible.value = true;
// };

// 上传照片超出限制的提示
const handleExceed = () => {
  ElMessage({ message: '最多上传10张照片', type: 'warning'});
};
</script>
<style scoped>
.el-upload-list__item-actions{
  align-items: start;
  justify-content: end;
}
.el-upload-list__item-delete{
  margin: 10px;
}
:deep(.el-upload-list__item){
  transition:none !important;
  -webkit-transition:none !important;
}
:deep(.el-upload-list__item-name){
  transition:none !important;
  -webkit-transition:none !important;
}
</style>