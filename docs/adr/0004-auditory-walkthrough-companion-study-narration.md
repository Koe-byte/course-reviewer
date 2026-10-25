# 0004-auditory-walkthrough-companion-study-narration.md

## Context
Students studying for major examinations frequently experience screen fatigue or need to review material during passive periods (commuting on public transit, resting in bed, or walking). Active review tools (Flashcards, Mock Exams) require constant manual screen interaction and visual attention. Furthermore, conventional robotic text-to-speech (Web Speech API) lacks natural phrasing and warmth, while third-party voice conversion models (RVC) often introduce metallic distortion and robotic artifacts.

## Decision
1. **Auditory Walkthrough as 5th Core Study Tool**:
   - Establish `Auditory Walkthrough` as a primary tool alongside `Cheat Sheet`, `Flashcards`, `Mock Exam`, and `Guide Questions` across all Course Term Exam Scopes.
   - Integrate a dedicated 5th item into the mobile `Bottom Control Dock` and desktop tool header.

2. **Offline Pre-Rendered Companion Study Narration**:
   - Pre-synthesize high-fidelity 48kHz audio assets using **LuxTTS** in Google Colab, leveraging pristine English studio reference audio of **Cyrene** (*Honkai: Star Rail*, CV: Aiden Dawn).
   - Format raw Cheat Sheet units into a soothing, conversational "study companion / ASMR tutor" dialogue (*"Let's review Unit 1 together..."*).
   - Bundle tracks at the unit level (4–7 minutes per continuous track) with embedded concept timestamp bookmarks for granular navigation.
   - Host lightweight compressed audio files locally within `audio/<course_id>/<term_scope>/unit_<id>.mp3`.

3. **Background Ergonomics & Mobile Controls**:
   - Implement the web **Media Session API** (`navigator.mediaSession`) to support lock-screen playback metadata, track progression, and hardware earbud button controls (play/pause/skip).
   - Provide a persistent **Mini-Player Bar** docked above the mobile Bottom Control Dock, enabling continuous background listening while navigating through Cheat Sheets or Flashcards.
   - Provide an expanded full-screen player view with scrub bar, speed adjustment (`0.8×`, `1.0×`, `1.2×`, `1.5×`), transcript display, and interactive chapter bookmarks.

## Consequences
- Enables distraction-free, eyes-free passive review during transit and rest without mobile data reliance.
- Completely avoids background JavaScript throttling issues on locked iOS/Android devices by using native HTML5 audio stream playback with Media Session API hooks.
- Preserves Cyrene's gentle, comforting vocal identity without client-side compute overhead.
- Requires batch-generating audio files and defining audio manifest entries in course dataset files (`data-*.js`).
