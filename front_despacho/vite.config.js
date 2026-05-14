// Reemplazar el contenido actual por esto:
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // En producción (Docker), nginx maneja el proxy
  // Este proxy solo aplica en desarrollo local
  server: {
    proxy: {
      '/api/despachos': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^/api/despachos/ '')
      },
      '/api/ventas': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^/api/ventas/ '')
      }
    }
  }
})
