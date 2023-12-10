<template>
  <div class="px-4 sm:px-6 lg:px-8 -mt-4">
    <div class="-mt-2 bg-white border-b border-gray-200 " style="position: fixed;top : 70px;right: 0px;left: 0px;">
      <div class="lg:ml-72 px-4">
        <div class="flex justify-around items-center border-gray-300 py-4">
          <div
            class="flex items-center justify-between border border-gray-400 border-r-0 rounded-md shadow-sm md:w-8/12 sm:w-6/12">
            <input type="text" placeholder="Tìm kiếm ..." v-model="searchTerm"
              class="rounded-md w-full rounded-r-none border-0 px-3 py-2 text-sm focus:border-gray-50 focus:border-0" />
            <select v-model="selectedFilter" class="border-0 px-3 py-2 text-sm focus:outline-0">
              <option value="id">ID</option>
              <option value="name">Tên</option>
              <option value="email">Email</option>
            </select>
            <button type="button" @click="applyFilter"
              class="inline-flex items-center rounded-md rounded-l-none bg-indigo-600 px-1 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <MagnifyingGlassIcon class="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <MenuItems
                class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuButton v-for="option in sortOptions" :key="option.name" v-slot="{ active }"
                    @click="changeSort(option.id)">
                    <span
                      :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']">{{
                        option.name }}</span>
                  </MenuButton>
                </div>
              </MenuItems> -->
    <div class="flow-root mt-14">
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
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Hoạt động
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(person, index) in listItemShow" :key="index">
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
                <td class="py-4">
                  <button class=" hover:text-indigo-900 ml-10" @click="openDetailUser(person.userId)">
                    <AdjustmentsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <nav v-if="filteredList.length > 7" class="flex justify-end">
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
import { TrashIcon, PhotoIcon, PencilSquareIcon, PlusIcon, AdjustmentsVerticalIcon, UserCircleIcon, BookmarkIcon, XCircleIcon, CheckIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, FunnelIcon } from "@heroicons/vue/20/solid";
import { instance } from '../assets/axios-instance';
import { useToken } from "../store/tokenStore";
import * as API from '../assets/API'

// const sortOptions = [
//   { name: 'Most Popular', id: '1', current: true },
//   { name: 'Best Rating', id: '2', current: false },
//   { name: 'Newest', id: '3', current: false },
//   { name: 'Price: Low to High', id: '4', current: false },
//   { name: 'Price: High to Low', id: '5', current: false },
// ]
// const changeSort = (value) => {
//   sortOptions.forEach(x => {
//     x.current = value == x.id ? true : false;
//   })
// }

const selectedFilter = ref('id');
const searchTerm = ref('');
const store = useToken();
const ShowLoading = ref(false);
const users = ref([]);
const filteredList = ref([]);
const listItemShow = ref([]);
const itemOnPage = ref(10);
const currentPage = ref(1);
const totalPages = ref(7);

onMounted(() => {
  if (store.role == 1) {
    store.onSetCurrentPage({ index: 1, child: 0 });
  } else {
    store.onSetCurrentPage({ index: 1, child: 0 });
  }

  //fake data
  fakeData(100);

  //LoadCustomerList();
  applyFilter();

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
  if (start < filteredList.value.length) {
    if (end < filteredList.value.length) {
      listItemShow.value = filteredList.value.slice(start, end);
    } else {
      listItemShow.value = filteredList.value.slice(start, filteredList.value.length);
    }

  } else {
    listItemShow.value = [];
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

const applyFilter = () => {
  const term = searchTerm.value.toString().toLowerCase().trim();
  switch (selectedFilter.value.toLowerCase()) {
    case "id":
      filteredList.value = users.value.filter((person) =>
        person.userId.toString().toLowerCase().includes(term)
      );
      break;
    case "name":
      filteredList.value = users.value.filter(
        (person) =>
          person.fullname.toString().toLowerCase().includes(term)
      );
      break;
    case "email":
      filteredList.value = users.value.filter(
        (person) =>
          person.email.toString().toLowerCase().includes(term)
      );
      break;
  }
  totalPages.value = Math.ceil(filteredList.value.length / itemOnPage.value);
  onPageChange(1);
}

const openDetailUser = (userId) => {

}

</script>