#!/usr/bin/env python3
"""Download real client logos for homepage clients section."""
import re
import ssl
import urllib.request
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "images" / "clients"
OUT.mkdir(parents=True, exist_ok=True)

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

SOURCES = {
    "gsk": [
        "https://www.gsk.com/media/qk5h0v0k/gsk-logo.png",
    ],
    "chitale": [
        "https://www.chitaledairy.com/images/logo.png",
        "https://chitalebandhu.com/wp-content/uploads/2020/06/logo.png",
    ],
    "nectar-lifesciences": [
        "https://companieslogo.com/img/orig/NECLIFE.NS.png",
    ],
    "covalent-laboratories": [
        "https://covalentlab.com/assets/images/logo.png",
    ],
    "goodricke": [
        "https://www.goodricke.com/images/logo.png",
    ],
    "jain": [
        "https://www.jains.com/images/jain-logo.png",
        "https://www.jains.com/images/logo.png",
    ],
    "renuka": [
        "https://www.renukasugars.com/images/renuka-logo.png",
        "https://www.renukasugars.com/images/logo.png",
    ],
    "ccl": [
        "https://www.cclproducts.com/images/ccl-logo.png",
    ],
}

DOMAINS = {
    "gsk": "gsk.com",
    "chitale": "chitaledairy.com",
    "nectar-lifesciences": "neclife.com",
    "covalent-laboratories": "covalentlab.com",
    "goodricke": "goodricke.com",
    "jain": "jains.com",
    "renuka": "renukasugars.com",
    "ccl": "cclproducts.com",
}


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=25, context=CTX) as resp:
        data = resp.read()
    if len(data) < 400:
        raise ValueError(f"response too small ({len(data)} bytes)")
    return data


def scrape_logo(domain: str) -> bytes | None:
    for base in (f"https://www.{domain}", f"https://{domain}"):
        try:
            req = urllib.request.Request(base, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=25, context=CTX) as resp:
                html = resp.read().decode("utf-8", "ignore")
            candidates = []
            for src in re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.I):
                if re.search(r"logo", src, re.I):
                    candidates.append(src)
            for src in re.findall(r'url\(([^)]+logo[^)]+)\)', html, re.I):
                candidates.append(src.strip('"\''))
            for src in candidates:
                if src.startswith("//"):
                    src = "https:" + src
                elif src.startswith("/"):
                    src = base.rstrip("/") + src
                try:
                    return fetch(src)
                except Exception:
                    continue
        except Exception:
            continue
    return None


def ext_for(data: bytes, url: str) -> str:
    if data[:5].startswith(b"<?xml") or b"<svg" in data[:300]:
        return "svg"
    if url.lower().endswith(".svg"):
        return "svg"
    if data[:3] == b"GIF":
        return "gif"
    return "png"


def main():
    results = {}
    for name, urls in SOURCES.items():
        saved = False
        for url in urls:
            try:
                data = fetch(url)
                ext = ext_for(data, url)
                path = OUT / f"{name}.{ext}"
                path.write_bytes(data)
                results[name] = path.name
                print(f"OK {name}: {url}")
                saved = True
                break
            except Exception as exc:
                print(f"miss {name}: {url} ({exc})")
        if not saved:
            data = scrape_logo(DOMAINS[name])
            if data:
                ext = ext_for(data, "")
                path = OUT / f"{name}.{ext}"
                path.write_bytes(data)
                results[name] = path.name
                print(f"OK {name}: scraped {DOMAINS[name]}")
                saved = True
        if not saved:
            print(f"FAIL {name}")

    print("--- saved ---")
    for name, fname in sorted(results.items()):
        print(name, fname)


if __name__ == "__main__":
    main()
