/* ============================================================
   GAUSIN INTERNATIONAL ENGINEERS PVT. LTD.
   AI Chatbot v2 — Smart Customer Assistant
   ============================================================ */

(function () {
  'use strict';
  if (window.location.pathname.includes('/admin/')) return;

  /* ── CSS ─────────────────────────────────────────────────── */
  const CSS = `
  <style id="gausin-chat-css">
  .gchat-fab {
    position: fixed; bottom: 22px; right: 28px; z-index: 600;
    width: 56px; height: 56px; border-radius: 50%; border: none;
    background: linear-gradient(140deg,#1D4ED8,#0A2540);
    color: #fff; font-size: 1.4rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 28px rgba(11,94,215,.55);
    transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
  }
  .gchat-fab:hover { transform: scale(1.1); box-shadow: 0 10px 36px rgba(11,94,215,.65); }
  .gchat-fab-badge {
    position: absolute; top: -4px; right: -4px;
    width: 19px; height: 19px; background: #EF4444;
    border: 2px solid #fff; border-radius: 50%;
    font-size: .62rem; font-weight: 700; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Montserrat',sans-serif;
    animation: gcFabPulse 2.2s ease infinite;
  }
  @keyframes gcFabPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.25)} }

  .gchat-win {
    position: fixed; right: 28px; bottom: 160px; z-index: 999;
    width: 360px;
    height: min(440px, calc(100dvh - 280px));
    background: #fff; border-radius: 22px;
    box-shadow: 0 24px 70px rgba(10,37,64,.22);
    display: flex; flex-direction: column; overflow: hidden;
    border: 1px solid #E2E8F0;
    transform: scale(.88) translateY(22px); opacity: 0; pointer-events: none;
    transition: transform .3s cubic-bezier(.34,1.56,.64,1), opacity .25s ease;
    transform-origin: bottom right;
  }
  .gchat-win.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }

  /* Header */
  .gchat-hd {
    background: linear-gradient(135deg,#0A2540,#1D4ED8);
    padding: 13px 16px; display: flex; align-items: center; gap: 11px; flex-shrink: 0;
  }
  .gchat-hd-logo {
    width: 40px; height: 40px; background: #fff; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; padding: 3px; flex-shrink: 0;
  }
  .gchat-hd-logo img { width: 100%; height: 100%; object-fit: contain; display: block; }
  .gchat-hd-info { flex: 1; min-width: 0; }
  .gchat-hd-name {
    font-size: .9rem; font-weight: 700; color: #fff;
    font-family: 'Montserrat',sans-serif; line-height: 1.2;
  }
  .gchat-hd-sub {
    font-size: .68rem; color: rgba(255,255,255,.65);
    display: flex; align-items: center; gap: 5px; margin-top: 2px;
  }
  .gchat-hd-sub::before {
    content: ''; width: 6px; height: 6px; background: #4ADE80;
    border-radius: 50%; display: inline-block; flex-shrink: 0;
    animation: gcOnline 2s ease infinite;
  }
  @keyframes gcOnline { 0%,100%{opacity:1} 50%{opacity:.4} }
  .gchat-hd-acts { display: flex; gap: 4px; }
  .gchat-hd-btn {
    background: rgba(255,255,255,.12); border: none; color: #fff;
    width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: .8rem; transition: background .2s; flex-shrink: 0;
  }
  .gchat-hd-btn:hover { background: rgba(255,255,255,.25); }

  /* Messages area */
  .gchat-msgs {
    flex: 1; overflow-y: auto; padding: 14px 12px 8px;
    display: flex; flex-direction: column; gap: 8px;
    background: #F8FAFC; scroll-behavior: smooth;
  }
  .gchat-msgs::-webkit-scrollbar { width: 3px; }
  .gchat-msgs::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 2px; }

  /* Message rows */
  .gc-row { display: flex; gap: 6px; align-items: flex-end; animation: gcIn .22s ease; }
  @keyframes gcIn { from{opacity:0;transform:translateY(7px)} to{opacity:1;transform:translateY(0)} }
  .gc-row.user { flex-direction: row-reverse; }

  .gc-ava {
    width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg,#1D4ED8,#0A2540);
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: .68rem;
  }
  .gc-row.user .gc-ava { background: #CBD5E1; color: #475569; }

  .gc-content { display: flex; flex-direction: column; gap: 3px; max-width: 248px; }
  .gc-row.user .gc-content { align-items: flex-end; }

  .gc-bubble {
    padding: 9px 13px; border-radius: 16px;
    font-size: .845rem; line-height: 1.55; color: #1E293B;
    background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.07);
    border: 1px solid #E2E8F0; word-break: break-word;
  }
  .gc-bubble a { color: #2563EB; font-weight: 600; }
  .gc-row.bot .gc-bubble { border-radius: 16px 16px 16px 3px; }
  .gc-row.user .gc-bubble {
    background: linear-gradient(135deg,#0B5ED7,#1E3A8A);
    color: #fff; border: none; border-radius: 16px 16px 3px 16px;
  }
  .gc-time { font-size: .65rem; color: #94A3B8; padding: 0 4px; }

  /* Typing indicator */
  .gc-typing { display: flex; gap: 6px; align-items: flex-end; }
  .gc-typing-bubble {
    background: #fff; border: 1px solid #E2E8F0; border-radius: 16px 16px 16px 3px;
    padding: 12px 16px; display: flex; gap: 4px; align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,.07);
  }
  .gc-dot {
    width: 6px; height: 6px; background: #94A3B8; border-radius: 50%;
    animation: gcDot 1.3s infinite ease;
  }
  .gc-dot:nth-child(2) { animation-delay: .2s; }
  .gc-dot:nth-child(3) { animation-delay: .4s; }
  @keyframes gcDot { 0%,60%,100%{transform:translateY(0);opacity:.35} 30%{transform:translateY(-5px);opacity:1} }

  /* Cursor blink while streaming */
  .gc-cursor {
    display: inline-block; width: 2px; height: 13px;
    background: #64748B; margin-left: 1px; vertical-align: middle;
    animation: gcCur .7s step-end infinite;
  }
  @keyframes gcCur { 0%,100%{opacity:1} 50%{opacity:0} }

  /* Quick reply chips */
  .gc-chips {
    display: flex; flex-wrap: wrap; gap: 6px;
    padding: 2px 0 0 32px; animation: gcIn .2s ease;
  }
  .gc-chip {
    background: #fff; border: 1.5px solid #BFDBFE; color: #1D4ED8;
    border-radius: 18px; padding: 5px 12px;
    font-size: .775rem; font-weight: 600; cursor: pointer;
    font-family: 'Montserrat',sans-serif; transition: all .18s; white-space: nowrap;
  }
  .gc-chip:hover { background: #0B5ED7; color: #fff; border-color: #0B5ED7; }

  /* Date divider */
  .gc-divider {
    text-align: center; font-size: .68rem; color: #94A3B8;
    position: relative; margin: 4px 0;
  }
  .gc-divider::before,.gc-divider::after {
    content: ''; position: absolute; top: 50%;
    width: 35%; height: 1px; background: #E2E8F0;
  }
  .gc-divider::before { left: 0; }
  .gc-divider::after  { right: 0; }

  /* Input bar */
  .gchat-bar {
    padding: 10px 12px; border-top: 1px solid #F1F5F9;
    display: flex; gap: 8px; align-items: center;
    background: #fff; flex-shrink: 0;
  }
  .gchat-inp {
    flex: 1; border: 1.5px solid #E2E8F0; border-radius: 20px;
    padding: 9px 15px; font-size: .845rem;
    font-family: 'Inter',sans-serif; outline: none; resize: none;
    transition: border-color .2s; background: #F8FAFC; color: #1E293B;
    line-height: 1.4;
  }
  .gchat-inp:focus { border-color: #3B82F6; background: #fff; }
  .gchat-inp::placeholder { color: #94A3B8; }
  .gchat-send-btn {
    width: 36px; height: 36px; flex-shrink: 0;
    background: linear-gradient(135deg,#0B5ED7,#1E3A8A);
    border: none; border-radius: 50%; color: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: .85rem; transition: transform .2s, opacity .2s;
  }
  .gchat-send-btn:hover { transform: scale(1.1); }
  .gchat-send-btn:disabled { opacity: .4; cursor: default; transform: none; }

  /* Powered by footer */
  .gchat-foot {
    text-align: center; padding: 5px 0 8px;
    font-size: .6rem; color: #CBD5E1; font-family: 'Montserrat',sans-serif;
    background: #fff; flex-shrink: 0;
  }

  @media (max-width: 480px) {
    .gchat-win { left: 10px; right: 10px; width: auto; bottom: 150px;
      height: min(400px, calc(100dvh - 270px)); }
    .gchat-fab { right: 16px; bottom: 18px; width: 50px; height: 50px; font-size: 1.25rem; }
  }
  </style>`;

  /* ── HTML ────────────────────────────────────────────────── */
  const HTML = `
  <button class="gchat-fab" id="gcFab" aria-label="Chat with us">
    <i class="fa-solid fa-robot"></i>
    <span class="gchat-fab-badge" id="gcBadge">1</span>
  </button>

  <div class="gchat-win" id="gcWin" role="dialog" aria-label="Gausin AI Assistant">
    <div class="gchat-hd">
      <div class="gchat-hd-logo">
        <img src="images/gausin-logo.png" alt="Gausin" onerror="this.parentElement.innerHTML='<i class=\'fa-solid fa-robot\' style=\'color:#1D4ED8;font-size:1.2rem\'></i>'">
      </div>
      <div class="gchat-hd-info">
        <div class="gchat-hd-name">Gausin Assistant</div>
        <div class="gchat-hd-sub">Online — typically replies instantly</div>
      </div>
      <div class="gchat-hd-acts">
        <button class="gchat-hd-btn" id="gcClear" title="Clear chat"><i class="fa-solid fa-rotate-right"></i></button>
        <button class="gchat-hd-btn" id="gcClose" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
    <div class="gchat-msgs" id="gcMsgs"></div>
    <div class="gchat-bar">
      <input class="gchat-inp" id="gcInp" placeholder="Type your message…" autocomplete="off" maxlength="300">
      <button class="gchat-send-btn" id="gcSend" aria-label="Send">
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
    <div class="gchat-foot">Powered by Gausin AI · gausin.in</div>
  </div>`;

  /* ── Knowledge Base ──────────────────────────────────────── */
  const KB = [
    {
      id: 'greetings',
      t: ['hi','hello','hey','namaste','hii','namaskar','good morning','good afternoon','good evening','hy','hye','start','kya ho','kaise','sup'],
      r: `👋 Namaste! I'm <strong>Gausin Assistant</strong>.<br><br>I can help you with information about our <strong>products, services, pricing</strong>, and more. What are you looking for today?`,
      q: ['Products', 'Services', 'Get a Quote', 'Contact Us']
    },
    {
      id: 'evaporators',
      t: ['evaporator','falling film','forced circulation','rising film','multiple effect','mee','mvr','tvr','vapor recompression','vacuum evaporator'],
      r: `<strong>Evaporators</strong> — our flagship product line! 🏭<br><br>
• <strong>Falling Film Evaporator</strong> — Low temp, energy-efficient<br>
• <strong>Forced Circulation Evaporator</strong> — Viscous/crystallizing feeds<br>
• <strong>Multiple Effect Evaporator (MEE)</strong> — Maximum steam economy<br>
• <strong>MVR Evaporator</strong> — 70–80% energy savings<br>
• <strong>Plate Type Evaporator</strong> — Compact design<br>
• <strong>Batch / Vacuum Pan</strong> — Small scale<br><br>
Used in dairy, pharma, chemical, distillery & sugar industries.`,
      q: ['Get a Quote', 'View All Products', 'Speak to Engineer']
    },
    {
      id: 'dryers',
      t: ['dryer','drying','spray dryer','spray drying','spin flash','fluidized bed','fbd','atfd','agitated thin film','closed circuit','powder'],
      r: `<strong>Industrial Dryers</strong> we manufacture: 💨<br><br>
• <strong>Spray Dryer</strong> — Liquid to fine powder<br>
• <strong>Spin Flash Dryer</strong> — Filter cakes & pastes<br>
• <strong>Fluidized Bed Dryer (FBD)</strong> — Uniform granule drying<br>
• <strong>Agitated Thin Film Dryer (ATFD)</strong> — Heat-sensitive materials<br>
• <strong>Closed Circuit Dryer</strong> — Solvent recovery<br><br>
GMP, cGMP & hygienic designs available. Capacities from lab to industrial scale.`,
      q: ['Get a Quote', 'View All Products', 'Speak to Engineer']
    },
    {
      id: 'heat-exchangers',
      t: ['heat exchanger','shell and tube','plate heat exchanger','phe','condenser','heater','cooler','heat transfer','reboiler','preheater'],
      r: `<strong>Heat Exchangers</strong> we design & fabricate: 🌡️<br><br>
• <strong>Shell & Tube</strong> — ASME Sec VIII / TEMA standards<br>
• <strong>Plate Heat Exchanger (PHE)</strong> — High efficiency, compact<br><br>
Applications: Pasteurizers, condensers, pre-heaters, reboilers, chillers.<br>
Materials: SS 304, SS 316L, Titanium, Hastelloy, Carbon Steel.<br>
NDT tested & certified.`,
      q: ['Get a Quote', 'Speak to Engineer']
    },
    {
      id: 'cip',
      t: ['cip','clean in place','cip system','automated cleaning','sanitation system'],
      r: `<strong>Automated CIP (Clean-In-Place) Systems</strong> ✅<br><br>
We design complete CIP skids for dairy, pharma & food plants:<br>
• Multi-tank CIP with PLC control<br>
• Chemical dosing & conductivity monitoring<br>
• Temperature-controlled circuits<br>
• FDA / GMP / 3-A compliant designs<br>
• Full automation with SCADA integration`,
      q: ['Get a Quote', 'Speak to Engineer']
    },
    {
      id: 'milk-processing',
      t: ['milk','pasteurizer','milk plant','dairy plant','htst','ltlt','deodorizer','mcc','milk chilling','bulk milk cooler','bmc'],
      r: `<strong>Milk Processing Equipment</strong> 🥛<br><br>
• Milk Pasteurizer (HTST / LTLT)<br>
• Milk Deodorizer / Vacuum De-aerator<br>
• Complete Milk Processing Plant (Turnkey)<br>
• Milk Chilling Centre (MCC)<br>
• Bulk Milk Cooler (BMC)<br>
• UHT Processing System<br><br>
All SS 304/316L, 3-A / PED certified, CIP compatible.`,
      q: ['Get a Quote', 'Speak to Engineer', 'View All Products']
    },
    {
      id: 'dairy-food',
      t: ['ghee','butter churner','khoya','crystallization','milk can conveyor','dairy food','ghee kettle','butter processing'],
      r: `<strong>Dairy & Food Processing Equipment</strong> 🍶<br><br>
• Butter Churner & Butter Processing Unit<br>
• Ghee Kettle & Industrial Ghee Making Plant<br>
• Khoya / Mawa Making Machine<br>
• Milk Can Conveyor<br>
• Crystallization Tank (sugar/lactose)<br><br>
Food-grade SS 304/316L, hygienic design, cGMP compliant.`,
      q: ['Get a Quote', 'Speak to Engineer']
    },
    {
      id: 'vessels',
      t: ['pressure vessel','storage tank','silo','ss tank','ibr','asme vessel','reactor','agitator','storage silo'],
      r: `<strong>Pressure Vessels & Storage Tanks</strong> 🏗️<br><br>
• Pressure Vessels — ASME Sec VIII Div 1 / IS:2825 / IBR certified<br>
• SS Storage Silos — up to 5,00,000 litres<br>
• Jacketed Reactors with Agitators<br>
• Insulated Storage Tanks<br><br>
Capacity: Up to 5,00,000 L &nbsp;|&nbsp; Pressure: up to 300 bar<br>
In-house RT, UT, PT, MT testing.`,
      q: ['Get a Quote', 'Speak to Engineer']
    },
    {
      id: 'waste',
      t: ['waste','etp','stp','effluent','biogas','scrubber','incinerator','zld','wtp','ro plant','water treatment','sewage','pollution control'],
      r: `<strong>Waste Management & Environment Systems</strong> 🌿<br><br>
• ETP / STP — Effluent & sewage treatment plants<br>
• ZLD (Zero Liquid Discharge) systems<br>
• Biogas & CNG Plant — Waste to clean energy<br>
• Scrubber Systems — Air pollution control<br>
• Incinerator System — Thermal treatment<br>
• WTP (UF / RO / Softener / DM Plant)<br><br>
PCB / CPCB compliant designs.`,
      q: ['Get a Quote', 'Speak to Engineer']
    },
    {
      id: 'products',
      t: ['product','products','equipment','machine','machinery','catalog','item','what do you make','kya banate','all products'],
      r: `Here's what we manufacture at Gausin: 🏭<br><br>
🔵 <strong>Evaporators</strong> &nbsp; 🔵 <strong>Dryers</strong><br>
🔵 <strong>Heat Exchangers</strong> &nbsp; 🔵 <strong>CIP Systems</strong><br>
🔵 <strong>Milk Processing Plants</strong> &nbsp; 🔵 <strong>Pressure Vessels</strong><br>
🔵 <strong>Dairy & Food Equipment</strong> &nbsp; 🔵 <strong>Waste Management</strong><br><br>
Tap any product below or ask me anything specific!`,
      q: ['Evaporators', 'Dryers', 'Heat Exchangers', 'Dairy Equipment', 'Waste Management']
    },
    {
      id: 'services',
      t: ['service','services','what do you do','engineering service','design service','what you offer'],
      r: `<strong>Engineering Services</strong> we provide: ⚙️<br><br>
1. <strong>Process Design & Engineering</strong> — CHEMCAD simulation, P&ID<br>
2. <strong>Detailed Engineering</strong> — 3D CAD, piping, instrumentation<br>
3. <strong>Turnkey Project Execution</strong> — Design to commissioning<br>
4. <strong>Energy Optimization</strong> — MVR, heat recovery, ZLD<br>
5. <strong>Automation & Control</strong> — PLC/SCADA, IoT<br>
6. <strong>Technical Consultancy</strong> — Troubleshooting, debottlenecking`,
      q: ['Turnkey Project', 'Energy Audit', 'Get a Quote', 'Contact Engineer']
    },
    {
      id: 'turnkey',
      t: ['turnkey','complete project','epc','commissioning','end to end','project execution','full project'],
      r: `<strong>Turnkey Project Execution</strong> 🚀<br><br>
We handle everything from design to commissioning:<br>
✅ Front-End Engineering Design (FEED)<br>
✅ Detailed engineering & procurement<br>
✅ Equipment fabrication & supply<br>
✅ Civil, structural & mechanical erection<br>
✅ Piping, electrical & instrumentation<br>
✅ Commissioning, performance testing & training<br>
✅ Full documentation & handover`,
      q: ['Get a Quote', 'Speak to Engineer']
    },
    {
      id: 'energy-audit',
      t: ['energy','energy audit','mvr','tvr','heat recovery','steam economy','energy optimization','energy saving','utility'],
      r: `<strong>Energy Optimization & Audit</strong> ⚡<br><br>
We help reduce plant energy costs by 40–60%:<br>
• Thermal energy audits for existing plants<br>
• MVR / TVR system design & retrofit<br>
• Multi-effect evaporation upgrades<br>
• Waste heat recovery system design<br>
• Detailed ROI report provided<br><br>
<strong>Typical savings: ₹50L–₹5Cr/year</strong> depending on plant size.`,
      q: ['Get a Quote', 'Speak to Engineer']
    },
    {
      id: 'quote',
      t: ['quote','price','cost','rate','pricing','how much','enquiry','inquiry','order','buy','purchase','quotation','offer','estimate','rate list'],
      r: `I'd love to help you get a quote! 📋<br><br>
To prepare an accurate offer, our engineers need:<br>
1️⃣ Product / equipment name<br>
2️⃣ Required capacity or throughput<br>
3️⃣ Material of construction<br>
4️⃣ Industry / application<br>
5️⃣ Installation location<br><br>
Our engineers respond within <strong>24–48 hours</strong> with a detailed techno-commercial proposal.`,
      q: ['Open Quote Form', 'Call Us Now', 'WhatsApp Us', 'Email Us']
    },
    {
      id: 'contact',
      t: ['contact','address','location','where','phone','number','reach','office','visit','meerut','call','find you'],
      r: `<strong>Gausin International Engineers Pvt. Ltd.</strong> 📍<br><br>
DH-249, Pallavpuram Phase-1,<br>
Roorkee Road, Meerut, UP – 250110<br><br>
📞 <a href="tel:+919870840779">+91 98708 40779</a><br>
✉️ <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@gausin.in" target="_blank">info@gausin.in</a><br>
🌐 <a href="https://www.gausin.in" target="_blank">www.gausin.in</a><br><br>
⏰ Mon – Sat &nbsp;|&nbsp; 9:00 AM – 6:00 PM IST`,
      q: ['Open Quote Form', 'WhatsApp Us', 'Get a Quote']
    },
    {
      id: 'about',
      t: ['about','company','gausin','who are you','tell me','established','founded','history','experience','years','background','overview'],
      r: `<strong>About Gausin International Engineers</strong> 🏭<br><br>
We are a leading industrial engineering company based in Meerut, India with:<br><br>
🗓️ <strong>25+ years</strong> of engineering excellence<br>
✅ ISO certified manufacturing facility<br>
🌍 <strong>200+ clients</strong> across India & globally<br>
🏗️ Specialising in evaporation, drying, dairy & process plants<br>
🔬 In-house design, fabrication & commissioning<br><br>
Serving dairy, pharma, chemical, food & energy sectors.`,
      q: ['Our Products', 'Our Services', 'Contact Us']
    },
    {
      id: 'industries',
      t: ['industry','industries','sector','pharma','pharmaceutical','chemical','food','distillery','paper','textile','sugar','brewery'],
      r: `<strong>Industries we serve</strong> 🏗️<br><br>
🥛 <strong>Dairy & Milk Processing</strong> — Our flagship<br>
💊 <strong>Pharmaceutical</strong> — GMP/cGMP compliant<br>
⚗️ <strong>Chemical & Petrochemical</strong> — Process plants<br>
🍽️ <strong>Food & Beverage</strong> — Hygienic systems<br>
🍺 <strong>Distillery & Brewery</strong> — ZLD, evaporation<br>
🌿 <strong>Sugar</strong> — Evaporators, crystallizers<br>
⚡ <strong>Energy / Power</strong> — Heat exchangers<br>
📄 <strong>Pulp & Paper</strong> — Black liquor recovery`,
      q: ['Our Products', 'Get a Quote', 'Contact Us']
    },
    {
      id: 'quality',
      t: ['certification','certified','iso','asme','ibr','quality','standard','gmp','fda','ndt','approved','compliance','audit'],
      r: `<strong>Quality, Standards & Certifications</strong> 🏅<br><br>
✅ ISO certified manufacturing facility<br>
✅ ASME Sec VIII Div 1 — Pressure Vessels<br>
✅ IBR — Indian Boiler Regulations<br>
✅ PED (Pressure Equipment Directive)<br>
✅ GMP / cGMP compliant designs<br>
✅ 3-A sanitary standards for dairy<br>
✅ In-house NDT: RT, UT, PT, MT<br>
✅ Hydrostatic pressure testing<br>
✅ Mirror polish Ra ≤ 0.4 µm`,
      q: ['Our Products', 'Get a Quote', 'Speak to Engineer']
    },
    {
      id: 'technology',
      t: ['technology','software','chemcad','htri','autocad','plc','scada','iot','automation','cnc','laser','fabrication','simulation'],
      r: `<strong>Technology & Engineering Tools</strong> 💻<br><br>
📐 <strong>CHEMCAD</strong> — Process simulation<br>
🌡️ <strong>HTRI Xchanger Suite</strong> — Thermal design<br>
📊 <strong>AutoCAD / SolidWorks</strong> — 3D plant design<br>
📋 <strong>MS Project</strong> — Project management<br>
🤖 <strong>PLC/SCADA</strong> — Plant automation<br>
📡 <strong>IoT</strong> — Remote monitoring & analytics<br>
⚙️ <strong>CNC Machining & Laser Cutting</strong> — Precision fabrication`,
      q: ['Our Services', 'Get a Quote', 'Contact Us']
    },
    {
      id: 'career',
      t: ['career','job','vacancy','hiring','apply','employment','opening','intern','recruitment','naukri','fresher'],
      r: `<strong>Career Opportunities at Gausin</strong> 👷<br><br>
We're always looking for talented engineers!<br><br>
🔹 Process / Chemical Engineers<br>
🔹 Mechanical Design Engineers<br>
🔹 Commissioning Engineers<br>
🔹 Automation / Instrumentation Engineers<br>
🔹 Project Managers<br>
🔹 Sales & Business Development<br><br>
Send your CV to <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@gausin.in&su=Job+Application" target="_blank">info@gausin.in</a>`,
      q: ['Open Careers Page', 'Contact HR']
    },
    {
      id: 'thanks',
      t: ['thank','thanks','thank you','thankyou','shukriya','dhanyawad','great','helpful','perfect','nice','awesome','superb','excellent','good job'],
      r: `You're very welcome! 😊<br><br>
It was great helping you. If you have more questions or need a quotation anytime, just ask!<br><br>
📞 Direct line: <a href="tel:+919870840779">+91 98708 40779</a>`,
      q: ['Get a Quote', 'Our Products', 'Contact Us']
    },
    {
      id: 'bye',
      t: ['bye','goodbye','see you','alvida','ok bye','tata','ciao','done','finish'],
      r: `Thank you for visiting Gausin International Engineers! 🙏<br><br>
Feel free to return anytime.<br>
📞 <a href="tel:+919870840779">+91 98708 40779</a> &nbsp;|&nbsp; ✉️ <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@gausin.in" target="_blank">info@gausin.in</a>`,
      q: ['Get a Quote', 'Our Products']
    }
  ];

  /* ── State ───────────────────────────────────────────────── */
  let isOpen = false, greeted = false, streaming = false;

  /* ── Utils ───────────────────────────────────────────────── */
  const $  = id => document.getElementById(id);
  const gc = () => $('gcMsgs');

  function now() {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  function scrollBot() {
    const m = gc(); if (m) m.scrollTop = m.scrollHeight;
  }

  function findEntry(input) {
    const t = input.toLowerCase().trim();
    for (const e of KB) {
      if (e.t.some(kw => t.includes(kw))) return e;
    }
    return null;
  }

  /* ── Add user message ────────────────────────────────────── */
  function addUser(text) {
    const row = document.createElement('div');
    row.className = 'gc-row user';
    row.innerHTML = `
      <div class="gc-ava"><i class="fa-solid fa-user"></i></div>
      <div class="gc-content">
        <div class="gc-bubble">${escHtml(text)}</div>
        <div class="gc-time">${now()}</div>
      </div>`;
    gc().appendChild(row);
    scrollBot();
  }

  function escHtml(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ── Typing indicator ────────────────────────────────────── */
  function showTyping() {
    const el = document.createElement('div');
    el.className = 'gc-typing'; el.id = 'gcTyping';
    el.innerHTML = `
      <div class="gc-ava"><i class="fa-solid fa-robot"></i></div>
      <div class="gc-typing-bubble">
        <div class="gc-dot"></div><div class="gc-dot"></div><div class="gc-dot"></div>
      </div>`;
    gc().appendChild(el);
    scrollBot();
    return el;
  }

  /* ── Stream bot reply word by word ──────────────────────── */
  function botReply(html, chips, delay) {
    streaming = true;
    const sendBtn = $('gcSend');
    if (sendBtn) sendBtn.disabled = true;

    const typing = showTyping();

    setTimeout(() => {
      typing.remove();

      const row = document.createElement('div');
      row.className = 'gc-row bot';
      row.innerHTML = `
        <div class="gc-ava"><i class="fa-solid fa-robot"></i></div>
        <div class="gc-content">
          <div class="gc-bubble" id="gcStream"></div>
          <div class="gc-time">${now()}</div>
        </div>`;
      gc().appendChild(row);
      scrollBot();

      const bubble = document.getElementById('gcStream');
      if (!bubble) { finishReply(html, chips, null); return; }

      /* Extract plain words for streaming, then swap to HTML */
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const words = (temp.textContent || '').trim().split(/\s+/);
      let idx = 0;

      const iv = setInterval(() => {
        idx = Math.min(idx + 2, words.length);
        bubble.innerHTML = words.slice(0, idx).join(' ') +
          (idx < words.length ? '<span class="gc-cursor"></span>' : '');
        scrollBot();

        if (idx >= words.length) {
          clearInterval(iv);
          /* Replace plain text with full HTML (links, bold, etc.) */
          setTimeout(() => {
            bubble.innerHTML = html;
            bubble.id = '';
            scrollBot();
            if (chips) addChips(chips);
            streaming = false;
            if (sendBtn) sendBtn.disabled = false;
          }, 80);
        }
      }, 38);

    }, delay != null ? delay : 900);
  }

  /* ── Quick reply chips ───────────────────────────────────── */
  function addChips(chips) {
    if (!chips?.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'gc-chips';
    chips.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'gc-chip';
      btn.textContent = label;
      btn.addEventListener('click', () => { wrap.remove(); chipRoute(label); });
      wrap.appendChild(btn);
    });
    gc().appendChild(wrap);
    scrollBot();
  }

  /* ── Route chip click (no user bubble for internal routes) ── */
  function chipRoute(label) {
    /* Show user bubble */
    addUser(label);
    /* Route without re-adding user bubble */
    innerRoute(label);
  }

  /* ── Internal routing (no user bubble) ───────────────────── */
  function innerRoute(label) {
    document.querySelectorAll('.gc-chips').forEach(e => e.remove());

    const d = 850 + Math.random() * 350;

    const ROUTES = {
      'Products':          () => botReply(KB.find(e=>e.id==='products').r,   KB.find(e=>e.id==='products').q, d),
      'Services':          () => botReply(KB.find(e=>e.id==='services').r,   KB.find(e=>e.id==='services').q, d),
      'Get a Quote':       () => botReply(KB.find(e=>e.id==='quote').r,      KB.find(e=>e.id==='quote').q, d),
      'Contact Us':        () => botReply(KB.find(e=>e.id==='contact').r,    KB.find(e=>e.id==='contact').q, d),
      'Contact Info':      () => botReply(KB.find(e=>e.id==='contact').r,    KB.find(e=>e.id==='contact').q, d),
      'Our Products':      () => botReply(KB.find(e=>e.id==='products').r,   KB.find(e=>e.id==='products').q, d),
      'Our Services':      () => botReply(KB.find(e=>e.id==='services').r,   KB.find(e=>e.id==='services').q, d),
      'Evaporators':       () => botReply(KB.find(e=>e.id==='evaporators').r, KB.find(e=>e.id==='evaporators').q, d),
      'Dryers':            () => botReply(KB.find(e=>e.id==='dryers').r,     KB.find(e=>e.id==='dryers').q, d),
      'Heat Exchangers':   () => botReply(KB.find(e=>e.id==='heat-exchangers').r, KB.find(e=>e.id==='heat-exchangers').q, d),
      'Dairy Equipment':   () => botReply(KB.find(e=>e.id==='dairy-food').r, KB.find(e=>e.id==='dairy-food').q, d),
      'Waste Management':  () => botReply(KB.find(e=>e.id==='waste').r,      KB.find(e=>e.id==='waste').q, d),
      'Turnkey Project':   () => botReply(KB.find(e=>e.id==='turnkey').r,    KB.find(e=>e.id==='turnkey').q, d),
      'Energy Audit':      () => botReply(KB.find(e=>e.id==='energy-audit').r, KB.find(e=>e.id==='energy-audit').q, d),
      'Contact Engineer':  () => botReply(KB.find(e=>e.id==='contact').r,    KB.find(e=>e.id==='contact').q, d),
      'Speak to Engineer': () => botReply(KB.find(e=>e.id==='contact').r,    KB.find(e=>e.id==='contact').q, d),
      'View All Products': () => botReply(`<a href="products.html" style="color:#2563EB;font-weight:700;">🔗 View all our products →</a>`, ['Evaporators','Dryers','Get a Quote'], d),
      'Open Quote Form':   () => botReply(`Fill our quick form and we'll reply in 24–48 hrs! 🚀<br><br><a href="contact.html" style="color:#2563EB;font-weight:700;">📋 Open Quote Form →</a>`, ['Our Products','Contact Us'], d),
      'Call Us Now':       () => botReply(`📞 <strong><a href="tel:+919870840779">+91 98708 40779</a></strong><br>Available Mon–Sat, 9 AM – 6 PM IST`, ['Get a Quote','WhatsApp Us'], d),
      'Call Us':           () => botReply(`📞 <strong><a href="tel:+919870840779">+91 98708 40779</a></strong><br>Available Mon–Sat, 9 AM – 6 PM IST`, ['Get a Quote','WhatsApp Us'], d),
      'WhatsApp Us':       () => botReply(`💬 Chat directly on WhatsApp:<br><br><a href="https://wa.me/919870840779?text=Hi%20Gausin%2C%20I%20need%20a%20quotation." target="_blank" style="color:#25D366;font-weight:700;">📱 Open WhatsApp Chat →</a>`, ['Get a Quote','Our Products'], d),
      'Email Us':          () => botReply(`✉️ <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@gausin.in" target="_blank" style="color:#2563EB;font-weight:600;">info@gausin.in</a><br>We reply within 24 hours!`, ['Get a Quote','Our Products'], d),
      'Open Careers Page': () => botReply(`👷 <a href="career.html" style="color:#2563EB;font-weight:700;">View all job openings →</a>`, ['Contact HR','Our Products'], d),
      'Contact HR':        () => botReply(`📧 Email your CV to:<br><a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@gausin.in&su=Job+Application" target="_blank" style="color:#2563EB;">info@gausin.in</a><br><em>Subject: Job Application — [Your Role]</em>`, ['Open Careers Page'], d),
    };

    if (ROUTES[label]) { ROUTES[label](); return; }

    /* KB keyword lookup */
    const entry = findEntry(label);
    if (entry) { botReply(entry.r, entry.q, d); return; }

    /* Fallback */
    botReply(
      `I'm not sure I understood that. 🤔 Try asking about our <strong>products</strong>, <strong>services</strong>, or how to get a <strong>quotation</strong>.`,
      ['Products', 'Services', 'Get a Quote', 'Contact Us'], d
    );
  }

  /* ── Handle typed input ──────────────────────────────────── */
  function sendMessage(text) {
    text = text.trim();
    if (!text || streaming) return;
    document.querySelectorAll('.gc-chips').forEach(e => e.remove());
    addUser(text);
    innerRoute(text);
  }

  /* ── Clear chat ──────────────────────────────────────────── */
  function clearChat() {
    gc().innerHTML = '';
    greeted = false;
    streaming = false;
    const sb = $('gcSend'); if (sb) sb.disabled = false;
    greet();
  }

  /* ── Greeting ────────────────────────────────────────────── */
  function greet() {
    if (greeted) return;
    greeted = true;

    const hr = new Date().getHours();
    const timeGreet = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';

    /* Add date divider */
    const div = document.createElement('div');
    div.className = 'gc-divider';
    div.textContent = new Date().toLocaleDateString('en-US', { weekday:'long', month:'short', day:'numeric' });
    gc().appendChild(div);

    setTimeout(() => {
      const t = showTyping();
      setTimeout(() => {
        t.remove();
        botReply(
          `${timeGreet}! 👋 I'm <strong>Gausin Assistant</strong>.<br><br>How can I help you today? Ask me about our products, pricing, or anything else!`,
          ['Products', 'Services', 'Get a Quote', 'Contact Us'], 0
        );
      }, 1000);
    }, 300);
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    if ($('gcFab')) return;

    /* Inject CSS */
    const cw = document.createElement('div');
    cw.innerHTML = CSS;
    document.head.appendChild(cw.firstElementChild);

    /* Inject HTML */
    const hw = document.createElement('div');
    hw.innerHTML = HTML;
    while (hw.firstChild) document.body.appendChild(hw.firstChild);

    const fab    = $('gcFab');
    const win    = $('gcWin');
    const close  = $('gcClose');
    const clear  = $('gcClear');
    const inp    = $('gcInp');
    const send   = $('gcSend');

    if (!fab) return;

    function openChat() {
      isOpen = true;
      win.classList.add('open');
      fab.querySelector('i').className = 'fa-solid fa-xmark';
      const badge = $('gcBadge'); if (badge) badge.remove();
      inp.focus();
      greet();
    }

    function closeChat() {
      isOpen = false;
      win.classList.remove('open');
      fab.querySelector('i').className = 'fa-solid fa-robot';
    }

    fab.addEventListener('click', () => isOpen ? closeChat() : openChat());
    close.addEventListener('click', closeChat);
    clear.addEventListener('click', clearChat);

    send.addEventListener('click', () => { sendMessage(inp.value); inp.value = ''; });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(inp.value); inp.value = ''; }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
