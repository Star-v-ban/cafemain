import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  
  plugins: [
    vue(),
    vuetify({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('v-'),
        },
      },
      styles: {
        configFile: 'src/style.scss',
      },
      
    }),
  ],
})
