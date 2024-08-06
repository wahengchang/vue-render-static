<template>
    <v-container>
      <h1>View Todo</h1>
      <v-card>
        <v-card-title>{{ todo.title }}</v-card-title>
        <v-card-text>{{ todo.description }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" :to="`/todos/edit/${todo.id}`">Edit</v-btn>
          <v-btn color="error" @click="deleteTodo">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { LocalStorageService } from '../../utils/LocalStorageService';
  
  export default {
    data() {
      return {
        todo: null
      };
    },
    created() {
      this.todo = LocalStorageService.findById('todos', parseInt(this.$route.params.id));
    },
    methods: {
      deleteTodo() {
        LocalStorageService.delete('todos', this.todo.id);
        this.$router.push('/todos');
      }
    }
  }
  </script>
  