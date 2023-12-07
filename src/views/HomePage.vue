<template>
  <div class="max-w-sm">
    <VueDatePicker v-model="date" :max-date="new Date()" range multi-calendars
      :format="filterMode == 'day' ? 'dd/MM/yyyy' : filterMode == 'month' ? 'MM/yyyy' : 'yyyy'" :clearable="false"
      @update:model-value="handleDate" />
  </div>

  <div class="m-3 ml-0 flex flex-row">
    <h2 class="text-sm font-medium text-center pr-3 py-2">Chế độ lọc : </h2>
    <div>
      <button @click="On_Click_FilterModel('day')" type="button"
        class="rounded-md mr-2 px-3 py-2 border-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 hover:border-indigo-500 hover:text-white focus-visible:outline 
                                                                                                                                                                                                                                                                                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        :class="{ 'bg-indigo-600 text-white border-indigo-600': filterMode == 'day', 'border-gray-400': filterMode != 'day' }">Ngày</button>

      <button @click="On_Click_FilterModel('month')" type="button"
        class="rounded-md mr-2 px-3 py-2 border-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 hover:border-indigo-500 hover:text-white focus-visible:outline 
                                                                                                                                                                                                                                                                                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        :class="{ 'bg-indigo-600 text-white border-indigo-600': filterMode == 'month', 'border-gray-400': filterMode != 'month' }">Tháng</button>

      <button type="button" @click="On_Click_FilterModel('year')"
        class="rounded-md px-3 py-2 border-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 hover:border-indigo-500 hover:text-white focus-visible:outline 
                                                                                                                                                                                                                                                                                                                      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        :class="{ 'bg-indigo-600 text-white border-indigo-600': filterMode == 'year', 'border-gray-400': filterMode != 'year' }">Năm
      </button>
    </div>
  </div>

  <div class="mt-3">
    <div class="max-w-full border-2 border-gray-300 rounded-md p-4">
      <h3 class="text-sm font-medium text-center">Tổng doanh thu</h3>
      <div id="chart-timeline">
        <apexchart type="area" height="350" ref="chart_totalRevenue"
          :options="filterMode == 'day' ? chartOptions_day : filterMode == 'month' ? chartOptions_month : chartOptions_year"
          :series="series_total">
        </apexchart>
      </div>
    </div>

    <!-- Không được xoá -->
    <div class="mt-10 flex sm:flex-col lg:flex-row gap-x-6">
      <div class="sm:w-full lg:w-1/2">
        <div class="max-w-full border-2 border-gray-300 rounded-md p-3">
          <h3 class="text-sm font-medium text-center">Doanh thu các mặt hàng</h3>
          <div id="chart-timeline">
            <apexchart type="area" height="350" ref="chart_count"
              :options="filterMode == 'day' ? chartOptions_day : filterMode == 'month' ? chartOptions_month : chartOptions_year"
              :series="series_count"></apexchart>
          </div>
        </div>
      </div>
      <div class="sm:w-full sm:mt-10 lg:mt-0 lg:w-1/2">
        <div class="max-w-full border-2 border-gray-300 rounded-md p-3">
          <h3 class="text-sm font-medium text-center">Số lượng bán các mặt hàng</h3>
          <div id="chart-timeline">
            <apexchart type="area" height="350" ref="chart_top5"
              :options="filterMode == 'day' ? chartOptions_day : filterMode == 'month' ? chartOptions_month : chartOptions_year"
              :series="series_top5"></apexchart>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import moment from 'moment';
import { instance } from '../assets/axios-instance';
import * as API from '../assets/API'
import VueApexCharts from "vue3-apexcharts";
import { watch, ref, onMounted } from 'vue';
const chart_totalRevenue = ref(null);
const chart_count = ref(null);
const chart_top5 = ref(null);
const filterMode = ref('');

const series_total = ref([
  {
    name: "",
    data: []
  }
]);

const series_count = ref([
  {
    name: "",
    data: []
  }
]);

const series_top5 = ref([
  {
    name: "",
    data: []
  }
]);


