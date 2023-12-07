<template>
  <div class="px-4 sm:px-6 lg:px-8">

    <div class="px-4 sm:px-6 lg:px-8 bg-white -mt-2" style="position: fixed;top : 70px;right: 0px;left: 0px;">
      <div class="flex justify-between items-center border-gray-300 py-4 lg:ml-72">
        <div class="flex items-center space-x-4 flex-grow">
          <input type="text" v-model="searchTerm" placeholder="Tìm kiếm ..."
            class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500 flex-grow" />

          <!-- Dropdown filter -->
          <select v-model="selectedFilter"
            class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-indigo-500">
            <option value="id">ID</option>
            <option value="name">Tên</option>
          </select>
          <div class="mt-4 sm:ml-16 sm:mt-0 self-end">
            <button type="button" @click="openModal(-1)"
              class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <PlusIcon class="h-5 w-5" aria-hidden="true" />
              Thêm tài khoản

            </button>
          </div>

        </div>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 text-left text-sm font-semibold text-gray-900">
                  Id
                </th>
                <th scope="col" class="py-3.5 text-left text-sm font-semibold text-gray-900">
                  Tên
                </th>
                <th scope="col" class="py-3.5 text-left text-sm font-semibold text-gray-900">
                  Tên tài khoản
                </th>
                <th scope="col" class="py-3.5 text-left text-sm font-semibold text-gray-900">
                  Chức vụ cao nhất
                </th>
                <th scope="col" class="py-3.5 text-left text-sm font-semibold text-gray-900">
                  Hoạt động
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(person, index) in filteredStaffs" :key="index">
                <td class="py-4 text-sm text-gray-500">
                  <div class="font-medium text-gray-900">{{ person.id }}</div>
                </td>
                <td class="whitespace-nowrap py-5 text-sm">
                  <div class="flex items-center">
                    <div class="h-11 w-11 flex-shrink-0">
                      <img class="h-11 w-11 rounded-full" :src="person.avatar" alt="" />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">
                        {{ person.fullname }}
                      </div>
                    </div>
                  </div>
                </td>

                <td class="whitespace-nowrap py-4 text-sm">
                  <div class="flex items-center">
                    <div class="font-medium text-gray-900">
                      {{ person.username }}
                    </div>
                  </div>
                </td>

                <td class="py-4 text-sm">
                  <span
                    class="rounded-md text-center bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Nhân viên
                  </span>
                </td>
                <td class="flex whitespace-nowrap py-5 text-right text-sm font-medium">
                  <button type="button" @click="openModal(person.id)" class="text-indigo-600 hover:text-indigo-900 mr-1">
                    <PencilSquareIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">Edit, {{ person.id }}</span>
                  </button>
                  <button type="button" @click="showDeleteModal(person.id)" class="text-red-600 hover:text-red-900 ml-1">
                    <TrashIcon class="h-5 w-5" aria-hidden="true" />
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
        <div
          class="relative bg-white p-6 rounded-lg max-w-5xl max-h-[600px] overflow-y-auto overflow-hidden lg:ml-64 mt-10">
          <h1 class="text-xl font-bold mb-4 text-center">
            {{
              IdSelected >= 0 ? "Sửa thông tin tải khoản" : "Thêm tài khoản"
            }}
          </h1>
          <!-- Form for editing person details -->
          <form @submit.prevent="submitEditForm" class="mx-auto mt-8 w-96 sm:mt-7">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div class="col-span-full flex items-center gap-x-8">
                <label for="image-upload" class="cursor-pointer">
                  <img :src="staffEdit.avatar" alt="" class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover" />
                </label>
                <input type="file" id="image-upload" @change="handleImageUpload" accept="image/*" class="hidden" />
              </div>

              <div class="sm:col-span-2">
                <label for="fullName" class="block text-sm font-semibold leading-6 text-gray-900">Tên đầy đủ</label>
                <div class="mt-2.5">
                  <input type="text" name="fullName" v-model="staffEdit.fullname" id="fullName" autocomplete="fullName"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="sm:col-span-2" v-show="IdSelected < 0">
                <label for="userName" class="block text-sm font-semibold leading-6 text-gray-900">Tài khoản</label>
                <div class="mt-2.5">
                  <input type="text" name="userName" v-model="staffEdit.username" id="userName" autocomplete="userName"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <!-- <div class="sm:col-span-2">
                <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                <div class="mt-2.5">
                  <input type="email" name="email" required v-model="staffEdit.email" id="email" autocomplete="email"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="phone" class="block text-sm font-semibold leading-6 text-gray-900">Số điện thoại</label>
                <div class="mt-2.5">
                  <input type="text" name="phone" @input="handlePhoneNumberInput" required v-model="staffEdit.phone"
                    id="phone" autocomplete="phone"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div> -->

              <div class="sm:col-span-2">
                <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">{{ IdSelected >=
                  0 ? 'Mật khẩu mới' : 'Mật khẩu' }}</label>
                <div class="mt-2.5">
                  <input type="text" name="password" v-model="staffEdit.password" id="password" autocomplete="password"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="sm:col-span-2" v-if="IdSelected < 0">
                <label for="password2" class="block text-sm font-semibold leading-6 text-gray-900">Nhập lại mật
                  khẩu</label>
                <div class="mt-2.5">
                  <input type="text" name="password2" v-model="password2" id="phone" autocomplete="password2"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <!-- phân quyền động -->
              <!-- <div class="sm:col-span-2">
                <div class="sm:col-span-2">
                  <div>
                    <SwitchGroup as="div" class="flex items-center justify-between">
                      <span class="flex flex-grow flex-col">
                        <SwitchDescription as="span" class="text-sm text-gray-500">Shiper</SwitchDescription>
                      </span>
                      <Switch v-model="staffEdit.isShiper" :class="[
                        staffEdit.isShiper ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
                      ]">
                        <span aria-hidden="true" :class="[
                          staffEdit.isShiper
                            ? 'translate-x-5'
                            : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        ]" />
                      </Switch>
                    </SwitchGroup>
                  </div>

                  <div class="mt-2">
                    <SwitchGroup as="div" class="flex items-center justify-between">
                      <span class="flex flex-grow flex-col">
                        <SwitchDescription as="span" class="text-sm text-gray-500">Staff</SwitchDescription>
                      </span>
                      <Switch v-model="staffEdit.isStaff" :class="[
                        staffEdit.isStaff ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
                      ]">
                        <span aria-hidden="true" :class="[
                          staffEdit.isStaff
                            ? 'translate-x-5'
                            : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        ]" />
                      </Switch>
                    </SwitchGroup>
                  </div>

                  <div class="mt-2">
                    <SwitchGroup as="div" class="flex items-center justify-between">
                      <span class="flex flex-grow flex-col">
                        <SwitchDescription as="span" class="text-sm text-gray-500">Admin</SwitchDescription>
                      </span>
                      <Switch v-model="staffEdit.isAdmin" :class="[
                        staffEdit.isAdmin ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
                      ]">
                        <span aria-hidden="true" :class="[
                          staffEdit.isAdmin
                            ? 'translate-x-5'
                            : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                        ]" />
                      </Switch>
                    </SwitchGroup>
                  </div>
                </div>
              </div> -->
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
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          @click="closeDeleteModal">
          <div
            class="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg lg:ml-64 mt-10">
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
                <TrashIcon class="h-5 w-5" aria-hidden="true" />
                Xoá
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { useToken } from "../store/tokenStore";
import { TrashIcon, PencilSquareIcon, PlusIcon } from "@heroicons/vue/20/solid";
import { ref, watch, computed, onMounted } from "vue";
import {
  Switch,
  SwitchDescription,
  SwitchGroup,
  SwitchLabel,
} from "@headlessui/vue";
import * as CheckRegex from "../assets/validate";
import { showToast } from "../assets/Toastify";
import * as API from '../assets/API';
import { instance } from '../assets/axios-instance';
import { FwbSpinner } from 'flowbite-vue'
const store = useToken();
const ShowLoading = ref(false);

