import {terser} from 'rollup-plugin-terser';
import pkg from '../package.json';

import config, {plugins, globals} from './rollup.config.common';

export default Object.assign(config, {
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: false,
      globals
    },
  ],
  plugins: plugins.concat([terser()]),
});