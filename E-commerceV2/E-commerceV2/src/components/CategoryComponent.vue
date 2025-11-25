<template>
  <div :class="{ 'container': !isBig, 'container_big': isBig }">
    <div v-if="isBig" class="big-card-content">
      <div class="text-content">
        <h2>{{ title }}</h2>
        <button class="shop-btn">
          Shop Now
          <span class="arrow">→</span>
        </button>
      </div>
      <img :src="image" class="big-image" />
    </div>

    <div v-else class="small-card-content">
      <img :src="image" />
      <h3>{{ title }}</h3>
      <span class="count" v-if="productCount > 0">{{ productCount }} items</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    productCount: {
      type: Number,
      default: 0,
    },
    image: {
      required: true,
    },
    bgColor: {
      type: String,
      default: '#81b13d99'
    },
    isBig: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style scoped>
.container, .container_big {
  border: 1px solid #81b13d;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  transition: all 0.5s ease;
  background-color: v-bind(bgColor);
}

.container:hover {
  border-color: #3bb77e;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.container_big {
  position: relative;
  overflow: hidden;
  min-height: 200px;
  flex: 1;
}

.container_big:hover {
  border-color: #1cfc93;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.big-card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.text-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 2;
}

.text-content h2 {
  font-size: 24px;
  font-weight: bold;
  color: #253D4E;
  line-height: 1.3;
  margin: 0;
  max-width: 250px;
}

.big-image {
  max-width: 45%;
  height: auto;
  object-fit: contain;
  z-index: 1;
}

.shop-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #3BB77E;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  width: fit-content;
}

.shop-btn:hover {
  background-color: #2a9d66;
  transform: translateY(-2px);
}

.arrow {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.shop-btn:hover .arrow {
  transform: translateX(4px);
}

.small-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.count {
  color: #818080;
  font-size: 12px;
}

@media (max-width: 768px) {
  .big-card-content {
    flex-direction: column;
    gap: 15px;
  }

  .big-image {
    max-width: 100%;
  }

  .text-content h2 {
    font-size: 20px;
  }
}
</style>
