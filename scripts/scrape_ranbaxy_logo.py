import re
import ssl
import urllib.request
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "images" / "clients"
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

req = urllib.request.Request("https://www.ranbaxy.com/", headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=90, context=CTX) as r:
    html = r.read().decode("utf-8", "ignore")

candidates = []
for src in re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.I):
    if re.search(r"logo|ranbaxy|brand", src, re.I):
        candidates.append(src)
for src in re.findall(r'url\(([^)]+)\)', html, re.I):
    if re.search(r"logo", src, re.I):
        candidates.append(src.strip('"\''))

print("candidates:", candidates[:20])

base = "https://www.ranbaxy.com"
for src in candidates:
    if src.startswith("//"):
        src = "https:" + src
    elif src.startswith("/"):
        src = base + src
    try:
        req = urllib.request.Request(src, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60, context=CTX) as r:
            data = r.read()
        if len(data) < 500:
            continue
        ext = "svg" if b"<svg" in data[:300] else "png"
        path = OUT / f"ranbaxy.{ext}"
        path.write_bytes(data)
        print("SAVED", path.name, src, len(data))
        break
    except Exception as exc:
        print("FAIL", src, exc)
