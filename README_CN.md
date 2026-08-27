# ChatGPT Telegram Workers

[![Build and Push Docker Image](https://github.com/SzeMeng76/ChatGPT-Telegram-Workers/actions/workflows/build-docker.yml/badge.svg)](https://github.com/SzeMeng76/ChatGPT-Telegram-Workers/actions/workflows/build-docker.yml)

<p align="center">
    <br> <a href="README.md">English</a> | 中文
</p>

<p align="center">
    <em>功能强大的多AI提供商Telegram机器人，支持灵活的部署选项</em>
</p>

## 📚 项目简介

这是一个经过重大重构的ChatGPT Telegram机器人项目，支持多种AI服务提供商，具有丰富的功能特性和灵活的部署选项。

### 🌟 核心特性

**🤖 多AI提供商支持**
- OpenAI (GPT-3.5, GPT-4, GPT-4o等)
- Azure OpenAI
- Anthropic Claude
- Google Gemini & Vertex AI
- xAI Grok
- Mistral AI
- Cohere
- Cloudflare Workers AI
- 以及更多兼容OpenAI API的服务

**🛠️ 强大功能**
- **服务端工具集成**: 原生支持AI提供商工具
  - **Anthropic**: webFetch、webSearch、codeExecution，支持工具流式输出
  - **xAI Grok**: webSearch（域名过滤）、X/Twitter搜索、codeExecution
  - **Google Gemini**: googleSearch、urlContext、codeExecution、googleMaps、fileSearch
  - **OpenAI**: webSearch、codeInterpreter、fileSearch、imageGeneration、MCP
- **函数调用**: 内置多种工具函数，支持通过环境变量添加自定义函数
- **图像与视频生成**:
  - 图像：DALL-E、Google Imagen、Kling AI、Vertex AI、Workers AI、xAI、**Black Forest Labs (FLUX.2)**
  - 视频：Google Veo 3.1 Fast（8秒带音频视频）
- **音乐生成**:
  - Google Lyria 3 Clip（30秒短片段）
  - Google Lyria 3 Pro（完整歌曲，支持副歌、主歌、桥段）
  - 支持自定义歌词、多语言、时间戳控制和纯器乐曲目
- **语音处理**:
  - TTS：OpenAI、Google、Fish Audio，支持多说话人
  - ASR：自动语音识别，支持语音消息转文字
- **实时流式输出**: 优化的消息发送机制，几乎零延迟
- **智能模型切换**: 根据对话内容自动调整使用的AI模型
- **内联查询**: 支持Telegram内联消息功能
- **Guest Mode** (Bot API 10.0): 在 bot 不是成员的群里也能通过 `@mention` 响应，支持流式、多模态输入、`MESSAGE_REPLACER`/`/set`
- **Bot-to-Bot 通讯** (Bot API 10.0): 可选的多 agent 协作模式，带白名单防死循环
- **Rich Message** (Bot API 10.1, `USE_RICH_MESSAGE`，默认开启): 服务端解析 Markdown，无需手动转义，支持可展开引用块
- **插件系统**: 可自定义插件，支持模板插值
- **MCP支持**: 集成Model Context Protocol
- **网页爬虫**: 基于模式的HTML提取，支持动态内容
- **浏览器自动化**: 集成 Browserless.io，支持多 API Key 轮询、负载均衡与失败追踪（可叠加多个免费账号额度）；支持 JS 渲染页面抓取和截图
- **工作流系统**: 通过@key触发器实现多步骤AI处理
- **智能上下文压缩**: 达到模型上下文长度 60% 时自动触发；保护头部（系统提示 + 前 3 条消息）和尾部（最后 15K tokens）；中间部分由最便宜的模型（gemini-2.5-flash-lite、gpt-4o-mini 等）生成结构化摘要
- **子代理委派**（可选开启）: 生成独立对话历史的隔离子代理，用于并行研究或多步骤独立工作流；默认最多 3 个并发，使用更便宜的模型，父代理只看到调用和最终摘要
- **用户档案与记忆**: 持久化的用户档案（语言、沟通风格、时区、自定义备注），自动注入系统提示；群组中支持共享或独立模式

**💬 对话增强**
- **多语言支持**: 中文、英文、葡萄牙语等
- **自定义触发词**: 可配置机器人响应关键词
- **消息替换**: 支持自定义替换规则，简化环境变量修改
- **长文本处理**: 智能分割，自动转换为Telegraph文章或文件输出
- **引用消息合并**: 自动处理回复消息，支持可展开内容
- **群组管理**: 智能群组响应，支持@提及检测、按用户上下文和发言者识别
- **群组消息监听模式**: 缓存群组历史消息，AI被触发时可看到完整对话上下文（可配置缓存数量和过期时间）
- **Telegraph集成**: 自动将长消息转换为文章，可配置阈值
- **社交媒体搜索**: 内置小红书搜索集成
- **App Store内购**: 跨国家应用内购价格查询

**🔧 管理功能**
- **Gateway 控制面板**: 基于 Web 的控制台，访问地址 `/admin`
  - 实时状态监控和运行时间追踪
  - 使用统计（总用户数、群组数、消息数）
  - 定时任务管理，支持启用/禁用/删除操作
  - 通过 `ADMIN_TOKEN` 环境变量进行基于 token 的身份验证
- **Cron 定时任务**: 用户可配置的定时 AI 消息
  - `/cron add` - 使用 cron 表达式创建定时任务
  - `/cron list` - 查看当前聊天的所有任务
  - `/cron del` - 删除任务
  - `/cron on/off` - 启用/禁用任务
  - 支持时区配置，可通过 `TIMEZONE` 环境变量设置
- **多命令支持**:
  - `/set` - 高级设置，支持映射和工作流
  - `/settings` - 快捷设置菜单
  - `/history` - 导出完整聊天历史为JSON
  - `/model` - 切换AI模型
  - `/map` - 管理模型别名映射
  - `/tts` - 文字转语音，支持语音自定义
  - `/kling` - KlingAI图像/视频生成
  - `/inline` - 内联查询功能
  - `/perplexity` - Perplexity AI集成
  - `/block` / `/blocklist` - 用户屏蔽管理
  - `/redo` - 重试上一条消息
  - `/profile` - 查看/更新用户档案（语言、风格、时区、备注）
- **用户配置**: 个性化设置，支持多用户配置
- **白名单/黑名单**: 精细的访问控制，支持用户级屏蔽
- **消息定时删除**: 按消息类型自动清理，可配置TTL
- **使用统计**: 显示模型名称、Token使用量、延迟和时间信息
- **多机器人支持**: 管理多个Telegram机器人，支持每个机器人独立配置

### 🚀 部署方式

支持多种部署方式，满足不同需求：

#### Docker部署 (推荐)
```bash
# 使用Docker Compose
docker-compose up -d

# 或直接使用Docker
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

#### 本地开发
```bash
npm install
npm run start:local
```

### 📦 项目结构

```
src/
├── adapter/          # 适配器层 (Vercel, Local等)
├── agent/           # AI服务代理
│   ├── openai.ts    # OpenAI集成
│   ├── anthropic.ts # Anthropic集成
│   ├── google.ts    # Google AI集成
│   └── ...          # 其他AI服务
├── config/          # 配置管理
├── telegram/        # Telegram API处理
│   ├── handler/     # 消息处理器
│   ├── command/     # 命令处理
│   └── utils/       # 工具函数
├── tools/           # 工具函数系统
│   ├── internal/    # 内置工具
│   └── external/    # 外部工具配置
├── plugins/         # 插件系统
├── mcp/            # MCP协议支持
└── utils/          # 通用工具
```

### ⚙️ 配置说明

项目使用环境变量进行配置，支持以下配置方式：

1. **环境变量**: 直接设置环境变量
2. **config.json**: 本地配置文件
3. **wrangler.toml**: Cloudflare Workers配置

主要配置项：
- `TELEGRAM_AVAILABLE_TOKENS`: Telegram机器人令牌
- `OPENAI_API_KEY`: OpenAI API密钥
- `ANTHROPIC_API_KEY`: Anthropic API密钥
- `GOOGLE_API_KEY`: Google API密钥
- `XAI_API_KEY`: xAI Grok API密钥
- `BFL_API_KEY`: Black Forest Labs (FLUX) API密钥

**高级配置：**
- **服务端工具**:
  - `USE_GOOGLE_BUILDIN`: 启用Google工具（googleSearch、urlContext、codeExecution、googleMaps）
  - `USE_XAI_BUILDIN`: 启用xAI工具（webSearch、xSearch、codeExecution）
  - `ANTHROPIC_WEB_FETCH_URLS`: 配置Anthropic webFetch的域名
  - `OPENAI_MCP_SERVERS`: OpenAI MCP服务器配置
- **工作流与自动化**:
  - `WORKFLOW`: 多步骤AI工作流定义，支持@key触发器
  - `ENABLE_WORKFLOW`: 启用/禁用工作流处理
  - `ENABLE_ALIAS`: 启用模型别名映射
- **消息处理**:
  - `TELEGRAPH_NUM_LIMIT`: 超过N字符的消息转换为Telegraph
  - `TELEGRAPH_SCOPE`: Telegraph适用的聊天类型（group/supergroup/private）
  - `QUOTE_EXPANDABLE`: 使引用消息可展开
  - `ADD_QUOTE_LIMIT`: 引用消息折叠阈值
  - `SHOW_THINKING_TEXT`: 显示 AI 推理/思考过程（默认: true）
  - `EXPANDABLE_THINKING`: 使用可折叠引用块显示思考文本（默认: true）
- **群组消息监听**:
  - `GROUP_MESSAGE_LISTEN_MODE`: 启用群组消息监听模式（默认: false）
  - `GROUP_MESSAGE_CACHE_SIZE`: 缓存的群组消息数量（默认: 20条）
  - `GROUP_MESSAGE_CACHE_TTL`: 缓存过期时间，单位秒（默认: 3600，即1小时）
  - `CHAT_TRIGGER_PREFIX`: 群组消息触发前缀（如: `/bot`，留空则使用@mention或回复触发）
- **音频与语音**:
  - `FISH_TTS_VOICE`: Fish Audio TTS语音参考ID
  - `GOOGLE_TTS_EXTRA_PARAMS`: 多说话人语音配置
  - `AI_ASR_PROVIDER`: ASR（语音转文字）提供商: openai, oailike, google
  - `GOOGLE_STT_MODEL` / `GOOGLE_STT_EXTRA_PARAMS`: Google Gemini转录模型及transcription_config配置（language_codes、custom_vocabulary、mode等）
  - `AUDIO_TEXT_FORMAT`: 音频转录格式（spoiler/bold/italic/code）
- **模型参数**:
  - `CHAT_TEMPERATURE`: 模型温度（0-2）
  - `FUNCTION_CALL_TEMPERATURE`: 工具调用独立温度
  - `MAX_STEPS`: 最大工具执行步数（默认：5）
  - `OPENAI_REASONING_EFFORT`: o1模型推理强度（low/medium/high）
  - `PARAMS_MODIFIER`: 按模型参数覆盖
- **上下文压缩**（长对话自动摘要）:
  - `ENABLE_CONTEXT_COMPRESSION`: 启用/禁用压缩（默认: `true`）
  - `CONTEXT_COMPRESSION_THRESHOLD`: 按模型上下文长度的触发比例（默认: `0.60`）
  - `CONTEXT_COMPRESSION_PROTECT_HEAD`: 受保护的头部消息数（默认: `3`）
  - `CONTEXT_COMPRESSION_TAIL_BUDGET`: 受保护的尾部 token 预算（默认: `15000`）
  - `CONTEXT_COMPRESSION_SUMMARY_RATIO`: 摘要 token 比例（默认: `0.20`）
- **子代理委派**（并行的隔离子代理，默认关闭）:
  - `ENABLE_DELEGATE_AGENT`: 启用委派（默认: `false`）
  - `DELEGATE_MAX_CONCURRENT`: 最大并发子代理数（默认: `3`）
  - `DELEGATE_MAX_ITERATIONS`: 每个子代理的最大迭代次数（默认: `20`）
  - `DELEGATE_MODEL`: 子代理使用的模型覆盖（可选）
- **浏览器自动化**（Browserless.io，支持 Key 轮询）:
  - `BROWSERLESS_API_KEY`: 单个 API Key
  - `BROWSERLESS_API_KEYS`: 逗号分隔的多个 Key（轮询 + 负载均衡）
  - `BROWSERLESS_API_KEY_LIST`: Key 的 JSON 数组
  - `BROWSERLESS_URL`: 自定义 Browserless 服务地址（可选）

更多配置请参考 [配置文档](./doc/cn/CONFIG.md)

### 🔍 技术栈

- **框架**: TypeScript + Vite
- **AI SDK**: [@ai-sdk](https://www.npmjs.com/package/ai) 统一AI接口
- **部署**: Cloudflare Workers / Vercel / Docker
- **API**: Telegram Bot API
- **工具**: ESLint, Vitest

### 🧰 内置工具

机器人内置了丰富的工具函数，可被AI模型调用：

**🔧 实用工具**
- **web** - 网页爬虫，支持基于模式的HTML提取
- **duckduckgo** - DuckDuckGo网页搜索集成
- **browser_navigate** / **browser_screenshot** - 通过 Browserless.io 的浏览器自动化（JS 渲染 + 截图），支持多 Key 轮询
- **think** - 复杂任务的推理/头脑风暴
- **command** - 从AI执行Telegram命令
- **delegate_task** - 生成隔离的子代理用于并行研究 / 独立工作流（需要 `ENABLE_DELEGATE_AGENT=true`）

**🎨 创意工具**
- **image_gen** - 多提供商图像生成（DALL-E、Google、Vertex、xAI、Kling、Workers、**BFL/FLUX**）
- **google_veo** - Google Veo 3.1视频生成（8秒视频+音频）
- **kling** - KlingAI图像/视频生成，支持编辑

**🔍 搜索与社交**
- **xiaohongshu** - 小红书搜索
- **app_iap** - 按国家查询App Store应用内购价格

**⚙️ 系统工具**
- **scheduletask** - 消息自动删除调度
- **google_buildin** - 动态切换Google Gemini内置工具

所有工具定义在 `src/tools/internal/`，可通过环境变量扩展。

### 📖 文档

- [配置说明](./doc/cn/CONFIG.md)
- [部署指南](./doc/cn/DEPLOY.md)
- [本地开发](./doc/cn/LOCAL.md)
- [平台部署](./doc/cn/PLATFORM.md)
- [Gateway 控制面板指南](./GATEWAY_DASHBOARD_CN.md) - Web 控制台和定时任务管理
- [服务端工具指南](./SERVER_TOOLS_CN.md) - Anthropic、Google、xAI 和 OpenAI 服务端工具完整指南
- [图片编辑完整指南](./IMAGE_EDITING_COMPLETE_GUIDE_CN.md) - AI 图片生成和编辑功能完整指南
- [更新日志](./doc/cn/CHANGELOG.md)

### ⚠️ 重要说明

- 由于使用AI SDK，CPU时间消耗较大，不适合Cloudflare Worker免费版（限制10ms）
- 推荐使用Docker部署，采用轮询模式
- Webhook模式最大运行时间60秒

### 🔄 主要修改内容

相较于原项目，本版本包含以下重大改进：

- **全面升级**: 除WorkerAI外全部切换为AI SDK
- **增强显示**: 增加模型名称、使用时间等信息显示
- **函数调用**: 内置多个函数，支持环境变量扩展
- **新增AI服务**: 添加Vertex AI等多个AI代理
- **自定义功能**: 支持自定义触发词和替换词
- **命令丰富**: 新增`/set`、`/settings`、`/history`等命令
- **图像生成**: 通过函数调用支持多种图像生成服务
- **渲染优化**: MarkdownV2实时渲染，智能降级策略（MarkdownV2 → HTML → Plain Text → Telegraph）
- **文本处理**: 超长文本智能分割和渲染
- **群组优化**: 自定义域名折叠，防止长文本干扰
- **媒体支持**: 多种媒体发送方式和TTS/ASR支持
- **流畅发送**: 优化消息发送机制，几乎零延迟
- **定时清理**: 支持不同类型消息的定时删除
- **多图支持**: 支持多张图片读取和处理
- **智能调整**: 智能模型切换和内联消息支持
- **搜索增强**: 支持GPT-4o-search等搜索模型
- **输出选择**: 支持Telegraph和文本文件输出
- **思考折叠**: 支持模型thinking内容折叠

### 🤝 贡献

欢迎提交Issue和Pull Request。在贡献代码前，请确保：

1. 代码符合项目规范 (`npm run lint`)
2. 通过所有测试 (`npm test`)
3. 更新相关文档

### 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

### 🙏 致谢

- 感谢原项目 [ChatGPT-Telegram-Workers](https://github.com/adolphnov/ChatGPT-Telegram-Workers) 提供的基础架构
- 感谢 [JetBrains](https://www.jetbrains.com/?from=tbxark) 提供的开源开发许可证
- 感谢所有贡献者的支持

### 🔗 相关项目

- [cloudflare-worker-adapter](https://github.com/TBXark/cloudflare-worker-adapter) - 简单的Cloudflare Worker适配器
- [telegram-bot-api-types](https://github.com/TBXark/telegram-bot-api-types) - Telegram Bot API SDK

---

**如果这个项目对你有帮助，请给个⭐️！**