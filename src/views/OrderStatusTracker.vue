<template>
  <div v-if="!isOpenDetailOrder">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center mt-4">
        <div class="flex items-center space-x-4 flex-grow">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Tìm kiếm ..."
            class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500 flex-grow"
          />

          <!-- Dropdown filter -->
          <select
            v-model="selectedFilter"
            class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500"
          >
            <option value="id">ID</option>
            <option value="name">Tên</option>
          </select>
        </div>
      </div>
    </div>
    <!-- ... (existing code) ... -->
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-7 lg:-mx-4">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Mã đơn
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Tên Khách hàng
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Ngày đặt
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Số điện thoại
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Tổng tiền
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Phương thức thanh toán
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Trạng thái thanh toán
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Trạng thái đơn hàng
                </th>
                <th
                  scope="col"
                  class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Hoạt động
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <!-- ... (existing code) ... -->
              <tr v-for="order in filteredOrders" :key="order.id">
                <td
                  class="whitespace-nowrap px-3 py-5 text-sm text-gray-900 sm:pl-2"
                >
                  <div class="text-gray-900">{{ order.id }}</div>
                </td>
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0"
                >
                  {{ order.addressData.name }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"
                >
                  {{ formattedDateTime(order.createdAt) }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"
                >
                  {{ order.addressData.phone }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"
                >
                  {{ order.paymentData.total }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"
                >
                  {{ order.paymentData.paymentType }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"
                >
                  {{ order.paymentData.status }}
                </td>
                <td v-if="order.status == 1">
                  <select
                    v-model="order.paymentData.status"
                    class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500"
                  >
                    <option value="1">Chờ giao hàng</option>
                    <option value="2">Đang giao hàng</option>
                    <option value="3">Thành công</option>
                    <option value="4">Trả lại hàng</option>
                    <option value="5">Đã hủy</option>
                  </select>
                </td>
                <td class="flex flex-row gap-x-2 py-4">
                  <button
                    class="text-red-700 hover:text-indigo-900"
                    @click="showDetails(order)"
                  >
                    <Bars3Icon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">, {{ order.id }}</span>
                  </button>
                  <button
                    class="text-green-400 hover:text-green-500"
                    @click="acceptOrder(order.id)"
                  >
                    <CheckCircleIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">, {{ order.id }}</span>
                  </button>
                  <button
                    class="text-red-400 hover:text-red-500"
                    @click="cancelOrder(order.id)"
                  >
                    <XCircleIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">, {{ order.id }}</span>
                  </button>
                </td>
              </tr>
              <!-- ... (existing code) ... -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal for Details -->
  <div v-if="isOpenDetailOrder" class="overflow-y-auto">
    <div class="order-detail-page">
      <div class="px-4 py-3">
        <h1 class="text-xl font-semibold leading-7 text-gray-900">
          Chi tiết đơn hàng
        </h1>
      </div>
      <div class="my-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Tên khách hàng
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ selectedPerson.addressData.name }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Ngày đặt
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ formattedDateTime(selectedPerson.createdAt) }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Số điện thoại
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ selectedPerson.addressData.phone }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">Địa chỉ</dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ getAddressFull(selectedPerson.addressData) }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Tổng tiền
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ selectedPerson.paymentData.total }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Loại thanh toán
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ selectedPerson.paymentData.paymentType }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Loại thanh toán
            </dt>
            <dd
              class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
            >
              {{ selectedPerson.paymentData.status }}
            </dd>
          </div>
          <!-- ... (Phần HTML hiện tại của bạn) ... -->

          <!-- Thêm table mới -->
          <div class="mt-6 overflow-x-auto">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">
              Chi tiết sản phẩm
            </h2>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <!-- Thêm cột hình ảnh vào đầu bảng -->
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Hình ảnh
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tên sản phẩm
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Loại
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Giá
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Màu
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Số lượng
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tổng tiền
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <!-- Lặp qua các sản phẩm trong orderItemData -->
                <tr v-for="item in selectedPerson.orderItemData" :key="item.id">
                  <!-- Hiển thị hình ảnh ở đầu dòng -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <img
                      :src="
                        item.orderProductSizeColorData.productData.mainImage
                      "
                      alt="Product Image"
                      class="h-12 w-12 sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-16 lg:w-16 object-cover"
                    />
                  </td>
                  <!-- Các cột thông tin khác -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ item.orderProductSizeColorData.productData.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{
                      item.orderProductSizeColorData.productData.categoryData
                        .name
                    }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ item.orderProductSizeColorData.price }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ item.orderProductSizeColorData.colorData.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ item.orderProductSizeColorData.sizeData.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.amount }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ item.price }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ... (Phần HTML hiện tại của bạn) ... -->
        </dl>
      </div>
      <div
        style="position: fixed; bottom: 0px; right: 0px; left: 0px"
        class="lg:ml-72"
      >
        <div class="bg-gray-50 px-4 py-3 flex justify-between">
          <button
            @click="closeDetails"
            type="button"
            class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:border-indigo-500 sm:w-auto sm:text-sm"
          >
            Quay lại
          </button>
          <div class="flex flex-row items-center justify-center gap-x-3">
            <button
              @click="closeDetails"
              type="button"
              class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-red-500 focus:outline-none focus:ring focus:border-indigo-500 sm:w-auto sm:text-sm"
            >
              Từ chối</button
            ><button
              @click="closeDetails"
              type="button"
              class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-400 text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring focus:border-indigo-500 sm:w-auto sm:text-sm"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

