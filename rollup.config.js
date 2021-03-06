import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import { terser, } from 'rollup-plugin-terser'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    external({
      includeDependencies: true,
    }),
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs({
      namedExports: {
        react: [
          'createElement',
          'cloneElement',
          'createContext',
          'Children',
          'Component',
          'PureComponent',
          'Fragment',
          'useContext',
          'useReducer',
          'useEffect',
          'useRef',
          'useState',
          'useCallback',
          'useMemo',
          'useLayoutEffect',
          'forwardRef',
          'isValidElement'
        ],
        'prop-types': [
          'array',
          'bool',
          'func',
          'number',
          'object',
          'string',
          'symbol',
          'any',
          'arrayOf',
          'element',
          'elementType',
          'instanceOf',
          'node',
          'objectOf',
          'oneOf',
          'oneOfType',
          'shape',
          'exact'
        ]
      }
    }),
    terser(),
  ]
}
