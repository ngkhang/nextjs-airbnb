# INSTALLATION

- [INSTALLATION](#installation)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Configuration](#configuration)
    - [ESLint](#eslint)
      - [Install](#install)
      - [Config](#config)
    - [Prettier](#prettier)
      - [Install](#install-1)
      - [Config](#config-1)
    - [Husky](#husky)
      - [Install](#install-2)
      - [Config](#config-2)
    - [lint-staged](#lint-staged)
      - [Install](#install-3)
      - [Config](#config-3)
    - [Commitlint](#commitlint)
      - [Install](#install-4)
      - [Config](#config-4)
    - [Commitizen](#commitizen)
      - [Install](#install-5)
      - [Config](#config-5)

## Prerequisites

## Environment Setup

## Configuration

### ESLint

- Ref: [ESLint v8.x](https://eslint.org/docs/v8.x/)

#### Install

```bash
# Install
npm install --save-dev eslint

# Plugin
npm install --save-dev eslint-config-prettier eslint-plugin-import
```

#### Config

- `package.json`

  ```json
  "scripts": {
      "lint": "next lint",
      "lint:debug": "eslint ./src --debug",
      "lint:fix": "eslint ./src --fix",
    },
  ```

- `.eslintrc.json`

  ```json
  {
    "extends": [
      "eslint:recommended",
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "plugin:import/recommended"
    ],
    "rules": {
      // eslint-plugin-import
      "import/export": "error",
      "import/order": "error",
      // typescript-eslint
      "@typescript-eslint/no-unused-vars": "off",
      // ESLint
      "arrow-body-style": [
        2,
        "as-needed",
        {
          "requireReturnForObjectLiteral": true
        }
      ],
      "consistent-return": 0,
      "no-unused-vars": [
        1,
        {
          "args": "after-used",
          "argsIgnorePattern": "^_"
        }
      ],
      "no-console": 1,
      "no-lonely-if": 1,
      "no-undefined": 2,
      "no-nested-ternary": 1,
      "no-unexpected-multiline": "warn",
      "prefer-const": 2
    },
    "overrides": [
      {
        "files": ["*.ts", "*.tsx", "*.js"],
        "parser": "@typescript-eslint/parser"
      }
    ]
  }
  ```

- `.eslintignore`

  ```bash
  # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

  dist
  **/.husky/**
  .vscode
  public
  package-lock.json
  package.json

  # dependency directories
  node_modules

  # testing
  /coverage

  # next.js build output
  /.next/
  /out/

  # production
  /build

  # misc
  .DS_Store
  *.pem

  # debug
  logs
  *.log
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*

  # dotenv environment variable files
  .env
  .env*.local

  # typescript cache
  *.tsbuildinfo
  next-env.d.ts

  # vercel
  .vercel
  ```

### Prettier

- Ref: [Prettier](https://prettier.io/)

#### Install

```bash
# Install prettier
npm install --save-dev --save-exact prettier

# Plugin for TailwindCSS
npm install -D prettier prettier-plugin-tailwindcss
```

#### Config

- `package.json`

  ```json
  {
    "scripts": {
      "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,css,scss,md}\"",
      "format:fix": "prettier --write \"**/*.{js,jsx,ts,tsx,css,scss,md}\""
    }
  }
  ```

- `.prettierrc`

  ```json
  {
    "arrowParens": "always",
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 120,
    "tabWidth": 2,
    "endOfLine": "crlf",
    "jsxSingleQuote": true,
    "plugins": ["prettier-plugin-tailwindcss"]
  }
  ```

- `.prettierignore`

  ```bash
  # See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

  dist
  **/.husky/**
  .vscode
  public
  package-lock.json
  package.json

  # dependency directories
  node_modules

  # testing
  /coverage

  # next.js build output
  /.next/
  /out/

  # production
  /build

  # misc
  .DS_Store
  *.pem

  # debug
  logs
  *.log
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*

  # dotenv environment variable files
  .env
  .env*.local

  # typescript cache
  *.tsbuildinfo
  next-env.d.ts

  # vercel
  .vercel
  ```

### Husky

- Ref: [Husky](https://typicode.github.io/husky/)

#### Install

```bash
# Install
npm install --save-dev husky

# Init
npx husky init
```

#### Config

- `package.json`

  ```json
  {
    "scripts": {
      "prepare": "husky || true"
    }
  }
  ```

- `pre-push`

  ```bash
  # Get changed files
  CHANGED_FILES=$(git diff --name-only HEAD^)

  # Check if there are JS/TS files changed
  if echo "$CHANGED_FILES" | grep -q -E '\.(js|jsx|ts|tsx)$'; then
    echo "🔍 JS/TS files changed. Running lint..."
    echo "$CHANGED_FILES" | grep -E '\.(js|jsx|ts|tsx)$' | xargs npx next lint --file || {
        echo "❌ Lint failed. Please fix the errors before pushing."
        exit 1
    }
    echo "✅ Lint passed!"
  else
    echo "⏩ No JS/TS files changed. Skipping lint."
  fi
  ```

### lint-staged

- Refer: [GitHub: Lint-staged](https://github.com/lint-staged/lint-staged)

#### Install

```bash
npm install --save-dev lint-staged
```

#### Config

- `lint-staged.config.mjs`

  ```js
  import { relative } from 'path';

  const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenames.map((f) => relative(process.cwd(), f)).join(' --file ')}`;

  export default {
    'src/**/*.{js,jsx,ts,tsx}': [buildEslintCommand],
    'src/**/*.{js,jsx,ts,tsx,css,scss}': ['prettier --write'],
    '**/*.{json,md}': ['prettier --write'],
  };
  ```

- `.husky/pre-commit`

  ```bash
  npx lint-staged
  ```

### Commitlint

- Refer: [Commitlint.js](https://commitlint.js.org/)

#### Install

```bash
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

#### Config

- `commitlint.config.ts`

  ```ts
  import type { UserConfig } from '@commitlint/types';
  import { RuleConfigSeverity } from '@commitlint/types';
  const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    formatter: '@commitlint/format',
    rules: {
      'type-enum': [
        RuleConfigSeverity.Error,
        'always',
        ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
      ],
    },
    ignores: [(commit) => commit.startsWith('Merge')],
  };

  export default Configuration;
  ```

- Update or create `.husky/commit-msg`

  ```bash
  # Get the commit message
  commit_msg_file="$1"
  commit_msg=$(cat "$commit_msg_file")

  BRANCH=$(git rev-parse --abbrev-ref HEAD)
  REGEX="^(setup|feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-zA-Z0-9-]+\))?: .+"
  MERGE_REGEX="^Merge branch '.*' into .*$"

  # ANSI color codes
  RED='\033[0;31m'
  GREEN='\033[0;32m'
  NC='\033[0m' # No Color

  # Function to print colored text
  print_color() {
    printf "${1}%s${NC}\n" "$2"
  }

  print_color $GREEN "Branch name: $BRANCH"
  print_color $GREEN "Commit message: $commit_msg"

  # Check if it's a merge commit
  if echo "$commit_msg" | grep -qE "$MERGE_REGEX"; then
    print_color $GREEN "Merge commit detected. Allowing without format check."
    exit 0
  fi

  # Check if the branch name matches the required pattern
  if ! echo "$commit_msg" | grep -qE "$REGEX"; then
    print_color $RED "Your commit was rejected due to incorrect commit message format"
    print_color $RED "Please use the format: <type>[optional scope]: <description>"
    print_color $RED "Allowed types: setup, feat, fix, test, refactor, perf, docs, style, build, ci, chore, revert"
    exit 1
  fi

  npx --no -- commitlint --edit "$commit_msg_file"
  ```

### Commitizen

- Ref: [Commitizen](https://github.com/commitizen/cz-cli)

#### Install

```bash
# Install
npm install --save-dev commitizen

# Setup adapter to commitizen works based on commitlint.config.js.
npm install --save-dev @commitlint/cz-commitlint inquirer@9
```

#### Config

- `package.json`

  ```json
  {
    "scripts": {
      "commit": "cz"
    }
  }
  ```

- Update `.czrc` file

  ```json
  {
    "path": "@commitlint/cz-commitlint"
  }
  ```
