"""
Update HTML files: replace assets/filename.png|jpg|jpeg -> assets/filename.webp
Only replaces if the .webp version actually exists.
"""
import os, re

assets_dir = r'd:\Gausin Data\assets'
html_dir   = r'd:\Gausin Data'

# Build map of existing WebP conversions
ext_map = {}
for fname in os.listdir(assets_dir):
    lower = fname.lower()
    if lower.endswith(('.png', '.jpg', '.jpeg')):
        stem     = os.path.splitext(fname)[0]
        webp_name = stem + '.webp'
        webp_path = os.path.join(assets_dir, webp_name)
        if os.path.exists(webp_path):
            ext_map[fname] = webp_name

print(f'WebP files found: {len(ext_map)}')

# Update HTML files
html_files = [f for f in os.listdir(html_dir) if f.endswith('.html')]
html_count = 0
ref_count  = 0

for fname in html_files:
    path = os.path.join(html_dir, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    for old_name, new_name in ext_map.items():
        pattern = re.escape('assets/' + old_name)
        replace = 'assets/' + new_name
        new_content = re.sub(pattern, replace, content, flags=re.IGNORECASE)
        if new_content != content:
            ref_count += 1
            content    = new_content

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        html_count += 1

print(f'HTML files updated : {html_count}')
print(f'Image refs changed : {ref_count}')
