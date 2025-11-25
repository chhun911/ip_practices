<script>
export default {
  name: 'ShowCase',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    subscribe() {
      if (this.email) {
        alert('Subscribed with: ' + this.email)
        this.email = ''
      }
    }
  }
}
</script>

<template>
  <div class="showcase">
    <div class="showcase-content">
      <h1 class="showcase-title">Don't miss amazing<br/>grocery deals</h1>
      <p class="showcase-subtitle">Sign up for the daily newsletter</p>
      
      <div class="newsletter-form">
        <div class="input-wrapper">
          <svg class="email-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="#adadad" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 5l-9 7-9-7" stroke="#adadad" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input 
            v-model="email"
            type="email" 
            placeholder="Your email address" 
            class="email-input"
          />
        </div>
        <button @click="subscribe" class="subscribe-btn">Subscribe</button>
      </div>
    </div>
    
    <div class="showcase-image">
      <img src="@/assets/grocery_basket.jpg" alt="Grocery Basket" />
    </div>
  </div>
</template>

<style scoped>
.showcase {
  background: linear-gradient(135deg, #FFF5E6 0%, #FFF9F0 100%);
  border-radius: 10px;
  margin: 40px;
  padding: 60px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: visible;
  background-image: 
    url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="%23E8F5E9"/></svg>'),
    linear-gradient(135deg, #FFF5E6 0%, #FFF9F0 100%);
  background-size: 30px 30px, cover;
}

.showcase-content {
  flex: 1;
  max-width: 500px;
}

.showcase-title {
  font-size: 56px;
  font-weight: 700;
  color: #253D4E;
  line-height: 1.2;
  margin: 0 0 20px 0;
}

.showcase-subtitle {
  font-size: 18px;
  color: #7E7E7E;
  margin: 0 0 40px 0;
}

.newsletter-form {
  display: flex;
  gap: 10px;
  max-width: 450px;
}

.input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 0 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.email-icon {
  margin-right: 10px;
  flex-shrink: 0;
}

.email-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 18px 0;
  font-size: 15px;
  color: #253D4E;
}

.email-input::placeholder {
  color: #adadad;
}

.subscribe-btn {
  padding: 18px 35px;
  background: #3BB77E;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  white-space: nowrap;
}

.subscribe-btn:hover {
  background: #2ea06b;
}

.showcase-image {
  flex-shrink: 0;
  position: relative;
}

.showcase-image img {
  width: 450px;
  height: auto;
  max-height: 450px;
  object-fit: contain;
  border-radius: 10px;
  mix-blend-mode: multiply;
  opacity: 0.95;
  display: block;
}

@media (max-width: 1024px) {
  .showcase {
    flex-direction: column;
    text-align: center;
    padding: 40px;
  }
  
  .showcase-content {
    max-width: 100%;
  }
  
  .showcase-title {
    font-size: 42px;
  }
  
  .newsletter-form {
    margin: 0 auto;
  }
  
  .showcase-image img {
    width: 300px;
    margin-top: 30px;
  }
}
</style>
