import { IConfig } from 'umi-types';
import theme from './theme';
import routeConfig from './routeConfig';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes: routeConfig,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
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
    }],
  ],
  // antd basic styles configs
  theme,
}

export default config;
