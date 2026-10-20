/**
 * Unified Reviewer — Course Module: CS 312 Mobile Computing
 * Clean Minimalist Academic UI • Apple HIG Touch-First Mobile Layout
 */

const MOBCOM_MODULE = (() => {
  let state = {
    cardMastery: {},       // { [cardId]: boolean }
    quizAnswers: {},       // { [qIndex]: selectedOptionIndex }
    guideReviewed: {},     // { [qNum]: boolean }
    bestScore: 0,
    currentCallStep: 0,
    currentCardIndex: 0,
    currentQuizIndex: 0,
    selectedCategory: "midterm-all",
    selectedGuideCategory: "midterm",
    selectedQuizMode: "midterm",
    selectedGlossaryCat: "midterm",
    cheatSheetFocus: "midterm",
    isCardFlipped: false,
    filteredCards: [],
    activeQuizQuestions: [],
    isShuffled: false,
    hintTimer: null
  };

  function loadModuleState() {
    try {
      const raw = localStorage.getItem("unified_mobcom_state");
      if (raw) {
        const parsed = JSON.parse(raw);
        state.cardMastery = parsed.cardMastery || {};
        state.quizAnswers = parsed.quizAnswers || {};
        state.guideReviewed = parsed.guideReviewed || {};
        state.bestScore = parsed.bestScore || 0;
        if (parsed.activeQuizQuestionIds && parsed.activeQuizQuestionIds.length > 0) {
          const map = new Map(MOBCOM_DATA.quizQuestions.map(q => [q.id, q]));
          const restored = parsed.activeQuizQuestionIds.map(id => map.get(id)).filter(Boolean);
          if (restored.length > 0) {
            state.activeQuizQuestions = restored;
            state.isShuffled = parsed.isShuffled || false;
          }
        }
      }
    } catch (e) {
      console.warn("Failed to load MobCom state:", e);
    }
  }

  function saveModuleState() {
    try {
      localStorage.setItem("unified_mobcom_state", JSON.stringify({
        cardMastery: state.cardMastery,
        quizAnswers: state.quizAnswers,
        guideReviewed: state.guideReviewed,
        bestScore: state.bestScore,
        activeQuizQuestionIds: state.activeQuizQuestions ? state.activeQuizQuestions.map(q => q.id) : [],
        isShuffled: state.isShuffled || false
      }));
    } catch (e) {
      console.warn("Failed to save MobCom state:", e);
    }
  }

  function calculateReadiness() {
    const midtermCards = MOBCOM_DATA.flashcards.filter(c => c.isMidterm);
    const masteredCount = midtermCards.filter(c => state.cardMastery[c.id] === true).length;
    const flashcardScore = (masteredCount / Math.max(1, midtermCards.length)) * 35;

    let quizCorrect = 0;
    const questionsToEval = (state.activeQuizQuestions && state.activeQuizQuestions.length > 0)
      ? state.activeQuizQuestions
      : MOBCOM_DATA.quizQuestions.filter(q => q.isMidterm);
    questionsToEval.forEach((q, idx) => {
      if (state.quizAnswers[idx] === q.correct) quizCorrect++;
    });
    const quizScore = (quizCorrect / Math.max(1, questionsToEval.length)) * 35;

    const midtermGuide = MOBCOM_DATA.guideQuestions.filter(g => g.isMidterm);
    const reviewedCount = midtermGuide.filter(g => state.guideReviewed[g.num] === true).length;
    const guideScore = (reviewedCount / Math.max(1, midtermGuide.length)) * 30;

    return Math.min(100, Math.max(0, Math.round(flashcardScore + quizScore + guideScore)));
  }

  function init() {
    loadModuleState();
    filterFlashcards("midterm-all");
    updateActiveQuizQuestions();
  }

  function updateActiveQuizQuestions(forceReset = false) {
    if (forceReset || !state.activeQuizQuestions || state.activeQuizQuestions.length === 0) {
      if (state.selectedQuizMode === "midterm") {
        state.activeQuizQuestions = MOBCOM_DATA.quizQuestions.filter(q => q.isMidterm);
      } else {
        state.activeQuizQuestions = [...MOBCOM_DATA.quizQuestions];
      }
      state.isShuffled = false;
    }
    if (state.currentQuizIndex >= state.activeQuizQuestions.length) {
      state.currentQuizIndex = 0;
    }
  }

  function cleanupHintTimer() {
    if (state.hintTimer) {
      clearInterval(state.hintTimer);
      state.hintTimer = null;
    }
  }

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderView(toolId, container) {
    if (toolId !== "quiz") {
      cleanupHintTimer();
    }
    switch (toolId) {
      case "cheatsheet":
        renderCheatSheets(container);
        break;
      case "flashcards":
        renderFlashcards(container);
        break;
      case "quiz":
        renderQuiz(container);
        break;
      case "guide":
        renderGuideQuestions(container);
        break;
      default:
        renderCheatSheets(container);
    }
  }

  // =========================================================================
  // --- 1. CHEAT SHEET (EDITORIAL ACADEMIC CRAM SHEET) ---
  // =========================================================================
  function renderCheatSheets(container) {
    const callStep = MOBCOM_DATA.callSteps[state.currentCallStep] || MOBCOM_DATA.callSteps[0];
    const isMidterm = state.cheatSheetFocus === "midterm";

    container.innerHTML = `
      <div class="space-y-6 sm:space-y-8 animate-fade-in pb-16 prose-container">
        
        <!-- Document Title & Exam Scope Header -->
        <div class="space-y-2 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div class="flex items-center justify-between">
            <span class="quiet-chip">CS 312 • ${isMidterm ? 'Midterm Examination' : 'Full Syllabus'}</span>
            <span class="text-[11px] font-mono text-zinc-400">BatStateU CICS</span>
          </div>
          <h1 class="text-xl sm:text-2xl font-serif font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Mobile Computing Study Reference
          </h1>
          <p class="text-xs text-zinc-500 leading-relaxed">
            Consolidated lecture summaries and examination pointers covering Mobile Internet Protocols, GSM Network Subsystems, and Cellular Wireless Architectures.
          </p>
        </div>

        <!-- Section 1: Official Midterm Pointers Index -->
        <div class="ios-inset-card p-4 sm:p-5 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
              Exam Scope & Focus Objectives
            </span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold border border-amber-200/60 dark:border-amber-900/40">
              Pointer Focus
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 space-y-1.5">
              <strong class="font-mono text-zinc-900 dark:text-zinc-100 block text-[11px]">Lesson 2: Mobile Internet Protocols</strong>
              <ul class="space-y-1 text-zinc-600 dark:text-zinc-400 text-[11px]">
                <li>• IP Addressing & Mobility Paradox (Identity vs Location)</li>
                <li>• TCP vs. UDP Properties & Use Cases</li>
                <li>• Mobile TCP Challenges (Congestion Fallacy)</li>
                <li>• Mobile IP Process: MN, HA, FA, CoA, Tunneling</li>
                <li>• Mobile IPv4 vs. IPv6 & NAT Elimination</li>
              </ul>
            </div>

            <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 space-y-1.5">
              <strong class="font-mono text-zinc-900 dark:text-zinc-100 block text-[11px]">Lesson 3: GSM Architecture & Flow</strong>
              <ul class="space-y-1 text-zinc-600 dark:text-zinc-400 text-[11px]">
                <li>• GSM ➔ GPRS ➔ EDGE (8-PSK, 384 kbps, AMC)</li>
                <li>• 4 Subsystems: MS, BSS, NSS, OSS</li>
                <li>• 6 NSS Nodes: MSC, GMSC, HLR, VLR, AuC, EIR</li>
                <li>• SIM Architecture: IMSI, Ki, PIN/PUK</li>
                <li>• 8-Stage GSM Call Transmission Sequence</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Section 2: Lesson 2 Mobile IP -->
        <div class="space-y-4">
          <div class="pb-1 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <h2 class="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
              1. Mobile Internet Protocols (Lesson 2)
            </h2>
            <span class="text-[10px] font-mono text-zinc-400">RFC 3344</span>
          </div>

          <!-- Dual Role Dilemma Card -->
          <div class="ios-inset-card p-4 space-y-2 text-xs">
            <strong class="font-mono text-zinc-900 dark:text-zinc-100 block text-xs">
              IP Addressing in Mobile Environments (The Dual-Role Problem)
            </strong>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Standard IP addresses combine an <strong>Endpoint Identifier</strong> (TCP socket identity) with a <strong>Topological Routing Locator</strong> (physical subnet prefix).
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
              <div class="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/70">
                <span class="text-zinc-500 block mb-0.5 font-bold">Keeping Old IP:</span>
                <span class="text-zinc-700 dark:text-zinc-300">Foreign routers cannot route packets to a home subnet prefix (routing failure).</span>
              </div>
              <div class="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/70">
                <span class="text-zinc-500 block mb-0.5 font-bold">Changing to New IP:</span>
                <span class="text-zinc-700 dark:text-zinc-300">Active TCP sockets (4-tuple) break, terminating active connections.</span>
              </div>
            </div>
          </div>

          <!-- TCP vs UDP Inset Table -->
          <div class="ios-inset-card overflow-hidden text-xs">
            <div class="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 font-mono text-[11px] font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200/80 dark:border-zinc-800/80">
              Transport Layer: TCP vs. UDP
            </div>
            <div class="divide-y divide-zinc-200/70 dark:divide-zinc-800/70 font-sans">
              <div class="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span class="font-mono text-zinc-500 text-[11px] sm:w-32">Connection</span>
                <span class="text-zinc-800 dark:text-zinc-200">TCP: 3-way handshake (SYN, SYN-ACK, ACK) | UDP: Connectionless (immediate)</span>
              </div>
              <div class="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span class="font-mono text-zinc-500 text-[11px] sm:w-32">Reliability</span>
                <span class="text-zinc-800 dark:text-zinc-200">TCP: Guaranteed in-order retransmissions | UDP: Best-effort, no acknowledgments</span>
              </div>
              <div class="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span class="font-mono text-zinc-500 text-[11px] sm:w-32">Header Overhead</span>
                <span class="text-zinc-800 dark:text-zinc-200">TCP: 20–60 bytes | UDP: 8 bytes fixed</span>
              </div>
              <div class="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span class="font-mono text-zinc-500 text-[11px] sm:w-32">Primary Uses</span>
                <span class="text-zinc-800 dark:text-zinc-200">TCP: HTTP/HTTPS, File Transfer, Email | UDP: VoIP, Video Calling, Real-Time Gaming</span>
              </div>
            </div>
          </div>

          <!-- Mobile IP Process & Tunneling -->
          <div class="ios-inset-card p-4 space-y-3 text-xs">
            <strong class="font-mono text-zinc-900 dark:text-zinc-100 block text-xs">
              Mobile IP Architecture & Data Transfer (CN ➔ MN)
            </strong>
            <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <strong>1. Agent Discovery:</strong> Home Agents (HA) and Foreign Agents (FA) advertise via ICMP.<br>
              <strong>2. Registration:</strong> MN obtains a Care-of Address (CoA) and registers it with HA.<br>
              <strong>3. Tunneling:</strong> HA intercepts packets for MN using Proxy ARP, encapsulates them (IP-in-IP), and tunnels them to CoA.<br>
              <strong>4. Reverse Tunneling (RFC 3024):</strong> Required to bypass Ingress Filtering enforced by foreign network firewalls.
            </p>
          </div>

          <!-- IPv4 vs IPv6 Summary -->
          <div class="ios-inset-card p-4 space-y-2 text-xs">
            <strong class="font-mono text-zinc-900 dark:text-zinc-100 block text-xs">
              Mobile IPv4 vs. IPv6 & NAT Elimination
            </strong>
            <ul class="space-y-1.5 text-zinc-600 dark:text-zinc-400">
              <li>• <strong>Foreign Agents:</strong> Required in MIPv4; completely eliminated in MIPv6 (SLAAC autoconfiguration).</li>
              <li>• <strong>Route Optimization:</strong> Optional add-on in v4 causing triangular routing; built-in standard in v6.</li>
              <li>• <strong>Security:</strong> Optional IPsec in v4; mandatory integrated IPsec in v6.</li>
              <li>• <strong>NAT:</strong> Removed in IPv6 because $3.4 \times 10^{38}$ addresses restore true end-to-end IP communication without header modifications.</li>
            </ul>
          </div>
        </div>

        <!-- Section 3: Lesson 3 GSM & 8-Stage Call Simulator -->
        <div class="space-y-4 pt-2">
          <div class="pb-1 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <h2 class="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
              2. GSM Subsystems & Call Transmission (Lesson 3)
            </h2>
            <span class="text-[10px] font-mono text-zinc-400">NSS / BSS / MS</span>
          </div>

          <!-- GSM Evolution Inset Table -->
          <div class="ios-inset-card overflow-hidden text-xs">
            <div class="px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 font-mono text-[11px] font-bold text-zinc-700 dark:text-zinc-300 border-b border-zinc-200/80 dark:border-zinc-800/80">
              GSM Evolution: GSM ➔ GPRS ➔ EDGE
            </div>
            <div class="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
              <div class="p-3 flex items-center justify-between">
                <div>
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100">GSM (2G)</span>
                  <span class="text-zinc-500 block text-[11px]">Circuit-switched voice, SMS, 9.6 kbps, GMSK (1 bit/symbol)</span>
                </div>
              </div>
              <div class="p-3 flex items-center justify-between">
                <div>
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100">GPRS (2.5G)</span>
                  <span class="text-zinc-500 block text-[11px]">Packet-switched domain, volume billing, 114 kbps, SGSN/GGSN</span>
                </div>
              </div>
              <div class="p-3 flex items-center justify-between bg-amber-50/40 dark:bg-amber-950/20">
                <div>
                  <span class="font-mono font-bold text-amber-900 dark:text-amber-200">EDGE (2.75G)</span>
                  <span class="text-zinc-600 dark:text-zinc-400 block text-[11px]">8-PSK (3 bits/symbol), 384 kbps, Adaptive Modulation & Coding (AMC), Incremental Redundancy</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 6 NSS Components Grid -->
          <div class="space-y-2">
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">6 Components of Network Station Subsystem (NSS)</span>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans">
              <div class="ios-inset-card p-3 space-y-1">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">MSC</span>
                <span class="text-zinc-500 text-[11px] block leading-tight">Switching, call routing, billing records (CDRs).</span>
              </div>
              <div class="ios-inset-card p-3 space-y-1">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">GMSC</span>
                <span class="text-zinc-500 text-[11px] block leading-tight">Gateway to PSTN/ISDN and external networks.</span>
              </div>
              <div class="ios-inset-card p-3 space-y-1">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">HLR</span>
                <span class="text-zinc-500 text-[11px] block leading-tight">Permanent master subscriber database & VLR pointer.</span>
              </div>
              <div class="ios-inset-card p-3 space-y-1">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">VLR</span>
                <span class="text-zinc-500 text-[11px] block leading-tight">Temporary cache for active roaming users (allocates MSRN).</span>
              </div>
              <div class="ios-inset-card p-3 space-y-1">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">AuC</span>
                <span class="text-zinc-500 text-[11px] block leading-tight">Stores secret key Ki; generates RAND, SRES, Kc triplets.</span>
              </div>
              <div class="ios-inset-card p-3 space-y-1">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">EIR</span>
                <span class="text-zinc-500 text-[11px] block leading-tight">IMEI database: White (valid), Gray, Black (stolen).</span>
              </div>
            </div>
          </div>

          <!-- Interactive 8-Stage Call Flow Stepper (Apple HIG clean stepper) -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-[10px] font-mono text-zinc-400 block uppercase">Guide Question #9</span>
                <h3 class="text-sm font-serif font-bold text-zinc-900 dark:text-zinc-100">
                  Call Transmission Sequence (8 Stages)
                </h3>
              </div>
              <div class="flex items-center gap-1 font-mono text-xs">
                <button
                  onclick="MOBCOM_MODULE.stepCallTrace(-1)"
                  class="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 touch-target"
                >
                  ‹
                </button>
                <span class="px-2 text-zinc-500 font-bold">${state.currentCallStep + 1}/8</span>
                <button
                  onclick="MOBCOM_MODULE.stepCallTrace(1)"
                  class="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 touch-target"
                >
                  ›
                </button>
              </div>
            </div>

            <!-- Stepper Progress Dots -->
            <div class="grid grid-cols-8 gap-1 py-1">
              ${MOBCOM_DATA.callSteps.map((s, idx) => `
                <div
                  onclick="MOBCOM_MODULE.setCallStep(${idx})"
                  class="h-1.5 rounded-full cursor-pointer transition-colors ${
                    idx === state.currentCallStep
                      ? 'bg-zinc-900 dark:bg-zinc-100'
                      : idx < state.currentCallStep
                      ? 'bg-zinc-400 dark:bg-zinc-600'
                      : 'bg-zinc-200 dark:bg-zinc-800'
                  }"
                ></div>
              `).join('')}
            </div>

            <!-- Stage Card -->
            <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1.5 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-mono text-[10px] text-zinc-400 uppercase">Stage ${callStep.stage} • ${callStep.component}</span>
              </div>
              <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 block text-xs sm:text-sm">
                ${callStep.title}
              </strong>
              <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed text-[11px] sm:text-xs">
                ${callStep.desc}
              </p>
            </div>
          </div>
        </div>

        <!-- Section 4: Chapter 2 Module Lesson 1 Cellular Networks -->
        <div class="space-y-4 pt-2">
          <div class="pb-1 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <h2 class="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
              3. Cellular Wireless Networks (Chapter 2 Module)
            </h2>
            <span class="text-[10px] font-mono text-zinc-400">Lesson 1</span>
          </div>

          <div class="ios-inset-card p-4 space-y-3 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="space-y-1">
                <strong class="font-mono text-zinc-900 dark:text-zinc-100 block text-xs">Why Divide into Cells?</strong>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                  Enables <strong>Frequency Reuse</strong>: non-adjacent cells reuse identical radio channels, multiplying capacity to serve millions of users over limited licensed spectrum.
                </p>
              </div>
              <div class="space-y-1">
                <strong class="font-mono text-zinc-900 dark:text-zinc-100 block text-xs">Why Hexagons?</strong>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                  Hexagons approximate a circular coverage radius while providing <strong>100% gapless surface tessellation with zero overlaps or dead zones</strong>.
                </p>
              </div>
            </div>

            <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
              <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40">
                <strong class="block text-zinc-800 dark:text-zinc-200">MS</strong>
                <span class="text-zinc-400">Handset & SIM</span>
              </div>
              <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40">
                <strong class="block text-zinc-800 dark:text-zinc-200">BTS</strong>
                <span class="text-zinc-400">Cell Tower RF</span>
              </div>
              <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40">
                <strong class="block text-zinc-800 dark:text-zinc-200">BSC</strong>
                <span class="text-zinc-400">Radio Channels</span>
              </div>
              <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40">
                <strong class="block text-zinc-800 dark:text-zinc-200">Handoff</strong>
                <span class="text-zinc-400">Seamless Transfer</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  function stepCallTrace(delta) {
    state.currentCallStep = (state.currentCallStep + delta + 8) % 8;
    UNIFIED_AUDIO.play("flip");
    const container = document.getElementById("main-content");
    if (container) renderView("cheatsheet", container);
  }

  function setCallStep(idx) {
    state.currentCallStep = idx;
    UNIFIED_AUDIO.play("flip");
    const container = document.getElementById("main-content");
    if (container) renderView("cheatsheet", container);
  }

  // =========================================================================
  // --- 2. FLASHCARDS (TOUCH-FIRST & CLEAN CARDS) ---
  // =========================================================================
  function filterFlashcards(cat) {
    state.selectedCategory = cat;
    if (cat === "all") {
      state.filteredCards = [...MOBCOM_DATA.flashcards];
    } else if (cat === "midterm-all") {
      state.filteredCards = MOBCOM_DATA.flashcards.filter(c => c.isMidterm);
    } else if (cat === "review") {
      state.filteredCards = MOBCOM_DATA.flashcards.filter(c => state.cardMastery[c.id] === false);
    } else {
      state.filteredCards = MOBCOM_DATA.flashcards.filter(c => c.category === cat);
    }
    state.currentCardIndex = 0;
    state.isCardFlipped = false;
  }

  function renderFlashcards(container) {
    const card = state.filteredCards[state.currentCardIndex];
    const total = state.filteredCards.length;
    const currentNum = total > 0 ? state.currentCardIndex + 1 : 0;
    const masteredCount = MOBCOM_DATA.flashcards.filter(c => state.cardMastery[c.id] === true).length;

    container.innerHTML = `
      <div class="space-y-4 max-w-lg mx-auto animate-fade-in pb-16 prose-container">
        
        <!-- Filter Bar (Touch-friendly horizontal scroll) -->
        <div class="flex items-center justify-between gap-1 overflow-x-auto py-1 text-xs font-mono">
          <div class="flex items-center gap-1">
            <button
              onclick="MOBCOM_MODULE.onFilterCards('midterm-all')"
              class="px-2.5 py-1.5 rounded-lg text-xs font-medium ${state.selectedCategory === 'midterm-all' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}"
            >
              Midterm (24)
            </button>
            <button
              onclick="MOBCOM_MODULE.onFilterCards('midterm-lip')"
              class="px-2.5 py-1.5 rounded-lg text-xs font-medium ${state.selectedCategory === 'midterm-lip' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}"
            >
              Mobile IP
            </button>
            <button
              onclick="MOBCOM_MODULE.onFilterCards('midterm-gsm')"
              class="px-2.5 py-1.5 rounded-lg text-xs font-medium ${state.selectedCategory === 'midterm-gsm' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}"
            >
              GSM
            </button>
            <button
              onclick="MOBCOM_MODULE.onFilterCards('all')"
              class="px-2.5 py-1.5 rounded-lg text-xs font-medium ${state.selectedCategory === 'all' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}"
            >
              All (28)
            </button>
          </div>
          <button
            onclick="MOBCOM_MODULE.shuffleCards()"
            class="px-2 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs shrink-0"
          >
            Shuffle
          </button>
        </div>

        <!-- Progress Counter Line -->
        <div class="space-y-1">
          <div class="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Card ${currentNum} of ${total}</span>
            <span>${masteredCount} Mastered</span>
          </div>
          <div class="w-full bg-zinc-200/80 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div class="bg-zinc-900 dark:bg-zinc-100 h-full rounded-full transition-all duration-200" style="width: ${total > 0 ? (currentNum / total) * 100 : 0}%"></div>
          </div>
        </div>

        <!-- Touch Flashcard Canvas -->
        ${card ? `
          <div class="perspective-1000 select-none">
            <div
              id="mob-flashcard-flipper"
              onclick="MOBCOM_MODULE.toggleFlip()"
              class="flashcard ${state.isCardFlipped ? 'flipped' : ''} cursor-pointer min-h-[300px] sm:min-h-[320px]"
            >
              <div class="flashcard-inner transform-style-3d relative w-full h-full min-h-[300px] sm:min-h-[320px]">
                <!-- Front -->
                <div class="flashcard-front backface-hidden absolute inset-0 p-6 rounded-2xl ios-inset-card flex flex-col justify-between shadow-sm">
                  <div class="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>${card.categoryName}</span>
                    <span>Tap to reveal</span>
                  </div>
                  <div class="my-auto py-2 text-center">
                    <h3 class="text-base sm:text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      ${card.front}
                    </h3>
                  </div>
                  <div class="text-center text-[10px] font-mono text-zinc-400">
                    Question
                  </div>
                </div>

                <!-- Back -->
                <div class="flashcard-back backface-hidden rotate-y-180 absolute inset-0 p-6 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex flex-col justify-between shadow-lg">
                  <div class="flex items-center justify-between text-[11px] font-mono opacity-60">
                    <span>${card.categoryName}</span>
                    <span>Answer</span>
                  </div>
                  <div class="my-auto py-2">
                    <p class="text-xs sm:text-sm leading-relaxed text-zinc-200 dark:text-zinc-800">
                      ${card.back}
                    </p>
                  </div>
                  <div class="text-center text-[10px] font-mono opacity-60">
                    ${card.mnemonic ? 'Mnemonic: ' + card.mnemonic : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : `
          <div class="p-8 text-center text-zinc-400 text-xs">No cards found.</div>
        `}

        <!-- Touch Action Buttons (High-contrast 44pt targets) -->
        <div class="grid grid-cols-2 gap-3 pt-2">
          <button
            onclick="MOBCOM_MODULE.markCard(false)"
            class="touch-target py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 active:scale-98 transition-all"
          >
            Still Learning
          </button>
          <button
            onclick="MOBCOM_MODULE.markCard(true)"
            class="touch-target py-2.5 px-4 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 active:scale-98 transition-all"
          >
            Mark Mastered
          </button>
        </div>

        <!-- Nav Stepper -->
        <div class="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
          <button onclick="MOBCOM_MODULE.prevCard()" class="px-3 py-1.5 touch-target flex items-center">‹ Prev Card</button>
          <span>Swipe or Space to flip</span>
          <button onclick="MOBCOM_MODULE.nextCard()" class="px-3 py-1.5 touch-target flex items-center">Next Card ›</button>
        </div>

      </div>
    `;
  }

  function onFilterCards(cat) {
    filterFlashcards(cat);
    const container = document.getElementById("main-content");
    if (container) renderView("flashcards", container);
  }

  function shuffleCards() {
    for (let i = state.filteredCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.filteredCards[i], state.filteredCards[j]] = [state.filteredCards[j], state.filteredCards[i]];
    }
    state.currentCardIndex = 0;
    state.isCardFlipped = false;
    const container = document.getElementById("main-content");
    if (container) renderView("flashcards", container);
    UNIFIED_AUDIO.play("flip");
  }

  function toggleFlip() {
    state.isCardFlipped = !state.isCardFlipped;
    const flipper = document.getElementById("mob-flashcard-flipper");
    if (flipper) flipper.classList.toggle("flipped", state.isCardFlipped);
    UNIFIED_AUDIO.play("flip");
  }

  function nextCard() {
    if (state.filteredCards.length === 0) return;
    state.currentCardIndex = (state.currentCardIndex + 1) % state.filteredCards.length;
    state.isCardFlipped = false;
    const container = document.getElementById("main-content");
    if (container) renderView("flashcards", container);
    UNIFIED_AUDIO.play("flip");
  }

  function prevCard() {
    if (state.filteredCards.length === 0) return;
    state.currentCardIndex = (state.currentCardIndex - 1 + state.filteredCards.length) % state.filteredCards.length;
    state.isCardFlipped = false;
    const container = document.getElementById("main-content");
    if (container) renderView("flashcards", container);
    UNIFIED_AUDIO.play("flip");
  }

  function markCard(isMastered) {
    const card = state.filteredCards[state.currentCardIndex];
    if (!card) return;

    state.cardMastery[card.id] = isMastered;
    if (isMastered) {
      UNIFIED_AUDIO.play("correct");
    } else {
      UNIFIED_AUDIO.play("wrong");
    }

    saveModuleState();
    nextCard();
  }

  // =========================================================================
  // --- 3. MOCK EXAM (MINIMAL CERTIFICATION ENGINE) ---
  // =========================================================================
  function renderQuiz(container) {
    updateActiveQuizQuestions();
    const qList = state.activeQuizQuestions;
    const q = qList[state.currentQuizIndex] || qList[0];
    const isAnswered = state.quizAnswers[state.currentQuizIndex] !== undefined;
    const selectedOpt = state.quizAnswers[state.currentQuizIndex];

    let correctCount = 0;
    qList.forEach((item, idx) => {
      if (state.quizAnswers[idx] === item.correct) correctCount++;
    });

    const answeredCount = Object.keys(state.quizAnswers).filter(k => parseInt(k) < qList.length).length;
    const isExamComplete = answeredCount === qList.length && qList.length > 0;
    const missedQuestions = qList.filter((item, idx) => state.quizAnswers[idx] !== undefined && state.quizAnswers[idx] !== item.correct);
    const missedCount = missedQuestions.length;
    const scorePct = Math.round((correctCount / Math.max(1, qList.length)) * 100);

    container.innerHTML = `
      <div class="space-y-4 max-w-lg mx-auto animate-fade-in pb-16 prose-container">
        
        <!-- Exam Mode & Score Header -->
        <div class="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80 text-xs font-mono">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="font-bold text-zinc-900 dark:text-zinc-100">Item ${state.currentQuizIndex + 1} of ${qList.length}</span>
            <span class="text-zinc-400">•</span>
            <span class="text-zinc-500">${q.category}</span>
            ${state.isShuffled ? '<span class="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-medium">Shuffled</span>' : ''}
          </div>
          <div class="flex items-center gap-2">
            <span class="text-zinc-500">Score: <strong>${correctCount}/${qList.length}</strong></span>
            <button
              onclick="MOBCOM_MODULE.restartQuiz('all')"
              title="Shuffle and retry questions"
              class="text-[11px] text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 underline underline-offset-2 flex items-center gap-1 touch-target"
            >
              Shuffle
            </button>
          </div>
        </div>

        <!-- Exam Completion Banner (When all items answered) -->
        ${isExamComplete ? `
          <div class="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 space-y-3 animate-fade-in">
            <div class="flex items-center justify-between">
              <div>
                <span class="font-mono text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">Exam Complete</span>
                <span class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-serif">Score: ${correctCount}/${qList.length} (${scorePct}%)</span>
              </div>
              <span class="text-xs font-mono font-medium ${scorePct >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-600 dark:text-zinc-400'}">
                ${scorePct >= 80 ? 'Mastery Achieved' : 'Review Recommended'}
              </span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
              <button
                onclick="MOBCOM_MODULE.restartQuiz('all')"
                class="px-3.5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 touch-target"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Retry All (Shuffled)
              </button>
              <button
                onclick="MOBCOM_MODULE.restartQuiz('missed')"
                ${missedCount === 0 ? 'disabled' : ''}
                class="px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 hover:border-zinc-400 disabled:opacity-40 disabled:cursor-not-allowed touch-target"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                ${missedCount > 0 ? `Drill Missed Only (${missedCount})` : 'None Missed (100%)'}
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Question Body -->
        <div class="space-y-3 pt-1">
          <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
            ${q.question}
          </h3>

          <!-- Options Stack (44pt touch targets) -->
          <div class="space-y-2 pt-1">
            ${q.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isCorrect = idx === q.correct;
              const isSelected = selectedOpt === idx;

              let btnStyle = "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400";
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "border-rose-400 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300";
                }
              }

              return `
                <button
                  onclick="MOBCOM_MODULE.selectQuizAnswer(${idx})"
                  class="w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-3 touch-target ${btnStyle}"
                >
                  <span class="font-mono text-zinc-400 font-bold shrink-0">${letter}.</span>
                  <span class="flex-1">${opt}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Think-First Cooldown Hint Zone (Shown when unanswered) -->
          ${!isAnswered ? `
            <div id="quiz-hint-zone" class="pt-1"></div>
          ` : ''}

          <!-- Concept Analysis (Shown once answered) -->
          ${isAnswered ? `
            <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 text-xs space-y-1 animate-fade-in">
              <span class="font-mono text-[10px] uppercase text-zinc-400 block font-bold">Concept Analysis</span>
              <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed text-[11px] sm:text-xs font-sans">${q.explanation}</p>
            </div>
          ` : ''}
        </div>

        <!-- Compact Navigation & Jump Bar -->
        <div class="pt-2 flex items-center justify-between text-xs font-mono">
          <button
            onclick="MOBCOM_MODULE.navQuiz(-1)"
            ${state.currentQuizIndex === 0 ? 'disabled' : ''}
            class="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 touch-target"
          >
            ‹ Prev
          </button>
          
          <div class="flex items-center gap-1 overflow-x-auto max-w-[180px] py-1">
            ${qList.map((item, idx) => {
              const ans = state.quizAnswers[idx];
              const isCurr = idx === state.currentQuizIndex;
              let bg = "bg-zinc-100 dark:bg-zinc-800 text-zinc-400";
              if (ans !== undefined) {
                bg = ans === item.correct ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold" : "bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200";
              }
              if (isCurr) bg += " ring-1 ring-zinc-500";

              return `
                <button
                  onclick="MOBCOM_MODULE.jumpQuiz(${idx})"
                  class="w-5 h-5 rounded text-[10px] font-mono flex items-center justify-center shrink-0 ${bg}"
                >
                  ${idx + 1}
                </button>
              `;
            }).join('')}
          </div>

          <button
            onclick="MOBCOM_MODULE.navQuiz(1)"
            ${state.currentQuizIndex === qList.length - 1 ? 'disabled' : ''}
            class="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 touch-target"
          >
            Next ›
          </button>
        </div>

      </div>
    `;

    // Start 10s Think-First cooldown timer if unanswered
    if (!isAnswered) {
      startHintCooldown();
    } else {
      cleanupHintTimer();
    }
  }

  function startHintCooldown() {
    cleanupHintTimer();
    const zone = document.getElementById("quiz-hint-zone");
    if (!zone) return;

    zone.innerHTML = `
      <div class="think-cooldown-bar">
        <div id="think-cooldown-fill" class="think-cooldown-fill" style="width: 0%;"></div>
        <div id="think-cooldown-label" class="think-cooldown-label">
          <svg class="w-3.5 h-3.5 text-zinc-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Think first... 10s</span>
        </div>
      </div>
    `;

    const startTime = Date.now();
    const duration = 10000;

    state.hintTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      const secLeft = Math.max(0, Math.ceil((duration - elapsed) / 1000));
      const fillEl = document.getElementById("think-cooldown-fill");
      const labelEl = document.getElementById("think-cooldown-label");

      if (fillEl) fillEl.style.width = pct + "%";
      if (labelEl && elapsed < duration) {
        labelEl.innerHTML = `
          <svg class="w-3.5 h-3.5 text-zinc-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Think first... ${secLeft}s</span>
        `;
      }

      if (elapsed >= duration) {
        cleanupHintTimer();
        const currentZone = document.getElementById("quiz-hint-zone");
        if (currentZone) {
          currentZone.innerHTML = `
            <button
              onclick="MOBCOM_MODULE.revealHint()"
              class="hint-pill-btn"
              title="Unlock conceptual clue"
            >
              <svg class="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>Show Hint</span>
            </button>
          `;
        }
      }
    }, 100);
  }

  function revealHint() {
    const q = state.activeQuizQuestions[state.currentQuizIndex];
    if (!q || !q.hint) return;
    const zone = document.getElementById("quiz-hint-zone");
    if (zone) {
      zone.innerHTML = `
        <div class="hint-clue-card space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-mono text-[10px] uppercase font-bold tracking-wider text-zinc-400">Conceptual Clue</span>
            <span class="font-mono text-[10px] text-zinc-400">Think-First Clue</span>
          </div>
          <p class="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">${q.hint}</p>
        </div>
      `;
      UNIFIED_AUDIO.play("flip");
    }
  }

  function restartQuiz(mode = "all") {
    cleanupHintTimer();
    if (mode === "missed") {
      const missed = state.activeQuizQuestions.filter((item, idx) => {
        return state.quizAnswers[idx] !== undefined && state.quizAnswers[idx] !== item.correct;
      });
      if (missed.length === 0) return;
      state.activeQuizQuestions = shuffleArray(missed);
    } else {
      const baseQuestions = state.selectedQuizMode === "midterm"
        ? MOBCOM_DATA.quizQuestions.filter(q => q.isMidterm)
        : [...MOBCOM_DATA.quizQuestions];
      state.activeQuizQuestions = shuffleArray(baseQuestions);
    }
    state.quizAnswers = {};
    state.currentQuizIndex = 0;
    state.isShuffled = true;
    saveModuleState();
    UNIFIED_AUDIO.play("flip");
    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
  }

  function setQuizMode(mode) {
    if (state.selectedQuizMode !== mode) {
      cleanupHintTimer();
      state.selectedQuizMode = mode;
      state.quizAnswers = {};
      state.currentQuizIndex = 0;
      updateActiveQuizQuestions(true);
      saveModuleState();
      const container = document.getElementById("main-content");
      if (container) renderView("quiz", container);
    }
  }

  function selectQuizAnswer(optIdx) {
    if (state.quizAnswers[state.currentQuizIndex] !== undefined) return;
    cleanupHintTimer();
    state.quizAnswers[state.currentQuizIndex] = optIdx;

    const q = state.activeQuizQuestions[state.currentQuizIndex];
    if (optIdx === q.correct) {
      UNIFIED_AUDIO.play("correct");
    } else {
      UNIFIED_AUDIO.play("wrong");
    }

    saveModuleState();

    const answeredCount = Object.keys(state.quizAnswers).filter(k => parseInt(k) < state.activeQuizQuestions.length).length;
    if (answeredCount === state.activeQuizQuestions.length) {
      let correct = 0;
      state.activeQuizQuestions.forEach((item, idx) => {
        if (state.quizAnswers[idx] === item.correct) correct++;
      });
      const pct = Math.round((correct / state.activeQuizQuestions.length) * 100);
      if (pct > state.bestScore) state.bestScore = pct;
      saveModuleState();

      if (pct >= 80) {
        UNIFIED_AUDIO.play("celebrate");
        triggerConfetti();
      }
    }

    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
  }

  function navQuiz(delta) {
    cleanupHintTimer();
    state.currentQuizIndex = Math.max(0, Math.min(state.activeQuizQuestions.length - 1, state.currentQuizIndex + delta));
    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
    UNIFIED_AUDIO.play("flip");
  }

  function jumpQuiz(idx) {
    cleanupHintTimer();
    state.currentQuizIndex = idx;
    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
    UNIFIED_AUDIO.play("flip");
  }

  // =========================================================================
  // --- 4. GUIDE QUESTIONS (CLEAN ACCORDIONS) ---
  // =========================================================================
  function renderGuideQuestions(container) {
    const guideList = MOBCOM_DATA.guideQuestions.filter(g => g.isMidterm);
    const reviewedCount = guideList.filter(g => state.guideReviewed[g.num] === true).length;

    container.innerHTML = `
      <div class="space-y-4 max-w-lg mx-auto animate-fade-in pb-16 prose-container">
        
        <!-- Header -->
        <div class="space-y-1 pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div class="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Official Guide Questions</span>
            <span>${reviewedCount} / ${guideList.length} Checked</span>
          </div>
          <h2 class="text-base sm:text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100">
            Midterm Examination Answers
          </h2>
        </div>

        <!-- Q&A Stack -->
        <div class="space-y-3">
          ${guideList.map(item => {
            const isDone = state.guideReviewed[item.num] === true;

            return `
              <div class="ios-inset-card p-4 space-y-2.5 transition-all ${isDone ? 'opacity-75' : ''}">
                <div class="flex items-start justify-between gap-2">
                  <div class="space-y-0.5">
                    <span class="font-mono text-[10px] text-zinc-400 uppercase font-semibold">Question ${item.num}</span>
                    <h3 class="text-xs sm:text-sm font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      ${item.question}
                    </h3>
                  </div>
                  <label class="flex items-center gap-1.5 cursor-pointer touch-target shrink-0">
                    <input
                      type="checkbox"
                      onchange="MOBCOM_MODULE.toggleGuideReview(${item.num}, this.checked)"
                      ${isDone ? 'checked' : ''}
                      class="rounded text-zinc-900 focus:ring-0"
                    />
                    <span class="text-[10px] font-mono ${isDone ? 'text-zinc-900 dark:text-zinc-100 font-bold' : 'text-zinc-400'}">Done</span>
                  </label>
                </div>

                <div class="space-y-2 text-xs">
                  <div class="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 leading-relaxed text-zinc-700 dark:text-zinc-300 text-[11px] sm:text-xs">
                    ${item.directAnswer}
                  </div>

                  <div class="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono pt-1 border-t border-zinc-100 dark:border-zinc-800">
                    Tip: ${item.examTip}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;
  }

  function filterGuide(cat) {
    state.selectedGuideCategory = cat;
    const container = document.getElementById("main-content");
    if (container) renderView("guide", container);
  }

  function toggleGuideReview(num, checked) {
    state.guideReviewed[num] = checked;
    saveModuleState();
    if (checked) UNIFIED_AUDIO.play("correct");
    const container = document.getElementById("main-content");
    if (container) renderView("guide", container);
  }

  return {
    id: "mobcom",
    state,
    init,
    renderView,
    calculateReadiness,
    filterFlashcards,
    onFilterCards,
    shuffleCards,
    toggleFlip,
    nextCard,
    prevCard,
    markCard,
    setQuizMode,
    selectQuizAnswer,
    navQuiz,
    jumpQuiz,
    restartQuiz,
    revealHint,
    cleanupHintTimer,
    filterGuide,
    toggleGuideReview,
    stepCallTrace,
    setCallStep
  };
})();

if (typeof window !== "undefined") {
  window.MOBCOM_MODULE = MOBCOM_MODULE;
}
