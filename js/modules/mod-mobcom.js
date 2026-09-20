/**
 * Unified Reviewer — Course Module: CS 312 Mobile Computing
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
    selectedCategory: "all",
    selectedGlossaryCat: "all",
    isCardFlipped: false,
    filteredCards: []
  };

  function loadModuleState() {
    try {
      const raw = localStorage.getItem("unified_mobcom_state");
      if (raw) {
        const parsed = JSON.parse(raw);
        state = { ...state, ...parsed };
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
        bestScore: state.bestScore
      }));
    } catch (e) {
      console.warn("Failed to save MobCom state:", e);
    }
  }

  function calculateReadiness() {
    // 1. Flashcards (35%)
    const totalCards = MOBCOM_DATA.flashcards.length;
    const masteredCards = MOBCOM_DATA.flashcards.filter(c => state.cardMastery[c.id] === true).length;
    const flashcardScore = (masteredCards / totalCards) * 35;

    // 2. Quiz (35%)
    const totalQuiz = MOBCOM_DATA.quizQuestions.length;
    let quizCorrect = 0;
    Object.keys(state.quizAnswers).forEach(idx => {
      if (state.quizAnswers[idx] === MOBCOM_DATA.quizQuestions[idx].correct) quizCorrect++;
    });
    const quizScore = (quizCorrect / totalQuiz) * 35;

    // 3. Guide Questions (30%)
    const totalGuide = MOBCOM_DATA.guideQuestions.length;
    const reviewedCount = Object.values(state.guideReviewed).filter(v => v === true).length;
    const guideScore = (reviewedCount / totalGuide) * 30;

    return Math.min(100, Math.max(0, Math.round(flashcardScore + quizScore + guideScore)));
  }

  function init() {
    loadModuleState();
    filterFlashcards("all");
  }

  function renderView(tabId, container) {
    switch (tabId) {
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
      case "glossary":
        renderGlossary(container);
        break;
      default:
        renderCheatSheets(container);
    }
  }

  // --- 1. CHEAT SHEETS VIEW ---
  function renderCheatSheets(container) {
    const callStep = MOBCOM_DATA.callSteps[state.currentCallStep];

    container.innerHTML = `
      <div class="space-y-10 animate-fade-in">
        <!-- Sprint Hero Banner -->
        <div class="p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2 max-w-xl">
              <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                <span>🚀</span> High-Retention Fast Cramming Matrix
              </div>
              <h2 class="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
                CS 312 Mobile Computing
              </h2>
              <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Consolidated cheat sheets covering Module 1 (Intro), Module 2 (Networks & Media), and Module 3 (Cellular Systems) with interactive workflows and comparative matrices.
              </p>
            </div>
            <div class="flex flex-wrap gap-2">
              <button onclick="UNIFIED_ROUTER.switchTab('flashcards')" class="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity">
                📇 Flashcard Drill
              </button>
              <button onclick="UNIFIED_ROUTER.switchTab('quiz')" class="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                🎯 20-Q Mock Exam
              </button>
            </div>
          </div>
        </div>

        <!-- Sticky Jump Sub-bar -->
        <div class="sticky top-20 z-30 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-2 overflow-x-auto shadow-sm">
          <span class="text-[11px] font-mono font-bold uppercase text-zinc-500 px-2 flex-shrink-0">Jump To:</span>
          <a href="#mob-mod1" class="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 whitespace-nowrap transition-colors">Module 1: Intro</a>
          <a href="#mob-mod2" class="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 whitespace-nowrap transition-colors">Module 2: Networks & Media</a>
          <a href="#mob-mod3" class="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 whitespace-nowrap transition-colors">Module 3: Cellular</a>
          <a href="#mob-calltrace" class="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-100 whitespace-nowrap transition-colors">Call Trace Simulator</a>
          <a href="#mob-genmatrix" class="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-100 whitespace-nowrap transition-colors">1G-5G Matrix</a>
        </div>

        <!-- MODULE 1 -->
        <div id="mob-mod1" class="space-y-6 pt-2">
          <div class="pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <span class="text-xs font-mono uppercase text-zinc-500 font-semibold">Module 01</span>
            <h3 class="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100">Introduction to Mobile Computing</h3>
          </div>

          <!-- Master Definition -->
          <div class="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <span class="text-[11px] font-mono text-zinc-500 uppercase font-semibold">Formal Definition</span>
            <p class="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <strong>Mobile Computing</strong> is a technology that allows the transmission of data, voice, and video via a computer or wireless-enabled device without physical cable links. It represents a <strong>computing environment designed for physical mobility</strong>.
            </p>
          </div>

          <!-- 3 Pillars Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <span class="text-2xl block">💻</span>
              <strong class="text-sm font-serif font-bold text-zinc-900 dark:text-zinc-100 block">1. Mobile Hardware</strong>
              <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Physical portable units operating untethered from fixed power or cables (smartphones, tablets, wearables, IoT).</p>
            </div>
            <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <span class="text-2xl block">⚙️</span>
              <strong class="text-sm font-serif font-bold text-zinc-900 dark:text-zinc-100 block">2. Mobile Software</strong>
              <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Lightweight operating systems (Android, iOS) and apps engineered to run inside hardware, thermal, and battery constraints.</p>
            </div>
            <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <span class="text-2xl block">📡</span>
              <strong class="text-sm font-serif font-bold text-zinc-900 dark:text-zinc-100 block">3. Mobile Communication</strong>
              <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Wireless network infrastructure (cellular 4G/5G, Wi-Fi, satellites, Bluetooth) delivering data between clients and cloud servers.</p>
            </div>
          </div>

          <!-- 4 Characteristics -->
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">4 Fundamental Characteristics</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div class="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <strong class="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 block">1. Portability</strong>
                <p class="text-xs text-zinc-500">Lightweight enough to be operated while in physical motion.</p>
              </div>
              <div class="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <strong class="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 block">2. Connectivity</strong>
                <p class="text-xs text-zinc-500">Maintains persistent wireless link regardless of location.</p>
              </div>
              <div class="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <strong class="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 block">3. Interactivity</strong>
                <p class="text-xs text-zinc-500">Real-time bidirectional exchange between clients and servers.</p>
              </div>
              <div class="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <strong class="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 block">4. Individuality</strong>
                <p class="text-xs text-zinc-500">Deep personalization for a singular user (biometrics, profiles).</p>
              </div>
            </div>
          </div>

          <!-- 7 Limitations Table -->
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">7 Limitations & Modern Countermeasures</h4>
            <div class="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <table class="w-full text-left text-xs">
                <thead class="bg-zinc-100 dark:bg-zinc-800/60 font-mono text-[11px] uppercase tracking-wider text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th class="py-2.5 px-3.5">#</th>
                    <th class="py-2.5 px-3.5">Limitation</th>
                    <th class="py-2.5 px-3.5">Bottleneck</th>
                    <th class="py-2.5 px-3.5">Modern Solution</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                  <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td class="py-2.5 px-3.5 font-mono">01</td>
                    <td class="py-2.5 px-3.5 font-semibold text-zinc-900 dark:text-zinc-100">Battery Life</td>
                    <td class="py-2.5 px-3.5 text-zinc-500">Electrochemical capacity constraints</td>
                    <td class="py-2.5 px-3.5 text-emerald-600 dark:text-emerald-400">ARM big.LITTLE, GaN fast charging, OLED dark modes</td>
                  </tr>
                  <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td class="py-2.5 px-3.5 font-mono">02</td>
                    <td class="py-2.5 px-3.5 font-semibold text-zinc-900 dark:text-zinc-100">Bandwidth Volatility</td>
                    <td class="py-2.5 px-3.5 text-zinc-500">RF fluctuations & fading</td>
                    <td class="py-2.5 px-3.5 text-emerald-600 dark:text-emerald-400">5G Carrier Aggregation, adaptive bitrates (DASH)</td>
                  </tr>
                  <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td class="py-2.5 px-3.5 font-mono">03</td>
                    <td class="py-2.5 px-3.5 font-semibold text-zinc-900 dark:text-zinc-100">Security Risks</td>
                    <td class="py-2.5 px-3.5 text-zinc-500">Open broadcast medium & physical theft</td>
                    <td class="py-2.5 px-3.5 text-emerald-600 dark:text-emerald-400">TLS 1.3 encryption, biometric enclaves, remote wipe</td>
                  </tr>
                  <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td class="py-2.5 px-3.5 font-mono">04</td>
                    <td class="py-2.5 px-3.5 font-semibold text-zinc-900 dark:text-zinc-100">Compute & Storage</td>
                    <td class="py-2.5 px-3.5 text-zinc-500">Thermal limits in thin bodies</td>
                    <td class="py-2.5 px-3.5 text-emerald-600 dark:text-emerald-400">Edge offloading, cloud sync, on-device NPUs</td>
                  </tr>
                  <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td class="py-2.5 px-3.5 font-mono">05</td>
                    <td class="py-2.5 px-3.5 font-semibold text-zinc-900 dark:text-zinc-100">Screen & Input</td>
                    <td class="py-2.5 px-3.5 text-zinc-500">Small surface & typing fatigue</td>
                    <td class="py-2.5 px-3.5 text-emerald-600 dark:text-emerald-400">Foldable displays, AI voice dictation, multimodal UI</td>
                  </tr>
                  <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td class="py-2.5 px-3.5 font-mono">06</td>
                    <td class="py-2.5 px-3.5 font-semibold text-zinc-900 dark:text-zinc-100">Heterogeneity</td>
                    <td class="py-2.5 px-3.5 text-zinc-500">Fragmented screens & chipsets</td>
                    <td class="py-2.5 px-3.5 text-emerald-600 dark:text-emerald-400">Cross-platform runtimes (Flutter/React Native)</td>
                  </tr>
                  <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td class="py-2.5 px-3.5 font-mono">07</td>
                    <td class="py-2.5 px-3.5 font-semibold text-zinc-900 dark:text-zinc-100">Location Dependency</td>
                    <td class="py-2.5 px-3.5 text-zinc-500">Dead zones & terrain blocks</td>
                    <td class="py-2.5 px-3.5 text-emerald-600 dark:text-emerald-400">Seamless handoffs, LEO satellite direct-to-cell</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- MODULE 2 -->
        <div id="mob-mod2" class="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div class="pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <span class="text-xs font-mono uppercase text-zinc-500 font-semibold">Module 02</span>
            <h3 class="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100">Communication Networks & Transmission Media</h3>
          </div>

          <!-- 8 Elements Grid -->
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">8 Elements of Data Communication</h4>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div class="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block mb-0.5">1. Sender</strong><p class="text-zinc-500">Initiates message transmission.</p></div>
              <div class="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block mb-0.5">2. Receiver</strong><p class="text-zinc-500">Target destination.</p></div>
              <div class="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block mb-0.5">3. Encoder</strong><p class="text-zinc-500">Converts data to physical signals.</p></div>
              <div class="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block mb-0.5">4. Decoder</strong><p class="text-zinc-500">Converts signals back to data.</p></div>
              <div class="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block mb-0.5">5. Message</strong><p class="text-zinc-500">The information payload.</p></div>
              <div class="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block mb-0.5">6. Medium</strong><p class="text-zinc-500">The physical conduit/channel.</p></div>
              <div class="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block mb-0.5">7. Protocol</strong><p class="text-zinc-500">Governing rules & syntax.</p></div>
              <div class="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block mb-0.5">8. Noise</strong><p class="text-zinc-500">Unwanted signal distortion.</p></div>
            </div>
          </div>

          <!-- 3 Quality Pillars DAT -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
              <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm block">1. Delivery</strong>
              <p class="text-xs text-zinc-600 dark:text-zinc-400">Must arrive at the intended destination only without leaks.</p>
            </div>
            <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
              <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm block">2. Accuracy</strong>
              <p class="text-xs text-zinc-600 dark:text-zinc-400">Must arrive intact and uncorrupted without bit errors.</p>
            </div>
            <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
              <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm block">3. Timeliness</strong>
              <p class="text-xs text-zinc-600 dark:text-zinc-400">Must arrive in real time without lagging delay (vital for VoIP).</p>
            </div>
          </div>

          <!-- Topologies Comparison -->
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">Network Topologies Comparison</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm block">Bus Topology</strong>
                <p class="text-zinc-500">Single linear backbone cable with terminators at each end.</p>
                <div class="text-[11px] text-zinc-600 dark:text-zinc-400 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                  <div class="text-emerald-600 dark:text-emerald-400">+ Cheap, easy</div>
                  <div class="text-rose-600 dark:text-rose-400">- Cable cut downs network</div>
                </div>
              </div>
              <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm block">Star Topology (Most Popular)</strong>
                <p class="text-zinc-500">All nodes connect individually to a central switch/hub.</p>
                <div class="text-[11px] text-zinc-600 dark:text-zinc-400 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                  <div class="text-emerald-600 dark:text-emerald-400">+ Fault isolation</div>
                  <div class="text-rose-600 dark:text-rose-400">- Switch is single failure point</div>
                </div>
              </div>
              <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm block">Ring Topology</strong>
                <p class="text-zinc-500">Unidirectional token-passing closed loop.</p>
                <div class="text-[11px] text-zinc-600 dark:text-zinc-400 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                  <div class="text-emerald-600 dark:text-emerald-400">+ Predictable token delay</div>
                  <div class="text-rose-600 dark:text-rose-400">- Break breaks entire loop</div>
                </div>
              </div>
              <div class="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm block">Mesh Topology</strong>
                <p class="text-zinc-500">Every node links to every other node ($n(n-1)/2$).</p>
                <div class="text-[11px] text-zinc-600 dark:text-zinc-400 pt-1 border-t border-zinc-200 dark:border-zinc-800">
                  <div class="text-emerald-600 dark:text-emerald-400">+ Maximum fault tolerance</div>
                  <div class="text-rose-600 dark:text-rose-400">- Highest cost</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MODULE 3 -->
        <div id="mob-mod3" class="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div class="pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <span class="text-xs font-mono uppercase text-zinc-500 font-semibold">Module 03</span>
            <h3 class="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100">Cellular Wireless Networks</h3>
          </div>

          <!-- Hexagons & Frequency Reuse -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm block">⬡ Why Hexagons?</strong>
              <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Circles create gaps (dead zones) or overlapping interference. Regular hexagons provide <strong>100% gapless surface tessellation</strong> with equal distances to all 6 adjacent cell centers.
              </p>
            </div>
            <div class="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 text-sm block">📡 Frequency Reuse</strong>
              <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Reusing the exact same frequency channels in geographically separated non-adjacent cells ($N=7$ cluster) multiplies network capacity infinitely without interference.
              </p>
            </div>
          </div>

          <!-- 5-Tier Cellular Architecture -->
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">5 Core Cellular Hardware Components</h4>
            <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <div class="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block">1. MS</strong><span class="text-zinc-500">Mobile Station (handset, SIM)</span></div>
              <div class="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block">2. BTS</strong><span class="text-zinc-500">Base Transceiver (cell tower RF)</span></div>
              <div class="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block">3. BSC</strong><span class="text-zinc-500">Station Controller (channels)</span></div>
              <div class="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block">4. MSC</strong><span class="text-zinc-500">Core Brain (routing, billing)</span></div>
              <div class="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><strong class="font-mono text-zinc-900 dark:text-zinc-100 block">5. Backbone</strong><span class="text-zinc-500">Fiber/Microwave Links</span></div>
            </div>
          </div>

          <!-- CALL TRACE SIMULATOR -->
          <div id="mob-calltrace" class="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div class="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <span class="text-xs font-mono uppercase text-zinc-500 font-semibold">Interactive Workflow</span>
                <h4 class="text-base font-serif font-bold text-zinc-900 dark:text-zinc-100">Cellular Call Transmission Trace</h4>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="MOBCOM_MODULE.stepCallTrace(-1)" class="px-3 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-semibold">◀ Prev</button>
                <span class="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">Step ${state.currentCallStep + 1}/5</span>
                <button onclick="MOBCOM_MODULE.stepCallTrace(1)" class="px-3 py-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-mono font-semibold">Next ▶</button>
              </div>
            </div>

            <!-- Nodes Flow -->
            <div class="grid grid-cols-5 gap-2 text-center text-xs">
              ${["1. Sender MS", "2. BTS Tower", "3. BSC", "4. MSC Core", "5. Receiver MS"].map((title, idx) => {
                const isActive = idx === state.currentCallStep;
                const isPassed = idx < state.currentCallStep;
                let cls = "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500";
                if (isActive) cls = "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-900 font-bold scale-105 shadow-sm";
                else if (isPassed) cls = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300";

                return `
                  <div class="p-3 rounded-xl border transition-all ${cls}">
                    <strong class="block text-[11px] font-mono">${title}</strong>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Step Detail -->
            <div class="p-4 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-1 text-xs sm:text-sm">
              <strong class="font-serif font-bold text-zinc-900 dark:text-zinc-100 block">${callStep.title}</strong>
              <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">${callStep.desc}</p>
            </div>
          </div>

          <!-- 1G TO 5G MATRIX -->
          <div id="mob-genmatrix" class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">Cellular Evolution Matrix (1G ➔ 5G)</h4>
            <div class="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <table class="w-full text-left text-xs">
                <thead class="bg-zinc-100 dark:bg-zinc-800/60 font-mono text-[11px] uppercase tracking-wider text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th class="py-2.5 px-3.5">Gen</th>
                    <th class="py-2.5 px-3.5">Era</th>
                    <th class="py-2.5 px-3.5">Tech</th>
                    <th class="py-2.5 px-3.5">Primary Services</th>
                    <th class="py-2.5 px-3.5">Key Innovation</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                  <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40"><td class="py-2.5 px-3.5 font-mono font-bold">1G</td><td class="py-2.5 px-3.5 text-zinc-500">1980s</td><td class="py-2.5 px-3.5">Analog FM</td><td class="py-2.5 px-3.5">Voice calls only</td><td class="py-2.5 px-3.5">First mobile phones</td></tr>
                  <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40"><td class="py-2.5 px-3.5 font-mono font-bold">2G</td><td class="py-2.5 px-3.5 text-zinc-500">1990s</td><td class="py-2.5 px-3.5">Digital GSM</td><td class="py-2.5 px-3.5">Voice + SMS text</td><td class="py-2.5 px-3.5">Digital encryption & SIM</td></tr>
                  <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40"><td class="py-2.5 px-3.5 font-mono font-bold">3G</td><td class="py-2.5 px-3.5 text-zinc-500">2000s</td><td class="py-2.5 px-3.5">WCDMA/UMTS</td><td class="py-2.5 px-3.5">Mobile broadband</td><td class="py-2.5 px-3.5">App stores & mobile web</td></tr>
                  <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40"><td class="py-2.5 px-3.5 font-mono font-bold">4G</td><td class="py-2.5 px-3.5 text-zinc-500">2010s</td><td class="py-2.5 px-3.5">All-IP LTE</td><td class="py-2.5 px-3.5">HD video, VoLTE</td><td class="py-2.5 px-3.5">Eliminated circuit-switching</td></tr>
                  <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 font-semibold"><td class="py-2.5 px-3.5 font-mono font-bold text-emerald-600 dark:text-emerald-400">5G</td><td class="py-2.5 px-3.5 text-zinc-500">2020s+</td><td class="py-2.5 px-3.5">mmWave/Slicing</td><td class="py-2.5 px-3.5">Multi-Gbps, V2X, IoT</td><td class="py-2.5 px-3.5 text-emerald-600 dark:text-emerald-400">eMBB, mMTC, URLLC (&lt;1ms)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  function stepCallTrace(delta) {
    state.currentCallStep = (state.currentCallStep + delta + 5) % 5;
    UNIFIED_AUDIO.play("flip");
    const container = document.getElementById("main-content");
    if (container) renderView("cheatsheet", container);
  }

  // --- 2. FLASHCARDS VIEW ---
  function filterFlashcards(cat) {
    state.selectedCategory = cat;
    if (cat === "all") {
      state.filteredCards = [...MOBCOM_DATA.flashcards];
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
      <div class="space-y-6 max-w-2xl mx-auto animate-fade-in">
        <!-- Filter Pills -->
        <div class="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div class="flex items-center gap-1.5 flex-wrap">
            <button onclick="MOBCOM_MODULE.onFilterCards('all')" class="px-2.5 py-1 rounded text-xs font-medium ${state.selectedCategory === 'all' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">All (24)</button>
            <button onclick="MOBCOM_MODULE.onFilterCards('mod1')" class="px-2.5 py-1 rounded text-xs font-medium ${state.selectedCategory === 'mod1' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Module 1</button>
            <button onclick="MOBCOM_MODULE.onFilterCards('mod2')" class="px-2.5 py-1 rounded text-xs font-medium ${state.selectedCategory === 'mod2' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Module 2</button>
            <button onclick="MOBCOM_MODULE.onFilterCards('mod3')" class="px-2.5 py-1 rounded text-xs font-medium ${state.selectedCategory === 'mod3' ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}">Module 3</button>
          </div>
          <button onclick="MOBCOM_MODULE.shuffleCards()" class="px-2.5 py-1 rounded text-xs font-mono font-semibold border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            🔀 Shuffle
          </button>
        </div>

        <!-- Progress Line -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Card ${currentNum} of ${total}</span>
            <span>${masteredCount} / ${MOBCOM_DATA.flashcards.length} Mastered</span>
          </div>
          <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div class="bg-zinc-900 dark:bg-zinc-100 h-full rounded-full transition-all duration-300" style="width: ${total > 0 ? (currentNum / total) * 100 : 0}%"></div>
          </div>
        </div>

        <!-- 3D Card Stage -->
        ${card ? `
          <div class="perspective-1000">
            <div
              id="mob-flashcard-flipper"
              onclick="MOBCOM_MODULE.toggleFlip()"
              class="flashcard ${state.isCardFlipped ? 'flipped' : ''} cursor-pointer select-none"
              style="min-height: 280px;"
            >
              <div class="flashcard-inner transform-style-3d relative w-full h-full" style="min-height: 280px;">
                <!-- Front Face -->
                <div class="flashcard-front backface-hidden absolute inset-0 p-6 sm:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold">${card.categoryName}</span>
                    <span class="text-xs font-mono text-zinc-400">Click or Space to flip</span>
                  </div>
                  <div class="my-auto py-4 text-center">
                    <h3 class="text-lg sm:text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      ${card.front}
                    </h3>
                  </div>
                  <div class="text-center text-[11px] font-mono text-zinc-500">
                    Press Space to view answer
                  </div>
                </div>

                <!-- Back Face -->
                <div class="flashcard-back backface-hidden rotate-y-180 absolute inset-0 p-6 sm:p-8 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 shadow-sm flex flex-col justify-between">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 dark:bg-zinc-200 text-zinc-300 dark:text-zinc-700 font-semibold">${card.categoryName}</span>
                    <span class="text-xs font-mono opacity-60">Answer</span>
                  </div>
                  <div class="my-auto py-4">
                    <p class="text-sm sm:text-base leading-relaxed text-zinc-200 dark:text-zinc-800">
                      ${card.back}
                    </p>
                  </div>
                  <div class="text-center text-[11px] font-mono opacity-60">
                    💡 Mnemonic: ${card.mnemonic}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : `
          <div class="p-12 text-center text-zinc-500">No cards in this filter.</div>
        `}

        <!-- Bottom Controls -->
        <div class="flex items-center justify-between gap-3 pt-2">
          <button onclick="MOBCOM_MODULE.prevCard()" class="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            ◀ Prev
          </button>
          <div class="flex items-center gap-2">
            <button onclick="MOBCOM_MODULE.markCard(false)" class="px-3.5 py-2.5 rounded-xl text-xs font-medium border border-rose-300 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100 transition-colors">
              ⟳ Still Learning
            </button>
            <button onclick="MOBCOM_MODULE.markCard(true)" class="px-3.5 py-2.5 rounded-xl text-xs font-medium border border-emerald-300 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors">
              ★ Mastered
            </button>
          </div>
          <button onclick="MOBCOM_MODULE.nextCard()" class="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Next ▶
          </button>
        </div>

        <div class="text-center text-[11px] font-mono text-zinc-400">
          Hotkeys: <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">Space</kbd> Flip • <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">←</kbd> <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">→</kbd> Nav • <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">1</kbd> Learning • <kbd class="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">2</kbd> Mastered
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

  // --- 3. MOCK EXAM VIEW ---
  function renderQuiz(container) {
    const q = MOBCOM_DATA.quizQuestions[state.currentQuizIndex];
    const isAnswered = state.quizAnswers[state.currentQuizIndex] !== undefined;
    const selectedOpt = state.quizAnswers[state.currentQuizIndex];

    let correctCount = 0;
    Object.keys(state.quizAnswers).forEach(idx => {
      if (state.quizAnswers[idx] === MOBCOM_DATA.quizQuestions[idx].correct) correctCount++;
    });

    container.innerHTML = `
      <div class="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <!-- Top Bar -->
        <div class="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">${q.category}</span>
            <span class="text-xs font-mono text-zinc-500">Item ${state.currentQuizIndex + 1} of ${MOBCOM_DATA.quizQuestions.length}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono text-zinc-500">Score: <strong class="text-zinc-900 dark:text-zinc-100 font-bold">${correctCount} / ${MOBCOM_DATA.quizQuestions.length}</strong></span>
            <button onclick="MOBCOM_MODULE.restartQuiz()" class="px-2 py-1 rounded text-xs font-mono border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              Restart
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
              const isCorrect = idx === q.correct;
              const isSelected = selectedOpt === idx;

              let btnStyle = "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 text-zinc-800 dark:text-zinc-200";

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200";
                }
              }

              return `
                <button
                  onclick="MOBCOM_MODULE.selectQuizAnswer(${idx})"
                  class="w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${btnStyle}"
                >
                  <span class="w-6 h-6 rounded-lg font-mono text-xs flex items-center justify-center flex-shrink-0 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">${letter}</span>
                  <span class="flex-1 leading-relaxed">${opt}</span>
                  ${isAnswered && isCorrect ? '<span class="text-emerald-600 dark:text-emerald-400 font-bold ml-2 text-xs">✓ Correct</span>' : ''}
                  ${isAnswered && isSelected && !isCorrect ? '<span class="text-rose-600 dark:text-rose-400 font-bold ml-2 text-xs">✗ Choice</span>' : ''}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Rationale -->
          ${isAnswered ? `
            <div class="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs animate-fade-in">
              <strong class="font-mono text-zinc-900 dark:text-zinc-100 block font-semibold">💡 Explanation</strong>
              <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">${q.explanation}</p>
            </div>
          ` : ''}
        </div>

        <!-- 20-Cell Jump Grid -->
        <div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
          <div class="flex items-center justify-between">
            <button onclick="MOBCOM_MODULE.navQuiz(-1)" ${state.currentQuizIndex === 0 ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium disabled:opacity-40">
              ◀ Prev
            </button>
            <div class="flex items-center gap-1.5 flex-wrap justify-center max-w-sm">
              ${MOBCOM_DATA.quizQuestions.map((item, idx) => {
                const ans = state.quizAnswers[idx];
                const isCurr = idx === state.currentQuizIndex;
                let bg = "bg-zinc-200 dark:bg-zinc-800 text-zinc-500";
                if (ans !== undefined) {
                  bg = ans === item.correct ? "bg-emerald-600 text-white" : "bg-rose-600 text-white";
                }
                if (isCurr) bg += " ring-2 ring-zinc-500";

                return `
                  <button onclick="MOBCOM_MODULE.jumpQuiz(${idx})" class="w-6 h-6 rounded text-[11px] font-mono font-bold flex items-center justify-center ${bg}">
                    ${idx + 1}
                  </button>
                `;
              }).join('')}
            </div>
            <button onclick="MOBCOM_MODULE.navQuiz(1)" ${state.currentQuizIndex === MOBCOM_DATA.quizQuestions.length - 1 ? 'disabled' : ''} class="px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium disabled:opacity-40">
              Next ▶
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function selectQuizAnswer(optIdx) {
    if (state.quizAnswers[state.currentQuizIndex] !== undefined) return;
    state.quizAnswers[state.currentQuizIndex] = optIdx;

    const q = MOBCOM_DATA.quizQuestions[state.currentQuizIndex];
    if (optIdx === q.correct) {
      UNIFIED_AUDIO.play("correct");
    } else {
      UNIFIED_AUDIO.play("wrong");
    }

    saveModuleState();

    // Check completion
    const answeredCount = Object.keys(state.quizAnswers).length;
    if (answeredCount === MOBCOM_DATA.quizQuestions.length) {
      let correct = 0;
      Object.keys(state.quizAnswers).forEach(i => {
        if (state.quizAnswers[i] === MOBCOM_DATA.quizQuestions[i].correct) correct++;
      });
      const pct = Math.round((correct / MOBCOM_DATA.quizQuestions.length) * 100);
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
    state.currentQuizIndex = Math.max(0, Math.min(MOBCOM_DATA.quizQuestions.length - 1, state.currentQuizIndex + delta));
    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
    UNIFIED_AUDIO.play("flip");
  }

  function jumpQuiz(idx) {
    state.currentQuizIndex = idx;
    const container = document.getElementById("main-content");
    if (container) renderView("quiz", container);
    UNIFIED_AUDIO.play("flip");
  }

  function restartQuiz() {
    if (confirm("Reset all quiz answers?")) {
      state.quizAnswers = {};
      state.currentQuizIndex = 0;
      saveModuleState();
      const container = document.getElementById("main-content");
      if (container) renderView("quiz", container);
    }
  }

  // --- 4. GUIDE QUESTIONS VIEW ---
  function renderGuideQuestions(container) {
    const reviewedCount = Object.values(state.guideReviewed).filter(v => v === true).length;

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in max-w-3xl mx-auto">
        <div class="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span class="text-xs font-mono uppercase text-zinc-500 font-semibold">Official Syllabus Pointers</span>
            <h2 class="text-xl sm:text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
              12 Prelim Guide Questions Solved
            </h2>
          </div>
          <span class="text-xs font-mono px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
            ${reviewedCount} / ${MOBCOM_DATA.guideQuestions.length} Reviewed
          </span>
        </div>

        <div class="space-y-4">
          ${MOBCOM_DATA.guideQuestions.map(item => {
            const isDone = state.guideReviewed[item.num] === true;

            return `
              <div class="p-5 sm:p-6 rounded-2xl border ${isDone ? 'border-emerald-300 dark:border-emerald-950 bg-emerald-50/30 dark:bg-emerald-950/20' : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60'} space-y-3.5 transition-all">
                <div class="flex items-start justify-between gap-3 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                  <div class="flex items-start gap-2.5">
                    <span class="w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 ${isDone ? 'bg-emerald-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}">
                      Q${item.num}
                    </span>
                    <h3 class="text-sm sm:text-base font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      ${item.question}
                    </h3>
                  </div>
                  <label class="flex items-center gap-1.5 cursor-pointer select-none px-2.5 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex-shrink-0">
                    <input
                      type="checkbox"
                      onchange="MOBCOM_MODULE.toggleGuideReview(${item.num}, this.checked)"
                      ${isDone ? 'checked' : ''}
                      class="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span class="text-[11px] font-mono font-semibold ${isDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500'}">Reviewed</span>
                  </label>
                </div>

                <div class="space-y-3 text-xs">
                  <div class="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <span class="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">🎯 Direct Answer Summary</span>
                    <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">${item.directAnswer}</p>
                  </div>

                  <div class="space-y-1.5 pl-1">
                    <span class="text-[10px] font-mono uppercase text-zinc-500 font-bold block">📌 Deep-Dive Details & Mechanisms</span>
                    <ul class="space-y-1 text-zinc-600 dark:text-zinc-300">
                      ${item.details.map(d => `<li class="flex items-start gap-2"><span class="text-zinc-400 mt-0.5">•</span><span>${d}</span></li>`).join('')}
                    </ul>
                  </div>

                  <div class="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
                    <span>💡 <strong>Exam Tip:</strong> ${item.examTip}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function toggleGuideReview(num, checked) {
    state.guideReviewed[num] = checked;
    saveModuleState();
    if (checked) UNIFIED_AUDIO.play("correct");
    const container = document.getElementById("main-content");
    if (container) renderView("guide", container);
  }

  // --- 5. GLOSSARY VIEW ---
  function renderGlossary(container) {
    const filtered = state.selectedGlossaryCat === "all"
      ? MOBCOM_DATA.glossary
      : MOBCOM_DATA.glossary.filter(g => g.cat === state.selectedGlossaryCat);

    container.innerHTML = `
      <div class="space-y-6 animate-fade-in max-w-3xl mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <span class="text-xs font-mono uppercase text-zinc-500 font-semibold">Technical Terminology</span>
            <h2 class="text-xl sm:text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
              Acronyms & Glossary Fast Lookup
            </h2>
          </div>
          <div class="flex items-center gap-1.5 flex-wrap">
            ${["all", "Hardware", "Cellular", "Media", "General"].map(cat => `
              <button
                onclick="MOBCOM_MODULE.filterGlossary('${cat}')"
                class="px-2.5 py-1 rounded text-xs font-medium ${state.selectedGlossaryCat === cat ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}"
              >
                ${cat === 'all' ? 'All (20)' : cat}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          ${filtered.map(item => `
            <div class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-mono font-bold text-sm text-zinc-900 dark:text-zinc-100">${item.term}</span>
                <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">${item.cat}</span>
              </div>
              <strong class="text-xs font-medium text-zinc-700 dark:text-zinc-300 block">${item.full}</strong>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function filterGlossary(cat) {
    state.selectedGlossaryCat = cat;
    const container = document.getElementById("main-content");
    if (container) renderView("glossary", container);
  }

  return {
    id: "mobcom",
    tabs: [
      { id: "cheatsheet", name: "Cheat Sheets" },
      { id: "flashcards", name: "Flashcards" },
      { id: "quiz", name: "Mock Exam" },
      { id: "guide", name: "Guide Questions" },
      { id: "glossary", name: "Glossary" }
    ],
    state,
    init,
    renderView,
    calculateReadiness,
    stepCallTrace,
    onFilterCards,
    shuffleCards,
    toggleFlip,
    nextCard,
    prevCard,
    markCard,
    selectQuizAnswer,
    navQuiz,
    jumpQuiz,
    restartQuiz,
    toggleGuideReview,
    filterGlossary
  };
})();

if (typeof window !== "undefined") {
  window.MOBCOM_MODULE = MOBCOM_MODULE;
}
