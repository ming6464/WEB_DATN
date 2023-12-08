
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
            <button type="button" @click="openAddModal(false)" v-if='store.role == 1'
              class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <PlusIcon class="h-5 w-5" aria-hidden="true" />
              Thêm danh mục
            </button>
            <div v-else class="opacity-0 px-3 py-2"></div>
          </div>

        </div>
      </div>
    </div>

    <div v-if="isAddModalOpen" class="fixed inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

        <div class="relative bg-white p-8 rounded-lg w-96 lg:ml-64 mt-10">
          <h3 class="text-lg font-semibold mb-4 text-center">
            Thêm danh mục
          </h3>

          <!-- Form for adding a new product -->
          <form @submit.prevent="addNewProduct">
            <div class="mb-4">
              <label for="newProductName" class="block text-sm font-medium text-gray-700">
                Tên sản phẩm
              </label>
              <input v-model="newProduct.name" type="text" id="newProductName" name="newProductName"
                class="mt-1 p-2 w-full border rounded-md" />
            </div>
            <div class="mb-4">
              Ảnh Sản Phẩm
              <label for="image-upload" class="block text-sm font-medium text-gray-700">
                <img :src="newProduct.image" alt="" class="h-20 w-24 object-cover" />
              </label>
              <input type="file" id="image-upload" ref="imageInputRef" style="display: none"
                @change="handleImageUploadADD" accept="image/*" />
            </div>

            <!-- ... other fields ... -->

            <div class="flex justify-end">
              <button type="button" class="mr-2 text-gray-500 hover:text-gray-700 mx-6" @click="closeAddModal">
                Hủy
              </button>
              <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-4 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-4 lg:-mx-6">
      <div class="inline-block min-w-full py-2 align-middle sm:px-4 lg:px-6">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                STT
              </th>
              <th scope="col" class="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4">
                Ảnh
              </th>
              <th scope="col" class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Tên Sản Phẩm
              </th>
              <th scope="col" class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                v-if='store.role == 1'>
                Hoạt động
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(person, index) in filteredStaffs" :key="person.id">
              <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                <div class="font-medium text-gray-900">{{ person.id }}</div>
              </td>
              <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                <div class="flex items-center">
                  <div class="h-20 w-20 flex-shrink-0">
                    <img class="h-20 w-24" :src="person.image" alt="" />
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                <div class="font-medium text-gray-900">{{ person.name }}</div>
              </td>
              <td v-if='store.role == 1'>
                <div class="mx-4 space-x-3">
                  <button @click="openEditModal(person)" class="text-indigo-600 hover:text-indigo-900">
                    <PencilSquareIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">{{ person.id }},</span>
                  </button>
                  <button @click="openDeleteModal(index)" class="text-red-700 hover:text-indigo-900">
                    <TrashIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">, {{ person.id }}</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
          <div class="mb-4">
            <label for="editedName" class="block text-sm font-medium text-gray-700">
              Tên Sản Phẩm
            </label>
            <input v-model="editedPerson.name" type="text" id="editedName" name="editedName"
              class="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div class="mb-4">
            <label for="image-upload" class="block text-sm font-medium text-gray-700">
              Ảnh Sản Phẩm
              <img :src="editedPerson.image" alt="" class="h-20 w-24 object-cover" />
            </label>
            <input type="file" id="image-upload" ref="imageInputRef" @change="handleImageUpload" accept="image/*"
              class="hidden" />
          </div>
          <!-- ... other fields ... -->

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

  <!-- delete modal -->
  <div v-show="isDeleteModalOpen">
    <div :class="{ 'opacity-100': isShowDeleteModal }"
      class="transition-opacity ease-in-out duration-500 opacity-0 relative z-10" aria-labelledby="modal-title"
      role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 w-screen">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          @click="closeDeleteCategoryModal">
          <div
            class="relative lg:ml-64 mt-10 transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                      Bạn có chắc chắn muốn xoá danh mục này không? Tất cả dữ
                      liệu sẽ bị xóa vĩnh viễn. Hành động này không thể được
                      hoàn tác.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" @click="deleteCategory"
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
import { useToken } from '../store/tokenStore';
import { FwbSpinner } from 'flowbite-vue'
import { ref, onMounted, computed } from "vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import { PencilSquareIcon } from "@heroicons/vue/20/solid";
import { TrashIcon } from "@heroicons/vue/20/solid";
import { instance } from '../assets/axios-instance';
import * as API from "../assets/API";
import { showToast } from '../assets/Toastify'
const ShowLoading = ref(false);
const categories = ref([
  {
    id: "1",
    name: "Áo len",
    image:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/460950/sub/goods_460950_sub14.jpg?width=750",
  },
  {
    id: "2",
    name: "Áo thun",
    image:
      "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/Ao_thun_oversize_basic_84RISINGshawdo4.jpg",
  },
  {
    id: "3",
    name: "Áo sơ mi",
    image:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462384/sub/goods_462384_sub14.jpg?width=750",
  },
  {
    id: "4",
    name: "Áo nỉ",
    image:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/460322/item/goods_31_460322.jpg?width=750",
  },
  {
    id: "5",
    name: "Áo Polo",
    image:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433041/item/goods_69_433041.jpg?width=750",
  },
  {
    id: "6",
    name: "Áo khoác",
    image:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/450195/sub/goods_450195_sub14.jpg?width=750",
  },
]);
const isEditModalOpen = ref(false);
const selectedIndex = ref(null);
const editedPerson = ref({
  id: null,
  name: "",
  image: "",
});
const isDeleteModalOpen = ref(false);
const isShowDeleteModal = ref(false);
const selectedFilter = ref("id"); // Giá trị mặc định của bộ lọc
const searchTerm = ref("");
let indexDelete = -1;
const store = useToken();
onMounted(() => {
  if (store.id == -1) {
    store.onSetGoToLogin(true);
    return;
  }
  if (store.role == 1) {
    store.onSetCurrentPage({ index: 2, child: 0 });
  } else {
    store.onSetCurrentPage({ index: 0, child: 0 });
  }


  updateCategories();
});

