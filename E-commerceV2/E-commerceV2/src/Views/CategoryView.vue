<script>
import { useProductStore } from '../stores/product'
import ProductCart from '../components/ProductCart.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import MenuBar from '../components/MenuBar.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'CategoryView',
  components: {
    ProductCart,
    HeaderComponent,
    MenuBar
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
    },
    categoryName() {
      // Get category name based on ID
      const categoryMap = {
        '1': 'Coke & Milk',
        '2': 'Peach',
        '3': 'Organic Kiwi',
        '4': 'Red Apple',
        '5': 'Snack',
        '6': 'Black Plum',
        '7': 'Vegetables',
        '8': 'Electronics',
        '9': 'Cake & Milk',
        '10': 'Orange'
      }
      return categoryMap[this.categoryId] || `Category ${this.categoryId}`
    }
  }
}
</script>

<template>
  <div class="category-view">
    <!-- Header -->
    <HeaderComponent />
    
    <!-- Menu Bar -->
    <MenuBar />
    
    <!-- Page Header with Breadcrumb -->
    <div class="page-header">
      <div class="page-header-content">
        <h1 class="page-title">{{ categoryName }}</h1>
        <div class="breadcrumb">
          <RouterLink to="/" class="breadcrumb-link">Home</RouterLink>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-link">Categories</span>
          <span class="breadcrumb-separator">></span>
          <span class="breadcrumb-current">{{ categoryName }}</span>
        </div>
      </div>
    </div>
    
    <!-- Products Section -->
    <div class="products-section">
      <div class="section-header">
        <h2 class="section-title">Products in {{ categoryName }}</h2>
        <p class="product-count">{{ categoryProducts.length }} items</p>
      </div>
      
      <div class="products-wrapper">
        <ProductCart
          v-for="product in categoryProducts"
          :key="product.id"
          :productId="product.id"
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
      </div>
      
      <div v-if="categoryProducts.length === 0" class="no-products">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#ececec" stroke-width="2"/>
          <path d="M35 45h10M55 45h10M35 65c0-8.284 6.716-15 15-15s15 6.716 15 15" stroke="#adadad" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <h3>No products found</h3>
        <p>There are no products in this category yet.</p>
        <RouterLink to="/" class="back-home-btn">Back to Home</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-view {
  background: #f4f5f7;
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, #E7F5EC 0%, #F0F9F4 100%);
  padding: 60px 0;
  margin-bottom: 40px;
}

.page-header-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  text-align: center;
}

.page-title {
  font-size: 48px;
  font-weight: 700;
  color: #253D4E;
  margin: 0 0 20px 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
}

.breadcrumb-link {
  color: #7E7E7E;
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumb-link:hover {
  color: #3BB77E;
}

.breadcrumb-separator {
  color: #adadad;
}

.breadcrumb-current {
  color: #253D4E;
  font-weight: 600;
}

.products-section {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px 60px 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #253D4E;
  margin: 0;
}

.product-count {
  font-size: 18px;
  color: #7E7E7E;
  margin: 0;
}

.products-wrapper {
  display: flex;
  flex-direction: row;
  gap: 15px;
  flex-wrap: wrap;
}

.no-products {
  width: 100%;
  padding: 80px 20px;
  text-align: center;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.no-products h3 {
  font-size: 28px;
  color: #253D4E;
  margin: 0;
}

.no-products p {
  font-size: 18px;
  color: #7E7E7E;
  margin: 0;
}

.back-home-btn {
  display: inline-block;
  padding: 12px 30px;
  background: #3BB77E;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: background 0.3s;
  margin-top: 10px;
}

.back-home-btn:hover {
  background: #2ea06b;
}

@media (max-width: 768px) {
  .products-wrapper {
    flex-direction: column;
    align-items: center;
  }
  
  .page-title {
    font-size: 32px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .breadcrumb {
    flex-wrap: wrap;
  }
}
</style>
