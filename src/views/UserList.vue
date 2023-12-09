<template>
  <div class="px-4 sm:px-6 lg:px-8 -mt-4">
    <div class="flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  UserID
                </th>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4">
                  Ảnh
                </th>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Họ và tên
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Ngày sinh
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(person, index) in users_" :key="index">
                <td class="whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.userId }}</div>
                </td>
                <td class="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="h-20 w-20 flex-shrink-0">
                      <img class="h-18 w-20 rounded-full" :src="person.picture" alt="" />
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.name }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.email }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.dob }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <nav v-if="users.length > 7" class="flex justify-end">
      <v-pagination v-model="currentPage" :pages="totalPages" :range-size="1" active-color="#DCEDFF"
        @update:modelValue="onPageChange" />
    </nav>
  </div>
  <!-- loadding -->
  <div v-if="ShowLoading" class="w-full h-full flex justify-center items-center"
    style="position: fixed; top: 0; left: 0;">
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
  <!-- loadding -->
</template>
<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { ref, onMounted } from "vue";
import { PencilSquareIcon, TrashIcon, PlusIcon } from "@heroicons/vue/20/solid";
import { instance } from '../assets/axios-instance';
import { useToken } from "../store/tokenStore";
import * as API from '../assets/API'
const store = useToken();
const ShowLoading = ref(false);
const users = ref([]);
const users_ = ref();
const itemOnPage = ref(10);
const currentPage = ref(1);
const totalPages = ref(7);
onMounted(() => {
  if (store.id == -1) {
    store.onSetGoToLogin(true);
    return;
  }
  if (store.role == 1) {
    store.onSetCurrentPage({ index: 1, child: 0 });
  } else {
    store.onSetCurrentPage({ index: 1, child: 0 });
  }

  //fake data
  fakeData(100);

  //LoadCustomerList();

  totalPages.value = Math.ceil(users.value.length / itemOnPage.value);
  onPageChange(1);
})

const fakeData = (size) => {
  users.value = [];
  for (let i = 0; i < size; i++) {
    users.value.push(
      {
        id: i,
        userId: 100 + i,
        name: "Linh " + i,
        email: "linnn@gmail.com",
        picture:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        dob: '12/12/2012',
      }
    )
  }
}

const onPageChange = (page) => {
  const start = (page - 1) * itemOnPage.value; // Giả sử mỗi trang có x phần tử
  const end = start + itemOnPage.value;
  if (start < users.value.length) {
    if (end < users.value.length) {
      users_.value = users.value.slice(start, end);
    } else {
      users_.value = users.value.slice(start, users.value.length - 1);
    }

  } else {
    console.error("Start index out of bounds.");
  }
};

const LoadCustomerList = async () => {
  ShowLoading.value = true;
  await instance.get(API.GETCustomer)
    .then(res => {
      users.value = res.data.data;
    })
    .catch(err => console.error(err));
  ShowLoading.value = false;

}

</script>