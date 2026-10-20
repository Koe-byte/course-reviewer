# 0003-mock-exam-think-first-hint-cooldown-and-shuffled-retries.md

## Context
In mock examination practice, users identified two key learning pitfalls:
1. Memorizing questions by fixed sequence rather than understanding concepts.
2. Immediately checking hints or answers without engaging in active recall.

## Decision
1. **Dynamic Question Shuffling**:
   - Every retry/restart dynamically re-orders questions using a Fisher-Yates algorithm.
   - Dual retry modes: `Retry All (Shuffled)` and `Drill Missed Only (Shuffled)`.
2. **10-Second "Think First" Cooldown**:
   - The `Show Hint` action is locked behind a 10-second countdown with an animated fill-up progress bar (`0% ➔ 100%`).
   - Located below the answer choices in the mobile thumb zone.
   - The cooldown resets on each visit to an unanswered question, ensuring the student reflects before seeking assistance.
   - Tapping the unlocked button displays a concise conceptual clue without modifying or removing options.
   - Answering the question hides the hint and presents the full rationale.

## Consequences
- Reinforces retrieval practice and prevents reflex reliance on hints.
- Shuffled retries prevent positional memorization during cramming sessions.
- Requires stateful tracking of cooldown timers and active question subsets in the module controller.
