<template>
    <form>
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="productName" class="block text-sm font-medium leading-6 text-gray-900">Tên sản
                            phẩm</label>
                        <div class=" mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                            <input type="text" name="productName" id="productName" autocomplete="productName"
                                class="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-600
                                                                             placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Áo ...." />
                        </div>
                    </div>

                    <!-- thể loại -->
                    <div class="sm:col-span-3">
                        <Combobox as="div" v-model="categoryProduct">
                            <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">Thể loại
                            </ComboboxLabel>
                            <div class="relative mt-2">
                                <ComboboxInput
                                    class="w-full  rounded-md border-0 bg-white py-1.5 pl-2 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    @change="query = $event.target.value" :display-value="(product) => product?.name" />
                                <ComboboxButton
                                    class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </ComboboxButton>

                                <ComboboxOptions v-if="filteredProduct.length > 0"
                                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ComboboxOption v-for="product in filteredProduct" :key="product.id" :value="product"
                                        as="template" v-slot="{ active, selected }">
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

                    <!-- thêm ảnh -->
                    <div class="col-span-full">
                        <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Ảnh bìa</label>
                        <div class="mt-2 flex justify-center flex-col items-center rounded-lg border border-dashed border-gray-900/25 px-32 py-10"
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
                                <p v-if="selectedImages.length === 0" class="text-xs leading-5 text-gray-600 mt-4">PNG, JPG,
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
                </div>
            </div>

            <div class="border-b border-gray-900/10 pb-12">
                <!-- <h2 class="font-bold text-2xl leading-7 text-gray-900">Thông tin bán hàng</h2> -->

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-full">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Giá bán lẻ</label>
                        <div class="mt-2">
                            <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                                class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                        <div class="mt-2">
                            <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-4">
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
                        <div class="mt-2">
                            <select id="country" name="country" autocomplete="country-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street
                            address</label>
                        <div class="mt-2">
                            <input type="text" name="street-address" id="street-address" autocomplete="street-address"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                        <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                        <div class="mt-2">
                            <input type="text" name="city" id="city" autocomplete="address-level2"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State /
                            Province</label>
                        <div class="mt-2">
                            <input type="text" name="region" id="region" autocomplete="address-level1"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal
                            code</label>
                        <div class="mt-2">
                            <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                <p class="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you
                    pick what else you want to hear about.</p>

                <div class="mt-10 space-y-10">
                    <fieldset>
                        <legend class="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                        <div class="mt-6 space-y-6">
                            <div class="relative flex gap-x-3">
                                <div class="flex h-6 items-center">
                                    <input id="comments" name="comments" type="checkbox"
                                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div class="text-sm leading-6">
                                    <label for="comments" class="font-medium text-gray-900">Comments</label>
                                    <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                </div>
                            </div>
                            <div class="relative flex gap-x-3">
                                <div class="flex h-6 items-center">
                                    <input id="candidates" name="candidates" type="checkbox"
                                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div class="text-sm leading-6">
                                    <label for="candidates" class="font-medium text-gray-900">Candidates</label>
                                    <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
                                </div>
                            </div>
                            <div class="relative flex gap-x-3">
                                <div class="flex h-6 items-center">
                                    <input id="offers" name="offers" type="checkbox"
                                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                </div>
                                <div class="text-sm leading-6">
                                    <label for="offers" class="font-medium text-gray-900">Offers</label>
                                    <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend class="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                        <p class="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.
                        </p>
                        <div class="mt-6 space-y-6">
                            <div class="flex items-center gap-x-3">
                                <input id="push-everything" name="push-notifications" type="radio"
                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                <label for="push-everything"
                                    class="block text-sm font-medium leading-6 text-gray-900">Everything</label>
                            </div>
                            <div class="flex items-center gap-x-3">
                                <input id="push-email" name="push-notifications" type="radio"
                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                <label for="push-email" class="block text-sm font-medium leading-6 text-gray-900">Same as
                                    email</label>
                            </div>
                            <div class="flex items-center gap-x-3">
                                <input id="push-nothing" name="push-notifications" type="radio"
                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                <label for="push-nothing" class="block text-sm font-medium leading-6 text-gray-900">No push
                                    notifications</label>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
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

</script>
