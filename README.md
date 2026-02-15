This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# git commands
# 깃이 줄바꿈을 자동으로 변환해주는 설정을 켭니다.
git config --global core.autocrlf true

# 1. 기존 .git 폴더 삭제 (완전 초기화)
rm -rf .git

# 2. 다시 초기화
git init
git add .
git commit -m "Initial commit for clean start"

# 3. 새 레포지토리 연결 및 푸시
git remote add origin https://github.com/사용자명/Snapbook.git
git branch -M master
git push -u origin master

# 1. 수정된 파일 상태 확인 (두 파일이 잘 있는지 확인)
git status

# 2. 특정 파일 2개만 스테이징(Staging) 영역에 추가
git add src/lib/excel.ts src/app/dashboard/scan/page.tsx

# 3. 커밋 메시지 작성 (문구 변경 및 공유 기능 반영)
git commit -m "feat: 엑셀 전송 문구 변경 및 모바일 공유 기능 최적화"

# 4. GitHub 마스터 브랜치로 푸시
git push origin master