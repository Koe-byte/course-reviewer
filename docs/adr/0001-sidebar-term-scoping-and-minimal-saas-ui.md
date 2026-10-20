# 0001-sidebar-term-scoping-and-minimal-saas-ui.md

## Context
The reviewer previously used a two-tier landing page (central course selector card grid) and flat tabs with heavy visual badges, emojis, and status pills. The user requested an academic SaaS aesthetic (Linear/Notion/Vercel inspired) with zero "AI slop" or clutter.

## Decision
1. **Persistent Sidebar Navigation**: Replace the two-tier page model with a persistent collapsible sidebar. Courses are top-level expandable navigation items.
2. **Term Exam Scoping (Prelim, Midterm, Final)**: Expanding a course presents the 3 major exam terms. Each term houses the four core study tools: `Cheat Sheet`, `Flashcards`, `Mock Exam`, and `Guide Questions`.
3. **Anti-Slop Clean Design System**: Strip away extraneous emojis, excessive colored pill badges, and generic card borders. Rely on strict typographic hierarchy, neutral palettes (zinc-900/zinc-50), subtle hair-thin borders (`border-zinc-200/80` and `border-zinc-800/80`), monospace metadata chips, and quiet focus states.
4. **URL Routing**: Align hash routing to `#{courseId}/{term}/{tool}` (e.g., `#mobcom/midterm/cheatsheet`).

## Consequences
- Deepens navigation predictability: students immediately see the exam term and tool they are studying.
- Eliminates page context resets when switching subjects or exams.
- Requires structuring course datasets by Term Scope (`prelim`, `midterm`, `final`) so study tools filter content cleanly without cluttering the screen.
