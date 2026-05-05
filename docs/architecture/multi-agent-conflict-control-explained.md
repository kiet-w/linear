# Giß║úi phß║½u Hß╗ç thß╗æng Kiß╗âm so├ít Xung ─æß╗Öt ─Éa Tr├¡ Tuß╗ç Nh├ón Tß║ío (Multi-Agent Conflict Control)

T├ái liß╗çu n├áy ─æ╞░ß╗úc viß║┐t ra ─æß╗â giß║úi th├¡ch **cß╗▒c kß╗│ chi tiß║┐t** vß╗ü hß╗ç thß╗æng m├á ch├║ng ta vß╗½a x├óy dß╗▒ng. N├│ kh├┤ng chß╗ë l├á nhß╗»ng d├▓ng code kh├┤ khan, m├á l├á mß╗Öt **hß╗ç t╞░ t╞░ß╗ƒng** ─æß╗â quß║ún l├╜ mß╗Öt ─æß╗Öi ng┼⌐ "Nh├ón vi├¬n AI" l├ám viß╗çc song song m├á kh├┤ng dß║½m ch├ón l├¬n nhau. Bß║ín ho├án to├án c├│ thß╗â mang t╞░ t╞░ß╗ƒng n├áy ├íp dß╗Ñng cho bß║Ñt kß╗│ dß╗▒ ├ín Multi-Agent n├áo trong t╞░╞íng lai.

---

## ≡ƒö┤ Vß║Ñn ─Éß╗ü Cß╗æt L├╡i: Tß║íi sao ch├║ng ta cß║ºn hß╗ç thß╗æng n├áy?

Khi bß║ín chß╗ë c├│ 1 con AI (nh╞░ 1 developer l├ám solo), mß╗ìi thß╗⌐ rß║Ñt ─æ╞ín giß║ún. Nh╞░ng khi bß║ín ─æ╞░a cho 3 con AI 3 c├íi Task kh├íc nhau v├á bß║úo ch├║ng tß╗▒ ─æß╗Öng l├ám viß╗çc (Auto-mode), mß╗Öt thß║úm hß╗ìa mang t├¬n **Race Condition (Hiß╗çu ß╗⌐ng tranh chß║Ñp)** sß║╜ xß║úy ra:

1. **Ghi ─æ├¿ code (Overwriting):** AI Sß╗æ 1 v├á AI Sß╗æ 2 c├╣ng tß║úi file `kanban-board.tsx` vß╗ü nh├ính cß╗ºa m├¼nh. AI 1 sß╗¡a d├▓ng 10, AI 2 sß╗¡a d├▓ng 50. AI 1 merge code tr╞░ß╗¢c. Khi AI 2 merge, code cß╗ºa AI 1 bß╗ï mß║Ñt (hoß║╖c b├ío lß╗ùi Conflict bung b├⌐t).
2. **ß║óo t╞░ß╗ƒng sß╗⌐c mß║ính:** AI th╞░ß╗¥ng ngh─⌐ n├│ l├á ng╞░ß╗¥i duy nhß║Ñt ─æang l├ám viß╗çc tr├¬n repo n├áy. N├│ sß║╜ kh├┤ng ng├│ ngang ng├│ dß╗ìc xem c├│ ai ─æang l├ám c├íi file n├│ sß║»p ─æß╗Öng v├áo kh├┤ng.
3. **Cascading Failures (Lß╗ùi d├óy chuyß╗ün):** Khi mß╗Öt con AI l├ám hß╗Ång file gß╗æc do merge ß║⌐u, tß║Ñt cß║ú c├íc con AI checkout nh├ính sau ─æ├│ ─æß╗üu lß║Ñy phß║úi source code bß╗ï lß╗ùi -> To├án bß╗Ö ─æß╗Öi ng┼⌐ sß╗Ñp ─æß╗ò.

=> **Mß╗Ñc ti├¬u cß╗ºa ch├║ng ta:** Tß║ío ra mß╗Öt m├┤i tr╞░ß╗¥ng l├ám viß╗çc c├│ **kß╗╖ luß║¡t th├⌐p**, n╞íi c├íc AI bß╗ï ├⌐p phß║úi t├┤n trß╗ìng ranh giß╗¢i cß╗ºa nhau.

---

## ≡ƒƒó 4 Trß╗Ñ Cß╗Öt Cß╗ºa Hß╗ç Thß╗æng (Nhß╗»ng g├¼ ch├║ng ta ─æ├ú l├ám)

