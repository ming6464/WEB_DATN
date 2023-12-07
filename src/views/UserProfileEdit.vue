<!-- UserProfileEdit.vue -->
<template>
  <div>
    <form @submit.prevent="saveChanges">
      <!-- Profile edit form fields go here -->
      <div>
        <label for="name">Tên:</label>
        <input v-model="user.name" type="text" id="name" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="user.email" type="email" id="email" />
      </div>
      <div>
        <label for="password">Mật khẩu:</label>
        <input v-model="user.password" type="password" id="password" />
      </div>
      <div>
        <label for="confirmPassword">Nhập lại mật khẩu:</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" />
      </div>
      <div>
        <label for="role">Phân quyền:</label>
        <select v-model="user.role" id="role">
          <!-- Options for user roles go here -->
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <button type="submit">Lưu lại</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const user = ref({
  name: "Tom Cook",
  email: "tom@example.com",
  password: "",
  role: "admin",
});

const confirmPassword = ref("");

const saveChanges = () => {
  // Handle save changes logic here
  console.log("Saving changes", user.value);
};
</script>
