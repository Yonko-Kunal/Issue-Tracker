'use client';

import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/navbar';
import { DroppableTaskColumn } from '@/components/droppable-task-column';
import { useTasks } from '@/hooks/use-tasks';
import { Task, TaskStatus } from '@/types/task';

export default function Home() {
  const { updateTaskStatus, getTaskColumns, getTaskById } = useTasks();
  const columns = getTaskColumns();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = getTaskById(active.id as string);
    setActiveTask(task || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if we're dropping over a column
    const overColumn = columns.find(col => col.id === overId);
    if (overColumn) {
      const task = getTaskById(activeId);
      if (task && task.status !== overColumn.id) {
        updateTaskStatus(activeId, overColumn.id as TaskStatus);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if we're dropping over a column
    const overColumn = columns.find(col => col.id === overId);
    if (overColumn) {
      const task = getTaskById(activeId);
      if (task && task.status !== overColumn.id) {
        updateTaskStatus(activeId, overColumn.id as TaskStatus);
      }
    }

    setActiveTask(null);
  };

  return (
    <div className="min-h-screen bg-white font-mono">
      <Navbar />

      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tasks</h1>
          <p className="text-sm text-gray-600">
            Note: Drag and drop tasks between columns to update their status. Drop zones will appear when you start dragging.
          </p>
        </div>

        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {columns.map((column) => (
              <DroppableTaskColumn
                key={column.id}
                column={column}
                onUpdateStatus={updateTaskStatus}
                isDragging={activeTask !== null}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask ? (
              <div className="rotate-3 scale-105 shadow-2xl">
                <Card className="bg-white border-blue-300 shadow-xl">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm mb-2 text-gray-900">
                      {activeTask.title}
                    </h3>
                    {activeTask.description && (
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {activeTask.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
}
