# 식재료 재고 관리 시스템 — 인수인계 문서

> 작성일: 2026-08-11  
> 저장소: https://github.com/singlemarks-hash/Stock-Management.git

---

## 1. 시스템 개요

레스토랑(주방팀 / 카페팀) 이 사용하는 **식재료 재고 관리 웹 애플리케이션**입니다.

**주요 기능**
- 팀별(주방/카페) · 시즌별(봄/여름/가을/겨울) 재고 조회 및 편집
- 카테고리/소분류 기반 분류 (식자재, 비식품 / 냉장, 냉동, 상온)
- 발주 알림 배너 (현재고 < 필요재고 시 자동 표시)
- 발주 등록 / 납품 완료 처리
- 메뉴 태그 생성 + 색상 지정 (재료-메뉴 연결)
- 즐겨찾기, 재료 검색, 드래그 소분류 정렬
- 라이트/다크 모드 지원

---

## 2. 아키텍처 구조

```
┌─────────────────────────────────────────────────────────┐
│                    브라우저 (Client)                      │
│                                                         │
│  React 18 + TypeScript + Vite                           │
│  ├── 라우팅:  wouter (단일 페이지 /  → inventory.tsx)    │
│  ├── 상태:   React Context (InventoryContext)            │
│  │           + TanStack React Query (서버 캐시)          │
│  ├── UI:     shadcn/ui + Radix UI + Tailwind CSS        │
│  └── DnD:   @dnd-kit (소분류 드래그 정렬)               │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP REST API (/api/*)
┌──────────────────────▼──────────────────────────────────┐
│                    서버 (Server)                          │
│                                                         │
│  Node.js + Express 4 + TypeScript                       │
│  ├── server/index.ts   — Express 부트스트랩, 포트 5000   │
│  ├── server/routes.ts  — REST API 엔드포인트 등록        │
│  ├── server/storage.ts — DB 쿼리 레이어 (Drizzle ORM)   │
│  ├── server/db.ts      — PostgreSQL 풀 연결              │
│  ├── server/seed-data.ts — 초기 시드 데이터              │
│  └── server/vite.ts    — 개발 시 Vite 미들웨어           │
└──────────────────────┬──────────────────────────────────┘
                       │ DATABASE_URL (PostgreSQL)
┌──────────────────────▼──────────────────────────────────┐
│                 PostgreSQL 데이터베이스                    │
│                                                         │
│  테이블 (shared/schema.ts 정의)                          │
│  ├── suppliers        — 발주처 (팀별)                    │
│  ├── menu_tags        — 메뉴 태그 (색상 포함)            │
│  ├── sub_categories   — 소분류 (팀별, 카테고리별)        │
│  ├── inventory_items  — 재고 품목 (핵심 테이블)          │
│  └── item_orders      — 발주 내역                        │
└─────────────────────────────────────────────────────────┘
```

---

## 3. 디렉토리 구조

```
Stock-Management/
├── client/
│   ├── index.html
│   └── src/
│       ├── App.tsx                      # 루트 컴포넌트 (Provider 조합)
│       ├── main.tsx                     # React 마운트
│       ├── index.css                    # 전역 스타일
│       ├── components/
│       │   ├── add-item-dialog.tsx      # 재고 항목 추가 다이얼로그
│       │   ├── app-sidebar.tsx          # 좌측 사이드바 (팀/시즌 선택)
│       │   ├── category-tabs.tsx        # 카테고리 탭 + 검색창
│       │   ├── error-boundary.tsx       # 에러 바운더리
│       │   ├── inventory-table.tsx      # 핵심 재고 테이블
│       │   ├── menu-tag-input.tsx       # 태그 선택/생성/색상 편집
│       │   ├── order-alert-banner.tsx   # 발주 필요 알림 배너
│       │   ├── theme-provider.tsx       # 다크/라이트 모드
│       │   ├── theme-toggle.tsx         # 테마 토글 버튼
│       │   └── ui/                      # shadcn UI 프리미티브 (25개)
│       ├── hooks/
│       │   ├── use-mobile.tsx           # 모바일 반응형 감지
│       │   └── use-toast.ts             # 토스트 알림
│       ├── lib/
│       │   ├── inventory-context.tsx    # 전역 상태 (팀/시즌/재고/태그)
│       │   ├── queryClient.ts           # React Query 클라이언트
│       │   ├── tagColors.ts             # 태그 색상 팔레트 (60색)
│       │   └── utils.ts                 # 클래스 병합 유틸
│       └── pages/
│           ├── inventory.tsx            # 메인 재고 페이지
│           └── not-found.tsx            # 404 페이지
├── server/
│   ├── db.ts                            # PostgreSQL 연결 (DATABASE_URL 필요)
│   ├── index.ts                         # Express 서버 진입점
│   ├── routes.ts                        # API 라우트 정의
│   ├── seed-data.ts                     # 초기 재고 데이터 (한국어)
│   ├── static.ts                        # 프로덕션 정적 파일 서빙
│   ├── storage.ts                       # DB 쿼리 추상화 레이어
│   └── vite.ts                          # 개발 서버 Vite 미들웨어
├── shared/
│   └── schema.ts                        # Drizzle 스키마 + Zod 타입 공유
├── script/
│   └── build.ts                         # 프로덕션 빌드 (esbuild)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── drizzle.config.ts                    # Drizzle Kit 마이그레이션 설정
```

