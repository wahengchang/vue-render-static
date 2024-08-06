<template>
    <v-container>
      <h1>Edit Todo</h1>
      <v-form @submit.prevent="updateTodo">
        <v-text-field v-model="todo.title" label="Update Todo" outlined required></v-text-field>
        <v-textarea v-model="todo.description" label="Description" outlined></v-textarea>
        <v-select :items="categories" v-model="todo.categoryId" item-text="title" item-value="id" label="Select Category"></v-select>
        <v-btn type="submit" color="primary">Update Todo</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import { LocalStorageService } from '../../utils/LocalStorageService';
  
  export default {
    data() {
      return {
        todo: null,
        categories: []
      };
    },
    created() {
      this.todo = LocalStorageService.findById('todos', parseInt(this.$route.params.id));
      this.categories = LocalStorageService.fetchAll('categories');
    },
    methods: {
      updateTodo() {
        if (!this.todo.title) {
          alert('Title is required');
          return;
        }
        LocalStorageService.update('todos', this.todo.id, this.todo);
        this.$router.push('/todos');
      }
    }
  }
  </script>
  