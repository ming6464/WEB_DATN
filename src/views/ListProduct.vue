<template>
  <div>
    <div class="px-4 sm:px-6 lg:px-8" v-if="!isUpdateModalOpen">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-center text-3xl font-semibold leading-6 text-gray-900">
            Danh sách sản phẩm
          </h1>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button type="button" @click="openEditModal"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    STT
                  </th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4">
                    Ảnh
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Tên sản phẩm
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Kích thước
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Màu sắc
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Giá
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Số lượng
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
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
                      <button @click="openEditModal(person)" class="text-indigo-600 hover:text-indigo-900">
                        <PencilSquareIcon class="h-5 w-5" aria-hidden="true" />
                        <span class="sr-only">Edit, {{ person.id }}</span>
                      </button>
                      <button @click="openDeleteModal(person.id)" class="text-red-700 hover:text-indigo-900">
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

    <!-- update product -->

    <form v-if="isUpdateModalOpen" @submit.prevent="submitEditForm">
      <div class="space-y-12">
        <!-- Thông tin cơ bản -->
        <div>
          <h1 class="font-medium text-xl">Thông tin cơ bản</h1>
          <div class="mt-5 mx-2">
            <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="productName" class="block text-sm font-medium leading-6 text-gray-900">Tên sản phẩm</label>
                <div class="mt-1 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input required type="text" name="productName" id="productName" autocomplete="productName"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Áo ...." />
                </div>
              </div>
              <!-- thể loại -->
              <div class="sm:col-span-3">
                <Combobox as="div">
                  <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">Thể loại
                  </ComboboxLabel>
                  <div class="relative mt-1">
                    <ComboboxInput
                      class="w-full rounded-md border-0 bg-white py-1.5 pl-2 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      @change="query = $event.target.value" :display-value="(category) => category?.name" />
                    <ComboboxButton
                      class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                      <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </ComboboxButton>

                    <ComboboxOptions v-if="filteredCategory.length > 0"
                      class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1
                                                                         ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <ComboboxOption v-for="product in filteredCategory" :key="product.id" :value="product" as="template"
                        v-slot="{ active, selected }">
                        <li :class="[
                          'relative cursor-default select-none py-2 pl-2 pr-9',
                          active
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-900',
                        ]">
                          <span :class="[
                            'block truncate',
                            selected && 'font-semibold',
                          ]">
                            {{ product.name }}
                          </span>

                          <span v-if="selected" :class="[
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-indigo-600',
                          ]">
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </li>
                      </ComboboxOption>
                    </ComboboxOptions>
                  </div>
                </Combobox>
              </div>
              <!-- thể loại -->
            </div>
          </div>
        </div>
        <!-- Thông tin cơ bản -->

        <!-- Chi tiết Sản phẩm -->
        <div>
          <h1 class="font-medium text-xl">Chi tiết Sản phẩm</h1>
          <div class="mt-5 mx-2">
            <!-- thêm ảnh -->
            <div class="col-span-full">
              <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Ảnh sản phẩm</label>
              <div
                class="mt-1 flex justify-center flex-col items-center rounded-lg border border-dashed border-gray-900/25 px-32 py-10"
                @dragenter="handleDragEnter" @dragleave="handleDragLeave" @dragover.prevent @drop="handleDrop"
                :class="{ 'border-indigo-600': isDragging }">
                <div class="text-center" :class="{ hidden: selectedImages.length > 0 }">
                  <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div class="mt-4 flex text-sm leading-6 text-gray-600">
                    <label for="file-upload"
                      class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Tải lên một tập tin</span>
                      <input id="file-upload" name="file-upload" type="file" accept="image/*" multiple class="sr-only"
                        @change="handleFileChange" />
                    </label>
                    <p class="pl-2">hoặc kéo và thả</p>
                  </div>
                  <p v-if="selectedImages.length === 0" class="text-xs leading-5 text-gray-600 mt-4">
                    PNG, JPG, GIF lên đến 10MB
                  </p>
                </div>
                <div v-if="selectedImages.length > 0" class="mt-4 flex flex-wrap justify-center">
                  <div v-for="(image, index) in selectedImages.slice(0, 10)" :key="index" class="relative">
                    <div @mouseenter="showDeleteButton(index)" @mouseleave="hideDeleteButton(index)">
                      <div :class="{
                        'border-dashed  border-2 border-sky-500':
                          selectedImages.length > 0,
                        'border-dashed  border-2 border-sky-500 mr-2 mt-2':
                          selectedImages.length > 1,
                      }">
                        <img :src="image" :alt="'Preview ' + (index + 1)" :class="{
                          'h-[170px] w-[170px] object-cover':
                            selectedImages.length <= 3,
                          'h-[100px] w-[100px] mt-4 object-cover':
                            selectedImages.length > 3,
                        }" />
                      </div>
                      <button v-if="deleteButtons[index]" @click="deleteImage(index)"
                        class="absolute top-2 right-2 border-solid border-2 p-1 border-red-500 rounded-full cursor-pointer">
                        <img src="/Delete.svg " class="max-h-[20px]" />
                      </button>
                    </div>
                  </div>
                  <div v-if="selectedImages.length > 10" class="mt-20 font-bold">
                    +{{ selectedImages.length - 10 }} ảnh khác
                  </div>
                </div>
                <button @mousedown.prevent="openFileUploader"
                  class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-300 active:bg-indigo-800">
                  Chọn thêm ảnh
                </button>
              </div>
            </div>
            <!-- thêm ảnh -->

            <!-- Mô tả sản phẩm -->
            <div class="mt-6">
              <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Mô tả sản phẩm sản
                phẩm</label>
              <textarea id="myTextarea" placeholder="Thông tin sản phẩm ..."
                class="w-full mt-1 h-32 p-2 text-base rounded-lg border border-solid border-gray-900/25 focus:outline-none focus:border-indigo-500"></textarea>
            </div>
            <!-- Mô tả sản phẩm -->
          </div>
        </div>
        <!-- Chi tiết Sản phẩm -->

        <!-- thông tin bán hàng -->
        <div>
          <h1 class="font-medium text-xl">Thông tin Bán hàng</h1>
          <div class="mt-5 mx-2">
            <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <!-- Giá bán lẻ -->
              <div class="sm:col-span-full">
                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Giá bán lẻ</label>
                <div class="mt-1">
                  <input required type="number" min="0" name="first-name" id="first-name" autocomplete="given-name"
                    class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <!-- Giá bán lẻ -->
              <!-- thêm số lượng sản phẩm -->
              <div class="sm:col-span-full mt-4">
                <div class="overflow-x-auto mb-4">
                  <table class="min-w-full bg-white border border-gray-300 rounded-md">
                    <thead>
                      <tr>
                        <th class="py-2 px-4 border-b">Kích cỡ</th>
                        <th class="py-2 px-4 border-b">Màu sản phẩm</th>
                        <th class="py-2 px-4 border-b">Số lượng</th>
                        <th class="py-2 px-4 border-b"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in productData" :key="index" class="hover:bg-gray-100 transition">
                        <td class="py-2 px-4 border-b">
                          <div class="relative">
                            <select v-model="item.sizeData.name" @change="
                              ChooseCombobox(
                                false,
                                index,
                                $event.target.value
                              )
                              "
                              class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                              <option v-for="(size, sizeIndex) in sizeOptions" :key="sizeIndex" :value="size.name">
                                {{ size.name }}
                              </option>
                            </select>
                            <div
                              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <ChevronUpDownIcon class="fill-current h-4 w-4 text-gray-400" aria-hidden="true" />
                            </div>
                          </div>
                        </td>
                        <td class="py-2 px-4 border-b">
                          <div class="relative">
                            <select v-model="item.colorData.name" @change="
                              ChooseCombobox(true, index, $event.target.value)
                              "
                              class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                              <option v-for="(color, colorIndex) in colorOptions" :key="colorIndex" :value="color.name">
                                {{ color.name }}
                              </option>
                            </select>
                            <div
                              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <ChevronUpDownIcon class="fill-current h-4 w-4 text-gray-400" aria-hidden="true" />
                            </div>
                          </div>
                        </td>
                        <td class="py-2 px-4 border-b">
                          <input type="number" v-model="item.amount" @input="validateQuantity(index)"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600" />
                        </td>
                        <td v-if="index > 0" class="py-2 px-4 border-b">
                          <button @click="removeItem(index)" type="button"
                            class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs md:text-base">
                            Xoá
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button @click="addItem" type="button"
                  class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                  Thêm thành phần
                </button>
              </div>
              <!-- thêm số lượng sản phẩm -->
            </div>
          </div>
        </div>
        <!-- thông tin bán hàng -->
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" @click="onCloseUpdateProduct"
          class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          Cancel
        </button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
           text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>
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
                        Bạn có chắc chắn muốn xoá sản phẩm này không? Tất cả dữ
                        liệu sẽ bị xóa vĩnh viễn. Hành động này không thể được
                        hoàn tác.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" @click="deleteProduct"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
                  Xoá
                </button>
                <button type="button" @click="closeDeleteProductModal"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                  Huỷ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { PlusIcon } from "@heroicons/vue/20/solid";
