import type { LogLevelType } from './types';
import prompts_default from '../utils/others/prompt';
// -- 只能通过环境变量覆盖的配置 --
export class EnvironmentConfig {
    // 多语言支持
    LANGUAGE = 'zh-cn';
    // 检查更新的分支
    UPDATE_BRANCH = 'master';
    // Chat Complete API Timeout
    CHAT_COMPLETE_API_TIMEOUT = 0;

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
        'GOOGLEAI_STUDIO_API_BASE',
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
    // 群组机器人共享模式,关闭后，一个群组只有一个会话和配置。开启的话群组的每个人都有自己的会话上下文
    GROUP_CHAT_BOT_SHARE_MODE = true;

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
    // 显示快捷回复按钮
    SHOW_REPLY_BUTTON = false;
    // 额外引用消息开关
    EXTRA_MESSAGE_CONTEXT = false;

    // -------------

    // Whether to read files
    /**
     * @deprecated Use a higher granularity parameter SUPPORT_FORMAT.
     */
    ENABLE_FILE = true;
    // Supported file formats: text, photo, voice, audio, video(based on model support), document(send image、audio、text as file), sticker(gif, jpg, png, webp, webm as video)
    SUPPORT_FORMAT: string[] = ['text', 'photo', 'voice', 'audio'];
    // In group chats, the reply object is the trigger object by default, and when enabled, it is prioritized as the object to be replied to
    ENABLE_REPLY_TO_MENTION = false;
    // Ignore messages starting with specified text
    IGNORE_TEXT_PERFIX = '';
    // When multiple processes, whether to hide intermediate step information
    HIDE_MIDDLE_MESSAGE = false;
    /**
     * Replace words, and will force trigger bot { ':n': '/new', ':g3': '/gpt3', ':g4': '/gpt4'}
     * @deprecated, use CHAT_TRIGGER_SUFFIX and COMMAND_TRIGGERS instead
     */
    CHAT_MESSAGE_TRIGGER = {};
    // Chat trigger prefix, it will trigger group message and be deleted
    CHAT_TRIGGER_PERFIX = '';
    // message replacer, you can use it to replace message text in the middle of the message, multiple words can be replaced at the same time
    MESSAGE_REPLACER: Record<string, string> = {};
    // Ask AI to call function times
    FUNC_LOOP_TIMES = 1;
    // Show call info
    CALL_INFO = true;
    // func call Maximum number of concurrent calls after each successful hit
    CON_EXEC_FUN_NUM = 1;
    // When the length reaches the set value, the group will send a telegraph article. If less than 0, it will not be sent
    TELEGRAPH_NUM_LIMIT = -1;
    // Telegraph scope
    TELEGRAPH_SCOPE: string[] = ['group', 'supergroup'];
    // Telegraph author link; The author of the article is currently the robot ID, and if not set, it is anonymous
    TELEGRAPH_AUTHOR_URL = '';
    // Disable link preview
    DISABLE_WEB_PREVIEW = false;
    // Message expired time, unit: minute
    EXPIRED_TIME = -1;
    // Schedule check time use cron expression, for example '*/10 0-2,6-23 * * *' means every ten minutes from 0 to 2 and from 6 to 23
    CRON_CHECK_TIME = '';
    // Schedule group delete type tip dialog:tip and chat dialog:chat
    SCHEDULE_GROUP_DELETE_TYPE = ['tip'];
    // Schedule private delete type command dialog:command and chat dialog:chat
    SCHEDULE_PRIVATE_DELETE_TYPE = ['tip'];

    // All complete api timeout
    ALL_COMPLETE_API_TIMEOUT = 180;
    // Function call timeout
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
}

// -- 通用配置 --
export class AgentShareConfig {
    // AI提供商: openai, anthropic, azure, workers, google, vertex, mistral
    AI_PROVIDER = 'openai';
    // AI图片提供商: openai, azure, workers
    AI_IMAGE_PROVIDER = 'openai';
    // AI ASR 提供商: openai, oailike
    AI_ASR_PROVIDER = 'openai';
    // AI TTS 提供商: openai, oailike
    AI_TTS_PROVIDER = 'openai';
    // 全局默认初始化消息
    SYSTEM_INIT_MESSAGE: string | null = null;
}

