// src/app/api/tasks/[id]/route.ts

import { PrismaClient } from '@/generated/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const prisma = new PrismaClient();

const updateTaskSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255).optional(),
    description: z.string().optional(),
    status: z.enum(['todo', 'in-progress', 'done']).optional(),
});

// 1. Change the signature to use a 'context' parameter
export async function PUT(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const taskId = context.params.id; // 2. Access the id from context.params
        const body = await request.json();

        const validation = updateTaskSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.flatten().fieldErrors, {
                status: 400,
            });
        }

        const { title, description, status } = validation.data;

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: {
                title,
                description,
                status,
            },
        });

        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to update not found')) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }
        return NextResponse.json(
            { error: 'Failed to update task' },
            { status: 500 }
        );
    }
}

// 3. Apply the same signature change to DELETE
export async function DELETE(
    request: NextRequest,
    context: { params: { id: string } }
) {
    try {
        const taskId = context.params.id; // 4. Access the id from context.params
        await prisma.task.delete({
            where: { id: taskId },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }
        return NextResponse.json(
            { error: 'Failed to delete task' },
            { status: 500 }
        );
    }
}