const staffs = ref([
  {
    "id": 1,
    "username": "admin8",
    "password": "$2b$10$WeV6.qT91W7o4y.xc65YNe8u0cZ8o6PYrs1.pWZcW0xxhlY4bA0bq",
    "role": 1,
    "fullname": "admin",
    "avatar": "http://res.cloudinary.com/dbsfgxrjz/image/upload/v1701790879/admin-image/ro0e208y5nqcgccstxvt.jpg",
  }
]);
const selectedFilter = ref("id"); // Giá trị mặc định của bộ lọc
const searchTerm = ref("");
// modal
const isOpenModal = ref(false);
const isShowModal = ref(false);
const isDeleteModalOpen = ref(false);
const isShowDeleteModal = ref(false);
const password2 = ref("");
const IdSelected = ref(-1);
const staffEdit = ref({});
const isAnySwitchOn = ref(true);

onMounted(() => {
  if (store.id == -1) {
    store.onSetGoToLogin(true);
    return;
  }
  if (store.role == 1) {
    store.onSetCurrentPage({ index: 4, child: 0 });
  }

  loadData();
});

const loadData = async () => {
  updateLoad(true);
  await instance.get(API.GETAccounts)
    .then(res => {
      staffs.value = [];
      console.log(res.data);
      res.data.data.forEach(x => {
        if (x.role == 0) {
          staffs.value.push(x);
        }
      });
    })
    .catch(err => {
      console.error(err);
      showToast("Lỗi", true);
      return;
    })
  updateLoad(false);
}

const openModal = async (id) => {
  isAnySwitchOn.value = true;
  isOpenModal.value = true;
  IdSelected.value = id;
  if (staffEdit.value.fileImage) {
    staffEdit.value.fileImage = null;
  }
  if (id >= 0) {
    const editAcc = staffs.value.find(x => x.id == IdSelected.value);
    staffEdit.value = { ...editAcc };
    staffEdit.value.password = '';
  } else {
    password2.value = "";
    staffEdit.value = {
      "username": "",
      "password": "",
      "role": 0,
      "fullname": "",
      "avatar": "",
    };
  }
  await delay(100);
  isShowModal.value = true;
};

