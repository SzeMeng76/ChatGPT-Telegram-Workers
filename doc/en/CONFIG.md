# Configuration Guide

This guide covers all configuration options for the ChatGPT Telegram Workers bot. It's recommended to set environment variables through the Workers configuration interface rather than modifying the JS code directly.

## 📋 Table of Contents

- [Quick Setup](#quick-setup)
- [Storage Configuration](#storage-configuration)
- [System Configuration](#system-configuration)
- [AI Provider Configuration](#ai-provider-configuration)
  - [OpenAI](#openai)
  - [Anthropic Claude](#anthropic-claude)
  - [Google Gemini](#google-gemini)
  - [xAI Grok](#xai-grok)
  - [Other Providers](#other-providers)
- [AI Native Tools Configuration](#ai-native-tools-configuration)
  - [OpenAI Server-Side Tools](#openai-server-side-tools)
  - [Anthropic Server-Side Tools](#anthropic-server-side-tools)
  - [Google Built-in Tools](#google-built-in-tools)
  - [xAI Server-Side Tools](#xai-server-side-tools)
- [Voice Services Configuration](#voice-services-configuration)
- [User Configuration](#user-configuration)
- [Commands](#commands)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Setup

### Minimum Required Configuration

To get started quickly, you only need to set these essential variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `TELEGRAM_AVAILABLE_TOKENS` | Your Telegram bot token(s) | `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11` |
| `OPENAI_API_KEY` | Your OpenAI API key(s) | `sk-...` |

### Optional but Recommended

| Variable | Description | Default |
|----------|-------------|---------|
| `CHAT_WHITE_LIST` | Allowed user/chat IDs | `''` (empty = allow all) |
| `LANGUAGE` | Interface language | `zh-cn` |
| `AI_CHAT_PROVIDER` | Default AI provider | `openai` |

## 🗄️ Storage Configuration

### KV Database (Cloudflare Workers)

| Variable | Description |
|----------|-------------|
| `DATABASE` | Create a KV namespace and bind it with name `DATABASE` |

### Alternative Databases (Local/Docker)

For local deployment, configure in `config.json`:

```json
{
  "database": {
    "type": "sqlite",     // Options: memory, local, sqlite, redis
    "path": "/app/data/data.db"
  }
}
```

**Database Type Comparison**:

| Type | Persistent | Use Case | Notes |
|------|-----------|----------|-------|
| `memory` | ❌ | Testing/Dev | Data stored in memory, lost on container restart |
| `local` | ✅ | Personal use | JSON file storage, simple but lower performance |
| `sqlite` | ✅ | Personal/Small teams | **Recommended**, file-based DB with good performance and easy backup |
| `redis` | ✅ | Medium/Large deployments | Requires separate Redis service, best performance |

**Data Persistence Configuration** (Highly Recommended):

To preserve conversation history, user configs, and group message cache, configure data persistence:

1. **Using sqlite (Recommended)**:
   ```json
   {
     "database": {
       "type": "sqlite",
       "path": "/app/data/data.db"
     },
     "mode": "webhook",
     "server": {
       "hostname": "0.0.0.0",
       "port": 8787,
       "baseURL": "https://your-domain.com"
     }
   }
   ```

2. **Docker Compose with Volume Mount**:
   ```yaml
   version: '3'
   services:
     chatgpt-telegram-workers:
       image: szemeng76/chatgpt-telegram-workers:latest
       volumes:
         - ./config.json:/app/config.json:ro
         - ./wrangler.toml:/app/config.toml:ro
         - ./data:/app/data  # Mount data directory for database persistence
       ports:
         - "8787:8787"
   ```

3. **Using redis (High Performance)**:
   ```yaml
   version: '3'
   services:
     redis:
       image: redis:alpine
       volumes:
         - redis-data:/data
       command: redis-server --appendonly yes

     chatgpt-telegram-workers:
       image: szemeng76/chatgpt-telegram-workers:latest
       depends_on:
         - redis
       volumes:
         - ./config.json:/app/config.json:ro
       environment:
         - DATABASE_TYPE=redis
         - DATABASE_PATH=redis://redis:6379

   volumes:
     redis-data:
   ```

**Data That Needs Persistence**:
- ✅ **Conversation History**: Complete chat history between users and AI
- ✅ **User Configurations**: Personalized settings (models, parameters, etc.)
- ✅ **Telegraph Tokens**: Used for generating Telegraph articles
- ⚠️ **Group Message Cache**: Recent group messages (has TTL, optional persistence)

## ⚙️ System Configuration

### Basic Settings

| Variable | Description | Default | Type |
|----------|-------------|---------|------|
| `LANGUAGE` | Interface language | `zh-cn` | `en`, `zh-cn`, `zh-hant`, `pt` |
| `UPDATE_BRANCH` | Update check branch | `master` | string |
| `CHAT_COMPLETE_API_TIMEOUT` | API timeout (seconds) | `0` | number |
| `LOG_LEVEL` | Logging level | `info` | `debug`, `info`, `warn`, `error` |

### Telegram Configuration

| Variable | Description | Default | Notes |
|----------|-------------|---------|-------|
| `TELEGRAM_API_DOMAIN` | Telegram API domain | `https://api.telegram.org/` | For custom endpoints |
| `TELEGRAM_AVAILABLE_TOKENS` | Bot tokens (comma-separated) | `''` | **Required** |
| `TELEGRAM_BOT_NAME` | Bot names (comma-separated) | `''` | Must match token order |
| `DEFAULT_PARSE_MODE` | Message parsing mode | `Markdown` | `Markdown`, `MarkdownV2`, `HTML` |
| `USE_RICH_MESSAGE` | Send messages via Telegram Bot API 10.1+ Rich Message (server-side Markdown parsing, no manual escaping needed); only takes effect when `DEFAULT_PARSE_MODE=MarkdownV2`. Supports quote folding and expandable blockquotes | `true` | `true`, `false` |
| `I_AM_A_GENEROUS_PERSON` | Allow everyone to use | `false` | Set `true` to allow all users |

### Access Control

| Variable | Description | Default | Format |
|----------|-------------|---------|--------|
| `CHAT_WHITE_LIST` | Allowed user/chat IDs | `''` | Comma-separated IDs |
| `CHAT_GROUP_WHITE_LIST` | Allowed group IDs | `''` | Comma-separated IDs |
| `GROUP_CHAT_BOT_ENABLE` | Enable group chat | `true` | `true`/`false` |
| `GROUP_CHAT_BOT_SHARE_MODE` | Share context in groups | `true` | `true`/`false` |
| `GROUP_INCLUDE_USERNAME` | Add username prefix to group messages | `false` | `true`/`false` |
| `GROUP_MESSAGE_LISTEN_MODE` | Enable group message listening mode | `false` | `true`/`false` |
| `GROUP_MESSAGE_CACHE_SIZE` | Number of cached group messages | `20` | Number |
| `GROUP_MESSAGE_CACHE_TTL` | Cache expiration time (seconds) | `3600` | Number |

> ⚠️ **Important**: Add group IDs to `CHAT_GROUP_WHITE_LIST` to prevent unauthorized usage. Set bot as admin in large groups (>2000 members) and disable privacy mode in BotFather (`/setprivacy` → `Disable`).

**Group Username Feature** (`GROUP_INCLUDE_USERNAME`):
When enabled, messages in group chats will be prefixed with the sender's identifier to help AI distinguish between different speakers:
- Users with username: `@username: message`
- Users without username: `First Last: message` or `First: message`

This is particularly useful when multiple people are having a conversation and the AI needs to track who said what.

**Group Message Listening Mode** (`GROUP_MESSAGE_LISTEN_MODE`):
A powerful feature that allows AI to "see" the full conversation context in groups.

**How it works**:
1. **Automatic Caching**: The bot automatically caches all text messages in the group (even without @mentions)
2. **Trigger Response**: AI only responds when:
   - Using `CHAT_TRIGGER_PREFIX` (e.g., `/bot hello`)
   - @mentioning the bot (e.g., `@your_bot hello`)
   - Replying to bot's messages
3. **Context Injection**: When triggered, recent group messages are loaded as context for the AI

**Configuration Example**:
```bash
# Enable group message listening
GROUP_MESSAGE_LISTEN_MODE=true

# Cache last 50 messages
GROUP_MESSAGE_CACHE_SIZE=50

# Keep cache for 2 hours
GROUP_MESSAGE_CACHE_TTL=7200

# Set trigger prefix (optional, leave empty for @mention or reply only)
CHAT_TRIGGER_PREFIX=/bot
```

**Usage Example**:
```
User A: The weather is great today
User B: Yeah, perfect for going out
User C: Where should we go?
User D: /bot Based on the conversation, suggest some activities for today's weather

AI: Based on your conversation about the nice weather, I recommend these activities:
1. Outdoor picnic...
2. Park walk...
```

**Important Notes**:
- Cache only includes text messages, not images/videos
- Cache is stored in the database (Cloudflare Workers uses KV, Docker/local deployments use memory/local/sqlite/redis based on config)
- Adjust `GROUP_MESSAGE_CACHE_SIZE` based on group activity
- Cache automatically expires after `GROUP_MESSAGE_CACHE_TTL`
- For Docker deployments, recommend using `sqlite` or `redis` as database type for cache persistence

### Message & History Settings

| Variable | Description | Default | Notes |
|----------|-------------|---------|-------|
| `AUTO_TRIM_HISTORY` | Auto-trim message history | `true` | Prevents 4096 char limit |
| `MAX_HISTORY_LENGTH` | Max history entries | `12` | Per user |
| `STREAM_MODE` | Enable streaming output | `true` | Typewriter effect |
| `EXTRA_MESSAGE_CONTEXT` | Include quoted messages | `false` | Adds context from replies |
| `ENABLE_BOT_TO_BOT` | Accept messages from other bots (Bot API 10.0) | `false` | Requires Bot-to-Bot Mode enabled in @BotFather MiniApp |
| `ALLOWED_BOT_IDS` | Bot user IDs allowed when `ENABLE_BOT_TO_BOT` is true | `[]` | Empty = block all bots (safe default). Use `["*"]` to allow any bot |

## 🤖 AI Provider Configuration

### OpenAI

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | API keys (comma-separated) | `''` |
| `OPENAI_CHAT_MODEL` | Chat model | `gpt-4o-mini` |
| `OPENAI_API_BASE` | API base URL | `https://api.openai.com/v1` |
| `OPENAI_API_EXTRA_PARAMS` | Extra parameters | `{}` |

### DALL-E (Image Generation)

| Variable | Description | Default |
|----------|-------------|---------|
| `DALL_E_MODEL` | Model name | `dall-e-2` |
| `DALL_E_IMAGE_SIZE` | Image size | `512x512` |
| `DALL_E_IMAGE_QUALITY` | Image quality | `standard` |
| `DALL_E_IMAGE_STYLE` | Image style | `vivid` |

### Azure OpenAI

| Variable | Description | Format |
|----------|-------------|--------|
| `AZURE_API_KEY` | Azure API key | String |
| `AZURE_RESOURCE_NAME` | Resource name | From Azure portal |
| `AZURE_CHAT_MODEL` | Deployment name | Your deployment |
| `AZURE_API_VERSION` | API version | `2024-06-01` |

### Anthropic Claude

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | API key | `null` |
| `ANTHROPIC_API_BASE` | Base URL | `https://api.anthropic.com/v1` |
| `ANTHROPIC_CHAT_MODEL` | Model name | `claude-3-haiku-20240307` |

### Google Gemini

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_API_KEY` | API key | `null` |
| `GOOGLE_API_BASE` | Base URL | `https://generativelanguage.googleapis.com/v1beta/models/` |
| `GOOGLE_CHAT_MODEL` | Model name | `gemini-pro` |

### Google Vertex AI

| Variable | Description | Notes |
|----------|-------------|-------|
| `VERTEX_PROJECT_ID` | GCP project ID | Required |
| `VERTEX_LOCATION` | Region | e.g., `us-central1` |
| `VERTEX_CREDENTIALS` | Service account JSON | Base64 encoded |

### xAI Grok

| Variable | Description | Default |
|----------|-------------|---------|
| `XAI_API_KEY` | API key | `null` |
| `XAI_API_BASE` | Base URL | `https://api.x.ai/v1` |
| `XAI_CHAT_MODEL` | Model name | `grok-beta` |

### Mistral AI

| Variable | Description | Default |
|----------|-------------|---------|
| `MISTRAL_API_KEY` | API key | `null` |
| `MISTRAL_API_BASE` | Base URL | `https://api.mistral.ai/v1` |
| `MISTRAL_CHAT_MODEL` | Model name | `mistral-tiny` |

### Cohere

| Variable | Description | Default |
|----------|-------------|---------|
| `COHERE_API_KEY` | API key | `null` |
| `COHERE_API_BASE` | Base URL | `https://api.cohere.com/v1` |
| `COHERE_CHAT_MODEL` | Model name | `command-r-plus` |

### Cloudflare Workers AI

| Variable | Description | Default |
|----------|-------------|---------|
| `CLOUDFLARE_ACCOUNT_ID` | Account ID | `null` |
| `CLOUDFLARE_TOKEN` | API token | `null` |
| `WORKERS_CHAT_MODEL` | Chat model | `@cf/mistral/mistral-7b-instruct-v0.1` |
| `WORKERS_IMAGE_MODEL` | Image model | `@cf/stabilityai/stable-diffusion-xl-base-1.0` |

### OpenAI-Compatible Services

| Variable | Description | Default |
|----------|-------------|---------|
| `OAILIKE_API_KEY` | API key | `null` |
| `OAILIKE_API_BASE` | Base URL | `https://api.openai.com/v1` |
| `OAILIKE_CHAT_MODEL` | Chat model | `gpt-4o-mini` |
| `OAILIKE_IMAGE_MODEL` | Image model | `dall-e-3` |
| `OAILIKE_VISION_MODEL` | Vision model | `gpt-4o-mini` |
| `OAILIKE_IMAGE_SIZE` | Image size | `1024x1024` |
| `OAILIKE_EMBEDDING_MODEL` | Embedding model | `text-embedding-3-small` |
| `OAILIKE_RERANK_MODEL` | Rerank model | `''` |
| `OAILIKE_STT_MODEL` | Speech-to-text model | `FunAudioLLM/SenseVoiceSmall` |
| `OAILIKE_TTS_MODEL` | Text-to-speech model | `tts-1` |
| `OAILIKE_TTS_VOICE` | TTS voice | `alloy` |
| `OAILIKE_API_EXTRA_PARAMS` | Extra parameters | `{}` |
| `OAILIKE_MODELS` | Available models list | `[]` |
| `OAILIKE_MODELS_API` | Models list API | `/models` |
| `OAILIKE_PROVIDER_OPTIONS` | Provider options | `{}` |
| `OAILIKE_VIDEO_CAPABLE_MODELS` | Model prefixes that support video input | `[]` |

**Video Input Support**:

Starting from `@ai-sdk/openai-compatible@3.0.35`, the SDK supports converting video content to `video_url` for compatible models. However, **most OpenAI-compatible models do NOT support video input**:

- ❌ **OpenAI (gpt-4o/gpt-5 series)**: Official API does not support `video_url`
- ❌ **xAI Grok**: Only supports images (jpg/png), no video input
- ✅ **Alibaba Qwen series**: `qwen-vl`, `qwen2-vl`, `qwen3-vl`, `qwen2.5-omni` support video via DashScope

If your OAILIKE backend actually supports video input models (e.g., Qwen3-VL), configure the `OAILIKE_VIDEO_CAPABLE_MODELS` whitelist:

```bash
# Configure model prefixes that support video (case-insensitive)
OAILIKE_VIDEO_CAPABLE_MODELS='["qwen3-vl", "qwen-vl", "qwen2-vl", "qwen2.5-omni"]'
```

**Models not in the whitelist**: When users send videos, they will be automatically converted to friendly text descriptions to avoid API errors.

**OpenAI-like Relay Tools**:
```bash
# Use other provider's tools through OpenAI-like interface
OAILIKE_RELAY_TOOLS='{"gemini": ["googleSearch", "codeExecution", "urlContext"]}'
USE_OAILIKE_RELAY_TOOLS='["googleSearch"]'
```

## 🛠️ AI Native Tools Configuration

### OpenAI Server-Side Tools

OpenAI Responses API provides server-side tools (available only when using Responses API).

#### Basic Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_BUILDIN` | Available tools list | `['webSearch', 'codeInterpreter', 'fileSearch', 'imageGeneration', 'mcp']` |
| `USE_OPENAI_BUILDIN` | Enabled tools | `[]` |
| `OPENAI_RESPONSE_MODELS` | Models using Response API | `['*']` |
| `OPENAI_PROVIDER_OPTIONS` | Provider options | See below |

**Provider Options**:
```javascript
OPENAI_PROVIDER_OPTIONS = {
  parallelToolCalls: true,        // Parallel tool calls
  reasoningSummary: 'auto',       // Reasoning summary: 'auto', 'concise', 'detailed'
  // metadata: {},                // Metadata
  // previousResponseId: '',      // Previous response ID
  // store: false,                // Whether to store
  // user: 'user1',               // User identifier
  // reasoningEffort: 'medium',   // Reasoning effort level
  // strictJsonSchema: true,      // Strict JSON schema
  // instructions: '',            // Instructions
  // serviceTier: 'auto',         // Service tier
  // include: ['reasoning.encrypted_content'],
}
```

#### Web Search - Web Search Tool

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_ENABLE_WEB_SEARCH` | Enable web search | `false` |
| `OPENAI_WEB_SEARCH_EXTERNAL_ACCESS` | Real-time web access | `true` |
| `OPENAI_WEB_SEARCH_ALLOWED_DOMAINS` | Allowed domains list | `[]` |
| `OPENAI_WEB_SEARCH_CONTEXT_SIZE` | Search context size | `medium` |
| `OPENAI_WEB_SEARCH_USER_LOCATION` | User location | `''` |

**Context Size Options**: `low`, `medium`, `high`
**Location Format**: `"City, Country"` or `"latitude,longitude"`

Example:
```bash
OPENAI_ENABLE_WEB_SEARCH=true
OPENAI_WEB_SEARCH_CONTEXT_SIZE='high'
OPENAI_WEB_SEARCH_USER_LOCATION='Beijing, China'
OPENAI_WEB_SEARCH_ALLOWED_DOMAINS='["wikipedia.org", "github.com"]'
```

#### Code Interpreter - Python Code Execution Tool

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_ENABLE_CODE_INTERPRETER` | Enable code interpreter | `false` |
| `OPENAI_CODE_INTERPRETER_CONTAINER` | Container ID (optional) | `''` |

#### File Search - Vector Search Tool

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_ENABLE_FILE_SEARCH` | Enable file search | `false` |
| `OPENAI_FILE_SEARCH_VECTOR_STORES` | Vector store IDs | `[]` |
| `OPENAI_FILE_SEARCH_MAX_RESULTS` | Max results | `10` |
| `OPENAI_FILE_SEARCH_SCORE_THRESHOLD` | Relevance threshold (0-1) | `0.0` |

Example:
```bash
OPENAI_ENABLE_FILE_SEARCH=true
OPENAI_FILE_SEARCH_VECTOR_STORES='["vs_abc123", "vs_def456"]'
OPENAI_FILE_SEARCH_MAX_RESULTS=20
OPENAI_FILE_SEARCH_SCORE_THRESHOLD=0.5
```

#### Image Generation - Image Generation Tool (GPT-5.1+)

| Variable | Description | Default | Options |
|----------|-------------|---------|---------|
| `OPENAI_ENABLE_IMAGE_GENERATION` | Enable image generation | `false` | - |
| `OPENAI_IMAGE_BACKGROUND` | Background type | `auto` | `auto`, `opaque`, `transparent` |
| `OPENAI_IMAGE_INPUT_FIDELITY` | Input fidelity | `low` | `low`, `high` |
| `OPENAI_IMAGE_MODEL` | Image generation model | `gpt-image-1` | - |
| `OPENAI_IMAGE_OUTPUT_COMPRESSION` | Output compression (0-100) | `100` | - |
| `OPENAI_IMAGE_OUTPUT_FORMAT` | Output format | `png` | `png`, `jpeg`, `webp` |
| `OPENAI_IMAGE_PARTIAL_IMAGES` | Partial images count (0-3) | `0` | - |
| `OPENAI_IMAGE_QUALITY` | Image quality | `auto` | `auto`, `low`, `medium`, `high` |
| `OPENAI_IMAGE_SIZE` | Image size | `auto` | `auto`, `1024x1024`, `1024x1536`, `1536x1024` |

#### MCP - Model Context Protocol

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_ENABLE_MCP` | Enable MCP | `false` |
| `OPENAI_MCP_SERVER_LABEL` | MCP server label (required) | `''` |
| `OPENAI_MCP_SERVER_URL` | MCP server URL | `''` |
| `OPENAI_MCP_CONNECTOR_ID` | Service connector ID | `''` |
| `OPENAI_MCP_SERVER_DESCRIPTION` | Server description | `''` |
| `OPENAI_MCP_ALLOWED_TOOLS` | Allowed tools list | `[]` |
| `OPENAI_MCP_ALLOWED_TOOLS_READ_ONLY` | Read-only tools only | `false` |
| `OPENAI_MCP_AUTHORIZATION` | OAuth access token | `''` |
| `OPENAI_MCP_HEADERS` | Custom HTTP headers | `{}` |
| `OPENAI_MCP_REQUIRE_APPROVAL` | Tool execution approval | `never` |
| `OPENAI_MCP_APPROVAL_TOOL_NAMES` | Tools requiring approval | `[]` |

> **Note**: Choose either `serverUrl` or `connectorId`

### Anthropic Server-Side Tools

Anthropic provides powerful server-side tools including web fetch, search, and code execution.

#### Basic Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_BUILDIN` | Available tools list | `['webFetch', 'webSearch', 'codeExecution']` |
| `USE_ANTHROPIC_BUILDIN` | Enabled tools | `[]` |
| `ANTHROPIC_ENABLE_CACHE_CONTROL` | Enable prompt caching | `true` |
| `ANTHROPIC_PROVIDER_OPTIONS` | Provider options | See below |

**Provider Options**:
```javascript
ANTHROPIC_PROVIDER_OPTIONS = {
  // sendReasoning: true,
  // thinking: {
  //   type: 'enabled',        // 'enabled' | 'disabled'
  //   budgetTokens: '1024',
  // },
}
```

#### Web Fetch - Web Fetching Tool

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_ENABLE_WEB_FETCH` | Enable web fetch | `false` |
| `ANTHROPIC_WEB_FETCH_MAX_USES` | Max uses | `5` |
| `ANTHROPIC_WEB_FETCH_ALLOWED_DOMAINS` | Allowed domains | `[]` |
| `ANTHROPIC_WEB_FETCH_BLOCKED_DOMAINS` | Blocked domains | `[]` |
| `ANTHROPIC_WEB_FETCH_ENABLE_CITATIONS` | Enable citations | `true` |
| `ANTHROPIC_WEB_FETCH_MAX_CONTENT_TOKENS` | Max content tokens | `4000` |

#### Web Search - Web Search Tool

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_ENABLE_WEB_SEARCH` | Enable web search | `false` |
| `ANTHROPIC_WEB_SEARCH_MAX_USES` | Max uses | `5` |
| `ANTHROPIC_WEB_SEARCH_ALLOWED_DOMAINS` | Allowed domains | `[]` |
| `ANTHROPIC_WEB_SEARCH_BLOCKED_DOMAINS` | Blocked domains | `[]` |
| `ANTHROPIC_WEB_SEARCH_USER_LOCATION` | User location | `''` |

#### Code Execution - Code Execution Tool

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_ENABLE_CODE_EXECUTION` | Enable code execution (Python + Bash) | `false` |

#### Tool Streaming - Fine-grained Tool Streaming

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_ENABLE_TOOL_STREAMING` | Enable tool streaming (real-time progress) | `true` |

#### Context Management - Auto Context Cleanup

Automatically cleans up historical tool calls to avoid excessive context length:

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_ENABLE_CONTEXT_MANAGEMENT` | Enable context management | `true` |
| `ANTHROPIC_CONTEXT_CLEAR_TRIGGER` | Trigger mode | `auto` |
| `ANTHROPIC_CONTEXT_KEEP_RECENT` | Keep recent N tool calls | `5` |
| `ANTHROPIC_CONTEXT_CLEAR_AT_LEAST` | Clear at least N thousand tokens | `2` |
| `ANTHROPIC_CONTEXT_CLEAR_TOOL_INPUTS` | Clear tool input params | `false` |
| `ANTHROPIC_CONTEXT_EXCLUDE_TOOLS` | Excluded tools | `[]` |

**Trigger Modes**: `auto` (automatic) | `manual` (manual)

#### Thinking Cleanup Configuration

For reasoning models like Claude 3.7 Sonnet:

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_ENABLE_THINKING_CLEANUP` | Enable thinking cleanup | `false` |
| `ANTHROPIC_THINKING_KEEP_RECENT` | Keep recent N thinking rounds | `3` |

#### Structured Output Mode

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_STRUCTURED_OUTPUT_MODE` | Structured output mode | `auto` |

**Mode Options**:
- `outputFormat`: Use output format (more flexible, recommended)
- `tool`: Use tool mode (strict validation)
- `auto`: Automatic selection

### Google Built-in Tools

Google Gemini provides various built-in tools.

> **🆕 Gemini 3 Tool Combination Support**: Gemini 3 models (e.g., `gemini-3-flash-preview`) support combining Google built-in tools with custom function tools in a single request. Older versions (Gemini 2.x and earlier) can only use Google tools OR custom tools, not both.

#### Basic Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_BUILDIN` | Available tools list | `['googleSearch', 'codeExecution', 'urlContext', 'googleMaps', 'fileSearch', 'enterpriseWebSearch']` |
| `USE_GOOGLE_BUILDIN` | Enabled tools | `[]` |
| `GOOGLE_PROVIDER_OPTIONS` | Provider options | See below |

**Tool Compatibility**:
- **Gemini 3.x**: ✅ Supports Google tools + custom tools combination, ⚠️ Maps and Code Execution still cannot be used together (Google API limitation)
- **Gemini 2.x**: ⚠️ Google tools and custom tools are mutually exclusive, ⚠️ Maps and Code Execution cannot be used together
- **Gemini 1.x**: ❌ Does not support Google Maps

#### Google Search Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_SEARCH_ENABLE_WEB_SEARCH` | Enable web search | `true` |
| `GOOGLE_SEARCH_ENABLE_IMAGE_SEARCH` | Enable image search (for image-capable models) | `false` |
| `GOOGLE_SEARCH_TIME_RANGE_FILTER` | Time range filter for search results | `{}` |

**Time Range Filter Example**:
```bash
GOOGLE_SEARCH_TIME_RANGE_FILTER='{"startTime": "2025-01-01T00:00:00Z", "endTime": "2025-12-31T23:59:59Z"}'
```

**Image Search**: Only works with image-capable models like `gemini-3.1-flash-image-preview`. When enabled, the model can search for and generate images based on search results.

**Provider Options**:
```javascript
GOOGLE_PROVIDER_OPTIONS = {
  // responseModalities: ['TEXT'],
  // thinkingConfig: {
  //   thinkingBudget: '1024',
  //   includeThoughts: false,
  // },
  // cachedContent: '',
  // structuredOutputs: false,
  safetySettings: [
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
  ],
  threshold: 'OFF',
  // useSearchGrounding: true,
  // dynamicRetrievalConfig: {
  //   mode: 'MODE_DYNAMIC',
  //   dynamicThreshold: 5,
  // },
}
```

#### File Search (RAG)

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_FILE_SEARCH_STORES` | File search stores | `[]` |
| `GOOGLE_FILE_SEARCH_TOP_K` | Top-K results | `10` |
| `GOOGLE_FILE_SEARCH_METADATA_FILTER` | Metadata filter | `''` |

Example:
```bash
GOOGLE_FILE_SEARCH_STORES='["fileSearchStores/my-store-123"]'
```

#### Google Maps Grounding

Provides location context for location-aware responses:

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_RETRIEVAL_CONFIG` | Retrieval config (lat/lng) | `{}` |
| `GOOGLE_MAPS_MODEL` | Model for Maps tool | `gemini-2.5-flash` |

Example:
```bash
GOOGLE_RETRIEVAL_CONFIG='{"latLng": {"latitude": 39.9042, "longitude": 116.4074}}'
```

> **Note**: 
> - Gemini 2.x and 3.x support Google Maps
> - **All versions**: Maps and Code Execution cannot be used together (Google API limitation)

#### Gemini 3 Pro Image Configuration

| Variable | Description | Default | Options |
|----------|-------------|---------|---------|
| `GOOGLE_IMAGE_ASPECT_RATIO` | Image aspect ratio | `null` | `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9` |
| `GOOGLE_IMAGE_SIZE` | Image resolution | `null` | `1K`, `2K`, `4K` |
| `GOOGLE_IMAGE_ENABLE_GOOGLE_SEARCH` | Enable Google Search grounding | `false` | - |
| `GOOGLE_IMAGE_THINKING_LEVEL` | Thinking depth for gemini-3.1-flash-image | `minimal` | `minimal`, `high` |

### xAI Server-Side Tools

xAI Grok provides web search, X search, and code execution tools.

#### Basic Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `XAI_BUILDIN` | Available tools list | `['webSearch', 'xSearch', 'codeExecution']` |
| `USE_XAI_BUILDIN` | Enabled tools | `[]` |
| `XAI_PROVIDER_OPTIONS` | Provider options | `{}` |

**Provider Options**:
```javascript
XAI_PROVIDER_OPTIONS = {
  // reasoningEffort: 'high',  // Reasoning effort level
}
```

#### Web Search - Web Search

| Variable | Description | Default |
|----------|-------------|---------|
| `XAI_ENABLE_WEB_SEARCH` | Enable web search | `false` |
| `XAI_WEB_SEARCH_ALLOWED_DOMAINS` | Allowed domains (max 5) | `[]` |
| `XAI_WEB_SEARCH_EXCLUDED_DOMAINS` | Excluded domains (max 5) | `[]` |
| `XAI_WEB_SEARCH_IMAGE_UNDERSTANDING` | Enable image understanding | `false` |

#### X Search - X/Twitter Search

| Variable | Description | Default |
|----------|-------------|---------|
| `XAI_ENABLE_X_SEARCH` | Enable X search | `false` |
| `XAI_X_SEARCH_ALLOWED_HANDLES` | Allowed handles (max 10) | `[]` |
| `XAI_X_SEARCH_EXCLUDED_HANDLES` | Excluded handles (max 10) | `[]` |
| `XAI_X_SEARCH_IMAGE_UNDERSTANDING` | Enable image understanding | `false` |
| `XAI_X_SEARCH_VIDEO_UNDERSTANDING` | Enable video understanding | `false` |

#### Code Execution - Code Execution

| Variable | Description | Default |
|----------|-------------|---------|
| `XAI_ENABLE_CODE_EXECUTION` | Enable code execution (Python sandbox) | `false` |

## 🎙️ Voice Services Configuration

### Fish Audio TTS

Fish Audio provides high-quality Chinese voice synthesis.

| Variable | Description | Default |
|----------|-------------|---------|
| `FISH_API_KEY` | Fish Audio API key | `null` |
| `FISH_API_BASE` | API base URL | `https://api.fish.audio/v1` |
| `FISH_TTS_VOICE` | Voice reference ID | `''` |
| `FISH_TTS_MODEL` | TTS model | `speech-1.6` |
| `FISH_TTS_EXTRA_PARAMS` | Extra parameters | `{}` |

#### Preset Chinese Voice References

Built-in voice reference IDs (set via `FISH_TTS_VOICE`):

| Name | Reference ID |
|------|-------------|
| Ding Zhen | `54a5170264694bfc8e9ad98df7bd89c3` |
| Lei Jun | `4462fa28f3824bff808a94a6075570e5` |
| Xiao Ming | `4f77d5137e15401b96617895a2275923` |
| CCTV Voice | `59cb5986671546eaa6ca8ae6f29f6d22` |
| McDonald's | `4066d617322e41abb30ed70eaeaf273f` |
| Uma Musume | `0eb38bc974e1459facca38b359e13511` |
| Zheng Xiangzhou | `63393102cf1248849477da56ee5dc3ae` |
| Cai Xukun | `e4642e5edccd4d9ab61a69e82d4f8a14` |
| Female Student | `5c353fdb312f4888836a9a5680099ef0` |
| Dong Yuhui | `8f454f665d214e4284ba05f703b63960` |
| Black Hand | `f7561ff309bd4040a59f1e600f4f4338` |
| Nai Long (Best) | `3d1cb00d75184099992ddbaf0fdd7387` |
| Tao Jin | `acb16651a5e14be89b7826a2e24687cd` |
| Deng Ziqi | `3b55b3d84d2f453a98d8ca9bb24182d6` |
| Guo Degang | `4914b8e04e2148118c91f322d409ccc6` |
| Andy Lau | `cb03a4a3ff6a4784b319cde85a07e31c` |

Example:
```bash
AI_TTS_PROVIDER='fish'
FISH_API_KEY='your_fish_api_key'
FISH_TTS_VOICE='Nai Long (Best)'
```

### Google TTS

#### Multi-Speaker Configuration

Google TTS supports multi-speaker configuration:

```bash
GOOGLE_TTS_EXTRA_PARAMS='{
  "multi_speaker_voice_config": {
    "speaker_voice_configs": [
      {
        "speaker": "Speaker1",
        "voice_config": {
          "prebuilt_voice_config": {
            "voice_name": "Kore"
          }
        }
      },
      {
        "speaker": "Speaker2",
        "voice_config": {
          "prebuilt_voice_config": {
            "voice_name": "Puck"
          }
        }
      }
    ]
  },
  "language_code": "en-US"
}'
```

> **Note**: Multi-speaker config is mutually exclusive with `GOOGLE_TTS_VOICE`

## 👤 User Configuration

Users can modify these settings via Telegram commands. Use `/setenv KEY=VALUE` to set individual values or `/setenvs {"KEY1": "VALUE1", "KEY2": "VALUE2"}` for batch updates.

### Chat Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `AI_CHAT_PROVIDER` | Current AI provider | `openai` |
| `SYSTEM_INIT_MESSAGE` | System prompt | Auto-selected by language |
| `CHAT_MODEL` | Model override | Provider default |
| `MAX_HISTORY_LENGTH` | History length | `10` |
| `CHAT_TEMPERATURE` | Response creativity | `undefined` |
| `MAX_TOKENS` | Max response length | `undefined` |

### Advanced Chat Features

| Variable | Description | Default |
|----------|-------------|---------|
| `USE_TOOLS` | Enabled tools | `[]` |
| `USE_MCP` | Enabled MCP servers | `[]` |
| `TOOL_MODEL` | Model for tool calls | `''` |
| `MAX_STEPS` | Max tool steps | `3` |
| `MAX_RETRIES` | Max retries | `0` |
| `ENABLE_INTELLIGENT_MODEL` | Auto model switching | `false` |

### Media & Voice

| Variable | Description | Default | Options |
|----------|-------------|---------|---------|
| `AI_IMAGE_PROVIDER` | Image generator | `openai` | `openai`, `azure`, `workers`, etc. |
| `AI_TTS_PROVIDER` | Text-to-speech | `openai` | `openai`, `google`, `fish` |
| `AI_ASR_PROVIDER` | Speech recognition | `openai` | `openai`, `openailike` |
| `TEXT_HANDLE_TYPE` | Text processing | `text` | `text`, `tts`, `chat` |
| `TEXT_OUTPUT` | Text output format | `text` | `text`, `audio` |
| `AUDIO_HANDLE_TYPE` | Audio processing | `stt` | `stt`, `audio`, `chat` |
| `AUDIO_OUTPUT` | Audio output format | `text` | `text`, `audio` |

### Message Customization

| Variable | Description | Default | Format |
|----------|-------------|---------|--------|
| `MESSAGE_REPLACER` | Text replacements | `{}` | `{"old": "new"}` |
| `PROMPT` | Custom prompts | `{}` | `{"role": "prompt"}` |
| `MAPPING_KEY` | Command shortcuts | See below | Pipe-separated |
| `MAPPING_VALUE` | Shortcut values | `''` | Pipe-separated |

Default `MAPPING_KEY`:
```
-p:SYSTEM_INIT_MESSAGE|-n:MAX_HISTORY_LENGTH|-a:AI_CHAT_PROVIDER|-ai:AI_IMAGE_PROVIDER|-m:CHAT_MODEL|-md:CURRENT_MODE|-v:VISION_MODEL|-t:OPENAI_TTS_MODEL|-ex:OPENAI_API_EXTRA_PARAMS|-mk:MAPPING_KEY|-mv:MAPPING_VALUE|-tm:TOOL_MODEL|-tool:USE_TOOLS|-oli:IMAGE_MODEL|-th:TEXT_HANDLE_TYPE|-to:TEXT_OUTPUT|-ah:AUDIO_HANDLE_TYPE|-ao:AUDIO_OUTPUT|-act:AUDIO_CONTAINS_TEXT|-as:AI_ASR_PROVIDER|-at:AI_TTS_PROVIDER|-ra:RERANK_AGENT|-ew:ENABLE_WORKFLOW|-tp:CHAT_TEMPERATURE
```

## 📋 Commands

### Built-in Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/help` | Show help | `/help` |
| `/new` | Start new conversation | `/new` |
| `/start` | Get user ID and start | `/start` |
| `/img` | Generate image | `/img A beautiful sunset` |
| `/version` | Check version | `/version` |
| `/setenv` | Set configuration | `/setenv AI_CHAT_PROVIDER=claude` |
| `/setenvs` | Batch set config | `/setenvs {"CHAT_MODEL": "gpt-4"}` |
| `/delenv` | Delete configuration | `/delenv CHAT_MODEL` |
| `/system` | Show system info | `/system` |
| `/redo` | Regenerate response | `/redo` or `/redo Modified prompt` |
| `/set` | Quick settings | `/set -a claude` |
| `/settings` | Show current settings | `/settings` |
| `/history` | Show chat history | `/history` |
| `/model` | Show/change model | `/model` |
| `/cron` | Manage scheduled AI tasks | `/cron add 09:00 Daily summary` |
| `/profile` | View/update user profile | `/profile set language zh` |

### Scheduled Tasks (Docker Deployment)

Use the `/cron` command to set up scheduled AI tasks. The bot will automatically send your prompt to AI at the specified time and deliver the generated response to the chat.

| Command | Description | Example |
|---------|-------------|---------|
| `/cron list` | List all tasks for current chat | `/cron list` |
| `/cron add` | Add a scheduled task | `/cron add 09:00 Daily summary` |
| `/cron del` | Delete a task | `/cron del abc123` |
| `/cron on` | Enable a task | `/cron on abc123` |
| `/cron off` | Disable a task | `/cron off abc123` |

**Time Format:**
- Simple format: `HH:MM` (daily, default timezone Asia/Shanghai)
- Full cron: `min hour day month weekday` (e.g., `0 9 * * 1-5` for weekdays at 9am)

**Use Case Examples:**
```bash
# Daily news & info
/cron add 08:00 Summarize today's tech news highlights
/cron add 09:00 What's the weather like today?

# Reminders
/cron add 12:00 Remind me to take a lunch break
/cron add 22:00 Time to rest, good night!

# Work & study assistant
/cron add 0 9 * * 1-5 What's my work plan for today? List my todos
/cron add 07:30 Give me an English word to learn today

# Group chat engagement
/cron add 10:00 Good morning everyone! Any topics to discuss today?
/cron add 0 12 * * 5 It's Friday! What are your weekend plans?

# Specify timezone
/cron add 09:00 Asia/Tokyo おはようございます
```

> **Note**: This feature is only available in Docker deployment mode. Cloudflare Workers does not support dynamic scheduled tasks.

### Custom Commands

Create shortcuts by setting environment variables with prefix `CUSTOM_COMMAND_`:

```bash
# Environment Variables
CUSTOM_COMMAND_azure='/setenvs {"AI_CHAT_PROVIDER": "azure"}'
CUSTOM_COMMAND_gpt4='/setenvs {"AI_CHAT_PROVIDER": "openai", "OPENAI_CHAT_MODEL": "gpt-4"}'
CUSTOM_COMMAND_cn2en='/setenvs {"SYSTEM_INIT_MESSAGE": "You are a translator. Translate everything to English."}'

# Add descriptions
COMMAND_DESCRIPTION_azure='Switch to Azure OpenAI'
COMMAND_DESCRIPTION_gpt4='Switch to GPT-4'
COMMAND_DESCRIPTION_cn2en='Chinese to English translator'

# Set command scope
COMMAND_SCOPE_azure='all_private_chats,all_group_chats'
```

## 🔧 Advanced Features

### QSTASH Async Processing

Use Upstash QStash for asynchronous message processing (suitable for long-running tasks):

| Variable | Description | Default |
|----------|-------------|---------|
| `QSTASH_URL` | QStash API URL | `https://qstash.upstash.io` |
| `QSTASH_TOKEN` | QStash Token | `''` |
| `QSTASH_PUBLISH_URL` | Callback URL (your webhook domain) | `''` |
| `QSTASH_TRIGGER_PREFIX` | Trigger prefix | `''` |
| `QSTASH_TIMEOUT` | Timeout duration | `15m` |

> **Note**: Free account max timeout is 15 minutes

Example:
```bash
QSTASH_TOKEN='your_qstash_token'
QSTASH_PUBLISH_URL='https://your-bot.workers.dev'
QSTASH_TIMEOUT='15m'
```

### Telegram Media Processing

#### Image and File Handling

| Variable | Description | Default |
|----------|-------------|---------|
| `TELEGRAM_PHOTO_SIZE_OFFSET` | Photo size offset | `-2` |
| `TELEGRAM_IMAGE_TRANSFER_MODE` | Image transfer mode | `url` |
| `SEND_IMAGE_AS_FILE` | Send images as files | `false` |
| `ENABLE_FILE` | Enable file reading (deprecated) | `true` |
| `SUPPORT_FORMAT` | Supported file formats | `['text', 'photo', 'voice', 'audio', 'image']` |
| `FILE_SIZE_LIMIT` | File size limit (when folding enabled) | `-1` |

**Photo Size Offset**:
- `0`: First (smallest)
- `-1`: Last (largest)
- `-2`: Second highest quality (default, recommended)

**Image Transfer Mode**:
- `url`: Transfer via URL (recommended)
- `base64`: Transfer via base64 encoding

**Supported Formats**:
- `text`: Text files
- `photo`: Photos
- `voice`: Voice messages
- `audio`: Audio files
- `video`: Video files (model-dependent)
- `document`: Documents (images, audio, text as files)
- `sticker`: Stickers (gif, jpg, png, webp, webm as video)
- `image`: Image files

#### Media Message Storage

| Variable | Description | Default |
|----------|-------------|---------|
| `STORE_MEDIA_MESSAGE` | Store media group file IDs | `false` |
| `STORE_TEXT_CHUNK_MESSAGE` | Store chunked text messages | `false` |
| `STORE_HISTORY_LENGTH` | Store history message length | `64` |

#### Audio Processing

| Variable | Description | Default | Options |
|----------|-------------|---------|---------|
| `AUDIO_TEXT_FORMAT` | Audio text format | `undefined` | `spoiler`, `bold`, `italic`, `underline`, `strikethrough`, `code`, `pre` |
| `AUDIO_PROMPT` | Audio prompt | See below | - |

Default audio prompt:
```
Please listen to the audio file. Identify and understand the question being asked in the audio. Then, provide a detailed explanation and answer to this question. Ensure your answer is helpful and explains the solution or information clearly.
```

### Message Display and Control

#### Message Folding and Quoting

| Variable | Description | Default |
|----------|-------------|---------|
| `ADD_QUOTE_LIMIT` | Auto-quote threshold (characters) | `-1` |
| `ADD_QUOTE_SCOPE` | Fold message scope | `['group', 'supergroup']` |
| `QUOTE_EXPANDABLE` | Quote messages expandable | `false` |
| `LOG_POSITION_ON_TOP` | Log position on top | `true` |

**Scope Options**: `group`, `supergroup`, `private`

#### Message Compatibility and Display

| Variable | Description | Default |
|----------|-------------|---------|
| `MESSAGE_COMPATIBLE` | Convert tool_call/tool_result to user message | `true` |
| `ENABLE_SEARCH_SOURCE` | Display search sources | `true` |
| `SHOW_THINKING_TEXT` | Display AI reasoning process | `true` |
| `EXPANDABLE_THINKING` | Use collapsible blockquote for thinking | `true` |

#### Inline Queries

| Variable | Description | Default |
|----------|-------------|---------|
| `INLINE_QUERY_SEND_INTERVAL` | Inline query send interval (ms) | `2000` |
| `INLINE_QUERY_SHOW_INFO` | Inline query show info | `false` |

#### Callback Query Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `CALLBACK_QUERY_RC` | Inline keyboard row x column | `7x2` |
| `ENVS_VARIABLES` | Environment variables shown in callback | `[]` |
| `CALLBACK_MENU` | Callback menu options | `[]` |

**Available Menu Options**:
- `AI_CHAT_PROVIDER`
- `AI_IMAGE_PROVIDER`
- `AI_TTS_PROVIDER`
- `AI_ASR_PROVIDER`
- `USE_TOOLS`
- `USE_MCP`
- `USE_OAILIKE_RELAY_TOOLS`
- `CHAT_MODEL`
- `IMAGE_MODEL`
- `VISION_MODEL`
- `TOOL_MODEL`
- `ENVS`
- `RERANK_AGENT`

Example:
```bash
CALLBACK_MENU='["AI_CHAT_PROVIDER", "CHAT_MODEL", "USE_TOOLS"]'
ENVS_VARIABLES='["OPENAI_API_KEY", "ANTHROPIC_API_KEY"]'
```

### Function Calling & Tools

Configure tools for enhanced AI capabilities:

```bash
# Enable built-in tools
USE_TOOLS='["web_search", "image_generation", "weather"]'

# External API keys for tools
PLUGIN_ENV_JINA_API_KEY='your_jina_key'
PLUGIN_ENV_QWEATHER_TOKEN='your_weather_token'
```

### Custom Tools

Create custom tools with environment variables:

```bash
# Tool definition
PLUGIN_FUNCTION_weather='{
  "name": "weather",
  "description": "Get weather information",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {"type": "string", "description": "City name"}
    }
  }
}'

# Tool environment variables
PLUGIN_ENV_WEATHER_API_KEY='your_api_key'
```

### MCP (Model Context Protocol)

Configure MCP servers for extended capabilities:

```bash
# SSE-based MCP server
MCP_example='{
  "type": "sse",
  "url": "https://api.example.com/mcp",
  "headers": {"Authorization": "Bearer your_token"}
}'

# HTTP MCP server (supports custom headers)
MCP_http='{
  "type": "http",
  "url": "https://api.example.com/mcp",
  "headers": {"Authorization": "Bearer your_token", "X-Custom-Header": "value"}
}'

# Local process MCP
MCP_local='{
  "type": "stdio",
  "command": "node",
  "args": ["server.js"],
  "cwd": "/path/to/mcp/server"
}'
```

**MCP Transport Types:**
- **SSE (Server-Sent Events)**: Uses one-way event stream, suitable for server push scenarios
- **HTTP (Streamable HTTP)**: Uses POST for sending messages and GET+SSE for receiving, supports custom headers
- **stdio**: Local process communication, suitable for locally deployed MCP servers

### Message Processing

| Variable | Description | Default |
|----------|-------------|---------|
| `CHAT_TRIGGER_PREFIX` | Trigger word for bot | `''` |
| `IGNORE_TEXT_PREFIX` | Prefixes to ignore | `[]` |
| `TELEGRAM_MIN_STREAM_INTERVAL` | Stream delay (ms) | `0` |
| `ADD_QUOTE_LIMIT` | Auto-quote threshold | `-1` |
| `TELEGRAPH_NUM_LIMIT` | Telegraph threshold | `-1` |
| `EXPIRED_TIME` | Message expiry (minutes) | `-1` |

### Display Options

| Variable | Description | Default |
|----------|-------------|---------|
| `ENABLE_SHOWINFO` | Show model info | `false` |
| `SHOW_PARTS` | Info sections to show | `['model', 'model_time', 'token']` |
| `CALL_INFO` | Show API call info | `true` |
| `DISABLE_WEB_PREVIEW` | Disable link previews | `false` |
| `SHOW_THINKING_TEXT` | Display AI reasoning process | `true` |
| `EXPANDABLE_THINKING` | Use collapsible blockquote for thinking | `true` |
| `SEND_IMAGE_AS_FILE` | Send images as files | `false` |

### Scheduling & Cleanup

| Variable | Description | Default |
|----------|-------------|---------|
| `CRON_CHECK_TIME` | Cleanup schedule | `''` |
| `SCHEDULE_GROUP_DELETE_TYPE` | Group cleanup types | `['tip']` |
| `SCHEDULE_PRIVATE_DELETE_TYPE` | Private cleanup types | `['tip']` |

### Intelligent Context Compression

Auto-summarizes long conversations when approaching the model's context window limit. Protects head (system prompt + first N messages) and tail (last X tokens), compresses middle messages into an LLM-generated structured summary. Uses the cheapest available model for summary generation.

| Variable | Description | Default |
|----------|-------------|---------|
| `ENABLE_CONTEXT_COMPRESSION` | Enable/disable compression | `true` |
| `CONTEXT_COMPRESSION_THRESHOLD` | Trigger ratio of model context length | `0.60` |
| `CONTEXT_COMPRESSION_PROTECT_HEAD` | Head messages to protect (after system prompt) | `3` |
| `CONTEXT_COMPRESSION_TAIL_BUDGET` | Tail token budget to protect | `15000` |
| `CONTEXT_COMPRESSION_SUMMARY_RATIO` | Summary token ratio of compressed range | `0.20` |

**Summary model selection (cheapest-first):**
- Google: `gemini-2.5-flash-lite` ($0.075/M input)
- OpenAI: `gpt-4o-mini` ($0.15/M input)
- xAI: `grok-4.1-fast` ($0.20/M input)
- Anthropic: `claude-haiku-4-5` ($1.00/M input)

Iterative summary updates are applied when compression runs multiple times. Orphaned tool call/result pairs are automatically cleaned up before compression.

### Subagent Delegation (Opt-in)

Spawn isolated child agents with independent conversation history. Useful for parallel research, multi-step independent workflows, or isolating data-heavy intermediate work from the parent context. Subagents cannot recursively delegate or send Telegram messages; the parent only sees the delegation call and the final summary.

| Variable | Description | Default |
|----------|-------------|---------|
| `ENABLE_DELEGATE_AGENT` | Enable delegation tool | `false` |
| `DELEGATE_MAX_CONCURRENT` | Max concurrent subagents | `3` |
| `DELEGATE_MAX_ITERATIONS` | Max iterations per subagent | `20` |
| `DELEGATE_MODEL` | Override model for subagents (optional) | `''` |

**Tool usage:**
- `delegate_task(goal, context)` — single task delegation
- `delegate_task(tasks)` — batch parallel delegation (up to `DELEGATE_MAX_CONCURRENT`)

**When to enable:** parallel comparison tasks, multi-step research that would flood parent context, isolated tests. Disabled by default due to cost and complexity.

### Browser Automation (Browserless.io)

Multi-backend browser tool. Primary backend is Browserless.io (cloud); supports API key rotation across multiple free-tier accounts to multiply quota, with automatic skipping of keys that hit 3+ consecutive failures. Tracks usage count and failure rate per key. Falls back to plain HTTP fetch when no key is configured. Playwright backend is reserved as a placeholder.

| Variable | Description | Default |
|----------|-------------|---------|
| `BROWSERLESS_API_KEY` | Single API key | `''` |
| `BROWSERLESS_API_KEYS` | Comma-separated multiple keys | `''` |
| `BROWSERLESS_API_KEY_LIST` | JSON array of keys | `''` |
| `BROWSERLESS_URL` | Custom Browserless service URL | `''` |

**Tools exposed to AI:**
- `browser_navigate` — fetch page content with JavaScript rendering
- `browser_screenshot` — capture page screenshots (requires Browserless/Playwright)

No Docker image changes required — uses cloud service by default.

### User Profile & Memory

Persistent per-user (or per-group) profile auto-injected into system prompts so the bot remembers preferences across sessions. Stored via the existing KV interface (SQLite in Docker, persists across restarts with volume mount).

**Profile fields:**
- `language`: `zh`, `en`, `auto`
- `style`: `concise`, `detailed`, `balanced`
- `timezone`: e.g., `Asia/Shanghai`
- `notes`: free-form custom text
- Preferred tools tracking (auto)
- Interaction count tracking (auto)

**Commands:**
- `/profile` — view current profile
- `/profile set <key> <value>` — update a setting (e.g. `/profile set language zh`)
- `/profile clear` — clear all settings
- `/profile delete` — delete profile

**Group behavior:** controlled by existing `GROUP_CHAT_BOT_SHARE_MODE`.
- `true`: entire group shares one profile
- `false`: each member has an individual profile

Storage key format: `user_profile:${chat_id}:${bot_id}[:${from_id}]`.

## 🔒 Security & Configuration Lock

### Locked Configuration Keys

To prevent token leakage, certain keys are locked by default:

```bash
LOCK_USER_CONFIG_KEYS='OPENAI_API_BASE,GOOGLE_API_BASE,MISTRAL_API_BASE,COHERE_API_BASE,ANTHROPIC_API_BASE,AZURE_COMPLETIONS_API,AZURE_DALLE_API'
```

If you encounter "Key XXX is locked" errors, remove the key from this list to unlock it.

## 🐛 Troubleshooting

### Common Issues

1. **Bot not responding in groups**:
   - Add group ID to `CHAT_GROUP_WHITE_LIST`
   - Set bot as admin if group >2000 members
   - Disable privacy mode: `/setprivacy` → `Disable` in BotFather

2. **Key locked error**:
   - Remove key from `LOCK_USER_CONFIG_KEYS`
   - Or use system configuration instead of user configuration

3. **API timeout**:
   - Increase `CHAT_COMPLETE_API_TIMEOUT`
   - Check network connectivity
   - Verify API keys and endpoints

4. **High CPU usage on Cloudflare Workers**:
   - Use Docker deployment instead
   - Reduce `MAX_HISTORY_LENGTH`
   - Disable unnecessary features

### Debug Mode

Enable debugging for troubleshooting:

```bash
DEBUG_MODE=true
DEV_MODE=true
LOG_LEVEL=debug
```

### Getting Help

1. Check [GitHub Issues](https://github.com/SzeMeng76/ChatGPT-Telegram-Workers/issues)
2. Review [Deployment Guide](DEPLOY.md)
3. Join our community discussions

---

## 📝 Configuration Examples

### Basic Setup
```bash
TELEGRAM_AVAILABLE_TOKENS='123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
OPENAI_API_KEY='sk-...'
LANGUAGE='en'
CHAT_WHITE_LIST='12345678,87654321'
```

### Multi-Provider Setup
```bash
# Multiple AI providers
OPENAI_API_KEY='sk-openai-key'
ANTHROPIC_API_KEY='sk-ant-key'
GOOGLE_API_KEY='google-key'

# User can switch with /setenv AI_CHAT_PROVIDER=claude
```

### Advanced Features
```bash
# Enable tools and MCP
USE_TOOLS='["web_search", "image_generation"]'
USE_MCP='["weather_server"]'
ENABLE_INTELLIGENT_MODEL=true

# Custom shortcuts
MAPPING_VALUE='gpt4:gpt-4o|claude:claude-3-5-sonnet-20240620|mini:gpt-4o-mini'
```

For more examples and use cases, see the [deployment documentation](DEPLOY.md).