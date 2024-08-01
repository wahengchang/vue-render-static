// src/plugins/vuetify.js
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you import the icon CSS

export default createVuetify({
  icons: {
    iconfont: 'mdi', // Specifies which icon set to use
  }
})
