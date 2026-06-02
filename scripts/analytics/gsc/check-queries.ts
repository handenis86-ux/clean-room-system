#!/usr/bin/env bun
import { getSCClient, SITE, fmtN, fmtPct, fmtPos } from "./client";

const sc = await getSCClient();

const queries = process.argv.slice(2);
if (queries.length === 0) {
  console.error('Usage: bun run check-queries.ts "query 1" "query 2" ...');
  console.error("Defaults to UZB-only impressions for last 30 days.");
  process.exit(1);
}

const COUNTRY = "uzb"; // Uzbekistan (ISO-3)
const DAYS = 30;
const end = new Date();
end.setDate(end.getDate() - 2); // GSC lag
const start = new Date(end);
start.setDate(end.getDate() - DAYS + 1);
const startDate = start.toISOString().split("T")[0];
const endDate = end.toISOString().split("T")[0];

console.log(
  `\n🔎 Позиции в Search Console для Узбекистана (${startDate} → ${endDate})\n`
);
console.log("─".repeat(80));

for (const q of queries) {
  // Try filtering by exact query + country=UZB.
  const res = await sc.searchanalytics.query({
    siteUrl: SITE,
    requestBody: {
      startDate,
      endDate,
      dimensions: ["query", "page"],
      dimensionFilterGroups: [
        {
          filters: [
            { dimension: "query", expression: q, operator: "equals" },
            { dimension: "country", expression: COUNTRY, operator: "equals" },
          ],
        },
      ],
      rowLimit: 5,
    },
  });
  const rows = res.data.rows || [];

  console.log(`\nЗапрос: «${q}»`);
  if (rows.length === 0) {
    // Maybe ranked globally but not specifically UZB. Try without country filter.
    const global = await sc.searchanalytics.query({
      siteUrl: SITE,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query"],
        dimensionFilterGroups: [
          {
            filters: [
              { dimension: "query", expression: q, operator: "equals" },
            ],
          },
        ],
        rowLimit: 1,
      },
    });
    const gRows = global.data.rows || [];
    if (gRows.length === 0) {
      console.log(
        "  ❌ Не ранжируется в топ-100 ни в UZ, ни глобально (0 показов за 30 дн.)"
      );
    } else {
      const r = gRows[0];
      console.log(
        `  ⚠️ В UZ — 0 показов. Глобально: pos ${fmtPos(r.position || 0)}, показов ${fmtN(r.impressions || 0)}, кликов ${fmtN(r.clicks || 0)}, CTR ${fmtPct(r.ctr || 0)}`
      );
    }
  } else {
    for (const r of rows) {
      console.log(
        `  ✅ pos ${fmtPos(r.position || 0)} | показов ${fmtN(r.impressions || 0)} | кликов ${fmtN(r.clicks || 0)} | CTR ${fmtPct(r.ctr || 0)}`
      );
      console.log(`     URL: ${r.keys?.[1]}`);
    }
  }
}

console.log("\n" + "─".repeat(80));
