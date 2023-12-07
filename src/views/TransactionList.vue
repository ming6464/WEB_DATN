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
                Tổng tiền
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Trạng thái
              </th>
              <th scope="col" class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Hoạt động
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <!-- ... (existing code) ... -->
            <tr v-for="person in filteredPeople" :key="person.id">
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
                <select v-model="person.status"
                  class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500">
                  <option value="pending">Chờ giao hàng</option>
                  <option value="in-progress">Đang giao hàng</option>
                  <option value="completed">Thành công</option>
                  <option value="return">Trả lại hàng</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </td>
              <td>
                <div class="mx-4 space-x-3">
                  <button class="text-red-700 hover:text-indigo-900" @click="showDetails(person)">
                    <Bars3Icon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">, {{ person.id }}</span>
                  </button>
                </div>
              </td>
            </tr>
            <!-- ... (existing code) ... -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- Modal for Details -->
  <div v-if="selectedPerson" class="fixed inset-0 z-10 overflow-y-auto mt-8">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- Modal Content -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div>
          <div class="px-4 sm:px-6">
            <h1 class="text-base font-semibold leading-7 text-gray-900">
              Chi tiết đơn hàng
            </h1>
          </div>
          <div class="mt-6 border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Tên khách hàng
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {{ selectedPerson.name }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Ngày đặt
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {{ selectedPerson.datetime }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Số điện thoại
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {{ selectedPerson.phone }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Địa chỉ
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {{ selectedPerson.address }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Tổng tiền
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {{ selectedPerson.number }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Loại thanh toán
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {{ selectedPerson.paymentType }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-4">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Trạng thái
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <select v-model="selectedPerson.status"
                    class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500">
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
          <button @click="saveStatusChanges" type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
            Lưu
          </button>
          <button @click="closeDetails" type="button"
            class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:border-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
            Thoát
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { PlusIcon, Bars3Icon } from "@heroicons/vue/20/solid";
import { useToken } from "../store/tokenStore";
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
    number: "30000",
    status: "pending",
    phone: "0608993454",
    paymentType: "Khi nhận hàng",
  },
]);
//search
const store = useToken();
onMounted(() => {
  if (store.id == -1) {
    store.onSetGoToLogin(true);
    return;
  }
  if (store.role == 1) {
    store.onSetCurrentPage({ index: 3, child: 0 });
  } else {
    store.onSetCurrentPage({ index: 2, child: 0 });
  }

})

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
const filteredPeopleByStatus = computed(() => {
  if (selectedStatus.value === "all") {
    // Return all orders if "all" status is selected
    return filteredPeople.value;
  }

  return filteredPeople.value.filter(
    (person) => person.status === selectedStatus.value
  );
});
const saveStatusChanges = () => {
  console.log("Status changes saved:", selectedPerson.status);

  const updatedPeople = [...people.value];

  const index = updatedPeople.findIndex(
    (person) => person.id === selectedPerson.value.id
  );

  if (index !== -1) {
    updatedPeople[index].status = selectedPerson.value.status;

    filteredPeople.value = updatedPeople;
  }

  closeDetails();
};
</script>
