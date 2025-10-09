'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="flex items-center justify-between p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2">

                <h1 className="text-lg font-mono font-bold">Issue Tracker</h1>
            </Link>

            <Link href="/create-task">
                <Button className="  font-medium cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Task
                </Button>
            </Link>
        </nav>
    );
}