const handlePhoneNumberInput = () => {
  // Loại bỏ các ký tự không phải số khỏi chuỗi số điện thoại
  staffEdit.value.phone = staffEdit.value.phone.replace(/\D/g, "");
};

const submitEditForm = async () => {

  if (!checkvalidate(true)) return;
  updateLoad(true);

  const formAccount = new FormData();

  if (IdSelected.value >= 0) {
    const oldAcc = staffs.value.find(x => x.id == IdSelected.value);
    let checkEdit = false;

    if (oldAcc.fullname != staffEdit.value.fullname) {
      checkEdit = true;
      formAccount.append('fullname', staffEdit.value.fullname);
    }

    if (staffEdit.value.fileImage) {
      checkEdit = true;
      formAccount.append('avatar', staffEdit.value.fileImage);
    }

    if (staffEdit.value.password.toString().trim().length > 0) {
      checkEdit = true;
      formAccount.append('password', staffEdit.value.password.toString().trim());
    }

    if (checkEdit) {
      await instance.put(`${API.PUTAccount}/${IdSelected.value}`, formAccount)
        .then(res => {
          updateAccountWithId(IdSelected.value);
          showToast("Cập nhật thành công");
        })
        .catch(err => {
          console.error(err);
          showToast("Lỗi", true);
        })
    }

  } else {
    if (!checkvalidate(false)) {
      updateLoad(false);
      return;
    }
    formAccount.append('username', staffEdit.value.username);
    formAccount.append('password', staffEdit.value.password);
    formAccount.append('fullname', staffEdit.value.fullname);
    formAccount.append('role', 0);
    formAccount.append('avatar', staffEdit.value.fileImage);
    await instance.post(API.POSTAccount, formAccount)
      .then(res => {
        showToast("Thêm mới thành công");
        loadData();
      })
      .catch(err => {
        console.error(err);
        showToast("Lỗi", true);
      })
  }
  closeEditModal();
  updateLoad(false);
};

const checkvalidate = (isEdit) => {
  if (!CheckRegex.CheckNameRegex(staffEdit.value.fullname)) {
    showToast("Tên đầy đủ không hợp lệ. Vui lòng kiểm tra lại", true);
    return false;
  }
  if (!isEdit) {
    if (!staffEdit.value.fileImage) {
      showToast("Ảnh đại diện bị thiếu", true);
      return false;
    }
    if (!CheckRegex.CheckUserNameRegex(staffEdit.value.username)) {
      showToast("Tên tài khoản không hợp lệ. Vui lòng kiểm tra lại", true);
      return false;
    }

    if (staffEdit.value.password.toString().trim().length == 0) {
      showToast("Mật khẩu bị thiếu", true);
      return false;
    }

    if (staffEdit.value.password != password2.value) {
      showToast("Mật khẩu không trùng khớp", true);
      return false;
    }
  }
  return true;
}

const updateAccountWithId = async (id) => {
  await instance.get(`${API.GETAccount}/${id}`)
    .then(res => {
      const index = staffs.value.findIndex(x => x.id == id);
      staffs.value[index] = res.data.data;
    })
    .catch(err => {
      console.error(err);
      showToast("Lỗi");
    })
}

const showDeleteModal = async (id) => {
  IdSelected.value = id;
  isDeleteModalOpen.value = true;
  await delay(100);
  isShowDeleteModal.value = true;
};

const deleteStaff = async () => {
  updateLoad(true)
  try {
    console.log(`${API.DELAccount}/${IdSelected.value}`)
    await instance.delete(`${API.DELAccount}/${IdSelected.value}`)
      .then(res => {
        showToast("Xoá thành công");
        const index = staffs.value.findIndex(x => x.id == IdSelected.value);
        staffs.value.splice(index, 1);
      })
      .catch(err => {
        showToast("Lỗi", true);
        console.error(err);
      })

  } catch (error) { }
  updateLoad(false);
  closeDeleteModal();
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

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    staffEdit.value.fileImage = file;
    const reader = new FileReader();
    reader.onload = () => {
      staffEdit.value.avatar = reader.result;
    };
    reader.readAsDataURL(file);
  }
};
//search

const filteredStaffs = computed(() => {
  const term = searchTerm.value.toString().toLowerCase().trim();

  switch (selectedFilter.value.toLowerCase()) {
    case "id":
      return staffs.value.filter((person) =>
        person.id.toString().toLowerCase().includes(term)
      );
    case "name":
      return staffs.value.filter(
        (person) =>
          person.fullname.toString().toLowerCase().includes(term)
      );
  }
});

//search

const updateLoad = (check) => {
  ShowLoading.value = check;
}

// modal
</script>
