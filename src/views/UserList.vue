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
                <th scope="col" class="py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  STT
                </th>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4">
                  Ảnh
                </th>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Họ và Tên
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Số điện thoại
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
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
                      <img class="h-18 w-20 rounded-full" :src="person.image" alt="" />
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.name }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  {{ person.phone }}
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.email }}</div>
                </td>
                <td>
                  <div class="mx-4 space-x-3">
                    <button @click="openEditModal(person)" class="text-indigo-600 hover:text-indigo-900">
                      <PencilIcon class="h-5 w-5" aria-hidden="true" />
                      <span class="sr-only">Edit, {{ person.id }}</span>
                    </button>
                    <button @click="deletePerson(person.id)" class="text-red-700 hover:text-indigo-900">
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
        <h3 class="text-lg font-semibold mb-4 text-center">Edit Person</h3>

        <!-- Form for editing person details -->
        <form @submit.prevent="submitEditForm">
          <div class="mb-4">
            <label for="editedName" class="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input v-model="editedPerson.name" type="text" id="editedName" name="editedName"
              class="mt-1 p-2 w-full border rounded-md" />
          </div>

          <div class="mb-4">
            <label for="editedImage" class="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input v-model="editedPerson.image" type="text" id="editedImage" name="editedImage"
              class="mt-1 p-2 w-full border rounded-md" />
          </div>

          <div class="mb-4">
            <label for="editedPhone" class="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input v-model="editedPerson.phone" type="text" id="editedPhone" name="editedPhone"
              class="mt-1 p-2 w-full border rounded-md" />
          </div>

          <div class="mb-4">
            <label for="editedEmail" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input v-model="editedPerson.email" type="text" id="editedEmail" name="editedEmail"
              class="mt-1 p-2 w-full border rounded-md" />
          </div>

          <div class="flex justify-end">
            <button type="button" class="mr-2 text-gray-500 hover:text-gray-700 mx-3" @click="closeEditModal">
              Cancel
            </button>
            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
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
    name: "Linh",
    phone: "045643953",
    email: "linnn@gmail.com",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]);
const isEditModalOpen = ref(false);
const selectedIndex = ref(null);
const editedPerson = ref({
  id: "",
  name: "",
  image: "",
  phone: "",
  email: "",
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
</script>