---

## 4. API 엔드포인트 목록

| Method | Path | 설명 |
|--------|------|------|
| GET | `/api/health` | 헬스체크 |
| GET | `/api/inventory` | 재고 전체 조회 (items + tags + subcategories) |
| POST | `/api/inventory` | 재고 항목 추가 |
| PATCH | `/api/inventory/:id` | 재고 항목 수정 |
| DELETE | `/api/inventory/:id` | 재고 항목 삭제 |
| POST | `/api/inventory/bulk-update` | 다중 항목 일괄 수정 (편집 모드 저장) |
| GET | `/api/tags` | 태그 전체 조회 |
| POST | `/api/tags` | 태그 생성 |
| PATCH | `/api/tags/:id` | 태그 수정 (색상 변경 포함) |
| DELETE | `/api/tags/:id` | 태그 삭제 |
| GET | `/api/subcategories` | 소분류 조회 |
| POST | `/api/subcategories` | 소분류 추가 |
| DELETE | `/api/subcategories/:id` | 소분류 삭제 |
| GET | `/api/suppliers` | 발주처 조회 |
| POST | `/api/suppliers` | 발주처 추가 |
| DELETE | `/api/suppliers/:id` | 발주처 삭제 |
| GET | `/api/orders` | 발주 내역 조회 |
| POST | `/api/orders` | 발주 등록 |
| PATCH | `/api/orders/:id` | 발주 상태 수정 |
| POST | `/api/orders/:id/deliver` | 납품 완료 처리 |

---

## 5. 환경 변수

| 변수명 | 필수 | 설명 |
|--------|------|------|
| `DATABASE_URL` | ✅ 필수 | PostgreSQL 연결 문자열 |
| `PORT` | 선택 | 서버 포트 (기본값: 5000) |
| `NODE_ENV` | 선택 | `production` 시 정적 파일 서빙 모드 |

---

## 6. 로컬 개발 환경 세팅

```bash
# 1. 저장소 클론
git clone https://github.com/singlemarks-hash/Stock-Management.git
cd Stock-Management

# 2. 패키지 설치 (bun 권장, npm도 가능)
bun install
# 또는: npm install

# 3. PostgreSQL 데이터베이스 생성 (로컬 또는 클라우드)
# 예) 로컬: createdb stock_management

# 4. 환경 변수 설정
echo 'DATABASE_URL=postgresql://user:password@localhost:5432/stock_management' > .env

# 5. 데이터베이스 마이그레이션 (테이블 생성)
bun run db:push
# 또는: npx drizzle-kit push

# 6. 개발 서버 실행 (포트 5000)
bun run dev
# 또는: npm run dev
```

> 초기 데이터는 서버 최초 실행 시 `server/seed-data.ts`에서 자동으로 주입됩니다.

---

## 7. 프로덕션 빌드

```bash
# 클라이언트 + 서버 빌드
bun run build

# 빌드 결과물
# dist/public/   ← 정적 클라이언트 파일
# dist/index.js  ← 서버 번들 (esbuild)

# 프로덕션 실행
NODE_ENV=production DATABASE_URL=... node dist/index.js
```

---

## 8. 마이그레이션 배포 옵션 비교

인계받는 분이 개인 GitHub에서 구축할 경우, 아래 세 가지 조합을 추천합니다.

---

### ✅ 추천 Option A — Railway (가장 간단)

> 무료 $5 크레딧 / PostgreSQL 포함 / GitHub 자동 배포

