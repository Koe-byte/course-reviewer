/**
 * Unified Reviewer — Course Dataset
 * CS 312: Mobile Computing
 * Based on Batangas State University Curriculum
 * Midterm Examination Coverage: Lessons 1, 2, & 3 (Official Pointers Aligned)
 */

const MOBCOM_DATA = {
  courseInfo: {
    id: "mobcom",
    courseCode: "CS 312",
    courseTitle: "Mobile Computing",
    examTitle: "Midterm Examination Reviewer & Simulator",
    institution: "Batangas State University - The National Engineering University",
    campus: "Alangilan Campus",
    college: "College of Informatics and Computing Sciences (CICS)",
    academicYear: "Academic Year 2026–2027",
    termScope: "Midterm Examination Coverage (Lessons 1, 2, & 3)",
    examStructure: {
      totalItems: 30,
      points: 30,
      description: "Active recall mock exam aligned with Midterm Pointers: Mobile Internet Protocols (Mobile IP, TCP/UDP, IPv4 vs IPv6, NAT), GSM Network Architecture (MS, BSS, NSS, OSS, SIM, Call Transmission Flow), and Cellular Wireless Networks."
    },
    officialPointers: [
      {
        section: "I. Lesson 2: Mobile Internet Protocols",
        items: [
          "IP Addressing in Mobile Environments (Dual role: Endpoint ID vs. Routing Locator)",
          "TCP/IP and Mobile Communication",
          "TCP vs. UDP Deep Comparison & Common Use Cases",
          "Challenges of TCP/IP in mobile environments (Congestion control fallacy, BER vs Congestion)",
          "The basic Mobile IP process (RFC 3344 / RFC 5944)",
          "Key Components of Mobile IP: MN, HA, FA, CoA, CN, Home Address",
          "How is data transferred to the mobile node (CN ➔ MN: Proxy ARP, HA Encapsulation, FA Decapsulation)",
          "How is data transferred from the mobile node (MN ➔ CN: Direct Routing vs. Reverse Tunneling RFC 3024)",
          "Mobile IPv4 vs. IPv6 (Comprehensive Summary Table)",
          "Network Address Translation (NAT) in IPv4 and its elimination in IPv6"
        ]
      },
      {
        section: "II. Lesson 3: Global System for Mobile Communication (GSM)",
        items: [
          "Evolution of GSM: GSM (2G) ➔ GPRS (2.5G) ➔ EDGE (2.75G)",
          "Things that improved from GPRS to EDGE (8-PSK modulation, 384 kbps, AMC, Incremental Redundancy)",
          "GSM Network Architecture (4 Subsystems: MS, BSS, NSS, OSS)",
          "Mobile Station Subsystem (MS: Mobile Equipment IMEI + SIM)",
          "Base Station Subsystem (BSS: BTS cell tower + BSC controller)",
          "Network and Switching Subsystem (NSS: MSC, GMSC, HLR, VLR, AuC, EIR)",
          "Operation Support Subsystem (OSS / OMC)",
          "Subscriber Identity Module (SIM: IMSI, secret key Ki, PIN/PUK)",
          "GSM Call Transmission Stages (MS ➔ BTS ➔ BSC ➔ MSC ➔ HLR/VLR ➔ Backbone ➔ Destination MSC/BSC/BTS ➔ Receiver MS)"
        ]
      },
      {
        section: "Chapter 2 Learning Module: Lesson 1: Cellular Wireless Networks",
        items: [
          "Fundamentals of Cellular Communication (Dividing area into cells, low-power base stations)",
          "Why cellular systems divide coverage into cells (Frequency reuse & serving high user density)",
          "Hexagonal cell geometry (Approximation of circle, 100% gapless tessellation)",
          "Basic elements of a cellular system (Mobile station, Base station, Cell, Handoff/Handover)",
          "Cellular Network Architecture (MS, BTS, BSC, MSC, Backbone network)",
          "Frequency reuse clusters (N=7 pattern) and co-channel interference prevention",
          "Handoff vs. Roaming"
        ]
      }
    ]
  },

  callSteps: [
    {
      stage: 1,
      title: "Stage 1: Call Request & RF Uplink (Sender MS ➔ Local BTS)",
      component: "MS & BTS",
      desc: "The calling user dials a number. The Sender Mobile Station (MS) transmits a Channel Request message over the Random Access Channel (RACH) to the nearest Base Transceiver Station (BTS) cell tower."
    },
    {
      stage: 2,
      title: "Stage 2: Radio Resource Allocation (BTS ➔ Originating BSC)",
      component: "BTS & BSC",
      desc: "The BTS forwards the channel request to its Base Station Controller (BSC). The BSC allocates an available Standalone Dedicated Control Channel (SDCCH) and signals the BTS to notify the MS."
    },
    {
      stage: 3,
      title: "Stage 3: Core Switching & Authentication (BSC ➔ Originating MSC / VLR / AuC)",
      component: "MSC, VLR, & AuC",
      desc: "The BSC relays the call setup request to the local Mobile Switching Center (MSC). The MSC queries its Visitor Location Register (VLR) and the Authentication Center (AuC) to verify the subscriber's SIM identity using authentication triplets (RAND, SRES, Kc) and check call permissions."
    },
    {
      stage: 4,
      title: "Stage 4: Recipient Location Interrogation (Originating MSC ➔ GMSC ➔ Destination HLR)",
      component: "MSC, GMSC, & HLR",
      desc: "The Originating MSC interrogates the recipient's phone number. To find where the recipient is located anywhere in the world, the MSC sends a 'Send Routing Information' (SRI) query across the signaling network to the recipient's permanent Home Location Register (HLR)."
    },
    {
      stage: 5,
      title: "Stage 5: Roaming Number Assignment (Recipient HLR ➔ Destination VLR ➔ MSRN)",
      component: "HLR & Destination VLR",
      desc: "The recipient's HLR identifies which MSC/VLR is currently serving the recipient. It sends a 'Provide Roaming Number' (PRN) request to that destination VLR. The destination VLR allocates a temporary Mobile Station Roaming Number (MSRN) and returns it via the HLR to the originating MSC."
    },
    {
      stage: 6,
      title: "Stage 6: Core Backbone Routing (Originating MSC ➔ Backbone / PSTN ➔ Destination MSC)",
      component: "Originating MSC, Backbone, & Destination MSC",
      desc: "Using the routable MSRN, the originating MSC routes the call across the high-speed transit backbone network (via ISUP / SS7 signaling or IP core) directly to the Destination MSC serving the recipient's current location."
    },
    {
      stage: 7,
      title: "Stage 7: Downlink Location Area Paging (Destination MSC ➔ Destination BSC ➔ Destination BTSs)",
      component: "Destination MSC, BSC, & BTS",
      desc: "The destination MSC queries its local VLR to determine the recipient's Location Area Code (LAC). It commands the destination BSC to broadcast a Paging message containing the recipient's IMSI/TMSI across all BTS towers in that Location Area."
    },
    {
      stage: 8,
      title: "Stage 8: Alerting & Call Establishment (Destination BTS ➔ Receiver MS)",
      component: "Destination BTS & Receiver MS",
      desc: "The recipient's MS recognizes its paging ID on the Paging Channel (PCH), responds over the air, and locks onto an assigned traffic channel (TCH). The recipient's phone rings! When answered, a bidirectional voice circuit is established."
    }
  ],

  flashcards: [
    // --- LESSON 2: MOBILE INTERNET PROTOCOLS (MIDTERM FOCUS) ---
    {
      id: 1,
      category: 'midterm-lip',
      categoryName: 'Lesson 2: Mobile IP',
      isMidterm: true,
      midtermFocus: true,
      front: "Why does physical mobility complicate traditional IP addressing?",
      back: "In traditional IP, an IP address has a <strong>dual conflicting role</strong>:<br>1. <strong>Endpoint Identifier:</strong> Identifies the host in transport-layer TCP sockets (IP:port).<br>2. <strong>Topological Routing Locator:</strong> Specifies which subnet the node is physically attached to.<br><br>• If a mobile node <em>keeps</em> its IP in a foreign network, routers cannot route packets (topological mismatch).<br>• If it <em>changes</em> its IP, all existing TCP connections and sessions are instantly severed!",
      mnemonic: "Dual Role Conflict: Identity vs. Location"
    },
    {
      id: 2,
      category: 'midterm-lip',
      categoryName: 'Lesson 2: Mobile IP',
      isMidterm: true,
      midtermFocus: true,
      front: "Differentiate TCP vs. UDP and list their primary use cases.",
      back: "<strong>TCP (Transmission Control Protocol):</strong> Connection-oriented, reliable (3-way handshake, retransmissions, sequence numbers, congestion/flow control).<br><em>Use Cases:</em> Web (HTTP/HTTPS), file transfer (FTP), email (SMTP), where zero loss is essential.<br><br><strong>UDP (User Datagram Protocol):</strong> Connectionless, unreliable, best-effort (no handshake, no retransmissions, low 8-byte header overhead).<br><em>Use Cases:</em> VoIP, live video streaming, multiplayer games, DNS, where low latency beats packet recovery.",
      mnemonic: "TCP = Trustworthy & Checked | UDP = Urgent & Direct"
    },
    {
      id: 3,
      category: 'midterm-lip',
      categoryName: 'Lesson 2: Mobile IP',
      isMidterm: true,
      midtermFocus: true,
      front: "What is the primary challenge of TCP in mobile wireless environments?",
      back: "The <strong>Congestion Fallacy</strong>: Standard TCP assumes all packet loss is caused by network buffer congestion and immediately cuts its congestion window in half, entering slow-start.<br><br>In mobile wireless, however, losses are caused by <strong>high bit error rates (BER), RF fading, interference, and brief handoff disconnections</strong>—not congestion! This causes TCP throughput to unnecessarily plummet.",
      mnemonic: "TCP confuses Wireless Noise with Router Congestion"
    },
    {
      id: 4,
      category: 'midterm-lip',
      categoryName: 'Lesson 2: Mobile IP',
      isMidterm: true,
      midtermFocus: true,
      front: "What are the 5 core components of Mobile IP (RFC 3344)?",
      back: "1. <strong>Mobile Node (MN):</strong> The device changing points of attachment.<br>2. <strong>Home Agent (HA):</strong> Router on home network that intercepts and tunnels packets to the MN.<br>3. <strong>Foreign Agent (FA):</strong> Router on visited foreign network that detunnels and delivers packets to MN.<br>4. <strong>Care-of Address (CoA):</strong> Temporary routing address of MN in foreign network.<br>5. <strong>Correspondent Node (CN):</strong> The communicating peer device.",
      mnemonic: "M.H.F.C.C. = MN, HA, FA, CoA, CN"
    },
    {
      id: 5,
      category: 'midterm-lip',
      categoryName: 'Lesson 2: Mobile IP',
      isMidterm: true,
      midtermFocus: true,
      front: "Differentiate Foreign Agent CoA (FA-CoA) vs. Collocated CoA.",
      back: "• <strong>FA Care-of Address:</strong> The IP address of the Foreign Agent's network interface. Multiple mobile nodes share the same FA-CoA. The FA terminates the tunnel and decapsulates packets.<br><br>• <strong>Collocated Care-of Address:</strong> A temporary, individual IP address assigned directly to the Mobile Node via DHCP or autoconfiguration on the foreign network. The MN itself acts as the tunnel endpoint and performs decapsulation.",
      mnemonic: "FA-CoA = Shared by FA | Collocated = Owned by MN"
    },
    {
      id: 6,
      category: 'midterm-lip',
      categoryName: 'Lesson 2: Mobile IP',
      isMidterm: true,
      midtermFocus: true,
      front: "What are the 3 sequential phases of the Mobile IP process?",
      back: "<strong>1. Agent Discovery:</strong> HA and FA broadcast ICMP Agent Advertisements; MN detects whether it is at home or on a foreign network.<br><strong>2. Registration:</strong> MN obtains a CoA and sends a Registration Request to FA ➔ HA; HA binds Home Address to CoA in its mobility table.<br><strong>3. Tunneling & Encapsulation:</strong> HA intercepts packets destined for MN (via Proxy ARP), encapsulates them in outer IP headers, and tunnels them to the CoA.",
      mnemonic: "D.R.T. = Discovery ➔ Registration ➔ Tunneling"
    },
    {
      id: 7,
      category: 'midterm-lip',
      categoryName: 'Lesson 2: Mobile IP',
      isMidterm: true,
      midtermFocus: true,
      front: "How is data transferred to the Mobile Node (CN ➔ MN)?",
      back: "1. CN sends regular IP packet to MN's permanent <strong>Home Address</strong>.<br>2. Normal internet routing forwards the packet to MN's home network.<br>3. <strong>Home Agent (HA)</strong> intercepts the packet using <strong>Proxy ARP</strong>.<br>4. HA encapsulates the packet inside an outer IP packet destined for the <strong>Care-of Address (CoA)</strong> (IP-in-IP tunneling).<br>5. The packet reaches the Foreign Agent (or MN), which decapsulates the original payload and delivers it locally over wireless.",
      mnemonic: "CN ➔ Home Net ➔ HA Proxy ARP ➔ IP Tunnel ➔ CoA/FA ➔ MN"
    },
    {
      id: 8,
      category: 'midterm-lip',
      categoryName: 'Lesson 2: Mobile IP',
      isMidterm: true,
      midtermFocus: true,
      front: "How is data transferred from the Mobile Node (MN ➔ CN), and what is Triangular Routing?",
      back: "• <strong>Direct Routing:</strong> MN sends packets directly to CN with Source IP = Home Address. Because incoming packets travel CN ➔ HA ➔ MN while outgoing packets travel MN ➔ CN directly, this dogleg path is called <strong>Triangular Routing</strong>.<br><br>• <strong>The Problem:</strong> Foreign network firewalls perform <em>Ingress Filtering</em> and drop outgoing packets whose source IP does not match the foreign subnet.<br>• <strong>Solution:</strong> <em>Reverse Tunneling (RFC 3024)</em> — MN tunnels packets back to HA, which forwards them to CN.",
      mnemonic: "Triangular Routing = Indirect In, Direct Out | Reverse Tunnel beats Ingress Filter"
    },
    {
      id: 9,
      category: 'midterm-lip',
      categoryName: 'Lesson 2: Mobile IP',
      isMidterm: true,
      midtermFocus: true,
      front: "Why is IPv6 superior to IPv4 for mobile environments?",
      back: "1. <strong>Massive Address Space:</strong> 128-bit addresses ($3.4 \times 10^{38}$) provide globally routable IPs for every device.<br>2. <strong>No Foreign Agents Needed:</strong> Every IPv6 MN acquires its own Collocated CoA via SLAAC (Stateless Autoconfiguration).<br>3. <strong>Built-in Route Optimization:</strong> Eliminates triangular routing natively using IPv6 Routing Headers.<br>4. <strong>Mandatory IPsec:</strong> Built-in end-to-end authentication and encryption.<br>5. <strong>No NAT Required:</strong> Restores pure end-to-end connectivity.",
      mnemonic: "IPv6 = 128-bit + SLAAC + Built-in Route Opt + No FA + No NAT"
    },
    {
      id: 10,
      category: 'midterm-lip',
      categoryName: 'Lesson 2: Mobile IP',
      isMidterm: true,
      midtermFocus: true,
      front: "What is NAT in IPv4 and why was it removed / unnecessary in IPv6?",
      back: "<strong>NAT (Network Address Translation):</strong> A temporary band-aid in IPv4 that maps multiple private RFC 1918 IPs to one public IP using port multiplexing (PAT) to conserve limited 32-bit addresses.<br><br><strong>Why Removed in IPv6:</strong><br>• IPv6 has an inexhaustible 128-bit address space, making address rationing obsolete.<br>• NAT breaks the <em>End-to-End Principle</em> of the internet.<br>• NAT breaks IPsec digital signatures (headers modified in transit).<br>• NAT complicates peer-to-peer VoIP, gaming, and mobile handovers.",
      mnemonic: "NAT was an IPv4 Band-Aid; IPv6 Restores Pure End-to-End"
    },

    // --- LESSON 3: GSM (MIDTERM FOCUS) ---
    {
      id: 11,
      category: 'midterm-gsm',
      categoryName: 'Lesson 3: GSM',
      isMidterm: true,
      midtermFocus: true,
      front: "Describe the evolution of GSM: GSM ➔ GPRS ➔ EDGE.",
      back: "• <strong>GSM (2G):</strong> Circuit-switched voice & SMS, 9.6 kbps data, GMSK modulation.<br>• <strong>GPRS (2.5G):</strong> Introduced packet-switched domain alongside voice, 'always-on' volume billing, up to 114 kbps, added SGSN & GGSN nodes.<br>• <strong>EDGE (2.75G):</strong> Upgraded modulation to 8-PSK, boosted data rates to 384 kbps (3x faster than GPRS), introduced Adaptive Modulation & Coding (AMC) and Incremental Redundancy.",
      mnemonic: "GSM (Voice 9.6k) ➔ GPRS (Packets 114k) ➔ EDGE (8-PSK 384k)"
    },
    {
      id: 12,
      category: 'midterm-gsm',
      categoryName: 'Lesson 3: GSM',
      isMidterm: true,
      midtermFocus: true,
      front: "What specific technological improvements were introduced from GPRS to EDGE?",
      back: "1. <strong>8-PSK Modulation:</strong> Replaced GMSK (1 bit/symbol) with 8-PSK (<strong>3 bits per symbol</strong>), tripling raw data throughput in the same 200 kHz channel.<br>2. <strong>384 kbps Peak Speeds:</strong> 3x–4x faster than GPRS.<br>3. <strong>Adaptive Modulation & Coding (AMC):</strong> Dynamically shifts between 9 schemes (MCS-1 to MCS-9) based on real-time link quality.<br>4. <strong>Incremental Redundancy (IR / HARQ):</strong> Retransmissions send only parity error-correction bits rather than resending entire packets.<br>5. <strong>Zero New Spectrum:</strong> Plug-and-play upgrade on existing GSM/GPRS BTS hardware.",
      mnemonic: "8-PSK (3 bits/sym) + 384 kbps + AMC (MCS 1-9) + Incremental Redundancy"
    },
    {
      id: 13,
      category: 'midterm-gsm',
      categoryName: 'Lesson 3: GSM',
      isMidterm: true,
      midtermFocus: true,
      front: "What are the 4 main subsystems of the complete GSM Network Architecture?",
      back: "1. <strong>Mobile Station Subsystem (MS):</strong> Mobile Equipment (handset IMEI) + SIM card.<br>2. <strong>Base Station Subsystem (BSS):</strong> Radio interface (BTS towers + BSC controllers).<br>3. <strong>Network & Switching Subsystem (NSS):</strong> The core brain (MSC, GMSC, HLR, VLR, AuC, EIR).<br>4. <strong>Operation Support Subsystem (OSS):</strong> Centralized network maintenance, alarms, and configuration (OMC).",
      mnemonic: "M.B.N.O. = MS, BSS, NSS, OSS"
    },
    {
      id: 14,
      category: 'midterm-gsm',
      categoryName: 'Lesson 3: GSM',
      isMidterm: true,
      midtermFocus: true,
      front: "Differentiate BTS vs. BSC in the Base Station Subsystem (BSS).",
      back: "• <strong>Base Transceiver Station (BTS):</strong> The physical cell tower hardware containing radio transceivers and antennas. Handles radio signal transmission, modulation, and RF-to-digital conversion.<br><br>• <strong>Base Station Controller (BSC):</strong> The intelligence of the radio network. Manages multiple BTS towers, allocates radio frequency channels, controls transmitter power levels, and handles handoffs between cells under its control.",
      mnemonic: "BTS = Tower Hardware | BSC = Radio Traffic Controller"
    },
    {
      id: 15,
      category: 'midterm-gsm',
      categoryName: 'Lesson 3: GSM',
      isMidterm: true,
      midtermFocus: true,
      front: "What are the 6 core components under the Network and Switching Subsystem (NSS)?",
      back: "1. <strong>MSC (Mobile Switching Center):</strong> Central telephone switching, routing, and billing.<br>2. <strong>GMSC (Gateway MSC):</strong> Gateway bridging GSM to external PSTN/ISDN/Internet.<br>3. <strong>HLR (Home Location Register):</strong> Central master database of all permanent subscriber profiles.<br>4. <strong>VLR (Visitor Location Register):</strong> Temporary dynamic database for subscribers currently roaming in that MSC area.<br>5. <strong>AuC (Authentication Center):</strong> Security vault storing secret key Ki and generating triplets.<br>6. <strong>EIR (Equipment Identity Register):</strong> Database tracking physical handsets via IMEI.",
      mnemonic: "M.G.H.V.A.E. = MSC, GMSC, HLR, VLR, AuC, EIR"
    },
    {
      id: 16,
      category: 'midterm-gsm',
      categoryName: 'Lesson 3: GSM',
      isMidterm: true,
      midtermFocus: true,
      front: "Compare the Home Location Register (HLR) vs. Visitor Location Register (VLR).",
      back: "• <strong>HLR:</strong> Central, permanent database belonging to the home carrier. Stores IMSI, MSISDN, subscribed features, and the pointer to the subscriber's current VLR address.<br><br>• <strong>VLR:</strong> Local, temporary database linked to an MSC. Caches subscriber data while the user is actively roaming in its service area to avoid repeated queries to distant HLRs, and assigns temporary identities (TMSI, MSRN).",
      mnemonic: "HLR = Permanent Master Profile | VLR = Temporary Roaming Cache"
    },
    {
      id: 17,
      category: 'midterm-gsm',
      categoryName: 'Lesson 3: GSM',
      isMidterm: true,
      midtermFocus: true,
      front: "What is the function of the Authentication Center (AuC) in GSM?",
      back: "The <strong>AuC</strong> is a protected security database linked to the HLR. It holds each subscriber's secret symmetric authentication key (<strong>Ki</strong>) and executes the A3/A8 cryptographic algorithms to produce <strong>Authentication Triplets</strong>:<br>1. <strong>RAND:</strong> Random 128-bit challenge.<br>2. <strong>SRES:</strong> Signed Response (verifies SIM legitimacy).<br>3. <strong>Kc:</strong> 64-bit Cipher Key (encrypts voice traffic via A5).",
      mnemonic: "AuC generates Triplets (RAND, SRES, Kc) with Secret Key Ki"
    },
    {
      id: 18,
      category: 'midterm-gsm',
      categoryName: 'Lesson 3: GSM',
      isMidterm: true,
      midtermFocus: true,
      front: "What is the Equipment Identity Register (EIR) and its 3 lists?",
      back: "The <strong>EIR</strong> tracks the physical hardware of handsets using their 15-digit <strong>IMEI</strong> across 3 categories:<br>• <strong>White List:</strong> Approved, valid handsets permitted full network access.<br>• <strong>Gray List:</strong> Handsets under observation for technical glitches or suspected tampering.<br>• <strong>Black List:</strong> Stolen, counterfeit, or banned handsets barred completely from connecting to any network.",
      mnemonic: "EIR = Hardware Police (White=Allowed, Gray=Watched, Black=Blocked)"
    },
    {
      id: 19,
      category: 'midterm-gsm',
      categoryName: 'Lesson 3: GSM',
      isMidterm: true,
      midtermFocus: true,
      front: "What is the Subscriber Identity Module (SIM) and what key data does it store?",
      back: "The <strong>SIM</strong> is a tamper-resistant smart card microcontroller that decouples the subscriber's personal subscription from the physical handset hardware.<br><br><strong>Stores:</strong><br>1. <strong>IMSI:</strong> International Mobile Subscriber Identity (unique network ID).<br>2. <strong>Ki:</strong> 128-bit shared secret authentication key (never leaves SIM).<br>3. <strong>A3/A8 Algorithms:</strong> Authentication and cipher key generation logic.<br>4. <strong>PIN / PUK:</strong> User access protection codes.<br>5. Personal contacts and SMS storage.",
      mnemonic: "SIM Decouples Person from Phone (stores IMSI + Ki + A3/A8)"
    },
    {
      id: 20,
      category: 'midterm-gsm',
      categoryName: 'Lesson 3: GSM',
      isMidterm: true,
      midtermFocus: true,
      front: "Differentiate IMEI vs. IMSI vs. MSISDN.",
      back: "• <strong>IMEI (Int'l Mobile Equipment Identity):</strong> 15-digit unique serial number burned into the <em>physical phone handset hardware</em> (tracked by EIR).<br>• <strong>IMSI (Int'l Mobile Subscriber Identity):</strong> Unique 15-digit identifier identifying the <em>subscriber on the cellular network</em> (stored on SIM).<br>• <strong>MSISDN:</strong> The actual public dialable telephone phone number (e.g., +63 917 123 4567) mapped to the IMSI in the HLR.",
      mnemonic: "IMEI = Phone Body | IMSI = Network Identity | MSISDN = Dialable Phone #"
    },

    // --- LESSON 1: CELLULAR WIRELESS NETWORKS (CHAPTER 2 MODULE) ---
    {
      id: 21,
      category: 'midterm-cell',
      categoryName: 'Lesson 1: Cellular Networks',
      isMidterm: true,
      midtermFocus: true,
      front: "What is cellular communication and what 2 practical problems does it solve?",
      back: "A wireless method where a large geographic area is divided into smaller sections called <strong>cells</strong>, each served by its own low-power base station rather than one giant transmitter.<br><br><strong>Solves 2 Practical Problems:</strong><br>1. <strong>Limited Radio Spectrum:</strong> Frequencies can be reused in non-adjacent cells.<br>2. <strong>Massive User Capacity:</strong> Multiple low-power towers serve millions of simultaneous users without congestion.",
      mnemonic: "Cellular Solves: Limited Frequencies + Millions of Users"
    },
    {
      id: 22,
      category: 'midterm-cell',
      categoryName: 'Lesson 1: Cellular Networks',
      isMidterm: true,
      midtermFocus: true,
      front: "Why are cellular network diagrams drawn as hexagons instead of circles?",
      back: "Circles leave either <strong>uncovered dead zones (gaps)</strong> or <strong>overlapping interference areas</strong> when tiled on a map.<br><br>Regular hexagons approximate a circular coverage area while providing <strong>100% gapless surface tessellation</strong> with equal distances to all 6 adjacent cell centers and minimum boundary perimeter.",
      mnemonic: "Hexagons = 100% Gapless Tessellation with Zero Dead Zones"
    },
    {
      id: 23,
      category: 'midterm-cell',
      categoryName: 'Lesson 1: Cellular Networks',
      isMidterm: true,
      midtermFocus: true,
      front: "What is Frequency Reuse in cellular networks?",
      back: "The practice of assigning the <strong>exact same set of radio frequencies to geographically separated cells</strong> (organized in repeating cluster patterns, e.g. N=7).<br><br>As long as co-channel cells are separated by a minimum reuse distance, co-channel interference is prevented while multiplying network capacity exponentially.",
      mnemonic: "Frequency Reuse = Same Frequencies in Distant Cells"
    },
    {
      id: 24,
      category: 'midterm-cell',
      categoryName: 'Lesson 1: Cellular Networks',
      isMidterm: true,
      midtermFocus: true,
      front: "Differentiate Handoff (Handover) vs. Roaming.",
      back: "• <strong>Handoff:</strong> Automatic, seamless transfer of an ongoing call or data session from one cell base station to another as the mobile user moves, without dropping service.<br><br>• <strong>Roaming:</strong> Accessing cellular coverage and services on a visited partner carrier's network when traveling outside the geographic footprint of one's home operator.",
      mnemonic: "Handoff = Tower to Tower | Roaming = Carrier to Carrier"
    },

    // --- FOUNDATIONS & PRELIM REVIEWS ---
    {
      id: 25,
      category: 'mod1',
      categoryName: 'Module 1: Foundations',
      isMidterm: false,
      midtermFocus: false,
      front: "What are the 3 core pillars and 4 characteristics of Mobile Computing?",
      back: "<strong>3 Pillars:</strong> Mobile Hardware (portable devices), Mobile Software (constrained OS/apps), Mobile Communication (wireless networks).<br><br><strong>4 Characteristics:</strong> Portability, Connectivity, Interactivity, Individuality.",
      mnemonic: "H.S.C. (Pillars) + P.C.I.I. (Characteristics)"
    },
    {
      id: 26,
      category: 'mod2',
      categoryName: 'Module 2: Media',
      isMidterm: false,
      midtermFocus: false,
      front: "What are the 8 elements of data communication and the 3 quality pillars (DAT)?",
      back: "<strong>8 Elements:</strong> Sender, Receiver, Encoder, Decoder, Message, Medium, Protocol, Noise.<br><br><strong>3 Quality Pillars (DAT):</strong> Delivery (correct destination), Accuracy (uncorrupted), Timeliness (real-time without delay).",
      mnemonic: "DAT = Delivery, Accuracy, Timeliness"
    },
    {
      id: 27,
      category: 'mod2',
      categoryName: 'Module 2: Media',
      isMidterm: false,
      midtermFocus: false,
      front: "Differentiate Guided vs. Unguided Transmission Media.",
      back: "• <strong>Guided Media (Wired):</strong> Physical conduits like UTP, STP, Coaxial, and Fiber-Optic (transmitting light via Total Internal Reflection).<br>• <strong>Unguided Media (Wireless):</strong> Electromagnetic waves radiating across air/space like Radio Waves, Line-of-Sight Microwaves, and Infrared.",
      mnemonic: "Guided = Physical Cables | Unguided = Free Atmosphere"
    },
    {
      id: 28,
      category: 'mod2',
      categoryName: 'Module 2: Media',
      isMidterm: false,
      midtermFocus: false,
      front: "What is Rain Fade and how does it affect wireless transmission?",
      back: "A phenomenon where high-frequency radio and microwave wavelengths are comparable in size to raindrops. Rainfall absorbs and scatters electromagnetic signals, causing severe attenuation and degradation of signal-to-noise ratio.",
      mnemonic: "Rain Fade = Rain scatters microwave beams"
    }
  ],

  quizQuestions: [
    {
      id: 1,
      category: "Cellular Networks (L1.1)",
      isMidterm: true,
      question: "Why do cellular communications systems divide large geographic service areas into smaller cells instead of using one high-power transmitter?",
      options: [
        "To solve limited radio frequency availability and allow the same frequencies to be reused to serve millions of simultaneous users",
        "Because high-power transmitters are legally restricted to transmitting analog voice signals only",
        "Because radio frequency signals cannot travel farther than 200 meters through Earth's atmosphere",
        "To force mobile handsets to consume more battery power when connecting to local base stations"
],
      correct: 0,
      explanation: "Cellular communication divides coverage into cells to overcome frequency scarcity. Rather than using one high-power transmitter that can only support a few dozen simultaneous conversations, low-power base stations manage small geographic cells. This enables frequency reuse across distant cells, multiplying network capacity.",
      hint: "Think about the two core practical problems cellular communication solved: limited radio spectrum availability and the demand to serve massive user densities simultaneously."
    },
    {
      id: 2,
      category: "Cellular Networks (L1.1)",
      isMidterm: true,
      question: "Why is a hexagonal cell geometry utilized in cellular network planning diagrams rather than circles or squares?",
      options: [
        "Hexagons reflect the actual physical shape of radio wave emissions in outdoor terrain",
        "Hexagons approximate a circular coverage radius while allowing gapless 100% surface tessellation with zero overlaps or dead zones",
        "Hexagonal cell towers are 50% cheaper to construct than triangular or square antennas",
        "Hexagons prevent microwave signals from penetrating residential buildings"
],
      correct: 1,
      explanation: "In planning diagrams, the hexagonal shape is used because it approximates a circular radiation area while allowing cells to be packed tightly together without leaving unserved gaps (dead zones) or creating unwanted overlapping coverage. In real life, cells are irregular due to terrain, structures, and foliage.",
      hint: "Consider the geometric challenge: a circle represents ideal antenna radiation, but packing circles leaves gaps. Which polygon closest to a circle tiles a surface completely?"
    },
    {
      id: 3,
      category: "Cellular Networks (L1.1)",
      isMidterm: true,
      question: "What are the four basic foundational elements that work together in a cellular communications system?",
      options: [
        "Transmitter, Receiver, Optical Fiber, and Microwave Dish",
        "Mobile Station (MS), Base Station (BS), Cell, and Handoff (Handover)",
        "Satellite, Landline, Data Center, and Router",
        "Ethernet Cable, Modulator, Demodulator, and Battery"
],
      correct: 1,
      explanation: "Lesson 1.1 explicitly defines the four basic elements of a cellular system: 1. Mobile station (end-user device), 2. Base station (fixed transceiver on tower/rooftop), 3. Cell (geographic area served by a base station), and 4. Handoff/Handover (process transferring active connections between cells).",
      hint: "Recall the end-user device, the tower transceiver, the geographic area covered, and the transition mechanism that preserves active calls as you travel."
    },
    {
      id: 4,
      category: "Cellular Networks (L1.2)",
      isMidterm: true,
      question: "In the cellular network architecture, what is the primary role of the Base Station Controller (BSC)?",
      options: [
        "It functions as the physical handset carrying the subscriber identity module",
        "It manages and coordinates multiple Base Transceiver Stations (BTS), handling radio channel allocation and handoffs between cells",
        "It acts as the international gateway connecting cellular phone calls to overseas submarine cables",
        "It provides electrical battery backup to cell towers during power outages"
],
      correct: 1,
      explanation: "The Base Station Controller (BSC) is the management brain of the radio subsystem. It controls and coordinates multiple Base Transceiver Stations (BTS), allocating frequency channels, adjusting RF power levels, and orchestrating handoffs as mobile stations cross cell boundaries.",
      hint: "Differentiate between the physical antenna tower (BTS) and the regional coordinator that supervises multiple towers and allocates frequencies."
    },
    {
      id: 5,
      category: "Cellular Networks (L1.2)",
      isMidterm: true,
      question: "In cellular frequency reuse planning (such as the repeating 7-cell cluster pattern A\u2013G), how is co-channel interference avoided?",
      options: [
        "Cells within the same cluster use identical frequencies, while neighboring clusters use different ones",
        "Each cell within a repeating cluster is assigned a different frequency set, and identical frequency sets are separated by sufficient geographic distance",
        "All cell towers transmit on the same single frequency but use different colored LED beacons",
        "Base stations shut down transmission whenever a neighboring tower is active"
],
      correct: 1,
      explanation: "In frequency reuse, cells are organized into repeating clusters (e.g. N=7 labeled A through G). Each cell within a cluster is allocated a unique frequency band. The entire cluster pattern is repeated across the metropolitan area, ensuring cells using identical frequencies are separated by safe physical distances to prevent co-channel interference.",
      hint: "Think of cluster repetition: no two adjacent cells in a cluster share frequencies, and identical frequency groups are placed far enough apart to prevent signal collisions."
    },
    {
      id: 6,
      category: "Cellular Networks (L1.2)",
      isMidterm: true,
      question: "What is the key technical distinction between 'Handoff' and 'Roaming'?",
      options: [
        "Handoff is between different countries; Roaming occurs between adjacent city streets",
        "Handoff seamlessly transfers an active call between adjacent base stations within the same operator's network; Roaming allows a device to obtain service on a partner operator's network outside home coverage",
        "Handoff requires restarting the mobile phone; Roaming is an automatic hardware upgrade",
        "Handoff applies only to text messages; Roaming applies only to emergency 911 calls"
],
      correct: 1,
      explanation: "Handoff (handover) is the automatic process of transferring an active call or data session between cell towers within a single carrier's network without dropouts. Roaming refers to obtaining cellular service when traveling outside the home operator's coverage area by utilizing a partner carrier's network.",
      hint: "One maintains an ongoing call across towers of the same carrier; the other connects your device to a visited partner network when traveling outside home coverage."
    },
    {
      id: 7,
      category: "Cellular Generations (L1.3)",
      isMidterm: true,
      question: "Which cellular generation marked the shift from analog signals to digital transmission, introduced SMS text messaging, and laid the foundation with GSM?",
      options: [
        "First Generation (1G)",
        "Second Generation (2G)",
        "Third Generation (3G)",
        "Fourth Generation (4G)"
],
      correct: 1,
      explanation: "The Second Generation (2G), introduced in the early 1990s, replaced analog radio (1G) with digital transmission. It significantly improved voice quality and capacity, introduced SMS text messaging, and established GSM as the dominant worldwide standard.",
      hint: "Think of the generation introduced in the early 1990s that brought digital clarity, security, and Short Message Service (SMS)."
    },
    {
      id: 8,
      category: "Cellular Generations (L1.3)",
      isMidterm: true,
      question: "How did Fourth Generation (4G LTE) cellular technology fundamentally differ from previous generations in its core data transmission approach?",
      options: [
        "It returned to analog FM radio waves to save battery life",
        "It was built specifically around an all-IP (Internet Protocol) packet-switched network, completely replacing legacy circuit-switched voice methods",
        "It eliminated all cell towers and relied exclusively on low-earth orbit satellites",
        "It restricted mobile devices to sending maximum 160-character messages"
],
      correct: 1,
      explanation: "4G LTE (introduced ~2009) was built specifically around an all-IP packet-switched architecture, eliminating the legacy circuit-switched methods used for voice in earlier generations. All traffic\u2014including voice via VoLTE\u2014is transmitted as high-speed IP packets.",
      hint: "Recall which cellular generation abandoned legacy telephone circuit-switching and adopted unified packet-switched Internet Protocol (IP) for everything."
    },
    {
      id: 9,
      category: "Cellular Technologies (L1.4)",
      isMidterm: true,
      question: "What is the primary motivation for 'Network Densification' through the deployment of small cells in modern cellular systems?",
      options: [
        "To replace all fiber-optic backbone cables with copper telephone wire",
        "To add numerous smaller, lower-power base stations in high-demand zones (stadiums, downtown centers) to multiply local capacity where macro towers become congested",
        "To force smartphones to switch to Wi-Fi 2.4 GHz only",
        "To eliminate the need for SIM cards in mobile phones"
],
      correct: 1,
      explanation: "Network densification deploys smaller, lower-power base stations (small cells) alongside traditional macro towers in high-density locations like shopping districts, city centers, and sports arenas. This increases localized capacity and handles immense user traffic within the same physical space.",
      hint: "Think of crowded venues: when large cell towers are swamped with traffic, how do operators pack extra capacity into small physical areas?"
    },
    {
      id: 10,
      category: "Cellular Technologies (L1.4)",
      isMidterm: true,
      question: "Which 5G Network Slice is designed for mission-critical applications like autonomous vehicles, remote surgery, and industrial robotics requiring sub-1ms latency and 99.999% reliability?",
      options: [
        "Extreme/Enhanced Mobile Broadband (eMBB)",
        "Massive Machine-Type Communication (mMTC)",
        "Ultra-Reliable Low-Latency Communication (URLLC)",
        "Voice over Internet Protocol (VoIP)"
],
      correct: 2,
      explanation: "Ultra-Reliable Low-Latency Communication (URLLC) is the 5G network slice specifically engineered for mission-critical use cases requiring sub-millisecond delay and 99.999% uptime, such as telesurgery, vehicle-to-everything (V2X) autonomous driving, and industrial automation.",
      hint: "Look for the slice whose title highlights extreme dependability and almost instantaneous network response times."
    },
    {
      id: 11,
      category: "Mobile IP (L2.1)",
      isMidterm: true,
      question: "How does packet switching in IP networks provide superior efficiency and resilience compared to legacy circuit switching?",
      options: [
        "By dedicating a continuous physical wire between callers for the entire duration of a session",
        "By breaking messages into small independent packets that travel over shared store-and-forward routes, allowing dynamic rerouting around failed links",
        "By broadcasting every message simultaneously to every device connected to the internet",
        "By converting all digital characters into Morse code before transmission"
],
      correct: 1,
      explanation: "Packet switching breaks data into discrete units (packets) that travel independently across store-and-forward routers. This allows shared, efficient use of network infrastructure and makes the network resilient: if a link fails, packets are dynamically rerouted along alternate paths.",
      hint: "Consider how packets navigate a shared network: independent chunks, dynamic routing, and surviving broken links through alternate paths."
    },
    {
      id: 12,
      category: "Mobile IP (L2.2)",
      isMidterm: true,
      question: "Why does host mobility fundamentally break standard IP routing in traditional internet architectures?",
      options: [
        "Traditional IP addresses use Roman numerals that cannot be transmitted over radio waves",
        "An IP address serves a dual conflicting role: endpoint identifier for TCP sockets and topological routing locator for network subnets",
        "Mobile phones do not possess network interface cards (NICs) with physical MAC addresses",
        "Routers automatically block any device moving faster than 10 km/h"
],
      correct: 1,
      explanation: "The 'Mobility Dilemma': An IP address conflates an endpoint identifier (identifying TCP socket connections) with a topological routing locator (specifying the physical subnet attachment). Changing IP disconnects active TCP sessions; keeping the home IP prevents foreign routers from delivering packets.",
      hint: "Consider the dual identity of an IP address: socket identifier (TCP 4-tuple) vs. subnet physical location."
    },
    {
      id: 13,
      category: "Mobile IP (L2.2)",
      isMidterm: true,
      question: "In mobile-aware IP addressing, what is the specific role of the Care-of Address (CoA)?",
      options: [
        "It is the permanent address assigned to the subscriber at birth by the government",
        "It is a temporary address associated with the foreign network that identifies the mobile device's current location while away from home",
        "It is the MAC address burned into the mobile phone's Wi-Fi chip",
        "It is the serial number of the cell tower battery"
],
      correct: 1,
      explanation: "The Care-of Address (CoA) is a temporary local IP address obtained by a mobile device whenever it connects to a foreign network away from home. It represents the mobile node's current topological point of network attachment, allowing tunneled packets to reach it.",
      hint: "Think of a temporary forwarding address you leave when staying at a hotel away from your permanent home."
    },
    {
      id: 14,
      category: "TCP/IP Protocol (L2.3)",
      isMidterm: true,
      question: "In the 4-layer TCP/IP model, which layer is responsible for end-to-end data chunking, sequencing, acknowledgments, and retransmissions?",
      options: [
        "Application Layer",
        "Transport Layer",
        "Internet Layer",
        "Network Access (Link) Layer"
],
      correct: 1,
      explanation: "The Transport Layer (hosting TCP and UDP) manages end-to-end communication between applications. It handles segment chunking, sequencing, acknowledgments (ACKs), and necessary packet retransmissions to ensure dependable data delivery.",
      hint: "Which layer hosts TCP and UDP and manages reliability, handshakes, and port multiplexing?"
    },
    {
      id: 15,
      category: "TCP/IP Protocol (L2.3)",
      isMidterm: true,
      question: "According to the TCP vs. UDP comparison matrix in the module, which transport layer protocol should be chosen for real-time mobile video calling (VoIP/Zoom), and why?",
      options: [
        "TCP, because its variable 20\u201360 byte header provides mandatory military-grade encryption",
        "UDP, because its connectionless nature, fixed 8-byte header, and lack of retransmissions prioritize low latency over dropped packets",
        "TCP, because it forces the caller to wait until all dropped audio frames are successfully retransmitted",
        "UDP, because it requires a 3-way handshake prior to sending every single pixel"
],
      correct: 1,
      explanation: "UDP is connectionless and does not retransmit lost packets. In real-time video/voice communications, late packets are useless; waiting for TCP retransmissions creates unacceptable buffering lag. UDP's lightweight 8-byte header ensures minimal delay and immediate streaming.",
      hint: "In live voice/video, timeliness trumps 100% perfection. Which protocol has an 8-byte header and avoids buffering delays by not retransmitting?"
    },
    {
      id: 16,
      category: "TCP/IP Protocol (L2.3)",
      isMidterm: true,
      question: "Why does standard TCP congestion control suffer severe throughput collapse across mobile wireless environments?",
      options: [
        "TCP assumes all packet loss is caused by network router buffer congestion and throttles its window, whereas wireless losses are mostly temporary signal fades and handoffs",
        "Mobile antennas cannot compute the 16-bit TCP checksum",
        "Cellular base stations block all TCP SYN packets by default",
        "TCP packets exceed the physical length of radio waves"
],
      correct: 0,
      explanation: "The 'Congestion Fallacy': Standard TCP was designed for wired networks where packet loss almost always means router buffer congestion. On wireless mobile links, losses are usually caused by RF fading, interference, or cell handoffs. Throttling TCP's window under these conditions degrades bandwidth unnecessarily.",
      hint: "Recall why TCP's wired assumption fails: it presumes lost packets mean full router queues, mistakenly cutting speed when the drop was just radio static."
    },
    {
      id: 17,
      category: "Mobile IP (L2.4)",
      isMidterm: true,
      question: "In Mobile IP (RFC 3344), what mechanism allows the Home Agent (HA) to intercept packets sent to an absent Mobile Node's permanent address?",
      options: [
        "The HA physically unplugs the mobile node's Ethernet cable from the wall",
        "The HA issues Proxy ARP replies on the home network, claiming the Mobile Node's IP maps to the HA's own hardware MAC address",
        "The HA requests the Correspondent Node to change its own IP address",
        "The HA reboots the home network router every 10 seconds"
],
      correct: 1,
      explanation: "When the Mobile Node is away, the Home Agent activates Proxy ARP. When home routers ask 'Who has MN's IP?', the HA responds with its own hardware MAC address, allowing it to intercept all incoming packets and encapsulate them in tunnels to the foreign network.",
      hint: "Think of the Layer 2 Address Resolution Protocol: how can the Home Agent trick local routers into delivering the mobile node's mail to itself?"
    },
    {
      id: 18,
      category: "Mobile IP (L2.4)",
      isMidterm: true,
      question: "Why is 'Reverse Tunneling' (RFC 3024) necessary when a Mobile Node transmits packets back to a Correspondent Node?",
      options: [
        "Because radio waves cannot travel in reverse without physical glass mirrors",
        "Because foreign border routers enforce Ingress Filtering, discarding outgoing packets whose source IP does not match the foreign subnet prefix",
        "To increase the download speed of the mobile device by 500%",
        "To prevent the Correspondent Node from discovering the user's phone number"
],
      correct: 1,
      explanation: "When an MN transmits directly with Source IP = Home Address, foreign border firewalls running Ingress Filtering (anti-spoofing security) drop the packets because the source IP doesn't match the foreign subnet. Reverse Tunneling tunnels them back to the Home Agent to bypass this filter.",
      hint: "Consider security at foreign network borders: routers discard packets whose source IP does not match their local address range (anti-spoofing)."
    },
    {
      id: 19,
      category: "Mobile IP (L2.4)",
      isMidterm: true,
      question: "Which major network entity from Mobile IPv4 was completely eliminated in Mobile IPv6?",
      options: [
        "Home Agent (HA)",
        "Mobile Node (MN)",
        "Foreign Agent (FA)",
        "Correspondent Node (CN)"
],
      correct: 2,
      explanation: "Mobile IPv6 completely eliminated the Foreign Agent (FA)! Thanks to Stateless Address Autoconfiguration (SLAAC) and the vast 128-bit address space, any IPv6 mobile node can dynamically configure its own Care-of Address on any foreign network without an FA router.",
      hint: "In IPv6, mobile devices configure their own Care-of Addresses automatically via SLAAC, making which visiting router entity obsolete?"
    },
    {
      id: 20,
      category: "Mobile IP (L2.4)",
      isMidterm: true,
      question: "Why is Network Address Translation (NAT) absent and completely unnecessary in IPv6 networks?",
      options: [
        "IPv6 routers do not support port numbers",
        "IPv6 provides an immense 128-bit address space (3.4 x 10^38 IPs), restoring the End-to-End Principle with unique public addresses for every device",
        "The United Nations legally banned NAT in the year 2020",
        "IPv6 packets cannot be transmitted across fiber-optic cables"
],
      correct: 1,
      explanation: "NAT was an emergency stopgap created in IPv4 to delay IPv4 address exhaustion. Because IPv6 provides 2^128 (approximately 3.4 x 10^38) unique addresses, every device in the universe can have a globally unique public IP, eliminating the need for NAT and restoring end-to-end communication.",
      hint: "Focus on the enormous 128-bit address space: with septillions of addresses per person, private IP translation is no longer needed."
    },
    {
      id: 21,
      category: "GSM Architecture (L3.1)",
      isMidterm: true,
      question: "What made the commercial deployment of GSM in the early 1990s a pivotal milestone in cellular telecommunications?",
      options: [
        "It introduced touchscreens and web browsers to mobile phones",
        "It established a standardized digital cellular system that enabled international roaming and introduced the removable SIM card",
        "It eliminated all telephone wires and replaced them with copper cables",
        "It required users to purchase a new phone number every month"
],
      correct: 1,
      explanation: "GSM (2G) replaced incompatible analog systems with a unified digital cellular standard. Its key historical innovations included digital voice transmission, subscriber identity separation via the SIM card, standardized international roaming across operators/countries, and SMS text messaging.",
      hint: "Think of the transition from 1G analog to 2G digital: standardized roaming across European borders and the introduction of the SIM card."
    },
    {
      id: 22,
      category: "GSM Evolution (L3.1)",
      isMidterm: true,
      question: "What primary modulation upgrade allowed EDGE (2.75G) to triple the data throughput of GPRS across the same 200 kHz channel?",
      options: [
        "Switching from Gaussian Minimum Shift Keying (GMSK, 1 bit/symbol) to 8-Phase Shift Keying (8-PSK, 3 bits/symbol)",
        "Replacing radio transmission with infrared lasers",
        "Upgrading the cell tower processors from 16-bit to 64-bit",
        "Eliminating the Base Station Controller completely"
],
      correct: 0,
      explanation: "GPRS uses GMSK modulation, which transmits 1 bit per radio symbol. EDGE introduced 8-PSK (8-Phase Shift Keying), where each symbol carries 3 bits (2^3 = 8). This modulation upgrade mathematically tripled maximum throughput to 384 kbps over the exact same 200 kHz channel.",
      hint: "Compare 1 bit per symbol in GMSK with phase modulation carrying 3 bits per symbol (2^3 = 8) to reach 384 kbps."
    },
    {
      id: 23,
      category: "GSM Architecture (L3.2)",
      isMidterm: true,
      question: "In the GSM Base Station Subsystem (BSS), which physical component houses the transceivers (TRX) that communicate directly with mobile stations over the radio air interface?",
      options: [
        "Base Transceiver Station (BTS)",
        "Home Location Register (HLR)",
        "Equipment Identity Register (EIR)",
        "Operation Support Subsystem (OSS)"
],
      correct: 0,
      explanation: "The Base Transceiver Station (BTS) is the physical cell tower equipment containing antennas and transceivers (TRX) that handles direct radio frequency (wireless) communication with mobile stations within a single cell.",
      hint: "Identify the physical tower station that houses the radio transceivers and antennas in the cell."
    },
    {
      id: 24,
      category: "GSM Architecture (L3.2)",
      isMidterm: true,
      question: "In the GSM network architecture diagram, what is the standardized interface connecting the BTS to the BSC?",
      options: [
        "The Radio Air Interface",
        "The Abis Interface",
        "The A Interface",
        "The USB Interface"
],
      correct: 1,
      explanation: "In GSM architecture: The MS connects to the BTS via the Radio Air Interface; the BTS connects to the BSC via the Abis Interface; and the BSC connects to the MSC via the A Interface.",
      hint: "Remember the three primary interfaces: Air (MS to BTS), Abis (BTS to BSC), and A (BSC to MSC)."
    },
    {
      id: 25,
      category: "GSM NSS Subsystem (L3.2)",
      isMidterm: true,
      question: "What is the core functional difference between the Home Location Register (HLR) and the Visitor Location Register (VLR)?",
      options: [
        "HLR is inside the phone handset; VLR is mounted on the cell tower",
        "HLR is the permanent master subscriber database; VLR is a temporary local database caching subscriber profiles currently active in an MSC's territory",
        "HLR stores text messages; VLR stores voice voicemails",
        "HLR handles billing for prepaid users; VLR handles postpaid users"
],
      correct: 1,
      explanation: "The Home Location Register (HLR) is the central permanent database holding master subscriber records, assigned plans, and current VLR location pointers. The Visitor Location Register (VLR) temporarily caches subscriber records while they are active in an MSC's service area to avoid constant remote HLR queries.",
      hint: "One is the permanent central home register; the other is a localized, temporary caching register for currently visiting handsets."
    },
    {
      id: 26,
      category: "GSM NSS Subsystem (L3.2)",
      isMidterm: true,
      question: "Which database in the GSM Network and Switching Subsystem (NSS) stores the secret symmetric key (Ki) and generates authentication triplets (RAND, SRES, Kc)?",
      options: [
        "Authentication Center (AuC)",
        "Equipment Identity Register (EIR)",
        "Base Station Controller (BSC)",
        "Visitor Location Register (VLR)"
],
      correct: 0,
      explanation: "The Authentication Center (AuC) is the security vault in the NSS. It stores the subscriber's secret 128-bit key (Ki) and executes cryptographic algorithms to produce authentication triplets (RAND, SRES, and cipher key Kc) to authenticate SIM cards and encrypt voice calls.",
      hint: "Look for the security vault that works with the HLR to authenticate mobile subscribers connecting to the cellular network."
    },
    {
      id: 27,
      category: "GSM NSS Subsystem (L3.2)",
      isMidterm: true,
      question: "What is the role of the Equipment Identity Register (EIR) 'Black List'?",
      options: [
        "To list subscribers with delinquent unpaid phone bills",
        "To store hardware IMEIs of stolen, counterfeit, or unauthorized handsets that are strictly banned from accessing the cellular network",
        "To log telephone numbers that call after midnight",
        "To identify cell towers scheduled for demolition"
],
      correct: 1,
      explanation: "The EIR maintains hardware equipment records categorized into White (authorized), Gray (monitored), and Black lists. Handsets whose 15-digit IMEI appears on the Black List (reported stolen, barred, or non-certified) are strictly blocked from connecting to the network.",
      hint: "Remember the 3 EIR lists: the Black List tracks physical hardware serial numbers (IMEI) reported stolen or banned from making calls."
    },
    {
      id: 28,
      category: "GSM SIM & MS (L3.3)",
      isMidterm: true,
      question: "Why is the separation of Mobile Equipment (ME) and the Subscriber Identity Module (SIM) considered a fundamental innovation of GSM?",
      options: [
        "It doubles the battery life of the phone by offloading compute to the SIM card",
        "It decouples the user's subscriber identity and security credentials from the physical device, allowing seamless handset upgrades and international roaming",
        "It forces users to buy a new phone every time they change cellular operators",
        "It allows the SIM card to function as an independent FM radio antenna"
],
      correct: 1,
      explanation: "In 1G networks, identity was locked to the phone hardware. GSM's separation of the Mobile Equipment (hardware) from the SIM card allowed subscribers to move their SIM card\u2014containing their unique IMSI, security credentials, and phonebook\u2014into any compatible handset while preserving their identity and account.",
      hint: "Think of moving your SIM card into a friend's phone: why is decoupling subscriber identity from the physical handset so powerful?"
    },
    {
      id: 29,
      category: "GSM Call & SMS (L3.4)",
      isMidterm: true,
      question: "Why are SMS text messages limited to 160 characters in GSM, and why do they not interrupt ongoing phone calls?",
      options: [
        "Because early microprocessors could only display 160 letters on LCD screens",
        "Because SMS messages are transmitted over out-of-band signaling channels (using spare capacity) rather than dedicated voice traffic channels",
        "Because international law restricts mobile text messages to 160 words",
        "Because text messages must fit inside the handset's SIM card RAM cache"
],
      correct: 1,
      explanation: "SMS text messages (up to 160 characters using 7-bit encoding) were designed to fit within the spare capacity of GSM signaling channels (like SDCCH and SACCH). Because they travel over signaling channels rather than traffic channels, they do not tie up or interrupt voice calls.",
      hint: "Consider network efficiency: SMS uses small amounts of otherwise unused capacity in the network's signaling system rather than voice channels."
    },
    {
      id: 30,
      category: "GSM Call & SMS (L3.4)",
      isMidterm: true,
      question: "When a call is placed to a roaming mobile subscriber, what temporary number does the destination VLR allocate to route the voice call across the transit switching backbone?",
      options: [
        "Mobile Station Roaming Number (MSRN)",
        "Personal Unblocking Key (PUK)",
        "International Mobile Equipment Identity (IMEI)",
        "Uniform Resource Locator (URL)"
],
      correct: 0,
      explanation: "When an incoming call arrives for a subscriber, the destination VLR assigns a temporary, geographically routable Mobile Station Roaming Number (MSRN). The HLR returns this MSRN to the calling MSC so the voice circuit can be routed across transit switches to the destination MSC.",
      hint: "A temporary, geographically routable telephone number assigned by the visited VLR so the switching network can route the incoming call."
    }
  ],

  guideQuestions: [
    // --- 10 OFFICIAL MIDTERM GUIDE QUESTIONS (ITEMS 1 TO 10) ---
    {
      num: 1,
      isMidterm: true,
      midtermPointer: "Lesson 2: Mobile Internet Protocols",
      question: "Why does mobility complicate IP addressing?",
      directAnswer: "Physical mobility complicates traditional IP addressing because an IP address serves two conflicting roles: an Endpoint Identifier (identifying transport-layer TCP sockets) and a Topological Routing Locator (identifying which physical subnet the device is connected to).",
      details: [
        "<strong>The Dual Role Dilemma:</strong> In the original internet design, a node's IP address both defines <em>who</em> the machine is (identity) and <em>where</em> it is located in the network topology (location).",
        "<strong>If a mobile node keeps its original IP:</strong> When it moves to a foreign network, standard routers forward packets toward its home subnet prefix. Foreign routers have no routing entries to deliver packets to a visitor with a foreign prefix (topologically incorrect routing).",
        "<strong>If a mobile node changes its IP:</strong> When it acquires a local foreign IP, existing TCP sockets (identified by the 4-tuple: source IP, source port, destination IP, destination port) are severed and reset. Active downloads, video calls, and SSH sessions immediately drop.",
        "<strong>The Mobile IP Solution (RFC 3344):</strong> Decouples these roles by giving the mobile node two addresses: a permanent <em>Home Address</em> (endpoint identifier) and a dynamic <em>Care-of Address</em> (topological routing locator)."
      ],
      examTip: "Structure your exam answer around the 'Dual Role Conflict: Endpoint Identifier vs. Topological Routing Locator', explaining what fails if you keep the IP vs if you change the IP."
    },
    {
      num: 2,
      isMidterm: true,
      midtermPointer: "Lesson 2: Mobile Internet Protocols",
      question: "Differentiate TCP and UDP. What are the common use cases of each?",
      directAnswer: "TCP is a connection-oriented, reliable protocol that guarantees in-order, error-free packet delivery through handshakes and retransmissions. UDP is a connectionless, lightweight, best-effort protocol that prioritizes speed and low latency without delivery guarantees.",
      details: [
        "<strong>Connection Establishment:</strong> TCP requires a 3-way handshake (SYN ➔ SYN-ACK ➔ ACK) before transmitting; UDP has zero handshake and transmits immediately.",
        "<strong>Reliability & Retransmissions:</strong> TCP tracks sequence numbers, acknowledges received packets, and retransmits lost segments. UDP provides no acknowledgments or retransmissions.",
        "<strong>Flow & Congestion Control:</strong> TCP implements sliding window flow control and congestion avoidance algorithms (Slow Start, AIMD). UDP has no flow/congestion control, transmitting at application line rate.",
        "<strong>Header Overhead:</strong> TCP header is 20–60 bytes; UDP header is fixed at only 8 bytes.",
        "<strong>TCP Common Use Cases:</strong> Web browsing (HTTP/HTTPS), file transfers (FTP/SFTP), email (SMTP/IMAP), remote shell (SSH), where zero packet loss is mandatory.",
        "<strong>UDP Common Use Cases:</strong> Real-time video conferencing (Zoom, Teams), VoIP calling, multiplayer online gaming, live video streaming, DNS lookups, where low latency beats retransmission delays."
      ],
      examTip: "Present this as a 5-point comparison table (Connection, Reliability, Flow Control, Header Overhead, Speed) followed by contrasting Web/Email (TCP) with VoIP/Streaming (UDP)."
    },
    {
      num: 3,
      isMidterm: true,
      midtermPointer: "Lesson 2: Mobile Internet Protocols",
      question: "Review the processes involved in Mobile IP.",
      directAnswer: "Mobile IP (RFC 3344) enables a Mobile Node (MN) to transparently maintain its permanent Home Address while roaming across foreign networks through three sequential processes: Agent Discovery, Registration, and Tunneling/Encapsulation.",
      details: [
        "<strong>1. Agent Discovery:</strong> Home Agents (HA) and Foreign Agents (FA) periodically broadcast ICMP Agent Advertisements. The MN listens to determine if it is on its home network or a foreign network. The MN can also solicit advertisements using ICMP Agent Solicitation.",
        "<strong>2. Registration:</strong> Upon arriving at a foreign network, the MN obtains a Care-of Address (CoA). The MN sends a Registration Request to the FA, which forwards it to the HA. The HA authenticates the request, creates a binding table entry mapping Home Address ➔ CoA, and returns a Registration Reply.",
        "<strong>3. Tunneling & Encapsulation:</strong> When a Correspondent Node (CN) sends packets to the MN's Home Address, the HA intercepts them via Proxy ARP. The HA encapsulates the original datagram inside an outer IP header destined for the CoA (IP-in-IP tunneling). The FA (or MN) decapsulates and delivers the packet.",
        "<strong>Reverse Traffic (MN ➔ CN):</strong> Packets can be sent directly to the CN (Direct Routing), but if foreign routers enforce ingress filtering, <em>Reverse Tunneling (RFC 3024)</em> is used to tunnel packets back to the HA for onward routing."
      ],
      examTip: "Draw the 3-phase chronological sequence: Agent Discovery (ICMP) ➔ Registration (Binding Request/Reply) ➔ Tunneling (Proxy ARP + IP-in-IP encapsulation)."
    },
    {
      num: 4,
      isMidterm: true,
      midtermPointer: "Lesson 2: Mobile Internet Protocols",
      question: "Why do you think IPv6 is better than IPv4?",
      directAnswer: "IPv6 is vastly superior because it solves IPv4's address exhaustion with a virtually infinite 128-bit address space, restores the end-to-end principle by eliminating NAT, integrates native mobility without Foreign Agents, and enforces mandatory security via IPsec.",
      details: [
        "<strong>1. Inexhaustible Address Space:</strong> IPv4 provides ~4.3 billion ($2^{32}$) addresses (depleted). IPv6 provides $3.4 \times 10^{38}$ ($2^{128}$) addresses—enough to assign billions of IPs to every grain of sand on Earth.",
        "<strong>2. Native Mobility Support (Mobile IPv6):</strong> MIPv6 eliminates Foreign Agents entirely, allows automatic Collocated CoA generation via SLAAC, and includes built-in Route Optimization to avoid triangular routing.",
        "<strong>3. Elimination of NAT:</strong> Eliminates Network Address Translation bottlenecks, enabling seamless peer-to-peer VoIP, video conferencing, and low-latency gaming.",
        "<strong>4. Mandatory Security (IPsec):</strong> IPsec authentication and encryption are built directly into the base IPv6 protocol specification, whereas in IPv4 it was an optional add-on.",
        "<strong>5. Simplified Fixed Header:</strong> Fixed 40-byte base header with no router-level fragmentation, accelerating packet processing across internet routers.",
        "<strong>6. Elimination of Broadcast:</strong> Replaces noisy network broadcast with targeted Multicast and Anycast, saving wireless mobile battery and bandwidth."
      ],
      examTip: "Highlight the top 4 advantages: (1) 128-bit space ($3.4 \times 10^{38}$), (2) Native mobility without FAs, (3) Elimination of NAT, and (4) Built-in IPsec security."
    },
    {
      num: 5,
      isMidterm: true,
      midtermPointer: "Lesson 2: Mobile Internet Protocols",
      question: "What has changed from IPv4 when IPv6 was introduced?",
      directAnswer: "The shift from IPv4 to IPv6 involved major architectural overhauls across address size, header structure, address resolution, autoconfiguration, packet fragmentation, and mobility protocols.",
      details: [
        "<strong>Address Size & Format:</strong> Expanded from 32 bits (dotted-decimal, e.g. 192.168.1.1) to 128 bits (hexadecimal colon notation, e.g. 2001:0db8::1).",
        "<strong>Header Structure:</strong> IPv4 has a variable-length header (20–60 bytes) with 12 fields; IPv6 uses a streamlined fixed 40-byte base header with 8 fields, moving optional parameters into chained Extension Headers.",
        "<strong>Address Resolution:</strong> Replaced IPv4 broadcast-based ARP (Address Resolution Protocol) with IPv6 Neighbor Discovery Protocol (NDP) running over multicast ICMPv6.",
        "<strong>Address Configuration:</strong> Replaced manual IP entry and stateful DHCP reliance with plug-and-play Stateless Address Autoconfiguration (SLAAC).",
        "<strong>Fragmentation:</strong> In IPv4, intermediate routers fragment oversized packets; in IPv6, routers NEVER fragment—the sending host performs Path MTU Discovery and fragments at the source.",
        "<strong>Mobility Architecture:</strong> Foreign Agents were eliminated, and direct Route Optimization between CN and MN was integrated into the core protocol."
      ],
      examTip: "Categorize the changes into 4 pillars: Addressing (32 vs 128-bit), Header (Variable vs Fixed 40-byte), Discovery (ARP vs NDP), and Mobility (FA eliminated)."
    },
    {
      num: 6,
      isMidterm: true,
      midtermPointer: "Lesson 2: Mobile Internet Protocols",
      question: "What does Network Address Translation (NAT) do in IPv4, and why was it removed in IPv6?",
      directAnswer: "In IPv4, NAT translates multiple private RFC 1918 addresses into a single public routable IP address using port multiplexing (PAT) to conserve limited IPv4 addresses. It was removed/unneeded in IPv6 because IPv6's massive 128-bit address space provides unique public addresses for every device, restoring the pure End-to-End Principle.",
      details: [
        "<strong>What NAT Does in IPv4:</strong> Acts as a boundary router altering IP packet headers. It maps outbound private IPs/ports to its public IP and a unique source port, logging the mapping in a translation table so incoming replies can be mapped back.",
        "<strong>Why NAT Was Used:</strong> A temporary survival band-aid in the 1990s to prevent the immediate collapse of the internet from IPv4 address exhaustion.",
        "<strong>Why NAT is Detrimental:</strong><br>• <em>Breaks End-to-End Principle:</em> Outside hosts cannot initiate connections directly to internal devices without complex port forwarding or STUN/TURN relays.<br>• <em>Breaks IPsec:</em> NAT alters IP headers and port numbers in transit, which invalidates cryptographic hash signatures in IPsec Authentication Headers (AH).<br>• <em>Router Bottleneck:</em> Forces routers to maintain massive session state tables and recompute packet checksums.",
        "<strong>Why Removed in IPv6:</strong> With $3.4 \times 10^{38}$ globally routable addresses, address conservation is no longer required. Every smartphone, IoT device, and computer has its own public address."
      ],
      examTip: "State clearly: 'NAT was an IPv4 band-aid that broke the End-to-End Principle and IPsec; IPv6 removes NAT because every device gets a globally routable public address.'"
    },
    {
      num: 7,
      isMidterm: true,
      midtermPointer: "Lesson 3: Global System for Mobile Communication",
      question: "What are the things that improved from GPRS to EDGE?",
      directAnswer: "EDGE (2.75G) substantially upgraded GPRS (2.5G) by introducing 8-PSK modulation, Adaptive Modulation and Coding (AMC), Incremental Redundancy (HARQ), and boosting peak theoretical speeds from 114 kbps to 384 kbps (up to 473.6 kbps) across the same 200 kHz radio spectrum.",
      details: [
        "<strong>1. Advanced Modulation (GMSK ➔ 8-PSK):</strong> GPRS used GMSK which encodes 1 bit per symbol. EDGE introduced 8-Phase Shift Keying (8-PSK) which encodes <strong>3 bits per symbol</strong> ($2^3 = 8$), tripling raw data throughput over the exact same 200 kHz channel.",
        "<strong>2. Peak Data Rates:</strong> GPRS reached theoretical peaks of ~114 kbps (real-world ~40 kbps). EDGE achieved theoretical speeds of 384 kbps (up to 473.6 kbps for 8 time slots), delivering true mobile multimedia capabilities.",
        "<strong>3. Adaptive Modulation and Coding (AMC):</strong> EDGE features 9 Modulation and Coding Schemes (MCS-1 to MCS-9). It dynamically checks channel signal quality: pristine links use MCS-9 (8-PSK, minimal error coding) for maximum throughput; noisy links downshift to MCS-1 (GMSK, heavy error protection) for robustness.",
        "<strong>4. Incremental Redundancy (IR / Type II Hybrid ARQ):</strong> In GPRS, retransmissions resent the identical packet. In EDGE, retransmissions send only extra parity error-correction bits, saving wireless bandwidth.",
        "<strong>5. Seamless Infrastructure Upgrade:</strong> Operators deployed EDGE simply by upgrading transceiver software and hardware cards at BTS towers without buying expensive new spectrum licenses."
      ],
      examTip: "Memorize the formula: 'GMSK (1 bit/sym) ➔ 8-PSK (3 bits/sym) = 3x throughput', and mention MCS-1 to MCS-9 (AMC) and 384 kbps."
    },
    {
      num: 8,
      isMidterm: true,
      midtermPointer: "Lesson 3: Global System for Mobile Communication",
      question: "Review the components of a full GSM network architecture.",
      directAnswer: "A complete GSM network architecture is partitioned into four major functional subsystems: Mobile Station Subsystem (MS), Base Station Subsystem (BSS), Network and Switching Subsystem (NSS), and Operation Support Subsystem (OSS).",
      details: [
        "<strong>1. Mobile Station Subsystem (MS):</strong><br>• <em>Mobile Equipment (ME):</em> The physical handset hardware, uniquely identified by a 15-digit IMEI.<br>• <em>Subscriber Identity Module (SIM):</em> Tamper-proof smart card holding IMSI, secret key Ki, A3/A8 algorithms, and PIN/PUK.",
        "<strong>2. Base Station Subsystem (BSS) — The Radio Access:</strong><br>• <em>Base Transceiver Station (BTS):</em> Cell tower containing radio transceivers and antennas; converts RF electromagnetic waves to digital bitstreams.<br>• <em>Base Station Controller (BSC):</em> Central radio resource controller managing multiple BTSs, channel frequency allocation, handset power levels, and intra-BSS handovers.",
        "<strong>3. Network and Switching Subsystem (NSS) — The Core Brain:</strong><br>• <em>MSC:</em> Central switching exchange for call routing and billing.<br>• <em>GMSC:</em> Gateway connecting GSM to external PSTN/ISDN/Internet.<br>• <em>HLR:</em> Permanent master database of all subscriber profiles.<br>• <em>VLR:</em> Temporary dynamic database for roaming subscribers.<br>• <em>AuC:</em> Security vault storing Ki and generating authentication triplets.<br>• <em>EIR:</em> Hardware security database tracking IMEIs (White, Gray, Black lists).",
        "<strong>4. Operation Support Subsystem (OSS):</strong><br>• <em>OMC (Operations and Maintenance Center):</em> Central administrative console monitoring network performance, traffic alarms, and configuration updates."
      ],
      examTip: "Draw the 4 subsystems in order: MS (ME + SIM) ➔ BSS (BTS + BSC) ➔ NSS (MSC, GMSC, HLR, VLR, AuC, EIR) ➔ OSS (OMC)."
    },
    {
      num: 9,
      isMidterm: true,
      midtermPointer: "Lesson 3: Global System for Mobile Communication",
      question: "Suppose you will call a friend from another place. How does a call transmit from the sender to the receiver? What are the stages involved (BTS, BSC, etc.)?",
      directAnswer: "A call between two mobile subscribers traverses an 8-stage sequence connecting the radio access network, originating switching core, recipient database interrogation, backbone routing, and destination downlink paging.",
      details: [
        "<strong>Stage 1: Call Request & RF Uplink (Sender MS ➔ Local BTS):</strong> The caller dials the friend's number (MSISDN). The MS transmits a Channel Request over the Random Access Channel (RACH) to the local BTS cell tower.",
        "<strong>Stage 2: Radio Resource Allocation (BTS ➔ Originating BSC):</strong> The BTS forwards the request to its BSC. The BSC assigns a dedicated Standalone Dedicated Control Channel (SDCCH) and signals the BTS to notify the MS.",
        "<strong>Stage 3: Core Switching & Authentication (BSC ➔ Originating MSC / VLR / AuC):</strong> The BSC relays the call setup to the Originating MSC. The MSC queries its local VLR and AuC to authenticate the caller using triplets (RAND, SRES, Kc) and check outbound permissions.",
        "<strong>Stage 4: Recipient Location Interrogation (Originating MSC ➔ GMSC ➔ Destination HLR):</strong> The MSC analyzes the dialed number and sends a 'Send Routing Information' (SRI) query across the signaling network to the friend's permanent Home Location Register (HLR).",
        "<strong>Stage 5: Roaming Number Assignment (HLR ➔ Destination VLR ➔ MSRN):</strong> The friend's HLR contacts the VLR currently serving the friend with a 'Provide Roaming Number' (PRN) request. The destination VLR allocates a temporary Mobile Station Roaming Number (MSRN) and returns it to the HLR, which passes it back to the originating MSC.",
        "<strong>Stage 6: Core Backbone Routing (Originating MSC ➔ Backbone / PSTN ➔ Destination MSC):</strong> The originating MSC uses the MSRN to route the call across high-speed transit trunks directly to the Destination MSC serving the friend.",
        "<strong>Stage 7: Downlink Location Area Paging (Destination MSC ➔ Destination BSC ➔ Destination BTSs):</strong> The destination MSC queries its local VLR for the recipient's Location Area Code (LAC) and commands the destination BSC to broadcast a Paging message over all BTS towers in that area.",
        "<strong>Stage 8: Alerting & Ringing (Destination BTS ➔ Receiver MS):</strong> The friend's MS hears its paging ID, locks onto an assigned traffic channel, and rings. When the friend answers, the audio circuit is connected!"
      ],
      examTip: "List the components in chronological order: MS ➔ BTS ➔ BSC ➔ MSC ➔ Recipient HLR ➔ Destination VLR (MSRN) ➔ Backbone ➔ Destination MSC ➔ Destination BSC ➔ Destination BTS ➔ Receiver MS."
    },
    {
      num: 10,
      isMidterm: true,
      midtermPointer: "Lesson 3: Global System for Mobile Communication",
      question: "What are the components under the Network Station Subsystem (NSS)? What are the functions of each?",
      directAnswer: "The Network and Switching Subsystem (NSS)—the core brain of GSM—manages call switching, mobility tracking, subscriber authentication, billing, and external gateways. It consists of 6 components: MSC, GMSC, HLR, VLR, AuC, and EIR.",
      details: [
        "<strong>1. MSC (Mobile Switching Center):</strong> The central telephone exchange. Coordinates call setup, routing, switching, and teardown; controls handoffs between different BSCs; collects call detail records (CDRs) for billing; and manages subscriber mobility.",
        "<strong>2. GMSC (Gateway Mobile Switching Center):</strong> An edge MSC with external signaling interfaces. Serves as the gateway bridging the cellular network with external networks (PSTN, ISDN, and other carriers). All incoming calls from fixed landlines enter through the GMSC.",
        "<strong>3. HLR (Home Location Register):</strong> The central master administrative database. Stores permanent profiles of all home subscribers: IMSI, phone number (MSISDN), subscribed services, service restrictions, and the current location pointer (address of the VLR currently serving the subscriber).",
        "<strong>4. VLR (Visitor Location Register):</strong> A temporary dynamic database paired with an MSC. Caches subscriber profiles for mobile users currently roaming in that MSC's geographic service area, eliminating constant queries to the distant HLR and allocating temporary identities (TMSI, MSRN).",
        "<strong>5. AuC (Authentication Center):</strong> The security database associated with the HLR. Stores each subscriber's secret 128-bit key (Ki) and executes A3/A8 algorithms to generate authentication triplets (RAND, SRES, Kc) to prevent fraud and SIM cloning.",
        "<strong>6. EIR (Equipment Identity Register):</strong> A hardware security database tracking physical mobile handsets via their 15-digit IMEI. Categorizes devices into White (permitted), Gray (monitored for faults/testing), and Black (stolen/barred from network access) lists."
      ],
      examTip: "List all 6 NSS components: MSC, GMSC, HLR, VLR, AuC, EIR with their full names and specific roles (Switching, Gateway, Master DB, Roaming Cache, Security Keys, IMEI Tracking)."
    },

    // --- 12 PRELIM FOUNDATION GUIDE QUESTIONS (ITEMS 11 TO 22) ---
    {
      num: 11,
      isMidterm: false,
      midtermPointer: "Module 1: Introduction to Mobile Computing",
      question: "What is mobile computing, and what are its major applications and services?",
      directAnswer: "Mobile computing is a technology enabling transmission of data, voice, and video via portable computing devices without physical links, creating an environment designed for mobility. It is composed of Mobile Hardware, Mobile Software, and Mobile Communication.",
      details: [
        "<strong>Communication & Social:</strong> Instant messaging, high-definition video conferencing (Zoom, WhatsApp).",
        "<strong>M-Commerce & Banking:</strong> Contactless NFC payments (Apple Pay, Google Wallet), mobile banking, stock trading.",
        "<strong>Navigation & Location-Based Services (LBS):</strong> GPS turn-by-turn routing (Google Maps), real-time ride-hailing (Uber/Grab), geofencing.",
        "<strong>M-Health:</strong> Continuous biometric telemetry, remote ECG monitoring, digital patient charts.",
        "<strong>Enterprise & Logistics:</strong> Warehouse barcode/RFID inventory scanning, fleet asset tracking."
      ],
      examTip: "Always list the 3 pillars (Hardware, Software, Communication) and 4 characteristics (Portability, Connectivity, Interactivity, Individuality)."
    },
    {
      num: 12,
      isMidterm: false,
      midtermPointer: "Module 1: Limitations & Challenges",
      question: "What are the major challenges and limitations of mobile computing, and how do emerging technologies address them?",
      directAnswer: "Mobile computing faces 7 core constraints rooted in physical portability, wireless physics, and hardware miniaturization: Battery life, bandwidth volatility, security risks, compute/storage limits, small displays, hardware heterogeneity, and location dependency.",
      details: [
        "<strong>Battery Life:</strong> Countered via ARM big.LITTLE architectures, GaN fast charging, and OLED dark modes.",
        "<strong>Bandwidth Volatility:</strong> Countered via 5G carrier aggregation, adaptive bitrates (DASH), and edge caching.",
        "<strong>Security Risks:</strong> Protected via hardware secure enclaves, biometric authentication, and TLS 1.3 encryption.",
        "<strong>Limited Compute:</strong> Solved by Edge Computing offloading and on-device NPUs (Neural Processing Units).",
        "<strong>Screen Size:</strong> Addressed via foldable OLEDs, AI voice dictation, and multimodal UI.",
        "<strong>Heterogeneity:</strong> Handled by cross-platform runtimes (Flutter, React Native).",
        "<strong>Location Dependency:</strong> Overcome via seamless cellular handoffs and LEO satellite direct-to-cell links."
      ],
      examTip: "Present this as a Problem ➔ Emerging Solution matrix on your exam paper."
    },
    {
      num: 13,
      isMidterm: false,
      midtermPointer: "Module 2: Data Communication",
      question: "What are the fundamental concepts of data communication?",
      directAnswer: "Data communication is the exchange of data between two or more devices across a transmission medium. It requires 8 core elements and must satisfy 3 fundamental quality characteristics (DAT).",
      details: [
        "<strong>8 Core Elements:</strong> Sender (originator), Receiver (destination), Transmitter/Encoder (modulates signal), Decoder (demodulates signal), Message (payload), Medium/Channel (physical path), Protocol (governing rules), and Noise (interference).",
        "<strong>3 Quality Pillars (DAT):</strong> Delivery (arrives at intended destination only), Accuracy (arrives uncorrupted), Timeliness (arrives in real time without lag)."
      ],
      examTip: "Remember the acronym DAT (Delivery, Accuracy, Timeliness) and the 8 elements diagram."
    },
    {
      num: 14,
      isMidterm: false,
      midtermPointer: "Module 2: Network Architectures",
      question: "What are the major components and architectures of a computer network?",
      directAnswer: "A computer network consists of interconnected nodes exchanging data. It is constructed from physical hardware building blocks and organized into centralized or decentralized architectures.",
      details: [
        "<strong>Hardware Building Blocks:</strong> End Devices/Nodes (smartphones, PCs), Intermediary Devices (Switches, Routers, Hubs, WAPs), Network Interface Cards (NICs), Servers, and Transmission Media.",
        "<strong>Client-Server Architecture:</strong> Centralized servers host resources; client nodes request them. Easy to manage and secure, but the server is a single point of failure.",
        "<strong>Peer-to-Peer (P2P) Architecture:</strong> Decentralized; all nodes share equal privileges and act simultaneously as both client and server. Highly resilient and fault-tolerant, but difficult to secure."
      ],
      examTip: "Contrast Client-Server centralization vs P2P decentralization, and note that NICs hold physical MAC addresses."
    },
    {
      num: 15,
      isMidterm: false,
      midtermPointer: "Module 2: Transmission Media",
      question: "What are the different transmission media and wireless communication methods?",
      directAnswer: "Transmission media are divided into Guided Media (physical wired cables) and Unguided Media (wireless electromagnetic waves traveling through air/space).",
      details: [
        "<strong>Guided Media:</strong> UTP (cheap twisted copper, high EMI vulnerability), STP (foil-shielded twisted copper, blocks EMI), Coaxial (inner copper + dielectric + braid), Fiber-Optic (glass core transmitting light via Total Internal Reflection, multi-Tbps speeds, zero EMI).",
        "<strong>Unguided Media:</strong> Radio Waves (omnidirectional, penetrates walls), Microwaves (focused Line-of-Sight tower links, vulnerable to rain fade), Infrared (short-range, non-penetrating Line-of-Sight)."
      ],
      examTip: "Be prepared to explain 'Total Internal Reflection' in fiber and 'Line-of-Sight (LOS)' in microwaves."
    },
    {
      num: 16,
      isMidterm: false,
      midtermPointer: "Module 2: Network Topologies",
      question: "What are the distinct characteristics of network topologies? How would you describe each and what are their use cases?",
      directAnswer: "A network topology is the physical or logical arrangement of nodes and links. Topology dictates installation cost, fault isolation, and scalability.",
      details: [
        "<strong>Bus Topology:</strong> Single linear backbone cable with end terminators. Cheap and simple, but a cable break takes down the entire network. <em>Use Case:</em> Small legacy labs, temporary sensor buses.",
        "<strong>Star Topology (Most Common):</strong> All nodes connect individually to a central switch/hub. Faults in one cable isolate only one node, but the central switch is a single point of failure. <em>Use Case:</em> Modern Enterprise LANs, Home Wi-Fi.",
        "<strong>Ring Topology:</strong> Closed unidirectional loop passing tokens. Predictable delay, but a single break disrupts the entire loop. <em>Use Case:</em> FDDI optical backbones.",
        "<strong>Mesh Topology:</strong> Dedicated point-to-point links between all nodes ($n(n-1)/2$). Maximum redundancy and fault tolerance, but highest cabling cost. <em>Use Case:</em> Core telecom infrastructure, military command."
      ],
      examTip: "Star is the most common LAN topology; Mesh provides maximum fault tolerance at highest cost."
    },
    {
      num: 17,
      isMidterm: false,
      midtermPointer: "Module 2: Environmental Factors",
      question: "How do external factors, such as weather disturbances, affect a transmission link? How about the end devices?",
      directAnswer: "Weather disturbances degrade transmission links through electromagnetic wave scattering and attenuation, while stressing mobile devices through electrochemical and thermal limits.",
      details: [
        "<strong>Transmission Links:</strong> Rain Fade scatters microwaves when raindrop sizes match wavelengths; lightning causes high-voltage surge interference; fog and humidity cause atmospheric refraction.",
        "<strong>End Devices:</strong> Freezing cold slows electrochemical reactions in Lithium-ion batteries, causing sudden voltage drops and shutdowns; extreme heat causes CPU/GPU thermal throttling and display dimming; moisture causes contact corrosion."
      ],
      examTip: "Split your answer clearly into two sections: (1) Transmission Links (Rain Fade) and (2) End Devices (Lithium Chemistry)."
    },
    {
      num: 18,
      isMidterm: false,
      midtermPointer: "Chapter 2 Module / Lesson 1: Cellular Networks",
      question: "How does cellular communication work, and what are the major components of a cellular network?",
      directAnswer: "Cellular communication divides coverage into smaller cells served by low-power base stations, enabling frequency reuse and massive user capacity.",
      details: [
        "<strong>Hexagonal Layout:</strong> Approximates circular coverage while providing 100% gapless surface tessellation with zero overlaps or dead zones.",
        "<strong>Major Components:</strong> Mobile Station (MS: handset + SIM), Base Transceiver Station (BTS: cell tower RF transceiver), Base Station Controller (BSC: channel manager and handoff coordinator), Mobile Switching Center (MSC: core brain handling switching and billing), and Backbone network."
      ],
      examTip: "Draw the 5-tier architecture: MS ➔ BTS ➔ BSC ➔ MSC ➔ Backbone."
    },
    {
      num: 19,
      isMidterm: false,
      midtermPointer: "Chapter 2 Module / Lesson 1: Call Flow",
      question: "What are the components involved in cellular communication? How is a message or a call transmitted?",
      directAnswer: "A cellular transmission passes through a sequence of hardware components: MS communicates wirelessly with BTS ➔ forwards to BSC ➔ connects to MSC for onward routing through the backbone network.",
      details: [
        "<strong>Uplink:</strong> Handset transmits over radio channel to local cell tower BTS.",
        "<strong>Coordination:</strong> BTS converts RF wave to digital bits and forwards to BSC; BSC manages channels.",
        "<strong>Routing:</strong> BSC passes to MSC; MSC authenticates, bills, and routes over backbone to destination BTS, which pages recipient."
      ],
      examTip: "State the sequence: MS ➔ BTS ➔ BSC ➔ MSC ➔ Backbone ➔ Destination BTS ➔ Receiver MS."
    },
    {
      num: 20,
      isMidterm: false,
      midtermPointer: "Lesson 3: Cellular Evolution",
      question: "How have cellular networks evolved from early generations to current and emerging technologies?",
      directAnswer: "Cellular networks evolved from analog voice-only systems into digital encrypted networks, high-speed mobile broadband, all-IP packet architectures, and ultra-flexible 5G network slices.",
      details: [
        "<strong>1G (1980s):</strong> Analog FM (AMPS). Voice calls only, unencrypted, prone to eavesdropping.",
        "<strong>2G (1990s):</strong> Digital GSM. Introduced SMS text messaging, digital encryption, SIM cards, and GPRS data.",
        "<strong>3G (2000s):</strong> Mobile Broadband (UMTS/WCDMA). Enabled mobile web, app stores, and video calling.",
        "<strong>4G (2010s):</strong> All-IP Architecture (LTE). Eliminated circuit switching for VoLTE, high-speed HD streaming.",
        "<strong>5G (2020s+):</strong> Network Slicing (eMBB, mMTC, URLLC), sub-1ms latency, massive IoT density."
      ],
      examTip: "Emphasize: 1G=Analog Voice, 2G=Digital SMS, 3G=Mobile Web, 4G=All-IP Broadband, 5G=Network Slicing."
    },
    {
      num: 21,
      isMidterm: false,
      midtermPointer: "Module 2: Network Design",
      question: "Suppose you are tasked with designing a network infrastructure for a remote area; what factors should you consider?",
      directAnswer: "Designing network infrastructure for remote, off-grid terrain requires balancing power autonomy, wide-area propagation physics, backhaul viability, and environmental resilience.",
      details: [
        "<strong>Power Autonomy:</strong> Deploy solar photovoltaic arrays with Lithium Iron Phosphate battery banks and backup microgenerators.",
        "<strong>Frequency Spectrum:</strong> Prioritize lower RF bands (700–900 MHz) for wide geographic reach and obstacle penetration.",
        "<strong>Backhaul Connectivity:</strong> Utilize Low Earth Orbit (LEO) satellite links (Starlink) or multi-hop microwave Line-of-Sight relay towers.",
        "<strong>Physical Ruggedization:</strong> IP67 weatherproof enclosures with lightning arrestors.",
        "<strong>Edge Caching:</strong> Local edge storage servers to cache essential education and healthcare content locally."
      ],
      examTip: "Cover all 5 pillars: Power (Solar), Spectrum (Sub-1GHz), Backhaul (Satellite), Ruggedization, and Edge Caching."
    },
    {
      num: 22,
      isMidterm: false,
      midtermPointer: "Module 1: Definition Summary",
      question: "If you could describe mobile computing in 2-3 words, based on your learning from the lessons, how would you describe it? Why?",
      directAnswer: "'Ubiquitous Intelligent Connectivity'",
      details: [
        "<strong>Ubiquitous:</strong> Compute power, services, and communication are accessible everywhere, untethered from fixed desks or cables.",
        "<strong>Intelligent:</strong> Modern mobile systems utilize on-device NPUs, edge computing, and sensor context to adapt to user needs dynamically.",
        "<strong>Connectivity:</strong> Bridges portable edge hardware with global cellular networks and cloud backbones, enabling continuous collaboration."
      ],
      examTip: "State the 3 words clearly in quotes first, then give a 1-sentence justification for each word."
    }
  ],

  glossary: [
    // --- MIDTERM TERMS (LESSON 2 & 3) ---
    { term: "Mobile IP", full: "Mobile Internet Protocol (RFC 3344 / 5944)", cat: "Mobile IP", isMidterm: true, desc: "An IETF standard protocol that allows mobile devices to move from one network to another while maintaining their permanent Home IP address." },
    { term: "HA", full: "Home Agent", cat: "Mobile IP", isMidterm: true, desc: "A router on the mobile node's home network that tunnels datagrams to the mobile node when it is away from home, and maintains current location bindings." },
    { term: "FA", full: "Foreign Agent", cat: "Mobile IP", isMidterm: true, desc: "A router on a visited foreign network that provides routing services to a registered Mobile Node, detunneling packets from the HA and acting as default router." },
    { term: "CoA", full: "Care-of Address", cat: "Mobile IP", isMidterm: true, desc: "A temporary IP address that identifies the Mobile Node's current topological point of attachment in a foreign network (can be FA-CoA or Collocated-CoA)." },
    { term: "Collocated CoA", full: "Collocated Care-of Address", cat: "Mobile IP", isMidterm: true, desc: "A temporary local IP address assigned directly to the Mobile Node (e.g. via DHCP or SLAAC) where the MN itself acts as the tunnel endpoint." },
    { term: "CN", full: "Correspondent Node", cat: "Mobile IP", isMidterm: true, desc: "The peer host device communicating with the Mobile Node across the network." },
    { term: "Triangular Routing", full: "Indirect Routing Path in Mobile IP", cat: "Mobile IP", isMidterm: true, desc: "A routing path where packets to MN travel CN ➔ HA ➔ MN, while packets from MN travel MN ➔ CN directly, creating an inefficient triangular dogleg." },
    { term: "Reverse Tunneling", full: "Reverse Tunneling for Mobile IP (RFC 3024)", cat: "Mobile IP", isMidterm: true, desc: "Mechanism where MN encapsulates outbound packets back to its Home Agent to bypass Ingress Filtering enforced by foreign network firewalls." },
    { term: "Ingress Filtering", full: "Source IP Address Verification", cat: "Mobile IP", isMidterm: true, desc: "Security practice by routers of discarding incoming packets whose source IP address does not match the allocated prefix of the originating network." },
    { term: "NAT", full: "Network Address Translation", cat: "Mobile IP", isMidterm: true, desc: "A method mapping multiple private RFC 1918 IPs to one public IP to conserve IPv4 space; breaks end-to-end connectivity and IPsec, and is unneeded in IPv6." },
    { term: "SLAAC", full: "Stateless Address Autoconfiguration", cat: "Mobile IP", isMidterm: true, desc: "IPv6 feature allowing mobile nodes to automatically generate globally unique IPs using local router prefixes and interface IDs without a DHCP server." },
    { term: "GPRS", full: "General Packet Radio Service (2.5G)", cat: "GSM Subsystems", isMidterm: true, desc: "Second-generation packet-switched data extension for GSM providing continuous 'always-on' connectivity up to ~114 kbps with volume-based billing." },
    { term: "EDGE", full: "Enhanced Data rates for GSM Evolution (2.75G)", cat: "GSM Subsystems", isMidterm: true, desc: "Enhancement to GSM/GPRS using 8-PSK modulation and AMC to achieve speeds up to 384 kbps over standard 200 kHz GSM radio channels." },
    { term: "8-PSK", full: "8-Phase Shift Keying", cat: "GSM Subsystems", isMidterm: true, desc: "Digital modulation scheme used in EDGE encoding 3 bits per symbol, tripling the raw throughput of 1-bit GMSK modulation." },
    { term: "GMSK", full: "Gaussian Minimum Shift Keying", cat: "GSM Subsystems", isMidterm: true, desc: "Continuous-phase frequency-shift keying modulation used in standard GSM and GPRS, carrying 1 bit per symbol." },
    { term: "AMC", full: "Adaptive Modulation and Coding", cat: "GSM Subsystems", isMidterm: true, desc: "Technique dynamically altering modulation (GMSK vs 8-PSK) and coding rate (MCS-1 to MCS-9) in response to real-time radio channel quality." },
    { term: "BSS", full: "Base Station Subsystem", cat: "GSM Subsystems", isMidterm: true, desc: "The GSM subsystem responsible for handling the radio transmission interface, consisting of the BTS towers and BSC controllers." },
    { term: "BTS", full: "Base Transceiver Station", cat: "GSM Subsystems", isMidterm: true, desc: "The cell tower hardware containing radio transceivers, power amplifiers, and antennas that communicates directly with mobile stations over the air." },
    { term: "BSC", full: "Base Station Controller", cat: "GSM Subsystems", isMidterm: true, desc: "The intelligent network node managing multiple BTS towers, radio frequency channel allocation, transmitter power levels, and handoffs." },
    { term: "NSS", full: "Network and Switching Subsystem", cat: "GSM Subsystems", isMidterm: true, desc: "The core brain of the GSM network responsible for call switching, subscriber mobility tracking, authentication, billing, and external gateways." },
    { term: "MSC", full: "Mobile Switching Center", cat: "GSM Subsystems", isMidterm: true, desc: "The central switching exchange in a cellular network that sets up, routes, coordinates, and bills mobile telephone calls and SMS." },
    { term: "GMSC", full: "Gateway Mobile Switching Center", cat: "GSM Subsystems", isMidterm: true, desc: "An MSC that acts as the entry and exit gateway connecting the GSM cellular network with external networks (PSTN, ISDN, and other carriers)." },
    { term: "HLR", full: "Home Location Register", cat: "GSM Subsystems", isMidterm: true, desc: "The central permanent master database storing subscriber profiles, subscribed features, and current location pointers (VLR address)." },
    { term: "VLR", full: "Visitor Location Register", cat: "GSM Subsystems", isMidterm: true, desc: "A temporary dynamic database paired with an MSC that caches subscriber information for users actively roaming in that MSC's geographic service area." },
    { term: "AuC", full: "Authentication Center", cat: "GSM Subsystems", isMidterm: true, desc: "The protected security database connected to the HLR that holds each subscriber's secret key (Ki) and generates authentication triplets (RAND, SRES, Kc)." },
    { term: "EIR", full: "Equipment Identity Register", cat: "GSM Subsystems", isMidterm: true, desc: "The database tracking physical handset IMEIs organized into White (valid), Gray (monitored), and Black (stolen/barred) lists." },
    { term: "OSS", full: "Operation Support Subsystem", cat: "GSM Subsystems", isMidterm: true, desc: "The network management subsystem consisting of Operations and Maintenance Centers (OMC) for traffic monitoring, alarms, and configuration." },
    { term: "SIM", full: "Subscriber Identity Module", cat: "GSM Subsystems", isMidterm: true, desc: "A smart card microcontroller holding the subscriber's IMSI, secret key Ki, security algorithms, and PIN/PUK, decoupling identity from handset." },
    { term: "IMEI", full: "International Mobile Equipment Identity", cat: "Hardware", isMidterm: true, desc: "A unique 15-digit serial number physically burned into a mobile phone hardware handset to identify the physical device worldwide." },
    { term: "IMSI", full: "International Mobile Subscriber Identity", cat: "GSM Subsystems", isMidterm: true, desc: "A unique 15-digit number stored in the SIM card that identifies the subscriber on the cellular carrier's network." },
    { term: "MSISDN", full: "Mobile Station International Subscriber Directory Number", cat: "GSM Subsystems", isMidterm: true, desc: "The actual public telephone phone number dialed to reach a mobile subscriber (mapped to IMSI in the HLR)." },
    { term: "MSRN", full: "Mobile Station Roaming Number", cat: "GSM Subsystems", isMidterm: true, desc: "A temporary, geographically routable phone number assigned by a destination VLR to route an incoming call across transit trunks to a roaming user." },
    { term: "Handoff", full: "Handover (Cell Transition)", cat: "Cellular", isMidterm: true, desc: "The automatic, seamless transfer of an ongoing call or data session from one base station cell to another without service interruption." },
    { term: "Frequency Reuse", full: "Cellular Channel Reuse", cat: "Cellular", isMidterm: true, desc: "The practice of using the exact same radio frequencies in geographically separated non-adjacent cells to multiply system capacity infinitely." },

    // --- FOUNDATIONS & MEDIA ---
    { term: "UTP", full: "Unshielded Twisted Pair", cat: "Media", isMidterm: false, desc: "Twisted copper cable lacking metal shielding; inexpensive and flexible, but susceptible to electromagnetic interference (EMI)." },
    { term: "STP", full: "Shielded Twisted Pair", cat: "Media", isMidterm: false, desc: "Twisted copper enclosed in metal foil/braid; protects against EMI and crosstalk at higher cost." },
    { term: "Rain Fade", full: "Precipitation-Induced Attenuation", cat: "Media", isMidterm: false, desc: "Absorption and scattering of high-frequency microwave and millimeter-wave radio signals when raindrop sizes match signal wavelengths." },
    { term: "NPU", full: "Neural Processing Unit", cat: "Hardware", isMidterm: false, desc: "Dedicated silicon on mobile processors optimized for running machine learning models on-device with zero latency and high battery efficiency." }
  ]
};

if (typeof window !== "undefined") {
  window.MOBCOM_DATA = MOBCOM_DATA;
}
