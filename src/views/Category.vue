<template>
  <div>
    <div class="sm:flex sm:items-center mt-7">
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
        <button
          @click="openAddModal"
          type="button"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon class="h-5 w-5" aria-hidden="true" />
          Thêm danh mục
        </button>
      </div>
      <!-- Add Modal -->
      <div v-if="isAddModalOpen" class="fixed inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

          <div class="relative bg-white p-8 rounded-lg w-96">
            <h3 class="text-lg font-semibold mb-4 text-center">
              Thêm Danh Mục
            </h3>

            <!-- Form for adding a new product -->
            <form @submit.prevent="addNewProduct">
              <div class="mb-4">
                <label
                  for="newProductName"
                  class="block text-sm font-medium text-gray-700"
                >
                  Tên sản phẩm
                </label>
                <input
                  v-model="newProduct.name"
                  type="text"
                  id="newProductName"
                  name="newProductName"
                  class="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div class="mb-4">
                Ảnh Sản Phẩm
                <label
                  for="image-upload"
                  class="block text-sm font-medium text-gray-700"
                >
                  <img
                    :src="newProduct.image"
                    alt=""
                    class="h-20 w-24 object-cover"
                  />
                </label>
                <input
                  type="file"
                  id="image-upload"
                  ref="imageInputRef"
                  style="display: none"
                  @change="handleImageUploadADD"
                  accept="image/*"
                />
              </div>

              <!-- ... other fields ... -->

              <div class="flex justify-end">
                <button
                  type="button"
                  class="mr-2 text-gray-500 hover:text-gray-700 mx-6"
                  @click="closeAddModal"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ... (existing code) ... -->
  <div class="mt-4 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-4 lg:-mx-6">
      <div class="inline-block min-w-full py-2 align-middle sm:px-4 lg:px-6">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                STT
              </th>
              <th
                scope="col"
                class="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4"
              >
                Ảnh
              </th>
              <th
                scope="col"
                class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Tên Sản Phẩm
              </th>
              <th
                scope="col"
                class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Hoạt động
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(person, index) in filteredPeople" :key="person.id">
              <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                <div class="font-medium text-gray-900">{{ person.id }}</div>
              </td>
              <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                <div class="flex items-center">
                  <div class="h-20 w-20 flex-shrink-0">
                    <img class="h-20 w-24" :src="person.image" alt="" />
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                <div class="font-medium text-gray-900">{{ person.name }}</div>
              </td>
              <td>
                <div class="mx-4 space-x-3">
                  <button
                    @click="openEditModal(person)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    <PencilSquareIcon class="h-5 w-5" aria-hidden="true" />
                    <span class="sr-only">{{ person.id }},</span>
                  </button>
                  <button
                    @click="openDeleteModal(index)"
                    class="text-red-700 hover:text-indigo-900"
                  >
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

      <div class="relative bg-white p-8 rounded-lg w-96">
        <h3 class="text-lg font-semibold mb-4 text-center">Chỉnh sửa</h3>

        <!-- Form for editing person details -->
        <form @submit.prevent="submitEditForm">
          <div class="mb-4">
            <label
              for="editedName"
              class="block text-sm font-medium text-gray-700"
            >
              Tên Sản Phẩm
            </label>
            <input
              v-model="editedPerson.name"
              type="text"
              id="editedName"
              name="editedName"
              class="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div class="mb-4">
            <label
              for="image-upload"
              class="block text-sm font-medium text-gray-700"
            >
              Ảnh Sản Phẩm
              <img
                :src="editedPerson.image"
                alt=""
                class="h-20 w-24 object-cover"
              />
            </label>
            <input
              type="file"
              id="image-upload"
              ref="imageInputRef"
              @change="handleImageUpload"
              accept="image/*"
              class="hidden"
            />
          </div>
          <!-- ... other fields ... -->

          <div class="flex justify-end">
            <button
              type="button"
              class="mr-2 text-gray-500 hover:text-gray-700 mx-3"
              @click="closeEditModal"
            >
              Thoát
            </button>
            <button
              type="submit"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Delete Confirmation Modal -->
  <div v-if="isDeleteModalOpen" class="fixed inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div class="relative bg-white p-8 rounded-lg w-96">
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <svg
              class="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3
              class="text-base font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              Xác nhận xóa
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Bạn có chắc chắn muốn xoá danh mục này không?
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            @click="closeDeleteModal"
          >
            Hủy
          </button>
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            @click="confirmDelete"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PlusIcon, ExclamationTriangleIcon } from "@heroicons/vue/20/solid";
import { PencilSquareIcon } from "@heroicons/vue/20/solid";
import { TrashIcon } from "@heroicons/vue/20/solid";
import { watch } from "vue";
import { computed } from "vue";
const people = ref([
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

const imageInputRef = ref(null);
function deletePerson(index) {
  console.log("Deleting person at index:", index);
  people.value.splice(index, 1);
  console.log("People after deletion:", people.value);
}

function openEditModal(person) {
  editedPerson.value = { ...person };
  selectedIndex.value = people.value.indexOf(person);
  isEditModalOpen.value = true;
}

function submitEditForm() {
  if (editedPerson.value) {
    // Update the person in the array
    people.value.splice(selectedIndex.value, 1, { ...editedPerson.value });
    isEditModalOpen.value = false;
  }
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

// Search
const selectedFilter = ref("id"); // Giá trị mặc định của bộ lọc
const searchTerm = ref("");

watch(
  [selectedFilter, people],
  ([newFilter, newPeople], [oldFilter, oldPeople]) => {
    console.log("Bộ lọc được chọn:", newFilter);
  }
);

const filteredPeople = computed(() => {
  const term = searchTerm.value.toString().toLowerCase().trim();

  switch (selectedFilter.value.toLowerCase()) {
    case "id":
      return people.value.filter((person) =>
        person.id.toString().toLowerCase().includes(term)
      );
    case "name":
      return people.value.filter((person) =>
        person.name.toString().toLowerCase().includes(term)
      );
    default:
      return people.value;
  }
});

//search
//delete
const isDeleteModalOpen = ref(false);
let deleteIndex = null;

function openDeleteModal(index) {
  deleteIndex = index;
  isDeleteModalOpen.value = true;
}

function closeDeleteModal() {
  deleteIndex = null;
  isDeleteModalOpen.value = false;
}

function confirmDelete() {
  if (deleteIndex !== null) {
    deletePerson(deleteIndex);
    closeDeleteModal();
  }
}
//delete
//ADD
const isAddModalOpen = ref(false);
const newProduct = ref({
  id: null,
  name: "",
  image: "",
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
    image: "",
  };

  closeAddModal();
};
const handleImageUploadADD = (event) => {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newProduct.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>
