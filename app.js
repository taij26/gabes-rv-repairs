/* ==========================================================================
   GABRIEL'S MOBILE RV REPAIR SERVICE - COMPREHENSIVE INTERACTIVE ENGINE (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initDiagnosticWizard();
  initCampgroundEstimator();
  initBookingSystem();
  initTestimonials();
});

/* ==========================================================================
   1. NAVBAR & NAVIGATION
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  // Sticky navbar logic on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate hamburger to X
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
  });

  // Close mobile menu on link click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const spans = mobileToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

/* ==========================================================================
   2. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // Viewport
    threshold: 0.1, // Trigger when 10% visible
    rootMargin: '0px 0px -50px 0px' // Adjust trigger height
  });

  reveals.forEach(element => {
    revealObserver.observe(element);
  });
}

/* ==========================================================================
   3. RV PROBLEM DIAGNOSTIC WIZARD
   ========================================================================== */
const DIAGNOSTIC_DATA = {
  electrical: {
    title: 'Electrical Systems',
    options: [
      { text: 'Lights Flicker or 12V Out', next: 'lights_issue' },
      { text: '120V Outlets/Microwave Not Working', next: 'outlet_issue' },
      { text: 'Battery Drains Quickly / No Solar Charge', next: 'battery_issue' },
      { text: 'Slide-Out Stuck or Jack Won\'t Retract', next: 'slide_stuck_issue' }
    ]
  },
  hvac: {
    title: 'HVAC & Appliances',
    options: [
      { text: 'A/C Blowing Warm Air / Won\'t Start', next: 'ac_issue' },
      { text: 'Furnace Blowing Cold Air / Ignitor Clicks', next: 'furnace_issue' },
      { text: 'Refrigerator Not Cooling on Propane or 120V', next: 'fridge_issue' },
      { text: 'Thermostat Display is Blank or Frozen', next: 'thermostat_issue' }
    ]
  },
  plumbing: {
    title: 'Plumbing & Water Systems',
    options: [
      { text: 'Active Leaks / Water Pooling Under RV', next: 'leak_issue' },
      { text: 'No Water Pressure / Pump Clicks Continuously', next: 'pump_issue' },
      { text: 'Water Heater Only Blowing Cold Water', next: 'water_heater_issue' },
      { text: 'Toilet Not Flushing or Holding Seal Water', next: 'toilet_issue' }
    ]
  },
  roof: {
    title: 'Exterior & Roof Seals',
    options: [
      { text: 'Water Stains on Ceiling / Active Drips', next: 'roof_leak_issue' },
      { text: 'Awning Fabric Torn or Motor Won\'t Retract', next: 'awning_issue' },
      { text: 'Soft Spots or Spongy Roof Membrane', next: 'soft_roof_issue' },
      { text: 'Skylight or Vent Cover Cracked/Leaking', next: 'skylight_issue' }
    ]
  }
};

