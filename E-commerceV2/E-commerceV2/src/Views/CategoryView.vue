<script>
import { useProductStore } from '../stores/product'
import ProductCart from '../components/ProductCart.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'CategoryView',
  components: {
    ProductCart
  },
  setup() {
    const route = useRoute()
    const productStore = useProductStore()
    
    return {
      route,
      productStore,
      categoryId: route.params.categoryId
    }
  },
  async mounted() {
    await this.productStore.fetchProducts()
  },
  computed: {
    categoryProducts() {
      // Filter products by category ID
      return this.productStore.getProductsWithBadges.filter(
        product => product.categoryId == this.categoryId
      )
    }
  }
}
</script>

<template>
  <div class="category-view">
    <h1 class="header">
      <RouterLink to="/" class="back-link">← Back to Home</RouterLink>
      <span>Category: {{ categoryId }}</span>
    </h1>
    
    <div class="products-wrapper">
      <ProductCart
        v-for="product in categoryProducts"
        :key="product.id"
        :title="product.name"
        :image="'http://localhost:3000/' + product.image"
        :brand="product.brand"
        :price="product.price"
        :oldPrice="product.oldPrice"
        :rating="product.rating"
        :weight="product.size"
        :discount="product.promotionAsPercentage"
        :color="product.color"
      />
      <div v-if="categoryProducts.length === 0" class="no-products">
        No products found in this category.
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-view {
  padding: 20px;
}

.header {
  padding: 20px 40px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-link {
  text-decoration: none;
  color: #3498db;
  font-size: 16px;
  font-weight: normal;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

.products-wrapper {
  display: flex;
  flex-direction: row;
  gap: 15px;
  flex-wrap: wrap;
  padding: 40px;
}

.no-products {
  padding: 40px;
  text-align: center;
  color: #666;
  font-size: 18px;
}

@media (max-width: 768px) {
  .products-wrapper {
    flex-direction: column;
  }
  
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