import { PencilSquareIcon } from "@heroicons/vue/20/solid";
import { TrashIcon } from "@heroicons/vue/20/solid";
import * as API from "../assets/API";

import { PhotoIcon, UserCircleIcon } from "@heroicons/vue/24/solid";
import { computed, ref, onMounted } from "vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";

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
const imageInputRef = ref(null);
const isUpdateModalOpen = ref(false);
const editedPerson = ref(null);

const isDeleteModalOpen = ref(false);
const isShowDeleteModal = ref(false);
let idDelete = -1;

const openEditModal = async (person) => {
  // Clone the person object to avoid modifying the original data

  if (!person) {
    editedPerson.value = {
      "name": "",
      "mainImage": "",
      "price": 0,
      "description": "",
      "categoryData": null,
    };
  } else {
    await axios.get(`${API.GetProduct_Size_Color}/${person.id}`)
      .then(res => {
        editedPerson.value = res.data.getProductSizeColor;
      })
      .catch(err => {
        editedPerson.value = {
          "name": "",
          "mainImage": "",
          "price": 0,
          "description": "",
          "categoryData": null,
        };
      });

    editedPerson.value = { ...person };
  }

  isUpdateModalOpen.value = true;
}

function submitEditForm() {
  //if (!editedPerson.value) return;
  // Find the index of the editing person in the array
  //  const index = people.value.findIndex(
  //     (person) => person.id === editedPerson.value.id
  //   );

  //   if (index !== -1) {
  //     // Update the person in the array
  //     people.value[index] = { ...editedPerson.value };
  //     isUpdateModalOpen.value = false;
  //   }
  console.log(productData.value);
}

