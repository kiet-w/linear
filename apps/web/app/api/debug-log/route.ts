import { appendFile } from "node:fs/promises";
import { resolve } from "node:path";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const logPath = resolve(process.cwd(), "../../debug-1acbe4.log");
    await appendFile(logPath, `${JSON.stringify(payload)}\n`, "utf8");
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
