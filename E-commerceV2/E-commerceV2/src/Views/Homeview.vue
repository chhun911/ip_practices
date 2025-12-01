<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import MenuBar from '../components/MenuBar.vue'
import ShowCase from '../components/ShowCase.vue'
import CategoryComponent from '../components/CategoryComponent.vue'
import ProductCart from '../components/ProductCart.vue'
import { useProductStore } from '../stores/product'
const burgerImage = new URL('@/assets/burger.png', import.meta.url).href
const peachImage = new URL('@/assets/peach.png', import.meta.url).href
const kiwiImage = new URL('@/assets/kiwi.png', import.meta.url).href
const appleImage = new URL('@/assets/apple.png', import.meta.url).href
const snackImage = new URL('@/assets/snack.png', import.meta.url).href
const blackplumImage = new URL('@/assets/blackplum.png', import.meta.url).href
const vegImage = new URL('@/assets/veg.png', import.meta.url).href
const headphoneImage = new URL('@/assets/headphone.png', import.meta.url).href
const cakemilkImage = new URL('@/assets/cakemilk.png', import.meta.url).href
const orangeImage = new URL('@/assets/orange.png', import.meta.url).href
const onionImage = new URL('@/assets/onion.jpg', import.meta.url).href
const strawberryImage = new URL('@/assets/strawberry.png', import.meta.url).href
const vegsImage = new URL('@/assets/vegs.jpg', import.meta.url).href

export default {
  name: 'HomeView',
  data() {
    return {
      burgerImage,
      peachImage,
      kiwiImage,
      appleImage,
      snackImage,
      blackplumImage,
      vegImage,
      headphoneImage,
      cakemilkImage,
      orangeImage,
      onionImage,
      strawberryImage,
      vegsImage,
      categoryFilter: 'All'
    }
  },
  setup() {
    const productStore = useProductStore()
    return {
      productStore,
    }
  },
  async mounted() {
    await this.productStore.fetchProducts()
  },
  components: {
    HeaderComponent,
    MenuBar,
    ShowCase,
    CategoryComponent,
    ProductCart,
  },
}
</script>

