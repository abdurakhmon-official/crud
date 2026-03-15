import axios from '../utils/axios-client'

class ProductService {
  static async loadProducts() {
    const url = '/products'

    const response = await axios.get(url)
    const { data } = response
    return data
  }

  static async getProduct(id: string) {
    const url = '/products/' + id

    const response = await axios.get(url)
    const { data } = response
    return data
  }

  static async createProduct(productData: any, image: File) {
    const url = '/products'

    const formData = new FormData()
    formData.append('product', JSON.stringify(productData))
    formData.append('image', image)

    const response = await axios.post(url, formData)
    const { data } = response
    return data
  }

  static async updateProduct(id: string, productData: any, image: File) {
    const url = '/products/' + id

    const formData = new FormData()
    formData.append('product', JSON.stringify(productData))
    formData.append('image', image)

    const response = await axios.put(url, formData)
    const { data } = response
    return data
  }

  static async deleteProduct(id: string) {
    const url = '/products/' + id

    const response = await axios.delete(url)
    const { data } = response
    return data
  }
}

export default ProductService
