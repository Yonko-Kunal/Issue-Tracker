# Issue Tracker Application

A modern task management and issue tracking application built with Next.js, TypeScript, and shadcn/ui components.

## Features

### ✅ Task Management
- **Create Tasks**: Add new tasks with title, description, and status
- **View Tasks**: Organized in three columns (Todo, In Progress, Done)
- **Edit Tasks**: Full editing capabilities for all task properties
- **Delete Tasks**: Remove tasks with confirmation dialog

### 🎯 Task Details
- **Detailed View**: Click any task to see full details
- **Status Updates**: Update task status via dropdown or drag & drop
- **Task Metadata**: View creation and last updated timestamps
- **Navigation**: Seamless navigation between views

### 🖱️ Drag & Drop Functionality
- **Intuitive Interface**: Drag tasks between columns to update status
- **Smart Drop Zones**: Drop zones only appear when actively dragging
- **Visual Feedback**: 
  - Hover effects show drag handles
  - Drop zones highlight when dragging over them
  - Smooth animations and transitions
- **Touch Support**: Works on mobile devices
- **Real-time Updates**: Changes persist immediately to localStorage

### 🎨 Design Features
- **Clean UI**: Modern design using shadcn/ui components
- **Geist Mono Font**: Professional monospace typography
- **Responsive**: Works on desktop and mobile devices
- **Accessibility**: Proper ARIA labels and keyboard navigation

## How to Use

### Creating Tasks
1. Click "Create New Task" in the navbar
2. Fill in the task details (title, description, status)
3. Click "Create Task" to save

### Managing Tasks
1. **View**: Tasks are displayed in three columns by status
2. **Update Status**: 
   - Drag and drop tasks between columns, OR
   - Click "Update Status" button on task cards, OR
   - Use the dropdown in task details view
3. **Edit**: Click on any task to view details, then click "Edit Task"
4. **Delete**: In task details view, click "Remove Task"

### Drag & Drop
1. **Hover** over a task card to see the drag handle (⋮⋮)
2. **Click and drag** the handle or the entire task card
3. **Drop zones appear** automatically when dragging starts
4. **Drop** the task in any column to update its status
5. **Visual feedback** shows where you can drop the task

## Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Drag & Drop**: @dnd-kit/core
- **Storage**: localStorage (client-side persistence)
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── create-task/       # Task creation page
│   ├── task/[id]/         # Task details and edit pages
│   └── page.tsx           # Main tasks dashboard
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── draggable-task-card.tsx
│   ├── droppable-task-column.tsx
│   ├── navbar.tsx
│   └── task-*.tsx        # Task-related components
├── hooks/                # Custom React hooks
│   └── use-tasks.ts      # Task management logic
└── types/                # TypeScript type definitions
    └── task.ts           # Task and status types
```

## Features in Detail

### Drag & Drop Implementation
- Uses @dnd-kit for smooth, accessible drag and drop
- Supports both mouse and touch interactions
- Visual feedback with hover states and drop zones
- Automatic status updates when dropping in different columns

### Data Persistence
- All tasks stored in localStorage
- Automatic sync across all pages
- Handles browser refresh and navigation
- Initial demo data provided for new users

### Responsive Design
- Mobile-first approach
- Touch-friendly drag and drop
- Responsive grid layout
- Optimized for all screen sizes