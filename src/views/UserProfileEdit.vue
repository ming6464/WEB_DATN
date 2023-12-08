<template>
  <div class="max-w-lg mx-auto mt-10">
    <div class="px-4 sm:px-0">
      <h1 class="text-2xl font-semibold leading-7 text-gray-900">
        Thông tin cá nhân
      </h1>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Ảnh đại diện
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <img class="h-24 w-24" :src="user.avatar" alt="" />
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex flex-col">
          <dt class="text-sm font-medium leading-6 text-gray-900">ID</dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ user.id }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Tên tài khoản
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ user.username }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Tên người dùng
          </dt>
          <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {{ user.fullname }}
          </dd>
        </div>
        <div class="mt-8 flex">
          <button type="button" @click="openEditModal"
            class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            Sửa
          </button>
        </div>
      </dl>
    </div>
  </div>

  <!-- Edit Modal -->
  <div v-if="isEditModalOpen" class="fixed inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div class="relative bg-white p-8 rounded-lg w-96 lg:ml-64 mt-10">
        <h3 class="text-lg font-semibold mb-4 text-center">Chỉnh sửa</h3>

        <!-- Form for editing person details -->
        <form @submit.prevent="submitEditForm">
          <div class="mb-4 flex justify-center">
            <label for="image-upload" class="block text-sm font-medium text-gray-700">
              <img alt="" :src="personEdit.avatar" class="h-20 w-24 object-cover" />
            </label>
            <input type="file" id="image-upload" ref="imageInputRef" @change="handleImageUpload" accept="image/*"
              class="hidden" />
          </div>
          <div class="mb-4">
            <label for="editedName" class="block text-base font-medium text-gray-700">
              Tên người dùng
            </label>
            <input type="text" id="editedName" name="editedName" v-model="personEdit.fullname"
              class="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div class="mb-4">
            <button type="button" @click="openEditPasswordModal"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
              Cập nhật mật khẩu
            </button>
          </div>
          <div class="flex justify-end">
            <button type="button" class="mr-2 text-gray-500 hover:text-gray-700 mx-3" @click="closeEditModal">
              Thoát
            </button>
            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>


  <!-- Edit password Modal -->
  <div v-if="isEditPasswordModalOpen" class="fixed inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div class="relative bg-white p-8 rounded-lg w-96 lg:ml-64 mt-10">
        <h3 class="text-lg font-semibold mb-4 text-center">Cập nhật mật khẩu</h3>

        <!-- Form for editing person details -->
        <form @submit.prevent="submitEditPasswordForm">
          <div class="mb-4 mt-2">
            <label for="Password_" class="block text-base font-medium text-gray-700">
              Đổi mật khẩu
            </label>
            <div id="Password_" name='Password_'>
              <div class="mt-2">
                <label for="editedName" class="block text-sm font-medium text-gray-700">
                  Mật khẩu cũ
                </label>
                <input type="text" id="editedName" name="editedName" v-model="personEdit.password0"
                  class="mt-1 p-2 w-full border rounded-md" />
              </div>
              <div class="mb-4">
                <label for="editedName" class="block text-sm font-medium text-gray-700">
                  Mật khẩu mới
                </label>
                <input type="text" id="editedName" name="editedName" v-model="personEdit.password1"
                  class="mt-1 p-2 w-full border rounded-md" />
              </div>
              <div class="mb-4">
                <label for="editedName" class="block text-sm font-medium text-gray-700">
                  Nhập lại mật khẩu
                </label>
                <input type="text" id="editedName" name="editedName" v-model="personEdit.password1"
                  class="mt-1 p-2 w-full border rounded-md" />
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button type="button" class="mr-2 text-gray-500 hover:text-gray-700 mx-3" @click="closeEditPasswordModal">
              Thoát
            </button>
            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
              Lưu
            </button>
          </div>
        </form>
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
</template>

