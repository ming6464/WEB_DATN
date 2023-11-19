<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto"></div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" @click="openModal(-1)"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add user
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Id
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Tên
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Số điện thoại
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Chức vụ cao nhất
                </th>
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
                      <div class="font-medium text-gray-900">
                        {{ person.last_name + " " + person.first_name }}
                      </div>
                    </div>
                  </div>
                </td>

                <td class="whitespace-nowrap py-4 px-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-900">
                      {{ person.email }}
                    </div>
                  </div>
                </td>

                <td class="whitespace-nowrap py-4 px-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-900">
                      {{ person.phone }}
                    </div>
                  </div>
                </td>

                <td class="py-4 px-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div
                        class="mt-1 rounded-md text-center bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                        v-if="person.isAdmin">
                        Admin
                      </div>
                      <div
                        class="mt-1 rounded-md text-center bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                        v-else-if="person.isStaff">
                        Nhân viên
                      </div>
                      <div
                        class="mt-1 rounded-md text-center bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                        v-else-if="person.isShiper">
                        Giao hàng
                      </div>
                    </div>
                  </div>
                </td>
                <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button type="button" @click="openModal(index)" class="text-indigo-600 hover:text-indigo-900 mr-1">
                    Edit
                  </button>
                  <button type="button" @click="showDeleteModal(index)" class="text-red-600 hover:text-red-900 ml-1">
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
  <div v-show="isOpenModal">
    <div :class="{ 'opacity-100': isShowModal }"
      class="fixed inset-0 transition-opacity ease-in-out duration-500 opacity-0">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-50" @click="closeEditModal"></div>
        <div class="relative bg-white p-6 rounded-lg max-w-5xl max-h-[600px] overflow-y-auto overflow-hidden">
          <h3 class="text-lg font-semibold mb-4 text-center">
            {{
              selectedIndex >= 0 ? "Sửa thông tin người dùng" : "Thêm tài khoản"
            }}
          </h3>
          <!-- Form for editing person details -->
          <form @submit.prevent="submitEditForm" class="mx-auto mt-8 sm:max-w-xl sm:mt-7">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div class="col-span-full flex items-center gap-x-8">
                <img :src="staffEdit.image" alt="" class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover" />
                <div>
                  <button type="button"
                    class="rounded-md bg-blue px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-blue">
                    Đổi ảnh đại diện
                  </button>
                  <p class="mt-2 text-xs leading-5 text-gray-400">
                    JPG, GIF hoặc PNG. Tối đa 1MB.
                  </p>
                </div>
              </div>
              <div>
                <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Họ</label>
                <div class="mt-2.5">
                  <input type="text" v-model="staffEdit.last_name" name="last-name" id="last-name" required
                    autocomplete="family-name"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">Tên</label>
                <div class="mt-2.5">
                  <input type="text" v-model="staffEdit.first_name" required name="first-name" id="first-name"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                <div class="mt-2.5">
                  <input type="email" name="email" required v-model="staffEdit.email" id="email" autocomplete="email"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="phone" class="block text-sm font-semibold leading-6 text-gray-900">Số điện thoại</label>
                <div class="mt-2.5">
                  <input type="text" name="phone" required v-model="staffEdit.phone" id="phone" autocomplete="phone"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">Mật khẩu</label>
                <div class="mt-2.5">
                  <input type="text" name="password" required v-model="staffEdit.password" id="password"
                    autocomplete="password"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="sm:col-span-2" v-if="selectedIndex < 0">
                <label for="password2" class="block text-sm font-semibold leading-6 text-gray-900">Nhập lại mật
                  khẩu</label>
                <div class="mt-2.5">
                  <input type="text" name="password2" required v-model="password2" id="phone" autocomplete="password2"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label class="block text-sm font-semibold leading-6 text-gray-900"> Chức vụ
                  <span v-if="!isAnySwitchOn" class="ml-1 text-xs leading-5 text-red-500">không được thiếu</span>
                </label>
                <div class="sm:col-span-2">
                  <div>
                    <SwitchGroup as="div" class="flex items-center justify-between">
                      <span class="flex flex-grow flex-col">
                        <SwitchDescription as="span" class="text-sm text-gray-500">Shiper</SwitchDescription>
                      </span>
                      <Switch v-model="staffEdit.isShiper"
                        :class="[staffEdit.isShiper ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                        <span aria-hidden="true"
                          :class="[staffEdit.isShiper ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                      </Switch>
                    </SwitchGroup>
                  </div>

                  <div class="mt-2">
                    <SwitchGroup as="div" class="flex items-center justify-between">
                      <span class="flex flex-grow flex-col">
                        <SwitchDescription as="span" class="text-sm text-gray-500">Staff</SwitchDescription>
                      </span>
                      <Switch v-model="staffEdit.isStaff"
                        :class="[staffEdit.isStaff ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                        <span aria-hidden="true"
                          :class="[staffEdit.isStaff ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                      </Switch>
                    </SwitchGroup>
                  </div>

                  <div class="mt-2">
                    <SwitchGroup as="div" class="flex items-center justify-between">
                      <span class="flex flex-grow flex-col">
                        <SwitchDescription as="span" class="text-sm text-gray-500">Admin</SwitchDescription>
                      </span>
                      <Switch v-model="staffEdit.isAdmin"
                        :class="[staffEdit.isAdmin ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                        <span aria-hidden="true"
                          :class="[staffEdit.isAdmin ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                      </Switch>
                    </SwitchGroup>
                  </div>

                </div>
              </div>
            </div>


            <div class="mt-8 flex">
              <button type="button" @click="closeEditModal"
                class="rounded-md bg-red-500 px-3 py-2 mr-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                Huỷ
              </button>
              <button type="submit"
                class="rounded-md bg-indigo-500 px-3 py-2 ml-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- delete modal -->
  <div v-show="isDeleteModalOpen">
    <div :class="{ 'opacity-100': isShowDeleteModal }"
      class="transition-opacity ease-in-out duration-500 opacity-0 relative z-10" aria-labelledby="modal-title"
      role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 w-screen">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                    Xoá tài khoản
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Bạn có chắc chắn muốn xoá tài khoản này không? Tất cả dữ
                      liệu sẽ bị xóa vĩnh viễn. Hành động này không thể được
                      hoàn tác.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" @click="deleteStaff"
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                Xoá
              </button>
              <button type="button" @click="closeDeleteModal"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                Huỷ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'
