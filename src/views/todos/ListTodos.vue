<template>
  <v-container>
    <v-row align="center" justify="space-between" class="mb-4">
      <h1 class="text-h4 font-weight-bold">My Todos</h1>
      <v-btn color="primary" to="/todos/create" icon small>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn color="primary" to="/todos/categories" small>Category</v-btn>
      <v-btn color="primary" @click="removeAllTodosAndCategories" icon small>
        <v-icon>mdi-delete-sweep</v-icon>
      </v-btn>
    </v-row>

    <v-card v-if="todos.length === 0" class="text-center pa-4">
      <v-icon size="64" color="grey lighten-1">mdi-clipboard-text-outline</v-icon>
      <p class="text-h6 mt-2">No todos yet. Start by adding a new one!</p>
    </v-card>
    <v-list v-else class="mx-0">
      <v-list-item v-for="todo in todos" :key="todo.id" class="mb-2">
        <v-card width="100%" class="border-bottom">
          <v-row no-gutters>
            <v-col cols="12" sm="8" md="9">
              <v-card-title class="px-0 text-h6">
                {{ todo.title }}
                <v-chip :color="getCategoryColor(todo.categoryId)" small class="ml-2">
                  {{ getCategoryName(todo.categoryId) }}
                </v-chip>
              </v-card-title>
              <v-card-text class="px-0">
                <p>{{ todo.description }}</p>
              </v-card-text>
            </v-col>
            <v-col cols="12" sm="4" md="3" class="d-flex align-center justify-end pa-4">
              <v-btn icon @click.stop="toggleComplete(todo)" class="mr-2">
                <v-icon :color="todo.completed ? 'success' : 'grey'">
                  {{ todo.completed ? 'mdi-check-circle' : 'mdi-circle-outline' }}
                </v-icon>
              </v-btn>
              <v-btn icon @click.stop="editTodo(todo.id)" color="primary" class="mr-2">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click.stop="deleteTodo(todo.id)" color="error">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { LocalStorageService } from '../../utils/LocalStorageService';

export default {
  data() {
    return {
      todos: [],
      categories: []
    };
  },
  created() {
    this.fetchTodos();
    this.categories = LocalStorageService.fetchAll('categories');
  },
  methods: {
    fetchTodos() {
      this.todos = LocalStorageService.fetchAll('todos');
    },
    editTodo(id) {
      this.$router.push(`/todos/edit/${id}`);
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      LocalStorageService.delete('todos', id);
    },
    toggleComplete(todo) {
      todo.completed = !todo.completed;
      LocalStorageService.update('todos', todo.id, todo);
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.id === categoryId);
      return category ? category.title : 'Uncategorized';
    },
    getCategoryColor(categoryId) {
      // Implement a method to return a color based on the category
      // For example: return ['primary', 'secondary', 'accent'][categoryId % 3];
    }
  }
};
</script>