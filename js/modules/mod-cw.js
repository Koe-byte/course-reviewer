/**
 * Unified Reviewer — Course Module: GEd 104 The Contemporary World
 * Clean Minimalist Academic UI • Apple HIG Touch-First Mobile Ergonomics
 * Focuses on Active Recall, Mnemonic Anchoring, and Spaced Retention
 */

const CW_MODULE = (() => {
  let state = {
    // Mastery & Review State
    cardMastery: {},       // { [cardId]: boolean }
    guideReviewed: {},     // { [guideNum]: boolean }
    quizHistory: [],
    bestScore: 0,

    // Flashcard State
    selectedFlashcardUnit: "midterm",
    currentCardIndex: 0,
    isCardFlipped: false,
    filteredCards: [],

    // Study Guide State
    selectedGuideLesson: "midterm",
    guideSearchQuery: "",
    revealedGuideAnswers: {}, // { [guideNum]: boolean }

    // Cheat Sheet State
    termFocus: "midterm",
    activeIntegrationStage: 1,

    // Mock Exam State
    quizSession: null,
    selectedQuizScope: "midterm",
    activeQuizQuestions: [],
    hintTimer: null,
    hintCooldownRemaining: 10,
    isHintUnlocked: false,
    isHintRevealed: false
  };

  function loadModuleState() {
    try {
      const raw = localStorage.getItem("unified_cw_state");
      if (raw) {
        const parsed = JSON.parse(raw);
        state.cardMastery = parsed.cardMastery || {};
        state.guideReviewed = parsed.guideReviewed || {};
        state.quizHistory = parsed.quizHistory || [];
        state.bestScore = parsed.bestScore || 0;
        state.termFocus = parsed.termFocus || "midterm";
      }
    } catch (e) {
      console.warn("Failed to load CW state:", e);
    }
  }

  function saveModuleState() {
    try {
      localStorage.setItem("unified_cw_state", JSON.stringify({
        cardMastery: state.cardMastery,
        guideReviewed: state.guideReviewed,
        quizHistory: state.quizHistory,
        bestScore: state.bestScore,
        termFocus: state.termFocus
      }));
    } catch (e) {
      console.warn("Failed to save CW state:", e);
    }
  }

  // ==========================================
  // READINESS INDEX & BATSTATEU GRADING
  // ==========================================
  function calculateReadiness() {
    // Scope readiness to active midterm reviewer pointers
    const midtermCards = CW_DATA.flashcards.filter(c => c.isMidterm !== false);
    const masteredCount = midtermCards.filter(c => state.cardMastery[c.id] === true).length;
    const flashcardScore = (masteredCount / Math.max(1, midtermCards.length)) * 35;

    let quizScore = 0;
    if (state.quizHistory.length > 0) {
      const latest = state.quizHistory[state.quizHistory.length - 1].scorePct;
      quizScore = ((state.bestScore * 0.7) + (latest * 0.3)) * 0.35;
    }

    const midtermGuide = CW_DATA.guideQuestions.filter(g => g.isMidterm !== false);
    const reviewedCount = midtermGuide.filter(g => state.guideReviewed[g.num] === true).length;
    const guideScore = (reviewedCount / Math.max(1, midtermGuide.length)) * 30;

    return Math.min(100, Math.max(0, Math.round(flashcardScore + quizScore + guideScore)));
  }

  function getBatStateUGrade(pct) {
    if (pct >= 98) return { grade: "1.00", desc: "Excellent • President's List Range", color: "text-emerald-500" };
    if (pct >= 94) return { grade: "1.25", desc: "Superior", color: "text-emerald-500" };
    if (pct >= 90) return { grade: "1.50", desc: "Very Good", color: "text-emerald-500" };
    if (pct >= 88) return { grade: "1.75", desc: "Good", color: "text-emerald-500" };
    if (pct >= 85) return { grade: "2.00", desc: "Meritorious / Very Satisfactory", color: "text-zinc-300" };
    if (pct >= 83) return { grade: "2.25", desc: "Satisfactory", color: "text-zinc-300" };
    if (pct >= 80) return { grade: "2.50", desc: "Fairly Satisfactory", color: "text-zinc-400" };
    if (pct >= 78) return { grade: "2.75", desc: "Passing Threshold", color: "text-amber-500" };
    if (pct >= 75) return { grade: "3.00", desc: "Passing", color: "text-amber-500" };
    return { grade: "5.00", desc: "Failure / Needs Remediation", color: "text-rose-500" };
  }

  function init() {
    loadModuleState();
    filterFlashcards(state.selectedFlashcardUnit || "midterm");
  }

  // Router View Dispatcher
  function renderView(toolId, container) {
    switch (toolId) {
      case "cheatsheet":
      case "overview":
        renderCheatSheet(container);
        break;
      case "guide":
        renderStudyGuide(container);
        break;
      case "flashcards":
        renderFlashcards(container);
        break;
      case "quiz":
        renderQuiz(container);
        break;
      default:
        renderCheatSheet(container);
    }
  }

  // ==========================================
  // 1. CHEAT SHEET & QUICK REFERENCE VIEW
  // ==========================================
  function renderCheatSheet(container) {
    const readiness = calculateReadiness();
    const isMidterm = state.termFocus !== "prelim";
    const totalCards = CW_DATA.flashcards.filter(c => isMidterm ? c.isMidterm !== false : true).length;
    const masteredCards = CW_DATA.flashcards.filter(c => (isMidterm ? c.isMidterm !== false : true) && state.cardMastery[c.id]).length;
    const reviewedGuides = CW_DATA.guideQuestions.filter(g => (isMidterm ? g.isMidterm !== false : true) && state.guideReviewed[g.num]).length;
    const totalGuides = CW_DATA.guideQuestions.filter(g => isMidterm ? g.isMidterm !== false : true).length;
    const activeStage = CW_DATA.integrationStages.find(s => s.stage === state.activeIntegrationStage) || CW_DATA.integrationStages[0];

    container.innerHTML = `
      <div class="space-y-8 animate-fade-in pb-16 prose-container">
        
        <!-- Header & Scope Indicator -->
        <div class="space-y-2 pb-5 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <div class="flex items-center justify-between">
            <span class="quiet-chip">GEd 104 • ${isMidterm ? 'Midterm Examination Focus' : 'Preliminary & Midterm Scope'}</span>
            <span class="text-[11px] font-mono text-zinc-400">BatStateU CICS • AY 2026–2027</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            The Contemporary World Study Reference
          </h1>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Memorization-engineered reference aligned with official pointers: <strong>Lesson 2 (Global Structure of Globalization)</strong> and <strong>Lesson 3 (World of Regions)</strong>, including high-yield mnemonics, active recall triggers, and integration ladders.
          </p>
        </div>

        <!-- Readiness Index Hero Banner -->
        <div class="ios-inset-card p-5 sm:p-6 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ACTIVE RETENTION INDEX
              </div>
              <h3 class="text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Lessons 2 & 3 Examination Preparedness
              </h3>
              <p class="text-xs text-zinc-500 dark:text-zinc-400">
                Composite of flashcard active recall (35%), diagnostic mock test (35%), and guide drill completion (30%).
              </p>
            </div>
            
            <div class="flex items-baseline sm:flex-col sm:items-end gap-2">
              <span class="text-4xl sm:text-5xl font-serif font-extrabold text-zinc-900 dark:text-zinc-100">${readiness}%</span>
              <span class="text-[10px] font-mono uppercase text-zinc-400">${readiness >= 75 ? "Exam Ready" : "In Progress"}</span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div class="bg-zinc-900 dark:bg-zinc-100 h-full rounded-full transition-all duration-700" style="width: ${readiness}%"></div>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="grid grid-cols-3 gap-2 pt-2 text-center text-xs border-t border-zinc-200/60 dark:border-zinc-800/60 font-mono">
            <div>
              <span class="text-zinc-400 text-[10px] block">Mastered Cards</span>
              <span class="font-bold text-zinc-800 dark:text-zinc-200">${masteredCards}/${totalCards}</span>
            </div>
            <div>
              <span class="text-zinc-400 text-[10px] block">Mock Best</span>
              <span class="font-bold text-zinc-800 dark:text-zinc-200">${state.bestScore}%</span>
            </div>
            <div>
              <span class="text-zinc-400 text-[10px] block">Guide Qs Reviewed</span>
              <span class="font-bold text-zinc-800 dark:text-zinc-200">${reviewedGuides}/${totalGuides}</span>
            </div>
          </div>
        </div>

        <!-- ============================================================== -->
        <!-- MEMORIZATION ACCELERATOR: MNEMONIC ARCHITECTURE                 -->
        <!-- ============================================================== -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
              🧠 Core Memory Anchors & Mnemonics
            </span>
            <span class="text-[10px] font-mono text-zinc-400">High-Yield Retention</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <!-- Mnemonic 1: P-G-T-S -->
            <div class="ios-inset-card p-4 space-y-2.5">
              <div class="flex items-center justify-between pb-1.5 border-b border-zinc-200/60 dark:border-zinc-800/60">
                <span class="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">P-G-T-S</span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold">4 Elements of State</span>
              </div>
              <div class="text-[11px] font-mono text-zinc-500 italic">"People Govern Their State"</div>
              <div class="space-y-1.5 text-xs">
                <div class="flex items-baseline gap-2">
                  <span class="w-5 h-5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">P</span>
                  <div><strong>Population:</strong> <span class="text-zinc-600 dark:text-zinc-300">The people living in the state.</span></div>
                </div>
                <div class="flex items-baseline gap-2">
                  <span class="w-5 h-5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">G</span>
                  <div><strong>Government:</strong> <span class="text-zinc-600 dark:text-zinc-300">The system managing and organizing the state.</span></div>
                </div>
                <div class="flex items-baseline gap-2">
                  <span class="w-5 h-5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">T</span>
                  <div><strong>Territory:</strong> <span class="text-zinc-600 dark:text-zinc-300">Defined land, water, and airspace.</span></div>
                </div>
                <div class="flex items-baseline gap-2">
                  <span class="w-5 h-5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">S</span>
                  <div><strong>Sovereignty:</strong> <span class="text-zinc-600 dark:text-zinc-300">Power to govern itself without outside control.</span></div>
                </div>
              </div>
            </div>

            <!-- Mnemonic 2: BRICS -->
            <div class="ios-inset-card p-4 space-y-2.5">
              <div class="flex items-center justify-between pb-1.5 border-b border-zinc-200/60 dark:border-zinc-800/60">
                <span class="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">B-R-I-C-S</span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold">Emerging Giants</span>
              </div>
              <div class="text-[11px] font-mono text-zinc-500 italic">"Growing consumer markets + Lower production costs"</div>
              <div class="grid grid-cols-5 gap-1.5 text-center font-mono text-[10px] py-1">
                <div class="p-1.5 rounded bg-zinc-100 dark:bg-zinc-800 font-bold">B<br><span class="font-normal text-[9px] text-zinc-500">Brazil</span></div>
                <div class="p-1.5 rounded bg-zinc-100 dark:bg-zinc-800 font-bold">R<br><span class="font-normal text-[9px] text-zinc-500">Russia</span></div>
                <div class="p-1.5 rounded bg-zinc-100 dark:bg-zinc-800 font-bold">I<br><span class="font-normal text-[9px] text-zinc-500">India</span></div>
                <div class="p-1.5 rounded bg-zinc-100 dark:bg-zinc-800 font-bold">C<br><span class="font-normal text-[9px] text-zinc-500">China</span></div>
                <div class="p-1.5 rounded bg-zinc-100 dark:bg-zinc-800 font-bold">S<br><span class="font-normal text-[9px] text-zinc-500">S. Africa</span></div>
              </div>
              <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-[11px]">
                Prime foreign direct investment (FDI) targets: businesses expand here because of rapidly expanding domestic markets and lower manufacturing costs.
              </p>
            </div>

            <!-- Mnemonic 3: Golden Straitjacket vs. Electronic Herd -->
            <div class="ios-inset-card p-4 space-y-2 md:col-span-2">
              <div class="flex items-center justify-between pb-1.5 border-b border-zinc-200/60 dark:border-zinc-800/60">
                <span class="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">Friedman's Dialectic: Straitjacket vs. Herd</span>
                <span class="text-[10px] font-mono text-zinc-400">Market Pressures</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div class="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-xs block">Golden Straitjacket (The State)</span>
                  <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                    Forced choice on nations to adopt neoliberal policies. The core consequence: <strong>the economy grows while politics shrinks</strong> (narrowing of democratic policy alternatives).
                  </p>
                </div>
                <div class="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1">
                  <span class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-xs block">Electronic Herd (Global Investors)</span>
                  <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                    International currency/stock investors who <strong>quickly move billions from country to country</strong>, instantly rewarding reform and mercilessly punishing uncompetitive states.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ============================================================== -->
        <!-- INTERACTIVE LADDER: 7 STAGES OF ECONOMIC INTEGRATION           -->
        <!-- ============================================================== -->
        <div class="ios-inset-card p-5 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <div>
              <span class="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Ladder of Regional Integration</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                The 7 Stages of Economic Integration
              </h3>
            </div>
            <span class="text-[11px] font-mono text-zinc-500">Mnemonic: P-F-C-C-E-E-C</span>
          </div>

          <!-- Stepper Tab Navigation -->
          <div class="grid grid-cols-7 gap-1 overflow-x-auto pb-1">
            ${CW_DATA.integrationStages.map(s => {
              const isActive = s.stage === state.activeIntegrationStage;
              return `
                <button
                  onclick="CW_MODULE.selectIntegrationStage(${s.stage})"
                  class="py-2 px-1 rounded-lg text-center font-mono text-[10px] sm:text-xs transition-all ${
                    isActive
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }"
                >
                  <span class="block text-[9px] opacity-70">S${s.stage}</span>
                  <span class="truncate block font-bold">${s.acronym}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Active Stage Card -->
          <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-mono text-xs font-bold flex items-center justify-center">
                  ${activeStage.stage}
                </span>
                <h4 class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                  ${activeStage.name}
                </h4>
              </div>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold">
                ${activeStage.scope}
              </span>
            </div>
            <p class="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
              ${activeStage.keyFeature}
            </p>
            <div class="text-[11px] font-mono text-zinc-500 pt-1 border-t border-zinc-200/50 dark:border-zinc-700/50">
              📌 Real-World Example: <span class="text-zinc-700 dark:text-zinc-300">${activeStage.example}</span>
            </div>
          </div>
        </div>

        <!-- ============================================================== -->
        <!-- PART 1: LESSON 2 — GLOBAL STRUCTURE OF GLOBALIZATION           -->
        <!-- ============================================================== -->
        <div class="space-y-5 pt-2">
          <div class="pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <div>
              <span class="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Curriculum Section I</span>
              <h2 class="text-lg sm:text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Lesson 2: Global Structure of Globalization
              </h2>
            </div>
            <span class="text-[11px] font-mono text-zinc-500">Core Midterm Coverage</span>
          </div>

          <!-- 1.1 Market, Stock, and Financial Integration -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3.5">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 2.1</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Market, Stock Market, & Financial Market Integration
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-2 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono text-zinc-900 dark:text-zinc-100 font-bold block text-xs">1. Market Integration</span>
                <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  The movement of prices of related goods and services sold in a defined geographical location in similar patterns.
                </p>
                <div class="text-[10px] font-mono text-zinc-500 bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200/60 dark:border-zinc-700/60">
                  ⛽ Oil in Country X & Country Y becomes similar because they trade oil freely.
                </div>
              </div>

              <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-2 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono text-zinc-900 dark:text-zinc-100 font-bold block text-xs">2. Stock Market Integration</span>
                <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  Happens when stock markets in different countries move in the same direction. Stocks rise and fall together across borders.
                </p>
                <div class="text-[10px] font-mono text-zinc-500 bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200/60 dark:border-zinc-700/60">
                  📈 Synchronous co-movement proves cross-border financial linkage.
                </div>
              </div>

              <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-2 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono text-zinc-900 dark:text-zinc-100 font-bold block text-xs">3. Financial Market Integration</span>
                <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  An open market economy facilitated by a common currency and eliminating technical, regulatory, and tax differences.
                </p>
                <div class="text-[10px] font-mono text-zinc-500 bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200/60 dark:border-zinc-700/60">
                  💶 Common currency + elimination of technical/tax barriers.
                </div>
              </div>
            </div>
          </div>

          <!-- 1.2 Global Corporations, FDI, and GATS -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3.5">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 2.2</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Global Corporations, Foreign Direct Investment, & GATS
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1.5 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono text-zinc-900 dark:text-zinc-100 font-bold block text-xs">Global Corporations & FDI</span>
                <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  <strong>Global Corporation:</strong> A business that operates in two or more countries.<br>
                  <strong>FDI:</strong> Major driver of global corporate development. Occurs when a company invests <em>money, technology, and management skills</em> from one country to build a business or factory in another.
                </p>
              </div>

              <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1.5 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono text-zinc-900 dark:text-zinc-100 font-bold block text-xs">GATS (Uruguay Round, 1995)</span>
                <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  <strong>General Agreement on Trade in Services:</strong> The first multilateral agreement covering trade in services, negotiated during the Uruguay Round of multilateral trade negotiations, and entered into force in <strong>1995</strong>.
                </p>
              </div>
            </div>
          </div>

          <!-- 1.3 Statehood, UN Roles, Peacekeeping, and Governance -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3.5">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 2.3</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Statehood, UN Peacekeeping, & Contemporary Global Governance
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1.5 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono text-zinc-900 dark:text-zinc-100 font-bold block text-xs">Roles of the United Nations</span>
                <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  The UN promotes international cooperation and creates and maintains international order.<br>
                  <strong class="text-zinc-900 dark:text-zinc-100">Exam Alert:</strong> To prevent taking a stance on politics, <strong>peacekeeping is kept to be the MOST important feature of UN activity</strong> in peace and security.
                </p>
              </div>

              <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1.5 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono text-zinc-900 dark:text-zinc-100 font-bold block text-xs">Global Governance & Movements</span>
                <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  <strong>Global Governance:</strong> Sum of laws, norms, policies, and institutions mediating trans-border relations between states, cultures, citizens, IGOs, and markets.<br>
                  <strong>Global Justice Movement:</strong> Believes global economic systems must be fairer and more equal.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- ============================================================== -->
        <!-- PART 2: LESSON 3 — WORLD OF REGIONS                            -->
        <!-- ============================================================== -->
        <div class="space-y-5 pt-2">
          <div class="pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
            <div>
              <span class="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Curriculum Section II</span>
              <h2 class="text-lg sm:text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Lesson 3: World of Regions
              </h2>
            </div>
            <span class="text-[11px] font-mono text-zinc-500">Global North, South, & Asia</span>
          </div>

          <!-- Global North vs. Global South Table -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3.5">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 3.1</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Global North vs. Global South (Climate & Economics)
              </h3>
            </div>

            <div class="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
              <table class="w-full text-left text-xs">
                <thead class="bg-zinc-100 dark:bg-zinc-800/70 font-mono text-[10px] uppercase text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th class="py-2.5 px-3">Dimension</th>
                    <th class="py-2.5 px-3">Global North</th>
                    <th class="py-2.5 px-3">Global South</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 text-[11px]">
                  ${CW_DATA.northSouthMatrix.map(m => `
                    <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                      <td class="py-2.5 px-3 font-mono font-bold text-zinc-900 dark:text-zinc-100">${m.dimension}</td>
                      <td class="py-2.5 px-3 text-zinc-600 dark:text-zinc-300 leading-relaxed">${m.globalNorth}</td>
                      <td class="py-2.5 px-3 text-zinc-600 dark:text-zinc-300 leading-relaxed">${m.globalSouth}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Asia and South Pacific -->
          <div class="ios-inset-card p-4 sm:p-5 space-y-3">
            <div class="space-y-1">
              <span class="font-mono text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">Lesson 3.2</span>
              <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Asia and the South Pacific: Laboratories of Modernity
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1.5 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono text-zinc-900 dark:text-zinc-100 font-bold block text-xs">"Laboratories of Modernity"</span>
                <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  Asia Pacific is a rising political force. Because it rapidly pioneers novel models of technology, urbanization, and manufacturing, it is termed the <strong>"laboratories of modernity"</strong>.
                </p>
              </div>

              <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1.5 border border-zinc-200/60 dark:border-zinc-800/60">
                <span class="font-mono text-zinc-900 dark:text-zinc-100 font-bold block text-xs">Historical vs. External Globalization</span>
                <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  • <strong>Early Modern Economy:</strong> Asia was the central force, hosting the world's most vital trade routes and advanced technology.<br>
                  • <strong>Contemporary Era:</strong> Often perceived as an external phenomenon pushed in by Western powers (US & Europe).
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // ==========================================
  // 2. FLASHCARDS VIEW (WITH SOUND & KEYBOARD)
  // ==========================================
  function renderFlashcards(container) {
    const card = state.filteredCards[state.currentCardIndex] || state.filteredCards[0];
    const total = state.filteredCards.length;
    const currentNum = total > 0 ? state.currentCardIndex + 1 : 0;
    const isMastered = card ? state.cardMastery[card.id] === true : false;

    container.innerHTML = `
      <div class="space-y-6 max-w-2xl mx-auto animate-fade-in pb-12">
        <!-- Controls Header -->
        <div class="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div class="flex items-center gap-1.5 overflow-x-auto">
            <button onclick="CW_MODULE.filterFlashcards('midterm')" class="flashcard-filter-btn px-2.5 py-1 rounded text-xs font-mono font-medium ${state.selectedFlashcardUnit === 'midterm' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Midterm Lessons 2 & 3</button>
            <button onclick="CW_MODULE.filterFlashcards('Lesson 2')" class="flashcard-filter-btn px-2.5 py-1 rounded text-xs font-mono font-medium ${state.selectedFlashcardUnit === 'Lesson 2' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Lesson 2</button>
            <button onclick="CW_MODULE.filterFlashcards('Lesson 3')" class="flashcard-filter-btn px-2.5 py-1 rounded text-xs font-mono font-medium ${state.selectedFlashcardUnit === 'Lesson 3' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Lesson 3</button>
            <button onclick="CW_MODULE.filterFlashcards('all')" class="flashcard-filter-btn px-2.5 py-1 rounded text-xs font-mono font-medium ${state.selectedFlashcardUnit === 'all' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">All (${CW_DATA.flashcards.length})</button>
          </div>
          <button onclick="CW_MODULE.shuffleFlashcards()" class="px-2.5 py-1 rounded text-xs font-mono font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            🔀 Shuffle
          </button>
        </div>

        <!-- Progress Indicator -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Card ${currentNum} of ${total}</span>
            <span>${Object.values(state.cardMastery).filter(Boolean).length} Mastered</span>
          </div>
          <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div class="bg-zinc-900 dark:bg-zinc-100 h-full rounded-full transition-all duration-300" style="width: ${total > 0 ? (currentNum / total) * 100 : 0}%"></div>
          </div>
        </div>

        <!-- 3D Flashcard Stage -->
        ${card ? `
          <div class="perspective-1000">
            <div
              id="cw-flashcard-flipper"
              onclick="CW_MODULE.toggleFlip()"
              class="flashcard ${state.isCardFlipped ? 'flipped' : ''} cursor-pointer select-none"
              style="min-height: 290px;"
            >
              <div class="flashcard-inner transform-style-3d relative w-full h-full" style="min-height: 290px;">
                <!-- Front Face -->
                <div class="flashcard-front backface-hidden absolute inset-0 p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">${card.unit} • ${card.typeBadge}</span>
                    <span class="text-xs font-mono text-zinc-400">Tap or Space to Flip</span>
                  </div>
                  <div class="my-auto py-4 text-center">
                    <h3 class="text-lg sm:text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      ${card.front}
                    </h3>
                  </div>
                  <div class="text-center text-[11px] font-mono text-zinc-500 italic">
                    💡 Memory Cue: ${card.hint}
                  </div>
                </div>

                <!-- Back Face -->
                <div class="flashcard-back backface-hidden rotate-y-180 absolute inset-0 p-6 sm:p-8 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 shadow-sm flex flex-col justify-between">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 dark:bg-zinc-200 text-zinc-300 dark:text-zinc-700 font-semibold">${card.typeBadge}</span>
                    <span class="text-xs font-mono opacity-60">Answer</span>
                  </div>
                  <div class="my-auto py-4 flashcard-body-scroll">
                    <p class="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-zinc-200 dark:text-zinc-800">
                      ${card.back}
                    </p>
                  </div>
                  <div class="text-center text-[10px] font-mono opacity-60">
                    Tap to flip back
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : `
          <div class="p-12 text-center text-zinc-500">No cards found in this filter.</div>
        `}

        <!-- Tactile iOS Actions -->
        <div class="flex items-center justify-between gap-2.5 pt-2">
          <button onclick="CW_MODULE.prevCard()" class="px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            ◀ Prev
          </button>
          <div class="flex items-center gap-2 flex-1 justify-center max-w-xs">
            <button onclick="CW_MODULE.markCard(false)" class="flex-1 py-2.5 rounded-xl text-xs font-semibold border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100 transition-colors">
              Still Learning
            </button>
            <button onclick="CW_MODULE.markCard(true)" class="flex-1 py-2.5 rounded-xl text-xs font-semibold border border-emerald-300 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors">
              ★ Mastered
            </button>
          </div>
          <button onclick="CW_MODULE.nextCard()" class="px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Next ▶
          </button>
        </div>

        <div class="text-center text-[11px] font-mono text-zinc-400">
          Keyboard: <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">Space</kbd> Flip • <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">←</kbd> <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">→</kbd> Nav • <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">1</kbd> Learning • <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">2</kbd> Mastered
        </div>
      </div>
    `;
  }

  // ==========================================
  // 3. MOCK EXAM VIEW (WITH THINK-FIRST HINTS)
  // ==========================================
  function renderQuiz(container) {
    if (!state.quizSession) {
      renderQuizLanding(container);
    } else if (state.quizSession.isFinished) {
      renderQuizResults(container);
    } else {
      renderQuizActive(container);
    }
  }

  function renderQuizLanding(container) {
    const isMidterm = state.termFocus !== "prelim";
    const availableQuestions = isMidterm
      ? CW_DATA.quizQuestions.filter(q => q.isMidterm !== false)
      : CW_DATA.quizQuestions;

    container.innerHTML = `
      <div class="max-w-xl mx-auto space-y-6 text-center animate-fade-in py-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
            <span>🎯</span> ${availableQuestions.length} ACTIVE RECALL ITEMS AVAILABLE
          </div>
          <h2 class="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            ${isMidterm ? 'Midterm Examination Simulator' : 'Comprehensive Examination Simulator'}
          </h2>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Test your command of <strong>Lesson 2 (Global Structure)</strong> and <strong>Lesson 3 (World of Regions)</strong>. Features a 10-second Think-First Hint cooldown and randomized option shuffling to prevent positional cramming.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
          <div class="ios-inset-card p-5 space-y-3 flex flex-col justify-between">
            <div class="space-y-1">
              <span class="text-xs font-mono text-zinc-400 font-semibold">Mode 1</span>
              <h4 class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-base">Practice Mode</h4>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Untimed session with instant textbook rationale and Think-First pedagogical hints.
              </p>
            </div>
            <button onclick="CW_MODULE.startQuiz('practice')" class="w-full py-2.5 rounded-xl text-xs font-semibold bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors">
              Start Practice Session
            </button>
          </div>

          <div class="p-5 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 space-y-3 flex flex-col justify-between shadow-sm">
            <div class="space-y-1">
              <span class="text-xs font-mono opacity-60 font-semibold">Mode 2</span>
              <h4 class="font-serif font-bold text-base">Timed Simulation</h4>
              <p class="text-xs opacity-80 leading-relaxed">
                25-minute countdown, question flagging, and BatStateU grade transmutation upon completion.
              </p>
            </div>
            <button onclick="CW_MODULE.startQuiz('timed')" class="w-full py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white hover:opacity-90 transition-opacity">
              Begin Timed Exam (25:00)
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function startQuiz(mode, customQuestions = null) {
    let questionsPool = customQuestions;
    if (!questionsPool) {
      const isMidterm = state.termFocus !== "prelim";
      questionsPool = isMidterm
        ? CW_DATA.quizQuestions.filter(q => q.isMidterm !== false)
        : [...CW_DATA.quizQuestions];
    }

    // Fisher-Yates Shuffle questions & options
    const shuffled = questionsPool.map(q => {
      const opts = [...q.options];
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      return { ...q, options: opts };
    });

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    state.quizSession = {
      mode,
      questions: shuffled,
      currentIndex: 0,
      userAnswers: {},
      flagged: {},
      timeRemaining: 1500, // 25 mins
      timerInterval: null,
      isFinished: false
    };

    resetHintCooldown();

    if (mode === "timed") {
      state.quizSession.timerInterval = setInterval(() => {
        if (!state.quizSession || state.quizSession.isFinished) {
          clearInterval(state.quizSession?.timerInterval);
          return;
        }
        state.quizSession.timeRemaining--;
        if (state.quizSession.timeRemaining <= 0) {
          clearInterval(state.quizSession.timerInterval);
          submitQuiz();
        } else {
          const timerEl = document.getElementById("cw-quiz-timer");
          if (timerEl) {
            const m = Math.floor(state.quizSession.timeRemaining / 60);
            const s = state.quizSession.timeRemaining % 60;
            timerEl.textContent = `⏱ ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
          }
        }
      }, 1000);
    }

    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
    UNIFIED_AUDIO.play("flip");
  }

  function resetHintCooldown() {
    clearInterval(state.hintTimer);
    state.hintCooldownRemaining = 10;
    state.isHintUnlocked = false;
    state.isHintRevealed = false;

    state.hintTimer = setInterval(() => {
      if (!state.quizSession || state.quizSession.isFinished) {
        clearInterval(state.hintTimer);
        return;
      }
      state.hintCooldownRemaining--;
      if (state.hintCooldownRemaining <= 0) {
        state.isHintUnlocked = true;
        clearInterval(state.hintTimer);
      }
      updateHintUI();
    }, 1000);
  }

  function updateHintUI() {
    const bar = document.getElementById("cw-think-cooldown");
    if (!bar) return;
    const pct = Math.min(100, Math.round(((10 - state.hintCooldownRemaining) / 10) * 100));

    if (state.isHintRevealed) {
      const q = state.quizSession?.questions[state.quizSession.currentIndex];
      bar.innerHTML = `
        <div class="hint-clue-card w-full">
          <div class="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">💡 Conceptual Memory Clue</div>
          <div class="text-xs text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed mt-1">${q ? q.hint : ''}</div>
        </div>
      `;
    } else if (state.isHintUnlocked) {
      bar.innerHTML = `
        <button onclick="CW_MODULE.unlockHint()" class="hint-pill-btn">
          <span>💡 Reveal Conceptual Clue</span>
        </button>
      `;
    } else {
      bar.innerHTML = `
        <div class="think-cooldown-bar w-full">
          <div class="think-cooldown-fill" style="width: ${pct}%"></div>
          <div class="think-cooldown-label">
            <span>⏳ Think First: ${state.hintCooldownRemaining}s</span>
          </div>
        </div>
      `;
    }
  }

  function unlockHint() {
    state.isHintRevealed = true;
    updateHintUI();
    UNIFIED_AUDIO.play("flip");
  }

  function renderQuizActive(container) {
    const s = state.quizSession;
    const q = s.questions[s.currentIndex];
    const isAnswered = s.userAnswers[s.currentIndex] !== undefined;
    const selectedOpt = s.userAnswers[s.currentIndex];
    const isFlagged = !!s.flagged[s.currentIndex];

    const minutes = Math.floor(s.timeRemaining / 60);
    const seconds = s.timeRemaining % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6 animate-fade-in pb-12">
        <!-- Top Navigation Status -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">${q.unit}</span>
            <span class="text-xs font-mono text-zinc-500">Question ${s.currentIndex + 1} of ${s.questions.length}</span>
          </div>
          <div class="flex items-center gap-3">
            ${s.mode === 'timed' ? `
              <span id="cw-quiz-timer" class="text-xs font-mono font-bold ${s.timeRemaining < 300 ? 'text-rose-500 animate-pulse' : 'text-zinc-700 dark:text-zinc-300'}">
                ⏱ ${timeStr}
              </span>
            ` : ''}
            <button onclick="CW_MODULE.toggleFlagCurrent()" class="p-1.5 rounded-lg border ${isFlagged ? 'border-amber-500 bg-amber-500/20 text-amber-500' : 'border-zinc-300 dark:border-zinc-700 text-zinc-400'} text-xs font-mono transition-colors">
              🚩 Flag
            </button>
          </div>
        </div>

        <!-- Question Body -->
        <div class="space-y-4">
          <h3 class="text-base sm:text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
            ${q.question}
          </h3>

          <!-- Options Grid -->
          <div class="space-y-2.5">
            ${q.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isCorrect = opt === q.answer;
              const isSelected = selectedOpt === opt;

              let btnStyle = "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 text-zinc-800 dark:text-zinc-200";
              
              if (s.mode === 'practice' && isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200";
                }
              } else if (isSelected) {
                btnStyle = "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-900 font-semibold";
              }

              return `
                <button
                  onclick="CW_MODULE.selectAnswer('${opt.replace(/'/g, "\\'")}')"
                  class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${btnStyle}"
                >
                  <span class="w-6 h-6 rounded-lg font-mono text-xs flex items-center justify-center flex-shrink-0 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">${letter}</span>
                  <span class="flex-1 leading-relaxed">${opt}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Think-First Hint Cooldown Slot -->
          ${!isAnswered ? `
            <div id="cw-think-cooldown" class="pt-2"></div>
          ` : ''}

          <!-- Practice Mode Explanation -->
          ${s.mode === 'practice' && isAnswered ? `
            <div class="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs animate-fade-in">
              <strong class="font-mono text-zinc-900 dark:text-zinc-100 block font-semibold">💡 Official Rationale & Memory Anchor</strong>
              <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">${q.explanation}</p>
            </div>
          ` : ''}
        </div>

        <!-- Question Navigation Grid -->
        <div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
          <div class="flex items-center justify-between">
            <button onclick="CW_MODULE.navQuiz(-1)" ${s.currentIndex === 0 ? 'disabled' : ''} class="px-3.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-medium disabled:opacity-40">
              ◀ Prev
            </button>
            <div class="flex items-center gap-1.5 flex-wrap justify-center max-w-sm">
              ${s.questions.map((_, idx) => {
                const ans = s.userAnswers[idx];
                const flg = s.flagged[idx];
                const isCurr = idx === s.currentIndex;
                let bg = "bg-zinc-200 dark:bg-zinc-800 text-zinc-500";
                if (ans !== undefined) bg = "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900";
                if (flg) bg += " ring-2 ring-amber-500";
                if (isCurr) bg += " ring-2 ring-zinc-500";
                return `
                  <button onclick="CW_MODULE.jumpQuiz(${idx})" class="w-6 h-6 rounded text-[11px] font-mono font-bold flex items-center justify-center ${bg}">
                    ${idx + 1}
                  </button>
                `;
              }).join('')}
            </div>
            ${s.currentIndex === s.questions.length - 1 ? `
              <button onclick="CW_MODULE.submitQuiz()" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold">
                Finish ✓
              </button>
            ` : `
              <button onclick="CW_MODULE.navQuiz(1)" class="px-3.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-medium">
                Next ▶
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    if (!isAnswered) {
      updateHintUI();
    }
  }

  function selectAnswer(ans) {
    if (!state.quizSession || state.quizSession.isFinished) return;
    state.quizSession.userAnswers[state.quizSession.currentIndex] = ans;
    const q = state.quizSession.questions[state.quizSession.currentIndex];
    
    if (ans === q.answer) {
      UNIFIED_AUDIO.play("correct");
    } else {
      UNIFIED_AUDIO.play("wrong");
    }

    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
  }

  function toggleFlagCurrent() {
    if (!state.quizSession) return;
    const idx = state.quizSession.currentIndex;
    state.quizSession.flagged[idx] = !state.quizSession.flagged[idx];
    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
  }

  function navQuiz(delta) {
    if (!state.quizSession) return;
    const nextIdx = Math.max(0, Math.min(state.quizSession.questions.length - 1, state.quizSession.currentIndex + delta));
    if (nextIdx !== state.quizSession.currentIndex) {
      state.quizSession.currentIndex = nextIdx;
      resetHintCooldown();
      const container = document.getElementById("main-content");
      if (container) renderView("quiz", container);
      UNIFIED_AUDIO.play("flip");
    }
  }

  function jumpQuiz(idx) {
    if (!state.quizSession) return;
    state.quizSession.currentIndex = idx;
    resetHintCooldown();
    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
    UNIFIED_AUDIO.play("flip");
  }

  function submitQuiz() {
    if (!state.quizSession) return;
    clearInterval(state.quizSession.timerInterval);
    clearInterval(state.hintTimer);
    state.quizSession.isFinished = true;

    let correctCount = 0;
    state.quizSession.questions.forEach((q, idx) => {
      if (state.quizSession.userAnswers[idx] === q.answer) correctCount++;
    });

    const scorePct = Math.round((correctCount / state.quizSession.questions.length) * 100);
    state.quizHistory.push({
      date: new Date().toLocaleDateString(),
      mode: state.quizSession.mode,
      correct: correctCount,
      total: state.quizSession.questions.length,
      scorePct
    });

    if (scorePct > state.bestScore) state.bestScore = scorePct;
    saveModuleState();

    if (scorePct >= 75) {
      UNIFIED_AUDIO.play("celebrate");
      triggerConfetti();
    }

    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
  }

  function renderQuizResults(container) {
    const s = state.quizSession;
    const missedQuestions = [];
    let correctCount = 0;

    s.questions.forEach((q, idx) => {
      if (s.userAnswers[idx] === q.answer) {
        correctCount++;
      } else {
        missedQuestions.push(q);
      }
    });

    const scorePct = Math.round((correctCount / s.questions.length) * 100);
    const grade = getBatStateUGrade(scorePct);

    container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6 animate-fade-in py-4 pb-12">
        <!-- Results Hero Banner -->
        <div class="ios-inset-card p-6 sm:p-8 text-center space-y-3">
          <span class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">Diagnostic Performance Report</span>
          <div class="text-5xl sm:text-6xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            ${scorePct}%
          </div>
          <div class="text-xs font-mono text-zinc-500">
            ${correctCount} of ${s.questions.length} Items Correct
          </div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-bold ${grade.color}">
            BatStateU Equivalent: ${grade.grade} • ${grade.desc}
          </div>
        </div>

        <!-- Shuffled Retry Controls -->
        <div class="flex items-center justify-center gap-3 flex-wrap">
          <button onclick="CW_MODULE.retryQuiz()" class="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90">
            🔄 Retry All (Shuffled)
          </button>
          ${missedQuestions.length > 0 ? `
            <button onclick="CW_MODULE.drillMissedQuiz()" class="px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-xs font-semibold hover:bg-rose-100">
              ⚡ Drill Missed Only (${missedQuestions.length} Items)
            </button>
          ` : ''}
          <button onclick="CW_MODULE.closeQuiz()" class="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800">
            Back to Overview
          </button>
        </div>

        <!-- Question Review Cards -->
        <div class="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <h4 class="text-sm font-mono uppercase tracking-wider text-zinc-500 font-semibold">Detailed Question Review</h4>
          <div class="space-y-3">
            ${s.questions.map((q, idx) => {
              const userAns = s.userAnswers[idx];
              const isCorrect = userAns === q.answer;
              return `
                <div class="p-4 rounded-xl border ${isCorrect ? 'border-emerald-300 dark:border-emerald-950 bg-emerald-50/40 dark:bg-emerald-950/20' : 'border-rose-300 dark:border-rose-950 bg-rose-50/40 dark:bg-rose-950/20'} space-y-2 text-xs">
                  <div class="flex items-start justify-between gap-2">
                    <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      Q${idx + 1}: ${q.question}
                    </strong>
                    <span class="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${isCorrect ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'}">
                      ${isCorrect ? '✓ Correct' : '✗ Missed'}
                    </span>
                  </div>
                  <div class="space-y-1 text-zinc-600 dark:text-zinc-300">
                    <div>Your answer: <span class="font-medium ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">${userAns || 'None (Skipped)'}</span></div>
                    ${!isCorrect ? `<div>Correct answer: <span class="font-medium text-emerald-600 dark:text-emerald-400">${q.answer}</span></div>` : ''}
                  </div>
                  <p class="text-[11px] text-zinc-500 dark:text-zinc-400 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                    💡 ${q.explanation}
                  </p>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function retryQuiz() {
    startQuiz(state.quizSession?.mode || "practice");
  }

  function drillMissedQuiz() {
    if (!state.quizSession) return;
    const missed = state.quizSession.questions.filter((q, idx) => state.quizSession.userAnswers[idx] !== q.answer);
    if (missed.length > 0) {
      startQuiz(state.quizSession.mode || "practice", missed);
    }
  }

  function closeQuiz() {
    clearInterval(state.quizSession?.timerInterval);
    clearInterval(state.hintTimer);
    state.quizSession = null;
    UNIFIED_ROUTER.selectTarget("cw", state.termFocus, "cheatsheet");
  }

  // ==========================================
  // 4. GUIDE QUESTIONS & ACTIVE RECALL DRILL
  // ==========================================
  function renderStudyGuide(container) {
    const filteredGuideQuestions = CW_DATA.guideQuestions.filter(g => {
      // Category filter
      if (state.selectedGuideLesson === "Lesson 2" && !g.lesson.includes("Lesson 2")) return false;
      if (state.selectedGuideLesson === "Lesson 3" && !g.lesson.includes("Lesson 3")) return false;
      if (state.selectedGuideLesson === "midterm" && g.isMidterm === false) return false;

      // Search filter
      if (state.guideSearchQuery) {
        const q = state.guideSearchQuery.toLowerCase();
        return g.question.toLowerCase().includes(q) ||
               g.answer.toLowerCase().includes(q) ||
               g.mnemonic.toLowerCase().includes(q);
      }
      return true;
    });

    const reviewedCount = CW_DATA.guideQuestions.filter(g => state.guideReviewed[g.num]).length;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in pb-16 prose-container">
        
        <!-- Search and Filter Bar -->
        <div class="space-y-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div class="flex items-center justify-between">
            <span class="quiet-chip">ACTIVE RECALL SELF-TESTING</span>
            <span class="text-[11px] font-mono text-zinc-400">${reviewedCount}/${CW_DATA.guideQuestions.length} Reviewed</span>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <input
              type="text"
              placeholder="Search concepts, terms, definitions..."
              value="${state.guideSearchQuery}"
              oninput="CW_MODULE.onSearchGuide(this.value)"
              class="flex-1 px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
            <div class="flex items-center gap-1.5 overflow-x-auto">
              <button onclick="CW_MODULE.filterGuide('midterm')" class="px-2.5 py-1.5 rounded-lg text-xs font-mono ${state.selectedGuideLesson === 'midterm' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}">Midterm Focus</button>
              <button onclick="CW_MODULE.filterGuide('Lesson 2')" class="px-2.5 py-1.5 rounded-lg text-xs font-mono ${state.selectedGuideLesson === 'Lesson 2' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}">Lesson 2</button>
              <button onclick="CW_MODULE.filterGuide('Lesson 3')" class="px-2.5 py-1.5 rounded-lg text-xs font-mono ${state.selectedGuideLesson === 'Lesson 3' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}">Lesson 3</button>
              <button onclick="CW_MODULE.filterGuide('all')" class="px-2.5 py-1.5 rounded-lg text-xs font-mono ${state.selectedGuideLesson === 'all' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'}">All</button>
            </div>
          </div>
        </div>

        <!-- Questions List -->
        <div class="space-y-4">
          ${filteredGuideQuestions.length > 0 ? filteredGuideQuestions.map(g => {
            const isRevealed = !!state.revealedGuideAnswers[g.num];
            const isReviewed = !!state.guideReviewed[g.num];

            return `
              <div class="ios-inset-card p-4 sm:p-5 space-y-3 transition-colors ${isReviewed ? 'border-emerald-300/80 dark:border-emerald-900/60' : ''}">
                <div class="flex items-start justify-between gap-3">
                  <div class="space-y-1">
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold">${g.lesson}</span>
                    <h4 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      Q${g.num}. ${g.question}
                    </h4>
                  </div>
                  <button
                    onclick="CW_MODULE.toggleGuideReviewed(${g.num})"
                    class="p-2 rounded-lg text-xs font-mono transition-colors shrink-0 ${isReviewed ? 'bg-emerald-500 text-white' : 'border border-zinc-300 dark:border-zinc-700 text-zinc-400 hover:text-zinc-700'}"
                    title="${isReviewed ? 'Marked as Reviewed' : 'Mark as Reviewed'}"
                  >
                    ${isReviewed ? '✓ Reviewed' : 'Mark Read'}
                  </button>
                </div>

                <div class="text-[11px] font-mono text-zinc-500 italic">
                  ${g.mnemonic}
                </div>

                <!-- Answer Reveal Toggle -->
                <div class="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  ${isRevealed ? `
                    <div class="space-y-2 animate-fade-in">
                      <div class="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans border border-zinc-200/60 dark:border-zinc-800/60">
                        ${g.answer}
                      </div>
                      <button onclick="CW_MODULE.toggleGuideAnswer(${g.num})" class="text-[11px] font-mono text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                        ▲ Hide Answer
                      </button>
                    </div>
                  ` : `
                    <button onclick="CW_MODULE.toggleGuideAnswer(${g.num})" class="w-full py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300 font-semibold transition-colors">
                      ▼ Reveal Answer & Check Recall
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join('') : `
            <div class="p-8 text-center text-sm text-zinc-500">
              No questions found matching "${state.guideSearchQuery}".
            </div>
          `}
        </div>

      </div>
    `;
  }

  // ==========================================
  // CONTROLLER ACTIONS & STATE HANDLERS
  // ==========================================
  function setTermFocus(term) {
    state.termFocus = term;
    saveModuleState();
  }

  function selectIntegrationStage(stageNum) {
    state.activeIntegrationStage = stageNum;
    const container = document.getElementById("main-content");
    if (container) renderCheatSheet(container);
    UNIFIED_AUDIO.play("flip");
  }

  function filterFlashcards(unit) {
    state.selectedFlashcardUnit = unit;
    if (unit === "all") {
      state.filteredCards = [...CW_DATA.flashcards];
    } else if (unit === "midterm") {
      state.filteredCards = CW_DATA.flashcards.filter(c => c.isMidterm !== false);
    } else {
      state.filteredCards = CW_DATA.flashcards.filter(c => c.unit.includes(unit) || c.category.includes(unit));
    }
    state.currentCardIndex = 0;
    state.isCardFlipped = false;
    const container = document.getElementById("main-content");
    if (container) renderFlashcards(container);
  }

  function shuffleFlashcards() {
    for (let i = state.filteredCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.filteredCards[i], state.filteredCards[j]] = [state.filteredCards[j], state.filteredCards[i]];
    }
    state.currentCardIndex = 0;
    state.isCardFlipped = false;
    const container = document.getElementById("main-content");
    if (container) renderFlashcards(container);
    UNIFIED_AUDIO.play("flip");
  }

  function toggleFlip() {
    state.isCardFlipped = !state.isCardFlipped;
    const flipper = document.getElementById("cw-flashcard-flipper");
    if (flipper) flipper.classList.toggle("flipped", state.isCardFlipped);
    UNIFIED_AUDIO.play("flip");
  }

  function nextCard() {
    if (state.filteredCards.length === 0) return;
    state.currentCardIndex = (state.currentCardIndex + 1) % state.filteredCards.length;
    state.isCardFlipped = false;
    const container = document.getElementById("main-content");
    if (container) renderFlashcards(container);
    UNIFIED_AUDIO.play("flip");
  }

  function prevCard() {
    if (state.filteredCards.length === 0) return;
    state.currentCardIndex = (state.currentCardIndex - 1 + state.filteredCards.length) % state.filteredCards.length;
    state.isCardFlipped = false;
    const container = document.getElementById("main-content");
    if (container) renderFlashcards(container);
    UNIFIED_AUDIO.play("flip");
  }

  function markCard(isMastered) {
    const card = state.filteredCards[state.currentCardIndex];
    if (!card) return;

    state.cardMastery[card.id] = isMastered;
    saveModuleState();

    if (isMastered) {
      UNIFIED_AUDIO.play("correct");
    } else {
      UNIFIED_AUDIO.play("wrong");
    }

    nextCard();
  }

  function filterGuide(lesson) {
    state.selectedGuideLesson = lesson;
    const container = document.getElementById("main-content");
    if (container) renderStudyGuide(container);
  }

  function toggleGuideAnswer(num) {
    state.revealedGuideAnswers[num] = !state.revealedGuideAnswers[num];
    const container = document.getElementById("main-content");
    if (container) renderStudyGuide(container);
    UNIFIED_AUDIO.play("flip");
  }

  function toggleGuideReviewed(num) {
    state.guideReviewed[num] = !state.guideReviewed[num];
    saveModuleState();
    const container = document.getElementById("main-content");
    if (container) renderStudyGuide(container);
    UNIFIED_AUDIO.play("correct");
  }

  function onSearchGuide(query) {
    state.guideSearchQuery = query;
    const container = document.getElementById("main-content");
    if (container) renderStudyGuide(container);
  }

  function setQuizMode(scope) {
    state.selectedQuizScope = scope;
  }

  return {
    id: "cw",
    state,
    init,
    renderView,
    calculateReadiness,
    setTermFocus,
    selectIntegrationStage,
    filterFlashcards,
    shuffleFlashcards,
    toggleFlip,
    nextCard,
    prevCard,
    markCard,
    startQuiz,
    selectAnswer,
    toggleFlagCurrent,
    navQuiz,
    jumpQuiz,
    submitQuiz,
    closeQuiz,
    retryQuiz,
    drillMissedQuiz,
    unlockHint,
    filterGuide,
    toggleGuideAnswer,
    toggleGuideReviewed,
    onSearchGuide,
    setQuizMode
  };
})();

if (typeof window !== "undefined") {
  window.CW_MODULE = CW_MODULE;
}
