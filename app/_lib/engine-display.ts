import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Cpu,
  MessageCircle,
  Receipt,
  RefreshCw,
  Rocket,
  Send,
  TrendingUp,
} from "lucide-react";
import type { EngineSlug } from "@/app/_lib/engines";

export type EngineDisplayMeta = {
  badge: string;
  Icon: LucideIcon;
};

/** Homepage row styling — badge + icon per Engine slug. */
export const ENGINE_DISPLAY: Record<EngineSlug, EngineDisplayMeta> = {
  sales: { badge: "Revenue", Icon: TrendingUp },
  ops: { badge: "Operations", Icon: RefreshCw },
  support: { badge: "Customer service", Icon: MessageCircle },
  insight: { badge: "Intelligence", Icon: BarChart3 },
  founder: { badge: "Product", Icon: Rocket },
  knowledge: { badge: "Docs", Icon: BookOpen },
  "back-office": { badge: "Admin", Icon: Receipt },
  outreach: { badge: "Support", Icon: Send },
};

/** Fallback for bespoke / custom positioning copy on catalog pages. */
export const CUSTOM_ENGINE_DISPLAY: EngineDisplayMeta = {
  badge: "Bespoke",
  Icon: Cpu,
};
