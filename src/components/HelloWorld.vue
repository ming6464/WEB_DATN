<template>
  <li v-for="product in products" :key="product.id">
    <ul>
      {{
        product?.title
      }}
    </ul>
  </li>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useProduct } from "../store/product";
const store = useProduct();
const products = computed(() => {
  return store.products;
});
onMounted(() => {
  store.fetchProducts();
});
console.log(products);
</script>
