import { IssueBoard } from "@/widgets/issue-board";

export default function Home() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-slate-100">My Tasks</h1>
      <IssueBoard />
    </div>
  );
}
