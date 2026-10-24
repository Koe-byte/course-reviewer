/**
 * UNIFIED REVIEWER — CORE APPLICATION CONTROLLER & ROUTER
 * Apple HIG Mobile Ergonomics & Minimalist SaaS Architecture
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
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.05);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === "correct") {
        const notes = [659.25, 987.77];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteTime = now + (idx * 0.08);
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, noteTime);
          gain.gain.setValueAtTime(0.09, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.16);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(noteTime);
          osc.stop(noteTime + 0.16);
        });
      } else if (type === "wrong") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(170, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.14);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
      } else if (type === "celebrate") {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteTime = now + (idx * 0.08);
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, noteTime);
          gain.gain.setValueAtTime(0.12, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(noteTime);
          osc.stop(noteTime + 0.3);
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
  const colors = ["#18181b", "#71717a", "#d4d4d8", "#10b981", "#f59e0b", "#3b82f6"];

  for (let i = 0; i < 65; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 16,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      opacity: 1
    });
  }

  const startTime = Date.now();
  let animFrame = null;

  function render() {
    const elapsed = Date.now() - startTime;
    if (elapsed > 2000) {
      cancelAnimationFrame(animFrame);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.rotation += p.rotSpeed;
      p.opacity = Math.max(0, 1 - (elapsed / 2000));

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
// 3. UNIFIED ROUTER & APP CONTROLLER
// ==========================================
const UNIFIED_ROUTER = (() => {
  const modules = {
    cw: CW_MODULE,
    hci: HCI_MODULE,
    mobcom: MOBCOM_MODULE
  };

  const courseMeta = {
    mobcom: {
      id: "mobcom",
      code: "CS 312",
      title: "Mobile Computing",
      shortTitle: "MobCom",
      monogram: "MC",
      terms: [
        { id: "prelim", name: "Prelim", active: true, desc: "Foundations & Cellular Ch. 1" },
        { id: "midterm", name: "Midterm", active: true, desc: "Mobile IP, GSM Architecture & Cellular" },
        { id: "final", name: "Final", active: false, desc: "Advanced Wireless & 5G Slicing" }
      ],
      defaultTerm: "midterm",
      defaultTool: "cheatsheet"
    },
    hci: {
      id: "hci",
      code: "IT 321",
      title: "Human-Computer Interaction",
      shortTitle: "HCI",
      monogram: "HC",
      terms: [
        { id: "prelim", name: "Prelim", active: true, desc: "Units 1–4 Cognitive Models & Gestalt" },
        { id: "midterm", name: "Midterm", active: false, desc: "Evaluation & Design Systems" },
        { id: "final", name: "Final", active: false, desc: "Ubiquitous UI & Emerging Frameworks" }
      ],
      defaultTerm: "prelim",
      defaultTool: "cheatsheet"
    },
    cw: {
      id: "cw",
      code: "GEd 104",
      title: "The Contemporary World",
      shortTitle: "Contemp World",
      monogram: "CW",
      terms: [
        { id: "midterm", name: "Midterm", active: true, desc: "Lessons 2 & 3: Global Structure & Regions" },
        { id: "prelim", name: "Prelim", active: true, desc: "Unit 1: Introduction to Globalization" },
        { id: "final", name: "Final", active: false, desc: "Global Divides & Sustainability" }
      ],
      defaultTerm: "midterm",
      defaultTool: "cheatsheet"
    }
  };

  const standardTools = [
    { id: "cheatsheet", name: "Cheat Sheet", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id: "flashcards", name: "Flashcards", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { id: "quiz", name: "Mock Exam", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
    { id: "guide", name: "Guide Qs", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
  ];

  // Router State
  let currentCourse = null;
  let currentTerm = null;
  let currentTool = null;
  let expandedCourses = { mobcom: true, hci: false, cw: false };

  function init() {
    Object.values(modules).forEach(mod => {
      if (typeof mod.init === 'function') mod.init();
    });

    initTheme();
    setupKeyboardShortcuts();
    renderSidebarTree();
    handleRouteFromHash();

    window.addEventListener("hashchange", handleRouteFromHash);
  }

  // Hash Format: #courseId/termId/toolId
  function handleRouteFromHash() {
    const raw = window.location.hash.replace(/^#\/?/, "");
    if (!raw) {
      backToLanding(false);
      return;
    }

    const parts = raw.split("/");
    const courseId = parts[0];
    const termId = parts[1] || null;
    const toolId = parts[2] || null;

    if (courseMeta[courseId]) {
      selectTarget(courseId, termId, toolId, false);
    } else {
      backToLanding(false);
    }
  }

  function selectTarget(courseId, termId = null, toolId = null, updateHash = true) {
    if (!courseMeta[courseId]) return;

    const meta = courseMeta[courseId];
    currentCourse = courseId;

    // Collapse all other courses so only the selected course is expanded
    Object.keys(courseMeta).forEach(id => {
      expandedCourses[id] = (id === courseId);
    });

    // Default term handling
    if (!termId || !meta.terms.some(t => t.id === termId)) {
      termId = meta.defaultTerm;
    }
    currentTerm = termId;

    // Tool mapping
    if (!toolId) {
      toolId = meta.defaultTool;
    }
    currentTool = toolId;

    // Close mobile drawer on navigation
    closeMobileSidebar();

    // Update Header Breadcrumbs
    updateBreadcrumbs(meta, termId, toolId);

    // Update Sidebar Selection States
    renderSidebarTree();

    // Update Bottom Dock (Mobile Segmented Controller)
    updateMobileDock(courseId, termId, toolId);

    // Swap Landing view for Content view
    const landing = document.getElementById("course-selector-view");
    const main = document.getElementById("main-content");
    if (landing) landing.classList.add("hidden");
    if (main) main.classList.remove("hidden");

    // Execute Module Rendering with context
    renderCourseTool(courseId, termId, toolId, main);

    if (updateHash) {
      window.location.hash = `${courseId}/${termId}/${toolId}`;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderCourseTool(courseId, termId, toolId, container) {
    const mod = modules[courseId];
    if (!mod) return;

    // Apply term scoping context if module supports it
    if (courseId === "mobcom") {
      if (toolId === "cheatsheet") {
        mod.state.cheatSheetFocus = (termId === "midterm") ? "midterm" : "all";
      } else if (toolId === "flashcards") {
        mod.filterFlashcards(termId === "midterm" ? "midterm-all" : "all");
      } else if (toolId === "quiz") {
        mod.setQuizMode(termId === "midterm" ? "midterm" : "all");
      } else if (toolId === "guide") {
        mod.filterGuide(termId === "midterm" ? "midterm" : "all");
      }
      mod.renderView(toolId, container);
    } else if (courseId === "cw") {
      if (typeof mod.setTermFocus === "function") {
        mod.setTermFocus(termId || "midterm");
      }
      if (toolId === "flashcards" && typeof mod.filterFlashcards === "function") {
        mod.filterFlashcards(termId === "midterm" ? "midterm" : (termId === "prelim" ? "Unit 1" : "all"));
      } else if (toolId === "guide" && typeof mod.filterGuide === "function") {
        mod.filterGuide(termId === "midterm" ? "midterm" : (termId === "prelim" ? "all" : "all"));
      } else if (toolId === "quiz" && typeof mod.setQuizMode === "function") {
        mod.setQuizMode(termId || "midterm");
      }
      mod.renderView(toolId, container);
    } else {
      // HCI compatibility mapping
      let legacyTab = toolId;
      if (courseId === "hci" && toolId === "cheatsheet") legacyTab = "knowledge";
      mod.renderView(legacyTab, container);
    }
  }

  function switchTool(toolId) {
    if (!currentCourse || !currentTerm) return;
    selectTarget(currentCourse, currentTerm, toolId, true);
  }

  function toggleCourseAccordion(courseId) {
    const isCurrentlyExpanded = expandedCourses[courseId] === true;

    // Collapse all courses first
    Object.keys(courseMeta).forEach(id => {
      expandedCourses[id] = false;
    });

    // If it was closed, open only this one
    if (!isCurrentlyExpanded) {
      expandedCourses[courseId] = true;
    }

    renderSidebarTree();
  }

  function renderSidebarTree() {
    const tree = document.getElementById("sidebar-tree");
    if (!tree) return;

    tree.innerHTML = Object.values(courseMeta).map(course => {
      const isExpanded = expandedCourses[course.id] === true;
      const isCurrentCourse = currentCourse === course.id;

      return `
        <div class="space-y-0.5">
          <!-- Course Header (Tap target >= 44px) -->
          <div
            onclick="UNIFIED_ROUTER.toggleCourseAccordion('${course.id}')"
            class="group w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left font-medium cursor-pointer transition-colors ${
              isCurrentCourse
                ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200'
            }"
          >
            <div class="flex items-center gap-2 min-w-0">
              <span class="w-6 h-6 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                ${course.monogram}
              </span>
              <div class="truncate">
                <span class="block text-xs font-mono font-bold leading-tight truncate">${course.code}</span>
                <span class="block text-[11px] font-sans text-zinc-400 truncate leading-tight">${course.shortTitle}</span>
              </div>
            </div>
            <svg class="w-3.5 h-3.5 text-zinc-400 transition-transform ${isExpanded ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <!-- Child Tree: Terms ➔ Tools -->
          ${isExpanded ? `
            <div class="pl-4 pr-1 py-1 space-y-2 border-l border-zinc-200/60 dark:border-zinc-800/60 ml-4">
              ${course.terms.map(term => {
                const isSelectedTerm = isCurrentCourse && currentTerm === term.id;

                if (!term.active) {
                  return `
                    <div class="px-2 py-1 flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-600 select-none">
                      <span class="font-mono">${term.name}</span>
                      <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800/50">Soon</span>
                    </div>
                  `;
                }

                return `
                  <div class="space-y-1">
                    <!-- Term Label -->
                    <div class="flex items-center justify-between px-2 pt-1 pb-0.5 text-[11px] font-mono font-bold uppercase tracking-wider ${
                      isSelectedTerm ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'
                    }">
                      <span>${term.name} Exam</span>
                      
                    </div>

                    <!-- 4 Core Study Tools -->
                    <div class="space-y-0.5">
                      ${standardTools.map(tool => {
                        const isToolActive = isSelectedTerm && currentTool === tool.id;
                        return `
                          <button
                            onclick="UNIFIED_ROUTER.selectTarget('${course.id}', '${term.id}', '${tool.id}')"
                            class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
                              isToolActive
                                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium shadow-sm'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50'
                            }"
                          >
                            <svg class="w-3.5 h-3.5 opacity-70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="${tool.icon}" />
                            </svg>
                            <span class="truncate">${tool.name}</span>
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  function updateBreadcrumbs(meta, termId, toolId) {
    const courseEl = document.getElementById("breadcrumb-course");
    const container = document.getElementById("header-breadcrumbs");
    if (!container) return;

    const termObj = meta.terms.find(t => t.id === termId);
    const toolObj = standardTools.find(t => t.id === toolId);

    container.innerHTML = `
      <span class="hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer" onclick="UNIFIED_ROUTER.backToLanding()">Portal</span>
      <span class="opacity-40">/</span>
      <span class="cursor-pointer hover:underline" onclick="UNIFIED_ROUTER.selectTarget('${meta.id}', '${termId}', '${toolId}')">${meta.code}</span>
      <span class="opacity-40">/</span>
      <span class="capitalize text-zinc-500">${termObj ? termObj.name : termId}</span>
      <span class="opacity-40">/</span>
      <span class="text-zinc-900 dark:text-zinc-100 font-semibold">${toolObj ? toolObj.name : toolId}</span>
    `;
  }

  function updateMobileDock(courseId, termId, toolId) {
    const dock = document.getElementById("mobile-dock");
    const inner = document.getElementById("mobile-dock-inner");
    if (!dock || !inner) return;

    dock.classList.remove("hidden");

    inner.innerHTML = standardTools.map(tool => {
      const isActive = tool.id === toolId;
      return `
        <button
          onclick="UNIFIED_ROUTER.switchTool('${tool.id}')"
          class="dock-segment-btn ${isActive ? 'active' : ''}"
        >
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="${tool.icon}" />
          </svg>
          <span class="truncate text-[10px]">${tool.name}</span>
        </button>
      `;
    }).join('');
  }

  function backToLanding(updateHash = true) {
    currentCourse = null;
    currentTerm = null;
    currentTool = null;

    closeMobileSidebar();

    const breadcrumbs = document.getElementById("header-breadcrumbs");
    if (breadcrumbs) {
      breadcrumbs.innerHTML = `
        <span class="text-zinc-900 dark:text-zinc-100 font-medium">Reviewer Portal</span>
        <span class="opacity-40">/</span>
        <span class="text-zinc-400">All Courses</span>
      `;
    }

    const dock = document.getElementById("mobile-dock");
    if (dock) dock.classList.add("hidden");

    const landing = document.getElementById("course-selector-view");
    const main = document.getElementById("main-content");
    if (main) main.classList.add("hidden");
    if (landing) {
      landing.classList.remove("hidden");
      renderLandingView(landing);
    }

    renderSidebarTree();

    if (updateHash) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  }

  function renderLandingView(container) {
    const mobScore = MOBCOM_MODULE.calculateReadiness();
    const hciScore = HCI_MODULE.calculateReadiness();
    const cwScore = CW_MODULE.calculateReadiness();

    container.innerHTML = `
      <div class="space-y-8 animate-fade-in pb-10">
        <!-- Quiet Academic Header -->
        <div class="space-y-1.5 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <span class="quiet-chip">Batangas State University • CICS</span>
          <h1 class="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Academic Examination Reviewer
          </h1>
          <p class="text-xs sm:text-sm text-zinc-500 max-w-xl leading-relaxed">
            Select a course and examination scope from the sidebar or below to begin structured recall, practice drills, and mock test simulations.
          </p>
        </div>

        <!-- Grouped Course Directory -->
        <div class="space-y-3">
          <div class="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Enrolled Coursework
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${Object.values(courseMeta).map(c => {
              let score = 0;
              if (c.id === 'mobcom') score = mobScore;
              else if (c.id === 'hci') score = hciScore;
              else score = cwScore;

              return `
                <div class="ios-inset-card p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
                  <div class="space-y-2.5">
                    <div class="flex items-center justify-between">
                      <span class="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono font-bold text-xs flex items-center justify-center">
                        ${c.monogram}
                      </span>
                      <span class="text-[10px] font-mono text-zinc-400">${score}% Ready</span>
                    </div>
                    <div>
                      <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-mono">${c.code}</h3>
                      <h4 class="text-sm font-serif font-bold text-zinc-800 dark:text-zinc-200">${c.title}</h4>
                    </div>
                  </div>

                  <!-- Quick Exam Scope Links -->
                  <div class="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-1.5 text-xs font-mono">
                    <span class="text-[10px] text-zinc-400 block uppercase">Exam Scopes</span>
                    <div class="grid grid-cols-3 gap-1">
                      ${c.terms.map(t => {
                        if (!t.active) {
                          return `<span class="py-1 text-center rounded bg-zinc-50 dark:bg-zinc-900/40 text-zinc-300 dark:text-zinc-700 text-[10px] select-none">${t.name}</span>`;
                        }
                        
                        return `
                          <button
                            onclick="UNIFIED_ROUTER.selectTarget('${c.id}', '${t.id}', 'cheatsheet')"
                            class="py-1 text-center rounded border border-zinc-200 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[10px] font-medium transition-colors text-zinc-700 dark:text-zinc-300"
                          >
                            ${t.name}
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Mobile Drawer Controls
  function toggleMobileSidebar() {
    const sidebar = document.getElementById("app-sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    if (!sidebar) return;

    const isOpen = !sidebar.classList.contains("-translate-x-full");
    if (isOpen) {
      closeMobileSidebar();
    } else {
      sidebar.classList.remove("-translate-x-full");
      if (backdrop) backdrop.classList.remove("hidden");
    }
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById("app-sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    if (sidebar) sidebar.classList.add("-translate-x-full");
    if (backdrop) backdrop.classList.add("hidden");
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("unified_theme", isDark ? "dark" : "light");
  }

  function initTheme() {
    const saved = localStorage.getItem("unified_theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function setupKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      // Avoid stealing input from inputs or modals
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

      if (e.key === "Escape") {
        closeMobileSidebar();
        closeResetModal();
      }

      // Delegate flashcard shortcuts
      if (currentTool === "flashcards") {
        if (currentCourse === "mobcom") {
          if (e.code === "Space") {
            e.preventDefault();
            MOBCOM_MODULE.toggleFlip();
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            MOBCOM_MODULE.prevCard();
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            MOBCOM_MODULE.nextCard();
          } else if (e.key === "1") {
            e.preventDefault();
            MOBCOM_MODULE.markCard(false);
          } else if (e.key === "2") {
            e.preventDefault();
            MOBCOM_MODULE.markCard(true);
          }
        } else if (currentCourse === "cw") {
          if (e.code === "Space") {
            e.preventDefault();
            CW_MODULE.toggleFlip();
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            CW_MODULE.prevCard();
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            CW_MODULE.nextCard();
          } else if (e.key === "1") {
            e.preventDefault();
            CW_MODULE.markCard(false);
          } else if (e.key === "2") {
            e.preventDefault();
            CW_MODULE.markCard(true);
          }
        }
      }
    });
  }

  return {
    init,
    selectTarget,
    switchTool,
    toggleCourseAccordion,
    backToLanding,
    toggleMobileSidebar,
    closeMobileSidebar,
    toggleTheme
  };
})();

// Global Modal handlers
function openResetModal() {
  const modal = document.getElementById("reset-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeResetModal() {
  const modal = document.getElementById("reset-modal");
  if (modal) modal.classList.add("hidden");
}

function confirmReset(scope) {
  if (scope === "mobcom" || scope === "all") {
    localStorage.removeItem("unified_mobcom_state");
  }
  if (scope === "hci" || scope === "all") {
    localStorage.removeItem("unified_hci_state");
  }
  if (scope === "cw" || scope === "all") {
    localStorage.removeItem("unified_cw_state");
  }
  closeResetModal();
  window.location.reload();
}

// Bootstrap app on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  UNIFIED_ROUTER.init();
});