const staffs = ref([
  {
    id: "md0001",
    last_name: "Lindsay",
    first_name: "Walton",
    email: "lindsay.walton@example.com",
    isAdmin: true,
    isStaff: true,
    isShiper: true,
    phone: "1234567890",
    password: "1234567890",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },

  {
    id: "md0002",
    last_name: "Lindsay",
    first_name: "Walton",
    email: "lindsay.walton@example.com",
    isAdmin: true,
    isStaff: true,
    isShiper: true,
    phone: "1234567890",
    password: "1234567890",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]);

// modal
const isOpenModal = ref(false);
const isShowModal = ref(false);
const isDeleteModalOpen = ref(false);
const isShowDeleteModal = ref(false);
const password2 = ref("");
const selectedIndex = ref(-1);
const staffEdit = ref({});
const isAnySwitchOn = ref(true);
const openModal = async (index) => {
  isAnySwitchOn.value = true;
  isOpenModal.value = true;
  selectedIndex.value = index;
  if (index >= 0) {
    staffEdit.value = { ...staffs.value[index] };
  } else {
    password2.value = "";
    staffEdit.value = {
      id: "",
      last_name: "",
      first_name: "",
      email: "",
      phone: "",
      isAdmin: false,
      isStaff: false,
      isShiper: false,
      image: "",
    };
  }
  await delay(100);
  isShowModal.value = true;
};

const submitEditForm = () => {
  isAnySwitchOn.value = staffEdit.value.isShiper || staffEdit.value.isStaff || staffEdit.value.isAdmin;
  if (isAnySwitchOn.value == false) return;
  if (selectedIndex.value >= 0) {
    staffs.value.splice(selectedIndex.value, 1, staffEdit.value);
  } else {
    if (staffEdit.value.password == password2.value) {
      staffs.value.push(staffEdit.value);
    } else {
      console.log("Sai password");
    }
  }
  closeEditModal();
};

const showDeleteModal = async (index) => {
  selectedIndex.value = index;
  isDeleteModalOpen.value = true;
  await delay(100);
  isShowDeleteModal.value = true;
};

const deleteStaff = () => {
  try {
    staffs.value.splice(selectedIndex.value, 1);
    closeDeleteModal();
  } catch (error) { }
};

const closeDeleteModal = async () => {
  isShowDeleteModal.value = false;
  await delay(500);
  isDeleteModalOpen.value = false;
};

const closeEditModal = async () => {
  isShowModal.value = false;
  await delay(500);
  isOpenModal.value = false;
  staffEdit.value = {};
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// modal
</script>

