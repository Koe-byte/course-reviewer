/**
 * UNIFIED REVIEWER — CORE APPLICATION CONTROLLER & ROUTER
 * Handles multi-course routing, procedural audio synthesis, theme toggling,
 * keyboard accessibility, and centralized state orchestration.
 */

// ==========================================
// 1. PROCEDURAL WEB AUDIO SYNTHESIZER
// ==========================================
const UNIFIED_AUDIO = (() => {
  let audioCtx = null;

  function getContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function play(type) {
    try {
      const ctx = getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      if (type === "flip") {
        // Soft tactile card flip sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.06);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "correct") {
        // Ascending 2-tone melodic chime (E5 -> B5)
        const notes = [659.25, 987.77];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteTime = now + (idx * 0.08);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, noteTime);
          gain.gain.setValueAtTime(0.12, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(noteTime);
          osc.stop(noteTime + 0.18);
        });
      } else if (type === "wrong") {
        // Low tactile buzz drop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.16);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === "celebrate") {
        // 4-tone triumphant arpeggio (C5 -> E5 -> G5 -> C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteTime = now + (idx * 0.09);
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, noteTime);
          gain.gain.setValueAtTime(0.15, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(noteTime);
          osc.stop(noteTime + 0.35);
        });
      }
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }

  return { play };
})();

