# -*- coding: utf-8 -*-
"""Generate product detail pages for Waste Management category."""
import importlib.util
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

spec = importlib.util.spec_from_file_location(
    "dairy_gen", ROOT / "scripts" / "generate-dairy-product-pages.py"
)
dairy_gen = importlib.util.module_from_spec(spec)
spec.loader.exec_module(dairy_gen)

TEMPLATE = ROOT / "product-spray-dryer.html"


def mk_waste(
    name,
    slug,
    tagline,
    badge_val,
    badge_lbl,
    badge_icon,
    img,
    keywords,
    schema_category,
    qs,
    specs,
    construction,
    instrumentation,
    apps,
    overview,
    features,
    advantages,
    steps,
    related,
    cap_ph,
    inquiry_msg,
):
    br = (
        name.replace(" (", "<br>(").replace(" / ", "<br>/ ")
        if len(name) > 28
        else name.replace(" ", "<br>", 1) if " " in name else name
    )
    quick = [(s[0], s[1]) for s in specs[:5]]
    return {
        "slug": slug,
        "name": name,
        "name_br": br,
        "section": "Waste Management",
        "section_id": "waste-management",
        "icon": "fa-leaf",
        "badge_val": badge_val,
        "badge_lbl": badge_lbl,
        "badge_icon": badge_icon,
        "image": img,
        "tagline": tagline,
        "keywords": keywords,
        "schema_category": schema_category,
        "qs": qs,
        "overview": overview,
        "features": features,
        "process_specs": [(s[0], s[1]) for s in specs],
        "construction_specs": construction,
        "instrumentation_specs": instrumentation,
        "apps": apps,
        "advantages": advantages,
        "steps": steps,
        "quick": quick,
        "related": related,
        "cap_placeholder": cap_ph,
        "inquiry_msg": inquiry_msg,
    }


FOOTER_PRODUCTS = (
    '<div><div class="footer-title">Products</div><div class="footer-links">'
    '<a href="products.html#evaporators" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Falling Film Evaporator</a>'
    '<a href="products.html#dryers" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Spray Dryer</a>'
    '<a href="products.html#waste-management" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Waste Management</a>'
    '<a href="product-etp-stp-treatment-plants.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>ETP/STP Treatment Plants</a>'
    '<a href="product-biomass-solid-waste-treatment-plant.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Biomass Solid Waste Treatment Plant</a>'
    '<a href="product-biogas-and-cng-plant.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Biogas and CNG Plant</a>'
    '</div></div>'
)


