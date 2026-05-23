import type { LogLevelType } from './types';
import prompts_default from '../utils/others/prompt';

// -- 只能通过环境变量覆盖的配置 --
export class EnvironmentConfig {
    // 多语言支持
    LANGUAGE = 'zh-cn';
    // 检查更新的分支
    UPDATE_BRANCH = 'master';
    // Chat Complete API Timeout, scale: seconds
    CHAT_COMPLETE_API_TIMEOUT = 0;
    // Total Duration Limit, scale: seconds, default 30 minutes
    CHAT_TOTAL_DURATION_LIMIT = 60 * 30;
    // tool timeout, scale: seconds
    TOOL_TIMEOUT = 0;
    // -- Telegram 相关 --
    //
    // Telegram API Domain
    TELEGRAM_API_DOMAIN = 'https://api.telegram.org';
    // 允许访问的Telegram Token， 设置时以逗号分隔
    TELEGRAM_AVAILABLE_TOKENS: string[] = [];
    // 默认消息模式
    DEFAULT_PARSE_MODE = 'MarkdownV2';
    // 最小stream模式消息间隔，小于等于0则不限制 单位：ms
    TELEGRAM_MIN_STREAM_INTERVAL = 0;
    // 图片尺寸偏移 0为第一位，-1为最后一位, 越靠后的图片越大。PS: 图片过大可能导致token消耗过多，或者workers超时或内存不足
    // 默认选择次高质量的图片
    TELEGRAM_PHOTO_SIZE_OFFSET = -2;
    // 向LLM优先传递图片方式：url, base64
    TELEGRAM_IMAGE_TRANSFER_MODE = 'url';

    // --  权限相关 --
    //
    // 允许所有人使用
    I_AM_A_GENEROUS_PERSON = false;
    // 白名单
    CHAT_WHITE_LIST: string[] = [];
    // Admin dashboard token
    ADMIN_TOKEN: string | null = null;
    // 用户配置
    LOCK_USER_CONFIG_KEYS = [
        // 默认为API BASE 防止被替换导致token 泄露
        'OPENAI_API_BASE',
        'GOOGLE_API_BASE',
        'MISTRAL_API_BASE',
        'COHERE_API_BASE',
        'ANTHROPIC_API_BASE',
        'AZURE_COMPLETIONS_API',
        'AZURE_DALLE_API',
        'GOOGLE_API_BASE',
        'VERTEX_CREDENTIALS',
        'OAILIKE_API_BASE',
        'XAI_API_BASE',
    ];

    // -- 群组相关 --
    //
    // 允许访问的Telegram Token 对应的Bot Name， 设置时以逗号分隔
    TELEGRAM_BOT_NAME: string[] = [];
    // 群组白名单
    CHAT_GROUP_WHITE_LIST: string[] = [];
    // 群组机器人开关
    GROUP_CHAT_BOT_ENABLE = true;
    // 群组机器人共享模式，开启后，一个群组只有一个会话和配置。关闭的话群组的每个人都有自己的会话上下文
    GROUP_CHAT_BOT_SHARE_MODE = true;
    // 在群聊消息中包含用户名，帮助AI识别不同发言者
    GROUP_INCLUDE_USERNAME = false;
    // 群组消息监听模式：启用后会缓存所有群组消息，AI被触发时能看到完整上下文
    GROUP_MESSAGE_LISTEN_MODE = false;
    // 群组消息缓存数量：缓存最近N条群组消息（默认20条）
    GROUP_MESSAGE_CACHE_SIZE = 20;
    // 群组消息缓存过期时间：缓存消息的生存时间，单位：秒（默认1小时）
    GROUP_MESSAGE_CACHE_TTL = 3600;

    // -- 历史记录相关 --
    //
    // 是否自动裁剪历史记录
    AUTO_TRIM_HISTORY = true;
    // Image占位符: 当此环境变量存在时，则历史记录中的图片将被替换为此占位符
    HISTORY_IMAGE_PLACEHOLDER: string | null = '[A IMAGE]';

    // -- 特性开关 --
    //
    // 隐藏部分命令按钮
    HIDE_COMMAND_BUTTONS: string[] = [];
    // 禁用部分命令
    BLOCK_COMMANDS: string[] = [];
    // 忽略的命令（不触发 AI 回复，用于第三方机器人命令）
    IGNORE_COMMANDS: string[] = [];
    // 显示快捷回复按钮
    SHOW_REPLY_BUTTON = false;
    // 额外引用消息开关
    EXTRA_MESSAGE_CONTEXT = false;
    // 禁用内置工具
    BLOCK_TOOLS: string[] = [];
    // 禁用Agent
    BLOCK_AGENTS: string[] = [];

    // -------------

    // Whether to read files
    /**
     * @deprecated Use a higher granularity parameter SUPPORT_FORMAT.
     */
    ENABLE_FILE = true;
    // Supported file formats: text, photo, voice, audio, video(based on model support), document(send image、audio、text as file), sticker(gif, jpg, png, webp, webm as video)
    SUPPORT_FORMAT: string[] = ['text', 'photo', 'voice', 'audio', 'image'];
    // In group chats, the reply object is the trigger object by default, and when enabled, it is prioritized as the object to be replied to
    ENABLE_REPLY_TO_MENTION = false;
    // Allow processing messages from other bots (Bot API 10.0 Bot-to-Bot communication). Must also enable Bot-to-Bot mode in @BotFather.
    ENABLE_BOT_TO_BOT = false;
    // Whitelist of bot user ids allowed to interact (when ENABLE_BOT_TO_BOT is true). Empty = block all bots (safe default). Use ["*"] to allow any bot.
    ALLOWED_BOT_IDS: string[] = [];
    // Ignore messages starting with specified text
    IGNORE_TEXT_PREFIX = '';
    // When multiple processes, whether to hide intermediate step information
    HIDE_MIDDLE_MESSAGE = false;
    /**
     * Replace words, and will force trigger bot { ':n': '/new', ':g3': '/gpt3', ':g4': '/gpt4'}
     * @deprecated, use CHAT_TRIGGER_SUFFIX and COMMAND_TRIGGERS instead
     */
    CHAT_MESSAGE_TRIGGER = {};
    // Chat trigger prefix, it will trigger group message and be deleted
    CHAT_TRIGGER_PREFIX = '';
    /**
     * Ask AI to call function times
     * @deprecated
     */
    FUNC_LOOP_TIMES = 1;
    // Show call info
    CALL_INFO = true;
    /**
     * func call Maximum number of concurrent calls after each successful hit
     * @deprecated
     */
    CON_EXEC_FUN_NUM = 1;
    // When the length reaches the set value, the group will send a telegraph article. If less than 0, it will not be sent
    TELEGRAPH_NUM_LIMIT = -1;
    // Telegraph scope
    TELEGRAPH_SCOPE: string[] = ['group', 'supergroup'];
    // Telegraph author link; The author of the article is currently the robot ID, and if not set, it is anonymous
    TELEGRAPH_AUTHOR_URL = '';
    // Disable link preview
    DISABLE_WEB_PREVIEW = false;
    // Message expired time, scale: minute
    EXPIRED_TIME = -1;
    // Schedule check time use cron expression, for example '*/10 0-2,6-23 * * *' means every ten minutes from 0 to 2 and from 6 to 23
    CRON_CHECK_TIME = '';
    // Schedule group delete type tip dialog:tip and chat dialog:chat
    SCHEDULE_GROUP_DELETE_TYPE = ['tip'];
    // Schedule private delete type command dialog:command and chat dialog:chat
    SCHEDULE_PRIVATE_DELETE_TYPE = ['tip'];

