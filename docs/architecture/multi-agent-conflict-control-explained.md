# Giải phẫu Hệ thống Kiểm soát Xung đột Đa Trí Tuệ Nhân Tạo (Multi-Agent Conflict Control)

Tài liệu này được viết ra để giải thích **cực kỳ chi tiết** về hệ thống mà chúng ta vừa xây dựng. Nó không chỉ là những dòng code khô khan, mà là một **hệ tư tưởng** để quản lý một đội ngũ "Nhân viên AI" làm việc song song mà không dẫm chân lên nhau. Bạn hoàn toàn có thể mang tư tưởng này áp dụng cho bất kỳ dự án Multi-Agent nào trong tương lai.

---

## 🔴 Vấn Đề Cốt Lõi: Tại sao chúng ta cần hệ thống này?

Khi bạn chỉ có 1 con AI (như 1 developer làm solo), mọi thứ rất đơn giản. Nhưng khi bạn đưa cho 3 con AI 3 cái Task khác nhau và bảo chúng tự động làm việc (Auto-mode), một thảm họa mang tên **Race Condition (Hiệu ứng tranh chấp)** sẽ xảy ra:

1. **Ghi đè code (Overwriting):** AI Số 1 và AI Số 2 cùng tải file `kanban-board.tsx` về nhánh của mình. AI 1 sửa dòng 10, AI 2 sửa dòng 50. AI 1 merge code trước. Khi AI 2 merge, code của AI 1 bị mất (hoặc báo lỗi Conflict bung bét).
2. **Ảo tưởng sức mạnh:** AI thường nghĩ nó là người duy nhất đang làm việc trên repo này. Nó sẽ không ngó ngang ngó dọc xem có ai đang làm cái file nó sắp động vào không.
3. **Cascading Failures (Lỗi dây chuyền):** Khi một con AI làm hỏng file gốc do merge ẩu, tất cả các con AI checkout nhánh sau đó đều lấy phải source code bị lỗi -> Toàn bộ đội ngũ sụp đổ.

=> **Mục tiêu của chúng ta:** Tạo ra một môi trường làm việc có **kỷ luật thép**, nơi các AI bị ép phải tôn trọng ranh giới của nhau.

---

## 🟢 4 Trụ Cột Của Hệ Thống (Những gì chúng ta đã làm)

Chúng ta đã giải quyết bài toán trên bằng một chiến thuật "Bao vây 4 lớp": Từ lúc AI chưa code, lúc chuẩn bị code, và lúc xin gộp code.

### 1. Trụ cột 1: Phân chia ranh giới vật lý & Quyền sở hữu (CODEOWNERS)
*   **Chúng ta đã làm gì?** Tạo file `.github/CODEOWNERS`.
*   **Tại sao lại làm thế?** Chúng ta áp dụng kiến trúc **FSD (Feature-Sliced Design)**. Trong FSD, code được chia thành các khu vực biệt lập (ví dụ: thư mục `features/auth`, `features/kanban-board`). File `CODEOWNERS` nói cho GitHub biết rằng: *"Toàn bộ thư mục này thuộc quyền quản lý của ông @admintp"*.
*   **Tác dụng thực tế:** Nếu AI 1 đang làm tính năng A ở nhánh A, nhưng nó lại "ngứa tay" sửa lan sang thư mục của tính năng B. Khi nó tạo Pull Request, GitHub sẽ nhìn vào file `CODEOWNERS` và chặn lại: *"Khoan, mài không phải chủ của thư mục B, gọi sếp @admintp vào duyệt (Approve) thì tao mới cho gộp code!"*. Điều này ngăn chặn việc sửa code vô tội vạ ngoài phạm vi task được giao.

### 2. Trụ cột 2: Cơ chế "Khóa cửa trước khi vào phòng" (Database & MCP Tool)
*   **Chúng ta đã làm gì?** 
    1. Tạo một bảng `active_locks` trên database Supabase.
    2. Viết một công cụ MCP (Model Context Protocol) tên là `lock_files`.
*   **Tại sao lại làm thế?** Đây là cách ngăn chặn xung đột **ngay từ trong trứng nước**. Thay vì để 2 con AI code chán chê rồi lúc gộp code mới cãi nhau, chúng bắt buộc phải đi "đăng ký" trước.
*   **Tác dụng thực tế:** 
    *   Trường hợp 1: Khi nhận task, AI bắt buộc phải gọi tool `lock_files(["file_A.ts", "file_B.ts"])`. Bảng database sẽ ghi nhận: *File A và B đang được Ticket #123 của AI Số 1 sử dụng*.
    *   Trường hợp 2: AI Số 2 nhận một task khác, nó cũng định sửa `file_A.ts`. Nó gọi `lock_files`. Tool sẽ check database và trả về lỗi: *"Ê, File A đang bị khóa bởi AI Số 1. Đứng yên đó!"*. AI Số 2 sẽ tự động chuyển trạng thái task của nó thành **BLOCKED** và đi ngủ (chờ AI Số 1 làm xong).
    *   *Kỹ thuật nâng cao:* Code chúng ta viết có dùng `.in()` query (batched) để tăng tốc độ kiểm tra, và có trường `expires_at` để phòng trường hợp AI Số 1 bị crash chết giữa chừng thì khóa sẽ tự nhả ra sau 2 tiếng.