PRODUCTS = [
    mk_waste(
        "ETP/STP Treatment Plants",
        "etp-stp-treatment-plants",
        "Complete effluent treatment plant (ETP) and sewage treatment plant (STP) solutions for industrial and municipal wastewater. Designed for primary, secondary, and tertiary treatment with aeration, clarification, filtration, and sludge handling to meet CPCB discharge norms.",
        "CPCB",
        "Compliant",
        "fa-droplet",
        "assets/etp-stp-treatment-plants.png",
        "ETP plant, STP plant, effluent treatment, sewage treatment, wastewater treatment, CPCB compliant ETP, industrial wastewater India, Gausin",
        "Wastewater Treatment Plant",
        [("10 - 500", "m3/day"), ("CPCB/SPCB", "Norms"), ("Aerobic/", "Anaerobic"), ("PLC/SCADA", "Control")],
        [
            ("Capacity", "10 - 500 m3/day"),
            ("Treatment", "Primary / Secondary / Tertiary"),
            ("Compliance", "CPCB / SPCB Norms"),
            ("Control", "PLC / SCADA"),
        ],
        [
            ("Material of Construction", "RCC / MS / FRP tanks & piping"),
            ("Design Standard", "CPCB / SPCB effluent norms"),
            ("Aeration System", "Surface / Diffused aerators"),
            ("Sludge Handling", "Thickener, dewatering press / centrifuge"),
            ("Control System", "PLC / SCADA with HMI"),
            ("Warranty", "12 months from commissioning"),
        ],
        [
            ("Control System", "PLC / SCADA with HMI Touchscreen"),
            ("pH & DO Sensors", "Inline probes with auto alarm"),
            ("Flow Measurement", "Electromagnetic / ultrasonic flow meters"),
            ("Blower Control", "VFD-driven aeration blowers"),
            ("Chemical Dosing", "Auto dosing pumps (lime, alum, polymer)"),
            ("Level Monitoring", "Ultrasonic / radar level transmitters"),
        ],
        [
            ("fa-shirt", "Textile", "Treatment of dyeing, printing, and washing effluent with colour and COD reduction."),
            ("fa-pills", "Pharma", "Pharmaceutical wastewater with biological and tertiary polishing stages."),
            ("fa-utensils", "Food & Beverage", "High-BOD dairy, brewery, and food processing effluent treatment."),
            ("fa-flask", "Chemical", "Chemical plant effluent with pH neutralization, coagulation, and treatment for organics and heavy metals."),
            ("fa-city", "Municipal", "Sewage treatment for residential, commercial, and institutional developments."),
        ],
        [
            "The <strong style=\"color:var(--gray-900);\">Gausin ETP/STP Treatment Plants</strong> provide end-to-end wastewater treatment from influent screening through biological treatment, clarification, and tertiary polishing to meet prescribed discharge or reuse standards.",
            "Systems are engineered for textile, pharmaceutical, food processing, chemical, and municipal applications — with options for aerobic activated sludge, extended aeration, MBBR, SBR, and tertiary UF/RO for zero liquid discharge (ZLD) where required.",
            "Gausin delivers turnkey EPC scope including process design, civil guidance, equipment fabrication, installation, commissioning, operator training, and after-sales support.",
        ],
        [
            ("fa-scale-balanced", "Regulatory Compliance", "Designed to meet CPCB/SPCB effluent discharge and reuse norms."),
            ("fa-water", "Multi-Stage Treatment", "Primary, secondary, and tertiary stages tailored to effluent characteristics."),
            ("fa-robot", "PLC/SCADA Automation", "Automated dosing, aeration, and alarm management with data logging."),
            ("fa-recycle", "Sludge Management", "Thickening, dewatering, and disposal-ready sludge handling systems."),
            ("fa-bolt", "Energy-Efficient Aeration", "Optimized blower sizing and VFD control reduce power consumption."),
            ("fa-users", "Turnkey EPC", "Single-point responsibility from design through commissioning."),
        ],
        [
            ("fa-certificate", "Assured Compliance", "Process design validated against inlet load and outlet quality targets."),
            ("fa-sliders", "Flexible Process", "MBBR, SBR, ASP, and tertiary options matched to effluent type."),
            ("fa-coins", "Lower O&M Cost", "Robust equipment and automated control reduce operator dependency."),
            ("fa-screwdriver-wrench", "Easy Maintenance", "Accessible tanks, blowers, and pumps for routine servicing."),
            ("fa-chart-line", "Proven Performance", "Backed by environmental and process engineering experience."),
            ("fa-file-lines", "Full Documentation", "P&IDs, GA drawings, O&M manuals, and test certificates supplied."),
        ],
        [
            ("Pre-Treatment", "Screening, oil-grease trap, equalization, and neutralization prepare raw effluent for biological treatment."),
            ("Biological Treatment", "Aerobic or anaerobic process reduces BOD, COD, and nutrients in aeration tanks or bioreactors."),
            ("Clarification", "Settling tanks or DAF units separate biomass; excess sludge is thickened and dewatered."),
            ("Tertiary Polishing", "Sand filtration, activated carbon, or membrane stages polish effluent for discharge or reuse."),
            ("Discharge / Reuse", "Treated water meets outlet norms; optional RO stage enables process reuse or ZLD."),
        ],
        [
            ("product-wtp-uf-ro-softener-plants.html", "assets/wtp-uf-ro-softener-plants.png", "WTP/UF/RO/Softener Plants", "Water purification and reuse systems."),
            ("product-scrubber-systems.html", "assets/scrubber-systems.png", "Scrubber Systems", "Air emission control systems."),
            ("product-biomass-solid-waste-treatment-plant.html", "assets/biomass-solid-waste-treatment-plant.png", "Biomass Solid Waste Plant", "Solid waste processing solutions."),
        ],
        "e.g., 50 m3/day ETP",
        "Effluent type, inlet BOD/COD, flow rate, discharge norms, reuse requirement...",
    ),
    mk_waste(
        "Biomass Solid Waste Treatment Plant",
        "biomass-solid-waste-treatment-plant",
        "Integrated biomass and solid waste treatment plant for processing agricultural residue, industrial solid waste, and organic rejects. Includes shredding, drying, compaction, and energy recovery options for sustainable waste-to-resource conversion.",
        "Waste to",
        "Resource",
        "fa-recycle",
        "assets/biomass-solid-waste-treatment-plant.png",
        "biomass waste treatment, solid waste plant, MSW processing, RDF plant, waste to energy, agricultural waste India, Gausin",
        "Solid Waste Treatment Plant",
        [("1 - 50", "TPD"), ("Biomass/", "MSW"), ("Drying/", "Compaction"), ("Energy", "Recovery")],
        [
            ("Capacity", "1 - 50 TPD"),
            ("Feed", "Biomass / MSW / Organic"),
            ("Process", "Shred / Dry / Compact"),
            ("Output", "Fuel / Compost / RDF"),
        ],
        [
            ("Material of Construction", "MS structure with SS contact parts"),
            ("Design Standard", "SWM Rules / pollution control norms"),
            ("Shredder Type", "Single / twin shaft as per feed"),
            ("Dust Control", "Cyclone, bag filter, or wet scrubber"),
            ("Control System", "PLC / SCADA with HMI"),
            ("Warranty", "12 months from commissioning"),
        ],
        [
            ("Control System", "PLC / SCADA with HMI Touchscreen"),
            ("Weighing", "Platform / belt weigher for feed tracking"),
            ("Temperature Monitoring", "RTD sensors on dryer and exhaust"),
            ("Conveyor Control", "VFD-driven conveyors with interlocks"),
            ("Dust Monitor", "Opacity / PM monitoring at stack"),
            ("Safety Interlocks", "Emergency stop, overload, and fire detection"),
        ],
        [
            ("fa-wheat-awn", "Sugar & Agro", "Bagasse, press mud, and crop residue conversion to fuel or compost."),
            ("fa-scroll", "Paper & Pulp", "Reject handling, sludge drying, and RDF preparation."),
            ("fa-utensils", "Food Processing", "Organic rejects, packaging waste, and by-product recovery."),
            ("fa-city", "Municipal", "MSW sorting, shredding, and RDF production for co-processing."),
        ],
        [
            "The <strong style=\"color:var(--gray-900);\">Gausin Biomass Solid Waste Treatment Plant</strong> converts agricultural residue, industrial solid waste, and organic rejects into usable outputs such as RDF, compost, or biomass fuel through integrated mechanical processing.",
            "Plants include receiving, sorting, shredding, drying, baling or compaction, and emission control — sized for sugar mills, paper plants, food processors, and municipal solid waste facilities.",
            "Gausin provides complete engineering from feed characterization and layout design through fabrication, erection, commissioning, and operator training.",
        ],
        [
            ("fa-layer-group", "Multi-Feed Capability", "Handles biomass, MSW, and industrial solid waste streams."),
            ("fa-scissors", "Size Reduction", "Shredders and crushers reduce material to uniform particle size."),
            ("fa-fire", "Energy Recovery", "RDF, briquettes, or biogas feedstock from waste streams."),
            ("fa-wind", "Dust & Emission Control", "Cyclones, bag filters, and scrubbers protect air quality."),
            ("fa-gears", "Custom Layout", "Modular skid or field-erected design to suit site constraints."),
            ("fa-robot", "Automated Operation", "PLC-controlled conveyors, shredders, and interlocks."),
        ],
        [
            ("fa-leaf", "Sustainable Outcome", "Diverts waste from landfill toward fuel or compost recovery."),
            ("fa-sliders", "Process Flexibility", "Output format — RDF, briquettes, or compost — matched to end use."),
            ("fa-coins", "Revenue Potential", "Waste-to-resource conversion can offset fuel or disposal costs."),
            ("fa-shield-halved", "Regulatory Alignment", "Designed per solid waste management and emission norms."),
            ("fa-screwdriver-wrench", "Low Maintenance", "Heavy-duty components with accessible service points."),
            ("fa-users", "Turnkey Delivery", "Single contractor for design, supply, and commissioning."),
        ],
        [
            ("Receiving & Sorting", "Waste is weighed, inspected, and sorted to remove inerts and recyclables."),
            ("Shredding", "Primary and secondary shredders reduce particle size for uniform downstream processing."),
            ("Drying / Compaction", "Thermal drying or baling produces stable RDF, briquettes, or compost feed."),
            ("Product Recovery", "Finished RDF, biomass fuel, or compost is stored for dispatch or co-processing."),
            ("Emission Control", "Dust collectors and scrubbers treat exhaust before stack release."),
        ],
        [
            ("product-biogas-and-cng-plant.html", "assets/biogas-and-cng-plant.png", "Biogas and CNG Plant", "Organic waste to biogas conversion."),
            ("product-incinerator-system.html", "assets/incinerator-system.png", "Incinerator System", "Thermal waste destruction."),
            ("product-etp-stp-treatment-plants.html", "assets/etp-stp-treatment-plants.png", "ETP/STP Treatment Plants", "Liquid effluent treatment."),
        ],
        "e.g., 10 TPD plant",
        "Waste type, daily quantity, moisture content, desired output (RDF/compost/fuel)...",
    ),
    mk_waste(
        "Biogas and CNG Plant",
        "biogas-and-cng-plant",
        "Turnkey biogas plant with anaerobic digester, gas storage, purification, and CNG compression for converting organic waste and biomass into clean fuel. Suitable for dairy waste, food processing rejects, distillery spent wash, and agricultural biomass.",
        "Bio-CNG",
        "Grade Gas",
        "fa-fire-flame-simple",
        "assets/biogas-and-cng-plant.png",
        "biogas plant, CNG plant, anaerobic digester, bio-CNG, organic waste to energy, biogas upgrading India, Gausin",
        "Biogas & CNG Plant",
        [("50 - 5K", "m3/day gas"), ("CNG", "Compression"), ("H2S/CO2", "Scrubbing"), ("Digester", "CSTR/Plug Flow")],
        [
            ("Gas Output", "50 - 5,000 m3/day"),
            ("Feed", "Organic / Biomass / Slurry"),
            ("Purification", "H2S / CO2 / Moisture Removal"),
            ("End Product", "Biogas / Bio-CNG"),
        ],
        [
            ("Material of Construction", "MS digester with epoxy/glass coating; SS purification skid"),
            ("Design Standard", "PNGRB / MoPNG bio-CNG guidelines"),
            ("Digester Type", "CSTR / Plug-flow / High-rate anaerobic"),
            ("Gas Storage", "Double-membrane gas holder / pressurized vessel"),
            ("Compression", "Multi-stage CNG compressor with drying"),
            ("Warranty", "12 months from commissioning"),
        ],
        [
            ("Control System", "PLC / SCADA with HMI Touchscreen"),
            ("Gas Analysis", "CH4, H2S, CO2 inline monitoring"),
            ("Pressure & Level", "Transmitters on digester and gas holder"),
            ("Feed Control", "Pumps and mixers with VFD and timers"),
            ("Flare System", "Automatic flare for excess or startup gas"),
            ("Safety Systems", "Gas leak detection, flame arrestors, PRVs"),
        ],
        [
            ("fa-cow", "Dairy", "Cow dung, whey, and dairy effluent sludge for village and plant-scale biogas."),
            ("fa-wine-bottle", "Distillery", "Spent wash digestion with high-rate anaerobic reactors."),
            ("fa-utensils", "Food Processing", "Organic rejects and food waste converted to clean fuel."),
            ("fa-city", "Municipal", "Organic fraction of MSW processed for city gas or CNG."),
        ],
        [
            "The <strong style=\"color:var(--gray-900);\">Gausin Biogas and CNG Plant</strong> converts organic waste streams into pipeline-quality biogas or compressed bio-CNG through anaerobic digestion, gas purification, and multi-stage compression.",
            "Plants are designed for dairy cooperatives, distilleries, food processors, and municipal organic waste facilities — with digester heating, mixing, H2S/CO2 scrubbing, and CNG dispensing or grid injection options.",
            "Gausin provides complete scope from feed preparation and digester design through gas upgrading, compression, storage, and commissioning.",
        ],
        [
            ("fa-bacteria", "Anaerobic Digestion", "CSTR or plug-flow digesters optimized for feed characteristics."),
            ("fa-filter", "Gas Purification", "H2S, CO2, moisture, and siloxane removal for fuel-grade gas."),
            ("fa-gauge-high", "CNG Compression", "Multi-stage compressors deliver bio-CNG at required pressure."),
            ("fa-fire", "Digester Heating", "Boiler or CHP waste heat maintains optimal digester temperature."),
            ("fa-gas-pump", "Gas Storage", "Membrane holders or pressurized vessels buffer production."),
            ("fa-shield-halved", "Safety Systems", "Flares, leak detection, and pressure relief throughout."),
        ],
        [
            ("fa-leaf", "Renewable Fuel", "Replaces fossil LPG/CNG with carbon-neutral bio-CNG."),
            ("fa-coins", "Waste Monetization", "Organic waste becomes revenue-generating fuel."),
            ("fa-sliders", "Feed Flexibility", "Handles slurry, solid organics, and co-digestion blends."),
            ("fa-certificate", "Fuel-Grade Output", "Purification meets bio-CNG quality specifications."),
            ("fa-screwdriver-wrench", "Reliable Operation", "Proven digester and compressor packages."),
            ("fa-users", "Turnkey EPC", "Design, supply, erection, and commissioning under one roof."),
        ],
        [
            ("Feed Preparation", "Organic waste is shredded, mixed, and homogenized to optimal solids content."),
            ("Anaerobic Digestion", "Bacteria in heated digesters convert organics to raw biogas (CH4 + CO2)."),
            ("Biogas Collection", "Gas is stored in holders; H2S and moisture are removed in scrubbers."),
            ("Purification", "CO2 and remaining impurities are stripped to achieve fuel-grade methane content."),
            ("CNG Compression", "Purified biogas is dried and compressed for storage, dispensing, or grid injection."),
        ],
        [
            ("product-biomass-solid-waste-treatment-plant.html", "assets/biomass-solid-waste-treatment-plant.png", "Biomass Solid Waste Plant", "Solid waste preprocessing."),
            ("product-scrubber-systems.html", "assets/scrubber-systems.png", "Scrubber Systems", "H2S and flue gas scrubbing."),
            ("product-etp-stp-treatment-plants.html", "assets/etp-stp-treatment-plants.png", "ETP/STP Treatment Plants", "Digester effluent treatment."),
        ],
        "e.g., 500 m3/day biogas",
        "Feed material, daily organic load, methane target, CNG dispensing or grid injection...",
    ),
    mk_waste(
        "WTP/UF/RO/Softener Plants",
        "wtp-uf-ro-softener-plants",
        "Complete water treatment plants including WTP, ultrafiltration (UF), reverse osmosis (RO), and softener systems for industrial process water, boiler feed, and drinking water applications with automated backwash and chemical dosing.",
        "UF / RO",
        "Membrane",
        "fa-faucet-drip",
        "assets/wtp-uf-ro-softener-plants.png",
        "RO plant, UF plant, water treatment plant, industrial RO, boiler feed water, softener plant, drinking water treatment India, Gausin",
        "Water Treatment Plant",
        [("1 - 200", "m3/hr"), ("RO/UF/", "Membrane"), ("TDS < 50", "ppm option"), ("Auto", "Backwash")],
        [
            ("Capacity", "1 - 200 m3/hr"),
            ("Technology", "WTP / UF / RO / Softener"),
            ("Output TDS", "As per requirement"),
            ("Control", "PLC / Auto Dosing"),
        ],
        [
            ("Material of Construction", "FRP / SS pressure vessels; UPVC / SS piping"),
            ("Design Standard", "IS 10500 / WHO drinking water norms"),
            ("Membrane Type", "Polyamide RO / PVDF UF modules"),
            ("Pre-Treatment", "Multimedia filter, activated carbon, antiscalant dosing"),
            ("Skid Mounting", "Factory-assembled modular skids"),
            ("Warranty", "12 months from commissioning"),
        ],
        [
            ("Control System", "PLC / SCADA with HMI Touchscreen"),
            ("TDS & Conductivity", "Inline meters on feed and permeate"),
            ("pH Monitoring", "Probes with auto chemical dosing"),
            ("Pressure Gauges", "Feed, concentrate, and permeate pressure"),
            ("Pump Control", "VFD high-pressure and transfer pumps"),
            ("Auto Backwash", "Timed backwash and CIP for membranes"),
        ],
        [
            ("fa-pills", "Pharma", "USP-grade purified water and WFI pre-treatment systems."),
            ("fa-utensils", "Food & Beverage", "Process water, rinse water, and beverage production supply."),
            ("fa-fire-flame-simple", "Boiler Feed", "Softened and demineralized water for high-pressure boilers."),
            ("fa-glass-water", "Drinking Water", "Packaged drinking water and community water supply plants."),
        ],
        [
            "The <strong style=\"color:var(--gray-900);\">Gausin WTP/UF/RO/Softener Plants</strong> deliver treated water tailored to process, boiler, or potable quality requirements through multi-stage filtration, membrane separation, and ion exchange.",
            "Systems include raw water pre-treatment, ultrafiltration for suspended solids removal, reverse osmosis for dissolved solids reduction, and softeners for hardness removal — all with automated backwash, chemical dosing, and remote monitoring.",
            "Gausin supplies skid-mounted or field-erected plants with full documentation, membrane performance guarantees, and operator training.",
        ],
        [
            ("fa-filter", "Multi-Stage Treatment", "WTP, UF, RO, and softener stages in one integrated package."),
            ("fa-droplet", "Membrane Technology", "High-rejection RO and UF for consistent permeate quality."),
            ("fa-rotate", "Auto Backwash", "Programmed backwash and CIP extends membrane life."),
            ("fa-flask", "Chemical Dosing", "Antiscalant, chlorine, and pH correction systems included."),
            ("fa-chart-line", "Recovery Optimization", "Designed for maximum permeate recovery and minimum waste."),
            ("fa-truck-fast", "Skid-Mounted", "Factory-tested skids reduce site installation time."),
        ],
        [
            ("fa-certificate", "Quality Assured", "Permeate quality meets IS, WHO, or custom specifications."),
            ("fa-coins", "Lower Operating Cost", "Optimized recovery and energy-efficient high-pressure pumps."),
            ("fa-sliders", "Scalable Design", "Modular trains allow capacity expansion."),
            ("fa-screwdriver-wrench", "Easy Maintenance", "Quick-release housings and standardized spares."),
            ("fa-robot", "Automated Control", "PLC manages backwash, dosing, and alarm sequences."),
            ("fa-users", "Turnkey Supply", "Design, fabrication, installation, and commissioning included."),
        ],
        [
            ("Raw Water Intake", "Source water is pumped through screens and stored in feed tanks."),
            ("Pre-Treatment", "Multimedia filters, carbon filters, and antiscalant dosing protect membranes."),
            ("UF / RO Filtration", "Membranes remove suspended solids (UF) and dissolved salts (RO)."),
            ("Softening", "Ion-exchange softeners remove hardness for boiler or process use."),
            ("Treated Water Storage", "Permeate is stored and distributed at required pressure and quality."),
        ],
        [
            ("product-etp-stp-treatment-plants.html", "assets/etp-stp-treatment-plants.png", "ETP/STP Treatment Plants", "Wastewater treatment and reuse."),
            ("product-plate-heat-exchanger-phe.html", "assets/plate-heat-exchanger-phe.png", "Plate Heat Exchanger", "Process heat exchange."),
            ("product-pressure-vessels-asme-ibr.html", "assets/pressure-vessels-asme-ibr.png", "Pressure Vessels", "RO and process vessels."),
        ],
        "e.g., 20 m3/hr RO plant",
        "Raw water source, inlet TDS, required output quality, flow rate, end use...",
    ),
    mk_waste(
        "Scrubber Systems",
        "scrubber-systems",
        "Wet and dry scrubber systems for removal of particulates, acid gases, VOCs, and odorous compounds from industrial exhaust streams. Custom-designed for boiler flue gas, chemical reactors, and process vent lines.",
        "CPCB",
        "Emission Control",
        "fa-wind",
        "assets/scrubber-systems.png",
        "scrubber system, wet scrubber, dry scrubber, air pollution control, flue gas scrubbing, H2S scrubber, VOC removal India, Gausin",
        "Air Pollution Control Equipment",
        [("1K - 100K", "Am3/hr"), ("Wet/Dry", "Type"), ("SO2/HCl/", "VOC Removal"), ("SS/FRP", "MOC")],
        [
            ("Gas Flow", "1,000 - 100,000 Am3/hr"),
            ("Type", "Wet / Dry / Packed Bed"),
            ("Removal", "PM / SO2 / HCl / VOC"),
            ("Material", "SS / FRP / PP"),
        ],
        [
            ("Material of Construction", "SS 316L / FRP / PP as per gas composition"),
            ("Design Standard", "CPCB / SPCB emission norms"),
            ("Scrubber Type", "Venturi / packed bed / spray tower"),
            ("Mist Eliminator", "Mesh pad or cyclonic demister"),
            ("Fan", "Centrifugal ID fan with VFD"),
            ("Warranty", "12 months from commissioning"),
        ],
        [
            ("Control System", "PLC / SCADA with HMI Touchscreen"),
            ("pH Control", "Scrub liquor pH with auto caustic dosing"),
            ("Fan Control", "VFD-driven ID fan for flow modulation"),
            ("Pressure Drop", "Differential pressure transmitters across bed"),
            ("Stack Monitoring", "CEMS integration provision"),
            ("Level Control", "Sump level sensors with recycle pump control"),
        ],
        [
            ("fa-flask", "Chemical", "Acid gas and VOC removal from reactors and storage vents."),
            ("fa-pills", "Pharma", "Solvent vapour and odour control in manufacturing areas."),
            ("fa-fire-flame-simple", "Boiler & Furnace", "SO2, HCl, and particulate removal from flue gas."),
            ("fa-utensils", "Food Processing", "Odour and particulate scrubbing from dryers and cookers."),
        ],
        [
            "The <strong style=\"color:var(--gray-900);\">Gausin Scrubber Systems</strong> remove particulate matter, acid gases (SO2, HCl, HF), VOCs, and odorous compounds from industrial exhaust streams to meet stack emission norms.",
            "Wet scrubbers use liquid contact for high-efficiency gas absorption; dry and packed-bed designs suit specific gas compositions and space constraints. Systems are custom-engineered for boilers, incinerators, chemical plants, and process vents.",
            "Gausin provides complete design, fabrication, ducting, fan selection, stack design, and commissioning with emission test support.",
        ],
        [
            ("fa-shower", "Wet / Dry Options", "Venturi, packed bed, and spray tower designs available."),
            ("fa-cloud", "Multi-Pollutant Removal", "PM, SO2, HCl, HF, VOC, and odour in one system."),
            ("fa-shield-halved", "Corrosion Resistant", "FRP, PP, and SS 316L for aggressive gas streams."),
            ("fa-gauge", "Low Pressure Drop", "Optimized packing and duct design minimize fan power."),
            ("fa-chart-line", "Emission Compliant", "Designed to meet CPCB/SPCB stack standards."),
            ("fa-drafting-compass", "Custom Ducting", "Complete duct, fan, and stack layout engineering."),
        ],
        [
            ("fa-certificate", "Regulatory Compliance", "Outlet concentrations meet applicable emission limits."),
            ("fa-sliders", "Gas-Specific Design", "L/G ratio, packing, and chemistry matched to pollutants."),
            ("fa-coins", "Energy Efficient", "Optimized fan and pressure drop reduce power cost."),
            ("fa-screwdriver-wrench", "Easy Servicing", "Access doors, spray nozzles, and sump cleanout provided."),
            ("fa-chart-line", "Proven Technology", "Wet scrubbing applied across boiler, chemical, and process duties."),
            ("fa-users", "Turnkey Installation", "Design, supply, erection, and performance testing included."),
        ],
        [
            ("Gas Inlet", "Hot or corrosive exhaust enters the scrubber through inlet ducting."),
            ("Scrubbing Contact", "Gas contacts scrub liquor in venturi, packed bed, or spray zone; pollutants absorb into liquid."),
            ("Mist Elimination", "Demister removes entrained droplets before gas exits the vessel."),
            ("Treated Exhaust", "Cleaned gas is discharged through ID fan and stack within emission limits."),
            ("Effluent Treatment", "Spent scrub liquor is neutralized and sent to ETP or recirculated."),
        ],
        [
            ("product-incinerator-system.html", "assets/incinerator-system.png", "Incinerator System", "Thermal destruction with scrubber integration."),
            ("product-biogas-and-cng-plant.html", "assets/biogas-and-cng-plant.png", "Biogas and CNG Plant", "Biogas H2S purification."),
            ("product-etp-stp-treatment-plants.html", "assets/etp-stp-treatment-plants.png", "ETP/STP Treatment Plants", "Scrubber blowdown treatment."),
        ],
        "e.g., 10,000 Am3/hr scrubber",
        "Gas composition, flow rate, pollutants to remove, stack emission limits...",
    ),
    mk_waste(
        "Incinerator System",
        "incinerator-system",
        "Industrial incinerator systems for safe thermal destruction of hazardous and non-hazardous solid and liquid waste. Designed with primary and secondary combustion chambers, scrubber integration, and emission monitoring for CPCB compliance.",
        "1100°C+",
        "Secondary",
        "fa-fire",
        "assets/incinerator-system.png",
        "incinerator system, hazardous waste incinerator, biomedical waste incinerator, thermal destruction, CPCB compliant incinerator India, Gausin",
        "Waste Incineration System",
        [("50 - 2K", "kg/hr"), ("Primary+", "Secondary"), ("Scrubber", "Integrated"), ("CPCB", "Compliant")],
        [
            ("Capacity", "50 - 2,000 kg/hr"),
            ("Chambers", "Primary + Secondary"),
            ("Waste Type", "Solid / Liquid / Sludge"),
            ("Emission", "CPCB / SPCB Compliant"),
        ],
        [
            ("Material of Construction", "Refractory-lined MS shell; SS 316L feed systems"),
            ("Design Standard", "CPCB / BMW Rules / HW Rules"),
            ("Combustion Temp.", "> 850°C primary; > 1100°C secondary"),
            ("Residence Time", "> 2 seconds in secondary chamber"),
            ("Scrubber", "Integrated wet scrubber and bag filter"),
            ("Warranty", "12 months from commissioning"),
        ],
        [
            ("Control System", "PLC / SCADA with HMI Touchscreen"),
            ("Temperature Probes", "Multi-point thermocouples in both chambers"),
            ("Oxygen Analyzer", "Secondary chamber O2 monitoring"),
            ("Burner Control", "Modulating burners with flame supervision"),
            ("Stack CEMS", "Provision for PM, CO, SO2, HCl, dioxin monitoring"),
            ("Feed Interlocks", "Over-temperature, low combustion, and door safety"),
        ],
        [
            ("fa-pills", "Pharma", "Disposal of expired drugs, solvents, and production rejects."),
            ("fa-flask", "Chemical", "Hazardous chemical and solvent waste destruction."),
            ("fa-hospital", "Hospital / BMW", "Biomedical waste per BMW Rules 2016."),
            ("fa-industry", "Industrial", "Paint sludge, oil waste, and mixed industrial refuse."),
        ],
        [
            "The <strong style=\"color:var(--gray-900);\">Gausin Incinerator System</strong> provides controlled thermal destruction of hazardous and non-hazardous solid and liquid waste through dual-chamber combustion with integrated flue gas treatment.",
            "Primary combustion volatilizes waste; secondary chamber operating above 1100°C with minimum 2-second residence time ensures complete oxidation of organics and dioxin/furan destruction per regulatory requirements.",
            "Gausin delivers turnkey systems including feed systems, combustion chambers, heat recovery options, scrubbers, stack, CEMS provision, and commissioning support.",
        ],
        [
            ("fa-fire", "Dual-Chamber Design", "Primary pyrolysis and secondary oxidation for complete destruction."),
            ("fa-temperature-high", "High-Temperature Oxidation", "Secondary chamber > 1100°C with mandated residence time."),
            ("fa-shower", "Integrated Scrubber", "Wet scrubber and bag filter treat flue gas before stack."),
            ("fa-chart-line", "Emission Monitoring", "CEMS provision for regulatory compliance verification."),
            ("fa-droplet", "Liquid & Solid Feed", "Ram feeder, screw conveyor, and liquid lance options."),
            ("fa-shield-halved", "CPCB Compliant", "Designed per BMW, HW, and industrial emission rules."),
        ],
        [
            ("fa-certificate", "Regulatory Compliance", "Meets CPCB emission and operating standards."),
            ("fa-shield-halved", "Safe Destruction", "Controlled combustion eliminates pathogens and organics."),
            ("fa-sliders", "Waste Flexibility", "Handles solid, liquid, sludge, and packaged waste."),
            ("fa-recycle", "Volume Reduction", "Ash residue is a fraction of original waste volume."),
            ("fa-screwdriver-wrench", "Robust Construction", "Refractory and burner systems built for continuous duty."),
            ("fa-users", "Turnkey EPC", "Design, fabrication, installation, and emission testing."),
        ],
        [
            ("Waste Feeding", "Solid waste via ram feeder or screw; liquids via atomizing lance into primary chamber."),
            ("Primary Combustion", "Waste is dried and volatilized at 800–1000°C in the primary chamber."),
            ("Secondary Oxidation", "Combustion gases held > 1100°C for > 2 seconds to destroy organics and dioxins."),
            ("Flue Gas Cooling", "Quench or heat exchanger reduces gas temperature before scrubbing."),
            ("Scrubbing & Stack Release", "Wet scrubber and bag filter clean gas; CEMS verifies compliance at stack."),
        ],
        [
            ("product-scrubber-systems.html", "assets/scrubber-systems.png", "Scrubber Systems", "Flue gas scrubbing systems."),
            ("product-biomass-solid-waste-treatment-plant.html", "assets/biomass-solid-waste-treatment-plant.png", "Biomass Solid Waste Plant", "Non-burnable solid waste handling."),
            ("product-etp-stp-treatment-plants.html", "assets/etp-stp-treatment-plants.png", "ETP/STP Treatment Plants", "Scrubber blowdown and leachate treatment."),
        ],
        "e.g., 200 kg/hr incinerator",
        "Waste type, daily quantity, calorific value, physical form, emission norms...",
    ),
]