    /**
     * All complete api timeout
     * @deprecated
     */
    ALL_COMPLETE_API_TIMEOUT = 180;
    /**
     * Function call timeout
     * @deprecated
     */
    FUNC_TIMEOUT = 15;
    // Send pictures via files format
    SEND_IMAGE_AS_FILE: boolean = false;
    // Perplexity cookie
    PPLX_COOKIE: string | null = null;
    // Log level
    LOG_LEVEL: LogLevelType = 'info';

    // -------------

    // -- 模式开关 --
    //
    // 使用流模式
    STREAM_MODE = true;
    // 安全模式 异步模式（polling, 异步webhook）下可关闭
    SAFE_MODE = true;
    // 调试模式
    DEBUG_MODE = false;
    // 开发模式
    DEV_MODE = false;

    QSTASH_URL = 'https://qstash.upstash.io';
    // qstash token
    QSTASH_TOKEN = '';
    // qstash callback url, your telegram bot webhook domain
    QSTASH_PUBLISH_URL = '';
    // qstash trigger prefix
    QSTASH_TRIGGER_PREFIX = '';
    // qstash timeout
    // free account max timeout 15m
    QSTASH_TIMEOUT = '15m';

    FISH_REFERENCE_IDS: Record<string, string> = {
        '丁真': '54a5170264694bfc8e9ad98df7bd89c3',
        '雷军': '4462fa28f3824bff808a94a6075570e5',
        '小明剑魔': '4f77d5137e15401b96617895a2275923',
        '央视配音': '59cb5986671546eaa6ca8ae6f29f6d22',
        '麦当劳': '4066d617322e41abb30ed70eaeaf273f',
        '赛马娘': '0eb38bc974e1459facca38b359e13511',
        '郑翔洲': '63393102cf1248849477da56ee5dc3ae',
        '蔡徐坤': 'e4642e5edccd4d9ab61a69e82d4f8a14',
        '女大学生': '5c353fdb312f4888836a9a5680099ef0',
        '董宇辉': '8f454f665d214e4284ba05f703b63960',
        '黑手': 'f7561ff309bd4040a59f1e600f4f4338',
        '奶龙(效果最好的一个)': '3d1cb00d75184099992ddbaf0fdd7387',
        '陶矜': 'acb16651a5e14be89b7826a2e24687cd',
        '邓紫琪': '3b55b3d84d2f453a98d8ca9bb24182d6',
        '郭德纲': '4914b8e04e2148118c91f322d409ccc6',
        '毕业季温情女学生': 'a1417155aa234890aab4a18686d12849',
        '女主播': '57eab548c7ed4ddc974c4c153cb015b2',
        '影视解说': 'b4bdf5dc66004241a21ff2df165bf442',
        '麦克阿瑟': '405736979e244634914add64e37290b0',
        '甜美女主播': 'e752df7d20cd4576af9a207520349a33',
        '男科医生': '610ab13942834060ba4f3fbd1ca94aa6',
        '台灣彭總 新聲2025': '9f3de3329541472d9b16f9ac2c345351',
        '懒羊羊': '131c6b3a889543139680d8b3aa26b98d',
        '骚气御姐音': 'f44181a3d6d444beae284ad585a1af37',
        '刘德华': 'cb03a4a3ff6a4784b319cde85a07e31c',
    };

    // Only relax /set command temporarily modifies permissions
    RELAX_AUTH_KEYS: string[] = [];
    // inline query send interval
    INLINE_QUERY_SEND_INTERVAL = 2000;
    // inline query show info
    INLINE_QUERY_SHOW_INFO = false;
    // If true, will store media group file id
    STORE_MEDIA_MESSAGE: boolean = false;
    // If true, will store text chunk when message separated to multiple chunks
    STORE_TEXT_CHUNK_MESSAGE: boolean = false;
    // Audio text format
    AUDIO_TEXT_FORMAT: undefined | 'spoiler' | 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code' | 'pre' = undefined;
    // when message length exceeds this value, the message will be set as quotation, with QUOTE_EXPANDABLE set to true to expand the message, set -1 to disable
    ADD_QUOTE_LIMIT = -1;
    // Fold message scope, support group supergroup private
    ADD_QUOTE_SCOPE: string[] = ['group', 'supergroup'];

    // If true, will expand the quote message; log always be expandable
    QUOTE_EXPANDABLE = false;
    // whether log position on top, default is true
    LOG_POSITION_ON_TOP = true;

    // Store history message length
    STORE_HISTORY_LENGTH = 64;
    // File size limit, when enabled folding, the file size limit is effective
    FILE_SIZE_LIMIT = -1;
    // inline keyboard callback row count x column count
    CALLBACK_QUERY_RC = '7x2';
    // envs variables, in the callback query, if it is empty, all variables will be displayed;
    // otherwise, only the set variables will be shown.
    ENVS_VARIABLES = [];
    // callback menu, if it is empty, all options will be displayed.
    // options: 'AI_CHAT_PROVIDER', 'AI_IMAGE_PROVIDER', 'AI_TTS_PROVIDER', 'AI_ASR_PROVIDER', 'USE_TOOLS', 'USE_MCP', 'USE_OAILIKE_RELAY_TOOLS', 'CHAT_MODEL', 'IMAGE_MODEL', 'VISION_MODEL', 'TOOL_MODEL', 'ENVS', 'RERANK_AGENT'
    CALLBACK_MENU = [];

