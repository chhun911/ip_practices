<script>
export default {
  name: 'MenuBar',
  data() {
    return {
      menuItems: [
        { name: 'Hot Deals', icon: '🔥', highlight: true, path: '/' },
        { name: 'Home', path: '/' },
        { name: 'Food', path: '/' },
        { name: 'Vegetables', path: '/categories/7' },
        { name: 'Drink', path: '/' },
        { name: 'Cookies', path: '/' },
        { name: 'Meat & Seafood', path: '/' },
        { name: 'Bakery', path: '/' }
      ]
    }
  }
}
</script>

<template>
  <nav class="menu-bar">
    <div class="menu-content">
      <button class="browse-btn">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h14M3 10h14M3 14h14" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Browse All Categories
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <div class="menu-items">
        <RouterLink 
          v-for="(item, index) in menuItems" 
          :key="index" 
          :class="['menu-item', { 'hot-deals': item.highlight }]"
          :to="item.path"
        >
          <span v-if="item.icon" class="menu-icon">{{ item.icon }}</span>
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.menu-bar {
  background: white;
  border-bottom: 1px solid #ececec;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.menu-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  gap: 30px;
}

.browse-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 25px;
  background: #3BB77E;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.browse-btn:hover {
  background: #2ea06b;
}

.menu-items {
  display: flex;
  align-items: center;
  gap: 30px;
  flex: 1;
}

.menu-item {
  text-decoration: none;
  color: #253D4E;
  font-size: 15px;
  font-weight: 500;
  padding: 15px 0;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.menu-item:hover {
  color: #3BB77E;
}

.menu-item.hot-deals {
  color: #3BB77E;
}

.menu-icon {
  font-size: 18px;
}

@media (max-width: 1024px) {
  .menu-items {
    overflow-x: auto;
    gap: 20px;
  }
  
  .menu-item {
    white-space: nowrap;
  }
}
</style>
