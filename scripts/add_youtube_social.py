#!/usr/bin/env python3
"""Insert YouTube social link into footer blocks across HTML files."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
YOUTUBE = (
    '<a href="https://www.youtube.com/@GausinInternationalEngineersPv" '
    'class="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">'
    '<i class="fa-brands fa-youtube"></i></a>'
)
MARKER = (
    '<a href="https://www.instagram.com/gausin_117/" class="social-link" aria-label="Instagram" '
    'target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a>'
)
INSERT = MARKER + YOUTUBE


def main():
    updated = 0
    for path in ROOT.glob("*.html"):
        text = path.read_text(encoding="utf-8")
        if "fa-brands fa-youtube" in text or MARKER not in text:
            continue
        new_text = text.replace(MARKER, INSERT)
        if new_text != text:
            path.write_text(new_text, encoding="utf-8")
            updated += 1
            print(f"updated {path.name}")
    print(f"total: {updated} files")


if __name__ == "__main__":
    main()
