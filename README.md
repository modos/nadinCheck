# nadinCheck

A modern web application built with Nuxt 4, Vue 3, and Vuetify, featuring a task management system with authentication.

## 🚀 Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3)
- **UI Framework**: [Vuetify 3](https://vuetifyjs.com/) & [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [SQLite](https://www.sqlite.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: JWT based
- **Testing**: [Vitest](https://vitest.dev/) (Unit & Server) and [Cypress](https://www.cypress.io/) (E2E)
- **Package Manager**: [Bun](https://bun.sh/)

## 📋 Requirements

- [Bun](https://bun.sh/) (v1.x recommended)
- Node.js (v20.x or later)

## 🛠 Setup & Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd nadinCheck
   ```

2. **Install dependencies**:

   ```bash
   bun install
   ```

3. **Database Setup**:
   The project uses SQLite. The database file `db.sqlite` will be created automatically.
   Run migrations to set up the schema:

   ```bash
   bunx drizzle-kit push
   ```

4. **Environment Variables**:
   Currently, most configurations are hardcoded or use defaults.
   - [ ] TODO: Move `JWT_SECRET` from `server/middleware/auth.ts` and `server/api/login.post.ts` to `.env`.

## 💻 Development Scripts

| Command               | Description                                              |
| :-------------------- | :------------------------------------------------------- |
| `bun run dev`         | Starts the development server on `http://localhost:3000` |
| `bun run build`       | Builds the application for production                    |
| `bun run preview`     | Locally preview the production build                     |
| `bun run generate`    | Static site generation                                   |
| `bun run postinstall` | Runs `nuxt prepare`                                      |

## 🧪 Testing

The project uses Vitest for unit/server tests and Cypress for end-to-end tests.

- **Run all Vitest tests**:
  ```bash
  bun run test
  ```
- **Run Unit tests**:
  ```bash
  bun run test:unit
  ```
- **Run Server tests**:
  ```bash
  bun run test:server
  ```
- **Run E2E tests**:
  ```bash
  bun run test:e2e
  ```

## 📂 Project Structure

```text
├── app/                # Nuxt application directory (Vue files, assets, etc.)
│   ├── assets/         # Global styles and assets
│   ├── components/     # Vue components
│   ├── layouts/        # Page layouts
│   ├── middleware/     # Client-side middleware
│   ├── pages/          # Application routes
│   └── plugins/        # Nuxt plugins
├── server/             # Nitro server-side code
│   ├── api/            # API endpoints
│   ├── db/             # Database schema and configuration
│   └── middleware/     # Server-side middleware (e.g., Auth)
├── test/               # Test suites
│   ├── e2e/            # Cypress E2E tests
│   ├── server/         # Server-side unit tests
│   └── unit/           # Component unit tests
├── drizzle/            # Drizzle migrations
├── public/             # Static public assets
├── i18n/               # Internationalization files
├── cypress.config.ts   # Cypress configuration
├── drizzle.config.ts   # Drizzle configuration
├── nuxt.config.ts      # Nuxt configuration
├── package.json        # Dependencies and scripts
└── vitest.config.ts    # Vitest configuration
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (TODO: Add LICENSE file).
