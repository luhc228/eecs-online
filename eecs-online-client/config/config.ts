import { IConfig } from 'umi-types';
import theme from './theme';

// ref: https://umijs.org/config/
import routeConfig from './routeConfig';

const config: IConfig = {
  treeShaking: true,
  routes: routeConfig,
  history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'EECS在线判分系统',
        dll: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  // antd basic styles configs
  theme,
  // build outputpath
  outputPath: './build',
  // proxy
  proxy: {
    '/api': {
      target: 'http://47.97.215.154:8000/',
      changeOrigin: true,
      enable: true,
    }
  }
};

export default config;
