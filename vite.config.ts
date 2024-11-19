import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@redux": path.resolve(__dirname, "src/redux"),
      "@api": path.resolve(__dirname, "src/api"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@public": path.resolve(__dirname, "public"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@service": path.resolve(__dirname, "src/service"),
      "@interface": path.resolve(__dirname, "src/interface"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  plugins: [react()],  
  define: {
    global: 'globalThis'
  },
})