// ==========================================
// 2. CANVAS CONFETTI PARTICLE EMITTER
// ==========================================
function triggerConfetti() {
  const canvas = document.createElement("canvas");
  canvas.id = "confetti-canvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  const particles = [];
  const colors = ["#09090b", "#71717a", "#e4e4e7", "#10b981", "#3b82f6", "#f59e0b", "#ec4899"];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.6 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 14,
      vy: -(Math.random() * 12 + 6),
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  let animFrame;
  const startTime = Date.now();

  function render() {
    const elapsed = Date.now() - startTime;
    if (elapsed > 2400) {
      cancelAnimationFrame(animFrame);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.rotSpeed;
      p.opacity = Math.max(0, 1 - (elapsed / 2400));

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    animFrame = requestAnimationFrame(render);
  }

  animFrame = requestAnimationFrame(render);
}

// ==========================================
// 3. UNIFIED ROUTER & STATE CONTROLLER
// ==========================================
const UNIFIED_ROUTER = (() => {
  const modules = {
    cw: CW_MODULE,
    hci: HCI_MODULE,
    mobcom: MOBCOM_MODULE
  };

  const courseMeta = {
    cw: {
      code: "GEd 104",
      title: "The Contemporary World",
      shortTitle: "Contemporary World",
      monogram: "CW",
      badge: "General Education",
      desc: "Comprehensive review covering Globalization Dimensions, Global Economy, Politics, Global Divides, and Regionalism.",
      units: "Units 1 & 2 • 5 Modules",
      tags: ["Globalization", "Market Integration", "UN & Global Governance", "Global Divides"],
      flashcardsCount: 25,
      questionsCount: 15
    },
    hci: {
      code: "IT 321",
      title: "Human-Computer Interaction",
      shortTitle: "HCI & UI/UX",
      monogram: "HCI",
      badge: "Professional Major",
      desc: "Complete syllabus mastery covering Human Memory & Senses, Interaction Frameworks, Gestalt Laws, Logic Syllogisms, and Dialog Styles.",
      units: "Units 1, 2, 3 & 4 • Full Syllabus",
      tags: ["Cognitive Models", "Gestalt Psychology", "Norman's Execution Cycle", "Golden Rules"],
      flashcardsCount: 36,
      questionsCount: 41
    },
    mobcom: {
      code: "CS 312",
      title: "Mobile Computing",
      shortTitle: "Mobile Computing",
      monogram: "MC",
      badge: "Core Computing",
      desc: "Cellular architectures, GSM/HLR/VLR call flow trace, 1G-5G generation matrix, handovers, and 12 official guide questions.",
      units: "Units 1–4 • Cellular & Wireless",
      tags: ["Cellular Arch & Handovers", "HLR / VLR / MSC Call Trace", "1G–5G Matrix", "Guide Questions"],
      flashcardsCount: 24,
      questionsCount: 20
    }
  };

  let currentCourse = null;
  let currentTab = null;

  function init() {
    // 1. Initialize all sub-modules
    Object.values(modules).forEach(mod => {
      if (typeof mod.init === 'function') mod.init();
    });

    // 2. Setup theme from localStorage
    initTheme();

    // 3. Setup Keyboard Shortcuts
    setupKeyboardShortcuts();

    // 4. Handle initial URL route or default to selector
    handleRouteFromHash();

    // 5. Listen to Hash changes
    window.addEventListener("hashchange", () => {
      handleRouteFromHash();
    });
  }

  function handleRouteFromHash() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    if (!hash) {
      backToCourses(false);
      return;
    }

    const parts = hash.split("/");
    const courseId = parts[0];
    const tabId = parts[1] || null;

    if (modules[courseId]) {
      selectCourse(courseId, tabId, false);
    } else {
      backToCourses(false);
    }
  }

  function selectCourse(courseId, tabId = null, updateHash = true) {
    if (!modules[courseId]) return;

    currentCourse = courseId;
    const mod = modules[courseId];
    const meta = courseMeta[courseId];

    // Determine target tab
    if (!tabId || !mod.tabs.some(t => t.id === tabId)) {
      tabId = mod.tabs[0].id;
    }
    currentTab = tabId;

    // Update Header UI
    updateHeaderForCourse(courseId, meta, mod.tabs, tabId);

    // Update Mobile Dock
    updateMobileDock(courseId, mod.tabs, tabId);

    // Show Content View, Hide Course Selector View
    const selectorView = document.getElementById("course-selector-view");
    const mainContent = document.getElementById("main-content");
    if (selectorView) selectorView.classList.add("hidden");
    if (mainContent) mainContent.classList.remove("hidden");

    // Render active tab view
    mod.renderView(tabId, mainContent);

    // Update Hash
    if (updateHash) {
      window.location.hash = `${courseId}/${tabId}`;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function switchTab(tabId) {
    if (!currentCourse || !modules[currentCourse]) return;

    const mod = modules[currentCourse];
    if (!mod.tabs.some(t => t.id === tabId)) return;

    currentTab = tabId;

    // Update Desktop Tabs highlight
    document.querySelectorAll(".course-nav-btn").forEach(btn => {
      const isTarget = btn.getAttribute("data-tab") === tabId;
      btn.className = `course-nav-btn px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
        isTarget
          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      }`;
    });

    // Update Mobile Dock highlight
    document.querySelectorAll(".mobile-dock-btn").forEach(btn => {
      const isTarget = btn.getAttribute("data-tab") === tabId;
      btn.className = `mobile-dock-btn flex-1 py-2 text-center text-xs font-mono font-semibold transition-colors ${
        isTarget
          ? "text-zinc-900 dark:text-zinc-100 border-t-2 border-zinc-900 dark:border-zinc-100"
          : "text-zinc-500 dark:text-zinc-400"
      }`;
    });

    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mod.renderView(tabId, mainContent);
    }

    window.location.hash = `${currentCourse}/${tabId}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToCourses(updateHash = true) {
    currentCourse = null;
    currentTab = null;

    // Reset Header
    resetHeader();

    // Reset Mobile Dock
    const mobileDock = document.getElementById("mobile-dock");
    if (mobileDock) {
      mobileDock.innerHTML = `
        <div class="py-2.5 text-center text-xs font-mono text-zinc-500">
          Select a course above to begin reviewing
        </div>
      `;
    }

    // Hide Main Content, Show Selector
    const selectorView = document.getElementById("course-selector-view");
    const mainContent = document.getElementById("main-content");
    if (mainContent) mainContent.classList.add("hidden");
    if (selectorView) {
      selectorView.classList.remove("hidden");
      renderCourseSelector(selectorView);
    }

    if (updateHash) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateHeaderForCourse(courseId, meta, tabs, activeTabId) {
    const backBtn = document.getElementById("header-back-btn");
    if (backBtn) backBtn.classList.remove("hidden");

    const brandMonogram = document.getElementById("header-monogram");
    if (brandMonogram) brandMonogram.textContent = meta.monogram;

    const brandTitle = document.getElementById("header-brand-title");
    if (brandTitle) brandTitle.textContent = `${meta.code} • ${meta.shortTitle}`;

    const brandSub = document.getElementById("header-brand-sub");
    if (brandSub) brandSub.textContent = meta.badge;

    // Render tabs in desktop nav
    const tabsContainer = document.getElementById("header-desktop-tabs");
    if (tabsContainer) {
      tabsContainer.innerHTML = tabs.map(tab => {
        const isActive = tab.id === activeTabId;
        return `
          <button
            data-tab="${tab.id}"
            onclick="UNIFIED_ROUTER.switchTab('${tab.id}')"
            class="course-nav-btn px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              isActive
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }"
          >
            ${tab.name}
          </button>
        `;
      }).join('');
    }
  }

  function resetHeader() {
    const backBtn = document.getElementById("header-back-btn");
    if (backBtn) backBtn.classList.add("hidden");

    const brandMonogram = document.getElementById("header-monogram");
    if (brandMonogram) brandMonogram.textContent = "3Y";

    const brandTitle = document.getElementById("header-brand-title");
    if (brandTitle) brandTitle.textContent = "BatStateU 3rd Year Reviewer Suite";

    const brandSub = document.getElementById("header-brand-sub");
    if (brandSub) brandSub.textContent = "Centralized Academic Mastery Hub";

    const tabsContainer = document.getElementById("header-desktop-tabs");
    if (tabsContainer) {
      tabsContainer.innerHTML = `
        <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500 py-1.5 px-3">
          3 Courses Available • 100% Exam-Aligned
        </span>
      `;
    }
  }

  function updateMobileDock(courseId, tabs, activeTabId) {
    const mobileDock = document.getElementById("mobile-dock");
    if (!mobileDock) return;

    mobileDock.innerHTML = `
      <div class="flex items-center justify-around w-full">
        <button
          onclick="UNIFIED_ROUTER.backToCourses()"
          class="flex-1 py-2 text-center text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          ← All
        </button>
        ${tabs.map(tab => {
          const isActive = tab.id === activeTabId;
          return `
            <button
              data-tab="${tab.id}"
              onclick="UNIFIED_ROUTER.switchTab('${tab.id}')"
              class="mobile-dock-btn flex-1 py-2 text-center text-xs font-mono font-semibold transition-colors ${
                isActive
                  ? 'text-zinc-900 dark:text-zinc-100 border-t-2 border-zinc-900 dark:border-zinc-100'
                  : 'text-zinc-500 dark:text-zinc-400'
              }"
            >
              ${tab.name}
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderCourseSelector(container) {
    const cwScore = CW_MODULE.calculateReadiness();
    const hciScore = HCI_MODULE.calculateReadiness();
    const mobcomScore = MOBCOM_MODULE.calculateReadiness();

    const overallAvg = Math.round((cwScore + hciScore + mobcomScore) / 3);

    container.innerHTML = `
      <div class="space-y-10 animate-fade-in max-w-5xl mx-auto pb-12">
        
        <!-- Hero Banner -->
        <div class="p-8 sm:p-10 rounded-3xl bg-zinc-900 text-white dark:bg-zinc-900 dark:border dark:border-zinc-800 shadow-xl relative overflow-hidden">
          <div class="absolute -right-16 -top-16 w-64 h-64 bg-zinc-800 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          <div class="relative z-10 max-w-2xl space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              BatStateU Midterm & Final Reviewer
            </div>
            
            <h1 class="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
              Centralized Academic Reviewer
            </h1>
            
            <p class="text-sm text-zinc-300 leading-relaxed">
              Consolidated 3rd-year coursework review platform styled with minimal monochrome aesthetics. Practice interactive 3D flashcards, take timed exam simulations, and explore visual cheat sheets with zero clutter.
            </p>

            <div class="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400">
              <div class="flex items-center gap-2">
                <span class="text-white font-bold text-base">3</span> Courses
              </div>
              <div class="w-px h-4 bg-zinc-700"></div>
              <div class="flex items-center gap-2">
                <span class="text-white font-bold text-base">85</span> Flashcards
              </div>
              <div class="w-px h-4 bg-zinc-700"></div>
              <div class="flex items-center gap-2">
                <span class="text-white font-bold text-base">76</span> Exam Questions
              </div>
              <div class="w-px h-4 bg-zinc-700"></div>
              <div class="flex items-center gap-2">
                <span class="text-emerald-400 font-bold text-base">${overallAvg}%</span> Suite Readiness
              </div>
            </div>
          </div>
        </div>

        <!-- Course Cards Grid -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-serif font-bold text-zinc-900 dark:text-zinc-100">
              Select a Course Reviewer
            </h2>
            <span class="text-xs font-mono text-zinc-500">
              Click any card to launch module
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <!-- 1. CW Card -->
            ${renderCourseCard(
              'cw',
              courseMeta.cw,
              cwScore,
              [
                { label: 'Flashcards', val: '25 Cards' },
                { label: 'Exam Bank', val: '15 Questions' },
                { label: 'Syllabus', val: 'Units 1 & 2' }
              ]
            )}

            <!-- 2. HCI Card -->
            ${renderCourseCard(
              'hci',
              courseMeta.hci,
              hciScore,
              [
                { label: 'Flashcards', val: '36 Cards' },
                { label: 'Exam Bank', val: '41 Qs (100 Pts)' },
                { label: 'Interactive', val: 'Logic & Gestalt Lab' }
              ]
            )}

            <!-- 3. MobCom Card -->
            ${renderCourseCard(
              'mobcom',
              courseMeta.mobcom,
              mobcomScore,
              [
                { label: 'Flashcards', val: '24 Cards' },
                { label: 'Mock Exam', val: '20 Questions' },
                { label: 'Interactive', val: 'HLR/VLR Call Trace' }
              ]
            )}

          </div>
        </div>

        <!-- Suite Features & Quick Study Tips -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs">
          <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">⌨️ Keyboard Ergonomics</strong>
            <p class="text-zinc-500 dark:text-zinc-400">Use <kbd class="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-[10px]">Space</kbd> to flip flashcards, <kbd class="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-[10px]">←</kbd> <kbd class="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-[10px]">→</kbd> to navigate, and <kbd class="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-[10px]">1</kbd>/<kbd class="px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded font-mono text-[10px]">2</kbd> to mark mastery.</p>
          </div>
          <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">🖨️ Clean Print-Ready</strong>
            <p class="text-zinc-500 dark:text-zinc-400">Export high-density study guides directly to PDF or paper using standard browser print with optimized monochrome formatting.</p>
          </div>
          <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <strong class="font-mono text-zinc-900 dark:text-zinc-100 block">💾 Persistent Local Progress</strong>
            <p class="text-zinc-500 dark:text-zinc-400">Mastery statuses, practice exams, and interactive sandboxes persist securely in your browser's LocalStorage.</p>
          </div>
        </div>

      </div>
    `;
  }

  function renderCourseCard(courseId, meta, scorePct, stats) {
    const isCompleted = scorePct >= 80;
    return `
      <div
        onclick="UNIFIED_ROUTER.selectCourse('${courseId}')"
        class="group cursor-pointer rounded-2xl p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all duration-300 hover:shadow-lg flex flex-col justify-between space-y-6"
      >
        <div class="space-y-4">
          <!-- Top Row -->
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center font-mono font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              ${meta.monogram}
            </div>
            <span class="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
              ${meta.code}
            </span>
          </div>

          <!-- Title & Desc -->
          <div class="space-y-1">
            <h3 class="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              ${meta.title}
            </h3>
            <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
              ${meta.desc}
            </p>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5">
            ${meta.tags.map(t => `
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-50 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
                ${t}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Bottom Stats & Readiness Bar -->
        <div class="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-zinc-500 dark:text-zinc-400">Exam Readiness</span>
              <span class="font-bold ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-zinc-100'}">
                ${scorePct}%
              </span>
            </div>
            <div class="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div class="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-500" style="width: ${scorePct}%"></div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/40 p-2 rounded-xl">
            ${stats.map(s => `
              <div>
                <div class="font-bold text-zinc-800 dark:text-zinc-200">${s.val}</div>
                <div class="text-[9px] text-zinc-400">${s.label}</div>
              </div>
            `).join('')}
          </div>

          <div class="flex items-center justify-between text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 pt-1 group-hover:translate-x-0.5 transition-transform">
            <span>Open Reviewer</span>
            <span>→</span>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 4. KEYBOARD SHORTCUTS
  // ==========================================
  function setupKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      // Don't trigger if user is typing in an input/textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (!currentCourse || !modules[currentCourse]) return;

      const mod = modules[currentCourse];

      // Flashcards Shortcuts
      if (currentTab === "flashcards") {
        if (e.code === "Space") {
          e.preventDefault();
          if (typeof mod.toggleFlip === 'function') mod.toggleFlip();
        } else if (e.code === "ArrowRight") {
          e.preventDefault();
          if (typeof mod.nextCard === 'function') mod.nextCard();
        } else if (e.code === "ArrowLeft") {
          e.preventDefault();
          if (typeof mod.prevCard === 'function') mod.prevCard();
        } else if (e.key === "1") {
          e.preventDefault();
          if (typeof mod.markCard === 'function') mod.markCard(false);
        } else if (e.key === "2") {
          e.preventDefault();
          if (typeof mod.markCard === 'function') mod.markCard(true);
        }
      }
    });
  }

  // ==========================================
  // 5. THEME TOGGLER
  // ==========================================
  function initTheme() {
    const savedTheme = localStorage.getItem("unified_theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("unified_theme", isDark ? "dark" : "light");
    UNIFIED_AUDIO.play("flip");
  }

  return {
    init,
    selectCourse,
    switchTab,
    backToCourses,
    toggleTheme,
    currentCourse: () => currentCourse,
    currentTab: () => currentTab
  };
})();

// ==========================================
// 6. GLOBAL MODAL CONTROLLERS (RESET)
// ==========================================
function openResetModal() {
  const modal = document.getElementById("reset-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeResetModal() {
  const modal = document.getElementById("reset-modal");
  if (modal) modal.classList.add("hidden");
}

function confirmReset(target) {
  if (target === "all") {
    localStorage.removeItem("unified_cw_state");
    localStorage.removeItem("unified_hci_state");
    localStorage.removeItem("unified_mobcom_state");
    localStorage.removeItem("unified_theme");
  } else if (target === "cw") {
    localStorage.removeItem("unified_cw_state");
  } else if (target === "hci") {
    localStorage.removeItem("unified_hci_state");
  } else if (target === "mobcom") {
    localStorage.removeItem("unified_mobcom_state");
  }

  closeResetModal();
  location.reload();
}

// ==========================================
// 7. INITIALIZE ON DOM READY & EXPORT GLOBALS
// ==========================================
if (typeof window !== "undefined") {
  window.UNIFIED_ROUTER = UNIFIED_ROUTER;
  window.UNIFIED_AUDIO = UNIFIED_AUDIO;
  window.openResetModal = openResetModal;
  window.closeResetModal = closeResetModal;
  window.confirmReset = confirmReset;
  window.triggerConfetti = triggerConfetti;
}

document.addEventListener("DOMContentLoaded", () => {
  UNIFIED_ROUTER.init();
});