Ch├║ng ta ─æ├ú giß║úi quyß║┐t b├ái to├ín tr├¬n bß║▒ng mß╗Öt chiß║┐n thuß║¡t "Bao v├óy 4 lß╗¢p": Tß╗½ l├║c AI ch╞░a code, l├║c chuß║⌐n bß╗ï code, v├á l├║c xin gß╗Öp code.

### 1. Trß╗Ñ cß╗Öt 1: Ph├ón chia ranh giß╗¢i vß║¡t l├╜ & Quyß╗ün sß╗ƒ hß╗»u (CODEOWNERS)
*   **Ch├║ng ta ─æ├ú l├ám g├¼?** Tß║ío file `.github/CODEOWNERS`.
*   **Tß║íi sao lß║íi l├ám thß║┐?** Ch├║ng ta ├íp dß╗Ñng kiß║┐n tr├║c **FSD (Feature-Sliced Design)**. Trong FSD, code ─æ╞░ß╗úc chia th├ánh c├íc khu vß╗▒c biß╗çt lß║¡p (v├¡ dß╗Ñ: th╞░ mß╗Ñc `features/auth`, `features/kanban-board`). File `CODEOWNERS` n├│i cho GitHub biß║┐t rß║▒ng: *"To├án bß╗Ö th╞░ mß╗Ñc n├áy thuß╗Öc quyß╗ün quß║ún l├╜ cß╗ºa ├┤ng @admintp"*.
*   **T├íc dß╗Ñng thß╗▒c tß║┐:** Nß║┐u AI 1 ─æang l├ám t├¡nh n─âng A ß╗ƒ nh├ính A, nh╞░ng n├│ lß║íi "ngß╗⌐a tay" sß╗¡a lan sang th╞░ mß╗Ñc cß╗ºa t├¡nh n─âng B. Khi n├│ tß║ío Pull Request, GitHub sß║╜ nh├¼n v├áo file `CODEOWNERS` v├á chß║╖n lß║íi: *"Khoan, m├ái kh├┤ng phß║úi chß╗º cß╗ºa th╞░ mß╗Ñc B, gß╗ìi sß║┐p @admintp v├áo duyß╗çt (Approve) th├¼ tao mß╗¢i cho gß╗Öp code!"*. ─Éiß╗üu n├áy ng─ân chß║╖n viß╗çc sß╗¡a code v├┤ tß╗Öi vß║í ngo├ái phß║ím vi task ─æ╞░ß╗úc giao.

### 2. Trß╗Ñ cß╗Öt 2: C╞í chß║┐ "Kh├│a cß╗¡a tr╞░ß╗¢c khi v├áo ph├▓ng" (Database & MCP Tool)
*   **Ch├║ng ta ─æ├ú l├ám g├¼?** 
    1. Tß║ío mß╗Öt bß║úng `active_locks` tr├¬n database Supabase.
    2. Viß║┐t mß╗Öt c├┤ng cß╗Ñ MCP (Model Context Protocol) t├¬n l├á `lock_files`.
*   **Tß║íi sao lß║íi l├ám thß║┐?** ─É├óy l├á c├ích ng─ân chß║╖n xung ─æß╗Öt **ngay tß╗½ trong trß╗⌐ng n╞░ß╗¢c**. Thay v├¼ ─æß╗â 2 con AI code ch├ín ch├¬ rß╗ôi l├║c gß╗Öp code mß╗¢i c├úi nhau, ch├║ng bß║»t buß╗Öc phß║úi ─æi "─æ─âng k├╜" tr╞░ß╗¢c.
*   **T├íc dß╗Ñng thß╗▒c tß║┐:** 
    *   Tr╞░ß╗¥ng hß╗úp 1: Khi nhß║¡n task, AI bß║»t buß╗Öc phß║úi gß╗ìi tool `lock_files(["file_A.ts", "file_B.ts"])`. Bß║úng database sß║╜ ghi nhß║¡n: *File A v├á B ─æang ─æ╞░ß╗úc Ticket #123 cß╗ºa AI Sß╗æ 1 sß╗¡ dß╗Ñng*.
    *   Tr╞░ß╗¥ng hß╗úp 2: AI Sß╗æ 2 nhß║¡n mß╗Öt task kh├íc, n├│ c┼⌐ng ─æß╗ïnh sß╗¡a `file_A.ts`. N├│ gß╗ìi `lock_files`. Tool sß║╜ check database v├á trß║ú vß╗ü lß╗ùi: *"├è, File A ─æang bß╗ï kh├│a bß╗ƒi AI Sß╗æ 1. ─Éß╗⌐ng y├¬n ─æ├│!"*. AI Sß╗æ 2 sß║╜ tß╗▒ ─æß╗Öng chuyß╗ân trß║íng th├íi task cß╗ºa n├│ th├ánh **BLOCKED** v├á ─æi ngß╗º (chß╗¥ AI Sß╗æ 1 l├ám xong).
    *   *Kß╗╣ thuß║¡t n├óng cao:* Code ch├║ng ta viß║┐t c├│ d├╣ng `.in()` query (batched) ─æß╗â t─âng tß╗æc ─æß╗Ö kiß╗âm tra, v├á c├│ tr╞░ß╗¥ng `expires_at` ─æß╗â ph├▓ng tr╞░ß╗¥ng hß╗úp AI Sß╗æ 1 bß╗ï crash chß║┐t giß╗»a chß╗½ng th├¼ kh├│a sß║╜ tß╗▒ nhß║ú ra sau 2 tiß║┐ng.