function handleImageUpload() {
  const file = imageInputRef.value.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Directly assign the new value to trigger reactivity
      editedPerson.value.image = e.target.result;
      editedPerson.value.file = file;
    };
    reader.readAsDataURL(file);
  }
}

//delete modal 

const openDeleteModal = async (id) => {
  idDelete = id;
  isDeleteModalOpen.value = true;
  await delay(100);
  isShowDeleteModal.value = true;
};

const deleteProduct = async () => {
  try {
    const index = people.value.findIndex((person) => person.id === idDelete);

    if (index !== -1) {
      people.value.splice(index, 1);
    }
    // await axios.delete(`${API.DELCategories}/${categories.value[idDelete].id}`)
    //   .then(res => {
    //     categories.value.splice(idDelete, 1);
    //   })
    //   .catch(err => console.log(err));

  } catch (error) { }
  closeDeleteProductModal();
}

const closeDeleteProductModal = async () => {
  isShowDeleteModal.value = false;
  await delay(500);
  isDeleteModalOpen.value = false;
}
//delete modal 

//Update product

const categories = ref([
  { id: 1, name: "Áo polo" },
  { id: 2, name: "Áo thun" },
  { id: 3, name: "Áo sơ mi" },
  { id: 4, name: "Áo khoác" },
  { id: 5, name: "Áo vest" },
  { id: 6, name: "Áo len" },
  { id: 7, name: "Áo hoodie" },
]);

