<template>
    <div class="index-container">
      <div class="card-container">
        <el-card :title="currentTime">当前时间</el-card>
        <el-card :title="totalUsers">总用户数</el-card>
        <el-card :title="totalOrders">总订单数</el-card>
      </div>
      <div class="chart-container">
        <div ref="userChartRef" style="width: 100%; height: 400px;"></div>
        <div ref="orderChartRef" style="width: 100%; height: 400px;"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  
  const userChartRef = ref(null);
  const orderChartRef = ref(null);
  const currentTime = ref(new Date().toLocaleString());
  const totalUsers = ref(100);
  const totalOrders = ref(200);
  
  const initUserChart = () => {
    const myChart = echarts.init(userChartRef.value);
    const option = {
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        type: 'line'
      }]
    };
    myChart.setOption(option);
  };
  
  const initOrderChart = () => {
    const myChart = echarts.init(orderChartRef.value);
    const option = {
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125],
        type: 'bar'
      }]
    };
    myChart.setOption(option);
  };
  
  onMounted(() => {
    initUserChart();
    initOrderChart();
  });
  </script>
  
  <style scoped>
  .card-container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  
  .chart-container {
    display: flex;
    justify-content: space-around;
  }
  </style>