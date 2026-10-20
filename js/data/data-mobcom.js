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
      totalItems: 20,
      points: 20,
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
    // --- MIDTERM EXAM SIMULATION (ITEMS 1 TO 20) ---
    {
      id: 1,
      category: "🎯 Midterm: Mobile IP",
      isMidterm: true,
      question: "Why does host mobility fundamentally break standard IP routing in traditional internet architectures?",
      options: [
        "Traditional IP addresses use Roman numerals that cannot be transmitted over radio waves",
        "An IP address serves a dual conflicting role: endpoint identifier for TCP sockets and topological routing locator for network subnets",
        "Mobile phones do not have network interface cards (NICs) with physical MAC addresses",
        "Routers automatically block any device that moves faster than 10 km/h"
      ],
      correct: 1,
      explanation: "In traditional IP, an address serves two roles simultaneously: endpoint identity (TCP socket 4-tuple) and topological location. If a device moves and changes IP, active TCP sockets disconnect; if it keeps its IP, routers cannot route packets to the foreign network.",
      hint: "Consider the dual identity of an IP address: it acts both as a permanent endpoint ID for active TCP connections and as a physical topological routing locator based on subnets."
    },
    {
      id: 2,
      category: "🎯 Midterm: Mobile IP",
      isMidterm: true,
      question: "Which transport layer protocol should be chosen for real-time mobile video calling (e.g. Zoom/FaceTime), and why?",
      options: [
        "TCP, because it guarantees every lost frame is retransmitted regardless of delay",
        "UDP, because its lightweight 8-byte header and lack of retransmissions prioritize low latency over dropped packets",
        "FTP, because it provides end-to-end file encryption",
        "ICMP, because it ping-tests the cell tower continuously"
      ],
      correct: 1,
      explanation: "UDP is connectionless and does not retransmit lost packets. In real-time communications (VoIP/video), a dropped packet is simply ignored; waiting for TCP retransmissions causes unacceptable buffering and audio/video lag.",
      hint: "In live interactive video, waiting to retransmit lost frames introduces buffering lag. Think of which protocol is connectionless and prioritizes timeliness over 100% reliability."
    },
    {
      id: 3,
      category: "🎯 Midterm: Mobile IP",
      isMidterm: true,
      question: "Why does standard TCP congestion control suffer severe throughput collapse over mobile wireless links?",
      options: [
        "TCP assumes all packet losses are caused by network congestion and throttles its window, whereas wireless losses are mostly caused by bit errors and RF fading",
        "Wireless antennas are unable to decode TCP checksums",
        "Cell towers refuse to forward TCP SYN packets",
        "TCP packets exceed the physical length of radio waves"
      ],
      correct: 0,
      explanation: "The 'Congestion Fallacy': TCP interprets any dropped packet as router buffer overflow and cuts its transmission window. On wireless links, drops are caused by RF fading, interference, and handoffs—throttling the window degrades bandwidth unnecessarily.",
      hint: "Recall the 'Congestion Fallacy': TCP's classic algorithm presumes any dropped packet is due to buffer overflow at routers, mistakenly throttling transmission speed on noisy wireless links."
    },
    {
      id: 4,
      category: "🎯 Midterm: Mobile IP",
      isMidterm: true,
      question: "In Mobile IP (RFC 3344), what mechanism allows the Home Agent (HA) to intercept packets sent to an absent Mobile Node?",
      options: [
        "The HA physically detaches the mobile node's Ethernet cable",
        "The HA issues Proxy ARP replies on the home network, claiming the Mobile Node's IP address maps to the HA's own MAC address",
        "The HA restarts the home router every 5 seconds",
        "The HA requests the Correspondent Node to change its IP address"
      ],
      correct: 1,
      explanation: "When the MN is away, the Home Agent activates Proxy ARP (Address Resolution Protocol). When local routers ask 'Who has MN's IP?', the HA answers with its own hardware MAC address, allowing it to intercept and tunnel all incoming packets.",
      hint: "Think of the Layer 2 resolution protocol that maps an IP address to a hardware MAC address on local subnets. How can the Home Agent pretend to be the absent device?"
    },
    {
      id: 5,
      category: "🎯 Midterm: Mobile IP",
      isMidterm: true,
      question: "What is the key difference between a Foreign Agent Care-of Address (FA-CoA) and a Collocated Care-of Address?",
      options: [
        "FA-CoA is an IPv6 address; Collocated CoA is an IPv4 address",
        "FA-CoA is the shared IP of the Foreign Agent's router interface, while a Collocated CoA is a temporary local IP acquired directly by the Mobile Node (e.g. via DHCP)",
        "Collocated CoA requires buying a new SIM card; FA-CoA does not",
        "FA-CoA is permanent for 10 years; Collocated CoA expires after 1 second"
      ],
      correct: 1,
      explanation: "With an FA-CoA, multiple visiting mobile nodes share the Foreign Agent router's IP, and the FA terminates the tunnel. With a Collocated CoA, the MN acquires its own dedicated local IP on the foreign subnet and decapsulates packets itself.",
      hint: "Ask whether the Care-of Address belongs to a visiting router interface shared by many nodes, or is leased directly to the handset itself (e.g., via DHCP)."
    },
    {
      id: 6,
      category: "🎯 Midterm: Mobile IP",
      isMidterm: true,
      question: "Why is 'Reverse Tunneling' (RFC 3024) necessary when a Mobile Node transmits packets back to a Correspondent Node?",
      options: [
        "Because radio signals cannot travel in reverse without physical mirrors",
        "Because foreign network border routers enforce Ingress Filtering, dropping outgoing packets whose source IP does not match the foreign subnet prefix",
        "To increase the download speed of the mobile node by 500%",
        "To prevent the Correspondent Node from learning the Home Agent's MAC address"
      ],
      correct: 1,
      explanation: "Under Direct Routing, the MN transmits packets with Source IP = Home Address. Foreign ISP routers running Ingress Filtering (anti-spoofing) discard packets whose source IP doesn't match the local subnet. Reverse Tunneling tunnels them back to the HA to bypass this filter.",
      hint: "Look out for edge security policies: foreign ISP border routers discard outgoing packets whose source IP addresses do not belong to their local IP subnet range (anti-spoofing)."
    },
    {
      id: 7,
      category: "🎯 Midterm: Mobile IP",
      isMidterm: true,
      question: "Which major entity from Mobile IPv4 was completely eliminated in Mobile IPv6?",
      options: [
        "Home Agent (HA)",
        "Mobile Node (MN)",
        "Foreign Agent (FA)",
        "Correspondent Node (CN)"
      ],
      correct: 2,
      explanation: "Mobile IPv6 eliminates Foreign Agents completely! Thanks to Stateless Address Autoconfiguration (SLAAC) and abundant 128-bit addresses, any IPv6 Mobile Node can dynamically generate its own collocated CoA anywhere without an FA router.",
      hint: "In IPv6, Stateless Address Autoconfiguration (SLAAC) allows mobile nodes to generate their own local Care-of Addresses, making an intermediary visiting router redundant."
    },
    {
      id: 8,
      category: "🎯 Midterm: Mobile IP",
      isMidterm: true,
      question: "Why is Network Address Translation (NAT) absent and unnecessary in IPv6?",
      options: [
        "IPv6 routers do not support port numbers",
        "IPv6 provides an inexhaustible 128-bit address space ($3.4 \times 10^{38}$ IPs), restoring the End-to-End Principle with unique public addresses for every device",
        "The United Nations legally banned NAT in 2020",
        "IPv6 packets cannot be transmitted through firewalls"
      ],
      correct: 1,
      explanation: "NAT was an emergency band-aid in IPv4 to stave off address depletion. Because IPv6 provides $3.4 \times 10^{38}$ globally routable addresses, every single device on Earth can have a unique public address, eliminating NAT and restoring true end-to-end communication.",
      hint: "Focus on the enormous 128-bit address space. NAT was an emergency workaround for address depletion; with billions of IPs per person, every node gets a unique public IP."
    },
    {
      id: 9,
      category: "🎯 Midterm: Mobile IP",
      isMidterm: true,
      question: "How does Route Optimization in Mobile IPv6 improve upon Mobile IPv4?",
      options: [
        "It eliminates radio waves and uses satellite lasers",
        "It allows Correspondent Nodes and Mobile Nodes to communicate directly without routing every packet through the Home Agent (bypassing triangular routing)",
        "It increases the battery life of mobile phones to 3 months",
        "It encrypts all internet traffic using MD5"
      ],
      correct: 1,
      explanation: "In Mobile IPv4, packets from CN must always travel to the HA first (triangular routing). In Mobile IPv6, Route Optimization is built-in: using Binding Updates and IPv6 Routing Headers, CN and MN can exchange data directly after initial discovery.",
      hint: "In IPv4, packets must always traverse the Home Agent first. Think of how IPv6 eliminates that inefficient triangular path."
    },
    {
      id: 10,
      category: "🎯 Midterm: GSM",
      isMidterm: true,
      question: "What primary modulation upgrade allowed EDGE (2.75G) to triple the data throughput of GPRS (2.5G) across the same 200 kHz channel?",
      options: [
        "Switching from Gaussian Minimum Shift Keying (GMSK, 1 bit/symbol) to 8-Phase Shift Keying (8-PSK, 3 bits/symbol)",
        "Replacing radio waves with fiber-optic pulses",
        "Upgrading from 32-bit to 128-bit microprocessors",
        "Eliminating the Base Station Controller"
      ],
      correct: 0,
      explanation: "GMSK in GPRS encodes 1 bit per symbol. EDGE introduced 8-PSK, where each radio symbol represents 3 bits ($2^3 = 8$). This mathematically triples the transmission speed over the exact same 200 kHz channel, reaching up to 384 kbps.",
      hint: "Compare GMSK (1 bit per radio symbol) with an advanced phase modulation where each constellation state conveys 3 bits (2^3 = 8)."
    },
    {
      id: 11,
      category: "🎯 Midterm: GSM",
      isMidterm: true,
      question: "What is the function of Adaptive Modulation and Coding (AMC) in EDGE networks?",
      options: [
        "It translates spoken English into Spanish during phone calls",
        "It dynamically switches between modulation schemes (GMSK vs 8-PSK) and coding schemes (MCS-1 to MCS-9) based on real-time radio signal quality",
        "It increases the transmission power of cell towers during rainstorms",
        "It reboots the smartphone when battery level drops below 20%"
      ],
      correct: 1,
      explanation: "AMC dynamically adapts: close to the tower with high signal quality, it uses MCS-9 (8-PSK with minimal redundancy) for maximum speed (up to 384 kbps); far from the tower with high noise, it downshifts to MCS-1 (GMSK with heavy error correction) to maintain connection stability.",
      hint: "Think of an automobile changing gears: close to the cell tower it shifts into high-speed 8-PSK, but in noisy fringes it downshifts to robust GMSK with heavy error correction."
    },
    {
      id: 12,
      category: "🎯 Midterm: GSM",
      isMidterm: true,
      question: "Which GSM subsystem is directly responsible for managing radio channel allocation, transmitter power levels, and handoffs between base stations?",
      options: [
        "Mobile Station Subsystem (MS)",
        "Base Station Controller (BSC) within the Base Station Subsystem (BSS)",
        "Authentication Center (AuC) within the NSS",
        "Operations Support Subsystem (OSS)"
      ],
      correct: 1,
      explanation: "The Base Station Controller (BSC) manages radio resources for multiple BTS towers, dynamically assigning frequency channels, controlling handset transmit power, and coordinating handoffs as users move across cells.",
      hint: "Look for the brain of the Base Station Subsystem (BSS) that coordinates multiple BTS cell towers and handles handovers."
    },
    {
      id: 13,
      category: "🎯 Midterm: GSM",
      isMidterm: true,
      question: "Which database in the GSM Network and Switching Subsystem (NSS) stores the secret symmetric key (Ki) and generates authentication triplets?",
      options: [
        "Equipment Identity Register (EIR)",
        "Authentication Center (AuC)",
        "Gateway Mobile Switching Center (GMSC)",
        "Visitor Location Register (VLR)"
      ],
      correct: 1,
      explanation: "The AuC (Authentication Center) stores the subscriber's secret 128-bit key (Ki). It executes the A3/A8 cryptographic algorithms to produce authentication triplets (RAND, SRES, Kc) to verify the SIM card and encrypt over-the-air voice calls.",
      hint: "This security vault inside the core network works hand-in-hand with the HLR to produce RAND, SRES, and Kc triplets using the Ki key."
    },
    {
      id: 14,
      category: "🎯 Midterm: GSM",
      isMidterm: true,
      question: "In GSM mobility tracking, what is the core functional difference between the HLR and the VLR?",
      options: [
        "HLR is for voice calls; VLR is for text messages",
        "HLR is the permanent master database of all home subscribers; VLR is a temporary local database caching data for subscribers currently active in an MSC's service area",
        "HLR is located inside the smartphone; VLR is on the cell tower",
        "HLR stores stolen phone serial numbers; VLR stores phone numbers"
      ],
      correct: 1,
      explanation: "The Home Location Register (HLR) is the central permanent database holding master subscriber profiles and service permissions. The Visitor Location Register (VLR) temporarily caches subscriber records while they roam in an MSC's area to avoid querying the distant HLR for every call.",
      hint: "One is the central permanent home repository of subscriber profiles; the other is a localized, temporary caching register for currently visiting handsets."
    },
    {
      id: 15,
      category: "🎯 Midterm: GSM",
      isMidterm: true,
      question: "What is the role of the Equipment Identity Register (EIR) 'Black List'?",
      options: [
        "To list subscribers who have overdue monthly phone bills",
        "To list stolen, counterfeit, or barred physical handset IMEIs that are blocked from connecting to the cellular network",
        "To store phone numbers of telemarketers",
        "To log phone calls placed after midnight"
      ],
      correct: 1,
      explanation: "The EIR organizes 15-digit hardware IMEIs into White (authorized), Gray (monitored), and Black lists. Handsets listed on the Black List (reported stolen or unauthorized) are strictly banned from accessing any network service.",
      hint: "Remember the 3 EIR lists (White, Gray, Black). The Black list targets hardware device serial numbers (IMEI) reported stolen or non-certified."
    },
    {
      id: 16,
      category: "🎯 Midterm: GSM",
      isMidterm: true,
      question: "What is the purpose of the Gateway MSC (GMSC) in a cellular network?",
      options: [
        "It functions as an interface bridge connecting the GSM cellular network with external networks like the PSTN, ISDN, and other mobile carriers",
        "It recharges the mobile phone battery wirelessly from 10 miles away",
        "It acts as the primary web browser on smartphones",
        "It tracks the GPS coordinates of the cell tower"
      ],
      correct: 0,
      explanation: "The Gateway MSC (GMSC) is an MSC equipped with external signaling interfaces. Any incoming call from an external fixed landline (PSTN) or another mobile operator first enters the cellular network through the GMSC, which queries the HLR to route the call.",
      hint: "Think of an entry portal or customs checkpoint that bridges the mobile carrier's internal network with external wireline telephone networks (PSTN)."
    },
    {
      id: 17,
      category: "🎯 Midterm: GSM",
      isMidterm: true,
      question: "Which identifier is stored on the SIM card to uniquely identify the subscriber to the cellular network core?",
      options: [
        "IMEI (International Mobile Equipment Identity)",
        "IMSI (International Mobile Subscriber Identity)",
        "MAC Address",
        "URL (Uniform Resource Locator)"
      ],
      correct: 1,
      explanation: "The IMSI (International Mobile Subscriber Identity) is the unique 15-digit number stored in the SIM card that identifies the subscriber on the cellular network. In contrast, the IMEI identifies the physical phone handset.",
      hint: "Distinguish between the handset hardware identity (IMEI) and the 15-digit subscriber chip profile (IMSI)."
    },
    {
      id: 18,
      category: "🎯 Midterm: GSM",
      isMidterm: true,
      question: "When a call is placed to a mobile user, what temporary number does the destination VLR allocate to route the call through the backbone?",
      options: [
        "MSRN (Mobile Station Roaming Number)",
        "PIN (Personal Identification Number)",
        "PUK (Personal Unblocking Key)",
        "IMEI (International Mobile Equipment Identity)"
      ],
      correct: 0,
      explanation: "The destination VLR assigns a temporary, geographically routable Mobile Station Roaming Number (MSRN). The recipient's HLR returns this MSRN to the calling MSC so the voice circuit can be routed across transit switches to the destination MSC.",
      hint: "A temporary, geographically routable phone number assigned by the serving VLR so the switching transit network knows where to forward the call."
    },
    {
      id: 19,
      category: "🎯 Midterm: Cellular",
      isMidterm: true,
      question: "Why do cellular networks divide large geographic areas into small cells rather than using one high-power transmitter?",
      options: [
        "To allow frequency channels to be reused multiple times across distant cells, multiplying network capacity and serving millions of users",
        "Because radio waves can only travel a maximum of 500 meters in air",
        "Because high-power transmitters cause earthquakes",
        "To force users to purchase more mobile phones"
      ],
      correct: 0,
      explanation: "Dividing coverage into cells allows frequency reuse: non-adjacent cells reuse the exact same radio channels without mutual interference. This multiplies capacity, enabling operators to serve millions of simultaneous subscribers on a limited slice of radio spectrum.",
      hint: "Reflect on frequency reuse: small low-power cells enable the exact same radio channels to be reused across non-adjacent clusters without interference."
    },
    {
      id: 20,
      category: "🎯 Midterm: Cellular",
      isMidterm: true,
      question: "What is the technical difference between 'Handoff' and 'Roaming'?",
      options: [
        "Handoff is between foreign countries; Roaming is within a city",
        "Handoff seamlessly transfers an active call between adjacent towers without dropping; Roaming allows a device to receive service on a partner operator's network outside home coverage",
        "Handoff requires restarting the phone; Roaming is automatic",
        "Handoff is wired; Roaming is wireless"
      ],
      correct: 1,
      explanation: "Handoff (or handover) transfers an active call/session between cell towers as the user physically moves. Roaming allows a user to access cellular service when traveling outside the home operator's coverage area by connecting to a partner carrier's network.",
      hint: "One keeps an ongoing active call alive as you drive across cell borders; the other permits your device to register on partner carrier networks when away from your home operator."
    },

    // --- FOUNDATION ITEMS (ITEMS 21 TO 30) ---
    {
      id: 21,
      category: "Module 1: Foundations",
      isMidterm: false,
      question: "Which of the following is NOT one of the 3 fundamental pillars of Mobile Computing?",
      options: [
        "Mobile Hardware",
        "Mobile Software",
        "Mobile Communication",
        "Stationary Mainframes"
      ],
      correct: 3,
      explanation: "The 3 pillars of Mobile Computing are Mobile Hardware (portable devices), Mobile Software (constrained operating systems/apps), and Mobile Communication (wireless networks).",
      hint: "Recall the 3 essential components: Mobile Hardware, Mobile Software, and Mobile Communication."
    },
    {
      id: 22,
      category: "Module 2: Media",
      isMidterm: false,
      question: "What physical principle allows Fiber-Optic cables to transmit multi-terabit data over long distances with zero EMI?",
      options: [
        "Total Internal Reflection of light pulses through ultra-pure silica glass",
        "Electromagnetic induction along copper shielding",
        "Radio frequency broadcasting inside vacuum tubes",
        "Atmospheric refraction"
      ],
      correct: 0,
      explanation: "Fiber-optic cables guide light pulses through a core using Total Internal Reflection at the core-cladding boundary, delivering multi-Tbps bandwidth immune to electrical noise.",
      hint: "Consider how light rays bounce off the boundary between the inner glass core and outer cladding at an angle greater than the critical angle."
    },
    {
      id: 23,
      category: "Module 2: Media",
      isMidterm: false,
      question: "Which network topology connects all nodes to a central hub/switch, ensuring a single cable fault does not collapse the network?",
      options: [
        "Bus Topology",
        "Star Topology",
        "Ring Topology",
        "Linear Topology"
      ],
      correct: 1,
      explanation: "In Star Topology, all nodes connect individually to a central switch. If one cable fails, only that single node is disconnected; however, the central switch is a single point of failure.",
      hint: "All peripheral devices radiate outward from a central point like the rays of a celestial body."
    },
    {
      id: 24,
      category: "Module 2: Media",
      isMidterm: false,
      question: "Why do microwave and millimeter-wave wireless links experience severe attenuation during torrential rainfall (Rain Fade)?",
      options: [
        "Water grounds the radio transmitter",
        "Raindrop physical dimensions are comparable to signal wavelengths, causing heavy scattering and absorption",
        "Clouds completely absorb all electromagnetic radiation",
        "Raindrops cool down the antenna electronics"
      ],
      correct: 1,
      explanation: "Rain Fade occurs because high-frequency microwaves have wavelengths comparable to raindrop sizes, causing strong scattering, phase distortion, and electromagnetic energy absorption.",
      hint: "When the wavelength of electromagnetic radiation matches the physical size of falling water droplets, resonance absorption and scattering peak."
    },
    {
      id: 25,
      category: "Module 3: Generations",
      isMidterm: false,
      question: "Which cellular generation eliminated legacy circuit switching in favor of a 100% all-IP packet-switched architecture?",
      options: [
        "1G (AMPS)",
        "2G (GSM)",
        "3G (UMTS)",
        "4G (LTE / VoLTE)"
      ],
      correct: 3,
      explanation: "4G LTE completely eliminated legacy circuit switching, treating all traffic (including voice via VoLTE) as IP packets over a unified high-speed packet-switched core.",
      hint: "This generation introduced Long Term Evolution (LTE) and transitioned voice calling entirely onto packet-switched IP (VoLTE)."
    },
    {
      id: 26,
      category: "Module 3: 5G",
      isMidterm: false,
      question: "Which 5G Network Slice is designed for sub-1 millisecond latency and 99.999% reliability in autonomous vehicles and remote surgery?",
      options: [
        "eMBB (Enhanced Mobile Broadband)",
        "mMTC (Massive Machine-Type Communications)",
        "URLLC (Ultra-Reliable Low-Latency Communication)",
        "SMS"
      ],
      correct: 2,
      explanation: "URLLC provides ultra-low latency (<1 ms) and 99.999% mission-critical reliability for autonomous driving (V2X), industrial automation, and telesurgery.",
      hint: "Look for the acronym emphasizing extreme reliability and minimal delay, crucial for life-or-death missions."
    },
    {
      id: 27,
      category: "Module 3: 5G",
      isMidterm: false,
      question: "Which 5G Network Slice supports connecting up to 1,000,000 devices per km² with a 10-year battery life for smart city IoT sensors?",
      options: [
        "eMBB",
        "mMTC",
        "URLLC",
        "VoLTE"
      ],
      correct: 1,
      explanation: "mMTC (Massive Machine-Type Communications) is engineered for dense IoT deployments (1M devices/km²) with ultra-low power consumption for remote battery-operated sensors.",
      hint: "Notice the massive volume of smart metering and industrial sensor devices rather than high-speed video streaming."
    },
    {
      id: 28,
      category: "Module 1: Hardware",
      isMidterm: false,
      question: "Why do smartphones experience sudden battery drain and unexpected shutdowns in sub-zero freezing weather?",
      options: [
        "The phone's screen backlight consumes 10x more power in the dark",
        "Extreme cold slows down internal electrochemical reaction rates and ion mobility inside Lithium-ion batteries, triggering sudden voltage drop",
        "Cell towers broadcast negative voltage in the winter",
        "The CPU fan freezes"
      ],
      correct: 1,
      explanation: "Sub-zero cold slows down chemical reaction rates and increases internal electrolyte resistance in Lithium-ion cells, causing sudden voltage drops that force the phone's power management IC to shut down.",
      hint: "Chemical reaction velocity and internal ionic resistance in Lithium-ion cells are heavily temperature-dependent."
    },
    {
      id: 29,
      category: "Module 2: Design",
      isMidterm: false,
      question: "When deploying wireless network infrastructure in an off-grid mountainous remote area, which frequency choice is most effective?",
      options: [
        "60 GHz millimeter waves",
        "Lower RF bands (700–900 MHz) for superior propagation distance and foliage penetration",
        "Unshielded twisted pair copper wire strung over 50 miles",
        "Infrared light beams"
      ],
      correct: 1,
      explanation: "Lower RF frequencies (sub-1 GHz, e.g. 700–900 MHz) travel significantly further and penetrate terrain obstacles, foliage, and weather far better than high-frequency bands.",
      hint: "Low frequencies have longer wavelengths, enabling them to travel over vast distances and curve around topography and tree foliage with less path loss."
    },
    {
      id: 30,
      category: "Module 1: Concept",
      isMidterm: false,
      question: "Which concise 3-word phrase best encapsulates the foundational definition of Mobile Computing?",
      options: [
        "Cabled Desktop Station",
        "Ubiquitous Intelligent Connectivity",
        "Analog Circuit Switching",
        "Isolated Local Storage"
      ],
      correct: 1,
      explanation: "Mobile Computing is 'Ubiquitous Intelligent Connectivity' because it provides compute access anywhere (ubiquitous), adapts to user context (intelligent), and bridges devices to the cloud (connectivity).",
      hint: "Think of computing that is present everywhere, adapts contextually to users, and links seamlessly across networks."
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
