<template>
  <div>
    <VueDatePicker v-model="date" range multi-calendars :format="'dd/MM/yyyy'" class="mx-10" />
    <div id="chart">
      <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";
import { ref, watch, onMounted } from 'vue';

// Chart data
const series = [
  {
    name: "series1",
    data: [99, 40, 28, 51, 42, 109, 100, 99, 99, 99],
  },
  {
    name: "series2",
    data: [11, 32, 45, 32, 34, 52, 41, 1, 99, 1],
  },
  {
    name: "series3",
    data: [1, 3, 45, 3, 210, 52, 41, 20, 39, 1],
  },
  {
    name: "series4",
    data: [11, 210, 150, 100, 60, 52, 41, 100, 99, 200],
  },
];

const chartOptions = {
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2023-09-19",
      "2023-09-20",
      "2023-09-21",
      "2023-09-22",
      "2023-09-23",
      "2023-09-24",
      "2023-09-25",
      "2023-09-26",
      "2023-09-27",
      "2023-09-28",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy",
    },
  },
};

// Date picker data
const date = ref();

// Set default date range to yesterday to today on component mount
onMounted(() => {
  const today = new Date();

  // Tạo một bản sao của ngày hiện tại
  const yesterday = new Date(today);

  // Giảm đi một ngày
  yesterday.setDate(today.getDate() - 1);

  date.value = [yesterday, today];
});

// Define the updateData function
const updateData = (before, after) => {
  this.$refs.chart.zoomX(
    before.getTime(),
    after.getTime()
  );
};

// Watch for changes to the 'date' ref and call updateData
watch(date, () => {
  const startDate = date.value[0];
  const endDate = date.value[1];
  console.log(startDate, endDate)
  // Update the chart zoom based on the selected date range
  //updateData(startDate, endDate);
});
</script>
