import { build } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

// libraries
const libraries = [
  {
    entry: './src/index.pc.ts',
    fileName: 'index.pc',
    name: 'xm-web-sdk/pc'
  },
  {
    entry: './src/index.wx.ts',
    fileName: 'index.wx',
    name: 'xm-web-sdk'
  },
];

// build
libraries.forEach(async (libItem) => {
  await build({
    configFile: false,
    plugins: [
      tsconfigPaths(),
      dts({
        include: ['src/index.pc.ts', 'src/global.d.ts'],
        beforeWriteFile: (filePath, content) => ({
          filePath: filePath.replace('index.pc.d.ts', 'index.d.ts'),
          content,
        }),
      })
    ],
    // external: 'react-native',
    build: {
      lib: libItem,
      emptyOutDir: false,
      rollupOptions: {
      },
    },
  });
});