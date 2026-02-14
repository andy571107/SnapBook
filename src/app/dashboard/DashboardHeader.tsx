"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
    const pathname = usePathname();
    const isDashboardRoot = pathname === "/dashboard";

    return (
        <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-white px-6 py-4 shadow-sm">
            {!isDashboardRoot && (
                <Link href="/dashboard" className="text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
            )}
            <Link href="/dashboard" className="font-bold text-lg text-primary">
                SnapBook
            </Link>
        </header>
    );
}
