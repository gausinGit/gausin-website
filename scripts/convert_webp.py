"""
Convert all PNG/JPG images in assets/ to WebP.
Update all HTML files to reference .webp versions.
Originals are kept (not deleted).
UI change: ZERO — same image, smaller file.
"""
import os, re
from PIL import Image

assets_dir = r'd:\Gausin Data\assets'
html_dir   = r'd:\Gausin Data'

# ── 1. Convert images ─────────────────────────────────────────────
ext_map   = {}  # original_filename → webp_filename
skipped   = []
converted = []
saved_kb  = 0

for fname in os.listdir(assets_dir):
    if not fname.lower().endswith(('.png', '.jpg', '.jpeg')):
        continue
    src  = os.path.join(assets_dir, fname)
    stem = os.path.splitext(fname)[0]
    dest = os.path.join(assets_dir, stem + '.webp')

    orig_size = os.path.getsize(src)
    try:
        img = Image.open(src).convert('RGBA')
        img.save(dest, 'WEBP', quality=82, method=6)
        new_size  = os.path.getsize(dest)
        saved_kb += (orig_size - new_size) // 1024
        converted.append(f'  {fname} ({orig_size//1024}KB) → {stem}.webp ({new_size//1024}KB)')
        ext_map[fname] = stem + '.webp'
    except Exception as e:
        skipped.append(f'  SKIP {fname}: {e}')

print(f'Converted: {len(converted)} images | Saved: {saved_kb} KB total')
for c in converted: print(c)
if skipped:
    print('Skipped:')
    for s in skipped: print(s)

# ── 2. Update HTML references ─────────────────────────────────────
html_files = [f for f in os.listdir(html_dir) if f.endswith('.html')]
html_count = 0
ref_count  = 0

for fname in html_files:
    path = os.path.join(html_dir, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    changed  = 0

    for old_name, new_name in ext_map.items():
        # Match both quoted and unquoted, handle URL encoding
        # Replace  assets/filename.ext  →  assets/filename.webp
        pattern = re.escape('assets/' + old_name)
        replace = 'assets/' + new_name
        new_content = re.sub(pattern, replace, content, flags=re.IGNORECASE)
        if new_content != content:
            changed += new_content.count(replace) - content.count(replace)
            content  = new_content

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        html_count += 1
        ref_count  += changed

print(f'\nHTML files updated: {html_count} | References changed: {ref_count}')
