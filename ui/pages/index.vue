<script setup lang="ts">
definePageMeta({
  middleware: "auth-middleware",
});
</script>

<template>
  <warehouse-product-list />
</template>
