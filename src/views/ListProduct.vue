<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-center text-3xl font-semibold leading-6 text-gray-900">
          Danh sách sản phẩm
        </h1>
      </div>
      <div class="mt-2 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
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
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Tên sản phẩm
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Gía sản phẩm
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Chi tiết
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
              <tr v-for="person in people" :key="person.email">
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.stt }}</div>
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
                  <div class="mt-1 text-gray-500">{{ person.department }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <span
                    class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    >Active</span
                  >
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  {{ person.role }}
                </td>
                <td
                  class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex-row"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900 mx-3"
                    >Edit<span class="sr-only">, {{ person.name }}</span></a
                  >
                  <a href="#" class="text-red-700 hover:text-indigo-900"
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
    stt: "1",
    name: "Áo khoác",
    title: "Front-end Developer",
    role: "Member",
    image:
      "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/450195/sub/goods_450195_sub14.jpg?width=750",
  },
  // More people...
];
</script>
