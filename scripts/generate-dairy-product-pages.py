# -*- coding: utf-8 -*-
"""Generate product detail pages for dairy, equipment, heat exchanger, CIP, vessel sections."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "product-spray-dryer.html"

def mk(name, slug, section, section_id, icon, badge, badge_lbl, img, tagline, qs, specs, apps, related, cap_ph):
    br = name.replace(" (", "<br>(").replace(" / ", "<br>/ ") if len(name) > 28 else name.replace(" ", "<br>", 1) if " " in name else name
    overview = [
        f'The <strong style="color:var(--gray-900);">Gausin {name}</strong> is engineered for reliable, hygienic performance in demanding industrial environments. {tagline}',
        f'Each unit is custom-designed to your capacity, product characteristics, and plant layout requirements with SS 304/316L contact surfaces, validated process design, and full documentation.',
        f'Gausin provides complete engineering support from process design and fabrication through installation, commissioning, and after-sales service.',
    ]
    features = [
        ("fa-industry", "Industrial Grade", "Robust construction for continuous 24/7 plant operation."),
        ("fa-shield-halved", "Hygienic Design", "Food-grade materials and finishes for dairy and food applications."),
        ("fa-gears", "Custom Engineered", "Sized and configured to your exact process requirements."),
        ("fa-robot", "PLC/SCADA Ready", "Automated control with data logging and alarm management."),
        ("fa-recycle", "CIP Compatible", "Designed for easy cleaning and sanitation where applicable."),
        ("fa-certificate", "Standards Compliant", "Built to FSSAI, BIS, 3-A, ASME, or IBR as required."),
    ]
    process = [(s[0], s[1]) for s in specs[:6]]
    construction = [
        ("Material of Construction", specs[2][1] if len(specs) > 2 else "SS 304 / SS 316L"),
        ("Design Standard", specs[3][1] if len(specs) > 3 else "FSSAI / BIS / 3-A"),
        ("Surface Finish", "Mirror polish (product contact)"),
        ("Control System", "PLC / SCADA with HMI"),
        ("Documentation", "GA drawings, IOM manual, test certificates"),
        ("Warranty", "12 months from commissioning"),
    ]
    app_items = [(["fa-cow","fa-utensils","fa-flask","fa-industry","fa-building"][i % 5], a, f"Industrial applications for {a.lower()} sector.") for i, a in enumerate(apps[:6])]
    advantages = [
        ("fa-bolt", "Proven Performance", "Reliable operation backed by decades of dairy and process engineering experience."),
        ("fa-sliders", "Process Flexibility", "Wide operating range to handle varying feed and production targets."),
        ("fa-coins", "Energy Efficient", "Optimized thermal and mechanical design reduces operating costs."),
        ("fa-screwdriver-wrench", "Easy Maintenance", "Accessible components and CIP provision minimize downtime."),
        ("fa-users", "Turnkey Support", "Single-point responsibility from design through commissioning."),
        ("fa-certificate", "Quality Assured", "Full material traceability and inspection documentation."),
    ]
    steps = [
        ("Feed / Input", "Raw material or process fluid enters the system at controlled flow and conditions."),
        ("Processing", "Core process step — heating, cooling, separation, or concentration as per design."),
        ("Quality Control", "Inline monitoring of temperature, pressure, and product parameters."),
        ("Product Output", "Finished product discharged at specified quality and consistency."),
        ("Cleaning", "Automated or manual CIP cycle prepares equipment for next batch or continuous run."),
    ]
    quick = [(s[0], s[1]) for s in specs[:5]]
    return {
        "slug": slug, "name": name, "name_br": br, "section": section, "section_id": section_id,
        "icon": icon, "badge_val": badge, "badge_lbl": badge_lbl, "image": img, "tagline": tagline,
        "qs": qs, "overview": overview, "features": features, "process_specs": process,
        "construction_specs": construction, "apps": app_items, "advantages": advantages,
        "steps": steps, "quick": quick, "related": related, "cap_placeholder": cap_ph,
    }

PRODUCTS = [
    mk("Complete Milk Processing Plant", "complete-milk-processing-plant", "Dairy Processing Plants", "milk-processing", "fa-cow",
       "Turnkey", "Full Plant", "assets/complete-milk-processing-plant.png",
       "Turnkey dairy plant from raw milk reception to final product packaging with pasteurizer, homogenizer, separator, storage tanks, UHT, and CIP integration.",
       [("5K - 200K", "L/day"), ("Liquid Milk", "Products"), ("FSSAI", "Standard"), ("PLC/SCADA", "Automation")],
       [("Capacity", "5,000 - 200,000 L/day"), ("Products", "Liquid Milk, Cream"), ("Standard", "FSSAI / 3-A"), ("Automation", "Full PLC/SCADA")],
       ["Dairy Plants", "Co-operatives", "FMCG"],
       [("product-milk-pasteurizer-htst-ltlt.html", "assets/milk-pasteurizer-htst-ltlt.png", "Milk Pasteurizer", "HTST/LTLT pasteurization systems."),
        ("product-milk-chilling-plant.html", "assets/milk-chilling-plant.png", "Milk Chilling Plant", "Industrial milk chilling and storage."),
        ("product-automated-cip-system.html", "assets/automated-cip-system.jpeg", "Automated CIP System", "Hygienic automated cleaning.")],
       "e.g., 50,000 L/day"),
    mk("Milk Chilling Plant", "milk-chilling-plant", "Dairy Processing Plants", "milk-processing", "fa-cow",
       "4 deg C", "Rapid Cooling", "assets/milk-chilling-plant.png",
       "Industrial-scale milk chilling plant with PHE refrigeration, insulated silos, and automated temperature monitoring for dairy processing facilities.",
       [("5K - 200K", "L/day"), ("PHE + Ref.", "Cooling"), ("4 +/- 1", "deg C"), ("FSSAI", "Standard")],
       [("Capacity", "5,000 - 2,00,000 L/day"), ("Cooling System", "PHE + Refrigeration"), ("Outlet Temp", "4 +/- 1 deg C"), ("Standard", "FSSAI / BIS / 3-A")],
       ["Dairy Plants", "Co-operatives", "Milk Unions", "FMCG Dairy"],
       [("product-bulk-milk-cooler.html", "assets/bulk-milk-cooler.png", "Bulk Milk Cooler", "Village-level BMC units."),
        ("product-complete-milk-processing-plant.html", "assets/complete-milk-processing-plant.png", "Milk Processing Plant", "Complete turnkey dairy lines."),
        ("product-plate-heat-exchanger-phe.html", "assets/plate-heat-exchanger-phe.png", "Plate Heat Exchanger", "Compact PHE for milk cooling.")],
       "e.g., 50,000 L/day"),
    mk("Milk Pasteurizer (HTST / LTLT)", "milk-pasteurizer-htst-ltlt", "Dairy Processing Plants", "milk-processing", "fa-cow",
       "HTST/LTLT", "Pasteurization", "assets/milk-pasteurizer-htst-ltlt.png",
       "High-Temperature Short-Time and Low-Temperature Long-Time pasteurizers with plate heat exchangers for precise temperature control and extended shelf life.",
       [("1K - 50K", "L/hr"), ("72C/15s", "HTST"), ("Auto CIP", "Included"), ("UHT", "Option")],
       [("Type", "HTST / LTLT / UHT"), ("Capacity", "1,000 - 50,000 L/hr"), ("Temp (HTST)", "72 deg C / 15 sec"), ("CIP", "Auto CIP Included")],
       ["Pasteurized Milk", "Flavored Milk", "Cream"],
       [("product-milk-deodorizer.html", "assets/milk-deodorizer.png", "Milk Deodorizer", "Off-flavor removal for premium dairy."),
        ("product-complete-milk-processing-plant.html", "assets/complete-milk-processing-plant.png", "Milk Processing Plant", "Integrated dairy solutions."),
        ("product-plate-heat-exchanger-phe.html", "assets/plate-heat-exchanger-phe.png", "Plate Heat Exchanger", "High-efficiency PHE.")],
       "e.g., 10,000 L/hr"),
    mk("Milk Deodorizer", "milk-deodorizer", "Dairy Processing Plants", "milk-processing", "fa-cow",
       "Vacuum", "Deodorizing", "assets/milk-deodorizer.png",
       "Vacuum deodorizer to remove off-flavors, taints, and volatile compounds from milk and dairy products for premium quality and export markets.",
       [("2K - 30K", "L/hr"), ("Vacuum", "0.02 bar"), ("SS 316L", "Material"), ("UHT Milk", "Application")],
       [("Capacity", "2,000 - 30,000 L/hr"), ("Vacuum", "0.02 - 0.05 bar(a)"), ("Temp", "65 - 78 deg C"), ("Material", "SS 316L Mirror")],
       ["UHT Milk", "Whey", "Butter Milk", "Skimmed Milk"],
       [("product-milk-pasteurizer-htst-ltlt.html", "assets/milk-pasteurizer-htst-ltlt.png", "Milk Pasteurizer", "HTST/LTLT pasteurization."),
        ("product-complete-milk-processing-plant.html", "assets/complete-milk-processing-plant.png", "Milk Processing Plant", "Complete dairy plant."),
        ("products.html#evaporators", "assets/falling-film-evaporator-latest.png", "Falling Film Evaporator", "Milk concentration.")],
       "e.g., 5,000 L/hr"),
    mk("Butter Processing Unit", "butter-processing-unit", "Dairy Processing Plants", "milk-processing", "fa-cow",
       "Continuous", "Butter Line", "assets/butter-processing-unit.png",
       "Complete butter processing line with cream separation, pasteurization, aging, and continuous butter-making for table, white, and salted butter.",
       [("500 - 20K", "kg/day"), ("< 16%", "Moisture"), ("SS 316L", "Material"), ("FSSAI", "Standard")],
       [("Capacity", "500 - 20,000 kg/day"), ("Moisture", "< 16% (as per std.)"), ("Material", "SS 304 / SS 316L"), ("Standard", "FSSAI / 3-A")],
       ["Table Butter", "White Butter", "Salted Butter", "Dairy Plants"],
       [("product-butter-churner.html", "assets/butter-churner.png", "Butter Churner", "Batch and continuous churning."),
        ("product-ghee-making-plant.html", "assets/ghee-making-plant.png", "Ghee Making Plant", "Complete ghee manufacturing."),
        ("product-complete-milk-processing-plant.html", "assets/complete-milk-processing-plant.png", "Milk Processing Plant", "Integrated dairy plant.")],
       "e.g., 5,000 kg/day"),
    mk("Ghee Making Plant", "ghee-making-plant", "Dairy Processing Plants", "milk-processing", "fa-cow",
       "AGMARK", "Pure Ghee", "assets/ghee-making-plant.png",
       "Turnkey ghee manufacturing plant covering butter melting, clarification, filtration, and filling for ISI-grade pure ghee production.",
       [("100 - 5K", "kg/hr"), ("< 0.3%", "FFA"), ("SS 316L", "Material"), ("AGMARK", "Standard")],
       [("Capacity", "100 - 5,000 kg/hr"), ("FFA", "< 0.3% (Oleic Acid)"), ("Material", "SS 316L Inner"), ("Standard", "AGMARK / FSSAI")],
       ["Pure Ghee", "Desi Ghee", "Co-operatives", "FMCG Brands"],
       [("product-ghee-kettle.html", "assets/ghee-kettle.png", "Ghee Kettle", "Steam-jacketed clarification."),
        ("product-butter-processing-unit.html", "assets/butter-processing-unit.png", "Butter Processing Unit", "Complete butter line."),
        ("product-butter-churner.html", "assets/butter-churner.png", "Butter Churner", "Cream to butter conversion.")],
       "e.g., 500 kg/hr"),
    mk("Butter Churner", "butter-churner", "Milk Processing Equipment", "milk-equipment", "fa-jar",
       "VFD Drive", "Churning", "assets/butter-churner.png",
       "Industrial stainless steel butter churner for converting cream into butter through continuous or batch churning with variable speed drive and CIP provision.",
       [("100 - 5K", "L/batch"), ("SS 316L", "Material"), ("VFD", "Drive"), ("FSSAI", "Standard")],
       [("Capacity", "100 - 5,000 L/batch"), ("Material", "SS 304 / SS 316L"), ("Drive", "Variable Speed (VFD)"), ("Standard", "FSSAI / 3-A")],
       ["Butter", "White Butter", "Dairy Plants", "Co-operatives"],
       [("product-butter-processing-unit.html", "assets/butter-processing-unit.png", "Butter Processing Unit", "Complete butter line."),
        ("product-ghee-kettle.html", "assets/ghee-kettle.png", "Ghee Kettle", "Ghee clarification vessel."),
        ("product-complete-milk-processing-plant.html", "assets/complete-milk-processing-plant.png", "Milk Processing Plant", "Turnkey dairy plant.")],
       "e.g., 1,000 L/batch"),
    mk("Ghee Kettle", "ghee-kettle", "Milk Processing Equipment", "milk-equipment", "fa-jar",
       "Steam Jacket", "Clarification", "assets/ghee-kettle.png",
       "Steam-jacketed ghee clarification kettle with SS 316L lining, scraper agitator, and tilting mechanism for hygienic ghee production.",
       [("100 - 2K", "Litres"), ("Steam/HW", "Heating"), ("SS 316L", "Inner"), ("Scraper", "Agitator")],
       [("Capacity", "100 - 2,000 L"), ("Heating", "Steam / Hot Water"), ("Material", "SS 316L Inner"), ("Agitator", "Scraper Blade Type")],
       ["Ghee", "Clarified Butter", "Dairy Plants"],
       [("product-ghee-making-plant.html", "assets/ghee-making-plant.png", "Ghee Making Plant", "Complete ghee plant."),
        ("product-butter-churner.html", "assets/butter-churner.png", "Butter Churner", "Cream to butter."),
        ("product-khoya-making-machine.html", "assets/khoya-making-machine.jpeg", "Khoya Making Machine", "Mawa production.")],
       "e.g., 500 L"),
    mk("Khoya Making Machine", "khoya-making-machine", "Milk Processing Equipment", "milk-equipment", "fa-jar",
       "Batch/Cont.", "Khoya/Mawa", "assets/khoya-making-machine.jpeg",
       "Stainless steel khoya (mawa) making machine with steam-jacketed pan, scraper agitator, and automated temperature control.",
       [("50 - 1K", "kg/hr"), ("Batch/Cont.", "Type"), ("SS 316L", "Material"), ("Auto Temp", "Control")],
       [("Capacity", "50 - 1,000 kg/hr"), ("Type", "Batch / Continuous"), ("Material", "SS 304 / SS 316L"), ("Control", "Auto Temp. Control")],
       ["Khoya / Mawa", "Mithai Units", "Dairy Plants", "FMCG"],
       [("product-ghee-kettle.html", "assets/ghee-kettle.png", "Ghee Kettle", "Similar steam-jacketed design."),
        ("product-butter-churner.html", "assets/butter-churner.png", "Butter Churner", "Dairy equipment."),
        ("products.html#evaporators", "assets/falling-film-evaporator-latest.png", "Falling Film Evaporator", "Milk concentration.")],
       "e.g., 200 kg/hr"),
    mk("Shell & Tube Heat Exchanger", "shell-tube-heat-exchanger", "Heat Exchangers", "heat-exchangers", "fa-temperature-high",
       "TEMA", "ASME Design", "assets/shell-tube-heat-exchanger-new.png",
       "Heavy-duty shell and tube heat exchangers per TEMA standards for heating, cooling, condensing, and preheating across all industries.",
       [("10kW - 10MW", "Duty"), ("100 bar", "Pressure"), ("TEMA", "Standard"), ("CS/SS", "MOC")],
       [("Duty", "10 kW - 10 MW"), ("Design Press.", "Up to 100 bar"), ("Standard", "TEMA / ASME"), ("MOC", "CS / SS / Alloy")],
       ["Process Heating", "Condensers", "Reboilers"],
       [("product-plate-heat-exchanger-phe.html", "assets/plate-heat-exchanger-phe.png", "Plate Heat Exchanger", "Compact PHE design."),
        ("product-pressure-vessels-asme-ibr.html", "assets/pressure-vessels-asme-ibr.png", "Pressure Vessels", "ASME/IBR vessels."),
        ("products.html#evaporators", "assets/forced-circulation-evaporator-latest.png", "Forced Circulation Evaporator", "Process evaporation.")],
       "e.g., 500 kW duty"),
    mk("Plate Heat Exchanger (PHE)", "plate-heat-exchanger-phe", "Heat Exchangers", "heat-exchangers", "fa-temperature-high",
       "Compact", "High U-Value", "assets/plate-heat-exchanger-phe.png",
       "Compact gasketed plate heat exchangers with superior thermal performance for dairy, food, beverage, and HVAC applications.",
       [("2,000", "m3/hr max"), ("-35 to 200", "deg C"), ("SS/Ti", "Plates"), ("Gasketed", "Type")],
       [("Flow Rate", "Up to 2,000 m3/hr"), ("Temp Range", "-35 to +200 deg C"), ("Plates", "Titanium / SS 316"), ("Type", "Gasketed / BHE")],
       ["Dairy", "Beverages", "HVAC", "Pharma"],
       [("product-shell-tube-heat-exchanger.html", "assets/shell-tube-heat-exchanger-new.png", "Shell & Tube HX", "Heavy-duty heat exchangers."),
        ("product-milk-pasteurizer-htst-ltlt.html", "assets/milk-pasteurizer-htst-ltlt.png", "Milk Pasteurizer", "PHE-based pasteurization."),
        ("product-milk-chilling-plant.html", "assets/milk-chilling-plant.png", "Milk Chilling Plant", "Milk cooling systems.")],
       "e.g., 50 m3/hr"),
    mk("Automated CIP System", "automated-cip-system", "CIP & Cleaning Systems", "cip", "fa-recycle",
       "3-A", "EHEDG", "assets/automated-cip-system.jpeg",
       "Fully automated Clean-in-Place systems with PLC-controlled pre-rinse, caustic wash, acid wash, and final rinse sequences.",
       [("3-A", "Standard"), ("2-4 Tank", "System"), ("PLC+HMI", "Control"), ("FDA", "Ready")],
       [("Standard", "3-A / EHEDG"), ("Tanks", "2 to 4-Tank System"), ("Control", "PLC + HMI"), ("Validation", "FDA-ready")],
       ["Dairy", "Beverage", "Pharma", "Food"],
       [("product-complete-milk-processing-plant.html", "assets/complete-milk-processing-plant.png", "Milk Processing Plant", "Integrated CIP dairy plant."),
        ("product-milk-pasteurizer-htst-ltlt.html", "assets/milk-pasteurizer-htst-ltlt.png", "Milk Pasteurizer", "CIP-ready pasteurizer."),
        ("product-stainless-steel-storage-silos.html", "assets/stainless-steel-storage-tanks.png", "SS Storage Silos", "CIP spray ball tanks.")],
       "e.g., 4-tank CIP system"),
    mk("Pressure Vessels (ASME / IBR)", "pressure-vessels-asme-ibr", "Pressure Vessels & Storage Tanks", "vessels", "fa-database",
       "ASME VIII", "IBR", "assets/pressure-vessels-asme-ibr.png",
       "Custom pressure vessels manufactured to ASME Section VIII Div. 1 and IBR standards with full material traceability and NDT testing.",
       [("100L - 200m3", "Volume"), ("300 bar", "Pressure"), ("CS/SS", "MOC"), ("3rd Party", "Inspection")],
       [("Volume", "100 L - 200 m3"), ("Pressure", "FV to 300 bar"), ("MOC", "CS / SS / Alloy"), ("Inspection", "Third-Party")],
       ["Chemical", "Pharma", "Oil & Gas", "Power"],
       [("product-stainless-steel-storage-silos.html", "assets/stainless-steel-storage-tanks.png", "SS Storage Silos", "Hygienic storage tanks."),
        ("product-shell-tube-heat-exchanger.html", "assets/shell-tube-heat-exchanger-new.png", "Shell & Tube HX", "Process heat exchange."),
        ("products.html#evaporators", "assets/forced-circulation-evaporator-latest.png", "Forced Circulation Evaporator", "Evaporation vessels.")],
       "e.g., 10 m3 vessel"),
    mk("Stainless Steel Storage Silos", "stainless-steel-storage-silos", "Pressure Vessels & Storage Tanks", "vessels", "fa-database",
       "Mirror", "Polish", "assets/stainless-steel-storage-tanks.png",
       "Hygienic SS 304/316L storage tanks with mirror-polished internals, insulation, agitators, CIP spray balls, and level instrumentation.",
       [("500L - 200KL", "Capacity"), ("SS 316L", "Material"), ("Ra 0.4", "Finish"), ("PUF", "Insulation")],
       [("Capacity", "500 L - 200,000 L"), ("Material", "SS 304 / SS 316L"), ("Finish", "Ra <= 0.4 - 0.8 um"), ("Insulation", "PUF / Rock Wool")],
       ["Dairy", "Food", "Pharma", "Chemical"],
       [("product-pressure-vessels-asme-ibr.html", "assets/pressure-vessels-asme-ibr.png", "Pressure Vessels", "ASME/IBR pressure vessels."),
        ("product-automated-cip-system.html", "assets/automated-cip-system.jpeg", "Automated CIP System", "Tank cleaning systems."),
        ("product-complete-milk-processing-plant.html", "assets/complete-milk-processing-plant.png", "Milk Processing Plant", "Complete dairy plant.")],
       "e.g., 50,000 L tank"),
    mk("Milk Can Conveyor", "milk-can-conveyor", "Dairy & Food Plant Equipments", "dairy-food-equipment", "fa-industry",
       "SS 304", "Automated", "assets/milk-can-conveyor.jpeg",
       "Automated stainless steel milk can conveyor for efficient handling and unloading at dairy collection points and processing plants.",
       [("10 - 50L", "Can Size"), ("VFD", "Speed"), ("SS 304", "Structure"), ("Roller", "Type")],
       [("Can Capacity", "10 - 50 L cans"), ("Speed", "Variable (VFD)"), ("Material", "SS 304 Structure"), ("Type", "Roller / Belt / Chain")],
       ["Dairy Plants", "Co-operatives", "Milk Unions", "Collection Centres"],
       [("product-bulk-milk-cooler.html", "assets/bulk-milk-cooler.png", "Bulk Milk Cooler", "Village BMC units."),
        ("product-complete-milk-processing-plant.html", "assets/complete-milk-processing-plant.png", "Milk Processing Plant", "Complete dairy plant."),
        ("product-milk-chilling-plant.html", "assets/milk-chilling-plant.png", "Milk Chilling Plant", "Industrial chilling.")],
       "e.g., 40 L can line"),
    mk("Bulk Milk Cooler (BMC)", "bulk-milk-cooler", "Dairy & Food Plant Equipments", "dairy-food-equipment", "fa-industry",
       "DX Cooling", "4 deg C", "assets/bulk-milk-cooler.png",
       "Direct expansion bulk milk cooler for rapid chilling at village-level milk collection centres. Cools milk from 35C to 4C within 3 hours.",
       [("300 - 10K", "Litres"), ("DX", "Cooling"), ("4 +/- 1", "deg C"), ("BIS/AMUL", "Standard")],
       [("Capacity", "300 - 10,000 L"), ("Cooling", "Direct Expansion (DX)"), ("Temp", "4 +/- 1 deg C"), ("Standard", "BIS / FSSAI / AMUL")],
       ["Village MCC", "AMUL Pattern", "Co-operatives", "Rural Dairy"],
       [("product-milk-chilling-plant.html", "assets/milk-chilling-plant.png", "Milk Chilling Plant", "Industrial-scale chilling."),
        ("product-milk-can-conveyor.html", "assets/milk-can-conveyor.jpeg", "Milk Can Conveyor", "Can handling system."),
        ("product-complete-milk-processing-plant.html", "assets/complete-milk-processing-plant.png", "Milk Processing Plant", "Complete dairy plant.")],
       "e.g., 2,000 L BMC"),
    mk("Crystallization Tank", "crystallization-tank", "Dairy & Food Plant Equipments", "dairy-food-equipment", "fa-industry",
       "Jacket/Coil", "Crystal Form", "assets/stainless-steel-storage-tanks.png",
       "Jacketed stainless steel crystallization tank for controlled cooling and crystal formation in dairy, food, sugar, and chemical processes with precise temperature control.",
       [("500 - 20K", "Litres"), ("Jacket", "Cooling"), ("SS 316L", "Material"), ("Anchor", "Agitator")],
       [("Capacity", "500 - 20,000 L"), ("Cooling", "Jacket / Coil"), ("Material", "SS 304 / SS 316L"), ("Agitator", "Anchor / Paddle")],
       ["Dairy", "Food", "Sugar", "Chemical"],
       [("product-bulk-milk-cooler.html", "assets/bulk-milk-cooler.png", "Bulk Milk Cooler (BMC)", "Village-level milk chilling."),
        ("product-stainless-steel-storage-silos.html", "assets/stainless-steel-storage-tanks.png", "SS Storage Silos", "Hygienic storage vessels."),
        ("product-pressure-vessels-asme-ibr.html", "assets/pressure-vessels-asme-ibr.png", "Pressure Vessels", "ASME/IBR process vessels.")],
       "e.g., 5,000 L tank"),
]

# Import build helpers from evaporator script pattern
def rows_html(rows):
    return "\n".join(f"                <tr><td>{a}</td><td>{b}</td></tr>" for a, b in rows)

def features_html(features):
    return "\n".join(
        f'            <div class="adv-card"><div class="adv-icon"><i class="fa-solid {i}"></i></div>'
        f'<div><div class="adv-title">{t}</div><div class="adv-desc">{d}</div></div></div>'
        for i, t, d in features
    )

def apps_html(apps):
    return "\n".join(
        f'''            <div style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:24px;text-align:center;transition:all 0.3s;" onmouseover="this.style.boxShadow='var(--shadow-lg)';this.style.borderColor='var(--blue-200)'" onmouseout="this.style.boxShadow='';this.style.borderColor='var(--gray-200)'">
              <div style="font-size:2.5rem;margin-bottom:12px;"><i class="fa-solid {i}"></i></div>
              <div style="font-size:0.9375rem;font-weight:700;color:var(--gray-900);font-family:'Montserrat',sans-serif;margin-bottom:6px;">{t}</div>
              <div style="font-size:0.8125rem;color:var(--gray-600);line-height:1.6;">{d}</div>
            </div>'''
        for i, t, d in apps
    )

def advantages_html(advs):
    return "\n".join(
        f'            <div class="adv-card"><div class="adv-icon"><i class="fa-solid {i}"></i></div>'
        f'<div><div class="adv-title">{t}</div><div class="adv-desc">{d}</div></div></div>'
        for i, t, d in advs
    )

def steps_html(steps):
    return "\n".join(
        f'''            <div style="display:flex;gap:20px;align-items:flex-start;">
              <div style="width:44px;height:44px;background:linear-gradient(135deg,var(--blue-500),var(--blue-700));border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;font-size:1.125rem;font-weight:700;flex-shrink:0;font-family:'Montserrat',sans-serif;">{n}</div>
              <div><div style="font-size:1rem;font-weight:700;color:var(--gray-900);font-family:'Montserrat',sans-serif;margin-bottom:6px;">{t}</div>
              <div style="font-size:0.9rem;color:var(--gray-600);line-height:1.7;">{d}</div></div></div>'''
        for n, (t, d) in enumerate(steps, 1)
    )

def related_html(related):
    return "\n".join(
        f'''      <div class="related-card">
        <div class="related-img"><img src="{img}" alt="{title}"></div>
        <div class="related-body"><div class="related-title">{title}</div><div class="related-desc">{desc}</div>
          <a href="{href}" class="btn btn-outline btn-sm" style="width:100%;justify-content:center;">View Product</a>
        </div></div>'''
        for href, img, title, desc in related
    )

def quick_specs_html(quick):
    lines = []
    for i, (label, val) in enumerate(quick):
        border = "border-bottom:1px solid var(--gray-100);" if i < len(quick) - 1 else ""
        lines.append(f'''            <div style="display:flex;justify-content:space-between;font-size:0.8125rem;padding-bottom:8px;{border}">
              <span style="color:var(--gray-600);">{label}</span><span style="font-weight:700;color:var(--gray-900);">{val}</span></div>''')
    return "\n".join(lines)

def qs_html(qs):
    return "\n".join(
        f'          <div class="prod-qs"><div class="prod-qs-val">{v}</div><div class="prod-qs-label">{l}</div></div>'
        for v, l in qs
    )

def build_page(p):
    html = TEMPLATE.read_text(encoding="utf-8-sig")
    slug, name = p["slug"], p["name"]
    fname = f"product-{slug}.html"

    html = re.sub(r"<title>.*?</title>", f"<title>{name} | Gausin International Engineers Pvt. Ltd.</title>", html, count=1)
    html = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{name} by Gausin International Engineers — {p["tagline"][:140]}">', html, count=1)
    html = html.replace("product-spray-dryer.html", fname)
    html = html.replace('"name": "Spray Dryer (Nozzle / Rotary Disc)"', f'"name": "{name}"')
    html = html.replace("Spray Dryer (Nozzle / Rotary Disc) by Gausin", f"{name} by Gausin")
    html = html.replace('products.html#dryers', f'products.html#{p["section_id"]}')
    html = html.replace(f'<span class="current">Spray Dryer (Nozzle / Rotary Disc)</span>', f'<span class="current">{name}</span>')
    html = re.sub(r'<div class="prod-category-badge">\s*<i class="fa-solid fa-wind"></i> Dryers\s*</div>',
                  f'<div class="prod-category-badge"><i class="fa-solid {p["icon"]}"></i> {p["section"]}</div>', html)
    html = re.sub(r'<a href="products\.html#dryers">Dryers</a>', f'<a href="products.html#{p["section_id"]}">{p["section"]}</a>', html)
    html = re.sub(r"<h1 class=\"prod-title\">.*?</h1>", f'<h1 class="prod-title">{p["name_br"]}</h1>', html, count=1, flags=re.DOTALL)
    html = re.sub(r'<p class="prod-tagline">.*?</p>', f'<p class="prod-tagline">{p["tagline"]}</p>', html, count=1, flags=re.DOTALL)
    html = re.sub(
        r'<div class="prod-quick-specs">.*?</div>\s*</div>\s*<!-- Right: Product Image -->',
        f'<div class="prod-quick-specs">\n{qs_html(p["qs"])}\n        </div>\n      </div>\n\n      <!-- Right: Product Image -->',
        html, count=1, flags=re.DOTALL,
    )
    html = re.sub(r'<img src="assets/spray-dryer[^"]*" alt="[^"]*">', f'<img src="{p["image"]}" alt="{name} — Gausin International Engineers">', html, count=1)
    html = re.sub(r'Single Step</div>\s*<div style="font-size:0\.7rem[^"]*">Liquid to Powder',
                  f'{p["badge_val"]}</div>\n              <div style="font-size:0.7rem;color:var(--gray-500);">{p["badge_lbl"]}', html, count=1)

    ov = "\n".join(f'          <p style="font-size:1rem;color:var(--gray-600);line-height:1.8;margin-bottom:20px;">{para}</p>' for para in p["overview"])
    html = re.sub(
        r"<h2[^>]*>Product Overview</h2>\s*<p.*?</p>\s*<p.*?</p>\s*<p.*?</p>",
        f'<h2 style="font-size:1.5rem;font-weight:800;color:var(--gray-900);font-family:\'Montserrat\',sans-serif;margin-bottom:16px;">Product Overview</h2>\n{ov}',
        html, count=1, flags=re.DOTALL,
    )
    html = re.sub(
        r'(<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">).*?(</div>\s*</div>\s*<!-- Specifications -->)',
        rf"\1\n{features_html(p['features'])}\n          \2", html, count=1, flags=re.DOTALL,
    )
    html = re.sub(
        r"(<h3[^>]*>Process Parameters</h3>\s*<table class=\"spec-table\">).*?(</table>)",
        rf"\1\n{rows_html(p['process_specs'])}\n              \2", html, count=1, flags=re.DOTALL,
    )
    html = re.sub(
        r"(<h3[^>]*>Construction Details</h3>\s*<table class=\"spec-table\">).*?(</table>)",
        rf"\1\n{rows_html(p['construction_specs'])}\n              \2", html, count=1, flags=re.DOTALL,
    )
    html = re.sub(
        r'(<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-bottom:32px;">).*?(</div>\s*</div>\s*<!-- Advantages -->)',
        rf"\1\n{apps_html(p['apps'])}\n          \2", html, count=1, flags=re.DOTALL,
    )
    html = re.sub(
        r'(<h2[^>]*>Key Advantages</h2>\s*<div style="display:flex;flex-direction:column;gap:14px;">).*?(</div>\s*</div>\s*<!-- How It Works -->)',
        rf"\1\n{advantages_html(p['advantages'])}\n          \2", html, count=1, flags=re.DOTALL,
    )
    html = re.sub(
        r'(<h2[^>]*>How It Works</h2>\s*<div style="display:flex;flex-direction:column;gap:20px;">).*?(</div>\s*</div>\s*</div><!-- End main content -->)',
        rf"\1\n{steps_html(p['steps'])}\n          \2", html, count=1, flags=re.DOTALL,
    )
    html = re.sub(
        r'(<div style="display:flex;flex-direction:column;gap:8px;">).*?(</div>\s*</div>\s*</aside>)',
        rf"\1\n{quick_specs_html(p['quick'])}\n          \2", html, count=1, flags=re.DOTALL,
    )
    html = re.sub(
        r'(<div style="display:grid;grid-template-columns:repeat\(3,1fr\);gap:20px;"[^>]*>).*?(</div>\s*</div>\s*</section>\s*<!-- FOOTER -->)',
        rf"\1\n{related_html(p['related'])}\n    \2", html, count=1, flags=re.DOTALL,
    )
    html = html.replace('placeholder="e.g., 500 kg/hr powder"', f'placeholder="{p["cap_placeholder"]}"')
    html = html.replace("Gausin Spray Dryer", f"Gausin {name}")

    (ROOT / fname).write_text(html, encoding="utf-8")
    print("Wrote", fname)
    return fname

LINK_MAP = {p["name"]: f"product-{p['slug']}.html" for p in PRODUCTS}

def update_products_html():
    path = ROOT / "products.html"
    html = path.read_text(encoding="utf-8")
    for name, link in LINK_MAP.items():
        # Replace footer: Inquire + Datasheet -> Details + Inquire for each product title block
        pattern = (
            rf'(<div class="prod-title">{re.escape(name)}</div>.*?'
            r'<div class="prod-footer">\s*)'
            r'<a href="contact\.html" class="btn btn-primary btn-sm" style="flex:1;"><i class="fa-solid fa-paper-plane"></i> Inquire Now</a>\s*'
            r'<a href="contact\.html" class="btn btn-outline btn-sm">Datasheet</a>'
        )
        repl = rf'\1<a href="{link}" class="btn btn-outline btn-sm">Details</a>\n              <a href="contact.html" class="btn btn-primary btn-sm" style="flex:1;"><i class="fa-solid fa-paper-plane"></i> Inquire Now</a>'
        html, n = re.subn(pattern, repl, html, count=1, flags=re.DOTALL)
        if n:
            print(f"Updated link for: {name}")
        else:
            print(f"WARNING: no match for {name}")
    path.write_text(html, encoding="utf-8")

if __name__ == "__main__":
    for p in PRODUCTS:
        build_page(p)
    update_products_html()
