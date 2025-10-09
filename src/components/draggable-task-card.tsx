'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Task, TaskStatus } from '@/types/task';
import { GripVertical } from 'lucide-react';

interface DraggableTaskCardProps {
    task: Task;
    onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
}

export function DraggableTaskCard({ task, onUpdateStatus }: DraggableTaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const getNextStatus = (currentStatus: TaskStatus): TaskStatus | null => {
        switch (currentStatus) {
            case 'todo':
                return 'in-progress';
            case 'in-progress':
                return 'done';
            case 'done':
                return null;
            default:
                return null;
        }
    };

    const nextStatus = getNextStatus(task.status);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`mb-3 ${isDragging ? 'opacity-50 scale-90 rotate-0' : ''} transition-all duration-200`}
        >
            <Card className={`bg-gray-50 border-gray-200 hover:bg-gray-100 hover:shadow-md transition-all duration-200 group ${isDragging ? 'shadow-lg border-blue-300' : ''
                }`}>
                <CardContent className="p-4">
                    <div className="flex items-start gap-2">
                        {/* Drag Handle */}
                        <div
                            {...attributes}
                            {...listeners}
                            className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity mt-1 hover:text-blue-500"
                        >
                            <GripVertical className="w-4 h-4 text-gray-400" />
                        </div>

                        {/* Task Content */}
                        <div className="flex-1 min-w-0">
                            <Link href={`/task/${task.id}`} className="block">
                                <h3 className="font-medium text-sm mb-2 text-gray-900 hover:text-blue-600 transition-colors">
                                    {task.title}
                                </h3>
                                {task.description && (
                                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                                        {task.description}
                                    </p>
                                )}
                            </Link>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    nextStatus && onUpdateStatus(task.id, nextStatus);
                                }}
                                disabled={!nextStatus}
                            >
                                Update Status
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}