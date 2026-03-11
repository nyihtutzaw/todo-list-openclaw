# Todo List OpenClaw

## Description
A staging-ready todo list app built with Next.js, TypeScript, Tailwind CSS, Prisma, and MySQL.

## Tech Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- Prisma + MySQL
- Jest + React Testing Library

## Getting Started
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## Features
- [x] Create todos from the textbox with Enter
- [x] View todos
- [x] Toggle completion state
- [x] Delete single todo
- [x] Select multiple todos with a single row checkbox
- [x] Bulk delete selected todos
- [x] Toggle between light mode and dark mode with a visible header control
- [x] Theme preference persists between visits
- [x] Staging build on port 8080

## API Endpoints
- `GET /api/todos` — List all todos
- `POST /api/todos` — Create a todo
- `PATCH /api/todos/:id` — Update a todo
- `DELETE /api/todos/:id` — Delete a single todo
- `POST /api/todos/bulk-delete` — Delete multiple selected todos

## Database Schema
### Todo
- `id` — integer primary key
- `title` — todo title
- `completed` — completion state
- `createdAt` — creation timestamp
- `updatedAt` — last update timestamp

## Project Structure
```text
src/
├── app/          # Pages and API routes
├── components/   # UI building blocks
├── lib/          # Validation, API helpers, Prisma client
└── types/        # TypeScript models
```
