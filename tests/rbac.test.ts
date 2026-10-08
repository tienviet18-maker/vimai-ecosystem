import assert from "node:assert/strict";
import { test } from "node:test";
import { can, isAdminRole, PROTECTED_SUPER_ADMIN_EMAIL } from "../src/lib/rbac.ts";

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

test("protected emergency account email is the required super admin", () => {
  assert.equal(PROTECTED_SUPER_ADMIN_EMAIL, "vimai.support@gmail.com");
});

test("only SUPER_ADMIN can manage CTV money", () => {
  assert.equal(can("SUPER_ADMIN", "ctv"), true);
  assert.equal(can("ADMIN", "ctv"), false);
  assert.equal(can("EDITOR", "ctv"), false);
});
