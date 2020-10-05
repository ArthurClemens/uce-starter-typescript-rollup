import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const { NODE_ENV = 'development' } = process.env;
const isProduction = NODE_ENV === 'production';
const NAME = 'testUce';
const INPUT_DIR = 'src';
const INPUT = `${INPUT_DIR}/index.ts`;
const OUTPUT_DIR = 'dist';
const BUNDLE_NAME = `${OUTPUT_DIR}/bundle.js`;
const DEV_PORT = 3000;
const FORMAT = 'umd';
const SOURCEMAP = isProduction ? false : 'inline';

export default {
  input: INPUT,

  output: {
    sourcemap: SOURCEMAP,
    format: FORMAT,
    name: NAME,
    file: BUNDLE_NAME,
  },

  plugins: [
    resolve(),
    commonjs(),
    typescript(),

    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              chrome: '58',
              ie: '11',
            },
          },
        ],
      ],
    }),

    !isProduction &&
      serve({
        contentBase: [OUTPUT_DIR],
        port: DEV_PORT,
      }),

    !isProduction &&
      livereload({
        watch: [INPUT_DIR, OUTPUT_DIR],
      }),

    isProduction && terser(),

    isProduction && sizeSnapshot(),
  ].filter(Boolean),

  context: 'null',
  moduleContext: 'null',
};