```
GitHub 저장소
    │
    ▼
Railway.app
├── Web Service (Node.js 자동 감지)
│   └── 빌드: npm run build
│   └── 실행: node dist/index.js
└── PostgreSQL Plugin (한 클릭 추가)
    └── DATABASE_URL 자동 주입
```

**세팅 방법:**
1. [railway.app](https://railway.app) 가입 → New Project → Deploy from GitHub
2. 저장소 선택
3. Add Plugin → PostgreSQL 추가 (DATABASE_URL 자동 연결)
4. Variables 탭에서 `NODE_ENV=production` 추가
5. 자동 배포 완료 — 이후 GitHub push 마다 자동 재배포

**장점:** 설정 5분, DB 포함, 무료로 시작 가능  
**단점:** 무료 플랜 소진 후 유료 (약 $5/월~)

---

### Option B — Render (무료 플랜 있음)

```
GitHub 저장소
    │
    ▼
Render.com
├── Web Service (Node.js)
└── PostgreSQL (Free tier: 90일 후 만료 주의)
```

**세팅 방법:**
1. [render.com](https://render.com) 가입 → New → Web Service → GitHub 연결
2. Build Command: `npm install && npm run build`
3. Start Command: `node dist/index.js`
4. New → PostgreSQL → DATABASE_URL을 Web Service 환경변수에 추가
5. `NODE_ENV=production` 환경변수 추가

**장점:** 무료 플랜 있음, SSL 자동  
**단점:** 무료 Web Service는 15분 비활성 시 슬립(느려짐), PostgreSQL 무료는 90일 만료

---

### Option C — Supabase DB + Vercel (풀스택 분리)

```
GitHub 저장소
    ├── client/ → Vercel (프론트엔드)
    └── server/ → Vercel Serverless Functions
                  + Supabase PostgreSQL (백엔드 DB)
```

> ⚠️ 이 앱은 Express 서버 구조라 Vercel Serverless로의 전환 시 `server/routes.ts`를 리팩토링해야 합니다. 권장하지 않음.

---

### Option D — Cloudflare (복잡, 미권장)

Cloudflare Workers + D1(SQLite) 조합은 이 앱의 PostgreSQL + Drizzle ORM 구조를 대폭 변경해야 합니다. 공수 大, 미권장.

---

## 9. 최종 권장 스택

| 항목 | 권장 선택 | 이유 |
|------|-----------|------|
| **호스팅** | Railway | 코드 변경 없이 그대로 배포 가능 |
| **데이터베이스** | Railway PostgreSQL | DATABASE_URL 자동 연결, 같은 플랫폼 |
| **CI/CD** | Railway GitHub 연동 | push 시 자동 배포 |
| **도메인** | Railway 기본 도메인 또는 커스텀 | railway.app 서브도메인 무료 제공 |

**Firebase는 이 앱에 맞지 않습니다.** Firebase는 NoSQL(Firestore) 기반으로 이 앱의 관계형 PostgreSQL 구조와 맞지 않고, 전체 DB 레이어를 다시 작성해야 합니다.

---

## 10. 체크리스트 (인계 후 해야 할 일)

- [ ] Railway 또는 Render 계정 생성
- [ ] GitHub 저장소 Fork 또는 그대로 사용
- [ ] PostgreSQL 인스턴스 생성
- [ ] `DATABASE_URL` 환경변수 설정
- [ ] `NODE_ENV=production` 환경변수 설정
- [ ] 첫 배포 후 `/api/health` 접속해 `{"status":"ok"}` 확인
- [ ] 앱 접속 후 데이터 자동 시드 확인 (주방팀 재고 데이터 자동 생성됨)
- [ ] (선택) 커스텀 도메인 연결

---

## 11. 기술 스택 요약

| 영역 | 기술 |
|------|------|
| 프론트엔드 | React 18, TypeScript, Vite |
| 라우팅 | wouter |
| 서버 상태 | TanStack React Query |
| UI 컴포넌트 | shadcn/ui, Radix UI |
| 스타일 | Tailwind CSS |
| 드래그앤드롭 | @dnd-kit |
| 백엔드 | Node.js, Express 4 |
| ORM | Drizzle ORM |
| DB | PostgreSQL |
| 스키마 공유 | Zod (client-server 공용) |
| 빌드 | esbuild (서버), Vite (클라이언트) |
| 패키지매니저 | bun (npm도 호환) |
