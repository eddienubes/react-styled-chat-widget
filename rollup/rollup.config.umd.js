import { terser } from 'rollup-plugin-terser';
import config, { plugins, globals } from './rollup.config.common';

export default Object.assign(config, {
  output: [
    {
      name: 'react-styled-chat-widget',
      file: 'dist/react-styled-chat-widget.umd.js',
      format: 'umd',
      globals,
      exports: 'named',
    },
  ],
  plugins: plugins.concat([terser()]),
});