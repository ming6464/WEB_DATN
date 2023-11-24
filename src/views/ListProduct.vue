<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-center text-3xl font-semibold leading-6 text-gray-900">
          Danh sách sản phẩm
        </h1>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          @click="openModal"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon class="h-5 w-5" aria-hidden="true" />
          Thêm sản phẩm
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  STT
                </th>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4"
                >
                  Ảnh
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Tên sản phẩm
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Kích thước
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Màu sắc
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Giá
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Số lượng
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Hoạt động
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="person in people" :key="person.id">
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.id }}</div>
                </td>
                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="h-20 w-20 flex-shrink-0">
                      <img class="h-20 w-24" :src="person.image" alt="" />
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.name }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.size }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.color }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.price }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.number }}</div>
                </td>
                <td>
                  <div class="mx-4 space-x-3">
                    <button
                      @click="openEditModal(person)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilIcon class="h-5 w-5" aria-hidden="true" />
                      <span class="sr-only">Edit, {{ person.id }}</span>
                    </button>
                    <button
                      @click="deletePerson(person.id)"
                      class="text-red-700 hover:text-indigo-900"
                    >
                      <TrashIcon class="h-5 w-5" aria-hidden="true" />
                      <span class="sr-only">Delete, {{ person.id }}</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- Edit Modal -->
  <div v-if="isEditModalOpen" class="fixed inset-0 overflow-y-auto mt-7">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div class="relative bg-white p-8 rounded-lg w-96">
        <h3 class="text-lg font-semibold mb-4 text-center">
          Chỉnh sửa sản phẩm
        </h3>

        <!-- Form for editing product details -->
        <form @submit.prevent="submitEditForm">
          <div class="mb-4">
            <label
              for="editedName"
              class="block text-sm font-medium text-gray-700"
            >
              Tên sản phẩm
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
              <img
                :src="editedPerson.image"
                alt=""
                class="h-18 w-20 rounded-full object-cover"
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
          <div class="mb-4">
            <label
              for="editedSize"
              class="block text-sm font-medium text-gray-700"
            >
              Kích thước
            </label>
            <input
              v-model="editedPerson.size"
              type="text"
              id="editedSize"
              name="editedSize"
              class="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div class="mb-4">
            <label
              for="editedColor"
              class="block text-sm font-medium text-gray-700"
            >
              Màu sắc
            </label>
            <input
              v-model="editedPerson.color"
              type="text"
              id="editedColor"
              name="editedColor"
              class="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div class="mb-4">
            <label
              for="editedPrice"
              class="block text-sm font-medium text-gray-700"
            >
              Giá
            </label>
            <input
              v-model="editedPerson.price"
              type="text"
              id="editedPrice"
              name="editedPrice"
              class="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div class="mb-4">
            <label
              for="editedNumber"
              class="block text-sm font-medium text-gray-700"
            >
              Số lượng
            </label>
            <input
              v-model="editedPerson.number"
              type="text"
              id="editedNumber"
              name="editedNumber"
              class="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <!-- ... other fields ... -->

          <div class="flex justify-end">
            <button
              type="button"
              class="mr-2 text-gray-500 hover:text-gray-700 mx-3"
              @click="closeEditModal"
            >
              Huỷ bỏ
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
</template>

<script setup>
import { ref } from "vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import { PencilIcon } from "@heroicons/vue/20/solid";
import { TrashIcon } from "@heroicons/vue/20/solid";
const people = ref([
  {
    id: "1",
    name: "Áo khoác",
    size: "L",
    color: "Đen",
    price: "230,000 VNĐ",
    number: "4",
    image:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/450195/sub/goods_450195_sub14.jpg?width=750",
  },
]);
const isModalOpen = ref(false);
const imageInputRef = ref(null);
const isEditModalOpen = ref(false);
const editedPerson = ref({
  id: null,
  name: "",
  size: "",
  color: "",
  price: "",
  number: "",
  image: "",
});

function openEditModal(person) {
  // Clone the person object to avoid modifying the original data
  editedPerson.value = { ...person };
  isEditModalOpen.value = true;
}

function submitEditForm() {
  if (editedPerson.value) {
    // Find the index of the editing person in the array
    const index = people.value.findIndex(
      (person) => person.id === editedPerson.value.id
    );

    if (index !== -1) {
      // Update the person in the array
      people.value[index] = { ...editedPerson.value };
      isEditModalOpen.value = false;
    }
  }
}
function deletePerson(personId) {
  const index = people.value.findIndex((person) => person.id === personId);

  if (index !== -1) {
    people.value.splice(index, 1);
  }
}
function closeEditModal() {
  isEditModalOpen.value = false;
  editedPerson.value = null;
  imageInputRef.value.value = null;
}

function handleImageUpload() {
  const file = imageInputRef.value.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Directly assign the new value to trigger reactivity
      editedPerson.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
</script>
