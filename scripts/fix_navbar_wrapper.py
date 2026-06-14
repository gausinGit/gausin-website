import glob, os

# The missing navbar wrapper that needs to be inserted before the nav-items
NAVBAR_PREFIX = """\n<!-- NAVBAR -->\n<nav class="navbar" id="navbar">\n  <div class="container">\n    <div class="navbar-inner">\n      <a href="index.html" class="navbar-logo navbar-logo--image"><img src="images/gausin-logo.png" alt="Gausin International Engineers Pvt. Ltd." class="logo-img" width="220" height="52"></a>\n      <nav class="navbar-nav">\n        <div class="nav-item"><a href="index.html" class="nav-link">Home</a></div>\n"""

BROKEN_MARKER = '        <div class="nav-item"><a href="about.html" class="nav-link">About</a></div>'

files = sorted(glob.glob(r'D:\Gausin Data\product-*.html'))
for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Find <body> followed directly (with possible newline) by the nav-item About line
    body_pos = html.find('<body>\n' + BROKEN_MARKER)
    if body_pos == -1:
        body_pos = html.find('<body>\r\n' + BROKEN_MARKER)
    
    if body_pos != -1:
        # Insert the navbar prefix between <body> and the nav-items
        after_body = body_pos + len('<body>')
        new_html = html[:after_body] + NAVBAR_PREFIX + html[after_body:]
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f'Fixed: {os.path.basename(path)}')
    else:
        print(f'OK (no fix needed): {os.path.basename(path)}')
