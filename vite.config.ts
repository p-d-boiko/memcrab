import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    root: 'src',
    publicDir: '../public', // relative to 'src'
    plugins: [react()],
    server: {
      host: env.HOST,
      port: parseInt(env.PORT, 10),
    },
  }
})
