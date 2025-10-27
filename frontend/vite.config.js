import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  // Load environment variables based on the current mode (development/production)
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    server: {
      proxy: {
        '/api': env.VITE_API_URL, // use the loaded env variable
      },
    },
    plugins: [react()],
  })
}
