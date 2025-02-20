<template>
  <div class="login-container">
    <div style="width: 300px;height: 50px;margin-bottom: 20px;">
      <!-- <img src="@/assets/img/logo.png" style="width: 100%;height: 100%;" alt=""/> -->
    </div>
    <div style="background-color: #fff;border-radius: 20px;padding: 25px 25px 10px 25px;width: 350px;">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0">
        <el-form-item style="display: flex;flex-direction: column;align-items: center;">
          <span style="font-size: 24px;font-weight: bold;">Admin Login</span>
        </el-form-item>
        <el-form-item style="margin-top: 30px;" prop="username">
          <el-input ref="usernameRef" v-model="loginForm.username" oninput="value = value.replace(/\s+/g, '')" :prefix-icon="User" size="large" @keyup.enter.native="enterFun(1)" />
        </el-form-item>
        <el-form-item style="margin-top: 30px;" prop="password">
          <el-input ref="passwordRef" show-password v-model="loginForm.password" oninput="value = value.replace(/\s+/g, '')" :prefix-icon="Lock" size="large" @keyup.enter.native="enterFun(2)" />
        </el-form-item>
        <el-form-item style="margin-top: 30px;direction: ltr;">
          <el-row style="width: 350px;">
            <el-col :span="8">
            </el-col>
            <el-col :span="8" style="text-align: center;">
              <el-button type="primary" @click="loginFun()" size="large">login</el-button>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import { User,Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import api from '../api/index'
//全局使用$t
const { proxy } = getCurrentInstance()
//页面渲染
onMounted(()=>{
  usernameRef.value.focus()
})
//登录表单
const loginFormRef = ref()
const loginForm = reactive({
  username: '',
  password: ''
})
const loginRules = computed(()=>({
  username: [
    { required: true, message: 'enterUsername', trigger: ['blur', 'change'] },
    { min: 6, max: 20, message: 'limite6_20', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: 'enterPassword', trigger: ['blur', 'change'] },
    { min: 8, max: 20, message: 'limite8_20', trigger: ['blur', 'change'] },
  ],
}))
//登录按钮
const loginFun = () => {
  loginFormRef.value.validate( async (valid) => {
    if (valid) {
      router.push('/index')
    }
  })
  
}
//路由跳转
const router = useRouter()

//输入框回车登陆
const usernameRef = ref()
const passwordRef = ref()
const enterFun = (e) =>{
  if(e==1){
    passwordRef.value.focus()
  }else{
    loginFun()
  }
}
</script>
<style scoped>
.login-container {
  background-color: #304156;
  /* background: linear-gradient(to bottom right, #ffffff, #ff0000), url('../assets/adminLogin.png') no-repeat; */
  /* background-blend-mode: color-burn; */
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>