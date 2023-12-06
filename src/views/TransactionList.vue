<template>
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
                Địa chỉ
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Tổng số lượng
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="person in filteredPeople"
              :key="person.id"
              @click="showDetails(person)"
            >
              <td
                class="whitespace-nowrap px-3 py-5 text-sm text-gray-900 sm:pl-2"
              >
                <div class="text-gray-900">{{ person.id }}</div>
              </td>
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0"
              >
                {{ person.name }}
              </td>
              <td
                class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"
              >
                {{ person.datetime }}
              </td>
              <td
                class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"
              >
                {{ person.address }}
              </td>
              <td
                class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"
              >
                {{ person.number }}
              </td>
              <td>
                <select
                  v-model="person.status"
                  class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500"
                >
                  <option value="pending">Chờ giao hàng</option>
                  <option value="in-progress">Đang giao hàng</option>
                  <option value="completed">Thành công</option>
                  <option value="return">Trả lại hàng</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- Modal for Details -->
  <div v-if="selectedPerson" class="fixed inset-0 z-10 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- Modal Content -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div>
          <div class="px-4 sm:px-6">
            <h3 class="text-base font-semibold leading-7 text-gray-900">
              Chi tiết đơn hàng
            </h3>
          </div>
          <div class="mt-6 border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Tên khách hàng
                </dt>
                <dd
                  class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                >
                  {{ selectedPerson.name }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Ngày đặt
                </dt>
                <dd
                  class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                >
                  {{ selectedPerson.datetime }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Địa chỉ
                </dt>
                <dd
                  class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                >
                  {{ selectedPerson.address }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Số lượng
                </dt>
                <dd
                  class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                >
                  {{ selectedPerson.number }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Trạng thái
                </dt>
                <dd
                  class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                >
                  <select
                    v-model="selectedPerson.status"
                    class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500"
                  >
                    <option value="pending">Chờ giao hàng</option>
                    <option value="in-progress">Đang giao hàng</option>
                    <option value="completed">Thành công</option>
                    <option value="return">Trả lại hàng</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="saveStatusChanges"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Lưu
          </button>
          <button
            @click="closeDetails"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:border-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import {
  PencilSquareIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/20/solid";
import { TrashIcon, PaperClipIcon } from "@heroicons/vue/20/solid";
const people = ref([
  {
    id: "1",
    name: "Lindsay",
    datetime: "12:35:35 19/04/2023",
    address: "Nam Từ Liêm - Hà Nội",
    number: "12",
    status: "pending",
  },
]);
//search

const selectedFilter = ref("id"); // Giá trị mặc định của bộ lọc

const searchTerm = ref("");

watch(selectedFilter, (newVal, oldVal) => {
  console.log("Bộ lọc được chọn:", newVal);
});

const filteredPeople = computed(() => {
  const term = searchTerm.value.toString().toLowerCase().trim();

  switch (selectedFilter.value) {
    case "id":
      return people.value.filter((person) =>
        person.id.toString().toLowerCase().includes(term)
      );
    case "name":
      return people.value.filter((person) =>
        person.name.toString().toLowerCase().includes(term)
      );
  }
});

//search
// Status
const selectedStatus = ref("pending");
// status

const selectedPerson = ref(null);

const showDetails = (person) => {
  selectedPerson.value = person;
};

const closeDetails = () => {
  selectedPerson.value = null;
};
const saveStatusChanges = () => {
  // Implement the logic to save the changes to the backend or perform any other necessary actions
  console.log("Status changes saved:", selectedPerson.status);

  // Close the details modal after saving changes
  closeDetails();
};
</script>
