<template>
  <div class="px-4 sm:px-6 lg:px-8 -mt-4" v-if="!isOpenDetailOrder">
    <div
      class="-mt-2 bg-white border-b border-gray-200"
      style="position: fixed; top: 70px; right: 0px; left: 0px"
    >
      <div class="lg:ml-72 px-4">
        <div class="flex justify-around items-center border-gray-300 py-4">
          <div
            class="flex items-center justify-between border border-gray-400 border-r-0 rounded-md shadow-sm md:w-8/12 sm:w-6/12"
          >
            <input
              type="text"
              placeholder="Tìm kiếm ..."
              v-model="searchTerm"
              class="rounded-md w-full rounded-r-none border-0 px-3 py-2 text-sm focus:border-gray-50 focus:border-0"
            />
            <select
              v-model="selectedFilter"
              class="border-0 px-3 py-2 text-sm focus:outline-0"
            >
              <option value="userId">UserID</option>
              <option value="name">Tên</option>
              <option value="email">Email</option>
            </select>
            <button
              type="button"
              @click="applyFilter()"
              class="inline-flex items-center rounded-md rounded-l-none bg-indigo-600 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <MagnifyingGlassIcon class="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flow-root mt-14">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  UserID
                </th>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4"
                >
                  Ảnh
                </th>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Họ và tên
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Hoạt động
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(person, index) in listItemShow" :key="index">
                <td class="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                  <div class="text-gray-900">
                    {{ person.customerData.userId }}
                  </div>
                </td>
                <td class="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="h-20 w-20 flex-shrink-0">
                      <img
                        class="h-18 w-20 rounded-full"
                        :src="person.customerData.picture"
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">
                    {{ person.customerData.name }}
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">
                    {{ person.customerData.email }}
                  </div>
                </td>
                <td class="py-4">
                  <button
                    class="hover:text-indigo-900 ml-10"
                    @click="showDetails(person.customerData.id)"
                  >
                    <AdjustmentsVerticalIcon
                      class="h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <nav v-if="filteredList.length > 7" class="flex justify-end mt-5">
      <v-pagination
        v-model="currentPage"
        :pages="totalPages"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="onPageChange"
      />
    </nav>
  </div>
  <!-- Modal for Details -->
  <div v-if="isOpenDetailOrder" class="overflow-y-auto">
    <div class="order-detail-page">
      <div class="px-4 py-3">
        <h1 class="text-xl font-semibold leading-7 text-gray-900">
          Chi tiết khách hàng
        </h1>
      </div>
      <div class="my-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">ID</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ selectedUser.customer.customerData.id }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Họ và tên
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ selectedUser.customer.customerData.name }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">Địa chỉ</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              <img
                class="h-18 w-20 rounded-full"
                :src="selectedUser.customer.customerData.picture"
                alt=""
              />
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">Email</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ selectedUser.customer.customerData.email }}
            </dd>
          </div>
        </dl>
      </div>
      <!-- Order Details Table -->
      <div class="mt-6 overflow-x-auto">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">
          Chi tiết đơn hàng
        </h2>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày đặt
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trạng thái
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tổng thanh toán
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trạng thái thanh toán
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in selectedUser.listOrder" :key="item.id">
              <td class="px-6 py-4 whitespace-nowrap">
                {{ item.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ formattedDateTime(item.paymentData.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ item.paymentData.status }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ item.paymentData.total }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ item.paymentData.paymentType }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ item.paymentData.transaction }}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style="position: fixed; bottom: 0px; right: 0px; left: 0px"
          class="lg:ml-72"
        >
          <div class="bg-gray-50 px-4 py-3 flex justify-end">
            <button
              @click="closeDetails"
              type="button"
              class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:border-indigo-500 sm:w-auto sm:text-sm"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>

      <!-- ... existing code ... -->
    </div>
  </div>

  <!-- loadding -->
  <div
    v-if="ShowLoading"
    class="w-full h-full flex justify-center items-center"
    style="position: fixed; top: 0; left: 0; z-index: 110"
  >
    <div class="flex justify-center items-center">
      <!-- Phần background với độ mờ -->
      <div
        class="bg-gray-500"
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.3;
        "
      ></div>
      <!-- Nội dung loading spinner -->
      <div class="spinner-border text-white" role="status">
        <fwb-spinner color="blue" size="12" class="lg:ml-64 mt-10" />
      </div>
    </div>
  </div>
  <!-- loadding -->
