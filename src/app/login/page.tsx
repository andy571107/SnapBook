"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/dashboard");
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
            <Link href="/" className="flex items-center gap-2 mb-8">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-primary">SnapBook</span>
            </Link>

            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">로그인</CardTitle>
                    <p className="text-sm text-center text-muted-foreground">
                        이메일과 비밀번호를 입력하세요
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none" htmlFor="email">이메일</label>
                            <Input id="email" type="email" placeholder="user@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none" htmlFor="password">비밀번호</label>
                                <Link href="#" className="text-sm text-primary hover:underline">
                                    비밀번호 찾기
                                </Link>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90" type="submit">
                            로그인
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-muted-foreground">Or</span>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full" type="button" onClick={() => router.push('/dashboard')}>
                            체험 계정으로 시작하기
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        계정이 없으신가요?{" "}
                        <Link href="/login" className="text-primary hover:underline font-semibold">
                            회원가입
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
