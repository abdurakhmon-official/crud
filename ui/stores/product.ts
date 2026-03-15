import ProductService from "~/services/product.service";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
  }),
  actions: {
    async load() {
      const products = await ProductService.loadProducts();
      this.products = products;
    },
  },
  getters: {
    productCount: (state) => {
      return state.products.length;
    },
    getProductById: (state) => {
      return (id: string) => state.products.find((p: any) => p.id === id);
    },
  },
});