const chartOptions_day = {
  chart: {
    id: 'area-datetime',
    type: 'area',
    height: 350,
    toolbar: {
      show: false,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
      }
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: false,
      zoomedArea: {
        fill: {
          color: '#90CAF9',
          opacity: 0.4
        },
        stroke: {
          curve: 'smooth',
          color: '#0D47A1',
          opacity: 0.4,
          width: 1
        }
      }
    }
  },
  annotations: {
    yaxis: [
      {
        y: -10000,
      },
    ],
    xaxis: [
      {
        borderColor: '#999',
        yAxisIndex: 0,
        label: {
          show: true,
          text: 'Rally',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
        },
      },
    ],
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    style: 'hollow',
  },
  xaxis: {
    type: 'datetime',
    max: new Date().getTime(),
    tickAmount: 20,
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: "MM/yyyy",
        day: 'dd/MM',
        hour: 'HH:mm',
      },
    }
  },
  tooltip: {
    x: {
      format: 'dd/MM/yyyy',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
};

const chartOptions_month = {
  chart: {
    id: 'area-datetime',
    type: 'area',
    height: 350,
    toolbar: {
      show: false,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
      }
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: false,
      zoomedArea: {
        fill: {
          color: '#90CAF9',
          opacity: 0.4
        },
        stroke: {
          curve: 'smooth',
          color: '#0D47A1',
          opacity: 0.4,
          width: 1
        }
      }
    }
  },
  annotations: {
    yaxis: [
      {
        y: -10000,
      },
    ],
    xaxis: [
      {
        borderColor: '#999',
        yAxisIndex: 0,
        label: {
          show: true,
          text: 'Rally',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
        },
      },
    ],
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    style: 'hollow',
  },
  xaxis: {
    type: 'datetime',
    max: new Date().getTime(),
    tickAmount: 20,
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: "MM/yyyy",
        day: 'dd/MM',
        hour: 'HH:mm',
      },
    }
  },
  tooltip: {
    x: {
      format: 'MM/yyyy',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
};

const chartOptions_year = {
  chart: {
    id: 'area-datetime',
    type: 'area',
    height: 350,
    toolbar: {
      show: false,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
      }
    },
    zoom: {
      enabled: true,
      type: 'x',
      autoScaleYaxis: false,
      zoomedArea: {
        fill: {
          color: '#90CAF9',
          opacity: 0.4
        },
        stroke: {
          curve: 'smooth',
          color: '#0D47A1',
          opacity: 0.4,
          width: 1
        }
      }
    }
  },
  annotations: {
    yaxis: [
      {
        y: -10000,
      },
    ],
    xaxis: [
      {
        borderColor: '#999',
        yAxisIndex: 0,
        label: {
          show: true,
          text: 'Rally',
          style: {
            color: '#fff',
            background: '#775DD0',
          },
        },
      },
    ],
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    style: 'hollow',
  },
  xaxis: {
    type: 'datetime',
    max: new Date().getTime(),
    tickAmount: 20,
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: "MM/yyyy",
        day: 'dd/MM',
        hour: 'HH:mm',
      },
    }
  },
  tooltip: {
    x: {
      format: 'yyyy',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 100],
    },
  },
};
const date = ref();
// Set default date range to yesterday to today on component mount
onMounted(() => {
  const lastMonth = new Date();

  if (lastMonth.getMonth() == 0) {
    lastMonth.setMonth(11);
  } else {
    lastMonth.setMonth(lastMonth.getMonth() - 1);
  }
  lastMonth.setDate(1);
  lastMonth.setHours(0, 0, 0, 0)

  const curMonth = new Date();

  date.value = [lastMonth, curMonth];

  On_Click_FilterModel('month');

});

// Define the updateData function
const updateData = async () => {
  let time1 = new Date(date.value[0]);
  let time2 = new Date(date.value[1]);
  let zoom = time2;
  let filterCode = 1;
  if (time1.getTime() > time2.getTime()) {
    time2 = time1;
    time1 = zoom;
  }

  time1.setHours(0, 0, 0, 0);
  if (filterMode.value != 'day') {
    time1.setDate(1);
    if (filterMode.value == 'year') {
      time1.setMonth(0);
    }
  }

  switch (filterMode.value) {
    case 'month':
      filterCode = 1;
      break;
    case 'year':
      filterCode = 2;
      break;
  }

  const format = 'yyyy-MM-DD';

  const params = {};

  params.startDate = formatTime(time1, format);
  params.endDate = formatTime(time2, format);
  params.filter = filterCode;

  console.log(params);

  await instance.get(API.statistics, { params: params })
    .then(res => {
      console.log(res.data);
      series_total.value = [];
      series_count.value = [];
      series_top5.value = [];
      series_total.value.push(finishData(res.data.data[0]));
      series_total.value.push(finishData(res.data.data[1]));
      series_count.value.push(finishData(res.data.data[1]));
      series_top5.value.push(res.data.data[2]);
      console.log(series_total.value, series_count.value, series_top5.value);
      ZoomXAll(time1, time2)
    })

    .catch(err => {
      console.error(err);
    })

};

const finishData = (data) => {
  data.data.forEach(x => {
    let time = x[0];
    switch (filterMode.value) {
      case 'month':
        time += '-01'
        break;
      case 'year':
        time += '-01-01';
        break;
    }
    x[0] = moment(time).valueOf();
  });
  return data;
}

const formatTime = (time, format) => {
  return moment(time).format(format);
}

const ZoomXAll = (time1, time2) => {
  if (series_total.value[0].data.length > 0) {
    chart_totalRevenue.value.zoomX(
      time1.getTime(),
      time2.getTime()
    );
  }

  if (series_count.value[0].data.length > 0) {
    chart_count.value.zoomX(
      time1.getTime(),
      time2.getTime()
    );
  }


  // chart_top5.value.zoomX(
  //   time1.getTime(),
  //   time2.getTime()
  // );
}

const handleDate = (modelData) => {
  if (modelData.length < 2) return;
  date.value = modelData;
  updateData();
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const On_Click_FilterModel = async (modelData) => {
  if (modelData == filterMode.value) return;
  filterMode.value = modelData;
  updateData();
};

const formatLog = (currentDate) => {
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;

}

</script>
