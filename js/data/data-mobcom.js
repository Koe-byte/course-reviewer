/**
 * Unified Reviewer — Course Dataset
 * CS 312: Mobile Computing
 * Based on Batangas State University Preliminary Examination Coverage (Modules 1–3)
 */

const MOBCOM_DATA = {
  courseInfo: {
    id: "mobcom",
    courseCode: "CS 312",
    courseTitle: "Mobile Computing",
    examTitle: "Preliminary Exam Reviewer & Simulator",
    institution: "Batangas State University",
    campus: "Alangilan Campus",
    college: "College of Engineering • BS Computing Sciences",
    academicYear: "AY 2026–2027",
    termScope: "Preliminary Examination Coverage (Modules 1–3)",
    examStructure: {
      totalItems: 20,
      points: 20,
      description: "Active recall mock exam covering Mobile Architectures, Data Communication, Transmission Media, and Cellular Networks."
    }
  },

  callSteps: [
    {
      title: "Step 1: Radio Frequency Uplink (MS ➔ BTS)",
      desc: "The Sender Mobile Station (MS) initiates a voice call or data transmission by emitting a radio frequency (RF) signal over the designated wireless uplink channel to the nearest cell tower antenna."
    },
    {
      title: "Step 2: RF-to-Digital Conversion (BTS Cell Tower)",
      desc: "The Base Transceiver Station (BTS) receives the over-the-air RF electromagnetic wave, amplifies it, converts it from analog RF into a digital bitstream, and relays it down to the Base Station Controller via fiber or microwave."
    },
    {
      title: "Step 3: Radio Resource Coordination (BSC)",
      desc: "The Base Station Controller (BSC) manages radio channel frequency allocation, monitors signal strength for potential handoffs, and forwards the packet upstream to the central switching core."
    },
    {
      title: "Step 4: Mobility Routing & Switching (MSC Core Brain)",
      desc: "The Mobile Switching Center (MSC) authenticates the subscriber against the user database (HLR/VLR), determines the destination location, calculates billing, and routes the call through the high-speed backbone network."
    },
    {
      title: "Step 5: RF Downlink to Recipient (Destination BTS ➔ Receiver MS)",
      desc: "The recipient's local BTS broadcasts a paging signal over the downlink channel. The receiver's Mobile Station locks onto the frequency and decodes the incoming voice/data packet!"
    }
  ],

  flashcards: [
    {
      id: 1,
      category: 'mod1',
      categoryName: 'Module 1',
      front: "What is the formal definition of Mobile Computing and its 3 core pillars?",
      back: "A technology allowing transmission of data, voice, and video via a wireless device without physical links; a computing environment for physical mobility.<br><br><strong>3 Pillars:</strong><br>1. Mobile Hardware (portable devices)<br>2. Mobile Software (constrained OS/apps)<br>3. Mobile Communication (wireless networks)",
      mnemonic: "H.S.C. = Hardware, Software, Communication"
    },
    {
      id: 2,
      category: 'mod1',
      categoryName: 'Module 1',
      front: "What are the 4 fundamental characteristics of mobile computing?",
      back: "<strong>1. Portability:</strong> Small/light enough to use while moving.<br><strong>2. Connectivity:</strong> Continuous wireless connection anywhere.<br><strong>3. Interactivity:</strong> Real-time two-way communication.<br><strong>4. Individuality:</strong> Deep personalization for a single user (biometrics, profiles).",
      mnemonic: "P.C.I.I. = Portability, Connectivity, Interactivity, Individuality"
    },
    {
      id: 3,
      category: 'mod1',
      categoryName: 'Module 1',
      front: "What is Edge Computing and how does it solve mobile latency?",
      back: "Edge Computing processes telemetry and computational tasks <strong>physically closer to the mobile device</strong> (on local edge nodes) rather than sending all raw data to distant centralized cloud servers. This slashes round-trip latency and saves bandwidth.",
      mnemonic: "Process at the EDGE, not the distant Cloud."
    },
    {
      id: 4,
      category: 'mod1',
      categoryName: 'Module 1',
      front: "Why is On-Device AI becoming a major mobile computing trend?",
      back: "Dedicated on-device Neural Processing Units (NPUs) run voice recognition, computational photography, and LLMs directly on the smartphone. This ensures <strong>instant zero-latency execution, works offline, and keeps sensitive personal data private</strong>.",
      mnemonic: "Local NPU = Privacy + Offline + Speed"
    },
    {
      id: 5,
      category: 'mod2',
      categoryName: 'Module 2',
      front: "What are the 8 fundamental elements of Data Communication?",
      back: "1. <strong>Sender</strong> (initiator)<br>2. <strong>Receiver</strong> (destination)<br>3. <strong>Encoder/Transmitter</strong> (data ➔ signal)<br>4. <strong>Decoder</strong> (signal ➔ data)<br>5. <strong>Message</strong> (payload)<br>6. <strong>Medium/Channel</strong> (pathway)<br>7. <strong>Protocol</strong> (governing rules)<br>8. <strong>Noise</strong> (interference)",
      mnemonic: "S.R.E.D. M.M.P.N."
    },
    {
      id: 6,
      category: 'mod2',
      categoryName: 'Module 2',
      front: "What are the 3 fundamental characteristics of effective data communication?",
      back: "<strong>1. Delivery:</strong> Arrives at the correct intended destination only.<br><strong>2. Accuracy:</strong> Data arrives intact and uncorrupted.<br><strong>3. Timeliness:</strong> Data arrives in real-time without lagging delay.",
      mnemonic: "D.A.T. = Delivery, Accuracy, Timeliness"
    },
    {
      id: 7,
      category: 'mod2',
      categoryName: 'Module 2',
      front: "Differentiate UTP vs. STP Twisted Pair Cables.",
      back: "<strong>UTP (Unshielded Twisted Pair):</strong> Cheap, flexible, easy installation, but highly susceptible to electromagnetic interference (EMI) and crosstalk.<br><br><strong>STP (Shielded Twisted Pair):</strong> Enclosed in a protective metal foil/braid that blocks EMI and supports higher speeds, but is bulkier, stiffer, and costlier.",
      mnemonic: "STP has Shielding = Armor against EMI"
    },
    {
      id: 8,
      category: 'mod2',
      categoryName: 'Module 2',
      front: "How does Fiber-Optic Cable transmit data and what are its key advantages?",
      back: "Transmits light pulses through an ultra-pure silica glass/plastic core using the principle of <strong>Total Internal Reflection</strong>.<br><br><strong>Advantages:</strong> Completely immune to EMI/electrical noise, immense multi-Tbps bandwidth, extremely low attenuation over long distances.",
      mnemonic: "Light speed + Total Internal Reflection"
    },
    {
      id: 9,
      category: 'mod2',
      categoryName: 'Module 2',
      front: "What is Multipath Propagation and why is it a problem in wireless?",
      back: "When a wireless signal reflects off obstacles (buildings, terrain, cars), multiple delayed copies arrive at the receiving antenna at slightly different times. This causes <strong>phase cancellation, distortion, and signal fading</strong>.",
      mnemonic: "Multiple paths = Signal Ghosting & Fading"
    },
    {
      id: 10,
      category: 'mod2',
      categoryName: 'Module 2',
      front: "Compare Bus vs. Star vs. Ring vs. Mesh Topologies.",
      back: "• <strong>Bus:</strong> Single central cable; cheap, but backbone cut collapses all.<br>• <strong>Star:</strong> Central switch/hub; fault isolated, but central switch is single point of failure.<br>• <strong>Ring:</strong> Unidirectional loop; token predictability, but single break downs loop.<br>• <strong>Mesh:</strong> Point-to-point redundancy; highly fault-tolerant, but very costly.",
      mnemonic: "Star = Most Popular LAN | Mesh = Most Resilient"
    },
    {
      id: 11,
      category: 'mod3',
      categoryName: 'Module 3',
      front: "Why are cellular networks designed with hexagonal geometry instead of circles?",
      back: "Circles leave either <strong>uncovered dead zones (gaps)</strong> or <strong>overlapping interference areas</strong>. Regular hexagons provide <strong>100% gapless surface coverage (tessellation)</strong> with equal distances to all 6 adjacent cell centers and minimal boundary perimeter.",
      mnemonic: "Hexagons = 100% Tessellation with Zero Gaps"
    },
    {
      id: 12,
      category: 'mod3',
      categoryName: 'Module 3',
      front: "What is the function of the BTS (Base Transceiver Station)?",
      back: "The BTS is the cell tower hardware containing radio transceivers, power amplifiers, and antennas. It directly communicates over the air with Mobile Stations (MS) and <strong>converts between radio waves and digital signals</strong>.",
      mnemonic: "BTS = Base Tower & Signal Converter"
    },
    {
      id: 13,
      category: 'mod3',
      categoryName: 'Module 3',
      front: "What is the role of the BSC (Base Station Controller)?",
      back: "The BSC manages and coordinates <strong>multiple BTS units</strong>. It handles radio channel allocation, transmitter power levels, and intra-BSC handoffs as users move.",
      mnemonic: "BSC = Traffic Controller for Towers"
    },
    {
      id: 14,
      category: 'mod3',
      categoryName: 'Module 3',
      front: "What is the Mobile Switching Center (MSC) and why is it called the core brain?",
      back: "The MSC is the central switching exchange. It <strong>routes calls, authenticates subscribers, manages mobility/user tracking, handles billing</strong>, and connects the cellular network to the public telephone network (PSTN) and Internet.",
      mnemonic: "MSC = Master Brain & Routing Switch"
    },
    {
      id: 15,
      category: 'mod3',
      categoryName: 'Module 3',
      front: "What is Frequency Reuse in cellular networks?",
      back: "The practice of re-allocating the <strong>same set of radio frequencies to geographically separated cells</strong> (cluster patterns like N=7). As long as cells are separated by reuse distance, co-channel interference is prevented while multiplying network capacity.",
      mnemonic: "Reuse Frequencies = Infinite Capacity"
    },
    {
      id: 16,
      category: 'mod3',
      categoryName: 'Module 3',
      front: "Differentiate Handoff (Handover) vs. Roaming.",
      back: "<strong>Handoff:</strong> Automatic, seamless transfer of an active call/session from one cell tower to an adjacent tower to prevent dropping.<br><br><strong>Roaming:</strong> Accessing cellular service on a visited partner carrier's network when traveling outside home coverage footprint.",
      mnemonic: "Handoff = Tower to Tower | Roaming = Carrier to Carrier"
    },
    {
      id: 17,
      category: 'mod3',
      categoryName: 'Module 3',
      front: "What was the major evolutionary leap from 1G to 2G, and 3G to 4G?",
      back: "• <strong>1G ➔ 2G:</strong> Shift from Analog to Digital (introduced digital encryption, SMS text, and SIM cards).<br>• <strong>3G ➔ 4G:</strong> Shift to <strong>All-IP packet-switched architecture</strong> (eliminated legacy circuit switching, enabling true broadband speeds & VoLTE).",
      mnemonic: "1G=Analog | 2G=Digital SMS | 3G=Web | 4G=All-IP"
    },
    {
      id: 18,
      category: 'mod3',
      categoryName: 'Module 3',
      front: "What are the 3 specialized slices in 5G Network Slicing?",
      back: "<strong>1. eMBB (Enhanced Mobile Broadband):</strong> Multi-Gbps speeds for 4K/8K, AR/VR.<br><strong>2. mMTC (Massive Machine-Type Comm.):</strong> 1M devices/km² for IoT with 10-year battery life.<br><strong>3. URLLC (Ultra-Reliable Low-Latency Comm.):</strong> Sub-1ms latency & 99.999% reliability for remote surgery and autonomous V2X.",
      mnemonic: "eMBB (Speed), mMTC (Sensors), URLLC (Safety)"
    },
    {
      id: 19,
      category: 'mod3',
      categoryName: 'Module 3',
      front: "What is Network Densification and Small Cells in 5G?",
      back: "High-frequency 5G mmWave signals suffer severe attenuation and cannot penetrate walls easily. To solve this, operators deploy <strong>dense clusters of compact, low-power small cells (femtocells, microcells)</strong> on streetlights and buildings to blanket dense urban zones.",
      mnemonic: "High Frequency = Shorter Range = More Small Cells"
    },
    {
      id: 20,
      category: 'mod2',
      categoryName: 'Module 2',
      front: "How do weather disturbances like heavy rain affect wireless transmission links?",
      back: "High-frequency radio and microwave wavelengths are similar in size to raindrops. Rainfall absorbs, scatters, and severely attenuates signals (a phenomenon called <strong>Rain Fade</strong>), degrading signal-to-noise ratio.",
      mnemonic: "Rain Fade = Rain scatters microwave beams"
    },
    {
      id: 21,
      category: 'mod1',
      categoryName: 'Module 1',
      front: "How do extreme weather/temperature conditions affect mobile end devices?",
      back: "Extreme cold slows down internal chemical reactions in Lithium-ion batteries, causing sudden voltage drops and premature shutdown. Extreme heat causes thermal throttling of the CPU/GPU and display dimming to prevent permanent damage.",
      mnemonic: "Cold slows chemistry; Heat causes thermal throttling"
    },
    {
      id: 22,
      category: 'mod3',
      categoryName: 'Module 3',
      front: "What factors are critical when designing a network for an off-grid remote area?",
      back: "1. <strong>Power:</strong> Solar panels with battery storage / microgenerators.<br>2. <strong>Spectrum:</strong> Lower RF bands (700–900 MHz) for wide geographic coverage and obstacle penetration.<br>3. <strong>Backhaul:</strong> LEO satellite links (Starlink) or long-range microwave relays.<br>4. <strong>Hardware:</strong> Ruggedized, weather-proof enclosures.",
      mnemonic: "Solar Power + Sub-1GHz RF + Satellite Backhaul"
    },
    {
      id: 23,
      category: 'mod1',
      categoryName: 'Module 1',
      front: "What is Mobile Computing in 2-3 words, and what is the justification?",
      back: "<strong>'Ubiquitous Intelligent Connectivity'</strong><br><br><strong>Why:</strong> It grants untethered access to compute power and data anywhere (ubiquitous), dynamically adapts to mobility and contextual needs (intelligent), and bridges physical hardware with cloud intelligence (connectivity).",
      mnemonic: "Ubiquitous Intelligent Connectivity"
    },
    {
      id: 24,
      category: 'mod2',
      categoryName: 'Module 2',
      front: "What is the primary role of a Network Interface Card (NIC)?",
      back: "The NIC is the hardware component (chip/card with a unique physical MAC address) that provides the physical and electrical interface enabling a device to connect to a wired Ethernet cable or transmit wireless radio signals.",
      mnemonic: "NIC = Hardware Passport to the Network"
    }
  ],

  quizQuestions: [
    {
      id: 1,
      category: 'Module 1',
      question: "Which of the following is NOT one of the 3 fundamental components of Mobile Computing?",
      options: [
        "Mobile Hardware (portable physical devices)",
        "Mobile Software (constrained OS and apps)",
        "Mobile Communication (wireless transmission infrastructure)",
        "Mobile Centralization (mandatory single-server topology)"
      ],
      correct: 3,
      explanation: "Mobile Computing consists of Mobile Hardware, Mobile Software, and Mobile Communication. Mobile systems are highly distributed and heterogeneous, not centralized."
    },
    {
      id: 2,
      category: 'Module 1',
      question: "Which key characteristic of mobile computing specifically refers to the deep personalization and configuration of services for a single, unique user?",
      options: [
        "Portability",
        "Interactivity",
        "Individuality",
        "Connectivity"
      ],
      correct: 2,
      explanation: "Individuality refers to tailoring devices and services for a single specific user (biometrics, personal contextual profiles, custom settings)."
    },
    {
      id: 3,
      category: 'Module 1',
      question: "Why is Edge Computing considered an indispensable emerging trend in mobile computing?",
      options: [
        "It forces all smartphones to operate purely offline without any Internet",
        "It processes data physically adjacent to mobile clients, slashing round-trip latency and saving bandwidth",
        "It replaces optical fiber cables with mechanical copper wires",
        "It eliminates the need for lithium-ion batteries in smartphones"
      ],
      correct: 1,
      explanation: "Edge Computing moves processing power to nodes geographically near devices, preventing massive raw data transfer back to distant cloud data centers."
    },
    {
      id: 4,
      category: 'Module 2',
      question: "In data communication, what is the role of the Transmitter / Encoder?",
      options: [
        "To initiate the user intent",
        "To translate received physical signals back into digital bits",
        "To convert raw digital data into electromagnetic or optical signals suitable for the medium",
        "To generate unwanted electromagnetic interference"
      ],
      correct: 2,
      explanation: "The Encoder/Transmitter converts digital bitstreams into physical signals (voltages, RF waves, light pulses) matching the transmission channel."
    },
    {
      id: 5,
      category: 'Module 2',
      question: "Which of the following describes the 'Timeliness' characteristic of effective data communication?",
      options: [
        "Data must arrive only at the authorized IP address",
        "Data must arrive without bit flips or parity errors",
        "Data must be delivered in real time without lag, critical for interactive voice and video",
        "Data must be permanently archived on tape drives"
      ],
      correct: 2,
      explanation: "Timeliness ensures real-time delivery without lagging delays, which is vital for voice calls, gaming, and real-time telemetry."
    },
    {
      id: 6,
      category: 'Module 2',
      question: "Which physical cable utilizes 'Total Internal Reflection' to transmit data pulses immune to electromagnetic interference?",
      options: [
        "Unshielded Twisted Pair (UTP)",
        "Shielded Twisted Pair (STP)",
        "Coaxial Cable",
        "Fiber-Optic Cable"
      ],
      correct: 3,
      explanation: "Fiber-optic cables transmit light pulses through glass/plastic cores using Total Internal Reflection, making them 100% immune to EMI."
    },
    {
      id: 7,
      category: 'Module 2',
      question: "What is the primary vulnerability of a Bus network topology?",
      options: [
        "It requires too many point-to-point redundant cables",
        "A single break or failure in the central backbone cable collapses the entire network",
        "A failure in one workstation immediately disables all other workstations",
        "It cannot support coaxial cables"
      ],
      correct: 1,
      explanation: "In a Bus topology, all nodes share one linear backbone cable. If the backbone breaks anywhere, signal reflection destroys communication for all nodes."
    },
    {
      id: 8,
      category: 'Module 2',
      question: "What phenomenon occurs when wireless signals bounce off buildings and arrive at the receiver antenna at slightly different times, causing phase cancellation?",
      options: [
        "Attenuation",
        "Multipath Propagation",
        "Total Internal Reflection",
        "Frequency Modulation"
      ],
      correct: 1,
      explanation: "Multipath propagation occurs when signals reflect, diffract, and scatter, causing multiple time-delayed copies to interfere with each other (fading)."
    },
    {
      id: 9,
      category: 'Module 3',
      question: "Why do cellular network engineers model geographic cell coverage as regular hexagons instead of circles?",
      options: [
        "Because radio antennas physically emit hexagonal radiation beams",
        "Because regular hexagons provide 100% gapless surface tessellation without dead zones or overlaps",
        "Because hexagons require 10 times more base stations than circles",
        "Because 5G millimeter wave standards mandate hexagonal silicon"
      ],
      correct: 1,
      explanation: "Circles leave gaps (dead zones) or overlapping interference. Hexagons tile 2D surfaces completely with uniform adjacent center distances."
    },
    {
      id: 10,
      category: 'Module 3',
      question: "Which cellular network component is responsible for controlling multiple cell towers, managing transmitter power, and executing intra-BSC handoffs?",
      options: [
        "Mobile Station (MS)",
        "Base Transceiver Station (BTS)",
        "Base Station Controller (BSC)",
        "Public Switched Telephone Network (PSTN)"
      ],
      correct: 2,
      explanation: "The Base Station Controller (BSC) acts as the regional coordinator managing multiple BTS towers, radio channels, and handoffs."
    },
    {
      id: 11,
      category: 'Module 3',
      question: "What is considered the central 'Core Brain' of a cellular network that routes calls, manages user authentication, and handles billing?",
      options: [
        "Mobile Switching Center (MSC)",
        "Network Interface Card (NIC)",
        "Base Transceiver Station (BTS)",
        "Unshielded Twisted Pair (UTP)"
      ],
      correct: 0,
      explanation: "The Mobile Switching Center (MSC) connects BSCs to core networks, routes calls, tracks subscriber mobility, and handles authentication/billing."
    },
    {
      id: 12,
      category: 'Module 3',
      question: "What is 'Frequency Reuse' in cellular wireless networks?",
      options: [
        "Using a single radio frequency across an entire country simultaneously",
        "Assigning the same frequency channels to geographically separated cells to multiply capacity without co-channel interference",
        "Converting FM radio signals into optical laser beams",
        "Recycling discarded cell phone copper antennas"
      ],
      correct: 1,
      explanation: "Frequency reuse allocates identical frequency clusters to non-adjacent cells separated by a safe reuse distance, multiplying network capacity."
    },
    {
      id: 13,
      category: 'Module 3',
      question: "What is the key technical difference between 'Handoff' and 'Roaming'?",
      options: [
        "Handoff is between external international carriers; Roaming is within the same tower",
        "Handoff seamlessly transfers an active call between adjacent towers; Roaming allows service on a foreign partner carrier's network",
        "Handoff only works on 1G; Roaming only works on 5G",
        "Handoff requires a physical cable connection; Roaming is wireless"
      ],
      correct: 1,
      explanation: "Handoff maintains active calls as a user moves across towers. Roaming lets users connect to partner operator networks outside home coverage."
    },
    {
      id: 14,
      category: 'Module 3',
      question: "Which cellular generation eliminated legacy circuit switching in favor of a 100% all-IP packet-switched architecture?",
      options: [
        "1G (AMPS)",
        "2G (GSM)",
        "3G (UMTS)",
        "4G (LTE / LTE-Advanced)"
      ],
      correct: 3,
      explanation: "4G LTE completely abandoned circuit-switched voice channels, treating voice as IP packets (VoLTE) and enabling unified high-speed data."
    },
    {
      id: 15,
      category: 'Module 3',
      question: "Which 5G Network Slice is specifically engineered for sub-1 millisecond latency and 99.999% reliability in autonomous vehicles (V2X) and telesurgery?",
      options: [
        "eMBB (Enhanced Mobile Broadband)",
        "mMTC (Massive Machine-Type Communications)",
        "URLLC (Ultra-Reliable Low-Latency Communication)",
        "SMS (Short Message Service)"
      ],
      correct: 2,
      explanation: "URLLC provides ultra-low latency (<1 ms) and mission-critical 99.999% reliability for remote surgery, industrial robotics, and autonomous driving."
    },
    {
      id: 16,
      category: 'Module 3',
      question: "Which 5G Network Slice is designed to connect up to 1,000,000 devices per km² with a 10-year battery lifespan for smart city IoT sensors?",
      options: [
        "eMBB",
        "mMTC",
        "URLLC",
        "VoLTE"
      ],
      correct: 1,
      explanation: "mMTC (Massive Machine-Type Communications) supports extreme connection densities (1M devices/km²) with ultra-low power consumption."
    },
    {
      id: 17,
      category: 'Module 2',
      question: "Why are high-frequency microwave and millimeter-wave wireless links heavily degraded during heavy rainstorms (Rain Fade)?",
      options: [
        "Water conducts electricity and grounds the base station",
        "Raindrop dimensions are comparable to signal wavelengths, causing absorption and scattering",
        "Clouds completely block radio waves from exiting the ionosphere",
        "Smartphone screens disable touch input during precipitation"
      ],
      correct: 1,
      explanation: "Rain Fade occurs because raindrop size is close to the wavelength of microwaves/mmWaves, causing strong electromagnetic scattering and attenuation."
    },
    {
      id: 18,
      category: 'Module 1',
      question: "Why do smartphones experience sudden battery drain in sub-zero freezing weather?",
      options: [
        "The phone's Wi-Fi chip automatically switches to maximum wattage",
        "Freezing temperatures slow down internal electrochemical reactions inside the Lithium-ion battery, causing voltage drops",
        "Cell towers transmit higher voltage into the air during winter",
        "The CPU executes twice as many instructions in the cold"
      ],
      correct: 1,
      explanation: "Sub-zero cold slows ion transport inside Lithium battery electrolytes, causing internal resistance to spike and battery voltage to drop prematurely."
    },
    {
      id: 19,
      category: 'Module 3',
      question: "When designing a cellular network for an isolated, off-grid mountainous community, which engineering strategy is most appropriate?",
      options: [
        "Deploy exclusively 60 GHz mmWave small cells every 10 meters",
        "Deploy lower RF bands (700-900 MHz) with solar-battery power and satellite/microwave backhaul",
        "Run unshielded twisted pair cables from the nearest city 200 miles away",
        "Use infrared remote-control diodes mounted on trees"
      ],
      correct: 1,
      explanation: "Lower RF frequencies travel further and penetrate obstacles; solar/battery provides off-grid power; satellite or microwave bridges distant backhaul."
    },
    {
      id: 20,
      category: 'Module 1',
      question: "Which of the following phrases best captures the essence of Mobile Computing across all 3 modules?",
      options: [
        "Stationary Cable Tethering",
        "Ubiquitous Intelligent Connectivity",
        "Analog Circuit Switching",
        "Isolated Desktop Processing"
      ],
      correct: 1,
      explanation: "Mobile Computing is 'Ubiquitous Intelligent Connectivity' because it provides untethered computing everywhere, adaptively connects devices, and unifies intelligence."
    }
  ],

  guideQuestions: [
    {
      num: 1,
      question: "What is mobile computing, and what are its major applications and services?",
      directAnswer: "Mobile computing is a technology enabling transmission of data, voice, and video via portable computing devices without physical cable links, creating an environment designed for physical mobility. It is composed of Mobile Hardware, Mobile Software, and Mobile Communication.",
      details: [
        "<strong>Communication & Social:</strong> Instant messaging, high-definition video conferencing (Zoom, WhatsApp).",
        "<strong>M-Commerce & Banking:</strong> Contactless NFC payments (Apple Pay, Google Wallet), mobile banking, stock trading.",
        "<strong>Navigation & Location-Based Services (LBS):</strong> GPS turn-by-turn routing (Google Maps), real-time ride-hailing (Uber/Grab), geofencing.",
        "<strong>M-Health:</strong> Continuous biometric telemetry, remote ECG monitoring, digital patient charts.",
        "<strong>Enterprise & Logistics:</strong> Warehouse barcode/RFID inventory scanning, fleet asset tracking.",
        "<strong>Entertainment & M-Learning:</strong> Cloud gaming (GeForce Now), interactive flashcard learning platforms."
      ],
      examTip: "Always list the 3 pillars (Hardware, Software, Communication) and 4 characteristics (Portability, Connectivity, Interactivity, Individuality) for full points."
    },
    {
      num: 2,
      question: "What are the major challenges and limitations of mobile computing, and how do emerging technologies address them?",
      directAnswer: "Mobile computing faces 7 core constraints rooted in physical portability, wireless transmission physics, and hardware miniaturization. Emerging paradigms provide targeted hardware and architectural solutions.",
      details: [
        "<strong>1. Battery Depletion:</strong> Solved by ARM big.LITTLE architectures, fast Gallium-Nitride charging, OLED dark modes.",
        "<strong>2. Bandwidth Volatility:</strong> Solved by 5G carrier aggregation, adaptive bitrate streaming (DASH), and edge caching.",
        "<strong>3. Security Risks:</strong> Countered via on-device Secure Enclaves, TLS 1.3 encryption, and biometric authentication (FaceID).",
        "<strong>4. Limited Compute & Storage:</strong> Addressed via Edge Computing offloading, cloud storage sync, and dedicated on-device NPUs.",
        "<strong>5. Screen Size & Input Limits:</strong> Addressed via Foldable OLEDs, AI voice dictation, and multimodal UI.",
        "<strong>6. Heterogeneity:</strong> Managed via cross-platform runtimes (Flutter, React Native) and standard REST/WebSockets.",
        "<strong>7. Location Dependency:</strong> Overcome via seamless cellular handoffs and direct-to-cell LEO satellite constellations."
      ],
      examTip: "Present this as a Problem ➔ Solution matrix on your written exam sheet."
    },
    {
      num: 3,
      question: "What are the fundamental concepts of data communication?",
      directAnswer: "Data communication is the process of transmitting and receiving digital or analog data between two or more devices across a transmission medium. It requires 8 core elements and must fulfill 3 fundamental quality characteristics.",
      details: [
        "<strong>8 Core Elements:</strong> Sender (originator), Receiver (destination), Transmitter/Encoder (modulates signal), Decoder (demodulates signal), Message (payload), Medium/Channel (physical path), Protocol (governing rules), and Noise (interference).",
        "<strong>3 Quality Pillars:</strong><br>• <em>Delivery:</em> Arrives at intended destination only.<br>• <em>Accuracy:</em> Data arrives intact and uncorrupted.<br>• <em>Timeliness:</em> Data arrives in real time without lag."
      ],
      examTip: "Remember the acronym DAT (Delivery, Accuracy, Timeliness) and the 8 elements diagram."
    },
    {
      num: 4,
      question: "What are the major components and architectures of a computer network?",
      directAnswer: "A computer network consists of interconnected nodes exchanging data. It is structured using hardware building blocks and organized into either centralized or decentralized architectures.",
      details: [
        "<strong>Hardware Components:</strong> End Devices/Nodes (PCs, smartphones), Intermediary Devices (Switches, Routers, Hubs, WAPs), Network Interface Cards (NICs), Servers, and Transmission Media.",
        "<strong>Architectures:</strong><br>• <em>Client-Server:</em> Centralized servers host resources; client nodes request them. Easy security and administration, but servers are single points of failure.<br>• <em>Peer-to-Peer (P2P):</em> Decentralized; all nodes share equal privileges and act simultaneously as both client and server. Highly fault-tolerant and redundant, but difficult to secure."
      ],
      examTip: "Highlight that NICs contain the physical MAC address, and contrast Client-Server centralization vs P2P decentralization."
    },
    {
      num: 5,
      question: "What are the different transmission media and wireless communication methods?",
      directAnswer: "Transmission media are categorized into Guided (wired physical conduits) and Unguided (wireless electromagnetic radiation across atmosphere/space).",
      details: [
        "<strong>Guided Media:</strong><br>• <em>UTP:</em> Twisted copper, inexpensive, high EMI susceptibility.<br>• <em>STP:</em> Metal-shielded twisted copper, reduces EMI/crosstalk, higher cost.<br>• <em>Coaxial:</em> Inner copper + dielectric + braided shield; supports FDM broadband.<br>• <em>Fiber-Optic:</em> Glass core transmitting light via Total Internal Reflection; immune to EMI, multi-Tbps speeds.",
        "<strong>Unguided Media:</strong><br>• <em>Radio Waves:</em> Omnidirectional, penetrates walls, wide coverage.<br>• <em>Microwaves:</em> Focused Line-of-Sight (LOS) tower relays, high bandwidth, vulnerable to rain fade.<br>• <em>Infrared:</em> Short-range, non-penetrating, line-of-sight (remote controls)."
      ],
      examTip: "Be prepared to explain 'Total Internal Reflection' and 'Line-of-Sight (LOS)' requirements."
    },
    {
      num: 6,
      question: "What are the distinct characteristics of network topologies? How would you describe each and what are their use cases?",
      directAnswer: "A network topology is the physical or logical arrangement of nodes and links within a network. Topology selection dictates installation cost, fault tolerance, and maintenance overhead.",
      details: [
        "<strong>Bus Topology:</strong> All nodes share a single central cable with terminators. Inexpensive, but a backbone break collapses the entire network. <em>Use Case:</em> Small legacy labs, temporary sensor buses.",
        "<strong>Star Topology:</strong> Nodes connect individually to a central switch/hub. Faults in one cable isolate only one node, but the central switch is a Single Point of Failure. <em>Use Case:</em> Modern Enterprise LANs, Home Wi-Fi.",
        "<strong>Ring Topology:</strong> Closed unidirectional loop passing tokens. Predictable latency, but a single link break breaks the loop. <em>Use Case:</em> FDDI optical metropolitan backbones.",
        "<strong>Mesh Topology:</strong> Every node connects directly to every other node via dedicated point-to-point links ($n(n-1)/2$). Maximum fault tolerance and privacy, but extremely costly. <em>Use Case:</em> Mission-critical telecom cores, military command."
      ],
      examTip: "Star is the most common LAN topology; Mesh provides maximum fault tolerance at highest cost."
    },
    {
      num: 7,
      question: "How do external factors, such as weather disturbances, affect a transmission link? How about the end devices?",
      directAnswer: "Weather disturbances affect transmission links through electromagnetic wave scattering and physical attenuation, while impacting mobile end devices through thermal and electrochemical stresses.",
      details: [
        "<strong>Transmission Links:</strong><br>• <em>Rain Fade:</em> High-frequency microwaves and mmWaves scatter upon hitting raindrops of similar wavelength, causing severe signal attenuation.<br>• <em>Lightning:</em> Generates high-voltage electromagnetic pulses causing surge noise and interference.<br>• <em>Atmospheric Ducting & Fog:</em> Bends and refracts RF propagation angles.",
        "<strong>End Devices:</strong><br>• <em>Freezing Temperatures:</em> Slows internal electrochemical reaction rates in Lithium-ion batteries, triggering sudden voltage drop and premature shutdown.<br>• <em>Extreme Heat:</em> Causes CPU/GPU thermal throttling, dimming displays, and battery swelling.<br>• <em>Moisture & Humidity:</em> Corrodes internal contacts and degrades capacitive touch accuracy."
      ],
      examTip: "Split your exam answer clearly into two sections: (1) Transmission Links (Rain Fade) and (2) End Devices (Lithium Chemistry)."
    },
    {
      num: 8,
      question: "How does cellular communication work, and what are the major components of a cellular network?",
      directAnswer: "Cellular communication divides geographic coverage areas into tessellated hexagonal cells, each served by a low-power base station, allowing widespread frequency reuse and subscriber mobility.",
      details: [
        "<strong>Why Hexagons?</strong> Hexagons tile 2D planes completely with zero gaps and zero overlapping dead zones while maintaining equal adjacent center distances.",
        "<strong>Major Components:</strong><br>1. <em>MS (Mobile Station):</em> User handset, SIM, and transceiver.<br>2. <em>BTS (Base Transceiver Station):</em> Cell tower RF antennas and signal converter.<br>3. <em>BSC (Base Station Controller):</em> Manages multiple BTS units, frequency channels, and handoffs.<br>4. <em>MSC (Mobile Switching Center):</em> Core brain handling call routing, billing, and PSTN/Internet gateway.<br>5. <em>Backbone:</em> Fiber/microwave cables linking all nodes."
      ],
      examTip: "Draw the 5-tier architecture: MS ➔ BTS ➔ BSC ➔ MSC ➔ Internet."
    },
    {
      num: 9,
      question: "What are the components involved in cellular communication? How is a message or a call transmitted?",
      directAnswer: "A cellular call transmission involves a coordinated multi-stage workflow from the sender's handset through radio access, station controllers, core switching, and backhaul down to the receiver.",
      details: [
        "<strong>Workflow:</strong><br>1. <em>Uplink RF:</em> Sender MS transmits voice/data packets over radio waves to local BTS.<br>2. <em>Conversion:</em> BTS converts RF wave to digital bits and forwards to BSC.<br>3. <em>Channel Routing:</em> BSC manages channel and routes to MSC.<br>4. <em>Core Authentication & Routing:</em> MSC checks subscriber database, bills call, and routes packet over high-speed backbone to the recipient's local MSC/BSC.<br>5. <em>Downlink Paging:</em> Destination BTS pages receiver MS over downlink channel; handset rings and locks onto the frequency."
      ],
      examTip: "List the 5 steps in chronological order: MS ➔ BTS ➔ BSC ➔ MSC ➔ Backbone ➔ Destination BTS ➔ Receiver MS."
    },
    {
      num: 10,
      question: "How have cellular networks evolved from early generations to current and emerging technologies?",
      directAnswer: "Cellular networks evolved from analog voice-only systems into digital encrypted networks, high-speed mobile broadband, all-IP packet architectures, and ultra-flexible 5G network slices.",
      details: [
        "<strong>1G (1980s):</strong> Analog FM (AMPS). Voice calls only, unencrypted, prone to eavesdropping.",
        "<strong>2G (1990s):</strong> Digital (GSM, CDMA). Introduced SMS text messaging, digital encryption, SIM cards, and basic GPRS data.",
        "<strong>3G (2000s):</strong> Mobile Broadband (UMTS, HSPA). Enabled web browsing, mobile app stores, and video calling.",
        "<strong>4G (2010s):</strong> All-IP Architecture (LTE/LTE-A). Eliminated circuit switching for VoLTE, high-speed HD streaming and gaming.",
        "<strong>5G (2020s+):</strong> Sub-6GHz, mmWave, Network Slicing (eMBB, mMTC, URLLC), sub-1ms latency, massive IoT density."
      ],
      examTip: "Emphasize: 1G=Analog Voice, 2G=Digital SMS, 3G=Mobile Web, 4G=All-IP Broadband, 5G=Network Slicing."
    },
    {
      num: 11,
      question: "Suppose you are tasked with designing a network infrastructure for a remote area; what factors should you consider?",
      directAnswer: "Designing network infrastructure for remote, off-grid, or topographically rugged terrain requires balancing power autonomy, wide-area propagation physics, backhaul viability, and environmental resilience.",
      details: [
        "<strong>1. Power Generation & Autonomy:</strong> Deploy solar photovoltaic arrays with lithium iron phosphate battery banks and backup diesel/wind microgenerators.",
        "<strong>2. Frequency Spectrum Choice:</strong> Prioritize lower RF bands (700 MHz – 900 MHz) because lower frequencies travel further and penetrate hills/foliage much better than high-frequency mmWave.",
        "<strong>3. Backhaul Connectivity:</strong> Utilize Low Earth Orbit (LEO) satellite terminals (Starlink/OneWeb) or multi-hop microwave Line-of-Sight relay towers.",
        "<strong>4. Physical Hardware Resilience:</strong> Deploy IP67-rated weatherproof enclosures with lightning arrestors and passive cooling.",
        "<strong>5. Redundancy & Edge Caching:</strong> Deploy local edge storage servers to cache essential educational and medical content locally."
      ],
      examTip: "Hit all 5 points: Power (Solar), Spectrum (Sub-1GHz), Backhaul (Satellite), Ruggedization, and Edge Caching."
    },
    {
      num: 12,
      question: "If you could describe mobile computing in 2-3 words, based on your learning from the 3 lessons, how would you describe it? Why?",
      directAnswer: "'Ubiquitous Intelligent Connectivity'",
      details: [
        "<strong>Ubiquitous:</strong> Compute power, services, and communication are accessible everywhere, untethered from fixed physical desks or power cables, moving dynamically with the human user.",
        "<strong>Intelligent:</strong> Modern mobile systems utilize on-device NPUs, edge computing, and sensor context (GPS, biometrics) to dynamically adapt to user needs in real time.",
        "<strong>Connectivity:</strong> Seamlessly bridges portable edge hardware with global cellular networks and cloud backbones, enabling continuous collaboration."
      ],
      examTip: "State the 3 words clearly in quotes first, then give a 1-sentence justification for each word."
    }
  ],

  glossary: [
    { term: "MS", full: "Mobile Station", cat: "Hardware", desc: "The user terminal equipment including smartphone, SIM card, and RF transceiver." },
    { term: "BTS", full: "Base Transceiver Station", cat: "Hardware", desc: "The cell tower antenna and power amplification hardware converting RF waves to digital bits." },
    { term: "BSC", full: "Base Station Controller", cat: "Hardware", desc: "Manages and coordinates multiple BTS cell towers, radio channel allocation, and intra-BSC handoffs." },
    { term: "MSC", full: "Mobile Switching Center", cat: "Cellular", desc: "Central core brain of the cellular network. Routes calls, authenticates users, tracks mobility, handles billing, and bridges to PSTN/Internet." },
    { term: "eMBB", full: "Enhanced Mobile Broadband", cat: "Cellular", desc: "5G network slice providing multi-gigabit throughput for 4K/8K streaming and immersive AR/VR." },
    { term: "mMTC", full: "Massive Machine-Type Communications", cat: "Cellular", desc: "5G slice supporting up to 1,000,000 devices/km² with 10-year battery life for smart city sensors." },
    { term: "URLLC", full: "Ultra-Reliable Low-Latency Communication", cat: "Cellular", desc: "5G slice providing <1ms latency and 99.999% reliability for autonomous driving (V2X) and telesurgery." },
    { term: "UTP", full: "Unshielded Twisted Pair", cat: "Media", desc: "Twisted copper cable lacking foil shielding; cheap and flexible but susceptible to EMI." },
    { term: "STP", full: "Shielded Twisted Pair", cat: "Media", desc: "Twisted copper enclosed in metal foil/braid; resists EMI and crosstalk at higher cost." },
    { term: "NIC", full: "Network Interface Card", cat: "Hardware", desc: "Hardware expansion card or chip with a unique MAC address that interfaces a device to a network." },
    { term: "FDM", full: "Frequency Division Multiplexing", cat: "Media", desc: "Technique combining multiple separate signals over a single medium by assigning distinct frequencies (e.g. broadband cable TV)." },
    { term: "LOS", full: "Line-of-Sight", cat: "Media", desc: "Propagation requiring an unobstructed straight physical line between transmitter and receiver (microwaves, infrared)." },
    { term: "MIMO", full: "Multiple-Input Multiple-Output", cat: "Cellular", desc: "Antenna technology using multiple antennas at both transmitter and receiver to multiply data capacity." },
    { term: "VoLTE", full: "Voice over Long-Term Evolution", cat: "Cellular", desc: "High-definition voice calling delivered as IP data packets over 4G LTE instead of legacy 2G/3G circuit switching." },
    { term: "P2P", full: "Peer-to-Peer Architecture", cat: "General", desc: "Decentralized network architecture where every node acts simultaneously as client and server." },
    { term: "AMPS", full: "Advanced Mobile Phone System", cat: "Cellular", desc: "First-generation (1G) analog mobile phone standard introduced in the 1980s." },
    { term: "GSM", full: "Global System for Mobile Communications", cat: "Cellular", desc: "Second-generation (2G) digital cellular standard introducing SIM cards and SMS." },
    { term: "LTE", full: "Long-Term Evolution", cat: "Cellular", desc: "4G standard delivering all-IP broadband data transmission and low latency." },
    { term: "NPU", full: "Neural Processing Unit", cat: "Hardware", desc: "Dedicated silicon on mobile chipsets optimized for executing on-device AI models with zero cloud latency." },
    { term: "Rain Fade", full: "Rain Induced Microwave Attenuation", cat: "Media", desc: "Severe scattering and absorption of high-frequency wireless signals when raindrops match the signal wavelength." }
  ]
};

if (typeof window !== "undefined") {
  window.MOBCOM_DATA = MOBCOM_DATA;
}
