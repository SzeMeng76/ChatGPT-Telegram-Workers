import type { FuncTool } from '../extra/tools/types';
import type { FlowStruct, LogLevelType } from './types';
import prompts_default from '../extra/prompt';
import tools_default from '../extra/tools';
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
    // 最小stream模式消息间隔，小于等于0则不限制
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
        'GOOGLE_COMPLETIONS_API',
        'MISTRAL_API_BASE',
        'COHERE_API_BASE',
        'ANTHROPIC_API_BASE',
        'AZURE_COMPLETIONS_API',
        'AZURE_DALLE_API',
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
    // 为了避免4096字符限制，将消息删减
    AUTO_TRIM_HISTORY = true;
    // 最大历史记录长度
    MAX_HISTORY_LENGTH = 20;
    // 最大消息长度
    MAX_TOKEN_LENGTH = -1;
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
    ENABLE_FILE = true;
    // In group chats, the reply object is the trigger object by default, and when enabled, it is prioritized as the object to be replied to
    ENABLE_REPLY_TO_MENTION = false;
    // Ignore messages starting with specified text
    IGNORE_TEXT = '';
    // When multiple processes, whether to hide intermediate step information
    HIDE_MIDDLE_MESSAGE = false;
    // Replace words, and will force trigger bot { ':n': '/new', ':g3': '/gpt3', ':g4': '/gpt4'}
    CHAT_MESSAGE_TRIGGER = {};
    TOOLS: Record<string, FuncTool> = tools_default;
    // Ask AI to call function times
    FUNC_LOOP_TIMES = 1;
    // Show call info
    CALL_INFO = true;
    // func call Maximum number of concurrent calls after each successful hit
    CON_EXEC_FUN_NUM = 1;
    // When the length reaches the set value, the group will send a telegraph article. If less than 0, it will not be sent
    TELEGRAPH_NUM_LIMIT = -1;
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
    // Store message whitelist
    STORE_MESSAGE_WHITELIST: number[] = [];
    // Store message num
    STORE_MESSAGE_NUM = 0;
    // Drop openai params, the key is the model name, separated by commas, and the value is the parameters to be dropped, separated by commas.
    // DROPS_OPENAI_PARAMS = { 'o1-mini,o1-preview': 'max_tokens,temperature,stream' };
    DROPS_OPENAI_PARAMS: Record<string, string> = {};
    // Cover message rol, the key is the model name, separated by commas, and the value is overridden_role:new_role.
    // COVER_MESSAGE_ROLE = { 'o1-mini,o1-preview': 'system:user' };
    COVER_MESSAGE_ROLE: Record<string, string> = {};
    // Send pictures via files format
    SEND_IMAGE_FILE: boolean = false;
    // Perplexity cookie
    PPLX_COOKIE: string | null = null;
    // Log level
    LOG_LEVEL: LogLevelType = 'info';

    // The model is not fully compatible with the openai function call setting parameter to false, by default it is not fully compatible.
    // When the model name does not contain "gpt" and this parameter is set to false: remove data with empty content (when calling gpt function, content is empty), remove tool_choice and tool_calls parameters.
    // At the same time, replace role = tool data with role = user, and replace content with name + result.
    // This parameter only takes effect when chat agent is openai.
    MODEL_COMPATIBLE_OPENAI = false;

    // -------------

    // -- 模式开关 --
    //
    // 使用流模式
    STREAM_MODE = true;
    // 安全模式
    SAFE_MODE = true;
    // 调试模式
    DEBUG_MODE = false;
    // 开发模式
    DEV_MODE = false;
    // 是否发送初始化消息
    SEND_INIT_MESSAGE = true;

    // QSTASH_URL
    QSTASH_URL = 'https://qstash.upstash.io';
    // QSTASH_TOKEN
    QSTASH_TOKEN = '';
    // QSTASH_PUBLISH_URL
    QSTASH_PUBLISH_URL = '';
    // QSTASH_TRIGGER_PREFIX
    QSTASH_TRIGGER_PREFIX = '';
    // QSTASH_TIMEOUT
    // free account max timeout 15m
    QSTASH_TIMEOUT = '5m';
}

// -- 通用配置 --
export class AgentShareConfig {
    // AI提供商: auto, openai, azure, workers, gemini, mistral
    AI_PROVIDER = 'auto';
    // AI图片提供商: auto, openai, azure, workers
    AI_IMAGE_PROVIDER = 'auto';
    // 全局默认初始化消息
    SYSTEM_INIT_MESSAGE: string | null = null;
    // 全局默认初始化消息角色
    SYSTEM_INIT_MESSAGE_ROLE = 'system';
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
    GOOGLE_COMPLETIONS_API = 'https://generativelanguage.googleapis.com/v1beta/models/';
    // Google Gemini Model
    GOOGLE_COMPLETIONS_MODEL = 'gemini-pro';
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
}

