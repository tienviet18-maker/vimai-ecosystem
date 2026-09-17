"""Emit D1 UPDATE statements from src/lib/seed.ts."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SEED = ROOT / "src" / "lib" / "seed.ts"
OUT = ROOT / "d1" / "migrations" / "0002_product_hub_content.sql"


def unescape(value: str) -> str:
    return value.replace('\\"', '"').replace("\\n", "\n")


def sql_quote(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def extract_products(ts: str) -> list[dict]:
    products = []
    blocks = re.split(r"\n  \{\n    id:", ts)
    for block in blocks[1:]:
        ident = re.search(r'"([0-9a-f-]{36})"', block)
        slug = re.search(r'slug:\s*"([^"]+)"', block)
        website = re.search(r'website_url:\s*"([^"]+)"', block)
        logo = re.search(r'logo_url:\s*"([^"]+)"', block)
        if not ident or not slug:
            continue
        translations = []
        for loc in ("ja", "vi", "en"):
            match = re.search(
                rf'locale:\s*"{loc}",\s*name:\s*"([^"]+)",\s*tagline:\s*"([^"]+)",\s*description:\s*"((?:\\.|[^"\\])*)",\s*long_description:\s*"((?:\\.|[^"\\])*)",\s*target_audience:\s*"((?:\\.|[^"\\])*)",\s*features:\s*\[(.*?)\]',
                block,
                re.S,
            )
            if not match:
                continue
            features = re.findall(r'"((?:\\.|[^"\\])*)"', match.group(6))
            translations.append(
                {
                    "locale": loc,
                    "name": unescape(match.group(1)),
                    "tagline": unescape(match.group(2)),
                    "description": unescape(match.group(3)),
                    "long_description": unescape(match.group(4)),
                    "target_audience": unescape(match.group(5)),
                    "features": [unescape(item) for item in features],
                }
            )
        products.append(
            {
                "id": ident.group(1),
                "slug": slug.group(1),
                "website_url": website.group(1) if website else None,
                "logo_url": logo.group(1) if logo else None,
                "translations": translations,
            }
        )
    return products


def main() -> None:
    products = extract_products(SEED.read_text(encoding="utf-8"))
    lines = [
        "-- Product hub content upgrade. Idempotent UPDATEs.",
        "PRAGMA foreign_keys = ON;",
        "",
    ]
    for product in products:
        sets = []
        if product["website_url"]:
            sets.append(f"website_url = {sql_quote(product['website_url'])}")
        if product["logo_url"]:
            sets.append(f"logo_url = {sql_quote(product['logo_url'])}")
        if sets:
            lines.append(
                f"UPDATE products SET {', '.join(sets)}, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = {sql_quote(product['id'])};"
            )
        for translation in product["translations"]:
            features = json.dumps(translation["features"], ensure_ascii=False)
            lines.append(
                "UPDATE product_translations SET "
                f"name = {sql_quote(translation['name'])}, "
                f"tagline = {sql_quote(translation['tagline'])}, "
                f"description = {sql_quote(translation['description'])}, "
                f"long_description = {sql_quote(translation['long_description'])}, "
                f"target_audience = {sql_quote(translation['target_audience'])}, "
                f"features = {sql_quote(features)} "
                f"WHERE product_id = {sql_quote(product['id'])} AND locale = {sql_quote(translation['locale'])};"
            )
        lines.append("")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {OUT} ({len(products)} products, translations={sum(len(p['translations']) for p in products)})")


if __name__ == "__main__":
    main()
