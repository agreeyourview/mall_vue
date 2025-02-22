<template>
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :width="width"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="handleClose"
      :destroy-on-close="destroy"
      :center="center"
    >
      <div :style="title ? {} : { paddingTop:'10px' }">
        <slot name="main"></slot>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <slot name="footer"></slot>
        </span>
      </template>
    </el-dialog>
  </template>
  <script setup>
  import { computed } from 'vue';
  const props = defineProps({
    dialogVisible:{
      type:Boolean,
      default: false
    },
    title:{
      type:String,
      default:null
    },
    width:{
      type:String,
      default:"50%"
    },
    center:{
      type:Boolean,
      default:true
    },
    destroy:{
      type:Boolean,
      default:false
    },
  })
  const dialogVisible = computed({  //弹窗收放
    get: () => props.dialogVisible,
    set: (value) => {
    },
  })
  const emit = defineEmits(['close'])
  const handleClose = () => {  //关闭按钮
    emit('close')
  }
  
  </script>
  <style>
  .el-dialog__headerbtn{ /* 关闭按钮位置 */
    width: 44px;
    height: 44px;
    top:0
  }
  .el-dialog__header{ /* 弹窗框头部 */
    padding: 10px;
  }
  
  .el-dialog--center .el-dialog__body{ /* 弹窗框主体 */
    padding: 10px 20px 0 20px;
  }
  
  .el-dialog__footer{ /* 弹窗框底部 */
    padding: 0 20px 20px 20px;
  }
  .el-dialog__title{ /* 弹窗框标题 */
    font-weight: bold;
  }
  .el-dialog { /* 设置对话框圆角 */
    border-radius: 10px; 
  }
  </style>