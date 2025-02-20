<template>
    <div style="background-color: #fff;height: 58px;display: flex;align-items: center;justify-content: space-between;padding: 0 20px;">
    <div style="height: 18px;">
      <el-icon style="font-size: 18px;top: 2px;" @click="isCollapseFun()">
        <div v-if="!isCollapse"><Fold style="font-size: 18px;cursor: pointer;" v-show="!iconRoll"/><Expand style="font-size: 18px;cursor: pointer;" v-show="iconRoll"/></div>
        <div v-else><Expand style="font-size: 18px;cursor: pointer;" v-show="!iconRoll"/><Fold style="font-size: 18px;cursor: pointer;" v-show="iconRoll"/></div>
      </el-icon>
      <el-breadcrumb separator="/" style="display: inline-block; margin: 0 10px;">
        <el-breadcrumb-item>{{ currentRoute.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-dropdown @command="dropdownClick">
        <span style="outline: none;cursor: pointer;margin: 0 6px;">{{ user }}<el-icon class="el-icon--right"><ArrowDownBold /></el-icon></span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item v-if="role" command="info">info</el-dropdown-item> -->
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { Fold, Expand, ArrowDownBold } from '@element-plus/icons-vue';
import { useRouter ,useRoute} from 'vue-router'
const route = useRoute();
const router = useRouter();
const currentRoute = route;
defineProps({
  title: {
    type: String
  },
  isCollapse: {
    type: Boolean
  },
  isCollapseFun:{
    type: Function
  }
})
const user = ref("User")
const iconRoll = ref(false)
onMounted(()=>{
  document.documentElement.getAttribute('dir') ? iconRoll.value = true : iconRoll.value = false
  if (sessionStorage.getItem('obj')) user.value = JSON.parse(sessionStorage.getItem('obj')).username
})
const dropdownClick = (e) =>{
  if (e=="logout") {
    router.push('/login')
    sessionStorage.removeItem('obj')
    sessionStorage.removeItem('token')
    // router.push('/login')
  }
}
</script>
<style scoped>
</style>