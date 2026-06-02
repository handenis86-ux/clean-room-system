import { google, searchconsole_v1 } from "googleapis";
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

const siteUrl = process.env.GSC_SITE_URL;
if (!siteUrl) {
  console.error("Error: GSC_SITE_URL not set in .env");
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

  console.log("🌐 Открывается браузер для первичной авторизации…\n");
  const client = (await authenticate({
    keyfilePath: CLIENT_PATH,
    scopes: SCOPES,
  })) as unknown as OAuth2Client;

  writeFileSync(TOKEN_PATH, JSON.stringify(client.credentials, null, 2));
  console.log(`✅ Token saved at ${TOKEN_PATH}\n`);
  cachedAuth = client;
  return client;
}

export async function getSCClient(): Promise<searchconsole_v1.Searchconsole> {
  const saPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (saPath && existsSync(saPath)) {
    const auth = new GoogleAuth({ keyFile: saPath, scopes: SCOPES });
    const client = await auth.getClient();
    return google.searchconsole({ version: "v1", auth: client as any });
  }
  const auth = await getOAuthClient();
  return google.searchconsole({ version: "v1", auth });
}

export const SITE = siteUrl;

export function getDateRange(days: number) {
  const end = new Date();
  end.setDate(end.getDate() - 2);
  const start = new Date(end);
  start.setDate(end.getDate() - days + 1);
  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}

export const fmtN = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(Math.round(n));

export const fmtPct = (n: number) => `${(n * 100).toFixed(2)}%`;

export const fmtPos = (n: number) => n.toFixed(1);

export const PHARMA_INTENT_PATTERNS = [
  /\bgmp\b/i,
  /\biso\s*14644\b/i,
  /annex\s*1/i,
  /чист[аы][ея]?\s*помещен/i,
  /cleanroom/i,
  /стерильн/i,
  /фарма/i,
  /pharm/i,
  /биотех/i,
  /биолог[ия]/i,
  /валидац/i,
  /дезинфектант/i,
  /спорицид/i,
];
