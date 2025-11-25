import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: [],
    groups: [],
    promotions: [],
  }),
    getters: {
    getProductsWithBadges: (state) => {
      // Map over the raw products array to create a new array with the added badge property
      return state.products.map(product => {

        let imagePath = product.image;
        const parsed = JSON.parse(imagePath)
        imagePath = Array.isArray(parsed) ? parsed[0] : imagePath
        imagePath = imagePath.replace(/\\\\/g, '/')

        return {
          ...product,
          image: imagePath
        };
      });
    },
  },

  actions: {
    async fetchProducts() {
      const response = await axios.get('http://localhost:3000/api/products').then((res) => {
        this.products = res.data
        console.log(this.products)
      })
      return response
    },
  },
})
