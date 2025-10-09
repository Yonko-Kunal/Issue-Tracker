'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { Task, TaskStatus } from '@/types/task';
import { useTasks } from '@/hooks/use-tasks';

export default function EditTaskPage() {
    const router = useRouter();
    const params = useParams();
    const taskId = params.id as string;

    const { getTaskById, updateTask } = useTasks();
    const [task, setTask] = useState<Task | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus>('todo');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (taskId) {
            const foundTask = getTaskById(taskId);
            if (foundTask) {
                setTask(foundTask);
                setTitle(foundTask.title);
                setDescription(foundTask.description || '');
                setStatus(foundTask.status);
            }
            setIsLoading(false);
        }
    }, [taskId, getTaskById]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Please enter a task title');
            return;
        }

        if (!task) return;

        setIsSubmitting(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const updatedTask: Task = {
            ...task,
            title: title.trim(),
            description: description.trim() || undefined,
            status,
            updatedAt: new Date(),
        };

        updateTask(updatedTask);
        setIsSubmitting(false);
        router.push(`/task/${taskId}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white font-mono flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    if (!task) {
        return (
            <div className="min-h-screen bg-white font-mono">
                <div className="border-b border-border p-6">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="p-2">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-lg font-semibold">Task Not Found</h1>
                        </div>
                    </div>
                </div>
                <div className="max-w-2xl mx-auto p-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Task Not Found</h2>
                        <p className="text-gray-600 mb-4">The task you're trying to edit doesn't exist.</p>
                        <Link href="/">
                            <Button>Back to Tasks</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-mono">
            {/* Header */}
            <div className="border-b border-border p-6">
                <div className="flex items-center gap-4">
                    <Link href={`/task/${taskId}`}>
                        <Button variant="ghost" size="sm" className="p-2">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-lg font-semibold">Edit Task</h1>
                        <p className="text-sm text-gray-600">{task.title}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto p-6">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Edit Task</h2>
                    <p className="text-gray-600">
                        Update the task details below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Field */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                            Title
                        </label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="e.g., Implement user authentication"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full"
                            required
                        />
                    </div>

                    {/* Description Field */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            placeholder="Provide a detailed description of the task..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full min-h-[120px] resize-none"
                            rows={5}
                        />
                    </div>

                    {/* Status Field */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-900 mb-2">
                            Status
                        </label>
                        <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todo">To Do</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-center gap-4 pt-4">
                        <Link href={`/task/${taskId}`}>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2"
                        >
                            {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}