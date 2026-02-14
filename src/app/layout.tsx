import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SnapBook - 사장님의 영수증 정리 파트너",
  description: "AI가 자동으로 영수증을 분석하고 엑셀로 정리해드립니다.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(inter.className, "font-sans bg-background")}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
