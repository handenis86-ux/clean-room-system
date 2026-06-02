#!/usr/bin/env bun
import {
  getGAClient,
  getPropertyId,
  getDateRange,
  fmtN,
  fmtPct,
  fmtDur,
  fmtDate,
  CORPORATE_DOMAINS,
  COMPLIANCE_PAGE_PATTERNS,
} from "./client";

const args = process.argv.slice(2);
const cmd = args[0];

const HELP = `
GA4 CLI for cleanroom.uz

USAGE
  bun run cli.ts <command> [days] [limit]

GENERAL
  test                       Verify API connection
  summary [days=7]           Users, sessions, engagement, conversions overview
  engagement [days=7]        Daily breakdown
  pages [days=7] [limit=20]  Top page paths by views
  landing [days=7] [limit=20] Top landing pages

ACQUISITION
  channels [days=7]          sessionDefaultChannelGroup breakdown
  traffic [days=7]           sessionSource / sessionMedium
  corporate-referrals [days=7]  Sessions from pharma/corporate UZ domains
  demographics [days=7]      Countries + devices

B2B CRS-SPECIFIC
  calculator-funnel [days=7]      Calculator usage + lead requests
  compliance-traffic [days=7]     Traffic to /compliance and /resources
  catalog-interest [days=7] [limit=15]  Top catalog category + product pages
  lead-events [days=7]            Messenger / form / lead events
`.trim();

const printHr = (n = 65) => console.log("─".repeat(n));

async function runReport(body: any) {
  const ga = await getGAClient();
  const res = await ga.properties.runReport({
    property: getPropertyId(),
    requestBody: body,
  });
  return res.data;
}

// ----------- GENERAL -----------

async function cmdTest() {
  console.log("Testing GA4 connection…");
  console.log(`Property: ${getPropertyId()}`);
  const res = await runReport({
    dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
    metrics: [{ name: "activeUsers" }],
  });
  const users = Number(res.rows?.[0]?.metricValues?.[0]?.value || 0);
  console.log(`✅ OK. activeUsers (7d) = ${fmtN(users)}`);
}

async function cmdSummary(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: "activeUsers" },
      { name: "newUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
      { name: "averageSessionDuration" },
      { name: "bounceRate" },
      { name: "engagementRate" },
      { name: "sessionsPerUser" },
    ],
  });
  const m = res.rows?.[0]?.metricValues || [];

  console.log(`\n📊 GA4 Summary — last ${days}d (${startDate} → ${endDate})`);
  printHr();
  console.log(`Active Users:        ${fmtN(Number(m[0]?.value || 0))}`);
  console.log(`New Users:           ${fmtN(Number(m[1]?.value || 0))}`);
  console.log(`Sessions:            ${fmtN(Number(m[2]?.value || 0))}`);
  console.log(`Page Views:          ${fmtN(Number(m[3]?.value || 0))}`);
  console.log(`Avg Session Duration: ${fmtDur(Number(m[4]?.value || 0))}`);
  console.log(`Engagement Rate:      ${fmtPct(Number(m[6]?.value || 0) * 100)}`);
  console.log(`Bounce Rate:          ${fmtPct(Number(m[5]?.value || 0) * 100)}`);
  console.log(`Sessions / User:      ${Number(m[7]?.value || 0).toFixed(2)}`);
  console.log();
}

async function cmdEngagement(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "date" }],
    metrics: [
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "engagementRate" },
      { name: "averageSessionDuration" },
    ],
    orderBys: [{ dimension: { dimensionName: "date" } }],
  });

  console.log(`\n💡 Engagement by day — last ${days}d`);
  printHr();
  console.log("Date    Users    Sessions  Engagement   Avg Time");
  for (const row of res.rows || []) {
    const date = fmtDate(row.dimensionValues?.[0]?.value || "");
    const users = Number(row.metricValues?.[0]?.value || 0);
    const sessions = Number(row.metricValues?.[1]?.value || 0);
    const eng = Number(row.metricValues?.[2]?.value || 0) * 100;
    const dur = Number(row.metricValues?.[3]?.value || 0);
    console.log(
      `${date.padEnd(7)} ${fmtN(users).padStart(6)}  ${fmtN(sessions).padStart(8)}  ${fmtPct(eng).padStart(10)}   ${fmtDur(dur)}`
    );
  }
  console.log();
}

