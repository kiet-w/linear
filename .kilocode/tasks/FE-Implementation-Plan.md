# DevOS Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> **AI Coding Strategy:**
> - **Kiro / Cline:** Follow exact steps sequentially. Excellent at multi-file scaffolding and executing terminal commands.
> - **Cursor:** Use for rapid inline code generation within the files defined below, referencing the HTML mockups directly.

**Goal:** Implement the complete DevOS frontend UI based on provided HTML mockups, integrating with Next.js 15, Tailwind CSS v4, and strictly following Feature-Sliced Design (FSD).

**Architecture:** Next.js App Router for layouts. FSD for organizing components (`shared`, `entities`, `features`, `widgets`). TanStack Query for data state, Zustand for client state.
**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, Lucide Icons (Material Symbols), dnd-kit.

---

## Quy tắc thực hiện (Workflow Rules)
1. **Branch Naming:** Tên nhánh phải trùng với tên Ticket (VD: `feat/FE-101-core-layout`).
2. **Linear State - BẮT BUỘC:** 
   - Nhận ticket ở cột **Planned**, lập tức chuyển sang **In Progress**.
   - TUYỆT ĐỐI CHỈ CODE những gì có trong plan của ticket đó, không code lan man.
   - Khi hoàn thành (đã commit và push), chuyển ticket sang **In Review** và **DỪNG LẠI (STOP)**, đợi review code. Không tự ý merge.
   - Nếu có lỗi, ticket bị kéo sang **Debug**, AI chuyển lại sang **In Progress** để fix. Fix xong lại đẩy qua **In Review** và **STOP**.
3. **Checklist:** Khi làm xong 1 bước, AI tự động tick `[x]` vào markdown này.
4. **Commit:** Commit ngay sau mỗi Task hoàn thành. Nhớ thêm prefix `rtk` cho mọi câu lệnh shell (Antigravity Rule).
5. **Push:** Chỉ push nhánh khi tất cả các Task trong Ticket đã được tick hoàn thành.

---

## Ticket: `feat/FE-101-core-layout` 🤖 [Assignee: Kiro / Codex]

**Goal:** Xây dựng bộ khung Layout chính bao gồm SideNavBar và TopNavBar.
*Lý do:* Kiro rất giỏi trong việc tạo cấu trúc thư mục, file scaffolding và cài đặt các setup ban đầu.

### Task 1.1: Tạo Shared Icon Component
**Files:**
- Create: `apps/web/src/shared/ui/icon/icon.tsx`
- Create: `apps/web/src/shared/ui/icon/index.ts`

- [ ] **Step 1: Viết Component Icon**
```tsx
// apps/web/src/shared/ui/icon/icon.tsx
import React from 'react';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  filled?: boolean;
}

export const Icon = ({ name, filled = false, className = '', ...props }: IconProps) => {
  return (
    <span 
      className={`material-symbols-outlined ${className}`} 
      style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0", ...props.style }}
      {...props}
    >
      {name}
    </span>
  );
};
```
- [ ] **Step 2: Export Component**
```typescript
// apps/web/src/shared/ui/icon/index.ts
export { Icon } from './icon';
```
- [ ] **Step 3: Commit**
```bash
rtk git add apps/web/src/shared/ui/icon
rtk git commit -m "feat(shared): add Icon component"
```

### Task 1.2: Xây dựng SideNavBar
**Files:**
- Create: `apps/web/src/widgets/sidebar/ui/sidebar.tsx`
- Create: `apps/web/src/widgets/sidebar/index.ts`

- [ ] **Step 1: Viết Component Sidebar**
*(Tham khảo HTML từ `gitlog.html` phần `<nav class="fixed left-0...">`)*
```tsx
// apps/web/src/widgets/sidebar/ui/sidebar.tsx
import { Icon } from '@/shared/ui/icon';
import Link from 'next/link';

export const Sidebar = () => {
  return (
    <nav className="bg-[#111214] font-inter text-sm antialiased tracking-tight fixed left-0 top-0 h-screen w-64 border-r border-[#212226] flex flex-col py-4 z-50">
      <div className="px-6 mb-8 mt-2 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-on-primary-container font-display-sm text-display-sm">D</div>
        <div>
          <div className="text-lg font-bold text-slate-100 leading-tight">DevOS</div>
          <div className="text-secondary font-label-md text-label-md">Engineering Workspace</div>
        </div>
      </div>
      {/* Thêm các link Inbox, My Tasks, Projects... */}
    </nav>
  );
};
```
- [ ] **Step 2: Commit**
```bash
rtk git add apps/web/src/widgets/sidebar
rtk git commit -m "feat(widgets): add Sidebar component"
```

### Task 1.3: Tích hợp Layout
**Files:**
- Modify: `apps/web/app/layout.tsx`

- [ ] **Step 1: Cập nhật RootLayout**
```tsx
// apps/web/app/layout.tsx
import { Sidebar } from '@/widgets/sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-on-background antialiased h-screen w-screen overflow-hidden flex">
        <Sidebar />
        <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden relative">
            {children}
        </div>
      </body>
    </html>
  );
}
```
- [ ] **Step 2: Commit & Push Ticket**
```bash
rtk git add apps/web/app/layout.tsx
rtk git commit -m "feat(app): integrate Sidebar into RootLayout"
rtk git push origin feat/FE-101-core-layout
```

---

## Ticket: `feat/FE-102-project-dashboard` 🪄 [Assignee: Cursor]

**Goal:** Dựng trang quản lý Projects (`project.html`).
*Lý do:* Sử dụng Cursor (Ctrl+L / Cmd+L) tại file `.tsx` để chuyển đổi mockups HTML tĩnh sang cấu trúc React component trực quan và chính xác nhất.

