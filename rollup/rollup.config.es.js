import {terser} from 'rollup-plugin-terser';
import pkg from '../package.json';

import config, {plugins, globals} from './rollup.config.common';

export default Object.assign(config, {
  output: [
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      globals
    },
  ],
  plugins: plugins.concat([terser()]),
});