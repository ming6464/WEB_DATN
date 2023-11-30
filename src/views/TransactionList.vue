<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center mt-4">
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
          Thêm đơn hàng
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
                  Tên khách hàng
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
                <label
                  for="newProductName"
                  class="block text-sm font-medium text-gray-700"
                >
                  Ngày đặt
                </label>
                <input
                  v-model="newProduct.datetime"
                  type="text"
                  id="newProductName"
                  name="newProductName"
                  class="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div class="mb-4">
                <label
                  for="newProductName"
                  class="block text-sm font-medium text-gray-700"
                >
                  Địa chỉ
                </label>
                <input
                  v-model="newProduct.address"
                  type="text"
                  id="newProductName"
                  name="newProductName"
                  class="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div class="mb-4">
                <label
                  for="newProductName"
                  class="block text-sm font-medium text-gray-700"
                >
                  Số lượng
                </label>
                <input
                  v-model="newProduct.number"
                  type="text"
                  id="newProductName"
                  name="newProductName"
                  class="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div class="mb-4">
                <label
                  for="newProductName"
                  class="block text-sm font-medium text-gray-700"
                >
                  Trạng thái
                </label>
                <input
                  v-model="newProduct.number"
                  type="text"
                  id="newProductName"
                  name="newProductName"
                  class="mt-1 p-2 w-full border rounded-md"
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
  <div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-7 lg:-mx-4">
      <div class="inline-block min-w-full py-2 align-middle">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Mã đơn
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Tên Khách hàng
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Ngày đặt
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Địa chỉ
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Tổng số lượng
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Trạng thái
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
              <td
                class="whitespace-nowrap px-3 py-5 text-sm text-gray-900 sm:pl-2"
              >
                <div class="text-gray-900">{{ person.id }}</div>
              </td>
              <td
                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0"
              >
                {{ person.name }}
              </td>
              <td
                class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"
              >
                {{ person.datetime }}
              </td>
              <td
                class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"
              >
                {{ person.address }}
              </td>
              <td
                class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"
              >
                {{ person.number }}
              </td>
              <td
                class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-0"
              >
                {{ person.status }}
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
  <!-- Edit Modal -->
  <div v-if="isEditModalOpen" class="fixed inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div class="relative bg-white p-8 rounded-lg w-96">
        <h3 class="text-lg font-semibold mb-4 text-center">
          Chỉnh sửa đơn hàng
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
              for="editedEmail"
              class="block text-sm font-medium text-gray-700"
            >
              Ngày đặt
            </label>
            <input
              v-model="editedPerson.datetime"
              type="text"
              id="editedEmail"
              name="editedEmail"
              class="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div class="mb-4">
            <label
              for="editedEmail"
              class="block text-sm font-medium text-gray-700"
            >
              Địa chỉ
            </label>
            <input
              v-model="editedPerson.address"
              type="text"
              id="editedEmail"
              name="editedEmail"
              class="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div class="mb-4">
            <label
              for="editedEmail"
              class="block text-sm font-medium text-gray-700"
            >
              Số lượng
            </label>
            <input
              v-model="editedPerson.number"
              type="text"
              id="editedEmail"
              name="editedEmail"
              class="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div class="mb-4">
            <label
              for="editedEmail"
              class="block text-sm font-medium text-gray-700"
            >
              Trạng thái
            </label>
            <input
              v-model="editedPerson.status"
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
        <div class="flex flex-row">
          <ExclamationTriangleIcon
            class="h-7 w-7 text-red-500 mx-2"
            aria-hidden="true"
          />
          <h3 class="text-lg font-semibold mb-2">Xác nhận xóa</h3>
        </div>

        <p class="mb-6 text-gray-500 text-center">
          Bạn có chắc chắn muốn xóa khách hàng này?
        </p>

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
import { PlusIcon } from "@heroicons/vue/20/solid";
import {
  PencilSquareIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/20/solid";
import { TrashIcon } from "@heroicons/vue/20/solid";
const people = [
  {
    id: "1",
    name: "Lindsay",
    datetime: "12:35:35 19/04/2023",
    address: "Nam Từ Liêm - Hà Nội",
    number: "12",
    status: "đã xác nhận",
  },
];
const isEditModalOpen = ref(false);
const editedPerson = ref({
  id: null,
  name: "",
  datetime: "",
  address: "",
  number: "",
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
}

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
  datetime: "",
  address: "",
  number: "",
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
    datetime: "",
    address: "",
    number: "",
  };

  closeAddModal();
};
</script>
