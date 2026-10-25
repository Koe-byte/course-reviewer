/**
 * Unified Reviewer — Course Dataset
 * GEd 104: The Contemporary World
 * Batangas State University • Alangilan Campus
 * 
 * Complete Curricular Coverage:
 * - Unit 1: Introduction to Globalization (Weeks 1–2 / Prelim)
 * - Lesson 2: Global Structure of Globalization (Weeks 3–5 / Prelim & Midterm)
 * - Lesson 3: World of Regions (Global North, Global South, Asia & South Pacific)
 */

const CW_DATA = {
  courseInfo: {
    id: "cw",
    university: "Batangas State University",
    campus: "Alangilan Campus",
    college: "College of Informatics and Computing Sciences (CICS) • BS Computing Sciences",
    courseCode: "GEd 104",
    courseTitle: "The Contemporary World",
    termScope: "Preliminary & Midterm Examination Reviewer",
    academicYear: "AY 2026–2027",
    instructor: "Hannah Carmela V. Marquez, LPT",
    officialPointers: [
      {
        section: "Lesson 2: Global Structure of Globalization",
        items: [
          "Market Integration, Stock Market Integration, and Financial Market Integration",
          "Global Corporations and Foreign Direct Investments (FDI)",
          "BRICS Economies: Acronym, growing markets, and low production costs",
          "General Agreement on Trade in Services (GATS) — 1995 Uruguay Round",
          "Global Interstate System: Inter-state interaction & political relationships",
          "Thomas Friedman: Golden Straitjacket (economy grows, politics shrinks) & Electronic Herd",
          "7 Stages of Economic Integration (PTA, FTA, Customs Union, Common Market, Economic Union, EMU, Complete)",
          "Neoliberalism: Capital dominance & restoration of elite power",
          "Economic Sovereignty: Definition & national government control",
          "Social Movements and Global Justice Movement",
          "United Nations: Roles, international order, and Peacekeeping as MOST important feature",
          "4 Basic Elements of a State: Population, Government, Territory, Sovereignty (P-G-T-S)",
          "Contemporary Global Governance: Sum of laws, norms, policies, and institutions"
        ]
      },
      {
        section: "Lesson 3: World of Regions",
        items: [
          "Global North: Well-developed, industrialized, wealthy nations supporting degradation victims",
          "Global South: Developing nations, climate justice vanguard, deterritorialized capitalism externalities",
          "Asia and South Pacific: New political force, 'Laboratories of Modernity', external phenomenon vs. early modern trade routes"
        ]
      },
      {
        section: "Unit 1: Introduction to Globalization (Foundations)",
        items: [
          "Steger's Definition & 4 Characteristics of Globalization",
          "Silk Road & 5 Historical Periods of Globalization",
          "6 Dimensions of Globalization & 8 Roman Catholic Social Principles",
          "5 Neoliberal Globalism Claims vs. Critical Realities"
        ]
      }
    ]
  },

  // ==========================================
  // HIGH-YIELD MEMORIZATION ANCHORS & MNEMONICS
  // ==========================================
  mnemonics: [
    {
      code: "P-G-T-S",
      title: "4 Basic Elements of a State",
      hook: "People Govern Their State",
      items: [
        { letter: "P", name: "Population", meaning: "The people living in the state" },
        { letter: "G", name: "Government", meaning: "The system that manages and organizes the state" },
        { letter: "T", name: "Territory", meaning: "Defined land, water, and airspace" },
        { letter: "S", name: "Sovereignty", meaning: "The power to govern itself without outside control" }
      ]
    },
    {
      code: "B-R-I-C-S",
      title: "BRICS Emerging Economies",
      hook: "Building blocks of lower production costs & rapidly expanding consumer markets",
      items: [
        { letter: "B", name: "Brazil", meaning: "Latin American agricultural & commodity powerhouse" },
        { letter: "R", name: "Russia", meaning: "Eurasian energy and natural resource economy" },
        { letter: "I", name: "India", meaning: "South Asian tech, service, and demographic engine" },
        { letter: "C", name: "China", meaning: "Global manufacturing and industrial powerhouse" },
        { letter: "S", name: "South Africa", meaning: "African mineral, finance, and industrial gateway" }
      ]
    },
    {
      code: "P-F-C-C-E-E-C",
      title: "7 Stages of Economic Integration (Ladder of Integration)",
      hook: "Please Find Customs Commonly, Every Exchange Complete",
      items: [
        { letter: "1. PTA", name: "Preferential Trading Area", meaning: "Reduce tariffs on selected goods (e.g., agriculture, textiles)" },
        { letter: "2. FTA", name: "Free Trade Area", meaning: "Eliminate tariffs between member nations entirely" },
        { letter: "3. CU", name: "Customs Union", meaning: "Harmonize external tariffs: Common External Tariff for non-members (goods)" },
        { letter: "4. CM", name: "Common Market", meaning: "Remove all barriers for free movement of goods, labor, and capital" },
        { letter: "5. EU", name: "Economic Union", meaning: "Create common economic policies (competition, environment, labor)" },
        { letter: "6. EMU", name: "Economic & Monetary Union", meaning: "Common economic policies + use the SAME CURRENCY (e.g., Euro)" },
        { letter: "7. CEI", name: "Complete Economic Integration", meaning: "Unified monetary & fiscal policies into a single economy" }
      ]
    },
    {
      code: "GS vs EH",
      title: "Thomas Friedman's Dual Market Forces",
      hook: "Straitjacket constrains governments; Herd stampedes capital",
      items: [
        { letter: "Golden Straitjacket", name: "Policy Constraint", meaning: "Adopting neoliberal free-market rules: Economy GROWS while Politics SHRINKS" },
        { letter: "Electronic Herd", name: "Speculative Capital", meaning: "International investors who quickly shift funds globally in response to economic conditions" }
      ]
    }
  ],

  // 7 Stages Table
  integrationStages: [
    {
      stage: 1,
      acronym: "PTA",
      name: "Preferential Trading Area",
      keyFeature: "Reduce tariffs on selected goods (e.g., agriculture, textiles).",
      example: "Selective bilateral concessions",
      scope: "Selected Goods"
    },
    {
      stage: 2,
      acronym: "FTA",
      name: "Free Trade Area",
      keyFeature: "Eliminate tariffs between members.",
      example: "NAFTA / USMCA, AFTA",
      scope: "All Internal Goods"
    },
    {
      stage: 3,
      acronym: "CU",
      name: "Customs Union",
      keyFeature: "Harmonize external tariff policies and agree on a common external tariff for non-member imports. (focused on goods)",
      example: "Mercosur, SACU",
      scope: "Common External Tariff"
    },
    {
      stage: 4,
      acronym: "CM",
      name: "Common Market",
      keyFeature: "All barriers are removed to allow free movement of goods, labor, and capital.",
      example: "EEC (pre-1993)",
      scope: "4 Freedoms (Labor/Capital)"
    },
    {
      stage: 5,
      acronym: "EU",
      name: "Economic Union",
      keyFeature: "Create common economic policies, including rules on competition, environment, and labor.",
      example: "European Union regulatory harmonization",
      scope: "Harmonized Policies"
    },
    {
      stage: 6,
      acronym: "EMU",
      name: "Economic & Monetary Union",
      keyFeature: "Create common economic policies and use the same currency (e.g., Euro).",
      example: "Eurozone (1999–Present)",
      scope: "Single Common Currency"
    },
    {
      stage: 7,
      acronym: "CEI",
      name: "Complete Economic Integration",
      keyFeature: "Unified policies and single economy.",
      example: "Total supranational federation",
      scope: "Complete Policy Unification"
    }
  ],

  // Global North vs. Global South Comparison Matrix
  northSouthMatrix: [
    {
      dimension: "Socio-Economic Development",
      globalNorth: "Well-developed, highly industrialized, wealthy countries with advanced technology.",
      globalSouth: "Developing, poorer nations with less technological advancement."
    },
    {
      dimension: "Environmental & Climate Role",
      globalNorth: "Expected to financially & technically support nations most affected by environmental degradation.",
      globalSouth: "Leads radical calls for global climate justice and loss & damage accountability."
    },
    {
      dimension: "Relation to Capitalist Economy",
      globalNorth: "Home to corporate headquarters, capital centers, and beneficiaries of global value chains.",
      globalSouth: "A deterritorialized economy of capitalism's externalities; accounts for subjugated peoples within borders of wealthier countries."
    },
    {
      dimension: "Geopolitical Dynamics",
      globalNorth: "Dominates international financial institutions (IMF, World Bank, WTO) and G7.",
      globalSouth: "Mobilizes through solidarity coalitions (G77, Non-Aligned Movement, BRICS+)."
    }
  ],

  // ==========================================
  // FLASHCARDS (44 ACTIVE-RECALL ITEMS)
  // ==========================================
  flashcards: [
    // --- LESSON 2: GLOBAL STRUCTURE OF GLOBALIZATION (OFFICIAL REVIEWER POINTERS) ---
    {
      id: 101,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "DEFINITION",
      isMidterm: true,
      front: "What is Market Integration?",
      back: "Refer to the movement of prices of related goods and services sold in a defined geographical location in similar patterns.\n\nExample: The price of oil in Country X and Country Y becomes similar because both countries import and export oil with each other.",
      hint: "Price co-movement in similar patterns (e.g. oil between Country X & Y)"
    },
    {
      id: 102,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "DEFINITION",
      isMidterm: true,
      front: "What is Stock Market Integration?",
      back: "Happens when stock markets in different countries move in the same direction.\n\nKey Proof: Stocks rise and fall together across borders, justifying how stock markets are integrated internationally.",
      hint: "Stock markets in different countries moving in the same direction"
    },
    {
      id: 103,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "DEFINITION",
      isMidterm: true,
      front: "What is Financial Market Integration?",
      back: "An open market economy between countries facilitated by a common currency and the elimination of technical, regulatory, and tax differences to encourage the free flow of capital and investment across borders.",
      hint: "Common currency + elimination of technical/regulatory/tax differences"
    },
    {
      id: 104,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "DEFINITION",
      isMidterm: true,
      front: "What is a Global Corporation?",
      back: "A business that operates in two or more countries.",
      hint: "Two or more countries (transnational enterprise)"
    },
    {
      id: 105,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "DEFINITION",
      isMidterm: true,
      front: "What is Foreign Direct Investment (FDI)?",
      back: "• A major driver of extended global corporate development.\n• Happens when a company invests money, technology, and management skills from one country to build a business or factory in another country.",
      hint: "Money + technology + management skills to build a business/factory abroad"
    },
    {
      id: 106,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "ACRONYM & CONCEPT",
      isMidterm: true,
      front: "What are the BRICS Economies and why do businesses invest in them?",
      back: "• Acronym: Combined economies of Brazil, Russia, India, China, and South Africa.\n• Why invest: These countries often have growing markets and lower production costs, making them prime locations for foreign business expansion.",
      hint: "Brazil, Russia, India, China, South Africa • Growing markets + lower costs"
    },
    {
      id: 107,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "TREATY & HISTORY",
      isMidterm: true,
      front: "What is the General Agreement on Trade in Services (GATS)?",
      back: "The first multilateral agreement covering trade in services.\n\n• Negotiated during the last round of multilateral trade negotiations called the Uruguay Round.\n• Came into force in 1995 (under the WTO framework).",
      hint: "First multilateral services agreement • Uruguay Round • Came into force 1995"
    },
    {
      id: 108,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "DEFINITION",
      isMidterm: true,
      front: "What is the Global Interstate System?",
      back: "Refers to how countries interact and cooperate with each other in the modern world.\n\nCore Focus: It mainly focuses on political relationships between sovereign states.",
      hint: "How countries interact & cooperate • Focuses on political relationships"
    },
    {
      id: 109,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "THEORY & METAPHOR",
      isMidterm: true,
      front: "What is Thomas Friedman's 'Golden Straitjacket'?",
      back: "• A forced choice upon states either to conform to free market principles or run the risk of being left behind.\n• Effect: When a nation adopts neoliberal economic policies, political freedom may shrink while the economy grows (narrowing policy choices).",
      hint: "Free-market conformity: Economy GROWS, political freedom SHRINKS"
    },
    {
      id: 110,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "THEORY & METAPHOR",
      isMidterm: true,
      front: "What is the 'Electronic Herd'?",
      back: "Refers to international investors who quickly move their money from one country to another depending on economic conditions because investors react quickly to economic changes.",
      hint: "International investors quickly shifting capital reacting to economic changes"
    },
    {
      id: 111,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "ENUMERATION",
      isMidterm: true,
      front: "Name the 7 Stages of Economic Integration in sequence",
      back: "1. Preferential Trading Area (PTA)\n2. Free Trade Area (FTA)\n3. Customs Union\n4. Common Market\n5. Economic Union\n6. Economic & Monetary Union\n7. Complete Economic Integration\n\nMnemonic: Please Find Customs Commonly, Every Exchange Complete",
      hint: "PTA ➔ FTA ➔ Customs Union ➔ Common Market ➔ Economic Union ➔ EMU ➔ Complete"
    },
    {
      id: 112,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "COMPARISON",
      isMidterm: true,
      front: "Compare the Key Features of PTA, FTA, and Customs Union",
      back: "• PTA (Stage 1): Reduce tariffs on selected goods (e.g., agriculture, textiles).\n• FTA (Stage 2): Eliminate tariffs between member countries.\n• Customs Union (Stage 3): Harmonize external tariff policies and agree on a common external tariff for non-member imports (focused on goods).",
      hint: "Selected tariff cuts ➔ Zero internal tariffs ➔ Common external tariff"
    },
    {
      id: 113,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "COMPARISON",
      isMidterm: true,
      front: "Compare Common Market, Economic Union, and Economic & Monetary Union",
      back: "• Common Market (Stage 4): Remove all barriers to allow free movement of goods, labor, and capital.\n• Economic Union (Stage 5): Create common economic policies (competition, environment, labor).\n• Economic & Monetary Union (Stage 6): Common economic policies + use the SAME CURRENCY (e.g., Euro).",
      hint: "Free labor/capital ➔ Common economic policies ➔ Same currency (Euro)"
    },
    {
      id: 114,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "DEFINITION",
      isMidterm: true,
      front: "What is Neoliberalism?",
      back: "The intensification of the influence and dominance of capital and political power, referred to as a project to strengthen, restore, or, in some cases, constitute anew the power of economic elites.",
      hint: "Intensification of capital & political power to restore power of economic elites"
    },
    {
      id: 115,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "DEFINITION",
      isMidterm: true,
      front: "What is Economic Sovereignty and who holds it?",
      back: "• Definition: The power of a country to control its own economy.\n• Locus: Held by the national government.",
      hint: "Power of a country to control its economy • Held by national government"
    },
    {
      id: 116,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "DEFINITION",
      isMidterm: true,
      front: "What is a Social Movement vs. Global Justice Movement?",
      back: "• Social Movement: A group of people who come together to support or oppose changes in society.\n• Global Justice Movement: Believes global economic systems should be fairer and more equal.",
      hint: "Group advocating/opposing social change • Believes global economy must be fairer"
    },
    {
      id: 117,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "INSTITUTIONS",
      isMidterm: true,
      front: "What are the Roles and Functions of the United Nations (UN)?",
      back: "• Tasked to promote international co-operation and to create and maintain international order.\n• Peacekeeping: To prevent taking a stance on politics, peacekeeping is kept to be the MOST important feature of UN activity in peace and security.",
      hint: "Promote co-operation & order • Peacekeeping is the MOST important feature"
    },
    {
      id: 118,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "MNEMONIC",
      isMidterm: true,
      front: "What are the 4 Basic Elements of a State? (Mnemonic: P-G-T-S)",
      back: "1. POPULATION: Refers to the people living in the state.\n2. GOVERNMENT: The system that manages and organizes the state.\n3. TERRITORY: Refers to the defined land, water, and airspace.\n4. SOVEREIGNTY: The power to govern itself without outside control.\n\nMnemonic: People Govern Their State",
      hint: "P-G-T-S: Population, Government, Territory, Sovereignty"
    },
    {
      id: 119,
      unit: "Lesson 2",
      category: "Lesson 2: Global Structure",
      typeBadge: "DEFINITION",
      isMidterm: true,
      front: "What is Contemporary Global Governance?",
      back: "It is the sum of laws, norms, policies, and institutions that define, constitute, and mediate trans-border relations between states, cultures, citizens, intergovernmental organizations, and markets.",
      hint: "Sum of laws, norms, policies & institutions mediating trans-border relations"
    },

    // --- LESSON 3: WORLD OF REGIONS (OFFICIAL REVIEWER POINTERS) ---
    {
      id: 120,
      unit: "Lesson 3",
      category: "Lesson 3: World of Regions",
      typeBadge: "REGIONS",
      isMidterm: true,
      front: "What is the Global North?",
      back: "• Well-developed, industrialized, wealthy countries.\n• Environmental Duty: Northern nations are expected to support those most affected by environmental degradation.",
      hint: "Well-developed, wealthy, industrialized • Expected to support degradation victims"
    },
    {
      id: 121,
      unit: "Lesson 3",
      category: "Lesson 3: World of Regions",
      typeBadge: "REGIONS",
      isMidterm: true,
      front: "What is the Global South and what causes does it champion?",
      back: "• Developing, poorer nations with less technological advancement.\n• Climate Justice: Global South leads radical calls for climate justice.\n• Critical Perspective: A deterritorialized economy of capitalism's externalities and means to account for subjugated peoples within the borders of wealthier countries.",
      hint: "Developing, poorer nations • Leads radical calls for climate justice"
    },
    {
      id: 122,
      unit: "Lesson 3",
      category: "Lesson 3: World of Regions",
      typeBadge: "REGIONS",
      isMidterm: true,
      front: "How is Asia and South Pacific characterized in global politics?",
      back: "• A new political force in the contemporary world.\n• Known as the 'laboratories of modernity'.\n• External Globalization: Globalization in the Asia Pacific and South Asia is viewed as an external phenomenon being pushed into the region by world powers like the US and Europe.",
      hint: "New political force • 'Laboratories of Modernity' • External push from US/Europe"
    },
    {
      id: 123,
      unit: "Lesson 3",
      category: "Lesson 3: World of Regions",
      typeBadge: "HISTORY",
      isMidterm: true,
      front: "What historical role did Asia play in the early modern world economy?",
      back: "Asia was the central global force in the early modern world economy because it was the site of the most important trade routes and in some places was more advanced in technology.",
      hint: "Central global force in early modern economy • Site of key trade routes"
    },

    // --- UNIT 1 & UNIT 2 FOUNDATIONS (PRELIMINARY EXAM RETAINED) ---
    {
      id: 1,
      unit: "Unit 1",
      category: "Unit 1: Globalization",
      typeBadge: "DEFINITION",
      isMidterm: false,
      front: "What is Manfred Steger's definition of Globalization?",
      back: "An expansion and intensification of social relations and consciousness across world-time and world-space.",
      hint: "Expansion and intensification across world-time and world-space"
    },
    {
      id: 2,
      unit: "Unit 1",
      category: "Unit 1: Globalization",
      typeBadge: "COMPARISON",
      isMidterm: false,
      front: "Economic Globalization vs. Internationalization (Peter Dicken)",
      back: "Economic globalization is qualitative functional integration between dispersed activities producing TNCs. Internationalization is simply quantitative extension of activities across borders.",
      hint: "Qualitative transformation vs Quantitative extension"
    },
    {
      id: 3,
      unit: "Unit 1",
      category: "Unit 1: Globalization",
      typeBadge: "ENUMERATION",
      isMidterm: false,
      front: "What are the 2 major driving forces for economic globalization?",
      back: "1. Rapid growing of information in all types of productive activities.\n2. Marketization (restructuring state enterprises, reducing subsidies, privatization).",
      hint: "Information technology growth + Marketization"
    },
    {
      id: 4,
      unit: "Unit 1",
      category: "Unit 1: Globalization",
      typeBadge: "ENUMERATION",
      isMidterm: false,
      front: "Three Reasons to Study the World (GEd 104)",
      back: "1. End parochialism (narrow-mindedness)\n2. Teach you about yourself\n3. You are interacting with it.",
      hint: "Parochialism, Self-understanding, Active interaction"
    },
    {
      id: 5,
      unit: "Unit 1",
      category: "Unit 1: Globalization",
      typeBadge: "SEQUENCE",
      isMidterm: false,
      front: "5 Historical Periods of Globalization",
      back: "1. Prehistoric (10,000 BCE–3500 BCE: Nomads)\n2. Pre-Modern (3500 BCE–1500 CE: Wheel, Writing, Silk Road)\n3. Early Modern (1500–1750: Renaissance, Capitalism)\n4. Modern (1750–1970: Industrialization, railways)\n5. Contemporary (1970–Present: ICT Revolution).",
      hint: "Prehistoric ➔ Pre-Modern ➔ Early Modern ➔ Modern ➔ Contemporary"
    },
    {
      id: 6,
      unit: "Unit 1",
      category: "Unit 1: Globalization",
      typeBadge: "ENUMERATION",
      isMidterm: false,
      front: "4 Core Characteristics of Globalization (Steger)",
      back: "1. Creation of new social networks & connections\n2. Expansion & stretching of social relations\n3. Intensification & acceleration of social exchanges\n4. Subjective plane of human consciousness (globality).",
      hint: "Networks, Social stretching, Acceleration, Consciousness"
    },
    {
      id: 7,
      unit: "Unit 1",
      category: "Unit 1: Globalization",
      typeBadge: "RELIGION & ETHICS",
      isMidterm: false,
      front: "Subsidiarity in Roman Catholic Social Teachings",
      back: "The principle that decisions should be made at the lowest competent level in order to preserve human dignity and achieve the common good.",
      hint: "Decisions handled by smallest / least centralized competent authority"
    },
    {
      id: 8,
      unit: "Unit 2",
      category: "Unit 2: Monetary Systems",
      typeBadge: "MONETARY HISTORY",
      isMidterm: false,
      front: "Bretton Woods System (1944–1971)",
      back: "44 nations met in New Hampshire: US Dollar was pegged to gold ($35/oz), and member currencies pegged to USD. Created the IMF and World Bank.",
      hint: "USD pegged to gold at $35/oz + IMF & World Bank"
    },
    {
      id: 9,
      unit: "Unit 2",
      category: "Unit 2: Trade Policies",
      typeBadge: "TRADE THEORY",
      isMidterm: false,
      front: "Comparative Advantage (David Ricardo)",
      back: "The ability of a nation or party to produce a particular good or service at a lower opportunity cost than its trading partners.",
      hint: "Lower opportunity cost (sacrificing fewer alternative goods)"
    },
    {
      id: 10,
      unit: "Unit 2",
      category: "Unit 2: Sovereignty",
      typeBadge: "SOVEREIGNTY",
      isMidterm: false,
      front: "Westphalian Sovereignty (Stephen Krasner)",
      back: "The principle of non-interference in the internal domestic political and constitutional arrangements of another sovereign state (tracing back to 1648).",
      hint: "Non-interference in domestic arrangements of other states"
    }
  ],

  // ==========================================
  // GUIDE QUESTIONS (ACTIVE RECALL SELF-TESTING)
  // ==========================================
  guideQuestions: [
    {
      num: 1,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "How is 'Market Integration' defined, and what classic commodity example illustrates it?",
      answer: "Market Integration refers to the movement of prices of related goods and services sold in a defined geographical location in similar patterns. For example, the price of oil in Country X and Country Y becomes similar because both countries import and export oil with each other.",
      mnemonic: "Memory Cue: Oil price co-movement across trading borders."
    },
    {
      num: 2,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "What justifies or proves that stock markets in different countries are integrated?",
      answer: "Stock market integration happens when stock markets in different countries move in the same direction. Stocks rise and fall together across borders, which directly proves their integration.",
      mnemonic: "Memory Cue: 'Rise and fall together' in the same direction."
    },
    {
      num: 3,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "What three barriers must be eliminated to achieve Financial Market Integration?",
      answer: "Financial Market Integration requires an open market economy facilitated by a common currency and the elimination of: 1. Technical differences, 2. Regulatory differences, and 3. Tax differences to encourage free flow of capital across borders.",
      mnemonic: "Acronym: T-R-T (Technical, Regulatory, Tax differences eliminated)."
    },
    {
      num: 4,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "What is Foreign Direct Investment (FDI), and what three things does a company transfer abroad?",
      answer: "FDI is a major driver of extended global corporate development. It happens when a company invests 1. Money, 2. Technology, and 3. Management skills from one country to build a business or factory in another country.",
      mnemonic: "Memory Triad: Money + Technology + Management skills."
    },
    {
      num: 5,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "What does the acronym BRICS stand for, and why are businesses eager to expand into these nations?",
      answer: "BRICS stands for Brazil, Russia, India, China, and South Africa. Businesses invest heavily because these countries feature rapidly growing consumer markets and significantly lower production costs.",
      mnemonic: "B-R-I-C-S: Growing Markets + Lower Production Costs."
    },
    {
      num: 6,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "What is GATS, during which negotiation round was it drafted, and when did it take effect?",
      answer: "General Agreement on Trade in Services (GATS) is the first multilateral agreement covering trade in services. It was negotiated during the Uruguay Round of multilateral trade talks and came into force in 1995.",
      mnemonic: "Memory Anchor: GATS = Services • Uruguay Round • 1995."
    },
    {
      num: 7,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "According to Thomas Friedman, what is the 'Golden Straitjacket' and what two things happen to a country that puts it on?",
      answer: "The Golden Straitjacket is a forced choice upon states to conform to free market principles or risk being left behind. When adopted, the economy grows while political freedom and policy choices shrink.",
      mnemonic: "Friedman's Formula: Economy GROWS ➔ Politics SHRINKS."
    },
    {
      num: 8,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "Who constitutes the 'Electronic Herd' and how do they behave?",
      answer: "The Electronic Herd refers to international currency and stock investors who quickly move vast capital from one country to another depending on economic conditions because they react swiftly to changes.",
      mnemonic: "Memory Metaphor: Rapid capital stampede in and out."
    },
    {
      num: 9,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "List all 7 stages of economic integration and state the unique advancement in Stage 3 and Stage 6.",
      answer: "Stages: 1. PTA ➔ 2. FTA ➔ 3. Customs Union ➔ 4. Common Market ➔ 5. Economic Union ➔ 6. Economic & Monetary Union ➔ 7. Complete Economic Integration. In Stage 3 (Customs Union), members harmonize external tariffs with a Common External Tariff. In Stage 6 (EMU), members adopt a single common currency (e.g. Euro).",
      mnemonic: "Stage 3 = Common External Tariff; Stage 6 = Common Currency (Euro)."
    },
    {
      num: 10,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "How does the reviewer define Neoliberalism?",
      answer: "Neoliberalism is the intensification of the influence and dominance of capital and political power, and is referred to as a project to strengthen, restore, or, in some cases, constitute anew the power of economic elites.",
      mnemonic: "Core Purpose: Restoring/strengthening power of economic elites."
    },
    {
      num: 11,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "What is Economic Sovereignty, and which governmental body holds it?",
      answer: "Economic Sovereignty is the power of a country to control its own national economy. It is held exclusively by the national government.",
      mnemonic: "Held by: The National Government."
    },
    {
      num: 12,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "What is the primary belief of the Global Justice Movement?",
      answer: "The Global Justice Movement believes that global economic systems should be fairer and more equal.",
      mnemonic: "Core Demand: Fairer and more equal global economic systems."
    },
    {
      num: 13,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "Why is Peacekeeping kept as the most important feature of United Nations activity in peace and security?",
      answer: "Peacekeeping is kept to be the MOST important feature of UN activity in peace and security specifically to prevent the UN from taking a political stance in sovereign disputes.",
      mnemonic: "UN Neutrality: Peacekeeping prevents taking a political stance."
    },
    {
      num: 14,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "What are the 4 basic elements of a state? (Mnemonic: P-G-T-S)",
      answer: "1. Population: The people living in the state. 2. Government: The system managing and organizing the state. 3. Territory: Defined land, water, and airspace. 4. Sovereignty: The power to govern itself without outside control.",
      mnemonic: "P-G-T-S: People Govern Their State."
    },
    {
      num: 15,
      lesson: "Lesson 2: Global Structure",
      isMidterm: true,
      question: "How does the module define Contemporary Global Governance?",
      answer: "It is the sum of laws, norms, policies, and institutions that define, constitute, and mediate trans-border relations between states, cultures, citizens, intergovernmental organizations, and markets.",
      mnemonic: "Sum of laws, norms, policies, institutions across borders."
    },
    {
      num: 16,
      lesson: "Lesson 3: World of Regions",
      isMidterm: true,
      question: "What ecological responsibility is expected of the Global North?",
      answer: "Northern nations (well-developed, industrialized, wealthy) are expected to support those most severely affected by environmental degradation.",
      mnemonic: "Global North: Financial & structural support for environmental degradation."
    },
    {
      num: 17,
      lesson: "Lesson 3: World of Regions",
      isMidterm: true,
      question: "How is the Global South conceptualized regarding climate and capitalism?",
      answer: "The Global South leads radical calls for climate justice. Academically, it represents a deterritorialized economy of capitalism's externalities and a means to account for subjugated peoples within the borders of wealthier countries.",
      mnemonic: "Global South: Radical climate justice + Capitalism's externalities."
    },
    {
      num: 18,
      lesson: "Lesson 3: World of Regions",
      isMidterm: true,
      question: "Why is the Asia and South Pacific region called the 'laboratories of modernity'?",
      answer: "Because it is a rising political force experimenting with rapid modern industrialization, urban growth, and regional integration, while globalization is viewed as an external phenomenon pushed in by Western powers like the US and Europe.",
      mnemonic: "'Laboratories of Modernity' + External globalization push."
    },
    {
      num: 19,
      lesson: "Lesson 3: World of Regions",
      isMidterm: true,
      question: "What central global role did Asia hold in the early modern world economy?",
      answer: "Asia was the central global force in the early modern world economy because it was the site of the world's most critical trade routes and in several regions possessed superior, more advanced technology.",
      mnemonic: "Early Modern Hub: Site of vital trade routes & advanced technology."
    },
    {
      num: 20,
      lesson: "Unit 1: Globalization",
      isMidterm: false,
      question: "What are Manfred Steger's four core characteristics of globalization?",
      answer: "1. Creation of new social networks and multiplication of connections. 2. Expansion and stretching of social relations. 3. Intensification and acceleration of social exchanges. 4. Subjective plane of human consciousness (globality).",
      mnemonic: "Networks, Social Stretching, Acceleration, Global Consciousness."
    }
  ],

  // ==========================================
  // MOCK EXAM BANK (30 ACTIVE RECALL QUESTIONS)
  // Equipped with Think-First Clues & Rationales
  // ==========================================
  quizQuestions: [
    {
      id: 101,
      unit: "Lesson 2",
      topic: "Market Integration",
      isMidterm: true,
      question: "When the price of oil in Country X and Country Y becomes similar because both nations actively import and export oil with each other, what economic concept is demonstrated?",
      options: [
        "Market Integration",
        "Neoliberal Deregulation",
        "Preferential Trade Quota",
        "Customs Harmonization"
      ],
      answer: "Market Integration",
      hint: "Movement of prices of related goods sold in defined geography in similar patterns.",
      explanation: "Market Integration refers to the movement of prices of related goods and services in a defined geographical location in similar patterns, as seen in cross-border oil trade."
    },
    {
      id: 102,
      unit: "Lesson 2",
      topic: "Stock Market Integration",
      isMidterm: true,
      question: "Which empirical observation directly justifies that stock markets in different sovereign countries are integrated?",
      options: [
        "Stocks in different international markets rise and fall together in the same direction.",
        "Every nation issues shares strictly denominated in the US Dollar.",
        "Trading floors physically merge into a single central building in Geneva.",
        "All corporate dividends are legally banned by international treaty."
      ],
      answer: "Stocks in different international markets rise and fall together in the same direction.",
      hint: "Co-movement: stocks moving, rising, and falling together."
      ,
      explanation: "Stock market integration happens when stock markets in different countries move in the same direction—stocks rising and falling together proves cross-border integration."
    },
    {
      id: 103,
      unit: "Lesson 2",
      topic: "Financial Market Integration",
      isMidterm: true,
      question: "What facilitates Financial Market Integration between countries to encourage the free flow of capital and investment across borders?",
      options: [
        "A common currency and the elimination of technical, regulatory, and tax differences.",
        "A mandatory gold standard and the reinstatement of high import tariffs.",
        "Strict nationalization of commercial banks and foreign exchange bans.",
        "The complete abolition of all digital transactions."
      ],
      answer: "A common currency and the elimination of technical, regulatory, and tax differences.",
      hint: "Common currency plus eliminating technical, regulatory, and tax gaps.",
      explanation: "Financial market integration is an open market economy facilitated by a common currency and eliminating technical, regulatory, and tax differences to allow free capital flow."
    },
    {
      id: 104,
      unit: "Lesson 2",
      topic: "Global Corporations",
      isMidterm: true,
      question: "What is the formal textbook definition of a Global Corporation?",
      options: [
        "A business enterprise that operates in two or more countries.",
        "A company owned entirely by the United Nations General Assembly.",
        "A business with at least 100,000 domestic employees in one capital city.",
        "A state-owned monopoly that restricts all cross-border commerce."
      ],
      answer: "A business enterprise that operates in two or more countries.",
      hint: "Operating across at least 2 distinct sovereign countries.",
      explanation: "A global corporation is straightforwardly defined as a business enterprise that operates in two or more countries."
    },
    {
      id: 105,
      unit: "Lesson 2",
      topic: "Foreign Direct Investment",
      isMidterm: true,
      question: "Foreign Direct Investment (FDI) occurs when a company from one nation builds a factory or business in another country by investing which three components?",
      options: [
        "Money, technology, and management skills.",
        "Military weapons, surveillance gear, and voting ballots.",
        "Gold bullion, historical artifacts, and sovereign debt IOUs.",
        "Natural raw timber, physical postage stamps, and agricultural seeds."
      ],
      answer: "Money, technology, and management skills.",
      hint: "Financial capital + Technological knowledge + Managerial expertise.",
      explanation: "FDI is a major corporate growth driver where a company invests capital/money, technology, and management skills to establish operations in a foreign nation."
    },
    {
      id: 106,
      unit: "Lesson 2",
      topic: "BRICS Economies",
      isMidterm: true,
      question: "Why do multinational corporations aggressively direct capital and investments into BRICS economies (Brazil, Russia, India, China, South Africa)?",
      options: [
        "These countries typically offer rapidly growing consumer markets and lower production costs.",
        "These nations have completely eliminated all national taxes and labor laws.",
        "These countries operate under a single unified supranational monarchy.",
        "These economies refuse to allow domestic competition of any kind."
      ],
      answer: "These countries typically offer rapidly growing consumer markets and lower production costs.",
      hint: "Think about why businesses expand: big new markets + cheaper cost to manufacture.",
      explanation: "Businesses invest in BRICS economies because they feature rapidly expanding domestic markets and lower manufacturing/production costs, making them ideal expansion targets."
    },
    {
      id: 107,
      unit: "Lesson 2",
      topic: "GATS Agreement",
      isMidterm: true,
      question: "The General Agreement on Trade in Services (GATS) was negotiated during which multilateral negotiating round, and when did it take effect?",
      options: [
        "Uruguay Round, coming into force in 1995.",
        "Doha Round, coming into force in 2008.",
        "Tokyo Round, coming into force in 1973.",
        "Geneva Round, coming into force in 1947."
      ],
      answer: "Uruguay Round, coming into force in 1995.",
      hint: "The final GATT round before WTO creation • Mid-1990s.",
      explanation: "GATS was the first multilateral treaty covering trade in services, negotiated in the Uruguay Round and coming into force in 1995."
    },
    {
      id: 108,
      unit: "Lesson 2",
      topic: "Global Interstate System",
      isMidterm: true,
      question: "What is the primary analytical focus of the Global Interstate System?",
      options: [
        "Political relationships and cooperation between sovereign states.",
        "The scientific classification of subatomic particles.",
        "The preservation of indigenous religious liturgical rituals.",
        "The enforcement of personal moral philosophy on individuals."
      ],
      answer: "Political relationships and cooperation between sovereign states.",
      hint: "How countries interact politically in the modern world.",
      explanation: "The global interstate system refers to how countries interact and cooperate, focusing specifically on political relationships between states."
    },
    {
      id: 109,
      unit: "Lesson 2",
      topic: "Golden Straitjacket",
      isMidterm: true,
      question: "According to Thomas Friedman, what political-economic consequence happens when a nation puts on the 'Golden Straitjacket'?",
      options: [
        "Its economy grows while its political freedom and choices shrink.",
        "Its military budget triples while its borders completely dissolve.",
        "Its tariffs soar while foreign investments are prohibited.",
        "Its national currency is abolished in favor of barter exchange."
      ],
      answer: "Its economy grows while its political freedom and choices shrink.",
      hint: "Gold = wealth (growth); Straitjacket = tight constraint (shrinking politics).",
      explanation: "Friedman's Golden Straitjacket thesis posits that adopting neoliberal free-market principles fuels economic expansion while narrowing political choices to strict orthodoxy."
    },
    {
      id: 110,
      unit: "Lesson 2",
      topic: "Electronic Herd",
      isMidterm: true,
      question: "In globalization theory, who comprises the 'Electronic Herd'?",
      options: [
        "International currency and stock investors who rapidly shift capital in response to changing economic conditions.",
        "Robotic automated guided vehicles working in modern container shipping terminals.",
        "Subscribers to digital media streaming platforms across multiple continents.",
        "Hackers conducting distributed denial-of-service cyber warfare against state databases."
      ],
      answer: "International currency and stock investors who rapidly shift capital in response to changing economic conditions.",
      hint: "Digital financiers moving billions at the click of a button.",
      explanation: "The Electronic Herd refers to international investors who swiftly move money from country to country because they react immediately to economic fluctuations."
    },
    {
      id: 111,
      unit: "Lesson 2",
      topic: "Stages of Economic Integration",
      isMidterm: true,
      question: "Which stage of economic integration is characterized by reducing tariffs on selected goods such as agriculture and textiles?",
      options: [
        "Preferential Trading Area (PTA)",
        "Free Trade Area (FTA)",
        "Common Market",
        "Economic Union"
      ],
      answer: "Preferential Trading Area (PTA)",
      hint: "Stage 1: 'Preferential' reductions on specific chosen items.",
      explanation: "A Preferential Trading Area (PTA, Stage 1) reduces tariffs only on selected goods (e.g. agriculture, textiles), whereas an FTA eliminates tariffs on all member trade."
    },
    {
      id: 112,
      unit: "Lesson 2",
      topic: "Stages of Economic Integration",
      isMidterm: true,
      question: "What distinct policy separates a Customs Union (Stage 3) from a Free Trade Area (Stage 2)?",
      options: [
        "A Customs Union harmonizes external tariffs, imposing a common external tariff on imports from non-members.",
        "A Customs Union eliminates all domestic borders and forms a single unified army.",
        "A Customs Union replaces all paper currency with digital cryptocurrency.",
        "A Customs Union bans the physical transportation of manufactured commodities."
      ],
      answer: "A Customs Union harmonizes external tariffs, imposing a common external tariff on imports from non-members.",
      hint: "FTA has zero internal tariffs; Customs Union adds a common wall for non-members.",
      explanation: "In a Customs Union, members harmonize external tariffs and agree on a common external tariff for non-member imports, moving beyond an FTA."
    },
    {
      id: 113,
      unit: "Lesson 2",
      topic: "Stages of Economic Integration",
      isMidterm: true,
      question: "At which stage of economic integration are all barriers removed to allow the free movement of goods, labor, and capital?",
      options: [
        "Common Market (Stage 4)",
        "Preferential Trading Area (Stage 1)",
        "Customs Union (Stage 3)",
        "Free Trade Area (Stage 2)"
      ],
      answer: "Common Market (Stage 4)",
      hint: "The 4 Freedoms: goods, services, labor, and capital moving freely.",
      explanation: "A Common Market (Stage 4) removes barriers to the free movement of the factors of production—goods, labor, and capital."
    },
    {
      id: 114,
      unit: "Lesson 2",
      topic: "Stages of Economic Integration",
      isMidterm: true,
      question: "What defining institutional step occurs in an Economic & Monetary Union (EMU, Stage 6)?",
      options: [
        "Member states create common economic policies and adopt a single common currency (e.g., Euro).",
        "Member states merge their judicial branches into a single supreme court.",
        "All private corporations are nationalized by international commission.",
        "Internal tariffs are reintroduced on luxury automotive goods."
      ],
      answer: "Member states create common economic policies and adopt a single common currency (e.g., Euro).",
      hint: "Monetary union = shared central bank and shared currency.",
      explanation: "An Economic & Monetary Union combines harmonized economic policies with a single shared currency (e.g. the Eurozone)."
    },
    {
      id: 115,
      unit: "Lesson 2",
      topic: "Neoliberalism",
      isMidterm: true,
      question: "How is 'Neoliberalism' critically defined in the contemporary world curriculum?",
      options: [
        "The intensification of the dominance of capital and political power to strengthen or restore the power of economic elites.",
        "A theological doctrine advocating universal basic income and church-led communal farms.",
        "A political philosophy calling for the complete dissolution of private property rights.",
        "An environmental doctrine requiring total cessation of heavy manufacturing."
      ],
      answer: "The intensification of the dominance of capital and political power to strengthen or restore the power of economic elites.",
      hint: "Capital dominance aimed at empowering economic elites.",
      explanation: "Neoliberalism is characterized as the project to strengthen, restore, or constitute anew the power of economic elites through marketization and capital dominance."
    },
    {
      id: 116,
      unit: "Lesson 2",
      topic: "Economic Sovereignty",
      isMidterm: true,
      question: "What is Economic Sovereignty, and which body holds this authority?",
      options: [
        "The power of a country to control its economy, held exclusively by the national government.",
        "The right of corporate shareholders to overrule municipal police forces.",
        "The power of the World Bank to dictate municipal bus schedules.",
        "The authority of non-governmental organizations to collect customs duties."
      ],
      answer: "The power of a country to control its economy, held exclusively by the national government.",
      hint: "Held by the national government to manage national resources.",
      explanation: "Economic sovereignty is the power of a country to control its economy, held legitimately by the national government."
    },
    {
      id: 117,
      unit: "Lesson 2",
      topic: "Global Justice Movement",
      isMidterm: true,
      question: "What is the core philosophy underpinning the Global Justice Movement?",
      options: [
        "Global economic systems should be restructured to be fairer and more equal.",
        "High-income states should permanently colonize emerging market territories.",
        "All forms of international trade should be criminalized under international law.",
        "Developing countries should bear 100% of the cost of global climate change."
      ],
      answer: "Global economic systems should be restructured to be fairer and more equal.",
      hint: "Fairness and equality in international economic rules.",
      explanation: "The Global Justice Movement advocates for global economic systems that are fairer, more democratic, and more equitable across nations."
    },
    {
      id: 118,
      unit: "Lesson 2",
      topic: "United Nations Roles",
      isMidterm: true,
      question: "Why is Peacekeeping considered the MOST important feature of UN activity in peace and security?",
      options: [
        "To prevent the United Nations from taking a partisan political stance in international conflicts.",
        "Because the UN earns financial profits by deploying military contractors.",
        "To replace the standing armies of all member states permanently.",
        "Because international law forbids the UN from engaging in diplomatic dialogue."
      ],
      answer: "To prevent the United Nations from taking a partisan political stance in international conflicts.",
      hint: "Prevent taking a stance on politics.",
      explanation: "To prevent taking a stance on partisan politics, peacekeeping is kept as the most important feature of UN activity in international peace and security."
    },
    {
      id: 119,
      unit: "Lesson 2",
      topic: "Elements of a State",
      isMidterm: true,
      question: "Which element of a state refers to its supreme power to govern itself without outside control?",
      options: [
        "Sovereignty",
        "Territory",
        "Population",
        "Government"
      ],
      answer: "Sovereignty",
      hint: "P-G-T-S: The 'S' that denotes autonomous internal and external authority.",
      explanation: "Sovereignty is the supreme power of a state to govern its own people and territory free from outside control or foreign interference."
    },
    {
      id: 120,
      unit: "Lesson 2",
      topic: "Elements of a State",
      isMidterm: true,
      question: "Which of the following correctly pairs all 4 Basic Elements of a State with their definitions?",
      options: [
        "Population (people), Government (managing system), Territory (land/water/airspace), Sovereignty (power to govern itself).",
        "Army (defense), Currency (money), Religion (faith), Border (fences).",
        "President (leader), Congress (lawmakers), Courts (judges), Police (enforcers).",
        "Capital (city), Flag (emblem), Anthem (song), Constitution (text)."
      ],
      answer: "Population (people), Government (managing system), Territory (land/water/airspace), Sovereignty (power to govern itself).",
      hint: "Mnemonic: P-G-T-S (People Govern Their State).",
      explanation: "The 4 constitutive elements of a state are Population, Government, Territory, and Sovereignty."
    },
    {
      id: 121,
      unit: "Lesson 2",
      topic: "Global Governance",
      isMidterm: true,
      question: "How is Contemporary Global Governance defined in the reviewer?",
      options: [
        "The sum of laws, norms, policies, and institutions that define and mediate trans-border relations between states, cultures, citizens, IGOs, and markets.",
        "A formal worldwide constitution enforced by a single elected global president.",
        "A corporate board of directors governing international retail monopolies.",
        "The unilateral geopolitical dominance of the United States and NATO."
      ],
      answer: "The sum of laws, norms, policies, and institutions that define and mediate trans-border relations between states, cultures, citizens, IGOs, and markets.",
      hint: "Broad totality of laws, norms, policies, and institutions.",
      explanation: "Global governance is the complex sum of laws, norms, policies, and institutions that mediate cross-border relations in the absence of a central world government."
    },
    {
      id: 122,
      unit: "Lesson 3",
      topic: "Global North",
      isMidterm: true,
      question: "Northern nations (Global North) are characterized as well-developed, industrialized, and wealthy. What specific global duty is expected of them?",
      options: [
        "They are expected to support those most affected by environmental degradation.",
        "They are required to absorb all surplus agricultural crops produced in the South.",
        "They must supply free internet connectivity to every household on earth.",
        "They are tasked with disarming their national naval defense forces."
      ],
      answer: "They are expected to support those most affected by environmental degradation.",
      hint: "Industrialized nations must support victims of ecological degradation.",
      explanation: "Due to their historic role in global industrial pollution, Global North nations are expected to provide financial and technical support to communities suffering from environmental degradation."
    },
    {
      id: 123,
      unit: "Lesson 3",
      topic: "Global South",
      isMidterm: true,
      question: "The Global South is known for leading radical calls for which contemporary movement?",
      options: [
        "Climate Justice",
        "Nuclear Proliferation",
        "Strict Mercantilist Protectionism",
        "Corporate Monopolization"
      ],
      answer: "Climate Justice",
      hint: "Demanding fairness for communities suffering climate damage they did not cause.",
      explanation: "The Global South leads radical international calls for climate justice, demanding historical polluters account for the loss and damage suffered by developing nations."
    },
    {
      id: 124,
      unit: "Lesson 3",
      topic: "Global South",
      isMidterm: true,
      question: "In critical political economy, how is the Global South conceptualized in relation to global capitalism?",
      options: [
        "A deterritorialized economy of capitalism's externalities and means to account for subjugated peoples within borders of wealthier countries.",
        "An isolated economic enclave that has never had contact with international trade.",
        "The sole financial creditor providing capital loans to European banks.",
        "A territory exempt from all ecological and environmental regulations."
      ],
      answer: "A deterritorialized economy of capitalism's externalities and means to account for subjugated peoples within borders of wealthier countries.",
      hint: "Externalities of capitalism + marginalized populations.",
      explanation: "Critical scholarship views the Global South as representing capitalism's negative externalities and a lens for examining marginalized peoples even within wealthy metropoles."
    },
    {
      id: 125,
      unit: "Lesson 3",
      topic: "Asia & South Pacific",
      isMidterm: true,
      question: "Why has the Asia and South Pacific region been labeled by scholars as the 'laboratories of modernity'?",
      options: [
        "It is a rising political force actively experimenting with new models of modernity, industrialization, and global connectivity.",
        "It possesses all of the world's semiconductor fabrication patents exclusively.",
        "It operates the only medical research laboratories licensed by the World Health Organization.",
        "It was the first continent to ban all physical paper currency."
      ],
      answer: "It is a rising political force actively experimenting with new models of modernity, industrialization, and global connectivity.",
      hint: "New political force testing dynamic models of 21st-century modernity.",
      explanation: "Asia and the South Pacific are called 'laboratories of modernity' because the region serves as a crucible of rapid economic growth, technological trial, and new geopolitical forces."
    },
    {
      id: 126,
      unit: "Lesson 3",
      topic: "Asia & South Pacific",
      isMidterm: true,
      question: "In the Asia Pacific and South Asia, how is contemporary globalization often perceived culturally and politically?",
      options: [
        "As an external phenomenon being pushed into the region by Western powers like the US and Europe.",
        "As an ancient religious revelation originated in the Himalayas.",
        "As a minor regional trade agreement between rural agricultural fishing villages.",
        "As an internal policy invented exclusively by local municipal councils."
      ],
      answer: "As an external phenomenon being pushed into the region by Western powers like the US and Europe.",
      hint: "An external phenomenon pushed by US and Europe.",
      explanation: "Scholars emphasize that globalization in Asia Pacific is frequently experienced and contested as an external phenomenon driven by Western powers like the US and Europe."
    },
    {
      id: 127,
      unit: "Lesson 3",
      topic: "Asia in Early Modern Economy",
      isMidterm: true,
      question: "What historic role did Asia occupy in the early modern world economy?",
      options: [
        "It was the central global force because it hosted the most important trade routes and possessed superior technology in key areas.",
        "It was completely impoverished and isolated from all maritime navigation.",
        "It was entirely dependent on European charity for food supplies.",
        "It functioned solely as an uninhabited wilderness."
      ],
      answer: "It was the central global force because it hosted the most important trade routes and possessed superior technology in key areas.",
      hint: "The central global force hosting the Silk Road and key maritime routes.",
      explanation: "In the early modern period, Asia was the engine of the global economy, hosting dominant trade routes (like the Silk Road and Indian Ocean networks) and leading technological innovation."
    },
    {
      id: 128,
      unit: "Unit 1",
      topic: "Globalization Concepts",
      isMidterm: false,
      question: "According to Peter Dicken, how does 'Economic Globalization' differ fundamentally from 'Internationalization'?",
      options: [
        "Economic globalization is a qualitative transformation involving functional integration, whereas internationalization is merely quantitative geographical extension.",
        "Economic globalization only affects agriculture, while internationalization covers industry.",
        "Internationalization produces Transnational Corporations, while economic globalization relies on small family farms.",
        "Economic globalization is strictly cultural, while internationalization is strictly financial."
      ],
      answer: "Economic globalization is a qualitative transformation involving functional integration, whereas internationalization is merely quantitative geographical extension.",
      hint: "Qualitative transformation (Dicken) vs quantitative cross-border extension.",
      explanation: "Peter Dicken establishes that internationalization is a quantitative expansion of trade across borders, while globalization is a qualitative functional reorganization of production."
    },
    {
      id: 129,
      unit: "Unit 1",
      topic: "Ideological Claims",
      isMidterm: false,
      question: "Which of the following is NOT one of Manfred Steger's Five Ideological Claims of Globalism?",
      options: [
        "Globalization is strictly orchestrated by a secret centralized world government.",
        "Nobody is in charge of globalization (it is driven by impersonal market forces).",
        "Globalization is inevitable and irreversible.",
        "Globalization furthers the spread of democracy worldwide."
      ],
      answer: "Globalization is strictly orchestrated by a secret centralized world government.",
      hint: "Globalists claim NOBODY is in charge—markets dictate outcomes.",
      explanation: "Globalism advocates argue that 'Nobody is in charge of globalization' to depoliticize market dominance; claiming a secret world government orchestrates it is an anti-globalist conspiracy, not an advocate claim."
    },
    {
      id: 130,
      unit: "Unit 2",
      topic: "Monetary Systems",
      isMidterm: false,
      question: "Under the Bretton Woods System (1944–1971), how was global exchange rate stability maintained?",
      options: [
        "The US Dollar was pegged to gold at $35 per ounce, and other currencies pegged to the USD.",
        "All currencies floated freely against algorithmic commodity indexes.",
        "The British Pound served as the sole reserve currency without any gold convertibility.",
        "National currencies were banned in favor of silver bullion bars."
      ],
      answer: "The US Dollar was pegged to gold at $35 per ounce, and other currencies pegged to the USD.",
      hint: "USD anchored to gold at $35/oz; member currencies anchored to USD.",
      explanation: "Bretton Woods created a gold-exchange standard centered on the US Dollar ($35/oz), establishing the IMF and World Bank to maintain stability."
    }
  ],

  // ==========================================
  // STRUCTURED CURRICULUM TOPICS (STUDY GUIDE)
  // ==========================================
  studyGuide: {
    lesson2: {
      title: "Lesson 2: Global Structure of Globalization",
      weeks: "Weeks 3–5 • Midterm Scope",
      topics: [
        {
          id: "l2-t1-markets",
          topicTitle: "2.1 Market, Stock Market, & Financial Market Integration",
          approachBadge: "💡 DUAL CODING & CORE DEFINITIONS",
          type: "concept-cards",
          description: "Understanding how disparate national markets merge into unified global systems.",
          cards: [
            {
              title: "Market Integration",
              badge: "PRICE CONVERGENCE",
              body: "Refer to the <strong>movement of prices of related goods and services sold in a defined geographical location in similar patterns</strong>.<br><br><em>Textbook Example: The price of oil in Country X and Country Y becomes similar because both countries import and export oil with each other.</em>"
            },
            {
              title: "Stock Market Integration",
              badge: "CO-MOVEMENT",
              body: "Happens when <strong>stock markets in different countries move in the same direction</strong>. Stocks rise and fall together across borders—this synchronous co-movement directly justifies how stock markets are integrated."
            },
            {
              title: "Financial Market Integration",
              badge: "CAPITAL FLUIDITY",
              body: "An <strong>open market economy between countries facilitated by a common currency and the elimination of technical, regulatory, and tax differences</strong> to encourage the free flow of capital and investment across borders."
            },
            {
              title: "Global Corporations & FDI",
              badge: "CORPORATE EXPANSION",
              body: "<strong>Global Corporation:</strong> A business that operates in two or more countries.<br><strong>FDI:</strong> A major driver of corporate development where a company invests <em>money, technology, and management skills</em> to build a business or factory in another country."
            }
          ]
        },
        {
          id: "l2-t2-brics-gats",
          topicTitle: "2.2 BRICS Economies & GATS (General Agreement on Trade in Services)",
          approachBadge: "🌳 ACRONYM & TREATY TAXONOMY",
          type: "tree",
          description: "Emerging economic powerhouses and the pioneering multilateral services framework.",
          branches: [
            {
              name: "BRICS Economies (Brazil, Russia, India, China, South Africa)",
              desc: "An acronym for the combined economies of Brazil, Russia, India, China, and South Africa. Many businesses invest in BRICS countries because they feature rapidly growing consumer markets and significantly lower production costs, making them prime locations for foreign expansion.",
              example: "Low manufacturing costs in China/India + expanding middle-class consumption."
            },
            {
              name: "General Agreement on Trade in Services (GATS)",
              desc: "The first multilateral agreement covering trade in services. Negotiated during the last round of multilateral trade negotiations called the Uruguay Round, and came into force in 1995 under the WTO framework.",
              example: "Cross-border banking, telecommunications, tourism, and professional engineering services."
            }
          ]
        },
        {
          id: "l2-t3-friedman-herd",
          topicTitle: "2.3 The Global Interstate System: Golden Straitjacket & Electronic Herd",
          approachBadge: "🔄 CAUSE-AND-EFFECT DYNAMICS FLOW",
          type: "flow",
          description: "Thomas Friedman's thesis on how neoliberal globalization constrains the state while empowering financial capital.",
          steps: [
            { step: 1, title: "The Global Interstate System", text: "Refers to how sovereign countries interact and cooperate in the modern world, focusing primarily on <strong>political relationships between states</strong>." },
            { step: 2, title: "The Golden Straitjacket Choice", text: "A forced choice upon states: either conform to free-market principles or run the risk of being left behind. When a nation adopts neoliberal policies, <strong>political freedom may shrink while the economy grows</strong>." },
            { step: 3, title: "The Electronic Herd", text: "International currency and stock investors who <strong>quickly move their money from one country to another</strong> depending on economic conditions because investors react quickly to economic changes." },
            { step: 4, title: "Neoliberalism & Sovereignty", text: "<strong>Neoliberalism:</strong> Intensification of capital and political power to restore the dominance of economic elites.<br><strong>Economic Sovereignty:</strong> The power of a country to control its economy, held exclusively by the <strong>national government</strong>." }
          ]
        },
        {
          id: "l2-t4-integration-stages",
          topicTitle: "2.4 The 7 Stages of Economic Integration (Ladder of Integration)",
          approachBadge: "🪜 STEPPER LADDER & COMPARISON",
          type: "comparison",
          description: "The official 7-stage hierarchy of regional economic integration from selective tariffs to a unified economy.",
          col1Title: "Stage & Acronym",
          col2Title: "Key Defining Feature",
          col3Title: "Memory Cue / Example",
          dimensions: [
            { dim: "Stage 1", col1: "1. Preferential Trading Area (PTA)", col2: "Reduce tariffs on selected goods (e.g., agriculture, textiles).", col3: "Selected Goods Only" },
            { dim: "Stage 2", col1: "2. Free Trade Area (FTA)", col2: "Eliminate tariffs between members.", col3: "Zero Internal Tariffs (NAFTA)" },
            { dim: "Stage 3", col1: "3. Customs Union", col2: "Harmonize external tariff policies and agree on a common external tariff for non-member imports (focused on goods).", col3: "Common External Wall" },
            { dim: "Stage 4", col1: "4. Common Market", col2: "All barriers are removed to allow free movement of goods, labor, and capital.", col3: "4 Freedoms (Labor & Capital)" },
            { dim: "Stage 5", col1: "5. Economic Union", col2: "Create common economic policies, including rules on competition, environment, and labor.", col3: "Harmonized Regulations" },
            { dim: "Stage 6", col1: "6. Economic & Monetary Union", col2: "Create common economic policies and use the SAME CURRENCY (e.g., Euro).", col3: "Shared Currency (Eurozone)" },
            { dim: "Stage 7", col1: "7. Complete Economic Integration", col2: "Unified policies and single economy.", col3: "Single Unified Economy" }
          ]
        },
        {
          id: "l2-t5-state-un-governance",
          topicTitle: "2.5 The State, United Nations, & Global Governance",
          approachBadge: "⚖️ STATE ELEMENTS & UN ROLES",
          type: "enumeration",
          description: "Foundations of political statehood, the UN's peacekeeping mandate, and global governance.",
          items: [
            { num: 1, title: "Basic Elements of a State (P-G-T-S)", detail: "<strong>1. Population:</strong> The people living in the state.<br><strong>2. Government:</strong> The system that manages and organizes the state.<br><strong>3. Territory:</strong> Defined land, water, and airspace.<br><strong>4. Sovereignty:</strong> The supreme power to govern itself without outside control." },
            { num: 2, title: "United Nations: Roles, Functions, & Peacekeeping", detail: "Tasked to promote international co-operation and create and maintain international order. <em>Crucial Exam Point: To prevent taking a stance on politics, peacekeeping is kept to be the MOST important feature of UN activity in peace and security.</em>" },
            { num: 3, title: "Contemporary Global Governance", detail: "The sum of laws, norms, policies, and institutions that define, constitute, and mediate trans-border relations between states, cultures, citizens, intergovernmental organizations, and markets." },
            { num: 4, title: "Social Movements & Global Justice Movement", detail: "<strong>Social Movement:</strong> A group of people who come together to support or oppose changes in society.<br><strong>Global Justice Movement:</strong> Advocates that global economic systems should be fairer and more equal." }
          ]
        }
      ]
    },

    lesson3: {
      title: "Lesson 3: World of Regions",
      weeks: "Weeks 5–6 • Midterm Scope",
      topics: [
        {
          id: "l3-t1-north-south",
          topicTitle: "3.1 Global North vs. Global South (Climate & Political Economy)",
          approachBadge: "⚖️ COMPARATIVE MATRIX & CLIMATE JUSTICE",
          type: "comparison",
          description: "The socioeconomic divide, historical responsibilities, and the fight for climate justice.",
          col1Title: "Dimension",
          col2Title: "Global North",
          col3Title: "Global South",
          dimensions: [
            { dim: "Economic Profile", col1: "Well-developed, industrialized, wealthy countries with advanced technology.", col2: "Developing, poorer nations with less technological advancement." },
            { dim: "Environmental Role", col1: "Expected to support those most affected by environmental degradation.", col2: "Leads radical calls for climate justice and ecological reparations." },
            { dim: "Capitalist Critique", col1: "Direct beneficiary of globalized capital, extraction, and value chains.", col2: "A deterritorialized economy of capitalism's externalities and means to account for subjugated peoples within borders of wealthier countries." }
          ]
        },
        {
          id: "l3-t2-asia-pacific",
          topicTitle: "3.2 Asia and the South Pacific: Laboratories of Modernity",
          approachBadge: "💡 REGIONAL DYNAMICS & HISTORICAL POWER",
          type: "concept-cards",
          description: "Asia as a dynamic political force, early modern economic hub, and site of external globalization pushes.",
          cards: [
            {
              title: "New Political Force",
              badge: "GEOPOLITICAL RISE",
              body: "Asia and the South Pacific represents a vital <strong>new political force in the contemporary world</strong>, rapidly reshaping global governance, maritime logistics, and multilateral diplomatic alliances."
            },
            {
              title: "Laboratories of Modernity",
              badge: "SOCIOLOGICAL CONCEPT",
              body: "Referred to as the <strong>'laboratories of modernity'</strong> because the region tests, accelerates, and innovates novel forms of industrial development, technological integration, and urban coexistence."
            },
            {
              title: "External Phenomenon",
              badge: "CULTURAL/POLITICAL TENSION",
              body: "Globalization in the Asia Pacific and South Asia is frequently perceived and critiqued as an <strong>external phenomenon being pushed into the region by world powers like the US and Europe</strong>."
            },
            {
              title: "Early Modern Centrality",
              badge: "HISTORICAL FOUNDATION",
              body: "Asia was the <strong>central global force in the early modern world economy</strong> for it was the site of the most important trade routes and in some places possessed more advanced technology than the West."
            }
          ]
        }
      ]
    },

    unit1: {
      title: "Unit 1: Introduction to Globalization",
      weeks: "Weeks 1–2 • Prelim Foundations",
      topics: [
        {
          id: "u1-t1-definitions",
          topicTitle: "1.1 Core Definitions & Manfred Steger's Framework",
          approachBadge: "💡 FOUNDATIONAL THEORIES",
          type: "concept-cards",
          description: "Definitions of globalization, reasons to study the world, and Manfred Steger's core framework.",
          cards: [
            {
              title: "Definition: Manfred Steger",
              badge: "SOCIOLOGICAL VIEW",
              body: "Globalization is an <strong>expansion and intensification of social relations and consciousness across world-time and world-space</strong>."
            },
            {
              title: "3 Reasons to Study the World",
              badge: "ACADEMIC RATIONALE",
              body: "1. <strong>End Parochialism:</strong> Overcome narrow-mindedness.<br>2. <strong>Teach You About Yourself:</strong> Contextualize your identity.<br>3. <strong>You are Interacting with It:</strong> Global forces dictate your environment."
            },
            {
              title: "Economic Globalization vs. Internationalization",
              badge: "PETER DICKEN",
              body: "Globalization is <strong>qualitative functional integration</strong> producing TNCs. Internationalization is merely <strong>quantitative extension</strong> across borders."
            },
            {
              title: "Roman Catholic Subsidiarity",
              badge: "ETHICS & JUSTICE",
              body: "Decisions must be made at the <strong>lowest competent authority</strong> to preserve human dignity and defend the common good."
            }
          ]
        }
      ]
    }
  },

  // ==========================================
  // AUDITORY WALKTHROUGH AUDIO DECK (CYRENE)
  // ==========================================
  audioDeck: {
    voice: "Cyrene",
    character: "Cyrene (Honkai: Star Rail)",
    voiceActor: "Aiden Dawn",
    style: "Companion Study Narration",
    description: "Soothing educational companion series guiding you through high-yield mnemonics, global structures, and regional dynamics.",
    tracks: [
      {
        id: "cw_track1_mnemonics",
        title: "Track 1: Core Memory Anchors & Mnemonics",
        subtitle: "P-G-T-S, BRICS, 7 Stages & Friedman Forces",
        src: "audio/cw/prelim/cw_track1_mnemonics.mp3",
        duration: 260,
        bookmarks: [
          { time: 0, label: "Introduction" },
          { time: 22, label: "P-G-T-S: 4 Elements of a State" },
          { time: 85, label: "BRICS Emerging Economies" },
          { time: 145, label: "7 Stages of Economic Integration" },
          { time: 215, label: "Friedman: Straitjacket & Herd" }
        ],
        transcript: [
          { time: 0, speaker: "Cyrene", text: "Welcome back. Settle in, take a slow, comfortable breath, and let's review our core memory anchors for The Contemporary World together." },
          { time: 22, speaker: "Cyrene", text: "Remember our hook: People Govern Their State. P stands for Population, the people living in the state. G is Government, the agency and system that organizes and manages the state. T is Territory, the defined land, water, and airspace. And S is Sovereignty, the supreme power of a state to govern itself without external interference or control." },
          { time: 85, speaker: "Cyrene", text: "Next, let's remember BRICS. B-R-I-C-S represents the emerging global economic powerhouses known for rapidly growing consumer markets and low production costs: Brazil, Russia, India, China, and South Africa." },
          { time: 145, speaker: "Cyrene", text: "Now, let's visualize the ladder of economic integration: Please Find Customs Commonly, Every Exchange Complete. PTA, Free Trade Area, Customs Union, Common Market, Economic Union, Economic and Monetary Union, and Complete Economic Integration." },
          { time: 215, speaker: "Cyrene", text: "Finally, remember Thomas Friedman's concepts: the Golden Straitjacket where the economy grows while politics shrinks, and the borderless Electronic Herd of international capital investors." }
        ]
      },
      {
        id: "cw_track2_global_structure",
        title: "Track 2: Lesson 2 - Global Structure & Market Integration",
        subtitle: "Markets, FDI, GATS, Neoliberalism & UN Peacekeeping",
        src: "audio/cw/prelim/cw_track2_global_structure.mp3",
        duration: 310,
        bookmarks: [
          { time: 0, label: "Introduction" },
          { time: 18, label: "Market, Stock & Financial Integration" },
          { time: 92, label: "Global Corporations & FDI" },
          { time: 160, label: "GATS & Neoliberal Sovereignty" },
          { time: 230, label: "UN Peacekeeping & Global Governance" }
        ],
        transcript: [
          { time: 0, speaker: "Cyrene", text: "Hello again. Let's take another peaceful moment to walk through Lesson 2: the global structure of globalization and the institutions that govern world markets." },
          { time: 18, speaker: "Cyrene", text: "Market Integration means prices of related goods and services move in similar patterns. Stock Market Integration happens when exchanges rise and fall together across borders. Financial Market Integration is an open market economy with a common currency and eliminated tax/regulatory barriers." },
          { time: 92, speaker: "Cyrene", text: "A Global Corporation operates in two or more countries. The major engine driving corporate growth is Foreign Direct Investment (FDI), investing capital, technology, and management into another nation." },
          { time: 160, speaker: "Cyrene", text: "Remember the General Agreement on Trade in Services (GATS) from 1995. Neoliberalism champions capital dominance, while Economic Sovereignty is a national government's right to control its own economic destiny." },
          { time: 230, speaker: "Cyrene", text: "Always remember: the United Nations' most essential signature feature is its Peacekeeping Operations. Contemporary Global Governance is the sum of laws, norms, policies, and institutions organizing international relations." }
        ]
      },
      {
        id: "cw_track3_world_regions",
        title: "Track 3: Lesson 3 - World of Regions: Global North & South",
        subtitle: "Global North, Global South & Asia-Pacific Modernity",
        src: "audio/cw/prelim/cw_track3_world_regions.mp3",
        duration: 250,
        bookmarks: [
          { time: 0, label: "Introduction" },
          { time: 15, label: "Global North Characteristics" },
          { time: 88, label: "Global South & Climate Justice" },
          { time: 170, label: "Asia-Pacific: Laboratories of Modernity" }
        ],
        transcript: [
          { time: 0, speaker: "Cyrene", text: "Take a calm breath. In this session, let's explore Lesson 3: The World of Regions, looking at the structural divides between the Global North and the Global South." },
          { time: 15, speaker: "Cyrene", text: "The Global North comprises well-developed, highly industrialized, wealthy countries with advanced technology. They dominate the IMF and World Bank, and are expected to financially and technically support nations affected by environmental degradation." },
          { time: 88, speaker: "Cyrene", text: "The Global South represents developing nations bearing the negative externalities of deterritorialized capitalism. Today, they lead radical calls for global climate justice and loss-and-damage accountability." },
          { time: 170, speaker: "Cyrene", text: "Asia and the South Pacific are profound political and economic forces. Rather than an external Western phenomenon, Asia has served as Laboratories of Modernity through centuries of maritime trade networks." }
        ]
      },
      {
        id: "cw_track4_foundations",
        title: "Track 4: Unit 1 - Foundations & Waves of Globalization",
        subtitle: "Steger Framework, Silk Road, 6 Dimensions & Catholic Principles",
        src: "audio/cw/prelim/cw_track4_foundations.mp3",
        duration: 280,
        bookmarks: [
          { time: 0, label: "Introduction" },
          { time: 20, label: "Steger's Definition & 4 Characteristics" },
          { time: 95, label: "The Silk Road & 5 Historical Waves" },
          { time: 180, label: "6 Dimensions & Catholic Social Principles" }
        ],
        transcript: [
          { time: 0, speaker: "Cyrene", text: "Welcome to our foundational review. Let's trace how Manfred Steger defines globalization and uncover the deep historical waves that shaped our modern world." },
          { time: 20, speaker: "Cyrene", text: "Manfred Steger defines globalization as the expansion and intensification of social relations and consciousness across world-time and world-space. It creates new networks, expands existing ones, accelerates social exchanges, and deepens global consciousness." },
          { time: 95, speaker: "Cyrene", text: "The ancient Silk Road linked China, Central Asia, and the Mediterranean. Globalization flows across five eras: Prehistoric, Premodern, Early Modern, Modern industrial capitalism, and our Contemporary digital era." },
          { time: 180, speaker: "Cyrene", text: "Globalization spans six dimensions: economic, political, cultural, ecological, ideological, and religious. In the Catholic tradition, it is assessed through principles like Subsidiarity, Solidarity, and the Common Good. You are well prepared. Rest peacefully, and trust your preparation." }
        ]
      }
    ]
  }
};

if (typeof window !== "undefined") {
  window.CW_DATA = CW_DATA;
}
