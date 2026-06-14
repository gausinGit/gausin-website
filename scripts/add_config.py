import os, re

base = r"d:\Gausin Data"
config_tag = '<script src="js/config.js"></script>\n'
target = '<script src="js/main.js"'

skip = ['admin', 'scripts', 'brochure.html']
count = 0

for fname in os.listdir(base):
    if not fname.endswith('.html'):
        continue
    if any(s in fname for s in skip):
        continue
    path = os.path.join(base, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if config_tag in content:
        continue
    if target not in content:
        continue
    content = content.replace(target, config_tag + target, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    count += 1
    print(f"Updated: {fname}")

print(f"\nDone — {count} files updated")
