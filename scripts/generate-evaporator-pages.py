# -*- coding: utf-8 -*-
"""Generate evaporator product detail pages from falling film template."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "product-falling-film-evaporator.html"

PRODUCTS = [
    {
        "slug": "forced-circulation-evaporator",
        "name": "Forced Circulation Evaporator",
        "name_br": "Forced Circulation<br>Evaporator",
        "short": "FCE",
        "image": "assets/forced-circulation-evaporator-latest.png",
        "badge_val": "High Velocity",
        "badge_lbl": "No Fouling",
        "tagline": "Engineered for viscous, scaling, and crystallizing process fluids. Forced circulation maintains high tube-side velocity to prevent fouling and deliver reliable concentration of difficult feeds.",
        "qs": [("1K - 30K", "L/hr Capacity"), ("Vac - 3 bar", "Pressure"), ("SS 316L", "Material"), ("ASME", "Standard")],
        "overview": [
            "The <strong style=\"color:var(--gray-900);\">Gausin Forced Circulation Evaporator (FCE)</strong> uses a circulation pump to drive liquid through heat exchanger tubes at high velocity. This design is ideal when natural circulation or film evaporators cannot handle viscous, fouling, or crystal-forming feeds.",
            "The pumped circulation keeps solids in suspension, minimizes scale on tube walls, and allows operation at higher concentration factors. FCE systems are widely used in chemical, distillery, textile, and pharmaceutical industries.",
            "Each system is custom-engineered with CHEMCAD simulation and robust mechanical design for continuous 24/7 operation with optional multi-effect and vacuum configurations.",
        ],
        "features": [
            ("fa-arrows-rotate", "Forced Circulation", "High-velocity pump circulation prevents scaling and maintains heat transfer."),
            ("fa-gem", "Crystallizer Ready", "Suitable for products that crystallize during concentration."),
            ("fa-temperature-high", "Wide Temp. Range", "Operates from 40 to 120 deg C under vacuum or pressure."),
            ("fa-fan", "Axial / Centrifugal", "Circulation pump sized for your viscosity and solids loading."),
            ("fa-layer-group", "Multi-Effect Option", "Steam economy improved with double and triple effect layouts."),
            ("fa-robot", "PLC/SCADA Control", "Automated level, temperature, and vacuum control with data logging."),
        ],
        "process_specs": [
            ("Evaporation Capacity", "1,000 to 30,000 L/hr"),
            ("Operating Temperature", "40 - 120 deg C"),
            ("Operating Pressure", "Vacuum to 3 bar (g)"),
            ("Circulation Pump", "Axial / Centrifugal"),
            ("Feed Type", "Viscous / Scaling / Crystallizing"),
            ("Effects", "Single to Multi-Effect"),
        ],
        "construction_specs": [
            ("Material of Construction", "SS 304 / SS 316L / Hastelloy"),
            ("Heat Exchanger", "Shell & Tube / Calandria"),
            ("Separator", "Vapour-Liquid Separator Vessel"),
            ("Design Standard", "ASME Sec. VIII / IS / IBR"),
            ("Heating Medium", "Steam / Hot Water"),
            ("Inspection", "Third-Party / IBR as required"),
        ],
        "apps": [
            ("fa-flask-vial", "Chemical", "Caustic, effluent, organic and polymer solutions"),
            ("fa-wine-bottle", "Distillery", "Spent wash and stillage concentration"),
            ("fa-shirt", "Textile", "Effluent and process liquor concentration"),
            ("fa-seedling", "Agro", "Starch and agro-processing liquors"),
            ("fa-pills", "Pharma", "API and intermediate concentration"),
            ("fa-industry", "Sugar", "Syrup and massecuite applications"),
            ("fa-cow", "Dairy", "Milk, whey, cream, and dairy effluent concentration"),
            ("fa-utensils", "Food & Beverages", "Juices, sauces, concentrates, and beverage base processing"),
        ],
        "advantages": [
            ("fa-shield-halved", "Handles Difficult Fluids", "Ideal for feeds that foul, scale, or crystallize in standard evaporators."),
            ("fa-gauge-high", "Stable Heat Transfer", "Forced flow maintains consistent heat transfer coefficients."),
            ("fa-gears", "Continuous Operation", "Designed for long runs with minimal shutdown for cleaning."),
            ("fa-certificate", "Code Compliance", "Built to ASME, IS, and IBR requirements with full documentation."),
            ("fa-sliders", "Process Flexibility", "Wide operating range for varying feed concentrations."),
            ("fa-recycle", "Thermo Vapour Recompressor (TVR)", "Optional TVR compresses effect vapour with motive steam in a steam jet ejector and reuses it as heating medium, cutting live steam use and improving energy efficiency versus standard multi-effect operation alone."),
            ("fa-fan", "Axial Flow Pump", "Axial flow circulation pumps deliver high flow at moderate head, keeping tube velocity high to prevent fouling and scale while handling viscous or solids-containing process liquors efficiently."),
        ],
        "steps": [
            ("Feed & Preheat", "Feed liquor is preheated and introduced to the circulation loop at controlled flow rate."),
            ("Forced Circulation", "A circulation pump drives liquid through the heat exchanger tubes at high velocity, preventing deposition."),
            ("Evaporation", "Steam on the shell side evaporates water from the circulating process fluid in the tube-side circuit."),
            ("Separation", "Vapour and concentrated liquid separate in the vapour body; vapour proceeds to condensing or next effect."),
            ("Product Discharge", "Concentrated product is withdrawn at set density or concentration; crystals may be harvested where applicable."),
            ("Thermo Vapour Recompressor (TVR)", "Where TVR is installed, high-pressure motive steam enters a steam jet ejector that compresses low-pressure vapour from the effect, raising its pressure and temperature. The compressed vapour is returned as heating steam to the same or a preceding effect, reducing live steam demand and improving overall plant energy efficiency."),
        ],
        "quick": [("Capacity", "1,000 - 30,000 L/hr"), ("Pressure", "Vacuum to 3 bar"), ("Material", "SS 304 / 316L"), ("Pump", "Axial / Centrifugal"), ("Control", "PLC/SCADA")],
        "related": [
            ("product-falling-film-evaporator.html", "assets/falling-film-evaporator-latest.png", "Falling Film Evaporator", "Gentle thin-film evaporation for heat-sensitive products."),
            ("product-rising-film-evaporator.html", "assets/rising-film-evaporator-new.png", "Rising Film Evaporator", "Climbing film design for low-viscosity feeds."),
            ("product-plate-type-evaporator.html", "assets/plate-type-evaporator-latest.png", "Plate Type Evaporator", "Compact plate heat exchange for dairy and food."),
        ],
        "contact_product": "forced-circulation-evaporator",
        "cap_placeholder": "e.g., 10,000 L/hr",
    },
    {
        "slug": "rising-film-evaporator",
        "name": "Rising Film Evaporator",
        "name_br": "Rising Film<br>Evaporator",
        "short": "RFE",
        "image": "assets/rising-film-evaporator-new.png",
        "badge_val": "Climbing Film",
        "badge_lbl": "Low Viscosity",
        "tagline": "Vertical tube evaporator where liquid and vapour rise together in a climbing film. Suited for non-viscous, non-scaling feeds requiring moderate concentration with continuous operation.",
        "qs": [("500 - 20K", "L/hr Capacity"), ("3 - 9 m", "Tube Length"), ("SS 316L", "Material"), ("Continuous", "Operation")],
        "overview": [
            "The <strong style=\"color:var(--gray-900);\">Gausin Rising Film Evaporator (RFE)</strong> operates with liquid and vapour flowing upward inside vertical tubes, creating a rising or climbing film on the tube walls driven by the vapour lift effect.",
            "This configuration offers good heat transfer for low to medium viscosity feeds such as sugar solutions, caustic soda, and food liquors. It is not recommended for highly viscous or heavily scaling products.",
            "Gausin RFE units are designed with optimized tube length (3 to 9 m), calibrated feed distribution, and vacuum systems for energy-efficient operation. Optional <strong style=\"color:var(--gray-900);\">Thermo Vapour Recompressor (TVR)</strong> integration compresses effect vapour for reuse as heating steam, improving steam economy on multi-effect plants.",
        ],
        "features": [
            ("fa-arrow-up", "Rising Film", "Liquid and vapour rise together for efficient heat and mass transfer."),
            ("fa-ruler-vertical", "Long Tubes", "Tube lengths from 3 to 9 m for high evaporation rates per pass."),
            ("fa-droplet", "Low Hold-Up", "Suitable for continuous concentration of clear process liquors."),
            ("fa-wind", "Vapour Lift", "Generated vapour assists liquid movement up the tubes."),
            ("fa-layer-group", "Multi-Effect", "Available in double and triple effect for steam savings."),
            ("fa-recycle", "Thermo Vapour Recompressor (TVR)", "Optional TVR uses motive steam in a steam jet ejector to compress low-pressure vapour for reuse as heating medium, reducing live steam consumption."),
            ("fa-robot", "Automated Control", "PLC-based control of feed, vacuum, and product discharge."),
        ],
        "process_specs": [
            ("Evaporation Capacity", "500 to 20,000 L/hr"),
            ("Tube Length", "3 / 6 / 9 m (standard)"),
            ("Operating Mode", "Continuous"),
            ("Feed Viscosity", "Low to Medium"),
            ("Effects", "Single to Multi-Effect"),
            ("Vacuum Operation", "Available"),
        ],
        "construction_specs": [
            ("Material of Construction", "SS 304 / SS 316L"),
            ("Tube Diameter", "38 - 51 mm typical"),
            ("Calandria Design", "Vertical tube bundle"),
            ("Design Standard", "ASME / IS"),
            ("Heating Medium", "Steam"),
            ("Surface Finish", "As per application (food/pharma)"),
        ],
        "apps": [
            ("fa-cubes-stacked", "Sugar", "Syrup and sugar liquor concentration"),
            ("fa-scroll", "Pulp & Paper", "Black liquor and process liquors"),
            ("fa-flask", "Caustic", "Caustic soda concentration"),
            ("fa-utensils", "Food", "Clear food and beverage liquors"),
            ("fa-industry", "Chemical", "Non-scaling chemical solutions"),
            ("fa-droplet", "Water Treatment", "Effluent concentration applications"),
        ],
        "advantages": [
            ("fa-bolt", "High Throughput", "Good evaporation rate per unit for suitable feed types."),
            ("fa-coins", "Steam Economy", "Multi-effect arrangement reduces steam consumption."),
            ("fa-gears", "Simple Operation", "Proven design with straightforward operating procedures."),
            ("fa-arrows-up-down", "Flexible Capacity", "Modular sizing from 500 to 20,000 L/hr."),
            ("fa-certificate", "Engineered Design", "Thermal design verified with process simulation tools."),
        ],
        "steps": [
            ("Feed Entry", "Preheated feed enters the bottom of the vertical tube bundle."),
            ("Vapour Generation", "Steam heating causes partial evaporation; vapour bubbles lift the liquid film upward."),
            ("Climbing Film", "Liquid travels up tube walls as a thin film with rising vapour core."),
            ("Separation", "Mixture exits tubes into separator where vapour and concentrate are split."),
            ("Vapour Utilization", "Secondary vapour used in next effect or condensed; product discharged continuously."),
            ("Thermo Vapour Recompressor (TVR)", "Where TVR is installed, motive steam drives a steam jet ejector that compresses low-pressure vapour from an effect, raising its pressure and temperature. The compressed vapour returns as heating steam to the same or a preceding effect, reducing live steam demand on rising film multi-effect trains."),
        ],
        "quick": [("Capacity", "500 - 20,000 L/hr"), ("Tube Length", "3 - 9 m"), ("Material", "SS 304 / 316L"), ("Operation", "Continuous"), ("Control", "PLC/SCADA")],
        "related": [
            ("product-falling-film-evaporator.html", "assets/falling-film-evaporator-latest.png", "Falling Film Evaporator", "Thin-film design for heat-sensitive products."),
            ("product-forced-circulation-evaporator.html", "assets/forced-circulation-evaporator-latest.png", "Forced Circulation Evaporator", "For viscous and scaling fluids."),
            ("product-plate-type-evaporator.html", "assets/plate-type-evaporator-latest.png", "Plate Type Evaporator", "Compact plate design for dairy applications."),
        ],
        "contact_product": "rising-film-evaporator",
        "cap_placeholder": "e.g., 8,000 L/hr",
    },
    {
        "slug": "plate-type-evaporator",
        "name": "Plate Type Evaporator",
        "name_br": "Plate Type<br>Evaporator",
        "short": "PTE",
        "image": "assets/plate-type-evaporator-latest.png",
        "badge_val": "Compact",
        "badge_lbl": "High Efficiency",
        "tagline": "Compact plate heat exchanger evaporator with corrugated surfaces for excellent thermal performance and low liquid hold-up — ideal for dairy, food, and beverage applications.",
        "qs": [("200 - 10K", "L/hr Capacity"), ("Gasketed", "Design"), ("Very Compact", "Footprint"), ("CIP Ready", "Cleaning")],
        "overview": [
            "The <strong style=\"color:var(--gray-900);\">Gausin Plate Type Evaporator</strong> uses corrugated stainless steel plates as heat transfer surfaces. Steam and process liquid flow in alternate channels for efficient, compact evaporation.",
            "Low hold-up volume makes this design attractive for hygienic dairy and food processes where product quality and fast changeover matter. Gasketed or fully welded plate packs are offered based on application.",
            "Integrated CIP circuits and compact footprint reduce plant space and cleaning time compared to large calandria evaporators. Optional <strong style=\"color:var(--gray-900);\">Thermo Vapour Recompressor (TVR)</strong> integration compresses effect vapour for reuse as heating steam, improving steam economy on multi-effect plate evaporator systems.",
        ],
        "features": [
            ("fa-table-cells", "Plate Heat Exchange", "Corrugated plates deliver high heat transfer coefficients."),
            ("fa-compress", "Compact Footprint", "Significantly smaller than tube evaporators of same duty."),
            ("fa-droplet-slash", "Low Hold-Up", "Minimal product inventory in system at any time."),
            ("fa-spray-can-sparkles", "CIP Ready", "Designed for automated clean-in-place cleaning."),
            ("fa-layer-group", "Multi-Effect", "Plate effects stacked for steam economy."),
            ("fa-recycle", "Thermo Vapour Recompressor (TVR)", "Optional TVR uses motive steam in a steam jet ejector to compress low-pressure vapour for reuse as heating medium, reducing live steam consumption."),
            ("fa-cow", "Hygienic Design", "Food-grade materials and finishes for dairy applications."),
        ],
        "process_specs": [
            ("Evaporation Capacity", "200 to 10,000 L/hr"),
            ("Plate Design", "Gasketed / Fully Welded"),
            ("Operating Temperature", "40 - 95 deg C"),
            ("Hold-Up Volume", "Very Low"),
            ("Effects", "Single to Multi-Effect"),
            ("CIP", "Integrated CIP circuit"),
        ],
        "construction_specs": [
            ("Material of Construction", "SS 304 / SS 316L plates"),
            ("Plate Pattern", "Corrugated herringbone"),
            ("Frame", "Carbon steel / SS frame"),
            ("Gaskets", "FDA-compliant (food grade)"),
            ("Design Standard", "PED / ASME / 3-A (dairy)"),
            ("Surface Finish", "Ra <= 0.8 um (product side)"),
        ],
        "apps": [
            ("fa-cow", "Dairy", "Milk, whey, and dairy liquor concentration"),
            ("fa-wheat-awn", "Sugar", "Juice and syrup applications"),
            ("fa-glass-water", "Juice", "Fruit juice pre-concentration"),
            ("fa-flask", "Caustic", "Dilute caustic concentration"),
            ("fa-mug-saucer", "Beverages", "Tea, coffee, and beverage bases"),
            ("fa-pills", "Pharma", "Clear pharmaceutical solutions"),
            ("fa-water", "Waste Water", "Industrial and process wastewater concentration and volume reduction"),
            ("fa-cubes", "Sodium Chloride", "Brine and salt solution concentration, NaCl recovery and crystallization applications"),
        ],
        "advantages": [
            ("fa-maximize", "Space Saving", "Ideal where plant height or floor space is limited."),
            ("fa-temperature-low", "Gentle Processing", "Low inventory supports quality-sensitive products."),
            ("fa-broom", "Easy Cleaning", "CIP-friendly plate channels for hygienic industries."),
            ("fa-bolt", "Energy Efficient", "High U-value reduces heat transfer area required."),
            ("fa-wrench", "Maintainable", "Plate packs accessible for inspection and service."),
            ("fa-recycle", "Thermo Vapour Recompressor (TVR)", "Optional TVR compresses effect vapour with motive steam in a steam jet ejector and reuses it as heating medium, cutting live steam use and improving energy efficiency on multi-effect plate evaporator systems."),
        ],
        "steps": [
            ("Feed Distribution", "Process liquid distributed into plate channels at calibrated flow."),
            ("Heat Transfer", "Steam condenses on opposite side of plates; liquid evaporates in product channels."),
            ("Vapour Separation", "Generated vapour separated in dedicated vapour separator vessel."),
            ("Multi-Effect Cascade", "Vapour from one effect heats the next for reduced steam use."),
            ("Product & CIP", "Concentrate discharged at set Brix; CIP solution circulated through plate circuit."),
        ],
        "quick": [("Capacity", "200 - 10,000 L/hr"), ("Design", "Gasketed / Welded"), ("Footprint", "Very Compact"), ("CIP", "Integrated"), ("Control", "PLC/SCADA")],
        "related": [
            ("product-falling-film-evaporator.html", "assets/falling-film-evaporator-latest.png", "Falling Film Evaporator", "High-capacity thin-film evaporation."),
            ("product-batch-evaporator-vacuum-pan.html", "assets/batch-evaporator-vacuum-pan.png", "Batch Evaporator (Vacuum Pan)", "Batch concentration with vacuum control."),
            ("products.html#milk-processing", "assets/complete-milk-processing-plant.png", "Milk Processing Plant", "Complete integrated dairy lines."),
        ],
        "contact_product": "plate-type-evaporator",
        "cap_placeholder": "e.g., 3,000 L/hr",
    },
    {
        "slug": "batch-evaporator-vacuum-pan",
        "name": "Batch Evaporator (Vacuum Pan)",
        "name_br": "Batch Evaporator<br>(Vacuum Pan)",
        "short": "Vacuum Pan",
        "image": "assets/batch-evaporator-vacuum-pan.png",
        "badge_val": "Batch",
        "badge_lbl": "Vacuum Pan",
        "tagline": "Jacketed vacuum pan evaporator for batch concentration with precise control. Vacuum operation lowers boiling point to protect heat-sensitive products during each batch cycle.",
        "qs": [("100 - 5K", "L/batch"), ("0.1 - 0.95", "bar(g) Vacuum"), ("Steam Jacket", "Heating"), ("Optional", "Agitator")],
        "overview": [
            "The <strong style=\"color:var(--gray-900);\">Gausin Batch Evaporator (Vacuum Pan)</strong> is a jacketed vessel designed for batch-wise concentration where precise endpoint control and flexibility between recipes are required.",
            "Vacuum systems reduce boiling temperature, protecting active ingredients in pharmaceutical, confectionery, and nutraceutical applications. Optional agitators ensure uniform heating and prevent local overheating.",
            "Each pan is built in polished stainless steel with calibrated instrumentation for temperature, vacuum, and batch endpoint detection.",
        ],
        "features": [
            ("fa-clock", "Batch Operation", "Ideal for multi-product plants with recipe changeovers."),
            ("fa-gauge", "Vacuum Control", "Operating vacuum from 0.1 to 0.95 bar(g)."),
            ("fa-fire", "Jacket Heating", "Steam or hot water jacket for gentle heat input."),
            ("fa-blender", "Optional Agitator", "Slow-speed agitator for viscous or solid-containing batches."),
            ("fa-eye", "Sight & Sampling", "Sight glasses and sampling ports for batch monitoring."),
            ("fa-pills", "GMP Option", "Hygienic finish available for pharma applications."),
        ],
        "process_specs": [
            ("Batch Capacity", "100 to 5,000 L/batch"),
            ("Operating Vacuum", "0.1 to 0.95 bar(g)"),
            ("Jacket Heating", "Steam / Hot Water"),
            ("Agitator", "Optional (anchor / paddle)"),
            ("Boiling Point", "Reduced under vacuum"),
            ("Endpoint Control", "Brix / Density / Time"),
        ],
        "construction_specs": [
            ("Material of Construction", "SS 304 / SS 316L"),
            ("Vessel Type", "Jacketed vacuum pan"),
            ("Internal Finish", "Mirror polish (pharma/food)"),
            ("Design Standard", "ASME / IS"),
            ("Vacuum System", "Liquid ring pump / ejector"),
            ("Instrumentation", "Temp, pressure, vacuum gauges"),
        ],
        "apps": [
            ("fa-pills", "Pharma", "API, syrups, and liquid formulations"),
            ("fa-candy-cane", "Confectionery", "Syrups, bases, and candy masses"),
            ("fa-leaf", "Nutraceuticals", "Herbal extracts and botanical concentrates"),
            ("fa-flask", "Specialty Chemical", "Small-batch specialty products"),
            ("fa-vial", "Laboratory Scale", "Pilot and R&D batch trials"),
            ("fa-industry", "Food", "Sauces, purees, and specialty concentrates"),
        ],
        "advantages": [
            ("fa-sliders", "Precise Control", "Batch endpoint controlled by Brix, density, or time."),
            ("fa-shield-halved", "Product Protection", "Low-temperature boiling under vacuum preserves quality."),
            ("fa-repeat", "Recipe Flexibility", "Suited for multiple products on same equipment."),
            ("fa-screwdriver-wrench", "Simple Maintenance", "Accessible vessel with straightforward servicing."),
            ("fa-certificate", "Quality Finish", "Hygienic construction for regulated industries."),
        ],
        "steps": [
            ("Batch Charging", "Feed liquid charged into jacketed pan to set batch volume."),
            ("Vacuum & Heating", "Vacuum applied; jacket steam or hot water heats the batch gently."),
            ("Evaporation", "Water evaporates under reduced pressure; vapour removed by vacuum system."),
            ("Agitation (Optional)", "Agitator maintains uniform temperature and concentration profile."),
            ("Discharge", "Batch discharged at target concentration; vessel prepared for CIP or next batch."),
        ],
        "quick": [("Batch Size", "100 - 5,000 L"), ("Vacuum", "0.1 - 0.95 bar(g)"), ("Jacket", "Steam / Hot Water"), ("Agitator", "Optional"), ("Finish", "Mirror polish")],
        "related": [
            ("product-falling-film-evaporator.html", "assets/falling-film-evaporator-latest.png", "Falling Film Evaporator", "Continuous high-capacity evaporation."),
            ("product-plate-type-evaporator.html", "assets/plate-type-evaporator-latest.png", "Plate Type Evaporator", "Compact continuous plate evaporator."),
            ("products.html#dryers", "assets/spray-dryer-nozzle-rotary-disc.jpeg", "Spray Dryer", "Powder production from concentrates."),
        ],
        "contact_product": "batch-evaporator",
        "cap_placeholder": "e.g., 2,000 L/batch",
    },
]


def rows_html(rows):
    return "\n".join(f"                <tr><td>{a}</td><td>{b}</td></tr>" for a, b in rows)


def features_html(features):
    items = []
    for icon, title, desc in features:
        items.append(f"""            <div class="adv-card">
              <div class="adv-icon"><i class="fa-solid {icon}"></i></div>
              <div><div class="adv-title">{title}</div><div class="adv-desc">{desc}</div></div>
            </div>""")
    return "\n".join(items)


def apps_html(apps):
    items = []
    for icon, title, desc in apps:
        items.append(f"""            <div style="background:white;border:1px solid var(--gray-200);border-radius:16px;padding:24px;text-align:center;transition:all 0.3s;" onmouseover="this.style.boxShadow='var(--shadow-lg)';this.style.borderColor='var(--blue-200)'" onmouseout="this.style.boxShadow='';this.style.borderColor='var(--gray-200)'">
              <div style="font-size:2.5rem;margin-bottom:12px;"><i class="fa-solid {icon}"></i></div>
              <div style="font-size:0.9375rem;font-weight:700;color:var(--gray-900);font-family:'Montserrat',sans-serif;margin-bottom:6px;">{title}</div>
              <div style="font-size:0.8125rem;color:var(--gray-600);line-height:1.6;">{desc}</div>
            </div>""")
    return "\n".join(items)


def advantages_html(advs):
    items = []
    for icon, title, desc in advs:
        items.append(
            f'            <div class="adv-card"><div class="adv-icon"><i class="fa-solid {icon}"></i></div>'
            f"<div><div class=\"adv-title\">{title}</div><div class=\"adv-desc\">{desc}</div></div></div>"
        )
    return "\n".join(items)


def steps_html(steps):
    items = []
    for i, (title, desc) in enumerate(steps, 1):
        items.append(f"""            <div style="display:flex;gap:20px;align-items:flex-start;">
              <div style="width:44px;height:44px;background:linear-gradient(135deg,var(--blue-500),var(--blue-700));border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;font-size:1.125rem;font-weight:700;flex-shrink:0;font-family:'Montserrat',sans-serif;">{i}</div>
              <div>
                <div style="font-size:1rem;font-weight:700;color:var(--gray-900);font-family:'Montserrat',sans-serif;margin-bottom:6px;">{title}</div>
                <div style="font-size:0.9rem;color:var(--gray-600);line-height:1.7;">{desc}</div>
              </div>
            </div>""")
    return "\n".join(items)


def related_html(related):
    cards = []
    for href, img, title, desc in related:
        cards.append(f"""      <div class="related-card">
        <div class="related-img"><img src="{img}" alt="{title}"></div>
        <div class="related-body">
          <div class="related-title">{title}</div>
          <div class="related-desc">{desc}</div>
          <a href="{href}" class="btn btn-outline btn-sm" style="width:100%;justify-content:center;">View Product</a>
        </div>
      </div>""")
    return "\n".join(cards)


def quick_specs_html(quick):
    lines = []
    for i, (label, val) in enumerate(quick):
        border = "border-bottom:1px solid var(--gray-100);" if i < len(quick) - 1 else ""
        lines.append(f"""            <div style="display:flex;justify-content:space-between;font-size:0.8125rem;padding-bottom:8px;{border}">
              <span style="color:var(--gray-600);">{label}</span>
              <span style="font-weight:700;color:var(--gray-900);">{val}</span>
            </div>""")
    return "\n".join(lines)


def qs_html(qs):
    return "\n".join(
        f"""          <div class="prod-qs">
            <div class="prod-qs-val">{val}</div>
            <div class="prod-qs-label">{lbl}</div>
          </div>"""
        for val, lbl in qs
    )


def build_page(p):
    html = TEMPLATE.read_text(encoding="utf-8-sig")
    slug = p["slug"]
    fname = f"product-{slug}.html"
    name = p["name"]

    html = re.sub(
        r"<title>.*?</title>",
        f"<title>{name} | Gausin International Engineers Pvt. Ltd.</title>",
        html,
        count=1,
    )
    html = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{name} by Gausin International Engineers — {p["tagline"][:120]}">',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta name="keywords" content="[^"]*">',
        f'<meta name="keywords" content="{slug.replace("-", " ")}, evaporator, Gausin, industrial evaporation India">',
        html,
        count=1,
    )
    html = html.replace(
        '<meta property="og:title" content="Falling Film Evaporator | Gausin International Engineers">',
        f'<meta property="og:title" content="{name} | Gausin International Engineers">',
    )
    html = html.replace(
        "product-falling-film-evaporator.html",
        fname,
    )
    html = html.replace('"name": "Falling Film Evaporator"', f'"name": "{name}"')
    html = html.replace(
        "High-efficiency falling film evaporator for dairy",
        f"{name} for industrial process applications",
    )
    html = re.sub(
        r'<span class="current">Falling Film Evaporator</span>',
        f'<span class="current">{name}</span>',
        html,
    )
    html = re.sub(
        r"<h1 class=\"prod-title\">Falling Film<br>Evaporator</h1>",
        f'<h1 class="prod-title">{p["name_br"]}</h1>',
        html,
    )
    html = re.sub(
        r'<p class="prod-tagline">.*?</p>',
        f'<p class="prod-tagline">{p["tagline"]}</p>',
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'<div class="prod-quick-specs">.*?</div>\s*</div>\s*<!-- Right: Product Image -->',
        f'<div class="prod-quick-specs">\n{qs_html(p["qs"])}\n        </div>\n      </div>\n\n      <!-- Right: Product Image -->',
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'<img src="[^"]*" alt="Falling Film Evaporator[^"]*">',
        f'<img src="{p["image"]}" alt="{name} — Gausin International Engineers">',
        html,
        count=1,
    )
    html = re.sub(
        r'Up to 60%</div>\s*<div style="font-size:0\.7rem[^"]*">Steam Savings',
        f'{p["badge_val"]}</div>\n              <div style="font-size:0.7rem;color:var(--gray-500);">{p["badge_lbl"]}',
        html,
        count=1,
    )

    ov = "\n".join(
        f'          <p style="font-size:1rem;color:var(--gray-600);line-height:1.8;margin-bottom:20px;">\n            {para}\n          </p>'
        for para in p["overview"]
    )
    html = re.sub(
        r"<h2[^>]*>Product Overview</h2>\s*<p.*?</p>\s*<p.*?</p>\s*<p.*?</p>",
        f'<h2 style="font-size:1.5rem;font-weight:800;color:var(--gray-900);font-family:\'Montserrat\',sans-serif;margin-bottom:16px;">Product Overview</h2>\n{ov}',
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px;">).*?(</div>\s*</div>\s*<!-- Specifications -->)',
        rf"\1\n{features_html(p['features'])}\n          \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r"(<h3[^>]*>Process Parameters</h3>\s*<table class=\"spec-table\">).*?(</table>)",
        rf"\1\n{rows_html(p['process_specs'])}\n              \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r"(<h3[^>]*>Construction Details</h3>\s*<table class=\"spec-table\">).*?(</table>)",
        rf"\1\n{rows_html(p['construction_specs'])}\n              \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-bottom:32px;">).*?(</div>\s*</div>\s*<!-- Advantages -->)',
        rf"\1\n{apps_html(p['apps'])}\n          \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<h2[^>]*>Key Advantages</h2>\s*<div style="display:flex;flex-direction:column;gap:14px;">).*?(</div>\s*</div>\s*<!-- How It Works -->)',
        rf"\1\n{advantages_html(p['advantages'])}\n          \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<h2[^>]*>How It Works</h2>\s*<div style="display:flex;flex-direction:column;gap:20px;">).*?(</div>\s*</div>\s*</div><!-- End main content -->)',
        rf"\1\n{steps_html(p['steps'])}\n          \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<div style="display:flex;flex-direction:column;gap:8px;">).*?(</div>\s*</div>\s*</aside>)',
        rf"\1\n{quick_specs_html(p['quick'])}\n          \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<div style="display:grid;grid-template-columns:repeat\(3,1fr\);gap:20px;"[^>]*>).*?(</div>\s*</div>\s*</section>\s*<!-- FOOTER -->)',
        rf"\1\n{related_html(p['related'])}\n    \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = html.replace(
        'placeholder="e.g., 5,000 L/hr"',
        f'placeholder="{p["cap_placeholder"]}"',
    )
    html = html.replace(
        "Gausin Falling Film Evaporator",
        f"Gausin {name}",
    )
    html = html.replace(
        "Falling Film Evaporator",
        name,
    )
    # Restore falling film in related links text where needed
    for href, img, title, desc in p["related"]:
        if "falling-film" in href:
            pass  # already correct from related_html

    out = ROOT / fname
    out.write_text(html, encoding="utf-8")
    print("Wrote", out.name)


def main():
    for p in PRODUCTS:
        build_page(p)


if __name__ == "__main__":
    main()
