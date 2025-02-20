<template>
    <div class="index-container">
      <el-row :gutter="20">
      <el-col class="Row" :md="8" :lg="8">
        <el-card style="background-color: #0052d9;color: #fff;">
          <div style="height: 110px;display: flex;flex-direction: column;justify-content: space-between;">
            <div style="font-size: 24px;">当前时间</div>
            <div style="font-size: 32px;font-weight: bold;">{{ currentTime }}</div>
            <div></div>
          </div>
        </el-card>
      </el-col>
      <el-col class="Row" :md="8" :lg="8">
        <el-card>
          <div style="height: 110px;display: flex;flex-direction: column;justify-content: space-between;">
            <div style="font-size: 24px;">总用户数</div>
            <div style="font-size: 32px;font-weight: bold;">{{ totalUsers }}</div>
            <div></div>
          </div>
        </el-card>
      </el-col>
      <el-col class="Row" :md="8" :lg="8">
        <el-card>
          <div style="height: 110px;display: flex;flex-direction: column;justify-content: space-between;">
            <div style="font-size: 24px;">总订单数</div>
            <div style="font-size: 32px;font-weight: bold;">{{ totalOrders }}</div>
            <div></div>
          </div>
        </el-card>
      </el-col>
      </el-row>
      <el-card class="Row">
        <div style="height: calc(50vh - 60px);position: relative;">
          <el-date-picker v-model="newUserDate" @change="getChartData()" type="year" :disabled-date="disabledFutureDate" style="position: absolute;right: 0;z-index: 999;width: 80px;"/>
          <div ref="userChartDom" style=" height: 100%;"></div>
        </div>
      </el-card>
      <el-card class="Row">
        <div style="height: calc(50vh - 60px);position: relative;">
          <el-date-picker v-model="newUserDate" @change="getChartData()" type="year" :disabled-date="disabledFutureDate" style="position: absolute;right: 0;z-index: 999;width: 80px;"/>
          <div ref="orderChartDom" style="height: 100%;"></div>
        </div>
      </el-card> 
    </div>
  </template>
  
  <script setup>
  import { ref, nextTick, onMounted, getCurrentInstance, onBeforeUnmount, watch } from 'vue';
  import * as echarts from 'echarts';
  const emit = defineEmits([
  'pageName'
  ])
  emit('pageName', 'index')
  onMounted( async() => {
    newUserDate.value = new Date();
    newOrderDate.value = new Date();
    await nextTick();
    userChartRef = echarts.init(userChartDom.value);
    orderChartRef = echarts.init(orderChartDom.value);
    getUserChartData();
    getOrderChartData();
  });
  let userChartRef = ref(null);
  const userChartDom = ref();
  let orderChartRef = ref(null);
  const orderChartDom = ref();
  const currentTime = ref(new Date().toLocaleString());
  const totalUsers = ref(100);
  const totalOrders = ref(200);
  const newUserDate = ref(null);
  const newOrderDate = ref(null)
  onBeforeUnmount(()=>{
    window.removeEventListener('resize', handleResize)
  })
  //切换分辨率图表重绘
  const props = defineProps({
    isCollapse:{
      type: Boolean
    },
  })
  watch(() => props.isCollapse, (newValue, oldValue) => {
    handleResize()
  })

  const handleResize = () => {
    userChartRef.resize();
    orderChartRef.resize();
  }
 
const getUserChartData = () => {
  initUserChart();
  window.addEventListener('resize', handleResize, true)
}

const getOrderChartData = () => {
  initOrderChart();
  window.addEventListener('resize', handleResize, true)
}

  //日期限制
  const disabledFutureDate = (time) => {
    return time.getTime() > Date.now()
  }

  const initUserChart = () => {
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--bt-theme-color').trim();
    const option = {
      title: {
        text: "NewUsers",
        textStyle:{
          fontSize:16,
          fontWeight:'normal'
        }
      },
      grid: {
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '32',
        itemGap: 20,
        textStyle: {
          fontSize: 16
        }
      },
      color: themeColor,
      series: [{
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        type: 'line'
      }]
    };
    userChartRef.setOption(option);
    
  };
  
  const initOrderChart = () => {
    const themeColor2 = getComputedStyle(document.documentElement).getPropertyValue('--bt-theme-color-2').trim();
    const option = {
      title: {
        text: "NewOrders",
        textStyle:{
          fontSize:16,
          fontWeight:'normal'
        }
      },
      grid: {
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'item'
      },
      color: themeColor2,
      series: [{
        data: [15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125],
        type: 'bar'
      }]
    };
    orderChartRef.setOption(option);
  };
  </script>
  
  <style scoped>
  .index-container{
    padding: 10px 10px 0 10px;
  }
  .el-card{
    height: calc(100% - 1px);
  }
  .el-row{
    margin-bottom: 0;
  }
  .Row{
    margin-bottom: 20px;
  }
  </style>