import os, re

html_dir = r'd:\Gausin Data'
files = [f for f in os.listdir(html_dir) if f.endswith('.html')]

local_tag = '<link rel="stylesheet" href="css/fonts.css">'
gf_pattern = re.compile(r'<link[^>]+fonts\.googleapis\.com/css2[^>]+>')
preconn_pattern = re.compile(r'<link[^>]+preconnect[^>]+fonts\.(googleapis|gstatic)\.com[^>]*>\n?')

count = 0
for fname in files:
    path = os.path.join(html_dir, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Remove preconnect lines for Google Fonts
    content = preconn_pattern.sub('', content)

    # Replace Google Fonts CSS link with local
    gf_links = gf_pattern.findall(content)
    if gf_links:
        content = gf_pattern.sub('', content)
        # Insert local tag just before FontAwesome link
        if local_tag not in content:
            content = content.replace(
                '<link rel="stylesheet" href="css/all.min.css">',
                local_tag + '\n  <link rel="stylesheet" href="css/all.min.css">'
            )

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1

print(f'Updated {count} files — Google Fonts CDN removed, local fonts.css linked')

remaining = []
for f in files:
    c = open(os.path.join(html_dir, f), encoding='utf-8').read()
    if 'fonts.googleapis.com' in c:
        remaining.append(f)

print(f'Remaining CDN font links: {len(remaining)} files')
for r in remaining:
    print(f'  - {r}')
