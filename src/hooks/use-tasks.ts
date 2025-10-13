// src/hooks/use-tasks.ts

import { Task, TaskColumn, TaskStatus } from '@/types/task';
import useSWR from 'swr';
import { useMemo, useCallback } from 'react'; // 1. Add useCallback to imports

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTasks() {
    const { data, error, isLoading, mutate } = useSWR<Task[]>('/api/tasks', fetcher);
    const tasks = data || [];

    const columns = useMemo((): TaskColumn[] => {
        return [
            { id: 'todo', title: 'Todo', color: '#3b82f6', tasks: tasks.filter((t) => t.status === 'todo') },
            { id: 'in-progress', title: 'In Progress', color: '#f59e0b', tasks: tasks.filter((t) => t.status === 'in-progress') },
            { id: 'done', title: 'Done', color: '#10b981', tasks: tasks.filter((t) => t.status === 'done') },
        ];
    }, [tasks]);

    // 2. Wrap getTaskById in useCallback
    const getTaskById = useCallback((id: string): Task | undefined => {
        return tasks.find((task) => task.id === id);
    }, [tasks]); // This function will now only be recreated if the 'tasks' array changes

    const addTask = async (taskData: { title: string; description?: string; status: TaskStatus; }) => {
        // ... addTask implementation is already correct
        try {
            const response = await fetch('/api/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(taskData) });
            if (!response.ok) throw new Error('Failed to create task');
            mutate();
        } catch (err) { console.error(err); }
    };

    const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
        // ... updateTaskStatus implementation is already correct
        mutate(
            (currentTasks: Task[] | undefined) => currentTasks?.map((task) => task.id === taskId ? { ...task, status } : task) || [],
            { revalidate: false }
        );
        try {
            const response = await fetch(`/api/tasks/${taskId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
            if (!response.ok) throw new Error('Failed to update task status on the server');
        } catch (err) { console.error(err); mutate(); }
    };

    const updateTask = async (updatedTaskData: Partial<Task> & { id: string }) => {
        // ... updateTask implementation is already correct
        mutate(
            (currentTasks: Task[] | undefined) => currentTasks?.map((task) => task.id === updatedTaskData.id ? { ...task, ...updatedTaskData } : task) || [],
            { revalidate: false }
        );
        try {
            const { id, ...dataToUpdate } = updatedTaskData;
            const response = await fetch(`/api/tasks/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dataToUpdate) });
            if (!response.ok) throw new Error('Failed to update task on the server');
        } catch (err) { console.error(err); mutate(); }
    };

    const removeTask = async (taskId: string) => {
        // ... removeTask implementation is already correct
        mutate(
            (currentTasks: Task[] | undefined) => currentTasks?.filter((task) => task.id !== taskId) || [],
            { revalidate: false }
        );
        try {
            const response = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete task on the server');
        } catch (err) { console.error(err); mutate(); }
    };

    return {
        tasks,
        isLoading,
        isError: error,
        columns,
        getTaskById,
        addTask,
        updateTaskStatus,
        removeTask,
        updateTask,
    };
}