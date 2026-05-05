# Kế hoạch Thực hiện: Frontend Real-time Kanban Board

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
    *   `model/use-issue-realtime.ts`: Hook đăng ký `supabase.channel` để nhận PostgreSQL changes và tự động cập nhật TanStack Query cache.

## 3. Các bước thực hiện chi tiết

### Bước 1: Setup Supabase Realtime & TanStack Query Queries
*   Tạo file `shared/api/supabase.ts` sử dụng `@supabase/supabase-js`.
*   Tạo các query chính cho Issue list trong `entities/issue`.

### Bước 2: Dựng Kanban Board UI & Kéo thả (dnd-kit)
*   Tạo các UI component Kanban (Column, Card) dựa trên thư viện `@dnd-kit/core` và `shadcn/ui` trong `features/kanban-board`.

### Bước 3: Triển khai Optimistic Updates (Flow UI Trigger)
*   Sử dụng `useMutation` của TanStack Query.
*   Trong hàm `onMutate`:
    1.  Gọi `queryClient.cancelQueries` cho issues.
    2.  Lấy state hiện tại (để fallback nếu lỗi).
    3.  Dùng `queryClient.setQueryData` để cập nhật trạng thái thẻ sang mảng của cột mới ngay lập tức.
*   Trong `onError`: Gọi `queryClient.setQueryData` khôi phục lại data cũ.
*   Trong `onSettled`: Gọi `queryClient.invalidateQueries` để refetch nhẹ đảm bảo đồng bộ hoàn toàn với server.

### Bước 4: Triển khai Supabase Realtime (Flow Webhook Trigger - AI/GitHub)
*   Tạo hook `useIssueRealtimeSync` tại `widgets/issue-board/model`.
*   Lắng nghe bảng `issues` qua `supabase.channel`:
    ```typescript
    supabase
      .channel('public:issues')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'issues' }, (payload) => {
        // Lấy payload.new chứa data mới của Issue
        // Dùng queryClient.setQueryData cập nhật vị trí issue mới trên UI
      })
      .subscribe()
    ```
*   Tích hợp vào widget `IssueBoard`.

## 4. Kiểm thử
*   Kéo thả thủ công giữa các cột, xác nhận Optimistic Update làm thẻ di chuyển không độ trễ.
*   Vào Supabase Dashboard thay đổi `status` của một Issue, hoặc gửi Webhook giả lập thay đổi DB, xác nhận Kanban Board tự động cập nhật vị trí thẻ theo sự kiện nhận được qua WebSockets.
