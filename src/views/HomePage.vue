<template>
  <div v-if="data_series_all.length > 0">
    <div class="-mt-2 bg-white border-b border-gray-200 "
      style="position: fixed;top: 72px;right: 0px;left: 0px;z-index: 1;">
      <div class="flex flex-row gap-x-4 justify-end py-2">
        <div class="grid grid-cols-3 divide-x rounded-md border border-black">
          <button @click="On_Click_FilterModel('day')" type="button"
            class="rounded-l-md  px-3 py-2  text-sm font-semibold shadow-sm hover:bg-indigo-500  hover:text-white focus-visible:outline 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :class="{ 'bg-indigo-600 text-white border-indigo-600': filterMode == 'day', 'border-gray-400': filterMode != 'day' }">Ngày</button>

          <button @click="On_Click_FilterModel('month')" type="button"
            class="px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500  hover:text-white focus-visible:outline 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :class="{ 'bg-indigo-600 text-white border-indigo-600': filterMode == 'month', 'border-gray-400': filterMode != 'month' }">Tháng</button>

          <button type="button" @click="On_Click_FilterModel('year')"
            class="rounded-r-md px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500  hover:text-white focus-visible:outline 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :class="{ 'bg-indigo-600 text-white border-indigo-600': filterMode == 'year', 'border-gray-400': filterMode != 'year' }">Năm
          </button>
        </div>
        <div class="max-w-sm">
          <VueDatePicker v-model="date" :max-date="new Date()" range multi-calendars
            :format="filterMode == 'day' ? 'dd/MM/yyyy' : filterMode == 'month' ? 'MM/yyyy' : 'yyyy'" :clearable="false"
            @update:model-value="handleDate" class="rounded-md border border-black" />
        </div>
      </div>
    </div>

    <div class="mb-10 mt-10">
      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <!-- tổng doanh thu -->
        <div class="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow-lg sm:px-6 sm:pt-6">
          <dt>
            <div class="absolute rounded-md bg-indigo-500 p-3">
              <EnvelopeOpenIcon class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ data_series_all[3].name }}</p>
          </dt>
          <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p class="text-2xl font-semibold text-gray-900">{{ data_series_all[3].data[0].totalPrice }}</p>
          </dd>
        </div>
        <!-- Tổng số lượng khách hàng -->
        <div class="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow-lg sm:px-6 sm:pt-6">
          <dt>
            <div class="absolute rounded-md bg-indigo-500 p-3">
              <UsersIcon class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ data_series_all[4].name }}</p>
          </dt>
          <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p class="text-2xl font-semibold text-gray-900">{{ data_series_all[4].data[0].totalCustomer }}</p>
          </dd>
        </div>

        <div class="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow-lg sm:px-6 sm:pt-6">
          <dt>
            <div class="absolute rounded-md bg-indigo-500 p-3">
              <UsersIcon class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ data_series_all[3].name }}</p>
          </dt>
          <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p class="text-2xl font-semibold text-gray-900">{{ data_series_all[3].data[0].totalPrice }}</p>
          </dd>
        </div>
        <div class="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow-lg sm:px-6 sm:pt-6">
          <dt>
            <div class="absolute rounded-md bg-indigo-500 p-3">
              <UsersIcon class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ data_series_all[3].name }}</p>
          </dt>
          <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p class="text-2xl font-semibold text-gray-900">{{ data_series_all[3].data[0].totalPrice }}</p>
          </dd>
        </div>
      </dl>
    </div>

    <div class="mt-3">
      <div class="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-x-3">
        <div class="lg:col-span-2 rounded-md border border-gray-300 shadow-lg h-[500px]">
          <div class="bg-indigo-600 text-white rounded-t-md opacity-90 p-2 text-center text-lg font-semibold">Tổng doanh
            thu</div>
          <div id="chart-timeline">
            <apexchart type="area" height="350" ref="chart_totalRevenue"
              :options="filterMode == 'day' ? chartOptions_day : filterMode == 'month' ? chartOptions_month : chartOptions_year"
              :series="data_series_all[0]">
            </apexchart>
          </div>
        </div>
        <div class="h-[500px] rounded-md border border-gray-300 overflow-hidden pb-12 shadow-lg mt-10 lg:mt-0">
          <div class="bg-indigo-600 text-white rounded-t-md opacity-90 p-2 text-center text-lg font-semibold">{{
            data_series_all[2].name }}</div>
          <ul class="overflow-y-auto h-full">
            <li v-for="product in  data_series_all[2].data" :key="product.productId" class="border-t border-gray-300">
              <div class="p-4 flex items-center space-x-4">
                <div class="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full">
                  <!-- Thêm hình ảnh sản phẩm nếu có -->
                  <img :src="product.image" alt="Product Image" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1">
                  <div class="font-bold text-md">{{ truncate(product.name, 50) }}</div>
                  <div class="text-gray-600">Giá bán : {{ product.price }}</div>
                  <div class="text-gray-600">Số lượng bán ra : {{ product.totalAmount }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-x-3">
        <div class="lg:col-span-2 rounded-md border border-gray-300 shadow-lg h-[500px]">
          <div class="bg-indigo-600 text-white rounded-t-md opacity-90 p-2 text-center text-lg font-semibold">Số lượng bán
          </div>
          <div id="chart-timeline">
            <apexchart type="area" height="350" ref="chart_totalRevenue"
              :options="filterMode == 'day' ? chartOptions_day : filterMode == 'month' ? chartOptions_month : chartOptions_year"
              :series="data_series_all[1]">
            </apexchart>
          </div>
        </div>
        <div class="h-[500px] rounded-md border border-gray-300 overflow-hidden pb-12 shadow-lg mt-10 lg:mt-0">
          <div class="bg-indigo-600 text-white rounded-t-md opacity-90 p-2 text-center text-lg font-semibold">{{
            data_series_all[6].name }}</div>
          <ul class="overflow-y-auto h-full">
            <!-- <li v-for="product in  data_series_all[6].data" :key="product.productId" class="border-t border-gray-300">
              <div class="p-4 flex items-center space-x-4">
                <div class="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full">
                  <img :src="product.image" alt="Product Image" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1">
                  <div class="font-bold text-md">{{ truncate(product.name, 50) }}</div>
                  <div class="text-gray-600">Giá bán : {{ product.price }}</div>
                  <div class="text-gray-600">Số lượng bán ra : {{ product.totalAmount }}</div>
                </div>
              </div>
            </li> -->
          </ul>
        </div>
      </div>

      <div class="mt-10">
        <div class="h-[500px] rounded-md border border-gray-300 overflow-hidden pb-10 shadow-lg ">
          <div class="bg-indigo-600 opacity-90 text-white rounded-t-md p-2 text-center text-lg font-semibold">Danh sách
            sản phẩm tồn
            kho</div>
          <ul class="overflow-y-auto h-full">
            <li v-for="product in  sortProductsByAmount(data_series_all[5].data)" :key="product.productId"
              class="border-t border-gray-300">
              <div class="p-4 flex items-center space-x-4">
                <div class="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full">
                  <!-- Thêm hình ảnh sản phẩm nếu có -->
                  <img :src="product.mainImage" alt="Product Image" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1">
                  <div class="font-bold text-md">{{ truncate(product.name, 80) }}</div>
                  <div class="text-gray-600">{{ product.productAmount }} sản phẩm tồn kho</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-if="ShowLoading" class="w-full h-full flex justify-center items-center"
    style="position: fixed; top: 0; left: 0;z-index: 100;">
    <div class="flex justify-center items-center">
      <!-- Phần background với độ mờ -->
      <div class="bg-gray-500" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.3;">
      </div>
      <!-- Nội dung loading spinner -->
      <div class="spinner-border text-white" role="status">
        <fwb-spinner color="blue" size="12" class="lg:ml-64 mt-10" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { showToast } from '../assets/Toastify';
import moment from 'moment';
import { FwbSpinner } from 'flowbite-vue'
import { instance } from '../assets/axios-instance';
import * as API from '../assets/API'
import VueApexCharts from "vue3-apexcharts";
import { watch, ref, onMounted } from 'vue';
import { useToken } from '../store/tokenStore';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid'
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/vue/24/outline'
import { FormatCurrencyVND } from '../assets/formatCurrency'
const chart_totalRevenue = ref(null);
const chart_count = ref(null);
const chart_top5 = ref(null);
const filterMode = ref('');
const store = useToken();
const ShowLoading = ref(false);
const data_series_all = ref([]);

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

  store.onSetCurrentPage({ index: 0, child: -1 })

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

const truncate = (text, maxLength) => {
  if (!text) return '';
  return text.toString().length > maxLength ? text.slice(0, maxLength) + '...' : text
};

// Define the updateData function
const updateData = async () => {
  updateLoading(true);
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

      data_series_all.value = res.data.data;
      console.log('------------', data_series_all.value.length, data_series_all.value);
    })

    .catch(err => {

      try {
        showToast(err.response.data.message, true);
      } catch (error) {
        showToast('Lỗi', true);
      }
      console.error(err);
    })

  updateLoading(false);

};

const sortProductsByAmount = (data) => {
  return data.sort((a, b) => (b.productAmount - a.productAmount) * 1);
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

const updateLoading = (check) => {
  ShowLoading.value = check;
}

</script>