// -- Open AI 配置 --
export class OpenAIConfig {
    // OpenAI API Key
    OPENAI_API_KEY: string[] = [];
    // OpenAI Model
    OPENAI_CHAT_MODEL = 'gpt-4o-mini';
    // OpenAI API BASE ``
    OPENAI_API_BASE = 'https://api.openai.com/v1';
    // OpenAI API Extra Params
    OPENAI_API_EXTRA_PARAMS: Record<string, any> = {};
    // OpenAI STT Model
    OPENAI_STT_MODEL = 'whisper-1';
    // OpenAI Vision Model
    OPENAI_VISION_MODEL = 'gpt-4o-mini';
    // OpenAI TTS Model
    OPENAI_TTS_MODEL = 'tts-1';
    OPENAI_TTS_VOICE = 'alloy';
    /**
     * OpenAI need transform model
     * @deprecated
     */
    OPENAI_NEED_TRANSFORM_MODEL: string[] = ['o1-mini-all', 'o1-mini-preview-all'];
    OPENAI_EMBEDDING_MODEL = 'text-embedding-3-small';
    // OpenAI Reasoning Effort, only for starts with 'o1'
    // reasoning_effort: 'low', 'medium', 'high'
    OPENAI_REASONING_EFFORT: 'low' | 'medium' | 'high' | undefined = undefined;
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
    // Azure API Key
    AZURE_API_KEY: string | null = null;
    // Azure Completions API
    // https://RESOURCE_NAME.openai.azure.com/openai/deployments/MODEL_NAME/chat/completions?api-version=VERSION_NAME
    AZURE_COMPLETIONS_API: string | null = null;
    // Azure DallE API
    // https://RESOURCE_NAME.openai.azure.com/openai/deployments/MODEL_NAME/images/generations?api-version=VERSION_NAME
    AZURE_DALLE_API: string | null = null;
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
}

// -- Gemini 配置 --
export class GeminiConfig {
    // Google Gemini API Key
    GOOGLE_API_KEY: string | null = null;
    // Google Gemini API: Cloudflare AI gateway: https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_name}/google-ai-studio/v1/models
    GOOGLE_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';
    // Google Gemini Model
    GOOGLE_CHAT_MODEL = 'gemini-1.5-flash';
    // Google Gemini Vision Model
    GOOGLE_VISION_MODEL = 'gemini-1.5-flash';
    // Google Embedding Model
    GOOGLE_EMBEDDING_MODEL = 'text-embedding-004';
}

// -- Mistral 配置 --
export class MistralConfig {
    // mistral api key
    MISTRAL_API_KEY: string | null = null;
    // mistral api base
    MISTRAL_API_BASE = 'https://api.mistral.ai/v1';
    // mistral api model
    MISTRAL_CHAT_MODEL = 'mistral-tiny';
}

// -- Cohere 配置 --
export class CohereConfig {
    // cohere api key
    COHERE_API_KEY: string | null = null;
    // cohere api base
    COHERE_API_BASE = 'https://api.cohere.com/v1';
    // cohere api model
    COHERE_CHAT_MODEL = 'command-r-plus';
}

// -- Anthropic 配置 --
export class AnthropicConfig {
    // Anthropic api key
    ANTHROPIC_API_KEY: string | null = null;
    // Anthropic api base
    ANTHROPIC_API_BASE = 'https://api.anthropic.com/v1';
    // Anthropic api model
    ANTHROPIC_CHAT_MODEL = 'claude-3-haiku-20240307';
    // Anthropic vision model
    ANTHROPIC_VISION_MODEL = 'claude-3-haiku-20240307';
}

export class OpenAILikeConfig {
    // oailike api key
    OAILIKE_API_KEY: string | null = null;
    // oailike api base
    OAILIKE_API_BASE = 'https://api.siliconflow.cn/v1';
    // oailike api model
    OAILIKE_CHAT_MODEL = '';
    // oailike image model
    OAILIKE_IMAGE_MODEL = 'black-forest-labs/FLUX.1-schnell';
    // oailike vision model
    OAILIKE_VISION_MODEL = '';
    // oailike image size
    OAILIKE_IMAGE_SIZE = '512x512';
    // oailike extra params
    OAILIKE_EXTRA_PARAMS: Record<string, any> = {};
    // oailike embedding model
    OAILIKE_EMBEDDING_MODEL = 'BAAI/bge-m3';
    // oailike rerank model
    OAILIKE_RERANK_MODEL = 'BAAI/bge-reranker-v2-m3';
    // oailike asr model
    OAILIKE_STT_MODEL = 'FunAudioLLM/SenseVoiceSmall';
    // oailike tts model
    OAILIKE_TTS_MODEL = 'fishaudio/fish-speech-1.4';
    // oailike tts voice
    OAILIKE_TTS_VOICE = 'fishaudio/fish-speech-1.4:alex';
}

export class VertexConfig {
    // Google Project id
    VERTEX_PROJECT_ID: string | null = null;
    VERTEX_LOCATION = 'us-central1';
    // Vertex Credentials: need obtain client_email & private_key from google cloud console
    VERTEX_CREDENTIALS: Record<string, any> = {};

    // Vertex Model
    VERTEX_CHAT_MODEL = 'gemini-1.5-flash-002';
    // Vertex Vision Model
    VERTEX_VISION_MODEL = 'gemini-1.5-flash-002';
    // when use search grounding, do not use other tools at the same time, otherwise errors occur.
    SEARCH_GROUNDING = false;
    // Vertex Image Model
    VERTEX_IMAGE_MODEL = 'imagen-3.0-fast-generate-001';
}

export class XAIConfig {
    // XAI api key
    XAI_API_KEY: string | null = null;
    // XAI api base
    XAI_API_BASE = 'https://api.x.ai/v1';
    // XAI api model
    XAI_CHAT_MODEL = 'grok-beta';
    XAI_VISION_MODEL = 'grok-vision-beta';
}