</template>
<script setup>
import { FwbSpinner } from "flowbite-vue";
import { showToast } from "../assets/Toastify";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { ref, onMounted } from "vue";
import {
  TrashIcon,
  PhotoIcon,
  PencilSquareIcon,
  PlusIcon,
  AdjustmentsVerticalIcon,
  UserCircleIcon,
  BookmarkIcon,
  XCircleIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
} from "@heroicons/vue/20/solid";
import { instance } from "../assets/axios-instance";
import { useToken } from "../store/tokenStore";
import * as API from "../assets/API";
import moment from "moment";
import axios from "axios";
const selectedFilter = ref("userId");
const searchTerm = ref("");
const store = useToken();
const ShowLoading = ref(false);
const users = ref([]);
const filteredList = ref([]);
const listItemShow = ref([]);
const itemOnPage = ref(10);
const currentPage = ref(1);
const totalPages = ref(7);
const selectedUser = ref([]);
onMounted(async () => {
  if (store.role == 1) {
    store.onSetCurrentPage({ index: 1, child: 0 });
  } else {
    store.onSetCurrentPage({ index: 1, child: 0 });
  }

  //fake data
  //fakeData(100);

  await LoadCustomerList();
  await applyFilter();
  console.log(listItemShow.value[0].customerData.userId);
});
// Add the following code for the order details modal
const isOpenDetailOrder = ref(false);

const showDetails = async (userId) => {
  isOpenDetailOrder.value = true;
  const res = await instance
    .get(API.GETDetailOrder + `${userId}`)
    .then((res) => {
      selectedUser.value = res.data.data;
    });
};

const closeDetails = () => {
  isOpenDetailOrder.value = false;
};
const getAddressFull = (addressData) => {
  if (!addressData) return "";
  return `${addressData.street}, ${addressData.commune}, ${addressData.district}, ${addressData.city}`;
};
const formattedDateTime = (time) => {
  // Sử dụng moment để định dạng thời gian
  return moment(time).format("HH:mm - DD/MM/yyyy");
};
const onPageChange = (page) => {
  const start = (page - 1) * itemOnPage.value; // Giả sử mỗi trang có x phần tử
  const end = start + itemOnPage.value;
  if (start < filteredList.value.length) {
    if (end < filteredList.value.length) {
      listItemShow.value = filteredList.value.slice(start, end);
    } else {
      listItemShow.value = filteredList.value.slice(
        start,
        filteredList.value.length
      );
    }
  } else {
    listItemShow.value = [];
  }
};
const openDetailUser = (userId) => {
  const selectedCustomer = users.value.find(
    (user) => user.customerData.userId === userId
  );
  selectedUser.value = { ...selectedCustomer };
  isOpenDetailOrder.value = true;
};
const LoadCustomerList = async () => {
  ShowLoading.value = true;
  await instance
    .get(API.GETCustomer)
    .then((res) => {
      users.value = res.data.data;

      console.log(users.value);
    })
    .catch((err) => {
      const mess = err.response.data.message
        ? err.response.data.message
        : "Lỗi";
      showToast(mess, true);
      console.error(mess, err);
    });
  ShowLoading.value = false;
};

const getCustomerDetails = async (userId) => {
  try {
    ShowLoading.value = true;
    const response = await instance.get(
      `http://localhost:3333/order/admin/${userId}`
    );
    selectedUser.value = response.data.data;
  } catch (error) {
    const message =
      error.response.data.message || "Error fetching customer details";
    showToast(message, true);
    console.error(message, error);
  } finally {
    ShowLoading.value = false;
  }
};
const applyFilter = () => {
  updateList(true);
};
const updateList = (isSearch, isDelete) => {
  const term = searchTerm.value.toLowerCase().trim();
  const lowerCaseSelectedFilter = selectedFilter.value.toLowerCase();
  filteredList.value = users.value.filter((person) => {
    switch (lowerCaseSelectedFilter) {
      case "userid":
        return person.customerData.userId
          .toString()
          .toLowerCase()
          .includes(term);
      case "name":
        return person.customerData.name.toLowerCase().includes(term);
      case "email":
        return person.customerData.email.toLowerCase().includes(term);
      default:
        return true; // Hiển thị tất cả nếu không có bộ lọc được chọn
    }
  });

  totalPages.value = Math.ceil(filteredList.value.length / itemOnPage.value);
  if (isSearch) {
    onPageChange(1);
  } else {
    let page = currentPage.value;
    if (isDelete) {
      if (page > totalPages.value) page = totalPages.value;
    }
    onPageChange(page);
  }
};
</script>
