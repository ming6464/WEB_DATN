<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-center text-3xl font-semibold leading-6 text-gray-900">
          Danh sách khách hàng
        </h1>
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
                  class="py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
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
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Họ và Tên
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Hoạt động
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(person, index) in people" :key="person.id">
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                  <div class="text-gray-900">{{ person.id }}</div>
                </td>
                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="h-20 w-20 flex-shrink-0">
                      <img
                        class="h-18 w-18 rounded-full"
                        :src="person.image"
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                  <div class="text-gray-900">{{ person.name }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                  <div class="text-gray-900">{{ person.email }}</div>
                </td>
                <td>
                  <div class="mx-4 space-x-3">
                    <button
                      @click="openEditModal(person)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilSquareIcon class="h-5 w-5" aria-hidden="true" />
                      <span class="sr-only">Edit, {{ person.id }}</span>
                    </button>
                    <button
                      @click="openDeleteModal(index)"
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
  <div v-if="isEditModalOpen" class="fixed inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div class="relative bg-white p-8 rounded-lg w-96">
        <h3 class="text-lg font-semibold mb-4 text-center">
          Chỉnh sửa khách hàng
        </h3>

        <!-- Form for editing person details -->
        <form @submit.prevent="submitEditForm">
          <div class="mb-4">
            <label
              for="editedName"
              class="block text-sm font-medium text-gray-700"
            >
              Tên Khách Hàng
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
              Hình ảnh
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
              for="editedEmail"
              class="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              v-model="editedPerson.email"
              type="text"
              id="editedEmail"
              name="editedEmail"
              class="mt-1 p-2 w-full border rounded-md"
            />
          </div>

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
                Bạn có chắc chắn muốn xoá khách hàng này không?
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
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
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import {
  PencilSquareIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/20/solid";
import { TrashIcon } from "@heroicons/vue/20/solid";
const people = ref([
  {
    id: "1",
    name: "Linh",
    email: "linnn@gmail.com",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]);
const isEditModalOpen = ref(false);
const editedPerson = ref({
  id: null,
  name: "",
  image: "",
  email: "",
});
const imageInputRef = ref(null);

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
  editedPerson.value = {
    id: null,
    name: "",
    image: "",
    email: "",
  };
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
// Delete functionality
const isDeleteModalOpen = ref(false);
let deletePersonIndex = null;

function openDeleteModal(index) {
  deletePersonIndex = index;
  isDeleteModalOpen.value = true;
}

function closeDeleteModal() {
  isDeleteModalOpen.value = false;
  deletePersonIndex = null;
}

function confirmDelete() {
  if (deletePersonIndex !== null) {
    people.value.splice(deletePersonIndex, 1);
    closeDeleteModal();
  }
}
</script>
