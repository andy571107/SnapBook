import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import SummaryChart from "@/components/dashboard/SummaryChart";
import { ArrowDownRight, Coffee, Hammer, Truck, Camera } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Top Action Button */}
            <div className="flex flex-col gap-4">
                <Link href="/dashboard/scan" className="w-full">
                    <Button className="w-full h-14 text-lg font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 rounded-xl">
                        <Camera className="h-6 w-6" />
                        영수증 촬영하기
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 grid-cols-2">
                {/* Total Expenses Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                        <CardTitle className="text-xs font-medium text-muted-foreground">이번 달 총 지출</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-xl font-bold">₩950,000</div>
                        <p className="text-[10px] text-emerald-600 mt-1 flex items-center font-medium">
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                            지난달 대비 12% 절약
                        </p>
                    </CardContent>
                </Card>

                {/* Receipt Count Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                        <CardTitle className="text-xs font-medium text-muted-foreground">처리된 영수증</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-xl font-bold">12건</div>
                        <p className="text-[10px] text-muted-foreground mt-1 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                            모두 처리됨
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Expense Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>카테고리별 지출</CardTitle>
                </CardHeader>
                <CardContent>
                    <SummaryChart />
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mb-20">
                <CardHeader>
                    <CardTitle>최근 활동</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { store: "스타벅스 강남점", category: "식비", amount: "12,500", date: "오늘", icon: Coffee, color: "text-emerald-500" },
                            { store: "형제철물", category: "자재비", amount: "145,000", date: "어제", icon: Hammer, color: "text-blue-500" },
                            { store: "GS칼텍스", category: "유류비", amount: "50,000", date: "2일 전", icon: Truck, color: "text-amber-500" },
                            { store: "이마트", category: "비품", amount: "32,800", date: "3일 전", icon: Truck, color: "text-gray-500" },
                        ].map((item, index, array) => (
                            <div key={index} className={`flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 ${index === array.length - 1 ? 'mb-20' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-muted ${item.color.replace('text', 'bg').replace('500', '100')} ${item.color.replace('text', 'bg')}/10`}>
                                        <item.icon className={`h-5 w-5 ${item.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold leading-none">{item.store}</p>
                                        <p className="text-xs text-muted-foreground mt-1.5">{item.category}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-0.5">
                                    <div className="font-bold text-sm">-{item.amount}</div>
                                    <div className="text-[10px] text-muted-foreground">{item.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
