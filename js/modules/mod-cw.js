/**
 * Unified Reviewer — Course Module: GEd 104 The Contemporary World
 */

const CW_MODULE = (() => {
  let state = {
    masteredCards: [],
    learningCards: [],
    quizHistory: [],
    bestScore: 0,
    selectedUnit: "all",
    searchQuery: "",
    currentCardIndex: 0,
    isCardFlipped: false,
    filteredCards: [],
    // Quiz state
    quizSession: null
  };

  function loadModuleState() {
    try {
      const raw = localStorage.getItem("unified_cw_state");
      if (raw) {
        const parsed = JSON.parse(raw);
        state = { ...state, ...parsed };
      }
    } catch (e) {
      console.warn("Failed to load CW state:", e);
    }
  }

  function saveModuleState() {
    try {
      localStorage.setItem("unified_cw_state", JSON.stringify({
        masteredCards: state.masteredCards,
        learningCards: state.learningCards,
        quizHistory: state.quizHistory,
        bestScore: state.bestScore
      }));
    } catch (e) {
      console.warn("Failed to save CW state:", e);
    }
  }

  function calculateReadiness() {
    const totalCards = CW_DATA.flashcards.length;
    const masteredCount = state.masteredCards.length;
    const flashcardScore = (masteredCount / totalCards) * 40;

    let quizScore = 0;
    if (state.quizHistory.length > 0) {
      const latest = state.quizHistory[state.quizHistory.length - 1].scorePct;
      quizScore = ((state.bestScore * 0.7) + (latest * 0.3)) * 0.6;
    }

    return Math.min(100, Math.max(0, Math.round(flashcardScore + quizScore)));
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
    state.filteredCards = [...CW_DATA.flashcards];
  }

  function renderView(tabId, container) {
    switch (tabId) {
      case "overview":
        renderOverview(container);
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
        renderOverview(container);
    }
  }

  // --- 1. OVERVIEW VIEW ---
  function renderOverview(container) {
    const readiness = calculateReadiness();
    const masteredCount = state.masteredCards.length;
    const totalCards = CW_DATA.flashcards.length;
    const bestGrade = state.quizHistory.length > 0 ? getBatStateUGrade(state.bestScore) : null;

    container.innerHTML = `
      <div class="space-y-8 animate-fade-in">
        <!-- Readiness Hero Card -->
        <div class="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div class="space-y-2 max-w-xl">
              <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                PRELIMINARY EXAM READINESS INDEX
              </div>
              <h2 class="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Units 1 & 2 Academic Mastery
              </h2>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Calculated from active recall flashcard retention (40%) and timed preliminary examination diagnostic performance (60%).
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row items-baseline md:items-end gap-3 md:text-right">
              <div class="text-5xl sm:text-6xl font-serif font-extrabold text-zinc-900 dark:text-zinc-100">
                ${readiness}%
              </div>
              <span class="text-xs font-mono uppercase text-zinc-500 dark:text-zinc-400">
                ${readiness >= 75 ? "Exam Ready" : "In Progress"}
              </span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden mt-6">
            <div class="bg-zinc-900 dark:bg-zinc-100 h-full rounded-full transition-all duration-700" style="width: ${readiness}%"></div>
          </div>
        </div>

        <!-- Metrics Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span class="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-medium">Flashcards Mastered</span>
            <div class="text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
              ${masteredCount} <span class="text-sm font-sans font-normal text-zinc-500">/ ${totalCards}</span>
            </div>
            <p class="text-[11px] text-zinc-500 dark:text-zinc-400">${Math.round((masteredCount / totalCards) * 100)}% active recall retention</p>
          </div>

          <div class="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span class="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-medium">Exam Simulator Attempts</span>
            <div class="text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
              ${state.quizHistory.length}
            </div>
            <p class="text-[11px] text-zinc-500 dark:text-zinc-400">High score: ${state.bestScore}%</p>
          </div>

          <div class="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <span class="text-xs font-mono text-zinc-500 dark:text-zinc-400 font-medium">Grade Equivalent</span>
            <div class="text-2xl font-serif font-bold ${bestGrade ? bestGrade.color : 'text-zinc-400'}">
              ${bestGrade ? bestGrade.grade : '—'}
            </div>
            <p class="text-[11px] text-zinc-500 dark:text-zinc-400">${bestGrade ? bestGrade.desc : 'Complete an exam simulation'}</p>
          </div>
        </div>

        <!-- Scope Launchers -->
        <div class="space-y-4">
          <h3 class="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
            Preliminary Examination Scope
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Unit 1 Card -->
            <div class="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">Weeks 1–2</span>
                  <span class="text-xs font-mono text-zinc-500">13 Cards</span>
                </div>
                <h4 class="text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100">
                  Unit 1: Introduction to Globalization
                </h4>
                <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Steger's definition, IMF economic view, Silk Road, 6 Enablers, 4 Characteristics, 5 Historical Periods, 6 Dimensions, 5 Claims, and 8 Roman Catholic Principles.
                </p>
              </div>
              <div class="flex items-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <button onclick="UNIFIED_ROUTER.switchTab('guide'); CW_MODULE.filterGuideUnit('unit1')" class="flex-1 py-2 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                  Study Guide
                </button>
                <button onclick="UNIFIED_ROUTER.switchTab('flashcards'); CW_MODULE.filterFlashcards('Unit 1')" class="flex-1 py-2 rounded-lg text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                  Flashcards
                </button>
              </div>
            </div>

            <!-- Unit 2 Card -->
            <div class="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">Weeks 3–5</span>
                  <span class="text-xs font-mono text-zinc-500">12 Cards</span>
                </div>
                <h4 class="text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100">
                  Unit 2: The Structures of Globalization
                </h4>
                <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Comparative Advantage, Gold Standard, Bretton Woods System, 3 Exchange Regimes, Trade Policies (TIDA, TIFA, WTO), Outsourcing, Golden Straitjacket, and 7 Stages of Integration.
                </p>
              </div>
              <div class="flex items-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <button onclick="UNIFIED_ROUTER.switchTab('guide'); CW_MODULE.filterGuideUnit('unit2')" class="flex-1 py-2 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                  Study Guide
                </button>
                <button onclick="UNIFIED_ROUTER.switchTab('flashcards'); CW_MODULE.filterFlashcards('Unit 2')" class="flex-1 py-2 rounded-lg text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                  Flashcards
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Attempts -->
        ${state.quizHistory.length > 0 ? `
          <div class="space-y-3">
            <h3 class="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
              Recent Exam Simulations
            </h3>
            <div class="divide-y divide-zinc-200 dark:divide-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
              ${state.quizHistory.slice(-3).reverse().map(h => {
                const g = getBatStateUGrade(h.scorePct);
                return `
                  <div class="p-4 flex items-center justify-between text-xs">
                    <div>
                      <strong class="text-zinc-900 dark:text-zinc-100 block font-medium">${h.date} • ${h.mode === 'timed' ? '⏱ Timed' : '💡 Practice'}</strong>
                      <span class="text-zinc-500 dark:text-zinc-400">${h.correct} / ${h.total} (${h.scorePct}%)</span>
                    </div>
                    <div class="text-right">
                      <span class="font-mono font-bold ${g.color}">${g.grade}</span>
                      <span class="text-[10px] text-zinc-500 block">${g.desc.split('•')[0]}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  // --- 2. STUDY GUIDE VIEW ---
  function renderStudyGuide(container) {
    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <!-- Sub-header with Search and Unit Filter -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div class="relative flex-1">
            <input
              type="text"
              id="cw-guide-search"
              placeholder="Search topics, terms, theories..."
              value="${state.searchQuery}"
              oninput="CW_MODULE.onSearch(this.value)"
              class="w-full px-3.5 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>
          <div class="flex items-center gap-1.5 overflow-x-auto">
            <button onclick="CW_MODULE.filterGuideUnit('all')" class="guide-unit-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${state.selectedUnit === 'all' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">All Units</button>
            <button onclick="CW_MODULE.filterGuideUnit('unit1')" class="guide-unit-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${state.selectedUnit === 'unit1' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Unit 1</button>
            <button onclick="CW_MODULE.filterGuideUnit('unit2')" class="guide-unit-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${state.selectedUnit === 'unit2' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Unit 2</button>
          </div>
        </div>

        <!-- Render Content -->
        <div id="cw-guide-content-area" class="space-y-10">
          ${renderGuideTopicsHTML()}
        </div>
      </div>
    `;
  }

  function renderGuideTopicsHTML() {
    const unitsToRender = state.selectedUnit === "all" ? ["unit1", "unit2"] : [state.selectedUnit];
    let html = "";

    unitsToRender.forEach(unitKey => {
      const u = CW_DATA.studyGuide[unitKey];
      if (!u) return;

      const filteredTopics = u.topics.filter(t => {
        if (!state.searchQuery) return true;
        const q = state.searchQuery.toLowerCase();
        return t.topicTitle.toLowerCase().includes(q) ||
               t.description.toLowerCase().includes(q) ||
               JSON.stringify(t).toLowerCase().includes(q);
      });

      if (filteredTopics.length === 0) return;

      html += `
        <div class="space-y-6">
          <div class="pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <span class="text-xs font-mono uppercase text-zinc-500 font-semibold">${u.weeks}</span>
            <h3 class="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100">${u.title}</h3>
          </div>
          <div class="space-y-8">
            ${filteredTopics.map(topic => renderTopicCardHTML(topic)).join('')}
          </div>
        </div>
      `;
    });

    return html || `<div class="p-8 text-center text-sm text-zinc-500">No matching topics found for "${state.searchQuery}".</div>`;
  }

  function renderTopicCardHTML(topic) {
    let bodyHTML = "";

    if (topic.type === "concept-cards") {
      bodyHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          ${topic.cards.map(c => `
            <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <div class="flex items-center justify-between">
                <h5 class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm">${c.title}</h5>
                <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-medium">${c.badge}</span>
              </div>
              <p class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">${c.body}</p>
            </div>
          `).join('')}
        </div>
      `;
    } else if (topic.type === "enumeration") {
      bodyHTML = `
        <div class="space-y-2.5">
          ${topic.items.map(it => `
            <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
              <strong class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block font-mono">${it.title}</strong>
              <p class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">${it.detail}</p>
            </div>
          `).join('')}
        </div>
      `;
    } else if (topic.type === "timeline") {
      bodyHTML = `
        <div class="space-y-3 pl-2">
          ${topic.items.map(it => `
            <div class="v-timeline-item space-y-1">
              <div class="v-timeline-dot"></div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">${it.era}</span>
                <span class="text-[11px] font-mono text-zinc-500">(${it.dates})</span>
              </div>
              <p class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">${it.summary}</p>
              <span class="inline-block text-[11px] font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">💡 ${it.highlight}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else if (topic.type === "comparison") {
      bodyHTML = `
        <div class="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <table class="w-full text-left text-xs">
            <thead class="bg-zinc-100 dark:bg-zinc-800/60 font-mono text-[11px] uppercase tracking-wider text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th class="py-2.5 px-3.5">Dimension</th>
                <th class="py-2.5 px-3.5">${topic.col1Title}</th>
                <th class="py-2.5 px-3.5">${topic.col2Title}</th>
                ${topic.col3Title ? `<th class="py-2.5 px-3.5">${topic.col3Title}</th>` : ''}
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              ${topic.dimensions.map(d => `
                <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td class="py-2.5 px-3.5 font-mono font-semibold text-zinc-900 dark:text-zinc-100">${d.dim}</td>
                  <td class="py-2.5 px-3.5 leading-relaxed">${d.col1}</td>
                  <td class="py-2.5 px-3.5 leading-relaxed">${d.col2}</td>
                  ${d.col3 ? `<td class="py-2.5 px-3.5 leading-relaxed">${d.col3}</td>` : ''}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (topic.type === "tree") {
      bodyHTML = `
        <div class="space-y-3">
          ${topic.branches.map(b => `
            <div class="tree-branch space-y-1">
              <strong class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block font-mono">${b.name}</strong>
              <p class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">${b.desc}</p>
              ${b.example ? `<span class="text-[11px] text-zinc-500 italic block">Example: ${b.example}</span>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    } else if (topic.type === "flow") {
      bodyHTML = `
        <div class="space-y-2">
          ${topic.steps.map(s => `
            <div class="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 font-mono text-[10px] flex items-center justify-center font-bold text-zinc-800 dark:text-zinc-200">${s.step}</span>
                <strong class="text-xs font-semibold text-zinc-900 dark:text-zinc-100">${s.title}</strong>
              </div>
              <div class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed pl-7">${s.text}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    return `
      <div class="p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <div class="space-y-1">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <h4 class="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">${topic.topicTitle}</h4>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">${topic.approachBadge}</span>
          </div>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">${topic.description}</p>
        </div>
        ${bodyHTML}
      </div>
    `;
  }

  // --- 3. FLASHCARDS VIEW ---
  function renderFlashcards(container) {
    const card = state.filteredCards[state.currentCardIndex] || state.filteredCards[0];
    const total = state.filteredCards.length;
    const currentNum = total > 0 ? state.currentCardIndex + 1 : 0;
    const isMastered = card ? state.masteredCards.includes(card.id) : false;
    const isLearning = card ? state.learningCards.includes(card.id) : false;

    container.innerHTML = `
      <div class="space-y-6 max-w-2xl mx-auto animate-fade-in">
        <!-- Controls Header -->
        <div class="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div class="flex items-center gap-1.5">
            <button onclick="CW_MODULE.filterFlashcards('all')" class="flashcard-filter-btn px-2.5 py-1 rounded text-xs font-medium ${state.selectedUnit === 'all' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">All (25)</button>
            <button onclick="CW_MODULE.filterFlashcards('Unit 1')" class="flashcard-filter-btn px-2.5 py-1 rounded text-xs font-medium ${state.selectedUnit === 'Unit 1' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Unit 1 (13)</button>
            <button onclick="CW_MODULE.filterFlashcards('Unit 2')" class="flashcard-filter-btn px-2.5 py-1 rounded text-xs font-medium ${state.selectedUnit === 'Unit 2' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Unit 2 (12)</button>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="CW_MODULE.shuffleFlashcards()" class="px-2.5 py-1 rounded text-xs font-mono font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              🔀 Shuffle
            </button>
          </div>
        </div>

        <!-- Progress Indicator -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Card ${currentNum} of ${total}</span>
            <span>${state.masteredCards.length} Mastered (${Math.round((state.masteredCards.length / CW_DATA.flashcards.length) * 100)}%)</span>
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
              style="min-height: 280px;"
            >
              <div class="flashcard-inner transform-style-3d relative w-full h-full" style="min-height: 280px;">
                <!-- Front Face -->
                <div class="flashcard-front backface-hidden absolute inset-0 p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold">${card.unit} • ${card.typeBadge}</span>
                    <span class="text-xs font-mono text-zinc-400">Click or Space to flip</span>
                  </div>
                  <div class="my-auto py-4 text-center">
                    <h3 class="text-lg sm:text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      ${card.front}
                    </h3>
                  </div>
                  <div class="text-center text-[11px] font-mono text-zinc-500 italic">
                    💡 Hint: ${card.hint}
                  </div>
                </div>

                <!-- Back Face -->
                <div class="flashcard-back backface-hidden rotate-y-180 absolute inset-0 p-6 sm:p-8 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 shadow-sm flex flex-col justify-between">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 dark:bg-zinc-200 text-zinc-300 dark:text-zinc-700 font-semibold">${card.typeBadge}</span>
                    <span class="text-xs font-mono opacity-60">Answer</span>
                  </div>
                  <div class="my-auto py-4">
                    <p class="text-sm sm:text-base leading-relaxed whitespace-pre-line text-zinc-200 dark:text-zinc-800">
                      ${card.back}
                    </p>
                  </div>
                  <div class="text-center text-[11px] font-mono opacity-60">
                    Click to flip back
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : `
          <div class="p-12 text-center text-zinc-500">No cards available in this filter.</div>
        `}

        <!-- Actions -->
        <div class="flex items-center justify-between gap-3 pt-2">
          <button onclick="CW_MODULE.prevCard()" class="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            ◀ Prev
          </button>
          <div class="flex items-center gap-2">
            <button onclick="CW_MODULE.markCard(false)" class="px-3.5 py-2.5 rounded-xl text-xs font-medium border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100 transition-colors">
              ⟳ Still Learning
            </button>
            <button onclick="CW_MODULE.markCard(true)" class="px-3.5 py-2.5 rounded-xl text-xs font-medium border border-emerald-300 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors">
              ★ Mastered
            </button>
          </div>
          <button onclick="CW_MODULE.nextCard()" class="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Next ▶
          </button>
        </div>

        <div class="text-center text-[11px] font-mono text-zinc-400">
          Keyboard: <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">Space</kbd> Flip • <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">←</kbd> <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">→</kbd> Nav • <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">1</kbd> Learning • <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">2</kbd> Mastered
        </div>
      </div>
    `;
  }

  // --- 4. EXAM SIMULATOR VIEW ---
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
    container.innerHTML = `
      <div class="max-w-xl mx-auto space-y-6 text-center animate-fade-in py-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <span>🎯</span> 15 COMPREHENSIVE PRELIM ITEMS
          </div>
          <h2 class="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            Preliminary Examination Simulator
          </h2>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Test your knowledge across Unit 1 and Unit 2 with randomized multiple choice items, BatStateU grading transmutation, and in-depth rationales.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
          <div class="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 flex flex-col justify-between">
            <div class="space-y-1">
              <span class="text-xs font-mono text-zinc-500 font-semibold">Mode 1</span>
              <h4 class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-base">Practice Mode</h4>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Untimed session with immediate answer validation and detailed textbook explanations after each question.
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
                25-minute strict countdown timer, question flagging, and comprehensive diagnostic report upon completion.
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
      <div class="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <!-- Top Bar -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">${q.unit}</span>
            <span class="text-xs font-mono text-zinc-500">Question ${s.currentIndex + 1} of ${s.questions.length}</span>
          </div>
          <div class="flex items-center gap-3">
            ${s.mode === 'timed' ? `
              <span class="text-xs font-mono font-bold ${s.timeRemaining < 300 ? 'text-rose-500 animate-pulse' : 'text-zinc-700 dark:text-zinc-300'}">
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

          <!-- Options -->
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

          <!-- Practice Mode Explanation -->
          ${s.mode === 'practice' && isAnswered ? `
            <div class="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs animate-fade-in">
              <strong class="font-mono text-zinc-900 dark:text-zinc-100 block font-semibold">💡 Textbook Explanation</strong>
              <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">${q.explanation}</p>
            </div>
          ` : ''}
        </div>

        <!-- Question Nav Grid -->
        <div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
          <div class="flex items-center justify-between">
            <button onclick="CW_MODULE.navQuiz(-1)" ${s.currentIndex === 0 ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium disabled:opacity-40">
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
              <button onclick="CW_MODULE.submitQuiz()" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold">
                Finish ✓
              </button>
            ` : `
              <button onclick="CW_MODULE.navQuiz(1)" class="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium">
                Next ▶
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function renderQuizResults(container) {
    const s = state.quizSession;
    let correctCount = 0;
    s.questions.forEach((q, idx) => {
      if (s.userAnswers[idx] === q.answer) correctCount++;
    });

    const scorePct = Math.round((correctCount / s.questions.length) * 100);
    const grade = getBatStateUGrade(scorePct);

    container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6 animate-fade-in py-4">
        <!-- Results Banner -->
        <div class="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
          <span class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">Preliminary Diagnostic Assessment</span>
          <div class="text-5xl sm:text-6xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            ${scorePct}%
          </div>
          <div class="text-xs font-mono text-zinc-500">
            ${correctCount} of ${s.questions.length} Questions Correct
          </div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-bold ${grade.color}">
            BatStateU Equivalent: ${grade.grade} • ${grade.desc}
          </div>
        </div>

        <div class="flex items-center justify-center gap-3">
          <button onclick="CW_MODULE.startQuiz(CW_MODULE.state.quizSession.mode)" class="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90">
            🔄 Retake Exam
          </button>
          <button onclick="CW_MODULE.closeQuiz()" class="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800">
            Back to Overview
          </button>
        </div>

        <!-- Question Review -->
        <div class="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <h4 class="text-sm font-mono uppercase tracking-wider text-zinc-500 font-semibold">Detailed Question Review</h4>
          <div class="space-y-4">
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
                      ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
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

  // --- CONTROLLER ACTIONS ---
  function filterGuideUnit(unit) {
    state.selectedUnit = unit;
    const container = document.getElementById("main-content");
    if (container) renderView("guide", container);
  }

  function onSearch(query) {
    state.searchQuery = query;
    const container = document.getElementById("main-content");
    if (container) renderView("guide", container);
  }

  function filterFlashcards(unit) {
    state.selectedUnit = unit;
    if (unit === "all") {
      state.filteredCards = [...CW_DATA.flashcards];
    } else {
      state.filteredCards = CW_DATA.flashcards.filter(c => c.unit === unit);
    }
    state.currentCardIndex = 0;
    state.isCardFlipped = false;
    const container = document.getElementById("main-content");
    if (container) renderView("flashcards", container);
  }

  function shuffleFlashcards() {
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
    const flipper = document.getElementById("cw-flashcard-flipper");
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

    if (isMastered) {
      if (!state.masteredCards.includes(card.id)) state.masteredCards.push(card.id);
      state.learningCards = state.learningCards.filter(id => id !== card.id);
      UNIFIED_AUDIO.play("correct");
    } else {
      if (!state.learningCards.includes(card.id)) state.learningCards.push(card.id);
      state.masteredCards = state.masteredCards.filter(id => id !== card.id);
      UNIFIED_AUDIO.play("wrong");
    }

    saveModuleState();
    nextCard();
  }

  function startQuiz(mode) {
    const shuffledQuestions = [...CW_DATA.quizQuestions].map(q => {
      const shuffledOpts = [...q.options];
      for (let i = shuffledOpts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOpts[i], shuffledOpts[j]] = [shuffledOpts[j], shuffledOpts[i]];
      }
      return { ...q, options: shuffledOpts };
    });

    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }

    state.quizSession = {
      mode,
      questions: shuffledQuestions,
      currentIndex: 0,
      userAnswers: {},
      flagged: {},
      timeRemaining: 1500, // 25 mins
      timerInterval: null,
      isFinished: false
    };

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
          const container = document.getElementById("main-content");
          if (container) renderView("quiz", container);
        }
      }, 1000);
    }

    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
    UNIFIED_AUDIO.play("flip");
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
    state.quizSession.currentIndex = Math.max(0, Math.min(state.quizSession.questions.length - 1, state.quizSession.currentIndex + delta));
    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
    UNIFIED_AUDIO.play("flip");
  }

  function jumpQuiz(idx) {
    if (!state.quizSession) return;
    state.quizSession.currentIndex = idx;
    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
    UNIFIED_AUDIO.play("flip");
  }

  function submitQuiz() {
    if (!state.quizSession) return;
    clearInterval(state.quizSession.timerInterval);
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

  function closeQuiz() {
    state.quizSession = null;
    UNIFIED_ROUTER.switchTab("overview");
  }

  return {
    id: "cw",
    tabs: [
      { id: "overview", name: "Overview" },
      { id: "guide", name: "Study Guide" },
      { id: "flashcards", name: "Flashcards" },
      { id: "quiz", name: "Exam Simulator" }
    ],
    state,
    init,
    renderView,
    calculateReadiness,
    filterGuideUnit,
    onSearch,
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
    closeQuiz
  };
})();

if (typeof window !== "undefined") {
  window.CW_MODULE = CW_MODULE;
}