    // Whether to transform  tool_call/tool_result message to user message
    MESSAGE_COMPATIBLE = true;
    // whether to display search source
    ENABLE_SEARCH_SOURCE = true;
    // Whether to show thinking text
    SHOW_THINKING_TEXT = true;
    // Whether to use expandable blockquote for thinking text (collapsible by default)
    EXPANDABLE_THINKING = true;

    // TODO: override command auth, key is command, value is auth role, support: 'creator', 'administrator', null
    // COMMAND_AUTH_OVERRIDE: Record<string, string[]> = {
    //     '/tts': ['creator', 'administrator'],
    // };
}

// -- 通用配置 --
export class AgentShareConfig {
    // AI提供商: openai, anthropic, azure, workers, google, vertex, mistral, xai, oailike
    AI_CHAT_PROVIDER = 'openai';
    // AI图片提供商: openai, azure, workers
    AI_IMAGE_PROVIDER = 'openai';
    // AI ASR 提供商: openai, oailike
    AI_ASR_PROVIDER = 'openai';
    // AI TTS 提供商: openai, oailike
    AI_TTS_PROVIDER = 'openai';
    // 全局默认初始化消息
    SYSTEM_INIT_MESSAGE: string | null = null;
    // 用户时区，用于 {{CURRENT_TIME}} 替换
    TIMEZONE = 'Asia/Shanghai';
}

// -- Open AI 配置 --
export class OpenAIConfig {
    // OpenAI API Key
    OPENAI_API_KEY: string[] = [];
    // OpenAI Model
    OPENAI_CHAT_MODEL = 'gpt-4o-mini';
    // OpenAI API BASE ``
    OPENAI_API_BASE = 'https://api.openai.com/v1';
    // OpenAI API Extra Params, key is model name prefix, separated by commas; value is extra Params, support path(camelCase), split by '.'
    // for example: OPENAI_API_EXTRA_PARAMS = { 'gpt-4o-mini,gpt-4o-2024-08-06': { 'temperature': 0.5 } };
    OPENAI_API_EXTRA_PARAMS: Record<string, Record<string, any>> = {};
    // OpenAI STT Model
    OPENAI_STT_MODEL = 'whisper-1';
    // OpenAI Vision Model
    OPENAI_VISION_MODEL = 'gpt-4o-mini';
    // OpenAI TTS Model
    OPENAI_TTS_MODEL = 'tts-1';
    // OpenAI TTS Extra Params
    OPENAI_TTS_EXTRA_PARAMS: Record<string, Record<string, any>> = {};

    OPENAI_TTS_VOICE = 'alloy';
    /**
     * OpenAI need transform model
     * @deprecated
     */
    OPENAI_NEED_TRANSFORM_MODEL: string[] = ['o1-mini-all', 'o1-mini-preview-all'];
    OPENAI_EMBEDDING_MODEL = 'text-embedding-3-small';

    /**
     * OpenAI Reasoning Effort, only for starts with 'o1'
     * reasoning_effort: 'low', 'medium', 'high'
     * @deprecated use OPENAI_API_EXTRA_PARAMS instead
     */
    OPENAI_REASONING_EFFORT: 'low' | 'medium' | 'high' | undefined = undefined;
    OPENAI_MODELS = [];
    OPENAI_MODELS_API = '/models';
    OPENAI_TTS_PROMPT = '';
    // Response api.
    // Set the model id that needs to use the response api. When * is included, it means to always use the response api.
    OPENAI_RESPONSE_MODELS = ['*'];
    // The API_EXTRA_PARAMS variable will override this option.
    OPENAI_PROVIDER_OPTIONS = {
        // metadata: {},
        parallelToolCalls: true,
        // previousResponseId: '',
        // store: false,
        // user: 'user1',
        // reasoningEffort: 'medium', // 'low' | 'medium' | 'high', default is 'medium'
        // strictJsonSchema: true,
        // instructions: '',
        reasoningSummary: 'auto', // auto, concise, or detailed
        // serviceTier: 'auto',
        // include: ['reasoning.encrypted_content'],
    };

    // OpenAI Server-Side Tools (Responses API only)
    // 可用工具列表：webSearch, codeInterpreter, fileSearch, imageGeneration, mcp
    OPENAI_BUILDIN = ['webSearch', 'codeInterpreter', 'fileSearch', 'imageGeneration', 'mcp'];
    // 启用的工具列表（为保持向后兼容，也支持使用 OPENAI_ENABLE_* 开关）
    USE_OPENAI_BUILDIN: string[] = [];

    // Web Search - 网页搜索工具
    OPENAI_ENABLE_WEB_SEARCH = false;
    OPENAI_WEB_SEARCH_EXTERNAL_ACCESS = true;  // true=实时抓取，false=使用缓存
    OPENAI_WEB_SEARCH_ALLOWED_DOMAINS: string[] = [];  // 允许的域名列表
    OPENAI_WEB_SEARCH_CONTEXT_SIZE: 'low' | 'medium' | 'high' = 'medium';  // 搜索上下文大小
    OPENAI_WEB_SEARCH_USER_LOCATION = '';  // 用户位置，格式: "City, Country" 或 "latitude,longitude"

    // Code Interpreter - Python 代码执行工具
    OPENAI_ENABLE_CODE_INTERPRETER = false;
    OPENAI_CODE_INTERPRETER_CONTAINER = '';  // 容器ID（可选）

    // File Search - 文件向量搜索工具
    OPENAI_ENABLE_FILE_SEARCH = false;
    OPENAI_FILE_SEARCH_VECTOR_STORES: string[] = [];  // 向量存储ID列表（必需）
    OPENAI_FILE_SEARCH_MAX_RESULTS = 10;  // 最大返回结果数
    OPENAI_FILE_SEARCH_SCORE_THRESHOLD = 0.0;  // 相关性阈值（0-1），越高越严格

    // Image Generation - 图片生成工具 (GPT-5.1+)
    OPENAI_ENABLE_IMAGE_GENERATION = false;
    OPENAI_IMAGE_BACKGROUND: 'auto' | 'opaque' | 'transparent' = 'auto';  // 背景类型
    OPENAI_IMAGE_INPUT_FIDELITY: 'low' | 'high' = 'low';  // 输入保真度
    OPENAI_IMAGE_MODEL = 'gpt-image-1';  // 图片生成模型
    OPENAI_IMAGE_OUTPUT_COMPRESSION = 100;  // 输出压缩等级 (0-100)
    OPENAI_IMAGE_OUTPUT_FORMAT: 'png' | 'jpeg' | 'webp' = 'png';  // 输出格式
    OPENAI_IMAGE_PARTIAL_IMAGES = 0;  // 流式模式下生成的部分图片数量 (0-3)
    OPENAI_IMAGE_QUALITY: 'auto' | 'low' | 'medium' | 'high' = 'auto';  // 图片质量
    OPENAI_IMAGE_SIZE: 'auto' | '1024x1024' | '1024x1536' | '1536x1024' = 'auto';  // 图片尺寸

