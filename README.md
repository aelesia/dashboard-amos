# Package

## Scripts

- "start": "TSC_COMPILE_ON_ERROR=true & PORT=3080 & react-scripts start",
  - React has a bug where it refuses to start due to internal ESLint rules failing
  - TSC_COMPILE_ON_ERROR forces the server to always start
- "test_coverage": "yarn test -- --coverage --watchAll=false --collectCoverageFrom=**/src/utils/**",
  - Only does test coverage for utils folder as UI components will be handled by storybook
- "compile": "tsc --noEmit && yarn lint"
  - Run to ensure that the code has no major problems

# tsconfig

Default settings were used

## Absolute Imports

- Import files using absolute imports such as `src/utils/Sample` instead of `../../src/utils/Sample`
- This makes it easier to move files around

# eslint

- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint
- eslint-config-prettier
- eslint-plugin-prettier
- eslint-plugin-react
- prettier

1) ESLint with Typescript
2) ESLint with Prettier
3) ESLint with React rules

## Rules

- 'prettier/prettier': 'warn'`
  - Prettier is about formatting, and formatting should never throw errors 
- 'react/display-name': 'warn',
  - Not a breaking issue and should not be an error.
- '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  - Not a breaking issue and should not be an error.
- 'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
  - Only console.log should be warned as developers use it to print info but forget to remove it
  - Info, warn & error are usually used explicitly for a good reason
- 'react/prop-types': 'off' // Props are handled by Typescript
  - Proptypes are handled by Typescript

# Prettier

- printWidth: 100
  - 80 is too short. 100 is perfectly readable for anyone with a widescreen monitor.
