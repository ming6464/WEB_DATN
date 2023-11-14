<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">
          Danh mục
        </h1>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
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
                  class="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Ảnh
                </th>
                <th
                  scope="col"
                  class="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Tên Sản Phẩm
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">Edit</span>
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="person in people" :key="person.name">
                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="h-20 w-20 flex-shrink-0">
                      <img class="h-24 w-24" :src="person.image" alt="" />
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="font-medium text-gray-900">{{ person.name }}</div>
                </td>
                <td
                  class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex flex-row"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Edit<span class="sr-only">, {{ person.name }}</span></a
                  >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Delete<span class="sr-only">, {{ person.name }}</span></a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const people = [
  {
    name: "Áo len",
    image:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/460950/sub/goods_460950_sub14.jpg?width=750",
  },
  {
    name: "Áo thun",
    image:
      "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/Ao_thun_oversize_basic_84RISINGshawdo4.jpg",
  },
  {
    name: "Áo sơ mi",
    image:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462384/sub/goods_462384_sub14.jpg?width=750",
  },
  {
    name: "Áo nỉ",
    image:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/460322/item/goods_31_460322.jpg?width=750",
  },
  {
    name: "Áo Polo",
    image:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433041/item/goods_69_433041.jpg?width=750",
  },
  {
    name: "Áo khoác",
    image:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/450195/sub/goods_450195_sub14.jpg?width=750",
  },
];
</script>
