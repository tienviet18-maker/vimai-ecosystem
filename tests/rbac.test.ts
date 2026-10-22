import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { can, isAdminRole, isProtectedSuperAdmin, normalizeProtectedEmail } from "../src/lib/rbac.ts";

test("role parser", () => {
  assert.equal(isAdminRole("SUPER_ADMIN"), true);
  assert.equal(isAdminRole("ADMIN"), true);
  assert.equal(isAdminRole("EDITOR"), true);
  assert.equal(isAdminRole("user"), false);
});

test("SUPER_ADMIN has full access", () => {
  assert.equal(can("SUPER_ADMIN", "users"), true);
  assert.equal(can("SUPER_ADMIN", "settings"), true);
  assert.equal(can("SUPER_ADMIN", "audit"), true);
  assert.equal(can("SUPER_ADMIN", "products"), true);
});

test("ADMIN cannot perform SUPER_ADMIN security operations", () => {
  assert.equal(can("ADMIN", "products"), true);
  assert.equal(can("ADMIN", "messages"), true);
  assert.equal(can("ADMIN", "seo"), true);
  assert.equal(can("ADMIN", "users"), false);
  assert.equal(can("ADMIN", "settings"), false);
  assert.equal(can("ADMIN", "audit"), false);
});

test("EDITOR is limited to content", () => {
  assert.equal(can("EDITOR", "articles"), true);
  assert.equal(can("EDITOR", "faqs"), true);
  assert.equal(can("EDITOR", "users"), false);
  assert.equal(can("EDITOR", "messages"), false);
  assert.equal(can("EDITOR", "settings"), false);
  assert.equal(can("EDITOR", "seo"), false);
  assert.equal(can("EDITOR", "categories"), false);
});

test("protected emergency account comes from env, matched case-insensitively", () => {
  assert.equal(isProtectedSuperAdmin("Owner@Example.com", " owner@example.com "), true);
  assert.equal(isProtectedSuperAdmin("other@example.com", "owner@example.com"), false);
});

test("unset or blank SUPER_ADMIN_EMAIL protects nobody", () => {
  for (const unset of [undefined, null, "", "   ", "not-an-email"]) {
    assert.equal(normalizeProtectedEmail(unset), "");
    assert.equal(isProtectedSuperAdmin("", unset), false);
    assert.equal(isProtectedSuperAdmin("owner@example.com", unset), false);
    assert.equal(isProtectedSuperAdmin(undefined, unset), false);
  }
});

test("protected email is not hard-coded in source", () => {
  for (const file of ["src/lib/rbac.ts", "src/components/admin/UsersManager.tsx", "src/app/api/admin/users/route.ts"]) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /PROTECTED_SUPER_ADMIN_EMAIL|@gmail\.com/);
  }
});

test("only SUPER_ADMIN can manage CTV money", () => {
  assert.equal(can("SUPER_ADMIN", "ctv"), true);
  assert.equal(can("ADMIN", "ctv"), false);
  assert.equal(can("EDITOR", "ctv"), false);
});
