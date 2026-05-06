import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 'Todo-list' tamara GitHub repository nu naam che. 
  // Aa line add karvi jaruri che.
  base: '/Todo-list/', 
  plugins: [react()],
})