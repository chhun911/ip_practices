<template>
  <div class="promo" :style="{ backgroundColor }">
    <div class="promo-text">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>

      <ButtonComponent :text="buttonText" :color="buttonColor" />
    </div>

    <img class="promo-img" :src="image" :alt="title" />
  </div>
</template>

<script>
import ButtonComponent from "./ButtonComponent.vue";

export default {
  name: "PromotionComponent",
  components: { ButtonComponent },
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    backgroundColor: { type: String, default: "#F0F5E8" },
    buttonText: { type: String, default: "Shop Now" },
    buttonColor: { type: String, default: "#6BB537" }
  }
}
</script>

<style scoped>
.promo {
  width: 100%;
  min-height: 250px;
  border-radius: 12px;
  padding: 40px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.promo-text {
  max-width: 55%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.promo-text h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.3;
}
.promo-text p {
  margin: 0;
  color: #666;
  font-size: 16px;
  line-height: 1.5;
}
.promo-img {
  width: 280px;
  height: 280px;
  object-fit: contain;
}
</style>
