/**
 * Unified Reviewer — Course Dataset
 * IT 321: Human-Computer Interaction
 * Based on Batangas State University - College of Informatics and Computing Sciences (CICS) Curriculum
 */

const HCI_DATA = {
  courseInfo: {
    id: "hci",
    courseCode: "IT 321",
    courseTitle: "Human-Computer Interaction",
    examTitle: "Prelim Exam Reviewer & Simulator",
    institution: "Batangas State University - The National Engineering University",
    campus: "Alangilan Campus",
    college: "College of Informatics and Computing Sciences (CICS)",
    academicYear: "Academic Year 2026-2027",
    termScope: "Preliminary Examination Coverage (Units 1–4)",
    examStructure: {
      part1: { title: "Part I: Analysis", items: 20, points: 40, description: "Scenario analysis, logical reasoning syllogisms, memory failure diagnosis, and Gestalt perception principles." },
      part2: { title: "Part II: Application", items: 21, points: 60, description: "Applied HCI interface design, dialog style selection, problem space state breakdowns, and cognitive load mitigation." },
      totalItems: 41,
      totalPoints: 100
    }
  },

  units: [
    {
      id: "unit-1",
      number: "Unit 1",
      title: "Foundations & Evolution of HCI",
      icon: "zap",
      summary: "Explores the definition, ergonomics, 7 societal challenges, historical paradigms (1970s to 2010s), and Everett Rogers' Technology Adoption Lifecycle.",
      keyConcepts: [
        {
          term: "Human-Computer Interaction (HCI)",
          badge: "Core Definition",
          definition: "A field of study focused on interfaces between users and computers, examining how humans use technology to establish applicable, efficient, and user-centric systems.",
          details: "HCI observes how humans associate with computers to produce efficient and useful interaction, analyzing human behavior to build usable systems."
        },
        {
          term: "Usability",
          badge: "Slogan",
          definition: "A core design focus derived from the foundational slogan: \"Easy to learn and easy to use\".",
          details: "Systems must prioritize user efficiency, learnability, memorability, error prevention, and overall satisfaction."
        },
        {
          term: "Ergonomics & Human Factors",
          badge: "Workplace Efficiency",
          definition: "The study of people's efficiency in their workplace, addressing physical and cognitive discomfort to maximize productivity and safety.",
          details: "Lack of ergonomic knowledge causes physical fatigue and cognitive overload in students and employees. HCI brings together 5 interrelated domains: People (Psychology & Social Sciences), Task (Industrial Engineering), Environment (Occupational Safety/Health, Architecture, Geography), Methods/Training (Education), and Devices (Engineering, Computer Science)."
        },
        {
          term: "HCI Central Theme",
          badge: "Philosophy",
          definition: "The guiding philosophy that people working with a computer system should come first.",
          details: "Rather than forcing users to change their behavior to fit a rigid system, systems must be built upon principles and concepts that match human capabilities, demands, and preferences."
        },
        {
          term: "7 Grand Challenges in HCI",
          badge: "Societal Frontier",
          definition: "The major research issues modern HCI seeks to resolve for society:",
          details: "1. Human-technology symbiosis\n2. Human-environment interaction\n3. Ethics, privacy, and security\n4. Well-being, health, and eudaimonia\n5. Accessibility and universal access\n6. Learning and creativity\n7. Social organization and democracy"
        }
      ],
      timeline: [
        {
          era: "1970s",
          title: "Emergence of HCI",
          focus: "CS Specialization ➔ Multidisciplinary Community",
          description: "HCI originated as a specialized niche within computer science before expanding into a broad, multifaceted community of tech professionals, psychologists, and engineers."
        },
        {
          era: "1980s – 1990s",
          title: "Desktops & Mental Models",
          focus: "Individual Usability & Desktop Metaphor",
          description: "Centered on individual computing usability and mental models. Gave rise to the Desktop Metaphor popularized by the Apple Macintosh, allowing everyday users to interact intuitively with OS files, folders, and trash."
        },
        {
          era: "1990s – Early 2000s",
          title: "Collaboration & Communication",
          focus: "Interactive & Organizational Computing",
          description: "Shifted from purely cognitive individual models to computer-supported cooperative work (CSCW) and organizational computing, catalyzed by the explosive popularity of Electronic Mail (Email) and networked systems."
        },
        {
          era: "Mid-2000s – 2010s",
          title: "Social Change & Self-Expression",
          focus: "Value-Driven Design & \"Alone Together\"",
          description: "Emphasized self-expression, social awareness, and value-driven design (social, emotional, business). Confronted the modern psychological paradox of living 'alone together' in device-focused social settings."
        }
      ],
      adoptionModel: {
        creator: "Everett Rogers (1962)",
        title: "Technology Adoption Lifecycle",
        groups: [
          { name: "Innovators", share: "2.5%", description: "The youngest category; adventurous risk-takers who are the very first to adopt new technologies." },
          { name: "Early Adopters", share: "13.5%", description: "High community influence, opinion leadership, and social status; adopt innovations once verified as viable products." },
          { name: "Early Majority", share: "34%", description: "Pragmatic adopters who accept innovations over a standard timeframe after seeing proven benefits." },
          { name: "Late Majority", share: "34%", description: "Skeptical adopters who only adopt innovations due to social pressure, peer necessity, or economic requirement." },
          { name: "Laggards", share: "16%", description: "The final group to change; highly reliant on traditions with zero opinion leadership and high resistance to change." }
        ]
      }
    },

    {
      id: "unit-2",
      number: "Unit 2",
      title: "Philosophy of Mind & Cognitive Processing",
      icon: "cpu",
      summary: "Deconstructs Dualism vs. Monism, Computational Theory of Mind (CTM), Human vs. Computer information processing, Sensation vs. Perception, and Attention mechanisms.",
      keyConcepts: [
        {
          term: "Philosophy of Mind & Mind-Body Problem",
          badge: "Metaphysics",
          definition: "Explores the essence of the mind and its relationship to the physical body: explaining how the non-physical (thoughts, consciousness) impacts the physical body and vice versa.",
          details: "Intersects deeply with neurobiology, computer science, psychology, and artificial intelligence."
        },
        {
          term: "Dualism",
          badge: "Mind ≠ Body",
          definition: "The philosophical position that the mind (cognition/consciousness) and the body (physical brain/matter) exist independently as distinct substances.",
          details: "Key proponents: René Descartes (17th Century, articulated mind as cognition/conscious-awareness distinguished from the brain as mere physical center of info), Plato, Aristotle, and the ancient Sankhya School of Hindu Philosophy."
        },
        {
          term: "Monism",
          badge: "Mind = Body",
          definition: "The philosophical position that mind and body are part of a single, unified substance and are not existentially different.",
          details: "Key Western thinkers: Parmenides (ancient) and Baruch Spinoza (modern era). Vaguely comparable to Eastern concepts like Brahman (Hinduism) and Lao Tzu's Tao. Modern AI and sociobiology largely operate under physicalist monism."
        },
        {
          term: "Computational Theory of Mind (CTM)",
          badge: "Cognitive Science",
          definition: "The foundational hypothesis that the human mind functions as an information-processing device and consciousness/awareness consist of computational processes.",
          details: "Also known as Computationalism. Serves as the core working hypothesis in cognitive science and modern AI."
        },
        {
          term: "Sensation vs. Perception vs. Cognition",
          badge: "Information Flow",
          definition: "The tripartite sequence of human cognitive processing:",
          details: "• Sensation: Bottom-up process where sensory organs (eyes, ears, skin) receive and relay raw external stimuli (< 500 ms).\n• Perception: Top-down process where the brain organizes, interprets, and contextualizes sensory info into meaningful structures.\n• Cognition: Ongoing mental processes in our minds involved in acquiring, processing, understanding, and utilizing knowledge during daily activities."
        },
        {
          term: "Attention & Change Blindness",
          badge: "Visual Perception",
          definition: "How humans allocate limited cognitive processing bandwidth to the environment:",
          details: "• Selective Attention: Choosing specific stimuli in the environment to process while consciously filtering out/ignoring the rest.\n• Divided Attention: Attempting to attend to and process multiple sources of information simultaneously (multitasking).\n• Change Blindness: The failure to notice a visual difference between a previous state and a current state in a visual stimulus environment (e.g., subtle UI layout changes or toolbar swaps)."
        }
      ],
      comparisonTable: [
        { aspect: "Energy Source", human: "Food & nutrition (organic compounds to transmit neural impulses)", computer: "Electricity (direct electrical voltage & circuitry)" },
        { aspect: "Processing Mechanism", human: "Biological neural networks, intuitive pattern recognition, common sense, creative out-of-the-box thinking", computer: "Binary algorithmic logic, microprocessors, strict mathematical execution" },
        { aspect: "Multitasking & Speed", human: "Limited working memory ($7\\pm2$ chunks), prone to fatigue, illness, and slow recall retrieval", computer: "High-speed calculation, round-the-clock operation without exhaustion, impervious to emotion" },
        { aspect: "Error Sensitivity", human: "Flexible, can resolve ambiguous or incomplete information using common sense", computer: "\"Garbage In, Garbage Out\" (GIGO) — follows exact programmed code; outputs errors if wrong data is fed" }
      ]
    },

    {
      id: "unit-3",
      number: "Unit 3",
      title: "Problem Solving, Reasoning & Gestalt Principles",
      icon: "layers",
      summary: "Covers Problem Space Model, Analogical Problem Solving, Deductive/Inductive/Abductive reasoning structures, and the 6 Gestalt Principles of Visual Perception with real logo case studies.",
      keyConcepts: [
        {
          term: "Problem Solving vs. Reasoning",
          badge: "Cognitive Duality",
          definition: "Problem Solving focuses on finding solutions to difficult and complex questions, while Reasoning is the process of objectively thinking about information to formulate an inference or judgment.",
          details: "Three primary approaches to problem solving: Gestalt Theory, Problem Space Model, and Analogy."
        },
        {
          term: "Problem Space Model",
          badge: "State Transition",
          definition: "A framework comprising three functional states traversed to reach a solution:",
          details: "1. Initial State: The baseline problem statement (e.g., Loraine has a graduation ball next week but has no dress to wear).\n2. State In-Between: The intermediate procedures, exploratory options, and actions leading toward a solution (e.g., Deciding what store to visit, budgeting, selecting what day to buy).\n3. Goal State: The successfully resolved outcome (e.g., Loraine has a completed dress ready for her graduation ball)."
        },
        {
          term: "Analogy in Problem Solving",
          badge: "Metaphorical Transfer",
          definition: "Using a known solution or metaphor from a familiar domain to solve a novel problem.",
          details: "Consists of 3 chronological steps:\n1. Notice the relationship between the target problem and an analogical source.\n2. Map correspondences between the source domain and the target domain.\n3. Apply the solution from the source problem to the new target problem."
        }
      ],
      reasoningTypes: [
        {
          type: "Deductive Reasoning",
          direction: "Top-down logic",
          description: "Derives specific, certain conclusions from general premises.",
          subtypes: [
            { name: "Valid Argument", desc: "Logical structure ensures conclusion MUST be true IF premises are true, regardless of factual reality.", example: "P1: All dogs can talk. P2: Pomeranian is a dog. ➔ C: Pomeranian can talk." },
            { name: "Invalid Argument", desc: "Premises do not logically lead to the conclusion, even if all individual statements happen to be true.", example: "P1: PlayStation is by Sony. P2: Xbox is by Microsoft. ➔ C: Nintendo Switch is by Nintendo." },
            { name: "Sound Argument", desc: "The strongest deductive argument: Valid logical structure AND all premises are factually true in reality.", example: "P1: Sarah is 25. P2: Marjorie is 20. ➔ C: Marjorie is younger than Sarah." }
          ]
        },
        {
          type: "Inductive Reasoning",
          direction: "Bottom-up logic",
          description: "Generalizes broad conclusions based on specific observations (probabilistic).",
          subtypes: [
            { name: "Strong Argument", desc: "High statistical probability that conclusion is true if premises are true.", example: "P1: 95% of students passed the exam. P2: Hyrie is a student. ➔ C: Hyrie probably passed the exam." },
            { name: "Weak Argument", desc: "Conclusion remains uncertain / low probability even if premises are true (e.g., ambiguous qualifiers like 'some').", example: "P1: Some humans are good at Math. P2: Hyrie is human. ➔ C: Hyrie is probably good at Math." },
            { name: "Cogent Argument", desc: "The strongest inductive argument: Strong probabilistic structure AND all premises are factually verified.", example: "P1: Hyrie usually eats dinner at 8:30 PM. P2: It is 8:30 PM right now. ➔ C: Hyrie is probably eating dinner right now." }
          ]
        },
        {
          type: "Abductive Reasoning",
          direction: "Inference to Best Explanation",
          description: "Starts with an observation or set of symptoms and forms the most likely hypothesis / probable cause.",
          subtypes: [
            { name: "Best Explanation", desc: "Evaluated on plausible likelihood rather than rigid certainty.", example: "P1: Ken tells a secret to his friend. P2: By next week, everyone knows it. ➔ C: His friend leaked Ken's secret." }
          ]
        }
      ],
      gestaltPrinciples: [
        {
          name: "Continuation",
          slogan: "Guided visual path",
          definition: "Visual perception is guided along a continuous smooth line, curve, or path from one element to another.",
          caseStudy: "Amazon Logo",
          caseDetails: "The curved orange arrow leads the viewer's eye from letter 'a' to letter 'z', hinting that everything from A to Z is available.",
          svgType: "continuation"
        },
        {
          name: "Closure",
          slogan: "Filling in the gaps",
          definition: "The brain automatically fills in missing lines or gaps in an incomplete visual object to perceive a whole, recognizable shape.",
          caseStudy: "WWF Panda Logo",
          caseDetails: "The panda's head and back have open gaps with no connecting outlines; the brain draws imaginary boundaries to see the complete animal.",
          svgType: "closure"
        },
        {
          name: "Similarity",
          slogan: "Grouping by shared traits",
          definition: "Elements sharing visual characteristics (color, shape, size, texture, orientation) are perceived as belonging together or having shared functionality.",
          caseStudy: "NBC Peacock Feathers",
          caseDetails: "The 6 teardrop shapes share identical geometry and radial orientation, creating a unified fan of peacock feathers despite distinct colors.",
          svgType: "similarity"
        },
        {
          name: "Proximity",
          slogan: "Grouping by distance",
          definition: "Objects positioned physically close to one another are perceived as a cohesive collective group rather than isolated parts.",
          caseStudy: "Unilever 'U' Logo",
          caseDetails: "Dozens of small, distinct icons (leaves, birds, DNA, hearts) placed in close physical arrangement coalesce into the single capital letter 'U'.",
          svgType: "proximity"
        },
        {
          name: "Symmetry",
          slogan: "Balanced mirror order",
          definition: "Balanced, mirror-image layouts are perceived as stable, unified visual figures, creating harmony and lowering cognitive processing effort.",
          caseStudy: "Starbucks Siren Logo",
          caseDetails: "Folding the siren graphic vertically reveals nearly identical left and right halves, establishing instant visual stability and recognition.",
          svgType: "symmetry"
        },
        {
          name: "Figure and Ground",
          slogan: "Foreground vs. background isolation",
          definition: "The eye automatically separates focal visual objects (figure) from their surrounding background field (ground).",
          caseStudy: "Rubin's Vase / Candlestick vs. Faces",
          caseDetails: "Focusing on the center reveals a solid white vase; switching focus to the dark background reveals two human profile silhouettes facing each other.",
          svgType: "figureground"
        }
      ]
    },

    {
      id: "unit-4",
      number: "Unit 4",
      title: "Human Memory & HCI Interaction Styles",
      icon: "hard-drive",
      summary: "Deep dives into Atkinson-Shiffrin Multi-Store Memory Model, Working Memory limits ($7\\pm2$), Forgetting theories (Elizabeth Loftus), and the 4 fundamental HCI Interaction / Dialog Styles.",
      keyConcepts: [
        {
          term: "Atkinson-Shiffrin Multi-Store Model (1968)",
          badge: "Memory Architecture",
          definition: "The structural model conceptualizing memory as three distinct stages: Sensory Memory, Short-Term Memory, and Long-Term Memory.",
          details: "Environment Input ➔ Sensory Memory ➔ (Attention) ➔ Short-Term Memory ➔ (Consolidation/Rehearsal) ➔ Long-Term Memory (Retrieval brings info back to STM)."
        },
        {
          term: "Sensory Memory",
          badge: "< 500 ms Duration",
          definition: "The shortest-term component of memory holding raw sensory stimuli from sensory organs for less than 500 milliseconds.",
          details: "• Iconic Memory: Visual sensory store holding brief optical snapshots.\n• Echoic Memory: Auditory sensory store holding acoustic echoes."
        },
        {
          term: "Short-Term Memory (Working Memory)",
          badge: "7 ± 2 Capacity | 20–30s",
          definition: "The mental scratchpad storing roughly $7 \\pm 2$ chunks of information for 20 to 30 seconds for interim data retrieval.",
          details: "4 Enhancement Strategies:\n1. Information Chunking: Grouping individual items into smaller, meaningful units (e.g., phone numbers).\n2. Visualization: Forming vivid mental pictures of concepts.\n3. Simple Tunes / Rhymes: Using rhythmic melodies or mnemonic jingles.\n4. Roman Rooms (Method of Loci): Mentally placing items in imagined architectural rooms."
        },
        {
          term: "Long-Term Memory Systems",
          badge: "Permanent Store",
          definition: "Permanent knowledge store categorized into Explicit (Declarative) and Implicit (Non-Declarative) systems:",
          details: "• Explicit (Declarative) — Conscious recall:\n   - Episodic Memory: Personal experiences tied to specific dates, times, and autobiographical events.\n   - Semantic Memory: General facts, ideas, definitions, language, and conceptual knowledge.\n• Implicit (Non-Declarative) — Unconscious memories that drive automatic procedural skills, motor habits (e.g., touch-typing, riding a bike)."
        },
        {
          term: "Why Do We Forget? (Elizabeth Loftus)",
          badge: "Forgetting Theories",
          definition: "Renowned memory researcher Elizabeth Loftus identified two primary mechanisms of forgetting (disremembering):",
          details: "1. Retrieval / Access Failure: Information resides in LTM but cannot be accessed due to lack of adequate retrieval cues. Includes Decay Theory (memory traces fade or erode over elapsed time).\n2. Interference Theory: Information is blocked by competing memories:\n   - Proactive Interference: Older past memories block the learning or recall of new information (e.g., typing an old PIN after changing it).\n   - Retroactive Interference: Newly learned information overwrites or interferes with the recall of older memories."
        },
        {
          term: "Recall vs. Recognition",
          badge: "HCI Golden Rule",
          definition: "Two primary modes of retrieving information: Recall requires generating info from memory without cues (high cognitive effort), while Recognition requires identifying previously encountered info from visual cues (low cognitive effort).",
          details: "Core HCI Usability Rule: Always design interfaces to promote **Recognition over Recall** (e.g., visual menus and icons rather than memorizing CLI syntax)."
        }
      ],
      dialogStyles: [
        {
          name: "Command Line Interface (CLI)",
          tagline: "Power & Exactness",
          strengths: "High speed, precise execution, low system overhead, scriptable for power users and sysadmins.",
          weaknesses: "Steep learning curve, zero visual cues, forces recall over recognition, cryptic error messages.",
          goodUse: "Linux Terminal, PowerShell, Git CLI, server administration.",
          badUse: "Consumer mobile apps, beginner desktop software, novice form entry.",
          type: "cli"
        },
        {
          name: "Menu-Based Interaction",
          tagline: "Recognition over Recall",
          strengths: "Leverages recognition, minimal training required, presents explicit structured options.",
          weaknesses: "Screen clutter if overloaded; deep hierarchical nesting causes user disorientation.",
          goodUse: "ATM machines, mobile navigation drawers, restaurant POS kiosks.",
          badUse: "Deeply nested 7-level sub-menus, ambiguous non-standard icon menus.",
          type: "menu"
        },
        {
          name: "Form-Filling Interaction",
          tagline: "Structured Data Collection",
          strengths: "Guides multi-field data entry step-by-step, validates inputs with real-time error feedback.",
          weaknesses: "Triggers severe user fatigue and abandonment if forms are excessively long or unstructured.",
          goodUse: "E-commerce checkout, student enrollment portals, loan applications.",
          badUse: "Single monolithic 50-field unpaginated forms without progress indicators.",
          type: "form"
        },
        {
          name: "Graphical User Interface (GUI)",
          tagline: "WIMP Visual Direct Manipulation",
          strengths: "Visual manipulation via Windows, Icons, Menus, Pointers (WIMP); highly intuitive for beginners.",
          weaknesses: "High visual clutter can overload attention and trigger change blindness; higher CPU/GPU overhead.",
          goodUse: "macOS, Windows desktops, creative suites (Photoshop, Figma), web dashboards.",
          badUse: "Cluttered toolbars with 40 unlabeled monochrome icons, bloated complex screens.",
          type: "gui"
        }
      ]
    }
  ],

  flashcards: [
    // Unit 1
    { id: 1, unit: "unit-1", category: "Unit 1: Foundations", question: "What is the core definition of Human-Computer Interaction (HCI)?", answer: "A field of study focused on interfaces between users and computers, examining how humans use technology to establish applicable, efficient, and user-centric systems." },
    { id: 2, unit: "unit-1", category: "Unit 1: Foundations", question: "What is the core usability slogan that guides HCI system design?", answer: "\"Easy to learn and easy to use\"." },
    { id: 3, unit: "unit-1", category: "Unit 1: Foundations", question: "Define Ergonomics & Human Factors in the context of HCI.", answer: "The study of people's efficiency in their workplace, addressing physical and cognitive discomfort to maximize productivity and workplace safety." },
    { id: 4, unit: "unit-1", category: "Unit 1: Foundations", question: "What major design paradigm was popularized by the Apple Macintosh in the 1980s–1990s?", answer: "The Desktop Metaphor — using familiar physical desktop items (folders, files, trash can) to make OS interaction intuitive." },
    { id: 5, unit: "unit-1", category: "Unit 1: Foundations", question: "What technological shift drove HCI toward collaboration and organizational computing in the 1990s–early 2000s?", answer: "The explosive popularity and integration of Electronic Mail (Email) and networked communication systems." },
    { id: 6, unit: "unit-1", category: "Unit 1: Foundations", question: "What psychological paradox characterized HCI in the mid-2000s to 2010s?", answer: "The paradox of living \"alone together\" — being hyper-connected through digital devices while physically isolated or disengaged in social settings." },
    { id: 7, unit: "unit-1", category: "Unit 1: Foundations", question: "Who formulated the Technology Adoption Lifecycle in 1962, and what are its 5 adopter categories?", answer: "Everett Rogers (1962). The 5 categories are: 1. Innovators (youngest, first), 2. Early Adopters (opinion leaders, verified product), 3. Early Majority (pragmatic), 4. Late Majority (skeptical), 5. Laggards (tradition-bound, last)." },
    { id: 8, unit: "unit-1", category: "Unit 1: Foundations", question: "Which adopter category in Rogers' model possesses the highest degree of community control and opinion leadership?", answer: "Early Adopters — they evaluate innovations after initial verification and exert massive influence over the broader community." },
    
    // Unit 2
    { id: 9, unit: "unit-2", category: "Unit 2: Philosophy of Mind", question: "What is the central issue of the Philosophy of Mind?", answer: "The Mind-Body Problem: exploring the relationship between the physical body/brain and the non-physical mind/consciousness, and how each affects the other." },
    { id: 10, unit: "unit-2", category: "Unit 2: Philosophy of Mind", question: "Contrast Dualism and Monism in the philosophy of mind.", answer: "Dualism posits that the mind and body exist independently as separate substances (Descartes, Plato, Aristotle). Monism posits that mind and body are manifestations of a single, unified substance (Parmenides, Spinoza, Brahman, Tao)." },
    { id: 11, unit: "unit-2", category: "Unit 2: Philosophy of Mind", question: "How did René Descartes articulate the mind in the 17th Century?", answer: "Descartes described the mind as cognition and conscious awareness, strictly distinguishing it from the brain, which he considered a mere physical information center." },
    { id: 12, unit: "unit-2", category: "Unit 2: Philosophy of Mind", question: "What is the Computational Theory of Mind (CTM / Computationalism)?", answer: "The hypothesis that the human mind is an information-processing device and that consciousness and cognitive awareness consist of computational processes." },
    { id: 13, unit: "unit-2", category: "Unit 2: Philosophy of Mind", question: "Differentiate Sensation, Perception, and Cognition.", answer: "Sensation is bottom-up raw stimulus reception via sensory organs (<500ms). Perception is top-down organization and contextual interpretation of sensory data. Cognition encompasses all active mental processes of acquiring, processing, and understanding information." },
    { id: 14, unit: "unit-2", category: "Unit 2: Philosophy of Mind", question: "What is the difference between Selective Attention and Divided Attention?", answer: "Selective Attention focuses cognitive resources on one specific input while filtering out environmental noise. Divided Attention attempts to process multiple distinct information streams simultaneously (multitasking)." },
    { id: 15, unit: "unit-2", category: "Unit 2: Philosophy of Mind", question: "What is Change Blindness in human visual perception?", answer: "The failure to notice a visual difference between a previous state and a current state in a stimulus environment (e.g., missing a subtle layout or button change)." },
    { id: 16, unit: "unit-2", category: "Unit 2: Philosophy of Mind", question: "How do humans and computers fundamentally differ in energy source and error handling?", answer: "Humans rely on food/nutrition (biochemical neural impulses) and handle errors with intuition and common sense. Computers rely on electricity and follow strict code (\"Garbage In, Garbage Out\")." },

    // Unit 3
    { id: 17, unit: "unit-3", category: "Unit 3: Problem Solving & Gestalt", question: "How does Problem Solving differ from Reasoning?", answer: "Problem Solving is the goal-oriented process of finding solutions to complex questions. Reasoning is the systematic, objective evaluation of premises to shape inferences or judgments." },
    { id: 18, unit: "unit-3", category: "Unit 3: Problem Solving & Gestalt", question: "What are the 3 functional states in the Problem Space Model?", answer: "1. Initial State (baseline problem statement), 2. State In-Between (intermediate procedures and options), 3. Goal State (successfully resolved outcome)." },
    { id: 19, unit: "unit-3", category: "Unit 3: Problem Solving & Gestalt", question: "What are the 3 steps in Analogical Problem Solving?", answer: "1. Notice the relationship between the target problem and a known analogical solution. 2. Map correspondences between the source and target. 3. Apply the solution to the target problem." },
    { id: 20, unit: "unit-3", category: "Unit 3: Problem Solving & Gestalt", question: "In Deductive Reasoning, what distinguishes a Valid argument from a Sound argument?", answer: "A Valid argument has a logical structure where the conclusion must be true if premises are true (regardless of real-world truth). A Sound argument is BOTH structurally valid AND all its premises are factually true in reality." },
    { id: 21, unit: "unit-3", category: "Unit 3: Problem Solving & Gestalt", question: "In Inductive Reasoning, what distinguishes a Strong argument from a Cogent argument?", answer: "A Strong argument has a high probabilistic likelihood of truth given its premises. A Cogent argument is a strong inductive argument whose premises are ALL factually true in reality." },
    { id: 22, unit: "unit-3", category: "Unit 3: Problem Solving & Gestalt", question: "What is Abductive Reasoning?", answer: "Inference to the best explanation — beginning with an observation or set of clues and determining the most plausible or likely cause." },
    { id: 23, unit: "unit-3", category: "Unit 3: Problem Solving & Gestalt", question: "What is the core premise of Gestalt Theory in visual perception?", answer: "\"The whole is different from the sum of its parts\" — the mind naturally organizes visual elements into unified structures rather than isolated pieces." },
    { id: 24, unit: "unit-3", category: "Unit 3: Problem Solving & Gestalt", question: "Which Gestalt Principle is exemplified by the Amazon logo's arrow from 'a' to 'z'?", answer: "Continuation — the eye is smoothly guided along a continuous path from one visual anchor to another." },
    { id: 25, unit: "unit-3", category: "Unit 3: Problem Solving & Gestalt", question: "Which Gestalt Principle is demonstrated by the WWF Panda logo?", answer: "Closure — the human brain fills in missing outlines and gaps to perceive a complete panda figure." },
    { id: 26, unit: "unit-3", category: "Unit 3: Problem Solving & Gestalt", question: "Which Gestalt Principle is illustrated by the Unilever 'U' logo?", answer: "Proximity — numerous small, independent icons positioned close together are perceived collectively as the letter 'U'." },
    { id: 27, unit: "unit-3", category: "Unit 3: Problem Solving & Gestalt", question: "Which Gestalt Principle describes Rubin's Vase (seeing a vase vs. two facing profiles)?", answer: "Figure and Ground — the visual system isolates the focal object (figure) from the surrounding background field (ground)." },

    // Unit 4
    { id: 28, unit: "unit-4", category: "Unit 4: Memory & Interaction Styles", question: "Who formulated the Multi-Store Memory Model in 1968, and what are its 3 stages?", answer: "Richard Atkinson and Richard Shiffrin (1968). The 3 stages are: 1. Sensory Memory, 2. Short-Term Memory (Working Memory), and 3. Long-Term Memory." },
    { id: 29, unit: "unit-4", category: "Unit 4: Memory & Interaction Styles", question: "What are the capacity and duration limits of Short-Term / Working Memory?", answer: "Capacity is $7 \\pm 2$ chunks of information; duration is approximately 20 to 30 seconds without active rehearsal." },
    { id: 30, unit: "unit-4", category: "Unit 4: Memory & Interaction Styles", question: "Name 4 cognitive enhancement strategies for Short-Term Memory.", answer: "1. Information Chunking (grouping into smaller units), 2. Visualization (mental pictures), 3. Simple Tunes / Rhymes (musical mnemonics), 4. Roman Rooms (Method of Loci / imagined locations)." },
    { id: 31, unit: "unit-4", category: "Unit 4: Memory & Interaction Styles", question: "Differentiate Episodic Memory and Semantic Memory within Long-Term Explicit Memory.", answer: "Episodic Memory stores dated personal autobiographical experiences and events. Semantic Memory stores general facts, language concepts, ideas, and abstract knowledge." },
    { id: 32, unit: "unit-4", category: "Unit 4: Memory & Interaction Styles", question: "What is Implicit (Non-Declarative) Memory?", answer: "Unconscious, automatic memory that drives motor skills, habits, and procedural behaviors (e.g., typing on a keyboard) without conscious verbal recollection." },
    { id: 33, unit: "unit-4", category: "Unit 4: Memory & Interaction Styles", question: "According to Elizabeth Loftus, what are the two primary causes of forgetting?", answer: "1. Retrieval / Access Failure (e.g., lack of cues, Decay Theory where memory traces fade over time). 2. Interference Theory (competing memories blocking recall)." },
    { id: 34, unit: "unit-4", category: "Unit 4: Memory & Interaction Styles", question: "Differentiate Proactive Interference and Retroactive Interference.", answer: "Proactive Interference: Old memories prevent the learning/retrieval of new info. Retroactive Interference: Newly learned information blocks or distorts the recall of older memories." },
    { id: 35, unit: "unit-4", category: "Unit 4: Memory & Interaction Styles", question: "Why is Menu-Based Interaction generally easier for beginners than a Command Line Interface (CLI)?", answer: "Menu-Based interaction leverages Recognition over Recall (users pick from visible choices), whereas CLI requires pure Recall (users must memorize and type exact syntax from memory)." },
    { id: 36, unit: "unit-4", category: "Unit 4: Memory & Interaction Styles", question: "What are the 4 main HCI Dialog / Interaction Styles and their primary trade-offs?", answer: "1. CLI (high speed/power, steep learning curve), 2. Menu-Based (recognition-heavy, risk of screen/hierarchy clutter), 3. Form-Filling (structured step-by-step entry, risk of user fatigue), 4. GUI (intuitive WIMP manipulation, risk of visual clutter and change blindness)." }
  ],

  examQuestions: [
    // PART I: ANALYSIS (20 items - 40 Points)
    {
      id: 1,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Philosophy of Mind",
      question: "René Descartes famously separated conscious thought and cognitive awareness from the physical operations of the biological brain in the 17th Century. Which philosophical tradition does this assertion fundamentally anchor?",
      options: [
        "Monism, specifically physicalist reductionism",
        "Substance Dualism, asserting independent existence of mind and matter",
        "Computationalism, treating brain synapses as logic gates",
        "Behaviorism, rejecting the reality of internal mental states"
      ],
      correctIndex: 1,
      explanation: "Descartes is the foremost proponent of Dualism in Western philosophy, asserting that the mind (cognition/consciousness) and body (physical matter/brain) exist independently."
    },
    {
      id: 2,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Reasoning & Syllogisms",
      question: "Analyze the following argument:\nPremise 1: All high-level programming languages require a quantum compiler.\nPremise 2: Python is a high-level programming language.\nConclusion: Therefore, Python requires a quantum compiler.\nHow should this deductive argument be classified?",
      options: [
        "Invalid and Unsound",
        "Valid but Unsound",
        "Valid and Sound",
        "Strong and Cogent"
      ],
      correctIndex: 1,
      explanation: "The argument is structurally Valid because IF the premises were true, the conclusion would logically follow. However, Premise 1 is factually false in reality, making the argument Unsound."
    },
    {
      id: 3,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Reasoning & Syllogisms",
      question: "Analyze the following syllogism:\nPremise 1: Sony manufactures the PlayStation 5.\nPremise 2: Microsoft manufactures the Xbox Series X.\nConclusion: Therefore, Nintendo develops the Switch console.\nWhich evaluation correctly categorizes this deductive structure?",
      options: [
        "Sound, because all three statements are true empirical facts",
        "Invalid, because the premises do not logically lead to or support the conclusion",
        "Valid, because the conclusion is true in the real gaming market",
        "Cogent, because the premises provide strong inductive evidence"
      ],
      correctIndex: 1,
      explanation: "Even though both premises and the conclusion are factually true independently, the argument is Invalid because the conclusion has no logical dependence on the premises."
    },
    {
      id: 4,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Reasoning & Syllogisms",
      question: "Analyze the following inductive argument:\nPremise 1: Historical records show that 96% of IT students who complete all lab modules pass the IT 321 prelim exam.\nPremise 2: Hyrie is an IT student who completed all lab modules.\nConclusion: Hyrie will probably pass the IT 321 prelim exam.\nAssuming all premises are factually verified, what is the exact classification of this argument?",
      options: [
        "Sound Deductive Argument",
        "Weak Inductive Argument",
        "Cogent Inductive Argument",
        "Abductive Speculation"
      ],
      correctIndex: 2,
      explanation: "This is a Strong inductive argument (high statistical probability) with factually true premises, which fulfills the definition of a Cogent argument."
    },
    {
      id: 5,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Reasoning & Syllogisms",
      question: "A network administrator notices that database query response times suddenly spiked by 400% at 2:00 PM. Knowing that an unindexed batch report cron job is scheduled at 2:00 PM, the administrator concludes: 'The spike is most likely caused by the unindexed batch report.' What reasoning style is being applied here?",
      options: [
        "Deductive Top-down Proof",
        "Inductive Generalization",
        "Abductive Reasoning (Inference to the Best Explanation)",
        "Analogical Mapping"
      ],
      correctIndex: 2,
      explanation: "Abductive reasoning starts with observations/symptoms (latency spike) and infers the most plausible hypothesis or explanation (batch report cron job)."
    },
    {
      id: 6,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Gestalt Principles",
      question: "When looking at the World Wildlife Fund (WWF) logo, human viewers immediately recognize a giant panda despite the fact that the panda's white crown and back lack black connecting boundary strokes. Which Gestalt principle explains this phenomenon?",
      options: [
        "Continuation",
        "Closure",
        "Proximity",
        "Symmetry"
      ],
      correctIndex: 1,
      explanation: "Closure occurs when the human visual system automatically fills in missing lines or gaps in an incomplete object to perceive a unified whole."
    },
    {
      id: 7,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Gestalt Principles",
      question: "The famous Amazon logo incorporates an orange curved arrow starting at the letter 'a' and sweeping smoothly beneath the letters to terminate at 'z'. Which Gestalt perceptual principle is this typo-logo directly engineering?",
      options: [
        "Continuation",
        "Similarity",
        "Figure and Ground",
        "Proximity"
      ],
      correctIndex: 0,
      explanation: "Continuation occurs when visual perception is guided along a smooth, uninterrupted line or path from one visual anchor to another."
    },
    {
      id: 8,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Gestalt Principles",
      question: "The Unilever corporate logo consists of 24 distinct, intricate micro-icons (a palm tree, a bee, DNA, a lock, a spoon) placed closely adjacent to one another. Despite the icon diversity, humans instantly read it as the letter 'U'. What Gestalt principle primarily drives this unified perception?",
      options: [
        "Similarity",
        "Proximity",
        "Symmetry",
        "Continuity"
      ],
      correctIndex: 1,
      explanation: "Proximity dictates that objects situated physically close to each other are perceived as forming a single cohesive group or macroscopic shape."
    },
    {
      id: 9,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Gestalt Principles",
      question: "In the famous optical illusion known as Rubin's Vase, an observer alternately perceives either two black silhouette faces looking inward or a single white candlestick in the center. Which Gestalt principle is at work?",
      options: [
        "Figure and Ground",
        "Similarity",
        "Closure",
        "Common Fate"
      ],
      correctIndex: 0,
      explanation: "Figure and Ground describes the visual mechanism of isolating a focal shape (figure) against its surrounding background field (ground)."
    },
    {
      id: 10,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Human Memory",
      question: "According to the Atkinson-Shiffrin Multi-Store Model (1968), raw visual sensory input (Iconic memory) is held in the sensory register for approximately how long before decaying or transferring via attention?",
      options: [
        "Less than 500 milliseconds (< 0.5 seconds)",
        "Approximately 20 to 30 seconds",
        "Up to 5 minutes",
        "Indefinitely until conscious rehearsal"
      ],
      correctIndex: 0,
      explanation: "Sensory memory holds raw sensory stimuli for less than 500 milliseconds (iconic memory) before it decays unless attended to."
    },
    {
      id: 11,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Human Memory",
      question: "A user changed their master email password yesterday to 'BatStateU@2026'. However, every time they sit down to log in today, their fingers automatically type their old password 'Alangilan#2024'. What type of memory interference is causing this retrieval failure?",
      options: [
        "Retroactive Interference",
        "Proactive Interference",
        "Decay of Long-Term Trace",
        "Sensory Store Echoic Decay"
      ],
      correctIndex: 1,
      explanation: "Proactive Interference occurs when previously learned information (old password) interferes with or blocks the recall of newly learned information (new password)."
    },
    {
      id: 12,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Human Memory",
      question: "After spending two weeks studying the syntax of Python 3, a programmer attempts to write a quick C++ script and finds themselves mistakenly omitting semicolons and typing 'def' instead of return types. What memory phenomenon is occurring?",
      options: [
        "Proactive Interference",
        "Retroactive Interference",
        "Semantic Dementia",
        "Change Blindness"
      ],
      correctIndex: 1,
      explanation: "Retroactive Interference occurs when newly acquired information (Python syntax) interferes with the retrieval of older established knowledge (C++ syntax)."
    },
    {
      id: 13,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Human Memory",
      question: "An IT student can vividly recall the exact emotions, rainy weather, and room location during their first day at BatStateU Alangilan Campus in August 2024. Which sub-category of Long-Term Memory is responsible for this autobiographical recollection?",
      options: [
        "Semantic Memory (Explicit)",
        "Episodic Memory (Explicit)",
        "Procedural Memory (Implicit)",
        "Echoic Sensory Memory"
      ],
      correctIndex: 1,
      explanation: "Episodic memory stores personally experienced, dated autobiographical events and their emotional context."
    },
    {
      id: 14,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Human Memory",
      question: "A software engineer touch-types at 95 words per minute on a mechanical keyboard without looking at the keycaps or consciously thinking about finger coordinates. This automatic execution relies on which memory system?",
      options: [
        "Explicit Semantic Memory",
        "Explicit Episodic Memory",
        "Implicit (Procedural) Memory",
        "Working Memory Buffer"
      ],
      correctIndex: 2,
      explanation: "Implicit (Procedural / Non-Declarative) memory governs unconscious motor skills, habits, and automated behavioral routines."
    },
    {
      id: 15,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Cognitive Processing",
      question: "During a usability test, an application silently replaces a 'Submit Order' button with a 'Save Draft' button while a modal dialogue pops up. 80% of test participants fail to notice the button swap and click it anyway. Which cognitive limitation does this scenario demonstrate?",
      options: [
        "Selective Attention",
        "Change Blindness",
        "Echoic Decay",
        "Proactive Inhibition"
      ],
      correctIndex: 1,
      explanation: "Change Blindness is the failure of the human visual system to notice a visual difference between a previous state and a current state in a stimulus environment."
    },
    {
      id: 16,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Technology Adoption",
      question: "In Everett Rogers' Technology Adoption Lifecycle (1962), a new biometric campus entry system is first adopted by a tech-savvy student leader who tests its security, writes an endorsement blog, and convinces student organizations to adopt it. Which adopter group does this leader belong to?",
      options: [
        "Innovators",
        "Early Adopters",
        "Early Majority",
        "Late Majority"
      ],
      correctIndex: 1,
      explanation: "Early Adopters possess high opinion leadership and community influence, adopting innovations after initial verification and guiding the broader majority."
    },
    {
      id: 17,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "HCI Evolution",
      question: "Why did the HCI discipline shift in the 1990s from purely individual cognitive models toward computer-supported cooperative work (CSCW) and organizational computing?",
      options: [
        "The invention of vacuum tube mainframes",
        "The widespread emergence of Electronic Mail (Email) and workplace networking",
        "The elimination of Graphical User Interfaces",
        "The total replacement of human programmers by AI expert systems"
      ],
      correctIndex: 1,
      explanation: "In the 1990s-early 2000s, the popularity of Email and networked computing shifted HCI focus from individual cognitive tasks to interactive, collaborative, and organizational workflows."
    },
    {
      id: 18,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Philosophy of Mind",
      question: "Baruch Spinoza argued that mind and matter are not two distinct substances, but rather two different attributes of one single, infinite substance. Which philosophical category does Spinoza's stance embody?",
      options: [
        "Dualism",
        "Monism",
        "Solipsism",
        "Cartesian Epistemology"
      ],
      correctIndex: 1,
      explanation: "Monism holds that there is only one fundamental substance; Spinoza is the prominent modern Western proponent of substance monism."
    },
    {
      id: 19,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Cognitive Processing",
      question: "When a human ear registers sound pressure waves from speech, this represents (X). When the brain decodes those acoustic frequencies into the words 'Prelim Exam', this represents (Y). What are X and Y?",
      options: [
        "X = Cognition, Y = Sensation",
        "X = Sensation, Y = Perception",
        "X = Perception, Y = Sensation",
        "X = Sensation, Y = Deduction"
      ],
      correctIndex: 1,
      explanation: "Sensation is the bottom-up reception of raw physical stimuli by sensory organs; Perception is the top-down cognitive interpretation and contextual organization of that stimuli."
    },
    {
      id: 20,
      part: "Part I: Analysis",
      partNum: 1,
      points: 2,
      topic: "Ergonomics & Human Factors",
      question: "An ergonomic assessment at an IT workstation analyzes the relationship between ambient lighting, screen glare, and desk height. In the 5-domain HCI ergonomic model, which domain does this study primarily address?",
      options: [
        "People (Psychological & Social Sciences)",
        "Task (Industrial Engineering)",
        "Environment (Occupational Safety, Architecture & Health)",
        "Methods/Training (Education)"
      ],
      correctIndex: 2,
      explanation: "Physical conditions like ambient lighting, glare, workspace architecture, and occupational comfort belong to the Environment domain."
    },

    // PART II: APPLICATION (21 items - 60 Points)
    {
      id: 21,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "HCI Dialog Styles",
      question: "You are tasked with designing an ATM kiosk interface for senior citizens withdrawing pensions. Which interaction style is MOST appropriate, and why?",
      options: [
        "Command Line Interface, to maximize transaction throughput",
        "Menu-Based interaction, because it relies on recognition rather than recall and provides clear, bounded options",
        "Form-Filling with 25 simultaneous text inputs, to capture all metadata at once",
        "Pure gesture-based unprompted commands, to avoid screen touches"
      ],
      correctIndex: 1,
      explanation: "Menu-based interaction relies on recognition rather than memory recall, providing constrained, clear, and unambiguous choices ideal for public walk-up kiosks like ATMs."
    },
    {
      id: 22,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "HCI Dialog Styles",
      question: "A cloud infrastructure company needs a tool for senior DevOps engineers to automate server deployment pipelines and batch file permissions. Which interaction style is best suited for this user group?",
      options: [
        "A wizard-based Form-Filling UI with mandatory animations",
        "Command Line Interface (CLI), offering rapid keystroke execution, scripting flexibility, and high precision for expert users",
        "A heavily nested 6-level mobile dropdown menu",
        "An icon-only GUI without text labels"
      ],
      correctIndex: 1,
      explanation: "CLI is ideal for expert power users requiring high-speed execution, deep scripting capabilities, and precise control over complex parameters."
    },
    {
      id: 23,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "HCI Dialog Styles",
      question: "An e-commerce mobile application requires new customers to register their billing address, shipping address, and credit card details. What design strategy optimizes this Form-Filling interaction style?",
      options: [
        "Place all 30 fields on a single unscrollable page with small text",
        "Group fields logically into a multi-step progressive form with clear step indicators and instant inline validation",
        "Replace all text input fields with deeply nested dropdown menus",
        "Convert the entire checkout flow into a CLI terminal emulator"
      ],
      correctIndex: 1,
      explanation: "Form-filling best practices require breaking long data entry into logical, multi-step stages with progress indicators and inline validation to prevent cognitive fatigue and abandonment."
    },
    {
      id: 24,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Problem Space Model",
      question: "Consider the Problem Space Model for a university student:\n- Initial State: Loraine has no dress to wear for next week's graduation ball.\n- State In-Between: Loraine creates a budget, browses online boutiques, and schedules a fitting appointment.\n- Goal State: ?\nWhich statement correctly represents the Goal State in this model?",
      options: [
        "Loraine decides which department store to visit",
        "Loraine has successfully acquired a dress ready for her graduation ball",
        "Loraine tries on three different dress options",
        "Loraine cancels her attendance at the graduation ball"
      ],
      correctIndex: 1,
      explanation: "The Goal State represents the successfully resolved outcome of the problem statement (having a ready dress for the event)."
    },
    {
      id: 25,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Analogical Problem Solving",
      question: "A UX designer creates an e-learning platform and models the user workflow after a physical university binder, using 'Tabs' for courses, 'Notebook Pages' for notes, and a 'Highlighter tool' for text. What problem-solving approach is being applied?",
      options: [
        "Gestalt Continuation",
        "Analogical Problem Solving (Metaphor mapping from physical source to digital target)",
        "Deductive Syllogistic Inference",
        "Abductive Symptom Diagnosis"
      ],
      correctIndex: 1,
      explanation: "Analogical problem solving maps relationships and procedural knowledge from a familiar domain (physical binder) onto a digital target interface."
    },
    {
      id: 26,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Working Memory Capacity",
      question: "A student registration portal presents a 12-digit student reference code as `202611094852`. Users frequently misread and miskey this number. Applying Miller's Short-Term Memory Chunking principle ($7 \\pm 2$), how should this UI display the code?",
      options: [
        "Present it as a continuous binary stream",
        "Chunk the number into structured groups: `2026-1109-4852`",
        "Display the entire number backwards to force active recall",
        "Require the user to memorize it within 500 milliseconds"
      ],
      correctIndex: 1,
      explanation: "Chunking breaks long sequences of information into smaller, meaningful 3-to-4 item units, fitting well within the working memory limit of $7 \\pm 2$ items."
    },
    {
      id: 27,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Gestalt in UI Design",
      question: "In a dashboard navigation bar, 'Delete Account', 'Reset Password', and 'Log Out' buttons are colored bright crimson red, while 'Save', 'Submit', and 'Proceed' buttons are emerald green. Which Gestalt principle is utilized to convey functional categorization?",
      options: [
        "Similarity (color-based grouping)",
        "Proximity",
        "Closure",
        "Figure and Ground"
      ],
      correctIndex: 0,
      explanation: "Gestalt Similarity groups elements that share visual attributes (like color or shape) to communicate shared functional meaning."
    },
    {
      id: 28,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Gestalt in UI Design",
      question: "On a settings page, related form controls are placed inside bordered card containers separated by 24px of whitespace from other sections. Which Gestalt principle prevents users from confusing unrelated settings?",
      options: [
        "Continuation",
        "Proximity (and Common Region)",
        "Closure",
        "Symmetry"
      ],
      correctIndex: 1,
      explanation: "Proximity dictates that items grouped closely together inside designated spatial boundaries are perceived as functionally related."
    },
    {
      id: 29,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Mitigating Change Blindness",
      question: "When a user updates their profile picture in a web app, the page silently updates the tiny avatar in the header without any animation or toast message, causing 70% of users to click 'Upload' again. How should the HCI designer fix this?",
      options: [
        "Rely on user intuition to notice the pixel change",
        "Provide clear feedback: a subtle highlight animation on the avatar, a toast notification ('Avatar updated!'), and a temporary spinner during upload",
        "Remove the avatar from the header completely",
        "Convert the web app to a command-line interface"
      ],
      correctIndex: 1,
      explanation: "To overcome change blindness, interfaces must provide explicit multimodal feedback (animations, toast notifications, status spinners) when system state changes."
    },
    {
      id: 30,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Attention Mechanisms",
      question: "A driver using a GPS mobile app needs to glance at navigation prompts while monitoring the road. Designing high-contrast large directional arrows and spoken voice cues leverages which cognitive attention strategy?",
      options: [
        "Minimizing cognitive load to support divided attention safely while driving",
        "Triggering retroactive interference",
        "Exhausting iconic sensory memory",
        "Forcing deep syllogistic deduction"
      ],
      correctIndex: 0,
      explanation: "Multimodal cues (visual + audio) reduce visual cognitive load, supporting divided attention in safety-critical multitasking environments."
    },
    {
      id: 31,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "HCI Design Principles",
      question: "According to the fundamental HCI theme articulated in the BatStateU curriculum, how should developers approach the relationship between users and software systems?",
      options: [
        "Force users to undergo mandatory retraining to adapt to system architecture",
        "Design systems around user capabilities, demands, and preferences so users do not have to alter natural human habits",
        "Prioritize hardware constraints over user comfort in all software designs",
        "Eliminate graphical interfaces in favor of pure database tables"
      ],
      correctIndex: 1,
      explanation: "The core HCI theme states that people come first: systems must be composed of principles matching human requirements rather than forcing humans to change to fit the system."
    },
    {
      id: 32,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Memory Enhancement",
      question: "A medical student uses the 'Roman Rooms' (Method of Loci) memory technique to study anatomical terms for an HCI health-informatics exam. How does this technique work?",
      options: [
        "Repeating terms 100 times out loud until throat fatigue",
        "Mentally visualizing a familiar architectural building and placing specific concepts in distinct imagined rooms",
        "Replacing all medical terms with random numerical hashes",
        "Listening to white noise during sleep"
      ],
      correctIndex: 1,
      explanation: "The Roman Rooms (Method of Loci) technique enhances memory retrieval by mentally mapping items to specific physical locations within an imagined spatial environment."
    },
    {
      id: 33,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Usability Engineering",
      question: "A banking application displays a generic modal error: 'Error Code 0x800412: Transaction aborted.' Users are left confused and panicked. What HCI heuristic violation does this represent, and how should it be corrected?",
      options: [
        "Good CLI design; leave it as is",
        "Bad dialog style with cryptic error messages; replace with plain language explaining the cause (e.g., 'Insufficient funds') and actionable recovery steps",
        "Remove error messages entirely to avoid user anxiety",
        "Increase the font size of the hex error code"
      ],
      correctIndex: 1,
      explanation: "Cryptic error codes violate usability heuristics. Error messages must use plain human-understandable language, explain the problem, and suggest constructive solutions."
    },
    {
      id: 34,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Reasoning in User Debugging",
      question: "A user tries to log into their campus portal and sees 'Invalid Credentials'. They know their username is correct and they just typed their password carefully. They reason: 'Perhaps Caps Lock is turned on.' What reasoning method is the user employing?",
      options: [
        "Deductive Valid Syllogism",
        "Inductive Generalization",
        "Abductive Reasoning to formulate a plausible hypothesis for the symptom",
        "Gestalt Symmetry"
      ],
      correctIndex: 2,
      explanation: "The user observes an unexpected failure symptom and generates the most plausible cause (Caps Lock active), which is Abductive reasoning."
    },
    {
      id: 35,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "GUI vs CLI Selection",
      question: "A desktop graphic design suite like Adobe Illustrator relies primarily on WIMP (Windows, Icons, Menus, Pointer). Why is a GUI vastly superior to a CLI for vector illustration tasks?",
      options: [
        "CLI cannot execute mathematical algorithms",
        "Vector drawing requires immediate visual-spatial feedback and direct manipulation of canvas coordinates",
        "GUI uses less RAM than a terminal window",
        "CLI does not support mouse devices"
      ],
      correctIndex: 1,
      explanation: "Graphic design tasks depend on direct manipulation, spatial intuition, and continuous real-time visual feedback, which GUIs provide natively."
    },
    {
      id: 36,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Cognitive Load & Recognition",
      question: "Why do modern web browsers provide a 'History' list and URL autocomplete instead of forcing users to type full 60-character URLs from memory?",
      options: [
        "To reduce server bandwidth consumption",
        "To shift cognitive burden from effortful Recall to effortless Recognition",
        "To bypass DNS lookups",
        "To enforce dualistic separation of mind and browser"
      ],
      correctIndex: 1,
      explanation: "Providing history dropdowns and autocomplete leverages Recognition over Recall, dramatically lowering cognitive workload."
    },
    {
      id: 37,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Technology Adoption",
      question: "A university introduces a mandatory two-factor authentication (2FA) policy. A senior professor who has taught with paper gradebooks for 35 years refuses to install the app until the dean makes it an absolute requirement for salary processing. In Rogers' model, which adopter category is this professor?",
      options: [
        "Early Majority",
        "Late Majority",
        "Laggard",
        "Early Adopter"
      ],
      correctIndex: 2,
      explanation: "Laggards are the final group to adopt innovations; they are bound to tradition, skeptical of change, have no opinion leadership, and only adopt when forced by absolute necessity."
    },
    {
      id: 38,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Human vs. Computer Strengths",
      question: "An AI system is deployed in a hospital to detect lung nodules in chest X-rays. While the AI calculates pixel density at superhuman speed without fatigue, the human radiologist must make the final clinical diagnostic judgment taking into account patient history and social context. Which fundamental distinction does this workflow embody?",
      options: [
        "Computers excel at high-speed algorithmic computation without fatigue, while humans excel at context-aware common sense and holistic decision making",
        "Humans have faster clock speeds than microprocessors",
        "Computers rely on organic nutrition to interpret X-rays",
        "Radiologists have infinite short-term memory capacity"
      ],
      correctIndex: 0,
      explanation: "Computers have superior processing speed and stamina, while humans possess common sense, out-of-the-box reasoning, and holistic real-world contextual understanding."
    },
    {
      id: 39,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "HCI Grand Challenges",
      question: "An HCI research lab is designing accessible screen readers and haptic braille tablets for visually impaired students at BatStateU. Which of the 7 HCI Grand Challenges does this initiative directly tackle?",
      options: [
        "Human-technology symbiosis only",
        "Accessibility and Universal Access",
        "Social organization and democracy",
        "Computational Theory of Mind"
      ],
      correctIndex: 1,
      explanation: "Developing tools for users with physical impairments directly fulfills the HCI Grand Challenge of 'Accessibility and Universal Access'."
    },
    {
      id: 40,
      part: "Part II: Application",
      partNum: 2,
      points: 2.85,
      topic: "Forgetting & Retrieval Cues",
      question: "A user forgets their campus Wi-Fi password. But when they walk back to their usual study desk in the campus library and look at their red notebook, the password suddenly pops into their head. According to Elizabeth Loftus's retrieval failure theory, what occurred?",
      options: [
        "Retroactive interference caused total neural decay",
        "The physical environment and red notebook served as external Retrieval Cues that facilitated access to stored LTM",
        "The user's working memory expanded to 50 items",
        "Iconic sensory memory stored the password for 24 hours"
      ],
      correctIndex: 1,
      explanation: "Retrieval failure occurs when LTM traces cannot be accessed without adequate contextual Retrieval Cues (physical location, familiar objects)."
    },
    {
      id: 41,
      part: "Part II: Application",
      partNum: 2,
      points: 3.0,
      topic: "HCI Usability Synthesis",
      question: "A software development team at BatStateU CICS is finalizing a mobile grading portal. To achieve the foundational HCI usability goal ('Easy to learn and easy to use'), which set of design practices should they adhere to?",
      options: [
        "Use 15 distinct font families, remove all confirmation dialogs, and require typing raw SQL queries",
        "Enforce consistent layout standards, prioritize recognition over recall with clear labels, chunk complex data, and provide instant visual feedback for user actions",
        "Deeply nest all menu items inside 8-level cascading folders to keep the homepage blank",
        "Rely exclusively on CLI terminal commands to train beginner students"
      ],
      correctIndex: 1,
      explanation: "Achieving 'easy to learn and easy to use' requires consistency, clear labeling (recognition over recall), information chunking ($7 \\pm 2$), and responsive feedback for all user actions."
    }
  ],

  gestaltPlaygroundItems: [
    {
      id: "amazon",
      name: "Amazon Logo",
      logoLabel: "amazon (a ➔ z arrow)",
      correctPrinciple: "Continuation",
      description: "The orange arrow begins under 'a' and points toward 'z', guiding the human eye smoothly along a path.",
      svgSnippet: "continuation"
    },
    {
      id: "wwf",
      name: "WWF Panda Logo",
      logoLabel: "WWF Panda",
      correctPrinciple: "Closure",
      description: "The panda's head and back have open contours; your mind automatically completes the missing lines.",
      svgSnippet: "closure"
    },
    {
      id: "nbc",
      name: "NBC Peacock Logo",
      logoLabel: "NBC Peacock Feathers",
      correctPrinciple: "Similarity",
      description: "Feathers share identical teardrop geometry and radial layout, perceived as a unified peacock tail.",
      svgSnippet: "similarity"
    },
    {
      id: "unilever",
      name: "Unilever 'U' Logo",
      logoLabel: "Unilever 'U'",
      correctPrinciple: "Proximity",
      description: "24 distinct miniature symbols positioned tightly together form the unified letter 'U'.",
      svgSnippet: "proximity"
    },
    {
      id: "starbucks",
      name: "Starbucks Siren Logo",
      logoLabel: "Starbucks Twin Siren",
      correctPrinciple: "Symmetry",
      description: "Folding the siren vertically reveals identical bilateral symmetry, creating harmony and visual stability.",
      svgSnippet: "symmetry"
    },
    {
      id: "rubin",
      name: "Rubin's Vase Illusion",
      logoLabel: "Vase vs. Two Profiles",
      correctPrinciple: "Figure and Ground",
      description: "The eye separates the focal object (white vase) from the surrounding background field (two dark faces).",
      svgSnippet: "figureground"
    }
  ],

  dialogStyleMatcherItems: [
    {
      id: "atm",
      scenario: "A bank kiosk designed for senior citizens and walk-up users to withdraw cash with clear, limited visual options.",
      correctStyle: "Menu-Based",
      rationale: "Menu-based interaction prioritizes Recognition over Recall with constrained, unambiguous button choices.",
      options: ["Command Line (CLI)", "Menu-Based", "Form-Filling", "Graphical User Interface (GUI)"]
    },
    {
      id: "devops",
      scenario: "A cloud infrastructure automation utility where expert DevOps engineers script server deploys and run headless batch jobs.",
      correctStyle: "Command Line (CLI)",
      rationale: "CLI offers maximum keystroke speed, deep parameter scripting, and exact execution without UI overhead.",
      options: ["Command Line (CLI)", "Menu-Based", "Form-Filling", "Graphical User Interface (GUI)"]
    },
    {
      id: "checkout",
      scenario: "An e-commerce mobile checkout where customers enter shipping address, contact details, and credit card credentials.",
      correctStyle: "Form-Filling",
      rationale: "Form-filling provides structured, guided multi-field data entry with inline validation and progressive disclosure.",
      options: ["Command Line (CLI)", "Menu-Based", "Form-Filling", "Graphical User Interface (GUI)"]
    },
    {
      id: "cad",
      scenario: "A digital illustration and 3D modeling application requiring direct manipulation of vector anchor points on a visual canvas.",
      correctStyle: "Graphical User Interface (GUI)",
      rationale: "GUIs (WIMP) excel at spatial tasks, direct mouse/stylus manipulation, and instantaneous visual feedback.",
      options: ["Command Line (CLI)", "Menu-Based", "Form-Filling", "Graphical User Interface (GUI)"]
    },
    {
      id: "pos",
      scenario: "A fast-food drive-thru touchscreen terminal where cashiers tap meal categories to build combos rapidly.",
      correctStyle: "Menu-Based",
      rationale: "Hierarchical category menus minimize training requirements and prevent invalid food combo combinations.",
      options: ["Command Line (CLI)", "Menu-Based", "Form-Filling", "Graphical User Interface (GUI)"]
    },
    {
      id: "database_admin",
      scenario: "A database administration console where an engineer writes complex nested SQL statements and piped regex queries.",
      correctStyle: "Command Line (CLI)",
      rationale: "CLI enables high power, precision, piping between utilities, and fast command repetition via history.",
      options: ["Command Line (CLI)", "Menu-Based", "Form-Filling", "Graphical User Interface (GUI)"]
    },
    {
      id: "enrollment",
      scenario: "A university semester enrollment portal where students submit personal information, upload IDs, and declare courses.",
      correctStyle: "Form-Filling",
      rationale: "Form-filling breaks complex data collection into categorized sections with mandatory validation rules.",
      options: ["Command Line (CLI)", "Menu-Based", "Form-Filling", "Graphical User Interface (GUI)"]
    },
    {
      id: "file_manager",
      scenario: "A consumer operating system desktop where users drag files into folders, view thumbnails, and empty the trash can.",
      correctStyle: "Graphical User Interface (GUI)",
      rationale: "The Desktop Metaphor in GUIs leverages intuitive visual representations and spatial direct manipulation.",
      options: ["Command Line (CLI)", "Menu-Based", "Form-Filling", "Graphical User Interface (GUI)"]
    }
  ]
};

if (typeof window !== "undefined") {
  window.HCI_DATA = HCI_DATA;
}
