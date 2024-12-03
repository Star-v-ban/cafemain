import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({

  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern',
      },
    },
  },
  
  plugins: [
    vue(),
    vuetify({
      styles: {
        configFile: 'src/style.scss',
      },
      
    }),
  ],
})
