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

// ==========================================
// 2. AUDITORY COMPANION PLAYER CONTROLLER (CYRENE)
// ==========================================
const UNIFIED_PLAYER = (() => {
  let audioEl = null;
  let activeCourseId = "cw";
  let activeTrackIndex = 0;
  let isPlaying = false;
  let currentTime = 0;
  let duration = 0;
  let playbackRate = 1.0;
  let simulatedInterval = null;

  function init() {
    if (!audioEl) {
      audioEl = new Audio();
      audioEl.preload = "metadata";

      audioEl.addEventListener("play", () => {
        isPlaying = true;
        updateUI();
        updateMediaSession();
      });

      audioEl.addEventListener("pause", () => {
        isPlaying = false;
        updateUI();
        updateMediaSession();
      });

      audioEl.addEventListener("timeupdate", () => {
        currentTime = audioEl.currentTime;
        duration = audioEl.duration || getActiveTrack()?.duration || 0;
        updateProgressUI();
      });

      audioEl.addEventListener("ended", () => {
        nextTrack();
      });

      audioEl.addEventListener("error", () => {
        startSimulatedPlayback();
      });
    }
  }

  function getActiveDeck() {
    if (activeCourseId === "cw" && typeof CW_DATA !== "undefined" && CW_DATA.audioDeck) {
      return CW_DATA.audioDeck;
    }
    return null;
  }

  function getActiveTrack() {
    const deck = getActiveDeck();
    if (!deck || !deck.tracks) return null;
    return deck.tracks[activeTrackIndex] || deck.tracks[0];
  }

  function playTrack(index, courseId = "cw") {
    init();
    activeCourseId = courseId;
    const deck = getActiveDeck();
    if (!deck || !deck.tracks) return;

    activeTrackIndex = Math.max(0, Math.min(index, deck.tracks.length - 1));
    const track = deck.tracks[activeTrackIndex];
    if (!track) return;

    stopSimulatedPlayback();
    currentTime = 0;

    audioEl.src = track.src;
    audioEl.playbackRate = playbackRate;
    audioEl.play().catch(() => {
      startSimulatedPlayback();
    });

    updateUI();
    updateMediaSession();
  }

  function togglePlay() {
    init();
    const track = getActiveTrack();
    if (!track) {
      playTrack(0, activeCourseId);
      return;
    }

    if (simulatedInterval) {
      if (isPlaying) {
        isPlaying = false;
        clearInterval(simulatedInterval);
        simulatedInterval = null;
      } else {
        startSimulatedPlayback();
      }
      updateUI();
      return;
    }

    if (audioEl.src && !audioEl.error && audioEl.readyState >= 2) {
      if (audioEl.paused) {
        audioEl.play().catch(() => startSimulatedPlayback());
      } else {
        audioEl.pause();
      }
    } else {
      if (audioEl.paused || !isPlaying) {
        playTrack(activeTrackIndex, activeCourseId);
      } else {
        audioEl.pause();
        isPlaying = false;
        updateUI();
      }
    }
  }

  function startSimulatedPlayback() {
    isPlaying = true;
    const track = getActiveTrack();
    duration = track ? track.duration : 260;
    if (simulatedInterval) clearInterval(simulatedInterval);

    UNIFIED_AUDIO.play("flip");

    simulatedInterval = setInterval(() => {
      currentTime += 1 * playbackRate;
      if (currentTime >= duration) {
        currentTime = 0;
        nextTrack();
      }
      updateProgressUI();
    }, 1000);

    updateUI();
    updateMediaSession();
  }

  function stopSimulatedPlayback() {
    if (simulatedInterval) {
      clearInterval(simulatedInterval);
      simulatedInterval = null;
    }
  }

  function seek(targetSeconds) {
    targetSeconds = Math.max(0, Math.min(parseFloat(targetSeconds), duration || 300));
    currentTime = targetSeconds;
    if (audioEl && audioEl.readyState >= 2) {
      audioEl.currentTime = targetSeconds;
    }
    updateProgressUI();
  }

  function skip(deltaSeconds) {
    seek(currentTime + deltaSeconds);
  }

  function setRate(rate) {
    playbackRate = rate;
    if (audioEl) audioEl.playbackRate = rate;
    updateUI();
  }

  function nextTrack() {
    const deck = getActiveDeck();
    if (!deck) return;
    if (activeTrackIndex < deck.tracks.length - 1) {
      playTrack(activeTrackIndex + 1, activeCourseId);
    } else {
      playTrack(0, activeCourseId);
    }
  }

  function prevTrack() {
    if (currentTime > 4) {
      seek(0);
    } else {
      const deck = getActiveDeck();
      if (!deck) return;
      const prevIdx = activeTrackIndex > 0 ? activeTrackIndex - 1 : deck.tracks.length - 1;
      playTrack(prevIdx, activeCourseId);
    }
  }

  function updateMediaSession() {
    if (!('mediaSession' in navigator)) return;
    const track = getActiveTrack();
    if (!track) return;

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: "Cyrene • Aiden Dawn (Companion Study)",
        album: "GEd 104 The Contemporary World",
        artwork: [
          { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=512", sizes: "512x512", type: "image/jpeg" }
        ]
      });

      navigator.mediaSession.setActionHandler("play", () => togglePlay());
      navigator.mediaSession.setActionHandler("pause", () => togglePlay());
      navigator.mediaSession.setActionHandler("previoustrack", () => prevTrack());
      navigator.mediaSession.setActionHandler("nexttrack", () => nextTrack());
      navigator.mediaSession.setActionHandler("seekbackward", () => skip(-15));
      navigator.mediaSession.setActionHandler("seekforward", () => skip(15));
    } catch (e) {
      console.warn("MediaSession error:", e);
    }
  }

  function formatTime(sec) {
    sec = Math.floor(sec || 0);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function updateProgressUI() {
    const total = duration || getActiveTrack()?.duration || 260;
    const pct = Math.min(100, (currentTime / total) * 100);

    const timeCurr = document.getElementById("player-time-current");
    const timeTotal = document.getElementById("player-time-total");
    const progressBar = document.getElementById("player-progress-bar");
    const scrubSlider = document.getElementById("player-scrub-slider");

    if (timeCurr) timeCurr.textContent = formatTime(currentTime);
    if (timeTotal) timeTotal.textContent = formatTime(total);
    if (progressBar) progressBar.style.width = `${pct}%`;
    if (scrubSlider && document.activeElement !== scrubSlider) {
      scrubSlider.value = currentTime;
      scrubSlider.max = total;
    }

    const miniBar = document.getElementById("mini-progress-fill");
    if (miniBar) miniBar.style.width = `${pct}%`;
    const miniTime = document.getElementById("mini-player-time");
    if (miniTime) miniTime.textContent = `${formatTime(currentTime)} / ${formatTime(total)}`;
  }

  function updateUI() {
    const track = getActiveTrack();
    if (!track) return;

    const trackTitle = document.getElementById("player-track-title");
    const trackSubtitle = document.getElementById("player-track-subtitle");
    const playBtnIcon = document.getElementById("player-play-icon");
    const discDisc = document.getElementById("player-disc-disc");

    if (trackTitle) trackTitle.textContent = track.title;
    if (trackSubtitle) trackSubtitle.textContent = track.subtitle;
    if (discDisc) {
      if (isPlaying) {
        discDisc.classList.add("animate-spin-slow", "ring-4", "ring-indigo-500/20");
      } else {
        discDisc.classList.remove("animate-spin-slow", "ring-4", "ring-indigo-500/20");
      }
    }

    if (playBtnIcon) {
      if (isPlaying) {
        playBtnIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 9v6m4-6v6" />`;
      } else {
        playBtnIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />`;
      }
    }

    document.querySelectorAll(".player-speed-btn").forEach(btn => {
      const rate = parseFloat(btn.getAttribute("data-rate"));
      if (rate === playbackRate) {
        btn.classList.add("bg-zinc-900", "text-white", "dark:bg-zinc-100", "dark:text-zinc-900");
        btn.classList.remove("text-zinc-500", "bg-zinc-100", "dark:bg-zinc-800");
      } else {
        btn.classList.remove("bg-zinc-900", "text-white", "dark:bg-zinc-100", "dark:text-zinc-900");
        btn.classList.add("text-zinc-500", "bg-zinc-100", "dark:bg-zinc-800");
      }
    });

    renderMiniPlayer();
  }

  function renderMiniPlayer() {
    const container = document.getElementById("mini-player-bar");
    if (!container) return;

    const track = getActiveTrack();
    if (!track) {
      container.classList.add("hidden");
      return;
    }

    container.classList.remove("hidden");

    const total = duration || track.duration || 260;
    const pct = Math.min(100, (currentTime / total) * 100);

    container.innerHTML = `
      <div class="flex items-center justify-between gap-3 min-w-0">
        <div class="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer" onclick="UNIFIED_ROUTER.selectTarget('${activeCourseId}', 'prelim', 'auditory')">
          <div class="w-8 h-8 rounded-full bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20 ${isPlaying ? 'animate-pulse' : ''}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </div>
          <div class="truncate">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-serif font-bold text-zinc-900 dark:text-zinc-100 truncate">${track.title}</span>
              <span class="text-[9px] font-mono px-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0 font-semibold">Cyrene</span>
            </div>
            <div id="mini-player-time" class="text-[10px] font-mono text-zinc-400">
              ${formatTime(currentTime)} / ${formatTime(total)}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-1 shrink-0">
          <button onclick="UNIFIED_PLAYER.skip(-15)" class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100" title="Skip -15s">
            <span class="text-[10px] font-mono font-bold">-15</span>
          </button>
          <button onclick="UNIFIED_PLAYER.togglePlay()" class="w-8 h-8 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-transform" title="${isPlaying ? 'Pause' : 'Play'}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              ${isPlaying 
                ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 9v6m4-6v6" />'
                : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />'}
            </svg>
          </button>
          <button onclick="UNIFIED_PLAYER.skip(15)" class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100" title="Skip +15s">
            <span class="text-[10px] font-mono font-bold">+15</span>
          </button>
        </div>
      </div>

      <div class="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full mt-2 overflow-hidden">
        <div id="mini-progress-fill" class="bg-indigo-600 dark:bg-indigo-400 h-full rounded-full transition-all duration-300" style="width: ${pct}%"></div>
      </div>
    `;
  }

  return {
    init,
    playTrack,
    togglePlay,
    seek,
    skip,
    setRate,
    nextTrack,
    prevTrack,
    getActiveTrack,
    getActiveDeck,
    formatTime,
    get isPlaying() { return isPlaying; },
    get currentTime() { return currentTime; },
    get duration() { return duration; },
    get playbackRate() { return playbackRate; },
    get activeTrackIndex() { return activeTrackIndex; }
  };
})();

if (typeof window !== "undefined") {
  window.UNIFIED_PLAYER = UNIFIED_PLAYER;
}

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
      defaultTerm: "prelim",
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
        { id: "prelim", name: "Prelim", active: true, desc: "Unit 1: Introduction to Globalization" },
        { id: "midterm", name: "Midterm", active: true, desc: "Lessons 2 & 3: Global Structure & Regions" },
        { id: "final", name: "Final", active: false, desc: "Global Divides & Sustainability" }
      ],
      defaultTerm: "prelim",
      defaultTool: "cheatsheet"
    }
  };

  const standardTools = [
    { id: "cheatsheet", name: "Cheat Sheet", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id: "flashcards", name: "Flashcards", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { id: "quiz", name: "Mock Exam", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
    { id: "guide", name: "Guide Qs", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "auditory", name: "Audio", icon: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" }
  ];

  // Router State
  let currentCourse = null;
  let currentTerm = null;
  let currentTool = null;
  let expandedCourses = { mobcom: true, hci: false, cw: false };
  let expandedTerms = { mobcom: "prelim", hci: "prelim", cw: "prelim" };

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

    // Automatically expand the active major exam within this course and close others
    expandedTerms[courseId] = termId;

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
      if (!expandedTerms[courseId]) {
        expandedTerms[courseId] = courseMeta[courseId].defaultTerm;
      }
    }

    renderSidebarTree();
  }

  function toggleTermAccordion(courseId, termId) {
    const meta = courseMeta[courseId];
    if (!meta) return;
    const term = meta.terms.find(t => t.id === termId);
    if (!term || !term.active) return;

    // Ensure parent course is expanded
    Object.keys(courseMeta).forEach(id => {
      expandedCourses[id] = (id === courseId);
    });

    const isCurrentlyExpanded = (expandedTerms[courseId] === termId);

    if (isCurrentlyExpanded) {
      // Collapse this major exam
      expandedTerms[courseId] = null;
      renderSidebarTree();
    } else {
      // Expand this major exam and close any other major exam in this course, switching to it
      expandedTerms[courseId] = termId;
      selectTarget(courseId, termId, currentTool || meta.defaultTool);
    }
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
            <div class="pl-3 pr-1 py-1 space-y-1.5 border-l border-zinc-200/60 dark:border-zinc-800/60 ml-4">
              ${course.terms.map(term => {
                const isSelectedTerm = isCurrentCourse && currentTerm === term.id;
                const isTermExpanded = expandedTerms[course.id] === term.id;

                if (!term.active) {
                  return `
                    <div class="px-2 py-1.5 flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-600 select-none">
                      <span class="font-mono font-bold uppercase tracking-wider">${term.name} Exam</span>
                      <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/50">Soon</span>
                    </div>
                  `;
                }

                return `
                  <div class="space-y-1">
                    <!-- Major Exam Collapsible Header -->
                    <button
                      onclick="UNIFIED_ROUTER.toggleTermAccordion('${course.id}', '${term.id}')"
                      class="group w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                        isSelectedTerm
                          ? 'text-zinc-900 dark:text-zinc-100 font-bold'
                          : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }"
                    >
                      <span class="text-[11px] font-mono uppercase tracking-wider font-bold">
                        ${term.name} Exam
                      </span>
                      <svg class="w-3 h-3 text-zinc-400 transition-transform duration-200 ${isTermExpanded ? 'rotate-90 text-zinc-700 dark:text-zinc-200' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <!-- 4 Core Study Tools (Collapsed unless isTermExpanded) -->
                    ${isTermExpanded ? `
                      <div class="pl-2 space-y-0.5 animate-fade-in">
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
                    ` : ''}
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
    toggleTermAccordion,
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