### Task 2.1: Entity Project Card
**Files:**
- Create: `apps/web/src/entities/project/ui/project-card.tsx`

- [ ] **Step 1: Dựng UI Project Card**
Dựa vào giao diện từ `project.html`, xây dựng `<ProjectCard title="..." description="..." active={true} />`.
- [ ] **Step 2: Commit**
```bash
rtk git add apps/web/src/entities/project
rtk git commit -m "feat(entities): add ProjectCard component"
```

### Task 2.2: Widget Projects Board
**Files:**
- Create: `apps/web/src/widgets/projects-board/ui/projects-board.tsx`

- [ ] **Step 1: Ghép grid Layout**
Tạo grid responsive `grid-cols-1 md:grid-cols-2 xl:grid-cols-3` chứa các `ProjectCard`.
- [ ] **Step 2: Commit**
```bash
rtk git add apps/web/src/widgets/projects-board
rtk git commit -m "feat(widgets): add ProjectsBoard layout"
```

### Task 2.3: App Page
**Files:**
- Create: `apps/web/app/(dashboard)/projects/page.tsx`

- [ ] **Step 1: Ghép Page**
Render `ProjectsBoard` vào page.
- [ ] **Step 2: Commit & Push Ticket**
```bash
rtk git add apps/web/app/(dashboard)/projects
rtk git commit -m "feat(app): create projects dashboard page"
rtk git push origin feat/FE-102-project-dashboard
```

---

## Ticket: `feat/FE-103-kanban-board` 🪄 [Assignee: Cursor]

**Goal:** Dựng Task Board / My Tasks (`mytask.html`).
*Lý do:* Component dnd-kit và drag and drop logic yêu cầu hiểu bối cảnh tốt, Cursor sinh code inline sẽ giúp hạn chế lỗi type và render sai.

### Task 3.1: Entity Issue Card
**Files:**
- Create: `apps/web/src/entities/issue/ui/issue-card.tsx`

- [ ] **Step 1: Dựng Issue Card**
Tạo component hiển thị ID, Title, Tags, và Assignee avatar.
- [ ] **Step 2: Commit**
```bash
rtk git add apps/web/src/entities/issue
rtk git commit -m "feat(entities): add IssueCard component"
```

### Task 3.2: Kanban Widget & dnd-kit
**Files:**
- Create: `apps/web/src/widgets/kanban-board/ui/kanban-board.tsx`
- Create: `apps/web/src/widgets/kanban-board/ui/kanban-column.tsx`

- [ ] **Step 1: Setup Column & Board**
Dựng cấu trúc chia cột (Backlog, Planned, In Progress, Review, Done). Tích hợp mock data tạm thời.
- [ ] **Step 2: Tích hợp Drag & Drop**
Cài đặt/sử dụng `@dnd-kit/core` wrap board với `<DndContext>`.
- [ ] **Step 3: Commit & Push Ticket**
```bash
rtk git add apps/web/src/widgets/kanban-board
rtk git commit -m "feat(widgets): build real-time kanban board UI"
rtk git push origin feat/FE-103-kanban-board
```

---

## Ticket: `feat/FE-104-issue-creation` 🪄 [Assignee: Cursor]

**Goal:** Dựng Modal Create New Issue (`createnewissue.html`).
*Lý do:* Forms UI và quản lý state khá cồng kềnh, Cursor giúp map các input với library như `react-hook-form` nhanh và chuẩn cấu trúc UI Tailwind.

### Task 4.1: Form Feature
**Files:**
- Create: `apps/web/src/features/create-issue/ui/create-issue-form.tsx`

- [ ] **Step 1: Tạo Form Components**
Tạo form với input title, textarea description, select cho Priority, Status, Assignee.
- [ ] **Step 2: Commit**
```bash
rtk git add apps/web/src/features/create-issue
rtk git commit -m "feat(features): add CreateIssueForm component"
```

### Task 4.2: Global Modal Widget
**Files:**
- Create: `apps/web/src/widgets/modal-provider/ui/create-issue-modal.tsx`

- [ ] **Step 1: Dựng Modal UI**
Bọc Form trong Modal Backdrop (`backdrop-blur-sm`).
- [ ] **Step 2: Commit & Push Ticket**
```bash
rtk git add apps/web/src/widgets/modal-provider
rtk git commit -m "feat(widgets): add CreateIssueModal"
rtk git push origin feat/FE-104-issue-creation
```

---

## Ticket: `feat/FE-105-git-workflow` 🪄 [Assignee: Cursor]

**Goal:** Dựng Git Log View và Quick Push Modal (`gitlog.html`, `quickpush.html`).
*Lý do:* Các chi tiết tinh tế như viền màu diff code (đỏ/xanh) hoặc overlay background đều được Cursor trích xuất CSS trực tiếp từ file mock rất nhanh.

### Task 5.1: Git Log Widget
**Files:**
- Create: `apps/web/src/widgets/git-log/ui/git-commit-detail.tsx`

- [ ] **Step 1: Dựng UI xem diff**
Dựng giao diện Code diff block có text colors đỏ (`removed`) và xanh (`added`).
- [ ] **Step 2: Commit**
```bash
rtk git add apps/web/src/widgets/git-log
rtk git commit -m "feat(widgets): add GitCommitDetail UI"
```

### Task 5.2: Quick Push Modal
**Files:**
- Create: `apps/web/src/features/git-actions/ui/quick-push-modal.tsx`

- [ ] **Step 1: Dựng Modal Quick Push**
Hiển thị branch info, AI commit message input, và checkbox pre-push (Linter, Tests).
- [ ] **Step 2: Commit & Push Ticket**
```bash
rtk git add apps/web/src/features/git-actions
rtk git commit -m "feat(features): add QuickPushModal"
rtk git push origin feat/FE-105-git-workflow
```
