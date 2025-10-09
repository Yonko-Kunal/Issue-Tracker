'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskColumn, TaskStatus } from '@/types/task';
import { DraggableTaskCard } from './draggable-task-card';

interface DroppableTaskColumnProps {
    column: TaskColumn;
    onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
    isDragging: boolean;
}

export function DroppableTaskColumn({ column, onUpdateStatus, isDragging }: DroppableTaskColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id,
    });

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
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {column.tasks.length}
                </span>
            </div>

            <div
                ref={setNodeRef}
                className={`min-h-[200px] p-3 rounded-lg transition-all duration-300 ${isDragging
                    ? `border-2 border-dashed ${isOver
                        ? 'border-blue-400 bg-blue-50 scale-102 shadow-lg'
                        : 'border-gray-300 bg-gray-50/30'
                    }`
                    : 'bg-transparent'
                    }`}
            >
                <SortableContext
                    items={column.tasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2">
                        {column.tasks.map((task) => (
                            <DraggableTaskCard
                                key={task.id}
                                task={task}
                                onUpdateStatus={onUpdateStatus}
                            />
                        ))}
                        {column.tasks.length === 0 && (
                            <div className="text-center py-8 text-gray-400 text-sm">
                                {isDragging && isOver
                                    ? 'Drop task here'
                                    : isDragging
                                        ? 'Drop zone'
                                        : 'No tasks'
                                }
                            </div>
                        )}
                    </div>
                </SortableContext>
            </div>
        </div>
    );
}