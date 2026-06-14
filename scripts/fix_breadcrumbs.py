import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SECTIONS = {
    "milk-processing": "Dairy Processing Plants",
    "milk-equipment": "Milk Processing Equipment",
    "heat-exchangers": "Heat Exchangers",
    "cip": "CIP & Cleaning Systems",
    "vessels": "Pressure Vessels & Storage Tanks",
    "dairy-food-equipment": "Dairy & Food Plant Equipments",
    "waste-management": "Waste Management",
}
files = [
    "product-complete-milk-processing-plant.html", "product-milk-chilling-plant.html",
    "product-milk-pasteurizer-htst-ltlt.html", "product-milk-deodorizer.html",
    "product-butter-processing-unit.html", "product-ghee-making-plant.html",
    "product-butter-churner.html", "product-ghee-kettle.html", "product-khoya-making-machine.html",
    "product-shell-tube-heat-exchanger.html", "product-plate-heat-exchanger-phe.html",
    "product-automated-cip-system.html", "product-pressure-vessels-asme-ibr.html",
    "product-stainless-steel-storage-silos.html", "product-milk-can-conveyor.html",
    "product-bulk-milk-cooler.html",
    "product-etp-stp-treatment-plants.html",
    "product-biomass-solid-waste-treatment-plant.html",
    "product-biogas-and-cng-plant.html",
    "product-wtp-uf-ro-softener-plants.html",
    "product-scrubber-systems.html",
    "product-incinerator-system.html",
]
for fn in files:
    p = ROOT / fn
    html = p.read_text(encoding="utf-8")
    for sid, label in SECTIONS.items():
        html = re.sub(
            rf'<a href="products\.html#{sid}">Dryers</a>',
            f'<a href="products.html#{sid}">{label}</a>',
            html,
        )
    p.write_text(html, encoding="utf-8")
    print("Fixed", fn)
