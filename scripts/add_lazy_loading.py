"""
Add loading="lazy" to all <img> tags EXCEPT:
  - Logo images (gausin-logo)
  - First hero image per page (above the fold)
  - Images that already have loading attribute
  - Images with fetchpriority="high"
UI change: ZERO — images just load on scroll instead of upfront.
"""
import os, re

html_dir = r'd:\Gausin Data'

# Images that must NOT be lazy (logos, above-fold)
NEVER_LAZY = [
    'gausin-logo',
    'home-hero',
    'home hero',
]

img_pattern = re.compile(r'<img\b([^>]*)>', re.IGNORECASE)

def should_skip(attrs):
    attrs_lower = attrs.lower()
    # Already has loading attribute
    if 'loading=' in attrs_lower:
        return True
    # fetchpriority high
    if 'fetchpriority="high"' in attrs_lower:
        return True
    # Logo or hero images
    for keyword in NEVER_LAZY:
        if keyword in attrs_lower:
            return True
    return False

html_files = [f for f in os.listdir(html_dir) if f.endswith('.html')]
total_added = 0
files_changed = 0

for fname in html_files:
    path = os.path.join(html_dir, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    added_in_file = 0

    def add_lazy(match):
        global added_in_file
        attrs = match.group(1)
        if should_skip(attrs):
            return match.group(0)
        added_in_file += 1
        return '<img loading="lazy"' + attrs + '>'

    content = img_pattern.sub(add_lazy, content)
    total_added += added_in_file

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        files_changed += 1

print(f'Files changed  : {files_changed}')
print(f'lazy added to  : {total_added} img tags')
