<script setup lang="ts">
import ProductService from "@/services/product.service";

const productStore = useProductStore();
let product = ref({
  code: null,
  name: null,
  quantity: null,
  price: null,
  image: null,
});

const route = useRoute();
const productID = route.params.id;
if (productID) {
  console.log("editing product id: " + productID);
  loadProduct(productID as string);
} else {
  console.log("creating new product");
}
const router = useRouter();

async function saveProduct() {
  const { code, name, quantity, price, image } = product.value;

  if (!code || !name || !quantity || !price) {
    alert("Please fill all required fields");
    return;
  }

  const productData = {
    code: code,
    name: name,
    quantity: parseInt(quantity),
    price: parseFloat(price),
  };

  try {
    let response;
    if (productID) {
      response = await ProductService.updateProduct(
        productID as string,
        productData,
        image
      );
    } else {
      response = await ProductService.createProduct(productData, image);
    }

    if (response.success === true) {
      alert("Product saved successfully!");
      await productStore.load();
      router.push("/");
    } else {
      alert("Something went wrong");
    }
  } catch (e: any) {
    alert(e.response.data.message);
  }
}

async function loadProduct(id: string) {
  const productData = productStore.getProductById(id);
  if (!productData) {
    throw new Error("Product not found");
  }

  product.value = {
    code: productData.code,
    name: productData.name,
    quantity: productData.quantity,
    price: productData.price,
    image: null,
  };
}

function onImageSelected(event: any) {
  const selectedFile = event.target.files[0];
  product.value.image = selectedFile;
}
</script>

<template>
  <div>
    <nuxt-link to="/"><button type="button">Back to Home</button></nuxt-link>
  </div>

  <div>
    <label for="code">Product Code</label>
    <input
      type="text"
      id="code"
      placeholder="Enter your product id"
      v-model="product.code"
    />
  </div>
  <div>
    <label for="name">Product Name</label>
    <input
      type="text"
      id="name"
      placeholder="Enter your product name"
      v-model="product.name"
    />
  </div>
  <div>
    <label for="quantity">Product Quantity</label>
    <input
      type="number"
      id="quantity"
      placeholder="Enter your product quantity"
      v-model="product.quantity"
    />
  </div>
  <div>
    <label for="price"> Product Price</label>
    <input
      type="number"
      id="price"
      placeholder="Enter your product price per quantity"
      v-model="product.price"
    />
  </div>
  <div>
    <label for="image"> Product Image</label>
    <input type="file" id="image" accept="image/*" @change="onImageSelected" />
  </div>
  <div class="form_action--button">
    <button type="button" @click="saveProduct">Save</button>
    <nuxt-link to="/"><button type="button">Cancel</button></nuxt-link>
  </div>
</template>
