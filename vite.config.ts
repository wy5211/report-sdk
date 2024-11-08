import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  // plugins: [
  //   tsconfigPaths(),
  //   // dts({
  //   //   rollupTypes: true,
  //   // })
  // ],
  // build: {
  //   lib: {
  //     name: 'xm-web-sdk',
  //     entry: [
  //       // 'src/index.rn.ts',
  //       'src/index.wx.ts',
  //       // 'src/index.pc.ts',
  //     ],
  //   },
  //   rollupOptions: {
  //     external: 'react-native',
  //     output: {
  //       manualChunks: {}
  //     }
  //   }
  // }
})