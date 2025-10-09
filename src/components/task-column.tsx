'use client';

import { TaskColumn, TaskStatus } from '@/types/task';
import { TaskCard } from './task-card';

interface TaskColumnProps {
    column: TaskColumn;
    onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
}

export function TaskColumnComponent({ column, onUpdateStatus }: TaskColumnProps) {
    return (
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4">
                <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: column.color }}
                />
                <h2 className="font-mono font-medium text-gray-900">
                    {column.title}
                </h2>
            </div>

            <div className="space-y-3">
                {column.tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onUpdateStatus={onUpdateStatus}
                    />
                ))}
            </div>
        </div>
    );
}