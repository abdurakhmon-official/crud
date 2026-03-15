<script setup lang="ts">
const productStore = useProductStore();

const { productCount } = storeToRefs(productStore);
</script>

<template>
  <h1>OMBOR (total: {{ productCount }}ta product)</h1>
</template>
