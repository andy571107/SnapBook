"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Camera, Brain, FileSpreadsheet, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-background pb-32">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur upports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">SnapBook</span>
          </div>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-primary">로그인</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section (Motivation & Spark) */}
      <section className="flex flex-col items-center justify-center px-4 py-16 text-center lg:py-24">
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-2">
            <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
            사장님, 이제 퇴근하세요
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900 leading-[1.2]">
            영수증 풀칠하는 밤은<br />
            <span className="text-emerald-600">이제 끝났습니다.</span>
          </h1>
          <p className="max-w-150 text-slate-600 text-lg sm:text-xl leading-relaxed">
            사진 한 장으로 장부 작성부터 엑셀 정리까지.<br />
            사장님은 사업에만 집중하세요.
          </p>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-md justify-center">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full gap-2 shadow-xl shadow-secondary/20 bg-secondary hover:bg-secondary-hover text-white border-0 text-lg font-bold h-14">
              지금 바로 시작하기 <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto text-primary border-primary/20 hover:bg-primary/5 h-14"
            onClick={() => alert('데모 영상은 준비 중입니다. "지금 바로 시작하기"를 눌러 체험해보세요!')}
          >
            30초 데모 보기
          </Button>
        </div>
      </section>

      {/* Simplicity Loop (Ability Factors) */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl keep-all">
              복잡함은 0으로,<br className="sm:hidden" /> 효율은 무한대로
            </h2>
            <p className="mt-4 text-lg text-muted-foreground keep-all">스냅북의 3단계 심플리시티 루프를 경험하세요.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-3xl border bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 group-hover:bg-primary group-hover:text-white transition-colors">
                <Camera className="h-7 w-7 text-primary group-hover:text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-primary keep-all">물리적 노력 <span className="text-secondary">Zero</span></h3>
              <p className="text-muted-foreground mb-4 keep-all">영수증을 펴서 예쁘게 찍을 필요 없습니다. 구겨져도, 어두워도 저희가 알아서 인식합니다.</p>
              <div className="bg-slate-100 rounded-lg p-3 text-xs text-center text-slate-500 font-medium keep-all">
                &quot;그냥 찍으세요&quot;
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-3xl border bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 group-hover:bg-secondary group-hover:text-white transition-colors">
                <Brain className="h-7 w-7 text-secondary group-hover:text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-primary keep-all">두뇌 소모 <span className="text-secondary">Zero</span></h3>
              <p className="text-muted-foreground mb-4 keep-all">이게 식대인지 접대비인지 고민하지 마세요. 소상공인 맞춤형 AI가 자동으로 태깅합니다.</p>
              <div className="bg-slate-100 rounded-lg p-3 text-xs text-center text-slate-500 font-medium keep-all">
                &quot;AI 자동 태깅 완료&quot;
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-3xl border bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <FileSpreadsheet className="h-7 w-7 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-primary keep-all">시간 낭비 <span className="text-secondary">Zero</span></h3>
              <p className="text-muted-foreground mb-4 keep-all">월말마다 야근할 필요 없습니다. 클릭 한 번으로 세무사님이 원하는 엑셀 파일이 뚝딱.</p>
              <div className="bg-slate-100 rounded-lg p-3 text-xs text-center text-slate-500 font-medium keep-all">
                &quot;원클릭 엑셀 전송&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof */}
      <section className="py-32 border-t bg-white">
        <div className="container px-4 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-8 leading-relaxed">
            이미 <span className="text-secondary">1,000명</span>의 사장님이 <br className="sm:hidden" />
            한 달에 <span className="underline decoration-secondary/50 decoration-4 underline-offset-4">5시간</span>을 더 벌고 계십니다.
          </h2>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 opacity-80">
            <div className="flex flex-col items-center gap-2 group">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <span className="font-semibold text-sm text-slate-600">SSL 보안 적용</span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <span className="font-semibold text-sm text-slate-600">99.9% 인식률</span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
              </div>
              <span className="font-semibold text-sm text-slate-600">자동 백업</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
