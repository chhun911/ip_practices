<template>
    <div class="search-box">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            @input="onSearch"
            class="search-input"
        />
        <button @click="onSearch" class="search-button">
            <span class="search-icon">🔍</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'SearchBoxComponent',
    data() {
        return {
            searchQuery: ''
        }
    },
    methods: {
        onSearch() {
            this.$emit('search', this.searchQuery)
        }
    }
}
</script>

<style scoped>
.search-box {
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 500px;
    width: 100%;
}

.search-input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
}

.search-input:focus {
    border-color: #007bff;
}

.search-button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.search-button:hover {
    background-color: #0056b3;
}

.search-icon {
    font-size: 16px;
}
</style>