### 3. Trß╗Ñ cß╗Öt 3: V─ân h├│a "Nh├¼n ng├│ xung quanh" (Cß║¡p nhß║¡t System Prompts)
*   **Ch├║ng ta ─æ├ú l├ám g├¼?** Cß║¡p nhß║¡t to├án bß╗Ö c├íc file "n├úo bß╗Ö" cß╗ºa AI (`GEMINI.md`, `AGENTS.md`, `kiro.md`, `karpathy-guidelines.md`) th├¬m mß╗Öt luß║¡t t├¬n l├á **"Pre-flight Situational Awareness"** (Nhß║¡n thß╗⌐c t├¼nh huß╗æng tr╞░ß╗¢c chuyß║┐n bay).
*   **Tß║íi sao lß║íi l├ám thß║┐?** MCP Tool ß╗ƒ tr├¬n l├á b╞░ß╗¢c "kh├│a phß║ºn cß╗⌐ng", c├▓n ─æ├óy l├á b╞░ß╗¢c "r├¿n luyß╗çn ├╜ thß╗⌐c". Bß║ín kh├┤ng thß╗â ─æß║úm bß║úo tool l├║c n├áo c┼⌐ng chß║íy ho├án hß║úo.
*   **T├íc dß╗Ñng thß╗▒c tß║┐:** Tr╞░ß╗¢c khi viß║┐t d├▓ng code ─æß║ºu ti├¬n, AI bß╗ï ├⌐p phß║úi g├╡ lß╗çnh `gh pr list --state open` tr├¬n terminal. Lß╗çnh n├áy sß║╜ hiß╗ân thß╗ï tß║Ñt cß║ú c├íc Pull Request ─æang mß╗ƒ cß╗ºa c├íc "─æß╗ông nghiß╗çp" AI kh├íc. N├│ sß║╜ ─æß╗ìc ti├¬u ─æß╗ü v├á xem c├│ ai ─æang ─æß╗Öng v├áo file n├│ sß║»p sß╗¡a kh├┤ng. Nß║┐u c├│ m├╣i nguy hiß╗âm, n├│ sß║╜ tß╗▒ ─æß╗Öng b├ío c├ío l├¬n thay v├¼ cß║»m ─æß║ºu v├áo code.

### 4. Trß╗Ñ cß╗Öt 4: Cß║únh s├ít g├íc cß╗òng (GitHub Branch Protection)
*   **Ch├║ng ta ─æ├ú l├ám g├¼?** Viß║┐t t├ái liß╗çu `docs/github-setup-instructions.md` h╞░ß╗¢ng dß║½n bß║ín v├áo Setting cß╗ºa GitHub ─æß╗â bß║¡t Branch Protection (Bß║úo vß╗ç nh├ính).
*   **Tß║íi sao lß║íi l├ám thß║┐?** Nß║┐u AI n├áo ─æ├│ "nß╗òi loß║ín" bypass cß║ú 3 lß╗¢p tr├¬n v├á d├╣ng lß╗çnh `git push --force` ─æß╗â ─æ├¿ thß║│ng code cß╗ºa n├│ l├¬n nh├ính `main` hoß║╖c ─æ├¿ l├¬n nh├ính cß╗ºa ─æß╗ông nghiß╗çp th├¼ sao?
*   **T├íc dß╗Ñng thß╗▒c tß║┐:** 
    *   Chß║╖n `git push` thß║│ng v├áo `main`. Bß║»t buß╗Öc mß╗ìi code phß║úi ─æi qua Pull Request.
    *   Chß║╖n ─æß║⌐y code ch├⌐o: Nh├ính `feat/task-1` do AI Sß╗æ 1 tß║ío ra th├¼ chß╗ë t├ái khoß║ún cß╗ºa AI Sß╗æ 1 mß╗¢i ─æ╞░ß╗úc push l├¬n ─æ├│. AI Sß╗æ 2 push v├áo sß║╜ bß╗ï GitHub tß╗½ chß╗æi truy cß║¡p (Permission Denied) ß╗ƒ cß║Ñp ─æß╗Ö Server.

