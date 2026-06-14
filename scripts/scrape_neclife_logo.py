import re
import ssl
import urllib.request
from pathlib import Path

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://www.neclife.com/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, context=ctx, timeout=25) as r:
    html = r.read().decode("utf-8", "ignore")

assets = sorted(set(re.findall(r"https://static\.wixstatic\.com/[^\s\"'>]+", html)))
for a in assets:
    print(a)

# Try header logo candidates
candidates = [a for a in assets if re.search(r"logo|nectar|neclife", a, re.I)]
out = Path(__file__).resolve().parents[1] / "images" / "clients" / "nectar-lifesciences.png"
for url in candidates or assets[:3]:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, context=ctx, timeout=25) as r:
            data = r.read()
        if len(data) > 1000:
            out.write_bytes(data)
            print("SAVED", url, len(data))
            break
    except Exception as exc:
        print("FAIL", url, exc)
