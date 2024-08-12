<template>
  <v-container>
    <v-row align="right" class="mb-4">
      <h1 class="text-h4 font-weight-bold">My Todos</h1>
    </v-row>
    <v-row align="right" class="mb-4">
      <v-btn class="mx-1" color="primary text-caption" to="/todos/create" small prepend-icon="mdi-plus-circle">
        Todo
      </v-btn>
      <v-btn class="mx-1" color="primary text-caption" to="/todos/categories" small prepend-icon="mdi-plus-circle">
        Category
      </v-btn>
    </v-row>

    <div class="category-selection">
      <label for="category" class="category-label">Select Category:</label>
      <div class="custom-select">
        <select v-model="selectedCategory" @change="applyFilter" id="category" class="category-select">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.title }}
          </option>
        </select>
        <span class="select-arrow"></span>
      </div>
    </div>


    <v-card v-if="filteredTodos.length === 0" class="text-center pa-4">
      <v-icon size="64" color="grey lighten-1">mdi-clipboard-text-outline</v-icon>
      <p class="text-h6 mt-2">No todos{{ selectedCategory ? ' in this category' : '' }} yet. Start by adding a new one!</p>
    </v-card>
    <v-list v-else class="mx-0">
      <v-list-item v-for="todo in paginatedTodos" :key="todo.id" class="mb-2">
        <v-card width="100%" class="border-bottom">
          <v-row no-gutters>
            <v-col cols="12" sm="8" md="9">
              <v-card-title class="px-0 text-h6">
                {{ todo.title }}
                <v-chip :color="getCategoryColor(todo.categoryId)" small class="ml-2" @click="applyFilter(todo.categoryId)">
                  {{ getCategoryName(todo.categoryId) }}
                </v-chip>
              </v-card-title>
              <v-card-text class="px-0">
                <p>{{ todo.description.length > 100 ? todo.description.slice(0, 100) + '...' : todo.description }}</p>
              </v-card-text>
            </v-col>
            <v-col cols="12" sm="4" md="3" class="d-flex align-center justify-end pa-4">
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
      categories: [],
      selectedCategory: '',
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    filteredTodos() {
      if (this.selectedCategory) {
        return this.todos.filter(todo => todo.categoryId == this.selectedCategory);
      }
      return this.todos;
    },
    paginatedTodos() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredTodos.slice(start, end);
    },
  },
  created() {
    this.fetchTodos();
    this.fetchCategories();
    this.initializeFromQuery();
  },
  methods: {
    fetchTodos() {
      this.todos = LocalStorageService.fetchAll('todos');
    },
    fetchCategories() {
      this.categories = LocalStorageService.fetchAll('categories');
    },
    initializeFromQuery() {
      const categoryId = this.$route.query.category;
      if (categoryId) {
        this.selectedCategory = categoryId;
      }
    },
    applyFilter(_selectedCategoryId) {      
      let categoryId;
      
      if (typeof _selectedCategoryId === 'object' && _selectedCategoryId !== null) {
        categoryId = _selectedCategoryId.target ? _selectedCategoryId.target.value : _selectedCategoryId;
      } else {
        categoryId = _selectedCategoryId;
      }
      const finalCategoryId = categoryId !== undefined ? categoryId : this.selectedCategory;

      if (finalCategoryId) {
        this.$router.push({ query: { category: finalCategoryId } });
      } else {
        this.$router.push({ query: {} });
      }
      this.selectedCategory = finalCategoryId || '';
    },
    editTodo(id) {
      this.$router.push(`/todos/edit/${id}`);
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      LocalStorageService.remove('todos', id);
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.id === categoryId);
      return category ? category.title : 'Uncategorized';
    },
    getCategoryColor(categoryId) {
      // Implement a method to return a color based on the category
      // For example: return ['primary', 'secondary', 'accent'][categoryId % 3];
    },
  },
  watch: {
    '$route.query.category': {
      handler(newCategoryId) {
        this.selectedCategory = newCategoryId || '';
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.category-selection {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.category-label {
  font-weight: bold;
  margin-right: 10px;
  color: #333;
}
.custom-select {
  position: relative;
  display: inline-block;
}
.category-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 30px 8px 10px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  width: 200px;
}
.category-select:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}
.select-arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #333;
  pointer-events: none;
}
</style>