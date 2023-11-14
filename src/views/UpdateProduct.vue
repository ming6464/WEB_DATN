<template>
    <form>
        <div class="space-y-12">

            <!-- Thông tin cơ bản -->
            <div>
                <h1 class="font-medium text-xl">Thông tin cơ bản</h1>
                <div class="mt-5 mx-2">
                    <div class="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="productName" class="block text-sm font-medium leading-6 text-gray-900">Tên sản
                                phẩm</label>
                            <div class=" mt-1 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                                <input required type="text" name="productName" id="productName" autocomplete="productName"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    placeholder="Áo ...." />
                            </div>
                        </div>

                        <!-- thể loại -->
                        <div class="sm:col-span-3">
                            <Combobox as="div" v-model="categoryProduct">
                                <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">Thể loại
                                </ComboboxLabel>
                                <div class="relative mt-1">
                                    <ComboboxInput
                                        class="w-full  rounded-md border-0 bg-white py-1.5 pl-2 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        @change="query = $event.target.value" :display-value="(product) => product?.name" />
                                    <ComboboxButton
                                        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </ComboboxButton>

                                    <ComboboxOptions v-if="filteredProduct.length > 0"
                                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        <ComboboxOption v-for="product in filteredProduct" :key="product.id"
                                            :value="product" as="template" v-slot="{ active, selected }">
                                            <li
                                                :class="['relative cursor-default select-none py-2 pl-2 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
                                                <span :class="['block truncate', selected && 'font-semibold']">
                                                    {{ product.name }}
                                                </span>

                                                <span v-if="selected"
                                                    :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
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
                        <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Ảnh sản
                            phẩm</label>
                        <div class="mt-1 flex justify-center flex-col items-center rounded-lg border border-dashed border-gray-900/25 px-32 py-10"
                            @dragenter="handleDragEnter" @dragleave="handleDragLeave" @dragover.prevent @drop="handleDrop"
                            :class="{ 'border-indigo-600': isDragging }">
                            <div class="text-center" :class="{ 'hidden': selectedImages.length > 0 }">
                                <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label for="file-upload"
                                        class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Tải lên một tập tin</span>
                                        <input id="file-upload" name="file-upload" type="file" accept="image/*" multiple
                                            class="sr-only" @change="handleFileChange" />
                                    </label>
                                    <p class="pl-2">hoặc kéo và thả</p>
                                </div>
                                <p v-if="selectedImages.length === 0" class="text-xs leading-5 text-gray-600 mt-4">
                                    PNG,
                                    JPG,
                                    GIF lên đến 10MB</p>
                            </div>
                            <div v-if="selectedImages.length > 0" class="mt-4 flex flex-wrap justify-center">
                                <div v-for="(image, index) in selectedImages.slice(0, 10)" :key="index" class="relative">
                                    <div @mouseenter="showDeleteButton(index)" @mouseleave="hideDeleteButton(index)">
                                        <div
                                            :class="{ 'border-dashed  border-2 border-sky-500': selectedImages.length > 0, 'border-dashed  border-2 border-sky-500 mr-2 mt-2': selectedImages.length > 1 }">
                                            <img :src="image" :alt="'Preview ' + (index + 1)"
                                                :class="{ 'h-[170px] w-[170px] object-cover': selectedImages.length <= 3, 'h-[100px] w-[100px] mt-4 object-cover': selectedImages.length > 3 }" />
                                        </div>
                                        <button v-if="deleteButtons[index]" @click="deleteImage(index)"
                                            class="absolute top-2 right-2  border-solid border-2 p-1 border-red-500 rounded-full cursor-pointer">
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
                        <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Mô tả sản phẩm
                            sản phẩm</label>
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
                            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Giá bán
                                lẻ</label>
                            <div class="mt-1">
                                <input required type="number" min='0' name="first-name" id="first-name"
                                    autocomplete="given-name"
                                    class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <!-- Giá bán lẻ -->

                        <!-- thêm kích cỡ -->
                        <div class="sm:col-span-full">
                            <div v-if="!isShowSizeList">
                                <button @click="changeShowSizeList" type="button"
                                    class="px-2 py-2 font-semibold text-green-700 rounded-md hover:bg-gray-200">
                                    +Thêm kích cỡ mới
                                </button>
                            </div>
                            <div class="mt-2" v-else>
                                <h2 class="font-medium text-sm text-gray-900 leading-6">Kích cỡ</h2>
                                <div class="mt-1">
                                    <div class="flex items-center justify-center">
                                        <input v-model="inputTextSize" type="text" name="inputTextSize" id="inputTextSize"
                                            placeholder="Kích cỡ mới"
                                            class="flex-grow px-2 py-1.5 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                                        <button @click="addSize" type="button"
                                            class="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Thêm
                                        </button>
                                        <button @click="changeShowSizeList" type="button"
                                            class="ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Huỷ
                                        </button>
                                    </div>

                                    <div class="flex flex-wrap gap-2 justify-center">
                                        <div v-for="(text, index) in sizeList" :key="index" class="p-1">
                                            <div class="flex items-center h-10 border-2 border-red-600 rounded-md">
                                                <span class="flex-grow h-full flex items-center px-2">
                                                    {{ text }}
                                                </span>
                                                <button @click="deleteSize(index)" type="button"
                                                    class="h-full  text-white rounded-r-md hover:bg-red-700">
                                                    <img src="/Delete.svg " class="max-h-[20px]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- thêm kích cỡ -->

                        <!-- thêm màu sắc -->
                        <div class="sm:col-span-full">

                            <div v-if="!isShowColorList" class="mb-2">
                                <button @click="changeShowColorList" type="button"
                                    class="px-2 py-2 font-semibold text-green-700 rounded-md hover:bg-gray-200">
                                    +Thêm màu mới
                                </button>
                            </div>

                            <div class="mt-2" v-show="isShowColorList">
                                <h2 class="font-medium text-sm text-gray-900 leading-6">Màu sắc</h2>
                                <div class="mt-1">
                                    <div class="flex items-center justify-center">
                                        <input v-model="inputTextColor" type="text" name="inputTextColor"
                                            id="inputTextColor" placeholder="Màu mới"
                                            class="flex-grow px-2 py-1.5 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                                        <button @click="addColor" type="button"
                                            class="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Thêm
                                        </button>
                                        <button @click="changeShowColorList" type="button"
                                            class="ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Huỷ
                                        </button>
                                    </div>

                                    <div class="flex flex-wrap gap-2 justify-center">
                                        <div v-for="(text, index) in colorList" :key="index" class="p-1">
                                            <div class="flex items-center h-10 border-2 border-red-600 rounded-md">
                                                <span class="flex-grow h-full flex items-center px-2">
                                                    {{ text }}
                                                </span>
                                                <button @click="deleteColor(index)" type="button"
                                                    class="h-full  text-white rounded-r-md hover:bg-red-700">
                                                    <img src="/Delete.svg " class="max-h-[20px]" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!-- thêm màu sắc -->


                        <!-- thêm số lượng sản phẩm -->
                        <div class="sm:col-span-full">
                            <div v-if="colorList.length == 0 && sizeList.length == 0">
                                <label for="countProduct" class="block text-sm font-medium leading-6 text-gray-900">Số lượng
                                    sản phẩm</label>
                                <div class="mt-1">
                                    <input type="number" min='0' name="countProduct" id="countProduct"
                                        autocomplete="countProduct"
                                        class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div class="px-1 mt-3" v-else>
                                <div class="sm:flex sm:items-center">
                                </div>
                                <div class="flow-root">
                                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                            <table class="min-w-full border-collapse border-2 border-slate-500">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" colspan="1"
                                                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 border border-slate-600"
                                                            v-if="sizeList.length != 0">
                                                            Kích cỡ</th>
                                                        <th scope="col" colspan="1"
                                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 border border-slate-600"
                                                            v-if="colorList.length != 0">
                                                            Màu sắc</th>
                                                        <th scope="col" colspan="1"
                                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 border border-slate-600">
                                                            Số lượng</th>
                                                    </tr>
                                                </thead>

                                                <tbody class=" bg-white"
                                                    v-if="!(sizeList.length == 0 && colorList.length == 0) && !(sizeList.length != 0 && colorList.length != 0)">
                                                    <tr v-for="(text, index) in sizeList.length != 0 ? sizeList : colorList"
                                                        :key="index">
                                                        <td colspan="1"
                                                            class="whitespace-nowrap px-3 py-5 text-sm text-gray-500 border-r border-slate-600">
                                                            <div class="text-gray-900">{{ text }}</div>
                                                        </td>
                                                        <td colspan="1"
                                                            class="whitespace-nowrap px-3 py-5 text-sm text-gray-500 ">
                                                            <input type="number" min='0'
                                                                class="w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </td>
                                                    </tr>
                                                </tbody>

                                                <tbody class=" bg-white" v-for="(size, index) in sizeList" :key="index">
                                                    <tr v-for="(color, index1) in colorList" :key="index1">
                                                        <td colspan="1"
                                                            class="whitespace-nowrap px-3 py-5 text-sm text-gray-500 border-r border-slate-600">
                                                            <div class="text-gray-900">{{ size }}</div>
                                                        </td>
                                                        <td colspan="1"
                                                            class="whitespace-nowrap px-3 py-5 text-sm text-gray-500 border-r border-slate-600">
                                                            <div class="text-gray-900">{{ color }}</div>
                                                        </td>
                                                        <td colspan="1"
                                                            class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                            <input type="number" min='0'
                                                                class="w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- thêm số lượng sản phẩm -->
                    </div>
                </div>
            </div>
            <!-- thông tin bán hàng -->


            <!-- Vận chuyển -->
            <div hidden>
                <h1 class="font-medium text-xl">Vận chuyển</h1>
                <div class="mt-5 mx-2">
                    <!-- Khối lượng sản phẩm -->
                    <div class="col-span-full">
                        <label for="productWeight" class="block text-sm font-semibold leading-6 text-gray-900">Trọng lượng
                            sản phẩm</label>
                        <div class="relative mt-1">
                            <div class="absolute inset-y-0 left-0 flex items-center">
                                <select name="weightSelected"
                                    class="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                                    <option>Gram (g)</option>
                                    <option>Kilogram (kg)</option>
                                </select>
                                <ChevronDownIcon class="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                                    aria-hidden="true" />
                            </div>
                            <input type="tel" name="productWeight" id="productWeight" autocomplete="tel"
                                class="block w-full rounded-md border-0 px-3.5 py-1.5 pl-28 text-gray-900 
                                                                                                                                                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                                                                                                                                            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <!-- Khối lượng sản phẩm -->


                    <div class="col-span-full mt-3">
                        <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Kích thước Sản
                            phẩm</label>
                        <div class="mt-1">
                            <div class="container mx-auto">
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <!-- Input 1 -->
                                    <div class="relative">
                                        <input type="text"
                                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                            placeholder="Chiều cao" />
                                        <span
                                            class="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">cm</span>
                                    </div>

                                    <!-- Input 2 -->
                                    <div class="relative">
                                        <input type="text"
                                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                            placeholder="Chiều rộng" />
                                        <span
                                            class="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">cm</span>
                                    </div>

                                    <!-- Input 3 -->
                                    <div class="relative">
                                        <input type="text"
                                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                            placeholder="Chiều dài" />
                                        <span
                                            class="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">cm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Vận chuyển -->

        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" @click="onUpdateList" class="rounded-md
                             bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
                             hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                             focus-visible:outline-red-600">Cancel</button>
            <button type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
    </form>
