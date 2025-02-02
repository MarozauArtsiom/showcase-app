// packages/components/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({
      // Specifies the entry directory for type declarations
      entryRoot: path.resolve(__dirname, 'src/components'),
      // Output directory for type declarations
      outputDir: 'dist',
      // Generates a single declaration file
      rollupTypes: true,
      // Automatically inserts the types entry in package.json
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'ShowcaseLabComponents',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Keep React as external to avoid bundling
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    outDir: 'dist',
    sourcemap: true
  },
  resolve: {
    alias: {
      "@tokens": path.resolve(__dirname, 'src/tokens'),
    }
  }
})
