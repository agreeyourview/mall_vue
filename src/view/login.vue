<template>
    <div class="login-container">
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
  
const loginForm = ref({
    username: '',
    password: ''
});
  
const loginFormRef = ref(null);
  
const loginRules = {
username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
],
password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
]
};
  
const handleLogin = async () => {
const isValid = await loginFormRef.value.validate();
 if (isValid) {
    // 这里可以添加登录逻辑，例如发送请求到后端进行验证
      console.log('登录成功', loginForm.value);
  }
};
</script>
<style scoped>
.login-container {
 max-width: 300px;
 margin: 100px auto;
}
</style>