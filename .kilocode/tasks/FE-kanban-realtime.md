# Kế hoạch Thực hiện: Frontend Real-time Kanban Board

> **Status: ✅ COMPLETED** — QWE-7 | Branch: `lpokmoppokid/qwe-7-frontend-real-time-kanban-board-integration-supabase` | In Review

## 1. Mục tiêu
Thiết kế và xây dựng Frontend Kanban Board cho dự án theo chuẩn FSD (Feature-Sliced Design), hỗ trợ Optimistic Updates để trải nghiệm mượt mà (<10ms) và đồng bộ Real-time từ xa thông qua Supabase Realtime (khi GitHub Webhooks hoặc AI tác động thay đổi database).

## 2. Kiến trúc & Cấu trúc thư mục (FSD)
Các chỉnh sửa và file mới sẽ nằm trong `apps/web/src/`:

*   **`shared/api/supabase.ts`**: Cấu hình và export Supabase Browser Client.
*   **`entities/issue/`**:
    *   `model/types.ts`: Định nghĩa interface `Issue`, `Status`.
    *   `api/queries.ts`: Các hook TanStack Query (`useIssues`, vv.).
*   **`features/kanban-board/`**:
    *   `ui/kanban-column.tsx`, `ui/kanban-item.tsx`: Các component dùng `dnd-kit` (useSortable, useDroppable).
    *   `model/use-optimistic-issue-mutation.ts`: Hook chứa logic gọi API update status, kèm theo `onMutate` sửa trực tiếp cache để đạt Optimistic Update.
*   **`widgets/issue-board/`**:
    *   `ui/issue-board.tsx`: Giao diện Board chính.
    *   `model/use-issue-realtime-sync.ts`: Hook đăng ký `supabase.channel` để nhận PostgreSQL changes và tự động cập nhật TanStack Query cache.

## 3. Các bước thực hiện chi tiết

### Bước 1: Setup Supabase Realtime & TanStack Query Queries ✅
*   [x] Tạo file `shared/api/supabase.ts` sử dụng `@supabase/supabase-js`.
*   [x] Tạo `shared/api/query-provider.tsx` — ReactQueryProvider wrapper.
*   [x] Tạo các query chính cho Issue list trong `entities/issue/api/queries.ts`.
*   [x] Tạo types tại `entities/issue/model/types.ts`.

### Bước 2: Dựng Kanban Board UI & Kéo thả (dnd-kit) ✅
*   [x] Tạo `entities/issue/ui/issue-card.tsx` — IssueCard component.
*   [x] Tạo `features/kanban-board/ui/kanban-item.tsx` — useSortable wrapper.
*   [x] Tạo `features/kanban-board/ui/kanban-column.tsx` — useDroppable + SortableContext.

### Bước 3: Triển khai Optimistic Updates (Flow UI Trigger) ✅
*   [x] Tạo `features/kanban-board/model/use-optimistic-issue-mutation.ts`.
*   [x] `onMutate`: cancelQueries → snapshot → setQueryData optimistically.
*   [x] `onError`: rollback về snapshot cũ.
*   [x] `onSettled`: invalidateQueries để sync với server.

### Bước 4: Triển khai Supabase Realtime (Flow Webhook Trigger - AI/GitHub) ✅
*   [x] Tạo `widgets/issue-board/model/use-issue-realtime-sync.ts`.
*   [x] Lắng nghe INSERT/UPDATE/DELETE trên `supabase.channel('public:issues')`.
*   [x] Tạo `widgets/issue-board/ui/issue-board.tsx` — tổng hợp DndContext + columns + realtime.
*   [x] Tích hợp `ReactQueryProvider` vào `app/layout.tsx`.
*   [x] Cập nhật `app/page.tsx` render `IssueBoard`.

## 4. Kiểm thử
*   Kéo thả thủ công giữa các cột, xác nhận Optimistic Update làm thẻ di chuyển không độ trễ.
*   Vào Supabase Dashboard thay đổi `status` của một Issue, hoặc gửi Webhook giả lập thay đổi DB, xác nhận Kanban Board tự động cập nhật vị trí thẻ theo sự kiện nhận được qua WebSockets.

## 5. Env vars cần thiết
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