const query = ref("");
const filteredCategory = computed(() =>
  query.value === ""
    ? categories.value
    : categories.value.filter((category) => {
      return category.name.toLowerCase().includes(query.value.toLowerCase());
    })
);

// thông tin bán hàng

const itemProductData = {
  "id": -1,
  "amount": 0,
  "price": 0,
  "colorData": {
    "id": -1,
    "name": ""
  },
  "sizeData": {
    "id": -1,
    "name": ""
  }
}
const productData = ref([JSON.parse(JSON.stringify(itemProductData))]);
const sizeOptions = ref([
  { id: 1, name: "XS" },
  { id: 2, name: "S" },
  { id: 3, name: "M" },
]);
const colorOptions = ref(
  [
    { id: 1, name: "Red" },
    { id: 2, name: "Blue" },
    { id: 3, name: "Green" },
  ]
);

const validateQuantity = (index) => {
  if (productData.value[index].amount < 0) {
    productData.value[index].amount = 0;
  }
};

const removeItem = (index) => {
  productData.value.splice(index, 1);
};

const addItem = () => {
  console.log(itemProductData);
  productData.value.push(JSON.parse(JSON.stringify(itemProductData)));
};

const ChooseCombobox = (isColor, index, value) => {

  if (
    (productData.value[index].sizeData.name.length == 0 && isColor) ||
    (productData.value[index].colorData.name.length == 0 && !isColor)
  )
    return;

  const c = isColor ? value : productData.value[index].colorData.name;
  const s = isColor ? productData.value[index].sizeData.name : value;

  for (let i = 0; i < productData.value.length; i++) {

    if (i == index) continue;

    let itemF = productData.value[i];

    if (itemF.sizeData.name == s && itemF.colorData.name == c) {
      console.log(" Lỗi ");
      if (isColor) {
        productData.value[index].colorData.id = -1;
        productData.value[index].colorData.name = "";
      } else {
        productData.value[index].sizeData.id = -1;
        productData.value[index].sizeData.name = "";
      }
      return;
    }
  }
};

//thông tin bán hàng

//photo
const selectedImages = ref([]);
const isDragging = ref(false);
const deleteButtons = ref([]);

const handleFileChange = (event) => {
  const files = event.target.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        previewImage(file);
      } else {
        alert("Please select a valid image file.");
      }
    }
  }
};

const previewImage = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    selectedImages.value = [...selectedImages.value, reader.result];
    deleteButtons.value.push(false);
  };
  reader.readAsDataURL(file);
};

const handleDragEnter = () => {
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;
  const files = event.dataTransfer.files;
  if (files) {
    handleFileChange({ target: { files } });
  }
};

const openFileUploader = () => {
  document.getElementById("file-upload").click();
};

const showDeleteButton = (index) => {
  deleteButtons.value[index] = true;
};

const hideDeleteButton = (index) => {
  deleteButtons.value[index] = false;
};

const deleteImage = (index) => {
  selectedImages.value.splice(index, 1);
  deleteButtons.value.splice(index, 1);
  console.log(
    "index remvoe: ",
    index,
    "selectedImages : ",
    selectedImages.length
  );
};

const onCloseUpdateProduct = () => {
  isUpdateModalOpen.value = false;
};

//Update Product

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

onMounted(() => {
  updateCategories();
  updateSizes();
  updateColors();
});

const updateCategories = async () => {
  await axios.get(API.GetCategories).then(res => {
    categories.value = res.data.data;
  }).catch(err => console.log(err));
}

const updateSizes = async () => {
  await axios.get(API.GetSizes)
    .then(res => {
      sizeOptions.value = res.data.data;
    })
    .catch(err => console.log(err));
}
const updateColors = async () => {
  await axios.get(API.GetColors)
    .then(res => {
      colorOptions.value = res.data.data;
    })
    .catch(err => console.log(err));
}
</script>
