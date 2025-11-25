<template>
  <div class="product-card">
    <div v-if="parsedDiscount !== null && parsedDiscount !== undefined && parsedDiscount > 0" class="discount-label">
      -{{ parsedDiscount }}%
    </div>

    <img :src="image" class="product-img" alt="Product image" />

    <div class="product-body">
      <p class="brand">{{ brand }}</p>
      <p class="title">{{ title }}</p>

      <div class="rating-row">
        <span class="stars">{{ stars }}</span>
        <span class="rating">({{ rating.toFixed(1) }})</span>
      </div>

      <p class="weight">{{ weight }}</p>

      <div class="price-row">
        <div class="price-section">
          <span class="price">${{ price.toFixed(2) }}</span>
          <span v-if="oldPrice" class="old-price">${{ oldPrice.toFixed(2) }}</span>
        </div>

        <button class="add-btn" @click="addToCart">
          Add <span class="plus-icon">+</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCart',
  props: {
    title: { type: String, default: 'Product Title' },
    image: { type: String, default: '' },
    brand: { type: String, default: 'Hodo Foods' },
    price: { type: Number, default: 2.51 },
    oldPrice: { type: Number, default: null },
    rating: { type: Number, default: 4.0 },
    weight: { type: [Number, String], default: '500 gram' },
    discount: { type: [Number, String], default: null },
    color: { type: String, default: '' },
  },
  computed: {
    stars() {
      const r = Math.max(0, Math.min(5, Math.round(this.rating)))
      const filled = '★'.repeat(r)
      const empty = '☆'.repeat(5 - r)
      return filled + empty
    },
		parsedDiscount() {
      if (typeof this.discount === 'string') {
        return parseFloat(this.discount.replace(',', '.'))
      }
      return this.discount
    },
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart')
    },
  },
}
</script>

<style scoped>
.product-card {
  width: 280px;
  background: #fff;
  border: 2px solid #ececec;
  border-radius: 18px;
  padding: 20px;
  position: relative;
  transition: all 0.5s ease;
}

.product-card:hover {
  border-color: #3bb77e;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.discount-label {
  background: #3bb77e;
  color: white;
  padding: 6px 14px;
  border-radius: 0 20px 20px 0;
  font-size: 13px;
  font-weight: 600;
  position: absolute;
  top: 20px;
  left: 0;
}

.product-img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin: 10px 0;
}

.product-body {
  margin-top: 15px;
}

.brand {
  font-size: 13px;
  color: #adadad;
  margin: 0 0 8px 0;
}

.title {
  font-size: 16px;
  font-weight: 700;
  color: #253D4E;
  margin: 0 0 10px 0;
  line-height: 1.4;
  min-height: 44px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 10px 0;
}

.stars {
  color: #fdc040;
  font-size: 14px;
  letter-spacing: 2px;
}

.rating {
  color: #b6b6b6;
  font-size: 14px;
}

.weight {
  color: #adadad;
  font-size: 14px;
  margin: 10px 0;
}

.price-row {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price {
  color: #3bb77e;
  font-size: 22px;
  font-weight: 700;
}

.old-price {
  text-decoration: line-through;
  color: #adadad;
  font-size: 16px;
}

.add-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  background: #def9ec;
  color: #3bb77e;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.add-btn:hover {
  background: #3bb77e;
  color: white;
}

.plus-icon {
  font-size: 18px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .product-card {
    width: 100%;
    max-width: 320px;
  }
}
</style>
