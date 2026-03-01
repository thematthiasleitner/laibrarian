# Obsidian Plugin Spec

## 1. Problem and target user

- Problem statement: Users need a fast way to summarize or synthesize multiple vault notes with an LLM without manually copying note content into external tools.
- Primary user: Obsidian users who curate knowledge across many markdown files and want AI-assisted summarization and idea discovery.
- Why existing Obsidian workflows are insufficient: Manual copy/paste and one-off prompts are slow, inconsistent, and do not preserve reusable prompt styles for recurring workflows.

## 2. Outcome and success criteria

- Desired outcome: A plugin command flow that lets users pick vault markdown files, apply a selected preset assistant prompt, call an LLM API, and save generated markdown results automatically.
- Quantifiable success metric: User can generate a markdown output file from selected notes in under 60 seconds once settings are configured.
- Non-functional expectations (speed, reliability, UX quality):
  - Calls should fail with clear notices when API settings are missing or request errors occur.
  - Settings should persist across restarts.
  - File selection should remain usable on large vaults via search and grouped display.

## 3. Scope split

- MVP:
  - Provider settings with the same 7-provider set as Note TTS Audio (OpenAI, Gemini, Google Cloud, Azure, ElevenLabs, AWS Polly, OpenAI Compatible).
  - Per-provider API key/model settings and provider-specific endpoint settings where required.
  - Multi-file markdown selection modal across whole vault.
  - Predefined prompt presets with editable prompt text.
  - Command for selected-note summarization to configured output folder.
  - Command for active-note summarization that writes sibling file with preset suffix.
- vNext:
  - Provider model list discovery/refresh flows.
  - Token-count estimation and automatic chunking.
  - Optional streaming response UI.
  - Preset CRUD with user-defined presets.
- Out of scope:
  - Marketplace publishing workflow.
  - Non-markdown sources (PDF parsing, images, attachments).
  - Retrieval-augmented search/vector indexing.

## 4. Functional slices

- Command surface:
  - `Summarize selected markdown notes`
  - `Summarize current note with prompt preset`
- Settings surface:
  - Provider dropdown (7 options) with provider-specific settings sections (matching Note TTS Audio style).
  - Per-provider API key/model and provider-specific base URL fields where needed.
  - Temperature, output folder, max chars/file.
  - Default preset selection and editable built-in preset prompts.
  - Reset prompt presets action.
- View/modal/ribbon surface:
  - Vault file picker modal with search, select visible, clear visible, grouped folders, preset dropdown.
  - Preset suggest modal for active-file command.
- Vault/file operations:
  - Read selected markdown files via `vault.cachedRead`.
  - Create output folders when needed.
  - Create unique output files to avoid collisions.
- Background/event behavior:
  - No background timers/listeners.
  - Command-driven only.

## 5. Data model

- Settings schema:
  - `provider`, provider-specific credentials/model fields, `outputFolder`, `defaultPresetId`, `temperature`, `maxCharsPerFile`, `promptPresets[]`.
- Defaults:
  - Four built-in presets: TTS fluid summary, bullet summary, interesting links, exploration ideas.
  - Default output folder `AI Summaries`.
  - Default provider `OpenAI` and default model `gpt-4o-mini`.
- Migration strategy:
  - Merge loaded presets with default preset IDs to absorb future preset additions.
  - Fallback to first available preset if configured default preset no longer exists.

## 6. Platform assumptions

- Desktop support: Yes.
- Mobile support: Yes (no Node-only runtime APIs used by feature logic).
- `isDesktopOnly` value: `false`.

## 7. Acceptance checks

- [x] Check 1 (observable behavior): Running `Summarize selected markdown notes` opens a modal listing vault markdown files, allows selection/search, and lets user choose a prompt preset.
- [x] Check 2 (observable behavior): After selecting files, plugin sends content to configured LLM endpoint and creates a markdown result in configured output folder.
- [x] Check 3 (observable behavior): Running `Summarize current note with prompt preset` creates a sibling markdown file named `<active file basename> - <preset suffix>.md`.
- [x] Failure-mode check: Missing provider API key/base URL/model or request failures show clear user notices and do not create partial files.

## 8. Risk register

- Risk: API compatibility differences across OpenAI-compatible providers.
- Impact: Some providers may reject payload or return non-standard response fields.
- Mitigation: Keep configurable base URL/model and defensive response parsing with explicit error notices.

- Risk: Large note payloads exceed token limits.
- Impact: Request failures or degraded output quality.
- Mitigation: Configurable truncation (`maxCharsPerFile`) per input note.
