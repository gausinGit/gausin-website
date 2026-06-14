"""
1. Add defer to: js/main.js, js/components.js
2. Replace unpkg AOS with local + fix inline AOS.init
3. Add local aos.css link where AOS is used
UI change: ZERO - scripts still execute, just non-blocking
"""
import os, re

html_dir = r'd:\Gausin Data'
files    = [f for f in os.listdir(html_dir) if f.endswith('.html')]

changed = 0

for fname in files:
    path = os.path.join(html_dir, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content

    # 1. Add defer to js/main.js
    content = content.replace(
        '<script src="js/main.js"></script>',
        '<script src="js/main.js" defer></script>'
    )
    # 2. Add defer to js/components.js
    content = content.replace(
        '<script src="js/components.js"></script>',
        '<script src="js/components.js" defer></script>'
    )
    # 3. Self-host AOS JS + add defer
    content = content.replace(
        '<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>',
        '<script src="js/aos.js" defer></script>'
    )
    # 4. Fix inline AOS.init - wrap in DOMContentLoaded so it runs after deferred aos.js
    content = content.replace(
        '<script>AOS.init({ duration: 700, once: true, offset: 80 });</script>',
        '<script>document.addEventListener("DOMContentLoaded",function(){AOS.init({duration:700,once:true,offset:80});});</script>'
    )
    # 5. Add local aos.css if AOS is used on this page
    if 'js/aos.js' in content and 'css/aos.css' not in content:
        content = content.replace(
            '<link rel="stylesheet" href="css/fonts.css">',
            '<link rel="stylesheet" href="css/aos.css">\n  <link rel="stylesheet" href="css/fonts.css">'
        )

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        changed += 1

print(f'Files updated with defer: {changed}')

# Verify no unpkg.com links remain
remaining = [f for f in files if 'unpkg.com' in open(os.path.join(html_dir, f), encoding='utf-8').read()]
print(f'unpkg.com CDN links remaining: {len(remaining)}')
