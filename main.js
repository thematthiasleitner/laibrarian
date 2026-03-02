/* eslint-disable */
module.exports = require('obsidian');

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => VaultAiSummarizerPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var PROVIDER_IDS = [
  "openai",
  "anthropic",
  "gemini",
  "google-cloud",
  "azure",
  "elevenlabs",
  "aws-polly",
  "openai-compatible"
];
var PROVIDER_LABELS = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  gemini: "Google Gemini",
  "google-cloud": "Google Cloud Vertex AI",
  azure: "Azure OpenAI",
  elevenlabs: "ElevenLabs (Agents)",
  "aws-polly": "AWS Bedrock",
  "openai-compatible": "OpenAI Compatible"
};
var PROVIDER_DOCS = {
  openai: {
    label: "OpenAI",
    apiDocsUrl: "https://platform.openai.com/docs/api-reference/chat/create",
    modelDocsUrl: "https://platform.openai.com/docs/models"
  },
  anthropic: {
    label: "Anthropic",
    apiDocsUrl: "https://docs.anthropic.com/en/api/messages",
    modelDocsUrl: "https://docs.anthropic.com/en/docs/about-claude/models/overview"
  },
  gemini: {
    label: "Google Gemini",
    apiDocsUrl: "https://ai.google.dev/gemini-api/docs/openai",
    modelDocsUrl: "https://ai.google.dev/gemini-api/docs/models"
  },
  "google-cloud": {
    label: "Google Cloud Vertex AI",
    apiDocsUrl: "https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/call-vertex-using-openai-library",
    modelDocsUrl: "https://cloud.google.com/vertex-ai/generative-ai/docs/models"
  },
  azure: {
    label: "Azure OpenAI",
    apiDocsUrl: "https://learn.microsoft.com/azure/ai-services/openai/reference",
    modelDocsUrl: "https://learn.microsoft.com/azure/ai-services/openai/concepts/models"
  },
  elevenlabs: {
    label: "ElevenLabs Agents / LLM",
    apiDocsUrl: "https://elevenlabs.io/docs/api-reference/introduction",
    modelDocsUrl: "https://elevenlabs.io/docs/eleven-agents/customization/llm"
  },
  "aws-polly": {
    label: "AWS Bedrock",
    apiDocsUrl: "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-chat-completions.html",
    modelDocsUrl: "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"
  },
  "openai-compatible": {
    label: "OpenAI Compatible API",
    apiDocsUrl: "https://platform.openai.com/docs/api-reference/chat/create",
    modelDocsUrl: "https://platform.openai.com/docs/models"
  }
};
var OPENAI_BASE_URL = "https://api.openai.com/v1";
var ANTHROPIC_BASE_URL = "https://api.anthropic.com/v1";
var ANTHROPIC_API_VERSION = "2023-06-01";
var GEMINI_OPENAI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai";
var DATE_FIELD_FILTER_OPTIONS = [
  { id: "created", label: "Date created" },
  { id: "modified", label: "Date modified" }
];
var RELATIVE_DATE_UNIT_OPTIONS = [
  { id: "hour", label: "Hours" },
  { id: "day", label: "Days" },
  { id: "month", label: "Months" },
  { id: "year", label: "Years" }
];
var OUTPUT_FILENAME_BLOCK_OPTIONS = [
  { id: "date_created", label: "Date of creation", description: "Add the output creation date." },
  { id: "prompt_choice", label: "Prompt choice", description: "Add the selected prompt identifier." },
  { id: "time_created", label: "Time of creation", description: "Add the output creation time." },
  { id: "time_filter", label: "Time filter", description: "Add the active time-filter window, if set." },
  { id: "search_string", label: "Search string", description: "Add the active search query, if set." }
];
var OUTPUT_FILENAME_DEFAULT_ORDER = [
  "date_created",
  "prompt_choice",
  "time_created",
  "time_filter",
  "search_string"
];
var OUTPUT_FILENAME_BLOCK_ID_SET = new Set(
  OUTPUT_FILENAME_BLOCK_OPTIONS.map((option) => option.id)
);
var DEFAULT_PRESETS = [
  {
    id: "tts_fluid",
    name: "TTS fluid summary",
    suffix: "tts-fluid",
    prompt: `You are a high-quality editorial assistant specializing in transforming dense or complex texts into fluid spoken-word summaries optimized for text-to-speech playback. Your task is to preserve as much of the original information, nuance, and factual content as possible while presenting it in continuous, natural prose that is easy to follow when heard aloud.

Write only in coherent paragraphs with smooth transitions between ideas. Do not use bullet points, numbered lists, tables, headings, or visual formatting cues. Avoid referencing the structure of the original text explicitly. Instead, reorganize the material into a logically flowing narrative that maintains all key arguments, data points, definitions, names, dates, examples, and conclusions.

Prioritize clarity without oversimplifying. Technical terms should be briefly explained in plain language when necessary, but do not remove precision. If the original text contains statistics, mechanisms, comparisons, or layered reasoning, retain them and weave them seamlessly into the spoken narrative. Ensure that causal relationships, contrasts, and sequences remain explicit so that a listener can reconstruct the structure of the original argument.

Use natural phrasing suited for audio delivery, varying sentence rhythm to avoid monotony. Replace visual cues with verbal transitions that guide the listener through shifts in topic or emphasis. Maintain an engaging but neutral tone, avoiding filler phrases or rhetorical flourishes that add length without adding information.

The goal is not to shorten aggressively, but to reformat cognitively dense material into an easily digestible spoken format while preserving maximum informational fidelity.`
  },
  {
    id: "bullet_summary",
    name: "Bullet summary",
    suffix: "bullets",
    prompt: `You are a high-quality analytical summarizer. Produce a rigorous markdown bullet summary that preserves maximum factual fidelity while remaining scannable.

Capture the full substance of the source material, including important definitions, names, dates, numbers, mechanisms, comparisons, dependencies, and conclusions. Do not flatten nuanced arguments into vague bullets.

Use the following section headings in this exact order:
## Core topics
## Key facts and claims
## Evidence and data
## Reasoning and causal links
## Open questions and uncertainties
## Actionable next steps

Within each section, use concise bullets with one primary idea per bullet. Keep wording precise and non-redundant. If a point is uncertain, contested, or inferred, label it explicitly. Do not invent facts not present in the source notes.`
  },
  {
    id: "interesting_links",
    name: "Interesting links",
    suffix: "links",
    prompt: `You are a high-quality cross-note synthesis assistant. Identify meaningful and non-obvious links across the provided notes.

Focus on relationships that improve understanding: reinforcing evidence, contradictions, shared assumptions, causal chains, repeated motifs, and concept transfers between contexts. Preserve specific entities, dates, and factual anchors so each link is traceable.

Output markdown using these sections in order:
## Strong links
## Tensions and contradictions
## Recurring patterns
## Candidate synthesis notes

For each link bullet, reference the involved source notes using wikilinks and explain why the connection matters. In "Candidate synthesis notes", propose concrete note titles and a one-sentence scope for each. Avoid superficial associations.`
  },
  {
    id: "exploration_ideas",
    name: "Exploration ideas",
    suffix: "explore",
    prompt: `You are a high-quality strategic research assistant. Propose additional information to explore based on the provided notes, while staying grounded in what is already known.

Identify the most valuable next avenues: missing evidence, unresolved assumptions, edge cases, comparative baselines, and practical experiments that would reduce uncertainty or unlock better decisions.

Output markdown with these sections in order:
## High-value exploration targets
## Suggested references or sources to seek
## Experiments or validation steps

For every bullet include:
- Why this matters now
- What specific question it answers
- A concrete first step

Prioritize depth and relevance over quantity. Do not repeat ideas already covered by the notes unless proposing a materially new angle.`
  }
];
var DEFAULT_SETTINGS = {
  provider: "openai",
  outputFolder: "AI Summaries",
  outputFilenameElements: createDefaultOutputFilenameElements(),
  defaultPresetId: DEFAULT_PRESETS[0].id,
  temperature: 0.2,
  promptPresets: DEFAULT_PRESETS.map(clonePreset),
  removedDefaultPresetIds: [],
  openaiApiKey: "",
  openaiModel: "gpt-4o-mini",
  anthropicApiKey: "",
  anthropicModel: "claude-sonnet-4-0",
  geminiApiKey: "",
  geminiModel: "gemini-2.5-flash",
  googleCloudApiKey: "",
  googleCloudProjectId: "",
  googleCloudLocation: "global",
  googleCloudBaseUrl: "",
  googleCloudModel: "google/gemini-2.5-flash",
  azureApiKey: "",
  azureBaseUrl: "",
  azureDeploymentId: "",
  azureApiVersion: "2024-10-21",
  azureModel: "",
  elevenlabsApiKey: "",
  elevenlabsBaseUrl: "",
  elevenlabsModel: "",
  awsApiKey: "",
  awsBaseUrl: "",
  awsRegion: "us-west-2",
  awsModel: "openai.gpt-oss-20b-1:0",
  openaiCompatApiKey: "",
  openaiCompatBaseUrl: "",
  openaiCompatModel: ""
};
function clonePreset(preset) {
  return {
    id: preset.id,
    name: preset.name,
    suffix: preset.suffix,
    prompt: preset.prompt
  };
}
function slugify(value) {
  const base = value.toLowerCase().trim().replace(/[^a-z0-9\-\s_]/g, "").replace(/\s+/g, "-").replace(/_+/g, "-").replace(/-+/g, "-");
  return base || "result";
}
function createOutputFilenameElement(kind, input = {}) {
  var _a, _b, _c, _d;
  return {
    id: ((_a = input.id) == null ? void 0 : _a.trim()) || `filename-part-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    kind,
    enabled: (_b = input.enabled) != null ? _b : true,
    customText: kind === "custom_text" ? (_d = (_c = input.customText) == null ? void 0 : _c.trim()) != null ? _d : "" : void 0
  };
}
function createDefaultOutputFilenameElements() {
  return OUTPUT_FILENAME_DEFAULT_ORDER.map(
    (kind) => createOutputFilenameElement(kind, {
      enabled: kind === "date_created" || kind === "prompt_choice" || kind === "time_created"
    })
  );
}
var VaultAiSummarizerPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.modelCache = {};
  }
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new VaultAiSummarizerSettingTab(this.app, this));
    this.addRibbonIcon("file-text", "Summarize notes", () => {
      void this.openLauncherFromRibbon();
    });
    this.addCommand({
      id: "summarize-selected-notes",
      name: "Summarize selected Markdown notes",
      callback: async () => {
        await this.runVaultSummaryFlow();
      }
    });
    this.addCommand({
      id: "summarize-active-note",
      name: "Summarize current note with prompt preset",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        const canRun = Boolean(file && file.extension === "md");
        if (canRun && !checking && file instanceof import_obsidian.TFile) {
          void this.runActiveFileFlow(file);
        }
        return canRun;
      }
    });
  }
  async loadSettings() {
    var _a;
    const loaded = await this.loadData();
    const candidate = loaded != null ? loaded : {};
    this.settings = Object.assign({}, DEFAULT_SETTINGS, candidate);
    let removedDefaultPresetIds = this.normalizeRemovedDefaultPresetIds(candidate.removedDefaultPresetIds);
    let mergedPresets = this.mergePromptPresets((_a = candidate.promptPresets) != null ? _a : [], removedDefaultPresetIds);
    if (!mergedPresets.length) {
      const fallbackPreset = clonePreset(DEFAULT_PRESETS[0]);
      mergedPresets = [fallbackPreset];
      removedDefaultPresetIds = removedDefaultPresetIds.filter((id) => id !== fallbackPreset.id);
    }
    const requestedDefaultPresetId = typeof candidate.defaultPresetId === "string" ? candidate.defaultPresetId : "";
    const defaultPresetExists = mergedPresets.some((preset) => preset.id === requestedDefaultPresetId);
    this.settings.provider = this.normalizeProviderId(candidate.provider);
    this.settings.promptPresets = mergedPresets;
    this.settings.removedDefaultPresetIds = removedDefaultPresetIds;
    this.settings.defaultPresetId = defaultPresetExists ? requestedDefaultPresetId : mergedPresets[0].id;
    this.settings.outputFilenameElements = this.normalizeOutputFilenameElements(
      candidate.outputFilenameElements,
      candidate.outputFilenameBlocks
    );
    this.migrateLegacyProviderConnectionSettings(candidate);
    this.normalizeProviderSettings();
    this.settings.outputFolder = this.settings.outputFolder.trim() || DEFAULT_SETTINGS.outputFolder;
    this.settings.temperature = Number.isFinite(candidate.temperature) ? clampNumber(candidate.temperature, 0, 2) : DEFAULT_SETTINGS.temperature;
    await this.saveSettings();
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  getProviderDocs(provider) {
    return PROVIDER_DOCS[provider];
  }
  getCachedProviderModels(provider) {
    var _a;
    return [...(_a = this.modelCache[provider]) != null ? _a : []];
  }
  async refreshProviderModels(provider) {
    let models = [];
    switch (provider) {
      case "openai":
        models = await this.fetchOpenAiLikeModels({
          apiKey: this.settings.openaiApiKey,
          baseUrl: OPENAI_BASE_URL
        });
        break;
      case "anthropic":
        models = await this.fetchAnthropicModels(this.settings.anthropicApiKey);
        break;
      case "gemini":
        models = await this.fetchGeminiModels(this.settings.geminiApiKey);
        break;
      case "google-cloud": {
        const projectId = this.settings.googleCloudProjectId.trim();
        const location = this.settings.googleCloudLocation.trim() || DEFAULT_SETTINGS.googleCloudLocation;
        const baseUrlOverride = this.trimTrailingSlash(this.settings.googleCloudBaseUrl.trim());
        if (!baseUrlOverride && !projectId) {
          throw new Error("Google Cloud project ID is required unless you provide an endpoint override.");
        }
        const baseUrl = baseUrlOverride || this.buildVertexOpenAiBaseUrl(projectId, location);
        models = await this.fetchOpenAiLikeModels({
          apiKey: this.settings.googleCloudApiKey,
          baseUrl
        });
        break;
      }
      case "aws-polly": {
        const region = this.settings.awsRegion.trim() || DEFAULT_SETTINGS.awsRegion;
        const baseUrl = this.trimTrailingSlash(this.settings.awsBaseUrl.trim()) || `https://bedrock-runtime.${region}.amazonaws.com/openai/v1`;
        models = await this.fetchOpenAiLikeModels({
          apiKey: this.settings.awsApiKey,
          baseUrl
        });
        break;
      }
      case "openai-compatible":
        models = await this.fetchOpenAiLikeModels({
          apiKey: this.settings.openaiCompatApiKey,
          baseUrl: this.settings.openaiCompatBaseUrl,
          allowMissingApiKeyForLocal: true
        });
        break;
    }
    this.modelCache[provider] = models;
    return [...models];
  }
  async fetchOpenAiLikeModels(input) {
    var _a, _b, _c, _d;
    const apiKey = input.apiKey.trim();
    const baseUrl = this.trimTrailingSlash(input.baseUrl.trim());
    if (!baseUrl) {
      throw new Error("Base URL is required.");
    }
    if (!apiKey && !(input.allowMissingApiKeyForLocal && this.isLikelyLocalEndpoint(baseUrl))) {
      throw new Error("API key is required.");
    }
    const headers = {};
    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`;
    }
    let response;
    try {
      response = await (0, import_obsidian.requestUrl)({
        url: `${baseUrl}/models`,
        method: "GET",
        headers
      });
    } catch (error) {
      throw new Error(`Model list request failed: ${this.humanizeError(error)}`);
    }
    if (response.status < 200 || response.status >= 300) {
      throw new Error(this.buildModelListError(response.status, response.json, response.text));
    }
    const payload = (_a = response.json) != null ? _a : {};
    const deduped = /* @__PURE__ */ new Set();
    for (const item of (_b = payload.data) != null ? _b : []) {
      const model = (_d = (_c = item.id) == null ? void 0 : _c.trim()) != null ? _d : "";
      if (model) {
        deduped.add(model);
      }
    }
    return Array.from(deduped.values()).sort((a, b) => a.localeCompare(b));
  }
  async fetchAnthropicModels(apiKeyRaw) {
    var _a, _b, _c, _d;
    const apiKey = apiKeyRaw.trim();
    if (!apiKey) {
      throw new Error("Anthropic API key is required.");
    }
    let response;
    try {
      response = await (0, import_obsidian.requestUrl)({
        url: `${ANTHROPIC_BASE_URL}/models`,
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": ANTHROPIC_API_VERSION
        }
      });
    } catch (error) {
      throw new Error(`Anthropic model list request failed: ${this.humanizeError(error)}`);
    }
    if (response.status < 200 || response.status >= 300) {
      throw new Error(this.buildModelListError(response.status, response.json, response.text));
    }
    const payload = (_a = response.json) != null ? _a : {};
    const deduped = /* @__PURE__ */ new Set();
    for (const model of (_b = payload.data) != null ? _b : []) {
      const id = (_d = (_c = model.id) == null ? void 0 : _c.trim()) != null ? _d : "";
      if (id) {
        deduped.add(id);
      }
    }
    return Array.from(deduped.values()).sort((a, b) => a.localeCompare(b));
  }
  async fetchGeminiModels(apiKeyRaw) {
    var _a, _b, _c, _d, _e;
    const apiKey = apiKeyRaw.trim();
    if (!apiKey) {
      throw new Error("Google Gemini API key is required.");
    }
    const collected = /* @__PURE__ */ new Set();
    let pageToken = "";
    while (true) {
      const url = new URL("https://generativelanguage.googleapis.com/v1beta/models");
      if (pageToken) {
        url.searchParams.set("pageToken", pageToken);
      }
      let response;
      try {
        response = await (0, import_obsidian.requestUrl)({
          url: url.toString(),
          method: "GET",
          headers: {
            "x-goog-api-key": apiKey
          }
        });
      } catch (error) {
        throw new Error(`Gemini model list request failed: ${this.humanizeError(error)}`);
      }
      if (response.status < 200 || response.status >= 300) {
        throw new Error(this.buildModelListError(response.status, response.json, response.text));
      }
      const payload = (_a = response.json) != null ? _a : {};
      for (const modelEntry of (_b = payload.models) != null ? _b : []) {
        const rawName = (_d = (_c = modelEntry.name) == null ? void 0 : _c.trim()) != null ? _d : "";
        if (!rawName.startsWith("models/")) {
          continue;
        }
        const model = rawName.replace(/^models\//, "");
        const methods = (_e = modelEntry.supportedGenerationMethods) != null ? _e : [];
        if (!methods.includes("generateContent")) {
          continue;
        }
        if (model.toLowerCase().includes("embedding")) {
          continue;
        }
        collected.add(model);
      }
      if (!payload.nextPageToken) {
        break;
      }
      pageToken = payload.nextPageToken;
    }
    return Array.from(collected.values()).sort((a, b) => a.localeCompare(b));
  }
  buildModelListError(status, payload, rawText) {
    var _a;
    const body = payload != null ? payload : {};
    const nestedError = typeof body.error === "string" ? body.error : typeof body.error === "object" && body.error !== null ? body.error.message : void 0;
    const message = (typeof nestedError === "string" ? nestedError : "") || (typeof body.message === "string" ? body.message : "") || ((_a = rawText == null ? void 0 : rawText.trim().slice(0, 300)) != null ? _a : "");
    return message ? `HTTP ${status}: ${message}` : `HTTP ${status}`;
  }
  async openLauncherFromRibbon() {
    const option = await this.openLaunchActionPicker();
    if (!option) {
      return;
    }
    if (option.id === "active") {
      const activeFile = this.app.workspace.getActiveFile();
      if (!activeFile || activeFile.extension !== "md") {
        new import_obsidian.Notice("Open a Markdown note first.");
        return;
      }
      await this.runActiveFileFlow(activeFile);
      return;
    }
    await this.runVaultSummaryFlow();
  }
  async openLaunchActionPicker() {
    const activeFile = this.app.workspace.getActiveFile();
    const activeMd = activeFile && activeFile.extension === "md" ? activeFile : null;
    const options = [
      {
        id: "active",
        title: "Summarize current note",
        description: activeMd ? activeMd.path : "No active markdown note open"
      },
      {
        id: "vault",
        title: "Summarize selected notes",
        description: "Open the multi-file vault picker and choose several notes"
      }
    ];
    return await new Promise((resolve) => {
      const modal = new LaunchActionSuggestModal(this.app, options, (selection) => resolve(selection));
      modal.open();
    });
  }
  normalizeProviderId(value) {
    const candidate = typeof value === "string" ? value : "";
    if (PROVIDER_IDS.includes(candidate)) {
      return candidate;
    }
    return DEFAULT_SETTINGS.provider;
  }
  migrateLegacyProviderConnectionSettings(candidate) {
    const hasOwn = (key) => Object.prototype.hasOwnProperty.call(candidate, key);
    const legacyConnections = candidate.providerConnections && typeof candidate.providerConnections === "object" ? candidate.providerConnections : null;
    const fromLegacyConnection = (provider, key) => {
      if (!legacyConnections) return "";
      const providerConnection = legacyConnections[provider];
      if (!providerConnection || typeof providerConnection !== "object") return "";
      const raw = providerConnection[key];
      return typeof raw === "string" ? raw.trim() : "";
    };
    const setFromLegacy = (key, legacyValue) => {
      if (!legacyValue) return;
      if (hasOwn(key)) return;
      this.settings[key] = legacyValue;
    };
    setFromLegacy("openaiApiKey", fromLegacyConnection("openai", "apiKey"));
    setFromLegacy("openaiModel", fromLegacyConnection("openai", "model"));
    setFromLegacy("anthropicApiKey", fromLegacyConnection("anthropic", "apiKey"));
    setFromLegacy("anthropicModel", fromLegacyConnection("anthropic", "model"));
    setFromLegacy("geminiApiKey", fromLegacyConnection("gemini", "apiKey"));
    setFromLegacy("geminiModel", fromLegacyConnection("gemini", "model"));
    setFromLegacy("googleCloudApiKey", fromLegacyConnection("google-cloud", "apiKey"));
    setFromLegacy("googleCloudBaseUrl", fromLegacyConnection("google-cloud", "apiBaseUrl"));
    setFromLegacy("googleCloudModel", fromLegacyConnection("google-cloud", "model"));
    setFromLegacy("azureApiKey", fromLegacyConnection("azure", "apiKey"));
    setFromLegacy("azureBaseUrl", fromLegacyConnection("azure", "apiBaseUrl"));
    setFromLegacy("azureModel", fromLegacyConnection("azure", "model"));
    setFromLegacy("elevenlabsApiKey", fromLegacyConnection("elevenlabs", "apiKey"));
    setFromLegacy("elevenlabsBaseUrl", fromLegacyConnection("elevenlabs", "apiBaseUrl"));
    setFromLegacy("elevenlabsModel", fromLegacyConnection("elevenlabs", "model"));
    setFromLegacy("awsApiKey", fromLegacyConnection("aws-polly", "apiKey"));
    setFromLegacy("awsBaseUrl", fromLegacyConnection("aws-polly", "apiBaseUrl"));
    setFromLegacy("awsModel", fromLegacyConnection("aws-polly", "model"));
    setFromLegacy("openaiCompatApiKey", fromLegacyConnection("openai-compatible", "apiKey"));
    setFromLegacy("openaiCompatBaseUrl", fromLegacyConnection("openai-compatible", "apiBaseUrl"));
    setFromLegacy("openaiCompatModel", fromLegacyConnection("openai-compatible", "model"));
    const legacyApiKey = typeof candidate.apiKey === "string" ? candidate.apiKey.trim() : "";
    const legacyApiBaseUrl = typeof candidate.apiBaseUrl === "string" ? candidate.apiBaseUrl.trim() : "";
    const legacyModel = typeof candidate.model === "string" ? candidate.model.trim() : "";
    setFromLegacy("openaiApiKey", legacyApiKey);
    setFromLegacy("openaiModel", legacyModel);
    setFromLegacy("openaiCompatApiKey", legacyApiKey);
    setFromLegacy("openaiCompatBaseUrl", legacyApiBaseUrl);
    setFromLegacy("openaiCompatModel", legacyModel);
  }
  normalizeProviderSettings() {
    this.settings.openaiApiKey = this.settings.openaiApiKey.trim();
    this.settings.openaiModel = this.settings.openaiModel.trim() || DEFAULT_SETTINGS.openaiModel;
    this.settings.anthropicApiKey = this.settings.anthropicApiKey.trim();
    this.settings.anthropicModel = this.settings.anthropicModel.trim() || DEFAULT_SETTINGS.anthropicModel;
    this.settings.geminiApiKey = this.settings.geminiApiKey.trim();
    this.settings.geminiModel = this.settings.geminiModel.trim() || DEFAULT_SETTINGS.geminiModel;
    this.settings.googleCloudApiKey = this.settings.googleCloudApiKey.trim();
    this.settings.googleCloudProjectId = this.settings.googleCloudProjectId.trim();
    this.settings.googleCloudLocation = this.settings.googleCloudLocation.trim() || DEFAULT_SETTINGS.googleCloudLocation;
    this.settings.googleCloudBaseUrl = this.settings.googleCloudBaseUrl.trim();
    this.settings.googleCloudModel = this.settings.googleCloudModel.trim() || DEFAULT_SETTINGS.googleCloudModel;
    this.settings.azureApiKey = this.settings.azureApiKey.trim();
    this.settings.azureBaseUrl = this.settings.azureBaseUrl.trim();
    this.settings.azureDeploymentId = this.settings.azureDeploymentId.trim();
    this.settings.azureApiVersion = this.settings.azureApiVersion.trim() || DEFAULT_SETTINGS.azureApiVersion;
    this.settings.azureModel = this.settings.azureModel.trim();
    this.settings.elevenlabsApiKey = this.settings.elevenlabsApiKey.trim();
    this.settings.elevenlabsBaseUrl = this.settings.elevenlabsBaseUrl.trim();
    this.settings.elevenlabsModel = this.settings.elevenlabsModel.trim();
    this.settings.awsApiKey = this.settings.awsApiKey.trim();
    this.settings.awsBaseUrl = this.settings.awsBaseUrl.trim();
    this.settings.awsRegion = this.settings.awsRegion.trim() || DEFAULT_SETTINGS.awsRegion;
    this.settings.awsModel = this.settings.awsModel.trim() || DEFAULT_SETTINGS.awsModel;
    this.settings.openaiCompatApiKey = this.settings.openaiCompatApiKey.trim();
    this.settings.openaiCompatBaseUrl = this.settings.openaiCompatBaseUrl.trim();
    this.settings.openaiCompatModel = this.settings.openaiCompatModel.trim();
  }
  resolveProvider() {
    switch (this.settings.provider) {
      case "openai":
        return this.resolveOpenAiProvider();
      case "anthropic":
        return this.resolveAnthropicProvider();
      case "gemini":
        return this.resolveGeminiProvider();
      case "google-cloud":
        return this.resolveGoogleCloudProvider();
      case "azure":
        return this.resolveAzureProvider();
      case "elevenlabs":
        return this.resolveElevenLabsProvider();
      case "aws-polly":
        return this.resolveAwsProvider();
      case "openai-compatible":
      default:
        return this.resolveOpenAiCompatibleProvider();
    }
  }
  resolveOpenAiProvider() {
    const apiKey = this.settings.openaiApiKey.trim();
    const model = this.settings.openaiModel.trim();
    if (!apiKey) {
      throw new Error("OpenAI API key is required.");
    }
    if (!model) {
      throw new Error("OpenAI model is required.");
    }
    return {
      id: "openai",
      displayName: PROVIDER_LABELS.openai,
      apiKey,
      baseUrl: OPENAI_BASE_URL,
      model,
      authHeader: "bearer"
    };
  }
  resolveAnthropicProvider() {
    const apiKey = this.settings.anthropicApiKey.trim();
    const model = this.settings.anthropicModel.trim();
    if (!apiKey) {
      throw new Error("Anthropic API key is required.");
    }
    if (!model) {
      throw new Error("Anthropic model is required.");
    }
    return {
      id: "anthropic",
      displayName: PROVIDER_LABELS.anthropic,
      apiKey,
      baseUrl: ANTHROPIC_BASE_URL,
      model,
      authHeader: "x-api-key"
    };
  }
  resolveGeminiProvider() {
    const apiKey = this.settings.geminiApiKey.trim();
    const model = this.settings.geminiModel.trim();
    if (!apiKey) {
      throw new Error("Gemini API key is required.");
    }
    if (!apiKey.startsWith("AIza") || /[\s[\]]/.test(apiKey)) {
      throw new Error("Gemini API key looks invalid. Paste the raw AI Studio key (usually starts with AIza).");
    }
    if (!model) {
      throw new Error("Gemini model is required.");
    }
    return {
      id: "gemini",
      displayName: PROVIDER_LABELS.gemini,
      apiKey,
      baseUrl: GEMINI_OPENAI_BASE_URL,
      model,
      authHeader: "bearer"
    };
  }
  resolveGoogleCloudProvider() {
    const accessToken = this.settings.googleCloudApiKey.trim();
    const projectId = this.settings.googleCloudProjectId.trim();
    const location = this.settings.googleCloudLocation.trim() || DEFAULT_SETTINGS.googleCloudLocation;
    const baseUrlOverride = this.trimTrailingSlash(this.settings.googleCloudBaseUrl.trim());
    const model = this.settings.googleCloudModel.trim();
    if (!accessToken) {
      throw new Error(
        "Google Cloud Vertex AI requires a Google Cloud OAuth access token (for example from `gcloud auth print-access-token`)."
      );
    }
    if (accessToken.startsWith("AIza")) {
      throw new Error(
        "Vertex AI provider expects a Google Cloud OAuth access token, not an AI Studio key (`AIza...`). Use the Gemini provider for AI Studio keys."
      );
    }
    if (!baseUrlOverride && !projectId) {
      throw new Error("Google Cloud project ID is required unless you provide an endpoint override.");
    }
    if (!model) {
      throw new Error("Google Cloud Vertex AI model is required.");
    }
    const baseUrl = baseUrlOverride || this.buildVertexOpenAiBaseUrl(projectId, location);
    return {
      id: "google-cloud",
      displayName: PROVIDER_LABELS["google-cloud"],
      apiKey: accessToken,
      baseUrl,
      model,
      authHeader: "bearer"
    };
  }
  resolveAzureProvider() {
    const apiKey = this.settings.azureApiKey.trim();
    const baseInput = this.settings.azureBaseUrl.trim();
    const deploymentId = this.settings.azureDeploymentId.trim();
    const apiVersion = this.settings.azureApiVersion.trim() || DEFAULT_SETTINGS.azureApiVersion;
    const model = this.settings.azureModel.trim();
    if (!apiKey) {
      throw new Error("Azure OpenAI API key is required.");
    }
    if (!baseInput) {
      throw new Error("Azure resource endpoint is required.");
    }
    const baseUrl = this.buildAzureChatCompletionsBaseUrl(baseInput, deploymentId, apiVersion);
    const usingDeploymentEndpoint = /\/openai\/deployments\//i.test(baseUrl);
    const effectiveModel = model || deploymentId || "azure-deployment";
    if (!usingDeploymentEndpoint && !model) {
      throw new Error(
        "Azure model is required when using a full Azure `/chat/completions` endpoint that is not deployment-specific."
      );
    }
    return {
      id: "azure",
      displayName: PROVIDER_LABELS.azure,
      apiKey,
      baseUrl,
      model: effectiveModel,
      authHeader: "api-key",
      omitModelInBody: usingDeploymentEndpoint
    };
  }
  resolveElevenLabsProvider() {
    throw new Error(
      "ElevenLabs Agents/LLM is not exposed as a drop-in OpenAI `/chat/completions` endpoint for this plugin yet. Use OpenAI, Gemini, Vertex AI, Azure, AWS Bedrock, or OpenAI Compatible."
    );
  }
  resolveAwsProvider() {
    const apiKey = this.settings.awsApiKey.trim();
    const region = this.settings.awsRegion.trim() || DEFAULT_SETTINGS.awsRegion;
    const baseUrlOverride = this.trimTrailingSlash(this.settings.awsBaseUrl.trim());
    const model = this.settings.awsModel.trim();
    if (!apiKey) {
      throw new Error("AWS Bedrock API key is required.");
    }
    if (!model) {
      throw new Error("AWS Bedrock model is required.");
    }
    const baseUrl = baseUrlOverride || `https://bedrock-runtime.${region}.amazonaws.com/openai/v1`;
    return {
      id: "aws-polly",
      displayName: PROVIDER_LABELS["aws-polly"],
      apiKey,
      baseUrl,
      model,
      authHeader: "bearer"
    };
  }
  resolveOpenAiCompatibleProvider() {
    const apiKey = this.settings.openaiCompatApiKey.trim();
    const baseUrl = this.trimTrailingSlash(this.settings.openaiCompatBaseUrl.trim());
    const model = this.settings.openaiCompatModel.trim();
    if (!baseUrl) {
      throw new Error("OpenAI-compatible base URL is required.");
    }
    if (!model) {
      throw new Error("OpenAI-compatible model is required.");
    }
    if (!apiKey && !this.isLikelyLocalEndpoint(baseUrl)) {
      throw new Error("OpenAI-compatible API key is required.");
    }
    return {
      id: "openai-compatible",
      displayName: PROVIDER_LABELS["openai-compatible"],
      apiKey,
      baseUrl,
      model,
      authHeader: "bearer"
    };
  }
  normalizeRemovedDefaultPresetIds(value) {
    const defaultIds = new Set(DEFAULT_PRESETS.map((preset) => preset.id));
    if (!Array.isArray(value)) {
      return [];
    }
    const deduped = /* @__PURE__ */ new Set();
    for (const candidate of value) {
      if (typeof candidate !== "string") continue;
      const id = candidate.trim();
      if (!id || !defaultIds.has(id)) continue;
      deduped.add(id);
    }
    return Array.from(deduped.values());
  }
  mergePromptPresets(savedPresets, removedDefaultPresetIds) {
    var _a, _b, _c;
    const byId = /* @__PURE__ */ new Map();
    for (const preset of savedPresets) {
      if (!(preset == null ? void 0 : preset.id)) continue;
      byId.set(preset.id, {
        id: preset.id,
        name: preset.name || preset.id,
        suffix: preset.suffix || preset.name || preset.id,
        prompt: preset.prompt || ""
      });
    }
    const merged = [];
    const removedDefaults = new Set(removedDefaultPresetIds);
    const defaultIds = new Set(DEFAULT_PRESETS.map((preset) => preset.id));
    for (const preset of DEFAULT_PRESETS) {
      if (removedDefaults.has(preset.id)) {
        continue;
      }
      const existing = byId.get(preset.id);
      merged.push({
        id: preset.id,
        name: ((_a = existing == null ? void 0 : existing.name) == null ? void 0 : _a.trim()) || preset.name,
        suffix: slugify(((_b = existing == null ? void 0 : existing.suffix) == null ? void 0 : _b.trim()) || preset.suffix),
        prompt: ((_c = existing == null ? void 0 : existing.prompt) == null ? void 0 : _c.trim()) || preset.prompt
      });
    }
    for (const preset of byId.values()) {
      if (defaultIds.has(preset.id)) continue;
      merged.push({
        id: preset.id,
        name: preset.name,
        suffix: slugify(preset.suffix),
        prompt: preset.prompt
      });
    }
    return merged;
  }
  normalizeOutputFilenameElements(value, legacyValue) {
    var _a;
    const normalized = [];
    const usedIds = /* @__PURE__ */ new Set();
    const parseKind = (raw) => {
      if (raw === "custom_text") {
        return "custom_text";
      }
      if (typeof raw === "string" && OUTPUT_FILENAME_BLOCK_ID_SET.has(raw)) {
        return raw;
      }
      return null;
    };
    const ensureUniqueId = (preferredId) => {
      const fallback = `filename-part-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
      const base = (preferredId == null ? void 0 : preferredId.trim()) || fallback;
      let candidate = base;
      let index = 2;
      while (usedIds.has(candidate)) {
        candidate = `${base}-${index}`;
        index += 1;
      }
      usedIds.add(candidate);
      return candidate;
    };
    const pushElement = (element) => {
      var _a2, _b;
      normalized.push({
        ...element,
        id: ensureUniqueId(element.id),
        customText: element.kind === "custom_text" ? (_b = (_a2 = element.customText) == null ? void 0 : _a2.trim()) != null ? _b : "" : void 0
      });
    };
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (typeof entry === "string") {
          const kind2 = parseKind(entry);
          if (kind2) {
            pushElement(createOutputFilenameElement(kind2, { enabled: true }));
          }
          continue;
        }
        if (!entry || typeof entry !== "object") {
          continue;
        }
        const record = entry;
        const kind = parseKind((_a = record.kind) != null ? _a : record.type);
        if (!kind) {
          continue;
        }
        const enabled = typeof record.enabled === "boolean" ? record.enabled : true;
        const customText = typeof record.customText === "string" ? record.customText : typeof record.value === "string" ? record.value : "";
        const id = typeof record.id === "string" ? record.id : "";
        pushElement(
          createOutputFilenameElement(kind, {
            id,
            enabled,
            customText
          })
        );
      }
    }
    if (!normalized.length && Array.isArray(legacyValue)) {
      for (const entry of legacyValue) {
        if (typeof entry !== "string") continue;
        const kind = parseKind(entry);
        if (!kind || kind === "custom_text") continue;
        pushElement(createOutputFilenameElement(kind, { enabled: true }));
      }
    }
    if (!normalized.length) {
      return createDefaultOutputFilenameElements();
    }
    for (const builtinKind of OUTPUT_FILENAME_DEFAULT_ORDER) {
      const exists = normalized.some((element) => element.kind === builtinKind);
      if (!exists) {
        pushElement(createOutputFilenameElement(builtinKind, { enabled: false }));
      }
    }
    if (!normalized.some((element) => element.enabled)) {
      normalized[0].enabled = true;
    }
    return normalized;
  }
  getPresetById(id) {
    var _a;
    return (_a = this.settings.promptPresets.find((preset) => preset.id === id)) != null ? _a : null;
  }
  async runVaultSummaryFlow() {
    var _a, _b;
    if (!this.ensureConnectionSettings()) {
      return;
    }
    const markdownFiles = this.app.vault.getMarkdownFiles().sort((a, b) => a.path.localeCompare(b.path, void 0, { sensitivity: "base" }));
    if (markdownFiles.length === 0) {
      new import_obsidian.Notice("No Markdown files found in this vault.");
      return;
    }
    const selection = await this.openFileSelectionModal(markdownFiles);
    if (!selection || selection.files.length === 0) {
      return;
    }
    await this.generateFromFiles(selection.files, selection.presetId, "vault", {
      timeFilterWindow: (_a = selection.timeFilterWindow) != null ? _a : null,
      searchString: (_b = selection.searchString) != null ? _b : null
    });
  }
  async runActiveFileFlow(activeFile) {
    if (!this.ensureConnectionSettings()) {
      return;
    }
    const preset = await this.openPresetPicker("Choose a preset for the current note");
    if (!preset) {
      return;
    }
    await this.generateFromFiles([activeFile], preset.id, "active");
  }
  ensureConnectionSettings() {
    if (!this.settings.promptPresets.length) {
      new import_obsidian.Notice("No prompt presets available.");
      return false;
    }
    try {
      this.resolveProvider();
    } catch (error) {
      new import_obsidian.Notice(this.humanizeError(error));
      return false;
    }
    return true;
  }
  async openFileSelectionModal(files) {
    return await new Promise((resolve) => {
      const modal = new VaultFileSelectionModal(
        this.app,
        files,
        this.settings.promptPresets,
        this.settings.defaultPresetId,
        (selection) => resolve(selection)
      );
      modal.open();
    });
  }
  async openPresetPicker(title) {
    return await new Promise((resolve) => {
      const modal = new PromptPresetSuggestModal(this.app, this.settings.promptPresets, title, (preset) => {
        resolve(preset);
      });
      modal.open();
    });
  }
  async generateFromFiles(files, presetId, mode, context = {}) {
    const preset = this.getPresetById(presetId);
    if (!preset) {
      new import_obsidian.Notice("Selected prompt preset was not found.");
      return;
    }
    const provider = this.resolveProvider();
    new import_obsidian.Notice(
      `Sending ${files.length} note(s) to ${provider.displayName} (${provider.model || "unknown model"})...`
    );
    try {
      const filePayload = await this.buildFilePayload(files);
      const userPrompt = this.buildUserPrompt(files, mode, filePayload);
      const llmOutput = await this.requestCompletion(preset.prompt, userPrompt, provider);
      if (!llmOutput.trim()) {
        new import_obsidian.Notice("The model returned an empty response.");
        return;
      }
      if (mode === "vault") {
        const createdPath = await this.writeVaultSummaryFile(files, preset, llmOutput, provider, context);
        new import_obsidian.Notice(`Summary created: ${createdPath}`);
      } else {
        const createdPath = await this.writeActiveFileResult(files[0], preset, llmOutput, provider);
        new import_obsidian.Notice(`Result created: ${createdPath}`);
      }
    } catch (error) {
      console.error("laibrarian failed", error);
      const message = error instanceof Error ? error.message : "Unknown error";
      new import_obsidian.Notice(`Failed to generate summary: ${message}`);
    }
  }
  async buildFilePayload(files) {
    const sections = [];
    for (const file of files) {
      const rawContent = await this.app.vault.cachedRead(file);
      sections.push(`<file path="${file.path}">
${rawContent}
</file>`);
    }
    return sections.join("\n\n");
  }
  buildUserPrompt(files, mode, payload) {
    const fileList = files.map((file) => `- ${file.path}`).join("\n");
    const modeLine = mode === "vault" ? "Task context: multiple selected markdown files from an Obsidian vault." : "Task context: single currently open markdown file from an Obsidian vault.";
    return [
      modeLine,
      `Number of files: ${files.length}`,
      "Source files:",
      fileList,
      "",
      "Use only the information from these files unless the selected prompt explicitly asks for additional suggestions.",
      "",
      "<files>",
      payload,
      "</files>"
    ].join("\n");
  }
  async requestCompletion(systemPrompt, userPrompt, provider) {
    var _a, _b;
    if (provider.id === "anthropic") {
      return await this.requestAnthropicCompletion(systemPrompt, userPrompt, provider);
    }
    const endpoint = this.buildChatCompletionsEndpoint(provider.baseUrl);
    const headers = this.buildAuthHeaders(provider.authHeader, provider.apiKey);
    const body = {
      temperature: this.settings.temperature,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    };
    if (!provider.omitModelInBody) {
      body.model = provider.model.trim();
    }
    let response;
    try {
      response = await (0, import_obsidian.requestUrl)({
        url: endpoint,
        method: "POST",
        headers,
        body: JSON.stringify(body)
      });
    } catch (error) {
      const providerHint = provider.id === "google-cloud" ? " For Vertex AI, use a short-lived Google Cloud OAuth access token and verify project/location." : provider.id === "azure" ? " For Azure, verify resource endpoint, deployment ID, and API version." : provider.id === "aws-polly" ? " For Bedrock, verify region, Bedrock API key, and supported model ID." : provider.id === "anthropic" ? " For Anthropic, verify API key validity and an available model ID from `/v1/models`." : "";
      throw new Error(
        `${provider.displayName} request failed: ${this.humanizeError(error)}. Check API key/token, endpoint, and model for this provider.${providerHint}`
      );
    }
    if (response.status < 200 || response.status >= 300) {
      const raw = ((_a = response.text) == null ? void 0 : _a.trim()) || JSON.stringify((_b = response.json) != null ? _b : {});
      throw new Error(`${provider.displayName} request failed (${response.status}): ${raw.slice(0, 500)}`);
    }
    const text = this.extractTextFromResponse(response.json);
    if (!text) {
      throw new Error("LLM response contained no text.");
    }
    return text.trim();
  }
  async requestAnthropicCompletion(systemPrompt, userPrompt, provider) {
    var _a, _b;
    const endpoint = this.buildAnthropicMessagesEndpoint(provider.baseUrl);
    const headers = this.buildAuthHeaders(provider.authHeader, provider.apiKey);
    headers["anthropic-version"] = ANTHROPIC_API_VERSION;
    const body = {
      model: provider.model.trim(),
      max_tokens: 4096,
      temperature: this.settings.temperature,
      messages: [{ role: "user", content: userPrompt }]
    };
    if (systemPrompt.trim()) {
      body.system = systemPrompt;
    }
    let response;
    try {
      response = await (0, import_obsidian.requestUrl)({
        url: endpoint,
        method: "POST",
        headers,
        body: JSON.stringify(body)
      });
    } catch (error) {
      throw new Error(
        `${provider.displayName} request failed: ${this.humanizeError(error)}. Check API key and model for this provider.`
      );
    }
    if (response.status < 200 || response.status >= 300) {
      const raw = ((_a = response.text) == null ? void 0 : _a.trim()) || JSON.stringify((_b = response.json) != null ? _b : {});
      throw new Error(`${provider.displayName} request failed (${response.status}): ${raw.slice(0, 500)}`);
    }
    const text = this.extractTextFromResponse(response.json);
    if (!text) {
      throw new Error("LLM response contained no text.");
    }
    return text.trim();
  }
  buildChatCompletionsEndpoint(baseUrl) {
    const trimmed = baseUrl.trim();
    if (!trimmed) return "";
    const hasCompletions = /\/chat\/completions(?:\?|$)/.test(trimmed);
    if (hasCompletions) {
      return trimmed;
    }
    const [pathPart, queryPart] = trimmed.split("?", 2);
    const normalizedPath = pathPart.replace(/\/+$/, "");
    const endpoint = `${normalizedPath}/chat/completions`;
    return queryPart ? `${endpoint}?${queryPart}` : endpoint;
  }
  buildAnthropicMessagesEndpoint(baseUrl) {
    const trimmed = baseUrl.trim();
    if (!trimmed) return "";
    const hasMessagesEndpoint = /\/messages(?:\?|$)/.test(trimmed);
    if (hasMessagesEndpoint) {
      return trimmed;
    }
    const [pathPart, queryPart] = trimmed.split("?", 2);
    const normalizedPath = pathPart.replace(/\/+$/, "");
    const endpoint = `${normalizedPath}/messages`;
    return queryPart ? `${endpoint}?${queryPart}` : endpoint;
  }
  buildAuthHeaders(authHeader, apiKey) {
    const headers = {
      "Content-Type": "application/json"
    };
    const key = apiKey.trim();
    if (!key) {
      return headers;
    }
    switch (authHeader) {
      case "bearer":
        headers.Authorization = `Bearer ${key}`;
        break;
      case "x-api-key":
        headers["x-api-key"] = key;
        break;
      case "api-key":
        headers["api-key"] = key;
        break;
      case "x-goog-api-key":
        headers["x-goog-api-key"] = key;
        break;
      case "xi-api-key":
        headers["xi-api-key"] = key;
        break;
    }
    return headers;
  }
  extractTextFromResponse(payload) {
    var _a, _b, _c;
    const asRecord = (v) => typeof v === "object" && v !== null ? v : null;
    const json = asRecord(payload);
    if (!json) return null;
    const choices = Array.isArray(json.choices) ? json.choices : [];
    const choice = asRecord(choices[0]);
    const message = asRecord(choice == null ? void 0 : choice.message);
    const content = (_c = (_b = (_a = message == null ? void 0 : message.content) != null ? _a : choice == null ? void 0 : choice.text) != null ? _b : json.output_text) != null ? _c : json.content;
    if (typeof content === "string") {
      return content;
    }
    if (Array.isArray(content)) {
      const parts = content.map((item) => {
        if (!item) return "";
        if (typeof item === "string") return item;
        const rec = asRecord(item);
        if (rec && typeof rec.text === "string") return rec.text;
        return "";
      }).filter(Boolean);
      return parts.join("\n");
    }
    return null;
  }
  createCustomOutputFilenameElement(customText = "") {
    return createOutputFilenameElement("custom_text", {
      enabled: true,
      customText
    });
  }
  getOutputFilenamePreview() {
    var _a, _b;
    const preset = (_b = (_a = this.getPresetById(this.settings.defaultPresetId)) != null ? _a : this.settings.promptPresets[0]) != null ? _b : DEFAULT_PRESETS[0];
    const sampleDate = new Date(2026, 0, 31, 14, 23, 45);
    const sampleContext = {
      timeFilterWindow: "modified within last 7 days",
      searchString: "example query"
    };
    return `${this.buildVaultOutputFileBaseName(preset, sampleDate, sampleContext)}.md`;
  }
  buildVaultOutputFileBaseName(preset, createdAt, context = {}) {
    const pieces = [];
    const elements = this.settings.outputFilenameElements.length > 0 ? this.settings.outputFilenameElements : createDefaultOutputFilenameElements();
    for (const element of elements) {
      if (!element.enabled) {
        continue;
      }
      const piece = this.resolveOutputFilenameElementValue(element, preset, createdAt, context);
      if (piece) {
        pieces.push(piece);
      }
    }
    if (!pieces.length) {
      pieces.push(this.formatDateForFilename(createdAt));
      pieces.push(slugify(preset.suffix || preset.name));
      pieces.push(this.formatTimeForFilename(createdAt));
    }
    return pieces.join(" - ");
  }
  resolveOutputFilenameElementValue(element, preset, createdAt, context) {
    var _a;
    switch (element.kind) {
      case "date_created":
        return this.formatDateForFilename(createdAt);
      case "prompt_choice":
        return slugify(preset.suffix || preset.name);
      case "time_created":
        return this.formatTimeForFilename(createdAt);
      case "time_filter":
        return context.timeFilterWindow ? slugify(context.timeFilterWindow) : "";
      case "search_string":
        return context.searchString ? slugify(context.searchString) : "";
      case "custom_text":
        return ((_a = element.customText) == null ? void 0 : _a.trim()) ? slugify(element.customText) : "";
      default:
        return "";
    }
  }
  formatDateForFilename(date) {
    const pad = (value) => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }
  formatTimeForFilename(date) {
    const pad = (value) => String(value).padStart(2, "0");
    return `${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
  }
  async writeVaultSummaryFile(files, preset, llmOutput, provider, context = {}) {
    const outputFolder = await this.ensureFolder(this.settings.outputFolder || DEFAULT_SETTINGS.outputFolder);
    const createdAt = /* @__PURE__ */ new Date();
    const baseName = this.buildVaultOutputFileBaseName(preset, createdAt, context);
    const filePath = this.createUniqueFilePath(
      (0, import_obsidian.normalizePath)(`${outputFolder}/${baseName}.md`)
    );
    const sourceList = files.map((file) => `- [[${file.path}]]`).join("\n");
    const metadataLines = [
      `Generated: ${createdAt.toISOString()}`,
      `Provider: ${provider.displayName}`,
      `Model: ${provider.model}`,
      ...context.timeFilterWindow ? [`Time window: ${context.timeFilterWindow}`] : [],
      ...context.searchString ? [`Search string: ${context.searchString}`] : []
    ];
    const content = [
      `# ${preset.name}`,
      "",
      llmOutput.trim(),
      "",
      "## Metadata",
      ...metadataLines,
      "",
      "## Source notes",
      sourceList,
      ""
    ].join("\n");
    const created = await this.app.vault.create(filePath, content);
    await this.app.workspace.getLeaf(true).openFile(created);
    return created.path;
  }
  async writeActiveFileResult(file, preset, llmOutput, provider) {
    var _a, _b;
    const folder = (_b = (_a = file.parent) == null ? void 0 : _a.path) != null ? _b : "";
    const base = `${file.basename} - ${slugify(preset.suffix)}`;
    const targetPath = this.createUniqueFilePath(
      (0, import_obsidian.normalizePath)(`${folder ? `${folder}/` : ""}${base}.md`)
    );
    const content = [
      `# ${file.basename} (${preset.name})`,
      "",
      llmOutput.trim(),
      "",
      "## Metadata",
      `Generated: ${(/* @__PURE__ */ new Date()).toISOString()}`,
      `Provider: ${provider.displayName}`,
      `Model: ${provider.model}`,
      "",
      "## Source notes",
      `- [[${file.path}]]`,
      ""
    ].join("\n");
    const created = await this.app.vault.create(targetPath, content);
    await this.app.workspace.getLeaf(true).openFile(created);
    return created.path;
  }
  async ensureFolder(folderPath) {
    const normalized = (0, import_obsidian.normalizePath)(folderPath.trim() || DEFAULT_SETTINGS.outputFolder);
    if (!normalized) {
      return DEFAULT_SETTINGS.outputFolder;
    }
    const parts = normalized.split("/").filter(Boolean);
    let currentPath = "";
    for (const part of parts) {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const existing = this.app.vault.getAbstractFileByPath(currentPath);
      if (!existing) {
        await this.app.vault.createFolder(currentPath);
      } else if (!(existing instanceof import_obsidian.TFolder)) {
        throw new Error(`Cannot create folder "${normalized}" because "${currentPath}" is a file.`);
      }
    }
    return normalized;
  }
  createUniqueFilePath(initialPath) {
    if (!this.app.vault.getAbstractFileByPath(initialPath)) {
      return initialPath;
    }
    const ext = ".md";
    const stem = initialPath.endsWith(ext) ? initialPath.slice(0, -ext.length) : initialPath;
    let index = 2;
    let candidate = `${stem} ${index}${ext}`;
    while (this.app.vault.getAbstractFileByPath(candidate)) {
      index += 1;
      candidate = `${stem} ${index}${ext}`;
    }
    return candidate;
  }
  trimTrailingSlash(value) {
    return value.replace(/\/+$/, "");
  }
  buildVertexOpenAiBaseUrl(projectId, location) {
    const safeLocation = location.trim() || DEFAULT_SETTINGS.googleCloudLocation;
    return this.trimTrailingSlash(
      `https://aiplatform.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/locations/${encodeURIComponent(
        safeLocation
      )}/endpoints/openapi`
    );
  }
  buildAzureChatCompletionsBaseUrl(baseInput, deploymentId, apiVersion) {
    const trimmedBase = baseInput.trim();
    if (!trimmedBase) return "";
    if (/\/chat\/completions(?:\?|$)/i.test(trimmedBase)) {
      const withApiVersion = apiVersion && !/[?&]api-version=/i.test(trimmedBase) ? this.ensureQueryParam(trimmedBase, "api-version", apiVersion) : trimmedBase;
      return withApiVersion;
    }
    if (/\/openai\/deployments\/[^/?]+(?:\?|$)/i.test(trimmedBase)) {
      return apiVersion && !/[?&]api-version=/i.test(trimmedBase) ? this.ensureQueryParam(trimmedBase, "api-version", apiVersion) : trimmedBase;
    }
    const resourceEndpoint = this.trimTrailingSlash(trimmedBase);
    if (!deploymentId) {
      throw new Error("Azure deployment ID is required when using an Azure resource endpoint.");
    }
    if (!apiVersion) {
      throw new Error("Azure API version is required.");
    }
    return `${resourceEndpoint}/openai/deployments/${encodeURIComponent(
      deploymentId
    )}/chat/completions?api-version=${encodeURIComponent(apiVersion)}`;
  }
  ensureQueryParam(url, key, value) {
    if (!value.trim()) {
      return url;
    }
    const [pathPart, queryPart] = url.split("?", 2);
    const params = new URLSearchParams(queryPart != null ? queryPart : "");
    if (!params.has(key)) {
      params.set(key, value);
    }
    const nextQuery = params.toString();
    return nextQuery ? `${pathPart}?${nextQuery}` : pathPart;
  }
  isLikelyLocalEndpoint(url) {
    return /https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?/i.test(url);
  }
  humanizeError(error) {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return String(error);
  }
};
var VaultFileSelectionModal = class extends import_obsidian.Modal {
  constructor(app, files, presets, defaultPresetId, onSubmit) {
    var _a, _b, _c, _d;
    super(app);
    this.searchTerm = "";
    this.relativeDateFilterEnabled = false;
    this.dateFieldFilter = "created";
    this.relativeDateAmountInput = "";
    this.relativeDateUnit = "day";
    this.countEl = null;
    this.listEl = null;
    this.settled = false;
    this.openFolders = /* @__PURE__ */ new Set();
    this.folderInteractionStarted = false;
    this.allFiles = files;
    this.presets = presets;
    this.onSubmit = onSubmit;
    this.selectedPaths = /* @__PURE__ */ new Set();
    this.selectedPresetId = (_d = (_a = presets.find((preset) => preset.id === defaultPresetId)) == null ? void 0 : _a.id) != null ? _d : (_c = (_b = presets[0]) == null ? void 0 : _b.id) != null ? _c : "";
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("vault-ai-summarizer-modal");
    contentEl.createEl("h2", { text: "Summarize selected notes" });
    contentEl.createEl("p", {
      cls: "vault-ai-summarizer-intro",
      text: "Select Markdown notes, choose a prompt preset, and send them to the model."
    });
    const optionsSection = contentEl.createEl("details", {
      cls: "vault-ai-summarizer-collapsible vault-ai-summarizer-options-section"
    });
    optionsSection.open = true;
    const optionsSummary = optionsSection.createEl("summary", {
      cls: "vault-ai-summarizer-collapsible-summary"
    });
    const optionsSummaryRow = optionsSummary.createDiv({ cls: "vault-ai-summarizer-collapsible-summary-row" });
    optionsSummaryRow.createSpan({
      cls: "vault-ai-summarizer-collapsible-summary-label",
      text: "Options & filters"
    });
    optionsSummaryRow.createSpan({
      cls: "vault-ai-summarizer-collapsible-summary-value",
      text: "Prompt, time filter, search, and selection actions"
    });
    const controlsPanel = optionsSection.createDiv({ cls: "vault-ai-summarizer-controls-panel" });
    const presetRow = controlsPanel.createDiv({ cls: "vault-ai-summarizer-row vault-ai-summarizer-preset-row" });
    presetRow.createSpan({ text: "Prompt preset" });
    const presetSelect = presetRow.createEl("select");
    this.presets.forEach((preset) => {
      const option = presetSelect.createEl("option", { text: preset.name, value: preset.id });
      option.selected = preset.id === this.selectedPresetId;
    });
    presetSelect.onchange = () => {
      this.selectedPresetId = presetSelect.value;
    };
    const dateCard = controlsPanel.createDiv({ cls: "vault-ai-summarizer-filter-card" });
    const dateCardHeader = dateCard.createDiv({ cls: "vault-ai-summarizer-filter-card-header" });
    dateCardHeader.createSpan({ text: "Time filter" });
    const dateHeaderRight = dateCardHeader.createDiv({ cls: "vault-ai-summarizer-filter-card-header-right" });
    dateHeaderRight.createEl("small", {
      text: "Filter by created/modified time."
    });
    const toggleLabel = dateHeaderRight.createEl("label", { cls: "vault-ai-summarizer-filter-toggle" });
    const toggleInput = toggleLabel.createEl("input", { type: "checkbox" });
    toggleInput.checked = this.relativeDateFilterEnabled;
    toggleLabel.createSpan({ text: "Enable" });
    const dateControls = dateCard.createDiv({ cls: "vault-ai-summarizer-filter-controls" });
    const dateMainRow = dateControls.createDiv({ cls: "vault-ai-summarizer-filter-main-row" });
    const fieldSelect = dateMainRow.createEl("select", {
      cls: "vault-ai-summarizer-filter-select vault-ai-summarizer-filter-select-field"
    });
    DATE_FIELD_FILTER_OPTIONS.forEach((option) => {
      const el = fieldSelect.createEl("option", { text: option.label, value: option.id });
      el.selected = option.id === this.dateFieldFilter;
    });
    fieldSelect.onchange = () => {
      this.dateFieldFilter = fieldSelect.value;
      this.renderFileTree();
    };
    const amountUnitRow = dateMainRow.createDiv({ cls: "vault-ai-summarizer-filter-amount-unit" });
    amountUnitRow.createSpan({
      cls: "vault-ai-summarizer-filter-inline-label",
      text: "within last"
    });
    const amountInput = amountUnitRow.createEl("input", {
      cls: "vault-ai-summarizer-filter-number",
      type: "number",
      placeholder: "7"
    });
    amountInput.min = "1";
    amountInput.step = "1";
    amountInput.value = this.relativeDateAmountInput;
    amountInput.oninput = () => {
      this.relativeDateAmountInput = amountInput.value.trim();
      this.renderFileTree();
    };
    const unitSelect = amountUnitRow.createEl("select", {
      cls: "vault-ai-summarizer-filter-select vault-ai-summarizer-filter-select-unit"
    });
    RELATIVE_DATE_UNIT_OPTIONS.forEach((option) => {
      const el = unitSelect.createEl("option", { text: option.label, value: option.id });
      el.selected = option.id === this.relativeDateUnit;
    });
    unitSelect.onchange = () => {
      this.relativeDateUnit = unitSelect.value;
      this.renderFileTree();
    };
    const syncTimeFilterUi = () => {
      const isEnabled = this.relativeDateFilterEnabled;
      fieldSelect.disabled = !isEnabled;
      amountInput.disabled = !isEnabled;
      unitSelect.disabled = !isEnabled;
      dateControls.classList.toggle("is-disabled", !isEnabled);
    };
    toggleInput.onchange = () => {
      this.relativeDateFilterEnabled = toggleInput.checked;
      if (this.relativeDateFilterEnabled && !this.relativeDateAmountInput) {
        this.relativeDateAmountInput = "7";
        amountInput.value = "7";
      }
      syncTimeFilterUi();
      this.renderFileTree();
    };
    syncTimeFilterUi();
    const searchRow = controlsPanel.createDiv({ cls: "vault-ai-summarizer-row vault-ai-summarizer-search-row" });
    searchRow.createSpan({ text: "Search" });
    const searchInput = searchRow.createEl("input", {
      cls: "vault-ai-summarizer-search-input",
      type: "search",
      placeholder: "Filter by file name or path"
    });
    searchInput.oninput = () => {
      this.searchTerm = searchInput.value.trim();
      this.renderFileTree();
    };
    const actionRow = controlsPanel.createDiv({ cls: "vault-ai-summarizer-row vault-ai-summarizer-action-row" });
    const selectVisibleBtn = actionRow.createEl("button", {
      cls: "vault-ai-summarizer-action-primary",
      text: "Select all visible files"
    });
    const expandAllBtn = actionRow.createEl("button", { text: "Expand folders" });
    const collapseAllBtn = actionRow.createEl("button", { text: "Collapse folders" });
    const clearAllBtn = actionRow.createEl("button", { text: "Clear all" });
    selectVisibleBtn.onclick = () => {
      this.getVisibleFiles().forEach((file) => this.selectedPaths.add(file.path));
      this.renderFileTree();
    };
    expandAllBtn.onclick = () => {
      this.setVisibleFoldersOpen(true);
      this.renderFileTree();
    };
    collapseAllBtn.onclick = () => {
      this.setVisibleFoldersOpen(false);
      this.renderFileTree();
    };
    clearAllBtn.onclick = () => {
      this.selectedPaths.clear();
      this.renderFileTree();
    };
    this.listEl = contentEl.createDiv({ cls: "vault-ai-summarizer-files" });
    this.renderFileTree();
    const footer = contentEl.createDiv({ cls: "vault-ai-summarizer-footer" });
    this.countEl = footer.createSpan({ text: "0 files selected" });
    this.updateCount();
    const buttonRow = footer.createDiv({ cls: "vault-ai-summarizer-row" });
    const cancelBtn = buttonRow.createEl("button", { text: "Cancel" });
    const runBtn = buttonRow.createEl("button", { text: "Generate", cls: "mod-cta" });
    cancelBtn.onclick = () => {
      this.finish(null);
    };
    runBtn.onclick = () => {
      const selectedFiles = this.allFiles.filter((file) => this.selectedPaths.has(file.path));
      if (!selectedFiles.length) {
        new import_obsidian.Notice("Select at least one file.");
        return;
      }
      this.finish({
        files: selectedFiles,
        presetId: this.selectedPresetId,
        timeFilterWindow: this.getSelectedTimeFilterWindowForMetadata(),
        searchString: this.getSelectedSearchStringForMetadata()
      });
    };
  }
  onClose() {
    if (!this.settled) {
      this.settled = true;
      this.onSubmit(null);
    }
    const { contentEl } = this;
    contentEl.empty();
  }
  finish(selection) {
    if (this.settled) return;
    this.settled = true;
    this.onSubmit(selection);
    this.close();
  }
  getVisibleFiles() {
    const query = this.searchTerm.trim().toLowerCase();
    return this.allFiles.filter((file) => {
      if (query) {
        const haystack = `${file.basename} ${file.path}`.toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }
      return this.matchesRelativeDateFilter(file);
    });
  }
  renderFileTree() {
    if (!this.listEl) return;
    this.listEl.empty();
    const visibleFiles = this.getVisibleFiles();
    if (!visibleFiles.length) {
      this.listEl.createEl("p", { text: "No files match the current search/date filters." });
      this.updateCount();
      return;
    }
    const rootNode = this.buildFolderTree(visibleFiles);
    const folderCount = this.countFolderNodes(rootNode) + (rootNode.files.length > 0 ? 1 : 0);
    const selectedVisible = visibleFiles.filter((file) => this.selectedPaths.has(file.path)).length;
    const meta = this.listEl.createDiv({ cls: "vault-ai-summarizer-files-meta" });
    meta.setText(
      `Showing ${visibleFiles.length} file(s) in ${folderCount} folder(s). ${selectedVisible} visible selected. Time filter: ${this.describeRelativeDateFilter()}.`
    );
    if (rootNode.files.length > 0) {
      this.renderFolderNode(
        this.listEl,
        {
          name: "Vault root",
          path: "__vault-root__",
          files: rootNode.files,
          children: /* @__PURE__ */ new Map()
        },
        0
      );
    }
    const sortedChildren = [...rootNode.children.values()].sort(
      (a, b) => a.name.localeCompare(b.name, void 0, { sensitivity: "base" })
    );
    sortedChildren.forEach((child) => this.renderFolderNode(this.listEl, child, 0));
    this.updateCount();
  }
  renderFolderNode(container, node, depth) {
    const details = container.createEl("details", {
      cls: `vault-ai-summarizer-folder ${depth === 0 ? "vault-ai-summarizer-folder-top" : ""}`
    });
    const isSearchMode = this.searchTerm.length > 0;
    details.open = isSearchMode || this.openFolders.has(node.path) || !this.folderInteractionStarted && depth === 0;
    details.addEventListener("toggle", () => {
      this.folderInteractionStarted = true;
      if (details.open) {
        this.openFolders.add(node.path);
      } else {
        this.openFolders.delete(node.path);
      }
    });
    const summary = details.createEl("summary", { cls: "vault-ai-summarizer-folder-summary" });
    const row = summary.createDiv({ cls: "vault-ai-summarizer-folder-row" });
    const allNodeFilePaths = this.collectNodeFilePaths(node);
    const selectedInNode = allNodeFilePaths.filter((path) => this.selectedPaths.has(path)).length;
    const folderCheckbox = row.createEl("input", { type: "checkbox" });
    folderCheckbox.checked = allNodeFilePaths.length > 0 && selectedInNode === allNodeFilePaths.length;
    folderCheckbox.indeterminate = selectedInNode > 0 && selectedInNode < allNodeFilePaths.length;
    folderCheckbox.onclick = (event) => {
      event.stopPropagation();
    };
    folderCheckbox.onchange = () => {
      if (folderCheckbox.checked) {
        allNodeFilePaths.forEach((path) => this.selectedPaths.add(path));
      } else {
        allNodeFilePaths.forEach((path) => this.selectedPaths.delete(path));
      }
      this.renderFileTree();
    };
    const folderName = row.createSpan({ cls: "vault-ai-summarizer-folder-name", text: node.name });
    folderName.setAttr("title", node.path === "__vault-root__" ? "/" : node.path);
    row.createSpan({
      cls: "vault-ai-summarizer-folder-meta",
      text: `${selectedInNode}/${allNodeFilePaths.length} selected`
    });
    const body = details.createDiv({ cls: "vault-ai-summarizer-folder-body" });
    const filesSorted = [...node.files].sort(
      (a, b) => a.name.localeCompare(b.name, void 0, { sensitivity: "base" })
    );
    for (const file of filesSorted) {
      const fileRow = body.createDiv({ cls: "vault-ai-summarizer-file-item" });
      const checkbox = fileRow.createEl("input", { type: "checkbox" });
      checkbox.checked = this.selectedPaths.has(file.path);
      checkbox.onchange = () => {
        if (checkbox.checked) {
          this.selectedPaths.add(file.path);
        } else {
          this.selectedPaths.delete(file.path);
        }
        this.renderFileTree();
      };
      const labelWrap = fileRow.createDiv({ cls: "vault-ai-summarizer-file-label" });
      const label = labelWrap.createEl("label", { text: file.name });
      label.setAttr("title", file.path);
      labelWrap.createEl("small", { text: file.path });
    }
    const childFolders = [...node.children.values()].sort(
      (a, b) => a.name.localeCompare(b.name, void 0, { sensitivity: "base" })
    );
    childFolders.forEach((child) => this.renderFolderNode(body, child, depth + 1));
  }
  buildFolderTree(files) {
    var _a;
    const root = {
      name: "Vault",
      path: "__root__",
      files: [],
      children: /* @__PURE__ */ new Map()
    };
    for (const file of files) {
      const folderPath = ((_a = file.parent) == null ? void 0 : _a.path) || "";
      if (!folderPath) {
        root.files.push(file);
        continue;
      }
      const folderParts = folderPath.split("/").filter(Boolean);
      let cursor = root;
      let currentPath = "";
      for (const part of folderParts) {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        let child = cursor.children.get(part);
        if (!child) {
          child = {
            name: part,
            path: currentPath,
            files: [],
            children: /* @__PURE__ */ new Map()
          };
          cursor.children.set(part, child);
        }
        cursor = child;
      }
      cursor.files.push(file);
    }
    return root;
  }
  collectNodeFilePaths(node) {
    const paths = node.files.map((file) => file.path);
    node.children.forEach((child) => {
      paths.push(...this.collectNodeFilePaths(child));
    });
    return paths;
  }
  countFolderNodes(node) {
    let total = node.children.size;
    node.children.forEach((child) => {
      total += this.countFolderNodes(child);
    });
    return total;
  }
  collectFolderPaths(node, output) {
    node.children.forEach((child) => {
      output.push(child.path);
      this.collectFolderPaths(child, output);
    });
  }
  setVisibleFoldersOpen(isOpen) {
    this.folderInteractionStarted = true;
    const visibleFiles = this.getVisibleFiles();
    const rootNode = this.buildFolderTree(visibleFiles);
    const folderPaths = [];
    this.collectFolderPaths(rootNode, folderPaths);
    if (rootNode.files.length > 0) {
      folderPaths.push("__vault-root__");
    }
    folderPaths.forEach((path) => {
      if (isOpen) {
        this.openFolders.add(path);
      } else {
        this.openFolders.delete(path);
      }
    });
  }
  updateCount() {
    if (!this.countEl) return;
    const count = this.selectedPaths.size;
    const suffix = count === 1 ? "file" : "files";
    this.countEl.setText(`${count} ${suffix} selected`);
  }
  matchesRelativeDateFilter(file) {
    var _a, _b, _c, _d;
    const filter = this.getRelativeDateFilter();
    if (!filter) {
      return true;
    }
    const timestamp = filter.field === "created" ? (_b = (_a = file.stat) == null ? void 0 : _a.ctime) != null ? _b : 0 : (_d = (_c = file.stat) == null ? void 0 : _c.mtime) != null ? _d : 0;
    if (!Number.isFinite(timestamp) || timestamp <= 0) {
      return false;
    }
    const now = /* @__PURE__ */ new Date();
    const threshold = this.subtractRelativeTime(now, filter.amount, filter.unit);
    return timestamp >= threshold.getTime() && timestamp <= now.getTime();
  }
  getRelativeDateFilter() {
    const parsed = Number.parseInt(this.relativeDateAmountInput, 10);
    if (!this.relativeDateFilterEnabled) {
      return null;
    }
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }
    return {
      field: this.dateFieldFilter,
      amount: Math.floor(parsed),
      unit: this.relativeDateUnit
    };
  }
  describeRelativeDateFilter() {
    const filter = this.getRelativeDateFilter();
    if (!filter) {
      return "off";
    }
    const unitLabel = filter.amount === 1 ? filter.unit : `${filter.unit}s`;
    const fieldLabel = filter.field === "created" ? "created" : "modified";
    return `${fieldLabel} within last ${filter.amount} ${unitLabel}`;
  }
  getSelectedTimeFilterWindowForMetadata() {
    if (!this.getRelativeDateFilter()) {
      return null;
    }
    return this.describeRelativeDateFilter();
  }
  getSelectedSearchStringForMetadata() {
    const query = this.searchTerm.trim();
    return query ? query : null;
  }
  subtractRelativeTime(date, amount, unit) {
    const next = new Date(date);
    switch (unit) {
      case "hour":
        next.setHours(next.getHours() - amount);
        break;
      case "day":
        next.setDate(next.getDate() - amount);
        break;
      case "month":
        next.setMonth(next.getMonth() - amount);
        break;
      case "year":
        next.setFullYear(next.getFullYear() - amount);
        break;
    }
    return next;
  }
};
var LaunchActionSuggestModal = class extends import_obsidian.SuggestModal {
  constructor(app, options, onSelectAction) {
    super(app);
    this.settled = false;
    this.options = options;
    this.onSelectAction = onSelectAction;
    this.setPlaceholder("Choose what to summarize...");
  }
  async onOpen() {
    await super.onOpen();
    this.titleEl.setText("Laibrarian");
  }
  onClose() {
    super.onClose();
    if (!this.settled) {
      this.settled = true;
      this.onSelectAction(null);
    }
  }
  getSuggestions(query) {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return this.options;
    }
    return this.options.filter(
      (option) => `${option.title} ${option.description}`.toLowerCase().includes(needle)
    );
  }
  renderSuggestion(option, el) {
    el.createEl("div", { text: option.title });
    el.createEl("small", { text: option.description });
  }
  selectSuggestion(option) {
    this.settled = true;
    this.onSelectAction(option);
    this.close();
  }
};
var PromptPresetSuggestModal = class extends import_obsidian.SuggestModal {
  constructor(app, presets, modalTitle, onSelectPreset) {
    super(app);
    this.settled = false;
    this.presets = presets;
    this.modalTitle = modalTitle;
    this.onSelectPreset = onSelectPreset;
    this.setPlaceholder("Choose a prompt preset...");
  }
  async onOpen() {
    await super.onOpen();
    this.titleEl.setText(this.modalTitle);
  }
  onClose() {
    super.onClose();
    if (!this.settled) {
      this.settled = true;
      this.onSelectPreset(null);
    }
  }
  getSuggestions(query) {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return this.presets;
    }
    return this.presets.filter((preset) => {
      return `${preset.name} ${preset.suffix} ${preset.prompt}`.toLowerCase().includes(needle);
    });
  }
  renderSuggestion(preset, el) {
    el.createEl("div", { text: preset.name });
    el.createEl("small", { text: `Suffix: ${preset.suffix}` });
  }
  selectSuggestion(preset) {
    this.settled = true;
    this.onSelectPreset(preset);
    this.close();
  }
};
var VaultAiSummarizerSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.modelRefreshers = {};
    this.modelRefreshTimers = {};
    this.plugin = plugin;
  }
  display() {
    this.clearRefreshTimers();
    this.modelRefreshers = {};
    const { containerEl } = this;
    containerEl.empty();
    this.section("General", "Settings shared across all providers.");
    new import_obsidian.Setting(containerEl).setName("Output folder for vault summaries").setDesc("Folder where multi-file outputs are written.").addText(
      (text) => text.setPlaceholder("AI summaries").setValue(this.plugin.settings.outputFolder).onChange(async (value) => {
        this.plugin.settings.outputFolder = value.trim() || DEFAULT_SETTINGS.outputFolder;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Temperature").setDesc(
      "Controls response randomness. Lower values (around 0.0-0.3) are more stable and consistent for summaries; higher values produce more varied wording but can be less focused. 0.2 is a good default for summarization."
    ).addSlider((slider) => {
      slider.setLimits(0, 2, 0.1).setValue(this.plugin.settings.temperature).setDynamicTooltip().onChange(async (value) => {
        this.plugin.settings.temperature = clampNumber(value, 0, 2);
        await this.plugin.saveSettings();
      });
    });
    this.section("Output file naming", "Control how vault-summary output filenames are composed.");
    this.renderOutputFilenameBuilder(containerEl);
    new import_obsidian.Setting(containerEl).setName("Default prompt preset").setDesc("Pre-selected preset in the multi-file selection modal.").addDropdown((dropdown) => {
      this.plugin.settings.promptPresets.forEach((preset) => {
        dropdown.addOption(preset.id, preset.name);
      });
      dropdown.setValue(this.plugin.settings.defaultPresetId).onChange(async (value) => {
        this.plugin.settings.defaultPresetId = value;
        await this.plugin.saveSettings();
      });
    });
    this.section("Model provider", "Configure one provider at a time.");
    new import_obsidian.Setting(containerEl).setName("Provider").setDesc("Select the provider used for summary generation.").addDropdown(
      (dropdown) => dropdown.addOption("openai", PROVIDER_LABELS.openai).addOption("anthropic", PROVIDER_LABELS.anthropic).addOption("gemini", PROVIDER_LABELS.gemini).addOption("google-cloud", PROVIDER_LABELS["google-cloud"]).addOption("azure", PROVIDER_LABELS.azure).addOption("elevenlabs", PROVIDER_LABELS.elevenlabs).addOption("aws-polly", PROVIDER_LABELS["aws-polly"]).addOption("openai-compatible", PROVIDER_LABELS["openai-compatible"]).setValue(this.plugin.settings.provider).onChange(async (value) => {
        this.plugin.settings.provider = value;
        await this.plugin.saveSettings();
        this.display();
      })
    );
    this.providerDocsSetting(containerEl, this.plugin.settings.provider);
    switch (this.plugin.settings.provider) {
      case "openai":
        this.displayOpenAiSettings(containerEl);
        break;
      case "anthropic":
        this.displayAnthropicSettings(containerEl);
        break;
      case "gemini":
        this.displayGeminiSettings(containerEl);
        break;
      case "google-cloud":
        this.displayGoogleCloudSettings(containerEl);
        break;
      case "azure":
        this.displayAzureSettings(containerEl);
        break;
      case "elevenlabs":
        this.displayElevenLabsSettings(containerEl);
        break;
      case "aws-polly":
        this.displayAwsSettings(containerEl);
        break;
      case "openai-compatible":
      default:
        this.displayOpenAiCompatibleSettings(containerEl);
        break;
    }
    this.section("Prompt presets", "Edit the assistant instructions used by each preset.");
    new import_obsidian.Setting(containerEl).setName("Add prompt preset").setDesc("Create a new custom prompt preset.").addButton((button) => {
      button.setButtonText("Add prompt").setCta().onClick(async () => {
        await this.addPromptPreset();
      });
    });
    const promptPresetListEl = containerEl.createDiv({ cls: "vault-ai-summarizer-preset-list" });
    for (const preset of this.plugin.settings.promptPresets) {
      this.renderPromptPresetCard(promptPresetListEl, preset);
    }
    new import_obsidian.Setting(containerEl).setName("Reset prompt presets").setDesc("Restore all built-in preset prompts to their defaults.").addButton((button) => {
      button.setButtonText("Restore defaults").setWarning().onClick(async () => {
        this.plugin.settings.promptPresets = DEFAULT_PRESETS.map(clonePreset);
        this.plugin.settings.removedDefaultPresetIds = [];
        this.plugin.settings.defaultPresetId = DEFAULT_PRESETS[0].id;
        await this.plugin.saveSettings();
        this.display();
        new import_obsidian.Notice("Prompt presets restored.");
      });
    });
  }
  renderPromptPresetCard(containerEl, preset) {
    const isBuiltInPreset = this.isDefaultPresetId(preset.id);
    const isDefaultSelection = this.plugin.settings.defaultPresetId === preset.id;
    const defaultPreset = DEFAULT_PRESETS.find((candidate) => candidate.id === preset.id);
    const cardEl = containerEl.createDiv({ cls: "vault-ai-summarizer-preset-card" });
    const headerEl = cardEl.createDiv({ cls: "vault-ai-summarizer-preset-card-header" });
    const titleWrapEl = headerEl.createDiv({ cls: "vault-ai-summarizer-preset-card-title-wrap" });
    titleWrapEl.createEl("div", {
      cls: "vault-ai-summarizer-preset-card-title",
      text: preset.name
    });
    const metaParts = [`Suffix: ${preset.suffix}`, isBuiltInPreset ? "Built-in preset" : "Custom preset"];
    titleWrapEl.createEl("small", {
      cls: "vault-ai-summarizer-preset-card-meta",
      text: metaParts.join(" | ")
    });
    const actionsEl = headerEl.createDiv({ cls: "vault-ai-summarizer-preset-card-actions" });
    if (isDefaultSelection) {
      actionsEl.createSpan({ cls: "vault-ai-summarizer-preset-default-badge", text: "Default" });
    } else {
      const defaultButton = actionsEl.createEl("button", { text: "Set default" });
      defaultButton.onclick = () => {
        void (async () => {
          this.plugin.settings.defaultPresetId = preset.id;
          await this.plugin.saveSettings();
          this.display();
        })();
      };
    }
    const removeButton = actionsEl.createEl("button", { text: "Remove" });
    removeButton.addClass("mod-warning");
    removeButton.onclick = () => {
      void this.removePromptPreset(preset.id);
    };
    const bodyEl = cardEl.createDiv({ cls: "vault-ai-summarizer-preset-card-body" });
    this.textSetting(
      bodyEl,
      "Preset name",
      "Name shown in prompt pickers.",
      preset.name,
      async (value) => {
        const fallbackName = (defaultPreset == null ? void 0 : defaultPreset.name) || "Untitled preset";
        preset.name = value.trim() || fallbackName;
        await this.plugin.saveSettings();
      },
      "My custom preset"
    );
    this.textSetting(
      bodyEl,
      "File suffix",
      "Suffix used in output filenames for this preset.",
      preset.suffix,
      async (value) => {
        const fallbackSuffix = (defaultPreset == null ? void 0 : defaultPreset.suffix) || preset.name || preset.id;
        preset.suffix = slugify(value.trim() || fallbackSuffix);
        await this.plugin.saveSettings();
      },
      "custom-suffix"
    );
    new import_obsidian.Setting(bodyEl).setName("Prompt instructions").setDesc("Assistant instructions used when this preset is selected.").addTextArea((text) => {
      text.inputEl.rows = 7;
      text.setValue(preset.prompt).onChange(async (value) => {
        preset.prompt = value.trim() || (defaultPreset == null ? void 0 : defaultPreset.prompt) || preset.prompt;
        await this.plugin.saveSettings();
      });
    });
  }
  renderOutputFilenameBuilder(containerEl) {
    const builderEl = containerEl.createDiv({ cls: "vault-ai-summarizer-filename-builder" });
    builderEl.createEl("p", {
      cls: "vault-ai-summarizer-filename-builder-intro",
      text: "Enable elements, reorder them, and add custom text blocks for vault-summary filenames."
    });
    const listEl = builderEl.createDiv({ cls: "vault-ai-summarizer-filename-builder-list" });
    const actionRow = builderEl.createDiv({ cls: "vault-ai-summarizer-filename-builder-actions" });
    const addCustomButton = actionRow.createEl("button", { text: "Add custom string" });
    const resetButton = actionRow.createEl("button", { text: "Reset defaults" });
    const previewRow = builderEl.createDiv({ cls: "vault-ai-summarizer-filename-preview" });
    previewRow.createSpan({
      cls: "vault-ai-summarizer-filename-preview-label",
      text: "Preview"
    });
    const previewValue = previewRow.createEl("code", {
      cls: "vault-ai-summarizer-filename-preview-value"
    });
    const ensureList = () => {
      if (this.plugin.settings.outputFilenameElements.length > 0) {
        return this.plugin.settings.outputFilenameElements;
      }
      this.plugin.settings.outputFilenameElements = createDefaultOutputFilenameElements();
      return this.plugin.settings.outputFilenameElements;
    };
    const saveAndUpdatePreview = async () => {
      await this.plugin.saveSettings();
      previewValue.setText(this.plugin.getOutputFilenamePreview());
    };
    const moveElement = async (fromIndex, toIndex) => {
      const elements = ensureList();
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= elements.length || toIndex >= elements.length) {
        return;
      }
      const [moved] = elements.splice(fromIndex, 1);
      elements.splice(toIndex, 0, moved);
      await this.plugin.saveSettings();
      renderList();
    };
    const renderList = () => {
      const elements = ensureList();
      listEl.empty();
      const optionById = /* @__PURE__ */ new Map();
      for (const option of OUTPUT_FILENAME_BLOCK_OPTIONS) {
        optionById.set(option.id, { label: option.label, description: option.description });
      }
      elements.forEach((element, index) => {
        var _a, _b, _c;
        const row = listEl.createDiv({ cls: "vault-ai-summarizer-filename-row" });
        const textWrap = row.createDiv({ cls: "vault-ai-summarizer-filename-row-text" });
        if (element.kind === "custom_text") {
          textWrap.createDiv({
            cls: "vault-ai-summarizer-filename-row-label",
            text: "Custom string"
          });
          const customInput = textWrap.createEl("input", {
            cls: "vault-ai-summarizer-filename-custom-input",
            type: "text",
            placeholder: "summary",
            value: (_a = element.customText) != null ? _a : ""
          });
          customInput.oninput = () => {
            element.customText = customInput.value;
            previewValue.setText(this.plugin.getOutputFilenamePreview());
          };
          customInput.onblur = async () => {
            element.customText = customInput.value.trim();
            customInput.value = element.customText;
            await saveAndUpdatePreview();
          };
        } else {
          const option = optionById.get(element.kind);
          textWrap.createDiv({
            cls: "vault-ai-summarizer-filename-row-label",
            text: (_b = option == null ? void 0 : option.label) != null ? _b : element.kind
          });
          textWrap.createEl("small", {
            text: (_c = option == null ? void 0 : option.description) != null ? _c : ""
          });
        }
        const controls = row.createDiv({ cls: "vault-ai-summarizer-filename-row-controls" });
        const toggleLabel = controls.createEl("label", { cls: "vault-ai-summarizer-filename-toggle" });
        const enabledInput = toggleLabel.createEl("input", { type: "checkbox" });
        enabledInput.checked = element.enabled;
        toggleLabel.createSpan({ text: "On" });
        enabledInput.onchange = async () => {
          element.enabled = enabledInput.checked;
          await saveAndUpdatePreview();
        };
        const moveUpButton = controls.createEl("button", { text: "\u2191" });
        moveUpButton.disabled = index === 0;
        moveUpButton.setAttr("aria-label", "Move up");
        moveUpButton.onclick = () => {
          void moveElement(index, index - 1);
        };
        const moveDownButton = controls.createEl("button", { text: "\u2193" });
        moveDownButton.disabled = index === elements.length - 1;
        moveDownButton.setAttr("aria-label", "Move down");
        moveDownButton.onclick = () => {
          void moveElement(index, index + 1);
        };
        if (element.kind === "custom_text") {
          const removeButton = controls.createEl("button", { text: "Remove" });
          removeButton.onclick = () => {
            this.plugin.settings.outputFilenameElements.splice(index, 1);
            void saveAndUpdatePreview().then(() => renderList());
          };
        }
      });
      previewValue.setText(this.plugin.getOutputFilenamePreview());
    };
    addCustomButton.onclick = () => {
      ensureList().push(this.plugin.createCustomOutputFilenameElement("summary"));
      void saveAndUpdatePreview().then(() => renderList());
    };
    resetButton.onclick = () => {
      this.plugin.settings.outputFilenameElements = createDefaultOutputFilenameElements();
      void saveAndUpdatePreview().then(() => renderList());
    };
    renderList();
  }
  isDefaultPresetId(presetId) {
    return DEFAULT_PRESETS.some((preset) => preset.id === presetId);
  }
  createNewPromptPreset() {
    const idBase = `custom-${Date.now().toString(36)}`;
    const existingIds = new Set(this.plugin.settings.promptPresets.map((preset) => preset.id));
    let id = idBase;
    let idCounter = 2;
    while (existingIds.has(id)) {
      id = `${idBase}-${idCounter}`;
      idCounter += 1;
    }
    const suffixBase = "custom-prompt";
    const existingSuffixes = new Set(this.plugin.settings.promptPresets.map((preset) => preset.suffix));
    let suffix = suffixBase;
    let suffixCounter = 2;
    while (existingSuffixes.has(suffix)) {
      suffix = `${suffixBase}-${suffixCounter}`;
      suffixCounter += 1;
    }
    return {
      id,
      name: "New prompt",
      suffix,
      prompt: "You are a helpful assistant. Provide the requested output format and focus on key information."
    };
  }
  async addPromptPreset() {
    const preset = this.createNewPromptPreset();
    this.plugin.settings.promptPresets.push(preset);
    if (!this.plugin.settings.defaultPresetId) {
      this.plugin.settings.defaultPresetId = preset.id;
    }
    await this.plugin.saveSettings();
    this.display();
    new import_obsidian.Notice(`Prompt preset added: ${preset.name}`);
  }
  async removePromptPreset(presetId) {
    var _a;
    if (this.plugin.settings.promptPresets.length <= 1) {
      new import_obsidian.Notice("At least one prompt preset is required.");
      return;
    }
    const target = this.plugin.settings.promptPresets.find((preset) => preset.id === presetId);
    if (!target) {
      return;
    }
    this.plugin.settings.promptPresets = this.plugin.settings.promptPresets.filter(
      (preset) => preset.id !== presetId
    );
    if (this.isDefaultPresetId(presetId)) {
      const removed = new Set((_a = this.plugin.settings.removedDefaultPresetIds) != null ? _a : []);
      removed.add(presetId);
      this.plugin.settings.removedDefaultPresetIds = Array.from(removed.values());
    }
    if (this.plugin.settings.defaultPresetId === presetId) {
      this.plugin.settings.defaultPresetId = this.plugin.settings.promptPresets[0].id;
    }
    await this.plugin.saveSettings();
    this.display();
    new import_obsidian.Notice(`Prompt preset removed: ${target.name}`);
  }
  providerDocsSetting(containerEl, provider) {
    const docs = this.plugin.getProviderDocs(provider);
    new import_obsidian.Setting(containerEl).setName(`${docs.label} documentation`).setDesc("Open official API and model documentation.").addButton(
      (button) => button.setButtonText("API docs").onClick(() => {
        if (typeof window !== "undefined") {
          window.open(docs.apiDocsUrl, "_blank", "noopener,noreferrer");
        }
      })
    ).addButton(
      (button) => button.setButtonText("Model docs").onClick(() => {
        if (typeof window !== "undefined") {
          window.open(docs.modelDocsUrl, "_blank", "noopener,noreferrer");
        }
      })
    );
  }
  displayOpenAiSettings(containerEl) {
    this.noteBlock(
      containerEl,
      "Uses OpenAI's standard Chat Completions API. Only API key and model are required."
    );
    this.passwordSetting(
      containerEl,
      "OpenAI API key",
      "Get one from https://platform.openai.com/api-keys",
      this.plugin.settings.openaiApiKey,
      async (value) => {
        this.plugin.settings.openaiApiKey = value;
        await this.plugin.saveSettings();
        this.scheduleModelRefresh("openai");
      },
      "sk-..."
    );
    this.renderModelDropdown(containerEl, {
      provider: "openai",
      name: "Model",
      description: "Choose from the live OpenAI `/models` list.",
      getCurrentValue: () => this.plugin.settings.openaiModel,
      setCurrentValue: async (value) => {
        this.plugin.settings.openaiModel = value;
        await this.plugin.saveSettings();
      }
    });
  }
  displayAnthropicSettings(containerEl) {
    this.noteBlock(
      containerEl,
      "Uses Anthropic's Messages API. API key and model are required."
    );
    this.passwordSetting(
      containerEl,
      "Anthropic API key",
      "Get one from https://console.anthropic.com/settings/keys",
      this.plugin.settings.anthropicApiKey,
      async (value) => {
        this.plugin.settings.anthropicApiKey = value;
        await this.plugin.saveSettings();
        this.scheduleModelRefresh("anthropic");
      },
      "sk-ant-..."
    );
    this.renderModelDropdown(containerEl, {
      provider: "anthropic",
      name: "Model",
      description: "Choose from the live Anthropic `/v1/models` list.",
      getCurrentValue: () => this.plugin.settings.anthropicModel,
      setCurrentValue: async (value) => {
        this.plugin.settings.anthropicModel = value;
        await this.plugin.saveSettings();
      }
    });
  }
  displayGeminiSettings(containerEl) {
    this.noteBlock(
      containerEl,
      "Uses Google's Gemini OpenAI-compatible endpoint (AI Studio key). The endpoint is preconfigured."
    );
    this.passwordSetting(
      containerEl,
      "Gemini API key",
      "Get one from https://aistudio.google.com/apikey",
      this.plugin.settings.geminiApiKey,
      async (value) => {
        this.plugin.settings.geminiApiKey = value;
        await this.plugin.saveSettings();
        this.scheduleModelRefresh("gemini");
      },
      "AIza..."
    );
    this.renderModelDropdown(containerEl, {
      provider: "gemini",
      name: "Model",
      description: "Choose from the live Gemini model list.",
      getCurrentValue: () => this.plugin.settings.geminiModel,
      setCurrentValue: async (value) => {
        this.plugin.settings.geminiModel = value;
        await this.plugin.saveSettings();
      }
    });
  }
  displayGoogleCloudSettings(containerEl) {
    this.noteBlock(
      containerEl,
      "Vertex AI OpenAI compatibility uses Google Cloud OAuth access tokens (not AI Studio keys). Leave endpoint override empty to auto-build the Vertex endpoint from project ID and location."
    );
    this.passwordSetting(
      containerEl,
      "OAuth access token (Google Cloud)",
      "Short-lived OAuth token for Vertex AI (for example from `gcloud auth print-access-token`).",
      this.plugin.settings.googleCloudApiKey,
      async (value) => {
        this.plugin.settings.googleCloudApiKey = value;
        await this.plugin.saveSettings();
        this.scheduleModelRefresh("google-cloud");
      },
      "ya29...."
    );
    this.textSetting(
      containerEl,
      "Project ID",
      "Google Cloud project ID used to build the Vertex AI endpoint automatically.",
      this.plugin.settings.googleCloudProjectId,
      async (value) => {
        this.plugin.settings.googleCloudProjectId = value;
        await this.plugin.saveSettings();
        this.scheduleModelRefresh("google-cloud");
      },
      "my-gcp-project"
    );
    this.textSetting(
      containerEl,
      "Location",
      "Vertex AI location. `global` is recommended for the OpenAI-compatible endpoint.",
      this.plugin.settings.googleCloudLocation,
      async (value) => {
        this.plugin.settings.googleCloudLocation = value;
        await this.plugin.saveSettings();
        this.scheduleModelRefresh("google-cloud");
      },
      "global"
    );
    this.textSetting(
      containerEl,
      "Endpoint override (optional)",
      "Advanced: full Vertex OpenAI-compatible base URL. Leave empty to auto-build from project ID + location.",
      this.plugin.settings.googleCloudBaseUrl,
      async (value) => {
        this.plugin.settings.googleCloudBaseUrl = value;
        await this.plugin.saveSettings();
        this.scheduleModelRefresh("google-cloud");
      },
      "https://aiplatform.googleapis.com/v1/projects/.../locations/global/endpoints/openapi"
    );
    this.renderModelDropdown(containerEl, {
      provider: "google-cloud",
      name: "Model",
      description: "Choose from the live Vertex AI OpenAI-compatible `/models` list.",
      getCurrentValue: () => this.plugin.settings.googleCloudModel,
      setCurrentValue: async (value) => {
        this.plugin.settings.googleCloudModel = value;
        await this.plugin.saveSettings();
      }
    });
  }
  displayAzureSettings(containerEl) {
    this.noteBlock(
      containerEl,
      "This provider is optimized for Azure OpenAI deployment endpoints and builds the chat completions URL for you, including `api-version`."
    );
    this.passwordSetting(
      containerEl,
      "Azure OpenAI API key",
      "API key from your Azure OpenAI resource.",
      this.plugin.settings.azureApiKey,
      async (value) => {
        this.plugin.settings.azureApiKey = value;
        await this.plugin.saveSettings();
      },
      "Azure key"
    );
    this.textSetting(
      containerEl,
      "Resource endpoint",
      "Usually `https://<resource>.openai.azure.com`. Advanced: a full `/chat/completions` endpoint also works.",
      this.plugin.settings.azureBaseUrl,
      async (value) => {
        this.plugin.settings.azureBaseUrl = value;
        await this.plugin.saveSettings();
      },
      "https://my-resource.openai.azure.com"
    );
    this.textSetting(
      containerEl,
      "Deployment ID",
      "Azure deployment name. Required when using a resource endpoint instead of a full chat endpoint.",
      this.plugin.settings.azureDeploymentId,
      async (value) => {
        this.plugin.settings.azureDeploymentId = value;
        await this.plugin.saveSettings();
      },
      "gpt-4o-mini-prod"
    );
    this.textSetting(
      containerEl,
      "API version",
      "Azure OpenAI API version appended as `api-version`.",
      this.plugin.settings.azureApiVersion,
      async (value) => {
        this.plugin.settings.azureApiVersion = value;
        await this.plugin.saveSettings();
      },
      "2024-10-21"
    );
    this.textSetting(
      containerEl,
      "Model label (optional)",
      "Optional metadata label. Azure deployment endpoints generally use the deployment path, so this may be omitted.",
      this.plugin.settings.azureModel,
      async (value) => {
        this.plugin.settings.azureModel = value;
        await this.plugin.saveSettings();
      },
      "gpt-4o-mini"
    );
  }
  displayElevenLabsSettings(containerEl) {
    this.noteBlock(
      containerEl,
      "Included for provider-list parity with the note TTS plugin. ElevenLabs Agents/LLM is not currently implemented as a direct OpenAI `/chat/completions` summarization backend in this plugin.",
      "warning"
    );
    this.noteBlock(
      containerEl,
      "Use OpenAI Compatible if you have a separate gateway that exposes a standard chat-completions endpoint."
    );
  }
  displayAwsSettings(containerEl) {
    this.noteBlock(
      containerEl,
      "Uses Amazon Bedrock's OpenAI Chat Completions compatibility API. Region builds the endpoint automatically unless you provide an override."
    );
    this.passwordSetting(
      containerEl,
      "AWS Bedrock API key",
      "API key (Bearer token) for Bedrock's OpenAI chat-completions compatibility endpoint.",
      this.plugin.settings.awsApiKey,
      async (value) => {
        this.plugin.settings.awsApiKey = value;
        await this.plugin.saveSettings();
        this.scheduleModelRefresh("aws-polly");
      },
      "Bearer token"
    );
    this.textSetting(
      containerEl,
      "Region",
      "AWS region used to build the Bedrock runtime endpoint automatically.",
      this.plugin.settings.awsRegion,
      async (value) => {
        this.plugin.settings.awsRegion = value;
        await this.plugin.saveSettings();
        this.scheduleModelRefresh("aws-polly");
      },
      "us-west-2"
    );
    this.textSetting(
      containerEl,
      "Endpoint override (optional)",
      "Advanced: custom Bedrock-compatible base URL. Leave empty to use the selected region.",
      this.plugin.settings.awsBaseUrl,
      async (value) => {
        this.plugin.settings.awsBaseUrl = value;
        await this.plugin.saveSettings();
        this.scheduleModelRefresh("aws-polly");
      },
      "https://bedrock-runtime.us-west-2.amazonaws.com/openai/v1"
    );
    this.renderModelDropdown(containerEl, {
      provider: "aws-polly",
      name: "Model",
      description: "Choose from the live Bedrock OpenAI-compatible `/models` list.",
      getCurrentValue: () => this.plugin.settings.awsModel,
      setCurrentValue: async (value) => {
        this.plugin.settings.awsModel = value;
        await this.plugin.saveSettings();
      }
    });
  }
  displayOpenAiCompatibleSettings(containerEl) {
    this.noteBlock(
      containerEl,
      "Use this for self-hosted or third-party APIs that mimic OpenAI Chat Completions (Ollama, LM Studio, proxies, gateways)."
    );
    this.passwordSetting(
      containerEl,
      "API key",
      "Bearer token for your OpenAI-compatible endpoint. Optional for localhost endpoints.",
      this.plugin.settings.openaiCompatApiKey,
      async (value) => {
        this.plugin.settings.openaiCompatApiKey = value;
        await this.plugin.saveSettings();
        this.scheduleModelRefresh("openai-compatible");
      },
      "Bearer token"
    );
    this.textSetting(
      containerEl,
      "API base URL",
      "Base URL of your OpenAI-compatible endpoint.",
      this.plugin.settings.openaiCompatBaseUrl,
      async (value) => {
        this.plugin.settings.openaiCompatBaseUrl = value;
        await this.plugin.saveSettings();
        this.scheduleModelRefresh("openai-compatible");
      },
      "https://api.example.com/v1"
    );
    this.renderModelDropdown(containerEl, {
      provider: "openai-compatible",
      name: "Model",
      description: "Choose from the provider's `/models` list.",
      getCurrentValue: () => this.plugin.settings.openaiCompatModel,
      setCurrentValue: async (value) => {
        this.plugin.settings.openaiCompatModel = value;
        await this.plugin.saveSettings();
      }
    });
  }
  renderModelDropdown(containerEl, config) {
    let dropdownRef = null;
    const setting = new import_obsidian.Setting(containerEl).setName(config.name).setDesc(config.description);
    setting.addDropdown((dropdown) => {
      dropdownRef = dropdown.selectEl;
      const cachedModels = this.plugin.getCachedProviderModels(config.provider);
      this.populateDropdown(dropdown.selectEl, cachedModels, config.getCurrentValue());
      dropdown.onChange(async (value) => {
        await config.setCurrentValue(value.trim());
      });
    });
    setting.addExtraButton((button) => {
      button.setIcon("refresh-cw");
      button.setTooltip("Refresh model list");
      button.onClick(() => {
        void this.refreshModelDropdown(config, setting, dropdownRef, true);
      });
    });
    this.modelRefreshers[config.provider] = async () => {
      await this.refreshModelDropdown(config, setting, dropdownRef, false);
    };
    void this.refreshModelDropdown(config, setting, dropdownRef, false);
  }
  async refreshModelDropdown(config, setting, dropdownEl, showNotice) {
    if (!dropdownEl) {
      return;
    }
    const readiness = this.getModelRefreshReadiness(config.provider);
    if (!readiness.ready) {
      const cached = this.plugin.getCachedProviderModels(config.provider);
      this.populateDropdown(dropdownEl, cached, config.getCurrentValue());
      setting.setDesc(`${config.description} (${readiness.reason})`);
      return;
    }
    try {
      const models = await this.plugin.refreshProviderModels(config.provider);
      this.populateDropdown(dropdownEl, models, config.getCurrentValue());
      if (!config.getCurrentValue().trim() && models.length > 0) {
        await config.setCurrentValue(models[0]);
        this.populateDropdown(dropdownEl, models, config.getCurrentValue());
      }
      const modelCount = models.length;
      const suffix = modelCount === 1 ? "model" : "models";
      setting.setDesc(`${config.description} (${modelCount} ${suffix} loaded)`);
      if (showNotice) {
        new import_obsidian.Notice(`${PROVIDER_LABELS[config.provider]} model list updated.`);
      }
    } catch (error) {
      const cached = this.plugin.getCachedProviderModels(config.provider);
      this.populateDropdown(dropdownEl, cached, config.getCurrentValue());
      const message = this.humanizeError(error);
      setting.setDesc(`${config.description} (update failed: ${message})`);
      if (showNotice) {
        new import_obsidian.Notice(`Model update failed for ${PROVIDER_LABELS[config.provider]}: ${message}`);
      }
    }
  }
  populateDropdown(dropdownEl, options, currentValueRaw) {
    const currentValue = currentValueRaw.trim();
    const unique = /* @__PURE__ */ new Set();
    if (currentValue) {
      unique.add(currentValue);
    }
    for (const option of options) {
      const value = option.trim();
      if (value) {
        unique.add(value);
      }
    }
    while (dropdownEl.options.length > 0) {
      dropdownEl.remove(0);
    }
    const allValues = Array.from(unique.values());
    for (const value of allValues) {
      const optionEl = document.createElement("option");
      optionEl.value = value;
      optionEl.text = value;
      dropdownEl.appendChild(optionEl);
    }
    if (allValues.length === 0) {
      const optionEl = document.createElement("option");
      optionEl.value = "";
      optionEl.text = "No models available";
      dropdownEl.appendChild(optionEl);
      dropdownEl.value = "";
      return;
    }
    dropdownEl.value = currentValue || allValues[0];
  }
  scheduleModelRefresh(provider) {
    const existing = this.modelRefreshTimers[provider];
    if (typeof existing === "number") {
      window.clearTimeout(existing);
    }
    this.modelRefreshTimers[provider] = window.setTimeout(() => {
      var _a, _b;
      void ((_b = (_a = this.modelRefreshers)[provider]) == null ? void 0 : _b.call(_a));
    }, 700);
  }
  clearRefreshTimers() {
    for (const timeoutId of Object.values(this.modelRefreshTimers)) {
      if (typeof timeoutId === "number") {
        window.clearTimeout(timeoutId);
      }
    }
    this.modelRefreshTimers = {};
  }
  getModelRefreshReadiness(provider) {
    switch (provider) {
      case "openai":
        return this.plugin.settings.openaiApiKey.trim() ? { ready: true } : { ready: false, reason: "enter an OpenAI API key to load models" };
      case "anthropic":
        return this.plugin.settings.anthropicApiKey.trim() ? { ready: true } : { ready: false, reason: "enter an Anthropic API key to load models" };
      case "gemini":
        return this.plugin.settings.geminiApiKey.trim() ? { ready: true } : { ready: false, reason: "enter a Gemini API key to load models" };
      case "google-cloud":
        if (!this.plugin.settings.googleCloudApiKey.trim()) {
          return { ready: false, reason: "enter a Google Cloud OAuth access token to load models" };
        }
        if (!this.plugin.settings.googleCloudBaseUrl.trim() && !this.plugin.settings.googleCloudProjectId.trim()) {
          return { ready: false, reason: "enter a project ID or endpoint override to load models" };
        }
        return { ready: true };
      case "aws-polly":
        return this.plugin.settings.awsApiKey.trim() ? { ready: true } : { ready: false, reason: "enter an AWS Bedrock API key to load models" };
      case "openai-compatible": {
        const baseUrl = this.plugin.settings.openaiCompatBaseUrl.trim();
        if (!baseUrl) {
          return { ready: false, reason: "enter a base URL to load models" };
        }
        if (!this.plugin.settings.openaiCompatApiKey.trim() && !this.isLikelyLocalEndpoint(baseUrl)) {
          return { ready: false, reason: "enter an API key to load models" };
        }
        return { ready: true };
      }
    }
  }
  isLikelyLocalEndpoint(url) {
    return /https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?/i.test(url);
  }
  noteBlock(containerEl, text, tone = "info") {
    const el = containerEl.createDiv({ cls: "vault-ai-summarizer-setting-note" });
    if (tone === "warning") {
      el.addClass("is-warning");
    }
    el.setText(text);
  }
  textSetting(containerEl, name, description, value, onChange, placeholder = "") {
    new import_obsidian.Setting(containerEl).setName(name).setDesc(description).addText((text) => {
      if (placeholder) {
        text.setPlaceholder(placeholder);
      }
      text.setValue(value).onChange(async (next) => {
        await onChange(next.trim());
      });
    });
  }
  passwordSetting(containerEl, name, description, value, onChange, placeholder = "") {
    new import_obsidian.Setting(containerEl).setName(name).setDesc(description).addText((text) => {
      text.inputEl.type = "password";
      if (placeholder) {
        text.setPlaceholder(placeholder);
      }
      text.setValue(value).onChange(async (next) => {
        await onChange(next.trim());
      });
    });
  }
  section(title, description) {
    const heading = new import_obsidian.Setting(this.containerEl).setName(title).setHeading();
    if (description) {
      heading.setDesc(description);
    }
  }
};
function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
