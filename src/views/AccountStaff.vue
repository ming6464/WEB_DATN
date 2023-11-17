<!-- <template>
  <div class="isolate bg-white px-4 py-18 sm:py-2 lg:px-6">
    <form action="#" method="POST" class="mx-auto mt-8 max-w-xl sm:mt-6">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="col-span-full flex items-center gap-x-8">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="" class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover" />
          <div>
            <button type="button"
              class="rounded-md bg-blue px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-blue">
              Change avatar
            </button>
            <p class="mt-2 text-xs leading-5 text-gray-400">
              JPG, GIF or PNG. 1MB max.
            </p>
          </div>
        </div>
        <div>
          <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Họ</label>
          <div class="mt-2.5">
            <input type="text" name="last-name" id="last-name" autocomplete="family-name"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Tên</label>
          <div class="mt-2.5">
            <input type="text" name="first-name" id="first-name" autocomplete="given-name"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
          <div class="mt-2.5">
            <input type="email" name="email" id="email" autocomplete="email"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="company" class="block text-sm font-semibold leading-6 text-gray-900">Địa chỉ</label>
          <div class="mt-2.5">
            <input type="text" name="company" id="company" autocomplete="organization"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="phone-number" class="block text-sm font-semibold leading-6 text-gray-900">Số điện thoại</label>
          <div class="relative mt-2.5">
            <div class="absolute inset-y-0 left-0 flex items-center">
              <label for="country" class="sr-only">Country</label>
              <select id="country" name="country"
                class="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                <option>VN</option>
                <option>CA</option>
                <option>EU</option>
              </select>
              <ChevronDownIcon class="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                aria-hidden="true" />
            </div>
            <input type="tel" name="phone-number" id="phone-number" autocomplete="tel"
              class="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div class="mt-8 flex">
          <button type="submit"
            class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const agreed = ref(false);
</script> -->


<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" @click="openModal"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
          user</button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Id</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tên</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Thông tin cá nhân</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Trạng thái</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Chức vụ</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(person, index) in staffs" :key="index">
                <td class="px-3 py-4 text-sm text-gray-500">
                  <div class="font-medium text-gray-900">{{ person.id }}</div>
                </td>
                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="h-11 w-11 flex-shrink-0">
                      <img class="h-11 w-11 rounded-full" :src="person.image" alt="" />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">{{ person.last_name + " " + person.first_name }}</div>

                    </div>
                  </div>
                </td>

                <td class="whitespace-nowrap py-4 px-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">{{ person.email }}</div>
                      <div class="font-medium text-gray-900">{{ person.phone }}</div>
                    </div>
                  </div>
                </td>

                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span
                    class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Active</span>
                </td>
                <td class="py-4 px-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div
                        class="mt-1 rounded-md text-center bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                        v-show="person.isShiper">Giao hàng</div>
                      <div
                        class="mt-1 rounded-md text-center bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                        v-show="person.isStaff">Nhân viên</div>
                      <div
                        class="mt-1 rounded-md text-center bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                        v-show="person.isAdmin">Admin</div>
                    </div>
                  </div>
                </td>
                <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button type="button" @click="openModal(index)" class="text-indigo-600 hover:text-indigo-900 mr-1">
                    Edit
                  </button>
                  <button type="button" @click="deleteStaff" class="text-red-600 hover:text-red-900 ml-1">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- Edit Modal -->
  <div v-if="isOpenModal" class="fixed inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div class="relative bg-white p-8 rounded-lg w-96">
        <h3 class="text-lg font-semibold mb-4 text-center">Edit Person</h3>

        <!-- Form for editing person details -->
        <form @submit.prevent="submitEditForm" class="mx-auto mt-8 sm:max-w-xl sm:mt-7">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div class="col-span-full flex items-center gap-x-8">
              <img :src="staffEdit.image" alt="" class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover" />
              <div>
                <button type="button"
                  class="rounded-md bg-blue px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-blue">
                  Change avatar
                </button>
                <p class="mt-2 text-xs leading-5 text-gray-400">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>
            <div>
              <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Họ</label>
              <div class="mt-2.5">
                <input type="text" v-model="staffEdit.last_name" name="last-name" id="last-name"
                  autocomplete="family-name"
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Tên</label>
              <div class="mt-2.5">
                <input type="text" v-model="staffEdit.first_name" name="first-name" id="first-name"
                  autocomplete="given-name"
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
              <div class="mt-2.5">
                <input type="email" name="email" v-model="staffEdit.email" id="email" autocomplete="email"
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="mt-8 flex">
              <button type="button" @click="closeEditModal"
                class="rounded-md bg-red-500 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                Cancel
              </button>
              <button type="submit"
                class="rounded-md bg-indigo-500 px-3 py-2 ml-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const staffs = ref([
  {
    id: 'md0001',
    last_name: 'Lindsay',
    first_name: 'Walton',
    email: 'lindsay.walton@example.com',
    isAdmin: true,
    isStaff: true,
    isShiper: true,
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },

  {
    id: 'md0002',
    last_name: 'Lindsay',
    first_name: 'Walton',
    email: 'lindsay.walton@example.com',
    isAdmin: true,
    isStaff: false,
    isShiper: true,
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'md0003',
    last_name: 'Lindsay',
    first_name: 'Walton',
    email: 'lindsay.walton@example.com',
    isAdmin: false,
    isStaff: true,
    isShiper: true,
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },

]);

// modal
const isOpenModal = ref(false);
const isDeleteModalOpen = ref(false);
let selectedIndex = -1;
const staffEdit = ref({});
const openModal = (index = -1) => {
  isOpenModal.value = true;
  if (index >= 0) {
    staffEdit.value = { ...staffs.value[index] };
    selectedIndex = index;
  } else {
    staffEdit.value = {
      id: '',
      last_name: '',
      first_name: '',
      email: '',
      isAdmin: false,
      isStaff: false,
      isShiper: false,
      image:
        '',
    }
  }
}

const submitEditForm = () => {
  if (selectedIndex >= 0) {
    staffs.value.splice(selectedIndex, 1, staffEdit.value);
  }
  closeEditModal();
}

const deleteStaff = (index) => {
  try {
    staffs.value.splice(index, 1);
  } catch (error) {

  }
}

const closeEditModal = () => {
  staffEdit.value = {};
  isOpenModal.value = false;
}

// modal
</script>