---

## ≡ƒ¢á T├│m lß║íi: V├▓ng ─æß╗¥i cß╗ºa mß╗Öt Task sau khi c├│ hß╗ç thß╗æng n├áy

Khi bß║ín giao mß╗Öt task cho mß╗Öt AI, n├│ sß║╜ phß║úi trß║úi qua con ─æ╞░ß╗¥ng sau:

1. **Tß╗ënh dß║¡y & Ng├│ nghi├¬ng:** AI g├╡ `gh pr list`. Xem c├íc nh├ính kh├íc ─æang l├ám g├¼. Thß║Ñy an to├án -> ─Éi tiß║┐p.
2. **Xin ph├⌐p (Lock):** AI gß╗ìi MCP tool `lock_files` ─æ╞░a danh s├ích c├íc file n├│ ─æß╗ïnh sß╗¡a. Database cho ph├⌐p -> ─Éi tiß║┐p. (Nß║┐u tr├╣ng file ng╞░ß╗¥i kh├íc -> B├ío BLOCKED).
3. **C├┤ lß║¡p (Branch):** AI tß╗▒ ─æß╗Öng tß║ío mß╗Öt nh├ính mß╗¢i tinh tß╗½ `main` (v├¡ dß╗Ñ `feat/task-123`).
4. **Viß║┐t Code & Test:** Cß╗⌐ y├¬n t├óm m├á code v├¼ biß║┐t chß║»c kh├┤ng ai gi├ánh file vß╗¢i m├¼nh.
5. **Xin gß╗Öp code (PR):** ─Éß║⌐y code l├¬n nh├ính cß╗ºa m├¼nh. Tß║ío Pull Request. 
6. **Kiß╗âm duyß╗çt (CODEOWNERS):** GitHub gß╗ìi t├¬n @admintp v├áo xem. Bß║ín OK th├¼ mß╗¢i ─æ╞░ß╗úc merge. Hß╗ç thß╗æng tß╗▒ ─æß╗Öng nhß║ú kh├│a (unlock file) cho ng╞░ß╗¥i kh├íc l├ám.

## ≡ƒÆí B├ái hß╗ìc r├║t ra cho c├íc Project t╞░╞íng lai

Khi bß║ín build mß╗Öt hß╗ç thß╗æng Multi-Agent AI, ─æß╗½ng ngh─⌐ ─æß║┐n viß╗çc "L├ám sao ─æß╗â AI code giß╗Åi h╞ín?". H├úy ngh─⌐ ─æß║┐n viß╗çc:
1. **Thiß║┐t kß║┐ kiß║┐n tr├║c hß╗ç thß╗æng (Architecture) ─æß╗â dß╗à chia viß╗çc:** FSD l├á mß╗Öt v├¡ dß╗Ñ tuyß╗çt vß╗¥i. H├úy chia project th├ánh c├íc hß╗Öp nhß╗Å ─æß╗Öc lß║¡p.
2. **Quß║ún l├╜ State (Trß║íng th├íi) ß╗ƒ m├┤i tr╞░ß╗¥ng chia sß║╗:** ─Éß╗½ng ─æß╗â AI l╞░u trß║íng th├íi tr├¬n m├íy local cß╗ºa n├│. Giß╗æng nh╞░ c├íi bß║úng `active_locks` tr├¬n database, phß║úi c├│ mß╗Öt "C├íi Bß║úng Th├┤ng B├ío Chung" ─æß╗â tß║Ñt cß║ú AI c├╣ng nh├¼n v├áo.
3. **Trß╗½ng phß║ít/Ng─ân chß║╖n ß╗ƒ cß║Ñp thß║Ñp nhß║Ñt:** Prompts (lß╗¥i nhß║»c) c├│ thß╗â bß╗ï AI lß╗¥ ─æi, nh╞░ng Database Schema (Unique constraint), GitHub Rules (Branch protection) l├á nhß╗»ng r├áo cß║ún vß║¡t l├╜ m├á AI kh├┤ng thß╗â c├úi lß║íi. X├óy dß╗▒ng luß║¡t lß╗ç bß║▒ng phß║ºn cß╗⌐ng thay v├¼ chß╗ë n├│i mß╗ôm.

