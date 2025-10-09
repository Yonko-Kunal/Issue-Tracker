'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Task, TaskStatus } from '@/types/task';

interface TaskCardProps {
    task: Task;
    onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
}

export function TaskCard({ task, onUpdateStatus }: TaskCardProps) {
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
        <Card className="mb-3 bg-gray-50 border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
            <Link href={`/task/${task.id}`}>
                <CardContent className="p-4">
                    <h3 className="font-medium text-sm mb-2 text-gray-900">
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="text-xs text-gray-600 mb-3">
                            {task.description}
                        </p>
                    )}
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
                </CardContent>
            </Link>
        </Card>
    );
}