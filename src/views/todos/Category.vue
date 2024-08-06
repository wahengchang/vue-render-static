<template>
    <v-container>
      <h1>Manage Categories</h1>
      <v-form @submit.prevent="addCategory">
        <v-text-field v-model="newCategory.title" label="Category Name" outlined required></v-text-field>
        <v-btn type="submit" color="primary">Add Category</v-btn>
      </v-form>
  
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="category in categories" :key="category.id">
            <v-list-item-content>
              <v-list-item-title>{{ category.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="deleteCategory(category.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </template>
  
  <script>
  import { LocalStorageService } from '../../utils/LocalStorageService';
  
  export default {
    data() {
      return {
        newCategory: {
          title: ''
        },
        categories: []
      };
    },
    created() {
      this.categories = LocalStorageService.fetchAll('categories');
    },
    methods: {
      addCategory() {
        if (!this.newCategory.title) {
          alert('Category name is required');
          return;
        }
        LocalStorageService.create('categories', this.newCategory);
        this.categories.push({...this.newCategory, id: Date.now(), createdAt: new Date().toISOString()});
        this.newCategory.title = ''; // Clear the input after adding
      },
      deleteCategory(id) {
        LocalStorageService.delete('categories', id);
        this.categories = this.categories.filter(category => category.id !== id);
      }
    }
  }
  </script>
  