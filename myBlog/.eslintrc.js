// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0,
    'quotes': 0,
    'comma-dangle': [2, 'never'],
    'no-param-reassign': 0,
    'prefer-const':0,
    'consistent-return': 0,
    'no-use-before-define':0,
    'no-unused-vars':0,
    'object-curly-spacing':0,
    'arrow-parens':0,
    'no-shadow':0,
    'arrow-body-style':0,
    'no-multi-assign':0,
    'no-useless-escape ':0,
    'prefer-template':0,
    'prefer-default-export': 0,
    'no-underscore-dangle': 0
  }
}
