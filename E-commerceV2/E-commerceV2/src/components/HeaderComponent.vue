<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      selectedCategory: 'All Categories'
    }
  }
}
</script>

<template>
  <header class="header-container">
    <div class="header-content">
      <!-- Logo -->
      <div class="logo">
        <img src="@/assets/melon_logo.jpg" alt="Melon Logo" class="logo-img" />
        <div class="logo-text">
          <span class="logo-title">Melon</span>
          <span class="logo-subtitle">MART & GROCERY</span>
        </div>
      </div>

      <!-- Search Box -->
      <div class="search-box">
        <select v-model="selectedCategory" class="category-dropdown">
          <option>All Categories</option>
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Meat & Seafood</option>
          <option>Bakery</option>
          <option>Drink</option>
          <option>Cookies</option>
        </select>
        <div class="search-divider"></div>
        <input type="text" placeholder="Search for items..." class="search-input" />
        <button class="search-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Right Actions -->
      <div class="header-actions">
        <button class="action-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" stroke="currentColor" stroke-width="2"/>
            <path d="M10 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Compare</span>
        </button>
        <button class="action-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.1 3.6c-1.5-1.8-4-1.8-5.5 0-1.5 1.7-1.5 4.5 0 6.2l5.5 5.5 5.5-5.5c1.5-1.7 1.5-4.5 0-6.2-1.5-1.8-4-1.8-5.5 0z" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>Wishlist</span>
        </button>
        <button class="action-btn cart-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM1 1h3l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L22 6H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Cart</span>
        </button>
        <button class="account-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 17v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Account</span>
        </button>
      </div>

      <!-- Phone Number -->
      <div class="phone-number">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 13v3a2 2 0 0 1-2.22 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 0 .22 2 2 0 0 1 2 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L5.09 8.8a16 16 0 0 0 6 6l2.16-2.16a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 18 13z" fill="#3BB77E"/>
        </svg>
        <span class="phone-text">1900 - 8888</span>
        <span class="phone-label">24/7 Support Center</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-container {
  background: white;
  border-bottom: 1px solid #ececec;
  padding: 20px 0;
}

.header-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  gap: 30px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
}

.logo-img {
  width: 50px;
  height: 50px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: 32px;
  font-weight: bold;
  color: #3BB77E;
  line-height: 1;
}

.logo-subtitle {
  font-size: 10px;
  font-weight: 600;
  color: #253D4E;
  letter-spacing: 2px;
}

.search-box {
  flex: 1;
  max-width: 600px;
  display: flex;
  align-items: center;
  border: 2px solid #3BB77E;
  border-radius: 5px;
  overflow: hidden;
  background: white;
}

.category-dropdown {
  padding: 12px 15px;
  border: none;
  background: white;
  font-size: 14px;
  color: #253D4E;
  cursor: pointer;
  outline: none;
  min-width: 140px;
}

.search-divider {
  width: 1px;
  height: 30px;
  background: #ececec;
}

.search-input {
  flex: 1;
  padding: 12px 15px;
  border: none;
  outline: none;
  font-size: 14px;
}

.search-input::placeholder {
  color: #adadad;
}

.search-button {
  padding: 12px 20px;
  background: transparent;
  border: none;
  color: #7E7E7E;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.search-button:hover {
  color: #3BB77E;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: #253D4E;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.action-btn:hover {
  color: #3BB77E;
}

.action-btn svg {
  color: #7E7E7E;
}

.account-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: #253D4E;
  font-size: 14px;
  cursor: pointer;
}

.phone-number {
  display: flex;
  align-items: center;
  gap: 8px;
}

.phone-text {
  font-size: 24px;
  font-weight: bold;
  color: #3BB77E;
}

.phone-label {
  font-size: 12px;
  color: #7E7E7E;
}

@media (max-width: 1200px) {
  .header-content {
    flex-wrap: wrap;
  }
  
  .search-box {
    order: 3;
    width: 100%;
    max-width: 100%;
  }
}
</style>