### 3. Trụ cột 3: Văn hóa "Nhìn ngó xung quanh" (Cập nhật System Prompts)
*   **Chúng ta đã làm gì?** Cập nhật toàn bộ các file "não bộ" của AI (`GEMINI.md`, `AGENTS.md`, `kiro.md`, `karpathy-guidelines.md`) thêm một luật tên là **"Pre-flight Situational Awareness"** (Nhận thức tình huống trước chuyến bay).
*   **Tại sao lại làm thế?** MCP Tool ở trên là bước "khóa phần cứng", còn đây là bước "rèn luyện ý thức". Bạn không thể đảm bảo tool lúc nào cũng chạy hoàn hảo.
*   **Tác dụng thực tế:** Trước khi viết dòng code đầu tiên, AI bị ép phải gõ lệnh `gh pr list --state open` trên terminal. Lệnh này sẽ hiển thị tất cả các Pull Request đang mở của các "đồng nghiệp" AI khác. Nó sẽ đọc tiêu đề và xem có ai đang động vào file nó sắp sửa không. Nếu có mùi nguy hiểm, nó sẽ tự động báo cáo lên thay vì cắm đầu vào code.

### 4. Trụ cột 4: Cảnh sát gác cổng (GitHub Branch Protection)
*   **Chúng ta đã làm gì?** Viết tài liệu `docs/github-setup-instructions.md` hướng dẫn bạn vào Setting của GitHub để bật Branch Protection (Bảo vệ nhánh).
*   **Tại sao lại làm thế?** Nếu AI nào đó "nổi loạn" bypass cả 3 lớp trên và dùng lệnh `git push --force` để đè thẳng code của nó lên nhánh `main` hoặc đè lên nhánh của đồng nghiệp thì sao?
*   **Tác dụng thực tế:** 
    *   Chặn `git push` thẳng vào `main`. Bắt buộc mọi code phải đi qua Pull Request.
    *   Chặn đẩy code chéo: Nhánh `feat/task-1` do AI Số 1 tạo ra thì chỉ tài khoản của AI Số 1 mới được push lên đó. AI Số 2 push vào sẽ bị GitHub từ chối truy cập (Permission Denied) ở cấp độ Server.

---

## 🛠 Tóm lại: Vòng đời của một Task sau khi có hệ thống này

Khi bạn giao một task cho một AI, nó sẽ phải trải qua con đường sau:

1. **Tỉnh dậy & Ngó nghiêng:** AI gõ `gh pr list`. Xem các nhánh khác đang làm gì. Thấy an toàn -> Đi tiếp.
2. **Xin phép (Lock):** AI gọi MCP tool `lock_files` đưa danh sách các file nó định sửa. Database cho phép -> Đi tiếp. (Nếu trùng file người khác -> Báo BLOCKED).
3. **Cô lập (Branch):** AI tự động tạo một nhánh mới tinh từ `main` (ví dụ `feat/task-123`).
4. **Viết Code & Test:** Cứ yên tâm mà code vì biết chắc không ai giành file với mình.
5. **Xin gộp code (PR):** Đẩy code lên nhánh của mình. Tạo Pull Request. 
6. **Kiểm duyệt (CODEOWNERS):** GitHub gọi tên @admintp vào xem. Bạn OK thì mới được merge. Hệ thống tự động nhả khóa (unlock file) cho người khác làm.

## 💡 Bài học rút ra cho các Project tương lai

Khi bạn build một hệ thống Multi-Agent AI, đừng nghĩ đến việc "Làm sao để AI code giỏi hơn?". Hãy nghĩ đến việc:
1. **Thiết kế kiến trúc hệ thống (Architecture) để dễ chia việc:** FSD là một ví dụ tuyệt vời. Hãy chia project thành các hộp nhỏ độc lập.
2. **Quản lý State (Trạng thái) ở môi trường chia sẻ:** Đừng để AI lưu trạng thái trên máy local của nó. Giống như cái bảng `active_locks` trên database, phải có một "Cái Bảng Thông Báo Chung" để tất cả AI cùng nhìn vào.
3. **Trừng phạt/Ngăn chặn ở cấp thấp nhất:** Prompts (lời nhắc) có thể bị AI lờ đi, nhưng Database Schema (Unique constraint), GitHub Rules (Branch protection) là những rào cản vật lý mà AI không thể cãi lại. Xây dựng luật lệ bằng phần cứng thay vì chỉ nói mồm.