---

## ≡ƒñû Phß╗Ñ Lß╗Ñc: C╞í Chß║┐ Thao T├íc Cß╗ºa AI (C├ích AI Tß╗▒ ─Éß╗Öng Code Chuß║⌐n X├íc)

─Éß╗â hß╗ç thß╗æng n├áy ─æ╞░ß╗úc c├ái ─æß║╖t mß╗Öt c├ích ch├¡nh x├íc v├áo dß╗▒ ├ín, ch├║ng ta kh├┤ng d├╣ng c├ích "AI nh├áo v├┤ sß╗¡a ─æß║íi". Thay v├áo ─æ├│, ch├║ng ta ├íp dß╗Ñng quy tr├¼nh **Subagent-Driven Development (Ph├ít triß╗ân dß╗▒a tr├¬n c├íc ─Éß║╖c vß╗Ñ con)**. ─É├óy l├á c├ích quß║ún l├╜ AI chuy├¬n nghiß╗çp m├á bß║ín c├│ thß╗â ß╗⌐ng dß╗Ñng ─æß╗â y├¬u cß║ºu AI l├ám c├íc dß╗▒ ├ín phß╗⌐c tß║íp sau n├áy:

### B╞░ß╗¢c 1: Viß║┐t Bß║ún Kß║┐ Hoß║ích (Planning)
Thay v├¼ nhß║úy v├áo code ngay, AI (─æ├│ng vai tr├▓ Quß║ún l├╜) tß║ío ra mß╗Öt Bß║ún kß║┐ hoß║ích triß╗ân khai (Implementation Plan) d╞░ß╗¢i dß║íng Markdown (`docs/superpowers/plans/...`).
*   Bß║ún kß║┐ hoß║ích chia dß╗▒ ├ín th├ánh c├íc Task nhß╗Å (VD: Task 1: Cß║¡p nhß║¡t GEMINI.md, Task 2: Tß║ío CODEOWNERS...).
*   X├íc ─æß╗ïnh **ch├¡nh x├íc tß╗½ng ─æoß║ín text n├áo cß║ºn th├¬m v├áo file n├áo**. AI kh├┤ng tß╗▒ "ngh─⌐ ra" trong l├║c code, mß╗ìi thß╗⌐ ─æ├ú ─æ╞░ß╗úc chß╗æt tß╗½ Plan.

### B╞░ß╗¢c 2: K├¡ch hoß║ít Quy tr├¼nh "─Éß║╖c vß╗Ñ con" (Subagents)
Vß╗¢i mß╗ùi Task trong kß║┐ hoß║ích, AI Quß║ún l├╜ sß║╜ ─æiß╗üu phß╗æi mß╗Öt v├▓ng lß║╖p 3 b╞░ß╗¢c kh├⌐p k├¡n. Thay v├¼ tß╗▒ l├ám dß╗à bß╗ï loß║ín Context, n├│ gß╗ìi c├íc "AI ─É├án Em" (Subagent):

1. **Giao viß╗çc (Dispatch Implementer):** Gß╗ìi mß╗Öt AI chuy├¬n code (`generalist`) thß╗▒c hiß╗çn task.
   * *Nhiß╗çm vß╗Ñ:* "N├áy, l├ám Task 1 ─æi. Sß╗¡a file `GEMINI.md` theo plan n├áy."
   * *C├┤ng cß╗Ñ (Tools) sß╗¡ dß╗Ñng:* N├│ gß╗ìi tool `replace` ─æß╗â thay thß║┐ v─ân bß║ún, `write_file` ─æß╗â tß║ío file mß╗¢i, v├á `run_shell_command` ─æß╗â commit code l├¬n Git.