async function cmdPages(days: number, limit: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "activeUsers" },
      { name: "averageSessionDuration" },
      { name: "bounceRate" },
    ],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit,
  });

  console.log(`\n📄 Top ${limit} pages — last ${days}d`);
  printHr();
  let i = 1;
  for (const row of res.rows || []) {
    const path = row.dimensionValues?.[0]?.value || "—";
    const views = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    const dur = Number(row.metricValues?.[2]?.value || 0);
    const bounce = Number(row.metricValues?.[3]?.value || 0) * 100;
    console.log(
      `${String(i).padStart(2)}. ${path}\n    views=${fmtN(views)} users=${fmtN(users)} time=${fmtDur(dur)} bounce=${fmtPct(bounce)}`
    );
    i++;
  }
  console.log();
}

async function cmdLanding(days: number, limit: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "landingPage" }],
    metrics: [
      { name: "sessions" },
      { name: "activeUsers" },
      { name: "bounceRate" },
    ],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit,
  });

  console.log(`\n🚀 Top ${limit} landing pages — last ${days}d`);
  printHr();
  let i = 1;
  for (const row of res.rows || []) {
    const path = row.dimensionValues?.[0]?.value || "—";
    const sessions = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    const bounce = Number(row.metricValues?.[2]?.value || 0) * 100;
    console.log(
      `${String(i).padStart(2)}. ${path}\n    sessions=${fmtN(sessions)} users=${fmtN(users)} bounce=${fmtPct(bounce)}`
    );
    i++;
  }
  console.log();
}

// ----------- ACQUISITION -----------

async function cmdChannels(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [
      { name: "sessions" },
      { name: "activeUsers" },
      { name: "newUsers" },
      { name: "engagementRate" },
      { name: "averageSessionDuration" },
    ],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  });

  console.log(`\n📊 Channels — last ${days}d`);
  printHr();
  for (const row of res.rows || []) {
    const ch = row.dimensionValues?.[0]?.value || "—";
    const sessions = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    const newU = Number(row.metricValues?.[2]?.value || 0);
    const eng = Number(row.metricValues?.[3]?.value || 0) * 100;
    const dur = Number(row.metricValues?.[4]?.value || 0);
    console.log(
      `${ch}\n  sessions=${fmtN(sessions)} users=${fmtN(users)} (${fmtN(newU)} new) eng=${fmtPct(eng)} time=${fmtDur(dur)}`
    );
  }
  console.log();
}

async function cmdTraffic(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
    metrics: [
      { name: "sessions" },
      { name: "activeUsers" },
      { name: "bounceRate" },
    ],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 25,
  });

  console.log(`\n🔗 Traffic sources — last ${days}d`);
  printHr();
  for (const row of res.rows || []) {
    const src = row.dimensionValues?.[0]?.value || "—";
    const med = row.dimensionValues?.[1]?.value || "—";
    const sessions = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    const bounce = Number(row.metricValues?.[2]?.value || 0) * 100;
    console.log(
      `${src} / ${med}\n  sessions=${fmtN(sessions)} users=${fmtN(users)} bounce=${fmtPct(bounce)}`
    );
  }
  console.log();
}

async function cmdCorporateReferrals(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "sessionSource" }],
    metrics: [{ name: "sessions" }, { name: "activeUsers" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 100,
  });

  console.log(`\n🏢 Corporate / pharma referrals — last ${days}d`);
  printHr();
  let hits = 0;
  for (const row of res.rows || []) {
    const src = (row.dimensionValues?.[0]?.value || "").toLowerCase();
    const sessions = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    if (CORPORATE_DOMAINS.some((d) => src.includes(d))) {
      console.log(`⭐ ${src}  sessions=${fmtN(sessions)} users=${fmtN(users)}`);
      hits++;
    }
  }
  if (hits === 0) {
    console.log("Нет matched referrals из CORPORATE_DOMAINS за период.");
  }
  console.log();
}

