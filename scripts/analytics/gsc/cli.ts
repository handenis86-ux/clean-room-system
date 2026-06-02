#!/usr/bin/env bun
import {
  getSCClient,
  SITE,
  getDateRange,
  fmtN,
  fmtPct,
  fmtPos,
  PHARMA_INTENT_PATTERNS,
} from "./client";

const args = process.argv.slice(2);
const cmd = args[0];

const HELP = `
Search Console CLI for cleanroom.uz

USAGE
  bun run cli.ts <command> [days] [limit]

COMMANDS
  test                       Verify connection + list accessible sites
  summary [days=7]           Total clicks / impressions / CTR / avg position
  queries [days=7] [limit=50] Top search queries
  pages [days=7] [limit=30]  Top pages
  devices [days=7]           Desktop / mobile / tablet split
  countries [days=7] [lim=10] Top countries
  pharma-queries [days=7]    Queries matching pharma/GMP/cleanroom intent
  growth-opportunities [days=7]  Queries at position 4-20 with impressions
`.trim();

const printHr = (n = 65) => console.log("─".repeat(n));

async function query(body: Record<string, unknown>) {
  const sc = await getSCClient();
  const res = await sc.searchanalytics.query({
    siteUrl: SITE,
    requestBody: body,
  });
  return res.data.rows || [];
}

async function cmdTest() {
  console.log("Testing GSC connection…");
  console.log(`Site: ${SITE}`);
  const sc = await getSCClient();
  const sites = await sc.sites.list();
  const list = sites.data.siteEntry || [];
  console.log(`OAuth user has access to ${list.length} sites:`);
  for (const s of list) {
    const flag = s.siteUrl === SITE ? "★" : " ";
    console.log(`  ${flag} ${s.siteUrl}   [${s.permissionLevel}]`);
  }
  const matched = list.find((s) => s.siteUrl === SITE);
  if (!matched) {
    console.error(`\n❌ Sites list does not contain ${SITE}`);
    console.error("   Check GSC_SITE_URL format — must match what GSC shows.");
    process.exit(1);
  }
  console.log("\n✅ Access confirmed. Running smoke query…");
  const rows = await query({
    startDate: "2024-01-01",
    endDate: new Date().toISOString().split("T")[0],
    dimensions: ["query"],
    rowLimit: 1,
  });
  console.log(`Got ${rows.length} sample row(s). OK.`);
}

async function cmdSummary(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const rows = await query({ startDate, endDate, rowLimit: 1 });

  console.log(`\n🔎 GSC Summary — last ${days}d (${startDate} → ${endDate})`);
  printHr();
  const r = rows[0];
  if (!r) {
    console.log("No data for this period (GSC has 2-3 day delay).");
    return;
  }
  console.log(`Clicks:        ${fmtN(r.clicks || 0)}`);
  console.log(`Impressions:   ${fmtN(r.impressions || 0)}`);
  console.log(`CTR:           ${fmtPct(r.ctr || 0)}`);
  console.log(`Avg Position:  ${fmtPos(r.position || 0)}`);
  console.log();
}

async function cmdQueries(days: number, limit: number) {
  const { startDate, endDate } = getDateRange(days);
  const rows = await query({
    startDate,
    endDate,
    dimensions: ["query"],
    rowLimit: limit,
  });

  console.log(`\n🔍 Top ${limit} queries — last ${days}d`);
  printHr();
  console.log("Pos  Clicks   Impr   CTR     Query");
  rows.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
  for (const r of rows) {
    console.log(
      `${fmtPos(r.position || 0).padStart(4)}  ${fmtN(r.clicks || 0).padStart(6)}  ${fmtN(r.impressions || 0).padStart(6)}  ${fmtPct(r.ctr || 0).padStart(6)}  ${r.keys?.[0] || "—"}`
    );
  }
  console.log();
}

async function cmdPages(days: number, limit: number) {
  const { startDate, endDate } = getDateRange(days);
  const rows = await query({
    startDate,
    endDate,
    dimensions: ["page"],
    rowLimit: limit,
  });

  console.log(`\n📄 Top ${limit} pages — last ${days}d`);
  printHr();
  rows.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
  for (const r of rows) {
    console.log(
      `${r.keys?.[0] || "—"}\n  pos=${fmtPos(r.position || 0)} clicks=${fmtN(r.clicks || 0)} impr=${fmtN(r.impressions || 0)} ctr=${fmtPct(r.ctr || 0)}`
    );
  }
  console.log();
}

