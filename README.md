# Issue Tracker

A modern, full-stack issue and task management application built with Next.js, TypeScript, and a powerful backend featuring Prisma and PostgreSQL. This project showcases a complete CRUD implementation with a seamless, responsive user experience.

![Issue Tracker Screenshot](<img width="1919" height="556" alt="image" src="https://github.com/user-attachments/assets/ada12de0-e22c-4eb3-b375-da5fdcc85cd0" />
) 
*Replace the URL above with a screenshot of your application.*

### ✨ [Live Demo](https://issue-tracker-tawny-two.vercel.app/)

---

## Key Features

- **Full-Stack CRUD Functionality**: Create, Read, Update, and Delete tasks with data persisted in a PostgreSQL database.
- **Intuitive Drag & Drop**: Effortlessly change a task's status by dragging it between columns on the board.
- **Optimistic UI Updates**: Experience an incredibly fast and responsive interface where UI changes happen instantly, without waiting for the server response.
- **Detailed Task Views**: Click any task to view, edit its details, or delete it from the system.
- **API-Driven Architecture**: All frontend actions are powered by a robust set of RESTful API endpoints built with Next.js API Routes.
- **Modern & Responsive UI**: Clean, accessible, and fully responsive design built with **shadcn/ui** and **Tailwind CSS**.

---

## Tech Stack

| Category      | Technology                                                                          |
|---------------|-------------------------------------------------------------------------------------|
| **Frontend** | [**Next.js 15**](https://nextjs.org/) (App Router), [**React**](https://react.dev/), [**TypeScript**](https://www.typescriptlang.org/) |
| **Backend** | [**Next.js API Routes**](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) |
| **Database** | [**PostgreSQL**](https://www.postgresql.org/) (via [**Supabase**](https://supabase.com/)) |
| **ORM** | [**Prisma**](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM     |
| **Styling** | [**Tailwind CSS**](https://tailwindcss.com/), [**shadcn/ui**](https://ui.shadcn.com/) |
| **Data Fetching**| [**SWR**](https://swr.vercel.app/) - React Hooks for Data Fetching                 |
| **Drag & Drop**| [**@dnd-kit**](https://dndkit.com/)                                                  |
| **Validation**| [**Zod**](https://zod.dev/) - TypeScript-first schema validation                     |

---

## Getting Started

Follow these instructions to get the project running locally on your machine.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A PostgreSQL database (you can get a free one from [Supabase](https://supabase.com/))

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Yonko-Kunal/Issue-Tracker.git](https://github.com/Yonko-Kunal/Issue-Tracker.git)
    cd Issue-Tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Create a `.env` file in the root of the project by copying the example file:
        ```bash
        cp .env.example .env
        ```
    - Open the `.env` file and add your PostgreSQL connection strings for `DATABASE_URL` and `DIRECT_URL`. You can get these from your database provider (e.g., Supabase).

4.  **Sync the database schema:**
    - Push the Prisma schema to your database. This will create the `Task` table.
        ```bash
        npx prisma db push
        ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## API Endpoints

The application exposes the following RESTful API endpoints:

| Method   | Endpoint                | Description                     |
|----------|-------------------------|---------------------------------|
| `GET`    | `/api/tasks`            | Fetches all tasks               |
| `POST`   | `/api/tasks`            | Creates a new task              |
| `PUT`    | `/api/tasks/[id]`       | Updates an existing task        |
| `DELETE` | `/api/tasks/[id]`       | Deletes a task by its ID        |

---

## Upcoming Features

This project is a solid foundation. Future enhancements could include:
- **User Authentication**: Implement user sign-up and login using NextAuth.js or Clerk.
- **Row-Level Security (RLS)**: Secure the database to ensure users can only access their own tasks.
- **Task Filtering & Sorting**: Add controls to filter tasks by title or sort them by creation date.
