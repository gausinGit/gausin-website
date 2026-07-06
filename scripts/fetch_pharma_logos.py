#!/usr/bin/env python3
"""Fetch real Aurobindo and Ranbaxy logos from official sites."""
import re
import ssl
import urllib.request
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "images" / "clients"
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

SOURCES = {
    "aurobindo": [
        "https://www.aurobindo.com/wp-content/uploads/2019/05/aurobindo-logo.png",
        "https://www.aurobindo.com/wp-content/themes/aurobindo/assets/images/logo.png",
    ],
    "ranbaxy": [
        "https://www.ranbaxy.com/images/ranbaxy-logo.png",
        "https://www.ranbaxy.com/images/logo.png",
        "https://www.ranbaxy.com/img/logo.png",
        "https://www.ranbaxy.com/assets/images/logo.png",
    ],
    "nectar-lifesciences": [
        "https://static.wixstatic.com/media/57e58c_68faf7da0af04d23b3cc79f3b9e5e112~mv2.png/v1/fill/w_368,h_182,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/nec.png",
    ],
}

DOMAINS = {
    "aurobindo": "aurobindo.com",
    "ranbaxy": "ranbaxy.com",
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
    if b"<svg" in data[:300] or url.lower().endswith(".svg"):
        return "svg"
    return "png"


def save(name: str, data: bytes, url: str = "") -> None:
    ext = ext_for(data, url)
    path = OUT / f"{name}.{ext}"
    path.write_bytes(data)
    print(f"OK {name}: {path.name} ({len(data)} bytes)")


def main():
    for name, urls in SOURCES.items():
        saved = False
        for url in urls:
            try:
                save(name, fetch(url), url)
                saved = True
                break
            except Exception as exc:
                print(f"miss {name}: {url} ({exc})")
        if saved:
            continue
        domain = DOMAINS.get(name)
        if domain:
            data = scrape_logo(domain)
            if data:
                save(name, data)
                saved = True
        if not saved:
            print(f"FAIL {name}")


if __name__ == "__main__":
    main()