    // MCP - Model Context Protocol
    OPENAI_ENABLE_MCP = false;
    OPENAI_MCP_SERVER_LABEL = '';  // MCP服务器标签（必需）
    OPENAI_MCP_SERVER_URL = '';  // MCP服务器URL（与connectorId二选一）
    OPENAI_MCP_CONNECTOR_ID = '';  // 服务连接器ID（与serverUrl二选一）
    OPENAI_MCP_SERVER_DESCRIPTION = '';  // 服务器描述（可选）
    OPENAI_MCP_ALLOWED_TOOLS: string[] = [];  // 允许的工具名称列表
    OPENAI_MCP_ALLOWED_TOOLS_READ_ONLY = false;  // 仅允许只读工具
    OPENAI_MCP_AUTHORIZATION = '';  // OAuth访问令牌
    OPENAI_MCP_HEADERS: Record<string, string> = {};  // 自定义HTTP头
    OPENAI_MCP_REQUIRE_APPROVAL: 'always' | 'never' = 'never';  // 工具执行审批策略
    OPENAI_MCP_APPROVAL_TOOL_NAMES: string[] = [];  // 需要审批的工具名称（当requireApproval非always时）
}

// -- DALLE 配置 --
export class DalleAIConfig {
    // DALL-E的模型名称
    DALL_E_MODEL = 'dall-e-3';
    // DALL-E图片尺寸
    DALL_E_IMAGE_SIZE = '1024x1024';
    // DALL-E图片质量
    DALL_E_IMAGE_QUALITY = 'standard';
    // DALL-E图片风格
    DALL_E_IMAGE_STYLE = 'vivid';
}

// -- AZURE 配置 --
export class AzureConfig {
    // Azure API Key (supports multiple keys separated by comma for rotation)
    AZURE_API_KEY: string[] = [];
    // Azure Completions API
    // https://RESOURCE_NAME.openai.azure.com/openai/deployments/MODEL_NAME/chat/completions?api-version=VERSION_NAME
    AZURE_COMPLETIONS_API: string | null = null;
    // Azure DallE API
    // https://RESOURCE_NAME.openai.azure.com/openai/deployments/MODEL_NAME/images/generations?api-version=VERSION_NAME
    AZURE_DALLE_API: string | null = null;
    AZURE_MODELS = [];
    AZURE_MODELS_API = '';
}

// -- Workers 配置 --
export class WorkersConfig {
    // Cloudflare Account ID
    CLOUDFLARE_ACCOUNT_ID: string | null = null;
    // Cloudflare Token
    CLOUDFLARE_TOKEN: string | null = null;
    // Text Generation Model
    WORKERS_CHAT_MODEL = '@cf/mistral/mistral-7b-instruct-v0.1 ';
    // Text-to-Image Model
    WORKERS_IMAGE_MODEL = '@cf/stabilityai/stable-diffusion-xl-base-1.0';
    WORKERS_MODELS = [];

    // https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/models/search
    WORKERS_MODELS_API = '';
}

// -- Gemini 配置 --
export class GeminiConfig {
    // Google Gemini API Key (supports multiple keys separated by comma for rotation)
    GOOGLE_API_KEY: string[] = [];
    // Google Gemini API: Cloudflare AI gateway: https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_name}/google-ai-studio/v1/models
    GOOGLE_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';
    // Google Gemini Model
    GOOGLE_CHAT_MODEL = 'gemini-2.5-flash';
    // Google Gemini Vision Model
    GOOGLE_VISION_MODEL = 'gemini-2.5-flash';
    // Google Gemini Image Model
    GOOGLE_IMAGE_MODEL = 'gemini-3.1-flash-image-preview';
    // Google Embedding Model
    GOOGLE_EMBEDDING_MODEL = 'text-embedding-004';
    // Google API Extra Params, key is model name prefix, separated by commas; value is extra Params, support path(camelCase), split by '.'
    // for example: GOOGLE_API_EXTRA_PARAMS = { 'gemini-2.0-flash,gemini-2.5-flash': { 'generationConfig.temperature': 0.5 } };
    // GOOGLE_API_EXTRA_PARAMS: Record<string, Record<string, any>> = {
    //     'gemini-2.5-flash': {
    //         'generationConfig.thinkingConfig': {
    //             includeThoughts: false,
    //             thinkingBudget: 0,
    //         },
    //     },
    // };

    GOOGLE_API_EXTRA_PARAMS: Record<string, Record<string, any>> = {};
    GOOGLE_MODELS = [];
    GOOGLE_MODELS_API = '/models';
    GOOGLE_BUILDIN = ['googleSearch', 'codeExecution', 'urlContext', 'googleMaps', 'fileSearch', 'enterpriseWebSearch'];
    USE_GOOGLE_BUILDIN: string[] = [];

    // Google Search configuration
    // Enable web search (default: true when googleSearch is enabled)
    GOOGLE_SEARCH_ENABLE_WEB_SEARCH = true;
    // Enable image search for image-capable models (e.g., gemini-3.1-flash-image-preview)
    GOOGLE_SEARCH_ENABLE_IMAGE_SEARCH = false;
    // Time range filter for search results (ISO 8601 format)
    // Example: { startTime: '2025-01-01T00:00:00Z', endTime: '2025-12-31T23:59:59Z' }
    GOOGLE_SEARCH_TIME_RANGE_FILTER: { startTime?: string; endTime?: string } = {};

    // File Search configuration (for RAG)
    // Example: ['fileSearchStores/my-store-123']
    GOOGLE_FILE_SEARCH_STORES: string[] = [];
    GOOGLE_FILE_SEARCH_TOP_K = 10;
    GOOGLE_FILE_SEARCH_METADATA_FILTER = '';