---

## 🤖 Phụ Lục: Cơ Chế Thao Tác Của AI (Cách AI Tự Động Code Chuẩn Xác)

Để hệ thống này được cài đặt một cách chính xác vào dự án, chúng ta không dùng cách "AI nhào vô sửa đại". Thay vào đó, chúng ta áp dụng quy trình **Subagent-Driven Development (Phát triển dựa trên các Đặc vụ con)**. Đây là cách quản lý AI chuyên nghiệp mà bạn có thể ứng dụng để yêu cầu AI làm các dự án phức tạp sau này:

### Bước 1: Viết Bản Kế Hoạch (Planning)
Thay vì nhảy vào code ngay, AI (đóng vai trò Quản lý) tạo ra một Bản kế hoạch triển khai (Implementation Plan) dưới dạng Markdown (`docs/superpowers/plans/...`).
*   Bản kế hoạch chia dự án thành các Task nhỏ (VD: Task 1: Cập nhật GEMINI.md, Task 2: Tạo CODEOWNERS...).
*   Xác định **chính xác từng đoạn text nào cần thêm vào file nào**. AI không tự "nghĩ ra" trong lúc code, mọi thứ đã được chốt từ Plan.

### Bước 2: Kích hoạt Quy trình "Đặc vụ con" (Subagents)
Với mỗi Task trong kế hoạch, AI Quản lý sẽ điều phối một vòng lặp 3 bước khép kín. Thay vì tự làm dễ bị loạn Context, nó gọi các "AI Đàn Em" (Subagent):

1. **Giao việc (Dispatch Implementer):** Gọi một AI chuyên code (`generalist`) thực hiện task.
   * *Nhiệm vụ:* "Này, làm Task 1 đi. Sửa file `GEMINI.md` theo plan này."
   * *Công cụ (Tools) sử dụng:* Nó gọi tool `replace` để thay thế văn bản, `write_file` để tạo file mới, và `run_shell_command` để commit code lên Git.
2. **Nghiệm thu yêu cầu (Dispatch Spec Reviewer):** AI Quản lý KHÔNG tin tưởng ngay kết quả. Nó gọi AI thứ hai (`codebase_investigator`) chuyên điều tra xem file đã sửa có đúng nguyên bản kế hoạch chưa.
   * *Nhiệm vụ:* "Đọc file `GEMINI.md` xem thằng AI 1 làm đúng không."
   * *Công cụ (Tools) sử dụng:* Dùng `read_file` và `grep_search` để quét toàn bộ mã nguồn. Nếu thiếu sót (ví dụ: phát hiện quên cập nhật file `.kiro.md`), nó sẽ ép AI 1 phải làm lại.
3. **Đánh giá chất lượng (Dispatch Code Reviewer):** Sau khi yêu cầu đã đúng, gọi AI thứ ba (`code-reviewer`) chuyên bắt lỗi logic và bảo mật.
   * *Nhiệm vụ:* "Kiểm tra xem code này có tối ưu, có an toàn không."
   * *Kết quả thực tế:* Nhờ bước này mà lỗi *N+1 Query* (truy vấn DB quá nhiều lần) và *thiếu RLS bảo mật* trong Task 4 (MCP Tool) đã được phát hiện kịp thời và ép AI 1 phải sửa lại thành Batched Query (`.in()`).

### Bộ Công Cụ (Tools) Thao Tác Dưới Nền
Để làm được những việc trên mà không cần con người đụng tay vào, AI sử dụng một bộ công cụ can thiệp trực tiếp vào máy tính của bạn:
*   `read_file` & `grep_search`: Giống như đôi mắt, để đọc và tìm vị trí chính xác cần sửa.
*   `replace`: Sửa file kiểu phẫu thuật (Surgical). Chỉ thay thế đúng câu chữ cần thiết, không làm hỏng code xung quanh.
*   `write_file`: Tạo file mới hoàn toàn (như khi tạo `CODEOWNERS` hay file `.sql`).
*   `run_shell_command`: Giống như đôi tay, dùng để gõ lệnh terminal (`git add`, `git commit`, `pnpm lint`).

**💡 Lời khuyên cho bạn:** Khi yêu cầu AI làm tính năng lớn ở các dự án sau, hãy luôn bắt đầu bằng Prompt: *"Hãy phân tích dự án, viết Plan chi tiết, và dùng quy trình Subagent để làm từng bước. Làm xong bước nào phải tự động Code Review bước đó trước khi đi tiếp."*