import { ref, watch, computed } from "vue";
import {
  Bars3Icon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/20/solid";
import {
  PencilSquareIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/20/solid";
import { TrashIcon, PaperClipIcon } from "@heroicons/vue/20/solid";
const orders = ref([
  {
    id: 19,
    customerId: 3,
    status: 1,
    addressId: 1,
    createdAt: "2023-12-04T13:33:59.000Z",
    updatedAt: "2023-12-04T13:33:59.000Z",
    deletedAt: null,
    paymentData: {
      id: 15,
      paymentType: 2,
      status: 1,
      total: 300000,
      transaction: null,
      discountCode: "NGUYENHAU2",
      createdAt: "2023-12-04T13:33:59.000Z",
    },
    addressData: {
      id: 1,
      name: "Nguyen Cong Hau",
      phone: "0123456789",
      customerId: 2,
      city: "Ha Noi",
      district: "Ba Vi",
      commune: "Phong Van",
      street: "xom Giau",
      createdAt: "2023-11-29T09:52:39.000Z",
      updatedAt: "2023-11-29T09:59:19.000Z",
      deletedAt: null,
    },
  },
]);

const selectedPerson = ref({
  id: 1,
  customerId: 1,
  status: 1,
  createdAt: "2023-12-07T16:34:47.000Z",
  updatedAt: "2023-12-07T16:34:47.000Z",
  deletedAt: null,
  orderItemData: [
    {
      id: 1,
      amount: 4,
      price: 100000,
      orderProductSizeColorData: {
        id: 3,
        price: 100000,
        productData: {
          id: 1,
          name: "Product 1",
          mainImage: "https://via.placeholder.com/500",
          categoryData: {
            id: 1,
            name: "Category 1",
          },
        },
        colorData: {
          id: 1,
          name: "Red",
        },
        sizeData: {
          id: 3,
          name: "M",
        },
      },
    },
    {
      id: 2,
      amount: 1,
      price: 100000,
      orderProductSizeColorData: {
        id: 1,
        price: 100000,
        productData: {
          id: 1,
          name: "Product 1",
          mainImage: "https://via.placeholder.com/500",
          categoryData: {
            id: 1,
            name: "Category 1",
          },
        },
        colorData: {
          id: 1,
          name: "Red",
        },
        sizeData: {
          id: 1,
          name: "XS",
        },
      },
    },
    {
      id: 3,
      amount: 1,
      price: 100000,
      orderProductSizeColorData: {
        id: 2,
        price: 100000,
        productData: {
          id: 1,
          name: "Product 1",
          mainImage: "https://via.placeholder.com/500",
          categoryData: {
            id: 1,
            name: "Category 1",
          },
        },
        colorData: {
          id: 1,
          name: "Red",
        },
        sizeData: {
          id: 2,
          name: "S",
        },
      },
    },
  ],
  paymentData: {
    id: 1,
    paymentType: 2,
    status: 1,
    total: 300000,
    transaction: null,
    discountCode: "NGUYENHAU2",
    createdAt: "2023-12-07T16:34:47.000Z",
  },
  addressData: {
    id: 1,
    name: "Nguyen Cong Hau",
    phone: "0123456789",
    customerId: 2,
    city: "Ha Noi",
    district: "Ba Vi",
    commune: "Phong Van",
    street: "xom Giau",
    createdAt: "2023-11-29T09:52:39.000Z",
    updatedAt: "2023-11-29T09:59:19.000Z",
    deletedAt: null,
  },
});
const isOpenDetailOrder = ref(false);
const acceptOrder = (id) => {};
const cancelOrder = (id) => {};

const formattedDateTime = (time) => {
  // Sử dụng moment để định dạng thời gian
  return moment(time).format("DD/MM/yyyy HH:mm");
};
const getAddressFull = (addressData) => {
  if (!addressData) return "";
  return `${addressData.street}, ${addressData.commune}, ${addressData.district}, ${addressData.city}`;
};

//search

const selectedFilter = ref("id"); // Giá trị mặc định của bộ lọc

const searchTerm = ref("");

watch(selectedFilter, (newVal, oldVal) => {
  console.log("Bộ lọc được chọn:", newVal);
});

const filteredOrders = computed(() => {
  const term = searchTerm.value.toString().toLowerCase().trim();

  switch (selectedFilter.value) {
    case "id":
      return orders.value.filter((order) =>
        order.id.toString().toLowerCase().includes(term)
      );
    case "name":
      return orders.value.filter((order) =>
        order.name.toString().toLowerCase().includes(term)
      );
  }
});

//search
// Status
const selectedStatus = ref("pending");
// status

const showDetails = (order) => {
  isOpenDetailOrder.value = true;
  //selectedPerson.value = { ...order };
};

const closeDetails = () => {
  isOpenDetailOrder.value = false;
  //selectedPerson.value = null;
};
const filteredPeopleByStatus = computed(() => {
  if (selectedStatus.value === "all") {
    // Return all orders if "all" status is selected
    return filteredOrders.value;
  }

  return filteredOrders.value.filter(
    (order) => order.status === selectedStatus.value
  );
});
</script>
