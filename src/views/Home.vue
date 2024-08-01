<!-- src/views/Home.vue -->
<template>
    <div class="home-container">
      <h1>Home Page</h1>
      <p>Welcome to the Home Page.</p>
      <v-btn color="primary">Click me</v-btn>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'Home'
  })
  </script>
  
  <style scoped>
  .home-container {
    padding: 20px;
    text-align: center;
    background-color: #f5f5f5; /* Light grey background */
  }
  h1 {
    margin-bottom: 15px;
    color: #1976D2; /* Echoing the primary color for consistency */
  }
  p {
    font-size: 16px;
    line-height: 1.5;
    color: #424242;
  }
  .v-btn {
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }
  .v-btn:hover {
    background-color: #0D47A1; /* Darker shade when hovered */
  }
  </style>
  