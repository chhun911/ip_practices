<script>
import CategoryComponent from './components/CategoryComponent.vue'
import PromotionComponent from './components/PromotionComponent.vue'
const burgerImage = new URL('@/assets/burger.png', import.meta.url).href
const peachImage = new URL('@/assets/peach.png', import.meta.url).href
const kiwiImage = new URL('@/assets/kiwi.png', import.meta.url).href
const redappleImage = new URL('@/assets/redapple.png', import.meta.url).href
const blackPlumImage = new URL('@/assets/BlackPlum.png', import.meta.url).href
const orangeImage = new URL('@/assets/orange.png', import.meta.url).href
const snacksImage = new URL('@/assets/Snacks.png', import.meta.url).href
const vegetableImage = new URL('@/assets/vegetable.png', import.meta.url).href
const headphoneImage = new URL('@/assets/headphone.png', import.meta.url).href
const cakeandmilkImage = new URL('@/assets/cakeandmilk.png', import.meta.url).href
const onionImage = new URL('@/assets/onion.png', import.meta.url).href
const strawberryImage = new URL('@/assets/strawberry.png', import.meta.url).href
const vegsImage = new URL('@/assets/vegs.png', import.meta.url).href
export default {
  name: 'App',
  data() {
    return {
      burgerImage,
      peachImage,
      kiwiImage,
      redappleImage,
      blackPlumImage,
      orangeImage,
      snacksImage,
      vegetableImage,
      headphoneImage,
      cakeandmilkImage,
      onionImage,
      strawberryImage,
      vegsImage,
    }
  },
  components: {
    CategoryComponent,
    PromotionComponent,
  },
}
</script>

<template>
  <div class="app-container">
    <div class="category-wrapper">
      <CategoryComponent title="Burger & Cake" :product-count="14" :image="burgerImage" />
      <CategoryComponent title="Peach" :product-count="13" :image="peachImage" background-color="#FFB6C1" />
      <CategoryComponent title="Organic Wiki" :product-count="15" :image="kiwiImage" background-color="#ADD8E6" />
      <CategoryComponent title="Red Apple" :product-count="10" :image="redappleImage" background-color="#FFA07A" />
      <CategoryComponent title="Black Plum" :product-count="12" :image="blackPlumImage" background-color="#DDA0DD" />
      <CategoryComponent title="Orange" :product-count="18" :image="orangeImage" background-color="#FFD700" />
      <CategoryComponent title="Snacks" :product-count="20" :image="snacksImage" background-color="#F0E68C" />
      <CategoryComponent title="Vegetable" :product-count="16" :image="vegetableImage" background-color="#90EE90" />
      <CategoryComponent title="Headphone" :product-count="8" :image="headphoneImage" background-color="#B0C4DE" />
      <CategoryComponent title="Cake & Milk" :product-count="11" :image="cakeandmilkImage" background-color="#FFE4E1" />
    </div>

    <div class="promotion-wrapper">
      <PromotionComponent 
        title="Everyday Fresh & Clean with Our Products"
        description=""
        :image="onionImage"
        background-color="#F0F5E8"
        button-color="#6BB537"
      />
      <PromotionComponent 
        title="Make your Breakfast Healthy and Easy"
        description=""
        :image="strawberryImage"
        background-color="#FFF3F0"
        button-color="#6BB537"
      />
      <PromotionComponent 
        title="The best Organic Products Online"
        description=""
        :image="vegsImage"
        background-color="#F0F8FF"
        button-color="#FFC107"
      />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.promotion-wrapper {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.category-wrapper {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
</style>