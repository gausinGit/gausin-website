#!/usr/bin/env python3
"""Update footer social links across all HTML files."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

OLD_COMPACT = (
    '<div class="footer-social">'
    '<a href="#" class="social-link"><i class="fa-brands fa-linkedin-in"></i></a>'
    '<a href="#" class="social-link"><i class="fa-brands fa-x-twitter"></i></a>'
    '<a href="#" class="social-link"><i class="fa-brands fa-youtube"></i></a>'
    '<a href="#" class="social-link"><i class="fa-brands fa-facebook-f"></i></a>'
    '</div>'
)

NEW_COMPACT = (
    '<div class="footer-social">'
    '<a href="#" class="social-link" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>'
    '<a href="https://x.com/GauravSinghal79" class="social-link" aria-label="X" target="_blank" rel="noopener noreferrer">'
    '<i class="fa-brands fa-x-twitter"></i></a>'
    '<a href="https://www.instagram.com/gaurav67165/" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">'
    '<i class="fa-brands fa-instagram"></i></a>'
    '<a href="https://www.facebook.com/profile.php?id=61590538293790" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">'
    '<i class="fa-brands fa-facebook-f"></i></a>'
    '</div>'
)

OLD_MULTI = """        <div class="footer-social">
          <a href="#" class="social-link"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="#" class="social-link"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" class="social-link"><i class="fa-brands fa-youtube"></i></a>
          <a href="#" class="social-link"><i class="fa-brands fa-facebook-f"></i></a>
        </div>"""

NEW_MULTI = """        <div class="footer-social">
          <a href="#" class="social-link" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="https://x.com/GauravSinghal79" class="social-link" aria-label="X" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="https://www.instagram.com/gaurav67165/" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://www.facebook.com/profile.php?id=61590538293790" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f"></i></a>
        </div>"""


def main():
    updated = 0
    for path in ROOT.glob("*.html"):
        text = path.read_text(encoding="utf-8")
        new_text = text.replace(OLD_COMPACT, NEW_COMPACT).replace(OLD_MULTI, NEW_MULTI)
        if new_text != text:
            path.write_text(new_text, encoding="utf-8")
            updated += 1
            print(f"updated {path.name}")
    print(f"total: {updated} files")


if __name__ == "__main__":
    main()
