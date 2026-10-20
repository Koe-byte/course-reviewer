# 0002-mobile-first-apple-human-interface-review-experience.md

## Context
The user confirmed the Round 2 decisions (persistent sidebar accordion, minimal anti-slop SaaS aesthetic, standardized 4 study tools, uniform Prelim/Midterm/Final structure), but stressed that the application will be used **primarily on mobile devices (smartphones)** for studying and exam prep. The user requested Apple Human Interface Guidelines (HIG) sensibilities.

## Decision
1. **Mobile Navigation Pattern**:
   - **Desktop**: Collapsible persistent sidebar with expandable Course ➔ Term ➔ Study Tool tree.
   - **Mobile Viewport**:
     - Compact top app bar with breadcrumb (`CS 312 / Midterm / Cheat Sheet`), drawer trigger hamburger (or course selector sheet), and quick search/theme controls.
     - Fluid off-canvas navigation drawer with touch-friendly 44pt+ tap targets and subtle iOS-style grouped list rows.
     - Persistent sticky bottom segmented controller for the 4 core study tools (`Cheat Sheet`, `Cards`, `Exam`, `Guide Qs`) with tactile active pills and thumb-zone ergonomics.
2. **Apple Design & Clean SaaS Principles (Anti-Slop)**:
   - San Francisco / Inter native typography scales with strict vertical rhythm and zero cramped lines.
   - Elimination of rainbow badges, emoji clutter, and floating stickers. Subtle monochromatic contrast with system-like monochrome iconography.
   - Tactile card gestures and large thumb-reachable action buttons for flashcard reviews (`Still Learning` / `Mastered`).
   - Clean iOS grouped inset table styling (`bg-zinc-100 dark:bg-zinc-900/60` rounded cards with hairline borders).
3. **Responsive Breakpoints**:
   - Touch targets strictly $\ge 44 \times 44\text{px}$.
   - Horizontal scrolling eliminated in text reading panes; tables wrapped in touch-scrollable containers with quiet fade indicators.
