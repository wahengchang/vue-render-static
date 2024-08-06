<template>
    <v-container>
      <h1>Create Todo</h1>
      <v-form @submit.prevent="addTodo">
        <v-text-field v-model="newTodo.title" label="Todo Title" outlined required></v-text-field>
        <v-textarea v-model="newTodo.description" label="Description" outlined></v-textarea>
        <v-select :items="categories" v-model="newTodo.categoryId" item-text="title" item-value="id" label="Select Category"></v-select>
        <v-btn type="submit" color="primary">Add Todo</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import { LocalStorageService } from '../../utils/LocalStorageService';
  
  export default {
    data() {
      return {
        newTodo: {
          title: '',
          description: '',
          categoryId: null
        },
        categories: []
      };
    },
    created() {
      this.categories = LocalStorageService.fetchAll('categories');
    },
    methods: {
      addTodo() {
        if (!this.newTodo.title) {
          alert('Title is required');
          return;
        }
        LocalStorageService.create('todos', this.newTodo);
        this.$router.push('/todos');
      }
    }
  }
  </script>
  