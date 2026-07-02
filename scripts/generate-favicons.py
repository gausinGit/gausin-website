from PIL import Image
from pathlib import Path
import base64
import io

root = Path(__file__).resolve().parent.parent
logo = Image.open(root / 'images' / 'gausin-logo.png').convert('RGBA')


def make_square_logo(size, padding_ratio=0.08):
    w, h = logo.size
    pad = max(4, int(size * padding_ratio))
    inner = size - pad * 2
    scale = min(inner / w, inner / h)
    nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
    resized = logo.resize((nw, nh), Image.Resampling.LANCZOS)
    sq = Image.new('RGBA', (size, size), (255, 255, 255, 255))
    sq.paste(resized, ((size - nw) // 2, (size - nh) // 2), resized)
    return sq


sizes = {
    16: root / 'images' / 'favicon-16x16.png',
    32: root / 'images' / 'favicon-32x32.png',
    48: root / 'images' / 'favicon-48x48.png',
    96: root / 'images' / 'favicon-96x96.png',
    192: root / 'images' / 'favicon-192x192.png',
    512: root / 'images' / 'favicon-512x512.png',
    180: root / 'images' / 'apple-touch-icon.png',
}

imgs = {}
for s, path in sizes.items():
    img = make_square_logo(s)
    imgs[s] = img
    img.save(path, optimize=True)
    print('saved', path.name)

imgs[48].save(root / 'favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
print('saved favicon.ico')

buf = io.BytesIO()
imgs[512].save(buf, format='PNG')
b64 = base64.b64encode(buf.getvalue()).decode('ascii')
svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">'
    f'<image href="data:image/png;base64,{b64}" width="512" height="512"/>'
    '</svg>'
)
(root / 'images' / 'favicon.svg').write_text(svg, encoding='utf-8')
print('saved favicon.svg')

manifest = """{
  "name": "Gausin International Engineers",
  "short_name": "Gausin",
  "icons": [
    { "src": "/images/favicon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/images/favicon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#0A2540",
  "background_color": "#ffffff"
}
"""
(root / 'site.webmanifest').write_text(manifest, encoding='utf-8')
print('saved site.webmanifest')
