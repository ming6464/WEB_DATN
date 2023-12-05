<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center mt-4">
      <div class="flex items-center space-x-4 flex-grow">
        <input type="text" v-model="searchTerm" placeholder="Tìm kiếm ..."
          class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500 flex-grow" />

        <!-- Dropdown filter -->
        <select v-model="selectedFilter"
          class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500">
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
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Mã đơn
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Tên Khách hàng
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Ngày đặt
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Địa chỉ
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Tổng số lượng
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="person in people" :key="person.id">
              <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-900 sm:pl-2">
                <div class="text-gray-900">{{ person.id }}</div>
              </td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
                {{ person.name }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                {{ person.datetime }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                {{ person.address }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0">
                {{ person.number }}
              </td>
              <td>
                <select v-model="selectedStatus"
                  class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500">
                  <option value="id">Thành công</option>
                  <option value="name">Đã hủy</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import {
  PencilSquareIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/20/solid";
import { TrashIcon } from "@heroicons/vue/20/solid";
const people = [
  {
    id: "1",
    name: "Lindsay",
    datetime: "12:35:35 19/04/2023",
    address: "Nam Từ Liêm - Hà Nội",
    number: "12",
    status: "đã xác nhận",
  },
];
const selectedFilter = ref('id');
const selectedPerson = ref(null);
const editedPerson = ref({
  id: null,
  name: "",
  datetime: "",
  address: "",
  number: "",
});
//ADD
const isAddModalOpen = ref(false);
const newProduct = ref({
  id: null,
  name: "",
  datetime: "",
  address: "",
  number: "",
});
const openAddModal = () => {
  isAddModalOpen.value = true;
};

const closeAddModal = () => {
  isAddModalOpen.value = false;
};

const addNewProduct = () => {
  // Ensure a unique ID is assigned to the new product
  newProduct.value.id = String(people.value.length + 1);
  people.value.push({ ...newProduct.value });
  // Reset newProduct to clear the form
  newProduct.value = {
    id: null,
    name: "",
    datetime: "",
    address: "",
    number: "",
  };

  closeAddModal();
};
</script>