    // Google Maps Grounding - location context for location-aware responses (latitude, longitude)
    GOOGLE_RETRIEVAL_CONFIG: { latLng?: { latitude: number; longitude: number } } = {};
    // Model to use when googleMaps tool is active (gemini-2.x and gemini-3.x support Maps)
    // Set to empty string to disable auto-switching
    GOOGLE_MAPS_MODEL = 'gemini-3-flash-preview';
    GOOGLE_TTS_MODEL = 'gemini-2.5-flash-preview-tts';

    // Gemini 3.1 Flash Image Configuration (gemini-3.1-flash-image-preview)
    // Image aspect ratio: "1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9", "1:8", "8:1", "1:4", "4:1"
    GOOGLE_IMAGE_ASPECT_RATIO: string | null = null;
    // Image resolution: "1K", "2K", "4K", "512"
    GOOGLE_IMAGE_SIZE: string | null = null;
    // Enable Google Search grounding for real-time data (weather, stocks, current events)
    GOOGLE_IMAGE_ENABLE_GOOGLE_SEARCH = false;

    // available voices: https://ai.google.dev/gemini-api/docs/speech-generation#voices
    GOOGLE_TTS_VOICE = 'Zephyr';
    GOOGLE_TTS_PROMPT = '';
    // It is mutually exclusive with GOOGLE_TTS_VOICE
    GOOGLE_TTS_EXTRA_PARAMS: Record<string, any> = {
    //     multi_speaker_voice_config: {
    //         speaker_voice_configs: [
    //             {
    //                 speaker: 'Speaker1',
    //                 voice_config: {
    //                     prebuilt_voice_config: {
    //                         voice_name: 'Kore',
    //                     },
    //                 },
    //             },
    //             {
    //                 speaker: 'Speaker2',
    //                 voice_config: {
    //                     prebuilt_voice_config: {
    //                         voice_name: 'Puck',
    //                     },
    //                 },
    //             },
    //         ],
    //     },
    //     language_code: 'en-US',
    };

    GOOGLE_PROVIDER_OPTIONS = {
        // responseModalities: ['TEXT'],
        // thinkingConfig: {
        //     thinkingBudget: '1024',
        //     includeThoughts: false,
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
        //     // mode: 'MODE_DYNAMIC', // 'MODE_UNSPECIFIED' | 'MODE_DYNAMIC'
        //     // dynamicThreshold: 5,
        // },
    };
}

// -- Mistral 配置 --
export class MistralConfig {
    // mistral api key (supports multiple keys separated by comma for rotation)
    MISTRAL_API_KEY: string[] = [];
    // mistral api base
    MISTRAL_API_BASE = 'https://api.mistral.ai/v1';
    // mistral api model
    MISTRAL_CHAT_MODEL = 'mistral-tiny';
    MISTRAL_MODELS = [];
    MISTRAL_MODELS_API = '/models';
}

// -- Cohere 配置 --
export class CohereConfig {
    // cohere api key (supports multiple keys separated by comma for rotation)
    COHERE_API_KEY: string[] = [];
    // cohere api base
    COHERE_API_BASE = 'https://api.cohere.com/v1';
    // cohere api model
    COHERE_CHAT_MODEL = 'command-r-plus';
    COHERE_MODELS = [];
    COHERE_MODELS_API = '/models';
}

// -- Anthropic 配置 --
export class AnthropicConfig {
    // Anthropic api key (supports multiple keys separated by comma for rotation)
    ANTHROPIC_API_KEY: string[] = [];
    // Anthropic api base
    ANTHROPIC_API_BASE = 'https://api.anthropic.com/v1';
    // Anthropic api model
    ANTHROPIC_CHAT_MODEL = 'claude-3-5-haiku-20241022';
    // Anthropic vision model
    ANTHROPIC_VISION_MODEL = 'claude-3-5-haiku-20241022';
    // Anthropic API Extra Params, key is model name prefix, separated by commas; value is extra Params, support path(camelCase), split by '.'
    // for example: ANTHROPIC_API_EXTRA_PARAMS = { 'claude-3-5': { 'temperature': 0.5 } };
    ANTHROPIC_API_EXTRA_PARAMS: Record<string, Record<string, any>> = {
        'claude-3-7-sonnet': {
            temperature: 1,
            thinking: {
                type: 'enabled',
                budget_tokens: 4096,
            },
        },
    };

    ANTHROPIC_MODELS = [];
    ANTHROPIC_MODELS_API = '/models';

    // Anthropic Cache Control - 启用prompt caching以降低API成本
    // 当启用时，system message和tools会自动标记为可缓存
    ANTHROPIC_ENABLE_CACHE_CONTROL = true;

    // Anthropic Server-Side Tools - Anthropic原生工具支持
    // 可用工具列表：webFetch, webSearch, codeExecution
    ANTHROPIC_BUILDIN = ['webFetch', 'webSearch', 'codeExecution'];
    // 启用的工具列表（为保持向后兼容，也支持使用ANTHROPIC_ENABLE_*开关）
    USE_ANTHROPIC_BUILDIN: string[] = [];

    // Web Fetch - 获取网页内容并支持citations
    ANTHROPIC_ENABLE_WEB_FETCH = false;
    ANTHROPIC_WEB_FETCH_MAX_USES = 5;
    ANTHROPIC_WEB_FETCH_ALLOWED_DOMAINS: string[] = [];
    ANTHROPIC_WEB_FETCH_BLOCKED_DOMAINS: string[] = [];
    ANTHROPIC_WEB_FETCH_ENABLE_CITATIONS = true;
    ANTHROPIC_WEB_FETCH_MAX_CONTENT_TOKENS = 4000;

    // Web Search - 网页搜索工具
    ANTHROPIC_ENABLE_WEB_SEARCH = false;
    ANTHROPIC_WEB_SEARCH_MAX_USES = 5;
    ANTHROPIC_WEB_SEARCH_ALLOWED_DOMAINS: string[] = [];
    ANTHROPIC_WEB_SEARCH_BLOCKED_DOMAINS: string[] = [];
    ANTHROPIC_WEB_SEARCH_USER_LOCATION = '';

    // Code Execution - 代码执行工具（Python + Bash）
    ANTHROPIC_ENABLE_CODE_EXECUTION = false;

    // Tool Streaming - 细粒度工具流（实时显示工具执行进度）
    ANTHROPIC_ENABLE_TOOL_STREAMING = true;

