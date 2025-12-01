<script>
import { useProductStore } from '../stores/product'
import HeaderComponent from '../components/HeaderComponent.vue'
import MenuBar from '../components/MenuBar.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'ProductView',
  components: {
    HeaderComponent,
    MenuBar
  },
  data() {
    return {
      quantity: 1
    }
  },
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
    },
    stars() {
      if (!this.product) return ''
      const r = Math.max(0, Math.min(5, Math.round(this.product.rating)))
      const filled = '★'.repeat(r)
      const empty = '☆'.repeat(5 - r)
      return filled + empty
    }
  },
  methods: {
    incrementQuantity() {
      this.quantity++
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    addToCart() {
      alert(`Added ${this.quantity} ${this.product.name} to cart!`)
    }
  }
}
</script>

<template>
  <div class="product-view">
    <!-- Header -->
    <HeaderComponent />
    
    <!-- Menu Bar -->
    <MenuBar />
    
    <!-- Breadcrumb -->
    <div class="breadcrumb-container">
      <div class="breadcrumb">
        <RouterLink to="/" class="breadcrumb-link">Home</RouterLink>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-link">Vegetables & tubers</span>
        <span class="breadcrumb-separator">></span>
        <span class="breadcrumb-current">{{ product ? product.name : 'Product' }}</span>
      </div>
    </div>
    
    <!-- Product Detail -->
    <div v-if="product" class="product-detail-container">
      <div class="product-detail">
        <!-- Product Image Section -->
        <div class="product-images">
          <div class="main-image">
            <div v-if="product.promotionAsPercentage" class="discount-badge">
              -{{ product.promotionAsPercentage }}%
            </div>
            <div class="in-stock-badge">In Stock</div>
            <img :src="'http://localhost:3000/' + product.image" :alt="product.name" />
          </div>
          
          <!-- Thumbnail images would go here -->
          <div class="thumbnail-images">
            <img :src="'http://localhost:3000/' + product.image" :alt="product.name" class="thumbnail active" />
            <img :src="'http://localhost:3000/' + product.image" :alt="product.name" class="thumbnail" />
            <img :src="'http://localhost:3000/' + product.image" :alt="product.name" class="thumbnail" />
            <img :src="'http://localhost:3000/' + product.image" :alt="product.name" class="thumbnail" />
          </div>
        </div>
        
        <!-- Product Info Section -->
        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
          
          <div class="product-rating">
            <span class="stars">{{ stars }}</span>
            <span class="rating-text">({{ product.rating.toFixed(1) }})</span>
          </div>
          
          <div class="product-pricing">
            <span class="current-price">${{ product.price.toFixed(2) }}</span>
            <span v-if="product.oldPrice" class="old-price">${{ product.oldPrice.toFixed(2) }}</span>
          </div>
          
          <p class="product-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi, 
            quasi, odio minus dolore impedit fuga eum eligendi? Officia doloremque facere quia. Voluptatum, accusantium!
          </p>
          
          <div class="product-meta">
            <div class="meta-row">
              <span class="meta-label">SKU:</span>
              <span class="meta-value">FWM{{ product.id.toString().padStart(5, '0') }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Vendor:</span>
              <span class="meta-value">{{ product.brand }}</span>
            </div>
          </div>
          
          <div class="quantity-cart-section">
            <div class="quantity-selector">
              <button @click="decrementQuantity" class="quantity-btn">-</button>
              <input type="number" v-model.number="quantity" class="quantity-input" min="1" />
              <button @click="incrementQuantity" class="quantity-btn">+</button>
            </div>
            
            <button @click="addToCart" class="add-to-cart-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM1 1h3l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L22 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Add to Cart
            </button>
          </div>
          
          <div class="action-buttons">
            <button class="wishlist-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1 3.6c-1.5-1.8-4-1.8-5.5 0-1.5 1.7-1.5 4.5 0 6.2l5.5 5.5 5.5-5.5c1.5-1.7 1.5-4.5 0-6.2-1.5-1.8-4-1.8-5.5 0z" stroke="currentColor" stroke-width="2"/>
              </svg>
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      
      <!-- Product Tabs Section -->
      <div class="product-tabs">
        <div class="tabs-header">
          <button class="tab-btn active">Description</button>
          <button class="tab-btn">Additional info</button>
          <button class="tab-btn">Reviews (3)</button>
        </div>
        
        <div class="tabs-content">
          <div class="tab-pane active">
            <p>Uninhibited carnally hired played in whimpered dear gorilla koala depending and much yikes off far quetzal goodness and from for grimaced goodness unaccountably and meadowlark near unblushingly crucial scallop tightly neurotic hungrily some and dear furiously this apart.</p>
            <p>Spluttered narrowly yikes left moth in yikes bowed this that grizzly much hello on spoon-fed that alas rethought much decently richly and wow against the frequent fluidly at formidable acceptably flapped besides and much circa far over the bucolically hey precarious goldfinch mastodon goodness gnashed a jellyfish and one however because.</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Not Found -->
    <div v-else class="not-found">
      <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="75" r="60" stroke="#ececec" stroke-width="3"/>
        <path d="M50 60h20M80 60h20M50 90c0-13.807 11.193-25 25-25s25 11.193 25 25" stroke="#adadad" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <h2>Product not found</h2>
      <p>The product you're looking for doesn't exist.</p>
      <RouterLink to="/" class="back-home-btn">Back to Home</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.product-view {
  background: #f4f5f7;
  min-height: 100vh;
}

.breadcrumb-container {
  background: white;
  border-bottom: 1px solid #ececec;
}

.breadcrumb {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
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

.product-detail-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px;
}

.product-detail {
  background: white;
  border-radius: 15px;
  padding: 40px;
  display: flex;
  gap: 60px;
  margin-bottom: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.product-images {
  flex: 1;
  max-width: 500px;
}

.main-image {
  position: relative;
  border: 2px solid #ececec;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  background: #fafafa;
}

.main-image img {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  display: block;
}

.discount-badge {
  position: absolute;
  top: 20px;
  left: 0;
  background: #F74B81;
  color: white;
  padding: 8px 16px;
  border-radius: 0 20px 20px 0;
  font-size: 14px;
  font-weight: 700;
  z-index: 2;
}

.in-stock-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #3BB77E;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  z-index: 2;
}

.thumbnail-images {
  display: flex;
  gap: 15px;
  overflow-x: auto;
}

.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 2px solid #ececec;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.thumbnail:hover,
.thumbnail.active {
  border-color: #3BB77E;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-title {
  font-size: 40px;
  font-weight: 700;
  color: #253D4E;
  margin: 0;
  line-height: 1.3;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stars {
  color: #FDC040;
  font-size: 18px;
  letter-spacing: 2px;
}

.rating-text {
  color: #7E7E7E;
  font-size: 16px;
}

.product-pricing {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 0;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
}

.current-price {
  font-size: 48px;
  font-weight: 700;
  color: #3BB77E;
}

.old-price {
  font-size: 28px;
  color: #adadad;
  text-decoration: line-through;
}

.product-description {
  font-size: 16px;
  color: #7E7E7E;
  line-height: 1.8;
  margin: 0;
}

.product-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.meta-row {
  display: flex;
  gap: 10px;
  font-size: 16px;
}

.meta-label {
  font-weight: 600;
  color: #253D4E;
  min-width: 80px;
}

.meta-value {
  color: #7E7E7E;
}

.quantity-cart-section {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 2px solid #ececec;
  border-radius: 5px;
  overflow: hidden;
}

.quantity-btn {
  width: 45px;
  height: 45px;
  border: none;
  background: #f4f5f7;
  color: #253D4E;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.quantity-btn:hover {
  background: #3BB77E;
  color: white;
}

.quantity-input {
  width: 60px;
  height: 45px;
  border: none;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #253D4E;
  outline: none;
}

.quantity-input::-webkit-inner-spin-button,
.quantity-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.add-to-cart-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 40px;
  background: #3BB77E;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
}

.add-to-cart-btn:hover {
  background: #2ea06b;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.wishlist-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 25px;
  background: transparent;
  color: #7E7E7E;
  border: 2px solid #ececec;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.wishlist-btn:hover {
  border-color: #3BB77E;
  color: #3BB77E;
}

.product-tabs {
  background: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.tabs-header {
  display: flex;
  gap: 30px;
  border-bottom: 2px solid #ececec;
  margin-bottom: 30px;
}

.tab-btn {
  padding: 15px 0;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 18px;
  font-weight: 600;
  color: #7E7E7E;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: -2px;
}

.tab-btn:hover,
.tab-btn.active {
  color: #3BB77E;
  border-bottom-color: #3BB77E;
}

.tabs-content {
  color: #7E7E7E;
  font-size: 16px;
  line-height: 1.8;
}

.tab-pane {
  display: none;
}

.tab-pane.active {
  display: block;
}

.tab-pane p {
  margin: 0 0 20px 0;
}

.not-found {
  max-width: 600px;
  margin: 100px auto;
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.not-found h2 {
  font-size: 32px;
  color: #253D4E;
  margin: 0;
}

.not-found p {
  font-size: 18px;
  color: #7E7E7E;
  margin: 0;
}

.back-home-btn {
  display: inline-block;
  padding: 15px 40px;
  background: #3BB77E;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 700;
  font-size: 16px;
  transition: background 0.3s;
  margin-top: 10px;
}

.back-home-btn:hover {
  background: #2ea06b;
}

@media (max-width: 1024px) {
  .product-detail {
    flex-direction: column;
    gap: 40px;
  }
  
  .product-images {
    max-width: 100%;
  }
  
  .product-title {
    font-size: 32px;
  }
  
  .current-price {
    font-size: 36px;
  }
  
  .quantity-cart-section {
    flex-direction: column;
  }
  
  .tabs-header {
    overflow-x: auto;
    gap: 15px;
  }
  
  .tab-btn {
    white-space: nowrap;
    font-size: 16px;
  }
}
</style>
