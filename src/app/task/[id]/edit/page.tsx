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

    const { getTaskById, updateTask, isLoading: areTasksLoading } = useTasks();
    const [task, setTask] = useState<Task | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus>('todo');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!areTasksLoading && taskId) {
            const foundTask = getTaskById(taskId);
            if (foundTask) {
                setTask(foundTask);
                setTitle(foundTask.title);
                setDescription(foundTask.description || '');
                setStatus(foundTask.status);
            }
        }
    }, [taskId, getTaskById, areTasksLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !task) {
            alert('Title is required and task must be loaded.');
            return;
        }

        setIsSubmitting(true);

        await updateTask({
            id: task.id,
            title: title.trim(),
            description: description.trim(),
            status,
        });

        setIsSubmitting(false);
        router.push(`/`); // Navigate back to the main board
    };

    if (areTasksLoading) {
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
                <p className="text-gray-600 mb-4">The task you're trying to edit doesn't exist.</p>
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
                        <h1 className="text-lg font-semibold">Edit Task</h1>
                        <p className="text-sm text-gray-600">{task.title}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form fields remain the same */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">Title</label>
                        <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-900 mb-2">Status</label>
                        <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todo">To Do</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-center gap-4 pt-4">
                        <Link href="/"><Button variant="outline">Cancel</Button></Link>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}