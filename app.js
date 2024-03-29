// app.js

const app = Vue.createApp({
    data() {
      return {
        loading: false,
        items: []
      };
    },
    methods: {
      async fetchItems() {
        this.loading = true;
        try {
          const response = await fetch('/items'); // Assuming your backend API endpoint for fetching items is '/items'
          const data = await response.json();
          this.items = data;
        } catch (error) {
          console.error('Error fetching items:', error);
        } finally {
          this.loading = false;
        }
      }
    }
  });
  
  app.mount('#app');
  