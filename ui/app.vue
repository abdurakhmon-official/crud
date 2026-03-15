<script setup lang="ts">
const product = useProductStore();

callOnce(product.load);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
