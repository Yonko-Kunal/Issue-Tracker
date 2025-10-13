// src/app/api/tasks/route.ts

import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const prisma = new PrismaClient();

const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().optional(),
    status: z.string().min(1, 'Status is required.'),
});

export async function GET() {
    try {
        const tasks = await prisma.task.findMany();
        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch tasks' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = createTaskSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.flatten().fieldErrors, {
                status: 400,
            });
        }

        const { title, description, status } = validation.data;

        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                status,
            },
        });

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create task' },
            { status: 500 }
        );
    }
}