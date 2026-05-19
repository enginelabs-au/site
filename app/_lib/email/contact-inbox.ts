import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), ".data");
const INBOX_FILE = path.join(DATA_DIR, "contact-inbox.json");

export type ContactInboxEntry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  surface: string;
  createdAt: string;
  delivered?: boolean;
  providerId?: string;
};

export async function appendContactInbox(
  entry: ContactInboxEntry,
): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  let list: ContactInboxEntry[] = [];
  try {
    const raw = await readFile(INBOX_FILE, "utf8");
    list = JSON.parse(raw) as ContactInboxEntry[];
    if (!Array.isArray(list)) list = [];
  } catch {
    list = [];
  }
  list.push(entry);
  await writeFile(INBOX_FILE, JSON.stringify(list, null, 2), "utf8");
}