const DIAGNOSTIC_RESULTS = {
  lights_issue: {
    title: '12V DC Electrical System Fault',
    desc: 'Flickering or total loss of 12V lights usually points to a failing converter/charger, blown fuses, loose ground wires, or a discharged house battery. Gabriel can diagnose your fuse panel, test converters, and perform parasitic draw testing on-site.',
    rec: 'Request a mobile electrical diagnostic. Refrain from modifying fuse panels directly to prevent damage to sensitive coach electronics.'
  },
  outlet_issue: {
    title: '120V AC GFCI or Shore Power Disruption',
    desc: 'If standard plug-in outlets are dead, a tripped GFCI outlet (commonly located in the bath or kitchen) is the main culprit. Alternatively, a loose shore cord socket, tripped circuit breaker, or transfer switch failure in your generator loop may be responsible.',
    rec: 'Check all interior GFCI reset buttons. If outlets remain unresponsive, request shore power testing. Gabriel will bring heavy-duty multimeters to check your power line.'
  },
  battery_issue: {
    title: 'Deep-Cycle Battery or Solar Controller Failure',
    desc: 'Rapid voltage drop under light loads indicates sulfated/depleted batteries or a converter charge circuit failure. In solar builds, a faulty charge controller or loose camper-top connections can halt recharging.',
    rec: 'Schedule a battery load test and solar system inspection. Gabriel stocks replacement deep-cycle batteries and can inspect roof wiring panels.'
  },
  slide_stuck_issue: {
    title: 'Slide-Out Motor or Controller Sync Issue',
    desc: 'A stuck slide-out is often mechanical (torn seals, jammed debris) or electrical (tripped breakers, sync failures on dual Schwintek motors, or low battery voltage). Gabriel carries override harnesses and specialized parts to manually retract or repair slide systems.',
    rec: 'Do NOT force slide switches, as this can strip gears. Request urgent slide repair so we can override the controller or clear jams.'
  },
  ac_issue: {
    title: 'Air Conditioner Airflow or Compressor Fault',
    desc: 'A/C failing to cool can stem from a clogged condenser coil, failed start/run capacitor, low refrigerant (leak), or blocked duct dividers. Gabriel can inspect control relays, clean coils, replace capacitors, and verify amp draw on-site.',
    rec: 'Turn off the A/C unit to prevent motor freeze-up and request HVAC service. Gabriel carries standard capacitors and replacement fan motors.'
  },
  furnace_issue: {
    title: 'Furnace Ignitor or Sail Switch Obstruction',
    desc: 'When an RV furnace blower runs but fails to heat (shutting off after ~30 seconds), the sail switch is often jammed with dust, or the LP solenoid has failed to feed propane to the combustion chamber.',
    rec: 'Request a furnace tune-up. Gabriel will clean the sail switch, check the ignition sequence, and perform gas pressure diagnostics.'
  },
  fridge_issue: {
    title: 'Absorption Refrigerator Cooling Cycle Block',
    desc: 'RV absorption fridges run on electrical elements or LP gas. If it cools on one but not the other, it points to a control board, heating element, or burner orifice block. Yellow residue near the back panel suggests a toxic ammonia cooling unit leak.',
    rec: 'If you smell ammonia, turn the unit off IMMEDIATELY and book diagnostic service. Gabriel will inspect the heating loop and control modules.'
  },
  thermostat_issue: {
    title: 'Thermostat Communication Loss',
    desc: 'A blank screen typically means the thermostat is not receiving 12V DC power from the furnace/AC control board. Tripped fuses or loose RJ11 communications wires inside the ceiling plenum are common culprits.',
    rec: 'Book an appliance control wiring diagnostic. We will inspect ceiling junctions and install modern, reliable digital thermostats.'
  },
  leak_issue: {
    title: 'Pressurized PEX Line or Fitting Rupture',
    desc: 'Campgrounds have varying water pressure that can exceed RV ratings, blowing out plastic PEX elbows and water pump check valves. This leads to immediate structural damage if not caught early.',
    rec: 'Turn off the campground hose bib and the internal water pump. Request mobile plumbing repair immediately. We carry commercial PEX crimpers and brass fittings.'
  },
  pump_issue: {
    title: 'Water Pump Valve or Airlock Leak',
    desc: 'A pump that cycles repeatedly without a faucet open indicates a slow leak, a split internal diaphragm, or an open winterization bypass valve sucking air.',
    rec: 'Request plumbing inspection. We will isolate your fresh-water system and trace water pump pressures.'
  },
  water_heater_issue: {
    title: 'Water Heater ECO/Thermostat or Burner Failure',
    desc: 'Cold water is often due to open bypass valves (left on during winterization), tripped heating elements (run without water), or soot-blocked LP tubes preventing ignite.',
    rec: 'Verify bypass valves are closed. If issues persist, schedule repair. Gabriel will check heating elements, anode rods, and gas assemblies.'
  },
  toilet_issue: {
    title: 'RV Gravity Toilet Valve Seal Failure',
    desc: 'If water drains completely from the bowl, sewer gases will enter the cabin. This is caused by mineral buildup or a warped rubber flush ball seal.',
    rec: 'We can replace toilet seals, toilet valves, or perform clean upgrades to high-quality Dometic ceramic gravity toilets on-site.'
  },
  roof_leak_issue: {
    title: 'Roof Lap Sealant (Dicor) or EPDM Membrane Tear',
    desc: 'RV roof sealants crack over time due to UV exposure. Heavy rains will seep through seams, rotting wood framing. We provide full roof inspections, Dicor self-leveling touch-ups, and heavy-duty repairs.',
    rec: 'Schedule a visual roof sealant inspection or emergency leak patch. We carry premium self-leveling sealants.'
  },
  awning_issue: {
    title: 'Awning Fabric or Solenoid Gear Failure',
    desc: 'Wind gusts are an awning\'s worst enemy, leading to bent arms, torn vinyl, or motor housing failure. Gabriel can manually override stuck units, replace fabric panels, and secure support legs.',
    rec: 'Retract the awning manually if safe. Schedule awning repair/replacement for a fully functioning shelter.'
  },
  soft_roof_issue: {
    title: 'EPDM/TPO Structural Decking Water Rot',
    desc: 'A spongy roof indicates that water has already compromised the wood underlayment. Unaddressed, this leads to structural collapse and black mold growth.',
    rec: 'Request a comprehensive roof core diagnostic. Gabriel will inspect the structural integrity and discuss sealing or decking repair options.'
  },
  skylight_issue: {
    title: 'Dome Skylight UV Cracking',
    desc: 'RV skylights are made of plastics that become brittle under the sun. Tree branches can crack them, creating a massive direct entry point for heavy rains.',
    rec: 'Request skylight dome replacement. We stock universal polycarbonate outer domes and replace them with fresh butyl seal tape.'
  }
};

