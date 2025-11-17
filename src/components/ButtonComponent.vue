<template>
  <button class="btn" :style="{ backgroundColor: color }">
    {{ text }}
    <span class="arrow">→</span>
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    text: {
      type: String,
      default: 'Shop Now'
    },
    color: {
      type: String,
      default: '#6BB537'
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.3s;
}

.btn:hover {
  opacity: 0.9;
}

.arrow {
  font-size: 16px;
  font-weight: bold;
}
</style>
