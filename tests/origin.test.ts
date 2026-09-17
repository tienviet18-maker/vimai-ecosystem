import assert from "node:assert/strict";
import { test } from "node:test";
import { assertSameOrigin } from "../src/lib/origin.ts";

test("same-origin fetch is accepted", () => {
  const request = new Request("https://vimai.jp/api/admin/products", {
    method: "POST",
    headers: { "sec-fetch-site": "same-origin" },
  });
  assert.equal(assertSameOrigin(request), true);
});

test("matching Origin and Host are accepted", () => {
  const request = new Request("https://vimai.jp/api/admin/products", {
    method: "POST",
    headers: { origin: "https://vimai.jp", host: "vimai.jp" },
  });
  assert.equal(assertSameOrigin(request), true);
});

test("invalid Origin is rejected", () => {
  const request = new Request("https://vimai.jp/api/admin/products", {
    method: "POST",
    headers: { origin: "https://evil.example", host: "vimai.jp" },
  });
  assert.equal(assertSameOrigin(request), false);
});

test("missing Origin is rejected", () => {
  const request = new Request("https://vimai.jp/api/admin/products", {
    method: "POST",
    headers: { host: "vimai.jp" },
  });
  assert.equal(assertSameOrigin(request), false);
});