export class SiliconConfig {
    // Silicon api key
    SILICON_API_KEY: string | null = null;
    // Silicon api base
    SILICON_API_BASE = 'https://api.siliconflow.cn/v1';
    // Silicon api model
    SILICON_CHAT_MODEL = 'deepseek-ai/DeepSeek-V2.5';
    // Silicon image model
    SILICON_IMAGE_MODEL = 'black-forest-labs/FLUX.1-schnell';
    // Silicon image size
    SILICON_IMAGE_SIZE = '1024x1024';
    // Silicon extra params
    SILICON_EXTRA_PARAMS: Record<string, any> = {};
}

export class DefineKeys {
    DEFINE_KEYS: string[] = [];
}

export class ExtraUserConfig {
    MAPPING_KEY = '-p:SYSTEM_INIT_MESSAGE|-n:MAX_HISTORY_LENGTH|-a:AI_PROVIDER|-ai:AI_IMAGE_PROVIDER|-m:CHAT_MODEL|-md:CURRENT_MODE|-v:OPENAI_VISION_MODEL|-t:OPENAI_TTS_MODEL|-ex:OPENAI_API_EXTRA_PARAMS|-mk:MAPPING_KEY|-mv:MAPPING_VALUE|-asap:FUNCTION_REPLY_ASAP|-fm:FUNCTION_CALL_MODEL|-tool:USE_TOOLS|-oli:IMAGE_MODEL';
    // /set command mapping value, separated by |, : separates multiple relationships
    MAPPING_VALUE = '';
    // MAPPING_VALUE = "cson:claude-3-5-sonnet-20240620|haiku:claude-3-haiku-20240307|g4m:gpt-4o-mini|g4:gpt-4o|rp+:command-r-plus";
    // Whether to show model and time information in the message
    ENABLE_SHOWINFO = false;
    // Whether to show token information in the message (if any)
    ENABLE_SHOWTOKEN = false;
    // Function to use, currently has duckduckgo_search and jina_reader
    // '["duckduckgo_search", "jina_reader"]'
    USE_TOOLS: string[] = [];
    JINA_API_KEY = [];
    // openai format function call parameters
    FUNCTION_CALL_MODEL = 'gpt-4o-mini';
    FUNCTION_CALL_API_KEY = '';
    FUNCTION_CALL_BASE = '';
    // When the function call is not hit, enable this option to directly receive the reply from the FUNCTION_CALL model.
    FUNCTION_REPLY_ASAP = true;
    PROMPT: Record<string, string> = prompts_default;
    MODES: Record<string, FlowStruct> = {
        default: { text: {}, image: {}, audio: { workflow: [{ type: 'text' }, {}] } },
        dalle: {
            text: {
                disableHistory: true,
                disableTool: true,
                workflow: [{ agent: 'openai', model: 'gpt-4o-2024-08-06', prompt: 'dalle' }, { type: 'image' }],
            },
        },
        pk: {
            text: {
                // isParallel: true,
                disableHistory: false,
                disableTool: false,
                workflow: [{ model: 'gpt-4o-2024-08-06' }, { model: 'chatgpt-4o-latest' }],
            },
        },
    };

    CURRENT_MODE = 'default';

    // INLINE_AGENTS
    INLINE_AGENTS = ['oenai', 'claude', 'gemini', 'cohere', 'workersai'];
    // INLINE_IMAGE_AGENTS
    INLINE_IMAGE_AGENTS = ['openai', 'silicon'];
    // INLINE_CHAT_MODELS
    INLINE_CHAT_MODELS: string[] = ['gpt-4o-mini', 'gpt-4o-2024-05-13'];
    // INLINE_VISION_MODELS
    INLINE_VISION_MODELS: string[] = ['gpt-4o-mini', 'gpt-4o-2024-05-13'];
    // INLINE_IMAGE_MODELS
    INLINE_IMAGE_MODELS: string[] = ['dall-e-2', 'dall-e-3'];
    // INLINE_FUNCTION_CALL_TOOLS
    INLINE_FUNCTION_CALL_TOOLS: string[] = ['duckduckgo_search', 'jina_reader'];
    // INLINE_FUNCTION_ASAP
    INLINE_FUNCTION_ASAP: string[] = ['true', 'false'];
    // KlingAI Cookie
    KLINGAI_COOKIE: string[] = [];
    // KlingAI Image Count
    KLINGAI_IMAGE_COUNT = 4;
    // KlingAI Image Ratio
    KLINGAI_IMAGE_RATIO = '1:1';
}
