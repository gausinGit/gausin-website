/* ============================================================
   GAUSIN INTERNATIONAL ENGINEERS PVT. LTD.
   AI Chatbot — Smart Customer Assistant
   ============================================================ */

(function () {
  'use strict';

  /* Skip on admin pages */
  if (window.location.pathname.includes('/admin/')) return;

  /* ── Styles ──────────────────────────────────────────────── */
  const STYLES = `
  <style id="gausin-chatbot-styles">
    .gchat-toggle {
      position: fixed; bottom: 36px; left: 28px;
      width: 56px; height: 56px;
      background: linear-gradient(135deg, #1D4ED8, #0A2540);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      cursor: pointer; box-shadow: 0 6px 24px rgba(11,94,215,0.5);
      z-index: 500; transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
      border: none; color: white; font-size: 1.5rem;
    }
    .gchat-toggle:hover { transform: scale(1.12); }
    .gchat-badge {
      position: absolute; top: -4px; right: -4px;
      width: 18px; height: 18px; background: #EF4444;
      border-radius: 50%; font-size: 0.6rem; font-weight: 700;
      color: white; display: flex; align-items: center; justify-content: center;
      font-family: 'Montserrat', sans-serif; border: 2px solid white;
      animation: gchatPulse 2s infinite;
    }
    @keyframes gchatPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }
    .gchat-window {
      position: fixed;
      bottom: 100px;
      left: 28px;
      width: 340px;
      height: min(480px, calc(100dvh - 140px));
      max-height: calc(100dvh - 140px);
      background: white; border-radius: 20px;
      box-shadow: 0 20px 60px rgba(10,37,64,0.22);
      display: flex; flex-direction: column;
      z-index: 999; overflow: hidden;
      border: 1px solid #E2E8F0;
      transform: scale(0.85) translateY(20px);
      opacity: 0; pointer-events: none;
      transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
      transform-origin: bottom left;
    }
    .gchat-window.open {
      transform: scale(1) translateY(0);
      opacity: 1; pointer-events: all;
    }
    .gchat-header {
      background: linear-gradient(135deg, #0A2540, #1E3A8A);
      padding: 14px 18px; display: flex; align-items: center;
      gap: 10px; flex-shrink: 0;
    }
    .gchat-avatar {
      width: 42px; height: 42px;
      background: white; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; overflow: hidden; padding: 3px;
    }
    .gchat-avatar img {
      width: 100%; height: 100%; object-fit: contain; display: block;
    }
    .gchat-hinfo { flex: 1; min-width: 0; }
    .gchat-hname {
      font-size: 0.9375rem; font-weight: 700; color: white;
      font-family: 'Montserrat', sans-serif; line-height: 1.2;
    }
    .gchat-hstatus {
      font-size: 0.7rem; color: rgba(255,255,255,0.65);
      display: flex; align-items: center; gap: 5px; margin-top: 2px;
    }
    .gchat-hstatus::before {
      content: ''; width: 6px; height: 6px;
      background: #4ADE80; border-radius: 50%; display: inline-block;
    }
    .gchat-close {
      background: rgba(255,255,255,0.12); border: none; color: white;
      width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.875rem; transition: background 0.2s; flex-shrink: 0;
    }
    .gchat-close:hover { background: rgba(255,255,255,0.25); }
    .gchat-messages {
      flex: 1; overflow-y: auto; padding: 14px;
      display: flex; flex-direction: column; gap: 10px;
      background: #F8FAFC; scroll-behavior: smooth;
    }
    .gchat-messages::-webkit-scrollbar { width: 3px; }
    .gchat-messages::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 2px; }
    .gchat-msg { display: flex; gap: 7px; align-items: flex-end; animation: gchatIn 0.25s ease; }
    @keyframes gchatIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .gchat-msg.user { flex-direction: row-reverse; }
    .gchat-mavatar {
      width: 26px; height: 26px;
      background: linear-gradient(135deg, #1D4ED8, #0A2540);
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; color: white; font-size: 0.7rem; flex-shrink: 0;
    }
    .gchat-msg.user .gchat-mavatar { background: #CBD5E1; color: #475569; }
    .gchat-bubble {
      max-width: 238px; padding: 9px 13px; border-radius: 14px;
      font-size: 0.845rem; line-height: 1.55; color: #1E293B;
      background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.07);
      border: 1px solid #E2E8F0; word-break: break-word;
    }
    .gchat-msg.bot .gchat-bubble { border-radius: 14px 14px 14px 3px; }
    .gchat-msg.user .gchat-bubble {
      background: linear-gradient(135deg, #0B5ED7, #1E3A8A);
      color: white; border: none; border-radius: 14px 14px 3px 14px;
    }
    .gchat-qr {
      display: flex; flex-wrap: wrap; gap: 6px;
      padding: 2px 0 0 33px;
    }
    .gchat-qbtn {
      background: white; border: 1.5px solid #BFDBFE;
      color: #1D4ED8; border-radius: 18px;
      padding: 5px 11px; font-size: 0.775rem; font-weight: 600;
      cursor: pointer; font-family: 'Montserrat', sans-serif;
      transition: all 0.18s; white-space: nowrap;
    }
    .gchat-qbtn:hover { background: #0B5ED7; color: white; border-color: #0B5ED7; }
    .gchat-typing { display: flex; gap: 7px; align-items: flex-end; }
    .gchat-typing-dots {
      background: white; border: 1px solid #E2E8F0;
      border-radius: 14px 14px 14px 3px;
      padding: 11px 15px; display: flex; gap: 4px;
      align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.07);
    }
    .gchat-dot {
      width: 6px; height: 6px; background: #94A3B8;
      border-radius: 50%; animation: gchatDot 1.2s infinite;
    }
    .gchat-dot:nth-child(2) { animation-delay: 0.2s; }
    .gchat-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes gchatDot {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
      30% { transform: translateY(-5px); opacity: 1; }
    }
    .gchat-input-area {
      padding: 10px 14px; border-top: 1px solid #E2E8F0;
      display: flex; gap: 8px; align-items: center;
      background: white; flex-shrink: 0;
    }
    .gchat-input {
      flex: 1; border: 1.5px solid #E2E8F0; border-radius: 18px;
      padding: 8px 14px; font-size: 0.845rem;
      font-family: 'Inter', sans-serif; outline: none;
      transition: border-color 0.2s; background: #F8FAFC; color: #1E293B;
    }
    .gchat-input:focus { border-color: #3B82F6; background: white; }
    .gchat-send {
      width: 34px; height: 34px; flex-shrink: 0;
      background: linear-gradient(135deg, #0B5ED7, #1E3A8A);
      border: none; border-radius: 50%; color: white;
      cursor: pointer; display: flex; align-items: center;
      justify-content: center; font-size: 0.8rem;
      transition: transform 0.2s;
    }
    .gchat-send:hover { transform: scale(1.1); }
    @media (max-width: 480px) {
      .gchat-window {
        left: 10px; right: 10px; width: auto;
        bottom: 90px;
        height: min(460px, calc(100dvh - 120px));
        max-height: calc(100dvh - 120px);
      }
      .gchat-toggle { left: 16px; bottom: 28px; width: 50px; height: 50px; font-size: 1.3rem; }
    }
  </style>`;

  /* ── HTML ────────────────────────────────────────────────── */
  const HTML = `
  <button class="gchat-toggle" id="gchatToggle" aria-label="Chat with Gausin Assistant">
    <i class="fa-solid fa-robot"></i>
    <span class="gchat-badge" id="gchatBadge">1</span>
  </button>
  <div class="gchat-window" id="gchatWindow" role="dialog" aria-label="Gausin AI Assistant">
    <div class="gchat-header">
      <div class="gchat-avatar"><img src="images/gausin-logo.png" alt="Gausin Logo"></div>
      <div class="gchat-hinfo">
        <div class="gchat-hname">Gausin Assistant</div>
        <div class="gchat-hstatus">Online &mdash; AI Powered</div>
      </div>
      <button class="gchat-close" id="gchatClose" aria-label="Close chat">&#x2715;</button>
    </div>
    <div class="gchat-messages" id="gchatMessages"></div>
    <div class="gchat-input-area">
      <input type="text" class="gchat-input" id="gchatInput" placeholder="Ask me anything..." autocomplete="off" maxlength="200">
      <button class="gchat-send" id="gchatSend" aria-label="Send"><i class="fa-solid fa-paper-plane"></i></button>
    </div>
  </div>`;

  /* ── Knowledge Base ──────────────────────────────────────── */
  const KB = [
    {
      id: 'greetings',
      t: ['hi', 'hello', 'hey', 'namaste', 'hii', 'helo', 'namaskar', 'good morning', 'good afternoon', 'good evening', 'hy', 'hye', 'start', 'help', 'kya'],
      r: `Namaste! 👋 I'm <strong>Gausin Assistant</strong>, your AI guide for Gausin International Engineers.<br><br>I can help you with products, services, quotation, and contact info. What would you like to know?`,
      q: ['Our Products', 'Our Services', 'Get a Quote', 'Contact Info']
    },
    {
      id: 'evaporators',
      t: ['evaporator', 'evaporation', 'falling film', 'forced circulation', 'rising film', 'plate type evaporator', 'mee', 'multiple effect', 'mvr', 'tvr', 'vapor'],
      r: `<strong>Evaporators</strong> — our flagship products!<br><br>
• <strong>Falling Film Evaporator</strong> — Energy-efficient, gentle evaporation<br>
• <strong>Forced Circulation Evaporator</strong> — Viscous/crystallizing fluids<br>
• <strong>Rising Film Evaporator</strong> — Simple, reliable design<br>
• <strong>Plate Type Evaporator</strong> — Compact, high heat transfer<br>
• <strong>Batch Evaporator / Vacuum Pan</strong> — Small scale processing<br><br>
Used in dairy, pharma, chemical, distillery & food industries.`,
      q: ['Get a Quote', 'View Products', 'Contact Engineer']
    },
    {
      id: 'dryers',
      t: ['dryer', 'drying', 'spray dryer', 'spin flash', 'fluidized bed', 'agitated thin film', 'atfd', 'closed circuit', 'fbd', 'powder'],
      r: `<strong>Industrial Dryers</strong> we manufacture:<br><br>
• <strong>Spray Dryer</strong> — Convert liquid to fine powder<br>
• <strong>Spin Flash Dryer</strong> — For filter cakes & pastes<br>
• <strong>Fluidized Bed Dryer (FBD)</strong> — Uniform granule drying<br>
• <strong>Agitated Thin Film Dryer (ATFD)</strong> — Heat-sensitive materials<br>
• <strong>Closed Circuit Dryer</strong> — Solvent recovery systems<br><br>
Custom capacity, GMP / hygienic designs available.`,
      q: ['Get a Quote', 'View Products', 'Contact Engineer']
    },
    {
      id: 'heat-exchangers',
      t: ['heat exchanger', 'shell tube', 'plate heat exchanger', 'phe', 'shell and tube', 'heat transfer', 'condenser', 'heater', 'cooler'],
      r: `<strong>Heat Exchangers</strong> we design & manufacture:<br><br>
• <strong>Shell & Tube Heat Exchanger</strong> — ASME / TEMA standards<br>
• <strong>Plate Heat Exchanger (PHE)</strong> — Compact, high efficiency<br><br>
Applications: Pasteurizers, condensers, pre-heaters, reboilers.<br>
Materials: SS 304, SS 316L, Titanium, Hastelloy, Carbon Steel.`,
      q: ['Get a Quote', 'Contact Engineer', 'View Products']
    },
    {
      id: 'cip',
      t: ['cip', 'clean in place', 'cleaning system', 'cip system', 'automated cip', 'sanitation', 'sanitize'],
      r: `<strong>Automated CIP (Clean-In-Place) Systems</strong><br><br>
We design complete CIP skids for:<br>
• Dairy & milk processing plants<br>
• Pharmaceutical / biotech facilities<br>
• Food & Beverage industries<br><br>
Features: Multi-tank CIP, PLC-controlled, chemical dosing, temperature & conductivity control.<br>
✅ FDA / GMP compliant designs available.`,
      q: ['Get a Quote', 'Contact Engineer']
    },
    {
      id: 'milk-processing',
      t: ['milk', 'pasteurizer', 'milk processing', 'htst', 'ltlt', 'milk plant', 'deodorizer', 'milk chilling', 'mcc', 'dairy plant', 'raw milk'],
      r: `<strong>Milk Processing Equipment</strong>:<br><br>
• <strong>Milk Pasteurizer (HTST/LTLT)</strong> — Safe, certified pasteurization<br>
• <strong>Milk Deodorizer</strong> — Remove off-flavours & odours<br>
• <strong>Complete Milk Processing Plant</strong> — Turnkey dairy plant<br>
• <strong>Milk Chilling Plant / MCC</strong> — Raw milk chilling & storage<br>
• <strong>Bulk Milk Cooler (BMC)</strong> — Farm-level chilling<br><br>
All SS 304/316L, hygienic design, CIP compatible.`,
      q: ['Get a Quote', 'Contact Engineer', 'View Products']
    },
    {
      id: 'dairy-equipment',
      t: ['butter churner', 'ghee kettle', 'ghee', 'khoya', 'butter', 'crystallization', 'milk can conveyor', 'conveyor', 'bulk milk', 'bmc', 'dairy equipment'],
      r: `<strong>Dairy & Food Equipment</strong>:<br><br>
• Butter Churner & Butter Processing Unit<br>
• Ghee Kettle & Ghee Making Plant<br>
• Khoya Making Machine<br>
• Milk Can Conveyor<br>
• Bulk Milk Cooler (BMC)<br>
• Crystallization Tank<br><br>
All equipment in food-grade SS 304/316L with hygienic finish.`,
      q: ['Get a Quote', 'Contact Engineer']
    },
    {
      id: 'vessels',
      t: ['pressure vessel', 'tank', 'silo', 'storage tank', 'ss tank', 'asme', 'ibr', 'stainless steel tank', 'storage silo', 'reactor'],
      r: `<strong>Pressure Vessels & Storage Tanks</strong>:<br><br>
• <strong>Pressure Vessels (ASME/IBR)</strong> — Certified, X-ray tested<br>
• <strong>Stainless Steel Storage Silos</strong> — Large capacity, food/pharma grade<br><br>
Design codes: ASME Sec VIII Div 1, IS:2825, IBR<br>
Capacity: Up to 5,00,000 litres<br>
Pressure: Up to 300 bar<br>
Max diameter: 7,000 mm`,
      q: ['Get a Quote', 'Contact Engineer']
    },
    {
      id: 'waste-management',
      t: ['waste', 'etp', 'stp', 'effluent', 'biogas', 'scrubber', 'incinerator', 'zld', 'water treatment', 'wtp', 'ro plant', 'pollution', 'treatment plant', 'sewage', 'cng'],
      r: `<strong>Waste Management & Environment Systems</strong>:<br><br>
• <strong>ETP/STP</strong> — Effluent & sewage treatment plants<br>
• <strong>Biomass Solid Waste Treatment Plant</strong><br>
• <strong>Biogas & CNG Plant</strong> — Waste to clean energy<br>
• <strong>Scrubber Systems</strong> — Air pollution control<br>
• <strong>Incinerator System</strong> — Thermal waste treatment<br>
• <strong>WTP (UF/RO/Softener)</strong> — Water treatment plants<br><br>
✅ Zero Liquid Discharge (ZLD) solutions available.`,
      q: ['Get a Quote', 'Contact Engineer']
    },
    {
      id: 'products',
      t: ['product', 'products', 'equipment', 'machine', 'machinery', 'manufacture', 'catalog', 'item', 'what do you make', 'what you make', 'kya banate'],
      r: `We manufacture a wide range of <strong>industrial process equipment</strong>:<br><br>
🔵 Evaporators &nbsp;&nbsp;&nbsp; 🔵 Dryers<br>
🔵 Heat Exchangers &nbsp; 🔵 CIP Systems<br>
🔵 Milk Processing &nbsp;&nbsp; 🔵 Pressure Vessels<br>
🔵 Dairy Equipment &nbsp; 🔵 Waste Management<br><br>
Which product would you like to know more about?`,
      q: ['Evaporators', 'Dryers', 'Heat Exchangers', 'Dairy Equipment', 'Waste Management']
    },
    {
      id: 'services',
      t: ['service', 'services', 'what do you do', 'what you offer', 'engineering service', 'design', 'consultancy', 'project'],
      r: `<strong>Engineering Services we offer</strong>:<br><br>
1. <strong>Process Design & Engineering</strong> — Simulation, P&ID<br>
2. <strong>Detailed Engineering</strong> — 3D CAD, Piping, Instrumentation<br>
3. <strong>Turnkey Project Execution</strong> — Design to commissioning<br>
4. <strong>Energy Optimization & Audit</strong> — MVR, Heat Recovery, ZLD<br>
5. <strong>Automation & Control</strong> — PLC/SCADA, IoT Integration<br>
6. <strong>Technical Consultancy</strong> — Troubleshooting, De-bottlenecking`,
      q: ['Process Design', 'Turnkey Project', 'Energy Audit', 'Get a Quote']
    },
    {
      id: 'process-design',
      t: ['process design', 'simulation', 'p&id', 'chemcad', 'htri', 'mass balance', 'energy balance', 'equipment sizing'],
      r: `<strong>Process Design & Engineering</strong><br><br>
We develop complete process engineering packages:<br>
• Process flowsheets & mass/energy balances<br>
• Equipment sizing & selection<br>
• P&ID development<br>
• Process simulation using <strong>CHEMCAD</strong><br>
• Thermal design using <strong>HTRI Xchanger Suite</strong><br>
• Utility estimation`,
      q: ['Get a Quote', 'Contact Engineer', 'Other Services']
    },
    {
      id: 'turnkey',
      t: ['turnkey', 'complete project', 'commissioning', 'end to end', 'epc', 'project execution', 'handover'],
      r: `<strong>Turnkey Project Execution</strong><br><br>
Complete end-to-end project delivery:<br>
• Project planning using MS Project<br>
• Procurement management<br>
• Site installation supervision<br>
• Commissioning & startup<br>
• Performance testing & operator training<br>
• Full documentation & handover<br><br>
✅ On-time, within-budget delivery guaranteed.`,
      q: ['Get a Quote', 'Contact Engineer']
    },
    {
      id: 'energy',
      t: ['energy', 'energy audit', 'mvr', 'tvr', 'heat recovery', 'steam economy', 'energy optimization', 'energy saving'],
      r: `<strong>Energy Optimization & Audit</strong><br><br>
We help reduce your energy costs:<br>
• Thermal energy audits for existing plants<br>
• MVR / TVR system design & retrofit<br>
• Multi-effect evaporation conversion<br>
• Heat recovery system integration<br>
• ROI calculation & detailed report<br><br>
Typical energy savings: <strong>40–60%</strong> with MVR systems.`,
      q: ['Get a Quote', 'Contact Engineer']
    },
    {
      id: 'quote',
      t: ['quote', 'price', 'cost', 'rate', 'pricing', 'how much', 'enquiry', 'inquiry', 'order', 'buy', 'purchase', 'estimate', 'quotation', 'offer'],
      r: `To get a <strong>free technical quotation</strong>, please share:<br><br>
📋 Product/Equipment name<br>
📋 Required capacity / throughput<br>
📋 Industry / application<br>
📋 Installation location (city/state)<br><br>
Our engineers respond within <strong>24–48 hours</strong> with a detailed techno-commercial offer.`,
      q: ['Open Quote Form', 'Call Us', 'Email Us', 'WhatsApp Us']
    },
    {
      id: 'contact',
      t: ['contact', 'address', 'location', 'where', 'phone', 'number', 'email', 'reach', 'office', 'visit', 'call', 'meerut'],
      r: `<strong>Contact Gausin International Engineers</strong><br><br>
📍 DH-249, Pallavpuram Phase-1,<br>&nbsp;&nbsp;&nbsp;&nbsp; Roorkee Road, Meerut, UP – 250110<br><br>
📞 <a href="tel:+919870840779" style="color:#3B82F6;font-weight:600;">+91 98708 40779</a><br>
✉️ <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@gausin.in" target="_blank" style="color:#3B82F6;font-weight:600;">info@gausin.in</a><br>
🌐 <a href="https://www.gausin.in" style="color:#3B82F6;">www.gausin.in</a><br><br>
⏰ Mon–Sat: 9:00 AM – 6:00 PM`,
      q: ['Get a Quote', 'WhatsApp Us', 'Open Quote Form']
    },
    {
      id: 'about',
      t: ['about', 'company', 'gausin', 'who are you', 'tell me', 'established', 'founded', 'history', 'experience', 'years', 'background'],
      r: `<strong>Gausin International Engineers Pvt. Ltd.</strong><br><br>
🏭 Leading industrial engineering company<br>
📍 Headquartered in Meerut, Uttar Pradesh, India<br>
⭐ 25+ years of engineering excellence<br>
✅ ISO certified manufacturing facility<br>
🌍 200+ clients across India & internationally<br>
🏗️ Projects in dairy, pharma, chemical, food & energy sectors`,
      q: ['Our Products', 'Our Services', 'Contact Us']
    },
    {
      id: 'industries',
      t: ['industry', 'industries', 'sector', 'pharma', 'pharmaceutical', 'chemical', 'food industry', 'distillery', 'paper', 'textile', 'energy sector', 'which industry'],
      r: `<strong>Industries we serve</strong>:<br><br>
🥛 <strong>Dairy & Milk Processing</strong> — Flagship sector<br>
💊 <strong>Pharmaceutical</strong> — GMP-compliant systems<br>
⚗️ <strong>Chemical Industry</strong> — Process plants, reactors<br>
🍽️ <strong>Food & Beverage</strong> — Hygienic solutions<br>
🍺 <strong>Distillery</strong> — Spent wash evaporation, ZLD<br>
⚡ <strong>Energy Sector</strong> — Power plant heat exchangers<br>
📄 <strong>Pulp & Paper</strong> — Black liquor evaporators<br>
👕 <strong>Textile</strong> — ZLD evaporators, salt recovery`,
      q: ['Dairy Equipment', 'Waste Management', 'Get a Quote']
    },
    {
      id: 'quality',
      t: ['certification', 'certified', 'iso', 'asme', 'ibr', 'quality', 'standard', 'compliance', 'gmp', 'fda', 'approved', 'ndt', 'testing'],
      r: `<strong>Quality & Certifications</strong><br><br>
✅ ISO certified manufacturing<br>
✅ ASME Sec VIII Div 1 — Pressure Vessels<br>
✅ IBR (Indian Boiler Regulations)<br>
✅ GMP compliant — Pharmaceutical / Dairy<br>
✅ FDA guideline compliant CIP systems<br>
✅ NDT in-house: RT, UT, PT, MT testing<br>
✅ Hydrostatic pressure testing<br>
✅ Mirror polish Ra ≤ 0.4 µm`,
      q: ['Our Products', 'Get a Quote', 'Contact Us']
    },
    {
      id: 'technology',
      t: ['technology', 'software', 'autocad', 'plc', 'scada', 'iot', 'automation', 'cnc', 'laser cutting', 'welding', 'fabrication', 'manufacturing'],
      r: `<strong>Technology & Engineering Tools</strong><br><br>
💻 CHEMCAD — Process simulation<br>
🌡️ HTRI — Thermal heat exchanger design<br>
📐 AutoCAD — 3D design, P&IDs, plant layout<br>
📊 MS Project — Project management<br>
🤖 PLC/SCADA — Automation & control<br>
📡 IoT — Remote plant monitoring<br>
⚙️ CNC & Laser — Precision fabrication`,
      q: ['Our Services', 'Get a Quote', 'Contact Us']
    },
    {
      id: 'career',
      t: ['career', 'job', 'vacancy', 'hiring', 'apply', 'employment', 'opening', 'position', 'intern', 'recruitment', 'naukri'],
      r: `<strong>Career Opportunities at Gausin</strong><br><br>
We're always looking for talented engineers!<br><br>
Current openings:<br>
👷 Process / Commissioning Engineers<br>
📐 Mechanical / Draftsman<br>
🤖 Automation Engineers<br>
📊 Project Managers<br>
💼 Sales & Commercial Executives<br>
💻 Full Stack Developer (AI)<br><br>
Click below to apply!`,
      q: ['Visit Career Page', 'Contact HR']
    },
    {
      id: 'thanks',
      t: ['thank', 'thanks', 'thank you', 'thankyou', 'shukriya', 'dhanyawad', 'great', 'helpful', 'perfect', 'nice', 'awesome', 'good', 'superb', 'excellent', 'wonderful'],
      r: `You're welcome! 😊<br><br>
Feel free to ask anything else about our products, services, or to get a quote. We're always here to help!<br><br>
📞 Urgent: <a href="tel:+919870840779" style="color:#3B82F6;font-weight:600;">+91 98708 40779</a>`,
      q: ['Get a Quote', 'Our Products', 'Contact Info']
    },
    {
      id: 'bye',
      t: ['bye', 'goodbye', 'see you', 'exit', 'alvida', 'ok bye', 'tata', 'ciao'],
      r: `Thank you for visiting Gausin International Engineers! 🙏<br><br>
Feel free to come back anytime.<br>
📞 +91 98708 40779 &nbsp;|&nbsp; ✉️ info@gausin.in`,
      q: ['Get a Quote', 'Our Products']
    }
  ];

  /* ── State ───────────────────────────────────────────────── */
  let open = false;
  let greeted = false;

  /* ── Helpers ─────────────────────────────────────────────── */
  function findEntry(input) {
    const text = input.toLowerCase().trim();
    for (const e of KB) {
      if (e.t.some(kw => text.includes(kw))) return e;
    }
    return null;
  }

  function msgs()   { return document.getElementById('gchatMessages'); }
  function scroll() { const m = msgs(); if (m) m.scrollTop = m.scrollHeight; }

  function botAvatar() {
    return `<div class="gchat-mavatar"><i class="fa-solid fa-robot"></i></div>`;
  }

  function addMsg(html, isUser) {
    const el = document.createElement('div');
    el.className = `gchat-msg ${isUser ? 'user' : 'bot'}`;
    el.innerHTML = isUser
      ? `<div class="gchat-mavatar"><i class="fa-solid fa-user"></i></div><div class="gchat-bubble">${html}</div>`
      : `${botAvatar()}<div class="gchat-bubble">${html}</div>`;
    msgs().appendChild(el);
    scroll();
  }

  function addQR(replies) {
    if (!replies || !replies.length) return;
    const el = document.createElement('div');
    el.className = 'gchat-qr';
    replies.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'gchat-qbtn';
      btn.textContent = r;
      btn.addEventListener('click', () => { el.remove(); handle(r); });
      el.appendChild(btn);
    });
    msgs().appendChild(el);
    scroll();
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'gchat-typing';
    el.id = 'gchatTyping';
    el.innerHTML = `${botAvatar()}<div class="gchat-typing-dots"><div class="gchat-dot"></div><div class="gchat-dot"></div><div class="gchat-dot"></div></div>`;
    msgs().appendChild(el);
    scroll();
    return el;
  }

  function removeTyping() {
    const t = document.getElementById('gchatTyping');
    if (t) t.remove();
  }

  function botReply(html, quickReplies, delay) {
    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      addMsg(html, false);
      if (quickReplies) addQR(quickReplies);
    }, delay || 900);
  }

  /* ── Special action handlers ─────────────────────────────── */
  const ACTIONS = {
    'Open Quote Form': () => botReply(
      `Sure! Fill our quick quote form and we'll respond within 24–48 hours. 🚀<br><br>
<a href="contact.html" style="color:#3B82F6;font-weight:700;">📋 Open Quote Form →</a>`,
      ['Our Products', 'Contact Info']
    ),
    'View Products': () => botReply(
      `<a href="products.html" style="color:#3B82F6;font-weight:700;">🔗 Click here to view all our products →</a>`,
      ['Evaporators', 'Dryers', 'Get a Quote']
    ),
    'Contact Us': () => handle('contact'),
    'Contact Info': () => handle('contact'),
    'Call Us': () => botReply(
      `📞 Call us directly:<br><br>
<strong><a href="tel:+919870840779" style="color:#3B82F6;font-size:1.05em;">+91 98708 40779</a></strong><br>
Mon–Sat, 9:00 AM – 6:00 PM`,
      ['Get a Quote', 'Our Products']
    ),
    'Email Us': () => botReply(
      `✉️ Email us at:<br><br>
<strong><a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@gausin.in" target="_blank" style="color:#3B82F6;">info@gausin.in</a></strong><br>
We respond within 24 hours!`,
      ['Get a Quote', 'Our Products']
    ),
    'WhatsApp Us': () => botReply(
      `💬 Chat with us on WhatsApp:<br><br>
<a href="https://wa.me/919870840779?text=Hello%20Gausin%2C%20I%20need%20information%20about%20your%20products." target="_blank" style="color:#25D366;font-weight:700;">📱 Click to WhatsApp →</a>`,
      ['Get a Quote', 'Our Products']
    ),
    'Contact Engineer': () => botReply(
      `Our engineers are ready to help! 👷‍♂️<br><br>
📞 <a href="tel:+919870840779" style="color:#3B82F6;font-weight:600;">+91 98708 40779</a><br>
✉️ <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@gausin.in" target="_blank" style="color:#3B82F6;">info@gausin.in</a><br><br>
Or <a href="contact.html" style="color:#3B82F6;font-weight:600;">fill our contact form →</a>`,
      ['Get a Quote', 'Our Products']
    ),
    'Visit Career Page': () => botReply(
      `👷 <a href="career.html" style="color:#3B82F6;font-weight:700;">Click here to view all job openings →</a>`,
      ['Contact HR', 'Our Products']
    ),
    'Contact HR': () => botReply(
      `📧 Send your resume to:<br><br>
<a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@gausin.in&su=Job+Application" target="_blank" style="color:#3B82F6;font-weight:600;">info@gausin.in</a><br><br>
Subject: <em>Job Application — [Your Role]</em>`,
      ['Visit Career Page', 'Our Products']
    ),
    'Other Services': () => handle('services'),
    'Process Design': () => handle('process design'),
    'Turnkey Project': () => handle('turnkey'),
    'Energy Audit': () => handle('energy audit'),
    'Get a Quote': () => handle('quote'),
    'Our Products': () => handle('products'),
    'Our Services': () => handle('services'),
    'Evaporators': () => handle('evaporator'),
    'Dryers': () => handle('dryer'),
    'Heat Exchangers': () => handle('heat exchanger'),
    'Dairy Equipment': () => handle('dairy equipment'),
    'Waste Management': () => handle('waste'),
    'Contact Info': () => handle('contact'),
  };

  /* ── Main input handler ──────────────────────────────────── */
  function handle(text) {
    if (!text || !text.trim()) return;

    /* Remove old quick reply rows */
    document.querySelectorAll('.gchat-qr').forEach(el => el.remove());

    addMsg(text, true);

    /* Check special actions */
    if (ACTIONS[text]) { ACTIONS[text](); return; }

    /* KB lookup */
    const delay = 750 + Math.random() * 500;
    const entry = findEntry(text);

    if (entry) {
      botReply(entry.r, entry.q, delay);
    } else {
      botReply(
        `Hmm, I'm not sure about that. 🤔<br><br>
I can help you with products, pricing, services, or contact info. Try one of the options below!`,
        ['Our Products', 'Our Services', 'Get a Quote', 'Contact Info'],
        delay
      );
    }
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    if (document.getElementById('gchatToggle')) return;

    /* Inject styles */
    const styleWrap = document.createElement('div');
    styleWrap.innerHTML = STYLES;
    document.head.appendChild(styleWrap.firstElementChild);

    /* Inject HTML */
    const htmlWrap = document.createElement('div');
    htmlWrap.innerHTML = HTML;
    while (htmlWrap.firstChild) document.body.appendChild(htmlWrap.firstChild);

    const toggle  = document.getElementById('gchatToggle');
    const window_ = document.getElementById('gchatWindow');
    const closeBtn = document.getElementById('gchatClose');
    const input   = document.getElementById('gchatInput');
    const sendBtn = document.getElementById('gchatSend');
    if (!toggle) return;

    /* Open / close */
    function openChat() {
      open = true;
      window_.classList.add('open');
      toggle.querySelector('i').className = 'fa-solid fa-xmark';
      const badge = document.getElementById('gchatBadge');
      if (badge) badge.remove();
      input.focus();

      if (!greeted) {
        greeted = true;
        setTimeout(() => {
          const typing = showTyping();
          setTimeout(() => {
            typing.remove();
            const g = KB.find(e => e.id === 'greetings');
            addMsg(g.r, false);
            addQR(g.q);
          }, 1100);
        }, 250);
      }
    }

    function closeChat() {
      open = false;
      window_.classList.remove('open');
      toggle.querySelector('i').className = 'fa-solid fa-robot';
    }

    toggle.addEventListener('click', () => open ? closeChat() : openChat());
    closeBtn.addEventListener('click', closeChat);

    sendBtn.addEventListener('click', () => {
      const val = input.value.trim();
      if (val) { handle(val); input.value = ''; }
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val) { handle(val); input.value = ''; }
      }
    });
  }

  /* Run after DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