    // Context Management - 自动清理历史工具调用，避免上下文过长
    ANTHROPIC_ENABLE_CONTEXT_MANAGEMENT = true;
    // 触发模式: 'auto' 自动触发清理 | 'manual' 手动控制
    ANTHROPIC_CONTEXT_CLEAR_TRIGGER: 'auto' | 'manual' = 'auto';
    // 保留最近N次工具调用（其余会被清理）
    ANTHROPIC_CONTEXT_KEEP_RECENT = 5;
    // 至少清理N千个tokens（例如：2 = 2000 tokens）
    ANTHROPIC_CONTEXT_CLEAR_AT_LEAST = 2;
    // 是否清理工具输入参数（保留工具调用但清理输入）
    ANTHROPIC_CONTEXT_CLEAR_TOOL_INPUTS = false;
    // 排除的工具（这些工具的调用不会被清理）
    ANTHROPIC_CONTEXT_EXCLUDE_TOOLS: string[] = [];

    // Thinking 清理配置（针对推理模型如 Claude 3.7 Sonnet）
    ANTHROPIC_ENABLE_THINKING_CLEANUP = false;
    // 保留最近N轮的 thinking 内容
    ANTHROPIC_THINKING_KEEP_RECENT = 3;

    // Structured Output Mode - 强制输出符合 JSON Schema 的结构化数据
    // 模式: 'outputFormat' 使用 output format | 'tool' 使用工具模式 | 'auto' 自动选择
    // 'outputFormat' 更灵活，推荐用于大多数场景
    // 'tool' 强制使用工具，适合需要严格验证的场景
    ANTHROPIC_STRUCTURED_OUTPUT_MODE: 'outputFormat' | 'tool' | 'auto' = 'auto';

    ANTHROPIC_PROVIDER_OPTIONS = {
        // sendReasoning: true,
        // thinking: {
        //     type: 'enabled', // 'enabled' | 'disabled'
        //     budgetTokens: '1024',
        // },
    };
}

export class OpenAILikeConfig {
    // oailike api key (supports multiple keys separated by comma for rotation)
    OAILIKE_API_KEY: string[] = [];
    // oailike api base
    OAILIKE_API_BASE = 'https://api.openai.com/v1';
    // oailike api model
    OAILIKE_CHAT_MODEL = 'gpt-4o-mini';
    // oailike image model
    OAILIKE_IMAGE_MODEL = 'dall-e-3';
    // oailike vision model
    OAILIKE_VISION_MODEL = 'gpt-4o-mini';
    // oailike image size
    OAILIKE_IMAGE_SIZE = '1024x1024';
    // oailike embedding model
    OAILIKE_EMBEDDING_MODEL = 'text-embedding-3-small';
    // oailike rerank model
    OAILIKE_RERANK_MODEL = '';
    // oailike asr model
    OAILIKE_STT_MODEL = 'FunAudioLLM/SenseVoiceSmall';
    // oailike tts model
    OAILIKE_TTS_MODEL = 'tts-1';
    // oailike tts extra params
    OAILIKE_TTS_EXTRA_PARAMS: Record<string, Record<string, any>> = {};
    // oailike tts voice
    OAILIKE_TTS_VOICE = 'alloy';
    // OAILIKE API Extra Params, key is model name prefix, separated by commas; value is extra Params, support path(camelCase), split by '.'
    // for example: OAILIKE_API_EXTRA_PARAMS = { 'gpt-4o': { 'temperature': 0.5 } };
    OAILIKE_API_EXTRA_PARAMS: Record<string, Record<string, any>> = {};
    OAILIKE_MODELS = [];
    OAILIKE_MODELS_API = '/models';
    // oailike relay
    OAILIKE_RELAY_TOOLS: Record<string, string[]> = {
        gemini: ['googleSearch', 'codeExecution', 'urlContext'],
    };

    // use oailike relay tools, support 'googleSearch, codeExecution, urlContext'
    USE_OAILIKE_RELAY_TOOLS: string[] = [];
    // OAILIKE Provider Options
    OAILIKE_PROVIDER_OPTIONS = {};
}

export class VertexConfig {
    // Google Project id
    VERTEX_PROJECT_ID: string | null = null;
    VERTEX_LOCATION = 'us-central1';
    // Vertex Credentials: need obtain client_email & private_key from google cloud console
    VERTEX_CREDENTIALS: Record<string, any> = {};

    // Vertex Model
    VERTEX_CHAT_MODEL = 'gemini-2.5-flash';
    // Vertex Vision Model
    VERTEX_VISION_MODEL = 'gemini-2.5-flash';
    /**
     * @deprecated
     * when use search grounding, do not use other tools at the same time, otherwise errors occur.
     */
    SEARCH_GROUNDING = false;
    // Vertex Image Model
    VERTEX_IMAGE_MODEL = 'imagen-3.0-fast-generate-001';
    VERTEX_MODELS = [];

    // https://{service-endpoint}/v1/{parent}/models
    // Where {service-endpoint} is one of the [supported service endpoints](https://cloud.google.com/vertex-ai/docs/reference/rest#rest_endpoints).
    // parent: Required. The resource name of the Location to list the Models from. Format: projects/{project}/locations/{location}
    VERTEX_MODELS_API = '';
}

export class XAIConfig {
    // XAI api key (supports multiple keys separated by comma for rotation)
    XAI_API_KEY: string[] = [];
    // XAI api base
    XAI_API_BASE = 'https://api.x.ai/v1';
    // XAI api model
    XAI_CHAT_MODEL = 'grok-4-1-fast';
    XAI_VISION_MODEL = 'grok-2-vision';
    // XAI image model
    XAI_IMAGE_MODEL = 'grok-imagine-image';
    // XAI API Extra Params, key is model name prefix, separated by commas; value is extra Params,  support path(camelCase), split by '.'
    // for example: XAI_API_EXTRA_PARAMS = { 'grok-3': { 'temperature': 0.5 } };
    XAI_API_EXTRA_PARAMS: Record<string, Record<string, any>> = {};
    XAI_MODELS = [];
    XAI_MODELS_API = '/models';
    XAI_PROVIDER_OPTIONS = {
        // reasoningEffort: 'high',
    };

    // Models that should use Responses API (Chat Completions API is deprecated by xAI)
    // Use '*' to enable for all models, or specify model prefixes like ['grok-4']
    // Models not matching will fall back to deprecated Chat Completions API
    XAI_RESPONSE_MODELS: string[] = ['*'];
    // Disable xAI server-side conversation history storage (for privacy)
    // When false, xAI will not store the conversation on their servers
    XAI_STORE_CONVERSATION = true;