def build_waste_page(p):
    html = TEMPLATE.read_text(encoding="utf-8-sig")
    slug, name = p["slug"], p["name"]
    fname = f"product-{slug}.html"
    tagline = p["tagline"]
    desc = f"{name} by Gausin International Engineers — {tagline[:160]}"

    html = re.sub(r"<title>.*?</title>", f"<title>{name} | Gausin International Engineers Pvt. Ltd.</title>", html, count=1)
    html = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{desc[:200]}">', html, count=1)
    html = re.sub(
        r'<meta name="keywords" content="[^"]*">',
        f'<meta name="keywords" content="{p["keywords"]}">',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:title" content="[^"]*">',
        f'<meta property="og:title" content="{name} | Gausin International Engineers">',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:description" content="[^"]*">',
        f'<meta property="og:description" content="{desc[:200]}">',
        html,
        count=1,
    )
    html = re.sub(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="https://www.gausin.in/{fname}">', html, count=1)
    html = re.sub(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="https://www.gausin.in/{fname}">', html, count=1)

    html = html.replace("product-spray-dryer.html", fname)
    html = html.replace('"name": "Spray Dryer (Nozzle / Rotary Disc)"', f'"name": "{name}"')
    html = re.sub(
        r'"description": "[^"]*"',
        f'"description": "{desc[:200]}"',
        html,
        count=1,
    )
    html = re.sub(
        r'"category": "[^"]*"',
        f'"category": "{p["schema_category"]}"',
        html,
        count=1,
    )
    html = html.replace("Spray Dryer (Nozzle / Rotary Disc) by Gausin", f"{name} by Gausin")
    html = html.replace(f'<span class="current">Spray Dryer (Nozzle / Rotary Disc)</span>', f'<span class="current">{name}</span>')
    html = html.replace(
        'placeholder="Product type, feed characteristics, throughput, final moisture..."',
        f'placeholder="{p["inquiry_msg"]}"',
    )
    html = re.sub(
        r'<div class="prod-category-badge">\s*<i class="fa-solid fa-wind"></i> Dryers\s*</div>',
        f'<div class="prod-category-badge"><i class="fa-solid {p["icon"]}"></i> {p["section"]}</div>',
        html,
    )
    html = re.sub(
        r'<a href="products\.html#dryers">Dryers</a>',
        f'<a href="products.html#{p["section_id"]}">{p["section"]}</a>',
        html,
    )
    html = re.sub(r"<h1 class=\"prod-title\">.*?</h1>", f'<h1 class="prod-title">{p["name_br"]}</h1>', html, count=1, flags=re.DOTALL)
    html = re.sub(r'<p class="prod-tagline">.*?</p>', f'<p class="prod-tagline">{tagline}</p>', html, count=1, flags=re.DOTALL)
    html = re.sub(
        r'<div class="prod-quick-specs">.*?</div>\s*</div>\s*<!-- Right: Product Image -->',
        f'<div class="prod-quick-specs">\n{dairy_gen.qs_html(p["qs"])}\n        </div>\n      </div>\n\n      <!-- Right: Product Image -->',
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'<img src="assets/spray-dryer[^"]*" alt="[^"]*">',
        f'<img src="{p["image"]}" alt="{name} — Gausin International Engineers">',
        html,
        count=1,
    )
    html = re.sub(
        r'<span style="font-size:1\.25rem;"><i class="fa-solid fa-spray-can-sparkles"></i></span>',
        f'<span style="font-size:1.25rem;"><i class="fa-solid {p["badge_icon"]}"></i></span>',
        html,
        count=1,
    )
    html = re.sub(
        r"Single Step</div>\s*<div style=\"font-size:0\.7rem[^\"]*\">Liquid to Powder",
        f'{p["badge_val"]}</div>\n              <div style="font-size:0.7rem;color:var(--gray-500);">{p["badge_lbl"]}',
        html,
        count=1,
    )

    ov = "\n".join(
        f'          <p style="font-size:1rem;color:var(--gray-600);line-height:1.8;margin-bottom:20px;">{para}</p>'
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
        rf"\1\n{dairy_gen.features_html(p['features'])}\n          \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r"(<h3[^>]*>Process Parameters</h3>\s*<table class=\"spec-table\">).*?(</table>)",
        rf"\1\n{dairy_gen.rows_html(p['process_specs'])}\n              \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r"(<h3[^>]*>Construction Details</h3>\s*<table class=\"spec-table\">).*?(</table>)",
        rf"\1\n{dairy_gen.rows_html(p['construction_specs'])}\n              \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r"(<h3[^>]*>Instrumentation & Controls</h3>\s*<table class=\"spec-table\">).*?(</table>)",
        rf"\1\n{dairy_gen.rows_html(p['instrumentation_specs'])}\n            </table>",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-bottom:32px;">).*?(</div>\s*</div>\s*<!-- Advantages -->)',
        rf"\1\n{dairy_gen.apps_html(p['apps'])}\n          \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<h2[^>]*>Key Advantages</h2>\s*<div style="display:flex;flex-direction:column;gap:14px;">).*?(</div>\s*</div>\s*<!-- How It Works -->)',
        rf"\1\n{dairy_gen.advantages_html(p['advantages'])}\n          \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<h2[^>]*>How It Works</h2>\s*<div style="display:flex;flex-direction:column;gap:20px;">).*?(</div>\s*</div>\s*</div><!-- End main content -->)',
        rf"\1\n{dairy_gen.steps_html(p['steps'])}\n          \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<div style="display:flex;flex-direction:column;gap:8px;">).*?(</div>\s*</div>\s*</aside>)',
        rf"\1\n{dairy_gen.quick_specs_html(p['quick'])}\n          \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<div style="display:grid;grid-template-columns:repeat\(3,1fr\);gap:20px;"[^>]*>).*?(</div>\s*</div>\s*</section>\s*<!-- FOOTER -->)',
        rf"\1\n{dairy_gen.related_html(p['related'])}\n    \2",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = html.replace('placeholder="e.g., 500 kg/hr powder"', f'placeholder="{p["cap_placeholder"]}"')
    html = html.replace("Gausin Spray Dryer", f"Gausin {name}")
    html = re.sub(
        r'<div><div class="footer-title">Products</div><div class="footer-links">.*?</div></div>',
        FOOTER_PRODUCTS,
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = html.replace(
        "Engineering process excellence through advanced evaporation, drying, and industrial plant solutions for dairy, pharma, chemical and food industries.",
        "Engineering environmental and process solutions — wastewater treatment, solid waste processing, biogas, air pollution control, and water purification for industrial and municipal applications.",
    )

    (ROOT / fname).write_text(html, encoding="utf-8")
    print("Wrote", fname)
    return fname


if __name__ == "__main__":
    for product in PRODUCTS:
        build_waste_page(product)
    print(f"Generated {len(PRODUCTS)} waste management product pages.")
