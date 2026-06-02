import { google, analyticsdata_v1beta } from "googleapis";
import { OAuth2Client, GoogleAuth } from "google-auth-library";
import { authenticate } from "@google-cloud/local-auth";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, ".env");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=");
      if (key && value && !process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

const propertyId = process.env.GA_PROPERTY_ID;
if (!propertyId) {
  console.error("Error: GA_PROPERTY_ID not set in .env");
  process.exit(1);
}

const SECRETS_DIR =
  process.env.SECRETS_DIR || "D:\\projects\\CRS\\.secrets";
const CLIENT_PATH = join(SECRETS_DIR, "oauth-client.json");
const TOKEN_PATH = join(SECRETS_DIR, "oauth-token.json");

const SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/webmasters.readonly",
];

let cachedAuth: OAuth2Client | null = null;

async function getOAuthClient(): Promise<OAuth2Client> {
  if (cachedAuth) return cachedAuth;

  if (!existsSync(CLIENT_PATH)) {
    console.error(`❌ OAuth client JSON not found at ${CLIENT_PATH}`);
    console.error(
      "Download from GCP → APIs & Services → Credentials → OAuth 2.0 Client IDs"
    );
    process.exit(1);
  }

  const credentials = JSON.parse(readFileSync(CLIENT_PATH, "utf-8"));
  const installed = credentials.installed || credentials.web;
  const { client_id, client_secret, redirect_uris } = installed;

  if (existsSync(TOKEN_PATH)) {
    const client = new OAuth2Client(
      client_id,
      client_secret,
      redirect_uris?.[0]
    );
    client.setCredentials(JSON.parse(readFileSync(TOKEN_PATH, "utf-8")));
    cachedAuth = client;
    return client;
  }

  console.log("🌐 Открывается браузер для первичной авторизации…");
  console.log(`   После входа закроется автоматически. Scopes: ${SCOPES.join(", ")}\n`);
  const client = (await authenticate({
    keyfilePath: CLIENT_PATH,
    scopes: SCOPES,
  })) as unknown as OAuth2Client;

  writeFileSync(TOKEN_PATH, JSON.stringify(client.credentials, null, 2));
  console.log(`✅ Token saved at ${TOKEN_PATH}\n`);
  cachedAuth = client;
  return client;
}

export async function getGAClient(): Promise<analyticsdata_v1beta.Analyticsdata> {
  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (saPath && existsSync(saPath)) {
    const auth = new GoogleAuth({ keyFile: saPath, scopes: SCOPES });
    const client = await auth.getClient();
    return google.analyticsdata({ version: "v1beta", auth: client as any });
  }
  const auth = await getOAuthClient();
  return google.analyticsdata({ version: "v1beta", auth });
}

export function getPropertyId(): string {
  return `properties/${propertyId}`;
}

export function getDateRange(days: number) {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}

export const fmtN = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(Math.round(n));

export const fmtPct = (n: number) => `${n.toFixed(1)}%`;

export const fmtDur = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}m ${s}s`;
};

export function fmtDate(yyyymmdd: string): string {
  if (yyyymmdd.length === 8) {
    return `${yyyymmdd.slice(6, 8)}.${yyyymmdd.slice(4, 6)}`;
  }
  return yyyymmdd;
}

export const CORPORATE_DOMAINS = [
  "pharmapark.uz",
  "uzpharm.uz",
  "uzpharma.uz",
  "minzdrav.uz",
  "ssv.uz",
  "uzex.uz",
  "uzs.uz",
  "agmk.uz",
  "uzbekistan.travel",
  "lex.uz",
];

export const HIGH_INTENT_PAGE_PATTERNS = [
  "/catalog/",
  "/brands/tinman",
  "/tools/",
  "/contacts",
];

export const COMPLIANCE_PAGE_PATTERNS = [
  "/compliance/",
  "/resources/gmp-",
  "/resources/iso-",
  "/resources/annex",
  "/resources/disinfection-",
  "/resources/gowning-",
];
