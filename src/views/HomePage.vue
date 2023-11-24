<template>
  <div id="chart">
    <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>



<script setup>
import VueApexCharts from "vue3-apexcharts";

const series = [
  {
    name: 'series1',
    data: [99, 40, 28, 51, 42, 109, 100, 99, 99, 99]
  },
  {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41, 1, 99, 1]
  },
  {
    name: 'series3',
    data: [1, 3, 45, 3, 210, 52, 41, 20, 39, 1]
  },
  {
    name: 'series4',
    data: [11, 210, 150, 100, 60, 52, 41, 100, 99, 200]
  },
];

const chartOptions = {
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      tools: {
        download: false,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        reset: true
      },
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    categories: [
      "2018-09-19",
      "2018-09-20",
      "2018-09-21",
      "2018-09-22",
      "2018-09-23",
      "2018-09-24",
      "2018-09-25",
      "2018-09-26",
      "2018-09-27",
      "2018-09-28",
    ]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy'
    },
  },

};
</script>

