"use client";

import dynamic from "next/dynamic";
import { Cell, Pie, PieChart, Tooltip, Legend } from "recharts";

// Dynamically import ResponsiveContainer to avoid SSR issues with width/height calculation
const ResponsiveContainer = dynamic(
    () => import("recharts").then((mod) => mod.ResponsiveContainer),
    { ssr: false }
);

const data = [
    { name: "식비", value: 400000, color: "#10b981" }, // Emerald
    { name: "교통비", value: 150000, color: "#3b82f6" }, // Blue
    { name: "비품", value: 300000, color: "#f59e0b" }, // Amber
    { name: "기타", value: 100000, color: "#64748b" }, // Slate
];

interface LabelProps {
    cx?: number;
    cy?: number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    percent?: number;
}

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: LabelProps) => {
    if (cx === undefined || cy === undefined || midAngle === undefined || innerRadius === undefined || outerRadius === undefined || percent === undefined) {
        return null;
    }
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight="bold">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function SummaryChart() {
    return (
        <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number | string | undefined) => value !== undefined ? `${Number(value).toLocaleString()}원` : ''} />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
