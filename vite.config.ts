import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths';

defineConfig({
  plugins: [tsconfigPaths()],
})