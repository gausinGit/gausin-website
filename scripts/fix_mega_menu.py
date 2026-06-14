import re, glob, os

# The complete correct mega menu block (exact replacement)
NEW_BLOCK = (
    '<div class="mega-menu"><div class="mega-menu-grid">\n'
    '            <a href="products.html#evaporators" class="mega-menu-item"><div class="mega-menu-item-icon"><i class="fa-solid fa-droplet"></i></div><div><div class="mega-menu-item-title">Evaporators</div><div class="mega-menu-item-desc">Falling Film, Forced Circulation, Plate Type</div></div></a>\n'
    '            <a href="products.html#dryers" class="mega-menu-item"><div class="mega-menu-item-icon"><i class="fa-solid fa-wind"></i></div><div><div class="mega-menu-item-title">Dryers</div><div class="mega-menu-item-desc">Spray, Spin Flash, Fluidized Bed, ATFD</div></div></a>\n'
    '            <a href="products.html#heat-exchangers" class="mega-menu-item"><div class="mega-menu-item-icon"><i class="fa-solid fa-temperature-high"></i></div><div><div class="mega-menu-item-title">Heat Exchangers</div><div class="mega-menu-item-desc">Shell &amp; Tube, Plate Type</div></div></a>\n'
    '            <a href="products.html#cip" class="mega-menu-item"><div class="mega-menu-item-icon"><i class="fa-solid fa-recycle"></i></div><div><div class="mega-menu-item-title">CIP Systems</div><div class="mega-menu-item-desc">Clean-in-Place Automation</div></div></a>\n'
    '            <a href="products.html#milk-processing" class="mega-menu-item"><div class="mega-menu-item-icon"><i class="fa-solid fa-flask"></i></div><div><div class="mega-menu-item-title">Milk Processing</div><div class="mega-menu-item-desc">Pasteurizer, Deodorizer, Full Plant</div></div></a>\n'
    '            <a href="products.html#vessels" class="mega-menu-item"><div class="mega-menu-item-icon"><i class="fa-solid fa-database"></i></div><div><div class="mega-menu-item-title">Pressure Vessels &amp; Tanks</div><div class="mega-menu-item-desc">SS Tanks, Pressure Vessels</div></div></a>\n'
    '            <a href="products.html#milk-equipment" class="mega-menu-item"><div class="mega-menu-item-icon"><i class="fa-solid fa-jar"></i></div><div><div class="mega-menu-item-title">Milk Equipment</div><div class="mega-menu-item-desc">Butter Churner, Ghee Kettle, Khoya</div></div></a>\n'
    '            <a href="products.html#dairy-food-equipment" class="mega-menu-item"><div class="mega-menu-item-icon"><i class="fa-solid fa-industry"></i></div><div><div class="mega-menu-item-title">Dairy &amp; Food Equipments</div><div class="mega-menu-item-desc">Milk Can Conveyor, BMC, Crystallization Tank</div></div></a>\n'
    '            <a href="products.html#waste-management" class="mega-menu-item"><div class="mega-menu-item-icon"><i class="fa-solid fa-leaf"></i></div><div><div class="mega-menu-item-title">Waste Management</div><div class="mega-menu-item-desc">ETP/STP, Biogas, Scrubber, Incinerator</div></div></a>\n'
    '          </div></div>'
)

# Pattern: everything from <div class="mega-menu"> up to and including
# the last </div></div> that closes the mega-menu, before </div> (nav-item closer)
PATTERN = re.compile(
    r'<div class="mega-menu">.*?</div></div>(?=\s*\n\s*</div>)',
    re.DOTALL
)

files = sorted(glob.glob(r'D:\Gausin Data\product-*.html'))
for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    new_html, n = PATTERN.subn(NEW_BLOCK, html)
    if n:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f'Updated ({n} replacement): {os.path.basename(path)}')
    else:
        print(f'No match: {os.path.basename(path)}')
