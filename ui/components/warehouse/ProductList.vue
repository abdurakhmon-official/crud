<script setup lang="ts">
import ProductService from "../../services/product.service";
const productStore = useProductStore();
const authStore = useAuthStore();

const { products } = storeToRefs(productStore);

function makeImageURL(productImage: string) {
  return API_URL + "/products/image/" + productImage;
}

async function deleteProduct(id: string) {
  // delete the product
  // call getProducts function
  const response = await ProductService.deleteProduct(id);
  console.log(response);

  if (response.success) {
    alert("Product deleted successfully!");
    await productStore.load();
  } else {
    alert("Something went wrong");
  }
}
</script>

<template>
  <div>
    <nuxt-link to="/create">
      <button type="button">Create Product</button>
    </nuxt-link>
  </div>

  <table class="list">
    <thead>
      <tr>
        <th>Product Code</th>
        <th>Product Name</th>
        <th>Product Quantity</th>
        <th>Product Price</th>
        <th>Product Image</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product of products" :key="product.id">
        <td>{{ product.code }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.quantity }} ta</td>
        <td>{{ product.price }} so'm</td>
        <td>
          <img
            width="100"
            height="100"
            v-if="product.image"
            :src="makeImageURL(product.image)"
            :alt="product.name"
          />
        </td>
        <td>
          <nuxt-link :to="`/${product.id}`"><button>Edit</button></nuxt-link>
          <button type="button" @click="deleteProduct(product.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
