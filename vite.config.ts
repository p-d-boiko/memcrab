import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    root: 'src',
    publicDir: '../public', // relative to 'src'
    plugins: [react(), tsconfigPaths()],
    server: {
      host: env.VITE_HOST,
      port: parseInt(env.VITE_PORT, 10),
    },
  }
})
