<template>
  <div class="max-w-lg mx-auto mt-10">
    <div class="px-4 sm:px-0">
      <h1 class="text-2xl font-semibold leading-7 text-gray-900">
        Thông tin cá nhân
      </h1>
    </div>
    <div class="mt-6 border-t border-gray-100">
      <dl class="divide-y divide-gray-100">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Ảnh đại diện
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <img class="h-24 w-24" :src="user.image" alt="" />
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">ID</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ user.id }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Tên tài khoản
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ user.username }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm font-medium leading-6 text-gray-900">
            Tên người dùng
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {{ user.name }}
          </dd>
        </div>
        <div class="mt-8 flex">
          <button
            type="button"
            class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Sửa
          </button>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PencilSquareIcon } from "@heroicons/vue/20/solid";
import { PaperClipIcon } from "@heroicons/vue/20/solid";
const user = ref({
  image:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  id: 123,
  name: "Tom Cook",
  username: "tom_cook",
  avatar: "path/to/avatar.jpg",
  role: "admin",
});

const isEditing = ref(false);

const startEditing = () => {
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const saveChanges = () => {
  // Handle save changes logic here
  console.log("Saving changes", user.value);
  isEditing.value = false;
};
</script>
