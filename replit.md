# 식재료 관리 시스템 (Kitchen Inventory Management System)

## 프로젝트 개요
주방 및 카페팀을 위한 식재료 재고 관리 시스템입니다. 재고 체크, 발주 알림, 시즌별 안전재고 설정 등의 기능을 제공합니다.

## 핵심 기능
- **팀 선택**: 주방팀 / 카페팀 분리 관리
- **시즌별 안전재고**: 겨울(12-2월), 봄(3-5월), 여름(6-8월), 가을(9-11월) 시즌별 필요재고 설정
- **발주 알람**: 현재고가 안전재고 미만일 때 알람 표시
- **발주 체크**: 중복 주문 방지를 위한 발주 완료 체크 (타임스탬프 포함)
- **편집 모드**: 일괄 수정 후 저장
- **분류 체계**: 대분류(식자재/비식품), 중분류(냉장/냉동/상온), 소분류(사용자 정의)
- **메뉴 태그**: 노션 스타일 다중 태그 시스템

## 기술 스택
- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Express.js, TypeScript
- **State Management**: TanStack Query, Context API
- **Routing**: Wouter

## 프로젝트 구조
```
client/src/
├── components/
│   ├── ui/               # Shadcn UI 컴포넌트
│   ├── app-sidebar.tsx   # 사이드바 (팀/시즌 선택)
│   ├── order-alert-banner.tsx  # 발주 알림 배너
│   ├── category-tabs.tsx # 분류 탭
│   ├── inventory-table.tsx    # 재고 테이블
│   ├── menu-tag-input.tsx     # 메뉴 태그 입력
│   ├── add-item-dialog.tsx    # 항목 추가 다이얼로그
│   ├── theme-provider.tsx     # 다크모드 지원
│   └── theme-toggle.tsx       # 테마 전환 버튼
├── lib/
│   ├── inventory-context.tsx  # 재고 상태 관리
│   └── queryClient.ts         # API 클라이언트
├── pages/
│   └── inventory.tsx     # 메인 재고 관리 페이지
└── App.tsx               # 앱 진입점

server/
├── routes.ts             # API 라우트
├── storage.ts            # 인메모리 저장소
└── index.ts              # 서버 진입점

shared/
└── schema.ts             # 타입 정의 및 스키마
```

## API 엔드포인트
- `GET /api/inventory?team={team}` - 팀별 재고 목록 조회
- `POST /api/inventory` - 새 항목 추가
- `PATCH /api/inventory/:id` - 항목 수정
- `DELETE /api/inventory/:id` - 항목 삭제
- `PUT /api/inventory/bulk` - 일괄 수정
- `GET /api/tags` - 태그 목록 조회
- `POST /api/tags` - 태그 생성
- `POST /api/admin/reseed` - 관리자 데이터베이스 리시드 (x-admin-key 헤더 필요)

## 프로덕션 데이터 동기화
프로덕션 데이터베이스를 개발 데이터와 동기화하려면:
```bash
curl -X POST https://your-app.replit.app/api/admin/reseed \
  -H "x-admin-key: reseed-2026"
```
기본 키: `reseed-2026` (ADMIN_RESEED_KEY 환경변수로 변경 가능)

## 실행 방법
```bash
npm run dev
```

## 사용자 워크플로우
1. 좌측 사이드바에서 팀 선택 (주방팀/카페팀)
2. 시즌 선택 (현재 시즌이 기본값)
3. 상단 탭에서 대분류/중분류 선택
4. 편집 모드에서 재고 수량 입력
5. 발주 필요 항목 확인 후 발주 체크
6. 저장 버튼으로 변경사항 저장
