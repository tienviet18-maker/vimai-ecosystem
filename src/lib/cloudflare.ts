import { getRequestContext } from "@cloudflare/next-on-pages";

type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
  all<T = Record<string, unknown>>(): Promise<{ results?: T[] }>;
};

export type D1Database = {
  prepare(query: string): D1PreparedStatement;
};

export type R2ObjectBody = {
  body: ReadableStream;
  httpMetadata?: { contentType?: string };
  size?: number;
};

export type R2Bucket = {
  put(
    key: string,
    value: ArrayBuffer | Uint8Array,
    options?: { httpMetadata?: { contentType?: string; cacheControl?: string } },
  ): Promise<unknown>;
  get(key: string): Promise<R2ObjectBody | null>;
  delete(key: string): Promise<void>;
};

export type CmsBindings = {
  DB: D1Database;
  MEDIA: R2Bucket;
  AUTH_SECRET?: string;
  OPS_HMAC_SECRET?: string;
};

export function getBindings(): Partial<CmsBindings> {
  try {
    return getRequestContext().env as CmsBindings;
  } catch {
    return {};
  }
}

export function getDb(): D1Database | null {
  return getBindings().DB ?? null;
}

export function getR2(): R2Bucket | null {
  return getBindings().MEDIA ?? null;
}

export function isCmsConfigured() {
  return Boolean(getDb());
}

export function getAuthSecret() {
  return process.env.AUTH_SECRET || getBindings().AUTH_SECRET || "";
}

export function getOpsSecret() {
  return process.env.OPS_HMAC_SECRET || getBindings().OPS_HMAC_SECRET || "";
}

export function isAuthConfigured() {
  return getAuthSecret().length >= 32;
}

export function newId() {
  return crypto.randomUUID();
}

export function nowIso() {
  return new Date().toISOString();
}

export function asBool(value: unknown) {
  return value === 1 || value === true || value === "1";
}

export function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
