# Tài liệu Kiến Trúc: linear-clone (Monorepo: Next.js + NestJS)

**1. Định hướng hệ thống & Tech Stack:**
*   **Mô hình:** Monorepo (dùng `pnpm workspaces` hoặc `Turborepo`).
*   **Database & Auth:** Supabase (có thể chạy Local Docker).
*   **Frontend (apps/web):** Next.js 15 (App Router + React 19).
    *   *UI & Styling:* Tailwind CSS v4, shadcn/ui.
    *   *Interactions:* `dnd-kit` (Kanban), `Tiptap` (Rich-text), `cmdk` (Command Palette).
    *   *State Management:* TanStack Query v5 (Data fetching từ NestJS), Zustand (UI state), `nuqs` (URL state).
*   **Backend (apps/api):** NestJS (TypeScript).
    *   *ORM:* Prisma (kết nối với Postgres của Supabase) hoặc Drizzle.
    *   *Trách nhiệm:* Xử lý toàn bộ logic CRUD (`/issues`, `/projects`), nhận Webhook từ GitHub (`/webhooks/github`), và khởi tạo MCP Server (`/mcp`) để giao tiếp với AI.

**2. Cấu trúc thư mục (Directory Structure):**

```text
linear-clone/
├── .kilocode/                  ← Cấu hình AI workflow & Tasks (do Gemini Planner quản lý)
│   ├── tasks/                  ← Các file .md chứa task cho Cursor, Kiro...
│   └── docs/
│       └── project-architecture.md  ← File này
│
├── package.json                ← pnpm workspace config
├── pnpm-workspace.yaml
│
├── apps/
│   ├── web/                    ← FRONTEND (Next.js 15)
│   │   ├── app/                ← App Router (Layouts, Pages)
│   │   │   ├── (auth)/
│   │   │   ├── (dashboard)/
│   │   │   └── layout.tsx
│   │   ├── src/                ← Logic Frontend (chuẩn FSD)
│   │   │   ├── shared/         ← UI components (Atoms, Molecules), API client
│   │   │   ├── entities/       ← Domain logic (Issue card, Project list)
│   │   │   ├── features/       ← User actions (Kanban drag-drop, Create Issue form)
│   │   │   └── widgets/        ← Tổ hợp Layouts
│   │   └── package.json
│   │
│   └── api/                    ← BACKEND (NestJS)
│       ├── src/
│       │   ├── main.ts         ← Entry point
│       │   ├── app.module.ts
│       │   │
│       │   ├── modules/        ← Các Domain Modules
│       │   │   ├── issues/     ← CRUD Issues (Controllers, Services)
│       │   │   ├── projects/   ← CRUD Projects
│       │   │   └── auth/       ← Xử lý JWT từ Supabase
│       │   │
│       │   ├── webhooks/       ← Xử lý ngoại vi
│       │   │   └── github.controller.ts  ← Nhận event từ GH
│       │   │
│       │   └── ai-mcp/         ← AI Agent Integration
│       │       ├── mcp.module.ts
│       │       └── mcp.service.ts        ← Chạy giao thức MCP (thay thế Hono)
│       │
│       ├── prisma/             ← Schema & Migrations
│       └── package.json
│
└── packages/                   ← (Tùy chọn) Code share giữa Web và API
    ├── types/                  ← Shared TypeScript Interfaces
    └── eslint-config/
```

**3. Luồng dữ liệu (Data Flow) - Option A (Hydration):**
1.  **Lần load đầu tiên:** Next.js Server Components (RSC) ở `apps/web` sẽ gọi API (REST/GraphQL) sang `apps/api` (NestJS) để lấy data. Sau đó RSC đẩy data này vào `<HydrationBoundary>` của TanStack Query và trả HTML về cho user (Tốc độ cực nhanh).
2.  **Tương tác (Ví dụ kéo thả Kanban):** User kéo thả thẻ -> `dnd-kit` kích hoạt sự kiện -> TanStack Query gọi mutation sang NestJS -> Update DB Supabase -> Trả kết quả về update UI.
3.  **Tích hợp AI:** Các AI coding agent đọc task trong `.kilocode/tasks/`. Khi AI muốn truy vấn DB để test, nó gọi vào endpoint được expose bởi `ai-mcp` module của NestJS.

---

### [BẮT BUỘC ĐỌC] Hướng dẫn Kiến trúc cho Executor (Cursor, Kiro, Codex)
1. Dự án là **Monorepo**. Mọi thay đổi về giao diện và tương tác người dùng phải nằm trong `apps/web` (Dùng Next.js App Router + FSD).
2. Mọi thay đổi về Database, API, Logic Backend phải nằm trong `apps/api` (Dùng NestJS). Không viết route logic trong Next.js.
3. Tuyệt đối tuân thủ cấu trúc FSD (Feature-Sliced Design) trong thư mục `apps/web/src/`.
4. Luôn làm việc trong Git Worktree theo ticket ID (ví dụ `.worktrees/ENG-123`) để tránh conflict.
