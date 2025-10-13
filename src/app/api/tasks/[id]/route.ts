import { PrismaClient } from '@/generated/prisma';
// 1. Import NextRequest along with NextResponse
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const prisma = new PrismaClient();

const updateTaskSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255).optional(),
    description: z.string().optional(),
    status: z.enum(['todo', 'in-progress', 'done']).optional(),
});

// 2. Update the function signature for PUT
export async function PUT(
    request: NextRequest, // Use NextRequest instead of Request
    { params }: { params: { id: string } }
) {
    try {
        const taskId = params.id;
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

// 3. Update the function signature for DELETE as well
export async function DELETE(
    request: NextRequest, // Use NextRequest here too
    { params }: { params: { id: string } }
) {
    try {
        const taskId = params.id;

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