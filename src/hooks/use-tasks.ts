'use client';

import { useState, useCallback, useEffect } from 'react';
import { Task, TaskStatus, TaskColumn } from '@/types/task';

const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Finalize landing page design',
        description: 'Complete the design mockups for the new landing page',
        status: 'todo',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        title: 'Fix authentication bug',
        description: 'Resolve the login issue affecting mobile users',
        status: 'todo',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '3',
        title: 'Develop new dashboard components',
        description: 'Create reusable components for the admin dashboard',
        status: 'in-progress',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '4',
        title: 'Deploy latest changes to production',
        description: 'Push the latest features to the production environment',
        status: 'done',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '5',
        title: 'Write documentation for API',
        description: 'Document all API endpoints and usage examples',
        status: 'done',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Load tasks from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTasks = localStorage.getItem('tasks');
            if (storedTasks) {
                const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
                    ...task,
                    createdAt: new Date(task.createdAt),
                    updatedAt: new Date(task.updatedAt),
                }));
                setTasks(parsedTasks);
            } else {
                // If no tasks in localStorage, use initial tasks
                setTasks(initialTasks);
                localStorage.setItem('tasks', JSON.stringify(initialTasks));
            }
        }
    }, []);

    const updateTaskStatus = useCallback((taskId: string, newStatus: TaskStatus) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task =>
                task.id === taskId
                    ? { ...task, status: newStatus, updatedAt: new Date() }
                    : task
            );
            if (typeof window !== 'undefined') {
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            }
            return updatedTasks;
        });
    }, []);

    const getTaskColumns = useCallback((): TaskColumn[] => {
        const todoTasks = tasks.filter(task => task.status === 'todo');
        const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
        const doneTasks = tasks.filter(task => task.status === 'done');

        return [
            {
                id: 'todo',
                title: 'Todo',
                color: '#3b82f6', // blue
                tasks: todoTasks,
            },
            {
                id: 'in-progress',
                title: 'In Progress',
                color: '#f59e0b', // amber
                tasks: inProgressTasks,
            },
            {
                id: 'done',
                title: 'Done',
                color: '#10b981', // emerald
                tasks: doneTasks,
            },
        ];
    }, [tasks]);

    const getTaskById = useCallback((taskId: string): Task | undefined => {
        return tasks.find(task => task.id === taskId);
    }, [tasks]);

    const removeTask = useCallback((taskId: string) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.filter(task => task.id !== taskId);
            if (typeof window !== 'undefined') {
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            }
            return updatedTasks;
        });
    }, []);

    const updateTask = useCallback((updatedTask: Task) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            );
            if (typeof window !== 'undefined') {
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            }
            return updatedTasks;
        });
    }, []);

    return {
        tasks,
        updateTaskStatus,
        getTaskColumns,
        getTaskById,
        removeTask,
        updateTask,
    };
}