async function cmdDemographics(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const countries = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "country" }],
    metrics: [{ name: "activeUsers" }, { name: "sessions" }],
    orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    limit: 10,
  });
  const devices = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "activeUsers" }, { name: "sessions" }],
    orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
  });

  console.log(`\n🌍 Countries (top 10) — last ${days}d`);
  printHr();
  for (const row of countries.rows || []) {
    const c = row.dimensionValues?.[0]?.value || "—";
    const u = Number(row.metricValues?.[0]?.value || 0);
    const s = Number(row.metricValues?.[1]?.value || 0);
    console.log(`  ${c.padEnd(20)} users=${fmtN(u)} sessions=${fmtN(s)}`);
  }

  console.log(`\n📱 Devices — last ${days}d`);
  printHr();
  for (const row of devices.rows || []) {
    const d = row.dimensionValues?.[0]?.value || "—";
    const u = Number(row.metricValues?.[0]?.value || 0);
    const s = Number(row.metricValues?.[1]?.value || 0);
    console.log(`  ${d.padEnd(10)} users=${fmtN(u)} sessions=${fmtN(s)}`);
  }
  console.log();
}

// ----------- B2B CRS-SPECIFIC -----------

async function cmdCalculatorFunnel(days: number) {
  const { startDate, endDate } = getDateRange(days);

  const pages = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: { value: "/tools", matchType: "BEGINS_WITH" },
      },
    },
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
  });

  const used = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: {
          values: ["calculator_used", "calculator_quote_requested"],
        },
      },
    },
  });

  console.log(`\n🧮 Calculator funnel — last ${days}d`);
  printHr();
  console.log("Step 1 — Page views on /tools/*:");
  for (const row of pages.rows || []) {
    const path = row.dimensionValues?.[0]?.value || "—";
    const views = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    console.log(
      `  ${path.padEnd(40)} views=${fmtN(views)} users=${fmtN(users)}`
    );
  }

  console.log("\nStep 2-3 — Events:");
  const eventMap: Record<string, { count: number; users: number }> = {};
  for (const row of used.rows || []) {
    const ev = row.dimensionValues?.[0]?.value || "";
    eventMap[ev] = {
      count: Number(row.metricValues?.[0]?.value || 0),
      users: Number(row.metricValues?.[1]?.value || 0),
    };
  }
  const used2 = eventMap["calculator_used"] || { count: 0, users: 0 };
  const req = eventMap["calculator_quote_requested"] || { count: 0, users: 0 };
  console.log(
    `  calculator_used:              count=${fmtN(used2.count)} users=${fmtN(used2.users)}`
  );
  console.log(
    `  calculator_quote_requested:   count=${fmtN(req.count)} users=${fmtN(req.users)}`
  );
  if (used2.users > 0) {
    const conv = (req.users / used2.users) * 100;
    console.log(`\n  → Conversion used → requested: ${fmtPct(conv)}`);
  }
  console.log();
}

async function cmdComplianceTraffic(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "activeUsers" },
      { name: "averageSessionDuration" },
    ],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 200,
  });

  console.log(`\n⚖️  Compliance / pharma-intent traffic — last ${days}d`);
  printHr();
  let totalViews = 0;
  let totalUsers = 0;
  let printed = 0;
  for (const row of res.rows || []) {
    const path = row.dimensionValues?.[0]?.value || "";
    if (!COMPLIANCE_PAGE_PATTERNS.some((p) => path.startsWith(p))) continue;
    const views = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    const dur = Number(row.metricValues?.[2]?.value || 0);
    totalViews += views;
    totalUsers += users;
    console.log(
      `  ${path.padEnd(50)} views=${fmtN(views)} users=${fmtN(users)} time=${fmtDur(dur)}`
    );
    printed++;
  }
  if (printed === 0) {
    console.log("Нет трафика на compliance-страницы за период.");
  } else {
    console.log(
      `\nИтого: views=${fmtN(totalViews)} users=${fmtN(totalUsers)}`
    );
  }
  console.log();
}

