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
      <div class="space-y-8 animate-fade-in pb-16 prose-container">
        
        <!-- Document Title & Exam Scope Header -->
        <div class="space-y-2 pb-5 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div class="flex items-center justify-between">
            <span class="quiet-chip">CS 312 • ${isMidterm ? 'Midterm Examination Reviewer' : 'Full Course Reference'}</span>
            <span class="text-[11px] font-mono text-zinc-400">BatStateU CICS • Chapter 2 Module</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Mobile Computing Comprehensive Study Reference
          </h1>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            In-depth academic reference covering all 21 pages of the official Student Edition module: Cellular Wireless Networks (Lesson 1), Mobile Internet Protocols (Lesson 2), and GSM Architecture & Call Flow (Lesson 3).
          </p>
        </div>

        <!-- Curriculum Navigation Index -->
        <div class="ios-inset-card p-4 sm:p-5 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
              Module Curriculum Structure & Pointers
            </span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-semibold border border-zinc-200 dark:border-zinc-700">
              Lessons 1, 2, & 3
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-2 border border-zinc-200/60 dark:border-zinc-800/60">
              <span class="font-mono text-zinc-900 dark:text-zinc-100 font-bold block text-xs">Part 1: Lesson 1</span>
              <span class="text-zinc-700 dark:text-zinc-300 font-medium block">Cellular Wireless Networks</span>
              <ul class="space-y-1 text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
                <li>• 1.1 Fundamentals & Cell Division</li>
                <li>• 1.2 Architecture & Frequency Reuse</li>
                <li>• 1.3 Generations (1G to 5G)</li>
                <li>• 1.4 Small Cells & 5G Slicing</li>
              </ul>
            </div>

            <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-2 border border-zinc-200/60 dark:border-zinc-800/60">
              <span class="font-mono text-zinc-900 dark:text-zinc-100 font-bold block text-xs">Part 2: Lesson 2</span>
              <span class="text-zinc-700 dark:text-zinc-300 font-medium block">Mobile Internet Protocols</span>
              <ul class="space-y-1 text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
                <li>• 2.1 IP Fundamentals & Packets</li>
                <li>• 2.2 Mobility Paradox & CoA</li>
                <li>• 2.3 TCP vs. UDP 11-Point Matrix</li>
                <li>• 2.4 Mobile IPv4 vs. IPv6 (RFC 3344)</li>
              </ul>
            </div>

            <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-2 border border-zinc-200/60 dark:border-zinc-800/60">
              <span class="font-mono text-zinc-900 dark:text-zinc-100 font-bold block text-xs">Part 3: Lesson 3</span>
              <span class="text-zinc-700 dark:text-zinc-300 font-medium block">GSM Architecture & Flow</span>
              <ul class="space-y-1 text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
                <li>• 3.1 Overview & Evolution (GPRS/EDGE)</li>
                <li>• 3.2 4 Subsystems & 6 NSS Nodes</li>
                <li>• 3.3 MS, SIM Architecture & TRX</li>
                <li>• 3.4 Call Sequence & SMS Signaling</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- ============================================================== -->
        <!-- PART 1: LESSON 1 CELLULAR WIRELESS NETWORKS                     -->
        <!-- ============================================================== -->
        <div class="space-y-5 pt-2">
          <div class="pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <div>
              <span class="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Chapter 2 • Lesson 1</span>
              <h2 class="text-lg sm:text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
                1. Cellular Wireless Networks
              </h2>
            </div>
            <span class="text-[11px] font-mono text-zinc-500">Pages 1–6</span>
          </div>

          <!-- 1.1 Fundamentals of Cellular Communication -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3.5">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 1.1</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Fundamentals of Cellular Communication
              </h3>
            </div>
            
            <p class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <strong>What is cellular communication?</strong> It is a method of wireless communication in which a large geographic area is partitioned into smaller sections, called <strong>cells</strong>, each served by its own low-power base station transceiver. Rather than deploying a single massive, high-power transmitter to blanket an entire metropolitan city, a cellular network operates through numerous smaller transmitters working in close coordination.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 space-y-1.5 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block text-[11px]">Why Divide Coverage into Cells?</span>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                  This approach resolves two fundamental engineering bottlenecks:
                  <strong>1. Severe scarcity of licensed radio frequencies</strong> and
                  <strong>2. The requirement to serve millions of simultaneous subscribers</strong>.
                  Low-power transmitters constrain signal range within a small cell, allowing the exact same frequency channels to be reused across distant cells without co-channel interference.
                </p>
              </div>

              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 space-y-1.5 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block text-[11px]">Why Hexagonal Geometry?</span>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                  In network planning diagrams, a <strong>hexagon</strong> is universally used because it closest approximates a circular antenna radiation pattern while allowing cells to tile together with <strong>100% gapless surface tessellation (no coverage holes and no overlapping signal collisions)</strong>. In actual physical deployments, real-world cell boundaries are irregular due to terrain, mountains, buildings, and physical obstacles.
                </p>
              </div>
            </div>

            <!-- Basic Elements Callout -->
            <div class="space-y-1.5 pt-2">
              <span class="font-mono text-[11px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide block">
                The 4 Basic Elements of a Cellular System
              </span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                <div class="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-[11px]">1. Mobile Station (MS)</span>
                  <p class="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">The end-user wireless device, consisting of the physical handset hardware and the subscriber identity module.</p>
                </div>
                <div class="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-[11px]">2. Base Station (BS / BTS)</span>
                  <p class="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">A fixed radio transceiver mounted on a tower or rooftop that communicates directly with mobile stations over RF.</p>
                </div>
                <div class="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-[11px]">3. Cell</span>
                  <p class="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">The specific geographic coverage area illuminated and served by a single base station transceiver.</p>
                </div>
                <div class="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-[11px]">4. Handoff (or Handover)</span>
                  <p class="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">The automated process transferring an active ongoing call or data session between adjacent cells without service disruption.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 1.2 Cellular Network Architecture & Communication Flow -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3.5">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 1.2</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Cellular Network Architecture & Communication Flow
              </h3>
            </div>

            <p class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              When a subscriber makes a call or accesses mobile data, the communication session moves sequentially through the network components:
              <br><code class="font-mono text-[11px] bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded inline-block mt-1">Mobile Station (MS) ➔ Base Transceiver Station (BTS) ➔ Base Station Controller (BSC) ➔ Mobile Switching Center (MSC) ➔ Backbone Network ➔ Destination</code>
            </p>

            <div class="space-y-2 pt-1 text-xs">
              <span class="font-mono text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block">Architecture Node Hierarchy:</span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div class="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">Base Transceiver Station (BTS):</strong>
                  <span class="text-zinc-600 dark:text-zinc-400">The physical antenna mast and transceivers communicating directly across the radio air interface with mobile stations in a cell.</span>
                </div>
                <div class="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">Base Station Controller (BSC):</strong>
                  <span class="text-zinc-600 dark:text-zinc-400">Controls multiple BTS towers. Allocates radio channels, commands mobile transmitter power levels, and coordinates inter-cell handoffs.</span>
                </div>
                <div class="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">Mobile Switching Center (MSC):</strong>
                  <span class="text-zinc-600 dark:text-zinc-400">The core switching exchange connecting calls and data between cellular nodes and external networks (PSTN, ISDN, and the Internet).</span>
                </div>
                <div class="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">Backbone Network:</strong>
                  <span class="text-zinc-600 dark:text-zinc-400">The high-speed wired optical fiber and microwave transmission infrastructure linking base stations, switches, and core servers.</span>
                </div>
              </div>
            </div>

            <!-- Frequency Reuse & Handoff vs Roaming -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 space-y-1 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block text-[11px]">Frequency Reuse Clusters (N=7 Pattern)</span>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                  Cells are organized into repeating clusters (labeled <strong>A through G</strong>). Each cell in a cluster is assigned a unique, non-overlapping frequency set. The entire cluster is then repeated across the region, ensuring cells using the same frequencies are separated by safe physical distance to prevent co-channel interference.
                </p>
              </div>

              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 space-y-1 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block text-[11px]">Handoff vs. Roaming</span>
                <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                  <strong>Handoff:</strong> Continuously and seamlessly transfers an active call between adjacent towers within a <em>single operator's network</em> without dropping.<br>
                  <strong>Roaming:</strong> Allows a subscriber to obtain cellular service on a <em>partner operator's network</em> when traveling outside the home operator's geographic coverage area.
                </p>
              </div>
            </div>
          </div>

          <!-- 1.3 Generations of Cellular Networks (1G–5G) Table -->
          <div class="ios-inset-card overflow-hidden text-xs">
            <div class="px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
              <div>
                <span class="font-mono text-[10px] text-zinc-400 uppercase font-bold block">Lesson 1.3 Summary Matrix</span>
                <h3 class="text-xs sm:text-sm font-serif font-bold text-zinc-900 dark:text-zinc-100">
                  Generations of Cellular Networks (1G to 5G)
                </h3>
              </div>
              <span class="text-[10px] font-mono text-zinc-400">1980s – Present</span>
            </div>

            <div class="divide-y divide-zinc-200/70 dark:divide-zinc-800/70 font-sans">
              <div class="p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-1.5">
                <div class="sm:w-28 shrink-0">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-xs">1G (Early 1980s)</span>
                  <span class="text-zinc-400 block text-[10px] font-mono">Analog Signals</span>
                </div>
                <div class="text-zinc-600 dark:text-zinc-300 text-[11px] leading-relaxed flex-1">
                  <strong>Voice calls only.</strong> Used analog frequency modulation. Extremely limited capacity, zero data transmission, and minimal security (voice transmissions could be easily intercepted and eavesdropped using simple radio scanners).
                </div>
              </div>

              <div class="p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-1.5">
                <div class="sm:w-28 shrink-0">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-xs">2G (Early 1990s)</span>
                  <span class="text-zinc-400 block text-[10px] font-mono">Digital & GSM</span>
                </div>
                <div class="text-zinc-600 dark:text-zinc-300 text-[11px] leading-relaxed flex-1">
                  <strong>Digital Voice + SMS.</strong> Marked the historical shift from analog to digital signal transmission. Improved voice clarity, boosted capacity, introduced subscriber authentication, and introduced Short Message Service (SMS) text messaging. Global System for Mobile Communications (GSM) became foundational.
                </div>
              </div>

              <div class="p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-1.5">
                <div class="sm:w-28 shrink-0">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-xs">3G (Early 2000s)</span>
                  <span class="text-zinc-400 block text-[10px] font-mono">Mobile Broadband</span>
                </div>
                <div class="text-zinc-600 dark:text-zinc-300 text-[11px] leading-relaxed flex-1">
                  <strong>Mobile Internet Access.</strong> Substantially higher data speeds than 2G. Enabled mobile web browsing, video calling, and early multimedia streaming, marking the moment cellular networks shifted from voice-first to data-intensive usage.
                </div>
              </div>

              <div class="p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-1.5">
                <div class="sm:w-28 shrink-0">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-xs">4G (~2009)</span>
                  <span class="text-zinc-400 block text-[10px] font-mono">All-IP / LTE</span>
                </div>
                <div class="text-zinc-600 dark:text-zinc-300 text-[11px] leading-relaxed flex-1">
                  <strong>100% All-IP Packet Transmission.</strong> Long Term Evolution (LTE). Completely eliminated legacy circuit-switched voice mechanisms; all data and voice (VoLTE) are treated as IP packets. Delivered high throughput and low delay, unlocking HD streaming and mobile cloud apps.
                </div>
              </div>

              <div class="p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 bg-zinc-50/50 dark:bg-zinc-800/30">
                <div class="sm:w-28 shrink-0">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-xs">5G (~2019)</span>
                  <span class="text-zinc-400 block text-[10px] font-mono">Ultra-Low Latency</span>
                </div>
                <div class="text-zinc-600 dark:text-zinc-300 text-[11px] leading-relaxed flex-1">
                  <strong>Multi-Gbps Speeds & Massive IoT.</strong> Near-zero latency, extreme bandwidth, and massive device density (1M devices/km²). Supports autonomous driving, telesurgery, and smart factory robotics via specialized network slicing.
                </div>
              </div>
            </div>
          </div>

          <!-- 1.4 Current and Emerging Cellular Technologies -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3.5">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 1.4</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Current and Emerging Cellular Technologies
              </h3>
            </div>

            <div class="space-y-2 text-xs">
              <strong class="font-mono text-zinc-900 dark:text-zinc-100 block text-xs">Network Densification & Small Cells</strong>
              <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                To accommodate soaring mobile data demand in crowded venues (city centers, stadiums, shopping malls), network operators deploy <strong>small cells</strong>—compact, lower-power base stations mounted on streetlights and utility poles—in addition to macro towers. This multiplies data capacity in high-demand pockets without requiring new spectrum.
              </p>
            </div>

            <!-- Network Slicing 3 Canonical Slices -->
            <div class="space-y-2 pt-1 text-xs">
              <div class="flex items-center justify-between">
                <strong class="font-mono text-zinc-900 dark:text-zinc-100 text-xs">5G Network Slicing (3 Virtual Architecture Profiles)</strong>
                <span class="text-[10px] font-mono text-zinc-400">Virtualization</span>
              </div>
              <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                Network slicing partitions a single physical cellular infrastructure into multiple logically isolated virtual networks, each optimized for specific performance metrics:
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
                <div class="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-[11px] block">1. eMBB</span>
                  <span class="text-[10px] font-mono text-zinc-400 block">Enhanced Mobile Broadband</span>
                  <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-snug">Focuses on high-speed internet and seamless multimedia streaming for consumer smartphones.</p>
                </div>

                <div class="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-[11px] block">2. mMTC</span>
                  <span class="text-[10px] font-mono text-zinc-400 block">Massive Machine-Type Comms</span>
                  <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-snug">Connects dense sensor swarms (smart meters, agriculture, appliances) requiring low data rates and multi-year battery life.</p>
                </div>

                <div class="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-[11px] block">3. URLLC</span>
                  <span class="text-[10px] font-mono text-zinc-400 block">Ultra-Reliable Low-Latency</span>
                  <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-snug">Sub-1ms transmission latency and 99.999% reliability for telesurgery, autonomous driving (V2X), and industrial automation.</p>
                </div>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60 text-[11px] space-y-1">
              <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">Looking Ahead (6G Networks):</strong>
              <p class="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Early 6G research focuses on terahertz (THz) frequencies, further reduced latency, and native integration with non-terrestrial satellite networks and artificial intelligence.
              </p>
            </div>
          </div>
        </div>

        <!-- ============================================================== -->
        <!-- PART 2: LESSON 2 MOBILE INTERNET PROTOCOLS                      -->
        <!-- ============================================================== -->
        <div class="space-y-5 pt-4">
          <div class="pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <div>
              <span class="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Chapter 2 • Lesson 2</span>
              <h2 class="text-lg sm:text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
                2. Mobile Internet Protocols
              </h2>
            </div>
            <span class="text-[11px] font-mono text-zinc-500">Pages 7–14</span>
          </div>

          <!-- 2.1 & 2.2 IP Fundamentals and Mobility Complications -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3.5 text-xs">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 2.1 & 2.2</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Internet Protocol Fundamentals & The Mobility Dilemma
              </h3>
            </div>

            <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <strong>What is the Internet Protocol (IP)?</strong> IP is the fundamental set of rules that governs how data is addressed, packaged, and routed from a source device to a destination across interconnected networks. Rather than sending data in one continuous dedicated stream, IP networks break messages into discrete units called <strong>packets</strong>, which travel independently across store-and-forward routers.
            </p>

            <!-- Dual Role Dilemma Box -->
            <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 space-y-2">
              <strong class="font-mono text-zinc-900 dark:text-zinc-100 block text-xs">
                Why Physical Host Mobility Breaks Traditional IP Addressing:
              </strong>
              <p class="text-zinc-600 dark:text-zinc-300 text-[11px] leading-relaxed">
                Traditional IP addressing was engineered with the assumption that a device's network location remains fixed. An IP address serves a <strong>dual conflicting role</strong>:
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                <div class="p-2.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800">
                  <span class="text-zinc-500 block mb-0.5 font-bold">1. Endpoint Identifier:</span>
                  <span class="text-zinc-800 dark:text-zinc-200">Identifies the communication socket (TCP 4-tuple: src IP, src port, dst IP, dst port).</span>
                </div>
                <div class="p-2.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800">
                  <span class="text-zinc-500 block mb-0.5 font-bold">2. Topological Routing Locator:</span>
                  <span class="text-zinc-800 dark:text-zinc-200">Indicates where the device physically connects to the global subnet routing hierarchy.</span>
                </div>
              </div>
              <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed pt-1">
                <strong>The Conflict:</strong> If a mobile device changes its IP address when moving to a new cell tower or Wi-Fi network, its ongoing TCP sockets instantly break! But if it keeps its old home IP address, foreign network routers cannot route incoming packets to it.
              </p>
            </div>

            <!-- Home Address vs Care-of Address -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block text-[11px]">Home Address (HoA)</span>
                <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  A stable, permanent address associated with the mobile device's home network. Other internet hosts always use this address to contact the mobile node.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block text-[11px]">Care-of Address (CoA)</span>
                <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  A temporary address leased whenever the device attaches to a foreign network away from home, reflecting its current physical location on the foreign subnet.
                </p>
              </div>
            </div>
          </div>

          <!-- 2.3 TCP/IP Suite & Complete 11-Point TCP vs UDP Matrix -->
          <div class="ios-inset-card overflow-hidden text-xs">
            <div class="px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
              <div>
                <span class="font-mono text-[10px] text-zinc-400 uppercase font-bold block">Lesson 2.3 Comparative Table</span>
                <h3 class="text-xs sm:text-sm font-serif font-bold text-zinc-900 dark:text-zinc-100">
                  TCP vs. UDP Deep Comparison Matrix
                </h3>
              </div>
              <span class="text-[10px] font-mono text-zinc-400">11 Evaluated Criteria</span>
            </div>

            <div class="divide-y divide-zinc-200/70 dark:divide-zinc-800/70 font-sans text-[11px]">
              <div class="p-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span class="font-mono text-zinc-500 font-bold">1. Connection Type</span>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">TCP: Connection-oriented (3-way handshake)</span>
                <span class="text-zinc-600 dark:text-zinc-400">UDP: Connectionless (no handshake required)</span>
              </div>
              <div class="p-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span class="font-mono text-zinc-500 font-bold">2. Delivery Guarantee</span>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">TCP: Guarantees reliable data delivery</span>
                <span class="text-zinc-600 dark:text-zinc-400">UDP: Does not guarantee delivery (best-effort)</span>
              </div>
              <div class="p-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span class="font-mono text-zinc-500 font-bold">3. Acknowledgments</span>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">TCP: Uses ACKs to confirm segment receipt</span>
                <span class="text-zinc-600 dark:text-zinc-400">UDP: No acknowledgments</span>
              </div>
              <div class="p-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span class="font-mono text-zinc-500 font-bold">4. Retransmission</span>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">TCP: Supports automatic retransmission of lost packets</span>
                <span class="text-zinc-600 dark:text-zinc-400">UDP: No retransmission support</span>
              </div>
              <div class="p-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span class="font-mono text-zinc-500 font-bold">5. Packet Ordering</span>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">TCP: Ensures packets are delivered in exact order</span>
                <span class="text-zinc-600 dark:text-zinc-400">UDP: Does not ensure ordering (packets can arrive out of order)</span>
              </div>
              <div class="p-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span class="font-mono text-zinc-500 font-bold">6. Flow & Congestion</span>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">TCP: Provides flow control & congestion control algorithms</span>
                <span class="text-zinc-600 dark:text-zinc-400">UDP: No flow or congestion control</span>
              </div>
              <div class="p-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span class="font-mono text-zinc-500 font-bold">7. Speed & Overhead</span>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">TCP: Slower due to higher protocol overhead</span>
                <span class="text-zinc-600 dark:text-zinc-400">UDP: Faster with minimal protocol overhead</span>
              </div>
              <div class="p-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span class="font-mono text-zinc-500 font-bold">8. Header Size</span>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">TCP: Variable header size (20 to 60 bytes)</span>
                <span class="text-zinc-600 dark:text-zinc-400">UDP: Fixed header size (8 bytes)</span>
              </div>
              <div class="p-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span class="font-mono text-zinc-500 font-bold">9. Data Treatment</span>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">TCP: Treats data as a continuous byte stream</span>
                <span class="text-zinc-600 dark:text-zinc-400">UDP: Treats data as independent discrete messages</span>
              </div>
              <div class="p-3 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span class="font-mono text-zinc-500 font-bold">10. Broadcast Support</span>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">TCP: Does not support broadcasting or multicasting</span>
                <span class="text-zinc-600 dark:text-zinc-400">UDP: Supports broadcasting and multicasting</span>
              </div>
              <div class="p-3 grid grid-cols-1 sm:grid-cols-3 gap-1 bg-zinc-50/50 dark:bg-zinc-800/30">
                <span class="font-mono text-zinc-500 font-bold">11. Typical Protocols</span>
                <span class="text-zinc-800 dark:text-zinc-200 font-medium">TCP: HTTP, HTTPS, FTP, SMTP</span>
                <span class="text-zinc-600 dark:text-zinc-400">UDP: DNS, DHCP, VoIP, Live Video Streaming</span>
              </div>
            </div>
          </div>

          <!-- The Congestion Fallacy in Mobile TCP -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-2 text-xs">
            <strong class="font-mono text-zinc-900 dark:text-zinc-100 block text-xs">
              Challenges of TCP in Mobile Wireless Environments (The Congestion Fallacy)
            </strong>
            <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed text-[11px]">
              TCP was designed for wired networks, where connection lines are stable and packet loss is almost always caused by network router buffer congestion. However, in mobile wireless environments, packet loss is frequently caused by <strong>temporary signal fades, passing through tunnels, radio interference, and handoffs between cells</strong>. Because TCP mistakenly assumes all drops represent congestion, it throttles its transmission rate unnecessarily, destroying throughput on mobile links.
            </p>
          </div>

          <!-- 2.4 Mobile IPv4 vs. Mobile IPv6 & Tunneling Architecture -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3.5 text-xs">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 2.4</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Mobile IP Architecture & IPv4 vs. IPv6
              </h3>
            </div>

            <!-- 7 Components of Mobile IP -->
            <div class="space-y-1.5">
              <span class="font-mono text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block">7 Key Components of Mobile IP:</span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong>• Mobile Node (MN):</strong> Handheld device carried by the user.
                </div>
                <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong>• Correspondent Node (CN):</strong> Device on the internet communicating with MN.
                </div>
                <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong>• Home Network (HN):</strong> Subnet where MN's permanent address belongs.
                </div>
                <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong>• Home Agent (HA):</strong> Home router that tracks MN and tunnels data when away.
                </div>
                <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong>• Foreign Network (FN):</strong> Network visited by MN away from home.
                </div>
                <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong>• Foreign Agent (FA):</strong> Router on FN providing CoA and decapsulating packets.
                </div>
                <div class="p-2 rounded sm:col-span-2 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong>• Care-of Address (CoA):</strong> Temporary address identifying MN's current location on foreign network.
                </div>
              </div>
            </div>

            <!-- Mobile IP Workflow & Reverse Tunneling -->
            <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1.5 text-[11px]">
              <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">The Mobile IP Process:</strong>
              <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                <strong>1. Agent Discovery:</strong> HA and FA broadcast ICMP advertisements.<br>
                <strong>2. Registration:</strong> MN obtains a CoA and registers it with its Home Agent.<br>
                <strong>3. Tunneling (CN ➔ MN):</strong> HA intercepts packets using <em>Proxy ARP</em> (answering with its own MAC address), encapsulates them inside an IP tunnel, and forwards to CoA. The FA decapsulates and delivers to MN.<br>
                <strong>4. Reverse Tunneling (RFC 3024):</strong> Foreign border firewalls enforce <em>Ingress Filtering</em>, dropping packets whose Source IP does not match the foreign subnet. Reverse Tunneling tunnels outgoing packets back to the HA to pass ingress checks.
              </p>
            </div>

            <!-- Complete IPv4 vs IPv6 Summary Table from Module -->
            <div class="border border-zinc-200/80 dark:border-zinc-800 rounded-xl overflow-hidden text-[11px]">
              <div class="px-3.5 py-2 bg-zinc-100 dark:bg-zinc-800 font-mono font-bold text-zinc-700 dark:text-zinc-300">
                Summary: IPv4 vs. IPv6 (Official Module Table)
              </div>
              <div class="divide-y divide-zinc-200/70 dark:divide-zinc-800/70">
                <div class="p-2.5 grid grid-cols-3 gap-2">
                  <span class="font-mono text-zinc-500 font-bold">Address Size</span>
                  <span class="text-zinc-800 dark:text-zinc-200">32 bits, or 2^32 IP addresses</span>
                  <span class="text-zinc-800 dark:text-zinc-200">128 bits, or 2^128 IP addresses</span>
                </div>
                <div class="p-2.5 grid grid-cols-3 gap-2">
                  <span class="font-mono text-zinc-500 font-bold">Naming Standard</span>
                  <span class="text-zinc-800 dark:text-zinc-200">Numerical: 4 octets separated by dots (192.168.1.1)</span>
                  <span class="text-zinc-800 dark:text-zinc-200">Alphanumeric: 8 groups of hex separated by colons</span>
                </div>
                <div class="p-2.5 grid grid-cols-3 gap-2">
                  <span class="font-mono text-zinc-500 font-bold">Requires NAT?</span>
                  <span class="text-zinc-800 dark:text-zinc-200 font-medium">Yes, through Network Address Translation (NAT)</span>
                  <span class="text-emerald-700 dark:text-emerald-400 font-medium">No (eliminated, restored End-to-End Principle)</span>
                </div>
                <div class="p-2.5 grid grid-cols-3 gap-2">
                  <span class="font-mono text-zinc-500 font-bold">Packet Addressing</span>
                  <span class="text-zinc-800 dark:text-zinc-200">Unicast, broadcast, and multicast</span>
                  <span class="text-zinc-800 dark:text-zinc-200">Unicast, multicast, and anycast (No broadcast)</span>
                </div>
                <div class="p-2.5 grid grid-cols-3 gap-2">
                  <span class="font-mono text-zinc-500 font-bold">Header Size</span>
                  <span class="text-zinc-800 dark:text-zinc-200">Variable: 20–60 bytes</span>
                  <span class="text-zinc-800 dark:text-zinc-200">Fixed: 40 bytes (separate extension headers)</span>
                </div>
                <div class="p-2.5 grid grid-cols-3 gap-2">
                  <span class="font-mono text-zinc-500 font-bold">Privacy</span>
                  <span class="text-zinc-800 dark:text-zinc-200">IP address masking to hide last 8 bits</span>
                  <span class="text-zinc-800 dark:text-zinc-200">IP privacy extensions (random temporary addresses)</span>
                </div>
                <div class="p-2.5 grid grid-cols-3 gap-2 bg-zinc-50/50 dark:bg-zinc-800/30">
                  <span class="font-mono text-zinc-500 font-bold">Mobile Support</span>
                  <span class="text-zinc-800 dark:text-zinc-200">Requires add-on Mobile IP & Foreign Agents</span>
                  <span class="text-zinc-800 dark:text-zinc-200 font-semibold">Built-in (SLAAC autoconfig eliminates FA!)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ============================================================== -->
        <!-- PART 3: LESSON 3 GLOBAL SYSTEM FOR MOBILE COMMUNICATION (GSM)   -->
        <!-- ============================================================== -->
        <div class="space-y-5 pt-4">
          <div class="pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <div>
              <span class="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Chapter 2 • Lesson 3</span>
              <h2 class="text-lg sm:text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
                3. Global System for Mobile Communication (GSM)
              </h2>
            </div>
            <span class="text-[11px] font-mono text-zinc-500">Pages 15–20</span>
          </div>

          <!-- 3.1 Overview & Evolution of GSM -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3.5 text-xs">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 3.1</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                GSM Overview & Generational Evolution
              </h3>
            </div>

            <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <strong>What is GSM?</strong> GSM is a digital cellular network standard developed in the late 1980s and deployed in the early 1990s as the definitive 2G mobile standard worldwide. GSM established a common digital standard that enabled international roaming across different countries and network operators, replacing incompatible analog networks.
            </p>

            <!-- Evolution 3-Step Trajectory -->
            <div class="divide-y divide-zinc-200/80 dark:divide-zinc-800 border border-zinc-200/80 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div class="p-3 bg-white dark:bg-zinc-900">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">GSM (2G) — Voice & SMS Foundation</span>
                <span class="text-zinc-500 text-[11px] block mt-0.5">Circuit-switched voice, SMS text messaging, subscriber authentication via SIM, 9.6 kbps data.</span>
              </div>
              <div class="p-3 bg-white dark:bg-zinc-900">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">GPRS (2.5G) — Packet-Switched Mobile Data</span>
                <span class="text-zinc-500 text-[11px] block mt-0.5">General Packet Radio Service introduced packet switching. Billed by data volume, reaching up to 114 kbps for web, email, and MMS.</span>
              </div>
              <div class="p-3 bg-zinc-50 dark:bg-zinc-850">
                <span class="font-mono font-bold text-amber-800 dark:text-amber-300 block">EDGE (2.75G) — Enhanced Data rates for GSM Evolution</span>
                <span class="text-zinc-600 dark:text-zinc-400 text-[11px] block mt-0.5">Upgraded modulation from GMSK (1 bit/symbol) to <strong>8-PSK (3 bits/symbol)</strong>, tripling speeds to 384 kbps over existing 200 kHz channels using Adaptive Modulation & Coding (AMC).</span>
              </div>
            </div>
          </div>

          <!-- 3.2 GSM Network Architecture: 4 Subsystems & Nodes -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3.5 text-xs">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 3.2</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                GSM Network Architecture: 4 Subsystems
              </h3>
            </div>

            <!-- Subsystems Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
                <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">1. Mobile Station Subsystem (MS)</strong>
                <p class="text-zinc-500 dark:text-zinc-400">Consists of the physical Mobile Equipment (handset) and the Subscriber Identity Module (SIM card).</p>
              </div>

              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
                <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">2. Base Station Subsystem (BSS)</strong>
                <p class="text-zinc-500 dark:text-zinc-400">Manages radio RF communications. Contains Base Transceiver Stations (BTS towers) and Base Station Controllers (BSC).</p>
              </div>

              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
                <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">3. Network & Switching Subsystem (NSS)</strong>
                <p class="text-zinc-500 dark:text-zinc-400">The core switching exchange and database center (MSC, GMSC, HLR, VLR, AuC, EIR, and PSTN).</p>
              </div>

              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1">
                <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">4. Operation Support Subsystem (OSS)</strong>
                <p class="text-zinc-500 dark:text-zinc-400">Enables operators to monitor and control system operations, centralized at the Operation and Maintenance Center (OMC).</p>
              </div>
            </div>

            <!-- Standard GSM Interfaces Callout -->
            <div class="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 font-mono text-[11px] grid grid-cols-1 sm:grid-cols-3 gap-1">
              <div><strong class="text-zinc-900 dark:text-zinc-100">Radio Air:</strong> <span class="text-zinc-500">MS ➔ BTS</span></div>
              <div><strong class="text-zinc-900 dark:text-zinc-100">Abis Interface:</strong> <span class="text-zinc-500">BTS ➔ BSC</span></div>
              <div><strong class="text-zinc-900 dark:text-zinc-100">A Interface:</strong> <span class="text-zinc-500">BSC ➔ MSC</span></div>
            </div>

            <!-- 6 NSS Components Deep Detail -->
            <div class="space-y-1.5 pt-1">
              <span class="font-mono text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block">The 6 Core Components of the NSS:</span>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[11px]">
                <div class="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">MSC (Mobile Switching Center)</strong>
                  <span class="text-zinc-500">Core switching system routing calls and data between mobile subscribers and external networks.</span>
                </div>
                <div class="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">HLR (Home Location Register)</strong>
                  <span class="text-zinc-500">Permanent master database storing subscriber ID, subscribed plan, and current location pointer.</span>
                </div>
                <div class="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">VLR (Visitor Location Register)</strong>
                  <span class="text-zinc-500">Temporary database caching data for subscribers currently active in an MSC's service area (allocates MSRN).</span>
                </div>
                <div class="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">AuC (Authentication Center)</strong>
                  <span class="text-zinc-500">Stores secret key Ki; computes cryptographic triplets (RAND, SRES, Kc) to verify SIM identity.</span>
                </div>
                <div class="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">EIR (Equipment Identity Register)</strong>
                  <span class="text-zinc-500">Hardware database tracking 15-digit IMEIs across White (valid), Gray (monitored), and Black (stolen/banned) lists.</span>
                </div>
                <div class="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60">
                  <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">PSTN & GMSC</strong>
                  <span class="text-zinc-500">Public Switched Telephone Network (traditional landlines) connected via the Gateway MSC.</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3.3 Mobile Station and SIM Card Innovations -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3.5 text-xs">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 3.3</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Mobile Station & Subscriber Identity Module (SIM)
              </h3>
            </div>

            <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              In GSM, the Mobile Station refers to the complete end-user device. It is split into two separate parts: the physical <strong>Mobile Equipment (handset)</strong> and the removable <strong>Subscriber Identity Module (SIM)</strong>. Handsets connect to cell towers via transceivers (<strong>TRX</strong>) combining both transmitter and receiver hardware.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] pt-1">
              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1.5">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">Why the SIM Matters for Mobile Computing:</span>
                <ul class="space-y-1 text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  <li>• <strong>Separates Identity from Hardware:</strong> Allows subscribers to swap handsets freely without changing phone numbers or carrier accounts.</li>
                  <li>• <strong>Security Storage:</strong> Safely stores the 15-digit IMSI and secret 128-bit key Ki to prevent unauthorized access.</li>
                  <li>• <strong>International Roaming:</strong> Enables visited partner carriers to authenticate subscribers via home carrier verification.</li>
                </ul>
              </div>

              <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1.5">
                <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 block">SIM Physical Form Factors Evolution:</span>
                <ul class="space-y-1 text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  <li>• <strong>Full-size & Mini-SIM (2FF):</strong> Early standard cards.</li>
                  <li>• <strong>Micro SIM (3FF):</strong> Reduced border format for early smartphones.</li>
                  <li>• <strong>Nano SIM (4FF):</strong> Minimalist format containing only chip contacts.</li>
                  <li>• <strong>eSIM (MFF2):</strong> Embedded chip soldered directly onto device logic boards, programmable over-the-air.</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 3.4 Call Services, SMS Mechanism & Interactive Call Flow Stepper -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-4 text-xs">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 3.4</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Call Transmission Sequence & SMS Signaling
              </h3>
            </div>

            <!-- SMS Architecture Callout -->
            <div class="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60 space-y-1 text-[11px]">
              <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">Short Message Service (SMS) Efficiency:</strong>
              <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                SMS text messages are limited to <strong>160 characters</strong> (7-bit GSM alphabet encoding). Instead of consuming dedicated voice traffic channels, SMS messages are transmitted entirely over <strong>out-of-band signaling channels</strong> (taking advantage of spare capacity in the signaling system). This makes SMS extremely lightweight, reliable, and capable of being received even while a voice call is active.
              </p>
            </div>

            <!-- Interactive 8-Stage Call Flow Stepper -->
            <div class="space-y-3 pt-2">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-mono text-zinc-400 block uppercase">Interactive Walkthrough</span>
                  <h4 class="text-xs sm:text-sm font-serif font-bold text-zinc-900 dark:text-zinc-100">
                    GSM 8-Stage Call Transmission Sequence
                  </h4>
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
