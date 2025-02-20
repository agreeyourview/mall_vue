<template>
  <el-menu
    background-color="#304156"
    text-color="#fff"
    active-text-color="var(--bt-theme-color-1)"
    :collapse="isCollapse"
    :collapse-transition="false"
    router
    :default-active="route.fullPath"
  >
    <div style="height: 80px; text-align: center">
      <img :src="systemLogo" alt="" style="width: 160px; margin-top: 20px; height: 25px;" v-show="!isCollapse"><br>
      <b ref="systemNameRef" style="color: white;font-size: small;" v-show="!isCollapse">{{ systemName }}</b>
    </div>
    <template v-for="item in menuList" :key="item.id">
      <el-menu-item :index="item.url">
        <el-icon style="font-size: 18px;"><component style="font-size: 18px;" :is="item.icon"></component></el-icon>
        <template #title><span :ref="menuNameRefs">{{ item.name }}</span></template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { adminMenuData } from '../utils/publicData'; // 根据实际路径调整

const route = useRoute();
const currentRoute = route;
const menuList = ref(adminMenuData);
const menuNameRef = ref([]);
const systemNameRef = ref();

const menuNameRefs = (el) => {
  if (el) {
    menuNameRef.value.push(el);
  }
};

onMounted(() => {
  let maxMenuWidth = 0;
  let titleWidth = systemNameRef.value.offsetWidth + 40;

  // 遍历菜单宽度并获取最大值
  menuNameRef.value.forEach(item => {
    if (item.offsetWidth > maxMenuWidth) maxMenuWidth = item.offsetWidth;
  });

  maxMenuWidth += 72;

  // 判断最大值是否小于200，否则按标准200设宽
  if (maxMenuWidth < titleWidth) maxMenuWidth = titleWidth;
  if (maxMenuWidth < 200) maxMenuWidth = 200;

  // 将动态获取的菜单宽度返回 layout 组件
  emit('maxMenuWidth', maxMenuWidth);
});

defineProps({
  isCollapse: {
    type: Boolean,
  },
  systemName: {
    default: null,
  },
  systemLogo: {
    default: '../assets/logo.png',
  },
});

const emit = defineEmits(['maxMenuWidth']);
</script>

<style scoped>
.el-menu {
  height: 100%;
}
.el-menu-item.is-active {
  background-color: #CECECE !important;
  color: black;
}
</style>