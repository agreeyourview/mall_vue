<template>
    <el-upload :style="uploadStyle" :auto-upload="false" :on-change="checkSize" class="avatar-uploader">
      <img v-if="imgUrl" :src="imgUrl.includes('blob:') ? imgUrl : basePath + imgUrl" class="avatar" :style="uploadStyle"/>
      <el-icon v-else class="avatar-uploader-icon" :style="uploadStyle"><Plus /></el-icon>
    </el-upload>
  </template>
  <script setup>
  import { ref, getCurrentInstance, onMounted } from 'vue';
  import { Plus } from '@element-plus/icons-vue';
  const { proxy } = getCurrentInstance()
  const {uploadStyle, imgData, fileSize} = defineProps({
    uploadStyle: { //样式
      default: { width: '148px', height: '198px'}
    },
    imgData: {  //数据
      default:[]
    },
    fileSize: {  //上传大小
      default: 2
    },
  })
  const imgUrl= ref()
  const basePath = window.httpurl +'/imgs/'
  onMounted(()=>{
    if(imgData.length!=0){
      imgUrl.value = imgData[0].imgUrl
    }
  })
  const checkSize = (file) => {
    const isFormat = file.raw.type == 'image/png' || file.raw.type == 'image/jpeg'
    if (!isFormat) {
      ElMessage.error(proxy.$t('eltext.upload.errorType') + "!")
    } else if (file.raw.size / 1024 / 1024 > fileSize) {
      ElMessage.error(proxy.$t('eltext.upload.errorSize', { size: fileSize }) + "!")
    } else {
      handleChange(file)
    }
  }
  const handleChange = (file) => {  //头像回显
    imgUrl.value = URL.createObjectURL(file.raw);
    imgData[0] = {imgUrl:imgUrl.value,file:file.raw}
  }
  </script>
  <style scoped>
  .avatar {
    display: block;
  }
  .avatar-uploader {
    background-color: #fafafa;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  
  .avatar-uploader:hover {
    border-color: var(--el-color-primary);
  }
  
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
  </style>