<script setup>
import { FwbSpinner } from 'flowbite-vue'
import { ref, onMounted } from "vue";
import { useToken } from "../store/tokenStore";
import { PencilSquareIcon } from "@heroicons/vue/20/solid";
import { PaperClipIcon } from "@heroicons/vue/20/solid";
import { instance } from "../assets/axios-instance";
import * as API from '../assets/API'
import * as validate from '../assets/validate'
import { showToast } from "../assets/Toastify";
const isEditModalOpen = ref(false);
const isEditPasswordModalOpen = ref(false);
const ShowLoading = ref(false);
const personEdit = ref({
  avatar: '',
  fullname: 'tom cook',
  password1: '',
  password2: '',
  password0: '',
});
const user = ref({
  "id": 1,
  "username": "admin",
  "fullname": "admin",
  "avatar": "http://res.cloudinary.com/dbsfgxrjz/image/upload/v1701961064/admin-image/myeu6h3aquyqhg40d1qi.jpg",
});
const store = useToken();

onMounted(() => {
  if (store.id == -1) {
    store.onSetGoToLogin(true);
    return;
  }
  loadData();
})

const loadData = async () => {
  updateLoading(true);
  await instance.get(`${API.GETAccount}/${store.id}`)
    .then(res => {
      user.value = res.data.data;
    })
    .catch(err => {
      console.error(err);
    })
  updateLoading(false);
}

const updateData = async () => {
  updateLoading(true);
  await instance.get(`${API.GETAccount}/${store.id}`)
    .then(res => {
      user.value = res.data.data;
      store.onSetFullName(res.data.data.fullname);
      store.onSetAvatar(res.data.data.avatar);
    })
    .catch(err => {
      console.error(err);
    })
  updateLoading(false);
}

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    personEdit.value.fileImage = file;
    const reader = new FileReader();
    reader.onload = () => {
      personEdit.value.avatar = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const submitEditForm = async () => {
  updateLoading(true);
  const form = new FormData();
  let check = false;
  if (personEdit.value.fileImage) {
    check = true;
    form.append("avatar", personEdit.value.fileImage);
  }

  if (personEdit.value.fullname != user.value.fullname) {
    if (validate.CheckNameRegex(personEdit.value.fullname)) {
      check = true;
      form.append("fullname", personEdit.value.fullname);
    } else {
      showToast("Tên không đúng định dạng", true);
      updateLoading(false);
      return;
    }

  }

  if (!check) {
    closeEditModal();
    return;
  }

  await instance.put(`${API.PUTAccount}/${user.value.id}`, form)
    .then(res => {
      showToast("Cập nhật thành công", false);
      updateData();
    })
    .catch(err => {
      showToast("Lỗi", true);
      console.error(err);
    })
  closeEditModal();
}

const openEditModal = () => {
  isEditModalOpen.value = true;
  personEdit.value = { ...user.value };
  personEdit.value.fileImage = null;
}

const closeEditModal = () => {
  isEditModalOpen.value = false;
  updateLoading(false);
}


const closeEditPasswordModal = () => {
  isEditPasswordModalOpen.value = false;
  updateLoading(false);
}
const openEditPasswordModal = () => {
  isEditPasswordModalOpen.value = true;
  personEdit.value.password0 = '';
  personEdit.value.password1 = '';
  personEdit.value.password2 = '';
}
const submitEditPasswordForm = async () => {

  if (!personEdit.value.password1 || personEdit.value.password1.toString().length == 0) {
    showToast("Dữ liệu bị thiếu", true);
    return;
  }
  if (personEdit.value.password1 != personEdit.value.password2) {
    showToast("Mật khẩu không giống nhau");
    return;
  }

  updateLoading(true);

  const formLogin = new FormData();
  formLogin.append('password', personEdit.value.password0);
  formLogin.append('username', user.value.username);
  await instance.post(API.SignIn, formLogin)
    .then(res => {
      store.onSetToken(res.data.data.token);
    })
    .catch(err => {
      console.error(err);
      showToast("Mật khẩu cũ không chính xác ", true);
      updateLoading(false);
      return;
    })


  const form = new FormData();
  form.append("password", personEdit.value.password1);
  await instance.put(`${API.PUTAccount}/${user.value.id}`, form)
    .then(res => {
      showToast("Cập nhật thành công", false);
    })
    .catch(err => {
      showToast("Lỗi", true);
      console.error(err);
    })

  closeEditPasswordModal();
}
const updateLoading = (check) => {
  ShowLoading.value = check;
}
</script>