    // ===== Responses API Server-Side Tools =====
    // 可用工具列表：webSearch, xSearch, codeExecution, fileSearch
    XAI_BUILDIN = ['webSearch', 'xSearch', 'codeExecution', 'fileSearch'];
    // 启用的工具列表（为保持向后兼容，也支持使用XAI_ENABLE_*开关）
    USE_XAI_BUILDIN: string[] = [];

    // Enable web search tool (allows Grok to search the web and browse pages)
    XAI_ENABLE_WEB_SEARCH = false;
    // Enable X/Twitter search tool (allows Grok to search X posts)
    XAI_ENABLE_X_SEARCH = false;
    // Enable code execution tool (allows Grok to run Python code in sandbox)
    XAI_ENABLE_CODE_EXECUTION = false;
    // Enable file search tool (allows Grok to search in vector stores/collections)
    XAI_ENABLE_FILE_SEARCH = false;
    // Vector store IDs (collection IDs) to search through
    // Create collections at https://console.x.ai/ and get the collection ID
    XAI_FILE_SEARCH_VECTOR_STORES: string[] = [];
    // Maximum number of search results to return
    XAI_FILE_SEARCH_MAX_RESULTS = 10;
    // Allowed domains for web search (max 5 domains, empty = no restriction)
    XAI_WEB_SEARCH_ALLOWED_DOMAINS: string[] = [];
    // Excluded domains for web search (max 5 domains)
    XAI_WEB_SEARCH_EXCLUDED_DOMAINS: string[] = [];
    // Enable image understanding in web search results
    XAI_WEB_SEARCH_IMAGE_UNDERSTANDING = false;
    // Allowed X handles for X search (max 10 handles, empty = no restriction)
    XAI_X_SEARCH_ALLOWED_HANDLES: string[] = [];
    // Excluded X handles for X search (max 10 handles)
    XAI_X_SEARCH_EXCLUDED_HANDLES: string[] = [];
    // Enable image understanding in X search results
    XAI_X_SEARCH_IMAGE_UNDERSTANDING = false;
    // Enable video understanding in X search results
    XAI_X_SEARCH_VIDEO_UNDERSTANDING = false;
}

export class FishConfig {
    // Fish api key (supports multiple keys separated by comma for rotation)
    FISH_API_KEY: string[] = [];
    // Fish api base
    FISH_API_BASE = ' https://api.fish.audio/v1';
    // Fish reference id, if not set, will use tts model
    FISH_TTS_VOICE = '';
    // Fish TTS Model
    FISH_TTS_MODEL = 'speech-1.6';
    FISH_TTS_EXTRA_PARAMS: Record<string, any> = {};
}

export class BlackForestLabsConfig {
    // Black Forest Labs API key (supports multiple keys separated by comma for rotation)
    BFL_API_KEY: string[] = [];
    // Black Forest Labs API base URL
    BFL_API_BASE = 'https://api.bfl.ai/v1';
    // Black Forest Labs image model
    // FLUX.2 (generation + editing, up to 8 ref images):
    //   flux-2-pro, flux-2-max, flux-2-flex, flux-2-klein-4b, flux-2-klein-9b
    // FLUX Kontext (in-context editing, up to 10 ref images):
    //   flux-kontext-pro, flux-kontext-max
    // FLUX.1 generation only:
    //   flux-pro-1.1-ultra, flux-pro-1.1, flux-pro, flux-dev
    // Inpainting with mask:
    //   flux-pro-1.0-fill
    BFL_IMAGE_MODEL = 'flux-2-klein-9b';
}

export class DefineKeys {
    DEFINE_KEYS: string[] = [];
}

export class ExtraUserConfig {
    MAPPING_KEY = '-p:SYSTEM_INIT_MESSAGE|-n:MAX_HISTORY_LENGTH|-a:AI_CHAT_PROVIDER|-ai:AI_IMAGE_PROVIDER|-m:CHAT_MODEL|-md:CURRENT_MODE|-v:VISION_MODEL|-t:OPENAI_TTS_MODEL|-ex:OPENAI_API_EXTRA_PARAMS|-mk:MAPPING_KEY|-mv:MAPPING_VALUE|-tm:TOOL_MODEL|-tool:USE_TOOLS|-im:IMAGE_MODEL|-th:TEXT_HANDLE_TYPE|-to:TEXT_OUTPUT|-ah:AUDIO_HANDLE_TYPE|-ao:AUDIO_OUTPUT|-act:AUDIO_CONTAINS_TEXT|-as:AI_ASR_PROVIDER|-at:AI_TTS_PROVIDER|-ra:RERANK_AGENT|-ew:ENABLE_WORKFLOW|-tp:CHAT_TEMPERATURE';
    // /set command mapping value, separated by |, : separates multiple relationships
    MAPPING_VALUE = '';
    // MAPPING_VALUE = "cson:claude-3-5-sonnet-20240620|haiku:claude-3-haiku-20240307|g4m:gpt-4o-mini|g4:gpt-4o|rp+:command-r-plus";
    // Whether to show model and time information in the message
    ENABLE_SHOWINFO = false;
    // enable Show info, which parts to show, support model, model_time, token, tool, tool_time, first_chunk_time
    SHOW_PARTS = ['model', 'model_time', 'token', 'tool', 'tool_time'];
    // Function to use, currently has duckduckgo, jina_reader, icloud_price, nf_price, iap_price, currency
    //
    USE_TOOLS: string[] = [];
    USE_MCP: string[] = [];
    JINA_API_KEY: string[] = [];
    // if starts with '{agent}:' prefix, the specified agent corresponds to the chat model,
    // otherwise use the current agent and the specified model.
    // Keep empty to use the current agent chat model as function call model.
    TOOL_MODEL = '';
    PROMPT: Record<string, string> = prompts_default;
    // KlingAI Cookie
    KLINGAI_COOKIE: string[] = [];
    // KlingAI Image Count
    KLINGAI_IMAGE_COUNT = 1;
    // KlingAI Image Ratio
    KLINGAI_IMAGE_RATIO = '1:1';

