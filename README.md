# ChatGPT Telegram Workers

[![Build and Push Docker Image](https://github.com/SzeMeng76/ChatGPT-Telegram-Workers/actions/workflows/build-docker.yml/badge.svg)](https://github.com/SzeMeng76/ChatGPT-Telegram-Workers/actions/workflows/build-docker.yml)

<p align="center">
    <br> English | <a href="README_CN.md">中文</a>
</p>

<p align="center">
    <em>A powerful multi-AI provider Telegram bot with flexible deployment options</em>
</p>

## 📚 Overview

This is a significantly refactored ChatGPT Telegram bot project that supports multiple AI service providers, rich features, and flexible deployment options.

### 🌟 Key Features

**🤖 Multi-AI Provider Support**
- OpenAI (GPT-3.5, GPT-4, GPT-4o, etc.)
- Azure OpenAI
- Anthropic Claude
- Google Gemini & Vertex AI
- xAI Grok
- Mistral AI
- Cohere
- Cloudflare Workers AI
- And more OpenAI-compatible services

**🛠️ Powerful Capabilities**
- **Server-Side Tools**: Native integration with AI provider tools
  - **Anthropic**: webFetch, webSearch, codeExecution with tool streaming
  - **xAI Grok**: webSearch with domain filtering, X/Twitter search, codeExecution
  - **Google Gemini**: googleSearch, urlContext, codeExecution, googleMaps, fileSearch
  - **OpenAI**: webSearch, codeInterpreter, fileSearch, imageGeneration, MCP
- **Function Calling**: Built-in tool functions with support for custom functions via environment variables
- **Image & Video Generation**:
  - Images: DALL-E, Google Imagen, Kling AI, Vertex AI, Workers AI, xAI, **Black Forest Labs (FLUX.2)**
  - Videos: Google Veo 3.1 Fast (8-second videos with audio)
- **Music Generation**:
  - Google Lyria 3 Clip (30-second clips)
  - Google Lyria 3 Pro (full-length songs with verses, choruses, bridges)
  - Support for custom lyrics, multi-language, timestamp control, and instrumental tracks
- **Voice Processing**:
  - TTS: OpenAI, Google, Fish Audio with multi-speaker support
  - ASR: Automatic Speech Recognition from voice messages
- **Real-time Streaming**: Optimized message sending with near-zero latency
- **Intelligent Model Switching**: Automatically adjust AI models based on conversation context
- **Inline Queries**: Support for Telegram inline message functionality
- **Guest Mode** (Bot API 10.0): Respond in groups the bot is not a member of via `@mention` — streams, multimodal input, `MESSAGE_REPLACER`/`/set` all work
- **Bot-to-Bot Communication** (Bot API 10.0): Optional multi-agent flow with allowlist-based loop protection
- **Rich Message** (Bot API 10.1, `USE_RICH_MESSAGE`, default on): Server-side Markdown parsing with no manual escaping, including expandable quote blocks
- **Plugin System**: Customizable plugins with template interpolation
- **MCP Support**: Model Context Protocol integration
- **Web Crawler**: Pattern-based HTML extraction with dynamic content support
- **Browser Automation**: Browserless.io integration with API key rotation, load balancing, and failure tracking across multiple accounts; supports JavaScript-rendered page fetching and screenshots
- **Workflow System**: Multi-step AI processing with @key triggers
- **Intelligent Context Compression**: Auto-trigger at 60% of model context length; protects head (system prompt + first 3 messages) and tail (last 15K tokens); compresses middle into LLM-generated structured summary using cheapest models (gemini-2.5-flash-lite, gpt-4o-mini, etc.)
- **Subagent Delegation** (opt-in): Spawn isolated child agents with independent history for parallel research or multi-step independent workflows; max 3 concurrent, uses cheaper models, parent only sees delegation call and final summary
- **User Profile & Memory**: Persistent per-user profile (language, communication style, timezone, custom notes) auto-injected into system prompts; shared or individual mode in groups

**💬 Chat Enhancements**
- **Multi-language Support**: Chinese, English, Portuguese, etc.
- **Custom Trigger Words**: Configurable bot response keywords
- **Message Replacement**: Custom replacement rules to simplify environment variable management
- **Long Text Processing**: Smart splitting with Telegraph article conversion and file output, intelligent rendering fallback (MarkdownV2 → HTML → Plain Text → Telegraph)
- **Quote Message Merging**: Automatic handling of reply messages with expandable content
- **Group Management**: Smart group responses with @mention detection, per-user context, and speaker identification
- **Group Message Listening Mode**: Cache group message history so AI can see full conversation context when triggered (configurable cache size and TTL)
- **Telegraph Integration**: Auto-convert long messages to articles with configurable thresholds
- **Social Media Search**: Built-in Xiaohongshu (Little Red Book) integration
- **App Store IAP**: Cross-country in-app purchase price lookup

**🔧 Management Features**
- **Gateway Dashboard**: Web-based control panel at `/admin`
  - Real-time status monitoring and uptime tracking
  - Usage statistics (total users, groups, messages)
  - Cron task management with enable/disable/delete controls
  - Token-based authentication via `ADMIN_TOKEN` environment variable
- **Cron Scheduled Tasks**: User-configurable scheduled AI messages
  - `/cron add` - Create scheduled tasks with cron expressions
  - `/cron list` - View all tasks for current chat
  - `/cron del` - Delete tasks
  - `/cron on/off` - Enable/disable tasks
  - Timezone support with configurable `TIMEZONE` environment variable
- **Multiple Commands**:
  - `/set` - Advanced settings with mapping and workflow support
  - `/settings` - Quick settings menu
  - `/history` - Export full chat history as JSON
  - `/model` - Switch AI models
  - `/map` - Manage model alias mappings
  - `/tts` - Text-to-Speech with voice customization
  - `/kling` - KlingAI image/video generation
  - `/inline` - Inline query functionality
  - `/perplexity` - Perplexity AI integration
  - `/block` / `/blocklist` - User blocking management
  - `/redo` - Retry last message
  - `/profile` - View/update user profile (language, style, timezone, notes)
- **User Configuration**: Personalized settings with multi-user support
- **Whitelist/Blacklist**: Fine-grained access control with user-level blocking
- **Scheduled Message Deletion**: Automatic cleanup by message type with configurable TTL
- **Usage Statistics**: Display model names, token usage, latency, and timing information
- **Multi-Bot Support**: Manage multiple Telegram bots with per-bot configuration

### 🚀 Deployment Options

Multiple deployment methods to suit different needs:

#### Docker Deployment (Recommended)
```bash
# Using Docker Compose
docker-compose up -d

# Or directly with Docker
docker run -d \
  --name chatgpt-telegram-workers \
  -p 8787:8787 \
  -v ./config.json:/app/config.json:ro \
  -v ./wrangler.toml:/app/config.toml:ro \
  szemeng76/chatgpt-telegram-workers:latest
```

#### Cloudflare Workers
```bash
npm run build
npm run deploy:dist
```

#### Vercel
```bash
npm run build:vercel
npm run deploy:vercel
```

#### Local Development
```bash
npm install
npm run start:local
```

### 📦 Project Structure

```
src/
├── adapter/          # Adapter layer (Vercel, Local, etc.)
├── agent/           # AI service agents
│   ├── openai.ts    # OpenAI integration
│   ├── anthropic.ts # Anthropic integration
│   ├── google.ts    # Google AI integration
│   └── ...          # Other AI services
├── config/          # Configuration management
├── telegram/        # Telegram API handling
│   ├── handler/     # Message handlers
│   ├── command/     # Command processing
│   └── utils/       # Utility functions
├── tools/           # Tool function system
│   ├── internal/    # Built-in tools
│   └── external/    # External tool configurations
├── plugins/         # Plugin system
├── mcp/            # MCP protocol support
└── utils/          # Common utilities
```

### ⚙️ Configuration

The project uses environment variables for configuration, supporting multiple configuration methods:

1. **Environment Variables**: Direct environment variable settings
2. **config.json**: Local configuration file
3. **wrangler.toml**: Cloudflare Workers configuration

Key configuration options:
- `TELEGRAM_AVAILABLE_TOKENS`: Telegram bot tokens
- `OPENAI_API_KEY`: OpenAI API key
- `ANTHROPIC_API_KEY`: Anthropic API key
- `GOOGLE_API_KEY`: Google API key
- `XAI_API_KEY`: xAI Grok API key
- `BFL_API_KEY`: Black Forest Labs (FLUX) API key

**Advanced Configuration:**
- **Server-Side Tools**:
  - `USE_GOOGLE_BUILDIN`: Enable Google tools (googleSearch, urlContext, codeExecution, googleMaps)
  - `USE_XAI_BUILDIN`: Enable xAI tools (webSearch, xSearch, codeExecution)
  - `ANTHROPIC_WEB_FETCH_URLS`: Configure domains for Anthropic webFetch
  - `OPENAI_MCP_SERVERS`: OpenAI MCP server configuration
- **Workflow & Automation**:
  - `WORKFLOW`: Multi-step AI workflow definitions with @key triggers
  - `ENABLE_WORKFLOW`: Enable/disable workflow processing
  - `ENABLE_ALIAS`: Enable model alias mapping
- **Message Processing**:
  - `TELEGRAPH_NUM_LIMIT`: Convert messages longer than N characters to Telegraph
  - `TELEGRAPH_SCOPE`: Chat types for Telegraph (group/supergroup/private)
  - `QUOTE_EXPANDABLE`: Make quoted messages expandable
  - `ADD_QUOTE_LIMIT`: Quote folding threshold
  - `SHOW_THINKING_TEXT`: Display AI reasoning/thinking process (default: true)
  - `EXPANDABLE_THINKING`: Use collapsible blockquote for thinking text (default: true)
- **Group Message Listening**:
  - `GROUP_MESSAGE_LISTEN_MODE`: Enable group message listening mode (default: false)
  - `GROUP_MESSAGE_CACHE_SIZE`: Number of cached group messages (default: 20)
  - `GROUP_MESSAGE_CACHE_TTL`: Cache expiration time in seconds (default: 3600, 1 hour)
  - `CHAT_TRIGGER_PREFIX`: Group message trigger prefix (e.g., `/bot`, leave empty to use @mention or reply only)
- **Audio & Voice**:
  - `FISH_TTS_VOICE`: Fish Audio TTS voice reference ID
  - `GOOGLE_TTS_EXTRA_PARAMS`: Multi-speaker voice configuration
  - `AI_ASR_PROVIDER`: ASR (speech-to-text) provider: openai, oailike, google
  - `GOOGLE_STT_MODEL` / `GOOGLE_STT_EXTRA_PARAMS`: Google Gemini transcription model and transcription_config (language_codes, custom_vocabulary, mode, etc.)
  - `AUDIO_TEXT_FORMAT`: Audio transcription format (spoiler/bold/italic/code)
- **Model Parameters**:
  - `CHAT_TEMPERATURE`: Model temperature (0-2)
  - `FUNCTION_CALL_TEMPERATURE`: Separate temperature for tool calls
  - `MAX_STEPS`: Maximum tool execution steps (default: 5)
  - `OPENAI_REASONING_EFFORT`: Effort level for o1 models (low/medium/high)
  - `PARAMS_MODIFIER`: Per-model parameter overrides
- **Context Compression** (auto-summarize long conversations):
  - `ENABLE_CONTEXT_COMPRESSION`: Enable/disable compression (default: `true`)
  - `CONTEXT_COMPRESSION_THRESHOLD`: Trigger ratio of model context length (default: `0.60`)
  - `CONTEXT_COMPRESSION_PROTECT_HEAD`: Protected head message count (default: `3`)
  - `CONTEXT_COMPRESSION_TAIL_BUDGET`: Protected tail token budget (default: `15000`)
  - `CONTEXT_COMPRESSION_SUMMARY_RATIO`: Summary token ratio (default: `0.20`)
- **Subagent Delegation** (parallel isolated child agents, opt-in):
  - `ENABLE_DELEGATE_AGENT`: Enable delegation (default: `false`)
  - `DELEGATE_MAX_CONCURRENT`: Max concurrent subagents (default: `3`)
  - `DELEGATE_MAX_ITERATIONS`: Max iterations per subagent (default: `20`)
  - `DELEGATE_MODEL`: Override model for subagents (optional)
- **Browser Automation** (Browserless.io with key rotation):
  - `BROWSERLESS_API_KEY`: Single API key
  - `BROWSERLESS_API_KEYS`: Comma-separated multiple keys (rotation + load balancing)
  - `BROWSERLESS_API_KEY_LIST`: JSON array of keys
  - `BROWSERLESS_URL`: Custom Browserless service URL (optional)

For more configurations, see [Configuration Documentation](./doc/en/CONFIG.md)

### 🔍 Tech Stack

- **Framework**: TypeScript + Vite
- **AI SDK**: [@ai-sdk](https://www.npmjs.com/package/ai) for unified AI interfaces
- **Deployment**: Cloudflare Workers / Vercel / Docker
- **API**: Telegram Bot API
- **Tools**: ESLint, Vitest

### 🧰 Built-in Tools

The bot comes with a rich set of built-in tools that can be called by AI models:

**🔧 Utility Tools**
- **web** - Web crawler with pattern-based HTML extraction
- **duckduckgo** - DuckDuckGo web search integration
- **browser_navigate** / **browser_screenshot** - Browser automation via Browserless.io (JS rendering + screenshots), with multi-key rotation
- **think** - Reasoning/brainstorming for complex tasks
- **command** - Execute Telegram commands from AI
- **delegate_task** - Spawn isolated subagents for parallel research / independent workflows (requires `ENABLE_DELEGATE_AGENT=true`)

**🎨 Creative Tools**
- **image_gen** - Multi-provider image generation (DALL-E, Google, Vertex, xAI, Kling, Workers, **BFL/FLUX**)
- **google_veo** - Google Veo 3.1 video generation (8-second videos with audio)
- **kling** - KlingAI image/video generation with editing support

**🔍 Search & Social**
- **xiaohongshu** - Little Red Book (Chinese social platform) search
- **app_iap** - App Store in-app purchase price lookup by country

**⚙️ System Tools**
- **scheduletask** - Automatic message deletion scheduling
- **google_buildin** - Toggle Google Gemini built-in tools dynamically

All tools are defined in `src/tools/internal/` and can be extended via environment variables.

### 📖 Documentation

- [Configuration Guide](./doc/en/CONFIG.md)
- [Deployment Guide](./doc/en/DEPLOY.md)
- [Local Development](./doc/en/LOCAL.md)
- [Platform Deployment](./doc/en/PLATFORM.md)
- [Gateway Dashboard Guide](./GATEWAY_DASHBOARD.md) - Web-based control panel and cron task management
- [Server-Side Tools Guide](./SERVER_TOOLS.md) - Comprehensive guide for Anthropic, Google, xAI, and OpenAI server-side tools
- [Image Editing Complete Guide](./IMAGE_EDITING_COMPLETE_GUIDE.md) - Full guide for AI image generation and editing features
- [Changelog](./doc/en/CHANGELOG.md)

### ⚠️ Important Notes

- Due to the use of AI SDK, CPU time consumption is high, not suitable for Cloudflare Worker free tier (10ms limit)
- Docker deployment with polling mode is recommended
- Webhook mode has a maximum runtime of 60 seconds

### 🤝 Contributing

Issues and Pull Requests are welcome. Before contributing code, please ensure:

1. Code follows project standards (`npm run lint`)
2. All tests pass (`npm test`)
3. Update relevant documentation

### 📄 License

This project is open-sourced under the [MIT License](LICENSE).

### 🙏 Acknowledgments

- Thanks to the original [ChatGPT-Telegram-Workers](https://github.com/adolphnov/ChatGPT-Telegram-Workers) project for the foundational architecture
- Thanks to [JetBrains](https://www.jetbrains.com/?from=tbxark) for providing open-source development licenses
- Thanks to all contributors for their support

---

**If this project helps you, please give it a ⭐️!**