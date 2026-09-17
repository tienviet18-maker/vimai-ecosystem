"""Generate square ViMai icons and strip baked-in black icon frames."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "public" / "brand" / "vimai-logo.jpg"
PRODUCTS = ROOT / "public" / "images" / "products"


def is_near_white(px: tuple[int, int, int, int], threshold: int = 246) -> bool:
    r, g, b, a = px
    return a < 8 or (r >= threshold and g >= threshold and b >= threshold)


def is_near_black(px: tuple[int, int, int, int]) -> bool:
    r, g, b, a = px
    return a > 8 and r <= 18 and g <= 18 and b <= 18 and max(r, g, b) <= 18


def content_bbox(im: Image.Image, white: int = 246) -> tuple[int, int, int, int]:
    w, h = im.size
    px = im.load()
    min_x, min_y, max_x, max_y = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if not is_near_white(px[x, y], white):
                found = True
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
    if not found:
        return (0, 0, w, h)
    return (min_x, min_y, max_x + 1, max_y + 1)


def ribbon_bbox(im: Image.Image) -> tuple[int, int, int, int]:
    """Bounding box of the chromatic ribbon, excluding the dark wordmark."""
    w, h = im.size
    px = im.load()
    min_x, min_y, max_x, max_y = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 8:
                continue
            mx = max(r, g, b)
            mn = min(r, g, b)
            if mx - mn < 40 or mx < 140:
                continue
            found = True
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)
    if not found:
        return content_bbox(im)
    return (min_x, min_y, max_x + 1, max_y + 1)


def square_pad(im: Image.Image, fill=(255, 255, 255, 0), pad_ratio: float = 0.14) -> Image.Image:
    w, h = im.size
    side = max(w, h)
    pad = int(side * pad_ratio)
    canvas_side = side + pad * 2
    canvas = Image.new("RGBA", (canvas_side, canvas_side), fill)
    canvas.paste(im, ((canvas_side - w) // 2, (canvas_side - h) // 2), im)
    return canvas


def save_ico(im: Image.Image, dest: Path) -> None:
    rgba = im.convert("RGBA")
    rgba.save(
        dest,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )


def generate_brand_icons() -> None:
    source = Image.open(LOGO).convert("RGBA")

    full = source.crop(content_bbox(source))
    trimmed = square_pad(full, fill=(255, 255, 255, 255), pad_ratio=0.06).convert("RGB")
    trim_path = ROOT / "public" / "brand" / "vimai-logo-trim.png"
    trimmed.save(trim_path, "PNG", optimize=True)

    # Favicon must be the full ViMai lockup (ribbon + wordmark) on white.
    # Ribbon-only crops read as a pink "W" in browser tabs.
    mark_white = square_pad(full, fill=(255, 255, 255, 255), pad_ratio=0.08)
    icon_512 = mark_white.resize((512, 512), Image.Resampling.LANCZOS)
    apple = mark_white.resize((180, 180), Image.Resampling.LANCZOS).convert("RGB")
    apple_1024 = mark_white.resize((1024, 1024), Image.Resampling.LANCZOS).convert("RGB")

    (ROOT / "src" / "app").mkdir(parents=True, exist_ok=True)
    favicon_dir = ROOT / "public" / "brand" / "favicon"
    favicon_dir.mkdir(parents=True, exist_ok=True)

    icon_512.save(ROOT / "src" / "app" / "icon.png", "PNG", optimize=True)
    apple.save(ROOT / "src" / "app" / "apple-icon.png", "PNG", optimize=True)
    apple.save(favicon_dir / "apple-touch-icon.png", "PNG", optimize=True)
    apple_1024.save(favicon_dir / "icon-1024.png", "PNG", optimize=True)
    icon_512.resize((32, 32), Image.Resampling.LANCZOS).save(
        ROOT / "public" / "favicon-32.png", "PNG", optimize=True
    )
    save_ico(icon_512, ROOT / "src" / "app" / "favicon.ico")
    save_ico(icon_512, ROOT / "public" / "favicon.ico")
    print("brand icons written")


def flood_clear_black(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    seen = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    for x, y in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        if is_near_black(px[x, y]):
            q.append((x, y))
            seen[y][x] = True

    while q:
        x, y = q.popleft()
        px[x, y] = (0, 0, 0, 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx] and is_near_black(px[nx, ny]):
                seen[ny][nx] = True
                q.append((nx, ny))

    # Soften the fringe where leftover dark pixels meet transparency.
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0 or not (r < 40 and g < 40 and b < 40):
                continue
            for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 0:
                    px[x, y] = (r, g, b, 0)
                    break
    return im.filter(ImageFilter.SMOOTH_MORE) if False else im


def clean_product_icons() -> None:
    mapping = {
        "tokutei_taxi.png": "tokutei_taxi.png",
        "tokutei_vantai.png": "tokutei_vantai.png",
        "sebishi_3kyu.png": "sebishi_3kyu.png",
        "vimai_kids.jpg": "vimai_kids.png",
        "maimai.jpg": "maimai.png",
    }
    for src_name, dest_name in mapping.items():
        src = PRODUCTS / src_name
        dest = PRODUCTS / dest_name
        cleaned = flood_clear_black(Image.open(src))
        cleaned.save(dest, "PNG", optimize=True)
        print(f"cleaned {src_name} -> {dest_name}")


if __name__ == "__main__":
    generate_brand_icons()
    clean_product_icons()