    // chat agent temperature
    CHAT_TEMPERATURE: number | undefined = undefined;
    // function call temperature
    FUNCTION_CALL_TEMPERATURE: number | undefined = undefined;
    // chat max tokens
    MAX_TOKENS: number | undefined = undefined;
    // chat agent max steps
    MAX_STEPS = 5;
    // chat agent max retries
    MAX_RETRIES = 0;
    // Rerank Agent, jina or openai or oailikeV1 or oailikeV2 or google
    // oailikeV1 means use embedding model, oailikeV2 means use rerank model to rerank
    RERANK_AGENT = 'google';
    // Jina Rerank Model
    JINA_RERANK_MODEL = 'jina-colbert-v2';
    // Whether to enable intelligent model processing
    ENABLE_INTELLIGENT_MODEL = false;
    // text handle type, to 'tts' or 'text' to chat with llm, or 'chat' by using audio-preview (default: text)
    TEXT_HANDLE_TYPE: 'tts' | 'text' | 'chat' = 'text';
    // Text output type, 'audio' or 'text' (default: text)
    TEXT_OUTPUT: 'audio' | 'text' = 'text';
    // Audio handle type, 'stt' or 'audio' to chat with llm, or 'chat' by using audio-preview (default: stt)
    AUDIO_HANDLE_TYPE: 'stt' | 'audio' | 'chat' = 'stt';
    // Audio output type, 'audio' or 'text' (default: text)
    AUDIO_OUTPUT: 'audio' | 'text' = 'text';
    // Audio contains text
    AUDIO_CONTAINS_TEXT = true;
    // Drop openai params, the key is the model name,
    // separated by commas, and the value is the parameters to be dropped, separated by commas.
    // example: DROPS_OPENAI_PARAMS = { 'o1-mini,o1-preview': 'max_tokens,temperature,stream' };
    /**
     * @deprecated Use PARAMS_MODIFIER instead
     */
    DROPS_OPENAI_PARAMS: Record<string, string> = {};
    // Cover message role, the key is the model name, separated by commas, and the value is overridden_role:new_role.
    // example: COVER_MESSAGE_ROLE = { 'o1-mini,o1-preview': 'system:user' };
    COVER_MESSAGE_ROLE: Record<string, string> = {};
    // max history length, default is 10
    MAX_HISTORY_LENGTH = 10;
    // whether to generate long text (limited by MAX_STEPS)
    CONTINUE_STEP = false;
    // message replacer, you can use it to replace message text in the middle of the message, multiple words can be replaced at the same time
    MESSAGE_REPLACER: Record<string, string> = {};
    // Parameter modifier; string array; separated by colons, the key is the model name, separated by commas;
    // the value is the parameter modification value, modification values starting with '+' indicates addition, with the value after '=' and separated by '|'; starting with '-' indicates addition indicate deletion.
    // note: not support stream option
    // for example: PARAMS_MODIFIER = ['o1-mini,o3-mini:-temperature|+max_tokens=1000'];
    // priority is higher than EXTRA_PARAMS
    PARAMS_MODIFIER: string[] = ['o1-mini,o3-mini,gpt-4o-mini-search-preview,gpt-4o-search-preview:-temperature'];

    // ===== 智能上下文压缩配置 =====
    // 是否启用智能上下文压缩
    ENABLE_CONTEXT_COMPRESSION = true;
    // 触发压缩的阈值百分比（相对于模型上下文长度）
    // 对于大上下文模型（如 Gemini 3 Flash 1M tokens），60% 约为 600K tokens
    CONTEXT_COMPRESSION_THRESHOLD = 0.60;
    // 保护头部消息数量（系统提示 + 前几条消息）
    CONTEXT_COMPRESSION_PROTECT_HEAD = 3;
    // 尾部 token 预算（保护最近的消息）
    // 增加到 15000 以保护更多最近的对话上下文
    CONTEXT_COMPRESSION_TAIL_BUDGET = 15000;
    // 摘要目标比例
    CONTEXT_COMPRESSION_SUMMARY_RATIO = 0.20;

    // 摘要生成 provider（可选）
    // 留空则使用 AI_CHAT_PROVIDER（保持向后兼容，自动选择便宜模型）
    // 可选值：openai, anthropic, google, xai, oailike, cohere, mistral, vertex, azure, workers
    // 用途：将 summary 流量从主 provider 移开，避免 Google 误判 hijack / 节省主 key 配额
    SUMMARY_PROVIDER?: string;
    // 摘要生成模型（可选）
    // 留空则按 SUMMARY_PROVIDER 自动选便宜模型（gpt-4o-mini / claude-haiku-4-5 / gemini-2.5-flash-lite / grok-4.1-fast）
    // 支持的格式：直接模型名（如 gemini-2.5-flash-lite），或 provider:model（如 oailike:openai/gpt-4o-mini）
    SUMMARY_MODEL?: string;

    // ===== 子代理委托配置 =====
    // 是否启用子代理委托（默认关闭，高级功能）
    // 适用场景：并行研究任务、复杂多步骤工作流、需要隔离上下文的任务
    // 注意：会增加 API 调用成本和响应时间
    ENABLE_DELEGATE_AGENT = false;
    // 最大并发子代理数量
    DELEGATE_MAX_CONCURRENT = 3;
    // 子代理默认最大迭代次数
    DELEGATE_MAX_ITERATIONS = 20;
    // 子代理使用的模型（可选，默认自动选择便宜的模型）
    DELEGATE_MODEL?: string;

    // ===== 浏览器自动化配置 =====
    // Browserless.io API 密钥（云端浏览器，适合 Cloudflare Workers）
    // 获取：https://www.browserless.io/
    // 支持单个 Key
    BROWSERLESS_API_KEY?: string;
    // 支持多个 Key（逗号分隔，用于轮询）
    BROWSERLESS_API_KEYS?: string;
    // 支持 Key 列表（JSON 数组格式）
    BROWSERLESS_API_KEY_LIST?: string;
    // Browserless 服务 URL（默认：https://chrome.browserless.io）
    BROWSERLESS_URL?: string;

    // start with @key to trigger workflow, support agent, model, temperature, max_tokens;
    // next is the next step prompt: {{result}} is the result of the current step result, {{question}} is user input
    WORKFLOW: {
        [key: string]: {
            agent: string;
            model: string;
            temperature: number;
            max_tokens: number;
            next: string;
        }[];
    } = {
        // think: [{
        //     agent: 'oailike',
        //     model: 'deepseek-reasoner',
        //     temperature: 0.3,
        //     max_tokens: 1,
        //     next: `思考内容: {{result}}\n\n基于以上思考回答问题: {{question}}`,
        // }],
    };

    // whether to enable workflow
    ENABLE_WORKFLOW = false;
    // whether to enable model alias of mapping value
    ENABLE_ALIAS = false;
    // 音频提示词
    AUDIO_PROMPT = 'Please listen to the audio file. Identify and understand the question being asked in the audio. Then, provide a detailed explanation and answer to this question. Ensure your answer is helpful and explains the solution or information clearly.';
    // use blocklist to block someone
    BLOCKLIST: string[] = [];
}