<template>
  <div class="home-view">
    <!-- Header -->
    <HeaderComponent />
    
    <!-- Menu Bar -->
    <MenuBar />
    
    <!-- Showcase / Hero Banner -->
    <ShowCase />

    <!-- Featured Categories Section -->
    <div class="section-header">
      <h2 class="section-title">Featured Categories</h2>
      <div class="category-tabs">
        <span :class="['tab', { active: categoryFilter === 'All' }]" @click="categoryFilter = 'All'">All</span>
        <span :class="['tab', { active: categoryFilter === 'Milks & Dairies' }]" @click="categoryFilter = 'Milks & Dairies'">Milks & Dairies</span>
        <span :class="['tab', { active: categoryFilter === 'Coffes & Teas' }]" @click="categoryFilter = 'Coffes & Teas'">Coffes & Teas</span>
        <span :class="['tab', { active: categoryFilter === 'Pet Foods' }]" @click="categoryFilter = 'Pet Foods'">Pet Foods</span>
        <span :class="['tab', { active: categoryFilter === 'Meats' }]" @click="categoryFilter = 'Meats'">Meats</span>
        <span :class="['tab', { active: categoryFilter === 'Vegetables' }]" @click="categoryFilter = 'Vegetables'">Vegetables</span>
        <span :class="['tab', { active: categoryFilter === 'Fruits' }]" @click="categoryFilter = 'Fruits'">Fruits</span>
      </div>
    </div>
  <div class="category-wrapper">
    <CategoryComponent
      title="Burget&Cake"
      :product-count="12"
      :image="burgerImage"
      bg-color="#70ff44ff"
      :categoryId="1"
    />
    <CategoryComponent title="Peach" :product-count="13" :image="peachImage" bg-color="#FFFCEB" :categoryId="2" />
    <CategoryComponent
      title="Organic Wiki"
      :product-count="13"
      :image="kiwiImage"
      bg-color="#88ff88ff"
      :categoryId="3"
    />
    <CategoryComponent
      title="Red Apple"
      :product-count="14"
      :image="appleImage"
      bg-color="#ffaa8dff"
      :categoryId="4"
    />
    <CategoryComponent title="Snack" :product-count="34" :image="snackImage" bg-color="#FFF3EB" :categoryId="5" />
    <CategoryComponent
      title="Black Plum"
      :product-count="15"
      :image="blackplumImage"
      bg-color="#ffb7ffff"
      :categoryId="6"
    />
    <CategoryComponent
      title="Vegetables"
      :product-count="16"
      :image="vegImage"
      bg-color="#cdff88ff"
      :categoryId="7"
    />
    <CategoryComponent
      title="Headphone"
      :product-count="17"
      :image="headphoneImage"
      bg-color="#ffe341ff"
      :categoryId="8"
    />
    <CategoryComponent
      title="Cake & Milk"
      :product-count="18"
      :image="cakemilkImage"
      bg-color="#e4ffbfff"
      :categoryId="9"
    />
    <CategoryComponent title="Orange" :product-count="22" :image="orangeImage" bg-color="#FFF3FF" :categoryId="10" />
  </div>
  <div class="category-wrapper_big">
    <CategoryComponent
      title="Everyday Fresh & Clean with Our Products"
      :image="onionImage"
      bg-color="#F0E8D5"
      :is-big="true"
    />
    <CategoryComponent
      title="Make your Breakfast Healthy and Easy"
      :image="strawberryImage"
      bg-color="#F3E8E8"
      :is-big="true"
    />
    <CategoryComponent
      title="The best Organic Products Online"
      :image="vegsImage"
      bg-color="#E7EAF3"
      :is-big="true"
    />
  </div>

    <!-- Popular Products Section -->
    <div class="section-header">
      <h2 class="section-title">Popular Products</h2>
      <div class="category-tabs">
        <span class="tab active">All</span>
        <span class="tab">Milks & Dairies</span>
        <span class="tab">Coffes & Teas</span>
        <span class="tab">Pet Foods</span>
        <span class="tab">Meats</span>
        <span class="tab">Vegetables</span>
        <span class="tab">Fruits</span>
      </div>
    </div>
  <div class="category-wrapper">
<ProductCart
  v-for="category in productStore.getProductsWithBadges"
  :key="category.id"
  :productId="category.id"
  :title="category.name"
  :image="'http://localhost:3000/' + category.image"
  :brand="category.brand"
  :price="category.price"
  :oldPrice="category.oldPrice"
  :rating="category.rating"
  :weight="category.size"
  :discount="category.promotionAsPercentage"
  :color="category.color"
/>
  </div>
  </div>
</template>

<style scoped>
.home-view {
  background: #f4f5f7;
  min-height: 100vh;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 40px 20px 40px;
  max-width: 1440px;
  margin: 0 auto;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #253D4E;
  margin: 0;
}

.category-tabs {
  display: flex;
  gap: 30px;
}

.tab {
  font-size: 16px;
  color: #7E7E7E;
  cursor: pointer;
  transition: color 0.3s;
  padding: 5px 0;
}

.tab:hover,
.tab.active {
  color: #3BB77E;
  font-weight: 600;
}

.category-wrapper {
  display: flex;
  flex-direction: row;
  gap: 15px;
  flex-wrap: wrap;
  padding: 20px 40px 40px 40px;
  max-width: 1440px;
  margin: 0 auto;
}

.category-wrapper_big {
  padding: 20px 40px 40px 40px;
  display: flex;
  flex-direction: row;
  gap: 25px;
  max-width: 1440px;
  margin: 0 auto;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .category-wrapper,
  .category-wrapper_big {
    flex-direction: column;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .category-tabs {
    overflow-x: auto;
    width: 100%;
  }
  
  .section-title {
    font-size: 24px;
  }
}
</style>
