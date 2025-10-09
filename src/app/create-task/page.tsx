'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { TaskStatus } from '@/types/task';

export default function CreateTaskPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus>('todo');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Please enter a task title');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // For now, we'll store the task in localStorage
        // In a real app, this would be an API call
        const newTask = {
            id: Date.now().toString(),
            title: title.trim(),
            description: description.trim() || undefined,
            status,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Get existing tasks from localStorage
        const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = [...existingTasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        setIsSubmitting(false);
        router.push('/');
    };

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
                        <h1 className="text-lg font-semibold">Create New Task</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto p-6">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Task</h2>
                    <p className="text-gray-600">
                        Fill out the details below to add a new task to the issue tracker.
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

                    {/* Submit Button */}
                    <div className="flex justify-center pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="cursor-pointer px-8 py-2"
                        >
                            {isSubmitting ? 'Creating Task...' : 'Create Task'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}