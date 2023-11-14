<template>
  <div class="isolate bg-white px-4 py-18 sm:py-2 lg:px-6">
    <form action="#" method="POST" class="mx-auto mt-8 max-w-xl sm:mt-6">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="col-span-full flex items-center gap-x-8">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
          />
          <div>
            <button
              type="button"
              class="rounded-md bg-blue px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-blue"
            >
              Change avatar
            </button>
            <p class="mt-2 text-xs leading-5 text-gray-400">
              JPG, GIF or PNG. 1MB max.
            </p>
          </div>
        </div>
        <div>
          <label
            for="last-name"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Họ</label
          >
          <div class="mt-2.5">
            <input
              type="text"
              name="last-name"
              id="last-name"
              autocomplete="family-name"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            for="first-name"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Tên</label
          >
          <div class="mt-2.5">
            <input
              type="text"
              name="first-name"
              id="first-name"
              autocomplete="given-name"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label
            for="email"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Email</label
          >
          <div class="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label
            for="company"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Địa chỉ</label
          >
          <div class="mt-2.5">
            <input
              type="text"
              name="company"
              id="company"
              autocomplete="organization"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label
            for="phone-number"
            class="block text-sm font-semibold leading-6 text-gray-900"
            >Số điện thoại</label
          >
          <div class="relative mt-2.5">
            <div class="absolute inset-y-0 left-0 flex items-center">
              <label for="country" class="sr-only">Country</label>
              <select
                id="country"
                name="country"
                class="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option>VN</option>
                <option>CA</option>
                <option>EU</option>
              </select>
              <ChevronDownIcon
                class="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="tel"
              name="phone-number"
              id="phone-number"
              autocomplete="tel"
              class="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="mt-8 flex">
          <button
            type="submit"
            class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const agreed = ref(false);
</script>
