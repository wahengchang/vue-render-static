<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-4">Todo System</h1>
    <v-card class="pa-4">
      <v-row>
        <v-col cols="6">
          <p>Total Todos: {{ totalTodos }}</p>
          <p>Total Categories: {{ totalCategories }}</p>
        </v-col>
        <v-col cols="6" class="text-right">
          <v-btn color="error" @click="removeAllTodosAndCategories">
            Clear All Data
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { LocalStorageService } from '../utils/LocalStorageService';

export default {
  data() {
    return {
      totalTodos: 0,
      totalCategories: 0,
    };
  },
  created() {
    this.fetchTotals();
  },
  methods: {
    fetchTotals() {
      this.totalTodos = LocalStorageService.fetchAll('todos').length;
      this.totalCategories = LocalStorageService.fetchAll('categories').length;
    },
    removeAllTodosAndCategories() {
      if (confirm('Are you sure you want to delete all todos and categories?')) {
        LocalStorageService.save('todos', []);
        LocalStorageService.save('categories', []);
        this.fetchTotals();
      }
    },
  },
};
</script>