export class DefineKeys {
    DEFINE_KEYS: string[] = [];
}

export class ExtraUserConfig {
    MAPPING_KEY = '-p:SYSTEM_INIT_MESSAGE|-n:MAX_HISTORY_LENGTH|-a:AI_PROVIDER|-ai:AI_IMAGE_PROVIDER|-m:CHAT_MODEL|-md:CURRENT_MODE|-v:VISION_MODEL|-t:OPENAI_TTS_MODEL|-ex:OPENAI_API_EXTRA_PARAMS|-mk:MAPPING_KEY|-mv:MAPPING_VALUE|-asap:FUNCTION_REPLY_ASAP|-tm:TOOL_MODEL|-tool:USE_TOOLS|-oli:IMAGE_MODEL|-th:TEXT_HANDLE_TYPE|-to:TEXT_OUTPUT|-ah:AUDIO_HANDLE_TYPE|-ao:AUDIO_OUTPUT|-act:AUDIO_CONTAINS_TEXT|-as:AI_ASR_PROVIDER|-at:AI_TTS_PROVIDER|-ra:RERANK_AGENT';
    // /set command mapping value, separated by |, : separates multiple relationships
    MAPPING_VALUE = '';
    // MAPPING_VALUE = "cson:claude-3-5-sonnet-20240620|haiku:claude-3-haiku-20240307|g4m:gpt-4o-mini|g4:gpt-4o|rp+:command-r-plus";
    // Whether to show model and time information in the message
    ENABLE_SHOWINFO = false;
    // enable Show info, which parts to show, support model, model_time, token, tool, tool_time
    SHOW_PARTS = ['model', 'model_time', 'token', 'tool', 'tool_time'];
    // Function to use, currently has duckduckgo, jina_reader, icloud_price, nf_price, iap_price, currency
    //
    USE_TOOLS: string[] = [];
    JINA_API_KEY: string[] = [];
    // if starts with '{agent}:' perfix, the specified agent corresponds to the chat model,
    // otherwise use the current agent and the specified model.
    // Keep empty to use the current agent chat model as function call model.
    TOOL_MODEL = '';
    PROMPT: Record<string, string> = prompts_default;

    // INLINE_AGENTS
    // INLINE_AGENTS = ['openai', 'claude', 'google', 'vertex', 'cohere', 'workersai'];
    // INLINE_IMAGE_AGENTS
    // INLINE_IMAGE_AGENTS = ['openai', 'silicon'];
    // INLINE_CHAT_MODELS
    INLINE_CHAT_MODELS: string[] = [];
    // INLINE_VISION_MODELS
    INLINE_VISION_MODELS: string[] = [];
    // INLINE_IMAGE_MODELS
    INLINE_IMAGE_MODELS: string[] = [];
    // INLINE_FUNCTION_TOOLS
    // INLINE_FUNCTION_TOOLS: string[] = [];
    // KlingAI Cookie
    KLINGAI_COOKIE: string[] = [];
    // KlingAI Image Count
    KLINGAI_IMAGE_COUNT = 1;
    // KlingAI Image Ratio
    KLINGAI_IMAGE_RATIO = '1:1';

    // chat agent temperature
    CHAT_TEMPERATURE = 0.5;
    // function call temperature
    FUNCTION_CALL_TEMPERATURE = 0.1;
    // chat max tokens
    MAX_TOKENS = 8192;
    // chat agent max steps
    MAX_STEPS = 3;
    // chat agent max retries
    MAX_RETRIES = 0;
    // Rerank Agent, jina or openai or oailikeV1 or oailikeV2 or google
    // oailikeV1 means use embedding model, oailikeV2 means use rerank model to rerank
    RERANK_AGENT = 'google';
    // Jina Rerank Model
    JINA_RERANK_MODEL = 'jina-colbert-v2';
    // Rerank Models
    RERANK_MODELS: string[] = ['gpt-4o-mini', 'gpt-4o-2024-08-06', 'chatgpt-4o-latest', 'o1-mini', 'o1-preview', 'claude-3-5-sonnet-20241012', 'gemini-1.5-flash-latest', 'gemini-1.5-pro-latest', 'gemini-exp-1206', 'gemini-2.0-flash-exp', 'gemini-2.0-flash-thinking-exp'];
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
    // Drop openai params, the key is the model name, separated by commas, and the value is the parameters to be dropped, separated by commas.
    // example: DROPS_OPENAI_PARAMS = { 'o1-mini,o1-preview': 'max_tokens,temperature,stream' };
    DROPS_OPENAI_PARAMS: Record<string, string> = {};
    // Cover message role, the key is the model name, separated by commas, and the value is overridden_role:new_role.
    // example: COVER_MESSAGE_ROLE = { 'o1-mini,o1-preview': 'system:user' };
    COVER_MESSAGE_ROLE: Record<string, string> = {};
    // 最大历史记录长度 默认12 超过时会自动裁剪
    MAX_HISTORY_LENGTH = 12;
    // 是否生成长文本(受MAX_STEPS限制)
    CONTINUE_STEP = false;
}