async function cmdCatalogInterest(days: number, limit: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "activeUsers" },
      { name: "averageSessionDuration" },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: { value: "/catalog/", matchType: "BEGINS_WITH" },
      },
    },
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 500,
  });

  const cats: Array<{ path: string; views: number; users: number; dur: number }> = [];
  const prods: Array<{ path: string; views: number; users: number; dur: number }> = [];
  for (const row of res.rows || []) {
    const path = row.dimensionValues?.[0]?.value || "";
    const views = Number(row.metricValues?.[0]?.value || 0);
    const users = Number(row.metricValues?.[1]?.value || 0);
    const dur = Number(row.metricValues?.[2]?.value || 0);
    const seg = path.replace(/\/$/, "").split("/").filter(Boolean);
    if (seg.length === 2) cats.push({ path, views, users, dur });
    else if (seg.length >= 3) prods.push({ path, views, users, dur });
  }

  console.log(`\n📦 Catalog interest — last ${days}d`);
  printHr();
  console.log(`Top categories (top ${limit}):`);
  for (const r of cats.slice(0, limit)) {
    console.log(
      `  ${r.path.padEnd(50)} views=${fmtN(r.views)} users=${fmtN(r.users)} time=${fmtDur(r.dur)}`
    );
  }
  console.log(`\nTop products (top ${limit}):`);
  for (const r of prods.slice(0, limit)) {
    console.log(
      `  ${r.path.padEnd(50)} views=${fmtN(r.views)} users=${fmtN(r.users)} time=${fmtDur(r.dur)}`
    );
  }
  console.log();
}

async function cmdLeadEvents(days: number) {
  const { startDate, endDate } = getDateRange(days);
  const res = await runReport({
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
    dimensionFilter: {
      filter: {
        fieldName: "eventName",
        inListFilter: {
          values: [
            "messenger_click",
            "generate_lead",
            "calculator_quote_requested",
            "contact_form_submitted",
            "form_submit",
            "lead_magnet_download",
          ],
        },
      },
    },
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  });

  console.log(`\n📨 Lead events — last ${days}d`);
  printHr();
  if (!res.rows?.length) {
    console.log("Нет lead-событий за период.");
  } else {
    for (const row of res.rows) {
      const ev = row.dimensionValues?.[0]?.value || "—";
      const count = Number(row.metricValues?.[0]?.value || 0);
      const users = Number(row.metricValues?.[1]?.value || 0);
      console.log(`  ${ev.padEnd(35)} count=${fmtN(count)} users=${fmtN(users)}`);
    }
  }
  console.log();
}

// ----------- MAIN -----------

async function main() {
  if (!cmd || ["help", "--help", "-h"].includes(cmd)) {
    console.log(HELP);
    return;
  }
  const a1 = args[1];
  const a2 = args[2];
  const days = a1 ? parseInt(a1) : 7;
  const limit = a2 ? parseInt(a2) : 20;

  try {
    switch (cmd) {
      case "test": await cmdTest(); break;
      case "summary": await cmdSummary(days); break;
      case "engagement": await cmdEngagement(days); break;
      case "pages": await cmdPages(days, limit); break;
      case "landing": await cmdLanding(days, limit); break;
      case "channels": await cmdChannels(days); break;
      case "traffic": await cmdTraffic(days); break;
      case "corporate-referrals": await cmdCorporateReferrals(days); break;
      case "demographics": await cmdDemographics(days); break;
      case "calculator-funnel": await cmdCalculatorFunnel(days); break;
      case "compliance-traffic": await cmdComplianceTraffic(days); break;
      case "catalog-interest": await cmdCatalogInterest(days, a2 ? parseInt(a2) : 15); break;
      case "lead-events": await cmdLeadEvents(days); break;
      default:
        console.error(`Unknown command: ${cmd}`);
        console.log(HELP);
        process.exit(1);
    }
  } catch (err: any) {
    console.error("Error:", err.message);
    if (err.code === 403) {
      console.error("→ OAuth user doesn't have access to this GA4 property.");
    }
    process.exit(1);
  }
}

main();