const updateCategories = async () => {
  updateLoading(true);
  await instance.get(API.GETCategories)
    .then(res => {
      categories.value = res.data.data;
    })
    .catch(err => {
      showToast("Lỗi", true);
      console.error(err);

    });
  updateLoading(false);
}

const imageInputRef = ref(null);
//delete modal 

const openDeleteModal = async (index) => {
  indexDelete = index;
  isDeleteModalOpen.value = true;
  await delay(100);
  isShowDeleteModal.value = true;
};

const deleteCategory = async () => {
  updateLoading(true);
  try {
    await instance.delete(`${API.DELCategories}/${categories.value[indexDelete].id}`)
      .then(res => {
        categories.value.splice(indexDelete, 1);
        showToast("Xoá thành công", false);
      })
      .catch(err => {
        showToast("Xoá thành công", false);
      });
    closeDeleteCategoryModal();
  } catch (error) { }
  updateLoading(false);
}

const closeDeleteCategoryModal = async () => {
  isShowDeleteModal.value = false;
  await delay(500);
  isDeleteModalOpen.value = false;
}
//delete modal 

function openEditModal(person) {
  editedPerson.value = { ...person };
  selectedIndex.value = categories.value.indexOf(person);
  isEditModalOpen.value = true;
}

const submitEditForm = async () => {
  if (!editedPerson.value) return;
  updateLoading(true);
  const formData = new FormData();
  formData.append('image', editedPerson.value.file);
  formData.append('name', editedPerson.value.name);
  isEditModalOpen.value = false;
  // Update the person in the array
  await instance.put(`${API.PUTCategories}/${editedPerson.value.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(res => {
      console.log(res);
      categories.value.splice(selectedIndex.value, 1, res.data.data);
      showToast("Cập nhật thành công", false);
    })
    .catch(err => {
      showToast("Lỗi", true);
      console.error(err);

    });

  updateLoading(false);
}


function closeEditModal() {
  isEditModalOpen.value = false;
  imageInputRef.value.value = null;
}
function handleImageUpload() {
  try {
    const fileInput = imageInputRef.value;

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target.result) {
          editedPerson.value.image = e.target.result;
          editedPerson.value.file = file;
        } else {
          console.error("Image loading failed.", file);
        }
      };
      reader.readAsDataURL(file);
    }
  } catch (error) {
    console.error("Error handling image upload:", error);
  }
}
//ADD
const isAddModalOpen = ref(false);
const newProduct = ref();
const openAddModal = () => {
  newProduct.value = {
    id: null,
    name: "",
    image: "",
  };
  isAddModalOpen.value = true;
};

const closeAddModal = () => {
  isAddModalOpen.value = false;
};

const addNewProduct = async () => {
  if (!newProduct.value.file || !newProduct.value.name || newProduct.value.name.toString().length == 0) {
    showToast("Thông tin thiếu", true);
    return;
  }
  updateLoading(true);
  const formData = new FormData();
  formData.append('name', newProduct.value.name);
  formData.append('image', newProduct.value.file);
  await instance.post(API.POSTAddCategories, formData)
    .then((res) => {
      updateCategories();
      showToast("Thêm mới thành công", false);
      closeAddModal();
    })
    .catch(err => {
      showToast("Lỗi", true);
      console.error(err);
    });
  updateLoading(true);

};
const handleImageUploadADD = (event) => {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newProduct.value.image = e.target.result;
      newProduct.value.file = file;
    };
    reader.readAsDataURL(file);
  }
};

// search {

const filteredStaffs = computed(() => {
  const term = searchTerm.value.toString().toLowerCase().trim();

  switch (selectedFilter.value.toLowerCase()) {
    case "id":
      return categories.value.filter((person) =>
        person.id.toString().toLowerCase().includes(term)
      );
    case "name":
      return categories.value.filter(
        (person) =>
          person.name.toString().toLowerCase().includes(term)
      );
  }
});

// } search


//loading {

const updateLoading = (check) => {
  ShowLoading.value = check;
}

// } Loading
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

</script>
i
