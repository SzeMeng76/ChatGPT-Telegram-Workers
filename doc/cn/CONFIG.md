# 配置指南

本指南涵盖了ChatGPT Telegram Workers机器人的所有配置选项。推荐通过Workers配置界面设置环境变量，而不是直接修改JS代码中的变量。

## 📋 目录

- [快速设置](#快速设置)
- [存储配置](#存储配置)
- [系统配置](#系统配置)
- [AI提供商配置](#ai提供商配置)
  - [OpenAI](#openai)
  - [Anthropic Claude](#anthropic-claude)
  - [Google Gemini](#google-gemini)
  - [xAI Grok](#xai-grok)
  - [其他提供商](#其他提供商)
- [AI原生工具配置](#ai原生工具配置)
  - [OpenAI Server-Side Tools](#openai-server-side-tools)
  - [Anthropic Server-Side Tools](#anthropic-server-side-tools)
  - [Google Built-in Tools](#google-built-in-tools)
  - [xAI Server-Side Tools](#xai-server-side-tools)
- [语音服务配置](#语音服务配置)
- [用户配置](#用户配置)
- [命令](#命令)
- [高级功能](#高级功能)
- [故障排除](#故障排除)

## 🚀 快速设置

### 最小必需配置

快速开始只需要设置这些基本变量：

| 变量 | 描述 | 示例 |
|------|------|------|
| `TELEGRAM_AVAILABLE_TOKENS` | Telegram机器人令牌 | `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11` |
| `OPENAI_API_KEY` | OpenAI API密钥 | `sk-...` |

### 可选但推荐

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `CHAT_WHITE_LIST` | 允许的用户/聊天ID | `''` (空=允许所有人) |
| `LANGUAGE` | 界面语言 | `zh-cn` |
| `AI_CHAT_PROVIDER` | 默认AI提供商 | `openai` |

## 🗄️ 存储配置

### KV数据库 (Cloudflare Workers)

| 变量 | 描述 |
|------|------|
| `DATABASE` | 创建KV命名空间并绑定为`DATABASE` |

### 替代数据库 (本地/Docker)

本地部署时在`config.json`中配置：

```json
{
  "database": {
    "type": "sqlite",     // 选项: memory, local, sqlite, redis
    "path": "/app/data/data.db"
  }
}
```

**数据库类型说明**：

| 类型 | 持久化 | 适用场景 | 说明 |
|------|--------|---------|------|
| `memory` | ❌ | 测试/开发 | 数据存储在内存，容器重启后丢失 |
| `local` | ✅ | 个人使用 | JSON 文件存储，简单但性能较低 |
| `sqlite` | ✅ | 个人/小团队 | **推荐**，文件数据库，性能好且易于备份 |
| `redis` | ✅ | 中大型部署 | 需要单独运行 Redis 服务，性能最佳 |

**数据持久化配置** (强烈推荐)：

为了保留对话历史、用户配置和群组消息缓存，请配置数据持久化：

1. **使用 sqlite（推荐）**:
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

2. **Docker Compose 挂载数据卷**:
   ```yaml
   version: '3'
   services:
     chatgpt-telegram-workers:
       image: szemeng76/chatgpt-telegram-workers:latest
       volumes:
         - ./config.json:/app/config.json:ro
         - ./wrangler.toml:/app/config.toml:ro
         - ./data:/app/data  # 挂载数据目录，持久化数据库文件
       ports:
         - "8787:8787"
   ```

3. **使用 redis（高性能）**:
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

**需要持久化的数据**：
- ✅ **对话历史记录**：用户和 AI 的完整对话
- ✅ **用户配置**：个性化设置（模型、参数等）
- ✅ **Telegraph Token**：用于生成 Telegraph 文章
- ⚠️ **群组消息缓存**：最近的群组消息（有 TTL，可选持久化）

## ⚙️ 系统配置

### 基础设置

| 变量 | 描述 | 默认值 | 类型 |
|------|------|--------|------|
| `LANGUAGE` | 界面语言 | `zh-cn` | `en`, `zh-cn`, `zh-hant`, `pt` |
| `UPDATE_BRANCH` | 更新检查分支 | `master` | string |
| `CHAT_COMPLETE_API_TIMEOUT` | API超时(秒) | `0` | number |
| `LOG_LEVEL` | 日志级别 | `info` | `debug`, `info`, `warn`, `error` |

### Telegram配置

| 变量 | 描述 | 默认值 | 说明 |
|------|------|--------|------|
| `TELEGRAM_API_DOMAIN` | Telegram API域名 | `https://api.telegram.org/` | 自定义端点 |
| `TELEGRAM_AVAILABLE_TOKENS` | 机器人令牌(逗号分隔) | `''` | **必需** |
| `TELEGRAM_BOT_NAME` | 机器人名称(逗号分隔) | `''` | 必须与令牌顺序匹配 |
| `DEFAULT_PARSE_MODE` | 消息解析模式 | `Markdown` | `Markdown`, `MarkdownV2`, `HTML` |
| `USE_RICH_MESSAGE` | 使用 Telegram Bot API 10.1+ 的 Rich Message 发送消息（服务端解析 Markdown，无需手动转义），仅在 `DEFAULT_PARSE_MODE=MarkdownV2` 时生效 | `false` | `true`, `false` |
| `I_AM_A_GENEROUS_PERSON` | 允许所有人使用 | `false` | 设为`true`允许所有用户 |

### 访问控制

| 变量 | 描述 | 默认值 | 格式 |
|------|------|--------|------|
| `CHAT_WHITE_LIST` | 允许的用户/聊天ID | `''` | 逗号分隔的ID |
| `CHAT_GROUP_WHITE_LIST` | 允许的群组ID | `''` | 逗号分隔的ID |
| `GROUP_CHAT_BOT_ENABLE` | 启用群聊 | `true` | `true`/`false` |
| `GROUP_CHAT_BOT_SHARE_MODE` | 群组共享上下文 | `true` | `true`/`false` |
| `GROUP_INCLUDE_USERNAME` | 在群组消息中添加用户名前缀 | `false` | `true`/`false` |
| `GROUP_MESSAGE_LISTEN_MODE` | 启用群组消息监听模式 | `false` | `true`/`false` |
| `GROUP_MESSAGE_CACHE_SIZE` | 缓存的群组消息数量 | `20` | 数字 |
| `GROUP_MESSAGE_CACHE_TTL` | 缓存过期时间（秒） | `3600` | 数字 |

> ⚠️ **重要**：将群组ID添加到`CHAT_GROUP_WHITE_LIST`以防止未授权使用。在大型群组(>2000成员)中设置机器人为管理员，并在BotFather中禁用隐私模式(`/setprivacy` → `Disable`)。

**群组用户名功能** (`GROUP_INCLUDE_USERNAME`):
启用后，群聊中的消息将带有发送者的标识前缀，帮助AI区分不同的发言者：
- 有用户名的用户：`@username: 消息内容`
- 无用户名的用户：`姓名: 消息内容` 或 `名字: 消息内容`

这在多人对话时特别有用，可以让AI清楚地知道是谁说了什么。

**群组消息监听模式** (`GROUP_MESSAGE_LISTEN_MODE`):
这是一个强大的功能，让AI能够"看到"群组中的完整对话上下文。

**工作原理**：
1. **自动缓存**：机器人会自动缓存群组中的所有文本消息（即使没有@机器人）
2. **触发响应**：只有在以下情况下AI才会回复：
   - 使用 `CHAT_TRIGGER_PREFIX` 前缀（如：`/bot 你好`）
   - @提及机器人（如：`@你的机器人 你好`）
   - 回复机器人的消息
3. **上下文注入**：当AI被触发时，会自动加载最近的群组消息作为上下文

**配置示例**：
```bash
# 启用群组消息监听
GROUP_MESSAGE_LISTEN_MODE=true

# 缓存最近50条消息
GROUP_MESSAGE_CACHE_SIZE=50

# 缓存保留2小时
GROUP_MESSAGE_CACHE_TTL=7200

# 设置触发前缀（可选，留空则只能通过@mention或回复触发）
CHAT_TRIGGER_PREFIX=/bot
```

**使用场景示例**：
```
用户A: 今天天气真好
用户B: 是啊，适合出去玩
用户C: 我们去哪玩？
用户D: /bot 根据前面的对话，推荐一些适合今天天气的活动

AI: 根据你们的对话，今天天气不错，我推荐以下活动：
1. 户外野餐...
2. 公园散步...
```

**注意事项**：
- 缓存只包含文本消息，不包含图片/视频等媒体内容
- 缓存存储在数据库中（Cloudflare Workers 使用 KV，Docker/本地部署根据配置使用 memory/local/sqlite/redis）
- 建议根据群组活跃度调整 `GROUP_MESSAGE_CACHE_SIZE`
- `GROUP_MESSAGE_CACHE_TTL` 到期后缓存会自动清理
- Docker 部署时，建议使用 `sqlite` 或 `redis` 作为数据库类型以持久化缓存

### 消息和历史设置

| 变量 | 描述 | 默认值 | 说明 |
|------|------|--------|------|
| `AUTO_TRIM_HISTORY` | 自动裁剪消息历史 | `true` | 防止4096字符限制 |
| `MAX_HISTORY_LENGTH` | 最大历史条目 | `12` | 每个用户 |
| `STREAM_MODE` | 启用流式输出 | `true` | 打字机效果 |
| `EXTRA_MESSAGE_CONTEXT` | 包含引用消息 | `false` | 从回复中添加上下文 |
| `ENABLE_BOT_TO_BOT` | 接受其他 bot 的消息 (Bot API 10.0) | `false` | 需在 @BotFather MiniApp 中开启 Bot-to-Bot Mode |
| `ALLOWED_BOT_IDS` | 启用 `ENABLE_BOT_TO_BOT` 时允许的 bot 用户 ID 列表 | `[]` | 留空 = 拒绝所有 bot（安全默认）。使用 `["*"]` 允许所有 bot |

## 🤖 AI提供商配置

### OpenAI

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `OPENAI_API_KEY` | API密钥(逗号分隔) | `''` |
| `OPENAI_CHAT_MODEL` | 聊天模型 | `gpt-4o-mini` |
| `OPENAI_API_BASE` | API基础URL | `https://api.openai.com/v1` |
| `OPENAI_API_EXTRA_PARAMS` | 额外参数 | `{}` |

### DALL-E (图像生成)

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `DALL_E_MODEL` | 模型名称 | `dall-e-2` |
| `DALL_E_IMAGE_SIZE` | 图像尺寸 | `512x512` |
| `DALL_E_IMAGE_QUALITY` | 图像质量 | `standard` |
| `DALL_E_IMAGE_STYLE` | 图像风格 | `vivid` |

### Azure OpenAI

| 变量 | 描述 | 格式 |
|------|------|------|
| `AZURE_API_KEY` | Azure API密钥 | String |
| `AZURE_RESOURCE_NAME` | 资源名称 | 从Azure门户获取 |
| `AZURE_CHAT_MODEL` | 部署名称 | 你的部署 |
| `AZURE_API_VERSION` | API版本 | `2024-06-01` |

### Anthropic Claude

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ANTHROPIC_API_KEY` | API密钥 | `null` |
| `ANTHROPIC_API_BASE` | 基础URL | `https://api.anthropic.com/v1` |
| `ANTHROPIC_CHAT_MODEL` | 模型名称 | `claude-3-haiku-20240307` |

### Google Gemini

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `GOOGLE_API_KEY` | API密钥 | `null` |
| `GOOGLE_API_BASE` | 基础URL | `https://generativelanguage.googleapis.com/v1beta/models/` |
| `GOOGLE_CHAT_MODEL` | 模型名称 | `gemini-pro` |

### Google Vertex AI

| 变量 | 描述 | 说明 |
|------|------|------|
| `VERTEX_PROJECT_ID` | GCP项目ID | 必需 |
| `VERTEX_LOCATION` | 区域 | 例如：`us-central1` |
| `VERTEX_CREDENTIALS` | 服务账户JSON | Base64编码 |

### xAI Grok

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `XAI_API_KEY` | API密钥 | `null` |
| `XAI_API_BASE` | 基础URL | `https://api.x.ai/v1` |
| `XAI_CHAT_MODEL` | 模型名称 | `grok-beta` |

### Mistral AI

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `MISTRAL_API_KEY` | API密钥 | `null` |
| `MISTRAL_API_BASE` | 基础URL | `https://api.mistral.ai/v1` |
| `MISTRAL_CHAT_MODEL` | 模型名称 | `mistral-tiny` |

### Cohere

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `COHERE_API_KEY` | API密钥 | `null` |
| `COHERE_API_BASE` | 基础URL | `https://api.cohere.com/v1` |
| `COHERE_CHAT_MODEL` | 模型名称 | `command-r-plus` |

### Cloudflare Workers AI

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `CLOUDFLARE_ACCOUNT_ID` | 账户ID | `null` |
| `CLOUDFLARE_TOKEN` | API令牌 | `null` |
| `WORKERS_CHAT_MODEL` | 聊天模型 | `@cf/mistral/mistral-7b-instruct-v0.1` |
| `WORKERS_IMAGE_MODEL` | 图像模型 | `@cf/stabilityai/stable-diffusion-xl-base-1.0` |

### OpenAI兼容服务

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `OAILIKE_API_KEY` | API密钥 | `null` |
| `OAILIKE_API_BASE` | 基础URL | `https://api.openai.com/v1` |
| `OAILIKE_CHAT_MODEL` | 聊天模型 | `gpt-4o-mini` |
| `OAILIKE_IMAGE_MODEL` | 图像模型 | `dall-e-3` |
| `OAILIKE_VISION_MODEL` | 视觉模型 | `gpt-4o-mini` |
| `OAILIKE_IMAGE_SIZE` | 图像尺寸 | `1024x1024` |
| `OAILIKE_EMBEDDING_MODEL` | 嵌入模型 | `text-embedding-3-small` |
| `OAILIKE_RERANK_MODEL` | 重排序模型 | `''` |
| `OAILIKE_STT_MODEL` | 语音识别模型 | `FunAudioLLM/SenseVoiceSmall` |
| `OAILIKE_TTS_MODEL` | 文字转语音模型 | `tts-1` |
| `OAILIKE_TTS_VOICE` | TTS语音 | `alloy` |
| `OAILIKE_API_EXTRA_PARAMS` | 额外参数 | `{}` |
| `OAILIKE_MODELS` | 可用模型列表 | `[]` |
| `OAILIKE_MODELS_API` | 模型列表API | `/models` |
| `OAILIKE_PROVIDER_OPTIONS` | 提供商选项 | `{}` |

**OpenAI-like 中继工具**：
```bash
# 通过 OpenAI-like 接口使用其他提供商的工具
OAILIKE_RELAY_TOOLS='{"gemini": ["googleSearch", "codeExecution", "urlContext"]}'
USE_OAILIKE_RELAY_TOOLS='["googleSearch"]'
```

## 🛠️ AI原生工具配置

### OpenAI Server-Side Tools

OpenAI Responses API 提供服务器端工具（仅在使用 Responses API 时可用）。

#### 基础配置

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `OPENAI_BUILDIN` | 可用工具列表 | `['webSearch', 'codeInterpreter', 'fileSearch', 'imageGeneration', 'mcp']` |
| `USE_OPENAI_BUILDIN` | 启用的工具 | `[]` |
| `OPENAI_RESPONSE_MODELS` | 使用 Response API 的模型 | `['*']` |
| `OPENAI_PROVIDER_OPTIONS` | 提供商选项 | 见下方 |

**Provider Options**:
```javascript
OPENAI_PROVIDER_OPTIONS = {
  parallelToolCalls: true,        // 并行工具调用
  reasoningSummary: 'auto',       // 推理摘要: 'auto', 'concise', 'detailed'
  // metadata: {},                // 元数据
  // previousResponseId: '',      // 上一个响应ID
  // store: false,                // 是否存储
  // user: 'user1',               // 用户标识
  // reasoningEffort: 'medium',   // 推理努力程度
  // strictJsonSchema: true,      // 严格JSON模式
  // instructions: '',            // 指令
  // serviceTier: 'auto',         // 服务等级
  // include: ['reasoning.encrypted_content'],
}
```

#### Web Search - 网页搜索工具

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `OPENAI_ENABLE_WEB_SEARCH` | 启用网页搜索 | `false` |
| `OPENAI_WEB_SEARCH_EXTERNAL_ACCESS` | 实时抓取网页 | `true` |
| `OPENAI_WEB_SEARCH_ALLOWED_DOMAINS` | 允许的域名列表 | `[]` |
| `OPENAI_WEB_SEARCH_CONTEXT_SIZE` | 搜索上下文大小 | `medium` |
| `OPENAI_WEB_SEARCH_USER_LOCATION` | 用户位置 | `''` |

**上下文大小选项**: `low`, `medium`, `high`
**位置格式**: `"City, Country"` 或 `"latitude,longitude"`

示例：
```bash
OPENAI_ENABLE_WEB_SEARCH=true
OPENAI_WEB_SEARCH_CONTEXT_SIZE='high'
OPENAI_WEB_SEARCH_USER_LOCATION='Beijing, China'
OPENAI_WEB_SEARCH_ALLOWED_DOMAINS='["wikipedia.org", "github.com"]'
```

#### Code Interpreter - Python代码执行工具

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `OPENAI_ENABLE_CODE_INTERPRETER` | 启用代码解释器 | `false` |
| `OPENAI_CODE_INTERPRETER_CONTAINER` | 容器ID（可选） | `''` |

#### File Search - 文件向量搜索工具

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `OPENAI_ENABLE_FILE_SEARCH` | 启用文件搜索 | `false` |
| `OPENAI_FILE_SEARCH_VECTOR_STORES` | 向量存储ID列表 | `[]` |
| `OPENAI_FILE_SEARCH_MAX_RESULTS` | 最大返回结果数 | `10` |
| `OPENAI_FILE_SEARCH_SCORE_THRESHOLD` | 相关性阈值(0-1) | `0.0` |

示例：
```bash
OPENAI_ENABLE_FILE_SEARCH=true
OPENAI_FILE_SEARCH_VECTOR_STORES='["vs_abc123", "vs_def456"]'
OPENAI_FILE_SEARCH_MAX_RESULTS=20
OPENAI_FILE_SEARCH_SCORE_THRESHOLD=0.5
```

#### Image Generation - 图片生成工具 (GPT-5.1+)

| 变量 | 描述 | 默认值 | 选项 |
|------|------|--------|------|
| `OPENAI_ENABLE_IMAGE_GENERATION` | 启用图片生成 | `false` | - |
| `OPENAI_IMAGE_BACKGROUND` | 背景类型 | `auto` | `auto`, `opaque`, `transparent` |
| `OPENAI_IMAGE_INPUT_FIDELITY` | 输入保真度 | `low` | `low`, `high` |
| `OPENAI_IMAGE_MODEL` | 图片生成模型 | `gpt-image-1` | - |
| `OPENAI_IMAGE_OUTPUT_COMPRESSION` | 输出压缩等级(0-100) | `100` | - |
| `OPENAI_IMAGE_OUTPUT_FORMAT` | 输出格式 | `png` | `png`, `jpeg`, `webp` |
| `OPENAI_IMAGE_PARTIAL_IMAGES` | 部分图片数量(0-3) | `0` | - |
| `OPENAI_IMAGE_QUALITY` | 图片质量 | `auto` | `auto`, `low`, `medium`, `high` |
| `OPENAI_IMAGE_SIZE` | 图片尺寸 | `auto` | `auto`, `1024x1024`, `1024x1536`, `1536x1024` |

#### MCP - Model Context Protocol

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `OPENAI_ENABLE_MCP` | 启用MCP | `false` |
| `OPENAI_MCP_SERVER_LABEL` | MCP服务器标签（必需） | `''` |
| `OPENAI_MCP_SERVER_URL` | MCP服务器URL | `''` |
| `OPENAI_MCP_CONNECTOR_ID` | 服务连接器ID | `''` |
| `OPENAI_MCP_SERVER_DESCRIPTION` | 服务器描述 | `''` |
| `OPENAI_MCP_ALLOWED_TOOLS` | 允许的工具列表 | `[]` |
| `OPENAI_MCP_ALLOWED_TOOLS_READ_ONLY` | 仅允许只读工具 | `false` |
| `OPENAI_MCP_AUTHORIZATION` | OAuth访问令牌 | `''` |
| `OPENAI_MCP_HEADERS` | 自定义HTTP头 | `{}` |
| `OPENAI_MCP_REQUIRE_APPROVAL` | 工具执行审批策略 | `never` |
| `OPENAI_MCP_APPROVAL_TOOL_NAMES` | 需要审批的工具 | `[]` |

> **注意**: `serverUrl` 和 `connectorId` 二选一配置

### Anthropic Server-Side Tools

Anthropic 提供强大的服务器端工具，包括网页抓取、搜索和代码执行。

#### 基础配置

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ANTHROPIC_BUILDIN` | 可用工具列表 | `['webFetch', 'webSearch', 'codeExecution']` |
| `USE_ANTHROPIC_BUILDIN` | 启用的工具 | `[]` |
| `ANTHROPIC_ENABLE_CACHE_CONTROL` | 启用prompt缓存 | `true` |
| `ANTHROPIC_PROVIDER_OPTIONS` | 提供商选项 | 见下方 |

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

#### Web Fetch - 网页抓取工具

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ANTHROPIC_ENABLE_WEB_FETCH` | 启用网页抓取 | `false` |
| `ANTHROPIC_WEB_FETCH_MAX_USES` | 最大使用次数 | `5` |
| `ANTHROPIC_WEB_FETCH_ALLOWED_DOMAINS` | 允许的域名 | `[]` |
| `ANTHROPIC_WEB_FETCH_BLOCKED_DOMAINS` | 禁止的域名 | `[]` |
| `ANTHROPIC_WEB_FETCH_ENABLE_CITATIONS` | 启用引用 | `true` |
| `ANTHROPIC_WEB_FETCH_MAX_CONTENT_TOKENS` | 最大内容tokens | `4000` |

#### Web Search - 网页搜索工具

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ANTHROPIC_ENABLE_WEB_SEARCH` | 启用网页搜索 | `false` |
| `ANTHROPIC_WEB_SEARCH_MAX_USES` | 最大使用次数 | `5` |
| `ANTHROPIC_WEB_SEARCH_ALLOWED_DOMAINS` | 允许的域名 | `[]` |
| `ANTHROPIC_WEB_SEARCH_BLOCKED_DOMAINS` | 禁止的域名 | `[]` |
| `ANTHROPIC_WEB_SEARCH_USER_LOCATION` | 用户位置 | `''` |

#### Code Execution - 代码执行工具

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ANTHROPIC_ENABLE_CODE_EXECUTION` | 启用代码执行（Python + Bash） | `false` |

#### Tool Streaming - 细粒度工具流

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ANTHROPIC_ENABLE_TOOL_STREAMING` | 启用工具流（实时显示执行进度） | `true` |

#### Context Management - 上下文管理

自动清理历史工具调用，避免上下文过长：

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ANTHROPIC_ENABLE_CONTEXT_MANAGEMENT` | 启用上下文管理 | `true` |
| `ANTHROPIC_CONTEXT_CLEAR_TRIGGER` | 触发模式 | `auto` |
| `ANTHROPIC_CONTEXT_KEEP_RECENT` | 保留最近N次工具调用 | `5` |
| `ANTHROPIC_CONTEXT_CLEAR_AT_LEAST` | 至少清理N千个tokens | `2` |
| `ANTHROPIC_CONTEXT_CLEAR_TOOL_INPUTS` | 清理工具输入参数 | `false` |
| `ANTHROPIC_CONTEXT_EXCLUDE_TOOLS` | 排除的工具 | `[]` |

**触发模式**: `auto` (自动) | `manual` (手动)

#### Thinking 清理配置

针对推理模型如 Claude 3.7 Sonnet：

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ANTHROPIC_ENABLE_THINKING_CLEANUP` | 启用thinking清理 | `false` |
| `ANTHROPIC_THINKING_KEEP_RECENT` | 保留最近N轮thinking | `3` |

#### Structured Output Mode

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ANTHROPIC_STRUCTURED_OUTPUT_MODE` | 结构化输出模式 | `auto` |

**模式选项**:
- `outputFormat`: 使用 output format（更灵活，推荐）
- `tool`: 使用工具模式（严格验证）
- `auto`: 自动选择

### Google Built-in Tools

Google Gemini 提供多种内置工具。

> **🆕 Gemini 3 工具组合支持**: Gemini 3 模型（如 `gemini-3-flash-preview`）支持同时使用 Google 内置工具和自定义函数工具。旧版本（Gemini 2.x 及更早）只能使用 Google 工具或自定义工具，不能混用。

#### 基础配置

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `GOOGLE_BUILDIN` | 可用工具列表 | `['googleSearch', 'codeExecution', 'urlContext', 'googleMaps', 'fileSearch', 'enterpriseWebSearch']` |
| `USE_GOOGLE_BUILDIN` | 启用的工具 | `[]` |
| `GOOGLE_PROVIDER_OPTIONS` | 提供商选项 | 见下方 |

**工具兼容性**:
- **Gemini 3.x**: ✅ 支持 Google 工具 + 自定义工具组合，⚠️ Maps 和 Code Execution 仍不能同时使用（Google API 限制）
- **Gemini 2.x**: ⚠️ Google 工具和自定义工具互斥，⚠️ Maps 和 Code Execution 不能同时使用
- **Gemini 1.x**: ❌ 不支持 Google Maps

#### Google Search 配置

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `GOOGLE_SEARCH_ENABLE_WEB_SEARCH` | 启用网页搜索 | `true` |
| `GOOGLE_SEARCH_ENABLE_IMAGE_SEARCH` | 启用图片搜索（仅支持图片模型） | `false` |
| `GOOGLE_SEARCH_TIME_RANGE_FILTER` | 搜索结果时间范围过滤 | `{}` |

**时间范围过滤示例**:
```bash
GOOGLE_SEARCH_TIME_RANGE_FILTER='{"startTime": "2025-01-01T00:00:00Z", "endTime": "2025-12-31T23:59:59Z"}'
```

**图片搜索**: 仅适用于支持图片的模型，如 `gemini-3.1-flash-image-preview`。启用后，模型可以基于搜索结果搜索和生成图片。

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

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `GOOGLE_FILE_SEARCH_STORES` | 文件搜索存储 | `[]` |
| `GOOGLE_FILE_SEARCH_TOP_K` | Top-K结果数 | `10` |
| `GOOGLE_FILE_SEARCH_METADATA_FILTER` | 元数据过滤器 | `''` |

示例：
```bash
GOOGLE_FILE_SEARCH_STORES='["fileSearchStores/my-store-123"]'
```

#### Google Maps Grounding

为位置感知响应提供位置上下文：

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `GOOGLE_RETRIEVAL_CONFIG` | 检索配置（经纬度） | `{}` |
| `GOOGLE_MAPS_MODEL` | Maps工具使用的模型 | `gemini-2.5-flash` |

示例：
```bash
GOOGLE_RETRIEVAL_CONFIG='{"latLng": {"latitude": 39.9042, "longitude": 116.4074}}'
```

> **注意**: 
> - Gemini 2.x 和 3.x 支持 Google Maps
> - **所有版本**: Maps 和 Code Execution 不能同时使用（Google API 限制）

#### Gemini 3 Pro Image 配置

| 变量 | 描述 | 默认值 | 选项 |
|------|------|--------|------|
| `GOOGLE_IMAGE_ASPECT_RATIO` | 图像宽高比 | `null` | `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `16:9`, `21:9` |
| `GOOGLE_IMAGE_SIZE` | 图像分辨率 | `null` | `1K`, `2K`, `4K` |
| `GOOGLE_IMAGE_ENABLE_GOOGLE_SEARCH` | 启用Google搜索增强 | `false` | - |
| `GOOGLE_IMAGE_THINKING_LEVEL` | gemini-3.1-flash-image 的思考深度 | `null` | `minimal`, `high` |

### xAI Server-Side Tools

xAI Grok 提供网页搜索、X搜索和代码执行工具。

#### 基础配置

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `XAI_BUILDIN` | 可用工具列表 | `['webSearch', 'xSearch', 'codeExecution']` |
| `USE_XAI_BUILDIN` | 启用的工具 | `[]` |
| `XAI_PROVIDER_OPTIONS` | 提供商选项 | `{}` |

**Provider Options**:
```javascript
XAI_PROVIDER_OPTIONS = {
  // reasoningEffort: 'high',  // 推理努力程度
}
```

#### Web Search - 网页搜索

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `XAI_ENABLE_WEB_SEARCH` | 启用网页搜索 | `false` |
| `XAI_WEB_SEARCH_ALLOWED_DOMAINS` | 允许的域名（最多5个） | `[]` |
| `XAI_WEB_SEARCH_EXCLUDED_DOMAINS` | 排除的域名（最多5个） | `[]` |
| `XAI_WEB_SEARCH_IMAGE_UNDERSTANDING` | 启用图像理解 | `false` |

#### X Search - X/Twitter搜索

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `XAI_ENABLE_X_SEARCH` | 启用X搜索 | `false` |
| `XAI_X_SEARCH_ALLOWED_HANDLES` | 允许的用户（最多10个） | `[]` |
| `XAI_X_SEARCH_EXCLUDED_HANDLES` | 排除的用户（最多10个） | `[]` |
| `XAI_X_SEARCH_IMAGE_UNDERSTANDING` | 启用图像理解 | `false` |
| `XAI_X_SEARCH_VIDEO_UNDERSTANDING` | 启用视频理解 | `false` |

#### Code Execution - 代码执行

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `XAI_ENABLE_CODE_EXECUTION` | 启用代码执行（Python沙箱） | `false` |

## 🎙️ 语音服务配置

### Fish Audio TTS

Fish Audio 提供高质量的中文语音合成服务。

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `FISH_API_KEY` | Fish Audio API密钥 | `null` |
| `FISH_API_BASE` | API基础URL | `https://api.fish.audio/v1` |
| `FISH_TTS_VOICE` | 语音参考ID | `''` |
| `FISH_TTS_MODEL` | TTS模型 | `speech-1.6` |
| `FISH_TTS_EXTRA_PARAMS` | 额外参数 | `{}` |

#### 预设中文语音参考

内置语音参考ID（通过 `FISH_TTS_VOICE` 设置）：

| 名称 | Reference ID |
|------|-------------|
| 丁真 | `54a5170264694bfc8e9ad98df7bd89c3` |
| 雷军 | `4462fa28f3824bff808a94a6075570e5` |
| 小明剑魔 | `4f77d5137e15401b96617895a2275923` |
| 央视配音 | `59cb5986671546eaa6ca8ae6f29f6d22` |
| 麦当劳 | `4066d617322e41abb30ed70eaeaf273f` |
| 赛马娘 | `0eb38bc974e1459facca38b359e13511` |
| 郑翔洲 | `63393102cf1248849477da56ee5dc3ae` |
| 蔡徐坤 | `e4642e5edccd4d9ab61a69e82d4f8a14` |
| 女大学生 | `5c353fdb312f4888836a9a5680099ef0` |
| 董宇辉 | `8f454f665d214e4284ba05f703b63960` |
| 黑手 | `f7561ff309bd4040a59f1e600f4f4338` |
| 奶龙(效果最好) | `3d1cb00d75184099992ddbaf0fdd7387` |
| 陶矜 | `acb16651a5e14be89b7826a2e24687cd` |
| 邓紫琪 | `3b55b3d84d2f453a98d8ca9bb24182d6` |
| 郭德纲 | `4914b8e04e2148118c91f322d409ccc6` |
| 刘德华 | `cb03a4a3ff6a4784b319cde85a07e31c` |

示例：
```bash
AI_TTS_PROVIDER='fish'
FISH_API_KEY='your_fish_api_key'
FISH_TTS_VOICE='奶龙(效果最好)'
```

### Google TTS

#### 多说话人配置

Google TTS 支持多说话人配置：

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

> **注意**: 多说话人配置与 `GOOGLE_TTS_VOICE` 互斥

## 👤 用户配置

用户可以通过Telegram命令修改这些设置。使用`/setenv KEY=VALUE`设置单个值，或使用`/setenvs {"KEY1": "VALUE1", "KEY2": "VALUE2"}`批量更新。

### 聊天配置

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `AI_CHAT_PROVIDER` | 当前AI提供商 | `openai` |
| `SYSTEM_INIT_MESSAGE` | 系统提示 | 根据语言自动选择 |
| `CHAT_MODEL` | 模型覆盖 | 提供商默认 |
| `MAX_HISTORY_LENGTH` | 历史长度 | `10` |
| `CHAT_TEMPERATURE` | 响应创造性 | `undefined` |
| `MAX_TOKENS` | 最大响应长度 | `undefined` |

### 高级聊天功能

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `USE_TOOLS` | 启用的工具 | `[]` |
| `USE_MCP` | 启用的MCP服务器 | `[]` |
| `TOOL_MODEL` | 工具调用模型 | `''` |
| `MAX_STEPS` | 最大工具步骤 | `3` |
| `MAX_RETRIES` | 最大重试次数 | `0` |
| `ENABLE_INTELLIGENT_MODEL` | 自动模型切换 | `false` |

### 媒体和语音

| 变量 | 描述 | 默认值 | 选项 |
|------|------|--------|------|
| `AI_IMAGE_PROVIDER` | 图像生成器 | `openai` | `openai`, `azure`, `workers`等 |
| `AI_TTS_PROVIDER` | 文字转语音 | `openai` | `openai`, `google`, `fish` |
| `AI_ASR_PROVIDER` | 语音识别 | `openai` | `openai`, `openailike` |
| `TEXT_HANDLE_TYPE` | 文本处理 | `text` | `text`, `tts`, `chat` |
| `TEXT_OUTPUT` | 文本输出格式 | `text` | `text`, `audio` |
| `AUDIO_HANDLE_TYPE` | 音频处理 | `stt` | `stt`, `audio`, `chat` |
| `AUDIO_OUTPUT` | 音频输出格式 | `text` | `text`, `audio` |

### 消息自定义

| 变量 | 描述 | 默认值 | 格式 |
|------|------|--------|------|
| `MESSAGE_REPLACER` | 文本替换 | `{}` | `{"旧": "新"}` |
| `PROMPT` | 自定义提示 | `{}` | `{"角色": "提示"}` |
| `MAPPING_KEY` | 命令快捷键 | 见下方 | 管道分隔 |
| `MAPPING_VALUE` | 快捷键值 | `''` | 管道分隔 |

默认`MAPPING_KEY`：
```
-p:SYSTEM_INIT_MESSAGE|-n:MAX_HISTORY_LENGTH|-a:AI_CHAT_PROVIDER|-ai:AI_IMAGE_PROVIDER|-m:CHAT_MODEL|-md:CURRENT_MODE|-v:VISION_MODEL|-t:OPENAI_TTS_MODEL|-ex:OPENAI_API_EXTRA_PARAMS|-mk:MAPPING_KEY|-mv:MAPPING_VALUE|-tm:TOOL_MODEL|-tool:USE_TOOLS|-oli:IMAGE_MODEL|-th:TEXT_HANDLE_TYPE|-to:TEXT_OUTPUT|-ah:AUDIO_HANDLE_TYPE|-ao:AUDIO_OUTPUT|-act:AUDIO_CONTAINS_TEXT|-as:AI_ASR_PROVIDER|-at:AI_TTS_PROVIDER|-ra:RERANK_AGENT|-ew:ENABLE_WORKFLOW|-tp:CHAT_TEMPERATURE
```

## 📋 命令

### 内置命令

| 命令 | 描述 | 用法 |
|------|------|------|
| `/help` | 显示帮助 | `/help` |
| `/new` | 开始新对话 | `/new` |
| `/start` | 获取用户ID并开始 | `/start` |
| `/img` | 生成图像 | `/img 美丽的日落` |
| `/version` | 检查版本 | `/version` |
| `/setenv` | 设置配置 | `/setenv AI_CHAT_PROVIDER=claude` |
| `/setenvs` | 批量设置配置 | `/setenvs {"CHAT_MODEL": "gpt-4"}` |
| `/delenv` | 删除配置 | `/delenv CHAT_MODEL` |
| `/system` | 显示系统信息 | `/system` |
| `/redo` | 重新生成响应 | `/redo` 或 `/redo 修改的提示` |
| `/set` | 快速设置 | `/set -a claude` |
| `/settings` | 显示当前设置 | `/settings` |
| `/history` | 显示聊天历史 | `/history` |
| `/model` | 显示/更改模型 | `/model` |
| `/cron` | 管理定时AI任务 | `/cron add 09:00 每日早报` |
| `/profile` | 查看/更新用户档案 | `/profile set language zh` |

### 定时任务 (Docker 部署)

使用 `/cron` 命令设置定时触发的 AI 任务。Bot 会在指定时间自动把你的 prompt 发给 AI，生成回复后发送到聊天。

| 命令 | 描述 | 示例 |
|------|------|------|
| `/cron list` | 查看当前聊天的所有任务 | `/cron list` |
| `/cron add` | 添加定时任务 | `/cron add 09:00 每日早报` |
| `/cron del` | 删除任务 | `/cron del abc123` |
| `/cron on` | 启用任务 | `/cron on abc123` |
| `/cron off` | 禁用任务 | `/cron off abc123` |

**时间格式：**
- 简化格式：`HH:MM` (默认每天执行，时区 Asia/Shanghai)
- 完整 cron：`分 时 日 月 周` (如 `0 9 * * 1-5` 表示工作日9点)

**使用场景示例：**
```bash
# 每日资讯推送
/cron add 08:00 请帮我总结今日科技新闻要点
/cron add 09:00 今天天气怎么样？适合户外活动吗？

# 定时提醒
/cron add 12:00 提醒我该吃午饭了
/cron add 22:00 该休息了，早睡早起身体好

# 学习/工作助手
/cron add 0 9 * * 1-5 今天的工作计划是什么？帮我列出待办事项
/cron add 07:30 给我一个今日英语单词学习

# 群聊互动
/cron add 10:00 早上好各位！今天有什么想聊的话题？
/cron add 0 12 * * 5 周五啦！大家周末有什么计划？

# 指定时区
/cron add 09:00 Asia/Tokyo おはようございます
```

> **注意**: 此功能仅在 Docker 部署模式下可用，Cloudflare Workers 不支持动态定时任务。

### 自定义命令

通过设置前缀为`CUSTOM_COMMAND_`的环境变量创建快捷方式：

```bash
# 环境变量
CUSTOM_COMMAND_azure='/setenvs {"AI_CHAT_PROVIDER": "azure"}'
CUSTOM_COMMAND_gpt4='/setenvs {"AI_CHAT_PROVIDER": "openai", "OPENAI_CHAT_MODEL": "gpt-4"}'
CUSTOM_COMMAND_cn2en='/setenvs {"SYSTEM_INIT_MESSAGE": "你是一个翻译器。将所有内容翻译成英文。"}'

# 添加描述
COMMAND_DESCRIPTION_azure='切换到Azure OpenAI'
COMMAND_DESCRIPTION_gpt4='切换到GPT-4'
COMMAND_DESCRIPTION_cn2en='中文到英文翻译器'

# 设置命令范围
COMMAND_SCOPE_azure='all_private_chats,all_group_chats'
```

## 🔧 高级功能

### QSTASH 异步处理

使用 Upstash QStash 进行异步消息处理（适合长时间运行的任务）：

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `QSTASH_URL` | QStash API URL | `https://qstash.upstash.io` |
| `QSTASH_TOKEN` | QStash Token | `''` |
| `QSTASH_PUBLISH_URL` | 回调URL（你的webhook域名） | `''` |
| `QSTASH_TRIGGER_PREFIX` | 触发前缀 | `''` |
| `QSTASH_TIMEOUT` | 超时时间 | `15m` |

> **注意**: 免费账户最大超时时间为 15 分钟

示例：
```bash
QSTASH_TOKEN='your_qstash_token'
QSTASH_PUBLISH_URL='https://your-bot.workers.dev'
QSTASH_TIMEOUT='15m'
```

### Telegram 媒体处理

#### 图片和文件处理

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `TELEGRAM_PHOTO_SIZE_OFFSET` | 图片尺寸偏移 | `-2` |
| `TELEGRAM_IMAGE_TRANSFER_MODE` | 图片传递方式 | `url` |
| `SEND_IMAGE_AS_FILE` | 以文件形式发送图片 | `false` |
| `ENABLE_FILE` | 启用文件读取（已弃用） | `true` |
| `SUPPORT_FORMAT` | 支持的文件格式 | `['text', 'photo', 'voice', 'audio', 'image']` |
| `FILE_SIZE_LIMIT` | 文件大小限制（启用折叠时生效） | `-1` |

**图片尺寸偏移说明**:
- `0`: 第一位（最小）
- `-1`: 最后一位（最大）
- `-2`: 次高质量（默认，推荐）

**图片传递方式**:
- `url`: 通过URL传递（推荐）
- `base64`: 通过base64编码传递

**支持的格式**:
- `text`: 文本文件
- `photo`: 照片
- `voice`: 语音消息
- `audio`: 音频文件
- `video`: 视频文件（取决于模型支持）
- `document`: 文档（图片、音频、文本作为文件发送）
- `sticker`: 贴纸（gif, jpg, png, webp, webm作为视频）
- `image`: 图像文件

#### 媒体消息存储

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `STORE_MEDIA_MESSAGE` | 存储媒体组文件ID | `false` |
| `STORE_TEXT_CHUNK_MESSAGE` | 存储分块文本消息 | `false` |
| `STORE_HISTORY_LENGTH` | 存储历史消息长度 | `64` |

#### 音频处理

| 变量 | 描述 | 默认值 | 选项 |
|------|------|--------|------|
| `AUDIO_TEXT_FORMAT` | 音频文本格式 | `undefined` | `spoiler`, `bold`, `italic`, `underline`, `strikethrough`, `code`, `pre` |
| `AUDIO_PROMPT` | 音频提示词 | 见下方 | - |

默认音频提示词：
```
Please listen to the audio file. Identify and understand the question being asked in the audio. Then, provide a detailed explanation and answer to this question. Ensure your answer is helpful and explains the solution or information clearly.
```

### 消息显示和控制

#### 消息折叠和引用

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ADD_QUOTE_LIMIT` | 自动引用阈值（字符数） | `-1` |
| `ADD_QUOTE_SCOPE` | 折叠消息范围 | `['group', 'supergroup']` |
| `QUOTE_EXPANDABLE` | 引用消息可展开 | `false` |
| `LOG_POSITION_ON_TOP` | 日志位置在顶部 | `true` |

**范围选项**: `group`, `supergroup`, `private`

#### 消息兼容性和显示

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `MESSAGE_COMPATIBLE` | 转换tool_call/tool_result为用户消息 | `true` |
| `ENABLE_SEARCH_SOURCE` | 显示搜索来源 | `true` |
| `SHOW_THINKING_TEXT` | 显示AI推理思考过程 | `true` |
| `EXPANDABLE_THINKING` | 使用可折叠引用块显示思考 | `true` |

#### 内联查询

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `INLINE_QUERY_SEND_INTERVAL` | 内联查询发送间隔（毫秒） | `2000` |
| `INLINE_QUERY_SHOW_INFO` | 内联查询显示信息 | `false` |

#### 回调查询配置

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `CALLBACK_QUERY_RC` | 内联键盘行列数 | `7x2` |
| `ENVS_VARIABLES` | 回调查询中显示的环境变量 | `[]` |
| `CALLBACK_MENU` | 回调菜单选项 | `[]` |

**可用菜单选项**:
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

示例：
```bash
CALLBACK_MENU='["AI_CHAT_PROVIDER", "CHAT_MODEL", "USE_TOOLS"]'
ENVS_VARIABLES='["OPENAI_API_KEY", "ANTHROPIC_API_KEY"]'
```

### 函数调用和工具

配置工具以增强AI功能：

```bash
# 启用内置工具
USE_TOOLS='["web_search", "image_generation", "weather"]'

# 工具的外部API密钥
PLUGIN_ENV_JINA_API_KEY='your_jina_key'
PLUGIN_ENV_QWEATHER_TOKEN='your_weather_token'
```

### 自定义工具

使用环境变量创建自定义工具：

```bash
# 工具定义
PLUGIN_FUNCTION_weather='{
  "name": "weather",
  "description": "获取天气信息",
  "parameters": {
    "type": "object",
    "properties": {
      "city": {"type": "string", "description": "城市名称"}
    }
  }
}'

# 工具环境变量
PLUGIN_ENV_WEATHER_API_KEY='your_api_key'
```

### MCP (模型上下文协议)

配置MCP服务器以扩展功能：

```bash
# 基于SSE的MCP服务器
MCP_example='{
  "type": "sse",
  "url": "https://api.example.com/mcp",
  "headers": {"Authorization": "Bearer your_token"}
}'

# HTTP MCP服务器（支持自定义请求头）
MCP_http='{
  "type": "http",
  "url": "https://api.example.com/mcp",
  "headers": {"Authorization": "Bearer your_token", "X-Custom-Header": "value"}
}'

# 本地进程MCP
MCP_local='{
  "type": "stdio",
  "command": "node",
  "args": ["server.js"],
  "cwd": "/path/to/mcp/server"
}'
```

**MCP Transport 类型：**
- **SSE (Server-Sent Events)**: 使用单向事件流，适合服务器推送场景
- **HTTP (Streamable HTTP)**: 使用 POST 发送消息、GET+SSE 接收消息，支持自定义请求头
- **stdio**: 本地进程通信，适合本地部署的 MCP 服务器

### 消息处理

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `CHAT_TRIGGER_PREFIX` | 机器人触发词 | `''` |
| `IGNORE_TEXT_PREFIX` | 忽略的前缀 | `[]` |
| `TELEGRAM_MIN_STREAM_INTERVAL` | 流延迟(毫秒) | `0` |
| `ADD_QUOTE_LIMIT` | 自动引用阈值 | `-1` |
| `TELEGRAPH_NUM_LIMIT` | Telegraph阈值 | `-1` |
| `EXPIRED_TIME` | 消息过期时间(分钟) | `-1` |

### 显示选项

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ENABLE_SHOWINFO` | 显示模型信息 | `false` |
| `SHOW_PARTS` | 显示的信息部分 | `['model', 'model_time', 'token']` |
| `CALL_INFO` | 显示API调用信息 | `true` |
| `DISABLE_WEB_PREVIEW` | 禁用链接预览 | `false` |
| `SHOW_THINKING_TEXT` | 显示 AI 推理思考过程 | `true` |
| `EXPANDABLE_THINKING` | 使用可折叠引用块显示思考文本 | `true` |
| `SEND_IMAGE_AS_FILE` | 以文件形式发送图像 | `false` |

### 调度和清理

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `CRON_CHECK_TIME` | 清理计划 | `''` |
| `SCHEDULE_GROUP_DELETE_TYPE` | 群组清理类型 | `['tip']` |
| `SCHEDULE_PRIVATE_DELETE_TYPE` | 私聊清理类型 | `['tip']` |

### 智能上下文压缩

当对话接近模型上下文窗口上限时自动进行摘要。保护头部（系统提示 + 前 N 条消息）和尾部（最后 X 个 token），中间部分由 LLM 生成结构化摘要。摘要使用可用的最便宜模型。

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ENABLE_CONTEXT_COMPRESSION` | 启用/禁用压缩 | `true` |
| `CONTEXT_COMPRESSION_THRESHOLD` | 按模型上下文长度的触发比例 | `0.60` |
| `CONTEXT_COMPRESSION_PROTECT_HEAD` | 受保护的头部消息数（系统提示之后） | `3` |
| `CONTEXT_COMPRESSION_TAIL_BUDGET` | 受保护的尾部 token 预算 | `15000` |
| `CONTEXT_COMPRESSION_SUMMARY_RATIO` | 摘要占压缩区间的 token 比例 | `0.20` |

**摘要模型选择（从便宜到贵）：**
- Google: `gemini-2.5-flash-lite`（$0.075/M 输入）
- OpenAI: `gpt-4o-mini`（$0.15/M 输入）
- xAI: `grok-4.1-fast`（$0.20/M 输入）
- Anthropic: `claude-haiku-4-5`（$1.00/M 输入）

多次压缩时会迭代更新摘要。压缩前会自动清理孤立的 tool call / tool result 配对。

### 子代理委派（默认关闭）

生成拥有独立对话历史的隔离子代理。适用于并行研究、多步骤独立工作流，或将数据量大的中间过程隔离在父上下文之外。子代理不能递归委派也不能发送 Telegram 消息；父代理只看到委派调用和最终摘要。

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `ENABLE_DELEGATE_AGENT` | 启用委派工具 | `false` |
| `DELEGATE_MAX_CONCURRENT` | 最大并发子代理数 | `3` |
| `DELEGATE_MAX_ITERATIONS` | 每个子代理最大迭代次数 | `20` |
| `DELEGATE_MODEL` | 子代理使用的模型覆盖（可选） | `''` |

**工具用法：**
- `delegate_task(goal, context)` — 单任务委派
- `delegate_task(tasks)` — 批量并行委派（受 `DELEGATE_MAX_CONCURRENT` 限制）

**何时启用：** 并行对比任务、会淹没父上下文的多步研究、隔离测试。因成本和复杂度，默认关闭。

### 浏览器自动化（Browserless.io）

多后端浏览器工具。主后端为 Browserless.io（云端）；支持多 API Key 轮询以叠加多个免费账号额度，连续失败 3 次以上的 Key 会自动跳过。按 Key 追踪使用次数和失败率。未配置 Key 时降级为普通 HTTP 抓取。Playwright 后端作为预留占位。

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `BROWSERLESS_API_KEY` | 单个 API Key | `''` |
| `BROWSERLESS_API_KEYS` | 逗号分隔的多个 Key | `''` |
| `BROWSERLESS_API_KEY_LIST` | Key 的 JSON 数组 | `''` |
| `BROWSERLESS_URL` | 自定义 Browserless 服务地址 | `''` |

**暴露给 AI 的工具：**
- `browser_navigate` — 抓取 JavaScript 渲染后的页面内容
- `browser_screenshot` — 页面截图（需要 Browserless/Playwright）

无需修改 Docker 镜像，默认使用云服务。

### 用户档案与记忆

持久化的每用户（或每群组）档案，自动注入系统提示，让机器人跨会话记住偏好。通过现有 KV 接口存储（Docker 下为 SQLite，挂载卷后可跨重启持久化）。

**档案字段：**
- `language`：`zh`、`en`、`auto`
- `style`：`concise`、`detailed`、`balanced`
- `timezone`：如 `Asia/Shanghai`
- `notes`：自定义文本
- 偏好工具追踪（自动）
- 交互次数追踪（自动）

**命令：**
- `/profile` — 查看当前档案
- `/profile set <key> <value>` — 更新设置（如 `/profile set language zh`）
- `/profile clear` — 清空所有设置
- `/profile delete` — 删除档案

**群组行为：** 由现有的 `GROUP_CHAT_BOT_SHARE_MODE` 控制。
- `true`：整个群组共享一份档案
- `false`：每个成员拥有独立档案

存储键格式：`user_profile:${chat_id}:${bot_id}[:${from_id}]`。

## 🔒 安全和配置锁定

### 锁定的配置键

为防止令牌泄露，某些键默认被锁定：

```bash
LOCK_USER_CONFIG_KEYS='OPENAI_API_BASE,GOOGLE_API_BASE,MISTRAL_API_BASE,COHERE_API_BASE,ANTHROPIC_API_BASE,AZURE_COMPLETIONS_API,AZURE_DALLE_API'
```

如果遇到"Key XXX is locked"错误，请从此列表中删除该键以解锁。

## 🐛 故障排除

### 常见问题

1. **机器人在群组中不响应**：
   - 将群组ID添加到`CHAT_GROUP_WHITE_LIST`
   - 如果群组>2000成员，设置机器人为管理员
   - 禁用隐私模式：在BotFather中`/setprivacy` → `Disable`

2. **键锁定错误**：
   - 从`LOCK_USER_CONFIG_KEYS`中删除键
   - 或使用系统配置而不是用户配置

3. **API超时**：
   - 增加`CHAT_COMPLETE_API_TIMEOUT`
   - 检查网络连接
   - 验证API密钥和端点

4. **Cloudflare Workers上CPU使用率高**：
   - 改用Docker部署
   - 减少`MAX_HISTORY_LENGTH`
   - 禁用不必要的功能

### 调试模式

启用调试以进行故障排除：

```bash
DEBUG_MODE=true
DEV_MODE=true
LOG_LEVEL=debug
```

### 获取帮助

1. 检查 [GitHub Issues](https://github.com/SzeMeng76/ChatGPT-Telegram-Workers/issues)
2. 查看 [部署指南](DEPLOY.md)
3. 加入我们的社区讨论

---

## 📝 配置示例

### 基础设置
```bash
TELEGRAM_AVAILABLE_TOKENS='123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
OPENAI_API_KEY='sk-...'
LANGUAGE='zh-cn'
CHAT_WHITE_LIST='12345678,87654321'
```

### 多提供商设置
```bash
# 多个AI提供商
OPENAI_API_KEY='sk-openai-key'
ANTHROPIC_API_KEY='sk-ant-key'
GOOGLE_API_KEY='google-key'

# 用户可以用 /setenv AI_CHAT_PROVIDER=claude 切换
```

### 高级功能
```bash
# 启用工具和MCP
USE_TOOLS='["web_search", "image_generation"]'
USE_MCP='["weather_server"]'
ENABLE_INTELLIGENT_MODEL=true

# 自定义快捷键
MAPPING_VALUE='gpt4:gpt-4o|claude:claude-3-5-sonnet-20240620|mini:gpt-4o-mini'
```

更多示例和用例，请参见[部署文档](DEPLOY.md)。