function initDiagnosticWizard() {
  const wizard = document.getElementById('diagnostic-wizard');
  if (!wizard) return;

  const stepIndicator = wizard.querySelector('.diag-step-indicator');
  const stepTitle = wizard.querySelector('.diag-header h3');
  const body = wizard.querySelector('.diag-body');
  const backBtn = wizard.querySelector('.diag-back-btn');

  let history = []; // Track steps for going back
  let currentStep = 'start'; // start, category, result

  function renderStart() {
    stepIndicator.textContent = 'Step 1 of 3';
    stepTitle.textContent = 'What area needs attention?';
    backBtn.style.visibility = 'hidden';
    
    body.innerHTML = `
      <div class="diag-options-grid">
        <div class="diag-btn" data-cat="electrical">
          <svg class="diag-btn-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          <span class="diag-btn-text">Electrical System</span>
        </div>
        <div class="diag-btn" data-cat="hvac">
          <svg class="diag-btn-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5M12 2v10M12 12a3 3 0 100-6 3 3 0 000 6z"/></svg>
          <span class="diag-btn-text">HVAC & Appliances</span>
        </div>
        <div class="diag-btn" data-cat="plumbing">
          <svg class="diag-btn-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a7 7 0 007-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 007 7z"/></svg>
          <span class="diag-btn-text">Plumbing & Water</span>
        </div>
        <div class="diag-btn" data-cat="roof">
          <svg class="diag-btn-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l9-9 9 9M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
          <span class="diag-btn-text">Roof & Exterior</span>
        </div>
      </div>
    `;

    // Add listeners
    body.querySelectorAll('.diag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        history.push({ step: 'start' });
        renderCategory(cat);
      });
    });
  }

  function renderCategory(catId) {
    const catData = DIAGNOSTIC_DATA[catId];
    stepIndicator.textContent = 'Step 2 of 3';
    stepTitle.textContent = `Select the specific symptom:`;
    backBtn.style.visibility = 'visible';

    let optionsHTML = catData.options.map((opt, i) => `
      <div class="diag-btn" data-next="${opt.next}" style="padding: 16px; min-height: unset; text-align: left; align-items: flex-start;">
        <span class="diag-btn-text" style="font-size: 0.9rem; font-weight: 500;">${opt.text}</span>
      </div>
    `).join('');

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
        ${optionsHTML}
      </div>
    `;

    // Add listeners
    body.querySelectorAll('.diag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = btn.getAttribute('data-next');
        history.push({ step: 'category', value: catId });
        renderResult(next);
      });
    });
  }

  function renderResult(resultId) {
    const result = DIAGNOSTIC_RESULTS[resultId];
    stepIndicator.textContent = 'Step 3 of 3';
    stepTitle.textContent = 'Preliminary Diagnostic Analysis';
    backBtn.style.visibility = 'visible';

    body.innerHTML = `
      <div class="diag-result">
        <div class="diag-result-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"/></svg>
        </div>
        <h4 class="diag-result-title">${result.title}</h4>
        <p class="diag-result-desc">${result.desc}</p>
        <div style="background: rgba(255,255,255,0.03); border: 1px dashed var(--border-glass); padding: 16px; border-radius: 8px; margin-bottom: 24px; text-align: left;">
          <h5 style="color: var(--primary); font-size: 0.85rem; text-transform: uppercase; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.05em;">Recommended Action:</h5>
          <p style="font-size: 0.9rem; color: var(--text-light); margin: 0;">${result.rec}</p>
        </div>
        <button class="btn btn-primary" id="diag-action-btn" style="width: 100%;">
          Request On-Site Service Now
        </button>
      </div>
    `;

    // Hook up action button to contact form
    const actionBtn = body.querySelector('#diag-action-btn');
    actionBtn.addEventListener('click', () => {
      // Auto populate form
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        
        // Auto-select regular booking mode (or emergency based on type)
        const isEmergency = resultId.includes('leak_issue') || resultId.includes('slide_stuck_issue');
        
        const modeTab = document.querySelectorAll('.mode-tab');
        if (isEmergency) {
          modeTab[1].click(); // Emergency mode
          const textInput = document.getElementById('emergency-desc');
          if (textInput) {
            textInput.value = `[Diagnostic Tool Result: ${result.title}]\nNeed emergency support for: ${result.title}. ${result.rec}`;
          }
        } else {
          modeTab[0].click(); // Scheduled mode
          const serviceSelect = document.getElementById('booking-service');
          if (serviceSelect) {
            // Find matches
            if (resultId.includes('ac') || resultId.includes('furnace') || resultId.includes('fridge') || resultId.includes('thermostat')) {
              serviceSelect.value = 'appliances';
            } else if (resultId.includes('light') || resultId.includes('outlet') || resultId.includes('battery')) {
              serviceSelect.value = 'electrical';
            } else if (resultId.includes('leak') || resultId.includes('pump') || resultId.includes('toilet') || resultId.includes('water_heater')) {
              serviceSelect.value = 'plumbing';
            } else {
              serviceSelect.value = 'roof';
            }
          }
          const detailsInput = document.getElementById('booking-details');
          if (detailsInput) {
            detailsInput.value = `Diagnosed Issue: ${result.title}.\nSymptom Detail: ${result.desc}`;
          }
        }
      }
    });
  }

  // Back button event
  backBtn.addEventListener('click', () => {
    if (history.length === 0) return;
    const prev = history.pop();
    if (prev.step === 'start') {
      renderStart();
    } else if (prev.step === 'category') {
      renderCategory(prev.value);
    }
  });

  // Init wizard
  renderStart();
}

/* ==========================================================================
   4. CAMPGROUND TRAVEL CALCULATOR
   ========================================================================== */
const CAMPGROUND_DATA = {
  campers_city: { name: "Camper's City (Moncton, NB)", fee: "$40.00", time: "1 - 2 Hours", status: "Active - Quick Dispatch", color: "var(--accent-teal)" },
  parlee_beach: { name: "Parlee Beach Campground (Shediac, NB)", fee: "$60.00", time: "2 - 3 Hours", status: "Active - Campgrounds Hub", color: "var(--accent-teal)" },
  gagnon_beach: { name: "Gagnon Beach Campground (Grande-Digue, NB)", fee: "$65.00", time: "2 - 3 Hours", status: "Active - Coastal Zone", color: "var(--accent-teal)" },
  magic_mountain: { name: "Magnetic Hill Campground (Moncton, NB)", fee: "$40.00", time: "1 - 2 Hours", status: "Active - Quick Dispatch", color: "var(--accent-teal)" },
  pine_cone: { name: "Pine Cone Resort (Salisbury / Riverview, NB)", fee: "$50.00", time: "1.5 - 2.5 Hours", status: "Active - Full Coverage", color: "var(--accent-teal)" },
  hopewell_rocks: { name: "Hopewell Rocks Campground (Hopewell Cape, NB)", fee: "$80.00", time: "2 - 4 Hours", status: "Active - Scenic Corridor", color: "var(--accent-teal)" },
  fundy: { name: "Fundy National Park (Alma, NB)", fee: "$110.00", time: "Same Day / Scheduled", status: "Active - Out of Zone Priority", color: "var(--primary)" },
  kouchibouguac: { name: "Kouchibouguac National Park (NB)", fee: "$120.00", time: "Same Day / Scheduled", status: "Active - Out of Zone Priority", color: "var(--primary)" },
  local_home: { name: "Residential Driveway (Greater Moncton Area)", fee: "$35.00", time: "1 - 3 Hours", status: "Active - Home Support", color: "var(--accent-teal)" }
};

function initCampgroundEstimator() {
  const select = document.getElementById('estimator-campground');
  const resultCard = document.getElementById('estimator-result');
  if (!select || !resultCard) return;

  const valName = resultCard.querySelector('#est-name');
  const valFee = resultCard.querySelector('#est-fee');
  const valTime = resultCard.querySelector('#est-time');
  const valStatus = resultCard.querySelector('#est-status');

  select.addEventListener('change', () => {
    const selectedVal = select.value;
    if (!selectedVal) {
      resultCard.classList.remove('active');
      return;
    }

    const data = CAMPGROUND_DATA[selectedVal];
    if (data) {
      valName.textContent = data.name;
      valFee.textContent = data.fee;
      valTime.textContent = data.time;
      valStatus.textContent = data.status;
      valStatus.style.color = data.color;

      resultCard.classList.add('active');
    }
  });
}

/* ==========================================================================
   5. DUAL-MODE BOOKING SYSTEM (WITH PREMIUM CONFIRMATION)
   ========================================================================== */
function initBookingSystem() {
  const tabs = document.querySelectorAll('.mode-tab');
  const toggleContainer = document.querySelector('.mode-toggle-container');
  const forms = document.querySelectorAll('.booking-form');
  
  if (!toggleContainer || tabs.length < 2) return;

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Toggle active states
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      forms.forEach(f => f.classList.remove('active'));
      forms[index].classList.add('active');

      if (index === 0) {
        toggleContainer.classList.remove('emergency-active');
      } else {
        toggleContainer.classList.add('emergency-active');
      }
    });
  });

  // Handle forms submits
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Select input details
      const nameInput = form.querySelector('input[type="text"]')?.value || 'Valued Camper';
      const formType = form.id === 'scheduled-form' ? 'Routine Appointment' : '🚨 EMERGENCY DISPATCH';

      // Create overlay loader / modal
      showPremiumModal(nameInput, formType, form);
    });
  });
}

function showPremiumModal(clientName, requestType, originalForm) {
  // Create backdrop element
  const backdrop = document.createElement('div');
  backdrop.style.position = 'fixed';
  backdrop.style.top = '0';
  backdrop.style.left = '0';
  backdrop.style.width = '100vw';
  backdrop.style.height = '100vh';
  backdrop.style.background = 'rgba(6, 9, 19, 0.85)';
  backdrop.style.backdropFilter = 'blur(20px)';
  backdrop.style.webkitBackdropFilter = 'blur(20px)';
  backdrop.style.zIndex = '9999';
  backdrop.style.display = 'flex';
  backdrop.style.alignItems = 'center';
  backdrop.style.justifyContent = 'center';
  backdrop.style.opacity = '0';
  backdrop.style.transition = 'opacity 0.4s ease-out';

  // Modal Card
  const card = document.createElement('div');
  card.className = 'glass-panel';
  card.style.padding = '50px 40px';
  card.style.maxWidth = '500px';
  card.style.width = '90%';
  card.style.textAlign = 'center';
  card.style.transform = 'scale(0.9)';
  card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  card.style.borderColor = requestType.includes('EMERGENCY') ? '#ef4444' : 'var(--primary)';
  card.style.boxShadow = requestType.includes('EMERGENCY') ? '0 0 30px rgba(239, 68, 68, 0.3)' : '0 0 30px rgba(249, 115, 22, 0.2)';

  // Visual spinner initially
  card.innerHTML = `
    <div class="spinner-container" style="margin-bottom: 24px;">
      <div class="loader" style="
        width: 60px;
        height: 60px;
        border: 4px solid rgba(255,255,255,0.05);
        border-radius: 50%;
        border-top-color: ${requestType.includes('EMERGENCY') ? '#ef4444' : 'var(--primary)'};
        margin: 0 auto;
        animation: spin 1s linear infinite;
      "></div>
    </div>
    <h3 style="font-size: 1.5rem; color: var(--text-white); margin-bottom: 12px;">Transmitting Request...</h3>
    <p style="color: var(--text-muted); font-size: 0.95rem;">Establishing a secure connection to Gabriel's mobile dispatcher unit.</p>
  `;

  backdrop.appendChild(card);
  document.body.appendChild(backdrop);

  // Trigger anims
  setTimeout(() => {
    backdrop.style.opacity = '1';
    card.style.transform = 'scale(1)';
  }, 10);

  // Keyframes injector for spin
  if (!document.getElementById('modal-spin-style')) {
    const style = document.createElement('style');
    style.id = 'modal-spin-style';
    style.innerHTML = `
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    `;
    document.head.appendChild(style);
  }

  // Simulated transit latency (2.5s)
  setTimeout(() => {
    const successIconColor = requestType.includes('EMERGENCY') ? '#ef4444' : 'var(--accent-teal)';
    const headerTitle = requestType.includes('EMERGENCY') ? '🚨 EMERGENCY DISPATCH LOCKED' : '📅 APPOINTMENT REQUEST LOGGED';
    
    card.innerHTML = `
      <div style="
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background: ${successIconColor}15;
        color: ${successIconColor};
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 28px auto;
        border: 2px solid ${successIconColor};
        animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      ">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <h3 style="font-size: 1.6rem; color: var(--text-white); margin-bottom: 16px; font-weight:800;">${headerTitle}</h3>
      <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 30px;">
        Thank you, <strong>${clientName}</strong>. Gabriel has received your <strong>${requestType}</strong> request. We are reviewing details and will contact you shortly via phone or text message.
      </p>
      <button class="btn btn-primary" id="modal-close-btn" style="width: 100%;">Return to Site</button>
    `;

    const closeBtn = card.querySelector('#modal-close-btn');
    closeBtn.addEventListener('click', () => {
      // Fade out and clear
      backdrop.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      setTimeout(() => {
        document.body.removeChild(backdrop);
        originalForm.reset();
        
        // Hide dynamic widgets if opened
        const resultCard = document.getElementById('estimator-result');
        if (resultCard) resultCard.classList.remove('active');
        
        const select = document.getElementById('estimator-campground');
        if (select) select.value = '';
      }, 400);
    });
  }, 2200);
}

/* ==========================================================================
   6. CUSTOM TESTIMONIALS SLIDER
   ========================================================================== */
function initTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.querySelector('.slider-controls');
  if (cards.length === 0 || !dotsContainer) return;

  let currentIndex = 0;
  let timer = null;

  // Build Dots dynamically
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.slider-dot');

  function goToSlide(index) {
    cards[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    currentIndex = index;
    
    cards[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }

  function nextSlide() {
    let nextIdx = (currentIndex + 1) % cards.length;
    goToSlide(nextIdx);
  }

  function startAutoplay() {
    timer = setInterval(nextSlide, 7000); // 7 seconds per slide
  }

  function resetAutoplay() {
    clearInterval(timer);
    startAutoplay();
  }

  // Init
  startAutoplay();
}

/* ==========================================================================
   7. ACCORDION (WIDGET INTEGRITY)
   ========================================================================== */
// This logic is written directly inline in index.html to prevent any execution 
// blocks, but matches the premium theme guidelines.
