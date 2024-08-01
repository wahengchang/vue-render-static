<template>
    <v-toolbar color="blue-grey lighten-3" dark>
      <!-- Flex container for navigation links -->
      <v-toolbar-items class="flex">
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/about">About</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  }
  </script>
  
  <style scoped>
  .flex {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  </style>
  