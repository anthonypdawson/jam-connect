# Jam Connect

Jam Connect is a full-stack web application designed to connect musicians, bands, and music enthusiasts. The platform enables users to create profiles, search for collaborators, and manage musical projects. The repository is organized into a backend (Node.js/TypeScript/Prisma) and a frontend (React/TypeScript).

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Backend](#backend)
- [Frontend](#frontend)
- [Database](#database)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication (sign up, login)
- User profiles with extended fields
- Project and collaboration management
- Modern React frontend
- Type-safe backend with Prisma ORM

## Project Structure
```
jam-connect/
├── backend/         # Node.js backend (API, Prisma, business logic)
├── frontend/        # React frontend (UI, API client)
├── Project idea.md  # Project planning and ideas
├── package.json     # Root package (optional scripts)
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL (or your preferred database, update `prisma/schema.prisma` accordingly)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/jam-connect.git
   cd jam-connect
   ```
2. **Install dependencies:**
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```

## Backend
- **Location:** `backend/`
- **Tech Stack:** Node.js, TypeScript, Prisma ORM
- **Setup:**
  1. Configure your database in `backend/prisma/schema.prisma`.
  2. Run migrations:
     ```sh
     npx prisma migrate dev
     ```
  3. Start the backend server:
     ```sh
     npm run dev
     ```
- **Entry Point:** `backend/src/index.ts`

## Frontend
- **Location:** `frontend/`
- **Tech Stack:** React, TypeScript
- **Setup:**
  1. Start the frontend development server:
     ```sh
     npm start
     ```
  2. The app will be available at `http://localhost:3000` by default.

## Database
- **Prisma ORM** is used for database management.
- Migrations are stored in `backend/prisma/migrations/`.
- Update the schema in `backend/prisma/schema.prisma` and run `npx prisma migrate dev` to apply changes.

## Development
- **Backend:**
  - TypeScript code in `backend/src/`
  - Prisma client generated in `backend/src/generated/prisma/`
- **Frontend:**
  - React components in `frontend/src/`
  - API client in `frontend/src/apiClient.ts`

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License
This project is licensed under the MIT License.
