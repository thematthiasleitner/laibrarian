# laibrarian

Generate markdown summaries from selected Obsidian notes using multiple configurable AI providers.

## Features

- Select any number of markdown files from a vault-wide picker modal.
- Send selected notes to an LLM and save the output into a configured folder.
- Send only the currently open note with a selected preset and create a sibling output file.
- Provider selector with the same 7-provider set as Note TTS Audio:
  - OpenAI
  - Google Gemini
  - Google Cloud Vertex AI
  - Azure OpenAI
  - ElevenLabs (provider slot included for parity; not yet implemented as direct chat-completions backend)
  - AWS Bedrock (provider slot uses the legacy internal ID `aws-polly` for compatibility)
  - OpenAI Compatible
- Built-in prompt presets (editable in settings):
  - TTS fluid summary
  - Bullet summary
  - Interesting links
  - Exploration ideas

## Commands

- `Summarize selected markdown notes`
- `Summarize current note with prompt preset`

## Provider settings (summary)

- OpenAI: API key + model
- Gemini (AI Studio): API key + model (endpoint preconfigured)
- Google Cloud Vertex AI: OAuth access token + project ID + location + model (endpoint auto-built; optional override)
- Azure OpenAI: API key + resource endpoint + deployment ID + API version (full endpoint also supported)
- AWS Bedrock: API key + region + model (endpoint auto-built; optional override)
- ElevenLabs: docs links and guidance only for now (no direct summarization backend yet)
- OpenAI Compatible: API key (optional for localhost) + base URL + model

## Output behavior

- Multi-file command writes to `Output folder for vault summaries`.
- Active-file command writes next to the source note as:
  - `<original basename> - <preset suffix>.md`

## Community submission disclosures

- This plugin sends note content to the selected third-party AI provider over the network.
- Using this plugin generally requires provider accounts and API keys, and provider billing may apply.
- API keys are stored locally in Obsidian plugin data (`data.json`). Do not commit that file.
- The plugin includes no telemetry, ads, or self-update mechanism.

## Acknowledgements and inspirations

This plugin takes inspiration from community work that is directly relevant to multi-provider summarization workflows:

- `ai-providers` / `local-gpt` by Pavel Frankov for multi-provider settings architecture.
- `scribe` by Mike Alicea for structured transformation/summarization workflow framing.

Credit where due:

- Matthias provided the product vision, selected scope, and performed iterative testing/validation.
- Codex implemented most of the code and release preparation steps under Matthias's direction.

## Build

```bash
npm ci
npm run build
```

## Release

- GitHub Actions release workflow: `.github/workflows/release.yml`
- Required release assets: `main.js`, `manifest.json`, and `styles.css`
- Git tag must match `manifest.json.version` exactly (no `v` prefix)
