# ARCHITECTURE

## Overview Project Structure

```md
.
├── .github/
├── .husky
├── .vscode
├── docs/
├── public/
├── src/
│ ├── app/ # Routing
│ ├── assets/ # Container fonts, styles in Global
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Custom hooks
│ ├── lib/ # Setup and config for lib
│ ├── locales/ # Container static contents
│ ├── middleware/ # Request/response middleware
│ ├── schemas/ # Zod schemas
│ ├── services/ # API services, external integrations
│ ├── store/ # State management for Zustand
│ ├── types/ # TypeScript types/interfaces
│ └── utils/ # Utility functions, constants and configurations
├── .czrc
├── .env
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── commitlint.config.ts
├── components.json
├── lint-staged.config.js
├── next.config.mjs
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```
