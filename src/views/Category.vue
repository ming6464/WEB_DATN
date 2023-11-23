<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-center text-3xl font-semibold leading-6 text-gray-900">
          Danh mục
        </h1>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon class="h-5 w-5" aria-hidden="true" />
          Thêm danh mục
        </button>
      </div>
    </div>
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
              <tr v-for="(person, index) in people" :key="person.id">
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
                <td>
                  <div class="mx-4 space-x-3">
                    <button
                      @click="openEditModal(person)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilIcon class="h-5 w-5" aria-hidden="true" />
                      <span class="sr-only">{{ person.id }},</span>
                    </button>
                    <button
                      @click="deletePerson(index)"
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
  </div>
  <!-- Edit Modal -->
  <div v-if="isEditModalOpen" class="fixed inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>

      <div class="relative bg-white p-8 rounded-lg w-96">
        <h3 class="text-lg font-semibold mb-4 text-center">Edit Person</h3>

        <!-- Form for editing person details -->
        <form @submit.prevent="submitEditForm">
          <div class="mb-4">
            <label
              for="editedName"
              class="block text-sm font-medium text-gray-700"
            >
              Name
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
              for="editedImage"
              class="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              v-model="editedPerson.image"
              type="text"
              id="editedImage"
              name="editedImage"
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
              Cancel
            </button>
            <button
              type="submit"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
              Save
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
  id: "",
  name: "",
  image: "",
});

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
}
</script>