2. **Nghiß╗çm thu y├¬u cß║ºu (Dispatch Spec Reviewer):** AI Quß║ún l├╜ KH├öNG tin t╞░ß╗ƒng ngay kß║┐t quß║ú. N├│ gß╗ìi AI thß╗⌐ hai (`codebase_investigator`) chuy├¬n ─æiß╗üu tra xem file ─æ├ú sß╗¡a c├│ ─æ├║ng nguy├¬n bß║ún kß║┐ hoß║ích ch╞░a.
   * *Nhiß╗çm vß╗Ñ:* "─Éß╗ìc file `GEMINI.md` xem thß║▒ng AI 1 l├ám ─æ├║ng kh├┤ng."
   * *C├┤ng cß╗Ñ (Tools) sß╗¡ dß╗Ñng:* D├╣ng `read_file` v├á `grep_search` ─æß╗â qu├⌐t to├án bß╗Ö m├ú nguß╗ôn. Nß║┐u thiß║┐u s├│t (v├¡ dß╗Ñ: ph├ít hiß╗çn qu├¬n cß║¡p nhß║¡t file `.kiro.md`), n├│ sß║╜ ├⌐p AI 1 phß║úi l├ám lß║íi.
3. **─É├ính gi├í chß║Ñt l╞░ß╗úng (Dispatch Code Reviewer):** Sau khi y├¬u cß║ºu ─æ├ú ─æ├║ng, gß╗ìi AI thß╗⌐ ba (`code-reviewer`) chuy├¬n bß║»t lß╗ùi logic v├á bß║úo mß║¡t.
   * *Nhiß╗çm vß╗Ñ:* "Kiß╗âm tra xem code n├áy c├│ tß╗æi ╞░u, c├│ an to├án kh├┤ng."
   * *Kß║┐t quß║ú thß╗▒c tß║┐:* Nhß╗¥ b╞░ß╗¢c n├áy m├á lß╗ùi *N+1 Query* (truy vß║Ñn DB qu├í nhiß╗üu lß║ºn) v├á *thiß║┐u RLS bß║úo mß║¡t* trong Task 4 (MCP Tool) ─æ├ú ─æ╞░ß╗úc ph├ít hiß╗çn kß╗ïp thß╗¥i v├á ├⌐p AI 1 phß║úi sß╗¡a lß║íi th├ánh Batched Query (`.in()`).

### Bß╗Ö C├┤ng Cß╗Ñ (Tools) Thao T├íc D╞░ß╗¢i Nß╗ün
─Éß╗â l├ám ─æ╞░ß╗úc nhß╗»ng viß╗çc tr├¬n m├á kh├┤ng cß║ºn con ng╞░ß╗¥i ─æß╗Ñng tay v├áo, AI sß╗¡ dß╗Ñng mß╗Öt bß╗Ö c├┤ng cß╗Ñ can thiß╗çp trß╗▒c tiß║┐p v├áo m├íy t├¡nh cß╗ºa bß║ín:
*   `read_file` & `grep_search`: Giß╗æng nh╞░ ─æ├┤i mß║»t, ─æß╗â ─æß╗ìc v├á t├¼m vß╗ï tr├¡ ch├¡nh x├íc cß║ºn sß╗¡a.
*   `replace`: Sß╗¡a file kiß╗âu phß║½u thuß║¡t (Surgical). Chß╗ë thay thß║┐ ─æ├║ng c├óu chß╗» cß║ºn thiß║┐t, kh├┤ng l├ám hß╗Ång code xung quanh.
*   `write_file`: Tß║ío file mß╗¢i ho├án to├án (nh╞░ khi tß║ío `CODEOWNERS` hay file `.sql`).
*   `run_shell_command`: Giß╗æng nh╞░ ─æ├┤i tay, d├╣ng ─æß╗â g├╡ lß╗çnh terminal (`git add`, `git commit`, `pnpm lint`).

**≡ƒÆí Lß╗¥i khuy├¬n cho bß║ín:** Khi y├¬u cß║ºu AI l├ám t├¡nh n─âng lß╗¢n ß╗ƒ c├íc dß╗▒ ├ín sau, h├úy lu├┤n bß║»t ─æß║ºu bß║▒ng Prompt: *"H├úy ph├ón t├¡ch dß╗▒ ├ín, viß║┐t Plan chi tiß║┐t, v├á d├╣ng quy tr├¼nh Subagent ─æß╗â l├ám tß╗½ng b╞░ß╗¢c. L├ám xong b╞░ß╗¢c n├áo phß║úi tß╗▒ ─æß╗Öng Code Review b╞░ß╗¢c ─æ├│ tr╞░ß╗¢c khi ─æi tiß║┐p."*