async function cmdDevices(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const rows = await query({
    startDate,
    endDate,
    dimensions: ["device"],
    rowLimit: 10,
  });

  console.log(`\n📱 Devices — last ${days}d`);
  printHr();
  for (const r of rows) {
    const d = r.keys?.[0] || "—";
    console.log(
      `  ${d.padEnd(10)} clicks=${fmtN(r.clicks || 0)} impr=${fmtN(r.impressions || 0)} ctr=${fmtPct(r.ctr || 0)} pos=${fmtPos(r.position || 0)}`
    );
  }
  console.log();
}

async function cmdCountries(days: number, limit: number) {
  const { startDate, endDate } = getDateRange(days);
  const rows = await query({
    startDate,
    endDate,
    dimensions: ["country"],
    rowLimit: limit,
  });

  console.log(`\n🌍 Countries — last ${days}d`);
  printHr();
  rows.sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
  for (const r of rows) {
    const c = r.keys?.[0]?.toUpperCase() || "—";
    console.log(
      `  ${c.padEnd(4)} clicks=${fmtN(r.clicks || 0)} impr=${fmtN(r.impressions || 0)} ctr=${fmtPct(r.ctr || 0)}`
    );
  }
  console.log();
}

async function cmdPharmaQueries(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const rows = await query({
    startDate,
    endDate,
    dimensions: ["query"],
    rowLimit: 1000,
  });

  console.log(`\n💊 Pharma / GMP / cleanroom queries — last ${days}d`);
  printHr();
  const matched = rows.filter((r) =>
    PHARMA_INTENT_PATTERNS.some((p) => p.test(r.keys?.[0] || ""))
  );
  matched.sort((a, b) => (b.impressions || 0) - (a.impressions || 0));

  if (matched.length === 0) {
    console.log("Нет matched queries за период.");
  } else {
    let totalCl = 0;
    let totalIm = 0;
    console.log("Pos  Clicks   Impr   CTR     Query");
    for (const r of matched) {
      totalCl += r.clicks || 0;
      totalIm += r.impressions || 0;
      console.log(
        `${fmtPos(r.position || 0).padStart(4)}  ${fmtN(r.clicks || 0).padStart(6)}  ${fmtN(r.impressions || 0).padStart(6)}  ${fmtPct(r.ctr || 0).padStart(6)}  ${r.keys?.[0]}`
      );
    }
    console.log(
      `\nИтого pharma-intent: ${matched.length} queries, clicks=${fmtN(totalCl)} impr=${fmtN(totalIm)}`
    );
  }
  console.log();
}

async function cmdGrowthOpportunities(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const rows = await query({
    startDate,
    endDate,
    dimensions: ["query"],
    rowLimit: 1000,
  });

  console.log(
    `\n🚀 Growth opportunities (position 4-20 with impr) — last ${days}d`
  );
  printHr();
  const opps = rows.filter(
    (r) =>
      (r.position || 0) >= 4 &&
      (r.position || 0) <= 20 &&
      (r.impressions || 0) >= 5
  );
  opps.sort((a, b) => (b.impressions || 0) - (a.impressions || 0));

  if (opps.length === 0) {
    console.log("Нет opportunities за период.");
  } else {
    console.log("Pos  Clicks   Impr   CTR     Query");
    for (const r of opps.slice(0, 50)) {
      console.log(
        `${fmtPos(r.position || 0).padStart(4)}  ${fmtN(r.clicks || 0).padStart(6)}  ${fmtN(r.impressions || 0).padStart(6)}  ${fmtPct(r.ctr || 0).padStart(6)}  ${r.keys?.[0]}`
      );
    }
    console.log(`\nИтого opportunities: ${opps.length}`);
  }
  console.log();
}

async function main() {
  if (!cmd || ["help", "--help", "-h"].includes(cmd)) {
    console.log(HELP);
    return;
  }
  const a1 = args[1];
  const a2 = args[2];
  const days = a1 ? parseInt(a1) : 7;
  const limit = a2 ? parseInt(a2) : 50;

  try {
    switch (cmd) {
      case "test": await cmdTest(); break;
      case "summary": await cmdSummary(days); break;
      case "queries": await cmdQueries(days, limit); break;
      case "pages": await cmdPages(days, a2 ? parseInt(a2) : 30); break;
      case "devices": await cmdDevices(days); break;
      case "countries": await cmdCountries(days, a2 ? parseInt(a2) : 10); break;
      case "pharma-queries": await cmdPharmaQueries(days); break;
      case "growth-opportunities": await cmdGrowthOpportunities(days); break;
      default:
        console.error(`Unknown command: ${cmd}`);
        console.log(HELP);
        process.exit(1);
    }
  } catch (err: any) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

main();
