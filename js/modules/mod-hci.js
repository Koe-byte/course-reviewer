/**
 * Unified Reviewer — Course Module: IT 321 Human-Computer Interaction
 */

const HCI_MODULE = (() => {
  let state = {
    masteredCards: [],
    reviewCards: [],
    examHistory: [],
    bestScore: 0,
    selectedUnit: "all",
    selectedMastery: "all",
    currentCardIndex: 0,
    isCardFlipped: false,
    filteredCards: [],
    // Accordion state
    openAccordions: { "unit-1": true, "unit-2": false, "unit-3": false, "unit-4": false },
    // Exam state
    examSession: null,
    // Playground state
    gestaltAnswers: {},
    dialogAnswers: {},
    syllogismType: "deductive",
    syllogismResult: null
  };

  function loadModuleState() {
    try {
      const raw = localStorage.getItem("unified_hci_state");
      if (raw) {
        const parsed = JSON.parse(raw);
        state = { ...state, ...parsed };
      }
    } catch (e) {
      console.warn("Failed to load HCI state:", e);
    }
  }

  function saveModuleState() {
    try {
      localStorage.setItem("unified_hci_state", JSON.stringify({
        masteredCards: state.masteredCards,
        reviewCards: state.reviewCards,
        examHistory: state.examHistory,
        bestScore: state.bestScore,
        gestaltAnswers: state.gestaltAnswers,
        dialogAnswers: state.dialogAnswers
      }));
    } catch (e) {
      console.warn("Failed to save HCI state:", e);
    }
  }

  function calculateReadiness() {
    const totalCards = HCI_DATA.flashcards.length;
    const masteredCount = state.masteredCards.length;
    const flashcardScore = (masteredCount / totalCards) * 40;

    let examScore = 0;
    if (state.examHistory.length > 0) {
      const latest = state.examHistory[state.examHistory.length - 1].scorePct;
      examScore = ((state.bestScore * 0.7) + (latest * 0.3)) * 0.6;
    }

    return Math.min(100, Math.max(0, Math.round(flashcardScore + examScore)));
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
    filterFlashcards();
  }

  function renderView(tabId, container) {
    switch (tabId) {
      case "knowledge":
        renderKnowledgeHub(container);
        break;
      case "flashcards":
        renderFlashcards(container);
        break;
      case "exam":
        renderExam(container);
        break;
      case "playground":
        renderPlayground(container);
        break;
      default:
        renderKnowledgeHub(container);
    }
  }

  // --- 1. KNOWLEDGE HUB (UNITS 1–4 ACCORDIONS) ---
  function renderKnowledgeHub(container) {
    container.innerHTML = `
      <div class="space-y-6 animate-fade-in">
        <!-- Header Ribbon -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span class="text-xs font-mono uppercase text-zinc-500 font-semibold">CICS Academic Curriculum</span>
            <h2 class="text-xl sm:text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
              IT 321 Knowledge Hub
            </h2>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="HCI_MODULE.toggleAllAccordions(true)" class="px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              Expand All
            </button>
            <button onclick="HCI_MODULE.toggleAllAccordions(false)" class="px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              Collapse All
            </button>
          </div>
        </div>

        <!-- Accordions List -->
        <div class="space-y-4">
          ${HCI_DATA.units.map(unit => renderUnitAccordionHTML(unit)).join('')}
        </div>
      </div>
    `;
  }

  function renderUnitAccordionHTML(unit) {
    const isOpen = !!state.openAccordions[unit.id];

    return `
      <div class="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 overflow-hidden transition-all shadow-sm">
        <!-- Accordion Header -->
        <button
          onclick="HCI_MODULE.toggleAccordion('${unit.id}')"
          class="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
        >
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">${unit.number}</span>
              <h3 class="text-base sm:text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100">${unit.title}</h3>
            </div>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 sm:line-clamp-none">${unit.summary}</p>
          </div>
          <span class="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-mono text-xs text-zinc-600 dark:text-zinc-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}">
            ▼
          </span>
        </button>

        <!-- Accordion Body -->
        ${isOpen ? `
          <div class="p-5 sm:p-6 pt-0 space-y-6 border-t border-zinc-200 dark:border-zinc-800 animate-fade-in text-xs sm:text-sm">
            
            <!-- Key Concepts Grid -->
            <div class="space-y-3 pt-4">
              <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">Core Concepts & Principles</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${unit.keyConcepts.map(kc => `
                  <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <div class="flex items-center justify-between">
                      <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm">${kc.term}</strong>
                      <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-medium">${kc.badge}</span>
                    </div>
                    <p class="text-xs text-zinc-700 dark:text-zinc-300 font-medium">${kc.definition}</p>
                    <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed whitespace-pre-line">${kc.details}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Timeline (Unit 1) -->
            ${unit.timeline ? `
              <div class="space-y-3 pt-2">
                <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">Historical Evolution Paradigm</h4>
                <div class="space-y-3 pl-2">
                  ${unit.timeline.map(t => `
                    <div class="v-timeline-item space-y-1">
                      <div class="v-timeline-dot"></div>
                      <div class="flex items-center gap-2">
                        <strong class="font-mono text-xs text-zinc-900 dark:text-zinc-100">${t.era}: ${t.title}</strong>
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">${t.focus}</span>
                      </div>
                      <p class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">${t.description}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Adoption Model (Unit 1) -->
            ${unit.adoptionModel ? `
              <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm">${unit.adoptionModel.title}</h4>
                  <span class="text-[10px] font-mono text-zinc-500">${unit.adoptionModel.creator}</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                  ${unit.adoptionModel.groups.map(g => `
                    <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-1">
                      <div class="flex items-center justify-between">
                        <strong class="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-[11px]">${g.name}</strong>
                        <span class="font-mono text-[10px] text-zinc-500">${g.share}</span>
                      </div>
                      <p class="text-[11px] text-zinc-600 dark:text-zinc-400 leading-snug">${g.description}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Comparison Table (Unit 2) -->
            ${unit.comparisonTable ? `
              <div class="space-y-3 pt-2">
                <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">Human vs. Computer Information Processing</h4>
                <div class="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <table class="w-full text-left text-xs">
                    <thead class="bg-zinc-100 dark:bg-zinc-800/60 font-mono text-[11px] uppercase tracking-wider text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
                      <tr>
                        <th class="py-2.5 px-3.5">Aspect</th>
                        <th class="py-2.5 px-3.5">Human Brain</th>
                        <th class="py-2.5 px-3.5">Digital Computer</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                      ${unit.comparisonTable.map(row => `
                        <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                          <td class="py-2.5 px-3.5 font-mono font-semibold text-zinc-900 dark:text-zinc-100">${row.aspect}</td>
                          <td class="py-2.5 px-3.5 leading-relaxed">${row.human}</td>
                          <td class="py-2.5 px-3.5 leading-relaxed">${row.computer}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            ` : ''}

            <!-- Reasoning Types (Unit 3) -->
            ${unit.reasoningTypes ? `
              <div class="space-y-3 pt-2">
                <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">Reasoning Taxonomies & Logical Evaluation</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                  ${unit.reasoningTypes.map(rt => `
                    <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                      <div class="flex items-center justify-between">
                        <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm">${rt.type}</strong>
                        <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">${rt.direction}</span>
                      </div>
                      <p class="text-xs text-zinc-500 dark:text-zinc-400">${rt.description}</p>
                      <div class="space-y-2 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                        ${rt.subtypes.map(st => `
                          <div class="space-y-0.5">
                            <strong class="text-[11px] font-mono font-bold text-zinc-800 dark:text-zinc-200 block">${st.name}</strong>
                            <p class="text-[11px] text-zinc-600 dark:text-zinc-400 leading-snug">${st.desc}</p>
                            <span class="text-[10px] font-mono text-zinc-500 italic block">${st.example}</span>
                          </div>
                        `).join('')}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Gestalt Principles (Unit 3) -->
            ${unit.gestaltPrinciples ? `
              <div class="space-y-3 pt-2">
                <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">6 Gestalt Principles of Visual Perception</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  ${unit.gestaltPrinciples.map(gp => `
                    <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                      <div class="flex items-center justify-between">
                        <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm">${gp.name}</strong>
                        <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">${gp.slogan}</span>
                      </div>
                      <p class="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">${gp.definition}</p>
                      <div class="p-2 rounded bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-[11px] text-zinc-500 dark:text-zinc-400">
                        <strong>Case Study:</strong> ${gp.caseStudy} — ${gp.caseDetails}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Dialog Styles (Unit 4) -->
            ${unit.dialogStyles ? `
              <div class="space-y-3 pt-2">
                <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">4 HCI Interaction & Dialog Styles</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  ${unit.dialogStyles.map(ds => `
                    <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                      <div class="flex items-center justify-between">
                        <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm">${ds.name}</strong>
                        <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">${ds.tagline}</span>
                      </div>
                      <div class="space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
                        <div><strong class="text-emerald-600 dark:text-emerald-400">+ Strengths:</strong> ${ds.strengths}</div>
                        <div><strong class="text-rose-600 dark:text-rose-400">- Weaknesses:</strong> ${ds.weaknesses}</div>
                        <div><strong class="text-zinc-700 dark:text-zinc-300">Ideal For:</strong> ${ds.goodUse}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

          </div>
        ` : ''}
      </div>
    `;
  }

  function toggleAccordion(unitId) {
    state.openAccordions[unitId] = !state.openAccordions[unitId];
    const container = document.getElementById("main-content");
    if (container) renderView("knowledge", container);
  }

  function toggleAllAccordions(open) {
    HCI_DATA.units.forEach(u => state.openAccordions[u.id] = open);
    const container = document.getElementById("main-content");
    if (container) renderView("knowledge", container);
  }

  // --- 2. FLASHCARDS ENGINE ---
  function filterFlashcards(unit = state.selectedUnit, mastery = state.selectedMastery) {
    state.selectedUnit = unit;
    state.selectedMastery = mastery;

    state.filteredCards = HCI_DATA.flashcards.filter(c => {
      const matchUnit = unit === "all" || c.unit === unit;
      let matchMastery = true;
      if (mastery === "mastered") matchMastery = state.masteredCards.includes(c.id);
      if (mastery === "review") matchMastery = state.reviewCards.includes(c.id);
      if (mastery === "unrated") matchMastery = !state.masteredCards.includes(c.id) && !state.reviewCards.includes(c.id);
      return matchUnit && matchMastery;
    });

    state.currentCardIndex = 0;
    state.isCardFlipped = false;
  }

  function renderFlashcards(container) {
    const card = state.filteredCards[state.currentCardIndex];
    const total = state.filteredCards.length;
    const currentNum = total > 0 ? state.currentCardIndex + 1 : 0;
    const isMastered = card ? state.masteredCards.includes(card.id) : false;
    const isReview = card ? state.reviewCards.includes(card.id) : false;

    container.innerHTML = `
      <div class="space-y-6 max-w-2xl mx-auto animate-fade-in">
        <!-- Controls Header -->
        <div class="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div class="flex items-center gap-1.5 flex-wrap">
            <button onclick="HCI_MODULE.onFilterCards('all', '${state.selectedMastery}')" class="px-2 py-1 rounded text-xs font-medium ${state.selectedUnit === 'all' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">All (36)</button>
            <button onclick="HCI_MODULE.onFilterCards('unit-1', '${state.selectedMastery}')" class="px-2 py-1 rounded text-xs font-medium ${state.selectedUnit === 'unit-1' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Unit 1</button>
            <button onclick="HCI_MODULE.onFilterCards('unit-2', '${state.selectedMastery}')" class="px-2 py-1 rounded text-xs font-medium ${state.selectedUnit === 'unit-2' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Unit 2</button>
            <button onclick="HCI_MODULE.onFilterCards('unit-3', '${state.selectedMastery}')" class="px-2 py-1 rounded text-xs font-medium ${state.selectedUnit === 'unit-3' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Unit 3</button>
            <button onclick="HCI_MODULE.onFilterCards('unit-4', '${state.selectedMastery}')" class="px-2 py-1 rounded text-xs font-medium ${state.selectedUnit === 'unit-4' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Unit 4</button>
          </div>
          <button onclick="HCI_MODULE.shuffleCards()" class="px-2.5 py-1 rounded text-xs font-mono font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            🔀 Shuffle
          </button>
        </div>

        <!-- Progress Line -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Card ${currentNum} of ${total}</span>
            <span>${state.masteredCards.length} / ${HCI_DATA.flashcards.length} Mastered</span>
          </div>
          <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div class="bg-zinc-900 dark:bg-zinc-100 h-full rounded-full transition-all duration-300" style="width: ${total > 0 ? (currentNum / total) * 100 : 0}%"></div>
          </div>
        </div>

        <!-- 3D Card Stage -->
        ${card ? `
          <div class="perspective-1000">
            <div
              id="hci-flashcard-flipper"
              onclick="HCI_MODULE.toggleFlip()"
              class="flashcard ${state.isCardFlipped ? 'flipped' : ''} cursor-pointer select-none"
              style="min-height: 280px;"
            >
              <div class="flashcard-inner transform-style-3d relative w-full h-full" style="min-height: 280px;">
                <!-- Front Face -->
                <div class="flashcard-front backface-hidden absolute inset-0 p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold">${card.category}</span>
                    <span class="text-xs font-mono text-zinc-400">Click or Space to flip</span>
                  </div>
                  <div class="my-auto py-4 text-center">
                    <h3 class="text-lg sm:text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      ${card.question}
                    </h3>
                  </div>
                  <div class="text-center text-[11px] font-mono text-zinc-500">
                    Press Space to view answer
                  </div>
                </div>

                <!-- Back Face -->
                <div class="flashcard-back backface-hidden rotate-y-180 absolute inset-0 p-6 sm:p-8 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 shadow-sm flex flex-col justify-between">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 dark:bg-zinc-200 text-zinc-300 dark:text-zinc-700 font-semibold">${card.category}</span>
                    <span class="text-xs font-mono opacity-60">Verified Answer</span>
                  </div>
                  <div class="my-auto py-4">
                    <p class="text-sm sm:text-base leading-relaxed text-zinc-200 dark:text-zinc-800">
                      ${card.answer}
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
          <div class="p-12 text-center text-zinc-500">No flashcards match the current filter.</div>
        `}

        <!-- Bottom Controls -->
        <div class="flex items-center justify-between gap-3 pt-2">
          <button onclick="HCI_MODULE.prevCard()" class="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            ◀ Prev
          </button>
          <div class="flex items-center gap-2">
            <button onclick="HCI_MODULE.markCard(false)" class="px-3.5 py-2.5 rounded-xl text-xs font-medium border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100 transition-colors">
              ⟳ Still Learning
            </button>
            <button onclick="HCI_MODULE.markCard(true)" class="px-3.5 py-2.5 rounded-xl text-xs font-medium border border-emerald-300 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors">
              ★ Mastered
            </button>
          </div>
          <button onclick="HCI_MODULE.nextCard()" class="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Next ▶
          </button>
        </div>

        <div class="text-center text-[11px] font-mono text-zinc-400">
          Hotkeys: <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">Space</kbd> Flip • <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">←</kbd> <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">→</kbd> Nav • <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">1</kbd> Learning • <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">2</kbd> Mastered
        </div>
      </div>
    `;
  }

  function onFilterCards(unit, mastery) {
    filterFlashcards(unit, mastery);
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
    const flipper = document.getElementById("hci-flashcard-flipper");
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
      state.reviewCards = state.reviewCards.filter(id => id !== card.id);
      UNIFIED_AUDIO.play("correct");
    } else {
      if (!state.reviewCards.includes(card.id)) state.reviewCards.push(card.id);
      state.masteredCards = state.masteredCards.filter(id => id !== card.id);
      UNIFIED_AUDIO.play("wrong");
    }

    saveModuleState();
    nextCard();
  }

  // --- 3. EXAM SIMULATOR (41 ITEMS / 100 POINTS) ---
  function renderExam(container) {
    if (!state.examSession) {
      renderExamLanding(container);
    } else if (state.examSession.isFinished) {
      renderExamResults(container);
    } else {
      renderExamActive(container);
    }
  }

  function renderExamLanding(container) {
    container.innerHTML = `
      <div class="max-w-xl mx-auto space-y-6 text-center animate-fade-in py-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <span>🎯</span> 41 ITEMS • 100 TOTAL POINTS
          </div>
          <h2 class="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            IT 321 Prelim Examination Simulator
          </h2>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Covers Part I: Analysis (20 items, 40 pts) and Part II: Application (21 items, 60 pts) with BatStateU transmutation grading (1.00–5.00).
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
          <div class="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 flex flex-col justify-between">
            <div class="space-y-1">
              <span class="text-xs font-mono text-zinc-500 font-semibold">Study Mode</span>
              <h4 class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-base">Instant Feedback</h4>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Untimed practice with instant rationale cards and learning notes displayed after selecting an option.
              </p>
            </div>
            <button onclick="HCI_MODULE.startExam('study')" class="w-full py-2.5 rounded-xl text-xs font-semibold bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors">
              Start Study Mode
            </button>
          </div>

          <div class="p-5 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 space-y-3 flex flex-col justify-between shadow-sm">
            <div class="space-y-1">
              <span class="text-xs font-mono opacity-60 font-semibold">Test Mode</span>
              <h4 class="font-serif font-bold text-base">Timed Simulation</h4>
              <p class="text-xs opacity-80 leading-relaxed">
                45:00 countdown timer, question flagging, and comprehensive grade report upon submission.
              </p>
            </div>
            <button onclick="HCI_MODULE.startExam('timed')" class="w-full py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white hover:opacity-90 transition-opacity">
              Begin Prelim Exam (45:00)
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderExamActive(container) {
    const s = state.examSession;
    const q = s.questions[s.currentIndex];
    const isAnswered = s.userAnswers[s.currentIndex] !== undefined;
    const selectedIdx = s.userAnswers[s.currentIndex];
    const isFlagged = !!s.flagged[s.currentIndex];

    const minutes = Math.floor(s.timeRemaining / 60);
    const seconds = s.timeRemaining % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <!-- Top Header -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">${q.part}</span>
            <span class="text-xs font-mono text-zinc-500">Item ${s.currentIndex + 1} of ${s.questions.length} • ${q.points} Pts</span>
          </div>
          <div class="flex items-center gap-3">
            ${s.mode === 'timed' ? `
              <span class="text-xs font-mono font-bold ${s.timeRemaining < 300 ? 'text-rose-500 animate-pulse' : 'text-zinc-700 dark:text-zinc-300'}">
                ⏱ ${timeStr}
              </span>
            ` : ''}
            <button onclick="HCI_MODULE.toggleFlagCurrent()" class="p-1.5 rounded-lg border ${isFlagged ? 'border-amber-500 bg-amber-500/20 text-amber-500' : 'border-zinc-300 dark:border-zinc-700 text-zinc-400'} text-xs font-mono transition-colors">
              🚩 Flag
            </button>
          </div>
        </div>

        <!-- Question Body -->
        <div class="space-y-4">
          <h3 class="text-base sm:text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug whitespace-pre-line">
            ${q.question}
          </h3>

          <!-- Options List -->
          <div class="space-y-2.5">
            ${q.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isCorrect = idx === q.correctIndex;
              const isSelected = selectedIdx === idx;

              let btnStyle = "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 text-zinc-800 dark:text-zinc-200";

              if (s.mode === 'study' && isAnswered) {
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
                  onclick="HCI_MODULE.selectAnswer(${idx})"
                  class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${btnStyle}"
                >
                  <span class="w-6 h-6 rounded-lg font-mono text-xs flex items-center justify-center flex-shrink-0 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">${letter}</span>
                  <span class="flex-1 leading-relaxed">${opt}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Study Mode Explanation -->
          ${s.mode === 'study' && isAnswered ? `
            <div class="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs animate-fade-in">
              <strong class="font-mono text-zinc-900 dark:text-zinc-100 block font-semibold">💡 Textbook Explanation</strong>
              <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">${q.explanation}</p>
            </div>
          ` : ''}
        </div>

        <!-- 41-Cell Tracker Grid & Nav -->
        <div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
          <div class="flex items-center justify-between">
            <button onclick="HCI_MODULE.navExam(-1)" ${s.currentIndex === 0 ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium disabled:opacity-40">
              ◀ Prev
            </button>
            <div class="flex items-center gap-1 flex-wrap justify-center max-w-md">
              ${s.questions.map((_, idx) => {
                const ans = s.userAnswers[idx];
                const flg = s.flagged[idx];
                const isCurr = idx === s.currentIndex;
                let bg = "bg-zinc-200 dark:bg-zinc-800 text-zinc-500";
                if (ans !== undefined) bg = "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900";
                if (flg) bg += " ring-2 ring-amber-500";
                if (isCurr) bg += " ring-2 ring-zinc-500";
                return `
                  <button onclick="HCI_MODULE.jumpExam(${idx})" class="w-5 h-5 rounded text-[10px] font-mono font-bold flex items-center justify-center ${bg}">
                    ${idx + 1}
                  </button>
                `;
              }).join('')}
            </div>
            ${s.currentIndex === s.questions.length - 1 ? `
              <button onclick="HCI_MODULE.submitExam()" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold">
                Submit Exam ✓
              </button>
            ` : `
              <button onclick="HCI_MODULE.navExam(1)" class="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium">
                Next ▶
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function renderExamResults(container) {
    const s = state.examSession;
    let earnedPoints = 0;
    let totalPoints = 0;

    s.questions.forEach((q, idx) => {
      totalPoints += q.points;
      if (s.userAnswers[idx] === q.correctIndex) {
        earnedPoints += q.points;
      }
    });

    const scorePct = Math.round((earnedPoints / totalPoints) * 100);
    const grade = getBatStateUGrade(scorePct);

    container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6 animate-fade-in py-4">
        <!-- Results Banner -->
        <div class="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
          <span class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">IT 321 Prelim Examination Scorecard</span>
          <div class="text-5xl sm:text-6xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            ${scorePct}%
          </div>
          <div class="text-xs font-mono text-zinc-500">
            ${earnedPoints.toFixed(1)} / ${totalPoints.toFixed(1)} Raw Points (${s.questions.filter((q, idx) => s.userAnswers[idx] === q.correctIndex).length} of ${s.questions.length} Items)
          </div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-bold ${grade.color}">
            BatStateU Equivalent: ${grade.grade} • ${grade.desc}
          </div>
        </div>

        <div class="flex items-center justify-center gap-3">
          <button onclick="HCI_MODULE.startExam(HCI_MODULE.state.examSession.mode)" class="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90">
            🔄 Retake Exam
          </button>
          <button onclick="HCI_MODULE.closeExam()" class="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800">
            Knowledge Hub
          </button>
        </div>

        <!-- Detailed Review -->
        <div class="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <h4 class="text-sm font-mono uppercase tracking-wider text-zinc-500 font-semibold">Question Breakdown</h4>
          <div class="space-y-4">
            ${s.questions.map((q, idx) => {
              const userAnsIdx = s.userAnswers[idx];
              const isCorrect = userAnsIdx === q.correctIndex;
              return `
                <div class="p-4 rounded-xl border ${isCorrect ? 'border-emerald-300 dark:border-emerald-950 bg-emerald-50/40 dark:bg-emerald-950/20' : 'border-rose-300 dark:border-rose-950 bg-rose-50/40 dark:bg-rose-950/20'} space-y-2 text-xs">
                  <div class="flex items-start justify-between gap-2">
                    <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      Item ${idx + 1} (${q.part}): ${q.question}
                    </strong>
                    <span class="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${isCorrect ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'}">
                      ${isCorrect ? `+${q.points} Pts` : '0 Pts'}
                    </span>
                  </div>
                  <div class="space-y-1 text-zinc-600 dark:text-zinc-300">
                    <div>Your answer: <span class="font-medium ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">${userAnsIdx !== undefined ? q.options[userAnsIdx] : 'None (Skipped)'}</span></div>
                    ${!isCorrect ? `<div>Correct answer: <span class="font-medium text-emerald-600 dark:text-emerald-400">${q.options[q.correctIndex]}</span></div>` : ''}
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

  function startExam(mode) {
    const shuffledQuestions = [...HCI_DATA.examQuestions].map(q => {
      const optsWithIdx = q.options.map((opt, idx) => ({ opt, originalIdx: idx }));
      for (let i = optsWithIdx.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optsWithIdx[i], optsWithIdx[j]] = [optsWithIdx[j], optsWithIdx[i]];
      }
      const newCorrectIdx = optsWithIdx.findIndex(item => item.originalIdx === q.correctIndex);
      return { ...q, options: optsWithIdx.map(item => item.opt), correctIndex: newCorrectIdx };
    });

    state.examSession = {
      mode,
      questions: shuffledQuestions,
      currentIndex: 0,
      userAnswers: {},
      flagged: {},
      timeRemaining: 2700, // 45 mins
      timerInterval: null,
      isFinished: false
    };

    if (mode === "timed") {
      state.examSession.timerInterval = setInterval(() => {
        if (!state.examSession || state.examSession.isFinished) {
          clearInterval(state.examSession?.timerInterval);
          return;
        }
        state.examSession.timeRemaining--;
        if (state.examSession.timeRemaining <= 0) {
          clearInterval(state.examSession.timerInterval);
          submitExam();
        } else {
          const container = document.getElementById("main-content");
          if (container) renderView("exam", container);
        }
      }, 1000);
    }

    const container = document.getElementById("main-content");
    if (container) renderView("exam", container);
    UNIFIED_AUDIO.play("flip");
  }

  function selectAnswer(optIdx) {
    if (!state.examSession || state.examSession.isFinished) return;
    state.examSession.userAnswers[state.examSession.currentIndex] = optIdx;
    const q = state.examSession.questions[state.examSession.currentIndex];

    if (optIdx === q.correctIndex) {
      UNIFIED_AUDIO.play("correct");
    } else {
      UNIFIED_AUDIO.play("wrong");
    }

    const container = document.getElementById("main-content");
    if (container) renderView("exam", container);
  }

  function toggleFlagCurrent() {
    if (!state.examSession) return;
    const idx = state.examSession.currentIndex;
    state.examSession.flagged[idx] = !state.examSession.flagged[idx];
    const container = document.getElementById("main-content");
    if (container) renderView("exam", container);
  }

  function navExam(delta) {
    if (!state.examSession) return;
    state.examSession.currentIndex = Math.max(0, Math.min(state.examSession.questions.length - 1, state.examSession.currentIndex + delta));
    const container = document.getElementById("main-content");
    if (container) renderView("exam", container);
    UNIFIED_AUDIO.play("flip");
  }

  function jumpExam(idx) {
    if (!state.examSession) return;
    state.examSession.currentIndex = idx;
    const container = document.getElementById("main-content");
    if (container) renderView("exam", container);
    UNIFIED_AUDIO.play("flip");
  }

  function submitExam() {
    if (!state.examSession) return;
    clearInterval(state.examSession.timerInterval);
    state.examSession.isFinished = true;

    let earnedPoints = 0;
    let totalPoints = 0;
    state.examSession.questions.forEach((q, idx) => {
      totalPoints += q.points;
      if (state.examSession.userAnswers[idx] === q.correctIndex) {
        earnedPoints += q.points;
      }
    });

    const scorePct = Math.round((earnedPoints / totalPoints) * 100);
    state.examHistory.push({
      date: new Date().toLocaleDateString(),
      mode: state.examSession.mode,
      earnedPoints,
      totalPoints,
      scorePct
    });

    if (scorePct > state.bestScore) state.bestScore = scorePct;
    saveModuleState();

    if (scorePct >= 75) {
      UNIFIED_AUDIO.play("celebrate");
      triggerConfetti();
    }

    const container = document.getElementById("main-content");
    if (container) renderView("exam", container);
  }

  function closeExam() {
    state.examSession = null;
    UNIFIED_ROUTER.switchTab("knowledge");
  }

  // --- 4. LOGIC LAB PLAYGROUND ---
  function renderPlayground(container) {
    container.innerHTML = `
      <div class="space-y-10 animate-fade-in">
        <div class="space-y-1 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <span class="text-xs font-mono uppercase text-zinc-500 font-semibold">Interactive Laboratory</span>
          <h2 class="text-xl sm:text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            HCI Logic Lab & Principle Matchers
          </h2>
          <p class="text-xs text-zinc-500 dark:text-zinc-400">Apply Gestalt perception rules, classify interaction dialog scenarios, and validate syllogistic reasoning.</p>
        </div>

        <!-- Section A: Gestalt Logo Matcher -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">1. Gestalt Logo Principle Matcher</h3>
              <p class="text-xs text-zinc-500">Identify which Gestalt visual perception rule is engineered into each famous brand logo.</p>
            </div>
            <button onclick="HCI_MODULE.resetGestalt()" class="px-2.5 py-1 rounded text-xs font-mono border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">Reset</button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            ${HCI_DATA.gestaltPlaygroundItems.map(item => {
              const userPick = state.gestaltAnswers[item.id];
              const isDone = userPick !== undefined;
              const isCorrect = userPick === item.correctPrinciple;

              return `
                <div class="p-4 rounded-xl border ${isDone ? (isCorrect ? 'border-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20' : 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20') : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60'} space-y-3">
                  <div>
                    <strong class="text-sm font-serif font-bold text-zinc-900 dark:text-zinc-100 block">${item.name}</strong>
                    <span class="text-[11px] font-mono text-zinc-500">${item.logoLabel}</span>
                  </div>
                  <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-snug">${item.description}</p>
                  
                  <div class="space-y-1.5 pt-1">
                    <label class="text-[10px] font-mono uppercase text-zinc-500 block">Select Principle:</label>
                    <select
                      onchange="HCI_MODULE.matchGestalt('${item.id}', this.value)"
                      ${isDone ? 'disabled' : ''}
                      class="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none"
                    >
                      <option value="">-- Choose Principle --</option>
                      ${["Continuation", "Closure", "Similarity", "Proximity", "Symmetry", "Figure and Ground"].map(p => `
                        <option value="${p}" ${userPick === p ? 'selected' : ''}>${p}</option>
                      `).join('')}
                    </select>
                  </div>

                  ${isDone ? `
                    <div class="text-[11px] font-mono font-bold ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}">
                      ${isCorrect ? '✓ Correct Principle!' : `✗ Incorrect (Correct: ${item.correctPrinciple})`}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Section B: Dialog Style Matcher -->
        <div class="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">2. HCI Dialog Style Scenario Matcher</h3>
              <p class="text-xs text-zinc-500">Pick the best interaction style (CLI, Menu-Based, Form-Filling, GUI) for real-world applications.</p>
            </div>
            <button onclick="HCI_MODULE.resetDialog()" class="px-2.5 py-1 rounded text-xs font-mono border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">Reset</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            ${HCI_DATA.dialogStyleMatcherItems.map(item => {
              const userPick = state.dialogAnswers[item.id];
              const isDone = userPick !== undefined;
              const isCorrect = userPick === item.correctStyle;

              return `
                <div class="p-4 rounded-xl border ${isDone ? (isCorrect ? 'border-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20' : 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20') : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60'} space-y-2.5">
                  <p class="text-xs text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">${item.scenario}</p>
                  
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                    ${["Command Line (CLI)", "Menu-Based", "Form-Filling", "Graphical User Interface (GUI)"].map(style => {
                      const isSelected = userPick === style;
                      let btnCls = "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300";
                      if (isSelected) {
                        btnCls = isCorrect ? "bg-emerald-600 text-white border-emerald-600" : "bg-rose-600 text-white border-rose-600";
                      }
                      return `
                        <button
                          onclick="HCI_MODULE.matchDialog('${item.id}', '${style}')"
                          ${isDone ? 'disabled' : ''}
                          class="p-2 rounded-lg border text-[11px] font-mono font-semibold transition-all ${btnCls}"
                        >
                          ${style.split(' ')[0]}
                        </button>
                      `;
                    }).join('')}
                  </div>

                  ${isDone ? `
                    <p class="text-[11px] text-zinc-500 dark:text-zinc-400 pt-1">
                      💡 ${item.rationale}
                    </p>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Section C: Syllogism Validator -->
        <div class="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div>
            <h3 class="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">3. Syllogism & Reasoning Evaluation Sandbox</h3>
            <p class="text-xs text-zinc-500">Test argument structures across Deductive (Valid/Sound), Inductive (Strong/Cogent), and Abductive frameworks.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="text-xs font-mono text-zinc-500 block mb-1">Premise 1</label>
              <input type="text" id="hci-syl-p1" placeholder="e.g. All dogs can talk." class="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none" />
            </div>
            <div>
              <label class="text-xs font-mono text-zinc-500 block mb-1">Premise 2</label>
              <input type="text" id="hci-syl-p2" placeholder="e.g. Pomeranian is a dog." class="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none" />
            </div>
            <div>
              <label class="text-xs font-mono text-zinc-500 block mb-1">Conclusion</label>
              <input type="text" id="hci-syl-c" placeholder="e.g. Therefore, Pomeranian can talk." class="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none" />
            </div>
          </div>

          <div class="flex items-center justify-between gap-2 pt-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono text-zinc-500">Framework:</span>
              <select id="hci-syl-framework" class="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100">
                <option value="deductive">Deductive (Validity & Soundness)</option>
                <option value="inductive">Inductive (Strength & Cogency)</option>
                <option value="abductive">Abductive (Best Explanation)</option>
              </select>
            </div>
            <button onclick="HCI_MODULE.validateSyllogism()" class="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold">
              Analyze Argument ➔
            </button>
          </div>

          <div id="hci-syl-result-box" class="p-4 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1.5 ${state.syllogismResult ? '' : 'hidden'}">
            ${state.syllogismResult || ''}
          </div>
        </div>
      </div>
    `;
  }

  function matchGestalt(id, value) {
    if (!value) return;
    state.gestaltAnswers[id] = value;
    const item = HCI_DATA.gestaltPlaygroundItems.find(i => i.id === id);
    if (item && value === item.correctPrinciple) {
      UNIFIED_AUDIO.play("correct");
    } else {
      UNIFIED_AUDIO.play("wrong");
    }
    saveModuleState();
    const container = document.getElementById("main-content");
    if (container) renderView("playground", container);
  }

  function resetGestalt() {
    state.gestaltAnswers = {};
    saveModuleState();
    const container = document.getElementById("main-content");
    if (container) renderView("playground", container);
  }

  function matchDialog(id, value) {
    state.dialogAnswers[id] = value;
    const item = HCI_DATA.dialogStyleMatcherItems.find(i => i.id === id);
    if (item && value === item.correctStyle) {
      UNIFIED_AUDIO.play("correct");
    } else {
      UNIFIED_AUDIO.play("wrong");
    }
    saveModuleState();
    const container = document.getElementById("main-content");
    if (container) renderView("playground", container);
  }

  function resetDialog() {
    state.dialogAnswers = {};
    saveModuleState();
    const container = document.getElementById("main-content");
    if (container) renderView("playground", container);
  }

  function validateSyllogism() {
    const p1 = document.getElementById("hci-syl-p1")?.value || "";
    const p2 = document.getElementById("hci-syl-p2")?.value || "";
    const c = document.getElementById("hci-syl-c")?.value || "";
    const fw = document.getElementById("hci-syl-framework")?.value || "deductive";

    if (!p1 || !p2 || !c) {
      alert("Please fill in Premise 1, Premise 2, and the Conclusion.");
      return;
    }

    let resultHTML = "";
    if (fw === "deductive") {
      resultHTML = `
        <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">Deductive Syllogism Analysis:</strong>
        <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">
          • <strong>Structural Validity:</strong> An argument is structurally <em>Valid</em> if the conclusion is logically unavoidable whenever the premises are assumed true.<br>
          • <strong>Soundness Check:</strong> An argument is <em>Sound</em> only if it is structurally Valid AND both premises are factually true in empirical reality.
        </p>
      `;
    } else if (fw === "inductive") {
      resultHTML = `
        <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">Inductive Argument Analysis:</strong>
        <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">
          • <strong>Strength:</strong> Evaluates the statistical or probabilistic likelihood of the conclusion given the premise evidence.<br>
          • <strong>Cogency:</strong> A strong inductive argument whose premises are all empirically verified to be factually true.
        </p>
      `;
    } else {
      resultHTML = `
        <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">Abductive Reasoning Analysis:</strong>
        <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">
          • <strong>Inference to Best Explanation:</strong> Evaluates whether the conclusion forms the most plausible hypothesis explaining the symptoms or observations in Premise 1 and 2.
        </p>
      `;
    }

    state.syllogismResult = resultHTML;
    const box = document.getElementById("hci-syl-result-box");
    if (box) {
      box.innerHTML = resultHTML;
      box.classList.remove("hidden");
    }
    UNIFIED_AUDIO.play("correct");
  }

  return {
    id: "hci",
    tabs: [
      { id: "knowledge", name: "Knowledge Hub" },
      { id: "flashcards", name: "Flashcards" },
      { id: "exam", name: "Exam Simulator" },
      { id: "playground", name: "Logic Lab" }
    ],
    state,
    init,
    renderView,
    calculateReadiness,
    toggleAccordion,
    toggleAllAccordions,
    onFilterCards,
    shuffleCards,
    toggleFlip,
    nextCard,
    prevCard,
    markCard,
    startExam,
    selectAnswer,
    toggleFlagCurrent,
    navExam,
    jumpExam,
    submitExam,
    closeExam,
    matchGestalt,
    resetGestalt,
    matchDialog,
    resetDialog,
    validateSyllogism
  };
})();

if (typeof window !== "undefined") {
  window.HCI_MODULE = HCI_MODULE;
}
