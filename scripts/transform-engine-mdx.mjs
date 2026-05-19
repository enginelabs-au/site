import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";

const IMPORT = `import {
  EngineSpecLead,
  EngineSpecRetires,
  EngineSpecIO,
  EngineSpecIntegrations,
  EngineSpecScope,
  EngineSpecCommercial,
} from "@/app/_components/engine-spec";

`;

const SECTION_ORDER = [
  { key: "lead", end: "## The work it retires" },
  { key: "retires", end: "## Inputs" },
  { key: "io", end: "## Typical integrations" },
  { key: "integrations", end: "## What's included" },
  { key: "scope", end: "## Human review" },
  { key: "commercial", end: null },
];

const WRAPPERS = {
  lead: "EngineSpecLead",
  retires: "EngineSpecRetires",
  io: "EngineSpecIO",
  integrations: "EngineSpecIntegrations",
  scope: "EngineSpecScope",
  commercial: "EngineSpecCommercial",
};

function demoteHeadings(text) {
  return text
    .replace(/^## /gm, "### ")
    .replace(/^### (Inputs|Outputs|What's included|What's not included|Human review|Price detail|Typical timeline|Brief gate)$/gm, "### $1");
}

function extractSections(body) {
  const markers = [
    "## The work it retires",
    "## Inputs",
    "## Typical integrations",
    "## What's included",
    "## Human review",
  ];
  const indices = markers
    .map((m) => ({ m, i: body.indexOf(m) }))
    .filter((x) => x.i >= 0);

  const leadEnd = indices[0]?.i ?? body.length;
  const lead = body.slice(0, leadEnd).trim();

  const parts = {};
  let cursor = leadEnd;
  const slices = [
    ["retires", "## The work it retires", "## Inputs"],
    ["io", "## Inputs", "## Typical integrations"],
    ["integrations", "## Typical integrations", "## What's included"],
    ["scope", "## What's included", "## Human review"],
    ["commercial", "## Human review", null],
  ];

  for (const [key, startMarker, endMarker] of slices) {
    const start = body.indexOf(startMarker, cursor);
    if (start < 0) continue;
    const contentStart = start + startMarker.length;
    const end =
      endMarker != null ? body.indexOf(endMarker, contentStart) : body.length;
    let chunk = body.slice(contentStart, end).trim();
    if (key !== "retires" && key !== "integrations") {
      chunk = demoteHeadings(chunk);
    }
    parts[key] = chunk;
    cursor = contentStart;
  }

  return { lead, ...parts };
}

function wrap(name, content) {
  if (!content) return "";
  return `<${name}>\n\n${content}\n\n</${name}>`;
}

const dir = path.join(process.cwd(), "content/engines");
for (const file of readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
  const raw = readFileSync(path.join(dir, file), "utf8");
  const { lead, retires, io, integrations, scope, commercial } = extractSections(raw);
  const out = [
    IMPORT,
    wrap("EngineSpecLead", lead),
    wrap("EngineSpecRetires", retires),
    wrap("EngineSpecIO", io),
    wrap("EngineSpecIntegrations", integrations),
    wrap("EngineSpecScope", scope),
    wrap("EngineSpecCommercial", commercial),
  ]
    .filter(Boolean)
    .join("\n\n");
  writeFileSync(path.join(dir, file), out);
  console.log("transformed", file);
}
