<template>
  <v-app id="inspire">
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>

    <!-- Secondary navigation bar -->
    <nav-bar></nav-bar>

    <v-main>
      <v-container class="align-center justify-center" style="max-width: 960px;">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from './components/NavComponent.vue'

export default {
  components: {
    NavBar
  },
  data: () => ({
    drawer: false
  }),

  props: {
    source: String
  }
}
</script>
