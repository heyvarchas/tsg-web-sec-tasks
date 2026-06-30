# Digital Inventory Management System (DIMS)

![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)
![License](https://img.shields.io/badge/License-MIT-yellow)

A full-stack Digital Inventory Management System for managing assets, issuing and returning inventory, and tracking activity through audit logs. The backend exposes a REST API built with Express and MongoDB/Mongoose, while the frontend provides a lightweight React dashboard for login, asset browsing, and issuance workflows. QR codes are generated for assets when they are created.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Architecture Overview](#architecture-overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Scripts](#scripts)
- [Important Dependencies](#important-dependencies)
- [Design Decisions / Project Structure](#design-decisions--project-structure)
- [Screenshots / Demo](#screenshots--demo)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Project Overview

DIMS is split into two services: a Node.js/Express backend and a React/Vite frontend. The backend owns authentication, asset management, issuance/return logic, and audit logging. The frontend consumes the API through `fetch`, stores the JWT in `localStorage`, and uses role-aware UI behavior to separate regular users from admins.

## Key Features

- JWT-based authentication with password hashing using bcrypt.
- Role-based access control with `user` and `admin` roles.
- Asset CRUD endpoints with search, category/status filtering, and pagination support.
- QR code generation for newly created assets.
- Asset issuance and return workflow with status transitions.
- Audit log endpoints for tracking issued and returned assets.
- User management endpoints for admins.
- A React dashboard for login, browsing assets, issuing assets, returning assets, and viewing audit logs.
- Docker support for running MongoDB, backend, and frontend together.

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (`jsonwebtoken`)
- `bcryptjs`
- `qrcode`
- `cors`
- `dotenv`
- `nodemon` for development

### Frontend
- React 19
- React Router
- Vite
- Oxlint

### Infrastructure
- Docker
- Docker Compose

## Folder Structure

```text
task-02-backend/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── Dockerfile
│   ├── .env.example
│   ├── db/
│   │   └── seed.js
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── middleware/
│       │   ├── auth.js
│       │   ├── errorHandler.js
│       │   └── rbac.js
│       ├── modules/
│       │   ├── auth/
│       │   │   ├── auth.controller.js
│       │   │   ├── auth.model.js
│       │   │   ├── auth.routes.js
│       │   │   └── auth.service.js
│       │   ├── users/
│       │   │   ├── user.controller.js
│       │   │   ├── user.routes.js
│       │   │   └── user.service.js
│       │   ├── assets/
│       │   │   ├── asset.controller.js
│       │   │   ├── asset.model.js
│       │   │   ├── asset.routes.js
│       │   │   └── asset.service.js
│       │   ├── issuance/
│       │   │   ├── issuance.controller.js
│       │   │   ├── issuance.model.js
│       │   │   ├── issuance.routes.js
│       │   │   └── issuance.service.js
│       │   └── audit/
│       │       ├── audit.controller.js
│       │       ├── audit.model.js
│       │       ├── audit.routes.js
│       │       └── audit.service.js
│       └── utils/
│           └── logger.js
├── docker-compose.yml
└── frontend/
    ├── Dockerfile
    ├── README.md
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── App.jsx
        ├── App.css
        ├── index.css
        ├── main.jsx
        ├── assets/
        │   ├── hero.png
        │   ├── react.svg
        │   └── vite.svg
        └── pages/
            ├── Dashboard.jsx
            └── Login.jsx
```

### What the major folders do

- `backend/src/config` — database connection setup.
- `backend/src/middleware` — JWT protection, admin-only authorization, and error handling.
- `backend/src/modules/auth` — user model plus register/login endpoints.
- `backend/src/modules/users` — admin-only user management.
- `backend/src/modules/assets` — asset CRUD, searching/filtering, and QR code generation.
- `backend/src/modules/issuance` — issue/return workflow and history queries.
- `backend/src/modules/audit` — audit log storage and retrieval.
- `backend/src/utils` — request logging helper.
- `backend/db` — seed script for initial demo data.
- `frontend/src/pages` — UI screens for login and dashboard.
- `frontend/src` — router setup, entry point, and global styling.

## Architecture Overview

The backend follows a modular MVC-style structure:

1. **Routes** define the HTTP paths.
2. **Controllers** read request data and call service methods.
3. **Services** contain the business logic and coordinate between models.
4. **Models** define MongoDB schemas through Mongoose.

Communication between modules is explicit and service-driven. For example, the issuance service updates the `Asset` model, creates an `Issuance` record, and then writes an audit entry through the audit service. Authentication middleware verifies JWTs on protected routes, and the RBAC middleware blocks non-admin users from admin-only actions.

The frontend talks to the backend with `fetch` requests. After login, it stores the token, role, and user ID in `localStorage`, then sends the token in the `Authorization: Bearer <token>` header for protected API requests. The dashboard uses simple tab-based navigation to switch between assets, issuances, and audit logs.

## Installation

### Prerequisites

- Node.js 20+ recommended
- npm
- MongoDB running locally or a MongoDB Atlas connection string
- Docker and Docker Compose (optional, but supported)

### Local setup without Docker

1. Clone the repository and move into it.
   ```bash
   git clone https://github.com/heyvarchas/tsg-web-sec-tasks.git
   cd task-02-backend
   ```

2. Start MongoDB locally or prepare a MongoDB Atlas cluster.

3. Set up the backend.
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB and JWT values.

5. Seed demo data (optional, but useful for testing).
   ```bash
   npm run db:seed
   ```

6. Start the backend in development mode.
   ```bash
   npm run dev
   ```

7. In a separate terminal, start the frontend.
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

8. Open the frontend at the Vite URL shown in the terminal, usually:
   ```bash
   http://localhost:5173
   ```

### Docker setup

From the repository root:

```bash
docker compose up --build
```

This starts:
- MongoDB on `localhost:27017`
- Backend on `http://localhost:3000`
- Frontend on `http://localhost:5173`

## Configuration

### Backend environment variables

Create `backend/.env` from `backend/.env.example`.

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `PORT` | No | `3000` | Port used by the Express server. |
| `MONGODB_URI` | Yes | None | MongoDB connection string. |
| `JWT_SECRET` | Yes | None | Secret used to sign and verify JWTs. |
| `JWT_EXPIRES_IN` | No | `7d` | JWT expiration time. |
| `BCRYPT_ROUNDS` | No | `10` | Password hashing cost used by bcrypt. |

### Frontend environment variables

The frontend reads the API base URL from Vite environment variables.

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `VITE_API_URL` | No | `http://localhost:3000` | Base URL for backend API requests. |

Example:

```bash
# frontend/.env
VITE_API_URL=http://localhost:3000
```

## Usage

### Seeded demo accounts

If you run `npm run db:seed`, the project creates these demo users:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@dims.com` | `admin123` |
| User | `john@dims.com` | `user1234` |

### Typical workflow

1. Log in through the frontend.
2. Browse assets in the dashboard.
3. Admin users can issue available assets to users.
4. Admin users can return active issuances.
5. Audit logs show issuance and return activity.

### Health check

```bash
GET /health
```

Returns a simple status response confirming that the API is running.

## API Endpoints

Base URL: `http://localhost:3000`

### Auth

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | No | Register a new user. |
| `POST` | `/api/auth/login` | No | Log in and receive a JWT. |

### Users

| Method | Endpoint | Auth | Role | Purpose |
| --- | --- | --- | --- | --- |
| `GET` | `/api/users` | Yes | Admin | List users with optional role filtering. |
| `GET` | `/api/users/:id` | Yes | Admin | Get a user by ID. |
| `PUT` | `/api/users/:id` | Yes | Admin | Update a user (password and role are ignored by the service). |
| `DELETE` | `/api/users/:id` | Yes | Admin | Delete a user. |

### Assets

| Method | Endpoint | Auth | Role | Purpose |
| --- | --- | --- | --- | --- |
| `GET` | `/api/assets` | Yes | Any authenticated user | List assets with `search`, `category`, `status`, `page`, and `limit` query support. |
| `GET` | `/api/assets/:id` | Yes | Any authenticated user | Get a single asset by ID. |
| `POST` | `/api/assets` | Yes | Admin | Create an asset and generate its QR code. |
| `PUT` | `/api/assets/:id` | Yes | Admin | Update an asset. |
| `DELETE` | `/api/assets/:id` | Yes | Admin | Delete an asset. |

### Issuances

| Method | Endpoint | Auth | Role | Purpose |
| --- | --- | --- | --- | --- |
| `POST` | `/api/issuances` | Yes | Admin | Issue an available asset to a user. |
| `PATCH` | `/api/issuances/:id/return` | Yes | Admin | Mark an issuance as returned and set the asset back to `available`. |
| `GET` | `/api/issuances` | Yes | Admin | List active issuances. |
| `GET` | `/api/issuances/user/:userId` | Yes | Any authenticated user | List issuance history for a user. |

### Audit

| Method | Endpoint | Auth | Role | Purpose |
| --- | --- | --- | --- | --- |
| `GET` | `/api/audit` | Yes | Admin | List audit log entries. |
| `GET` | `/api/audit/asset/:assetId` | Yes | Admin | List audit log entries for a specific asset. |

## Scripts

### Backend (`backend/package.json`)

| Script | Command | Description |
| --- | --- | --- |
| `start` | `node server.js` | Starts the backend in production mode. |
| `dev` | `nodemon server.js` | Starts the backend with auto-reload for development. |
| `db:seed` | `node db/seed.js` | Seeds demo users and assets into MongoDB. |

### Frontend (`frontend/package.json`)

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `vite` | Starts the Vite dev server. |
| `build` | `vite build` | Builds the production frontend bundle. |
| `lint` | `oxlint` | Runs the Oxlint linter. |
| `preview` | `vite preview` | Serves the built frontend locally. |

## Important Dependencies

### Backend

- `express` — HTTP server and routing.
- `mongoose` — MongoDB ODM.
- `jsonwebtoken` — JWT creation and validation.
- `bcryptjs` — Password hashing and comparison.
- `qrcode` — Generates QR code data URLs for assets.
- `cors` — Enables cross-origin requests from the frontend.
- `dotenv` — Loads environment variables from `.env`.
- `nodemon` — Dev-time server reloads.

### Frontend

- `react` and `react-dom` — UI runtime.
- `react-router-dom` — Client-side routing and protected route navigation.
- `vite` — Dev server and production build tool.
- `oxlint` — Linting.

> Note: `uuid` appears in `backend/package.json`, but it is not imported by the provided source files.

## Design Decisions / Project Structure

- The backend is organized by feature modules rather than by file type alone, which keeps auth, assets, issuances, audit, and users isolated from each other.
- Services own the business rules, so controllers stay thin and easy to read.
- The issuance service coordinates multiple collections in one place: it checks asset availability, creates an issuance record, updates asset status, and writes audit history.
- QR codes are stored as base64 data URLs in MongoDB instead of as separate image files.
- The frontend keeps state management simple by using local component state and `localStorage` instead of a dedicated store.
- The dashboard is intentionally minimal and uses tabs instead of a more complex admin shell.

## Screenshots / Demo

## Known Limitations

- The frontend only exposes login and dashboard workflows; there is no UI for asset CRUD or user management.
- Audit logging is implemented for issuance and return events, but asset CRUD actions are not wired into the audit service in the provided code.
- The frontend does not show pagination controls, even though the API supports pagination.
- There are no automated tests or CI/CD workflows in the provided project.
- The archive does not include a root `LICENSE` file, although the project is described as MIT-licensed.
- QR codes are stored as data URLs in the database rather than as downloadable files.

## Future Improvements

- Add full admin screens for creating, editing, and deleting assets and users.
- Hook asset creation, updates, and deletions into the audit log.
- Add pagination and better filtering controls to the dashboard.
- Introduce form validation and richer error messages on the frontend.
- Add automated tests for services, controllers, and React views.
- Publish OpenAPI/Swagger documentation.
- Add route-level loading and error states in the frontend.

## Contributing

1. Fork the repository.
2. Create a feature branch.
   ```bash
   git checkout -b feature/my-change
   ```
3. Install dependencies and run the app locally.
4. Keep changes modular and aligned with the existing feature-based structure.
5. Run lint/build commands before opening a pull request.
6. Open a PR with a clear description of the change.

## License

MIT License.

## Acknowledgements

Built with Express, MongoDB/Mongoose, React, Vite, JWT, bcrypt, QRCode, and Docker.