</template>

<script setup>
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import { computed, ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/vue'

import { useRouter } from 'vue-router';

const router = useRouter();

const Product = [
    { id: 1, name: 'Áo polo' },
    { id: 2, name: 'Áo thun' },
    { id: 3, name: 'Áo sơ mi' },
    { id: 4, name: 'Áo khoác' },
    { id: 5, name: 'Áo vest' },
    { id: 6, name: 'Áo len' },
    { id: 7, name: 'Áo hoodie' },

]

const query = ref('')
const categoryProduct = ref(null)
const filteredProduct = computed(() =>
    query.value === ''
        ? Product
        : Product.filter((product) => {
            return product.name.toLowerCase().includes(query.value.toLowerCase())
        })
)

// thông tin bán hàng
//{chọn màu
const inputTextColor = ref('');
const colorList = ref([]);
const isShowColorList = ref(false);

const addColor = () => {
    if (inputTextColor.value !== '') {

        colorList.value.push(inputTextColor.value);
        inputTextColor.value = '';
    }
};

const deleteColor = (index) => {
    try {
        colorList.value.splice(index, 1);
    } catch (error) { }
}
const changeShowColorList = () => {
    isShowColorList.value = !isShowColorList.value;
    if (!isShowColorList.value) {
        colorList.value = [];
    }
    console.log("Change color list: " + isShowColorList.value + " size : " + colorList.value.length)
}

//chọn màu}
//----------------------------------------------------------------
//chọn size{

const inputTextSize = ref('');
const sizeList = ref([]);
const isShowSizeList = ref(false);
const addSize = () => {
    if (inputTextSize.value !== '') {

        sizeList.value.push(inputTextSize.value);
        inputTextSize.value = '';
    }
};

const deleteSize = (index) => {
    try {
        sizeList.value.splice(index, 1);
    } catch (error) {

    }
}
const changeShowSizeList = () => {
    isShowSizeList.value = !isShowSizeList.value;
    if (!isShowSizeList.value) {
        sizeList.value = [];
    }

    console.log("Change size list: " + isShowSizeList.value + " size : " + sizeList.value.length)
}
//chọn size}

//chọn số lương{



//chọn số lương}

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
            if (file.type.startsWith('image/')) {
                previewImage(file);
            } else {
                alert('Please select a valid image file.');
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
    document.getElementById('file-upload').click();
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
    console.log("index remvoe: ", index, "selectedImages : ", selectedImages.length);
};
//photo


const onUpdateList = (isUpdate) => {
    if (isUpdate) {

    }
    router.push("/admin/product");
}

</script>
