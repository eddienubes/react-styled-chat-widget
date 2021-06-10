import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import typescript from 'rollup-plugin-typescript2';
import postcss from "rollup-plugin-postcss";
import image from "@rollup/plugin-image";

export const plugins = [
  image(),
  postcss(),
  resolve({
    browser: true,
    preferBuiltins: true,
    extensions: ['.ts', '.tsx'],
  }),
  commonjs({
    include: 'node_modules/**',
  }),
  visualizer({
    filename: 'bundle-analysis.html',
  }),
  typescript(),
];

export const globals = {
  'react': 'React',
  'styled-components': 'Styled',
  'react-dom': 'ReactDom'
}

export default {
  input: './src/lib/index.ts',
  external: ['react', 'react-dom', 'styled-components'],
};

