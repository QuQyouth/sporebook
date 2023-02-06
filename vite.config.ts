import { defineConfig } from 'vite'
import { viteMockServe} from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-nocheck
import { svgstore } from './src/vite_plugins/svgstore';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true
    }),
    svgstore(),
    Components({
      resolvers: [VantResolver()],
    }),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style/index`
        },
      ]
    }),
    viteMockServe({
      mockPath: "./src/mock/data",
      localEnabled: true // 是否开启开发环境
    })
  ],
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://121.196.236.94:8080'
      }
    }
  }
})
