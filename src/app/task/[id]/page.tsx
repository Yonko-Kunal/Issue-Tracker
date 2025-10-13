// src/app/task/[id]/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Task, TaskStatus } from '@/types/task';
import { useTasks } from '@/hooks/use-tasks';

export default function TaskDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const taskId = params.id as string;

    const { getTaskById, updateTaskStatus, removeTask, isLoading } = useTasks();

    // The task is now derived directly from the hook's data
    const task = getTaskById(taskId);

    const handleRemoveTask = async () => {
        if (task && confirm('Are you sure you want to delete this task?')) {
            await removeTask(task.id);
            router.push('/');
        }
    };

    // Correctly format dates which are now strings
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white font-mono flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="min-h-screen bg-white font-mono text-center p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Task Not Found</h2>
                <p className="text-gray-600 mb-4">The task you're looking for doesn't exist.</p>
                <Link href="/">
                    <Button>Back to Tasks</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-mono">
            {/* Header */}
            <div className="border-b border-border p-6">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="p-2">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-lg font-semibold">Task Details</h1>
                        <p className="text-sm text-gray-600">{task.title}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{task.title}</h2>

                {task.description && (
                    <div className="mb-6">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {task.description}
                        </p>
                    </div>
                )}

                {/* Status Section */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-900 mb-3">Status</label>
                    <Select value={task.status} onValueChange={(value: TaskStatus) => updateTaskStatus(task.id, value)}>
                        <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Link href={`/task/${task.id}/edit`}>
                        <Button>Edit Task</Button>
                    </Link>
                    <Button variant="destructive" onClick={handleRemoveTask}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Task
                    </Button>
                </div>

                {/* Task Metadata */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div><span className="font-medium">Created:</span> {formatDate(task.createdAt)}</div>
                        <div><span className="font-medium">Last Updated:</span> {formatDate(task.updatedAt)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}