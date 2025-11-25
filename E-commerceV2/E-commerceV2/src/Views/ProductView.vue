<script>
import { useProductStore } from '../stores/product'
import { useRoute } from 'vue-router'

export default {
  name: 'ProductView',
  setup() {
    const route = useRoute()
    const productStore = useProductStore()
    
    return {
      route,
      productStore,
      productId: route.params.productId
    }
  },
  async mounted() {
    await this.productStore.fetchProducts()
  },
  computed: {
    product() {
      // Find product by ID
      return this.productStore.getProductsWithBadges.find(
        product => product.id == this.productId
      )
    }
  }
}
</script>

<template>
  <div class="product-view">
    <div class="header">
      <RouterLink to="/" class="back-link">← Back to Home</RouterLink>
    </div>
    
    <div v-if="product" class="product-detail">
      <div class="product-image">
        <img :src="'http://localhost:3000/' + product.image" :alt="product.name" />
      </div>
      
      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-brand">Brand: {{ product.brand }}</p>
        
        <div class="product-rating">
          <span class="stars">★ {{ product.rating }}</span>
        </div>
        
        <div class="product-pricing">
          <span class="current-price">${{ product.price }}</span>
          <span v-if="product.oldPrice" class="old-price">${{ product.oldPrice }}</span>
          <span v-if="product.promotionAsPercentage" class="discount-badge">
            -{{ product.promotionAsPercentage }}%
          </span>
        </div>
        
        <div class="product-details">
          <p><strong>Weight/Size:</strong> {{ product.size }}</p>
          <p v-if="product.color"><strong>Color:</strong> {{ product.color }}</p>
        </div>
        
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
    
    <div v-else class="not-found">
      <h2>Product not found</h2>
      <p>The product you're looking for doesn't exist.</p>
    </div>
  </div>
</template>

<style scoped>
.product-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  padding: 20px 0;
}

.back-link {
  text-decoration: none;
  color: #3498db;
  font-size: 16px;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

.product-detail {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.product-image {
  flex: 1;
  max-width: 500px;
}

.product-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.product-brand {
  font-size: 18px;
  color: #666;
  margin: 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stars {
  color: #ffa500;
  font-size: 20px;
}

.product-pricing {
  display: flex;
  align-items: center;
  gap: 15px;
}

.current-price {
  font-size: 36px;
  font-weight: bold;
  color: #27ae60;
}

.old-price {
  font-size: 24px;
  color: #999;
  text-decoration: line-through;
}

.discount-badge {
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
}

.product-details {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.product-details p {
  margin: 10px 0;
  font-size: 16px;
  color: #555;
}

.add-to-cart {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.add-to-cart:hover {
  background-color: #2980b9;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.not-found h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .product-detail {
    flex-direction: column;
  }
  
  .product-image {
    max-width: 100%;
  }
  
  .product-title {
    font-size: 24px;
  }
  
  .current-price {
    font-size: 28px;
  }
}
</style>
