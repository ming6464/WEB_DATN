<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="submit">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Địa chỉ email</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="formData.email"
              :class="{ 'border-red-500': errors.email }"
              @input="clearError('email')"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Mật khẩu
            </label>
            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Quên mật khẩu ?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="formData.password"
              :class="{ 'border-red-500': errors.password }"
              @input="clearError('password')"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Đăng nhập
          </button>
          <Button label="Submit" />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const formData = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: "",
  password: "",
});

function submitForm() {
  errors.value = {}; // Reset errors

  if (!formData.value.email.trim()) {
    errors.value.email = "Email is required.";
  }

  if (!formData.value.password.trim()) {
    errors.value.password = "Password is required.";
  }

  // Perform form submission logic if there are no errors
  if (Object.keys(errors.value).length === 0) {
    // Your form submission logic goes here
    console.log("Form submitted successfully");
  }
}

function clearError(field) {
  errors.value[field] = "";
}
</script>
