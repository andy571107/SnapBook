import DashboardHeader from "./DashboardHeader";
import Link from "next/link";
import { Home, FileText } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="min-h-dvh bg-background relative">
            {/* Mobile Top Header */}
            <DashboardHeader />

            {/* Top Navigation - Sticky below Header */}
            <nav className="sticky top-14 z-40 h-14 bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-3xl mx-auto h-full flex items-center justify-around">
                    <Link href="/" className="flex flex-col items-center justify-center w-full h-full text-emerald-600 hover:bg-slate-50 transition-colors">
                        <Home className="h-5 w-5" />
                        <span className="text-[10px] mt-0.5 font-bold">홈</span>
                    </Link>
                    <div className="w-px h-6 bg-slate-200" aria-hidden="true" />
                    <Link href="/dashboard/history" className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-emerald-500 hover:bg-slate-50 transition-colors">
                        <FileText className="h-5 w-5" />
                        <span className="text-[10px] mt-0.5 font-bold">내역</span>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto w-full p-4 sm:p-6 md:p-8 pb-48">
                {children}
            </main>
        </div>
    );
}
