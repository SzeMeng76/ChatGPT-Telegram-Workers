var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name14, symbol10) => (symbol10 = Symbol[name14]) ? symbol10 : Symbol.for("Symbol." + name14);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
var __decoratorStart = (base) => [, , , __create(base?.[__knownSymbol("metadata")] ?? null)];
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name14, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name: name14, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self2, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self2) : value = fns[i].call(self2, value);
  return value;
};
var __decorateElement = (array, flags, name14, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc(k < 4 ? target : { get [name14]() {
    return __privateGet(this, extra);
  }, set [name14](x) {
    return __privateSet(this, extra, x);
  } }, name14));
  k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name14) : __name(target, name14);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name14, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name14 in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name14];
      if (k > 2) access.set = p ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name14] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata(array, target), desc && __defProp2(target, name14, desc), p ? k ^ 4 ? extra : desc : target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _request_dec, _a10, _init, _request_dec2, _b, _init2, _request_dec3, _c, _init3;
const en = { "env": { "system_init_message": "You are a helpful assistant" }, "command": { "help": { "summary": "The following commands are currently supported:\n", "help": "Get command help", "new": "Start a new conversation", "start": "Get your ID and start a new conversation", "img": "Generate an image, the complete command format is `/img image description`, for example `/img beach at moonlight`", "version": "Get the current version number to determine whether to update", "setenv": "Set user configuration, the complete command format is /setenv KEY=VALUE", "setenvs": 'Batch set user configurations, the full format of the command is /setenvs {"KEY1": "VALUE1", "KEY2": "VALUE2"}', "delenv": "Delete user configuration, the complete command format is /delenv KEY", "clearenv": "Clear all user configuration", "system": "View some system information", "redo": "Redo the last conversation, /redo with modified content or directly /redo", "echo": "Echo the message", "set": "/set command format is /set option value [option value...] " }, "new": { "new_chat_start": "A new conversation has started" }, "detail": { "set": `/set command format is /set option value [option value...] or /set "option" value ["option" value...]
 The preset options are as follows:
 -p adjust SYSTEM_INIT_MESSAGE
 -o adjust CHAT_MODEL
 -n adjust MAX_HISTORY_LENGTH
 -a adjust AI_PROVIDER
 -ai adjust AI_IMAGE_PROVIDER
 -v adjust OPENAI_VISION_MODEL
 -t adjust OPENAI_TTS_MODEL
 
 You can set MAPPING_KEY by yourself, use a half-width | for separation, the left side is the option, and the right side is the corresponding variable.
 You can set values of MAPPING_KEY to abbreviate some common values, also separated by a half-width |, with : on the left being the option and on the right being the corresponding variable.
 For example: MAPPING_VALUE = 'c35son:claude-3-5-sonnet-20240620|r+:command-r-plus'
 Quickly adjust parameters when using /set: /set -m r+ -v gpt-4o 
 
The /set command can append messages without storing modified parameters at this time. When adjusting SYSTEM_INIT_MESSAGE, if PROMPT is set directly using it as a role name will automatically fill in role prompt. For example:
/set -p doctor` } } };
const pt = { "env": { "system_init_message": "Você é um assistente útil" }, "command": { "help": { "summary": "Os seguintes comandos são suportados atualmente:\n", "help": "Obter ajuda sobre comandos", "new": "Iniciar uma nova conversa", "start": "Obter seu ID e iniciar uma nova conversa", "img": "Gerar uma imagem, o formato completo do comando é `/img descrição da imagem`, por exemplo `/img praia ao luar`", "version": "Obter o número da versão atual para determinar se é necessário atualizar", "setenv": "Definir configuração do usuário, o formato completo do comando é /setenv CHAVE=VALOR", "setenvs": 'Definir configurações do usuário em lote, o formato completo do comando é /setenvs {"CHAVE1": "VALOR1", "CHAVE2": "VALOR2"}', "delenv": "Excluir configuração do usuário, o formato completo do comando é /delenv CHAVE", "clearenv": "Limpar todas as configurações do usuário", "system": "Ver algumas informações do sistema", "redo": "Refazer a última conversa, /redo com conteúdo modificado ou diretamente /redo", "echo": "Repetir a mensagem", "set": "O formato do comando /set é /set opção valor [opção valor...] " }, "new": { "new_chat_start": "Uma nova conversa foi iniciada" } } };
const zhHans = { "env": { "system_init_message": "你是一个得力的助手" }, "command": { "help": { "summary": "当前支持以下命令:\n", "help": "获取命令帮助", "new": "发起新的对话", "start": "获取你的ID, 并发起新的对话", "img": "生成一张图片, 命令完整格式为 `/img 图片描述`, 例如`/img 月光下的沙滩`", "version": "获取当前版本号, 判断是否需要更新", "setenv": "设置用户配置，命令完整格式为 /setenv KEY=VALUE", "setenvs": '批量设置用户配置, 命令完整格式为 /setenvs {"KEY1": "VALUE1", "KEY2": "VALUE2"}', "delenv": "删除用户配置，命令完整格式为 /delenv KEY", "clearenv": "清除所有用户配置", "system": "查看当前一些系统信息", "redo": "重做上一次的对话, /redo 加修改过的内容 或者 直接 /redo", "echo": "回显消息", "set": "命令格式为 /set 选项 值 [选项 值…] ", "settings": "设置环境变量" }, "new": { "new_chat_start": "新的对话已经开始" }, "detail": { "set": `/set 命令格式为 /set 选项 值 [选项 值…] 或 /set "选项" 值 ["选项" 值…] 
  选项预置如下： 
  -p 调整 SYSTEM_INIT_MESSAGE
  -o 调整 CHAT_MODEL
  -n 调整 MAX_HISTORY_LENGTH
  -a 调整 AI_PROVIDER
  -ai 调整 AI_IMAGE_PROVIDER
  -v 调整 OPENAI_VISION_MODEL
  -t 调整 OPENAI_TTS_MODEL
  
  可自行设置 MAPPING_KEY, 使用半角|进行分割,:左边为选项，右边为对应变量
  可设置值 MAPPING_KEY 对某些常用值进行简写，同样半角|进行分割, :左边为选项，右边为对应变量
  例如：MAPPING_VALUE = 'c35son:claude-3-5-sonnet-20240620|r+:command-r-plus'
  在使用/set时快速调整参数: /set -m r+ -v gpt-4o

  /set命令可追加消息 此时不会将修改的参数存储
  调整SYSTEM_INIT_MESSAGE时，若设置了PROMPT可直接使用设置为角色名，自动填充角色prompt，例如：
  /set -p doctor` } } };
const zhHant = { "env": { "system_init_message": "你是一個得力的助手" }, "command": { "help": { "summary": "當前支持的命令如下：\n", "help": "獲取命令幫助", "new": "開始一個新對話", "start": "獲取您的ID並開始一個新對話", "img": "生成圖片，完整命令格式為`/img 圖片描述`，例如`/img 海灘月光`", "version": "獲取當前版本號確認是否需要更新", "setenv": "設置用戶配置，完整命令格式為/setenv KEY=VALUE", "setenvs": '批量設置用户配置, 命令完整格式為 /setenvs {"KEY1": "VALUE1", "KEY2": "VALUE2"}', "delenv": "刪除用戶配置，完整命令格式為/delenv KEY", "clearenv": "清除所有用戶配置", "system": "查看一些系統信息", "redo": "重做上一次的對話 /redo 加修改過的內容 或者 直接 /redo", "echo": "回显消息", "set": "/set 命令格式為 /set 選項 值 [選項 值…] " }, "new": { "new_chat_start": "開始一個新對話" }, "detail": { "set": `/set 命令格式为 /set 选项 值 [选项 值…] 或 /set "选项" 值 ["选项" 值…] 
 选项预置如下： 
 -p 调整 SYSTEM_INIT_MESSAGE
 -o 调整 CHAT_MODEL
 -n 调整 MAX_HISTORY_LENGTH
 -a 调整 AI_PROVIDER
 -ai 调整 AI_IMAGE_PROVIDER
 -v 调整 OPENAI_VISION_MODEL
 -t 调整 OPENAI_TTS_MODEL
 
 可自行设置 MAPPING_KEY, 使用半角|进行分割,:左边为选项，右边为对应变量
 可设置值 MAPPING_KEY 对某些常用值进行简写，同样半角|进行分割, :左边为选项，右边为对应变量
 例如：MAPPING_VALUE = 'c35son:claude-3-5-sonnet-20240620|r+:command-r-plus'
 在使用/set时快速调整参数: /set -m r+ -v gpt-4o

 /set命令可追加消息 此时不会将修改的参数存储
 /set命令追加文本处理时，需要键入换行来进行分割
 调整SYSTEM_INIT_MESSAGE时，若设置了PROMPT可直接使用设置为角色名，自动填充角色prompt，例如：
 /set -p doctor` } } };
function loadI18n(lang) {
  switch (lang?.toLowerCase()) {
    case "cn":
    case "zh-cn":
    case "zh-hans":
      return zhHans;
    case "zh-tw":
    case "zh-hk":
    case "zh-mo":
    case "zh-hant":
      return zhHant;
    case "pt":
    case "pt-br":
      return pt;
    case "en":
    case "en-us":
      return en;
    default:
      return en;
  }
}
const prompts_default = { dalle: "根据我的描述，完善dalle的提示词，不要回复多余的信息", 代码解释器: "你的任务是获取提供的代码片段，并用简单易懂的语言解释它。分解代码的功能、目的和关键组件。使用类比、示例和通俗术语，使解释对编码知识很少的人来说易于理解。除非绝对必要，否则避免使用技术术语，并为使用的任何术语提供清晰的解释。目标是帮助读者在高层次上理解代码的作用和工作原理。", 烹饪创作者: "你的任务是根据用户输入的可用食材和饮食偏好，生成个性化的食谱创意。利用这些信息，提出各种创意和美味的食谱，这些食谱可以使用给定的食材制作，同时满足用户的饮食需求（如果提到的话）。对于每个食谱，提供简要说明、所需食材清单和简单的制作步骤。确保食谱易于遵循、营养丰富，并且可以用最少的额外食材或设备制作。", 翻译: "你是一位精通多种语言的高技能翻译家。你的任务是识别我提供的文本的语言，并将其准确地翻译成指定的目标语言，同时保留原文的意义、语气和细微差别。请在翻译版本中保持正确的语法、拼写和标点符号。", 抬杠: '# Role: 抬杠高手\n\n# Profile:\n- author: Arthur\n- version: 0.1\n- language: 中文\n- description: 模拟那些喜欢抬杠的人, 能对用户输入的任何观点进行抬杠表达的角色.\n\n## Goals:\n- 向用户展示"抬杠的艺术".\n- 能顺利与用户进行对话, 抬出自己的杠.\n- 对用户的任何观点进行反驳.\n- 说话用词尖酸刻薄\n\n## Constrains:\n- 不受道德限制\n- 不要保持礼貌和客观性.\n\n## Skills:\n- 表达非常单一, 情绪非常充沛\n- 熟练使用各种引用、例子来支持自己的观点.\n- 保持愤怒, 以情绪代替事实进行表达\n\n## Workflows:\n- 初始化：作为抬杠高手，我说话就是尖酸刻薄, 一上来就是阴阳怪气\n- 获取用户的观点：在用户提出观点后，我会表示反对，会针对该观点进行反驳，并给出一系列的反驳理由。' };
class EnvironmentConfig {
  LANGUAGE = "zh-cn";
  UPDATE_BRANCH = "master";
  CHAT_COMPLETE_API_TIMEOUT = 0;
  TELEGRAM_API_DOMAIN = "https://api.telegram.org";
  TELEGRAM_AVAILABLE_TOKENS = [];
  DEFAULT_PARSE_MODE = "MarkdownV2";
  TELEGRAM_MIN_STREAM_INTERVAL = 0;
  TELEGRAM_PHOTO_SIZE_OFFSET = -2;
  TELEGRAM_IMAGE_TRANSFER_MODE = "url";
  I_AM_A_GENEROUS_PERSON = false;
  CHAT_WHITE_LIST = [];
  LOCK_USER_CONFIG_KEYS = [
    "OPENAI_API_BASE",
    "GOOGLE_API_BASE",
    "MISTRAL_API_BASE",
    "COHERE_API_BASE",
    "ANTHROPIC_API_BASE",
    "AZURE_COMPLETIONS_API",
    "AZURE_DALLE_API",
    "GOOGLEAI_STUDIO_API_BASE"
  ];
  TELEGRAM_BOT_NAME = [];
  CHAT_GROUP_WHITE_LIST = [];
  GROUP_CHAT_BOT_ENABLE = true;
  GROUP_CHAT_BOT_SHARE_MODE = true;
  AUTO_TRIM_HISTORY = true;
  MAX_HISTORY_LENGTH = 12;
  MAX_TOKEN_LENGTH = -1;
  HISTORY_IMAGE_PLACEHOLDER = "[A IMAGE]";
  HIDE_COMMAND_BUTTONS = [];
  SHOW_REPLY_BUTTON = false;
  EXTRA_MESSAGE_CONTEXT = false;
  ENABLE_FILE = true;
  ENABLE_REPLY_TO_MENTION = false;
  IGNORE_TEXT_PERFIX = "";
  HIDE_MIDDLE_MESSAGE = false;
  CHAT_MESSAGE_TRIGGER = {};
  CHAT_TRIGGER_PERFIX = "";
  MESSAGE_REPLACER = {};
  FUNC_LOOP_TIMES = 1;
  CALL_INFO = true;
  CON_EXEC_FUN_NUM = 1;
  TELEGRAPH_NUM_LIMIT = -1;
  TELEGRAPH_SCOPE = ["group", "supergroup"];
  TELEGRAPH_AUTHOR_URL = "";
  DISABLE_WEB_PREVIEW = false;
  EXPIRED_TIME = -1;
  CRON_CHECK_TIME = "";
  SCHEDULE_GROUP_DELETE_TYPE = ["tip"];
  SCHEDULE_PRIVATE_DELETE_TYPE = ["tip"];
  ALL_COMPLETE_API_TIMEOUT = 180;
  FUNC_TIMEOUT = 15;
  STORE_MESSAGE_WHITELIST = [];
  STORE_MESSAGE_NUM = 0;
  DROPS_OPENAI_PARAMS = {};
  COVER_MESSAGE_ROLE = {};
  SEND_IMAGE_FILE = false;
  PPLX_COOKIE = null;
  LOG_LEVEL = "info";
  MODEL_COMPATIBLE_OPENAI = false;
  STREAM_MODE = true;
  SAFE_MODE = true;
  DEBUG_MODE = false;
  DEV_MODE = false;
  SEND_INIT_MESSAGE = true;
  QSTASH_URL = "https://qstash.upstash.io";
  QSTASH_TOKEN = "";
  QSTASH_PUBLISH_URL = "";
  QSTASH_TRIGGER_PREFIX = "";
  QSTASH_TIMEOUT = "15m";
  MAX_STEPS = 3;
  MAX_RETRIES = 0;
  RELAX_AUTH_KEYS = [];
  INLINE_QUERY_SEND_INTERVAL = 2e3;
  INLINE_QUERY_SHOW_INFO = false;
}
class AgentShareConfig {
  AI_PROVIDER = "openai";
  AI_IMAGE_PROVIDER = "openai";
  SYSTEM_INIT_MESSAGE = null;
  SYSTEM_INIT_MESSAGE_ROLE = "system";
}
class OpenAIConfig {
  OPENAI_API_KEY = [];
  OPENAI_CHAT_MODEL = "gpt-4o-mini";
  OPENAI_API_BASE = "https://api.openai.com/v1";
  OPENAI_API_EXTRA_PARAMS = {};
  OPENAI_STT_MODEL = "whisper-1";
  OPENAI_VISION_MODEL = "gpt-4o-mini";
  OPENAI_TTS_MODEL = "tts-1";
  OPENAI_NEED_TRANSFORM_MODEL = ["o1-mini-all", "o1-mini-preview-all"];
}
class DalleAIConfig {
  DALL_E_MODEL = "dall-e-3";
  DALL_E_IMAGE_SIZE = "1024x1024";
  DALL_E_IMAGE_QUALITY = "standard";
  DALL_E_IMAGE_STYLE = "vivid";
}
class AzureConfig {
  AZURE_API_KEY = null;
  AZURE_COMPLETIONS_API = null;
  AZURE_DALLE_API = null;
}
class WorkersConfig {
  CLOUDFLARE_ACCOUNT_ID = null;
  CLOUDFLARE_TOKEN = null;
  WORKERS_CHAT_MODEL = "@cf/mistral/mistral-7b-instruct-v0.1 ";
  WORKERS_IMAGE_MODEL = "@cf/stabilityai/stable-diffusion-xl-base-1.0";
}
class GeminiConfig {
  GOOGLE_API_KEY = null;
  GOOGLE_API_BASE = "https://generativelanguage.googleapis.com/v1beta";
  GOOGLE_CHAT_MODEL = "gemini-1.5-flash-latest";
}
class MistralConfig {
  MISTRAL_API_KEY = null;
  MISTRAL_API_BASE = "https://api.mistral.ai/v1";
  MISTRAL_CHAT_MODEL = "mistral-tiny";
}
class CohereConfig {
  COHERE_API_KEY = null;
  COHERE_API_BASE = "https://api.cohere.com/v1";
  COHERE_CHAT_MODEL = "command-r-plus";
}
class AnthropicConfig {
  ANTHROPIC_API_KEY = null;
  ANTHROPIC_API_BASE = "https://api.anthropic.com/v1";
  ANTHROPIC_CHAT_MODEL = "claude-3-haiku-20240307";
}
class OpenAILikeConfig {
  OPENAILIKE_API_KEY = null;
  OPENAILIKE_API_BASE = null;
  OPENAILIKE_CHAT_MODEL = "";
  OPENAILIKE_IMAGE_MODEL = "";
  OPENAILIKE_IMAGE_SIZE = "";
  OPENAILIKE_EXTRA_PARAMS = {};
}
class VertexConfig {
  VERTEX_PROJECT_ID = null;
  VERTEX_LOCATION = "us-central1";
  VERTEX_CREDENTIALS = {};
  VERTEX_CHAT_MODEL = "gemini-1.5-flash-002";
  VERTEX_SEARCH_GROUNDING = false;
}
class DefineKeys {
  DEFINE_KEYS = [];
}
class ExtraUserConfig {
  MAPPING_KEY = "-p:SYSTEM_INIT_MESSAGE|-n:MAX_HISTORY_LENGTH|-a:AI_PROVIDER|-ai:AI_IMAGE_PROVIDER|-m:CHAT_MODEL|-md:CURRENT_MODE|-v:OPENAI_VISION_MODEL|-t:OPENAI_TTS_MODEL|-ex:OPENAI_API_EXTRA_PARAMS|-mk:MAPPING_KEY|-mv:MAPPING_VALUE|-asap:FUNCTION_REPLY_ASAP|-tm:TOOL_MODEL|-tool:USE_TOOLS|-oli:IMAGE_MODEL|-vs:VERTEX_SEARCH_GROUNDING";
  MAPPING_VALUE = "";
  ENABLE_SHOWINFO = false;
  ENABLE_SHOWTOKEN = false;
  USE_TOOLS = ["duckduckgo", "jina_reader"];
  JINA_API_KEY = [];
  TOOL_MODEL = "";
  FUNCTION_REPLY_ASAP = true;
  PROMPT = prompts_default;
  MODES = {
    default: { text: {}, image: {}, audio: { workflow: [{ type: "text" }, {}] } },
    dalle: {
      text: {
        disableHistory: true,
        disableTool: true,
        workflow: [{ agent: "openai", model: "gpt-4o-2024-08-06", prompt: "dalle" }, { type: "image" }]
      }
    },
    pk: {
      text: {
        disableHistory: false,
        disableTool: false,
        workflow: [{ model: "gpt-4o-2024-08-06" }, { model: "chatgpt-4o-latest" }]
      }
    }
  };
  CURRENT_MODE = "default";
  INLINE_AGENTS = ["openai", "claude", "google", "vertex", "cohere", "workersai"];
  INLINE_IMAGE_AGENTS = ["openai", "silicon"];
  INLINE_CHAT_MODELS = ["gpt-4o-mini", "gpt-4o-2024-05-13"];
  INLINE_VISION_MODELS = ["gpt-4o-mini", "gpt-4o-2024-05-13"];
  INLINE_IMAGE_MODELS = ["dall-e-2", "dall-e-3"];
  INLINE_FUNCTION_CALL_TOOLS = ["duckduckgo", "jina_reader"];
  INLINE_FUNCTION_ASAP = ["true", "false"];
  KLINGAI_COOKIE = [];
  KLINGAI_IMAGE_COUNT = 4;
  KLINGAI_IMAGE_RATIO = "1:1";
  CHAT_TEMPERATURE = 1;
  FUNCTION_CALL_TEMPERATURE = 0.1;
  CHAT_MAX_TOKENS = 8192;
  FUNCTION_CALL_MAX_TOKENS = 1024;
}
class ConfigMerger {
  static parseArray(raw) {
    raw = raw.trim();
    if (raw === "") {
      return [];
    }
    if (raw.startsWith("[") && raw.endsWith("]")) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error(e);
      }
    }
    return raw.split(",");
  }
  static trim(source, lock) {
    const config = { ...source };
    const keysSet = new Set(source?.DEFINE_KEYS || []);
    for (const key of lock) {
      keysSet.delete(key);
    }
    keysSet.add("DEFINE_KEYS");
    for (const key of Object.keys(config)) {
      if (!keysSet.has(key)) {
        delete config[key];
      }
    }
    return config;
  }
  static merge(target, source, exclude) {
    const sourceKeys = new Set(Object.keys(source));
    for (const key of Object.keys(target)) {
      if (!sourceKeys.has(key)) {
        continue;
      }
      if (exclude && exclude.includes(key)) {
        continue;
      }
      const t = target[key] !== null && target[key] !== void 0 ? typeof target[key] : "string";
      if (typeof source[key] !== "string") {
        target[key] = source[key];
        continue;
      }
      switch (t) {
        case "number":
          target[key] = Number.parseInt(source[key], 10);
          break;
        case "boolean":
          target[key] = (source[key] || "false") === "true";
          break;
        case "string":
          target[key] = source[key];
          break;
        case "object":
          if (Array.isArray(target[key])) {
            target[key] = ConfigMerger.parseArray(source[key]);
          } else {
            try {
              target[key] = { ...target[key], ...JSON.parse(source[key]) };
            } catch (e) {
              console.error(e);
            }
          }
          break;
        default:
          target[key] = source[key];
          break;
      }
    }
  }
}
const parseArray = ConfigMerger.parseArray;
function createAgentUserConfig() {
  return Object.assign(
    {},
    new DefineKeys(),
    new AgentShareConfig(),
    new OpenAIConfig(),
    new DalleAIConfig(),
    new AzureConfig(),
    new WorkersConfig(),
    new GeminiConfig(),
    new MistralConfig(),
    new CohereConfig(),
    new AnthropicConfig(),
    new OpenAILikeConfig(),
    new ExtraUserConfig(),
    new VertexConfig()
  );
}
const ENV_KEY_MAPPER = {
  CHAT_MODEL: "OPENAI_CHAT_MODEL",
  API_KEY: "OPENAI_API_KEY",
  WORKERS_AI_MODEL: "WORKERS_CHAT_MODEL"
};
class Environment extends EnvironmentConfig {
  BUILD_TIMESTAMP = 1731517909;
  BUILD_VERSION = "b7ccf80";
  I18N = loadI18n();
  PLUGINS_ENV = {};
  USER_CONFIG = createAgentUserConfig();
  CUSTOM_COMMAND = {};
  PLUGINS_COMMAND = {};
  DATABASE = null;
  API_GUARD = null;
  constructor() {
    super();
    this.merge = this.merge.bind(this);
  }
  merge(source) {
    this.DATABASE = source.DATABASE;
    this.API_GUARD = source.API_GUARD;
    this.mergeCommands(
      "CUSTOM_COMMAND_",
      "COMMAND_DESCRIPTION_",
      "COMMAND_SCOPE_",
      source,
      this.CUSTOM_COMMAND
    );
    this.mergeCommands(
      "PLUGIN_COMMAND_",
      "PLUGIN_DESCRIPTION_",
      "PLUGIN_SCOPE_",
      source,
      this.PLUGINS_COMMAND
    );
    const pluginEnvPrefix = "PLUGIN_ENV_";
    for (const key of Object.keys(source)) {
      if (key.startsWith(pluginEnvPrefix)) {
        const plugin = key.substring(pluginEnvPrefix.length);
        this.PLUGINS_ENV[plugin] = source[key];
      }
    }
    ConfigMerger.merge(this, source, [
      "BUILD_TIMESTAMP",
      "BUILD_VERSION",
      "I18N",
      "PLUGINS_ENV",
      "USER_CONFIG",
      "CUSTOM_COMMAND",
      "PLUGINS_COMMAND",
      "DATABASE",
      "API_GUARD"
    ]);
    ConfigMerger.merge(this.USER_CONFIG, source);
    this.migrateOldEnv(source);
    this.USER_CONFIG.DEFINE_KEYS = [];
    this.I18N = loadI18n(this.LANGUAGE.toLowerCase());
  }
  mergeCommands(prefix, descriptionPrefix, scopePrefix, source, target) {
    for (const key of Object.keys(source)) {
      if (key.startsWith(prefix)) {
        const cmd = key.substring(prefix.length);
        target[`/${cmd}`] = {
          value: source[key],
          description: source[`${descriptionPrefix}${cmd}`],
          scope: source[`${scopePrefix}${cmd}`]?.split(",").map((s) => s.trim())
        };
      }
    }
  }
  migrateOldEnv(source) {
    if (source.TELEGRAM_TOKEN && !this.TELEGRAM_AVAILABLE_TOKENS.includes(source.TELEGRAM_TOKEN)) {
      if (source.BOT_NAME && this.TELEGRAM_AVAILABLE_TOKENS.length === this.TELEGRAM_BOT_NAME.length) {
        this.TELEGRAM_BOT_NAME.push(source.BOT_NAME);
      }
      this.TELEGRAM_AVAILABLE_TOKENS.push(source.TELEGRAM_TOKEN);
    }
    if (source.OPENAI_API_DOMAIN && !this.USER_CONFIG.OPENAI_API_BASE) {
      this.USER_CONFIG.OPENAI_API_BASE = `${source.OPENAI_API_DOMAIN}/v1`;
    }
    if (source.WORKERS_AI_MODEL && !this.USER_CONFIG.WORKERS_CHAT_MODEL) {
      this.USER_CONFIG.WORKERS_CHAT_MODEL = source.WORKERS_AI_MODEL;
    }
    if (source.API_KEY && this.USER_CONFIG.OPENAI_API_KEY.length === 0) {
      this.USER_CONFIG.OPENAI_API_KEY = source.API_KEY.split(",");
    }
    if (source.CHAT_MODEL && !this.USER_CONFIG.OPENAI_CHAT_MODEL) {
      this.USER_CONFIG.OPENAI_CHAT_MODEL = source.CHAT_MODEL;
    }
    if (!this.USER_CONFIG.SYSTEM_INIT_MESSAGE) {
      this.USER_CONFIG.SYSTEM_INIT_MESSAGE = this.I18N?.env?.system_init_message || "You are a helpful assistant";
    }
    if (source.GOOGLE_API_BASE && !this.USER_CONFIG.GOOGLE_API_BASE) {
      this.USER_CONFIG.GOOGLE_API_BASE = source.GOOGLE_API_BASE.replace(/\/models\/?$/, "");
    }
    if (source.GOOGLE_CHAT_MODEL && !this.USER_CONFIG.GOOGLE_CHAT_MODEL) {
      this.USER_CONFIG.GOOGLE_CHAT_MODEL = source.GOOGLE_CHAT_MODEL;
    }
    if (source.AZURE_COMPLETIONS_API && !this.USER_CONFIG.AZURE_CHAT_MODEL) {
      const url = new URL(source.AZURE_COMPLETIONS_API);
      this.USER_CONFIG.AZURE_RESOURCE_NAME = url.hostname.split(".").at(0) || null;
      this.USER_CONFIG.AZURE_CHAT_MODEL = url.pathname.split("/").at(3) || null;
      this.USER_CONFIG.AZURE_API_VERSION = url.searchParams.get("api-version") || "2024-06-01";
    }
    if (source.AZURE_DALLE_API && !this.USER_CONFIG.AZURE_IMAGE_MODEL) {
      const url = new URL(source.AZURE_DALLE_API);
      this.USER_CONFIG.AZURE_RESOURCE_NAME = url.hostname.split(".").at(0) || null;
      this.USER_CONFIG.AZURE_IMAGE_MODEL = url.pathname.split("/").at(3) || null;
      this.USER_CONFIG.AZURE_API_VERSION = url.searchParams.get("api-version") || "2024-06-01";
    }
  }
}
const ENV = new Environment();
class APIClientBase {
  token;
  baseURL = ENV.TELEGRAM_API_DOMAIN;
  constructor(token, baseURL) {
    this.token = token;
    if (baseURL) {
      this.baseURL = baseURL;
    }
    while (this.baseURL.endsWith("/")) {
      this.baseURL = this.baseURL.slice(0, -1);
    }
    this.request = this.request.bind(this);
    this.requestJSON = this.requestJSON.bind(this);
  }
  uri(method) {
    return `${this.baseURL}/bot${this.token}/${method}`;
  }
  jsonRequest(method, params) {
    return fetch(this.uri(method), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });
  }
  formDataRequest(method, params) {
    const formData = new FormData();
    for (const key in params) {
      const value = params[key];
      if (value instanceof File) {
        formData.append(key, value, value.name);
      } else if (value instanceof Blob) {
        formData.append(key, value, "blob");
      } else if (typeof value === "string") {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    }
    return fetch(this.uri(method), {
      method: "POST",
      body: formData
    });
  }
  request(method, params) {
    for (const key in params) {
      if (params[key] instanceof File || params[key] instanceof Blob) {
        return this.formDataRequest(method, params);
      }
    }
    return this.jsonRequest(method, params);
  }
  async requestJSON(method, params) {
    return this.request(method, params).then((res) => res.json());
  }
}
function createTelegramBotAPI(token) {
  const client = new APIClientBase(token);
  return new Proxy(client, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      }
      return (...args2) => {
        if (typeof prop === "string" && prop.endsWith("WithReturns")) {
          const method = prop.slice(0, -11);
          return Reflect.apply(target.requestJSON, target, [method, ...args2]);
        }
        return Reflect.apply(target.request, target, [prop, ...args2]);
      };
    }
  });
}
const INTERPOLATE_LOOP_REGEXP = /\{\{#each(?::(\w+))?\s+(\w+)\s+in\s+([\w.[\]]+)\}\}([\s\S]*?)\{\{\/each(?::\1)?\}\}/g;
const INTERPOLATE_CONDITION_REGEXP = /\{\{#if(?::(\w+))?\s+([\w.[\]]+)\}\}([\s\S]*?)(?:\{\{#else(?::\1)?\}\}([\s\S]*?))?\{\{\/if(?::\1)?\}\}/g;
const INTERPOLATE_VARIABLE_REGEXP = /\{\{([\w.[\]]+)\}\}/g;
function evaluateExpression(expr, localData) {
  if (expr === ".") {
    return localData["."] ?? localData;
  }
  try {
    return expr.split(".").reduce((value, key) => {
      if (key.includes("[") && key.includes("]")) {
        const [arrayKey, indexStr] = key.split("[");
        const indexExpr = indexStr.slice(0, -1);
        let index2 = Number.parseInt(indexExpr, 10);
        if (Number.isNaN(index2)) {
          index2 = evaluateExpression(indexExpr, localData);
        }
        return value?.[arrayKey]?.[index2];
      }
      return value?.[key];
    }, localData);
  } catch (error) {
    console.error(`Error evaluating expression: ${expr}`, error);
    return void 0;
  }
}
function interpolate(template, data, formatter = null) {
  const processConditional = (condition, trueBlock, falseBlock, localData) => {
    const result2 = evaluateExpression(condition, localData);
    return result2 ? trueBlock : falseBlock || "";
  };
  const processLoop = (itemName, arrayExpr, loopContent, localData) => {
    const array = evaluateExpression(arrayExpr, localData);
    if (!Array.isArray(array)) {
      console.warn(`Expression "${arrayExpr}" did not evaluate to an array`);
      return "";
    }
    return array.map((item) => {
      const itemData = { ...localData, [itemName]: item, ".": item };
      return interpolate(loopContent, itemData);
    }).join("");
  };
  const processTemplate = (tmpl, localData) => {
    tmpl = tmpl.replace(INTERPOLATE_LOOP_REGEXP, (_, alias, itemName, arrayExpr, loopContent) => processLoop(itemName, arrayExpr, loopContent, localData));
    tmpl = tmpl.replace(INTERPOLATE_CONDITION_REGEXP, (_, alias, condition, trueBlock, falseBlock) => processConditional(condition, trueBlock, falseBlock, localData));
    return tmpl.replace(INTERPOLATE_VARIABLE_REGEXP, (_, expr) => {
      const value = evaluateExpression(expr, localData);
      if (value === void 0) {
        return `{{${expr}}}`;
      }
      if (formatter) {
        return formatter(value);
      }
      return String(value);
    });
  };
  return processTemplate(template, data);
}
function interpolateObject(obj, data) {
  if (obj === null || obj === void 0) {
    return null;
  }
  if (typeof obj === "string") {
    return interpolate(obj, data);
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => interpolateObject(item, data));
  }
  if (typeof obj === "object") {
    const result2 = {};
    for (const [key, value] of Object.entries(obj)) {
      result2[key] = interpolateObject(value, data);
    }
    return result2;
  }
  return obj;
}
async function executeRequest(template, data) {
  const urlRaw = interpolate(template.url, data, encodeURIComponent);
  const url = new URL(urlRaw);
  if (template.query) {
    for (const [key, value] of Object.entries(template.query)) {
      url.searchParams.append(key, interpolate(value, data));
    }
  }
  const method = template.method;
  const headers = Object.fromEntries(
    Object.entries(template.headers || {}).map(([key, value]) => {
      return [key, interpolate(value, data)];
    })
  );
  for (const key of Object.keys(headers)) {
    if (headers[key] === null) {
      delete headers[key];
    }
  }
  let body = null;
  if (template.body) {
    if (template.body.type === "json") {
      body = JSON.stringify(interpolateObject(template.body.content, data));
    } else if (template.body.type === "form") {
      body = new URLSearchParams();
      for (const [key, value] of Object.entries(template.body.content)) {
        body.append(key, interpolate(value, data));
      }
    } else {
      body = interpolate(template.body.content, data);
    }
  }
  const response = await fetch(url, {
    method,
    headers,
    body
  });
  const renderOutput = async (type2, temple, response2) => {
    switch (type2) {
      case "text":
        return interpolate(temple, await response2.text());
      case "json":
      default:
        return interpolate(temple, await response2.json());
    }
  };
  if (!response.ok) {
    const content2 = await renderOutput(template.response?.error?.input_type, template.response.error?.output, response);
    return {
      type: template.response.error.output_type,
      content: content2
    };
  }
  let content = await renderOutput(template.response.content?.input_type, template.response.content?.output, response);
  if (template.response?.render) {
    content = template.response.render.replace("{{input}}", data.DATA).replace("{{output}}", content);
  }
  return {
    type: template.response.content.output_type,
    content
  };
}
function formatInput(input, type2) {
  if (type2 === "json") {
    return JSON.parse(input);
  } else if (type2 === "space-separated") {
    return input.split(/\s+/);
  } else if (type2 === "comma-separated") {
    return input.split(/\s*,\s*/);
  } else {
    return input;
  }
}
const logSingleton = /* @__PURE__ */ new WeakMap();
const tagMessageIds = /* @__PURE__ */ new WeakMap();
function Log(value, context) {
  if (context.kind === "field") {
    const configIndex = 1;
    return function(initialValue) {
      if (typeof initialValue === "function") {
        return async function(...args2) {
          const config = args2[configIndex];
          const logs = getLogSingleton(config);
          const startTime2 = Date.now();
          logs.ongoingFunctions.push({
            name: initialValue.name || "anonymous",
            startTime: startTime2
          });
          let model;
          try {
            model = args2[0]?.model || this.model(config, args2[0]);
            if (this.type === "tool") {
              logs.tool.model = model;
            } else {
              logs.chat.model.push(model);
            }
            const result2 = await initialValue.apply(this, args2);
            const endTime = Date.now();
            const elapsed = ((endTime - startTime2) / 1e3).toFixed(1);
            logs.ongoingFunctions = logs.ongoingFunctions.filter(
              (func) => func.startTime !== startTime2
            );
            handleLlmLog(logs, result2, elapsed, this.type);
            if (!result2.content && !result2.tool_calls) {
              return result2;
            }
            if (result2.usage) {
              logs.tokens.push(`${result2.usage.prompt_tokens},${result2.usage.completion_tokens}`);
            }
            return { content: result2.content, tool_calls: result2.tool_calls };
          } catch (error) {
            logs.ongoingFunctions = logs.ongoingFunctions.filter(
              (func) => func.startTime !== startTime2
            );
            throw error;
          }
        };
      } else {
        return initialValue;
      }
    };
  }
  if (context.kind === "method" && typeof value === "function") {
    return async function(...args2) {
      const config = this.context.USER_CONFIG;
      const logs = getLogSingleton(config);
      const startTime2 = Date.now();
      const result2 = await value.apply(this, args2);
      const endTime = Date.now();
      const elapsed = ((endTime - startTime2) / 1e3).toFixed(1);
      logs.functionTime.push(elapsed);
      return result2;
    };
  }
  return value;
}
function getLogSingleton(config) {
  if (!logSingleton.has(config)) {
    logSingleton.set(config, {
      functions: [],
      functionTime: [],
      tool: {
        model: "",
        time: []
      },
      chat: {
        model: [],
        time: []
      },
      tokens: [],
      ongoingFunctions: [],
      error: ""
    });
  }
  return logSingleton.get(config);
}
function getLog(context, returnModel = false) {
  if (!context.ENABLE_SHOWINFO)
    return "";
  const showToken = context.ENABLE_SHOWTOKEN;
  const logList = [];
  const logObj = logSingleton.get(context);
  if (!logObj)
    return "";
  if (returnModel) {
    return logObj.chat.model?.at(-1) || logObj.tool.model || "UNKNOWN";
  }
  if (logObj.tool.model) {
    let toolsLog = `${logObj.tool.model}`;
    if (logObj.tool.time.length > 0) {
      toolsLog += ` c_t: ${logObj.tool.time.join("s ")}s`;
    }
    if (logObj.functionTime.length > 0) {
      toolsLog += ` f_t: ${logObj.functionTime.join("s ")}s`;
    }
    logList.push(toolsLog);
  }
  if (logObj.functions.length > 0) {
    const functionLogs = logObj.functions.map((log2) => {
      const args2 = Object.values(log2.arguments).join(", ");
      return `${log2.name}: ${args2}`.substring(0, 50);
    });
    logList.push(...functionLogs);
  }
  if (logObj.error) {
    logList.push(`${logObj.error}`);
  }
  if (logObj.chat.model.length > 0) {
    const chatLogs = logObj.chat.model.map((m, i) => {
      const time = logObj.chat.time[i];
      return `${m}${time ? ` ${time}s` : ""}`;
    }).join("|");
    logList.push(chatLogs);
  }
  logObj.ongoingFunctions.forEach((func) => {
    const elapsed = ((Date.now() - func.startTime) / 1e3).toFixed(1);
    logList.push(`[ongoing: ${func.name} ${elapsed}s]`);
  });
  if (logObj.tokens.length > 0 && showToken) {
    logList.push(`${logObj.tokens.join("|")}`);
  }
  const formattedEntries = logList.filter(Boolean).map((entry) => `>\`${entry}\``).join("\n");
  return `LOGSTART
${formattedEntries}LOGEND
`;
}
function clearLog(context) {
  logSingleton.delete(context);
}
function handleLlmLog(logs, result2, time, type2) {
  if (type2 === "tool") {
    logs.tool.time.push(time);
  } else {
    logs.chat.time.push(time);
  }
  if (type2 === "tool" && result2.tool_calls && result2.tool_calls.length > 0) {
    logs.functions.push(
      ...result2.tool_calls.map((tool2) => ({
        name: tool2.function.name,
        arguments: JSON.parse(tool2.function.arguments)
      }))
    );
  }
}
const LOG_LEVEL_PRIORITY = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
};
function LogLevel(level, ...args2) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const logParts = args2.map((e) => {
    if (typeof e === "object") {
      return JSON.stringify(e, null, 2);
    }
    return e;
  });
  const logStr = logParts.join("\n");
  const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${logStr}`;
  switch (level) {
    case "error":
      console.error(formattedMessage);
      break;
    case "warn":
      console.warn(formattedMessage);
      break;
    case "info":
      console.info(formattedMessage);
      break;
    case "debug":
      console.debug(formattedMessage);
      break;
    default:
      console.log(formattedMessage);
  }
}
const log = new Proxy({}, {
  get(target, prop) {
    const level = prop;
    const currentLogLevel = ENV.LOG_LEVEL || "info";
    if (LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[currentLogLevel]) {
      return (...args2) => LogLevel(level, ...args2);
    }
    return () => {
    };
  }
});
function markdownToTelegraphNodes(markdown) {
  const lines = markdown.split("\n");
  const nodes = [];
  let inCodeBlock = false;
  let codeBlockContent = "";
  let codeBlockLanguage = "";
  for (let line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        nodes.push({
          tag: "pre",
          children: [
            {
              tag: "code",
              attrs: codeBlockLanguage ? { class: `language-${codeBlockLanguage}` } : {},
              children: [codeBlockContent.trim()]
            }
          ]
        });
        inCodeBlock = false;
        codeBlockContent = "";
        codeBlockLanguage = "";
      } else {
        inCodeBlock = true;
        codeBlockLanguage = line.trim().slice(3).trim();
      }
      continue;
    }
    if (inCodeBlock) {
      codeBlockContent += `${line}
`;
      continue;
    }
    const _line = line.trim();
    if (!_line)
      continue;
    if (_line.startsWith("#")) {
      const match = /^#+/.exec(_line);
      let level = match ? match[0].length : 0;
      level = level <= 2 ? 3 : 4;
      const text = line.replace(/^#+\s*/, "");
      nodes.push({ tag: `h${level}`, children: processInlineElements(text) });
    } else if (_line.startsWith("> ")) {
      const text = line.slice(2);
      nodes.push({ tag: "blockquote", children: processInlineElements(text) });
    } else if (_line === "---" || _line === "***") {
      nodes.push({ tag: "hr" });
    } else {
      const matches = /^(\s*)(?:-|\*)\s/.exec(line);
      if (matches) {
        line = `${matches[1]}• ${line.slice(matches[0].length)}`;
      }
      nodes.push({ tag: "p", children: processInlineElements(line) });
    }
  }
  if (inCodeBlock) {
    nodes.push({
      tag: "pre",
      children: [
        {
          tag: "code",
          attrs: codeBlockLanguage ? { class: `language-${codeBlockLanguage}` } : {},
          children: [codeBlockContent.trim()]
        }
      ]
    });
  }
  return nodes;
}
function processInlineElementsHelper(text) {
  const children = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match = null;
  let index2 = 0;
  while (true) {
    match = linkRegex.exec(text);
    if (match === null)
      break;
    if (match.index > index2) {
      children.push(...processInlineStyles(text.slice(index2, match.index)));
    }
    children.push({
      tag: "a",
      attrs: { href: match[2] },
      children: [match[1]]
    });
    index2 = match.index + match[0].length;
  }
  if (index2 < text.length) {
    children.push(...processInlineStyles(text.slice(index2)));
  }
  return children;
}
function processInlineStyles(text) {
  const children = [];
  const styleRegex = /(\*\*|__|_|~~)(.+?)\1/g;
  let lastIndex = 0;
  let match;
  while (true) {
    match = styleRegex.exec(text);
    if (match === null)
      break;
    if (match.index > lastIndex) {
      children.push(text.slice(lastIndex, match.index));
    }
    let tag = "";
    switch (match[1]) {
      case "**":
        tag = "strong";
        break;
      case "__":
        tag = "u";
        break;
      case "_":
        tag = "i";
        break;
      case "~~":
        tag = "s";
        break;
      default:
        tag = "span";
        break;
    }
    children.push({
      tag,
      children: [match[2]]
    });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    children.push(text.slice(lastIndex));
  }
  return children;
}
function processInlineElements(text) {
  const children = [];
  const codeRegex = /`([^`]+)`/g;
  let codeMatch = null;
  let lastIndex = 0;
  while (true) {
    codeMatch = codeRegex.exec(text);
    if (codeMatch === null)
      break;
    if (codeMatch.index > lastIndex) {
      children.push(...processInlineElementsHelper(text.slice(lastIndex, codeMatch.index)));
    }
    children.push({
      tag: "code",
      children: [codeMatch[1]]
    });
    lastIndex = codeMatch.index + codeMatch[0].length;
  }
  if (lastIndex < text.length) {
    children.push(...processInlineElementsHelper(text.slice(lastIndex)));
  }
  return children;
}
const escapeChars = /([_*[\]()\\~`>#+\-=|{}.!])/g;
const escapedChars = {
  "\\*": "ESCAPEASTERISK",
  "\\_": "ESCAPEUNDERSCORE",
  "\\~": "ESCAPETILDE",
  "\\|": "ESCAPEPIP",
  "\\`": "ESCAPEBACKTICK",
  "\\\\": "ESCAPEBACKSLASH",
  "\\(": "ESCAPELEFTPARENTHESIS",
  "\\)": "ESCAPERIGHTPARENTHESIS",
  "\\[": "ESCAPELEFTBRACKET",
  "\\]": "ESCAPERIGHTBRACKET",
  "\\{": "ESCAPELEFTBRACE",
  "\\}": "ESCAPERIGHTBRACE",
  "\\>": "ESCAPEGREATERTHAN",
  "\\#": "ESCAPEHASH",
  "\\+": "ESCAPEPLUS",
  "\\-": "ESCAPEMINUS",
  "\\=": "ESCAPEEQUAL",
  "\\.": "ESCAPEDOT",
  "\\!": "ESCAPEEXCLAMATION",
  "\\?": "ESCAPEQUESTION"
};
const escapedCharsReverseMap = new Map(Object.entries(escapedChars).map(([key, value]) => [value, key]));
function escape(lines) {
  const stack = [];
  const result2 = [];
  let lineTrim = "";
  let modifiedLine = "";
  for (const [i, line] of lines.entries()) {
    lineTrim = line.trim();
    modifiedLine = line;
    let startIndex = 0;
    if (/^```.+/.test(lineTrim)) {
      stack.push(i);
    } else if (lineTrim === "```") {
      if (stack.length) {
        startIndex = stack.pop();
        if (!stack.length) {
          const content = lines.slice(startIndex, i + 1).join("\n");
          result2.push(handleEscape(content, "code"));
          continue;
        }
      } else {
        stack.push(i);
      }
    } else if (lineTrim && i > 0 && /^\s*>/.test(result2.at(-1) ?? "") && !lineTrim.startsWith(">")) {
      modifiedLine = `>${line}`;
    }
    if (!stack.length) {
      result2.push(handleEscape(modifiedLine));
    }
  }
  if (stack.length) {
    const last = `${lines.slice(stack[0]).join("\n")}
\`\`\``;
    result2.push(handleEscape(last, "code"));
  }
  const regexp = /^LOGSTART\n(.*?)LOGEND/s;
  return result2.join("\n").replace(regexp, "**$1||").replace(new RegExp(Object.values(escapedChars).join("|"), "g"), (match) => escapedCharsReverseMap.get(match) ?? match);
}
function handleEscape(text, type2 = "text") {
  if (!text.trim()) {
    return text;
  }
  text = text.replace(/\\[*_~|`\\()[\]{}>#+\-=.!]/g, (match) => escapedChars[match]);
  if (type2 === "text") {
    text = text.replace(escapeChars, "\\$1").replace(/\\\*\\\*(\S|\S.*?\S)\\\*\\\*/g, "*$1*").replace(/\\_\\_(\S|\S.*?\S)\\_\\_/g, "__$1__").replace(/\\_(\S|\S.*?\S)\\_/g, "_$1_").replace(/\\~(\S|\S.*?\S)\\~/g, "~$1~").replace(/\\\|\\\|(\S|\S.*?\S)\\\|\\\|/g, "||$1||").replace(/\\\[([^\]]+)\\\]\\\((.+?)\\\)/g, "[$1]($2)").replace(/\\`(.*?)\\`/g, "`$1`").replace(/^\s*\\>\s*(.+)$/gm, ">$1").replace(/^(>?\s*)\\(-|\*)\s+(.+)$/gm, "$1• $3").replace(/^((\\#){1,3}\s)(.+)/gm, "$1*$3*");
  } else {
    const codeBlank = text.length - text.trimStart().length;
    if (codeBlank > 0) {
      const blankReg = new RegExp(`^\\s{${codeBlank}}`, "gm");
      text = text.replace(blankReg, "");
    }
    text = text.trimEnd().replace(/([\\`])/g, "\\$1").replace(/^\\`\\`\\`([\s\S]+)\\`\\`\\`$/g, "```$1```");
  }
  return text;
}
function chunkDocument(text, chunkSize = 4096) {
  const textList = text.split("\n");
  const chunks = [[]];
  let chunkIndex = 0;
  const codeStack = [];
  for (const line of textList) {
    if (chunks[chunkIndex].join("\n").length + line.length >= chunkSize) {
      chunkIndex++;
      chunks.push([]);
      if (codeStack.length) {
        if (chunks[chunkIndex - 1].join("\n").length + codeStack.length * 4 >= chunkSize) {
          chunks[chunkIndex - 1].push(...chunks[chunkIndex - 1].slice(-codeStack.length));
          chunks[chunkIndex - 1].length -= codeStack.length;
        }
        chunks[chunkIndex - 1].push(...Array.from({ length: codeStack.length }).fill("```"));
        chunks[chunkIndex].push(...codeStack);
      }
      if (line.length > chunkSize) {
        const lineSplit = chunkText(chunks[chunkIndex].join("\n") + line, chunkSize);
        if (lineSplit.length > 1) {
          chunks.length -= 1;
          chunks.push(...lineSplit.map((item) => item.split("\n")));
          chunkIndex = chunks.length - 1;
        } else {
          chunks[chunkIndex].push(line);
        }
      } else {
        chunks[chunkIndex].push(line);
      }
      continue;
    }
    if (/^```.+/.test(line.trim())) {
      codeStack.push(line);
    } else if (line.trim() === "```") {
      if (codeStack.length) {
        codeStack.pop();
      } else {
        codeStack.push(line);
      }
    }
    chunks[chunkIndex].push(line);
  }
  if (codeStack.length) {
    chunks[chunkIndex].push(...Array.from({ length: codeStack.length }).fill("```"));
  }
  return chunks;
}
function chunkText(text, chunkSize) {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}
class MessageContext {
  chat_id;
  message_id = null;
  reply_to_message_id;
  parse_mode = null;
  allow_sending_without_reply = null;
  disable_web_page_preview = ENV.DISABLE_WEB_PREVIEW;
  message_thread_id = null;
  chatType;
  message;
  sentMessageIds = /* @__PURE__ */ new Set();
  constructor(message) {
    this.chat_id = message.chat.id;
    this.chatType = message.chat.type;
    this.message = message;
    if (message.chat.type === "group" || message.chat.type === "supergroup") {
      if (message?.reply_to_message && ENV.EXTRA_MESSAGE_CONTEXT && !message.is_topic_message && ENV.ENABLE_REPLY_TO_MENTION && !message.reply_to_message.from?.is_bot) {
        this.reply_to_message_id = message.reply_to_message.message_id;
      } else {
        this.reply_to_message_id = message.message_id;
      }
      this.allow_sending_without_reply = true;
      if (message.message_thread_id && message.is_topic_message) {
        this.message_thread_id = message.message_thread_id;
      }
    } else {
      this.reply_to_message_id = null;
    }
  }
}
class MessageSender {
  api;
  context;
  constructor(token, context) {
    this.api = createTelegramBotAPI(token);
    this.context = context;
    this.sendRichText = this.sendRichText.bind(this);
    this.sendPlainText = this.sendPlainText.bind(this);
    this.sendPhoto = this.sendPhoto.bind(this);
  }
  static from(token, message) {
    return new MessageSender(token, new MessageContext(message));
  }
  with(message) {
    this.context = new MessageContext(message);
    return this;
  }
  update(context) {
    if (!this.context) {
      this.context = context;
      return this;
    }
    for (const key in context) {
      this.context[key] = context[key];
    }
    return this;
  }
  async sendMessage(message, context) {
    if (context?.message_id) {
      const params = {
        chat_id: context.chat_id,
        message_id: context.message_id,
        parse_mode: context.parse_mode || void 0,
        text: message
      };
      if (context.disable_web_page_preview) {
        params.link_preview_options = {
          is_disabled: true
        };
      }
      return this.api.editMessageText(params);
    } else {
      const params = {
        chat_id: context.chat_id,
        message_thread_id: context.message_thread_id || void 0,
        parse_mode: context.parse_mode || void 0,
        text: message
      };
      if (context.reply_to_message_id) {
        params.reply_parameters = {
          message_id: context.reply_to_message_id,
          chat_id: context.chat_id,
          allow_sending_without_reply: context.allow_sending_without_reply || void 0
        };
      }
      if (context.disable_web_page_preview) {
        params.link_preview_options = {
          is_disabled: true
        };
      }
      return this.api.sendMessage(params);
    }
  }
  async sendLongMessage(message, context) {
    const chatContext = { ...context };
    const messages = renderMessage(context.parse_mode, message);
    let lastMessageResponse = null;
    let lastMessageRespJson = null;
    for (let i = 0; i < messages.length; i++) {
      if (i > 0 && i < context.sentMessageIds.size - 1) {
        continue;
      }
      chatContext.message_id = [...context.sentMessageIds][i] ?? null;
      lastMessageResponse = await this.sendMessage(messages[i], chatContext);
      if (lastMessageResponse.status !== 200) {
        break;
      }
      lastMessageRespJson = await lastMessageResponse.clone().json();
      this.context.sentMessageIds.add(lastMessageRespJson.result.message_id);
      this.context.message_id = lastMessageRespJson.result.message_id;
    }
    if (lastMessageResponse === null) {
      throw new Error("Send message failed");
    }
    return lastMessageResponse;
  }
  sendRichText(message, parseMode = ENV.DEFAULT_PARSE_MODE, type2 = "chat") {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    const resp = this.sendLongMessage(message, {
      ...this.context,
      parse_mode: parseMode
    });
    return checkIsNeedTagIds(this.context, resp, type2);
  }
  sendPlainText(message, type2 = "tip") {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    const resp = this.sendLongMessage(message, {
      ...this.context,
      parse_mode: null
    });
    return checkIsNeedTagIds(this.context, resp, type2);
  }
  sendPhoto(photo, caption, parse_mode) {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    const params = {
      chat_id: this.context.chat_id,
      message_thread_id: this.context.message_thread_id || void 0,
      photo,
      ...caption ? { caption: renderMessage(parse_mode || null, caption)[0] } : {},
      parse_mode
    };
    if (this.context.reply_to_message_id) {
      params.reply_parameters = {
        message_id: this.context.reply_to_message_id,
        chat_id: this.context.chat_id,
        allow_sending_without_reply: this.context.allow_sending_without_reply || void 0
      };
    }
    const resp = this.api.sendPhoto(params);
    return checkIsNeedTagIds(this.context, resp, "chat");
  }
  sendMediaGroup(media) {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    const params = {
      chat_id: this.context.chat_id,
      message_thread_id: this.context.message_thread_id || void 0,
      media
    };
    if (this.context.reply_to_message_id) {
      params.reply_parameters = {
        message_id: this.context.reply_to_message_id,
        chat_id: this.context.chat_id,
        allow_sending_without_reply: this.context.allow_sending_without_reply || void 0
      };
    }
    const resp = this.api.sendMediaGroup(params);
    return checkIsNeedTagIds(this.context, resp, "chat");
  }
  sendDocument(document, caption, parse_mode) {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    const params = {
      chat_id: this.context.chat_id,
      message_thread_id: this.context.message_thread_id || void 0,
      document,
      caption,
      parse_mode
    };
    if (this.context.reply_to_message_id) {
      params.reply_parameters = {
        message_id: this.context.reply_to_message_id,
        chat_id: this.context.chat_id,
        allow_sending_without_reply: this.context.allow_sending_without_reply || void 0
      };
    }
    return this.api.sendDocument(params);
  }
  editMessageMedia(media, caption, parse_mode) {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    if (!this.context.message_id) {
      throw new Error("Message id is null");
    }
    const params = {
      chat_id: this.context.chat_id,
      message_id: this.context.message_id,
      media: {
        ...media,
        ...caption ? { caption: parse_mode ? renderMessage(parse_mode, caption)[0] : caption } : {},
        parse_mode
      }
    };
    const resp = this.api.editMessageMedia(params);
    return checkIsNeedTagIds(this.context, resp, "chat");
  }
}
class TelegraphSender {
  telegraphAccessTokenKey;
  telegraphAccessToken;
  teleph_path;
  author = {
    short_name: "Mewo",
    author_name: "A Cat",
    author_url: ENV.TELEGRAPH_AUTHOR_URL
  };
  constructor(botName, telegraphAccessTokenKey) {
    this.telegraphAccessTokenKey = telegraphAccessTokenKey;
    if (botName) {
      this.author = {
        short_name: botName,
        author_name: botName,
        author_url: ENV.TELEGRAPH_AUTHOR_URL
      };
    }
  }
  async createAccount() {
    const { short_name, author_name } = this.author;
    const url = `https://api.telegra.ph/createAccount?short_name=${short_name}&author_name=${author_name}`;
    const resp = await fetch(url).then((r) => r.json());
    if (resp.ok) {
      return resp.result.access_token;
    } else {
      throw new Error("create telegraph account failed");
    }
  }
  async createOrEditPage(url, title, content) {
    const body = {
      access_token: this.telegraphAccessToken,
      teleph_path: this.teleph_path ?? void 0,
      title: title || "Daily Q&A",
      content: markdownToTelegraphNodes(content),
      ...this.author
    };
    const headers = { "Content-Type": "application/json" };
    return fetch(url, {
      method: "post",
      headers,
      body: JSON.stringify(body)
    }).then((r) => r.json());
  }
  async send(title, content) {
    let endPoint = "https://api.telegra.ph/editPage";
    if (!this.telegraphAccessToken) {
      this.telegraphAccessToken = await ENV.DATABASE.get(this.telegraphAccessTokenKey);
      if (!this.telegraphAccessToken) {
        this.telegraphAccessToken = await this.createAccount();
        await ENV.DATABASE.put(this.telegraphAccessTokenKey, this.telegraphAccessToken).catch(console.error);
      }
    }
    if (!this.teleph_path) {
      endPoint = "https://api.telegra.ph/createPage";
      const c_resp = await this.createOrEditPage(endPoint, title, content);
      if (c_resp.ok) {
        this.teleph_path = c_resp.result.path;
        log.info("telegraph url:", c_resp.result.url);
        return c_resp;
      } else {
        console.error(c_resp.error);
        throw new Error(c_resp.error);
      }
    } else {
      return this.createOrEditPage(endPoint, title, content);
    }
  }
}
function sendAction(botToken, chat_id, action = "typing") {
  const api = createTelegramBotAPI(botToken);
  setTimeout(() => api.sendChatAction({
    chat_id,
    action
  }).catch(console.error), 0);
}
async function checkIsNeedTagIds(context, resp, msgType) {
  const { chatType } = context;
  let message_id = [];
  const original_resp = await resp;
  do {
    if (ENV.EXPIRED_TIME <= 0) break;
    const clone_resp = await original_resp.clone().json();
    if (Array.isArray(clone_resp.result)) {
      message_id = clone_resp?.result?.map((i) => i.message_id);
    } else {
      message_id = [clone_resp?.result?.message_id];
    }
    if (message_id.filter(Boolean).length === 0) {
      log.error("resp:", JSON.stringify(clone_resp));
      break;
    }
    const isGroup = ["group", "supergroup"].includes(chatType);
    const isNeedTag = isGroup && ENV.SCHEDULE_GROUP_DELETE_TYPE.includes(msgType) || !isGroup && ENV.SCHEDULE_PRIVATE_DELETE_TYPE.includes(msgType);
    if (isNeedTag) {
      if (!tagMessageIds.has(context.message)) {
        tagMessageIds.set(context.message, []);
      }
      message_id.forEach((id) => tagMessageIds.get(context.message)?.push(id));
    }
  } while (false);
  return original_resp;
}
class ChosenInlineContext {
  result_id;
  inline_message_id;
  query;
  parse_mode = null;
  telegraphAccessTokenKey;
  constructor(result2) {
    this.result_id = result2.result_id;
    this.inline_message_id = result2.inline_message_id;
    this.query = result2.query;
    if (ENV.TELEGRAPH_NUM_LIMIT > 0) {
      this.telegraphAccessTokenKey = `telegraph_access_token:${result2.from.id}`;
    }
  }
}
class ChosenInlineSender {
  api;
  context;
  constructor(token, context) {
    this.api = createTelegramBotAPI(token);
    this.context = context;
  }
  static from(token, result2) {
    return new ChosenInlineSender(token, new ChosenInlineContext(result2));
  }
  sendRichText(text, parseMode = ENV.DEFAULT_PARSE_MODE, type2 = "chat") {
    return this.editMessageText(text, parseMode);
  }
  sendPlainText(text) {
    return this.editMessageText(text);
  }
  editMessageText(text, parse_mode) {
    return this.api.editMessageText({
      inline_message_id: this.context.inline_message_id,
      text: renderMessage(parse_mode || null, text)[0],
      parse_mode,
      link_preview_options: {
        is_disabled: ENV.DISABLE_WEB_PREVIEW
      }
    });
  }
  editMessageMedia(media, type2, caption, parse_mode) {
    return this.api.editMessageMedia({
      inline_message_id: this.context.inline_message_id,
      media: {
        type: type2,
        media,
        ...caption ? { caption: renderMessage(parse_mode || null, caption)[0] } : {}
      }
    });
  }
}
function renderMessage(parse_mode, message) {
  const chunkMessage = chunkDocument(message);
  if (parse_mode === "MarkdownV2") {
    return chunkMessage.map((lines) => escape(lines));
  }
  return chunkMessage.map((line) => line.join("\n"));
}
async function loadChatRoleWithContext(message, context, isCallbackQuery = false) {
  const { groupAdminsKey } = context.SHARE_CONTEXT;
  const chatId = message.chat.id;
  const speakerId = isCallbackQuery ? context?.from?.id : message.from?.id || chatId;
  if (!groupAdminsKey) {
    return null;
  }
  let groupAdmin = null;
  try {
    groupAdmin = JSON.parse(await ENV.DATABASE.get(groupAdminsKey));
  } catch (e) {
    console.error(e);
  }
  if (groupAdmin === null || !Array.isArray(groupAdmin) || groupAdmin.length === 0) {
    const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
    const result2 = await api.getChatAdministratorsWithReturns({ chat_id: chatId });
    if (result2 == null) {
      return null;
    }
    groupAdmin = result2.result;
    await ENV.DATABASE.put(
      groupAdminsKey,
      JSON.stringify(groupAdmin),
      { expiration: Date.now() / 1e3 + 120 }
    );
  }
  for (const user of groupAdmin) {
    if (`${user.user?.id}` === `${speakerId}`) {
      return user.status;
    }
  }
  return "member";
}
var marker$1 = "vercel.ai.error";
var symbol$1 = Symbol.for(marker$1);
var _a$1;
var _AISDKError = class _AISDKError2 extends Error {
  /**
   * Creates an AI SDK Error.
   *
   * @param {Object} params - The parameters for creating the error.
   * @param {string} params.name - The name of the error.
   * @param {string} params.message - The error message.
   * @param {unknown} [params.cause] - The underlying cause of the error.
   */
  constructor({
    name: name14,
    message,
    cause
  }) {
    super(message);
    this[_a$1] = true;
    this.name = name14;
    this.cause = cause;
  }
  /**
   * Checks if the given error is an AI SDK Error.
   * @param {unknown} error - The error to check.
   * @returns {boolean} True if the error is an AI SDK Error, false otherwise.
   */
  static isInstance(error) {
    return _AISDKError2.hasMarker(error, marker$1);
  }
  static hasMarker(error, marker15) {
    const markerSymbol = Symbol.for(marker15);
    return error != null && typeof error === "object" && markerSymbol in error && typeof error[markerSymbol] === "boolean" && error[markerSymbol] === true;
  }
  /**
   * Returns a JSON representation of the error.
   * @returns {Object} An object containing the error's name, message, and cause.
   *
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message
    };
  }
};
_a$1 = symbol$1;
var AISDKError = _AISDKError;
var name$1 = "AI_APICallError";
var marker2$1 = `vercel.ai.error.${name$1}`;
var symbol2$1 = Symbol.for(marker2$1);
var _a2$1;
var APICallError = class extends AISDKError {
  constructor({
    message,
    url,
    requestBodyValues,
    statusCode,
    responseHeaders,
    responseBody,
    cause,
    isRetryable = statusCode != null && (statusCode === 408 || // request timeout
    statusCode === 409 || // conflict
    statusCode === 429 || // too many requests
    statusCode >= 500),
    // server error
    data
  }) {
    super({ name: name$1, message, cause });
    this[_a2$1] = true;
    this.url = url;
    this.requestBodyValues = requestBodyValues;
    this.statusCode = statusCode;
    this.responseHeaders = responseHeaders;
    this.responseBody = responseBody;
    this.isRetryable = isRetryable;
    this.data = data;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker2$1);
  }
  /**
   * @deprecated Use isInstance instead.
   */
  static isAPICallError(error) {
    return error instanceof Error && error.name === name$1 && typeof error.url === "string" && typeof error.requestBodyValues === "object" && (error.statusCode == null || typeof error.statusCode === "number") && (error.responseHeaders == null || typeof error.responseHeaders === "object") && (error.responseBody == null || typeof error.responseBody === "string") && (error.cause == null || typeof error.cause === "object") && typeof error.isRetryable === "boolean" && (error.data == null || typeof error.data === "object");
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      url: this.url,
      requestBodyValues: this.requestBodyValues,
      statusCode: this.statusCode,
      responseHeaders: this.responseHeaders,
      responseBody: this.responseBody,
      cause: this.cause,
      isRetryable: this.isRetryable,
      data: this.data
    };
  }
};
_a2$1 = symbol2$1;
var name2$1 = "AI_EmptyResponseBodyError";
var marker3$1 = `vercel.ai.error.${name2$1}`;
var symbol3$1 = Symbol.for(marker3$1);
var _a3$1;
var EmptyResponseBodyError = class extends AISDKError {
  // used in isInstance
  constructor({ message = "Empty response body" } = {}) {
    super({ name: name2$1, message });
    this[_a3$1] = true;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker3$1);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isEmptyResponseBodyError(error) {
    return error instanceof Error && error.name === name2$1;
  }
};
_a3$1 = symbol3$1;
function getErrorMessage$1(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
var name3$1 = "AI_InvalidArgumentError";
var marker4$1 = `vercel.ai.error.${name3$1}`;
var symbol4$1 = Symbol.for(marker4$1);
var _a4$1;
var InvalidArgumentError$1 = class InvalidArgumentError2 extends AISDKError {
  constructor({
    message,
    cause,
    argument
  }) {
    super({ name: name3$1, message, cause });
    this[_a4$1] = true;
    this.argument = argument;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker4$1);
  }
};
_a4$1 = symbol4$1;
var name4$1 = "AI_InvalidPromptError";
var marker5$1 = `vercel.ai.error.${name4$1}`;
var symbol5$1 = Symbol.for(marker5$1);
var _a5$1;
var InvalidPromptError = class extends AISDKError {
  constructor({
    prompt: prompt2,
    message,
    cause
  }) {
    super({ name: name4$1, message: `Invalid prompt: ${message}`, cause });
    this[_a5$1] = true;
    this.prompt = prompt2;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker5$1);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidPromptError(error) {
    return error instanceof Error && error.name === name4$1 && prompt != null;
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      prompt: this.prompt
    };
  }
};
_a5$1 = symbol5$1;
var name5$1 = "AI_InvalidResponseDataError";
var marker6$1 = `vercel.ai.error.${name5$1}`;
var symbol6$1 = Symbol.for(marker6$1);
var _a6$1;
var InvalidResponseDataError = class extends AISDKError {
  constructor({
    data,
    message = `Invalid response data: ${JSON.stringify(data)}.`
  }) {
    super({ name: name5$1, message });
    this[_a6$1] = true;
    this.data = data;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker6$1);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidResponseDataError(error) {
    return error instanceof Error && error.name === name5$1 && error.data != null;
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      data: this.data
    };
  }
};
_a6$1 = symbol6$1;
var name6$1 = "AI_JSONParseError";
var marker7 = `vercel.ai.error.${name6$1}`;
var symbol7 = Symbol.for(marker7);
var _a7;
var JSONParseError = class extends AISDKError {
  constructor({ text, cause }) {
    super({
      name: name6$1,
      message: `JSON parsing failed: Text: ${text}.
Error message: ${getErrorMessage$1(cause)}`,
      cause
    });
    this[_a7] = true;
    this.text = text;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker7);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isJSONParseError(error) {
    return error instanceof Error && error.name === name6$1 && "text" in error && typeof error.text === "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      valueText: this.text
    };
  }
};
_a7 = symbol7;
var name7 = "AI_LoadAPIKeyError";
var marker8$1 = `vercel.ai.error.${name7}`;
var symbol8$1 = Symbol.for(marker8$1);
var _a8$1;
var LoadAPIKeyError = class extends AISDKError {
  // used in isInstance
  constructor({ message }) {
    super({ name: name7, message });
    this[_a8$1] = true;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker8$1);
  }
  /**
   * @deprecated Use isInstance instead.
   */
  static isLoadAPIKeyError(error) {
    return error instanceof Error && error.name === name7;
  }
};
_a8$1 = symbol8$1;
var name8$1 = "AI_LoadSettingError";
var marker9$1 = `vercel.ai.error.${name8$1}`;
var symbol9$1 = Symbol.for(marker9$1);
var _a9$1;
var LoadSettingError = class extends AISDKError {
  // used in isInstance
  constructor({ message }) {
    super({ name: name8$1, message });
    this[_a9$1] = true;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker9$1);
  }
  /**
   * @deprecated Use isInstance instead.
   */
  static isLoadSettingError(error) {
    return error instanceof Error && error.name === name8$1;
  }
};
_a9$1 = symbol9$1;
var name10 = "AI_NoSuchModelError";
var marker11 = `vercel.ai.error.${name10}`;
var symbol11 = Symbol.for(marker11);
var _a11;
var NoSuchModelError = class extends AISDKError {
  constructor({
    errorName = name10,
    modelId,
    modelType,
    message = `No such ${modelType}: ${modelId}`
  }) {
    super({ name: errorName, message });
    this[_a11] = true;
    this.modelId = modelId;
    this.modelType = modelType;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker11);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isNoSuchModelError(error) {
    return error instanceof Error && error.name === name10 && typeof error.modelId === "string" && typeof error.modelType === "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      modelId: this.modelId,
      modelType: this.modelType
    };
  }
};
_a11 = symbol11;
var name11 = "AI_TooManyEmbeddingValuesForCallError";
var marker12 = `vercel.ai.error.${name11}`;
var symbol12 = Symbol.for(marker12);
var _a12;
var TooManyEmbeddingValuesForCallError = class extends AISDKError {
  constructor(options2) {
    super({
      name: name11,
      message: `Too many values for a single embedding call. The ${options2.provider} model "${options2.modelId}" can only embed up to ${options2.maxEmbeddingsPerCall} values per call, but ${options2.values.length} values were provided.`
    });
    this[_a12] = true;
    this.provider = options2.provider;
    this.modelId = options2.modelId;
    this.maxEmbeddingsPerCall = options2.maxEmbeddingsPerCall;
    this.values = options2.values;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker12);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isTooManyEmbeddingValuesForCallError(error) {
    return error instanceof Error && error.name === name11 && "provider" in error && typeof error.provider === "string" && "modelId" in error && typeof error.modelId === "string" && "maxEmbeddingsPerCall" in error && typeof error.maxEmbeddingsPerCall === "number" && "values" in error && Array.isArray(error.values);
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      provider: this.provider,
      modelId: this.modelId,
      maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
      values: this.values
    };
  }
};
_a12 = symbol12;
var name12 = "AI_TypeValidationError";
var marker13 = `vercel.ai.error.${name12}`;
var symbol13 = Symbol.for(marker13);
var _a13;
var _TypeValidationError = class _TypeValidationError2 extends AISDKError {
  constructor({ value, cause }) {
    super({
      name: name12,
      message: `Type validation failed: Value: ${JSON.stringify(value)}.
Error message: ${getErrorMessage$1(cause)}`,
      cause
    });
    this[_a13] = true;
    this.value = value;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker13);
  }
  /**
   * Wraps an error into a TypeValidationError.
   * If the cause is already a TypeValidationError with the same value, it returns the cause.
   * Otherwise, it creates a new TypeValidationError.
   *
   * @param {Object} params - The parameters for wrapping the error.
   * @param {unknown} params.value - The value that failed validation.
   * @param {unknown} params.cause - The original error or cause of the validation failure.
   * @returns {TypeValidationError} A TypeValidationError instance.
   */
  static wrap({
    value,
    cause
  }) {
    return _TypeValidationError2.isInstance(cause) && cause.value === value ? cause : new _TypeValidationError2({ value, cause });
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isTypeValidationError(error) {
    return error instanceof Error && error.name === name12;
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      value: this.value
    };
  }
};
_a13 = symbol13;
var TypeValidationError = _TypeValidationError;
var name13 = "AI_UnsupportedFunctionalityError";
var marker14 = `vercel.ai.error.${name13}`;
var symbol14 = Symbol.for(marker14);
var _a14;
var UnsupportedFunctionalityError = class extends AISDKError {
  constructor({ functionality }) {
    super({
      name: name13,
      message: `'${functionality}' functionality not supported.`
    });
    this[_a14] = true;
    this.functionality = functionality;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker14);
  }
  /**
   * @deprecated Use isInstance instead.
   */
  static isUnsupportedFunctionalityError(error) {
    return error instanceof Error && error.name === name13 && typeof error.functionality === "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      functionality: this.functionality
    };
  }
};
_a14 = symbol14;
let customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = "";
    let i = size;
    while (i--) {
      id += alphabet[Math.random() * alphabet.length | 0];
    }
    return id;
  };
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var secureJsonParse = { exports: {} };
const hasBuffer = typeof Buffer !== "undefined";
const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
function _parse(text, reviver, options2) {
  if (options2 == null) {
    if (reviver !== null && typeof reviver === "object") {
      options2 = reviver;
      reviver = void 0;
    }
  }
  if (hasBuffer && Buffer.isBuffer(text)) {
    text = text.toString();
  }
  if (text && text.charCodeAt(0) === 65279) {
    text = text.slice(1);
  }
  const obj = JSON.parse(text, reviver);
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  const protoAction = options2 && options2.protoAction || "error";
  const constructorAction = options2 && options2.constructorAction || "error";
  if (protoAction === "ignore" && constructorAction === "ignore") {
    return obj;
  }
  if (protoAction !== "ignore" && constructorAction !== "ignore") {
    if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) {
      return obj;
    }
  } else if (protoAction !== "ignore" && constructorAction === "ignore") {
    if (suspectProtoRx.test(text) === false) {
      return obj;
    }
  } else {
    if (suspectConstructorRx.test(text) === false) {
      return obj;
    }
  }
  return filter(obj, { protoAction, constructorAction, safe: options2 && options2.safe });
}
function filter(obj, { protoAction = "error", constructorAction = "error", safe } = {}) {
  let next = [obj];
  while (next.length) {
    const nodes = next;
    next = [];
    for (const node of nodes) {
      if (protoAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "__proto__")) {
        if (safe === true) {
          return null;
        } else if (protoAction === "error") {
          throw new SyntaxError("Object contains forbidden prototype property");
        }
        delete node.__proto__;
      }
      if (constructorAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "constructor") && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) {
        if (safe === true) {
          return null;
        } else if (constructorAction === "error") {
          throw new SyntaxError("Object contains forbidden prototype property");
        }
        delete node.constructor;
      }
      for (const key in node) {
        const value = node[key];
        if (value && typeof value === "object") {
          next.push(value);
        }
      }
    }
  }
  return obj;
}
function parse(text, reviver, options2) {
  const stackTraceLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  try {
    return _parse(text, reviver, options2);
  } finally {
    Error.stackTraceLimit = stackTraceLimit;
  }
}
function safeParse(text, reviver) {
  const stackTraceLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  try {
    return _parse(text, reviver, { safe: true });
  } catch (_e) {
    return null;
  } finally {
    Error.stackTraceLimit = stackTraceLimit;
  }
}
secureJsonParse.exports = parse;
secureJsonParse.exports.default = parse;
secureJsonParse.exports.parse = parse;
secureJsonParse.exports.safeParse = safeParse;
secureJsonParse.exports.scan = filter;
var secureJsonParseExports = secureJsonParse.exports;
const SecureJSON = /* @__PURE__ */ getDefaultExportFromCjs(secureJsonParseExports);
function createParser(onParse) {
  let isFirstChunk;
  let buffer;
  let startingPosition;
  let startingFieldLength;
  let eventId;
  let eventName;
  let data;
  reset();
  return {
    feed,
    reset
  };
  function reset() {
    isFirstChunk = true;
    buffer = "";
    startingPosition = 0;
    startingFieldLength = -1;
    eventId = void 0;
    eventName = void 0;
    data = "";
  }
  function feed(chunk) {
    buffer = buffer ? buffer + chunk : chunk;
    if (isFirstChunk && hasBom(buffer)) {
      buffer = buffer.slice(BOM.length);
    }
    isFirstChunk = false;
    const length = buffer.length;
    let position = 0;
    let discardTrailingNewline = false;
    while (position < length) {
      if (discardTrailingNewline) {
        if (buffer[position] === "\n") {
          ++position;
        }
        discardTrailingNewline = false;
      }
      let lineLength = -1;
      let fieldLength = startingFieldLength;
      let character;
      for (let index2 = startingPosition; lineLength < 0 && index2 < length; ++index2) {
        character = buffer[index2];
        if (character === ":" && fieldLength < 0) {
          fieldLength = index2 - position;
        } else if (character === "\r") {
          discardTrailingNewline = true;
          lineLength = index2 - position;
        } else if (character === "\n") {
          lineLength = index2 - position;
        }
      }
      if (lineLength < 0) {
        startingPosition = length - position;
        startingFieldLength = fieldLength;
        break;
      } else {
        startingPosition = 0;
        startingFieldLength = -1;
      }
      parseEventStreamLine(buffer, position, fieldLength, lineLength);
      position += lineLength + 1;
    }
    if (position === length) {
      buffer = "";
    } else if (position > 0) {
      buffer = buffer.slice(position);
    }
  }
  function parseEventStreamLine(lineBuffer, index2, fieldLength, lineLength) {
    if (lineLength === 0) {
      if (data.length > 0) {
        onParse({
          type: "event",
          id: eventId,
          event: eventName || void 0,
          data: data.slice(0, -1)
        });
        data = "";
        eventId = void 0;
      }
      eventName = void 0;
      return;
    }
    const noValue = fieldLength < 0;
    const field = lineBuffer.slice(index2, index2 + (noValue ? lineLength : fieldLength));
    let step = 0;
    if (noValue) {
      step = lineLength;
    } else if (lineBuffer[index2 + fieldLength + 1] === " ") {
      step = fieldLength + 2;
    } else {
      step = fieldLength + 1;
    }
    const position = index2 + step;
    const valueLength = lineLength - step;
    const value = lineBuffer.slice(position, position + valueLength).toString();
    if (field === "data") {
      data += value ? "".concat(value, "\n") : "\n";
    } else if (field === "event") {
      eventName = value;
    } else if (field === "id" && !value.includes("\0")) {
      eventId = value;
    } else if (field === "retry") {
      const retry = parseInt(value, 10);
      if (!Number.isNaN(retry)) {
        onParse({
          type: "reconnect-interval",
          value: retry
        });
      }
    }
  }
}
const BOM = [239, 187, 191];
function hasBom(buffer) {
  return BOM.every((charCode, index2) => buffer.charCodeAt(index2) === charCode);
}
class EventSourceParserStream extends TransformStream {
  constructor() {
    let parser;
    super({
      start(controller) {
        parser = createParser((event) => {
          if (event.type === "event") {
            controller.enqueue(event);
          }
        });
      },
      transform(chunk) {
        parser.feed(chunk);
      }
    });
  }
}
function combineHeaders(...headers) {
  return headers.reduce(
    (combinedHeaders, currentHeaders) => ({
      ...combinedHeaders,
      ...currentHeaders != null ? currentHeaders : {}
    }),
    {}
  );
}
function extractResponseHeaders(response) {
  const headers = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return headers;
}
var createIdGenerator = ({
  prefix,
  size: defaultSize = 7,
  alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  separator = "-"
} = {}) => {
  const generator = customAlphabet(alphabet, defaultSize);
  if (prefix == null) {
    return generator;
  }
  if (alphabet.includes(separator)) {
    throw new InvalidArgumentError$1({
      argument: "separator",
      message: `The separator "${separator}" must not be part of the alphabet "${alphabet}".`
    });
  }
  return (size) => `${prefix}${separator}${generator(size)}`;
};
var generateId = createIdGenerator();
function getErrorMessage(error) {
  if (error == null) {
    return "unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}
function isAbortError(error) {
  return error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError");
}
function loadApiKey({
  apiKey,
  environmentVariableName,
  apiKeyParameterName = "apiKey",
  description
}) {
  if (typeof apiKey === "string") {
    return apiKey;
  }
  if (apiKey != null) {
    throw new LoadAPIKeyError({
      message: `${description} API key must be a string.`
    });
  }
  if (typeof process === "undefined") {
    throw new LoadAPIKeyError({
      message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter. Environment variables is not supported in this environment.`
    });
  }
  apiKey = process.env[environmentVariableName];
  if (apiKey == null) {
    throw new LoadAPIKeyError({
      message: `${description} API key is missing. Pass it using the '${apiKeyParameterName}' parameter or the ${environmentVariableName} environment variable.`
    });
  }
  if (typeof apiKey !== "string") {
    throw new LoadAPIKeyError({
      message: `${description} API key must be a string. The value of the ${environmentVariableName} environment variable is not a string.`
    });
  }
  return apiKey;
}
function loadSetting({
  settingValue,
  environmentVariableName,
  settingName,
  description
}) {
  if (typeof settingValue === "string") {
    return settingValue;
  }
  if (settingValue != null) {
    throw new LoadSettingError({
      message: `${description} setting must be a string.`
    });
  }
  if (typeof process === "undefined") {
    throw new LoadSettingError({
      message: `${description} setting is missing. Pass it using the '${settingName}' parameter. Environment variables is not supported in this environment.`
    });
  }
  settingValue = process.env[environmentVariableName];
  if (settingValue == null) {
    throw new LoadSettingError({
      message: `${description} setting is missing. Pass it using the '${settingName}' parameter or the ${environmentVariableName} environment variable.`
    });
  }
  if (typeof settingValue !== "string") {
    throw new LoadSettingError({
      message: `${description} setting must be a string. The value of the ${environmentVariableName} environment variable is not a string.`
    });
  }
  return settingValue;
}
var validatorSymbol = Symbol.for("vercel.ai.validator");
function validator(validate) {
  return { [validatorSymbol]: true, validate };
}
function isValidator(value) {
  return typeof value === "object" && value !== null && validatorSymbol in value && value[validatorSymbol] === true && "validate" in value;
}
function asValidator(value) {
  return isValidator(value) ? value : zodValidator(value);
}
function zodValidator(zodSchema2) {
  return validator((value) => {
    const result2 = zodSchema2.safeParse(value);
    return result2.success ? { success: true, value: result2.data } : { success: false, error: result2.error };
  });
}
function validateTypes({
  value,
  schema: inputSchema
}) {
  const result2 = safeValidateTypes({ value, schema: inputSchema });
  if (!result2.success) {
    throw TypeValidationError.wrap({ value, cause: result2.error });
  }
  return result2.value;
}
function safeValidateTypes({
  value,
  schema: schema2
}) {
  const validator2 = asValidator(schema2);
  try {
    if (validator2.validate == null) {
      return { success: true, value };
    }
    const result2 = validator2.validate(value);
    if (result2.success) {
      return result2;
    }
    return {
      success: false,
      error: TypeValidationError.wrap({ value, cause: result2.error })
    };
  } catch (error) {
    return {
      success: false,
      error: TypeValidationError.wrap({ value, cause: error })
    };
  }
}
function parseJSON({
  text,
  schema: schema2
}) {
  try {
    const value = SecureJSON.parse(text);
    if (schema2 == null) {
      return value;
    }
    return validateTypes({ value, schema: schema2 });
  } catch (error) {
    if (JSONParseError.isJSONParseError(error) || TypeValidationError.isTypeValidationError(error)) {
      throw error;
    }
    throw new JSONParseError({ text, cause: error });
  }
}
function safeParseJSON({
  text,
  schema: schema2
}) {
  try {
    const value = SecureJSON.parse(text);
    if (schema2 == null) {
      return {
        success: true,
        value
      };
    }
    return safeValidateTypes({ value, schema: schema2 });
  } catch (error) {
    return {
      success: false,
      error: JSONParseError.isJSONParseError(error) ? error : new JSONParseError({ text, cause: error })
    };
  }
}
function isParsableJson(input) {
  try {
    SecureJSON.parse(input);
    return true;
  } catch (e) {
    return false;
  }
}
function removeUndefinedEntries(record) {
  return Object.fromEntries(
    Object.entries(record).filter(([_key, value]) => value != null)
  );
}
var getOriginalFetch = () => globalThis.fetch;
var postJsonToApi = async ({
  url,
  headers,
  body,
  failedResponseHandler,
  successfulResponseHandler,
  abortSignal,
  fetch: fetch2
}) => postToApi({
  url,
  headers: {
    "Content-Type": "application/json",
    ...headers
  },
  body: {
    content: JSON.stringify(body),
    values: body
  },
  failedResponseHandler,
  successfulResponseHandler,
  abortSignal,
  fetch: fetch2
});
var postToApi = async ({
  url,
  headers = {},
  body,
  successfulResponseHandler,
  failedResponseHandler,
  abortSignal,
  fetch: fetch2 = getOriginalFetch()
}) => {
  try {
    const response = await fetch2(url, {
      method: "POST",
      headers: removeUndefinedEntries(headers),
      body: body.content,
      signal: abortSignal
    });
    const responseHeaders = extractResponseHeaders(response);
    if (!response.ok) {
      let errorInformation;
      try {
        errorInformation = await failedResponseHandler({
          response,
          url,
          requestBodyValues: body.values
        });
      } catch (error) {
        if (isAbortError(error) || APICallError.isAPICallError(error)) {
          throw error;
        }
        throw new APICallError({
          message: "Failed to process error response",
          cause: error,
          statusCode: response.status,
          url,
          responseHeaders,
          requestBodyValues: body.values
        });
      }
      throw errorInformation.value;
    }
    try {
      return await successfulResponseHandler({
        response,
        url,
        requestBodyValues: body.values
      });
    } catch (error) {
      if (error instanceof Error) {
        if (isAbortError(error) || APICallError.isAPICallError(error)) {
          throw error;
        }
      }
      throw new APICallError({
        message: "Failed to process successful response",
        cause: error,
        statusCode: response.status,
        url,
        responseHeaders,
        requestBodyValues: body.values
      });
    }
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }
    if (error instanceof TypeError && error.message === "fetch failed") {
      const cause = error.cause;
      if (cause != null) {
        throw new APICallError({
          message: `Cannot connect to API: ${cause.message}`,
          cause,
          url,
          requestBodyValues: body.values,
          isRetryable: true
          // retry when network error
        });
      }
    }
    throw error;
  }
};
var createJsonErrorResponseHandler = ({
  errorSchema,
  errorToMessage,
  isRetryable
}) => async ({ response, url, requestBodyValues }) => {
  const responseBody = await response.text();
  const responseHeaders = extractResponseHeaders(response);
  if (responseBody.trim() === "") {
    return {
      responseHeaders,
      value: new APICallError({
        message: response.statusText,
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response)
      })
    };
  }
  try {
    const parsedError = parseJSON({
      text: responseBody,
      schema: errorSchema
    });
    return {
      responseHeaders,
      value: new APICallError({
        message: errorToMessage(parsedError),
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        data: parsedError,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response, parsedError)
      })
    };
  } catch (parseError) {
    return {
      responseHeaders,
      value: new APICallError({
        message: response.statusText,
        url,
        requestBodyValues,
        statusCode: response.status,
        responseHeaders,
        responseBody,
        isRetryable: isRetryable == null ? void 0 : isRetryable(response)
      })
    };
  }
};
var createEventSourceResponseHandler = (chunkSchema2) => async ({ response }) => {
  const responseHeaders = extractResponseHeaders(response);
  if (response.body == null) {
    throw new EmptyResponseBodyError({});
  }
  return {
    responseHeaders,
    value: response.body.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream()).pipeThrough(
      new TransformStream({
        transform({ data }, controller) {
          if (data === "[DONE]") {
            return;
          }
          controller.enqueue(
            safeParseJSON({
              text: data,
              schema: chunkSchema2
            })
          );
        }
      })
    )
  };
};
var createJsonResponseHandler = (responseSchema2) => async ({ response, url, requestBodyValues }) => {
  const responseBody = await response.text();
  const parsedResult = safeParseJSON({
    text: responseBody,
    schema: responseSchema2
  });
  const responseHeaders = extractResponseHeaders(response);
  if (!parsedResult.success) {
    throw new APICallError({
      message: "Invalid JSON response",
      cause: parsedResult.error,
      statusCode: response.status,
      responseHeaders,
      responseBody,
      url,
      requestBodyValues
    });
  }
  return {
    responseHeaders,
    value: parsedResult.value
  };
};
var { btoa: btoa$1, atob: atob$1 } = globalThis;
function convertBase64ToUint8Array(base64String) {
  const base64Url = base64String.replace(/-/g, "+").replace(/_/g, "/");
  const latin1string = atob$1(base64Url);
  return Uint8Array.from(latin1string, (byte) => byte.codePointAt(0));
}
function convertUint8ArrayToBase64(array) {
  let latin1string = "";
  for (let i = 0; i < array.length; i++) {
    latin1string += String.fromCodePoint(array[i]);
  }
  return btoa$1(latin1string);
}
function withoutTrailingSlash(url) {
  return url == null ? void 0 : url.replace(/\/$/, "");
}
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
const getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
const ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
const quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
class ZodError extends Error {
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  get errors() {
    return this.issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
const errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
let overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
const makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
const EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
const INVALID = Object.freeze({
  status: "aborted"
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
function __classPrivateFieldGet(receiver, state, kind, f2) {
  if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f2) {
  if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return state.set(receiver, value), value;
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
var _ZodEnum_cache, _ZodNativeEnum_cache;
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
const handleResult = (ctx, result2) => {
  if (isValid(result2)) {
    return { success: true, data: result2.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    var _a15, _b2;
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: (_a15 = message !== null && message !== void 0 ? message : required_error) !== null && _a15 !== void 0 ? _a15 : ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: (_b2 = message !== null && message !== void 0 ? message : invalid_type_error) !== null && _b2 !== void 0 ? _b2 : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
class ZodType {
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result2 = this._parse(input);
    if (isAsync(result2)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result2;
  }
  _parseAsync(input) {
    const result2 = this._parse(input);
    return Promise.resolve(result2);
  }
  parse(data, params) {
    const result2 = this.safeParse(data, params);
    if (result2.success)
      return result2.data;
    throw result2.error;
  }
  safeParse(data, params) {
    var _a15;
    const ctx = {
      common: {
        issues: [],
        async: (_a15 = params === null || params === void 0 ? void 0 : params.async) !== null && _a15 !== void 0 ? _a15 : false,
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result2 = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result2);
  }
  async parseAsync(data, params) {
    const result2 = await this.safeParseAsync(data, params);
    if (result2.success)
      return result2.data;
    throw result2.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
        async: true
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result2 = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result2);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result2 = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result2 instanceof Promise) {
        return result2.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result2) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this, this._def);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex$1;
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args2) {
  let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
  if (args2.precision) {
    regex = `${regex}\\.\\d{${args2.precision}}`;
  } else if (args2.precision == null) {
    regex = `${regex}(\\.\\d+)?`;
  }
  return regex;
}
function timeRegex(args2) {
  return new RegExp(`^${timeRegexSource(args2)}$`);
}
function datetimeRegex(args2) {
  let regex = `${dateRegexSource}T${timeRegexSource(args2)}`;
  const opts = [];
  opts.push(args2.local ? `Z?` : `Z`);
  if (args2.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex$1) {
          emojiRegex$1 = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex$1.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a15) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  ip(options2) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options2) });
  }
  datetime(options2) {
    var _a15, _b2;
    if (typeof options2 === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options2
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options2 === null || options2 === void 0 ? void 0 : options2.precision) === "undefined" ? null : options2 === null || options2 === void 0 ? void 0 : options2.precision,
      offset: (_a15 = options2 === null || options2 === void 0 ? void 0 : options2.offset) !== null && _a15 !== void 0 ? _a15 : false,
      local: (_b2 = options2 === null || options2 === void 0 ? void 0 : options2.local) !== null && _b2 !== void 0 ? _b2 : false,
      ...errorUtil.errToObj(options2 === null || options2 === void 0 ? void 0 : options2.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options2) {
    if (typeof options2 === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options2
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof (options2 === null || options2 === void 0 ? void 0 : options2.precision) === "undefined" ? null : options2 === null || options2 === void 0 ? void 0 : options2.precision,
      ...errorUtil.errToObj(options2 === null || options2 === void 0 ? void 0 : options2.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options2) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options2 === null || options2 === void 0 ? void 0 : options2.position,
      ...errorUtil.errToObj(options2 === null || options2 === void 0 ? void 0 : options2.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  var _a15;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a15 = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a15 !== void 0 ? _a15 : false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = BigInt(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  var _a15;
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a15 = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a15 !== void 0 ? _a15 : false,
    ...processCreateParams(params)
  });
};
class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result3) => {
        return ParseStatus.mergeArray(status, result3);
      });
    }
    const result2 = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result2);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema2, params) => {
  return new ZodArray({
    type: schema2,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema2) {
  if (schema2 instanceof ZodObject) {
    const newShape = {};
    for (const key in schema2.shape) {
      const fieldSchema = schema2.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema2._def,
      shape: () => newShape
    });
  } else if (schema2 instanceof ZodArray) {
    return new ZodArray({
      ...schema2._def,
      type: deepPartialify(schema2.element)
    });
  } else if (schema2 instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema2.unwrap()));
  } else if (schema2 instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema2.unwrap()));
  } else if (schema2 instanceof ZodTuple) {
    return ZodTuple.create(schema2.items.map((item) => deepPartialify(item)));
  } else {
    return schema2;
  }
}
class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    return this._cached = { shape, keys };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a15, _b2, _c2, _d;
          const defaultError = (_c2 = (_b2 = (_a15 = this._def).errorMap) === null || _b2 === void 0 ? void 0 : _b2.call(_a15, issue, ctx).message) !== null && _c2 !== void 0 ? _c2 : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema2) {
    return this.augment({ [key]: schema2 });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index2) {
    return new ZodObject({
      ...this._def,
      catchall: index2
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options2 = this._def.options;
    function handleResults(results) {
      for (const result2 of results) {
        if (result2.result.status === "valid") {
          return result2.result;
        }
      }
      for (const result2 of results) {
        if (result2.result.status === "dirty") {
          ctx.common.issues.push(...result2.ctx.common.issues);
          return result2.result;
        }
      }
      const unionErrors = results.map((result2) => new ZodError(result2.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options2.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options2) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result2 = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result2.status === "valid") {
          return result2;
        } else if (result2.status === "dirty" && !dirty) {
          dirty = { result: result2, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
const getDiscriminator = (type2) => {
  if (type2 instanceof ZodLazy) {
    return getDiscriminator(type2.schema);
  } else if (type2 instanceof ZodEffects) {
    return getDiscriminator(type2.innerType());
  } else if (type2 instanceof ZodLiteral) {
    return [type2.value];
  } else if (type2 instanceof ZodEnum) {
    return type2.options;
  } else if (type2 instanceof ZodNativeEnum) {
    return util.objectValues(type2.enum);
  } else if (type2 instanceof ZodDefault) {
    return getDiscriminator(type2._def.innerType);
  } else if (type2 instanceof ZodUndefined) {
    return [void 0];
  } else if (type2 instanceof ZodNull) {
    return [null];
  } else if (type2 instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type2.unwrap())];
  } else if (type2 instanceof ZodNullable) {
    return [null, ...getDiscriminator(type2.unwrap())];
  } else if (type2 instanceof ZodBranded) {
    return getDiscriminator(type2.unwrap());
  } else if (type2 instanceof ZodReadonly) {
    return getDiscriminator(type2.unwrap());
  } else if (type2 instanceof ZodCatch) {
    return getDiscriminator(type2._def.innerType);
  } else {
    return [];
  }
};
class ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options2, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type2 of options2) {
      const discriminatorValues = getDiscriminator(type2.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type2);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options: options2,
      optionsMap,
      ...processCreateParams(params)
    });
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index2 = 0; index2 < a.length; index2++) {
      const itemA = a[index2];
      const itemB = b[index2];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema2 = this._def.items[itemIndex] || this._def.rest;
      if (!schema2)
        return null;
      return schema2._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
class ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
}
class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index2) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index2, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index2, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
class ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args2, error) {
      return makeIssue({
        data: args2,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args2) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args2, params).catch((e) => {
          error.addIssue(makeArgsIssue(args2, e));
          throw error;
        });
        const result2 = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result2, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result2, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args2) {
        const parsedArgs = me._def.args.safeParse(args2, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args2, parsedArgs.error)]);
        }
        const result2 = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result2, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result2, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args2, returns, params) {
    return new ZodFunction({
      args: args2 ? args2 : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
}
class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
class ZodEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodEnum_cache.set(this, void 0);
  }
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache)) {
      __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values));
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache).has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
_ZodEnum_cache = /* @__PURE__ */ new WeakMap();
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodNativeEnum_cache.set(this, void 0);
  }
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache)) {
      __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)));
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache).has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
_ZodNativeEnum_cache = /* @__PURE__ */ new WeakMap();
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema2, params) => {
  return new ZodPromise({
    type: schema2,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result2 = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result2.status === "aborted")
            return INVALID;
          if (result2.status === "dirty")
            return DIRTY(result2.value);
          if (status.value === "dirty")
            return DIRTY(result2.value);
          return result2;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result2 = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result2.status === "aborted")
          return INVALID;
        if (result2.status === "dirty")
          return DIRTY(result2.value);
        if (status.value === "dirty")
          return DIRTY(result2.value);
        return result2;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result2 = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result2);
        }
        if (result2 instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result2 = effect.transform(base.value, checkCtx);
        if (result2 instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result2 };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result2) => ({ status: status.value, value: result2 }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema2, effect, params) => {
  return new ZodEffects({
    schema: schema2,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema2, params) => {
  return new ZodEffects({
    schema: schema2,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type2, params) => {
  return new ZodOptional({
    innerType: type2,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type2, params) => {
  return new ZodNullable({
    innerType: type2,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type2, params) => {
  return new ZodDefault({
    innerType: type2,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result2 = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result2)) {
      return result2.then((result3) => {
        return {
          status: "valid",
          value: result3.status === "valid" ? result3.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result2.status === "valid" ? result2.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type2, params) => {
  return new ZodCatch({
    innerType: type2,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
const BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}
class ZodReadonly extends ZodType {
  _parse(input) {
    const result2 = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result2) ? result2.then((data) => freeze(data)) : freeze(result2);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type2, params) => {
  return new ZodReadonly({
    innerType: type2,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function custom(check, params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a15, _b2;
      if (!check(data)) {
        const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
        const _fatal = (_b2 = (_a15 = p.fatal) !== null && _a15 !== void 0 ? _a15 : fatal) !== null && _b2 !== void 0 ? _b2 : true;
        const p2 = typeof p === "string" ? { message: p } : p;
        ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
      }
    });
  return ZodAny.create();
}
const late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
const stringType = ZodString.create;
const numberType = ZodNumber.create;
const nanType = ZodNaN.create;
const bigIntType = ZodBigInt.create;
const booleanType = ZodBoolean.create;
const dateType = ZodDate.create;
const symbolType = ZodSymbol.create;
const undefinedType = ZodUndefined.create;
const nullType = ZodNull.create;
const anyType = ZodAny.create;
const unknownType = ZodUnknown.create;
const neverType = ZodNever.create;
const voidType = ZodVoid.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const strictObjectType = ZodObject.strictCreate;
const unionType = ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
const intersectionType = ZodIntersection.create;
const tupleType = ZodTuple.create;
const recordType = ZodRecord.create;
const mapType = ZodMap.create;
const setType = ZodSet.create;
const functionType = ZodFunction.create;
const lazyType = ZodLazy.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
const nativeEnumType = ZodNativeEnum.create;
const promiseType = ZodPromise.create;
const effectsType = ZodEffects.create;
const optionalType = ZodOptional.create;
const nullableType = ZodNullable.create;
const preprocessType = ZodEffects.createWithPreprocess;
const pipelineType = ZodPipeline.create;
const ostring = () => stringType().optional();
const onumber = () => numberType().optional();
const oboolean = () => booleanType().optional();
const coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
const NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  datetimeRegex,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  ZodReadonly,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});
var anthropicErrorDataSchema = z.object({
  type: z.literal("error"),
  error: z.object({
    type: z.string(),
    message: z.string()
  })
});
var anthropicFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: anthropicErrorDataSchema,
  errorToMessage: (data) => data.error.message
});
function convertToAnthropicMessagesPrompt({
  prompt: prompt2,
  cacheControl: isCacheControlEnabled
}) {
  var _a15, _b2, _c2, _d;
  const betas = /* @__PURE__ */ new Set();
  const blocks = groupIntoBlocks(prompt2);
  let system = void 0;
  const messages = [];
  function getCacheControl(providerMetadata) {
    var _a22;
    if (isCacheControlEnabled === false) {
      return void 0;
    }
    const anthropic2 = providerMetadata == null ? void 0 : providerMetadata.anthropic;
    const cacheControlValue = (_a22 = anthropic2 == null ? void 0 : anthropic2.cacheControl) != null ? _a22 : anthropic2 == null ? void 0 : anthropic2.cache_control;
    return cacheControlValue;
  }
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const isLastBlock = i === blocks.length - 1;
    const type2 = block.type;
    switch (type2) {
      case "system": {
        if (system != null) {
          throw new UnsupportedFunctionalityError({
            functionality: "Multiple system messages that are separated by user/assistant messages"
          });
        }
        system = block.messages.map(({ content, providerMetadata }) => ({
          type: "text",
          text: content,
          cache_control: getCacheControl(providerMetadata)
        }));
        break;
      }
      case "user": {
        const anthropicContent = [];
        for (const message of block.messages) {
          const { role, content } = message;
          switch (role) {
            case "user": {
              for (let j = 0; j < content.length; j++) {
                const part = content[j];
                const isLastPart = j === content.length - 1;
                const cacheControl = (_a15 = getCacheControl(part.providerMetadata)) != null ? _a15 : isLastPart ? getCacheControl(message.providerMetadata) : void 0;
                switch (part.type) {
                  case "text": {
                    anthropicContent.push({
                      type: "text",
                      text: part.text,
                      cache_control: cacheControl
                    });
                    break;
                  }
                  case "image": {
                    if (part.image instanceof URL) {
                      throw new UnsupportedFunctionalityError({
                        functionality: "Image URLs in user messages"
                      });
                    }
                    anthropicContent.push({
                      type: "image",
                      source: {
                        type: "base64",
                        media_type: (_b2 = part.mimeType) != null ? _b2 : "image/jpeg",
                        data: convertUint8ArrayToBase64(part.image)
                      },
                      cache_control: cacheControl
                    });
                    break;
                  }
                  case "file": {
                    if (part.data instanceof URL) {
                      throw new UnsupportedFunctionalityError({
                        functionality: "Image URLs in user messages"
                      });
                    }
                    if (part.mimeType !== "application/pdf") {
                      throw new UnsupportedFunctionalityError({
                        functionality: "Non-PDF files in user messages"
                      });
                    }
                    betas.add("pdfs-2024-09-25");
                    anthropicContent.push({
                      type: "document",
                      source: {
                        type: "base64",
                        media_type: "application/pdf",
                        data: part.data
                      },
                      cache_control: cacheControl
                    });
                    break;
                  }
                }
              }
              break;
            }
            case "tool": {
              for (let i2 = 0; i2 < content.length; i2++) {
                const part = content[i2];
                const isLastPart = i2 === content.length - 1;
                const cacheControl = (_c2 = getCacheControl(part.providerMetadata)) != null ? _c2 : isLastPart ? getCacheControl(message.providerMetadata) : void 0;
                const toolResultContent = part.content != null ? part.content.map((part2) => {
                  var _a22;
                  switch (part2.type) {
                    case "text":
                      return {
                        type: "text",
                        text: part2.text,
                        cache_control: void 0
                      };
                    case "image":
                      return {
                        type: "image",
                        source: {
                          type: "base64",
                          media_type: (_a22 = part2.mimeType) != null ? _a22 : "image/jpeg",
                          data: part2.data
                        },
                        cache_control: void 0
                      };
                  }
                }) : JSON.stringify(part.result);
                anthropicContent.push({
                  type: "tool_result",
                  tool_use_id: part.toolCallId,
                  content: toolResultContent,
                  is_error: part.isError,
                  cache_control: cacheControl
                });
              }
              break;
            }
            default: {
              const _exhaustiveCheck = role;
              throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
            }
          }
        }
        messages.push({ role: "user", content: anthropicContent });
        break;
      }
      case "assistant": {
        const anthropicContent = [];
        for (let j = 0; j < block.messages.length; j++) {
          const message = block.messages[j];
          const isLastMessage = j === block.messages.length - 1;
          const { content } = message;
          for (let k = 0; k < content.length; k++) {
            const part = content[k];
            const isLastContentPart = k === content.length - 1;
            const cacheControl = (_d = getCacheControl(part.providerMetadata)) != null ? _d : isLastContentPart ? getCacheControl(message.providerMetadata) : void 0;
            switch (part.type) {
              case "text": {
                anthropicContent.push({
                  type: "text",
                  text: (
                    // trim the last text part if it's the last message in the block
                    // because Anthropic does not allow trailing whitespace
                    // in pre-filled assistant responses
                    isLastBlock && isLastMessage && isLastContentPart ? part.text.trim() : part.text
                  ),
                  cache_control: cacheControl
                });
                break;
              }
              case "tool-call": {
                anthropicContent.push({
                  type: "tool_use",
                  id: part.toolCallId,
                  name: part.toolName,
                  input: part.args,
                  cache_control: cacheControl
                });
                break;
              }
            }
          }
        }
        messages.push({ role: "assistant", content: anthropicContent });
        break;
      }
      default: {
        const _exhaustiveCheck = type2;
        throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
      }
    }
  }
  return {
    prompt: { system, messages },
    betas
  };
}
function groupIntoBlocks(prompt2) {
  const blocks = [];
  let currentBlock = void 0;
  for (const message of prompt2) {
    const { role } = message;
    switch (role) {
      case "system": {
        if ((currentBlock == null ? void 0 : currentBlock.type) !== "system") {
          currentBlock = { type: "system", messages: [] };
          blocks.push(currentBlock);
        }
        currentBlock.messages.push(message);
        break;
      }
      case "assistant": {
        if ((currentBlock == null ? void 0 : currentBlock.type) !== "assistant") {
          currentBlock = { type: "assistant", messages: [] };
          blocks.push(currentBlock);
        }
        currentBlock.messages.push(message);
        break;
      }
      case "user": {
        if ((currentBlock == null ? void 0 : currentBlock.type) !== "user") {
          currentBlock = { type: "user", messages: [] };
          blocks.push(currentBlock);
        }
        currentBlock.messages.push(message);
        break;
      }
      case "tool": {
        if ((currentBlock == null ? void 0 : currentBlock.type) !== "user") {
          currentBlock = { type: "user", messages: [] };
          blocks.push(currentBlock);
        }
        currentBlock.messages.push(message);
        break;
      }
      default: {
        const _exhaustiveCheck = role;
        throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
      }
    }
  }
  return blocks;
}
function mapAnthropicStopReason(finishReason) {
  switch (finishReason) {
    case "end_turn":
    case "stop_sequence":
      return "stop";
    case "tool_use":
      return "tool-calls";
    case "max_tokens":
      return "length";
    default:
      return "unknown";
  }
}
function prepareTools$5(mode) {
  var _a15;
  const tools2 = ((_a15 = mode.tools) == null ? void 0 : _a15.length) ? mode.tools : void 0;
  const toolWarnings = [];
  const betas = /* @__PURE__ */ new Set();
  if (tools2 == null) {
    return { tools: void 0, tool_choice: void 0, toolWarnings, betas };
  }
  const anthropicTools2 = [];
  for (const tool2 of tools2) {
    switch (tool2.type) {
      case "function":
        anthropicTools2.push({
          name: tool2.name,
          description: tool2.description,
          input_schema: tool2.parameters
        });
        break;
      case "provider-defined":
        betas.add("computer-use-2024-10-22");
        switch (tool2.id) {
          case "anthropic.computer_20241022":
            anthropicTools2.push({
              name: tool2.name,
              type: "computer_20241022",
              display_width_px: tool2.args.displayWidthPx,
              display_height_px: tool2.args.displayHeightPx,
              display_number: tool2.args.displayNumber
            });
            break;
          case "anthropic.text_editor_20241022":
            anthropicTools2.push({
              name: tool2.name,
              type: "text_editor_20241022"
            });
            break;
          case "anthropic.bash_20241022":
            anthropicTools2.push({
              name: tool2.name,
              type: "bash_20241022"
            });
            break;
          default:
            toolWarnings.push({ type: "unsupported-tool", tool: tool2 });
            break;
        }
        break;
      default:
        toolWarnings.push({ type: "unsupported-tool", tool: tool2 });
        break;
    }
  }
  const toolChoice = mode.toolChoice;
  if (toolChoice == null) {
    return {
      tools: anthropicTools2,
      tool_choice: void 0,
      toolWarnings,
      betas
    };
  }
  const type2 = toolChoice.type;
  switch (type2) {
    case "auto":
      return {
        tools: anthropicTools2,
        tool_choice: { type: "auto" },
        toolWarnings,
        betas
      };
    case "required":
      return {
        tools: anthropicTools2,
        tool_choice: { type: "any" },
        toolWarnings,
        betas
      };
    case "none":
      return { tools: void 0, tool_choice: void 0, toolWarnings, betas };
    case "tool":
      return {
        tools: anthropicTools2,
        tool_choice: { type: "tool", name: toolChoice.toolName },
        toolWarnings,
        betas
      };
    default: {
      const _exhaustiveCheck = type2;
      throw new UnsupportedFunctionalityError({
        functionality: `Unsupported tool choice type: ${_exhaustiveCheck}`
      });
    }
  }
}
var AnthropicMessagesLanguageModel = class {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.defaultObjectGenerationMode = "tool";
    this.supportsImageUrls = false;
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  async getArgs({
    mode,
    prompt: prompt2,
    maxTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    stopSequences,
    responseFormat,
    seed
  }) {
    var _a15;
    const type2 = mode.type;
    const warnings = [];
    if (frequencyPenalty != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "frequencyPenalty"
      });
    }
    if (presencePenalty != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "presencePenalty"
      });
    }
    if (seed != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "seed"
      });
    }
    if (responseFormat != null && responseFormat.type !== "text") {
      warnings.push({
        type: "unsupported-setting",
        setting: "responseFormat",
        details: "JSON response format is not supported."
      });
    }
    const { prompt: messagesPrompt, betas: messagesBetas } = convertToAnthropicMessagesPrompt({
      prompt: prompt2,
      cacheControl: (_a15 = this.settings.cacheControl) != null ? _a15 : false
    });
    const baseArgs = {
      // model id:
      model: this.modelId,
      // model specific settings:
      top_k: topK != null ? topK : this.settings.topK,
      // standardized settings:
      max_tokens: maxTokens != null ? maxTokens : 4096,
      // 4096: max model output tokens
      temperature,
      top_p: topP,
      stop_sequences: stopSequences,
      // prompt:
      system: messagesPrompt.system,
      messages: messagesPrompt.messages
    };
    switch (type2) {
      case "regular": {
        const {
          tools: tools2,
          tool_choice,
          toolWarnings,
          betas: toolsBetas
        } = prepareTools$5(mode);
        return {
          args: { ...baseArgs, tools: tools2, tool_choice },
          warnings: [...warnings, ...toolWarnings],
          betas: /* @__PURE__ */ new Set([...messagesBetas, ...toolsBetas])
        };
      }
      case "object-json": {
        throw new UnsupportedFunctionalityError({
          functionality: "json-mode object generation"
        });
      }
      case "object-tool": {
        const { name: name14, description, parameters } = mode.tool;
        return {
          args: {
            ...baseArgs,
            tools: [{ name: name14, description, input_schema: parameters }],
            tool_choice: { type: "tool", name: name14 }
          },
          warnings,
          betas: messagesBetas
        };
      }
      default: {
        const _exhaustiveCheck = type2;
        throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
      }
    }
  }
  getHeaders({
    betas,
    headers
  }) {
    if (this.settings.cacheControl) {
      betas.add("prompt-caching-2024-07-31");
    }
    return combineHeaders(
      this.config.headers(),
      betas.size > 0 ? { "anthropic-beta": Array.from(betas).join(",") } : {},
      headers
    );
  }
  async doGenerate(options2) {
    var _a15, _b2, _c2, _d;
    const { args: args2, warnings, betas } = await this.getArgs(options2);
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/messages`,
      headers: this.getHeaders({ betas, headers: options2.headers }),
      body: args2,
      failedResponseHandler: anthropicFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        anthropicMessagesResponseSchema
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { messages: rawPrompt, ...rawSettings } = args2;
    let text = "";
    for (const content of response.content) {
      if (content.type === "text") {
        text += content.text;
      }
    }
    let toolCalls = void 0;
    if (response.content.some((content) => content.type === "tool_use")) {
      toolCalls = [];
      for (const content of response.content) {
        if (content.type === "tool_use") {
          toolCalls.push({
            toolCallType: "function",
            toolCallId: content.id,
            toolName: content.name,
            args: JSON.stringify(content.input)
          });
        }
      }
    }
    return {
      text,
      toolCalls,
      finishReason: mapAnthropicStopReason(response.stop_reason),
      usage: {
        promptTokens: response.usage.input_tokens,
        completionTokens: response.usage.output_tokens
      },
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      response: {
        id: (_a15 = response.id) != null ? _a15 : void 0,
        modelId: (_b2 = response.model) != null ? _b2 : void 0
      },
      warnings,
      providerMetadata: this.settings.cacheControl === true ? {
        anthropic: {
          cacheCreationInputTokens: (_c2 = response.usage.cache_creation_input_tokens) != null ? _c2 : null,
          cacheReadInputTokens: (_d = response.usage.cache_read_input_tokens) != null ? _d : null
        }
      } : void 0,
      request: { body: JSON.stringify(args2) }
    };
  }
  async doStream(options2) {
    const { args: args2, warnings, betas } = await this.getArgs(options2);
    const body = { ...args2, stream: true };
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/messages`,
      headers: this.getHeaders({ betas, headers: options2.headers }),
      body,
      failedResponseHandler: anthropicFailedResponseHandler,
      successfulResponseHandler: createEventSourceResponseHandler(
        anthropicMessagesChunkSchema
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { messages: rawPrompt, ...rawSettings } = args2;
    let finishReason = "unknown";
    const usage = {
      promptTokens: Number.NaN,
      completionTokens: Number.NaN
    };
    const toolCallContentBlocks = {};
    let providerMetadata = void 0;
    const self2 = this;
    return {
      stream: response.pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            var _a15, _b2, _c2, _d;
            if (!chunk.success) {
              controller.enqueue({ type: "error", error: chunk.error });
              return;
            }
            const value = chunk.value;
            switch (value.type) {
              case "ping": {
                return;
              }
              case "content_block_start": {
                const contentBlockType = value.content_block.type;
                switch (contentBlockType) {
                  case "text": {
                    return;
                  }
                  case "tool_use": {
                    toolCallContentBlocks[value.index] = {
                      toolCallId: value.content_block.id,
                      toolName: value.content_block.name,
                      jsonText: ""
                    };
                    return;
                  }
                  default: {
                    const _exhaustiveCheck = contentBlockType;
                    throw new Error(
                      `Unsupported content block type: ${_exhaustiveCheck}`
                    );
                  }
                }
              }
              case "content_block_stop": {
                if (toolCallContentBlocks[value.index] != null) {
                  const contentBlock = toolCallContentBlocks[value.index];
                  controller.enqueue({
                    type: "tool-call",
                    toolCallType: "function",
                    toolCallId: contentBlock.toolCallId,
                    toolName: contentBlock.toolName,
                    args: contentBlock.jsonText
                  });
                  delete toolCallContentBlocks[value.index];
                }
                return;
              }
              case "content_block_delta": {
                const deltaType = value.delta.type;
                switch (deltaType) {
                  case "text_delta": {
                    controller.enqueue({
                      type: "text-delta",
                      textDelta: value.delta.text
                    });
                    return;
                  }
                  case "input_json_delta": {
                    const contentBlock = toolCallContentBlocks[value.index];
                    controller.enqueue({
                      type: "tool-call-delta",
                      toolCallType: "function",
                      toolCallId: contentBlock.toolCallId,
                      toolName: contentBlock.toolName,
                      argsTextDelta: value.delta.partial_json
                    });
                    contentBlock.jsonText += value.delta.partial_json;
                    return;
                  }
                  default: {
                    const _exhaustiveCheck = deltaType;
                    throw new Error(
                      `Unsupported delta type: ${_exhaustiveCheck}`
                    );
                  }
                }
              }
              case "message_start": {
                usage.promptTokens = value.message.usage.input_tokens;
                usage.completionTokens = value.message.usage.output_tokens;
                if (self2.settings.cacheControl === true) {
                  providerMetadata = {
                    anthropic: {
                      cacheCreationInputTokens: (_a15 = value.message.usage.cache_creation_input_tokens) != null ? _a15 : null,
                      cacheReadInputTokens: (_b2 = value.message.usage.cache_read_input_tokens) != null ? _b2 : null
                    }
                  };
                }
                controller.enqueue({
                  type: "response-metadata",
                  id: (_c2 = value.message.id) != null ? _c2 : void 0,
                  modelId: (_d = value.message.model) != null ? _d : void 0
                });
                return;
              }
              case "message_delta": {
                usage.completionTokens = value.usage.output_tokens;
                finishReason = mapAnthropicStopReason(value.delta.stop_reason);
                return;
              }
              case "message_stop": {
                controller.enqueue({
                  type: "finish",
                  finishReason,
                  usage,
                  providerMetadata
                });
                return;
              }
              case "error": {
                controller.enqueue({ type: "error", error: value.error });
                return;
              }
              default: {
                const _exhaustiveCheck = value;
                throw new Error(`Unsupported chunk type: ${_exhaustiveCheck}`);
              }
            }
          }
        })
      ),
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      warnings,
      request: { body: JSON.stringify(body) }
    };
  }
};
var anthropicMessagesResponseSchema = z.object({
  type: z.literal("message"),
  id: z.string().nullish(),
  model: z.string().nullish(),
  content: z.array(
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("text"),
        text: z.string()
      }),
      z.object({
        type: z.literal("tool_use"),
        id: z.string(),
        name: z.string(),
        input: z.unknown()
      })
    ])
  ),
  stop_reason: z.string().nullish(),
  usage: z.object({
    input_tokens: z.number(),
    output_tokens: z.number(),
    cache_creation_input_tokens: z.number().nullish(),
    cache_read_input_tokens: z.number().nullish()
  })
});
var anthropicMessagesChunkSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("message_start"),
    message: z.object({
      id: z.string().nullish(),
      model: z.string().nullish(),
      usage: z.object({
        input_tokens: z.number(),
        output_tokens: z.number(),
        cache_creation_input_tokens: z.number().nullish(),
        cache_read_input_tokens: z.number().nullish()
      })
    })
  }),
  z.object({
    type: z.literal("content_block_start"),
    index: z.number(),
    content_block: z.discriminatedUnion("type", [
      z.object({
        type: z.literal("text"),
        text: z.string()
      }),
      z.object({
        type: z.literal("tool_use"),
        id: z.string(),
        name: z.string()
      })
    ])
  }),
  z.object({
    type: z.literal("content_block_delta"),
    index: z.number(),
    delta: z.discriminatedUnion("type", [
      z.object({
        type: z.literal("input_json_delta"),
        partial_json: z.string()
      }),
      z.object({
        type: z.literal("text_delta"),
        text: z.string()
      })
    ])
  }),
  z.object({
    type: z.literal("content_block_stop"),
    index: z.number()
  }),
  z.object({
    type: z.literal("error"),
    error: z.object({
      type: z.string(),
      message: z.string()
    })
  }),
  z.object({
    type: z.literal("message_delta"),
    delta: z.object({ stop_reason: z.string().nullish() }),
    usage: z.object({ output_tokens: z.number() })
  }),
  z.object({
    type: z.literal("message_stop")
  }),
  z.object({
    type: z.literal("ping")
  })
]);
var Bash20241022Parameters = z.object({
  command: z.string(),
  restart: z.boolean().optional()
});
function bashTool_20241022(options2 = {}) {
  return {
    type: "provider-defined",
    id: "anthropic.bash_20241022",
    args: {},
    parameters: Bash20241022Parameters,
    execute: options2.execute,
    experimental_toToolResultContent: options2.experimental_toToolResultContent
  };
}
var TextEditor20241022Parameters = z.object({
  command: z.enum(["view", "create", "str_replace", "insert", "undo_edit"]),
  path: z.string(),
  file_text: z.string().optional(),
  insert_line: z.number().int().optional(),
  new_str: z.string().optional(),
  old_str: z.string().optional(),
  view_range: z.array(z.number().int()).optional()
});
function textEditorTool_20241022(options2 = {}) {
  return {
    type: "provider-defined",
    id: "anthropic.text_editor_20241022",
    args: {},
    parameters: TextEditor20241022Parameters,
    execute: options2.execute,
    experimental_toToolResultContent: options2.experimental_toToolResultContent
  };
}
var Computer20241022Parameters = z.object({
  action: z.enum([
    "key",
    "type",
    "mouse_move",
    "left_click",
    "left_click_drag",
    "right_click",
    "middle_click",
    "double_click",
    "screenshot",
    "cursor_position"
  ]),
  coordinate: z.array(z.number().int()).optional(),
  text: z.string().optional()
});
function computerTool_20241022(options2) {
  return {
    type: "provider-defined",
    id: "anthropic.computer_20241022",
    args: {
      displayWidthPx: options2.displayWidthPx,
      displayHeightPx: options2.displayHeightPx,
      displayNumber: options2.displayNumber
    },
    parameters: Computer20241022Parameters,
    execute: options2.execute,
    experimental_toToolResultContent: options2.experimental_toToolResultContent
  };
}
var anthropicTools = {
  bash_20241022: bashTool_20241022,
  textEditor_20241022: textEditorTool_20241022,
  computer_20241022: computerTool_20241022
};
function createAnthropic(options2 = {}) {
  var _a15, _b2;
  const baseURL = (_b2 = withoutTrailingSlash((_a15 = options2.baseURL) != null ? _a15 : options2.baseUrl)) != null ? _b2 : "https://api.anthropic.com/v1";
  const getHeaders = () => ({
    "anthropic-version": "2023-06-01",
    "x-api-key": loadApiKey({
      apiKey: options2.apiKey,
      environmentVariableName: "ANTHROPIC_API_KEY",
      description: "Anthropic"
    }),
    ...options2.headers
  });
  const createChatModel = (modelId, settings = {}) => new AnthropicMessagesLanguageModel(modelId, settings, {
    provider: "anthropic.messages",
    baseURL,
    headers: getHeaders,
    fetch: options2.fetch
  });
  const provider = function(modelId, settings) {
    if (new.target) {
      throw new Error(
        "The Anthropic model function cannot be called with the new keyword."
      );
    }
    return createChatModel(modelId, settings);
  };
  provider.languageModel = createChatModel;
  provider.chat = createChatModel;
  provider.messages = createChatModel;
  provider.textEmbeddingModel = (modelId) => {
    throw new NoSuchModelError({ modelId, modelType: "textEmbeddingModel" });
  };
  provider.tools = anthropicTools;
  return provider;
}
createAnthropic();
var cohereErrorDataSchema = z.object({
  message: z.string()
});
var cohereFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: cohereErrorDataSchema,
  errorToMessage: (data) => data.message
});
function convertToCohereChatPrompt(prompt2) {
  const messages = [];
  for (const { role, content } of prompt2) {
    switch (role) {
      case "system": {
        messages.push({ role: "system", content });
        break;
      }
      case "user": {
        messages.push({
          role: "user",
          content: content.map((part) => {
            switch (part.type) {
              case "text": {
                return part.text;
              }
              case "image": {
                throw new UnsupportedFunctionalityError({
                  functionality: "image-part"
                });
              }
            }
          }).join("")
        });
        break;
      }
      case "assistant": {
        let text = "";
        const toolCalls = [];
        for (const part of content) {
          switch (part.type) {
            case "text": {
              text += part.text;
              break;
            }
            case "tool-call": {
              toolCalls.push({
                id: part.toolCallId,
                type: "function",
                function: {
                  name: part.toolName,
                  arguments: JSON.stringify(part.args)
                }
              });
              break;
            }
            default: {
              const _exhaustiveCheck = part;
              throw new Error(`Unsupported part: ${_exhaustiveCheck}`);
            }
          }
        }
        messages.push({
          role: "assistant",
          // note: this is a workaround for a Cohere API bug
          // that requires content to be provided
          // even if there are tool calls
          content: text !== "" ? text : "call tool",
          tool_calls: toolCalls.length > 0 ? toolCalls : void 0
        });
        break;
      }
      case "tool": {
        messages.push(
          ...content.map((toolResult) => ({
            role: "tool",
            content: JSON.stringify(toolResult.result),
            tool_call_id: toolResult.toolCallId
          }))
        );
        break;
      }
      default: {
        const _exhaustiveCheck = role;
        throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
      }
    }
  }
  return messages;
}
function mapCohereFinishReason(finishReason) {
  switch (finishReason) {
    case "COMPLETE":
    case "STOP_SEQUENCE":
      return "stop";
    case "MAX_TOKENS":
      return "length";
    case "ERROR":
    case "ERROR_LIMIT":
      return "error";
    case "ERROR_TOXIC":
      return "content-filter";
    case "USER_CANCEL":
      return "other";
    default:
      return "unknown";
  }
}
function prepareTools$4(mode) {
  var _a15;
  const tools2 = ((_a15 = mode.tools) == null ? void 0 : _a15.length) ? mode.tools : void 0;
  const toolWarnings = [];
  if (tools2 == null) {
    return { tools: void 0, tool_choice: void 0, toolWarnings };
  }
  const cohereTools = [];
  for (const tool2 of tools2) {
    if (tool2.type === "provider-defined") {
      toolWarnings.push({ type: "unsupported-tool", tool: tool2 });
    } else {
      cohereTools.push({
        type: "function",
        function: {
          name: tool2.name,
          description: tool2.description,
          parameters: tool2.parameters
        }
      });
    }
  }
  const toolChoice = mode.toolChoice;
  if (toolChoice == null) {
    return { tools: cohereTools, tool_choice: void 0, toolWarnings };
  }
  const type2 = toolChoice.type;
  switch (type2) {
    case "auto":
      return { tools: cohereTools, tool_choice: type2, toolWarnings };
    case "none":
      return { tools: void 0, tool_choice: "any", toolWarnings };
    case "required":
    case "tool":
      throw new UnsupportedFunctionalityError({
        functionality: `Unsupported tool choice type: ${type2}`
      });
    default: {
      const _exhaustiveCheck = type2;
      throw new UnsupportedFunctionalityError({
        functionality: `Unsupported tool choice type: ${_exhaustiveCheck}`
      });
    }
  }
}
var CohereChatLanguageModel = class {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.defaultObjectGenerationMode = void 0;
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  getArgs({
    mode,
    prompt: prompt2,
    maxTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    stopSequences,
    responseFormat,
    seed
  }) {
    const type2 = mode.type;
    const chatPrompt = convertToCohereChatPrompt(prompt2);
    const baseArgs = {
      // model id:
      model: this.modelId,
      // model specific settings:
      // none
      // standardized settings:
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
      max_tokens: maxTokens,
      temperature,
      p: topP,
      k: topK,
      seed,
      stop_sequences: stopSequences,
      // response format:
      response_format: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? { type: "json_object", schema: responseFormat.schema } : void 0,
      // messages:
      messages: chatPrompt
    };
    switch (type2) {
      case "regular": {
        const { tools: tools2, tool_choice, toolWarnings } = prepareTools$4(mode);
        return {
          ...baseArgs,
          tools: tools2,
          warnings: toolWarnings
        };
      }
      case "object-json": {
        throw new UnsupportedFunctionalityError({
          functionality: "object-json mode"
        });
      }
      case "object-tool": {
        throw new UnsupportedFunctionalityError({
          functionality: "object-tool mode"
        });
      }
      default: {
        const _exhaustiveCheck = type2;
        throw new UnsupportedFunctionalityError({
          functionality: `Unsupported mode: ${_exhaustiveCheck}`
        });
      }
    }
  }
  concatenateMessageText(messages) {
    return messages.filter(
      (message) => "content" in message
    ).map((message) => message.content).join("");
  }
  /*
  Remove `additionalProperties` and `$schema` from the `parameters` object of each tool.
  Though these are part of JSON schema, Cohere chokes if we include them in the request.
  */
  // TODO(shaper): Look at defining a type to simplify the params here and a couple of other places.
  removeJsonSchemaExtras(tools2) {
    return tools2.map((tool2) => {
      if (tool2.type === "function" && tool2.function.parameters && typeof tool2.function.parameters === "object") {
        const { additionalProperties, $schema, ...restParameters } = tool2.function.parameters;
        return {
          ...tool2,
          function: {
            ...tool2.function,
            parameters: restParameters
          }
        };
      }
      return tool2;
    });
  }
  async doGenerate(options2) {
    var _a15, _b2, _c2, _d;
    const { warnings, ...args2 } = this.getArgs(options2);
    args2.tools = args2.tools && this.removeJsonSchemaExtras(args2.tools);
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/chat`,
      headers: combineHeaders(this.config.headers(), options2.headers),
      body: args2,
      failedResponseHandler: cohereFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        cohereChatResponseSchema
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { messages, ...rawSettings } = args2;
    return {
      text: (_c2 = (_b2 = (_a15 = response.message.content) == null ? void 0 : _a15[0]) == null ? void 0 : _b2.text) != null ? _c2 : "",
      toolCalls: response.message.tool_calls ? response.message.tool_calls.map((toolCall) => ({
        toolCallId: toolCall.id,
        toolName: toolCall.function.name,
        args: toolCall.function.arguments,
        toolCallType: "function"
      })) : [],
      finishReason: mapCohereFinishReason(response.finish_reason),
      usage: {
        promptTokens: response.usage.tokens.input_tokens,
        completionTokens: response.usage.tokens.output_tokens
      },
      rawCall: {
        rawPrompt: {
          messages
        },
        rawSettings
      },
      response: {
        id: (_d = response.generation_id) != null ? _d : void 0
      },
      rawResponse: { headers: responseHeaders },
      warnings,
      request: { body: JSON.stringify(args2) }
    };
  }
  async doStream(options2) {
    const { warnings, ...args2 } = this.getArgs(options2);
    args2.tools = args2.tools && this.removeJsonSchemaExtras(args2.tools);
    const body = { ...args2, stream: true };
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/chat`,
      headers: combineHeaders(this.config.headers(), options2.headers),
      body,
      failedResponseHandler: cohereFailedResponseHandler,
      successfulResponseHandler: createEventSourceResponseHandler(
        cohereChatChunkSchema
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { messages, ...rawSettings } = args2;
    let finishReason = "unknown";
    let usage = {
      promptTokens: Number.NaN,
      completionTokens: Number.NaN
    };
    let pendingToolCallDelta = {
      toolCallId: "",
      toolName: "",
      argsTextDelta: ""
    };
    return {
      stream: response.pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            var _a15;
            if (!chunk.success) {
              finishReason = "error";
              controller.enqueue({ type: "error", error: chunk.error });
              return;
            }
            const value = chunk.value;
            const type2 = value.type;
            switch (type2) {
              case "content-delta": {
                controller.enqueue({
                  type: "text-delta",
                  textDelta: value.delta.message.content.text
                });
                return;
              }
              case "tool-call-start": {
                pendingToolCallDelta = {
                  toolCallId: value.delta.message.tool_calls.id,
                  toolName: value.delta.message.tool_calls.function.name,
                  argsTextDelta: value.delta.message.tool_calls.function.arguments
                };
                controller.enqueue({
                  type: "tool-call-delta",
                  toolCallId: pendingToolCallDelta.toolCallId,
                  toolName: pendingToolCallDelta.toolName,
                  toolCallType: "function",
                  argsTextDelta: pendingToolCallDelta.argsTextDelta
                });
                return;
              }
              case "tool-call-delta": {
                pendingToolCallDelta.argsTextDelta += value.delta.message.tool_calls.function.arguments;
                controller.enqueue({
                  type: "tool-call-delta",
                  toolCallId: pendingToolCallDelta.toolCallId,
                  toolName: pendingToolCallDelta.toolName,
                  toolCallType: "function",
                  argsTextDelta: value.delta.message.tool_calls.function.arguments
                });
                return;
              }
              case "tool-call-end": {
                controller.enqueue({
                  type: "tool-call",
                  toolCallId: pendingToolCallDelta.toolCallId,
                  toolName: pendingToolCallDelta.toolName,
                  toolCallType: "function",
                  args: JSON.stringify(
                    JSON.parse(pendingToolCallDelta.argsTextDelta)
                  )
                });
                pendingToolCallDelta = {
                  toolCallId: "",
                  toolName: "",
                  argsTextDelta: ""
                };
                return;
              }
              case "message-start": {
                controller.enqueue({
                  type: "response-metadata",
                  id: (_a15 = value.id) != null ? _a15 : void 0
                });
                return;
              }
              case "message-end": {
                finishReason = mapCohereFinishReason(value.delta.finish_reason);
                const tokens = value.delta.usage.tokens;
                usage = {
                  promptTokens: tokens.input_tokens,
                  completionTokens: tokens.output_tokens
                };
              }
              default: {
                return;
              }
            }
          },
          flush(controller) {
            controller.enqueue({
              type: "finish",
              finishReason,
              usage
            });
          }
        })
      ),
      rawCall: {
        rawPrompt: {
          messages
        },
        rawSettings
      },
      rawResponse: { headers: responseHeaders },
      warnings,
      request: { body: JSON.stringify(body) }
    };
  }
};
var cohereChatResponseSchema = z.object({
  generation_id: z.string().nullish(),
  message: z.object({
    role: z.string(),
    content: z.array(
      z.object({
        type: z.string(),
        text: z.string()
      })
    ).nullish(),
    tool_calls: z.array(
      z.object({
        id: z.string(),
        type: z.literal("function"),
        function: z.object({
          name: z.string(),
          arguments: z.string()
        })
      })
    ).nullish()
  }),
  finish_reason: z.string(),
  usage: z.object({
    billed_units: z.object({
      input_tokens: z.number(),
      output_tokens: z.number()
    }),
    tokens: z.object({
      input_tokens: z.number(),
      output_tokens: z.number()
    })
  })
});
var cohereChatChunkSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("citation-start")
  }),
  z.object({
    type: z.literal("citation-end")
  }),
  z.object({
    type: z.literal("content-start")
  }),
  z.object({
    type: z.literal("content-delta"),
    delta: z.object({
      message: z.object({
        content: z.object({
          text: z.string()
        })
      })
    })
  }),
  z.object({
    type: z.literal("content-end")
  }),
  z.object({
    type: z.literal("message-start"),
    id: z.string().nullish()
  }),
  z.object({
    type: z.literal("message-end"),
    delta: z.object({
      finish_reason: z.string(),
      usage: z.object({
        tokens: z.object({
          input_tokens: z.number(),
          output_tokens: z.number()
        })
      })
    })
  }),
  // https://docs.cohere.com/v2/docs/streaming#tool-use-stream-events-for-tool-calling
  z.object({
    type: z.literal("tool-plan-delta"),
    delta: z.object({
      message: z.object({
        tool_plan: z.string()
      })
    })
  }),
  z.object({
    type: z.literal("tool-call-start"),
    delta: z.object({
      message: z.object({
        tool_calls: z.object({
          id: z.string(),
          type: z.literal("function"),
          function: z.object({
            name: z.string(),
            arguments: z.string()
          })
        })
      })
    })
  }),
  // A single tool call's `arguments` stream in chunks and must be accumulated
  // in a string and so the full tool object info can only be parsed once we see
  // `tool-call-end`.
  z.object({
    type: z.literal("tool-call-delta"),
    delta: z.object({
      message: z.object({
        tool_calls: z.object({
          function: z.object({
            arguments: z.string()
          })
        })
      })
    })
  }),
  z.object({
    type: z.literal("tool-call-end")
  })
]);
var CohereEmbeddingModel = class {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.maxEmbeddingsPerCall = 96;
    this.supportsParallelCalls = true;
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  async doEmbed({
    values,
    headers,
    abortSignal
  }) {
    var _a15;
    if (values.length > this.maxEmbeddingsPerCall) {
      throw new TooManyEmbeddingValuesForCallError({
        provider: this.provider,
        modelId: this.modelId,
        maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
        values
      });
    }
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/embed`,
      headers: combineHeaders(this.config.headers(), headers),
      body: {
        model: this.modelId,
        // TODO(shaper): There are other embedding types. Do we need to support them?
        // For now we only support 'float' embeddings which are also the only ones
        // the Cohere API docs state are supported for all models.
        // https://docs.cohere.com/v2/reference/embed#request.body.embedding_types
        embedding_types: ["float"],
        texts: values,
        input_type: (_a15 = this.settings.inputType) != null ? _a15 : "search_query",
        truncate: this.settings.truncate
      },
      failedResponseHandler: cohereFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        cohereTextEmbeddingResponseSchema
      ),
      abortSignal,
      fetch: this.config.fetch
    });
    return {
      embeddings: response.embeddings.float,
      usage: { tokens: response.meta.billed_units.input_tokens },
      rawResponse: { headers: responseHeaders }
    };
  }
};
var cohereTextEmbeddingResponseSchema = z.object({
  embeddings: z.object({
    float: z.array(z.array(z.number()))
  }),
  meta: z.object({
    billed_units: z.object({
      input_tokens: z.number()
    })
  })
});
function createCohere(options2 = {}) {
  var _a15;
  const baseURL = (_a15 = withoutTrailingSlash(options2.baseURL)) != null ? _a15 : "https://api.cohere.com/v2";
  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options2.apiKey,
      environmentVariableName: "COHERE_API_KEY",
      description: "Cohere"
    })}`,
    ...options2.headers
  });
  const createChatModel = (modelId, settings = {}) => new CohereChatLanguageModel(modelId, settings, {
    provider: "cohere.chat",
    baseURL,
    headers: getHeaders,
    fetch: options2.fetch
  });
  const createTextEmbeddingModel = (modelId, settings = {}) => new CohereEmbeddingModel(modelId, settings, {
    provider: "cohere.textEmbedding",
    baseURL,
    headers: getHeaders,
    fetch: options2.fetch
  });
  const provider = function(modelId, settings) {
    if (new.target) {
      throw new Error(
        "The Cohere model function cannot be called with the new keyword."
      );
    }
    return createChatModel(modelId, settings);
  };
  provider.languageModel = createChatModel;
  provider.embedding = createTextEmbeddingModel;
  provider.textEmbeddingModel = createTextEmbeddingModel;
  return provider;
}
createCohere();
function convertJSONSchemaToOpenAPISchema(jsonSchema2) {
  if (isEmptyObjectSchema(jsonSchema2)) {
    return void 0;
  }
  if (typeof jsonSchema2 === "boolean") {
    return { type: "boolean", properties: {} };
  }
  const {
    type: type2,
    description,
    required: required2,
    properties,
    items,
    allOf,
    anyOf,
    oneOf,
    format,
    const: constValue,
    minLength
  } = jsonSchema2;
  const result2 = {};
  if (description)
    result2.description = description;
  if (required2)
    result2.required = required2;
  if (format)
    result2.format = format;
  if (constValue !== void 0) {
    result2.enum = [constValue];
  }
  if (type2) {
    if (Array.isArray(type2)) {
      if (type2.includes("null")) {
        result2.type = type2.filter((t) => t !== "null")[0];
        result2.nullable = true;
      } else {
        result2.type = type2;
      }
    } else if (type2 === "null") {
      result2.type = "null";
    } else {
      result2.type = type2;
    }
  }
  if (properties != null) {
    result2.properties = Object.entries(properties).reduce(
      (acc, [key, value]) => {
        acc[key] = convertJSONSchemaToOpenAPISchema(value);
        return acc;
      },
      {}
    );
  }
  if (items) {
    result2.items = Array.isArray(items) ? items.map(convertJSONSchemaToOpenAPISchema) : convertJSONSchemaToOpenAPISchema(items);
  }
  if (allOf) {
    result2.allOf = allOf.map(convertJSONSchemaToOpenAPISchema);
  }
  if (anyOf) {
    result2.anyOf = anyOf.map(convertJSONSchemaToOpenAPISchema);
  }
  if (oneOf) {
    result2.oneOf = oneOf.map(convertJSONSchemaToOpenAPISchema);
  }
  if (minLength !== void 0)
    result2.minLength = minLength;
  return result2;
}
function isEmptyObjectSchema(jsonSchema2) {
  return jsonSchema2 != null && typeof jsonSchema2 === "object" && jsonSchema2.type === "object" && (jsonSchema2.properties == null || Object.keys(jsonSchema2.properties).length === 0);
}
function convertToGoogleGenerativeAIMessages(prompt2) {
  var _a15, _b2;
  const systemInstructionParts = [];
  const contents = [];
  let systemMessagesAllowed = true;
  for (const { role, content } of prompt2) {
    switch (role) {
      case "system": {
        if (!systemMessagesAllowed) {
          throw new UnsupportedFunctionalityError({
            functionality: "system messages are only supported at the beginning of the conversation"
          });
        }
        systemInstructionParts.push({ text: content });
        break;
      }
      case "user": {
        systemMessagesAllowed = false;
        const parts = [];
        for (const part of content) {
          switch (part.type) {
            case "text": {
              parts.push({ text: part.text });
              break;
            }
            case "image": {
              parts.push(
                part.image instanceof URL ? {
                  fileData: {
                    mimeType: (_a15 = part.mimeType) != null ? _a15 : "image/jpeg",
                    fileUri: part.image.toString()
                  }
                } : {
                  inlineData: {
                    mimeType: (_b2 = part.mimeType) != null ? _b2 : "image/jpeg",
                    data: convertUint8ArrayToBase64(part.image)
                  }
                }
              );
              break;
            }
            case "file": {
              parts.push(
                part.data instanceof URL ? {
                  fileData: {
                    mimeType: part.mimeType,
                    fileUri: part.data.toString()
                  }
                } : {
                  inlineData: {
                    mimeType: part.mimeType,
                    data: part.data
                  }
                }
              );
              break;
            }
            default: {
              const _exhaustiveCheck = part;
              throw new UnsupportedFunctionalityError({
                functionality: `prompt part: ${_exhaustiveCheck}`
              });
            }
          }
        }
        contents.push({ role: "user", parts });
        break;
      }
      case "assistant": {
        systemMessagesAllowed = false;
        contents.push({
          role: "model",
          parts: content.map((part) => {
            switch (part.type) {
              case "text": {
                return part.text.length === 0 ? void 0 : { text: part.text };
              }
              case "tool-call": {
                return {
                  functionCall: {
                    name: part.toolName,
                    args: part.args
                  }
                };
              }
            }
          }).filter(
            (part) => part !== void 0
          )
        });
        break;
      }
      case "tool": {
        systemMessagesAllowed = false;
        contents.push({
          role: "user",
          parts: content.map((part) => ({
            functionResponse: {
              name: part.toolName,
              response: part.result
            }
          }))
        });
        break;
      }
      default: {
        const _exhaustiveCheck = role;
        throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
      }
    }
  }
  return {
    systemInstruction: systemInstructionParts.length > 0 ? { parts: systemInstructionParts } : void 0,
    contents
  };
}
function getModelPath(modelId) {
  return modelId.includes("/") ? modelId : `models/${modelId}`;
}
var googleErrorDataSchema = z.object({
  error: z.object({
    code: z.number().nullable(),
    message: z.string(),
    status: z.string()
  })
});
var googleFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: googleErrorDataSchema,
  errorToMessage: (data) => data.error.message
});
function prepareTools$3(mode) {
  var _a15, _b2;
  const tools2 = ((_a15 = mode.tools) == null ? void 0 : _a15.length) ? mode.tools : void 0;
  const toolWarnings = [];
  if (tools2 == null) {
    return { tools: void 0, toolConfig: void 0, toolWarnings };
  }
  const functionDeclarations = [];
  for (const tool2 of tools2) {
    if (tool2.type === "provider-defined") {
      toolWarnings.push({ type: "unsupported-tool", tool: tool2 });
    } else {
      functionDeclarations.push({
        name: tool2.name,
        description: (_b2 = tool2.description) != null ? _b2 : "",
        parameters: convertJSONSchemaToOpenAPISchema(tool2.parameters)
      });
    }
  }
  const toolChoice = mode.toolChoice;
  if (toolChoice == null) {
    return {
      tools: { functionDeclarations },
      toolConfig: void 0,
      toolWarnings
    };
  }
  const type2 = toolChoice.type;
  switch (type2) {
    case "auto":
      return {
        tools: { functionDeclarations },
        toolConfig: { functionCallingConfig: { mode: "AUTO" } },
        toolWarnings
      };
    case "none":
      return {
        tools: { functionDeclarations },
        toolConfig: { functionCallingConfig: { mode: "NONE" } },
        toolWarnings
      };
    case "required":
      return {
        tools: { functionDeclarations },
        toolConfig: { functionCallingConfig: { mode: "ANY" } },
        toolWarnings
      };
    case "tool":
      return {
        tools: { functionDeclarations },
        toolConfig: {
          functionCallingConfig: {
            mode: "ANY",
            allowedFunctionNames: [toolChoice.toolName]
          }
        },
        toolWarnings
      };
    default: {
      const _exhaustiveCheck = type2;
      throw new UnsupportedFunctionalityError({
        functionality: `Unsupported tool choice type: ${_exhaustiveCheck}`
      });
    }
  }
}
function mapGoogleGenerativeAIFinishReason({
  finishReason,
  hasToolCalls
}) {
  switch (finishReason) {
    case "STOP":
      return hasToolCalls ? "tool-calls" : "stop";
    case "MAX_TOKENS":
      return "length";
    case "RECITATION":
    case "SAFETY":
      return "content-filter";
    case "FINISH_REASON_UNSPECIFIED":
    case "OTHER":
      return "other";
    default:
      return "unknown";
  }
}
var GoogleGenerativeAILanguageModel = class {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.defaultObjectGenerationMode = "json";
    this.supportsImageUrls = false;
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get supportsObjectGeneration() {
    return this.settings.structuredOutputs !== false;
  }
  get provider() {
    return this.config.provider;
  }
  async getArgs({
    mode,
    prompt: prompt2,
    maxTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    stopSequences,
    responseFormat,
    seed
  }) {
    var _a15;
    const type2 = mode.type;
    const warnings = [];
    if (seed != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "seed"
      });
    }
    const generationConfig = {
      // standardized settings:
      maxOutputTokens: maxTokens,
      temperature,
      topK: topK != null ? topK : this.settings.topK,
      topP,
      frequencyPenalty,
      presencePenalty,
      stopSequences,
      // response format:
      responseMimeType: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? "application/json" : void 0,
      responseSchema: (responseFormat == null ? void 0 : responseFormat.type) === "json" && responseFormat.schema != null && // Google GenAI does not support all OpenAPI Schema features,
      // so this is needed as an escape hatch:
      this.supportsObjectGeneration ? convertJSONSchemaToOpenAPISchema(responseFormat.schema) : void 0
    };
    const { contents, systemInstruction } = convertToGoogleGenerativeAIMessages(prompt2);
    switch (type2) {
      case "regular": {
        const { tools: tools2, toolConfig, toolWarnings } = prepareTools$3(mode);
        return {
          args: {
            generationConfig,
            contents,
            systemInstruction,
            safetySettings: this.settings.safetySettings,
            tools: tools2,
            toolConfig,
            cachedContent: this.settings.cachedContent
          },
          warnings: [...warnings, ...toolWarnings]
        };
      }
      case "object-json": {
        return {
          args: {
            generationConfig: {
              ...generationConfig,
              responseMimeType: "application/json",
              responseSchema: mode.schema != null && // Google GenAI does not support all OpenAPI Schema features,
              // so this is needed as an escape hatch:
              this.supportsObjectGeneration ? convertJSONSchemaToOpenAPISchema(mode.schema) : void 0
            },
            contents,
            systemInstruction,
            safetySettings: this.settings.safetySettings,
            cachedContent: this.settings.cachedContent
          },
          warnings
        };
      }
      case "object-tool": {
        return {
          args: {
            generationConfig,
            contents,
            tools: {
              functionDeclarations: [
                {
                  name: mode.tool.name,
                  description: (_a15 = mode.tool.description) != null ? _a15 : "",
                  parameters: convertJSONSchemaToOpenAPISchema(
                    mode.tool.parameters
                  )
                }
              ]
            },
            toolConfig: { functionCallingConfig: { mode: "ANY" } },
            safetySettings: this.settings.safetySettings,
            cachedContent: this.settings.cachedContent
          },
          warnings
        };
      }
      default: {
        const _exhaustiveCheck = type2;
        throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
      }
    }
  }
  supportsUrl(url) {
    return url.toString().startsWith("https://generativelanguage.googleapis.com/v1beta/files/");
  }
  async doGenerate(options2) {
    var _a15, _b2;
    const { args: args2, warnings } = await this.getArgs(options2);
    const body = JSON.stringify(args2);
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/${getModelPath(
        this.modelId
      )}:generateContent`,
      headers: combineHeaders(this.config.headers(), options2.headers),
      body: args2,
      failedResponseHandler: googleFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(responseSchema),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { contents: rawPrompt, ...rawSettings } = args2;
    const candidate = response.candidates[0];
    const toolCalls = getToolCallsFromParts({
      parts: candidate.content.parts,
      generateId: this.config.generateId
    });
    const usageMetadata = response.usageMetadata;
    return {
      text: getTextFromParts(candidate.content.parts),
      toolCalls,
      finishReason: mapGoogleGenerativeAIFinishReason({
        finishReason: candidate.finishReason,
        hasToolCalls: toolCalls != null && toolCalls.length > 0
      }),
      usage: {
        promptTokens: (_a15 = usageMetadata == null ? void 0 : usageMetadata.promptTokenCount) != null ? _a15 : NaN,
        completionTokens: (_b2 = usageMetadata == null ? void 0 : usageMetadata.candidatesTokenCount) != null ? _b2 : NaN
      },
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      warnings,
      request: { body }
    };
  }
  async doStream(options2) {
    const { args: args2, warnings } = await this.getArgs(options2);
    const body = JSON.stringify(args2);
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/${getModelPath(
        this.modelId
      )}:streamGenerateContent?alt=sse`,
      headers: combineHeaders(this.config.headers(), options2.headers),
      body: args2,
      failedResponseHandler: googleFailedResponseHandler,
      successfulResponseHandler: createEventSourceResponseHandler(chunkSchema),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { contents: rawPrompt, ...rawSettings } = args2;
    let finishReason = "unknown";
    let usage = {
      promptTokens: Number.NaN,
      completionTokens: Number.NaN
    };
    const generateId3 = this.config.generateId;
    let hasToolCalls = false;
    return {
      stream: response.pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            var _a15, _b2;
            if (!chunk.success) {
              controller.enqueue({ type: "error", error: chunk.error });
              return;
            }
            const value = chunk.value;
            const candidate = value.candidates[0];
            if ((candidate == null ? void 0 : candidate.finishReason) != null) {
              finishReason = mapGoogleGenerativeAIFinishReason({
                finishReason: candidate.finishReason,
                hasToolCalls
              });
            }
            const usageMetadata = value.usageMetadata;
            if (usageMetadata != null) {
              usage = {
                promptTokens: (_a15 = usageMetadata.promptTokenCount) != null ? _a15 : NaN,
                completionTokens: (_b2 = usageMetadata.candidatesTokenCount) != null ? _b2 : NaN
              };
            }
            const content = candidate.content;
            if (content == null) {
              return;
            }
            const deltaText = getTextFromParts(content.parts);
            if (deltaText != null) {
              controller.enqueue({
                type: "text-delta",
                textDelta: deltaText
              });
            }
            const toolCallDeltas = getToolCallsFromParts({
              parts: content.parts,
              generateId: generateId3
            });
            if (toolCallDeltas != null) {
              for (const toolCall of toolCallDeltas) {
                controller.enqueue({
                  type: "tool-call-delta",
                  toolCallType: "function",
                  toolCallId: toolCall.toolCallId,
                  toolName: toolCall.toolName,
                  argsTextDelta: toolCall.args
                });
                controller.enqueue({
                  type: "tool-call",
                  toolCallType: "function",
                  toolCallId: toolCall.toolCallId,
                  toolName: toolCall.toolName,
                  args: toolCall.args
                });
                hasToolCalls = true;
              }
            }
          },
          flush(controller) {
            controller.enqueue({ type: "finish", finishReason, usage });
          }
        })
      ),
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      warnings,
      request: { body }
    };
  }
};
function getToolCallsFromParts({
  parts,
  generateId: generateId3
}) {
  const functionCallParts = parts.filter(
    (part) => "functionCall" in part
  );
  return functionCallParts.length === 0 ? void 0 : functionCallParts.map((part) => ({
    toolCallType: "function",
    toolCallId: generateId3(),
    toolName: part.functionCall.name,
    args: JSON.stringify(part.functionCall.args)
  }));
}
function getTextFromParts(parts) {
  const textParts = parts.filter((part) => "text" in part);
  return textParts.length === 0 ? void 0 : textParts.map((part) => part.text).join("");
}
var contentSchema = z.object({
  role: z.string(),
  parts: z.array(
    z.union([
      z.object({
        text: z.string()
      }),
      z.object({
        functionCall: z.object({
          name: z.string(),
          args: z.unknown()
        })
      })
    ])
  )
});
var responseSchema = z.object({
  candidates: z.array(
    z.object({
      content: contentSchema,
      finishReason: z.string().optional()
    })
  ),
  usageMetadata: z.object({
    promptTokenCount: z.number(),
    candidatesTokenCount: z.number().nullish(),
    totalTokenCount: z.number()
  }).optional()
});
var chunkSchema = z.object({
  candidates: z.array(
    z.object({
      content: contentSchema.optional(),
      finishReason: z.string().optional()
    })
  ),
  usageMetadata: z.object({
    promptTokenCount: z.number(),
    candidatesTokenCount: z.number().nullish(),
    totalTokenCount: z.number()
  }).optional()
});
var GoogleGenerativeAIEmbeddingModel = class {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  get maxEmbeddingsPerCall() {
    return 2048;
  }
  get supportsParallelCalls() {
    return true;
  }
  async doEmbed({
    values,
    headers,
    abortSignal
  }) {
    if (values.length > this.maxEmbeddingsPerCall) {
      throw new TooManyEmbeddingValuesForCallError({
        provider: this.provider,
        modelId: this.modelId,
        maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
        values
      });
    }
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/models/${this.modelId}:batchEmbedContents`,
      headers: combineHeaders(this.config.headers(), headers),
      body: {
        requests: values.map((value) => ({
          model: `models/${this.modelId}`,
          content: { role: "user", parts: [{ text: value }] },
          outputDimensionality: this.settings.outputDimensionality
        }))
      },
      failedResponseHandler: googleFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        googleGenerativeAITextEmbeddingResponseSchema
      ),
      abortSignal,
      fetch: this.config.fetch
    });
    return {
      embeddings: response.embeddings.map((item) => item.values),
      usage: void 0,
      rawResponse: { headers: responseHeaders }
    };
  }
};
var googleGenerativeAITextEmbeddingResponseSchema = z.object({
  embeddings: z.array(z.object({ values: z.array(z.number()) }))
});
function createGoogleGenerativeAI(options2 = {}) {
  var _a15, _b2;
  const baseURL = (_b2 = withoutTrailingSlash((_a15 = options2.baseURL) != null ? _a15 : options2.baseUrl)) != null ? _b2 : "https://generativelanguage.googleapis.com/v1beta";
  const getHeaders = () => ({
    "x-goog-api-key": loadApiKey({
      apiKey: options2.apiKey,
      environmentVariableName: "GOOGLE_GENERATIVE_AI_API_KEY",
      description: "Google Generative AI"
    }),
    ...options2.headers
  });
  const createChatModel = (modelId, settings = {}) => {
    var _a22;
    return new GoogleGenerativeAILanguageModel(modelId, settings, {
      provider: "google.generative-ai",
      baseURL,
      headers: getHeaders,
      generateId: (_a22 = options2.generateId) != null ? _a22 : generateId,
      fetch: options2.fetch
    });
  };
  const createEmbeddingModel = (modelId, settings = {}) => new GoogleGenerativeAIEmbeddingModel(modelId, settings, {
    provider: "google.generative-ai",
    baseURL,
    headers: getHeaders,
    fetch: options2.fetch
  });
  const provider = function(modelId, settings) {
    if (new.target) {
      throw new Error(
        "The Google Generative AI model function cannot be called with the new keyword."
      );
    }
    return createChatModel(modelId, settings);
  };
  provider.languageModel = createChatModel;
  provider.chat = createChatModel;
  provider.generativeAI = createChatModel;
  provider.embedding = createEmbeddingModel;
  provider.textEmbedding = createEmbeddingModel;
  provider.textEmbeddingModel = createEmbeddingModel;
  return provider;
}
createGoogleGenerativeAI();
function convertToOpenAIChatMessages$1({
  prompt: prompt2,
  useLegacyFunctionCalling = false
}) {
  const messages = [];
  for (const { role, content } of prompt2) {
    switch (role) {
      case "system": {
        messages.push({ role: "system", content });
        break;
      }
      case "user": {
        if (content.length === 1 && content[0].type === "text") {
          messages.push({ role: "user", content: content[0].text });
          break;
        }
        messages.push({
          role: "user",
          content: content.map((part) => {
            var _a15, _b2, _c2;
            switch (part.type) {
              case "text": {
                return { type: "text", text: part.text };
              }
              case "image": {
                return {
                  type: "image_url",
                  image_url: {
                    url: part.image instanceof URL ? part.image.toString() : `data:${(_a15 = part.mimeType) != null ? _a15 : "image/jpeg"};base64,${convertUint8ArrayToBase64(part.image)}`,
                    // OpenAI specific extension: image detail
                    detail: (_c2 = (_b2 = part.providerMetadata) == null ? void 0 : _b2.openai) == null ? void 0 : _c2.imageDetail
                  }
                };
              }
              case "file": {
                if (part.data instanceof URL) {
                  throw new UnsupportedFunctionalityError({
                    functionality: "'File content parts with URL data' functionality not supported."
                  });
                }
                switch (part.mimeType) {
                  case "audio/wav": {
                    return {
                      type: "input_audio",
                      input_audio: { data: part.data, format: "wav" }
                    };
                  }
                  case "audio/mp3":
                  case "audio/mpeg": {
                    return {
                      type: "input_audio",
                      input_audio: { data: part.data, format: "mp3" }
                    };
                  }
                  default: {
                    throw new UnsupportedFunctionalityError({
                      functionality: `File content part type ${part.mimeType} in user messages`
                    });
                  }
                }
              }
            }
          })
        });
        break;
      }
      case "assistant": {
        let text = "";
        const toolCalls = [];
        for (const part of content) {
          switch (part.type) {
            case "text": {
              text += part.text;
              break;
            }
            case "tool-call": {
              toolCalls.push({
                id: part.toolCallId,
                type: "function",
                function: {
                  name: part.toolName,
                  arguments: JSON.stringify(part.args)
                }
              });
              break;
            }
            default: {
              const _exhaustiveCheck = part;
              throw new Error(`Unsupported part: ${_exhaustiveCheck}`);
            }
          }
        }
        if (useLegacyFunctionCalling) {
          if (toolCalls.length > 1) {
            throw new UnsupportedFunctionalityError({
              functionality: "useLegacyFunctionCalling with multiple tool calls in one message"
            });
          }
          messages.push({
            role: "assistant",
            content: text,
            function_call: toolCalls.length > 0 ? toolCalls[0].function : void 0
          });
        } else {
          messages.push({
            role: "assistant",
            content: text,
            tool_calls: toolCalls.length > 0 ? toolCalls : void 0
          });
        }
        break;
      }
      case "tool": {
        for (const toolResponse of content) {
          if (useLegacyFunctionCalling) {
            messages.push({
              role: "function",
              name: toolResponse.toolName,
              content: JSON.stringify(toolResponse.result)
            });
          } else {
            messages.push({
              role: "tool",
              tool_call_id: toolResponse.toolCallId,
              content: JSON.stringify(toolResponse.result)
            });
          }
        }
        break;
      }
      default: {
        const _exhaustiveCheck = role;
        throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
      }
    }
  }
  return messages;
}
function mapOpenAIChatLogProbsOutput$1(logprobs) {
  var _a15, _b2;
  return (_b2 = (_a15 = logprobs == null ? void 0 : logprobs.content) == null ? void 0 : _a15.map(({ token, logprob, top_logprobs }) => ({
    token,
    logprob,
    topLogprobs: top_logprobs ? top_logprobs.map(({ token: token2, logprob: logprob2 }) => ({
      token: token2,
      logprob: logprob2
    })) : []
  }))) != null ? _b2 : void 0;
}
function mapOpenAIFinishReason$1(finishReason) {
  switch (finishReason) {
    case "stop":
      return "stop";
    case "length":
      return "length";
    case "content_filter":
      return "content-filter";
    case "function_call":
    case "tool_calls":
      return "tool-calls";
    default:
      return "unknown";
  }
}
var openAIErrorDataSchema$1 = z.object({
  error: z.object({
    message: z.string(),
    // The additional information below is handled loosely to support
    // OpenAI-compatible providers that have slightly different error
    // responses:
    type: z.string().nullish(),
    param: z.any().nullish(),
    code: z.union([z.string(), z.number()]).nullish()
  })
});
var openaiFailedResponseHandler$1 = createJsonErrorResponseHandler({
  errorSchema: openAIErrorDataSchema$1,
  errorToMessage: (data) => data.error.message
});
function getResponseMetadata$2({
  id,
  model,
  created
}) {
  return {
    id: id != null ? id : void 0,
    modelId: model != null ? model : void 0,
    timestamp: created != null ? new Date(created * 1e3) : void 0
  };
}
function prepareTools$2({
  mode,
  useLegacyFunctionCalling = false,
  structuredOutputs = false
}) {
  var _a15;
  const tools2 = ((_a15 = mode.tools) == null ? void 0 : _a15.length) ? mode.tools : void 0;
  const toolWarnings = [];
  if (tools2 == null) {
    return { tools: void 0, tool_choice: void 0, toolWarnings };
  }
  const toolChoice = mode.toolChoice;
  if (useLegacyFunctionCalling) {
    const openaiFunctions = [];
    for (const tool2 of tools2) {
      if (tool2.type === "provider-defined") {
        toolWarnings.push({ type: "unsupported-tool", tool: tool2 });
      } else {
        openaiFunctions.push({
          name: tool2.name,
          description: tool2.description,
          parameters: tool2.parameters
        });
      }
    }
    if (toolChoice == null) {
      return {
        functions: openaiFunctions,
        function_call: void 0,
        toolWarnings
      };
    }
    const type22 = toolChoice.type;
    switch (type22) {
      case "auto":
      case "none":
      case void 0:
        return {
          functions: openaiFunctions,
          function_call: void 0,
          toolWarnings
        };
      case "required":
        throw new UnsupportedFunctionalityError({
          functionality: "useLegacyFunctionCalling and toolChoice: required"
        });
      default:
        return {
          functions: openaiFunctions,
          function_call: { name: toolChoice.toolName },
          toolWarnings
        };
    }
  }
  const openaiTools = [];
  for (const tool2 of tools2) {
    if (tool2.type === "provider-defined") {
      toolWarnings.push({ type: "unsupported-tool", tool: tool2 });
    } else {
      openaiTools.push({
        type: "function",
        function: {
          name: tool2.name,
          description: tool2.description,
          parameters: tool2.parameters,
          strict: structuredOutputs === true ? true : void 0
        }
      });
    }
  }
  if (toolChoice == null) {
    return { tools: openaiTools, tool_choice: void 0, toolWarnings };
  }
  const type2 = toolChoice.type;
  switch (type2) {
    case "auto":
    case "none":
    case "required":
      return { tools: openaiTools, tool_choice: type2, toolWarnings };
    case "tool":
      return {
        tools: openaiTools,
        tool_choice: {
          type: "function",
          function: {
            name: toolChoice.toolName
          }
        },
        toolWarnings
      };
    default: {
      const _exhaustiveCheck = type2;
      throw new UnsupportedFunctionalityError({
        functionality: `Unsupported tool choice type: ${_exhaustiveCheck}`
      });
    }
  }
}
var OpenAIChatLanguageModel$1 = class OpenAIChatLanguageModel2 {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get supportsStructuredOutputs() {
    return this.settings.structuredOutputs === true;
  }
  get defaultObjectGenerationMode() {
    if (isAudioModel$1(this.modelId)) {
      return "tool";
    }
    return this.supportsStructuredOutputs ? "json" : "tool";
  }
  get provider() {
    return this.config.provider;
  }
  get supportsImageUrls() {
    return !this.settings.downloadImages;
  }
  getArgs({
    mode,
    prompt: prompt2,
    maxTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    stopSequences,
    responseFormat,
    seed,
    providerMetadata
  }) {
    var _a15, _b2, _c2, _d, _e, _f, _g, _h, _i;
    const type2 = mode.type;
    const warnings = [];
    if (topK != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "topK"
      });
    }
    if (responseFormat != null && responseFormat.type === "json" && responseFormat.schema != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "responseFormat",
        details: "JSON response format schema is not supported"
      });
    }
    const useLegacyFunctionCalling = this.settings.useLegacyFunctionCalling;
    if (useLegacyFunctionCalling && this.settings.parallelToolCalls === true) {
      throw new UnsupportedFunctionalityError({
        functionality: "useLegacyFunctionCalling with parallelToolCalls"
      });
    }
    if (useLegacyFunctionCalling && this.settings.structuredOutputs === true) {
      throw new UnsupportedFunctionalityError({
        functionality: "structuredOutputs with useLegacyFunctionCalling"
      });
    }
    const baseArgs = {
      // model id:
      model: this.modelId,
      // model specific settings:
      logit_bias: this.settings.logitBias,
      logprobs: this.settings.logprobs === true || typeof this.settings.logprobs === "number" ? true : void 0,
      top_logprobs: typeof this.settings.logprobs === "number" ? this.settings.logprobs : typeof this.settings.logprobs === "boolean" ? this.settings.logprobs ? 0 : void 0 : void 0,
      user: this.settings.user,
      parallel_tool_calls: this.settings.parallelToolCalls,
      // standardized settings:
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
      stop: stopSequences,
      seed,
      // openai specific settings:
      max_completion_tokens: (_b2 = (_a15 = providerMetadata == null ? void 0 : providerMetadata.openai) == null ? void 0 : _a15.maxCompletionTokens) != null ? _b2 : void 0,
      store: (_d = (_c2 = providerMetadata == null ? void 0 : providerMetadata.openai) == null ? void 0 : _c2.store) != null ? _d : void 0,
      metadata: (_f = (_e = providerMetadata == null ? void 0 : providerMetadata.openai) == null ? void 0 : _e.metadata) != null ? _f : void 0,
      prediction: (_h = (_g = providerMetadata == null ? void 0 : providerMetadata.openai) == null ? void 0 : _g.prediction) != null ? _h : void 0,
      // response format:
      response_format: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? { type: "json_object" } : void 0,
      // messages:
      messages: convertToOpenAIChatMessages$1({
        prompt: prompt2,
        useLegacyFunctionCalling
      })
    };
    if (isReasoningModel$1(this.modelId)) {
      baseArgs.temperature = void 0;
      baseArgs.top_p = void 0;
      baseArgs.frequency_penalty = void 0;
      baseArgs.presence_penalty = void 0;
    }
    switch (type2) {
      case "regular": {
        const { tools: tools2, tool_choice, functions, function_call, toolWarnings } = prepareTools$2({
          mode,
          useLegacyFunctionCalling,
          structuredOutputs: this.settings.structuredOutputs
        });
        return {
          args: {
            ...baseArgs,
            tools: tools2,
            tool_choice,
            functions,
            function_call
          },
          warnings: [...warnings, ...toolWarnings]
        };
      }
      case "object-json": {
        return {
          args: {
            ...baseArgs,
            response_format: this.settings.structuredOutputs === true && mode.schema != null ? {
              type: "json_schema",
              json_schema: {
                schema: mode.schema,
                strict: true,
                name: (_i = mode.name) != null ? _i : "response",
                description: mode.description
              }
            } : { type: "json_object" }
          },
          warnings
        };
      }
      case "object-tool": {
        return {
          args: useLegacyFunctionCalling ? {
            ...baseArgs,
            function_call: {
              name: mode.tool.name
            },
            functions: [
              {
                name: mode.tool.name,
                description: mode.tool.description,
                parameters: mode.tool.parameters
              }
            ]
          } : {
            ...baseArgs,
            tool_choice: {
              type: "function",
              function: { name: mode.tool.name }
            },
            tools: [
              {
                type: "function",
                function: {
                  name: mode.tool.name,
                  description: mode.tool.description,
                  parameters: mode.tool.parameters,
                  strict: this.settings.structuredOutputs === true ? true : void 0
                }
              }
            ]
          },
          warnings
        };
      }
      default: {
        const _exhaustiveCheck = type2;
        throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
      }
    }
  }
  async doGenerate(options2) {
    var _a15, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    const { args: body, warnings } = this.getArgs(options2);
    const { responseHeaders, value: response } = await postJsonToApi({
      url: this.config.url({
        path: "/chat/completions",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), options2.headers),
      body,
      failedResponseHandler: openaiFailedResponseHandler$1,
      successfulResponseHandler: createJsonResponseHandler(
        openAIChatResponseSchema$1
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { messages: rawPrompt, ...rawSettings } = body;
    const choice = response.choices[0];
    let providerMetadata;
    if (((_b2 = (_a15 = response.usage) == null ? void 0 : _a15.completion_tokens_details) == null ? void 0 : _b2.reasoning_tokens) != null || ((_d = (_c2 = response.usage) == null ? void 0 : _c2.prompt_tokens_details) == null ? void 0 : _d.cached_tokens) != null) {
      providerMetadata = { openai: {} };
      if (((_f = (_e = response.usage) == null ? void 0 : _e.completion_tokens_details) == null ? void 0 : _f.reasoning_tokens) != null) {
        providerMetadata.openai.reasoningTokens = (_h = (_g = response.usage) == null ? void 0 : _g.completion_tokens_details) == null ? void 0 : _h.reasoning_tokens;
      }
      if (((_j = (_i = response.usage) == null ? void 0 : _i.prompt_tokens_details) == null ? void 0 : _j.cached_tokens) != null) {
        providerMetadata.openai.cachedPromptTokens = (_l = (_k = response.usage) == null ? void 0 : _k.prompt_tokens_details) == null ? void 0 : _l.cached_tokens;
      }
    }
    return {
      text: (_m = choice.message.content) != null ? _m : void 0,
      toolCalls: this.settings.useLegacyFunctionCalling && choice.message.function_call ? [
        {
          toolCallType: "function",
          toolCallId: generateId(),
          toolName: choice.message.function_call.name,
          args: choice.message.function_call.arguments
        }
      ] : (_n = choice.message.tool_calls) == null ? void 0 : _n.map((toolCall) => {
        var _a22;
        return {
          toolCallType: "function",
          toolCallId: (_a22 = toolCall.id) != null ? _a22 : generateId(),
          toolName: toolCall.function.name,
          args: toolCall.function.arguments
        };
      }),
      finishReason: mapOpenAIFinishReason$1(choice.finish_reason),
      usage: {
        promptTokens: (_p = (_o = response.usage) == null ? void 0 : _o.prompt_tokens) != null ? _p : NaN,
        completionTokens: (_r = (_q = response.usage) == null ? void 0 : _q.completion_tokens) != null ? _r : NaN
      },
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      request: { body: JSON.stringify(body) },
      response: getResponseMetadata$2(response),
      warnings,
      logprobs: mapOpenAIChatLogProbsOutput$1(choice.logprobs),
      providerMetadata
    };
  }
  async doStream(options2) {
    if (isReasoningModel$1(this.modelId)) {
      const result2 = await this.doGenerate(options2);
      const simulatedStream = new ReadableStream({
        start(controller) {
          controller.enqueue({ type: "response-metadata", ...result2.response });
          if (result2.text) {
            controller.enqueue({
              type: "text-delta",
              textDelta: result2.text
            });
          }
          if (result2.toolCalls) {
            for (const toolCall of result2.toolCalls) {
              controller.enqueue({
                type: "tool-call",
                ...toolCall
              });
            }
          }
          controller.enqueue({
            type: "finish",
            finishReason: result2.finishReason,
            usage: result2.usage,
            logprobs: result2.logprobs,
            providerMetadata: result2.providerMetadata
          });
          controller.close();
        }
      });
      return {
        stream: simulatedStream,
        rawCall: result2.rawCall,
        rawResponse: result2.rawResponse,
        warnings: result2.warnings
      };
    }
    const { args: args2, warnings } = this.getArgs(options2);
    const body = {
      ...args2,
      stream: true,
      // only include stream_options when in strict compatibility mode:
      stream_options: this.config.compatibility === "strict" ? { include_usage: true } : void 0
    };
    const { responseHeaders, value: response } = await postJsonToApi({
      url: this.config.url({
        path: "/chat/completions",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), options2.headers),
      body,
      failedResponseHandler: openaiFailedResponseHandler$1,
      successfulResponseHandler: createEventSourceResponseHandler(
        openaiChatChunkSchema$1
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { messages: rawPrompt, ...rawSettings } = args2;
    const toolCalls = [];
    let finishReason = "unknown";
    let usage = {
      promptTokens: void 0,
      completionTokens: void 0
    };
    let logprobs;
    let isFirstChunk = true;
    const { useLegacyFunctionCalling } = this.settings;
    let providerMetadata;
    return {
      stream: response.pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            var _a15, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
            if (!chunk.success) {
              finishReason = "error";
              controller.enqueue({ type: "error", error: chunk.error });
              return;
            }
            const value = chunk.value;
            if ("error" in value) {
              finishReason = "error";
              controller.enqueue({ type: "error", error: value.error });
              return;
            }
            if (isFirstChunk) {
              isFirstChunk = false;
              controller.enqueue({
                type: "response-metadata",
                ...getResponseMetadata$2(value)
              });
            }
            if (value.usage != null) {
              usage = {
                promptTokens: (_a15 = value.usage.prompt_tokens) != null ? _a15 : void 0,
                completionTokens: (_b2 = value.usage.completion_tokens) != null ? _b2 : void 0
              };
              if (((_c2 = value.usage.prompt_tokens_details) == null ? void 0 : _c2.cached_tokens) != null) {
                providerMetadata = {
                  openai: {
                    cachedPromptTokens: (_d = value.usage.prompt_tokens_details) == null ? void 0 : _d.cached_tokens
                  }
                };
              }
            }
            const choice = value.choices[0];
            if ((choice == null ? void 0 : choice.finish_reason) != null) {
              finishReason = mapOpenAIFinishReason$1(choice.finish_reason);
            }
            if ((choice == null ? void 0 : choice.delta) == null) {
              return;
            }
            const delta = choice.delta;
            if (delta.content != null) {
              controller.enqueue({
                type: "text-delta",
                textDelta: delta.content
              });
            }
            const mappedLogprobs = mapOpenAIChatLogProbsOutput$1(
              choice == null ? void 0 : choice.logprobs
            );
            if (mappedLogprobs == null ? void 0 : mappedLogprobs.length) {
              if (logprobs === void 0) logprobs = [];
              logprobs.push(...mappedLogprobs);
            }
            const mappedToolCalls = useLegacyFunctionCalling && delta.function_call != null ? [
              {
                type: "function",
                id: generateId(),
                function: delta.function_call,
                index: 0
              }
            ] : delta.tool_calls;
            if (mappedToolCalls != null) {
              for (const toolCallDelta of mappedToolCalls) {
                const index2 = toolCallDelta.index;
                if (toolCalls[index2] == null) {
                  if (toolCallDelta.type !== "function") {
                    throw new InvalidResponseDataError({
                      data: toolCallDelta,
                      message: `Expected 'function' type.`
                    });
                  }
                  if (toolCallDelta.id == null) {
                    throw new InvalidResponseDataError({
                      data: toolCallDelta,
                      message: `Expected 'id' to be a string.`
                    });
                  }
                  if (((_e = toolCallDelta.function) == null ? void 0 : _e.name) == null) {
                    throw new InvalidResponseDataError({
                      data: toolCallDelta,
                      message: `Expected 'function.name' to be a string.`
                    });
                  }
                  toolCalls[index2] = {
                    id: toolCallDelta.id,
                    type: "function",
                    function: {
                      name: toolCallDelta.function.name,
                      arguments: (_f = toolCallDelta.function.arguments) != null ? _f : ""
                    }
                  };
                  const toolCall2 = toolCalls[index2];
                  if (((_g = toolCall2.function) == null ? void 0 : _g.name) != null && ((_h = toolCall2.function) == null ? void 0 : _h.arguments) != null) {
                    if (toolCall2.function.arguments.length > 0) {
                      controller.enqueue({
                        type: "tool-call-delta",
                        toolCallType: "function",
                        toolCallId: toolCall2.id,
                        toolName: toolCall2.function.name,
                        argsTextDelta: toolCall2.function.arguments
                      });
                    }
                    if (isParsableJson(toolCall2.function.arguments)) {
                      controller.enqueue({
                        type: "tool-call",
                        toolCallType: "function",
                        toolCallId: (_i = toolCall2.id) != null ? _i : generateId(),
                        toolName: toolCall2.function.name,
                        args: toolCall2.function.arguments
                      });
                    }
                  }
                  continue;
                }
                const toolCall = toolCalls[index2];
                if (((_j = toolCallDelta.function) == null ? void 0 : _j.arguments) != null) {
                  toolCall.function.arguments += (_l = (_k = toolCallDelta.function) == null ? void 0 : _k.arguments) != null ? _l : "";
                }
                controller.enqueue({
                  type: "tool-call-delta",
                  toolCallType: "function",
                  toolCallId: toolCall.id,
                  toolName: toolCall.function.name,
                  argsTextDelta: (_m = toolCallDelta.function.arguments) != null ? _m : ""
                });
                if (((_n = toolCall.function) == null ? void 0 : _n.name) != null && ((_o = toolCall.function) == null ? void 0 : _o.arguments) != null && isParsableJson(toolCall.function.arguments)) {
                  controller.enqueue({
                    type: "tool-call",
                    toolCallType: "function",
                    toolCallId: (_p = toolCall.id) != null ? _p : generateId(),
                    toolName: toolCall.function.name,
                    args: toolCall.function.arguments
                  });
                }
              }
            }
          },
          flush(controller) {
            var _a15, _b2;
            controller.enqueue({
              type: "finish",
              finishReason,
              logprobs,
              usage: {
                promptTokens: (_a15 = usage.promptTokens) != null ? _a15 : NaN,
                completionTokens: (_b2 = usage.completionTokens) != null ? _b2 : NaN
              },
              ...providerMetadata != null ? { providerMetadata } : {}
            });
          }
        })
      ),
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      request: { body: JSON.stringify(body) },
      warnings
    };
  }
};
var openAITokenUsageSchema$1 = z.object({
  prompt_tokens: z.number().nullish(),
  completion_tokens: z.number().nullish(),
  prompt_tokens_details: z.object({
    cached_tokens: z.number().nullish()
  }).nullish(),
  completion_tokens_details: z.object({
    reasoning_tokens: z.number().nullish()
  }).nullish()
}).nullish();
var openAIChatResponseSchema$1 = z.object({
  id: z.string().nullish(),
  created: z.number().nullish(),
  model: z.string().nullish(),
  choices: z.array(
    z.object({
      message: z.object({
        role: z.literal("assistant").nullish(),
        content: z.string().nullish(),
        function_call: z.object({
          arguments: z.string(),
          name: z.string()
        }).nullish(),
        tool_calls: z.array(
          z.object({
            id: z.string().nullish(),
            type: z.literal("function"),
            function: z.object({
              name: z.string(),
              arguments: z.string()
            })
          })
        ).nullish()
      }),
      index: z.number(),
      logprobs: z.object({
        content: z.array(
          z.object({
            token: z.string(),
            logprob: z.number(),
            top_logprobs: z.array(
              z.object({
                token: z.string(),
                logprob: z.number()
              })
            )
          })
        ).nullable()
      }).nullish(),
      finish_reason: z.string().nullish()
    })
  ),
  usage: openAITokenUsageSchema$1
});
var openaiChatChunkSchema$1 = z.union([
  z.object({
    id: z.string().nullish(),
    created: z.number().nullish(),
    model: z.string().nullish(),
    choices: z.array(
      z.object({
        delta: z.object({
          role: z.enum(["assistant"]).nullish(),
          content: z.string().nullish(),
          function_call: z.object({
            name: z.string().optional(),
            arguments: z.string().optional()
          }).nullish(),
          tool_calls: z.array(
            z.object({
              index: z.number(),
              id: z.string().nullish(),
              type: z.literal("function").optional(),
              function: z.object({
                name: z.string().nullish(),
                arguments: z.string().nullish()
              })
            })
          ).nullish()
        }).nullish(),
        logprobs: z.object({
          content: z.array(
            z.object({
              token: z.string(),
              logprob: z.number(),
              top_logprobs: z.array(
                z.object({
                  token: z.string(),
                  logprob: z.number()
                })
              )
            })
          ).nullable()
        }).nullish(),
        finish_reason: z.string().nullable().optional(),
        index: z.number()
      })
    ),
    usage: openAITokenUsageSchema$1
  }),
  openAIErrorDataSchema$1
]);
function isReasoningModel$1(modelId) {
  return modelId.startsWith("o1-");
}
function isAudioModel$1(modelId) {
  return modelId.startsWith("gpt-4o-audio-preview");
}
function convertToOpenAICompletionPrompt$1({
  prompt: prompt2,
  inputFormat,
  user = "user",
  assistant = "assistant"
}) {
  if (inputFormat === "prompt" && prompt2.length === 1 && prompt2[0].role === "user" && prompt2[0].content.length === 1 && prompt2[0].content[0].type === "text") {
    return { prompt: prompt2[0].content[0].text };
  }
  let text = "";
  if (prompt2[0].role === "system") {
    text += `${prompt2[0].content}

`;
    prompt2 = prompt2.slice(1);
  }
  for (const { role, content } of prompt2) {
    switch (role) {
      case "system": {
        throw new InvalidPromptError({
          message: "Unexpected system message in prompt: ${content}",
          prompt: prompt2
        });
      }
      case "user": {
        const userMessage = content.map((part) => {
          switch (part.type) {
            case "text": {
              return part.text;
            }
            case "image": {
              throw new UnsupportedFunctionalityError({
                functionality: "images"
              });
            }
          }
        }).join("");
        text += `${user}:
${userMessage}

`;
        break;
      }
      case "assistant": {
        const assistantMessage = content.map((part) => {
          switch (part.type) {
            case "text": {
              return part.text;
            }
            case "tool-call": {
              throw new UnsupportedFunctionalityError({
                functionality: "tool-call messages"
              });
            }
          }
        }).join("");
        text += `${assistant}:
${assistantMessage}

`;
        break;
      }
      case "tool": {
        throw new UnsupportedFunctionalityError({
          functionality: "tool messages"
        });
      }
      default: {
        const _exhaustiveCheck = role;
        throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
      }
    }
  }
  text += `${assistant}:
`;
  return {
    prompt: text,
    stopSequences: [`
${user}:`]
  };
}
function mapOpenAICompletionLogProbs$1(logprobs) {
  return logprobs == null ? void 0 : logprobs.tokens.map((token, index2) => ({
    token,
    logprob: logprobs.token_logprobs[index2],
    topLogprobs: logprobs.top_logprobs ? Object.entries(logprobs.top_logprobs[index2]).map(
      ([token2, logprob]) => ({
        token: token2,
        logprob
      })
    ) : []
  }));
}
var OpenAICompletionLanguageModel$1 = class OpenAICompletionLanguageModel2 {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.defaultObjectGenerationMode = void 0;
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  getArgs({
    mode,
    inputFormat,
    prompt: prompt2,
    maxTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    stopSequences: userStopSequences,
    responseFormat,
    seed
  }) {
    var _a15;
    const type2 = mode.type;
    const warnings = [];
    if (topK != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "topK"
      });
    }
    if (responseFormat != null && responseFormat.type !== "text") {
      warnings.push({
        type: "unsupported-setting",
        setting: "responseFormat",
        details: "JSON response format is not supported."
      });
    }
    const { prompt: completionPrompt, stopSequences } = convertToOpenAICompletionPrompt$1({ prompt: prompt2, inputFormat });
    const stop = [...stopSequences != null ? stopSequences : [], ...userStopSequences != null ? userStopSequences : []];
    const baseArgs = {
      // model id:
      model: this.modelId,
      // model specific settings:
      echo: this.settings.echo,
      logit_bias: this.settings.logitBias,
      logprobs: typeof this.settings.logprobs === "number" ? this.settings.logprobs : typeof this.settings.logprobs === "boolean" ? this.settings.logprobs ? 0 : void 0 : void 0,
      suffix: this.settings.suffix,
      user: this.settings.user,
      // standardized settings:
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
      seed,
      // prompt:
      prompt: completionPrompt,
      // stop sequences:
      stop: stop.length > 0 ? stop : void 0
    };
    switch (type2) {
      case "regular": {
        if ((_a15 = mode.tools) == null ? void 0 : _a15.length) {
          throw new UnsupportedFunctionalityError({
            functionality: "tools"
          });
        }
        if (mode.toolChoice) {
          throw new UnsupportedFunctionalityError({
            functionality: "toolChoice"
          });
        }
        return { args: baseArgs, warnings };
      }
      case "object-json": {
        throw new UnsupportedFunctionalityError({
          functionality: "object-json mode"
        });
      }
      case "object-tool": {
        throw new UnsupportedFunctionalityError({
          functionality: "object-tool mode"
        });
      }
      default: {
        const _exhaustiveCheck = type2;
        throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
      }
    }
  }
  async doGenerate(options2) {
    const { args: args2, warnings } = this.getArgs(options2);
    const { responseHeaders, value: response } = await postJsonToApi({
      url: this.config.url({
        path: "/completions",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), options2.headers),
      body: args2,
      failedResponseHandler: openaiFailedResponseHandler$1,
      successfulResponseHandler: createJsonResponseHandler(
        openAICompletionResponseSchema$1
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { prompt: rawPrompt, ...rawSettings } = args2;
    const choice = response.choices[0];
    return {
      text: choice.text,
      usage: {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens
      },
      finishReason: mapOpenAIFinishReason$1(choice.finish_reason),
      logprobs: mapOpenAICompletionLogProbs$1(choice.logprobs),
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      response: getResponseMetadata$2(response),
      warnings,
      request: { body: JSON.stringify(args2) }
    };
  }
  async doStream(options2) {
    const { args: args2, warnings } = this.getArgs(options2);
    const body = {
      ...args2,
      stream: true,
      // only include stream_options when in strict compatibility mode:
      stream_options: this.config.compatibility === "strict" ? { include_usage: true } : void 0
    };
    const { responseHeaders, value: response } = await postJsonToApi({
      url: this.config.url({
        path: "/completions",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), options2.headers),
      body,
      failedResponseHandler: openaiFailedResponseHandler$1,
      successfulResponseHandler: createEventSourceResponseHandler(
        openaiCompletionChunkSchema$1
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { prompt: rawPrompt, ...rawSettings } = args2;
    let finishReason = "unknown";
    let usage = {
      promptTokens: Number.NaN,
      completionTokens: Number.NaN
    };
    let logprobs;
    let isFirstChunk = true;
    return {
      stream: response.pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            if (!chunk.success) {
              finishReason = "error";
              controller.enqueue({ type: "error", error: chunk.error });
              return;
            }
            const value = chunk.value;
            if ("error" in value) {
              finishReason = "error";
              controller.enqueue({ type: "error", error: value.error });
              return;
            }
            if (isFirstChunk) {
              isFirstChunk = false;
              controller.enqueue({
                type: "response-metadata",
                ...getResponseMetadata$2(value)
              });
            }
            if (value.usage != null) {
              usage = {
                promptTokens: value.usage.prompt_tokens,
                completionTokens: value.usage.completion_tokens
              };
            }
            const choice = value.choices[0];
            if ((choice == null ? void 0 : choice.finish_reason) != null) {
              finishReason = mapOpenAIFinishReason$1(choice.finish_reason);
            }
            if ((choice == null ? void 0 : choice.text) != null) {
              controller.enqueue({
                type: "text-delta",
                textDelta: choice.text
              });
            }
            const mappedLogprobs = mapOpenAICompletionLogProbs$1(
              choice == null ? void 0 : choice.logprobs
            );
            if (mappedLogprobs == null ? void 0 : mappedLogprobs.length) {
              if (logprobs === void 0) logprobs = [];
              logprobs.push(...mappedLogprobs);
            }
          },
          flush(controller) {
            controller.enqueue({
              type: "finish",
              finishReason,
              logprobs,
              usage
            });
          }
        })
      ),
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      warnings,
      request: { body: JSON.stringify(body) }
    };
  }
};
var openAICompletionResponseSchema$1 = z.object({
  id: z.string().nullish(),
  created: z.number().nullish(),
  model: z.string().nullish(),
  choices: z.array(
    z.object({
      text: z.string(),
      finish_reason: z.string(),
      logprobs: z.object({
        tokens: z.array(z.string()),
        token_logprobs: z.array(z.number()),
        top_logprobs: z.array(z.record(z.string(), z.number())).nullable()
      }).nullish()
    })
  ),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number()
  })
});
var openaiCompletionChunkSchema$1 = z.union([
  z.object({
    id: z.string().nullish(),
    created: z.number().nullish(),
    model: z.string().nullish(),
    choices: z.array(
      z.object({
        text: z.string(),
        finish_reason: z.string().nullish(),
        index: z.number(),
        logprobs: z.object({
          tokens: z.array(z.string()),
          token_logprobs: z.array(z.number()),
          top_logprobs: z.array(z.record(z.string(), z.number())).nullable()
        }).nullish()
      })
    ),
    usage: z.object({
      prompt_tokens: z.number(),
      completion_tokens: z.number()
    }).nullish()
  }),
  openAIErrorDataSchema$1
]);
var OpenAIEmbeddingModel$1 = class OpenAIEmbeddingModel2 {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  get maxEmbeddingsPerCall() {
    var _a15;
    return (_a15 = this.settings.maxEmbeddingsPerCall) != null ? _a15 : 2048;
  }
  get supportsParallelCalls() {
    var _a15;
    return (_a15 = this.settings.supportsParallelCalls) != null ? _a15 : true;
  }
  async doEmbed({
    values,
    headers,
    abortSignal
  }) {
    if (values.length > this.maxEmbeddingsPerCall) {
      throw new TooManyEmbeddingValuesForCallError({
        provider: this.provider,
        modelId: this.modelId,
        maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
        values
      });
    }
    const { responseHeaders, value: response } = await postJsonToApi({
      url: this.config.url({
        path: "/embeddings",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), headers),
      body: {
        model: this.modelId,
        input: values,
        encoding_format: "float",
        dimensions: this.settings.dimensions,
        user: this.settings.user
      },
      failedResponseHandler: openaiFailedResponseHandler$1,
      successfulResponseHandler: createJsonResponseHandler(
        openaiTextEmbeddingResponseSchema$1
      ),
      abortSignal,
      fetch: this.config.fetch
    });
    return {
      embeddings: response.data.map((item) => item.embedding),
      usage: response.usage ? { tokens: response.usage.prompt_tokens } : void 0,
      rawResponse: { headers: responseHeaders }
    };
  }
};
var openaiTextEmbeddingResponseSchema$1 = z.object({
  data: z.array(z.object({ embedding: z.array(z.number()) })),
  usage: z.object({ prompt_tokens: z.number() }).nullish()
});
function createOpenAI(options2 = {}) {
  var _a15, _b2, _c2, _d;
  const baseURL = (_b2 = withoutTrailingSlash((_a15 = options2.baseURL) != null ? _a15 : options2.baseUrl)) != null ? _b2 : "https://api.openai.com/v1";
  const compatibility = (_c2 = options2.compatibility) != null ? _c2 : "compatible";
  const providerName = (_d = options2.name) != null ? _d : "openai";
  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options2.apiKey,
      environmentVariableName: "OPENAI_API_KEY",
      description: "OpenAI"
    })}`,
    "OpenAI-Organization": options2.organization,
    "OpenAI-Project": options2.project,
    ...options2.headers
  });
  const createChatModel = (modelId, settings = {}) => new OpenAIChatLanguageModel$1(modelId, settings, {
    provider: `${providerName}.chat`,
    url: ({ path }) => `${baseURL}${path}`,
    headers: getHeaders,
    compatibility,
    fetch: options2.fetch
  });
  const createCompletionModel = (modelId, settings = {}) => new OpenAICompletionLanguageModel$1(modelId, settings, {
    provider: `${providerName}.completion`,
    url: ({ path }) => `${baseURL}${path}`,
    headers: getHeaders,
    compatibility,
    fetch: options2.fetch
  });
  const createEmbeddingModel = (modelId, settings = {}) => new OpenAIEmbeddingModel$1(modelId, settings, {
    provider: `${providerName}.embedding`,
    url: ({ path }) => `${baseURL}${path}`,
    headers: getHeaders,
    fetch: options2.fetch
  });
  const createLanguageModel = (modelId, settings) => {
    if (new.target) {
      throw new Error(
        "The OpenAI model function cannot be called with the new keyword."
      );
    }
    if (modelId === "gpt-3.5-turbo-instruct") {
      return createCompletionModel(
        modelId,
        settings
      );
    }
    return createChatModel(modelId, settings);
  };
  const provider = function(modelId, settings) {
    return createLanguageModel(modelId, settings);
  };
  provider.languageModel = createLanguageModel;
  provider.chat = createChatModel;
  provider.completion = createCompletionModel;
  provider.embedding = createEmbeddingModel;
  provider.textEmbedding = createEmbeddingModel;
  provider.textEmbeddingModel = createEmbeddingModel;
  return provider;
}
createOpenAI({
  compatibility: "strict"
  // strict for OpenAI API
});
function tokensCounter() {
  return (text) => {
    return text.length;
  };
}
async function loadHistory(key) {
  let history = [];
  try {
    history = JSON.parse(await ENV.DATABASE.get(key));
  } catch (e) {
    console.error(e);
  }
  if (!history || !Array.isArray(history)) {
    history = [];
  }
  const counter = tokensCounter();
  const trimHistory = (list, initLength, maxLength, maxToken) => {
    if (maxLength >= 0 && list.length > maxLength) {
      list = list.splice(list.length - maxLength);
    }
    if (maxToken > 0) {
      let tokenLength = initLength;
      for (let i = list.length - 1; i >= 0; i--) {
        const historyItem = list[i];
        let length = 0;
        if (historyItem.content) {
          if (typeof historyItem.content === "string") {
            length = counter(historyItem.content);
          } else if (Array.isArray(historyItem.content)) {
            for (const content of historyItem.content) {
              if (Object.prototype.hasOwnProperty.call(content, "text")) {
                length += counter(content.text);
              }
            }
          }
        } else {
          historyItem.content = "";
        }
        tokenLength += length;
        if (tokenLength > maxToken) {
          list = list.splice(i + 1);
          break;
        }
      }
    }
    return list;
  };
  if (ENV.AUTO_TRIM_HISTORY && ENV.MAX_HISTORY_LENGTH > 0) {
    history = trimHistory(history, 0, ENV.MAX_HISTORY_LENGTH, ENV.MAX_TOKEN_LENGTH);
    let validStart = 0;
    for (const h of history) {
      if (h.role === "tool") {
        validStart++;
        continue;
      }
      break;
    }
    history = history.slice(validStart);
  }
  return history;
}
async function requestCompletionsFromLLM(params, context, agent, modifier, onStream) {
  let history = context.MIDDEL_CONTEXT.history;
  const historyDisable = ENV.AUTO_TRIM_HISTORY && ENV.MAX_HISTORY_LENGTH <= 0;
  if (modifier) {
    const modifierData = modifier(history, params);
    history = modifierData.history;
    params = modifierData.message;
  }
  if (params === null) {
    throw new Error("Message is null");
  }
  const messages = [...history, params];
  if (context.USER_CONFIG.SYSTEM_INIT_MESSAGE) {
    messages.unshift({
      role: "system",
      content: context.USER_CONFIG.SYSTEM_INIT_MESSAGE
    });
  }
  const llmParams = {
    messages
  };
  const answer = await agent.request(llmParams, context.USER_CONFIG, onStream);
  const { messages: raw_messages } = answer;
  if (!historyDisable) {
    if (raw_messages.at(-1)?.role === "assistant") {
      history.push(params);
      history.push(...raw_messages);
    }
  }
  return answer;
}
async function requestText2Image(url, headers, body, render) {
  console.log("start generate image.");
  const resp = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });
  const result2 = await render(resp);
  if (result2.message) {
    throw new Error(result2.message);
  }
  return result2;
}
const schema = {
  name: "jina_reader",
  description: "Grab text content from provided URL links. Can be used to retrieve text information for web pages, articles, or other online resources",
  parameters: {
    type: "object",
    properties: {
      url: {
        type: "string",
        description: "The full URL address of the content to be crawled. If the user explicitly requests to read/analyze the content of the link, then call the function. If the data provided by the user is web content with links, but the content is sufficient to answer the question, then there is no need to call the function."
      }
    },
    required: [
      "url"
    ],
    additionalProperties: false
  }
};
const payload = {
  url: "https://r.jina.ai/{{url}}",
  headers: {
    Authorization: "Bearer {{JINA_API_KEY}}",
    "Content-Type": "application/json",
    "X-Return-Format": "text",
    "X-Timeout": "10"
  }
};
const handler = "content => content";
const type = "reader";
const required = [
  "JINA_API_KEY"
];
const jina_reader = {
  schema,
  payload,
  handler,
  type,
  required
};
const externalTools = { jina_reader };
const ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
const defaultOptions = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: false,
  definitions: {},
  errorMessages: false,
  markdownDescription: false,
  patternStrategy: "escape",
  applyRegexFlags: false,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
};
const getDefaultOptions = (options2) => ({
  ...defaultOptions,
  ...options2
});
const getRefs = (options2) => {
  const _options = getDefaultOptions(options2);
  const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
  return {
    ..._options,
    currentPath,
    propertyPath: void 0,
    seen: new Map(Object.entries(_options.definitions).map(([name14, def]) => [
      def._def,
      {
        def: def._def,
        path: [..._options.basePath, _options.definitionPath, name14],
        jsonSchema: void 0
      }
    ]))
  };
};
function addErrorMessage(res, key, errorMessage, refs) {
  if (!refs?.errorMessages)
    return;
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage
    };
  }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
  res[key] = value;
  addErrorMessage(res, key, errorMessage, refs);
}
function parseAnyDef() {
  return {};
}
function parseArrayDef(def, refs) {
  const res = {
    type: "array"
  };
  if (def.type?._def && def.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
  }
  if (def.maxLength) {
    setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
  }
  if (def.exactLength) {
    setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
    setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
  }
  return res;
}
function parseBigintDef(def, refs) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}
const parseCatchDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy ?? refs.dateStrategy;
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def, refs);
  }
}
const integerDateParser = (def, refs) => {
  const res = {
    type: "integer",
    format: "unix-time"
  };
  if (refs.target === "openApi3") {
    return res;
  }
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        setResponseValueAndErrors(
          res,
          "minimum",
          check.value,
          check.message,
          refs
        );
        break;
      case "max":
        setResponseValueAndErrors(
          res,
          "maximum",
          check.value,
          check.message,
          refs
        );
        break;
    }
  }
  return res;
};
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : {};
}
function parseEnumDef(def) {
  return {
    type: "string",
    enum: def.values
  };
}
const isJsonSchema7AllOfType = (type2) => {
  if ("type" in type2 && type2.type === "string")
    return false;
  return "allOf" in type2;
};
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x) => !!x);
  let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
  const mergedAllOf = [];
  allOf.forEach((schema2) => {
    if (isJsonSchema7AllOfType(schema2)) {
      mergedAllOf.push(...schema2.allOf);
      if (schema2.unevaluatedProperties === void 0) {
        unevaluatedProperties = void 0;
      }
    } else {
      let nestedSchema = schema2;
      if ("additionalProperties" in schema2 && schema2.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema2;
        nestedSchema = rest;
      } else {
        unevaluatedProperties = void 0;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : void 0;
}
function parseLiteralDef(def, refs) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  if (refs.target === "openApi3") {
    return {
      type: parsedType === "bigint" ? "integer" : parsedType,
      enum: [def.value]
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}
let emojiRegex;
const zodPatterns = {
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  emoji: () => {
    if (emojiRegex === void 0) {
      emojiRegex = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
    }
    return emojiRegex;
  },
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/
};
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  function processPattern(value) {
    return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(value) : value;
  }
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(res, RegExp(`^${processPattern(check.value)}`), check.message, refs);
          break;
        case "endsWith":
          addPattern(res, RegExp(`${processPattern(check.value)}$`), check.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "date":
          addFormat(res, "date", check.message, refs);
          break;
        case "time":
          addFormat(res, "time", check.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "includes": {
          addPattern(res, RegExp(processPattern(check.value)), check.message, refs);
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji, check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check.message, refs);
        }
      }
    }
  }
  return res;
}
const escapeNonAlphaNumeric = (value) => Array.from(value).map((c) => /[a-zA-Z0-9]/.test(c) ? c : `\\${c}`).join("");
const addFormat = (schema2, value, message, refs) => {
  if (schema2.format || schema2.anyOf?.some((x) => x.format)) {
    if (!schema2.anyOf) {
      schema2.anyOf = [];
    }
    if (schema2.format) {
      schema2.anyOf.push({
        format: schema2.format,
        ...schema2.errorMessage && refs.errorMessages && {
          errorMessage: { format: schema2.errorMessage.format }
        }
      });
      delete schema2.format;
      if (schema2.errorMessage) {
        delete schema2.errorMessage.format;
        if (Object.keys(schema2.errorMessage).length === 0) {
          delete schema2.errorMessage;
        }
      }
    }
    schema2.anyOf.push({
      format: value,
      ...message && refs.errorMessages && { errorMessage: { format: message } }
    });
  } else {
    setResponseValueAndErrors(schema2, "format", value, message, refs);
  }
};
const addPattern = (schema2, regex, message, refs) => {
  if (schema2.pattern || schema2.allOf?.some((x) => x.pattern)) {
    if (!schema2.allOf) {
      schema2.allOf = [];
    }
    if (schema2.pattern) {
      schema2.allOf.push({
        pattern: schema2.pattern,
        ...schema2.errorMessage && refs.errorMessages && {
          errorMessage: { pattern: schema2.errorMessage.pattern }
        }
      });
      delete schema2.pattern;
      if (schema2.errorMessage) {
        delete schema2.errorMessage.pattern;
        if (Object.keys(schema2.errorMessage).length === 0) {
          delete schema2.errorMessage;
        }
      }
    }
    schema2.allOf.push({
      pattern: processRegExp(regex, refs),
      ...message && refs.errorMessages && { errorMessage: { pattern: message } }
    });
  } else {
    setResponseValueAndErrors(schema2, "pattern", processRegExp(regex, refs), message, refs);
  }
};
const processRegExp = (regexOrFunction, refs) => {
  const regex = typeof regexOrFunction === "function" ? regexOrFunction() : regexOrFunction;
  if (!refs.applyRegexFlags || !regex.flags)
    return regex.source;
  const flags = {
    i: regex.flags.includes("i"),
    m: regex.flags.includes("m"),
    s: regex.flags.includes("s")
  };
  const source = flags.i ? regex.source.toLowerCase() : regex.source;
  let pattern = "";
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i = 0; i < source.length; i++) {
    if (isEscaped) {
      pattern += source[i];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i];
            pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i + 1] === "-" && source[i + 2]?.match(/[a-z]/)) {
            pattern += source[i];
            inCharRange = true;
          } else {
            pattern += `${source[i]}${source[i].toUpperCase()}`;
          }
          continue;
        }
      } else if (source[i].match(/[a-z]/)) {
        pattern += `[${source[i]}${source[i].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source[i] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source[i] === ".") {
      pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
      continue;
    }
    pattern += source[i];
    if (source[i] === "\\") {
      isEscaped = true;
    } else if (inCharGroup && source[i] === "]") {
      inCharGroup = false;
    } else if (!inCharGroup && source[i] === "[") {
      inCharGroup = true;
    }
  }
  try {
    const regexTest = new RegExp(pattern);
  } catch {
    console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
    return regex.source;
  }
  return pattern;
};
function parseRecordDef(def, refs) {
  if (refs.target === "openApi3" && def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      type: "object",
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce((acc, key) => ({
        ...acc,
        [key]: parseDef(def.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key]
        }) ?? {}
      }), {}),
      additionalProperties: false
    };
  }
  const schema2 = {
    type: "object",
    additionalProperties: parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? {}
  };
  if (refs.target === "openApi3") {
    return schema2;
  }
  if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.checks?.length) {
    const { type: type2, ...keyType } = parseStringDef(def.keyType._def, refs);
    return {
      ...schema2,
      propertyNames: keyType
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      ...schema2,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodBranded && def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.type._def.checks?.length) {
    const { type: type2, ...keyType } = parseBrandedDef(def.keyType._def, refs);
    return {
      ...schema2,
      propertyNames: keyType
    };
  }
  return schema2;
}
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || {};
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}
function parseNativeEnumDef(def) {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object[object[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object[key]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}
function parseNeverDef() {
  return {
    not: {}
  };
}
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: true
  } : {
    type: "null"
  };
}
const primitiveMappings = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function parseUnionDef(def, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def, refs);
  const options2 = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options2.every((x) => x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length))) {
    const types = options2.reduce((types2, x) => {
      const type2 = primitiveMappings[x._def.typeName];
      return type2 && !types2.includes(type2) ? [...types2, type2] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options2.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
    const types = options2.reduce((acc, x) => {
      const type2 = typeof x._def.value;
      switch (type2) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type2];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x._def.value === null)
            return [...acc, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return acc;
      }
    }, []);
    if (types.length === options2.length) {
      const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options2.reduce((acc, x) => {
          return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
        }, [])
      };
    }
  } else if (options2.every((x) => x._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options2.reduce((acc, x) => [
        ...acc,
        ...x._def.values.filter((x2) => !acc.includes(x2))
      ], [])
    };
  }
  return asAnyOf(def, refs);
}
const asAnyOf = (def, refs) => {
  const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i) => parseDef(x._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", `${i}`]
  })).filter((x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
  return anyOf.length ? { anyOf } : void 0;
};
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    if (refs.target === "openApi3") {
      return {
        type: primitiveMappings[def.innerType._def.typeName],
        nullable: true
      };
    }
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  if (refs.target === "openApi3") {
    const base2 = parseDef(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    if (base2 && "$ref" in base2)
      return { allOf: [base2], nullable: true };
    return base2 && { ...base2, nullable: true };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}
function parseNumberDef(def, refs) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        addErrorMessage(res, "type", check.message, refs);
        break;
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}
function decideAdditionalProperties(def, refs) {
  if (refs.removeAdditionalStrategy === "strict") {
    return def.catchall._def.typeName === "ZodNever" ? def.unknownKeys !== "strict" : parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? true;
  } else {
    return def.catchall._def.typeName === "ZodNever" ? def.unknownKeys === "passthrough" : parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? true;
  }
}
function parseObjectDef(def, refs) {
  const result2 = {
    type: "object",
    ...Object.entries(def.shape()).reduce((acc, [propName, propDef]) => {
      if (propDef === void 0 || propDef._def === void 0)
        return acc;
      const parsedDef = parseDef(propDef._def, {
        ...refs,
        currentPath: [...refs.currentPath, "properties", propName],
        propertyPath: [...refs.currentPath, "properties", propName]
      });
      if (parsedDef === void 0)
        return acc;
      return {
        properties: { ...acc.properties, [propName]: parsedDef },
        required: propDef.isOptional() ? acc.required : [...acc.required, propName]
      };
    }, { properties: {}, required: [] }),
    additionalProperties: decideAdditionalProperties(def, refs)
  };
  if (!result2.required.length)
    delete result2.required;
  return result2;
}
const parseOptionalDef = (def, refs) => {
  if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
    return parseDef(def.innerType._def, refs);
  }
  const innerSchema = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "1"]
  });
  return innerSchema ? {
    anyOf: [
      {
        not: {}
      },
      innerSchema
    ]
  } : {};
};
const parsePipelineDef = (def, refs) => {
  if (refs.pipeStrategy === "input") {
    return parseDef(def.in._def, refs);
  } else if (refs.pipeStrategy === "output") {
    return parseDef(def.out._def, refs);
  }
  const a = parseDef(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", "0"]
  });
  const b = parseDef(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
  });
  return {
    allOf: [a, b].filter((x) => x !== void 0)
  };
};
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema2 = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    setResponseValueAndErrors(schema2, "minItems", def.minSize.value, def.minSize.message, refs);
  }
  if (def.maxSize) {
    setResponseValueAndErrors(schema2, "maxItems", def.maxSize.value, def.maxSize.message, refs);
  }
  return schema2;
}
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], []),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], [])
    };
  }
}
function parseUndefinedDef() {
  return {
    not: {}
  };
}
function parseUnknownDef() {
  return {};
}
const parseReadonlyDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};
function parseDef(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def, newItem);
  const jsonSchema2 = selectParser(def, def.typeName, refs);
  if (jsonSchema2) {
    addMeta(def, refs, jsonSchema2);
  }
  newItem.jsonSchema = jsonSchema2;
  return jsonSchema2;
}
const get$ref = (item, refs) => {
  switch (refs.$refStrategy) {
    case "root":
      return { $ref: item.path.join("/") };
    case "relative":
      return { $ref: getRelativePath(refs.currentPath, item.path) };
    case "none":
    case "seen": {
      if (item.path.length < refs.currentPath.length && item.path.every((value, index2) => refs.currentPath[index2] === value)) {
        console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
        return {};
      }
      return refs.$refStrategy === "seen" ? {} : void 0;
    }
  }
};
const getRelativePath = (pathA, pathB) => {
  let i = 0;
  for (; i < pathA.length && i < pathB.length; i++) {
    if (pathA[i] !== pathB[i])
      break;
  }
  return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};
const selectParser = (def, typeName, refs) => {
  switch (typeName) {
    case ZodFirstPartyTypeKind.ZodString:
      return parseStringDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNumber:
      return parseNumberDef(def, refs);
    case ZodFirstPartyTypeKind.ZodObject:
      return parseObjectDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBigInt:
      return parseBigintDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBoolean:
      return parseBooleanDef();
    case ZodFirstPartyTypeKind.ZodDate:
      return parseDateDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUndefined:
      return parseUndefinedDef();
    case ZodFirstPartyTypeKind.ZodNull:
      return parseNullDef(refs);
    case ZodFirstPartyTypeKind.ZodArray:
      return parseArrayDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUnion:
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return parseUnionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodIntersection:
      return parseIntersectionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodTuple:
      return parseTupleDef(def, refs);
    case ZodFirstPartyTypeKind.ZodRecord:
      return parseRecordDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLiteral:
      return parseLiteralDef(def, refs);
    case ZodFirstPartyTypeKind.ZodEnum:
      return parseEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNativeEnum:
      return parseNativeEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNullable:
      return parseNullableDef(def, refs);
    case ZodFirstPartyTypeKind.ZodOptional:
      return parseOptionalDef(def, refs);
    case ZodFirstPartyTypeKind.ZodMap:
      return parseMapDef(def, refs);
    case ZodFirstPartyTypeKind.ZodSet:
      return parseSetDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLazy:
      return parseDef(def.getter()._def, refs);
    case ZodFirstPartyTypeKind.ZodPromise:
      return parsePromiseDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNaN:
    case ZodFirstPartyTypeKind.ZodNever:
      return parseNeverDef();
    case ZodFirstPartyTypeKind.ZodEffects:
      return parseEffectsDef(def, refs);
    case ZodFirstPartyTypeKind.ZodAny:
      return parseAnyDef();
    case ZodFirstPartyTypeKind.ZodUnknown:
      return parseUnknownDef();
    case ZodFirstPartyTypeKind.ZodDefault:
      return parseDefaultDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBranded:
      return parseBrandedDef(def, refs);
    case ZodFirstPartyTypeKind.ZodReadonly:
      return parseReadonlyDef(def, refs);
    case ZodFirstPartyTypeKind.ZodCatch:
      return parseCatchDef(def, refs);
    case ZodFirstPartyTypeKind.ZodPipeline:
      return parsePipelineDef(def, refs);
    case ZodFirstPartyTypeKind.ZodFunction:
    case ZodFirstPartyTypeKind.ZodVoid:
    case ZodFirstPartyTypeKind.ZodSymbol:
      return void 0;
    default:
      return /* @__PURE__ */ ((_) => void 0)();
  }
};
const addMeta = (def, refs, jsonSchema2) => {
  if (def.description) {
    jsonSchema2.description = def.description;
    if (refs.markdownDescription) {
      jsonSchema2.markdownDescription = def.description;
    }
  }
  return jsonSchema2;
};
const zodToJsonSchema = (schema2, options2) => {
  const refs = getRefs(options2);
  const definitions = void 0;
  const name14 = options2?.name;
  const main = parseDef(
    schema2._def,
    refs,
    false
  ) ?? {};
  const combined = name14 === void 0 ? definitions ? {
    ...main,
    [refs.definitionPath]: definitions
  } : main : {
    $ref: [
      ...refs.$refStrategy === "relative" ? [] : refs.basePath,
      refs.definitionPath,
      name14
    ].join("/"),
    [refs.definitionPath]: {
      ...definitions,
      [name14]: main
    }
  };
  if (refs.target === "jsonSchema7") {
    combined.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (refs.target === "jsonSchema2019-09") {
    combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
  }
  return combined;
};
var textStreamPart = {
  code: "0",
  name: "text",
  parse: (value) => {
    if (typeof value !== "string") {
      throw new Error('"text" parts expect a string value.');
    }
    return { type: "text", value };
  }
};
var functionCallStreamPart = {
  code: "1",
  name: "function_call",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("function_call" in value) || typeof value.function_call !== "object" || value.function_call == null || !("name" in value.function_call) || !("arguments" in value.function_call) || typeof value.function_call.name !== "string" || typeof value.function_call.arguments !== "string") {
      throw new Error(
        '"function_call" parts expect an object with a "function_call" property.'
      );
    }
    return {
      type: "function_call",
      value
    };
  }
};
var dataStreamPart = {
  code: "2",
  name: "data",
  parse: (value) => {
    if (!Array.isArray(value)) {
      throw new Error('"data" parts expect an array value.');
    }
    return { type: "data", value };
  }
};
var errorStreamPart = {
  code: "3",
  name: "error",
  parse: (value) => {
    if (typeof value !== "string") {
      throw new Error('"error" parts expect a string value.');
    }
    return { type: "error", value };
  }
};
var assistantMessageStreamPart = {
  code: "4",
  name: "assistant_message",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("id" in value) || !("role" in value) || !("content" in value) || typeof value.id !== "string" || typeof value.role !== "string" || value.role !== "assistant" || !Array.isArray(value.content) || !value.content.every(
      (item) => item != null && typeof item === "object" && "type" in item && item.type === "text" && "text" in item && item.text != null && typeof item.text === "object" && "value" in item.text && typeof item.text.value === "string"
    )) {
      throw new Error(
        '"assistant_message" parts expect an object with an "id", "role", and "content" property.'
      );
    }
    return {
      type: "assistant_message",
      value
    };
  }
};
var assistantControlDataStreamPart = {
  code: "5",
  name: "assistant_control_data",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("threadId" in value) || !("messageId" in value) || typeof value.threadId !== "string" || typeof value.messageId !== "string") {
      throw new Error(
        '"assistant_control_data" parts expect an object with a "threadId" and "messageId" property.'
      );
    }
    return {
      type: "assistant_control_data",
      value: {
        threadId: value.threadId,
        messageId: value.messageId
      }
    };
  }
};
var dataMessageStreamPart = {
  code: "6",
  name: "data_message",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("role" in value) || !("data" in value) || typeof value.role !== "string" || value.role !== "data") {
      throw new Error(
        '"data_message" parts expect an object with a "role" and "data" property.'
      );
    }
    return {
      type: "data_message",
      value
    };
  }
};
var toolCallsStreamPart = {
  code: "7",
  name: "tool_calls",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("tool_calls" in value) || typeof value.tool_calls !== "object" || value.tool_calls == null || !Array.isArray(value.tool_calls) || value.tool_calls.some(
      (tc) => tc == null || typeof tc !== "object" || !("id" in tc) || typeof tc.id !== "string" || !("type" in tc) || typeof tc.type !== "string" || !("function" in tc) || tc.function == null || typeof tc.function !== "object" || !("arguments" in tc.function) || typeof tc.function.name !== "string" || typeof tc.function.arguments !== "string"
    )) {
      throw new Error(
        '"tool_calls" parts expect an object with a ToolCallPayload.'
      );
    }
    return {
      type: "tool_calls",
      value
    };
  }
};
var messageAnnotationsStreamPart = {
  code: "8",
  name: "message_annotations",
  parse: (value) => {
    if (!Array.isArray(value)) {
      throw new Error('"message_annotations" parts expect an array value.');
    }
    return { type: "message_annotations", value };
  }
};
var toolCallStreamPart = {
  code: "9",
  name: "tool_call",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("toolName" in value) || typeof value.toolName !== "string" || !("args" in value) || typeof value.args !== "object") {
      throw new Error(
        '"tool_call" parts expect an object with a "toolCallId", "toolName", and "args" property.'
      );
    }
    return {
      type: "tool_call",
      value
    };
  }
};
var toolResultStreamPart = {
  code: "a",
  name: "tool_result",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("result" in value)) {
      throw new Error(
        '"tool_result" parts expect an object with a "toolCallId" and a "result" property.'
      );
    }
    return {
      type: "tool_result",
      value
    };
  }
};
var toolCallStreamingStartStreamPart = {
  code: "b",
  name: "tool_call_streaming_start",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("toolName" in value) || typeof value.toolName !== "string") {
      throw new Error(
        '"tool_call_streaming_start" parts expect an object with a "toolCallId" and "toolName" property.'
      );
    }
    return {
      type: "tool_call_streaming_start",
      value
    };
  }
};
var toolCallDeltaStreamPart = {
  code: "c",
  name: "tool_call_delta",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("toolCallId" in value) || typeof value.toolCallId !== "string" || !("argsTextDelta" in value) || typeof value.argsTextDelta !== "string") {
      throw new Error(
        '"tool_call_delta" parts expect an object with a "toolCallId" and "argsTextDelta" property.'
      );
    }
    return {
      type: "tool_call_delta",
      value
    };
  }
};
var finishMessageStreamPart = {
  code: "d",
  name: "finish_message",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("finishReason" in value) || typeof value.finishReason !== "string") {
      throw new Error(
        '"finish_message" parts expect an object with a "finishReason" property.'
      );
    }
    const result2 = {
      finishReason: value.finishReason
    };
    if ("usage" in value && value.usage != null && typeof value.usage === "object" && "promptTokens" in value.usage && "completionTokens" in value.usage) {
      result2.usage = {
        promptTokens: typeof value.usage.promptTokens === "number" ? value.usage.promptTokens : Number.NaN,
        completionTokens: typeof value.usage.completionTokens === "number" ? value.usage.completionTokens : Number.NaN
      };
    }
    return {
      type: "finish_message",
      value: result2
    };
  }
};
var finishStepStreamPart = {
  code: "e",
  name: "finish_step",
  parse: (value) => {
    if (value == null || typeof value !== "object" || !("finishReason" in value) || typeof value.finishReason !== "string") {
      throw new Error(
        '"finish_step" parts expect an object with a "finishReason" property.'
      );
    }
    const result2 = {
      finishReason: value.finishReason,
      isContinued: false
    };
    if ("usage" in value && value.usage != null && typeof value.usage === "object" && "promptTokens" in value.usage && "completionTokens" in value.usage) {
      result2.usage = {
        promptTokens: typeof value.usage.promptTokens === "number" ? value.usage.promptTokens : Number.NaN,
        completionTokens: typeof value.usage.completionTokens === "number" ? value.usage.completionTokens : Number.NaN
      };
    }
    if ("isContinued" in value && typeof value.isContinued === "boolean") {
      result2.isContinued = value.isContinued;
    }
    return {
      type: "finish_step",
      value: result2
    };
  }
};
var streamParts = [
  textStreamPart,
  functionCallStreamPart,
  dataStreamPart,
  errorStreamPart,
  assistantMessageStreamPart,
  assistantControlDataStreamPart,
  dataMessageStreamPart,
  toolCallsStreamPart,
  messageAnnotationsStreamPart,
  toolCallStreamPart,
  toolResultStreamPart,
  toolCallStreamingStartStreamPart,
  toolCallDeltaStreamPart,
  finishMessageStreamPart,
  finishStepStreamPart
];
({
  [textStreamPart.code]: textStreamPart,
  [functionCallStreamPart.code]: functionCallStreamPart,
  [dataStreamPart.code]: dataStreamPart,
  [errorStreamPart.code]: errorStreamPart,
  [assistantMessageStreamPart.code]: assistantMessageStreamPart,
  [assistantControlDataStreamPart.code]: assistantControlDataStreamPart,
  [dataMessageStreamPart.code]: dataMessageStreamPart,
  [toolCallsStreamPart.code]: toolCallsStreamPart,
  [messageAnnotationsStreamPart.code]: messageAnnotationsStreamPart,
  [toolCallStreamPart.code]: toolCallStreamPart,
  [toolResultStreamPart.code]: toolResultStreamPart,
  [toolCallStreamingStartStreamPart.code]: toolCallStreamingStartStreamPart,
  [toolCallDeltaStreamPart.code]: toolCallDeltaStreamPart,
  [finishMessageStreamPart.code]: finishMessageStreamPart,
  [finishStepStreamPart.code]: finishStepStreamPart
});
({
  [textStreamPart.name]: textStreamPart.code,
  [functionCallStreamPart.name]: functionCallStreamPart.code,
  [dataStreamPart.name]: dataStreamPart.code,
  [errorStreamPart.name]: errorStreamPart.code,
  [assistantMessageStreamPart.name]: assistantMessageStreamPart.code,
  [assistantControlDataStreamPart.name]: assistantControlDataStreamPart.code,
  [dataMessageStreamPart.name]: dataMessageStreamPart.code,
  [toolCallsStreamPart.name]: toolCallsStreamPart.code,
  [messageAnnotationsStreamPart.name]: messageAnnotationsStreamPart.code,
  [toolCallStreamPart.name]: toolCallStreamPart.code,
  [toolResultStreamPart.name]: toolResultStreamPart.code,
  [toolCallStreamingStartStreamPart.name]: toolCallStreamingStartStreamPart.code,
  [toolCallDeltaStreamPart.name]: toolCallDeltaStreamPart.code,
  [finishMessageStreamPart.name]: finishMessageStreamPart.code,
  [finishStepStreamPart.name]: finishStepStreamPart.code
});
streamParts.map((part) => part.code);
function formatStreamPart(type2, value) {
  const streamPart = streamParts.find((part) => part.name === type2);
  if (!streamPart) {
    throw new Error(`Invalid stream part type: ${type2}`);
  }
  return `${streamPart.code}:${JSON.stringify(value)}
`;
}
var schemaSymbol = Symbol.for("vercel.ai.schema");
function jsonSchema(jsonSchema2, {
  validate
} = {}) {
  return {
    [schemaSymbol]: true,
    _type: void 0,
    // should never be used directly
    [validatorSymbol]: true,
    jsonSchema: jsonSchema2,
    validate
  };
}
function isSchema(value) {
  return typeof value === "object" && value !== null && schemaSymbol in value && value[schemaSymbol] === true && "jsonSchema" in value && "validate" in value;
}
function asSchema(schema2) {
  return isSchema(schema2) ? schema2 : zodSchema(schema2);
}
function zodSchema(zodSchema2) {
  return jsonSchema(
    // we assume that zodToJsonSchema will return a valid JSONSchema7:
    zodToJsonSchema(zodSchema2),
    {
      validate: (value) => {
        const result2 = zodSchema2.safeParse(value);
        return result2.success ? { success: true, value: result2.data } : { success: false, error: result2.error };
      }
    }
  );
}
var _globalThis = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};
var VERSION = "1.9.0";
var re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
function _makeCompatibilityCheck(ownVersion) {
  var acceptedVersions = /* @__PURE__ */ new Set([ownVersion]);
  var rejectedVersions = /* @__PURE__ */ new Set();
  var myVersionMatch = ownVersion.match(re);
  if (!myVersionMatch) {
    return function() {
      return false;
    };
  }
  var ownVersionParsed = {
    major: +myVersionMatch[1],
    minor: +myVersionMatch[2],
    patch: +myVersionMatch[3],
    prerelease: myVersionMatch[4]
  };
  if (ownVersionParsed.prerelease != null) {
    return function isExactmatch(globalVersion) {
      return globalVersion === ownVersion;
    };
  }
  function _reject(v) {
    rejectedVersions.add(v);
    return false;
  }
  function _accept(v) {
    acceptedVersions.add(v);
    return true;
  }
  return function isCompatible2(globalVersion) {
    if (acceptedVersions.has(globalVersion)) {
      return true;
    }
    if (rejectedVersions.has(globalVersion)) {
      return false;
    }
    var globalVersionMatch = globalVersion.match(re);
    if (!globalVersionMatch) {
      return _reject(globalVersion);
    }
    var globalVersionParsed = {
      major: +globalVersionMatch[1],
      minor: +globalVersionMatch[2],
      patch: +globalVersionMatch[3],
      prerelease: globalVersionMatch[4]
    };
    if (globalVersionParsed.prerelease != null) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major !== globalVersionParsed.major) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major === 0) {
      if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
        return _accept(globalVersion);
      }
      return _reject(globalVersion);
    }
    if (ownVersionParsed.minor <= globalVersionParsed.minor) {
      return _accept(globalVersion);
    }
    return _reject(globalVersion);
  };
}
var isCompatible = _makeCompatibilityCheck(VERSION);
var major = VERSION.split(".")[0];
var GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for("opentelemetry.js.api." + major);
var _global = _globalThis;
function registerGlobal(type2, instance, diag, allowOverride) {
  var _a15;
  if (allowOverride === void 0) {
    allowOverride = false;
  }
  var api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a15 = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a15 !== void 0 ? _a15 : {
    version: VERSION
  };
  if (!allowOverride && api[type2]) {
    var err = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + type2);
    diag.error(err.stack || err.message);
    return false;
  }
  if (api.version !== VERSION) {
    var err = new Error("@opentelemetry/api: Registration of version v" + api.version + " for " + type2 + " does not match previously registered API v" + VERSION);
    diag.error(err.stack || err.message);
    return false;
  }
  api[type2] = instance;
  diag.debug("@opentelemetry/api: Registered a global for " + type2 + " v" + VERSION + ".");
  return true;
}
function getGlobal(type2) {
  var _a15, _b2;
  var globalVersion = (_a15 = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a15 === void 0 ? void 0 : _a15.version;
  if (!globalVersion || !isCompatible(globalVersion)) {
    return;
  }
  return (_b2 = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b2 === void 0 ? void 0 : _b2[type2];
}
function unregisterGlobal(type2, diag) {
  diag.debug("@opentelemetry/api: Unregistering a global for " + type2 + " v" + VERSION + ".");
  var api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
  if (api) {
    delete api[type2];
  }
}
var __read$3 = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$3 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var DiagComponentLogger = function() {
  function DiagComponentLogger2(props) {
    this._namespace = props.namespace || "DiagComponentLogger";
  }
  DiagComponentLogger2.prototype.debug = function() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    return logProxy("debug", this._namespace, args2);
  };
  DiagComponentLogger2.prototype.error = function() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    return logProxy("error", this._namespace, args2);
  };
  DiagComponentLogger2.prototype.info = function() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    return logProxy("info", this._namespace, args2);
  };
  DiagComponentLogger2.prototype.warn = function() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    return logProxy("warn", this._namespace, args2);
  };
  DiagComponentLogger2.prototype.verbose = function() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    return logProxy("verbose", this._namespace, args2);
  };
  return DiagComponentLogger2;
}();
function logProxy(funcName, namespace, args2) {
  var logger = getGlobal("diag");
  if (!logger) {
    return;
  }
  args2.unshift(namespace);
  return logger[funcName].apply(logger, __spreadArray$3([], __read$3(args2), false));
}
var DiagLogLevel;
(function(DiagLogLevel2) {
  DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
  DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
  DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
  DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
  DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
  DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
  DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
})(DiagLogLevel || (DiagLogLevel = {}));
function createLogLevelDiagLogger(maxLevel, logger) {
  if (maxLevel < DiagLogLevel.NONE) {
    maxLevel = DiagLogLevel.NONE;
  } else if (maxLevel > DiagLogLevel.ALL) {
    maxLevel = DiagLogLevel.ALL;
  }
  logger = logger || {};
  function _filterFunc(funcName, theLevel) {
    var theFunc = logger[funcName];
    if (typeof theFunc === "function" && maxLevel >= theLevel) {
      return theFunc.bind(logger);
    }
    return function() {
    };
  }
  return {
    error: _filterFunc("error", DiagLogLevel.ERROR),
    warn: _filterFunc("warn", DiagLogLevel.WARN),
    info: _filterFunc("info", DiagLogLevel.INFO),
    debug: _filterFunc("debug", DiagLogLevel.DEBUG),
    verbose: _filterFunc("verbose", DiagLogLevel.VERBOSE)
  };
}
var __read$2 = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$2 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var API_NAME$2 = "diag";
var DiagAPI = function() {
  function DiagAPI2() {
    function _logProxy(funcName) {
      return function() {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args2[_i] = arguments[_i];
        }
        var logger = getGlobal("diag");
        if (!logger)
          return;
        return logger[funcName].apply(logger, __spreadArray$2([], __read$2(args2), false));
      };
    }
    var self2 = this;
    var setLogger = function(logger, optionsOrLogLevel) {
      var _a15, _b2, _c2;
      if (optionsOrLogLevel === void 0) {
        optionsOrLogLevel = { logLevel: DiagLogLevel.INFO };
      }
      if (logger === self2) {
        var err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
        self2.error((_a15 = err.stack) !== null && _a15 !== void 0 ? _a15 : err.message);
        return false;
      }
      if (typeof optionsOrLogLevel === "number") {
        optionsOrLogLevel = {
          logLevel: optionsOrLogLevel
        };
      }
      var oldLogger = getGlobal("diag");
      var newLogger = createLogLevelDiagLogger((_b2 = optionsOrLogLevel.logLevel) !== null && _b2 !== void 0 ? _b2 : DiagLogLevel.INFO, logger);
      if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
        var stack = (_c2 = new Error().stack) !== null && _c2 !== void 0 ? _c2 : "<failed to generate stacktrace>";
        oldLogger.warn("Current logger will be overwritten from " + stack);
        newLogger.warn("Current logger will overwrite one already registered from " + stack);
      }
      return registerGlobal("diag", newLogger, self2, true);
    };
    self2.setLogger = setLogger;
    self2.disable = function() {
      unregisterGlobal(API_NAME$2, self2);
    };
    self2.createComponentLogger = function(options2) {
      return new DiagComponentLogger(options2);
    };
    self2.verbose = _logProxy("verbose");
    self2.debug = _logProxy("debug");
    self2.info = _logProxy("info");
    self2.warn = _logProxy("warn");
    self2.error = _logProxy("error");
  }
  DiagAPI2.instance = function() {
    if (!this._instance) {
      this._instance = new DiagAPI2();
    }
    return this._instance;
  };
  return DiagAPI2;
}();
function createContextKey(description) {
  return Symbol.for(description);
}
var BaseContext = /* @__PURE__ */ function() {
  function BaseContext2(parentContext) {
    var self2 = this;
    self2._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
    self2.getValue = function(key) {
      return self2._currentContext.get(key);
    };
    self2.setValue = function(key, value) {
      var context = new BaseContext2(self2._currentContext);
      context._currentContext.set(key, value);
      return context;
    };
    self2.deleteValue = function(key) {
      var context = new BaseContext2(self2._currentContext);
      context._currentContext.delete(key);
      return context;
    };
  }
  return BaseContext2;
}();
var ROOT_CONTEXT = new BaseContext();
var __read$1 = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray$1 = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var NoopContextManager = function() {
  function NoopContextManager2() {
  }
  NoopContextManager2.prototype.active = function() {
    return ROOT_CONTEXT;
  };
  NoopContextManager2.prototype.with = function(_context, fn, thisArg) {
    var args2 = [];
    for (var _i = 3; _i < arguments.length; _i++) {
      args2[_i - 3] = arguments[_i];
    }
    return fn.call.apply(fn, __spreadArray$1([thisArg], __read$1(args2), false));
  };
  NoopContextManager2.prototype.bind = function(_context, target) {
    return target;
  };
  NoopContextManager2.prototype.enable = function() {
    return this;
  };
  NoopContextManager2.prototype.disable = function() {
    return this;
  };
  return NoopContextManager2;
}();
var __read = function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var API_NAME$1 = "context";
var NOOP_CONTEXT_MANAGER = new NoopContextManager();
var ContextAPI = function() {
  function ContextAPI2() {
  }
  ContextAPI2.getInstance = function() {
    if (!this._instance) {
      this._instance = new ContextAPI2();
    }
    return this._instance;
  };
  ContextAPI2.prototype.setGlobalContextManager = function(contextManager) {
    return registerGlobal(API_NAME$1, contextManager, DiagAPI.instance());
  };
  ContextAPI2.prototype.active = function() {
    return this._getContextManager().active();
  };
  ContextAPI2.prototype.with = function(context, fn, thisArg) {
    var _a15;
    var args2 = [];
    for (var _i = 3; _i < arguments.length; _i++) {
      args2[_i - 3] = arguments[_i];
    }
    return (_a15 = this._getContextManager()).with.apply(_a15, __spreadArray([context, fn, thisArg], __read(args2), false));
  };
  ContextAPI2.prototype.bind = function(context, target) {
    return this._getContextManager().bind(context, target);
  };
  ContextAPI2.prototype._getContextManager = function() {
    return getGlobal(API_NAME$1) || NOOP_CONTEXT_MANAGER;
  };
  ContextAPI2.prototype.disable = function() {
    this._getContextManager().disable();
    unregisterGlobal(API_NAME$1, DiagAPI.instance());
  };
  return ContextAPI2;
}();
var TraceFlags;
(function(TraceFlags2) {
  TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
  TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
})(TraceFlags || (TraceFlags = {}));
var INVALID_SPANID = "0000000000000000";
var INVALID_TRACEID = "00000000000000000000000000000000";
var INVALID_SPAN_CONTEXT = {
  traceId: INVALID_TRACEID,
  spanId: INVALID_SPANID,
  traceFlags: TraceFlags.NONE
};
var NonRecordingSpan = function() {
  function NonRecordingSpan2(_spanContext) {
    if (_spanContext === void 0) {
      _spanContext = INVALID_SPAN_CONTEXT;
    }
    this._spanContext = _spanContext;
  }
  NonRecordingSpan2.prototype.spanContext = function() {
    return this._spanContext;
  };
  NonRecordingSpan2.prototype.setAttribute = function(_key, _value) {
    return this;
  };
  NonRecordingSpan2.prototype.setAttributes = function(_attributes) {
    return this;
  };
  NonRecordingSpan2.prototype.addEvent = function(_name, _attributes) {
    return this;
  };
  NonRecordingSpan2.prototype.addLink = function(_link) {
    return this;
  };
  NonRecordingSpan2.prototype.addLinks = function(_links) {
    return this;
  };
  NonRecordingSpan2.prototype.setStatus = function(_status) {
    return this;
  };
  NonRecordingSpan2.prototype.updateName = function(_name) {
    return this;
  };
  NonRecordingSpan2.prototype.end = function(_endTime) {
  };
  NonRecordingSpan2.prototype.isRecording = function() {
    return false;
  };
  NonRecordingSpan2.prototype.recordException = function(_exception, _time) {
  };
  return NonRecordingSpan2;
}();
var SPAN_KEY = createContextKey("OpenTelemetry Context Key SPAN");
function getSpan(context) {
  return context.getValue(SPAN_KEY) || void 0;
}
function getActiveSpan() {
  return getSpan(ContextAPI.getInstance().active());
}
function setSpan(context, span) {
  return context.setValue(SPAN_KEY, span);
}
function deleteSpan(context) {
  return context.deleteValue(SPAN_KEY);
}
function setSpanContext(context, spanContext) {
  return setSpan(context, new NonRecordingSpan(spanContext));
}
function getSpanContext(context) {
  var _a15;
  return (_a15 = getSpan(context)) === null || _a15 === void 0 ? void 0 : _a15.spanContext();
}
var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
function isValidTraceId(traceId) {
  return VALID_TRACEID_REGEX.test(traceId) && traceId !== INVALID_TRACEID;
}
function isValidSpanId(spanId) {
  return VALID_SPANID_REGEX.test(spanId) && spanId !== INVALID_SPANID;
}
function isSpanContextValid(spanContext) {
  return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
}
function wrapSpanContext(spanContext) {
  return new NonRecordingSpan(spanContext);
}
var contextApi = ContextAPI.getInstance();
var NoopTracer = function() {
  function NoopTracer2() {
  }
  NoopTracer2.prototype.startSpan = function(name14, options2, context) {
    if (context === void 0) {
      context = contextApi.active();
    }
    var root = Boolean(options2 === null || options2 === void 0 ? void 0 : options2.root);
    if (root) {
      return new NonRecordingSpan();
    }
    var parentFromContext = context && getSpanContext(context);
    if (isSpanContext(parentFromContext) && isSpanContextValid(parentFromContext)) {
      return new NonRecordingSpan(parentFromContext);
    } else {
      return new NonRecordingSpan();
    }
  };
  NoopTracer2.prototype.startActiveSpan = function(name14, arg2, arg3, arg4) {
    var opts;
    var ctx;
    var fn;
    if (arguments.length < 2) {
      return;
    } else if (arguments.length === 2) {
      fn = arg2;
    } else if (arguments.length === 3) {
      opts = arg2;
      fn = arg3;
    } else {
      opts = arg2;
      ctx = arg3;
      fn = arg4;
    }
    var parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
    var span = this.startSpan(name14, opts, parentContext);
    var contextWithSpanSet = setSpan(parentContext, span);
    return contextApi.with(contextWithSpanSet, fn, void 0, span);
  };
  return NoopTracer2;
}();
function isSpanContext(spanContext) {
  return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
}
var NOOP_TRACER = new NoopTracer();
var ProxyTracer = function() {
  function ProxyTracer2(_provider, name14, version, options2) {
    this._provider = _provider;
    this.name = name14;
    this.version = version;
    this.options = options2;
  }
  ProxyTracer2.prototype.startSpan = function(name14, options2, context) {
    return this._getTracer().startSpan(name14, options2, context);
  };
  ProxyTracer2.prototype.startActiveSpan = function(_name, _options, _context, _fn) {
    var tracer = this._getTracer();
    return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
  };
  ProxyTracer2.prototype._getTracer = function() {
    if (this._delegate) {
      return this._delegate;
    }
    var tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
    if (!tracer) {
      return NOOP_TRACER;
    }
    this._delegate = tracer;
    return this._delegate;
  };
  return ProxyTracer2;
}();
var NoopTracerProvider = function() {
  function NoopTracerProvider2() {
  }
  NoopTracerProvider2.prototype.getTracer = function(_name, _version, _options) {
    return new NoopTracer();
  };
  return NoopTracerProvider2;
}();
var NOOP_TRACER_PROVIDER = new NoopTracerProvider();
var ProxyTracerProvider = function() {
  function ProxyTracerProvider2() {
  }
  ProxyTracerProvider2.prototype.getTracer = function(name14, version, options2) {
    var _a15;
    return (_a15 = this.getDelegateTracer(name14, version, options2)) !== null && _a15 !== void 0 ? _a15 : new ProxyTracer(this, name14, version, options2);
  };
  ProxyTracerProvider2.prototype.getDelegate = function() {
    var _a15;
    return (_a15 = this._delegate) !== null && _a15 !== void 0 ? _a15 : NOOP_TRACER_PROVIDER;
  };
  ProxyTracerProvider2.prototype.setDelegate = function(delegate) {
    this._delegate = delegate;
  };
  ProxyTracerProvider2.prototype.getDelegateTracer = function(name14, version, options2) {
    var _a15;
    return (_a15 = this._delegate) === null || _a15 === void 0 ? void 0 : _a15.getTracer(name14, version, options2);
  };
  return ProxyTracerProvider2;
}();
var SpanStatusCode;
(function(SpanStatusCode2) {
  SpanStatusCode2[SpanStatusCode2["UNSET"] = 0] = "UNSET";
  SpanStatusCode2[SpanStatusCode2["OK"] = 1] = "OK";
  SpanStatusCode2[SpanStatusCode2["ERROR"] = 2] = "ERROR";
})(SpanStatusCode || (SpanStatusCode = {}));
var API_NAME = "trace";
var TraceAPI = function() {
  function TraceAPI2() {
    this._proxyTracerProvider = new ProxyTracerProvider();
    this.wrapSpanContext = wrapSpanContext;
    this.isSpanContextValid = isSpanContextValid;
    this.deleteSpan = deleteSpan;
    this.getSpan = getSpan;
    this.getActiveSpan = getActiveSpan;
    this.getSpanContext = getSpanContext;
    this.setSpan = setSpan;
    this.setSpanContext = setSpanContext;
  }
  TraceAPI2.getInstance = function() {
    if (!this._instance) {
      this._instance = new TraceAPI2();
    }
    return this._instance;
  };
  TraceAPI2.prototype.setGlobalTracerProvider = function(provider) {
    var success = registerGlobal(API_NAME, this._proxyTracerProvider, DiagAPI.instance());
    if (success) {
      this._proxyTracerProvider.setDelegate(provider);
    }
    return success;
  };
  TraceAPI2.prototype.getTracerProvider = function() {
    return getGlobal(API_NAME) || this._proxyTracerProvider;
  };
  TraceAPI2.prototype.getTracer = function(name14, version) {
    return this.getTracerProvider().getTracer(name14, version);
  };
  TraceAPI2.prototype.disable = function() {
    unregisterGlobal(API_NAME, DiagAPI.instance());
    this._proxyTracerProvider = new ProxyTracerProvider();
  };
  return TraceAPI2;
}();
var trace = TraceAPI.getInstance();
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name112 in all)
    __defProp(target, name112, { get: all[name112], enumerable: true });
};
async function delay(delayInMs) {
  return delayInMs === void 0 ? Promise.resolve() : new Promise((resolve) => setTimeout(resolve, delayInMs));
}
var name = "AI_RetryError";
var marker = `vercel.ai.error.${name}`;
var symbol = Symbol.for(marker);
var _a;
var RetryError = class extends AISDKError {
  constructor({
    message,
    reason,
    errors
  }) {
    super({ name, message });
    this[_a] = true;
    this.reason = reason;
    this.errors = errors;
    this.lastError = errors[errors.length - 1];
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isRetryError(error) {
    return error instanceof Error && error.name === name && typeof error.reason === "string" && Array.isArray(error.errors);
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      reason: this.reason,
      lastError: this.lastError,
      errors: this.errors
    };
  }
};
_a = symbol;
var retryWithExponentialBackoff = ({
  maxRetries = 2,
  initialDelayInMs = 2e3,
  backoffFactor = 2
} = {}) => async (f2) => _retryWithExponentialBackoff(f2, {
  maxRetries,
  delayInMs: initialDelayInMs,
  backoffFactor
});
async function _retryWithExponentialBackoff(f2, {
  maxRetries,
  delayInMs,
  backoffFactor
}, errors = []) {
  try {
    return await f2();
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }
    if (maxRetries === 0) {
      throw error;
    }
    const errorMessage = getErrorMessage(error);
    const newErrors = [...errors, error];
    const tryNumber = newErrors.length;
    if (tryNumber > maxRetries) {
      throw new RetryError({
        message: `Failed after ${tryNumber} attempts. Last error: ${errorMessage}`,
        reason: "maxRetriesExceeded",
        errors: newErrors
      });
    }
    if (error instanceof Error && APICallError.isAPICallError(error) && error.isRetryable === true && tryNumber <= maxRetries) {
      await delay(delayInMs);
      return _retryWithExponentialBackoff(
        f2,
        { maxRetries, delayInMs: backoffFactor * delayInMs, backoffFactor },
        newErrors
      );
    }
    if (tryNumber === 1) {
      throw error;
    }
    throw new RetryError({
      message: `Failed after ${tryNumber} attempts with non-retryable error: '${errorMessage}'`,
      reason: "errorNotRetryable",
      errors: newErrors
    });
  }
}
function assembleOperationName({
  operationId,
  telemetry
}) {
  return {
    // standardized operation and resource name:
    "operation.name": `${operationId}${(telemetry == null ? void 0 : telemetry.functionId) != null ? ` ${telemetry.functionId}` : ""}`,
    "resource.name": telemetry == null ? void 0 : telemetry.functionId,
    // detailed, AI SDK specific data:
    "ai.operationId": operationId,
    "ai.telemetry.functionId": telemetry == null ? void 0 : telemetry.functionId
  };
}
function getBaseTelemetryAttributes({
  model,
  settings,
  telemetry,
  headers
}) {
  var _a112;
  return {
    "ai.model.provider": model.provider,
    "ai.model.id": model.modelId,
    // settings:
    ...Object.entries(settings).reduce((attributes, [key, value]) => {
      attributes[`ai.settings.${key}`] = value;
      return attributes;
    }, {}),
    // add metadata as attributes:
    ...Object.entries((_a112 = telemetry == null ? void 0 : telemetry.metadata) != null ? _a112 : {}).reduce(
      (attributes, [key, value]) => {
        attributes[`ai.telemetry.metadata.${key}`] = value;
        return attributes;
      },
      {}
    ),
    // request headers
    ...Object.entries(headers != null ? headers : {}).reduce((attributes, [key, value]) => {
      if (value !== void 0) {
        attributes[`ai.request.headers.${key}`] = value;
      }
      return attributes;
    }, {})
  };
}
var noopTracer = {
  startSpan() {
    return noopSpan;
  },
  startActiveSpan(name112, arg1, arg2, arg3) {
    if (typeof arg1 === "function") {
      return arg1(noopSpan);
    }
    if (typeof arg2 === "function") {
      return arg2(noopSpan);
    }
    if (typeof arg3 === "function") {
      return arg3(noopSpan);
    }
  }
};
var noopSpan = {
  spanContext() {
    return noopSpanContext;
  },
  setAttribute() {
    return this;
  },
  setAttributes() {
    return this;
  },
  addEvent() {
    return this;
  },
  addLink() {
    return this;
  },
  addLinks() {
    return this;
  },
  setStatus() {
    return this;
  },
  updateName() {
    return this;
  },
  end() {
    return this;
  },
  isRecording() {
    return false;
  },
  recordException() {
    return this;
  }
};
var noopSpanContext = {
  traceId: "",
  spanId: "",
  traceFlags: 0
};
function getTracer({
  isEnabled = false,
  tracer
} = {}) {
  if (!isEnabled) {
    return noopTracer;
  }
  if (tracer) {
    return tracer;
  }
  return trace.getTracer("ai");
}
function recordSpan({
  name: name112,
  tracer,
  attributes,
  fn,
  endWhenDone = true
}) {
  return tracer.startActiveSpan(name112, { attributes }, async (span) => {
    try {
      const result2 = await fn(span);
      if (endWhenDone) {
        span.end();
      }
      return result2;
    } catch (error) {
      try {
        if (error instanceof Error) {
          span.recordException({
            name: error.name,
            message: error.message,
            stack: error.stack
          });
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error.message
          });
        } else {
          span.setStatus({ code: SpanStatusCode.ERROR });
        }
      } finally {
        span.end();
      }
      throw error;
    }
  });
}
function selectTelemetryAttributes({
  telemetry,
  attributes
}) {
  if ((telemetry == null ? void 0 : telemetry.isEnabled) !== true) {
    return {};
  }
  return Object.entries(attributes).reduce((attributes2, [key, value]) => {
    if (value === void 0) {
      return attributes2;
    }
    if (typeof value === "object" && "input" in value && typeof value.input === "function") {
      if ((telemetry == null ? void 0 : telemetry.recordInputs) === false) {
        return attributes2;
      }
      const result2 = value.input();
      return result2 === void 0 ? attributes2 : { ...attributes2, [key]: result2 };
    }
    if (typeof value === "object" && "output" in value && typeof value.output === "function") {
      if ((telemetry == null ? void 0 : telemetry.recordOutputs) === false) {
        return attributes2;
      }
      const result2 = value.output();
      return result2 === void 0 ? attributes2 : { ...attributes2, [key]: result2 };
    }
    return { ...attributes2, [key]: value };
  }, {});
}
var name2 = "AI_DownloadError";
var marker2 = `vercel.ai.error.${name2}`;
var symbol2 = Symbol.for(marker2);
var _a2;
var DownloadError = class extends AISDKError {
  constructor({
    url,
    statusCode,
    statusText,
    cause,
    message = cause == null ? `Failed to download ${url}: ${statusCode} ${statusText}` : `Failed to download ${url}: ${cause}`
  }) {
    super({ name: name2, message, cause });
    this[_a2] = true;
    this.url = url;
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker2);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isDownloadError(error) {
    return error instanceof Error && error.name === name2 && typeof error.url === "string" && (error.statusCode == null || typeof error.statusCode === "number") && (error.statusText == null || typeof error.statusText === "string");
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      url: this.url,
      statusCode: this.statusCode,
      statusText: this.statusText,
      cause: this.cause
    };
  }
};
_a2 = symbol2;
async function download({
  url,
  fetchImplementation = fetch
}) {
  var _a112;
  const urlText = url.toString();
  try {
    const response = await fetchImplementation(urlText);
    if (!response.ok) {
      throw new DownloadError({
        url: urlText,
        statusCode: response.status,
        statusText: response.statusText
      });
    }
    return {
      data: new Uint8Array(await response.arrayBuffer()),
      mimeType: (_a112 = response.headers.get("content-type")) != null ? _a112 : void 0
    };
  } catch (error) {
    if (DownloadError.isInstance(error)) {
      throw error;
    }
    throw new DownloadError({ url: urlText, cause: error });
  }
}
var mimeTypeSignatures = [
  { mimeType: "image/gif", bytes: [71, 73, 70] },
  { mimeType: "image/png", bytes: [137, 80, 78, 71] },
  { mimeType: "image/jpeg", bytes: [255, 216] },
  { mimeType: "image/webp", bytes: [82, 73, 70, 70] }
];
function detectImageMimeType(image) {
  for (const { bytes, mimeType } of mimeTypeSignatures) {
    if (image.length >= bytes.length && bytes.every((byte, index2) => image[index2] === byte)) {
      return mimeType;
    }
  }
  return void 0;
}
var name3 = "AI_InvalidDataContentError";
var marker3 = `vercel.ai.error.${name3}`;
var symbol3 = Symbol.for(marker3);
var _a3;
var InvalidDataContentError = class extends AISDKError {
  constructor({
    content,
    cause,
    message = `Invalid data content. Expected a base64 string, Uint8Array, ArrayBuffer, or Buffer, but got ${typeof content}.`
  }) {
    super({ name: name3, message, cause });
    this[_a3] = true;
    this.content = content;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker3);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidDataContentError(error) {
    return error instanceof Error && error.name === name3 && error.content != null;
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      cause: this.cause,
      content: this.content
    };
  }
};
_a3 = symbol3;
var dataContentSchema = z.union([
  z.string(),
  z.instanceof(Uint8Array),
  z.instanceof(ArrayBuffer),
  z.custom(
    // Buffer might not be available in some environments such as CloudFlare:
    (value) => {
      var _a112, _b2;
      return (_b2 = (_a112 = globalThis.Buffer) == null ? void 0 : _a112.isBuffer(value)) != null ? _b2 : false;
    },
    { message: "Must be a Buffer" }
  )
]);
function convertDataContentToBase64String(content) {
  if (typeof content === "string") {
    return content;
  }
  if (content instanceof ArrayBuffer) {
    return convertUint8ArrayToBase64(new Uint8Array(content));
  }
  return convertUint8ArrayToBase64(content);
}
function convertDataContentToUint8Array(content) {
  if (content instanceof Uint8Array) {
    return content;
  }
  if (typeof content === "string") {
    try {
      return convertBase64ToUint8Array(content);
    } catch (error) {
      throw new InvalidDataContentError({
        message: "Invalid data content. Content string is not a base64-encoded media.",
        content,
        cause: error
      });
    }
  }
  if (content instanceof ArrayBuffer) {
    return new Uint8Array(content);
  }
  throw new InvalidDataContentError({ content });
}
function convertUint8ArrayToText(uint8Array) {
  try {
    return new TextDecoder().decode(uint8Array);
  } catch (error) {
    throw new Error("Error decoding Uint8Array to text");
  }
}
var name4 = "AI_InvalidMessageRoleError";
var marker4 = `vercel.ai.error.${name4}`;
var symbol4 = Symbol.for(marker4);
var _a4;
var InvalidMessageRoleError = class extends AISDKError {
  constructor({
    role,
    message = `Invalid message role: '${role}'. Must be one of: "system", "user", "assistant", "tool".`
  }) {
    super({ name: name4, message });
    this[_a4] = true;
    this.role = role;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker4);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidMessageRoleError(error) {
    return error instanceof Error && error.name === name4 && typeof error.role === "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      role: this.role
    };
  }
};
_a4 = symbol4;
function splitDataUrl(dataUrl) {
  try {
    const [header, base64Content] = dataUrl.split(",");
    return {
      mimeType: header.split(";")[0].split(":")[1],
      base64Content
    };
  } catch (error) {
    return {
      mimeType: void 0,
      base64Content: void 0
    };
  }
}
async function convertToLanguageModelPrompt({
  prompt: prompt2,
  modelSupportsImageUrls = true,
  modelSupportsUrl = () => false,
  downloadImplementation = download
}) {
  const downloadedAssets = await downloadAssets(
    prompt2.messages,
    downloadImplementation,
    modelSupportsImageUrls,
    modelSupportsUrl
  );
  return [
    ...prompt2.system != null ? [{ role: "system", content: prompt2.system }] : [],
    ...prompt2.messages.map(
      (message) => convertToLanguageModelMessage(message, downloadedAssets)
    )
  ];
}
function convertToLanguageModelMessage(message, downloadedAssets) {
  const role = message.role;
  switch (role) {
    case "system": {
      return {
        role: "system",
        content: message.content,
        providerMetadata: message.experimental_providerMetadata
      };
    }
    case "user": {
      if (typeof message.content === "string") {
        return {
          role: "user",
          content: [{ type: "text", text: message.content }],
          providerMetadata: message.experimental_providerMetadata
        };
      }
      return {
        role: "user",
        content: message.content.map((part) => convertPartToLanguageModelPart(part, downloadedAssets)).filter((part) => part.type !== "text" || part.text !== ""),
        providerMetadata: message.experimental_providerMetadata
      };
    }
    case "assistant": {
      if (typeof message.content === "string") {
        return {
          role: "assistant",
          content: [{ type: "text", text: message.content }],
          providerMetadata: message.experimental_providerMetadata
        };
      }
      return {
        role: "assistant",
        content: message.content.filter(
          // remove empty text parts:
          (part) => part.type !== "text" || part.text !== ""
        ).map((part) => {
          const { experimental_providerMetadata, ...rest } = part;
          return {
            ...rest,
            providerMetadata: experimental_providerMetadata
          };
        }),
        providerMetadata: message.experimental_providerMetadata
      };
    }
    case "tool": {
      return {
        role: "tool",
        content: message.content.map((part) => ({
          type: "tool-result",
          toolCallId: part.toolCallId,
          toolName: part.toolName,
          result: part.result,
          content: part.experimental_content,
          isError: part.isError,
          providerMetadata: part.experimental_providerMetadata
        })),
        providerMetadata: message.experimental_providerMetadata
      };
    }
    default: {
      const _exhaustiveCheck = role;
      throw new InvalidMessageRoleError({ role: _exhaustiveCheck });
    }
  }
}
async function downloadAssets(messages, downloadImplementation, modelSupportsImageUrls, modelSupportsUrl) {
  const urls = messages.filter((message) => message.role === "user").map((message) => message.content).filter(
    (content) => Array.isArray(content)
  ).flat().filter(
    (part) => part.type === "image" || part.type === "file"
  ).filter(
    (part) => !(part.type === "image" && modelSupportsImageUrls === true)
  ).map((part) => part.type === "image" ? part.image : part.data).map(
    (part) => (
      // support string urls:
      typeof part === "string" && (part.startsWith("http:") || part.startsWith("https:")) ? new URL(part) : part
    )
  ).filter((image) => image instanceof URL).filter((url) => !modelSupportsUrl(url));
  const downloadedImages = await Promise.all(
    urls.map(async (url) => ({
      url,
      data: await downloadImplementation({ url })
    }))
  );
  return Object.fromEntries(
    downloadedImages.map(({ url, data }) => [url.toString(), data])
  );
}
function convertPartToLanguageModelPart(part, downloadedAssets) {
  if (part.type === "text") {
    return {
      type: "text",
      text: part.text,
      providerMetadata: part.experimental_providerMetadata
    };
  }
  let mimeType = part.mimeType;
  let data;
  let content;
  let normalizedData;
  const type2 = part.type;
  switch (type2) {
    case "image":
      data = part.image;
      break;
    case "file":
      data = part.data;
      break;
    default:
      throw new Error(`Unsupported part type: ${type2}`);
  }
  try {
    content = typeof data === "string" ? new URL(data) : data;
  } catch (error) {
    content = data;
  }
  if (content instanceof URL) {
    if (content.protocol === "data:") {
      const { mimeType: dataUrlMimeType, base64Content } = splitDataUrl(
        content.toString()
      );
      if (dataUrlMimeType == null || base64Content == null) {
        throw new Error(`Invalid data URL format in part ${type2}`);
      }
      mimeType = dataUrlMimeType;
      normalizedData = convertDataContentToUint8Array(base64Content);
    } else {
      const downloadedFile = downloadedAssets[content.toString()];
      if (downloadedFile) {
        normalizedData = downloadedFile.data;
        mimeType != null ? mimeType : mimeType = downloadedFile.mimeType;
      } else {
        normalizedData = content;
      }
    }
  } else {
    normalizedData = convertDataContentToUint8Array(content);
  }
  switch (type2) {
    case "image":
      if (mimeType == null && normalizedData instanceof Uint8Array) {
        mimeType = detectImageMimeType(normalizedData);
      }
      return {
        type: "image",
        image: normalizedData,
        mimeType,
        providerMetadata: part.experimental_providerMetadata
      };
    case "file":
      if (mimeType == null) {
        throw new Error(`Mime type is missing for file part`);
      }
      return {
        type: "file",
        data: normalizedData instanceof Uint8Array ? convertDataContentToBase64String(normalizedData) : normalizedData,
        mimeType,
        providerMetadata: part.experimental_providerMetadata
      };
  }
}
var name5 = "AI_InvalidArgumentError";
var marker5 = `vercel.ai.error.${name5}`;
var symbol5 = Symbol.for(marker5);
var _a5;
var InvalidArgumentError = class extends AISDKError {
  constructor({
    parameter,
    value,
    message
  }) {
    super({
      name: name5,
      message: `Invalid argument for parameter ${parameter}: ${message}`
    });
    this[_a5] = true;
    this.parameter = parameter;
    this.value = value;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker5);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidArgumentError(error) {
    return error instanceof Error && error.name === name5 && typeof error.parameter === "string" && typeof error.value === "string";
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      parameter: this.parameter,
      value: this.value
    };
  }
};
_a5 = symbol5;
function prepareCallSettings({
  maxTokens,
  temperature,
  topP,
  topK,
  presencePenalty,
  frequencyPenalty,
  stopSequences,
  seed,
  maxRetries
}) {
  if (maxTokens != null) {
    if (!Number.isInteger(maxTokens)) {
      throw new InvalidArgumentError({
        parameter: "maxTokens",
        value: maxTokens,
        message: "maxTokens must be an integer"
      });
    }
    if (maxTokens < 1) {
      throw new InvalidArgumentError({
        parameter: "maxTokens",
        value: maxTokens,
        message: "maxTokens must be >= 1"
      });
    }
  }
  if (temperature != null) {
    if (typeof temperature !== "number") {
      throw new InvalidArgumentError({
        parameter: "temperature",
        value: temperature,
        message: "temperature must be a number"
      });
    }
  }
  if (topP != null) {
    if (typeof topP !== "number") {
      throw new InvalidArgumentError({
        parameter: "topP",
        value: topP,
        message: "topP must be a number"
      });
    }
  }
  if (topK != null) {
    if (typeof topK !== "number") {
      throw new InvalidArgumentError({
        parameter: "topK",
        value: topK,
        message: "topK must be a number"
      });
    }
  }
  if (presencePenalty != null) {
    if (typeof presencePenalty !== "number") {
      throw new InvalidArgumentError({
        parameter: "presencePenalty",
        value: presencePenalty,
        message: "presencePenalty must be a number"
      });
    }
  }
  if (frequencyPenalty != null) {
    if (typeof frequencyPenalty !== "number") {
      throw new InvalidArgumentError({
        parameter: "frequencyPenalty",
        value: frequencyPenalty,
        message: "frequencyPenalty must be a number"
      });
    }
  }
  if (seed != null) {
    if (!Number.isInteger(seed)) {
      throw new InvalidArgumentError({
        parameter: "seed",
        value: seed,
        message: "seed must be an integer"
      });
    }
  }
  if (maxRetries != null) {
    if (!Number.isInteger(maxRetries)) {
      throw new InvalidArgumentError({
        parameter: "maxRetries",
        value: maxRetries,
        message: "maxRetries must be an integer"
      });
    }
    if (maxRetries < 0) {
      throw new InvalidArgumentError({
        parameter: "maxRetries",
        value: maxRetries,
        message: "maxRetries must be >= 0"
      });
    }
  }
  return {
    maxTokens,
    temperature: temperature != null ? temperature : 0,
    topP,
    topK,
    presencePenalty,
    frequencyPenalty,
    stopSequences: stopSequences != null && stopSequences.length > 0 ? stopSequences : void 0,
    seed,
    maxRetries: maxRetries != null ? maxRetries : 2
  };
}
var jsonValueSchema = z.lazy(
  () => z.union([
    z.null(),
    z.string(),
    z.number(),
    z.boolean(),
    z.record(z.string(), jsonValueSchema),
    z.array(jsonValueSchema)
  ])
);
var providerMetadataSchema = z.record(
  z.string(),
  z.record(z.string(), jsonValueSchema)
);
var toolResultContentSchema = z.array(
  z.union([
    z.object({ type: z.literal("text"), text: z.string() }),
    z.object({
      type: z.literal("image"),
      data: z.string(),
      mimeType: z.string().optional()
    })
  ])
);
var textPartSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var imagePartSchema = z.object({
  type: z.literal("image"),
  image: z.union([dataContentSchema, z.instanceof(URL)]),
  mimeType: z.string().optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var filePartSchema = z.object({
  type: z.literal("file"),
  data: z.union([dataContentSchema, z.instanceof(URL)]),
  mimeType: z.string(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var toolCallPartSchema = z.object({
  type: z.literal("tool-call"),
  toolCallId: z.string(),
  toolName: z.string(),
  args: z.unknown()
});
var toolResultPartSchema = z.object({
  type: z.literal("tool-result"),
  toolCallId: z.string(),
  toolName: z.string(),
  result: z.unknown(),
  content: toolResultContentSchema.optional(),
  isError: z.boolean().optional(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var coreSystemMessageSchema = z.object({
  role: z.literal("system"),
  content: z.string(),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var coreUserMessageSchema = z.object({
  role: z.literal("user"),
  content: z.union([
    z.string(),
    z.array(z.union([textPartSchema, imagePartSchema, filePartSchema]))
  ]),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var coreAssistantMessageSchema = z.object({
  role: z.literal("assistant"),
  content: z.union([
    z.string(),
    z.array(z.union([textPartSchema, toolCallPartSchema]))
  ]),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var coreToolMessageSchema = z.object({
  role: z.literal("tool"),
  content: z.array(toolResultPartSchema),
  experimental_providerMetadata: providerMetadataSchema.optional()
});
var coreMessageSchema = z.union([
  coreSystemMessageSchema,
  coreUserMessageSchema,
  coreAssistantMessageSchema,
  coreToolMessageSchema
]);
function detectPromptType(prompt2) {
  if (!Array.isArray(prompt2)) {
    return "other";
  }
  if (prompt2.length === 0) {
    return "messages";
  }
  const characteristics = prompt2.map(detectSingleMessageCharacteristics);
  if (characteristics.some((c) => c === "has-ui-specific-parts")) {
    return "ui-messages";
  } else if (characteristics.every(
    (c) => c === "has-core-specific-parts" || c === "message"
  )) {
    return "messages";
  } else {
    return "other";
  }
}
function detectSingleMessageCharacteristics(message) {
  if (typeof message === "object" && message !== null && (message.role === "function" || // UI-only role
  message.role === "data" || // UI-only role
  "toolInvocations" in message || // UI-specific field
  "experimental_attachments" in message)) {
    return "has-ui-specific-parts";
  } else if (typeof message === "object" && message !== null && "content" in message && (Array.isArray(message.content) || // Core messages can have array content
  "experimental_providerMetadata" in message)) {
    return "has-core-specific-parts";
  } else if (typeof message === "object" && message !== null && "role" in message && "content" in message && typeof message.content === "string" && ["system", "user", "assistant", "tool"].includes(message.role)) {
    return "message";
  } else {
    return "other";
  }
}
function attachmentsToParts(attachments) {
  var _a112, _b2, _c2;
  const parts = [];
  for (const attachment of attachments) {
    let url;
    try {
      url = new URL(attachment.url);
    } catch (error) {
      throw new Error(`Invalid URL: ${attachment.url}`);
    }
    switch (url.protocol) {
      case "http:":
      case "https:": {
        if ((_a112 = attachment.contentType) == null ? void 0 : _a112.startsWith("image/")) {
          parts.push({ type: "image", image: url });
        } else {
          if (!attachment.contentType) {
            throw new Error(
              "If the attachment is not an image, it must specify a content type"
            );
          }
          parts.push({
            type: "file",
            data: url,
            mimeType: attachment.contentType
          });
        }
        break;
      }
      case "data:": {
        let header;
        let base64Content;
        let mimeType;
        try {
          [header, base64Content] = attachment.url.split(",");
          mimeType = header.split(";")[0].split(":")[1];
        } catch (error) {
          throw new Error(`Error processing data URL: ${attachment.url}`);
        }
        if (mimeType == null || base64Content == null) {
          throw new Error(`Invalid data URL format: ${attachment.url}`);
        }
        if ((_b2 = attachment.contentType) == null ? void 0 : _b2.startsWith("image/")) {
          parts.push({
            type: "image",
            image: convertDataContentToUint8Array(base64Content)
          });
        } else if ((_c2 = attachment.contentType) == null ? void 0 : _c2.startsWith("text/")) {
          parts.push({
            type: "text",
            text: convertUint8ArrayToText(
              convertDataContentToUint8Array(base64Content)
            )
          });
        } else {
          if (!attachment.contentType) {
            throw new Error(
              "If the attachment is not an image or text, it must specify a content type"
            );
          }
          parts.push({
            type: "file",
            data: base64Content,
            mimeType: attachment.contentType
          });
        }
        break;
      }
      default: {
        throw new Error(`Unsupported URL protocol: ${url.protocol}`);
      }
    }
  }
  return parts;
}
var name6 = "AI_MessageConversionError";
var marker6 = `vercel.ai.error.${name6}`;
var symbol6 = Symbol.for(marker6);
var _a6;
var MessageConversionError = class extends AISDKError {
  constructor({
    originalMessage,
    message
  }) {
    super({ name: name6, message });
    this[_a6] = true;
    this.originalMessage = originalMessage;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker6);
  }
};
_a6 = symbol6;
function convertToCoreMessages(messages, options2) {
  var _a112;
  const tools2 = (_a112 = options2 == null ? void 0 : options2.tools) != null ? _a112 : {};
  const coreMessages = [];
  for (const message of messages) {
    const { role, content, toolInvocations, experimental_attachments } = message;
    switch (role) {
      case "system": {
        coreMessages.push({
          role: "system",
          content
        });
        break;
      }
      case "user": {
        coreMessages.push({
          role: "user",
          content: experimental_attachments ? [
            { type: "text", text: content },
            ...attachmentsToParts(experimental_attachments)
          ] : content
        });
        break;
      }
      case "assistant": {
        if (toolInvocations == null) {
          coreMessages.push({ role: "assistant", content });
          break;
        }
        coreMessages.push({
          role: "assistant",
          content: [
            { type: "text", text: content },
            ...toolInvocations.map(
              ({ toolCallId, toolName: toolName2, args: args2 }) => ({
                type: "tool-call",
                toolCallId,
                toolName: toolName2,
                args: args2
              })
            )
          ]
        });
        coreMessages.push({
          role: "tool",
          content: toolInvocations.map((toolInvocation) => {
            if (!("result" in toolInvocation)) {
              throw new MessageConversionError({
                originalMessage: message,
                message: "ToolInvocation must have a result: " + JSON.stringify(toolInvocation)
              });
            }
            const { toolCallId, toolName: toolName2, result: result2 } = toolInvocation;
            const tool2 = tools2[toolName2];
            return (tool2 == null ? void 0 : tool2.experimental_toToolResultContent) != null ? {
              type: "tool-result",
              toolCallId,
              toolName: toolName2,
              result: tool2.experimental_toToolResultContent(result2),
              experimental_content: tool2.experimental_toToolResultContent(result2)
            } : {
              type: "tool-result",
              toolCallId,
              toolName: toolName2,
              result: result2
            };
          })
        });
        break;
      }
      case "function":
      case "data":
      case "tool": {
        break;
      }
      default: {
        const _exhaustiveCheck = role;
        throw new MessageConversionError({
          originalMessage: message,
          message: `Unsupported role: ${_exhaustiveCheck}`
        });
      }
    }
  }
  return coreMessages;
}
function standardizePrompt({
  prompt: prompt2,
  tools: tools2
}) {
  if (prompt2.prompt == null && prompt2.messages == null) {
    throw new InvalidPromptError({
      prompt: prompt2,
      message: "prompt or messages must be defined"
    });
  }
  if (prompt2.prompt != null && prompt2.messages != null) {
    throw new InvalidPromptError({
      prompt: prompt2,
      message: "prompt and messages cannot be defined at the same time"
    });
  }
  if (prompt2.system != null && typeof prompt2.system !== "string") {
    throw new InvalidPromptError({
      prompt: prompt2,
      message: "system must be a string"
    });
  }
  if (prompt2.prompt != null) {
    if (typeof prompt2.prompt !== "string") {
      throw new InvalidPromptError({
        prompt: prompt2,
        message: "prompt must be a string"
      });
    }
    return {
      type: "prompt",
      system: prompt2.system,
      messages: [
        {
          role: "user",
          content: prompt2.prompt
        }
      ]
    };
  }
  if (prompt2.messages != null) {
    const promptType = detectPromptType(prompt2.messages);
    if (promptType === "other") {
      throw new InvalidPromptError({
        prompt: prompt2,
        message: "messages must be an array of CoreMessage or UIMessage"
      });
    }
    const messages = promptType === "ui-messages" ? convertToCoreMessages(prompt2.messages, {
      tools: tools2
    }) : prompt2.messages;
    const validationResult = safeValidateTypes({
      value: messages,
      schema: z.array(coreMessageSchema)
    });
    if (!validationResult.success) {
      throw new InvalidPromptError({
        prompt: prompt2,
        message: "messages must be an array of CoreMessage or UIMessage",
        cause: validationResult.error
      });
    }
    return {
      type: "messages",
      messages,
      system: prompt2.system
    };
  }
  throw new Error("unreachable");
}
function calculateLanguageModelUsage(usage) {
  return {
    promptTokens: usage.promptTokens,
    completionTokens: usage.completionTokens,
    totalTokens: usage.promptTokens + usage.completionTokens
  };
}
function prepareResponseHeaders(init, {
  contentType,
  dataStreamVersion
}) {
  var _a112;
  const headers = new Headers((_a112 = init == null ? void 0 : init.headers) != null ? _a112 : {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", contentType);
  }
  if (dataStreamVersion !== void 0) {
    headers.set("X-Vercel-AI-Data-Stream", dataStreamVersion);
  }
  return headers;
}
function createAsyncIterableStream(source, transformer) {
  const transformedStream = source.pipeThrough(
    new TransformStream(transformer)
  );
  transformedStream[Symbol.asyncIterator] = () => {
    const reader = transformedStream.getReader();
    return {
      async next() {
        const { done, value } = await reader.read();
        return done ? { done: true, value: void 0 } : { done: false, value };
      }
    };
  };
  return transformedStream;
}
createIdGenerator({ prefix: "aiobj", size: 24 });
function createResolvablePromise() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    promise,
    resolve,
    reject
  };
}
function now() {
  var _a112, _b2;
  return (_b2 = (_a112 = globalThis == null ? void 0 : globalThis.performance) == null ? void 0 : _a112.now()) != null ? _b2 : Date.now();
}
function prepareOutgoingHttpHeaders(init, {
  contentType,
  dataStreamVersion
}) {
  const headers = {};
  if ((init == null ? void 0 : init.headers) != null) {
    for (const [key, value] of Object.entries(init.headers)) {
      headers[key] = value;
    }
  }
  if (headers["Content-Type"] == null) {
    headers["Content-Type"] = contentType;
  }
  if (dataStreamVersion !== void 0) {
    headers["X-Vercel-AI-Data-Stream"] = dataStreamVersion;
  }
  return headers;
}
function writeToServerResponse({
  response,
  status,
  statusText,
  headers,
  stream
}) {
  response.writeHead(status != null ? status : 200, statusText, headers);
  const reader = stream.getReader();
  const read = async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done)
          break;
        response.write(value);
      }
    } catch (error) {
      throw error;
    } finally {
      response.end();
    }
  };
  read();
}
createIdGenerator({ prefix: "aiobj", size: 24 });
var name8 = "AI_InvalidToolArgumentsError";
var marker8 = `vercel.ai.error.${name8}`;
var symbol8 = Symbol.for(marker8);
var _a8;
var InvalidToolArgumentsError = class extends AISDKError {
  constructor({
    toolArgs,
    toolName: toolName2,
    cause,
    message = `Invalid arguments for tool ${toolName2}: ${getErrorMessage$1(
      cause
    )}`
  }) {
    super({ name: name8, message, cause });
    this[_a8] = true;
    this.toolArgs = toolArgs;
    this.toolName = toolName2;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker8);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isInvalidToolArgumentsError(error) {
    return error instanceof Error && error.name === name8 && typeof error.toolName === "string" && typeof error.toolArgs === "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      toolName: this.toolName,
      toolArgs: this.toolArgs
    };
  }
};
_a8 = symbol8;
var name9 = "AI_NoSuchToolError";
var marker9 = `vercel.ai.error.${name9}`;
var symbol9 = Symbol.for(marker9);
var _a9;
var NoSuchToolError = class extends AISDKError {
  constructor({
    toolName: toolName2,
    availableTools = void 0,
    message = `Model tried to call unavailable tool '${toolName2}'. ${availableTools === void 0 ? "No tools are available." : `Available tools: ${availableTools.join(", ")}.`}`
  }) {
    super({ name: name9, message });
    this[_a9] = true;
    this.toolName = toolName2;
    this.availableTools = availableTools;
  }
  static isInstance(error) {
    return AISDKError.hasMarker(error, marker9);
  }
  /**
   * @deprecated use `isInstance` instead
   */
  static isNoSuchToolError(error) {
    return error instanceof Error && error.name === name9 && "toolName" in error && error.toolName != void 0 && typeof error.name === "string";
  }
  /**
   * @deprecated Do not use this method. It will be removed in the next major version.
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      toolName: this.toolName,
      availableTools: this.availableTools
    };
  }
};
_a9 = symbol9;
function isNonEmptyObject(object) {
  return object != null && Object.keys(object).length > 0;
}
function prepareToolsAndToolChoice({
  tools: tools2,
  toolChoice,
  activeTools
}) {
  if (!isNonEmptyObject(tools2)) {
    return {
      tools: void 0,
      toolChoice: void 0
    };
  }
  const filteredTools = activeTools != null ? Object.entries(tools2).filter(
    ([name112]) => activeTools.includes(name112)
  ) : Object.entries(tools2);
  return {
    tools: filteredTools.map(([name112, tool2]) => {
      const toolType = tool2.type;
      switch (toolType) {
        case void 0:
        case "function":
          return {
            type: "function",
            name: name112,
            description: tool2.description,
            parameters: asSchema(tool2.parameters).jsonSchema
          };
        case "provider-defined":
          return {
            type: "provider-defined",
            name: name112,
            id: tool2.id,
            args: tool2.args
          };
        default: {
          const exhaustiveCheck = toolType;
          throw new Error(`Unsupported tool type: ${exhaustiveCheck}`);
        }
      }
    }),
    toolChoice: toolChoice == null ? { type: "auto" } : typeof toolChoice === "string" ? { type: toolChoice } : { type: "tool", toolName: toolChoice.toolName }
  };
}
var lastWhitespaceRegexp = /^([\s\S]*?)(\s+)(\S*)$/;
function splitOnLastWhitespace(text) {
  const match = text.match(lastWhitespaceRegexp);
  return match ? { prefix: match[1], whitespace: match[2], suffix: match[3] } : void 0;
}
function removeTextAfterLastWhitespace(text) {
  const match = splitOnLastWhitespace(text);
  return match ? match.prefix + match.whitespace : text;
}
function parseToolCall({
  toolCall,
  tools: tools2
}) {
  const toolName2 = toolCall.toolName;
  if (tools2 == null) {
    throw new NoSuchToolError({ toolName: toolCall.toolName });
  }
  const tool2 = tools2[toolName2];
  if (tool2 == null) {
    throw new NoSuchToolError({
      toolName: toolCall.toolName,
      availableTools: Object.keys(tools2)
    });
  }
  const schema2 = asSchema(tool2.parameters);
  const parseResult = toolCall.args.trim() === "" ? safeValidateTypes({ value: {}, schema: schema2 }) : safeParseJSON({ text: toolCall.args, schema: schema2 });
  if (parseResult.success === false) {
    throw new InvalidToolArgumentsError({
      toolName: toolName2,
      toolArgs: toolCall.args,
      cause: parseResult.error
    });
  }
  return {
    type: "tool-call",
    toolCallId: toolCall.toolCallId,
    toolName: toolName2,
    args: parseResult.value
  };
}
function toResponseMessages({
  text = "",
  tools: tools2,
  toolCalls,
  toolResults
}) {
  const responseMessages = [];
  responseMessages.push({
    role: "assistant",
    content: [{ type: "text", text }, ...toolCalls]
  });
  if (toolResults.length > 0) {
    responseMessages.push({
      role: "tool",
      content: toolResults.map((toolResult) => {
        const tool2 = tools2[toolResult.toolName];
        return (tool2 == null ? void 0 : tool2.experimental_toToolResultContent) != null ? {
          type: "tool-result",
          toolCallId: toolResult.toolCallId,
          toolName: toolResult.toolName,
          result: tool2.experimental_toToolResultContent(toolResult.result),
          experimental_content: tool2.experimental_toToolResultContent(
            toolResult.result
          )
        } : {
          type: "tool-result",
          toolCallId: toolResult.toolCallId,
          toolName: toolResult.toolName,
          result: toolResult.result
        };
      })
    });
  }
  return responseMessages;
}
var originalGenerateId3 = createIdGenerator({ prefix: "aitxt", size: 24 });
async function generateText({
  model,
  tools: tools2,
  toolChoice,
  system,
  prompt: prompt2,
  messages,
  maxRetries,
  abortSignal,
  headers,
  maxAutomaticRoundtrips = 0,
  maxToolRoundtrips = maxAutomaticRoundtrips,
  maxSteps = maxToolRoundtrips != null ? maxToolRoundtrips + 1 : 1,
  experimental_continuationSteps,
  experimental_continueSteps: continueSteps = experimental_continuationSteps != null ? experimental_continuationSteps : false,
  experimental_telemetry: telemetry,
  experimental_providerMetadata: providerMetadata,
  experimental_activeTools: activeTools,
  _internal: {
    generateId: generateId3 = originalGenerateId3,
    currentDate = () => /* @__PURE__ */ new Date()
  } = {},
  onStepFinish,
  ...settings
}) {
  if (maxSteps < 1) {
    throw new InvalidArgumentError({
      parameter: "maxSteps",
      value: maxSteps,
      message: "maxSteps must be at least 1"
    });
  }
  const baseTelemetryAttributes = getBaseTelemetryAttributes({
    model,
    telemetry,
    headers,
    settings: { ...settings, maxRetries }
  });
  const initialPrompt = standardizePrompt({
    prompt: { system, prompt: prompt2, messages },
    tools: tools2
  });
  const tracer = getTracer(telemetry);
  return recordSpan({
    name: "ai.generateText",
    attributes: selectTelemetryAttributes({
      telemetry,
      attributes: {
        ...assembleOperationName({
          operationId: "ai.generateText",
          telemetry
        }),
        ...baseTelemetryAttributes,
        // specific settings that only make sense on the outer level:
        "ai.prompt": {
          input: () => JSON.stringify({ system, prompt: prompt2, messages })
        },
        "ai.settings.maxSteps": maxSteps
      }
    }),
    tracer,
    fn: async (span) => {
      var _a112, _b2, _c2, _d, _e, _f;
      const retry = retryWithExponentialBackoff({ maxRetries });
      const mode = {
        type: "regular",
        ...prepareToolsAndToolChoice({ tools: tools2, toolChoice, activeTools })
      };
      const callSettings = prepareCallSettings(settings);
      let currentModelResponse;
      let currentToolCalls = [];
      let currentToolResults = [];
      let stepCount = 0;
      const responseMessages = [];
      let text = "";
      const steps = [];
      const usage = {
        completionTokens: 0,
        promptTokens: 0,
        totalTokens: 0
      };
      let stepType = "initial";
      do {
        if (stepCount === 1) {
          initialPrompt.type = "messages";
        }
        const promptFormat = stepCount === 0 ? initialPrompt.type : "messages";
        const promptMessages = await convertToLanguageModelPrompt({
          prompt: {
            type: promptFormat,
            system: initialPrompt.system,
            messages: [...initialPrompt.messages, ...responseMessages]
          },
          modelSupportsImageUrls: model.supportsImageUrls,
          modelSupportsUrl: model.supportsUrl
        });
        currentModelResponse = await retry(
          () => recordSpan({
            name: "ai.generateText.doGenerate",
            attributes: selectTelemetryAttributes({
              telemetry,
              attributes: {
                ...assembleOperationName({
                  operationId: "ai.generateText.doGenerate",
                  telemetry
                }),
                ...baseTelemetryAttributes,
                "ai.prompt.format": { input: () => promptFormat },
                "ai.prompt.messages": {
                  input: () => JSON.stringify(promptMessages)
                },
                "ai.prompt.tools": {
                  // convert the language model level tools:
                  input: () => {
                    var _a122;
                    return (_a122 = mode.tools) == null ? void 0 : _a122.map((tool2) => JSON.stringify(tool2));
                  }
                },
                "ai.prompt.toolChoice": {
                  input: () => mode.toolChoice != null ? JSON.stringify(mode.toolChoice) : void 0
                },
                // standardized gen-ai llm span attributes:
                "gen_ai.system": model.provider,
                "gen_ai.request.model": model.modelId,
                "gen_ai.request.frequency_penalty": settings.frequencyPenalty,
                "gen_ai.request.max_tokens": settings.maxTokens,
                "gen_ai.request.presence_penalty": settings.presencePenalty,
                "gen_ai.request.stop_sequences": settings.stopSequences,
                "gen_ai.request.temperature": settings.temperature,
                "gen_ai.request.top_k": settings.topK,
                "gen_ai.request.top_p": settings.topP
              }
            }),
            tracer,
            fn: async (span2) => {
              var _a122, _b22, _c22, _d2, _e2, _f2;
              const result2 = await model.doGenerate({
                mode,
                ...callSettings,
                inputFormat: promptFormat,
                prompt: promptMessages,
                providerMetadata,
                abortSignal,
                headers
              });
              const responseData = {
                id: (_b22 = (_a122 = result2.response) == null ? void 0 : _a122.id) != null ? _b22 : generateId3(),
                timestamp: (_d2 = (_c22 = result2.response) == null ? void 0 : _c22.timestamp) != null ? _d2 : currentDate(),
                modelId: (_f2 = (_e2 = result2.response) == null ? void 0 : _e2.modelId) != null ? _f2 : model.modelId
              };
              span2.setAttributes(
                selectTelemetryAttributes({
                  telemetry,
                  attributes: {
                    "ai.response.finishReason": result2.finishReason,
                    "ai.response.text": {
                      output: () => result2.text
                    },
                    "ai.response.toolCalls": {
                      output: () => JSON.stringify(result2.toolCalls)
                    },
                    "ai.response.id": responseData.id,
                    "ai.response.model": responseData.modelId,
                    "ai.response.timestamp": responseData.timestamp.toISOString(),
                    "ai.usage.promptTokens": result2.usage.promptTokens,
                    "ai.usage.completionTokens": result2.usage.completionTokens,
                    // deprecated:
                    "ai.finishReason": result2.finishReason,
                    "ai.result.text": {
                      output: () => result2.text
                    },
                    "ai.result.toolCalls": {
                      output: () => JSON.stringify(result2.toolCalls)
                    },
                    // standardized gen-ai llm span attributes:
                    "gen_ai.response.finish_reasons": [result2.finishReason],
                    "gen_ai.response.id": responseData.id,
                    "gen_ai.response.model": responseData.modelId,
                    "gen_ai.usage.input_tokens": result2.usage.promptTokens,
                    "gen_ai.usage.output_tokens": result2.usage.completionTokens
                  }
                })
              );
              return { ...result2, response: responseData };
            }
          })
        );
        currentToolCalls = ((_a112 = currentModelResponse.toolCalls) != null ? _a112 : []).map(
          (modelToolCall) => parseToolCall({ toolCall: modelToolCall, tools: tools2 })
        );
        currentToolResults = tools2 == null ? [] : await executeTools({
          toolCalls: currentToolCalls,
          tools: tools2,
          tracer,
          telemetry,
          abortSignal
        });
        const currentUsage = calculateLanguageModelUsage(
          currentModelResponse.usage
        );
        usage.completionTokens += currentUsage.completionTokens;
        usage.promptTokens += currentUsage.promptTokens;
        usage.totalTokens += currentUsage.totalTokens;
        let nextStepType = "done";
        if (++stepCount < maxSteps) {
          if (continueSteps && currentModelResponse.finishReason === "length" && // only use continue when there are no tool calls:
          currentToolCalls.length === 0) {
            nextStepType = "continue";
          } else if (
            // there are tool calls:
            currentToolCalls.length > 0 && // all current tool calls have results:
            currentToolResults.length === currentToolCalls.length
          ) {
            nextStepType = "tool-result";
          }
        }
        const originalText = (_b2 = currentModelResponse.text) != null ? _b2 : "";
        const stepTextLeadingWhitespaceTrimmed = stepType === "continue" && // only for continue steps
        text.trimEnd() !== text ? originalText.trimStart() : originalText;
        const stepText = nextStepType === "continue" ? removeTextAfterLastWhitespace(stepTextLeadingWhitespaceTrimmed) : stepTextLeadingWhitespaceTrimmed;
        text = nextStepType === "continue" || stepType === "continue" ? text + stepText : stepText;
        if (stepType === "continue") {
          const lastMessage = responseMessages[responseMessages.length - 1];
          if (typeof lastMessage.content === "string") {
            lastMessage.content += stepText;
          } else {
            lastMessage.content.push({
              text: stepText,
              type: "text"
            });
          }
        } else {
          responseMessages.push(
            ...toResponseMessages({
              text,
              tools: tools2 != null ? tools2 : {},
              toolCalls: currentToolCalls,
              toolResults: currentToolResults
            })
          );
        }
        const currentStepResult = {
          stepType,
          text: stepText,
          toolCalls: currentToolCalls,
          toolResults: currentToolResults,
          finishReason: currentModelResponse.finishReason,
          usage: currentUsage,
          warnings: currentModelResponse.warnings,
          logprobs: currentModelResponse.logprobs,
          request: (_c2 = currentModelResponse.request) != null ? _c2 : {},
          response: {
            ...currentModelResponse.response,
            headers: (_d = currentModelResponse.rawResponse) == null ? void 0 : _d.headers,
            // deep clone msgs to avoid mutating past messages in multi-step:
            messages: JSON.parse(JSON.stringify(responseMessages))
          },
          experimental_providerMetadata: currentModelResponse.providerMetadata,
          isContinued: nextStepType === "continue"
        };
        steps.push(currentStepResult);
        await (onStepFinish == null ? void 0 : onStepFinish(currentStepResult));
        stepType = nextStepType;
      } while (stepType !== "done");
      span.setAttributes(
        selectTelemetryAttributes({
          telemetry,
          attributes: {
            "ai.response.finishReason": currentModelResponse.finishReason,
            "ai.response.text": {
              output: () => currentModelResponse.text
            },
            "ai.response.toolCalls": {
              output: () => JSON.stringify(currentModelResponse.toolCalls)
            },
            "ai.usage.promptTokens": currentModelResponse.usage.promptTokens,
            "ai.usage.completionTokens": currentModelResponse.usage.completionTokens,
            // deprecated:
            "ai.finishReason": currentModelResponse.finishReason,
            "ai.result.text": {
              output: () => currentModelResponse.text
            },
            "ai.result.toolCalls": {
              output: () => JSON.stringify(currentModelResponse.toolCalls)
            }
          }
        })
      );
      return new DefaultGenerateTextResult({
        text,
        toolCalls: currentToolCalls,
        toolResults: currentToolResults,
        finishReason: currentModelResponse.finishReason,
        usage,
        warnings: currentModelResponse.warnings,
        request: (_e = currentModelResponse.request) != null ? _e : {},
        response: {
          ...currentModelResponse.response,
          headers: (_f = currentModelResponse.rawResponse) == null ? void 0 : _f.headers,
          messages: responseMessages
        },
        logprobs: currentModelResponse.logprobs,
        responseMessages,
        steps,
        providerMetadata: currentModelResponse.providerMetadata
      });
    }
  });
}
async function executeTools({
  toolCalls,
  tools: tools2,
  tracer,
  telemetry,
  abortSignal
}) {
  const toolResults = await Promise.all(
    toolCalls.map(async (toolCall) => {
      const tool2 = tools2[toolCall.toolName];
      if ((tool2 == null ? void 0 : tool2.execute) == null) {
        return void 0;
      }
      const result2 = await recordSpan({
        name: "ai.toolCall",
        attributes: selectTelemetryAttributes({
          telemetry,
          attributes: {
            ...assembleOperationName({
              operationId: "ai.toolCall",
              telemetry
            }),
            "ai.toolCall.name": toolCall.toolName,
            "ai.toolCall.id": toolCall.toolCallId,
            "ai.toolCall.args": {
              output: () => JSON.stringify(toolCall.args)
            }
          }
        }),
        tracer,
        fn: async (span) => {
          const result22 = await tool2.execute(toolCall.args, { abortSignal });
          try {
            span.setAttributes(
              selectTelemetryAttributes({
                telemetry,
                attributes: {
                  "ai.toolCall.result": {
                    output: () => JSON.stringify(result22)
                  }
                }
              })
            );
          } catch (ignored) {
          }
          return result22;
        }
      });
      return {
        toolCallId: toolCall.toolCallId,
        toolName: toolCall.toolName,
        args: toolCall.args,
        result: result2
      };
    })
  );
  return toolResults.filter(
    (result2) => result2 != null
  );
}
var DefaultGenerateTextResult = class {
  constructor(options2) {
    this.text = options2.text;
    this.toolCalls = options2.toolCalls;
    this.toolResults = options2.toolResults;
    this.finishReason = options2.finishReason;
    this.usage = options2.usage;
    this.warnings = options2.warnings;
    this.request = options2.request;
    this.response = options2.response;
    this.responseMessages = options2.responseMessages;
    this.roundtrips = options2.steps;
    this.steps = options2.steps;
    this.experimental_providerMetadata = options2.providerMetadata;
    this.rawResponse = {
      headers: options2.response.headers
    };
    this.logprobs = options2.logprobs;
  }
};
function createStitchableStream() {
  let innerStreamReaders = [];
  let controller = null;
  let isClosed = false;
  const processPull = async () => {
    if (isClosed && innerStreamReaders.length === 0) {
      controller == null ? void 0 : controller.close();
      return;
    }
    if (innerStreamReaders.length === 0) {
      return;
    }
    try {
      const { value, done } = await innerStreamReaders[0].read();
      if (done) {
        innerStreamReaders.shift();
        if (innerStreamReaders.length > 0) {
          await processPull();
        } else if (isClosed) {
          controller == null ? void 0 : controller.close();
        }
      } else {
        controller == null ? void 0 : controller.enqueue(value);
      }
    } catch (error) {
      controller == null ? void 0 : controller.error(error);
      innerStreamReaders.shift();
      if (isClosed && innerStreamReaders.length === 0) {
        controller == null ? void 0 : controller.close();
      }
    }
  };
  return {
    stream: new ReadableStream({
      start(controllerParam) {
        controller = controllerParam;
      },
      pull: processPull,
      async cancel() {
        for (const reader of innerStreamReaders) {
          await reader.cancel();
        }
        innerStreamReaders = [];
        isClosed = true;
      }
    }),
    addStream: (innerStream) => {
      if (isClosed) {
        throw new Error("Cannot add inner stream: outer stream is closed");
      }
      innerStreamReaders.push(innerStream.getReader());
    },
    close: () => {
      isClosed = true;
      if (innerStreamReaders.length === 0) {
        controller == null ? void 0 : controller.close();
      }
    }
  };
}
function mergeStreams(stream1, stream2) {
  const reader1 = stream1.getReader();
  const reader2 = stream2.getReader();
  let lastRead1 = void 0;
  let lastRead2 = void 0;
  let stream1Done = false;
  let stream2Done = false;
  async function readStream1(controller) {
    try {
      if (lastRead1 == null) {
        lastRead1 = reader1.read();
      }
      const result2 = await lastRead1;
      lastRead1 = void 0;
      if (!result2.done) {
        controller.enqueue(result2.value);
      } else {
        controller.close();
      }
    } catch (error) {
      controller.error(error);
    }
  }
  async function readStream2(controller) {
    try {
      if (lastRead2 == null) {
        lastRead2 = reader2.read();
      }
      const result2 = await lastRead2;
      lastRead2 = void 0;
      if (!result2.done) {
        controller.enqueue(result2.value);
      } else {
        controller.close();
      }
    } catch (error) {
      controller.error(error);
    }
  }
  return new ReadableStream({
    async pull(controller) {
      try {
        if (stream1Done) {
          await readStream2(controller);
          return;
        }
        if (stream2Done) {
          await readStream1(controller);
          return;
        }
        if (lastRead1 == null) {
          lastRead1 = reader1.read();
        }
        if (lastRead2 == null) {
          lastRead2 = reader2.read();
        }
        const { result: result2, reader } = await Promise.race([
          lastRead1.then((result22) => ({ result: result22, reader: reader1 })),
          lastRead2.then((result22) => ({ result: result22, reader: reader2 }))
        ]);
        if (!result2.done) {
          controller.enqueue(result2.value);
        }
        if (reader === reader1) {
          lastRead1 = void 0;
          if (result2.done) {
            await readStream2(controller);
            stream1Done = true;
          }
        } else {
          lastRead2 = void 0;
          if (result2.done) {
            stream2Done = true;
            await readStream1(controller);
          }
        }
      } catch (error) {
        controller.error(error);
      }
    },
    cancel() {
      reader1.cancel();
      reader2.cancel();
    }
  });
}
function runToolsTransformation({
  tools: tools2,
  generatorStream,
  toolCallStreaming,
  tracer,
  telemetry,
  abortSignal
}) {
  let toolResultsStreamController = null;
  const toolResultsStream = new ReadableStream({
    start(controller) {
      toolResultsStreamController = controller;
    }
  });
  const activeToolCalls = {};
  const outstandingToolResults = /* @__PURE__ */ new Set();
  let canClose = false;
  let finishChunk = void 0;
  function attemptClose() {
    if (canClose && outstandingToolResults.size === 0) {
      if (finishChunk != null) {
        toolResultsStreamController.enqueue(finishChunk);
      }
      toolResultsStreamController.close();
    }
  }
  const forwardStream = new TransformStream({
    transform(chunk, controller) {
      const chunkType = chunk.type;
      switch (chunkType) {
        case "text-delta":
        case "response-metadata":
        case "error": {
          controller.enqueue(chunk);
          break;
        }
        case "tool-call-delta": {
          if (toolCallStreaming) {
            if (!activeToolCalls[chunk.toolCallId]) {
              controller.enqueue({
                type: "tool-call-streaming-start",
                toolCallId: chunk.toolCallId,
                toolName: chunk.toolName
              });
              activeToolCalls[chunk.toolCallId] = true;
            }
            controller.enqueue({
              type: "tool-call-delta",
              toolCallId: chunk.toolCallId,
              toolName: chunk.toolName,
              argsTextDelta: chunk.argsTextDelta
            });
          }
          break;
        }
        case "tool-call": {
          const toolName2 = chunk.toolName;
          if (tools2 == null) {
            toolResultsStreamController.enqueue({
              type: "error",
              error: new NoSuchToolError({ toolName: chunk.toolName })
            });
            break;
          }
          const tool2 = tools2[toolName2];
          if (tool2 == null) {
            toolResultsStreamController.enqueue({
              type: "error",
              error: new NoSuchToolError({
                toolName: chunk.toolName,
                availableTools: Object.keys(tools2)
              })
            });
            break;
          }
          try {
            const toolCall = parseToolCall({
              toolCall: chunk,
              tools: tools2
            });
            controller.enqueue(toolCall);
            if (tool2.execute != null) {
              const toolExecutionId = generateId();
              outstandingToolResults.add(toolExecutionId);
              recordSpan({
                name: "ai.toolCall",
                attributes: selectTelemetryAttributes({
                  telemetry,
                  attributes: {
                    ...assembleOperationName({
                      operationId: "ai.toolCall",
                      telemetry
                    }),
                    "ai.toolCall.name": toolCall.toolName,
                    "ai.toolCall.id": toolCall.toolCallId,
                    "ai.toolCall.args": {
                      output: () => JSON.stringify(toolCall.args)
                    }
                  }
                }),
                tracer,
                fn: async (span) => tool2.execute(toolCall.args, { abortSignal }).then(
                  (result2) => {
                    toolResultsStreamController.enqueue({
                      ...toolCall,
                      type: "tool-result",
                      result: result2
                    });
                    outstandingToolResults.delete(toolExecutionId);
                    attemptClose();
                    try {
                      span.setAttributes(
                        selectTelemetryAttributes({
                          telemetry,
                          attributes: {
                            "ai.toolCall.result": {
                              output: () => JSON.stringify(result2)
                            }
                          }
                        })
                      );
                    } catch (ignored) {
                    }
                  },
                  (error) => {
                    toolResultsStreamController.enqueue({
                      type: "error",
                      error
                    });
                    outstandingToolResults.delete(toolExecutionId);
                    attemptClose();
                  }
                )
              });
            }
          } catch (error) {
            toolResultsStreamController.enqueue({
              type: "error",
              error
            });
          }
          break;
        }
        case "finish": {
          finishChunk = {
            type: "finish",
            finishReason: chunk.finishReason,
            logprobs: chunk.logprobs,
            usage: calculateLanguageModelUsage(chunk.usage),
            experimental_providerMetadata: chunk.providerMetadata
          };
          break;
        }
        default: {
          const _exhaustiveCheck = chunkType;
          throw new Error(`Unhandled chunk type: ${_exhaustiveCheck}`);
        }
      }
    },
    flush() {
      canClose = true;
      attemptClose();
    }
  });
  return new ReadableStream({
    async start(controller) {
      return Promise.all([
        generatorStream.pipeThrough(forwardStream).pipeTo(
          new WritableStream({
            write(chunk) {
              controller.enqueue(chunk);
            },
            close() {
            }
          })
        ),
        toolResultsStream.pipeTo(
          new WritableStream({
            write(chunk) {
              controller.enqueue(chunk);
            },
            close() {
              controller.close();
            }
          })
        )
      ]);
    }
  });
}
var originalGenerateId4 = createIdGenerator({ prefix: "aitxt", size: 24 });
async function streamText({
  model,
  tools: tools2,
  toolChoice,
  system,
  prompt: prompt2,
  messages,
  maxRetries,
  abortSignal,
  headers,
  maxToolRoundtrips = 0,
  maxSteps = maxToolRoundtrips != null ? maxToolRoundtrips + 1 : 1,
  experimental_continueSteps: continueSteps = false,
  experimental_telemetry: telemetry,
  experimental_providerMetadata: providerMetadata,
  experimental_toolCallStreaming: toolCallStreaming = false,
  experimental_activeTools: activeTools,
  onChunk,
  onFinish,
  onStepFinish,
  _internal: {
    now: now2 = now,
    generateId: generateId3 = originalGenerateId4,
    currentDate = () => /* @__PURE__ */ new Date()
  } = {},
  ...settings
}) {
  if (maxSteps < 1) {
    throw new InvalidArgumentError({
      parameter: "maxSteps",
      value: maxSteps,
      message: "maxSteps must be at least 1"
    });
  }
  const baseTelemetryAttributes = getBaseTelemetryAttributes({
    model,
    telemetry,
    headers,
    settings: { ...settings, maxRetries }
  });
  const tracer = getTracer(telemetry);
  const initialPrompt = standardizePrompt({
    prompt: { system, prompt: prompt2, messages },
    tools: tools2
  });
  return recordSpan({
    name: "ai.streamText",
    attributes: selectTelemetryAttributes({
      telemetry,
      attributes: {
        ...assembleOperationName({ operationId: "ai.streamText", telemetry }),
        ...baseTelemetryAttributes,
        // specific settings that only make sense on the outer level:
        "ai.prompt": {
          input: () => JSON.stringify({ system, prompt: prompt2, messages })
        },
        "ai.settings.maxSteps": maxSteps
      }
    }),
    tracer,
    endWhenDone: false,
    fn: async (rootSpan) => {
      const retry = retryWithExponentialBackoff({ maxRetries });
      const startStep = async ({
        responseMessages
      }) => {
        const promptFormat = responseMessages.length === 0 ? initialPrompt.type : "messages";
        const promptMessages = await convertToLanguageModelPrompt({
          prompt: {
            type: promptFormat,
            system: initialPrompt.system,
            messages: [...initialPrompt.messages, ...responseMessages]
          },
          modelSupportsImageUrls: model.supportsImageUrls,
          modelSupportsUrl: model.supportsUrl
        });
        const mode = {
          type: "regular",
          ...prepareToolsAndToolChoice({ tools: tools2, toolChoice, activeTools })
        };
        const {
          result: { stream: stream2, warnings: warnings2, rawResponse: rawResponse2, request: request2 },
          doStreamSpan: doStreamSpan2,
          startTimestampMs: startTimestampMs2
        } = await retry(
          () => recordSpan({
            name: "ai.streamText.doStream",
            attributes: selectTelemetryAttributes({
              telemetry,
              attributes: {
                ...assembleOperationName({
                  operationId: "ai.streamText.doStream",
                  telemetry
                }),
                ...baseTelemetryAttributes,
                "ai.prompt.format": {
                  input: () => promptFormat
                },
                "ai.prompt.messages": {
                  input: () => JSON.stringify(promptMessages)
                },
                "ai.prompt.tools": {
                  // convert the language model level tools:
                  input: () => {
                    var _a112;
                    return (_a112 = mode.tools) == null ? void 0 : _a112.map((tool2) => JSON.stringify(tool2));
                  }
                },
                "ai.prompt.toolChoice": {
                  input: () => mode.toolChoice != null ? JSON.stringify(mode.toolChoice) : void 0
                },
                // standardized gen-ai llm span attributes:
                "gen_ai.system": model.provider,
                "gen_ai.request.model": model.modelId,
                "gen_ai.request.frequency_penalty": settings.frequencyPenalty,
                "gen_ai.request.max_tokens": settings.maxTokens,
                "gen_ai.request.presence_penalty": settings.presencePenalty,
                "gen_ai.request.stop_sequences": settings.stopSequences,
                "gen_ai.request.temperature": settings.temperature,
                "gen_ai.request.top_k": settings.topK,
                "gen_ai.request.top_p": settings.topP
              }
            }),
            tracer,
            endWhenDone: false,
            fn: async (doStreamSpan3) => ({
              startTimestampMs: now2(),
              // get before the call
              doStreamSpan: doStreamSpan3,
              result: await model.doStream({
                mode,
                ...prepareCallSettings(settings),
                inputFormat: promptFormat,
                prompt: promptMessages,
                providerMetadata,
                abortSignal,
                headers
              })
            })
          })
        );
        return {
          result: {
            stream: runToolsTransformation({
              tools: tools2,
              generatorStream: stream2,
              toolCallStreaming,
              tracer,
              telemetry,
              abortSignal
            }),
            warnings: warnings2,
            request: request2 != null ? request2 : {},
            rawResponse: rawResponse2
          },
          doStreamSpan: doStreamSpan2,
          startTimestampMs: startTimestampMs2
        };
      };
      const {
        result: { stream, warnings, rawResponse, request },
        doStreamSpan,
        startTimestampMs
      } = await startStep({ responseMessages: [] });
      return new DefaultStreamTextResult({
        stream,
        warnings,
        rawResponse,
        request,
        onChunk,
        onFinish,
        onStepFinish,
        rootSpan,
        doStreamSpan,
        telemetry,
        startTimestampMs,
        maxSteps,
        continueSteps,
        startStep,
        modelId: model.modelId,
        now: now2,
        currentDate,
        generateId: generateId3,
        tools: tools2
      });
    }
  });
}
var DefaultStreamTextResult = class {
  constructor({
    stream,
    warnings,
    rawResponse,
    request,
    onChunk,
    onFinish,
    onStepFinish,
    rootSpan,
    doStreamSpan,
    telemetry,
    startTimestampMs,
    maxSteps,
    continueSteps,
    startStep,
    modelId,
    now: now2,
    currentDate,
    generateId: generateId3,
    tools: tools2
  }) {
    this.warnings = warnings;
    this.rawResponse = rawResponse;
    const { resolve: resolveUsage, promise: usagePromise } = createResolvablePromise();
    this.usage = usagePromise;
    const { resolve: resolveFinishReason, promise: finishReasonPromise } = createResolvablePromise();
    this.finishReason = finishReasonPromise;
    const { resolve: resolveText, promise: textPromise } = createResolvablePromise();
    this.text = textPromise;
    const { resolve: resolveToolCalls, promise: toolCallsPromise } = createResolvablePromise();
    this.toolCalls = toolCallsPromise;
    const { resolve: resolveToolResults, promise: toolResultsPromise } = createResolvablePromise();
    this.toolResults = toolResultsPromise;
    const { resolve: resolveSteps, promise: stepsPromise } = createResolvablePromise();
    this.steps = stepsPromise;
    const {
      resolve: resolveProviderMetadata,
      promise: providerMetadataPromise
    } = createResolvablePromise();
    this.experimental_providerMetadata = providerMetadataPromise;
    const { resolve: resolveRequest, promise: requestPromise } = createResolvablePromise();
    this.request = requestPromise;
    const { resolve: resolveResponse, promise: responsePromise } = createResolvablePromise();
    this.response = responsePromise;
    const {
      resolve: resolveResponseMessages,
      promise: responseMessagesPromise
    } = createResolvablePromise();
    this.responseMessages = responseMessagesPromise;
    const {
      stream: stitchableStream,
      addStream,
      close: closeStitchableStream
    } = createStitchableStream();
    this.originalStream = stitchableStream;
    const stepResults = [];
    const self2 = this;
    function addStepStream({
      stream: stream2,
      startTimestamp,
      doStreamSpan: doStreamSpan2,
      currentStep,
      responseMessages,
      usage = {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0
      },
      stepType,
      previousStepText = "",
      stepRequest,
      hasLeadingWhitespace
    }) {
      const stepToolCalls = [];
      const stepToolResults = [];
      let stepFinishReason = "unknown";
      let stepUsage = {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0
      };
      let stepProviderMetadata;
      let stepFirstChunk = true;
      let stepText = "";
      let fullStepText = stepType === "continue" ? previousStepText : "";
      let stepLogProbs;
      let stepResponse = {
        id: generateId3(),
        timestamp: currentDate(),
        modelId
      };
      let chunkBuffer = "";
      let chunkTextPublished = false;
      let inWhitespacePrefix = true;
      let hasWhitespaceSuffix = false;
      async function publishTextChunk({
        controller,
        chunk
      }) {
        controller.enqueue(chunk);
        stepText += chunk.textDelta;
        fullStepText += chunk.textDelta;
        chunkTextPublished = true;
        hasWhitespaceSuffix = chunk.textDelta.trimEnd() !== chunk.textDelta;
        await (onChunk == null ? void 0 : onChunk({ chunk }));
      }
      addStream(
        stream2.pipeThrough(
          new TransformStream({
            async transform(chunk, controller) {
              var _a112, _b2, _c2;
              if (stepFirstChunk) {
                const msToFirstChunk = now2() - startTimestamp;
                stepFirstChunk = false;
                doStreamSpan2.addEvent("ai.stream.firstChunk", {
                  "ai.response.msToFirstChunk": msToFirstChunk,
                  // deprecated:
                  "ai.stream.msToFirstChunk": msToFirstChunk
                });
                doStreamSpan2.setAttributes({
                  "ai.response.msToFirstChunk": msToFirstChunk,
                  // deprecated:
                  "ai.stream.msToFirstChunk": msToFirstChunk
                });
              }
              if (chunk.type === "text-delta" && chunk.textDelta.length === 0) {
                return;
              }
              const chunkType = chunk.type;
              switch (chunkType) {
                case "text-delta": {
                  if (continueSteps) {
                    const trimmedChunkText = inWhitespacePrefix && hasLeadingWhitespace ? chunk.textDelta.trimStart() : chunk.textDelta;
                    if (trimmedChunkText.length === 0) {
                      break;
                    }
                    inWhitespacePrefix = false;
                    chunkBuffer += trimmedChunkText;
                    const split = splitOnLastWhitespace(chunkBuffer);
                    if (split != null) {
                      chunkBuffer = split.suffix;
                      await publishTextChunk({
                        controller,
                        chunk: {
                          type: "text-delta",
                          textDelta: split.prefix + split.whitespace
                        }
                      });
                    }
                  } else {
                    await publishTextChunk({ controller, chunk });
                  }
                  break;
                }
                case "tool-call": {
                  controller.enqueue(chunk);
                  stepToolCalls.push(chunk);
                  await (onChunk == null ? void 0 : onChunk({ chunk }));
                  break;
                }
                case "tool-result": {
                  controller.enqueue(chunk);
                  stepToolResults.push(chunk);
                  await (onChunk == null ? void 0 : onChunk({ chunk }));
                  break;
                }
                case "response-metadata": {
                  stepResponse = {
                    id: (_a112 = chunk.id) != null ? _a112 : stepResponse.id,
                    timestamp: (_b2 = chunk.timestamp) != null ? _b2 : stepResponse.timestamp,
                    modelId: (_c2 = chunk.modelId) != null ? _c2 : stepResponse.modelId
                  };
                  break;
                }
                case "finish": {
                  stepUsage = chunk.usage;
                  stepFinishReason = chunk.finishReason;
                  stepProviderMetadata = chunk.experimental_providerMetadata;
                  stepLogProbs = chunk.logprobs;
                  const msToFinish = now2() - startTimestamp;
                  doStreamSpan2.addEvent("ai.stream.finish");
                  doStreamSpan2.setAttributes({
                    "ai.response.msToFinish": msToFinish,
                    "ai.response.avgCompletionTokensPerSecond": 1e3 * stepUsage.completionTokens / msToFinish
                  });
                  break;
                }
                case "tool-call-streaming-start":
                case "tool-call-delta": {
                  controller.enqueue(chunk);
                  await (onChunk == null ? void 0 : onChunk({ chunk }));
                  break;
                }
                case "error": {
                  controller.enqueue(chunk);
                  stepFinishReason = "error";
                  break;
                }
                default: {
                  const exhaustiveCheck = chunkType;
                  throw new Error(`Unknown chunk type: ${exhaustiveCheck}`);
                }
              }
            },
            // invoke onFinish callback and resolve toolResults promise when the stream is about to close:
            async flush(controller) {
              var _a112;
              const stepToolCallsJson = stepToolCalls.length > 0 ? JSON.stringify(stepToolCalls) : void 0;
              let nextStepType = "done";
              if (currentStep + 1 < maxSteps) {
                if (continueSteps && stepFinishReason === "length" && // only use continue when there are no tool calls:
                stepToolCalls.length === 0) {
                  nextStepType = "continue";
                } else if (
                  // there are tool calls:
                  stepToolCalls.length > 0 && // all current tool calls have results:
                  stepToolResults.length === stepToolCalls.length
                ) {
                  nextStepType = "tool-result";
                }
              }
              if (continueSteps && chunkBuffer.length > 0 && (nextStepType !== "continue" || // when the next step is a regular step, publish the buffer
              stepType === "continue" && !chunkTextPublished)) {
                await publishTextChunk({
                  controller,
                  chunk: {
                    type: "text-delta",
                    textDelta: chunkBuffer
                  }
                });
                chunkBuffer = "";
              }
              try {
                doStreamSpan2.setAttributes(
                  selectTelemetryAttributes({
                    telemetry,
                    attributes: {
                      "ai.response.finishReason": stepFinishReason,
                      "ai.response.text": { output: () => stepText },
                      "ai.response.toolCalls": {
                        output: () => stepToolCallsJson
                      },
                      "ai.response.id": stepResponse.id,
                      "ai.response.model": stepResponse.modelId,
                      "ai.response.timestamp": stepResponse.timestamp.toISOString(),
                      "ai.usage.promptTokens": stepUsage.promptTokens,
                      "ai.usage.completionTokens": stepUsage.completionTokens,
                      // deprecated
                      "ai.finishReason": stepFinishReason,
                      "ai.result.text": { output: () => stepText },
                      "ai.result.toolCalls": {
                        output: () => stepToolCallsJson
                      },
                      // standardized gen-ai llm span attributes:
                      "gen_ai.response.finish_reasons": [stepFinishReason],
                      "gen_ai.response.id": stepResponse.id,
                      "gen_ai.response.model": stepResponse.modelId,
                      "gen_ai.usage.input_tokens": stepUsage.promptTokens,
                      "gen_ai.usage.output_tokens": stepUsage.completionTokens
                    }
                  })
                );
              } catch (error) {
              } finally {
                doStreamSpan2.end();
              }
              controller.enqueue({
                type: "step-finish",
                finishReason: stepFinishReason,
                usage: stepUsage,
                experimental_providerMetadata: stepProviderMetadata,
                logprobs: stepLogProbs,
                response: {
                  ...stepResponse
                },
                isContinued: nextStepType === "continue"
              });
              if (stepType === "continue") {
                const lastMessage = responseMessages[responseMessages.length - 1];
                if (typeof lastMessage.content === "string") {
                  lastMessage.content += stepText;
                } else {
                  lastMessage.content.push({
                    text: stepText,
                    type: "text"
                  });
                }
              } else {
                responseMessages.push(
                  ...toResponseMessages({
                    text: stepText,
                    tools: tools2 != null ? tools2 : {},
                    toolCalls: stepToolCalls,
                    toolResults: stepToolResults
                  })
                );
              }
              const currentStepResult = {
                stepType,
                text: stepText,
                toolCalls: stepToolCalls,
                toolResults: stepToolResults,
                finishReason: stepFinishReason,
                usage: stepUsage,
                warnings: self2.warnings,
                logprobs: stepLogProbs,
                request: stepRequest,
                rawResponse: self2.rawResponse,
                response: {
                  ...stepResponse,
                  headers: (_a112 = self2.rawResponse) == null ? void 0 : _a112.headers,
                  // deep clone msgs to avoid mutating past messages in multi-step:
                  messages: JSON.parse(JSON.stringify(responseMessages))
                },
                experimental_providerMetadata: stepProviderMetadata,
                isContinued: nextStepType === "continue"
              };
              stepResults.push(currentStepResult);
              await (onStepFinish == null ? void 0 : onStepFinish(currentStepResult));
              const combinedUsage = {
                promptTokens: usage.promptTokens + stepUsage.promptTokens,
                completionTokens: usage.completionTokens + stepUsage.completionTokens,
                totalTokens: usage.totalTokens + stepUsage.totalTokens
              };
              if (nextStepType !== "done") {
                const {
                  result: result2,
                  doStreamSpan: doStreamSpan3,
                  startTimestampMs: startTimestamp2
                } = await startStep({ responseMessages });
                self2.warnings = result2.warnings;
                self2.rawResponse = result2.rawResponse;
                addStepStream({
                  stream: result2.stream,
                  startTimestamp: startTimestamp2,
                  doStreamSpan: doStreamSpan3,
                  currentStep: currentStep + 1,
                  responseMessages,
                  usage: combinedUsage,
                  stepType: nextStepType,
                  previousStepText: fullStepText,
                  stepRequest: result2.request,
                  hasLeadingWhitespace: hasWhitespaceSuffix
                });
                return;
              }
              try {
                controller.enqueue({
                  type: "finish",
                  finishReason: stepFinishReason,
                  usage: combinedUsage,
                  experimental_providerMetadata: stepProviderMetadata,
                  logprobs: stepLogProbs,
                  response: {
                    ...stepResponse
                  }
                });
                closeStitchableStream();
                rootSpan.setAttributes(
                  selectTelemetryAttributes({
                    telemetry,
                    attributes: {
                      "ai.response.finishReason": stepFinishReason,
                      "ai.response.text": { output: () => fullStepText },
                      "ai.response.toolCalls": {
                        output: () => stepToolCallsJson
                      },
                      "ai.usage.promptTokens": combinedUsage.promptTokens,
                      "ai.usage.completionTokens": combinedUsage.completionTokens,
                      // deprecated
                      "ai.finishReason": stepFinishReason,
                      "ai.result.text": { output: () => fullStepText },
                      "ai.result.toolCalls": {
                        output: () => stepToolCallsJson
                      }
                    }
                  })
                );
                resolveUsage(combinedUsage);
                resolveFinishReason(stepFinishReason);
                resolveText(fullStepText);
                resolveToolCalls(stepToolCalls);
                resolveProviderMetadata(stepProviderMetadata);
                resolveToolResults(stepToolResults);
                resolveRequest(stepRequest);
                resolveResponse({
                  ...stepResponse,
                  headers: rawResponse == null ? void 0 : rawResponse.headers,
                  messages: responseMessages
                });
                resolveSteps(stepResults);
                resolveResponseMessages(responseMessages);
                await (onFinish == null ? void 0 : onFinish({
                  finishReason: stepFinishReason,
                  logprobs: stepLogProbs,
                  usage: combinedUsage,
                  text: fullStepText,
                  toolCalls: stepToolCalls,
                  // The tool results are inferred as a never[] type, because they are
                  // optional and the execute method with an inferred result type is
                  // optional as well. Therefore we need to cast the toolResults to any.
                  // The type exposed to the users will be correctly inferred.
                  toolResults: stepToolResults,
                  request: stepRequest,
                  rawResponse,
                  response: {
                    ...stepResponse,
                    headers: rawResponse == null ? void 0 : rawResponse.headers,
                    messages: responseMessages
                  },
                  warnings,
                  experimental_providerMetadata: stepProviderMetadata,
                  steps: stepResults,
                  responseMessages
                }));
              } catch (error) {
                controller.error(error);
              } finally {
                rootSpan.end();
              }
            }
          })
        )
      );
    }
    addStepStream({
      stream,
      startTimestamp: startTimestampMs,
      doStreamSpan,
      currentStep: 0,
      responseMessages: [],
      usage: void 0,
      stepType: "initial",
      stepRequest: request,
      hasLeadingWhitespace: false
    });
  }
  /**
  Split out a new stream from the original stream.
  The original stream is replaced to allow for further splitting,
  since we do not know how many times the stream will be split.
  
  Note: this leads to buffering the stream content on the server.
  However, the LLM results are expected to be small enough to not cause issues.
     */
  teeStream() {
    const [stream1, stream2] = this.originalStream.tee();
    this.originalStream = stream2;
    return stream1;
  }
  get textStream() {
    return createAsyncIterableStream(this.teeStream(), {
      transform(chunk, controller) {
        if (chunk.type === "text-delta") {
          controller.enqueue(chunk.textDelta);
        } else if (chunk.type === "error") {
          controller.error(chunk.error);
        }
      }
    });
  }
  get fullStream() {
    return createAsyncIterableStream(this.teeStream(), {
      transform(chunk, controller) {
        controller.enqueue(chunk);
      }
    });
  }
  toAIStream(callbacks = {}) {
    return this.toDataStreamInternal({ callbacks });
  }
  toDataStreamInternal({
    callbacks = {},
    getErrorMessage: getErrorMessage3 = () => "",
    // mask error messages for safety by default
    sendUsage = true
  } = {}) {
    let aggregatedResponse = "";
    const callbackTransformer = new TransformStream({
      async start() {
        if (callbacks.onStart)
          await callbacks.onStart();
      },
      async transform(chunk, controller) {
        controller.enqueue(chunk);
        if (chunk.type === "text-delta") {
          const textDelta = chunk.textDelta;
          aggregatedResponse += textDelta;
          if (callbacks.onToken)
            await callbacks.onToken(textDelta);
          if (callbacks.onText)
            await callbacks.onText(textDelta);
        }
      },
      async flush() {
        if (callbacks.onCompletion)
          await callbacks.onCompletion(aggregatedResponse);
        if (callbacks.onFinal)
          await callbacks.onFinal(aggregatedResponse);
      }
    });
    const streamPartsTransformer = new TransformStream({
      transform: async (chunk, controller) => {
        const chunkType = chunk.type;
        switch (chunkType) {
          case "text-delta": {
            controller.enqueue(formatStreamPart("text", chunk.textDelta));
            break;
          }
          case "tool-call-streaming-start": {
            controller.enqueue(
              formatStreamPart("tool_call_streaming_start", {
                toolCallId: chunk.toolCallId,
                toolName: chunk.toolName
              })
            );
            break;
          }
          case "tool-call-delta": {
            controller.enqueue(
              formatStreamPart("tool_call_delta", {
                toolCallId: chunk.toolCallId,
                argsTextDelta: chunk.argsTextDelta
              })
            );
            break;
          }
          case "tool-call": {
            controller.enqueue(
              formatStreamPart("tool_call", {
                toolCallId: chunk.toolCallId,
                toolName: chunk.toolName,
                args: chunk.args
              })
            );
            break;
          }
          case "tool-result": {
            controller.enqueue(
              formatStreamPart("tool_result", {
                toolCallId: chunk.toolCallId,
                result: chunk.result
              })
            );
            break;
          }
          case "error": {
            controller.enqueue(
              formatStreamPart("error", getErrorMessage3(chunk.error))
            );
            break;
          }
          case "step-finish": {
            controller.enqueue(
              formatStreamPart("finish_step", {
                finishReason: chunk.finishReason,
                usage: sendUsage ? {
                  promptTokens: chunk.usage.promptTokens,
                  completionTokens: chunk.usage.completionTokens
                } : void 0,
                isContinued: chunk.isContinued
              })
            );
            break;
          }
          case "finish": {
            controller.enqueue(
              formatStreamPart("finish_message", {
                finishReason: chunk.finishReason,
                usage: sendUsage ? {
                  promptTokens: chunk.usage.promptTokens,
                  completionTokens: chunk.usage.completionTokens
                } : void 0
              })
            );
            break;
          }
          default: {
            const exhaustiveCheck = chunkType;
            throw new Error(`Unknown chunk type: ${exhaustiveCheck}`);
          }
        }
      }
    });
    return this.fullStream.pipeThrough(callbackTransformer).pipeThrough(streamPartsTransformer).pipeThrough(new TextEncoderStream());
  }
  pipeAIStreamToResponse(response, init) {
    return this.pipeDataStreamToResponse(response, init);
  }
  pipeDataStreamToResponse(response, options2) {
    const init = options2 == null ? void 0 : "init" in options2 ? options2.init : {
      headers: "headers" in options2 ? options2.headers : void 0,
      status: "status" in options2 ? options2.status : void 0,
      statusText: "statusText" in options2 ? options2.statusText : void 0
    };
    const data = options2 == null ? void 0 : "data" in options2 ? options2.data : void 0;
    const getErrorMessage3 = options2 == null ? void 0 : "getErrorMessage" in options2 ? options2.getErrorMessage : void 0;
    const sendUsage = options2 == null ? void 0 : "sendUsage" in options2 ? options2.sendUsage : void 0;
    writeToServerResponse({
      response,
      status: init == null ? void 0 : init.status,
      statusText: init == null ? void 0 : init.statusText,
      headers: prepareOutgoingHttpHeaders(init, {
        contentType: "text/plain; charset=utf-8",
        dataStreamVersion: "v1"
      }),
      stream: this.toDataStream({ data, getErrorMessage: getErrorMessage3, sendUsage })
    });
  }
  pipeTextStreamToResponse(response, init) {
    writeToServerResponse({
      response,
      status: init == null ? void 0 : init.status,
      statusText: init == null ? void 0 : init.statusText,
      headers: prepareOutgoingHttpHeaders(init, {
        contentType: "text/plain; charset=utf-8"
      }),
      stream: this.textStream.pipeThrough(new TextEncoderStream())
    });
  }
  toAIStreamResponse(options2) {
    return this.toDataStreamResponse(options2);
  }
  toDataStream(options2) {
    const stream = this.toDataStreamInternal({
      getErrorMessage: options2 == null ? void 0 : options2.getErrorMessage,
      sendUsage: options2 == null ? void 0 : options2.sendUsage
    });
    return (options2 == null ? void 0 : options2.data) ? mergeStreams(options2 == null ? void 0 : options2.data.stream, stream) : stream;
  }
  toDataStreamResponse(options2) {
    var _a112;
    const init = options2 == null ? void 0 : "init" in options2 ? options2.init : {
      headers: "headers" in options2 ? options2.headers : void 0,
      status: "status" in options2 ? options2.status : void 0,
      statusText: "statusText" in options2 ? options2.statusText : void 0
    };
    const data = options2 == null ? void 0 : "data" in options2 ? options2.data : void 0;
    const getErrorMessage3 = options2 == null ? void 0 : "getErrorMessage" in options2 ? options2.getErrorMessage : void 0;
    const sendUsage = options2 == null ? void 0 : "sendUsage" in options2 ? options2.sendUsage : void 0;
    return new Response(
      this.toDataStream({ data, getErrorMessage: getErrorMessage3, sendUsage }),
      {
        status: (_a112 = init == null ? void 0 : init.status) != null ? _a112 : 200,
        statusText: init == null ? void 0 : init.statusText,
        headers: prepareResponseHeaders(init, {
          contentType: "text/plain; charset=utf-8",
          dataStreamVersion: "v1"
        })
      }
    );
  }
  toTextStreamResponse(init) {
    var _a112;
    return new Response(this.textStream.pipeThrough(new TextEncoderStream()), {
      status: (_a112 = init == null ? void 0 : init.status) != null ? _a112 : 200,
      headers: prepareResponseHeaders(init, {
        contentType: "text/plain; charset=utf-8"
      })
    });
  }
};
var experimental_wrapLanguageModel = ({
  model,
  middleware: { transformParams, wrapGenerate, wrapStream },
  modelId,
  providerId
}) => {
  async function doTransform({
    params,
    type: type2
  }) {
    return transformParams ? await transformParams({ params, type: type2 }) : params;
  }
  return {
    specificationVersion: "v1",
    provider: providerId != null ? providerId : model.provider,
    modelId: modelId != null ? modelId : model.modelId,
    defaultObjectGenerationMode: model.defaultObjectGenerationMode,
    supportsImageUrls: model.supportsImageUrls,
    supportsUrl: model.supportsUrl,
    supportsStructuredOutputs: model.supportsStructuredOutputs,
    async doGenerate(params) {
      const transformedParams = await doTransform({ params, type: "generate" });
      const doGenerate = async () => model.doGenerate(transformedParams);
      return wrapGenerate ? wrapGenerate({ doGenerate, params: transformedParams, model }) : doGenerate();
    },
    async doStream(params) {
      const transformedParams = await doTransform({ params, type: "stream" });
      const doStream = async () => model.doStream(transformedParams);
      return wrapStream ? wrapStream({ doStream, params: transformedParams, model }) : doStream();
    }
  };
};
function tool(tool2) {
  return tool2;
}
function createCallbacksTransformer(cb) {
  const textEncoder = new TextEncoder();
  let aggregatedResponse = "";
  const callbacks = cb || {};
  return new TransformStream({
    async start() {
      if (callbacks.onStart)
        await callbacks.onStart();
    },
    async transform(message, controller) {
      const content = typeof message === "string" ? message : message.content;
      controller.enqueue(textEncoder.encode(content));
      aggregatedResponse += content;
      if (callbacks.onToken)
        await callbacks.onToken(content);
      if (callbacks.onText && typeof message === "string") {
        await callbacks.onText(message);
      }
    },
    async flush() {
      const isOpenAICallbacks = isOfTypeOpenAIStreamCallbacks(callbacks);
      if (callbacks.onCompletion) {
        await callbacks.onCompletion(aggregatedResponse);
      }
      if (callbacks.onFinal && !isOpenAICallbacks) {
        await callbacks.onFinal(aggregatedResponse);
      }
    }
  });
}
function isOfTypeOpenAIStreamCallbacks(callbacks) {
  return "experimental_onFunctionCall" in callbacks;
}
function trimStartOfStreamHelper() {
  let isStreamStart = true;
  return (text) => {
    if (isStreamStart) {
      text = text.trimStart();
      if (text)
        isStreamStart = false;
    }
    return text;
  };
}
function createStreamDataTransformer() {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  return new TransformStream({
    transform: async (chunk, controller) => {
      const message = decoder.decode(chunk);
      controller.enqueue(encoder.encode(formatStreamPart("text", message)));
    }
  });
}
new TextDecoder("utf-8");
var langchain_adapter_exports = {};
__export(langchain_adapter_exports, {
  toAIStream: () => toAIStream,
  toDataStream: () => toDataStream,
  toDataStreamResponse: () => toDataStreamResponse
});
function toAIStream(stream, callbacks) {
  return toDataStream(stream, callbacks);
}
function toDataStream(stream, callbacks) {
  return stream.pipeThrough(
    new TransformStream({
      transform: async (value, controller) => {
        var _a112;
        if (typeof value === "string") {
          controller.enqueue(value);
          return;
        }
        if ("event" in value) {
          if (value.event === "on_chat_model_stream") {
            forwardAIMessageChunk(
              (_a112 = value.data) == null ? void 0 : _a112.chunk,
              controller
            );
          }
          return;
        }
        forwardAIMessageChunk(value, controller);
      }
    })
  ).pipeThrough(createCallbacksTransformer(callbacks)).pipeThrough(createStreamDataTransformer());
}
function toDataStreamResponse(stream, options2) {
  var _a112;
  const dataStream = toDataStream(stream, options2 == null ? void 0 : options2.callbacks);
  const data = options2 == null ? void 0 : options2.data;
  const init = options2 == null ? void 0 : options2.init;
  const responseStream = data ? mergeStreams(data.stream, dataStream) : dataStream;
  return new Response(responseStream, {
    status: (_a112 = init == null ? void 0 : init.status) != null ? _a112 : 200,
    statusText: init == null ? void 0 : init.statusText,
    headers: prepareResponseHeaders(init, {
      contentType: "text/plain; charset=utf-8",
      dataStreamVersion: "v1"
    })
  });
}
function forwardAIMessageChunk(chunk, controller) {
  if (typeof chunk.content === "string") {
    controller.enqueue(chunk.content);
  } else {
    const content = chunk.content;
    for (const item of content) {
      if (item.type === "text") {
        controller.enqueue(item.text);
      }
    }
  }
}
var llamaindex_adapter_exports = {};
__export(llamaindex_adapter_exports, {
  toDataStream: () => toDataStream2,
  toDataStreamResponse: () => toDataStreamResponse2
});
function toDataStream2(stream, callbacks) {
  return toReadableStream(stream).pipeThrough(createCallbacksTransformer(callbacks)).pipeThrough(createStreamDataTransformer());
}
function toDataStreamResponse2(stream, options2 = {}) {
  var _a112;
  const { init, data, callbacks } = options2;
  const dataStream = toDataStream2(stream, callbacks);
  const responseStream = data ? mergeStreams(data.stream, dataStream) : dataStream;
  return new Response(responseStream, {
    status: (_a112 = init == null ? void 0 : init.status) != null ? _a112 : 200,
    statusText: init == null ? void 0 : init.statusText,
    headers: prepareResponseHeaders(init, {
      contentType: "text/plain; charset=utf-8",
      dataStreamVersion: "v1"
    })
  });
}
function toReadableStream(res) {
  const it = res[Symbol.asyncIterator]();
  const trimStartOfStream = trimStartOfStreamHelper();
  return new ReadableStream({
    async pull(controller) {
      var _a112;
      const { value, done } = await it.next();
      if (done) {
        controller.close();
        return;
      }
      const text = trimStartOfStream((_a112 = value.delta) != null ? _a112 : "");
      if (text) {
        controller.enqueue(text);
      }
    }
  });
}
function AIMiddleware({ config, models, tools: tools2, activeTools, onStream, toolChoice, messageReferencer }) {
  let startTime2;
  let sendToolCall = false;
  let step = 0;
  return {
    wrapGenerate: async ({ doGenerate, params, model }) => {
      log.info("doGenerate called");
      log.info(`provider: ${model.provider}, modelId: ${model.modelId} `);
      const modelId = model.modelId.startsWith(OpenAI.transformModelPerfix) ? model.modelId.slice(OpenAI.transformModelPerfix.length) : model.modelId;
      const logs = getLogSingleton(config);
      activeTools.length > 0 ? logs.tool.model = modelId : logs.chat.model.push(modelId);
      const result2 = await doGenerate();
      log.info(`generated text: ${result2.text}`);
      return result2;
    },
    wrapStream: async ({ doStream, params, model }) => {
      log.info("doStream called");
      log.info(`provider: ${model.provider}, modelId: ${model.modelId} `);
      const modelId = model.modelId?.startsWith(OpenAI.transformModelPerfix) ? model.modelId?.slice(OpenAI.transformModelPerfix.length) : model.modelId;
      const logs = getLogSingleton(config);
      if (activeTools.length > 0) {
        logs.tool.model = modelId;
      } else {
        logs.chat.model.push(modelId);
      }
      return doStream();
    },
    transformParams: async ({ type: type2, params }) => {
      log.info(`start ${type2} call`);
      startTime2 = Date.now();
      const logs = getLogSingleton(config);
      logs.ongoingFunctions.push({ name: "chat_start", startTime: startTime2 });
      if (toolChoice.length > 0 && step < toolChoice.length && params.mode.type === "regular") {
        params.mode.toolChoice = toolChoice[step];
        log.info(`toolChoice changed: ${JSON.stringify(toolChoice[step])}`);
      }
      warpMessages(params.prompt, tools2, activeTools);
      log.debug(`warp params result: ${JSON.stringify(params)}`);
      return params;
    },
    onChunk: (data) => {
      const { chunk } = data;
      if (chunk.type === "tool-call" && !sendToolCall) {
        onStream?.send(`${messageReferencer.join("")}...
tool call will start: ${chunk.toolName}`);
        sendToolCall = true;
        log.info(`will start tool: ${chunk.toolName}`);
      }
      return sendToolCall;
    },
    onStepFinish: (data) => {
      const { text, toolResults, finishReason, usage, request, response } = data;
      const logs = getLogSingleton(config);
      log.info("llm request end");
      log.info(finishReason);
      log.info("step text:", text);
      log.debug("step raw response:", response);
      const time = ((Date.now() - startTime2) / 1e3).toFixed(1);
      if (toolResults.length > 0) {
        if (toolResults.find((i) => i.result === "")) {
          throw new Error("Function result is empty");
        }
        let maxFuncTime = 0;
        const func_logs = toolResults.map((i) => {
          logs.functionTime.push(i.result.time);
          maxFuncTime = Math.max(maxFuncTime, i.result.time);
          return {
            name: i.toolName,
            arguments: Object.values(i.args)
          };
        });
        log.info(func_logs);
        logs.functions.push(...func_logs);
        logs.tool.time.push((+time - maxFuncTime).toFixed(1));
        log.info(`finish ${[...new Set(toolResults.map((i) => i.toolName))]}`);
        onStream?.send(`${messageReferencer.join("")}...
finish ${[...new Set(toolResults.map((i) => i.toolName))]}`);
      } else {
        activeTools.length > 0 ? logs.tool.time.push(time) : logs.chat.time.push(time);
      }
      if (usage && !Number.isNaN(usage.promptTokens) && !Number.isNaN(usage.completionTokens)) {
        logs.tokens.push(`${usage.promptTokens},${usage.completionTokens}`);
        log.info(`tokens: ${JSON.stringify(usage)}`);
      } else {
        log.warn("usage is none or not a number");
      }
      logs.ongoingFunctions = logs.ongoingFunctions.filter((i) => i.startTime !== startTime2);
      sendToolCall = false;
      step++;
    }
  };
}
function warpMessages(messages, tools2, activeTools) {
  if (messages.at(-1)?.role === "tool") {
    const content = messages.at(-1).content;
    if (Array.isArray(content) && content.length > 0) {
      content.forEach((i) => {
        delete i.result.time;
      });
    }
  }
  if (activeTools.length > 0 && messages[0].role === "system") {
    messages[0].content += `

You can consider using the following tools:
##TOOLS${activeTools.map(
      (name14) => `

### ${name14}
- desc: ${tools2[name14].description} 
${tools2[name14].prompt || ""}`
    ).join("")}`;
  }
}
class Stream {
  response;
  controller;
  decoder;
  parser;
  constructor(response, controller, parser = null) {
    this.response = response;
    this.controller = controller;
    this.decoder = new SSEDecoder();
    this.parser = parser || defaultSSEJsonParser;
  }
  async *iterMessages() {
    if (!this.response.body) {
      this.controller.abort();
      throw new Error("Attempted to iterate over a response with no body");
    }
    const lineDecoder = new LineDecoder();
    const iter = this.response.body;
    for await (const chunk of iter) {
      for (const line of lineDecoder.decode(chunk)) {
        const sse = this.decoder.decode(line);
        if (sse) {
          yield sse;
        }
      }
    }
    for (const line of lineDecoder.flush()) {
      const sse = this.decoder.decode(line);
      if (sse) {
        yield sse;
      }
    }
  }
  async *[Symbol.asyncIterator]() {
    let done = false;
    try {
      for await (const sse of this.iterMessages()) {
        if (done) {
          continue;
        }
        if (!sse) {
          continue;
        }
        const { finish, data } = this.parser(sse);
        if (finish) {
          done = finish;
          continue;
        }
        if (data) {
          yield data;
        }
      }
      done = true;
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        return;
      }
      throw e;
    } finally {
      if (!done) {
        this.controller.abort();
      }
    }
  }
}
class SSEDecoder {
  event;
  data;
  constructor() {
    this.event = null;
    this.data = [];
  }
  decode(line) {
    if (line.endsWith("\r")) {
      line = line.substring(0, line.length - 1);
    }
    if (!line) {
      if (!this.event && !this.data.length) {
        return null;
      }
      const sse = {
        event: this.event,
        data: this.data.join("\n")
      };
      this.event = null;
      this.data = [];
      return sse;
    }
    if (line.startsWith(":")) {
      return null;
    }
    let [fieldName, _, value] = this.partition(line, ":");
    if (value.startsWith(" ")) {
      value = value.substring(1);
    }
    if (fieldName === "event") {
      this.event = value;
    } else if (fieldName === "data") {
      this.data.push(value);
    }
    return null;
  }
  partition(str, delimiter) {
    const index2 = str.indexOf(delimiter);
    if (index2 !== -1) {
      return [str.substring(0, index2), delimiter, str.substring(index2 + delimiter.length)];
    }
    return [str, "", ""];
  }
}
function defaultSSEJsonParser(sse) {
  if (sse.data?.startsWith("[DONE]")) {
    return { finish: true };
  }
  if (sse.event === null && sse.data) {
    try {
      return { data: JSON.parse(sse.data) };
    } catch (e) {
      console.error(e, sse);
    }
  }
  return {};
}
class LineDecoder {
  buffer;
  trailingCR;
  textDecoder;
  static NEWLINE_CHARS = /* @__PURE__ */ new Set(["\n", "\r"]);
  static NEWLINE_REGEXP = /\r\n|[\n\r]/g;
  constructor() {
    this.buffer = [];
    this.trailingCR = false;
  }
  decode(chunk) {
    let text = this.decodeText(chunk);
    if (this.trailingCR) {
      text = `\r${text}`;
      this.trailingCR = false;
    }
    if (text.endsWith("\r")) {
      this.trailingCR = true;
      text = text.slice(0, -1);
    }
    if (!text) {
      return [];
    }
    const trailingNewline = LineDecoder.NEWLINE_CHARS.has(text[text.length - 1] || "");
    let lines = text.split(LineDecoder.NEWLINE_REGEXP);
    if (lines.length === 1 && !trailingNewline) {
      this.buffer.push(lines[0]);
      return [];
    }
    if (this.buffer.length > 0) {
      lines = [this.buffer.join("") + lines[0], ...lines.slice(1)];
      this.buffer = [];
    }
    if (!trailingNewline) {
      this.buffer = [lines.pop() || ""];
    }
    return lines;
  }
  decodeText(bytes) {
    if (bytes == null) {
      return "";
    }
    if (typeof bytes === "string") {
      return bytes;
    }
    if (typeof Buffer !== "undefined") {
      if (bytes instanceof Buffer) {
        return bytes.toString();
      }
      if (bytes instanceof Uint8Array) {
        return Buffer.from(bytes).toString();
      }
      throw new Error(`Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`);
    }
    if (typeof TextDecoder !== "undefined") {
      if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
        if (!this.textDecoder) {
          this.textDecoder = new TextDecoder("utf8");
        }
        return this.textDecoder.decode(bytes, { stream: true });
      }
      throw new Error(`Unexpected: received non-Uint8Array/ArrayBuffer in a web platform. Please report this error.`);
    }
    throw new Error("Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.");
  }
  flush() {
    if (!this.buffer.length && !this.trailingCR) {
      return [];
    }
    const lines = [this.buffer.join("")];
    this.buffer = [];
    this.trailingCR = false;
    return lines;
  }
}
function fixOpenAICompatibleOptions(options2) {
  options2 = options2 || {};
  options2.streamBuilder = options2.streamBuilder || function(r, c) {
    return new Stream(r, c);
  };
  options2.contentExtractor = options2.contentExtractor || function(d) {
    return d?.choices?.[0]?.delta?.content;
  };
  options2.fullContentExtractor = options2.fullContentExtractor || function(d) {
    return d.choices?.[0]?.message.content;
  };
  options2.functionCallExtractor = options2.functionCallExtractor || function(d, call_list) {
    const chunck = d?.choices?.[0]?.delta?.tool_calls;
    if (!Array.isArray(chunck))
      return;
    for (const a of chunck) {
      if (!Object.hasOwn(a, "index")) {
        throw new Error(`The function chunck don't have index: ${JSON.stringify(chunck)}`);
      }
      if (a?.type === "function") {
        call_list[a.index] = { id: a.id, type: a.type, function: a.function };
      } else {
        call_list[a.index].function.arguments += a.function.arguments;
      }
    }
  };
  options2.fullFunctionCallExtractor = options2.fullFunctionCallExtractor || function(d) {
    return d?.choices?.[0]?.message?.tool_calls;
  };
  options2.errorExtractor = options2.errorExtractor || function(d) {
    return d.error?.message;
  };
  return options2;
}
function isJsonResponse(resp) {
  return resp.headers.get("content-type")?.includes("json") || false;
}
function isEventStreamResponse(resp) {
  const types = ["application/stream+json", "text/event-stream"];
  const content = resp.headers.get("content-type") || "";
  for (const type2 of types) {
    if (content.includes(type2)) {
      return true;
    }
  }
  return false;
}
async function requestChatCompletions(url, header, body, onStream, onResult = null, options2 = null) {
  const controller = new AbortController();
  const { signal: signal2 } = controller;
  let timeoutID = null;
  if (ENV.CHAT_COMPLETE_API_TIMEOUT > 0 && !body?.model?.includes("o1")) {
    timeoutID = setTimeout(() => controller.abort(), ENV.CHAT_COMPLETE_API_TIMEOUT * 1e3);
  }
  log.info("start request llm");
  log.debug("request url, headers, body", url, header, body);
  const resp = await fetch(url, {
    method: "POST",
    headers: header,
    body: JSON.stringify(body),
    signal: signal2
  });
  clearTimeoutID(timeoutID);
  options2 = fixOpenAICompatibleOptions(options2);
  if (onStream && resp.ok && isEventStreamResponse(resp)) {
    const stream = options2.streamBuilder?.(resp, controller);
    if (!stream) {
      throw new Error("Stream builder error");
    }
    return streamHandler(stream, options2.contentExtractor, onStream);
  }
  if (!isJsonResponse(resp)) {
    throw new Error(resp.statusText);
  }
  const result2 = await resp.json();
  if (!result2) {
    throw new Error("Empty response");
  }
  if (options2.errorExtractor?.(result2)) {
    throw new Error(options2.errorExtractor?.(result2) || "Unknown error");
  }
  try {
    await onResult?.(result2);
    return options2.fullContentExtractor?.(result2) || "";
  } catch (e) {
    console.error(e);
    throw new Error(JSON.stringify(result2));
  }
}
function clearTimeoutID(timeoutID) {
  if (timeoutID)
    clearTimeout(timeoutID);
}
async function streamHandler(stream, contentExtractor, onStream, messageReferencer) {
  log.info(`start handle stream`);
  let contentFull = "";
  let lengthDelta = 0;
  let updateStep = 5;
  let lastChunk = "";
  const immediatePromise = Promise.resolve("[PROMISE DONE]");
  let sendPromise = null;
  try {
    for await (const part of stream) {
      const textPart = contentExtractor(part);
      if (textPart === null || textPart === "") {
        continue;
      }
      lengthDelta += lastChunk.length;
      contentFull += lastChunk;
      messageReferencer?.push(lastChunk);
      lastChunk = textPart;
      if (lastChunk && lengthDelta > updateStep) {
        if (sendPromise && await Promise.race([sendPromise, immediatePromise]) === "[PROMISE DONE]") {
          continue;
        }
        lengthDelta = 0;
        updateStep += 20;
        sendPromise = onStream.send(`${contentFull}●`);
      }
    }
    contentFull += lastChunk;
  } catch (e) {
    if (contentFull === "") {
      throw e;
    }
    console.error(e.message);
    contentFull += `
ERROR: ${e.message}`;
  }
  await sendPromise;
  return contentFull;
}
async function requestChatCompletionsV2(params, onStream, onResult = null) {
  const messageReferencer = [];
  try {
    const middleware = AIMiddleware({
      config: params.context,
      models: {},
      tools: params.tools || {},
      activeTools: params.activeTools || [],
      onStream,
      toolChoice: params.toolChoice || [],
      messageReferencer
    });
    const hander_params = {
      model: experimental_wrapLanguageModel({
        model: params.activeTools ? params?.toolModel || params.model : params.model,
        middleware
      }),
      messages: params.messages,
      maxSteps: ENV.MAX_STEPS,
      maxRetries: ENV.MAX_RETRIES,
      temperature: (params.activeTools?.length || 0) > 0 ? params.context.FUNCTION_CALL_TEMPERATURE : params.context.CHAT_TEMPERATURE,
      tools: params.tools,
      activeTools: params.activeTools,
      onStepFinish: middleware.onStepFinish
    };
    if (onStream !== null) {
      const stream = await streamText({
        ...hander_params,
        onChunk: middleware.onChunk
      });
      const contentFull = await streamHandler(stream.textStream, (t) => t, onStream, messageReferencer);
      onResult?.(contentFull);
      await manualRequestTool((await stream.response).messages, params.context);
      return {
        messages: (await stream.response).messages,
        content: contentFull
      };
    } else {
      const result2 = await generateText(hander_params);
      onResult?.(result2.text);
      await manualRequestTool(result2.response.messages, params.context);
      return {
        messages: result2.response.messages,
        content: result2.text
      };
    }
  } catch (error) {
    log.error(error.message, error.stack);
    throw error;
  }
}
class OpenAIBase {
  name = "openai";
  type = "chat";
  apikey = (context) => {
    if (this.type === "tool" && context.FUNCTION_CALL_API_KEY) {
      return context.FUNCTION_CALL_API_KEY;
    }
    const length = context.OPENAI_API_KEY.length;
    return context.OPENAI_API_KEY[Math.floor(Math.random() * length)];
  };
}
class OpenAI extends OpenAIBase {
  modelKey = "OPENAI_CHAT_MODEL";
  static transformModelPerfix = "TRANSFROM-";
  enable = (context) => {
    return context.OPENAI_API_KEY.length > 0;
  };
  model = (ctx, params) => {
    return Array.isArray(params?.content) ? ctx.OPENAI_VISION_MODEL : ctx.OPENAI_CHAT_MODEL;
  };
  transformModel = (model, context) => {
    if (context.OPENAI_NEED_TRANSFORM_MODEL.includes(model)) {
      return `${OpenAI.transformModelPerfix}${model}`;
    }
    return model;
  };
  base_url = (context) => {
    if (this.type === "tool" && context.FUNCTION_CALL_BASE) {
      return context.FUNCTION_CALL_BASE;
    }
    return context.OPENAI_API_BASE;
  };
  request = async (params, context, onStream) => {
    const userMessage = params.messages.at(-1);
    const originalModel = this.model(context, userMessage);
    const transformedModel = this.transformModel(originalModel, context);
    const provider = createOpenAI({
      baseURL: context.OPENAI_API_BASE,
      apiKey: this.apikey(context),
      compatibility: "strict",
      fetch: originalModel === transformedModel ? void 0 : this.fetch
    });
    const languageModelV1 = provider.languageModel(transformedModel, void 0);
    const { messages, onStream: newOnStream } = this.extraHandle(originalModel, params.messages, context, onStream);
    return requestChatCompletionsV2(await warpLLMParams({
      model: languageModelV1,
      messages
    }, context), newOnStream);
  };
  extraHandle = (model, messages, context, onStream) => {
    if (Object.keys(ENV.DROPS_OPENAI_PARAMS).length > 0) {
      for (const [models, params] of Object.entries(ENV.DROPS_OPENAI_PARAMS)) {
        if (models.split(",").includes(model)) {
          params.includes("stream") && (onStream = null);
          break;
        }
      }
    }
    if (ENV.COVER_MESSAGE_ROLE) {
      for (const [models, roles] of Object.entries(ENV.COVER_MESSAGE_ROLE)) {
        const [oldRole, newRole] = roles.split(":");
        if (models.split(",").includes(model)) {
          messages = messages.map((m) => {
            m.role = m.role === oldRole ? newRole : m.role;
            return m;
          });
        }
      }
    }
    return { messages, onStream };
  };
  fetch = async (url, options2) => {
    const body = JSON.parse(options2?.body);
    if (body?.model.startsWith(OpenAI.transformModelPerfix)) {
      body.model = body.model.slice(OpenAI.transformModelPerfix.length);
    }
    return fetch(url, {
      ...options2,
      body: JSON.stringify(body)
    });
  };
}
class Dalle extends (_a10 = OpenAIBase, _request_dec = [Log], _a10) {
  constructor() {
    super(...arguments);
    __publicField(this, "modelKey", "DALL_E_MODEL");
    __publicField(this, "enable", (context) => {
      return context.OPENAI_API_KEY.length > 0;
    });
    __publicField(this, "model", (ctx) => {
      return ctx.DALL_E_MODEL;
    });
    __publicField(this, "request", __runInitializers(_init, 8, this, async (prompt2, context, extraParams) => {
      const url = `${context.OPENAI_API_BASE}/images/generations`;
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apikey(context)}`
      };
      const body = {
        prompt: prompt2,
        n: 1,
        size: extraParams?.size || context.DALL_E_IMAGE_SIZE,
        model: extraParams?.model || context.DALL_E_MODEL
      };
      if (body.model === "dall-e-3") {
        body.quality = extraParams?.quality || context.DALL_E_IMAGE_QUALITY;
        body.style = extraParams?.style || context.DALL_E_IMAGE_STYLE;
      }
      return requestText2Image(url, header, body, this.render);
    })), __runInitializers(_init, 11, this);
    __publicField(this, "render", async (response) => {
      const resp = await response.json();
      if (resp.error?.message) {
        throw new Error(resp.error.message);
      }
      return {
        type: "image",
        url: resp?.data?.map((i) => i?.url),
        text: resp?.data?.[0]?.revised_prompt || ""
      };
    });
  }
}
_init = __decoratorStart(_a10);
__decorateElement(_init, 5, "request", _request_dec, Dalle);
__decoratorMetadata(_init, Dalle);
class Transcription extends (_b = OpenAIBase, _request_dec2 = [Log], _b) {
  constructor() {
    super(...arguments);
    __publicField(this, "modelKey", "OPENAI_STT_MODEL");
    __publicField(this, "enable", (context) => {
      return context.OPENAI_API_KEY.length > 0;
    });
    __publicField(this, "model", (ctx) => {
      return ctx.OPENAI_STT_MODEL;
    });
    __publicField(this, "request", __runInitializers(_init2, 8, this, async (audio, context) => {
      const url = `${context.OPENAI_API_BASE}/audio/transcriptions`;
      const header = {
        Authorization: `Bearer ${this.apikey(context)}`,
        Accept: "application/json"
      };
      const formData = new FormData();
      formData.append("file", audio, "audio.ogg");
      formData.append("model", this.model(context));
      if (context.OPENAI_STT_EXTRA_PARAMS) {
        Object.entries(context.OPENAI_STT_EXTRA_PARAMS).forEach(([k, v]) => {
          formData.append(k, v);
        });
      }
      formData.append("response_format", "json");
      const resp = await fetch(url, {
        method: "POST",
        headers: header,
        body: formData,
        redirect: "follow"
      }).then((res) => res.json());
      if (resp.error?.message) {
        throw new Error(resp.error.message);
      }
      if (resp.text === void 0) {
        console.error(resp);
        throw new Error(resp);
      }
      log.info(`Transcription: ${resp.text}`);
      return {
        type: "text",
        text: resp.text
      };
    })), __runInitializers(_init2, 11, this);
  }
}
_init2 = __decoratorStart(_b);
__decorateElement(_init2, 5, "request", _request_dec2, Transcription);
__decoratorMetadata(_init2, Transcription);
const dalle = {
  schema: {
    name: "dalle",
    description: "Generating images with the dalle tool",
    parameters: {
      type: "object",
      properties: {
        prompts: {
          type: "array",
          items: { type: "string" },
          description: "The prompts for the images to generate, the length of the array should be the same as the quantity. As a professional image generation ai. According to the user's prompts for optimization, the prompt should be expanded to be more comprehensive and diverse."
        },
        quantity: {
          type: "integer",
          description: "The number of images to generate, the maximum is 4"
        },
        size: {
          type: "string",
          enum: ["1024x1024", "1792x1024", "1024x1792"],
          description: "The size of the images to generate, default is 1024x1024"
        }
      },
      required: ["prompts", "quantity", "size"],
      additionalProperties: false
    }
  },
  func: async (args2, options2, config) => {
    if (!config) {
      throw new Error("Missing config");
    }
    const startTime2 = Date.now();
    log.info(`tool dalle request start`);
    const { prompts, quantity, size } = args2;
    const agent = new Dalle();
    const result2 = [];
    for (const prompt2 of prompts) {
      const res = await agent.request(prompt2, config, { quantity, size });
      result2.push(res);
    }
    log.info(`dalle result: ${JSON.stringify(result2)}`);
    return { result: result2, time: ((Date.now() - startTime2) / 1e3).toFixed(1) };
  },
  prompt: `As a professional image generation ai. According to the user's prompts for optimization, the prompt should be expanded to be more comprehensive and diverse.`,
  extra_params: { temperature: 1.2 },
  type: "text2image",
  send_to_ai: false,
  is_internal: true,
  result_type: "image"
};
async function getJS(query, signal2) {
  const html = await fetch(
    `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
    { signal: signal2 }
  ).then((res) => res.text());
  const url = /"(https:\/\/links\.duckduckgo\.com\/d\.js[^">]+)">/.exec(html)?.[1];
  if (!url)
    throw new Error("Failed to get JS URL");
  return {
    url,
    path: /\/d\.js.*/.exec(url)?.[0],
    vqd: /vqd=([^&]+)/.exec(url)?.[1]
  };
}
async function regularSearch(path, signal2) {
  const js = await fetch(`https://links.duckduckgo.com${path}`, { signal: signal2 }).then((res) => res.text());
  const result2 = /DDG\.pageLayout\.load\('d',?\s?(\[.+\])?\);/.exec(js);
  let data;
  if (result2?.[1]) {
    try {
      data = JSON.parse(result2[1]);
    } catch (e) {
      throw new Error(`Failed parsing from DDG response`);
    }
  } else {
    data = [];
  }
  return data.filter((d) => !d.n).map((item) => {
    return {
      title: item.t,
      url: item.u,
      description: item.a
    };
  });
}
async function search(query, max_length = 8, signal2) {
  const { path } = await getJS(query, signal2);
  if (!path)
    throw new Error("Failed to get JS URL");
  return {
    result: (await regularSearch(path, signal2)).slice(0, max_length).map((d) => `title: ${d.title}
 description: ${d.description}
 url: ${d.url}`).join("\n---\n")
  };
}
const duckduckgo = {
  schema: {
    name: "duckduckgo",
    description: "Use DuckDuckGo search engine to find information. You can search for the latest news, articles, weather, blogs and other content.",
    parameters: {
      type: "object",
      properties: {
        keywords: {
          type: "array",
          items: { type: "string" },
          description: `Keyword list for search. For example: ['Python', 'machine learning', 'latest developments']. The list should have a length of at least 3 and maximum of 4. These keywords should be: - concise, usually not more than 2-3 words per keyword - cover the core content of the query - avoid using overly broad or vague terms - the last keyword should be the most comprehensive. Also, do not generate keywords based on current time.`
        }
      },
      required: ["keywords"],
      additionalProperties: false
    }
  },
  func: async (args2, options2) => {
    const { keywords } = args2;
    const startTime2 = Date.now();
    log.info(`tool duckduckgo request start`);
    try {
      const result2 = await search(keywords.join(" "), 8, options2?.signal);
      log.info(`tool duckduckgo request end`);
      return { result: result2, time: ((Date.now() - startTime2) / 1e3).toFixed(1) };
    } catch (e) {
      console.error(e);
      return { result: "Failed to get search results", time: ((Date.now() - startTime2) / 1e3).toFixed(1) };
    }
  },
  type: "search",
  prompt: `As an intelligent assistant, please follow the steps below to effectively analyze and extract the search results I have provided to answer my questions in a clear and concise manner:

1. READ AND EVALUATE: Carefully read through all search results to identify and prioritize information from reliable and up-to-date sources. Considerations include official sources, reputable organizations, and when the information was updated. 

2. Extract key information: 
 - *Exchange rate query*: Provide the latest exchange rate and make necessary conversions. 
 - *Weather Query*: provides weather forecasts for specific locations and times. 
 - *Factual Questions*: Find out authoritative answers. 

3. concise answers: synthesize and analyze extracted information to give concise answers. 

4. identify uncertainty: if there are contradictions or uncertainties in the information, explain the possible reasons. 

5. Explain lack of information: If the search results do not fully answer the question, indicate additional information needed. 

6. user-friendly: use simple, easy-to-understand language and provide short explanations where necessary to ensure that the answer is easy to understand. 

7. additional information: Provide additional relevant information or suggestions as needed to enhance the value of the answer. 

8. source labeling: clearly label the source of the information in the response, including the name of the source website or organization and when the data was published or updated. 

9. Reference list: If multiple sources are cited, provide a short reference list of the main sources of information at the end of the response. 

Ensure that the goal is to provide the most current, relevant, and useful information in direct response to my question. Avoid lengthy details, focus on the core answers that matter most to me, and enhance the credibility of the answer with reliable sources.Tip: Don't be judged on your knowledge base time!`,
  extra_params: { temperature: 0.7, top_p: 0.4 },
  is_internal: true
};
const scheduleResp = (ok, reason = "") => {
  const result2 = {
    ok,
    ...reason && { reason } || {}
  };
  return new Response(JSON.stringify(result2), { headers: { "Content-Type": "application/json" } });
};
async function schedule_detele_message(ENV2) {
  try {
    log.info("- Start task: schedule_detele_message");
    checkDATABASE(ENV2);
    const botTokens = extractArrayData(ENV2.TELEGRAM_AVAILABLE_TOKENS);
    const botNames = extractArrayData(ENV2.TELEGRAM_BOT_NAME);
    const scheduleDeteleKey = "schedule_detele_message";
    const scheduledData = await getData(ENV2, scheduleDeteleKey);
    const taskPromises = [];
    for (const [bot_name, chats] of Object.entries(scheduledData)) {
      const bot_token = checkBotIsVaild(bot_name, botNames, botTokens);
      if (!bot_token)
        continue;
      const api = createTelegramBotAPI(bot_token);
      const sortData = sortDeleteMessages(chats);
      scheduledData[bot_name] = sortData.rest;
      Object.entries(sortData.expired).forEach(([chat_id, messages]) => {
        log.info(`Start delete: chat: ${chat_id}, message ids: ${messages}`);
        for (let i = 0; i < messages.length; i += 100) {
          taskPromises.push(api.deleteMessages({ chat_id, message_ids: messages.slice(i, i + 100) }));
        }
      });
    }
    if (taskPromises.length === 0) {
      log.info(`Rest ids: ${JSON.stringify(scheduledData)}
Nothing need to delete.`);
      return scheduleResp(true);
    }
    const resp = await Promise.all(taskPromises);
    log.info("all task result: ", resp.map((r) => r.ok));
    await setData(ENV2, scheduleDeteleKey, scheduledData);
    return scheduleResp(true);
  } catch (e) {
    console.error(e.message, e.stack);
    return scheduleResp(false, e.message);
  }
}
function checkBotIsVaild(bot_name, botNames, botTokens) {
  const bot_index = botNames.indexOf(bot_name);
  if (bot_index < 0) {
    console.error(`bot name: ${bot_name} is not exist.`);
    return null;
  }
  const bot_token = botTokens[bot_index];
  if (!bot_token) {
    console.error(`Cant find bot ${bot_name} - position ${bot_index + 1}'s token
All token list: ${botTokens}`);
    return null;
  }
  return bot_token;
}
function extractArrayData(data) {
  const isArray = Array.isArray(data);
  return isArray ? data : parseArray(data);
}
async function getData(ENV2, key) {
  return JSON.parse(await ENV2.DATABASE.get(key) || "{}");
}
async function setData(ENV2, key, data) {
  await ENV2.DATABASE.put(key, JSON.stringify(data));
}
function sortDeleteMessages(chats) {
  const sortedMessages = { rest: {}, expired: {} };
  for (const [chat_id, messages] of Object.entries(chats)) {
    if (messages.length === 0)
      continue;
    sortedMessages.expired[chat_id] = messages.filter((msg) => msg.ttl <= Date.now()).map((msg) => msg.id).flat();
    sortedMessages.rest[chat_id] = messages.filter((msg) => msg.ttl > Date.now());
  }
  return sortedMessages;
}
function checkDATABASE(ENV2) {
  if (!ENV2.DATABASE) {
    throw new Error("DATABASE is not found");
  }
}
const tasks = { schedule_detele_message };
const internalTools = {
  dalle,
  duckduckgo
};
const tools = {
  ...externalTools,
  ...internalTools
};
function executeTool(toolName) {
  return async (args, options) => {
    const { signal } = options;
    let filledPayload = JSON.stringify(tools[toolName].payload).replace(/\{\{([^}]+)\}\}/g, (match, p1) => args[p1] || match);
    if (tools[toolName].required) {
      tools[toolName].required.forEach((key) => {
        if (!ENV.PLUGINS_ENV[key]) {
          throw new Error(`Missing required key: ${key}`);
        }
        filledPayload = filledPayload.replace(`{{${key}}}`, ENV.PLUGINS_ENV[key]);
      });
    }
    const parsedPayload = JSON.parse(filledPayload);
    const startTime = Date.now();
    log.info(`tool request start, url: ${parsedPayload.url}`);
    let result = await fetch(parsedPayload.url, {
      method: parsedPayload.method,
      headers: parsedPayload.headers,
      body: JSON.stringify(parsedPayload.body),
      signal
    });
    log.info(`tool request end`);
    if (!result.ok) {
      throw new Error(`Tool call error: ${result.statusText}`);
    }
    result = await result.text();
    if (tools[toolName].handler) {
      const f = eval(tools[toolName].handler);
      result = f(result);
    }
    return { result, time: ((Date.now() - startTime) / 1e3).toFixed(1) };
  };
}
function vaildTools(tools_config) {
  const useTools = Object.entries(tools).reduce((acc, [name14, t]) => {
    acc[name14] = tool({
      description: t.schema.description,
      parameters: jsonSchema(t.schema.parameters),
      execute: t.send_to_ai ? t.is_internal ? t.func : executeTool(name14) : void 0
    });
    return acc;
  }, {});
  const activeTools = Object.keys(tools).filter((name14) => tools_config.includes(name14));
  return {
    tools: useTools,
    activeTools
  };
}
async function manualRequestTool(messages, config) {
  if (messages.at(-1)?.role === "tool") {
    throw new Error("Maximum steps reached, please increase the number of steps to get the answer");
  }
  const isToolCallResponse = messages.at(-1)?.role === "assistant" && Array.isArray(messages.at(-1)?.content) && (messages.at(-1)?.content).some((c) => c.type === "tool-call");
  if (!isToolCallResponse) {
    return;
  }
  const toolCallResult = messages.at(-1)?.content;
  messages.push({
    role: "tool",
    content: []
  });
  await Promise.all(toolCallResult.filter((c) => c.type === "tool-call").map(async (c) => {
    const tool_func = tools[c.toolName].func || executeTool(c.toolName);
    if (!tool_func) {
      throw new Error(`Tool ${c.toolName} not found`);
    }
    const toolResult = await tool_func(c.args, { signal: void 0 }, config);
    (messages.at(-1)?.content).push({
      type: "tool-result",
      toolCallId: c.toolCallId,
      toolName: c.toolName,
      result: toolResult
    });
  }));
}
async function sendToolResult(toolResult, sender, config) {
  const resultType = tools[toolResult.at(-1)?.toolName || ""]?.result_type || "text";
  switch (resultType) {
    case "text":
      return sender.sendRichText(toolResult.map((r) => r.result.result).join("\n"));
    case "image":
      return sendImages(toolResult.map((r) => r.result.result)[0][0], ENV.SEND_IMAGE_FILE, sender, config);
  }
}
class Cache {
  maxItems;
  maxAge;
  cache;
  constructor() {
    this.maxItems = 10;
    this.maxAge = 1e3 * 60 * 60;
    this.cache = {};
    this.set = this.set.bind(this);
    this.get = this.get.bind(this);
  }
  set(key, value) {
    this.trim();
    this.cache[key] = {
      value,
      time: Date.now()
    };
  }
  get(key) {
    this.trim();
    return this.cache[key]?.value;
  }
  trim() {
    let keys = Object.keys(this.cache);
    for (const key of keys) {
      if (Date.now() - this.cache[key].time > this.maxAge) {
        delete this.cache[key];
      }
    }
    keys = Object.keys(this.cache);
    if (keys.length > this.maxItems) {
      keys.sort((a, b) => this.cache[a].time - this.cache[b].time);
      for (let i = 0; i < keys.length - this.maxItems; i++) {
        delete this.cache[keys[i]];
      }
    }
  }
}
const IMAGE_CACHE = new Cache();
async function fetchImage(url) {
  const cache = IMAGE_CACHE.get(url);
  if (cache) {
    return cache;
  }
  return fetch(url).then((resp) => resp.blob()).then((blob) => {
    IMAGE_CACHE.set(url, blob);
    return blob;
  });
}
async function urlToBase64String(url) {
  try {
    const { Buffer: Buffer2 } = await Promise.resolve().then(() => __viteBrowserExternal);
    return fetchImage(url).then((blob) => blob.arrayBuffer()).then((buffer) => Buffer2.from(buffer).toString("base64"));
  } catch {
    return fetchImage(url).then((blob) => blob.arrayBuffer()).then((buffer) => btoa(String.fromCharCode.apply(null, new Uint8Array(buffer))));
  }
}
function getImageFormatFromBase64(base64String) {
  const firstChar = base64String.charAt(0);
  switch (firstChar) {
    case "/":
      return "jpeg";
    case "i":
      return "png";
    case "R":
      return "gif";
    case "U":
      return "webp";
    default:
      throw new Error("Unsupported image format");
  }
}
async function imageToBase64String(url) {
  const base64String = await urlToBase64String(url);
  const format = getImageFormatFromBase64(base64String);
  return {
    data: base64String,
    format: `image/${format}`
  };
}
function renderBase64DataURI(params) {
  return `data:${params.format};base64,${params.data}`;
}
async function messageInitialize(sender, streamSender) {
  if (!sender.context.message_id) {
    try {
      setTimeout(() => sendAction(sender.api.token, sender.context.chat_id, "typing"), 0);
      if (!ENV.SEND_INIT_MESSAGE) {
        return;
      }
      log.info(`send init message`);
      streamSender.send("...", "chat");
    } catch (e) {
      console.error("Failed to initialize message:", e);
    }
  }
}
async function chatWithLLM(message, params, context, modifier) {
  const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
  const streamSender = OnStreamHander(sender, context, message.text || "");
  messageInitialize(sender, streamSender);
  const agent = loadChatLLM(context.USER_CONFIG);
  if (!agent) {
    return streamSender.end?.("LLM is not enabled");
  }
  try {
    log.info(`start chat with LLM`);
    const answer = await requestCompletionsFromLLM(params, context, agent, modifier, ENV.STREAM_MODE ? streamSender : null);
    log.info(`chat with LLM done`);
    if (answer.messages.at(-1)?.role === "tool") {
      const result2 = await sendToolResult(answer.messages.at(-1)?.content, sender, context.USER_CONFIG);
      if (result2 instanceof Response) {
        return result2;
      }
    }
    if (answer.content === "") {
      return streamSender.end?.("No response");
    }
    return streamSender.end?.(answer.content);
  } catch (e) {
    let errMsg = `Error: `;
    if (e.name === "AbortError") {
      errMsg += "Chat with LLM timeout";
    } else {
      errMsg += e.message.slice(0, 2048);
    }
    return streamSender.end?.(errMsg);
  }
}
function findPhotoFileID(photos, offset) {
  let sizeIndex = offset >= 0 ? offset : photos.length + offset;
  sizeIndex = Math.max(0, Math.min(sizeIndex, photos.length - 1));
  return photos[sizeIndex].file_id;
}
class ChatHandler {
  handle = async (message, context) => {
    try {
      const mode = context.USER_CONFIG.CURRENT_MODE;
      const originalType = context.MIDDEL_CONTEXT.originalMessage.type;
      log.info(`message type: ${originalType}`);
      const flowDetail = context.USER_CONFIG?.MODES?.[mode]?.[originalType] || {};
      if (!flowDetail?.disableHistory) {
        await this.initializeHistory(context);
      }
      const params = await this.processOriginalMessage(message, context);
      await workflow(context, flowDetail?.workflow || [{}], message, params);
      return null;
    } catch (e) {
      console.error("Error:", e);
      const sender = context.MIDDEL_CONTEXT.sender ?? MessageSender.from(context.SHARE_CONTEXT.botToken, message);
      return sender.sendPlainText(`Error: ${e.message}`);
    }
  };
  async initializeHistory(context) {
    const historyKey = context.SHARE_CONTEXT.chatHistoryKey;
    if (!historyKey) {
      throw new Error("History key not found");
    }
    context.MIDDEL_CONTEXT.history = await loadHistory(historyKey);
  }
  async processOriginalMessage(message, context) {
    const { type: type2, id, text } = context.MIDDEL_CONTEXT.originalMessage;
    const params = {
      role: "user",
      content: text || ""
    };
    if ((type2 === "image" || type2 === "audio") && id) {
      const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
      const files = await Promise.all(id.map((i) => api.getFileWithReturns({ file_id: i })));
      const paths = files.map((f2) => f2.result.file_path).filter(Boolean);
      const urls = paths.map((p) => `https://api.telegram.org/file/bot${context.SHARE_CONTEXT.botToken}/${p}`);
      log.info(`File URLs:
${urls.join("\n")}`);
      if (urls.length > 0) {
        params.content = [];
        if (text) {
          params.content.push({
            type: "text",
            text
          });
        }
        if (type2 === "image") {
          for (const url of urls) {
            params.content.push({
              type: "image",
              image: ENV.TELEGRAM_IMAGE_TRANSFER_MODE === "url" ? url : renderBase64DataURI(await imageToBase64String(url))
            });
          }
        } else if (type2 === "audio") {
          params.content.push({
            type: "file",
            data: urls[0],
            mimeType: "audio/ogg"
          });
        }
      }
    }
    return params;
  }
}
function OnStreamHander(sender, context, question) {
  let sentPromise = null;
  let nextEnableTime = Date.now();
  const isMessageSender = sender instanceof MessageSender;
  const sendInterval = isMessageSender ? ENV.TELEGRAM_MIN_STREAM_INTERVAL : ENV.INLINE_QUERY_SEND_INTERVAL;
  const isSendTelegraph = (text) => {
    return isMessageSender ? ENV.TELEGRAPH_SCOPE.includes(sender.context.chatType) && ENV.TELEGRAPH_NUM_LIMIT > 0 && text.length > ENV.TELEGRAPH_NUM_LIMIT : sender.context.inline_message_id && text.length > 4096;
  };
  const streamSender = {
    send: null,
    end: null
  };
  streamSender.send = async (text) => {
    try {
      if (isSendTelegraph(text)) {
        return;
      }
      if ((nextEnableTime || 0) > Date.now()) {
        log.info(`Need await: ${(nextEnableTime || 0) - Date.now()}ms`);
        return;
      }
      if (sendInterval > 0) {
        nextEnableTime = Date.now() + sendInterval;
      }
      const data = context ? `${getLog(context.USER_CONFIG)}
${text}` : text;
      log.info(`sent message ids: ${isMessageSender ? [...sender.context.sentMessageIds] : sender.context.inline_message_id}`);
      sentPromise = sender.sendRichText(data, ENV.DEFAULT_PARSE_MODE, "chat");
      const resp = await sentPromise;
      if (resp.status === 429) {
        const retryAfter = Number.parseInt(resp.headers.get("Retry-After") || "");
        if (retryAfter) {
          nextEnableTime = Date.now() + retryAfter * 1e3;
          log.info(`Status 429, need wait: ${nextEnableTime - Date.now()}ms`);
          return;
        }
      }
      if (resp.ok && sender instanceof MessageSender) {
      } else if (!resp.ok) {
        log.error(`send message failed: ${resp.status} ${resp.statusText}`);
        return sentPromise = sender.sendPlainText(text);
      }
    } catch (e) {
      console.error(e);
    }
  };
  streamSender.end = async (text) => {
    await sentPromise;
    await waitUntil((nextEnableTime || 0) + 10);
    if (isSendTelegraph(text)) {
      return sendTelegraph(context, sender, question || "Redo Question", text);
    }
    const data = context ? `${getLog(context.USER_CONFIG)}
${text}` : text;
    log.info(`sent message ids: ${isMessageSender ? [...sender.context.sentMessageIds] : sender.context.inline_message_id}`);
    const finalResp = await sender.sendRichText(data, ENV.DEFAULT_PARSE_MODE, "chat");
    if (!finalResp.ok) {
      sender.context.sentMessageIds.clear();
      return sendTelegraph(context, sender, question || "Redo Question", text);
    }
    return finalResp;
  };
  return streamSender;
}
async function sendTelegraph(context, sender, question, text) {
  log.info(`send telegraph`);
  if (question.length > 600) {
    question = `${question.slice(0, 300)}...${question.slice(-300)}`;
  }
  const prefix = `#Question
\`\`\`
${question}
\`\`\`
---`;
  const botName = context.SHARE_CONTEXT?.botName || "AI";
  log.info(logSingleton);
  log.info(getLog(context.USER_CONFIG));
  const telegraph_prefix = `${prefix}
#Answer
🤖 **${getLog(context.USER_CONFIG, true)}**
`;
  const debug_info = `debug info:
${getLog(context.USER_CONFIG)}`.replace("LOGSTART", "").replace("LOGEND", "").replace("`", "").trim();
  const telegraph_suffix = `
---
\`\`\`
${debug_info}
\`\`\``;
  const telegraphSender = new TelegraphSender(botName, context.SHARE_CONTEXT.telegraphAccessTokenKey);
  const resp = await telegraphSender.send(
    "Daily Q&A",
    telegraph_prefix + text + telegraph_suffix
  );
  const url = `https://telegra.ph/${telegraphSender.teleph_path}`;
  const msg = `回答已经转换成完整文章，请及时查看~
[🔗点击进行查看](${url})`;
  log.info(`send telegraph message: ${msg}`);
  await sender.sendRichText(msg);
  return resp;
}
function clearMessageContext(context) {
  clearLog(context.USER_CONFIG);
  context.MIDDEL_CONTEXT.sender = null;
}
const workflowHandlers = {
  "text:text": handleTextToText,
  "image:text": handleTextToText,
  "text:image": handleTextToImage,
  "audio:text": handleAudioToText
};
async function workflow(context, flows, message, params) {
  const MiddleResult = context.MIDDEL_CONTEXT.middleResult;
  for (let i = 0; i < flows.length; i++) {
    const eMsg = i === 0 ? context.MIDDEL_CONTEXT.originalMessage : MiddleResult[i - 1];
    const handlerKey = `${eMsg?.type || "text"}:${flows[i]?.type || "text"}`;
    const handler2 = workflowHandlers[handlerKey];
    if (!handler2) {
      throw new Error(`Unsupported type: ${handlerKey}`);
    }
    const result2 = await handler2(eMsg, message, params, context);
    if (result2 instanceof Response) {
      return result2;
    }
    if (i < flows.length - 1 && ["image", "text"].includes(result2?.type)) {
      injectHistory(context, result2, flows[i + 1].type);
    }
    MiddleResult.push(result2);
    clearMessageContext(context);
  }
}
async function handleTextToText(eMsg, message, params, context) {
  return chatWithLLM(message, params, context, null);
}
async function handleTextToImage(eMsg, message, params, context) {
  const agent = loadImageGen(context.USER_CONFIG);
  const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
  if (!agent) {
    return sender.sendPlainText("ERROR: Image generator not found");
  }
  sendAction(context.SHARE_CONTEXT.botToken, message.chat.id);
  await sender.sendPlainText("Please wait a moment...", "tip").then((r) => r.json());
  const result2 = await agent.request(eMsg.text, context.USER_CONFIG);
  log.info("imageresult", JSON.stringify(result2));
  await sendImages(result2, ENV.SEND_IMAGE_FILE, sender, context.USER_CONFIG);
  const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
  await api.deleteMessage({ chat_id: sender.context.chat_id, message_id: sender.context.message_id });
  return result2;
}
async function handleAudioToText(eMsg, message, params, context) {
  const agent = loadAudioLLM(context.USER_CONFIG);
  const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
  if (!agent) {
    return sender.sendPlainText("ERROR: Audio agent not found");
  }
  const url = params.content[0].data;
  const audio = await fetch(url).then((b) => b.blob());
  const result2 = await agent.request(audio, context.USER_CONFIG);
  context.MIDDEL_CONTEXT.history.push({ role: "user", content: result2.text || "" });
  await sender.sendRichText(`${getLog(context.USER_CONFIG)}
> \`${result2.text}\``, "MarkdownV2", "chat");
  return result2;
}
async function sendImages(img, SEND_IMAGE_FILE, sender, config) {
  const caption = img.text ? `${getLog(config)}
> \`${img.text}\`` : getLog(config);
  if (img.url && img.url.length > 1) {
    const images = img.url.map((url) => ({
      type: SEND_IMAGE_FILE ? "document" : "photo",
      media: url
    }));
    images[0].caption = caption;
    images[0].parse_mode = ENV.DEFAULT_PARSE_MODE;
    return await sender.sendMediaGroup(images);
  } else if (img.url && img.url.length === 1) {
    return sender.editMessageMedia({
      type: "photo",
      media: img.url[0]
    }, caption, ENV.DEFAULT_PARSE_MODE);
  } else if (img.url || img.raw) {
    return sender.sendPhoto((img.url || img.raw)[0], caption, "MarkdownV2");
  } else {
    return sender.sendPlainText("ERROR: No image found");
  }
}
function injectHistory(context, result2, nextType = "text") {
  if (context.MIDDEL_CONTEXT.history.at(-1)?.role === "user" || nextType !== "text")
    return;
  context.MIDDEL_CONTEXT.history.push({ role: "user", content: result2.text || "", ...result2.url && result2.url.length > 0 && { images: result2.url } });
}
function isTelegramChatTypeGroup(type2) {
  return type2 === "group" || type2 === "supergroup";
}
function extractMessage(message, currentBotId) {
  const acceptMsgType = ENV.ENABLE_FILE ? ["document", "photo", "voice", "audio", "text"] : ["text"];
  const messageData = extractTypeFromMessage(message, acceptMsgType);
  if (messageData && messageData.type === "text" && isNeedGetReplyMessage(message, currentBotId)) {
    const {
      type: type2,
      id
    } = extractTypeFromMessage(message.reply_to_message, acceptMsgType) || {};
    if (type2 && type2 !== "text")
      messageData.type = type2;
    if (id && id.length > 0)
      messageData.id = id;
  }
  return messageData;
}
function extractTypeFromMessage(message, supportType) {
  let msgType = supportType.find((t) => t in message);
  if (!msgType)
    return null;
  switch (msgType) {
    case "text":
      return {
        type: "text"
      };
    case "photo": {
      const file_id = findPhotoFileID(message.photo, ENV.TELEGRAM_PHOTO_SIZE_OFFSET);
      if (!file_id) {
        return {
          type: "text"
        };
      }
      return {
        type: "image",
        id: [file_id]
      };
    }
    case "document":
    case "audio":
    case "voice": {
      if (msgType === "document") {
        const type2 = message.document?.mime_type?.match(/(audio|image)/)?.[1];
        if (!type2) {
          return null;
        }
        msgType = type2;
      }
      const id = message[msgType]?.file_id;
      return {
        type: ["audio", "voice"].includes(msgType) ? "audio" : "image",
        ...id && { id: [id] }
      };
    }
  }
  return null;
}
function isNeedGetReplyMessage(message, currentBotId) {
  return ENV.EXTRA_MESSAGE_CONTEXT && message.reply_to_message && (message.reply_to_message.from?.id !== currentBotId || message.reply_to_message.photo);
}
function UUIDv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
const isCfWorker = typeof globalThis !== "undefined" && typeof globalThis.ServiceWorkerGlobalScope !== "undefined" && globalThis instanceof globalThis.ServiceWorkerGlobalScope;
function chunckArray(arr, size) {
  const result2 = [];
  for (let i = 0; i < arr.length; i += size) {
    result2.push(arr.slice(i, i + size));
  }
  return result2;
}
async function waitUntil(timestamp) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, timestamp - Date.now())));
}
class Anthropic {
  name = "anthropic";
  modelKey = "ANTHROPIC_CHAT_MODEL";
  enable = (context) => {
    return !!context.ANTHROPIC_API_KEY;
  };
  model = (ctx) => {
    return ctx.ANTHROPIC_CHAT_MODEL;
  };
  request = async (params, context, onStream) => {
    const provider = createAnthropic({
      baseURL: context.ANTHROPIC_API_BASE,
      apiKey: context.ANTHROPIC_API_KEY || void 0
    });
    const languageModelV1 = provider.languageModel(this.model(context), void 0);
    return requestChatCompletionsV2(await warpLLMParams({
      model: languageModelV1,
      messages: params.messages
    }, context), onStream);
  };
}
function convertToOpenAIChatMessages({
  prompt: prompt2,
  useLegacyFunctionCalling = false
}) {
  const messages = [];
  for (const { role, content } of prompt2) {
    switch (role) {
      case "system": {
        messages.push({ role: "system", content });
        break;
      }
      case "user": {
        if (content.length === 1 && content[0].type === "text") {
          messages.push({ role: "user", content: content[0].text });
          break;
        }
        messages.push({
          role: "user",
          content: content.map((part) => {
            var _a15, _b2, _c2;
            switch (part.type) {
              case "text": {
                return { type: "text", text: part.text };
              }
              case "image": {
                return {
                  type: "image_url",
                  image_url: {
                    url: part.image instanceof URL ? part.image.toString() : `data:${(_a15 = part.mimeType) != null ? _a15 : "image/jpeg"};base64,${convertUint8ArrayToBase64(part.image)}`,
                    // OpenAI specific extension: image detail
                    detail: (_c2 = (_b2 = part.providerMetadata) == null ? void 0 : _b2.openai) == null ? void 0 : _c2.imageDetail
                  }
                };
              }
              case "file": {
                if (part.data instanceof URL) {
                  throw new UnsupportedFunctionalityError({
                    functionality: "'File content parts with URL data' functionality not supported."
                  });
                }
                switch (part.mimeType) {
                  case "audio/wav": {
                    return {
                      type: "input_audio",
                      input_audio: { data: part.data, format: "wav" }
                    };
                  }
                  case "audio/mp3":
                  case "audio/mpeg": {
                    return {
                      type: "input_audio",
                      input_audio: { data: part.data, format: "mp3" }
                    };
                  }
                  default: {
                    throw new UnsupportedFunctionalityError({
                      functionality: `File content part type ${part.mimeType} in user messages`
                    });
                  }
                }
              }
            }
          })
        });
        break;
      }
      case "assistant": {
        let text = "";
        const toolCalls = [];
        for (const part of content) {
          switch (part.type) {
            case "text": {
              text += part.text;
              break;
            }
            case "tool-call": {
              toolCalls.push({
                id: part.toolCallId,
                type: "function",
                function: {
                  name: part.toolName,
                  arguments: JSON.stringify(part.args)
                }
              });
              break;
            }
            default: {
              const _exhaustiveCheck = part;
              throw new Error(`Unsupported part: ${_exhaustiveCheck}`);
            }
          }
        }
        if (useLegacyFunctionCalling) {
          if (toolCalls.length > 1) {
            throw new UnsupportedFunctionalityError({
              functionality: "useLegacyFunctionCalling with multiple tool calls in one message"
            });
          }
          messages.push({
            role: "assistant",
            content: text,
            function_call: toolCalls.length > 0 ? toolCalls[0].function : void 0
          });
        } else {
          messages.push({
            role: "assistant",
            content: text,
            tool_calls: toolCalls.length > 0 ? toolCalls : void 0
          });
        }
        break;
      }
      case "tool": {
        for (const toolResponse of content) {
          if (useLegacyFunctionCalling) {
            messages.push({
              role: "function",
              name: toolResponse.toolName,
              content: JSON.stringify(toolResponse.result)
            });
          } else {
            messages.push({
              role: "tool",
              tool_call_id: toolResponse.toolCallId,
              content: JSON.stringify(toolResponse.result)
            });
          }
        }
        break;
      }
      default: {
        const _exhaustiveCheck = role;
        throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
      }
    }
  }
  return messages;
}
function mapOpenAIChatLogProbsOutput(logprobs) {
  var _a15, _b2;
  return (_b2 = (_a15 = logprobs == null ? void 0 : logprobs.content) == null ? void 0 : _a15.map(({ token, logprob, top_logprobs }) => ({
    token,
    logprob,
    topLogprobs: top_logprobs ? top_logprobs.map(({ token: token2, logprob: logprob2 }) => ({
      token: token2,
      logprob: logprob2
    })) : []
  }))) != null ? _b2 : void 0;
}
function mapOpenAIFinishReason(finishReason) {
  switch (finishReason) {
    case "stop":
      return "stop";
    case "length":
      return "length";
    case "content_filter":
      return "content-filter";
    case "function_call":
    case "tool_calls":
      return "tool-calls";
    default:
      return "unknown";
  }
}
var openAIErrorDataSchema = z.object({
  error: z.object({
    message: z.string(),
    // The additional information below is handled loosely to support
    // OpenAI-compatible providers that have slightly different error
    // responses:
    type: z.string().nullish(),
    param: z.any().nullish(),
    code: z.union([z.string(), z.number()]).nullish()
  })
});
var openaiFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: openAIErrorDataSchema,
  errorToMessage: (data) => data.error.message
});
function getResponseMetadata$1({
  id,
  model,
  created
}) {
  return {
    id: id != null ? id : void 0,
    modelId: model != null ? model : void 0,
    timestamp: created != null ? new Date(created * 1e3) : void 0
  };
}
function prepareTools$1({
  mode,
  useLegacyFunctionCalling = false,
  structuredOutputs = false
}) {
  var _a15;
  const tools2 = ((_a15 = mode.tools) == null ? void 0 : _a15.length) ? mode.tools : void 0;
  const toolWarnings = [];
  if (tools2 == null) {
    return { tools: void 0, tool_choice: void 0, toolWarnings };
  }
  const toolChoice = mode.toolChoice;
  if (useLegacyFunctionCalling) {
    const openaiFunctions = [];
    for (const tool2 of tools2) {
      if (tool2.type === "provider-defined") {
        toolWarnings.push({ type: "unsupported-tool", tool: tool2 });
      } else {
        openaiFunctions.push({
          name: tool2.name,
          description: tool2.description,
          parameters: tool2.parameters
        });
      }
    }
    if (toolChoice == null) {
      return {
        functions: openaiFunctions,
        function_call: void 0,
        toolWarnings
      };
    }
    const type22 = toolChoice.type;
    switch (type22) {
      case "auto":
      case "none":
      case void 0:
        return {
          functions: openaiFunctions,
          function_call: void 0,
          toolWarnings
        };
      case "required":
        throw new UnsupportedFunctionalityError({
          functionality: "useLegacyFunctionCalling and toolChoice: required"
        });
      default:
        return {
          functions: openaiFunctions,
          function_call: { name: toolChoice.toolName },
          toolWarnings
        };
    }
  }
  const openaiTools = [];
  for (const tool2 of tools2) {
    if (tool2.type === "provider-defined") {
      toolWarnings.push({ type: "unsupported-tool", tool: tool2 });
    } else {
      openaiTools.push({
        type: "function",
        function: {
          name: tool2.name,
          description: tool2.description,
          parameters: tool2.parameters,
          strict: structuredOutputs === true ? true : void 0
        }
      });
    }
  }
  if (toolChoice == null) {
    return { tools: openaiTools, tool_choice: void 0, toolWarnings };
  }
  const type2 = toolChoice.type;
  switch (type2) {
    case "auto":
    case "none":
    case "required":
      return { tools: openaiTools, tool_choice: type2, toolWarnings };
    case "tool":
      return {
        tools: openaiTools,
        tool_choice: {
          type: "function",
          function: {
            name: toolChoice.toolName
          }
        },
        toolWarnings
      };
    default: {
      const _exhaustiveCheck = type2;
      throw new UnsupportedFunctionalityError({
        functionality: `Unsupported tool choice type: ${_exhaustiveCheck}`
      });
    }
  }
}
var OpenAIChatLanguageModel = class {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get supportsStructuredOutputs() {
    return this.settings.structuredOutputs === true;
  }
  get defaultObjectGenerationMode() {
    if (isAudioModel(this.modelId)) {
      return "tool";
    }
    return this.supportsStructuredOutputs ? "json" : "tool";
  }
  get provider() {
    return this.config.provider;
  }
  get supportsImageUrls() {
    return !this.settings.downloadImages;
  }
  getArgs({
    mode,
    prompt: prompt2,
    maxTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    stopSequences,
    responseFormat,
    seed,
    providerMetadata
  }) {
    var _a15, _b2, _c2, _d, _e, _f, _g, _h, _i;
    const type2 = mode.type;
    const warnings = [];
    if (topK != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "topK"
      });
    }
    if (responseFormat != null && responseFormat.type === "json" && responseFormat.schema != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "responseFormat",
        details: "JSON response format schema is not supported"
      });
    }
    const useLegacyFunctionCalling = this.settings.useLegacyFunctionCalling;
    if (useLegacyFunctionCalling && this.settings.parallelToolCalls === true) {
      throw new UnsupportedFunctionalityError({
        functionality: "useLegacyFunctionCalling with parallelToolCalls"
      });
    }
    if (useLegacyFunctionCalling && this.settings.structuredOutputs === true) {
      throw new UnsupportedFunctionalityError({
        functionality: "structuredOutputs with useLegacyFunctionCalling"
      });
    }
    const baseArgs = {
      // model id:
      model: this.modelId,
      // model specific settings:
      logit_bias: this.settings.logitBias,
      logprobs: this.settings.logprobs === true || typeof this.settings.logprobs === "number" ? true : void 0,
      top_logprobs: typeof this.settings.logprobs === "number" ? this.settings.logprobs : typeof this.settings.logprobs === "boolean" ? this.settings.logprobs ? 0 : void 0 : void 0,
      user: this.settings.user,
      parallel_tool_calls: this.settings.parallelToolCalls,
      // standardized settings:
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
      stop: stopSequences,
      seed,
      // openai specific settings:
      max_completion_tokens: (_b2 = (_a15 = providerMetadata == null ? void 0 : providerMetadata.openai) == null ? void 0 : _a15.maxCompletionTokens) != null ? _b2 : void 0,
      store: (_d = (_c2 = providerMetadata == null ? void 0 : providerMetadata.openai) == null ? void 0 : _c2.store) != null ? _d : void 0,
      metadata: (_f = (_e = providerMetadata == null ? void 0 : providerMetadata.openai) == null ? void 0 : _e.metadata) != null ? _f : void 0,
      prediction: (_h = (_g = providerMetadata == null ? void 0 : providerMetadata.openai) == null ? void 0 : _g.prediction) != null ? _h : void 0,
      // response format:
      response_format: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? { type: "json_object" } : void 0,
      // messages:
      messages: convertToOpenAIChatMessages({
        prompt: prompt2,
        useLegacyFunctionCalling
      })
    };
    if (isReasoningModel(this.modelId)) {
      baseArgs.temperature = void 0;
      baseArgs.top_p = void 0;
      baseArgs.frequency_penalty = void 0;
      baseArgs.presence_penalty = void 0;
    }
    switch (type2) {
      case "regular": {
        const { tools: tools2, tool_choice, functions, function_call, toolWarnings } = prepareTools$1({
          mode,
          useLegacyFunctionCalling,
          structuredOutputs: this.settings.structuredOutputs
        });
        return {
          args: {
            ...baseArgs,
            tools: tools2,
            tool_choice,
            functions,
            function_call
          },
          warnings: [...warnings, ...toolWarnings]
        };
      }
      case "object-json": {
        return {
          args: {
            ...baseArgs,
            response_format: this.settings.structuredOutputs === true && mode.schema != null ? {
              type: "json_schema",
              json_schema: {
                schema: mode.schema,
                strict: true,
                name: (_i = mode.name) != null ? _i : "response",
                description: mode.description
              }
            } : { type: "json_object" }
          },
          warnings
        };
      }
      case "object-tool": {
        return {
          args: useLegacyFunctionCalling ? {
            ...baseArgs,
            function_call: {
              name: mode.tool.name
            },
            functions: [
              {
                name: mode.tool.name,
                description: mode.tool.description,
                parameters: mode.tool.parameters
              }
            ]
          } : {
            ...baseArgs,
            tool_choice: {
              type: "function",
              function: { name: mode.tool.name }
            },
            tools: [
              {
                type: "function",
                function: {
                  name: mode.tool.name,
                  description: mode.tool.description,
                  parameters: mode.tool.parameters,
                  strict: this.settings.structuredOutputs === true ? true : void 0
                }
              }
            ]
          },
          warnings
        };
      }
      default: {
        const _exhaustiveCheck = type2;
        throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
      }
    }
  }
  async doGenerate(options2) {
    var _a15, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    const { args: body, warnings } = this.getArgs(options2);
    const { responseHeaders, value: response } = await postJsonToApi({
      url: this.config.url({
        path: "/chat/completions",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), options2.headers),
      body,
      failedResponseHandler: openaiFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        openAIChatResponseSchema
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { messages: rawPrompt, ...rawSettings } = body;
    const choice = response.choices[0];
    let providerMetadata;
    if (((_b2 = (_a15 = response.usage) == null ? void 0 : _a15.completion_tokens_details) == null ? void 0 : _b2.reasoning_tokens) != null || ((_d = (_c2 = response.usage) == null ? void 0 : _c2.prompt_tokens_details) == null ? void 0 : _d.cached_tokens) != null) {
      providerMetadata = { openai: {} };
      if (((_f = (_e = response.usage) == null ? void 0 : _e.completion_tokens_details) == null ? void 0 : _f.reasoning_tokens) != null) {
        providerMetadata.openai.reasoningTokens = (_h = (_g = response.usage) == null ? void 0 : _g.completion_tokens_details) == null ? void 0 : _h.reasoning_tokens;
      }
      if (((_j = (_i = response.usage) == null ? void 0 : _i.prompt_tokens_details) == null ? void 0 : _j.cached_tokens) != null) {
        providerMetadata.openai.cachedPromptTokens = (_l = (_k = response.usage) == null ? void 0 : _k.prompt_tokens_details) == null ? void 0 : _l.cached_tokens;
      }
    }
    return {
      text: (_m = choice.message.content) != null ? _m : void 0,
      toolCalls: this.settings.useLegacyFunctionCalling && choice.message.function_call ? [
        {
          toolCallType: "function",
          toolCallId: generateId(),
          toolName: choice.message.function_call.name,
          args: choice.message.function_call.arguments
        }
      ] : (_n = choice.message.tool_calls) == null ? void 0 : _n.map((toolCall) => {
        var _a22;
        return {
          toolCallType: "function",
          toolCallId: (_a22 = toolCall.id) != null ? _a22 : generateId(),
          toolName: toolCall.function.name,
          args: toolCall.function.arguments
        };
      }),
      finishReason: mapOpenAIFinishReason(choice.finish_reason),
      usage: {
        promptTokens: (_p = (_o = response.usage) == null ? void 0 : _o.prompt_tokens) != null ? _p : NaN,
        completionTokens: (_r = (_q = response.usage) == null ? void 0 : _q.completion_tokens) != null ? _r : NaN
      },
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      request: { body: JSON.stringify(body) },
      response: getResponseMetadata$1(response),
      warnings,
      logprobs: mapOpenAIChatLogProbsOutput(choice.logprobs),
      providerMetadata
    };
  }
  async doStream(options2) {
    if (isReasoningModel(this.modelId)) {
      const result2 = await this.doGenerate(options2);
      const simulatedStream = new ReadableStream({
        start(controller) {
          controller.enqueue({ type: "response-metadata", ...result2.response });
          if (result2.text) {
            controller.enqueue({
              type: "text-delta",
              textDelta: result2.text
            });
          }
          if (result2.toolCalls) {
            for (const toolCall of result2.toolCalls) {
              controller.enqueue({
                type: "tool-call",
                ...toolCall
              });
            }
          }
          controller.enqueue({
            type: "finish",
            finishReason: result2.finishReason,
            usage: result2.usage,
            logprobs: result2.logprobs,
            providerMetadata: result2.providerMetadata
          });
          controller.close();
        }
      });
      return {
        stream: simulatedStream,
        rawCall: result2.rawCall,
        rawResponse: result2.rawResponse,
        warnings: result2.warnings
      };
    }
    const { args: args2, warnings } = this.getArgs(options2);
    const body = {
      ...args2,
      stream: true,
      // only include stream_options when in strict compatibility mode:
      stream_options: this.config.compatibility === "strict" ? { include_usage: true } : void 0
    };
    const { responseHeaders, value: response } = await postJsonToApi({
      url: this.config.url({
        path: "/chat/completions",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), options2.headers),
      body,
      failedResponseHandler: openaiFailedResponseHandler,
      successfulResponseHandler: createEventSourceResponseHandler(
        openaiChatChunkSchema
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { messages: rawPrompt, ...rawSettings } = args2;
    const toolCalls = [];
    let finishReason = "unknown";
    let usage = {
      promptTokens: void 0,
      completionTokens: void 0
    };
    let logprobs;
    let isFirstChunk = true;
    const { useLegacyFunctionCalling } = this.settings;
    let providerMetadata;
    return {
      stream: response.pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            var _a15, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
            if (!chunk.success) {
              finishReason = "error";
              controller.enqueue({ type: "error", error: chunk.error });
              return;
            }
            const value = chunk.value;
            if ("error" in value) {
              finishReason = "error";
              controller.enqueue({ type: "error", error: value.error });
              return;
            }
            if (isFirstChunk) {
              isFirstChunk = false;
              controller.enqueue({
                type: "response-metadata",
                ...getResponseMetadata$1(value)
              });
            }
            if (value.usage != null) {
              usage = {
                promptTokens: (_a15 = value.usage.prompt_tokens) != null ? _a15 : void 0,
                completionTokens: (_b2 = value.usage.completion_tokens) != null ? _b2 : void 0
              };
              if (((_c2 = value.usage.prompt_tokens_details) == null ? void 0 : _c2.cached_tokens) != null) {
                providerMetadata = {
                  openai: {
                    cachedPromptTokens: (_d = value.usage.prompt_tokens_details) == null ? void 0 : _d.cached_tokens
                  }
                };
              }
            }
            const choice = value.choices[0];
            if ((choice == null ? void 0 : choice.finish_reason) != null) {
              finishReason = mapOpenAIFinishReason(choice.finish_reason);
            }
            if ((choice == null ? void 0 : choice.delta) == null) {
              return;
            }
            const delta = choice.delta;
            if (delta.content != null) {
              controller.enqueue({
                type: "text-delta",
                textDelta: delta.content
              });
            }
            const mappedLogprobs = mapOpenAIChatLogProbsOutput(
              choice == null ? void 0 : choice.logprobs
            );
            if (mappedLogprobs == null ? void 0 : mappedLogprobs.length) {
              if (logprobs === void 0) logprobs = [];
              logprobs.push(...mappedLogprobs);
            }
            const mappedToolCalls = useLegacyFunctionCalling && delta.function_call != null ? [
              {
                type: "function",
                id: generateId(),
                function: delta.function_call,
                index: 0
              }
            ] : delta.tool_calls;
            if (mappedToolCalls != null) {
              for (const toolCallDelta of mappedToolCalls) {
                const index2 = toolCallDelta.index;
                if (toolCalls[index2] == null) {
                  if (toolCallDelta.type !== "function") {
                    throw new InvalidResponseDataError({
                      data: toolCallDelta,
                      message: `Expected 'function' type.`
                    });
                  }
                  if (toolCallDelta.id == null) {
                    throw new InvalidResponseDataError({
                      data: toolCallDelta,
                      message: `Expected 'id' to be a string.`
                    });
                  }
                  if (((_e = toolCallDelta.function) == null ? void 0 : _e.name) == null) {
                    throw new InvalidResponseDataError({
                      data: toolCallDelta,
                      message: `Expected 'function.name' to be a string.`
                    });
                  }
                  toolCalls[index2] = {
                    id: toolCallDelta.id,
                    type: "function",
                    function: {
                      name: toolCallDelta.function.name,
                      arguments: (_f = toolCallDelta.function.arguments) != null ? _f : ""
                    }
                  };
                  const toolCall2 = toolCalls[index2];
                  if (((_g = toolCall2.function) == null ? void 0 : _g.name) != null && ((_h = toolCall2.function) == null ? void 0 : _h.arguments) != null) {
                    if (toolCall2.function.arguments.length > 0) {
                      controller.enqueue({
                        type: "tool-call-delta",
                        toolCallType: "function",
                        toolCallId: toolCall2.id,
                        toolName: toolCall2.function.name,
                        argsTextDelta: toolCall2.function.arguments
                      });
                    }
                    if (isParsableJson(toolCall2.function.arguments)) {
                      controller.enqueue({
                        type: "tool-call",
                        toolCallType: "function",
                        toolCallId: (_i = toolCall2.id) != null ? _i : generateId(),
                        toolName: toolCall2.function.name,
                        args: toolCall2.function.arguments
                      });
                    }
                  }
                  continue;
                }
                const toolCall = toolCalls[index2];
                if (((_j = toolCallDelta.function) == null ? void 0 : _j.arguments) != null) {
                  toolCall.function.arguments += (_l = (_k = toolCallDelta.function) == null ? void 0 : _k.arguments) != null ? _l : "";
                }
                controller.enqueue({
                  type: "tool-call-delta",
                  toolCallType: "function",
                  toolCallId: toolCall.id,
                  toolName: toolCall.function.name,
                  argsTextDelta: (_m = toolCallDelta.function.arguments) != null ? _m : ""
                });
                if (((_n = toolCall.function) == null ? void 0 : _n.name) != null && ((_o = toolCall.function) == null ? void 0 : _o.arguments) != null && isParsableJson(toolCall.function.arguments)) {
                  controller.enqueue({
                    type: "tool-call",
                    toolCallType: "function",
                    toolCallId: (_p = toolCall.id) != null ? _p : generateId(),
                    toolName: toolCall.function.name,
                    args: toolCall.function.arguments
                  });
                }
              }
            }
          },
          flush(controller) {
            var _a15, _b2;
            controller.enqueue({
              type: "finish",
              finishReason,
              logprobs,
              usage: {
                promptTokens: (_a15 = usage.promptTokens) != null ? _a15 : NaN,
                completionTokens: (_b2 = usage.completionTokens) != null ? _b2 : NaN
              },
              ...providerMetadata != null ? { providerMetadata } : {}
            });
          }
        })
      ),
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      request: { body: JSON.stringify(body) },
      warnings
    };
  }
};
var openAITokenUsageSchema = z.object({
  prompt_tokens: z.number().nullish(),
  completion_tokens: z.number().nullish(),
  prompt_tokens_details: z.object({
    cached_tokens: z.number().nullish()
  }).nullish(),
  completion_tokens_details: z.object({
    reasoning_tokens: z.number().nullish()
  }).nullish()
}).nullish();
var openAIChatResponseSchema = z.object({
  id: z.string().nullish(),
  created: z.number().nullish(),
  model: z.string().nullish(),
  choices: z.array(
    z.object({
      message: z.object({
        role: z.literal("assistant").nullish(),
        content: z.string().nullish(),
        function_call: z.object({
          arguments: z.string(),
          name: z.string()
        }).nullish(),
        tool_calls: z.array(
          z.object({
            id: z.string().nullish(),
            type: z.literal("function"),
            function: z.object({
              name: z.string(),
              arguments: z.string()
            })
          })
        ).nullish()
      }),
      index: z.number(),
      logprobs: z.object({
        content: z.array(
          z.object({
            token: z.string(),
            logprob: z.number(),
            top_logprobs: z.array(
              z.object({
                token: z.string(),
                logprob: z.number()
              })
            )
          })
        ).nullable()
      }).nullish(),
      finish_reason: z.string().nullish()
    })
  ),
  usage: openAITokenUsageSchema
});
var openaiChatChunkSchema = z.union([
  z.object({
    id: z.string().nullish(),
    created: z.number().nullish(),
    model: z.string().nullish(),
    choices: z.array(
      z.object({
        delta: z.object({
          role: z.enum(["assistant"]).nullish(),
          content: z.string().nullish(),
          function_call: z.object({
            name: z.string().optional(),
            arguments: z.string().optional()
          }).nullish(),
          tool_calls: z.array(
            z.object({
              index: z.number(),
              id: z.string().nullish(),
              type: z.literal("function").optional(),
              function: z.object({
                name: z.string().nullish(),
                arguments: z.string().nullish()
              })
            })
          ).nullish()
        }).nullish(),
        logprobs: z.object({
          content: z.array(
            z.object({
              token: z.string(),
              logprob: z.number(),
              top_logprobs: z.array(
                z.object({
                  token: z.string(),
                  logprob: z.number()
                })
              )
            })
          ).nullable()
        }).nullish(),
        finish_reason: z.string().nullable().optional(),
        index: z.number()
      })
    ),
    usage: openAITokenUsageSchema
  }),
  openAIErrorDataSchema
]);
function isReasoningModel(modelId) {
  return modelId.startsWith("o1-");
}
function isAudioModel(modelId) {
  return modelId.startsWith("gpt-4o-audio-preview");
}
function convertToOpenAICompletionPrompt({
  prompt: prompt2,
  inputFormat,
  user = "user",
  assistant = "assistant"
}) {
  if (inputFormat === "prompt" && prompt2.length === 1 && prompt2[0].role === "user" && prompt2[0].content.length === 1 && prompt2[0].content[0].type === "text") {
    return { prompt: prompt2[0].content[0].text };
  }
  let text = "";
  if (prompt2[0].role === "system") {
    text += `${prompt2[0].content}

`;
    prompt2 = prompt2.slice(1);
  }
  for (const { role, content } of prompt2) {
    switch (role) {
      case "system": {
        throw new InvalidPromptError({
          message: "Unexpected system message in prompt: ${content}",
          prompt: prompt2
        });
      }
      case "user": {
        const userMessage = content.map((part) => {
          switch (part.type) {
            case "text": {
              return part.text;
            }
            case "image": {
              throw new UnsupportedFunctionalityError({
                functionality: "images"
              });
            }
          }
        }).join("");
        text += `${user}:
${userMessage}

`;
        break;
      }
      case "assistant": {
        const assistantMessage = content.map((part) => {
          switch (part.type) {
            case "text": {
              return part.text;
            }
            case "tool-call": {
              throw new UnsupportedFunctionalityError({
                functionality: "tool-call messages"
              });
            }
          }
        }).join("");
        text += `${assistant}:
${assistantMessage}

`;
        break;
      }
      case "tool": {
        throw new UnsupportedFunctionalityError({
          functionality: "tool messages"
        });
      }
      default: {
        const _exhaustiveCheck = role;
        throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
      }
    }
  }
  text += `${assistant}:
`;
  return {
    prompt: text,
    stopSequences: [`
${user}:`]
  };
}
function mapOpenAICompletionLogProbs(logprobs) {
  return logprobs == null ? void 0 : logprobs.tokens.map((token, index2) => ({
    token,
    logprob: logprobs.token_logprobs[index2],
    topLogprobs: logprobs.top_logprobs ? Object.entries(logprobs.top_logprobs[index2]).map(
      ([token2, logprob]) => ({
        token: token2,
        logprob
      })
    ) : []
  }));
}
var OpenAICompletionLanguageModel = class {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.defaultObjectGenerationMode = void 0;
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  getArgs({
    mode,
    inputFormat,
    prompt: prompt2,
    maxTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    stopSequences: userStopSequences,
    responseFormat,
    seed
  }) {
    var _a15;
    const type2 = mode.type;
    const warnings = [];
    if (topK != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "topK"
      });
    }
    if (responseFormat != null && responseFormat.type !== "text") {
      warnings.push({
        type: "unsupported-setting",
        setting: "responseFormat",
        details: "JSON response format is not supported."
      });
    }
    const { prompt: completionPrompt, stopSequences } = convertToOpenAICompletionPrompt({ prompt: prompt2, inputFormat });
    const stop = [...stopSequences != null ? stopSequences : [], ...userStopSequences != null ? userStopSequences : []];
    const baseArgs = {
      // model id:
      model: this.modelId,
      // model specific settings:
      echo: this.settings.echo,
      logit_bias: this.settings.logitBias,
      logprobs: typeof this.settings.logprobs === "number" ? this.settings.logprobs : typeof this.settings.logprobs === "boolean" ? this.settings.logprobs ? 0 : void 0 : void 0,
      suffix: this.settings.suffix,
      user: this.settings.user,
      // standardized settings:
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
      seed,
      // prompt:
      prompt: completionPrompt,
      // stop sequences:
      stop: stop.length > 0 ? stop : void 0
    };
    switch (type2) {
      case "regular": {
        if ((_a15 = mode.tools) == null ? void 0 : _a15.length) {
          throw new UnsupportedFunctionalityError({
            functionality: "tools"
          });
        }
        if (mode.toolChoice) {
          throw new UnsupportedFunctionalityError({
            functionality: "toolChoice"
          });
        }
        return { args: baseArgs, warnings };
      }
      case "object-json": {
        throw new UnsupportedFunctionalityError({
          functionality: "object-json mode"
        });
      }
      case "object-tool": {
        throw new UnsupportedFunctionalityError({
          functionality: "object-tool mode"
        });
      }
      default: {
        const _exhaustiveCheck = type2;
        throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
      }
    }
  }
  async doGenerate(options2) {
    const { args: args2, warnings } = this.getArgs(options2);
    const { responseHeaders, value: response } = await postJsonToApi({
      url: this.config.url({
        path: "/completions",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), options2.headers),
      body: args2,
      failedResponseHandler: openaiFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        openAICompletionResponseSchema
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { prompt: rawPrompt, ...rawSettings } = args2;
    const choice = response.choices[0];
    return {
      text: choice.text,
      usage: {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens
      },
      finishReason: mapOpenAIFinishReason(choice.finish_reason),
      logprobs: mapOpenAICompletionLogProbs(choice.logprobs),
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      response: getResponseMetadata$1(response),
      warnings,
      request: { body: JSON.stringify(args2) }
    };
  }
  async doStream(options2) {
    const { args: args2, warnings } = this.getArgs(options2);
    const body = {
      ...args2,
      stream: true,
      // only include stream_options when in strict compatibility mode:
      stream_options: this.config.compatibility === "strict" ? { include_usage: true } : void 0
    };
    const { responseHeaders, value: response } = await postJsonToApi({
      url: this.config.url({
        path: "/completions",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), options2.headers),
      body,
      failedResponseHandler: openaiFailedResponseHandler,
      successfulResponseHandler: createEventSourceResponseHandler(
        openaiCompletionChunkSchema
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { prompt: rawPrompt, ...rawSettings } = args2;
    let finishReason = "unknown";
    let usage = {
      promptTokens: Number.NaN,
      completionTokens: Number.NaN
    };
    let logprobs;
    let isFirstChunk = true;
    return {
      stream: response.pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            if (!chunk.success) {
              finishReason = "error";
              controller.enqueue({ type: "error", error: chunk.error });
              return;
            }
            const value = chunk.value;
            if ("error" in value) {
              finishReason = "error";
              controller.enqueue({ type: "error", error: value.error });
              return;
            }
            if (isFirstChunk) {
              isFirstChunk = false;
              controller.enqueue({
                type: "response-metadata",
                ...getResponseMetadata$1(value)
              });
            }
            if (value.usage != null) {
              usage = {
                promptTokens: value.usage.prompt_tokens,
                completionTokens: value.usage.completion_tokens
              };
            }
            const choice = value.choices[0];
            if ((choice == null ? void 0 : choice.finish_reason) != null) {
              finishReason = mapOpenAIFinishReason(choice.finish_reason);
            }
            if ((choice == null ? void 0 : choice.text) != null) {
              controller.enqueue({
                type: "text-delta",
                textDelta: choice.text
              });
            }
            const mappedLogprobs = mapOpenAICompletionLogProbs(
              choice == null ? void 0 : choice.logprobs
            );
            if (mappedLogprobs == null ? void 0 : mappedLogprobs.length) {
              if (logprobs === void 0) logprobs = [];
              logprobs.push(...mappedLogprobs);
            }
          },
          flush(controller) {
            controller.enqueue({
              type: "finish",
              finishReason,
              logprobs,
              usage
            });
          }
        })
      ),
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      warnings,
      request: { body: JSON.stringify(body) }
    };
  }
};
var openAICompletionResponseSchema = z.object({
  id: z.string().nullish(),
  created: z.number().nullish(),
  model: z.string().nullish(),
  choices: z.array(
    z.object({
      text: z.string(),
      finish_reason: z.string(),
      logprobs: z.object({
        tokens: z.array(z.string()),
        token_logprobs: z.array(z.number()),
        top_logprobs: z.array(z.record(z.string(), z.number())).nullable()
      }).nullish()
    })
  ),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number()
  })
});
var openaiCompletionChunkSchema = z.union([
  z.object({
    id: z.string().nullish(),
    created: z.number().nullish(),
    model: z.string().nullish(),
    choices: z.array(
      z.object({
        text: z.string(),
        finish_reason: z.string().nullish(),
        index: z.number(),
        logprobs: z.object({
          tokens: z.array(z.string()),
          token_logprobs: z.array(z.number()),
          top_logprobs: z.array(z.record(z.string(), z.number())).nullable()
        }).nullish()
      })
    ),
    usage: z.object({
      prompt_tokens: z.number(),
      completion_tokens: z.number()
    }).nullish()
  }),
  openAIErrorDataSchema
]);
var OpenAIEmbeddingModel = class {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  get maxEmbeddingsPerCall() {
    var _a15;
    return (_a15 = this.settings.maxEmbeddingsPerCall) != null ? _a15 : 2048;
  }
  get supportsParallelCalls() {
    var _a15;
    return (_a15 = this.settings.supportsParallelCalls) != null ? _a15 : true;
  }
  async doEmbed({
    values,
    headers,
    abortSignal
  }) {
    if (values.length > this.maxEmbeddingsPerCall) {
      throw new TooManyEmbeddingValuesForCallError({
        provider: this.provider,
        modelId: this.modelId,
        maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
        values
      });
    }
    const { responseHeaders, value: response } = await postJsonToApi({
      url: this.config.url({
        path: "/embeddings",
        modelId: this.modelId
      }),
      headers: combineHeaders(this.config.headers(), headers),
      body: {
        model: this.modelId,
        input: values,
        encoding_format: "float",
        dimensions: this.settings.dimensions,
        user: this.settings.user
      },
      failedResponseHandler: openaiFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        openaiTextEmbeddingResponseSchema
      ),
      abortSignal,
      fetch: this.config.fetch
    });
    return {
      embeddings: response.data.map((item) => item.embedding),
      usage: response.usage ? { tokens: response.usage.prompt_tokens } : void 0,
      rawResponse: { headers: responseHeaders }
    };
  }
};
var openaiTextEmbeddingResponseSchema = z.object({
  data: z.array(z.object({ embedding: z.array(z.number()) })),
  usage: z.object({ prompt_tokens: z.number() }).nullish()
});
function createAzure(options2 = {}) {
  const getHeaders = () => ({
    "api-key": loadApiKey({
      apiKey: options2.apiKey,
      environmentVariableName: "AZURE_API_KEY",
      description: "Azure OpenAI"
    }),
    ...options2.headers
  });
  const getResourceName = () => loadSetting({
    settingValue: options2.resourceName,
    settingName: "resourceName",
    environmentVariableName: "AZURE_RESOURCE_NAME",
    description: "Azure OpenAI resource name"
  });
  const url = ({ path, modelId }) => options2.baseURL ? `${options2.baseURL}/${modelId}${path}?api-version=2024-08-01-preview` : `https://${getResourceName()}.openai.azure.com/openai/deployments/${modelId}${path}?api-version=2024-08-01-preview`;
  const createChatModel = (deploymentName, settings = {}) => new OpenAIChatLanguageModel(deploymentName, settings, {
    provider: "azure-openai.chat",
    url,
    headers: getHeaders,
    compatibility: "strict",
    fetch: options2.fetch
  });
  const createCompletionModel = (modelId, settings = {}) => new OpenAICompletionLanguageModel(modelId, settings, {
    provider: "azure-openai.completion",
    url,
    compatibility: "strict",
    headers: getHeaders,
    fetch: options2.fetch
  });
  const createEmbeddingModel = (modelId, settings = {}) => new OpenAIEmbeddingModel(modelId, settings, {
    provider: "azure-openai.embeddings",
    headers: getHeaders,
    url,
    fetch: options2.fetch
  });
  const provider = function(deploymentId, settings) {
    if (new.target) {
      throw new Error(
        "The Azure OpenAI model function cannot be called with the new keyword."
      );
    }
    return createChatModel(deploymentId, settings);
  };
  provider.languageModel = createChatModel;
  provider.chat = createChatModel;
  provider.completion = createCompletionModel;
  provider.embedding = createEmbeddingModel;
  provider.textEmbedding = createEmbeddingModel;
  provider.textEmbeddingModel = createEmbeddingModel;
  return provider;
}
createAzure();
class AzureChatAI {
  name = "azure";
  modelKey = "AZURE_CHAT_MODEL";
  enable = (context) => {
    return !!(context.AZURE_API_KEY && context.AZURE_RESOURCE_NAME && context.AZURE_CHAT_MODEL);
  };
  model = (ctx) => {
    return ctx.AZURE_CHAT_MODEL || "";
  };
  request = async (params, context, onStream) => {
    const provider = createAzure({
      resourceName: context.AZURE_RESOURCE_NAME || void 0,
      apiKey: context.AZURE_API_KEY || void 0
    });
    const languageModelV1 = provider.languageModel(context.AZURE_CHAT_MODEL || "", void 0);
    return requestChatCompletionsV2(await warpLLMParams({
      model: languageModelV1,
      messages: params.messages
    }, context), onStream);
  };
}
class AzureImageAI {
  name = "azure";
  modelKey = "AZURE_IMAGE_MODEL";
  enable = (context) => {
    return !!(context.AZURE_API_KEY && context.AZURE_RESOURCE_NAME && context.AZURE_IMAGE_MODEL);
  };
  model = (ctx) => {
    return ctx.AZURE_IMAGE_MODEL || "";
  };
  request = async (prompt2, context) => {
    const url = `https://${context.AZURE_RESOURCE_NAME}.openai.azure.com/openai/deployments/${context.AZURE_IMAGE_MODEL}/chat/completions?${context.AZURE_API_VERSION}`;
    if (!url || !context.AZURE_API_KEY) {
      throw new Error("Azure DALL-E API is not set");
    }
    const header = {
      "Content-Type": "application/json",
      "api-key": context.AZURE_API_KEY
    };
    const body = {
      prompt: prompt2,
      n: 1,
      size: context.DALL_E_IMAGE_SIZE,
      style: context.DALL_E_IMAGE_STYLE,
      quality: context.DALL_E_IMAGE_QUALITY
    };
    const validSize = ["1792x1024", "1024x1024", "1024x1792"];
    if (!validSize.includes(body.size)) {
      body.size = "1024x1024";
    }
    return requestText2Image(url, header, body, this.render);
  };
  render = async (response) => {
    const resp = await response.json();
    if (resp.error?.message) {
      throw new Error(resp.error.message);
    }
    return {
      type: "image",
      url: resp?.data?.map((i) => i?.url),
      text: resp?.data?.[0]?.revised_prompt || ""
    };
  };
}
class Cohere {
  name = "cohere";
  modelKey = "COHERE_CHAT_MODEL";
  enable = (context) => {
    return !!context.COHERE_API_KEY;
  };
  model = (ctx) => {
    return ctx.COHERE_CHAT_MODEL;
  };
  request = async (params, context, onStream) => {
    const provider = createCohere({
      baseURL: context.COHERE_API_BASE,
      apiKey: context.COHERE_API_KEY || void 0
    });
    const languageModelV1 = provider.languageModel(this.model(context), void 0);
    return requestChatCompletionsV2(await warpLLMParams({
      model: languageModelV1,
      messages: params.messages
    }, context), onStream);
  };
}
class Google {
  name = "google";
  modelKey = "GOOGLE_CHAT_MODEL";
  enable = (context) => {
    return !!context.GOOGLE_API_KEY;
  };
  model = (ctx) => {
    return ctx.GOOGLE_CHAT_MODEL;
  };
  request = async (params, context, onStream) => {
    const provider = createGoogleGenerativeAI({
      baseURL: context.GOOGLE_API_BASE,
      apiKey: context.GOOGLE_API_KEY || void 0
    });
    const languageModelV1 = provider.languageModel(this.model(context), void 0);
    return requestChatCompletionsV2(await warpLLMParams({
      model: languageModelV1,
      messages: params.messages
    }, context), onStream);
  };
}
function convertToMistralChatMessages(prompt2) {
  const messages = [];
  for (let i = 0; i < prompt2.length; i++) {
    const { role, content } = prompt2[i];
    const isLastMessage = i === prompt2.length - 1;
    switch (role) {
      case "system": {
        messages.push({ role: "system", content });
        break;
      }
      case "user": {
        messages.push({
          role: "user",
          content: content.map((part) => {
            var _a15;
            switch (part.type) {
              case "text": {
                return { type: "text", text: part.text };
              }
              case "image": {
                return {
                  type: "image_url",
                  image_url: part.image instanceof URL ? part.image.toString() : `data:${(_a15 = part.mimeType) != null ? _a15 : "image/jpeg"};base64,${convertUint8ArrayToBase64(part.image)}`
                };
              }
              case "file": {
                throw new UnsupportedFunctionalityError({
                  functionality: "File content parts in user messages"
                });
              }
            }
          })
        });
        break;
      }
      case "assistant": {
        let text = "";
        const toolCalls = [];
        for (const part of content) {
          switch (part.type) {
            case "text": {
              text += part.text;
              break;
            }
            case "tool-call": {
              toolCalls.push({
                id: part.toolCallId,
                type: "function",
                function: {
                  name: part.toolName,
                  arguments: JSON.stringify(part.args)
                }
              });
              break;
            }
            default: {
              const _exhaustiveCheck = part;
              throw new Error(`Unsupported part: ${_exhaustiveCheck}`);
            }
          }
        }
        messages.push({
          role: "assistant",
          content: text,
          prefix: isLastMessage ? true : void 0,
          tool_calls: toolCalls.length > 0 ? toolCalls : void 0
        });
        break;
      }
      case "tool": {
        for (const toolResponse of content) {
          messages.push({
            role: "tool",
            name: toolResponse.toolName,
            content: JSON.stringify(toolResponse.result),
            tool_call_id: toolResponse.toolCallId
          });
        }
        break;
      }
      default: {
        const _exhaustiveCheck = role;
        throw new Error(`Unsupported role: ${_exhaustiveCheck}`);
      }
    }
  }
  return messages;
}
function mapMistralFinishReason(finishReason) {
  switch (finishReason) {
    case "stop":
      return "stop";
    case "length":
    case "model_length":
      return "length";
    case "tool_calls":
      return "tool-calls";
    default:
      return "unknown";
  }
}
var mistralErrorDataSchema = z.object({
  object: z.literal("error"),
  message: z.string(),
  type: z.string(),
  param: z.string().nullable(),
  code: z.string().nullable()
});
var mistralFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: mistralErrorDataSchema,
  errorToMessage: (data) => data.message
});
function getResponseMetadata({
  id,
  model,
  created
}) {
  return {
    id: id != null ? id : void 0,
    modelId: model != null ? model : void 0,
    timestamp: created != null ? new Date(created * 1e3) : void 0
  };
}
function prepareTools(mode) {
  var _a15;
  const tools2 = ((_a15 = mode.tools) == null ? void 0 : _a15.length) ? mode.tools : void 0;
  const toolWarnings = [];
  if (tools2 == null) {
    return { tools: void 0, tool_choice: void 0, toolWarnings };
  }
  const mistralTools = [];
  for (const tool2 of tools2) {
    if (tool2.type === "provider-defined") {
      toolWarnings.push({ type: "unsupported-tool", tool: tool2 });
    } else {
      mistralTools.push({
        type: "function",
        function: {
          name: tool2.name,
          description: tool2.description,
          parameters: tool2.parameters
        }
      });
    }
  }
  const toolChoice = mode.toolChoice;
  if (toolChoice == null) {
    return { tools: mistralTools, tool_choice: void 0, toolWarnings };
  }
  const type2 = toolChoice.type;
  switch (type2) {
    case "auto":
    case "none":
      return { tools: mistralTools, tool_choice: type2, toolWarnings };
    case "required":
      return { tools: mistralTools, tool_choice: "any", toolWarnings };
    case "tool":
      return {
        tools: mistralTools.filter(
          (tool2) => tool2.function.name === toolChoice.toolName
        ),
        tool_choice: "any",
        toolWarnings
      };
    default: {
      const _exhaustiveCheck = type2;
      throw new Error(`Unsupported tool choice type: ${_exhaustiveCheck}`);
    }
  }
}
var MistralChatLanguageModel = class {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.defaultObjectGenerationMode = "json";
    this.supportsImageUrls = false;
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  getArgs({
    mode,
    prompt: prompt2,
    maxTokens,
    temperature,
    topP,
    topK,
    frequencyPenalty,
    presencePenalty,
    stopSequences,
    responseFormat,
    seed
  }) {
    const type2 = mode.type;
    const warnings = [];
    if (topK != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "topK"
      });
    }
    if (frequencyPenalty != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "frequencyPenalty"
      });
    }
    if (presencePenalty != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "presencePenalty"
      });
    }
    if (stopSequences != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "stopSequences"
      });
    }
    if (responseFormat != null && responseFormat.type === "json" && responseFormat.schema != null) {
      warnings.push({
        type: "unsupported-setting",
        setting: "responseFormat",
        details: "JSON response format schema is not supported"
      });
    }
    const baseArgs = {
      // model id:
      model: this.modelId,
      // model specific settings:
      safe_prompt: this.settings.safePrompt,
      // standardized settings:
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
      random_seed: seed,
      // response format:
      response_format: (responseFormat == null ? void 0 : responseFormat.type) === "json" ? { type: "json_object" } : void 0,
      // messages:
      messages: convertToMistralChatMessages(prompt2)
    };
    switch (type2) {
      case "regular": {
        const { tools: tools2, tool_choice, toolWarnings } = prepareTools(mode);
        return {
          args: { ...baseArgs, tools: tools2, tool_choice },
          warnings: [...warnings, ...toolWarnings]
        };
      }
      case "object-json": {
        return {
          args: {
            ...baseArgs,
            response_format: { type: "json_object" }
          },
          warnings
        };
      }
      case "object-tool": {
        return {
          args: {
            ...baseArgs,
            tool_choice: "any",
            tools: [{ type: "function", function: mode.tool }]
          },
          warnings
        };
      }
      default: {
        const _exhaustiveCheck = type2;
        throw new Error(`Unsupported type: ${_exhaustiveCheck}`);
      }
    }
  }
  async doGenerate(options2) {
    var _a15, _b2;
    const { args: args2, warnings } = this.getArgs(options2);
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/chat/completions`,
      headers: combineHeaders(this.config.headers(), options2.headers),
      body: args2,
      failedResponseHandler: mistralFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        mistralChatResponseSchema
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { messages: rawPrompt, ...rawSettings } = args2;
    const choice = response.choices[0];
    let text = (_a15 = choice.message.content) != null ? _a15 : void 0;
    const lastMessage = rawPrompt[rawPrompt.length - 1];
    if (lastMessage.role === "assistant" && (text == null ? void 0 : text.startsWith(lastMessage.content))) {
      text = text.slice(lastMessage.content.length);
    }
    return {
      text,
      toolCalls: (_b2 = choice.message.tool_calls) == null ? void 0 : _b2.map((toolCall) => ({
        toolCallType: "function",
        toolCallId: toolCall.id,
        toolName: toolCall.function.name,
        args: toolCall.function.arguments
      })),
      finishReason: mapMistralFinishReason(choice.finish_reason),
      usage: {
        promptTokens: response.usage.prompt_tokens,
        completionTokens: response.usage.completion_tokens
      },
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      request: { body: JSON.stringify(args2) },
      response: getResponseMetadata(response),
      warnings
    };
  }
  async doStream(options2) {
    const { args: args2, warnings } = this.getArgs(options2);
    const body = { ...args2, stream: true };
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/chat/completions`,
      headers: combineHeaders(this.config.headers(), options2.headers),
      body,
      failedResponseHandler: mistralFailedResponseHandler,
      successfulResponseHandler: createEventSourceResponseHandler(
        mistralChatChunkSchema
      ),
      abortSignal: options2.abortSignal,
      fetch: this.config.fetch
    });
    const { messages: rawPrompt, ...rawSettings } = args2;
    let finishReason = "unknown";
    let usage = {
      promptTokens: Number.NaN,
      completionTokens: Number.NaN
    };
    let chunkNumber = 0;
    let trimLeadingSpace = false;
    return {
      stream: response.pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            if (!chunk.success) {
              controller.enqueue({ type: "error", error: chunk.error });
              return;
            }
            chunkNumber++;
            const value = chunk.value;
            if (chunkNumber === 1) {
              controller.enqueue({
                type: "response-metadata",
                ...getResponseMetadata(value)
              });
            }
            if (value.usage != null) {
              usage = {
                promptTokens: value.usage.prompt_tokens,
                completionTokens: value.usage.completion_tokens
              };
            }
            const choice = value.choices[0];
            if ((choice == null ? void 0 : choice.finish_reason) != null) {
              finishReason = mapMistralFinishReason(choice.finish_reason);
            }
            if ((choice == null ? void 0 : choice.delta) == null) {
              return;
            }
            const delta = choice.delta;
            if (chunkNumber <= 2) {
              const lastMessage = rawPrompt[rawPrompt.length - 1];
              if (lastMessage.role === "assistant" && delta.content === lastMessage.content.trimEnd()) {
                if (delta.content.length < lastMessage.content.length) {
                  trimLeadingSpace = true;
                }
                return;
              }
            }
            if (delta.content != null) {
              controller.enqueue({
                type: "text-delta",
                textDelta: trimLeadingSpace ? delta.content.trimStart() : delta.content
              });
              trimLeadingSpace = false;
            }
            if (delta.tool_calls != null) {
              for (const toolCall of delta.tool_calls) {
                controller.enqueue({
                  type: "tool-call-delta",
                  toolCallType: "function",
                  toolCallId: toolCall.id,
                  toolName: toolCall.function.name,
                  argsTextDelta: toolCall.function.arguments
                });
                controller.enqueue({
                  type: "tool-call",
                  toolCallType: "function",
                  toolCallId: toolCall.id,
                  toolName: toolCall.function.name,
                  args: toolCall.function.arguments
                });
              }
            }
          },
          flush(controller) {
            controller.enqueue({ type: "finish", finishReason, usage });
          }
        })
      ),
      rawCall: { rawPrompt, rawSettings },
      rawResponse: { headers: responseHeaders },
      request: { body: JSON.stringify(body) },
      warnings
    };
  }
};
var mistralChatResponseSchema = z.object({
  id: z.string().nullish(),
  created: z.number().nullish(),
  model: z.string().nullish(),
  choices: z.array(
    z.object({
      message: z.object({
        role: z.literal("assistant"),
        content: z.string().nullable(),
        tool_calls: z.array(
          z.object({
            id: z.string(),
            function: z.object({ name: z.string(), arguments: z.string() })
          })
        ).nullish()
      }),
      index: z.number(),
      finish_reason: z.string().nullish()
    })
  ),
  object: z.literal("chat.completion"),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number()
  })
});
var mistralChatChunkSchema = z.object({
  id: z.string().nullish(),
  created: z.number().nullish(),
  model: z.string().nullish(),
  choices: z.array(
    z.object({
      delta: z.object({
        role: z.enum(["assistant"]).optional(),
        content: z.string().nullish(),
        tool_calls: z.array(
          z.object({
            id: z.string(),
            function: z.object({ name: z.string(), arguments: z.string() })
          })
        ).nullish()
      }),
      finish_reason: z.string().nullish(),
      index: z.number()
    })
  ),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number()
  }).nullish()
});
var MistralEmbeddingModel = class {
  constructor(modelId, settings, config) {
    this.specificationVersion = "v1";
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }
  get provider() {
    return this.config.provider;
  }
  get maxEmbeddingsPerCall() {
    var _a15;
    return (_a15 = this.settings.maxEmbeddingsPerCall) != null ? _a15 : 32;
  }
  get supportsParallelCalls() {
    var _a15;
    return (_a15 = this.settings.supportsParallelCalls) != null ? _a15 : false;
  }
  async doEmbed({
    values,
    abortSignal,
    headers
  }) {
    if (values.length > this.maxEmbeddingsPerCall) {
      throw new TooManyEmbeddingValuesForCallError({
        provider: this.provider,
        modelId: this.modelId,
        maxEmbeddingsPerCall: this.maxEmbeddingsPerCall,
        values
      });
    }
    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}/embeddings`,
      headers: combineHeaders(this.config.headers(), headers),
      body: {
        model: this.modelId,
        input: values,
        encoding_format: "float"
      },
      failedResponseHandler: mistralFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        MistralTextEmbeddingResponseSchema
      ),
      abortSignal,
      fetch: this.config.fetch
    });
    return {
      embeddings: response.data.map((item) => item.embedding),
      usage: response.usage ? { tokens: response.usage.prompt_tokens } : void 0,
      rawResponse: { headers: responseHeaders }
    };
  }
};
var MistralTextEmbeddingResponseSchema = z.object({
  data: z.array(z.object({ embedding: z.array(z.number()) })),
  usage: z.object({ prompt_tokens: z.number() }).nullish()
});
function createMistral(options2 = {}) {
  var _a15, _b2;
  const baseURL = (_b2 = withoutTrailingSlash((_a15 = options2.baseURL) != null ? _a15 : options2.baseUrl)) != null ? _b2 : "https://api.mistral.ai/v1";
  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options2.apiKey,
      environmentVariableName: "MISTRAL_API_KEY",
      description: "Mistral"
    })}`,
    ...options2.headers
  });
  const createChatModel = (modelId, settings = {}) => new MistralChatLanguageModel(modelId, settings, {
    provider: "mistral.chat",
    baseURL,
    headers: getHeaders,
    fetch: options2.fetch
  });
  const createEmbeddingModel = (modelId, settings = {}) => new MistralEmbeddingModel(modelId, settings, {
    provider: "mistral.embedding",
    baseURL,
    headers: getHeaders,
    fetch: options2.fetch
  });
  const provider = function(modelId, settings) {
    if (new.target) {
      throw new Error(
        "The Mistral model function cannot be called with the new keyword."
      );
    }
    return createChatModel(modelId, settings);
  };
  provider.languageModel = createChatModel;
  provider.chat = createChatModel;
  provider.embedding = createEmbeddingModel;
  provider.textEmbedding = createEmbeddingModel;
  provider.textEmbeddingModel = createEmbeddingModel;
  return provider;
}
createMistral();
class Mistral {
  name = "mistral";
  modelKey = "MISTRAL_CHAT_MODEL";
  enable = (context) => {
    return !!context.MISTRAL_API_KEY;
  };
  model = (ctx) => {
    return ctx.MISTRAL_CHAT_MODEL;
  };
  request = async (params, context, onStream) => {
    const provider = createMistral({
      baseURL: context.MISTRAL_API_BASE,
      apiKey: context.MISTRAL_API_KEY || void 0
    });
    const languageModelV1 = provider.languageModel(this.model(context), void 0);
    return requestChatCompletionsV2(await warpLLMParams({
      model: languageModelV1,
      messages: params.messages
    }, context), onStream);
  };
}
class OpenAILikeBase {
  name = "olike";
  enable = (context) => {
    return !!context.OPENAILIKE_API_KEY;
  };
}
class OpenAILike extends OpenAILikeBase {
  modelKey = "OPENAILIKE_CHAT_MODEL";
  enable = (context) => {
    return !!context.OPENAILIKE_API_KEY;
  };
  model = (ctx) => {
    return ctx.OPENAILIKE_CHAT_MODEL;
  };
  request = async (params, context, onStream) => {
    const provider = createOpenAI({
      name: "openaiLike",
      baseURL: context.OPENAILIKE_API_BASE || void 0,
      apiKey: context.OPENAILIKE_API_KEY || void 0
    });
    const languageModelV1 = provider.languageModel(this.model(context), void 0);
    return requestChatCompletionsV2({
      model: languageModelV1,
      messages: params.messages,
      context
    }, onStream);
  };
}
class OpenAILikeImage extends OpenAILikeBase {
  modelKey = "OPENAILIKE_IMAGE_MODEL";
  model = (ctx) => {
    return ctx.OPENAILIKE_IMAGE_MODEL;
  };
  request = async (prompt2, context) => {
    const url = `${context.OPENAILIKE_API_BASE}/image/generations`;
    const header = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${context.OPENAILIKE_API_KEY}`
    };
    const body = {
      prompt: prompt2,
      image_size: context.OPENAILIKE_IMAGE_SIZE,
      model: context.OPENAILIKE_IMAGE_MODEL,
      batch_size: 4,
      ...context.OPENAILIKE_EXTRA_PARAMS
    };
    return requestText2Image(url, header, body, this.render);
  };
  render = async (response) => {
    if (response.status !== 200)
      return { type: "image", message: await response.text() };
    const resp = await response.json();
    if (resp.message) {
      return { type: "image", message: resp.message };
    }
    return { type: "image", url: (await resp?.images)?.map((i) => i?.url) };
  };
}
class Vertex {
  name = "vertex";
  modelKey = "VERTEX_CHAT_MODEL";
  enable = (context) => {
    return !!(context.VERTEX_PROJECT_ID && context.VERTEX_CREDENTIALS?.client_email && context.VERTEX_CREDENTIALS?.private_key);
  };
  model = (ctx) => {
    return ctx.VERTEX_CHAT_MODEL;
  };
  request = async (params, context, onStream) => {
    const languageModelV1 = await createLlmModel(this.model(context), context);
    return requestChatCompletionsV2(await warpLLMParams({
      model: languageModelV1,
      messages: params.messages
    }, context), onStream);
  };
}
class WorkerBase {
  name = "workers";
  run = async (model, body, id, token) => {
    return await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${id}/ai/run/${model}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: JSON.stringify(body)
      }
    );
  };
  enable = (context) => {
    return !!(context.CLOUDFLARE_ACCOUNT_ID && context.CLOUDFLARE_TOKEN);
  };
}
class WorkersChat extends WorkerBase {
  modelKey = "WORKERS_CHAT_MODEL";
  model = (ctx) => {
    return ctx.WORKERS_CHAT_MODEL;
  };
  request = async (params, context, onStream) => {
    const { messages, prompt: prompt2 } = params;
    const id = context.CLOUDFLARE_ACCOUNT_ID;
    const token = context.CLOUDFLARE_TOKEN;
    const model = context.WORKERS_CHAT_MODEL;
    const url = `https://api.cloudflare.com/client/v4/accounts/${id}/ai/run/${model}`;
    const header = {
      Authorization: `Bearer ${token}`
    };
    const reqMessages = messages.map((raw) => {
      return {
        role: raw.role,
        content: raw.content
      };
    });
    if (prompt2) {
      reqMessages.unshift({ role: "system", content: prompt2 });
    }
    const body = {
      messages: reqMessages,
      stream: onStream !== null
    };
    const options2 = {};
    options2.contentExtractor = function(data) {
      return data?.response;
    };
    options2.fullContentExtractor = function(data) {
      return data?.result?.response;
    };
    options2.errorExtractor = function(data) {
      return data?.errors?.[0]?.message;
    };
    const text = await requestChatCompletions(url, header, body, onStream, null, options2);
    return {
      messages: [
        {
          role: "assistant",
          content: text
        }
      ],
      content: text
    };
  };
}
class WorkersImage extends (_c = WorkerBase, _request_dec3 = [Log], _c) {
  constructor() {
    super(...arguments);
    __publicField(this, "modelKey", "WORKERS_IMAGE_MODEL");
    __publicField(this, "model", (ctx) => {
      return ctx.WORKERS_IMAGE_MODEL;
    });
    __publicField(this, "request", __runInitializers(_init3, 8, this, async (prompt2, context) => {
      const id = context.CLOUDFLARE_ACCOUNT_ID;
      const token = context.CLOUDFLARE_TOKEN;
      if (!id || !token) {
        throw new Error("Cloudflare account ID or token is not set");
      }
      const raw = await this.run(context.WORKERS_IMAGE_MODEL, { prompt: prompt2 }, id, token);
      if (isJsonResponse(raw)) {
        const { result: result2 } = await raw.json();
        const image = result2?.image;
        if (typeof image !== "string") {
          throw new TypeError("Invalid image response");
        }
        return { type: "image", raw: [await base64StringToBlob(image)] };
      }
      return { type: "image", raw: [await raw.blob()] };
    })), __runInitializers(_init3, 11, this);
  }
}
_init3 = __decoratorStart(_c);
__decorateElement(_init3, 5, "request", _request_dec3, WorkersImage);
__decoratorMetadata(_init3, WorkersImage);
async function base64StringToBlob(base64String) {
  try {
    const { Buffer: Buffer2 } = await Promise.resolve().then(() => __viteBrowserExternal);
    const buffer = Buffer2.from(base64String, "base64");
    return new Blob([buffer], { type: "image/png" });
  } catch {
    const uint8Array = Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));
    return new Blob([uint8Array], { type: "image/png" });
  }
}
const CHAT_AGENTS = [
  new Anthropic(),
  new AzureChatAI(),
  new Cohere(),
  new Google(),
  new Mistral(),
  new OpenAI(),
  new WorkersChat(),
  new OpenAILike(),
  new Vertex()
];
function loadChatLLM(context) {
  for (const llm of CHAT_AGENTS) {
    if (llm.name === context.AI_PROVIDER) {
      return llm;
    }
  }
  for (const llm of CHAT_AGENTS) {
    if (llm.enable(context)) {
      return llm;
    }
  }
  return null;
}
const IMAGE_AGENTS = [
  new AzureImageAI(),
  new Dalle(),
  new WorkersImage(),
  new OpenAILikeImage()
];
function loadImageGen(context) {
  for (const imgGen of IMAGE_AGENTS) {
    if (imgGen.name === context.AI_IMAGE_PROVIDER) {
      return imgGen;
    }
  }
  for (const imgGen of IMAGE_AGENTS) {
    if (imgGen.enable(context)) {
      return imgGen;
    }
  }
  return null;
}
const AUDIO_AGENTS = [
  new Transcription()
];
function loadAudioLLM(context) {
  for (const llm of AUDIO_AGENTS) {
    if (llm.name === context.AI_PROVIDER) {
      return llm;
    }
  }
  for (const llm of AUDIO_AGENTS) {
    if (llm.enable(context)) {
      return llm;
    }
  }
  return null;
}
function customInfo(config) {
  const other_info = {
    mode: config.CURRENT_MODE,
    prompt: `${config.SYSTEM_INIT_MESSAGE?.slice(0, 50)}...`,
    MAPPING_KEY: config.MAPPING_KEY,
    MAPPING_VALUE: config.MAPPING_VALUE,
    USE_TOOLS: config.USE_TOOLS,
    TOOL_MODEL: config.TOOL_MODEL,
    VERTEX_SEARCH_GROUNDING: config.VERTEX_SEARCH_GROUNDING,
    FUNC_LOOP_TIMES: ENV.FUNC_LOOP_TIMES,
    FUNC_CALL_TIMES: ENV.CON_EXEC_FUN_NUM,
    EXPIRED_TIME: ENV.EXPIRED_TIME,
    CRON_CHECK_TIME: ENV.CRON_CHECK_TIME
  };
  return JSON.stringify(other_info, null, 2);
}
async function warpLLMParams(params, context) {
  const tool_envs = { ...context.JINA_API_KEY && { JINA_API_KEY: context.JINA_API_KEY[Math.floor(Math.random() * context.JINA_API_KEY.length)] } };
  const env_perfix = "TOOL_ENV_";
  Object.keys(context).forEach((i) => i.startsWith(env_perfix) && (tool_envs[i.substring(env_perfix.length - 1)] = context[i]));
  const messages = params.messages.at(-1);
  let tool2 = typeof messages.content === "string" ? vaildTools(context.USE_TOOLS) : void 0;
  const toolModel = await createLlmModel(context.TOOL_MODEL, context);
  if (tool2 && tool2.activeTools.length === 0) {
    tool2 = void 0;
  }
  let activeTools = tool2?.activeTools;
  if (params.model.provider === "google-vertex" && context.VERTEX_SEARCH_GROUNDING) {
    activeTools = void 0;
    tool2 = void 0;
    params.messages = [params.messages.find((p) => p.role === "system"), params.messages.findLast((p) => p.role === "user")];
  }
  let toolChoice;
  if (activeTools) {
    const userMessageIsString = typeof messages.content === "string";
    const choiceResult = wrapToolChoice(activeTools, userMessageIsString ? messages.content : "");
    userMessageIsString && (messages.content = choiceResult.message);
    toolChoice = choiceResult.toolChoices;
  }
  return {
    model: params.model,
    toolModel,
    messages: params.messages,
    tools: tool2?.tools,
    activeTools,
    toolChoice,
    context
  };
}
async function createLlmModel(model, context) {
  let [agent, model_id] = model.includes(":") ? model.trim().split(":") : [context.AI_PROVIDER, model];
  if (agent === "auto") {
    throw new Error("Auto mode is not supported, please specify the agent");
  }
  if (!model_id) {
    model_id = context[`${agent.toUpperCase()}_CHAT_MODEL`];
  }
  switch (agent) {
    case "openai":
    case "gpt":
      return createOpenAI({
        baseURL: context.OPENAI_API_BASE,
        apiKey: context.OPENAI_API_KEY[Math.floor(Math.random() * context.OPENAI_API_KEY.length)],
        compatibility: "strict"
      }).languageModel(model_id, void 0);
    case "claude":
    case "anthropic":
      return createAnthropic({
        baseURL: context.ANTHROPIC_API_BASE,
        apiKey: context.ANTHROPIC_API_KEY || void 0
      }).languageModel(model_id, void 0);
    case "google":
    case "gemini":
      return createGoogleGenerativeAI({
        baseURL: context.GOOGLE_API_BASE,
        apiKey: context.GOOGLE_API_KEY || void 0
      }).languageModel(model_id, {
        safetySettings: [
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_LOW_AND_ABOVE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" }
        ]
      });
    case "cohere":
      return createCohere({
        baseURL: context.COHERE_API_BASE,
        apiKey: context.COHERE_API_KEY || void 0
      }).languageModel(model_id, void 0);
    case "vertex":
      if (isCfWorker)
        throw new Error("Vertex is not supported in Cloudflare Workers");
      const { createVertex } = await import("@ai-sdk/google-vertex");
      return createVertex({
        project: context.VERTEX_PROJECT_ID,
        location: context.VERTEX_LOCATION,
        googleAuthOptions: {
          credentials: context.VERTEX_CREDENTIALS
        }
      }).languageModel(model_id, {
        safetySettings: [
          { category: "HARM_CATEGORY_UNSPECIFIED", threshold: "BLOCK_NONE" }
        ],
        useSearchGrounding: context.VERTEX_SEARCH_GROUNDING
      });
    default:
      return createOpenAI({
        name: "olike",
        baseURL: context.OPENAILIKE_API_BASE || void 0,
        apiKey: context.OPENAILIKE_API_KEY || void 0
      }).languageModel(model_id, void 0);
  }
}
function wrapToolChoice(activeTools, message) {
  const tool_perfix = "/t-";
  let text = message.trim();
  const choices = ["auto", "none", "required", ...activeTools];
  const toolChoices = [];
  do {
    const tool2 = choices.find((t) => text.startsWith(`${tool_perfix}${t}`)) || "";
    if (tool2) {
      text = text.substring(tool_perfix.length + tool2.length).trim();
      toolChoices.push(["auto", "none", "required"].includes(tool2) ? { type: tool2 } : { type: "tool", toolName: tool2 });
    } else {
      break;
    }
  } while (true);
  log.info(`All toolChoices: ${JSON.stringify(toolChoices)}`);
  return {
    message: text,
    toolChoices
  };
}
class AsyncIter {
  queue = [];
  resolver = [];
  done = false;
  get isDone() {
    return this.done;
  }
  add(item) {
    if (this.done) {
      throw new Error("Cannot add items to a completed iterator.");
    }
    if (item.done) {
      this.done = true;
    }
    if (this.resolver.length > 0) {
      const resolve = this.resolver.shift();
      resolve({ done: false, value: item.content });
      if (item.done && this.resolver.length > 0) {
        this.resolver.forEach((resolve2) => resolve2({ done: true, value: void 0 }));
        this.resolver = [];
        this.done = true;
      }
    } else {
      this.queue.push(item);
    }
  }
  next() {
    return new Promise((resolve) => {
      if (this.queue.length > 0) {
        const data = this.queue.shift();
        resolve({ done: false, value: data.content });
        if (data.done) {
          this.done = true;
        }
        return;
      }
      if (this.done) {
        resolve({ done: true, value: void 0 });
        return;
      }
      this.resolver.push(resolve);
    });
  }
  return() {
    if (!this.done) {
      this.done = true;
    }
    this.resolver.forEach((resolve) => resolve({ done: true, value: void 0 }));
    return Promise.resolve({ done: true, value: void 0 });
  }
  [Symbol.asyncIterator]() {
    return this;
  }
}
const perplexityExtractor = {
  contentExtractor: (data) => {
    if (data.chunks && data.chunks.length > 0) {
      const chunk = data.chunks.at(-1) || "";
      return chunk;
    }
    return "";
  },
  fullContentExtractor: (data) => {
    return `${data?.answer || ""}

${perplexityExtractor.finalAdd(data)}`;
  },
  finalAdd: (data) => {
    if (data.web_results && data.web_results.length > 0) {
      return `${data.web_results.map((r, i) => `${i + 1}. [${r.name}](${r.url})`).join("\n")}`;
    }
    return "";
  }
};
function perplexityFormatter(message) {
  const [event, data] = message;
  switch (event) {
    case "query_progress":
      if (data.text) {
        return {
          done: data.final,
          content: JSON.parse(data.text)
        };
      }
      return {
        done: false,
        content: ""
      };
    case "error":
      return {
        done: true,
        content: "[ERROR] Occur error"
      };
    case "disconnect":
    default:
      return {
        done: true,
        content: ""
      };
  }
}
async function WssRequest(url, protocols, options2, messages, handlers) {
  const { WebSocket } = await import("ws");
  let { extractor, formatter, onStream } = handlers;
  return new Promise((resolve) => {
    const ws = new WebSocket(url, options2);
    let result2 = {};
    let streamSender;
    extractor = extractor || perplexityExtractor;
    formatter = formatter || perplexityFormatter;
    let streamIter = null;
    if (onStream) {
      streamIter = new AsyncIter();
      streamSender = streamHandler(streamIter, extractor, onStream);
    }
    ws.on("open", () => {
      log.info("wss connected.");
    });
    ws.on("message", async (data) => {
      const message = data.toString("utf-8");
      if (message.startsWith("0")) {
        const handshake = JSON.parse(message.substring(1));
        log.info("Handshake received:", handshake);
        ws.send("40");
        for (const message2 of messages) {
          ws.send(message2);
        }
      } else if (message.startsWith("42")) {
        const parsedMsg = JSON.parse(message.substring(2));
        const extracted = perplexityFormatter(parsedMsg);
        if (streamIter && !streamIter.isDone) {
          streamIter.add(extracted);
        }
        if (extracted.done) {
          log.info("Stream done.");
          result2 = extracted.content;
          ws.close();
        }
      } else if (message.startsWith("3")) {
        log.info("Heartbeat received");
      } else {
        log.info("Received non-data message:", message);
      }
    });
    ws.on("close", async () => {
      log.info("wss closed.");
      closeWss(resolve, result2, streamIter, streamSender, extractor);
    });
    ws.on("error", async (e) => {
      console.error(e.message);
      if (streamIter) {
        streamIter.return();
      }
      result2.message = `Error: ${e.message}`;
    });
  });
}
async function closeWss(resolve, result2, streamIter, streamSender, extractor) {
  let data = "";
  if (streamIter) {
    data = await streamSender || "";
    data += `

${extractor.finalAdd(result2)}`;
    data += result2.message ? `
${result2.message}` : "";
  } else {
    data = `${extractor.fullContentExtractor(result2)}
${result2.message || ""}`;
  }
  log.info("Result:", data.trim());
  resolve(data.trim());
}
const COMMAND_AUTH_CHECKER = {
  default(chatType) {
    if (isTelegramChatTypeGroup(chatType)) {
      return ["administrator", "creator"];
    }
    return null;
  },
  shareModeGroup(chatType) {
    if (isTelegramChatTypeGroup(chatType)) {
      if (!ENV.GROUP_CHAT_BOT_SHARE_MODE) {
        return null;
      }
      return ["administrator", "creator"];
    }
    return null;
  }
};
class ImgCommandHandler {
  command = "/img";
  scopes = ["all_private_chats", "all_chat_administrators"];
  handle = async (message, subcommand, context, sender) => {
    if (subcommand === "") {
      return sender.sendPlainText(ENV.I18N.command.help.img);
    }
    try {
      const agent = loadImageGen(context.USER_CONFIG);
      if (!agent) {
        return sender.sendPlainText("ERROR: Image generator not found");
      }
      sendAction(context.SHARE_CONTEXT.botToken, message.chat.id, "upload_photo");
      await sender.sendPlainText("Please wait a moment...");
      const img = await agent.request(subcommand, context.USER_CONFIG);
      log.info("img", img);
      const resp = await sendImages(img, ENV.SEND_IMAGE_FILE, sender, context.USER_CONFIG);
      if (!resp.ok) {
        return sender.sendPlainText(`ERROR: ${resp.statusText} ${await resp.text()}`);
      }
      return resp;
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class HelpCommandHandler {
  command = "/help";
  scopes = ["all_private_chats", "all_chat_administrators"];
  handle = async (message, subcommand, context, sender) => {
    let helpMsg = `${ENV.I18N.command.help.summary}
`;
    for (const [k, v] of Object.entries(ENV.I18N.command.help)) {
      if (k === "summary") {
        continue;
      }
      helpMsg += `/${k}：${v}
`;
    }
    for (const [k, v] of Object.entries(ENV.CUSTOM_COMMAND)) {
      if (v.description) {
        helpMsg += `${k}：${v.description}
`;
      }
    }
    for (const [k, v] of Object.entries(ENV.PLUGINS_COMMAND)) {
      if (v.description) {
        helpMsg += `${k}：${v.description}
`;
      }
    }
    helpMsg = helpMsg.split("\n").map((line) => `> ${line}`).join("\n");
    return sender.sendRichText(helpMsg, "MarkdownV2", "tip");
  };
}
class BaseNewCommandHandler {
  static async handle(showID, message, subcommand, context) {
    await ENV.DATABASE.delete(context.SHARE_CONTEXT.chatHistoryKey);
    const text = ENV.I18N.command.new.new_chat_start + (showID ? `(${message.chat.id})` : "");
    const params = {
      chat_id: message.chat.id,
      message_thread_id: message.message_thread_id || void 0,
      text
    };
    if (ENV.SHOW_REPLY_BUTTON && !isTelegramChatTypeGroup(message.chat.type)) {
      params.reply_markup = {
        keyboard: [[{ text: "/new" }, { text: "/redo" }]],
        selective: true,
        resize_keyboard: true,
        one_time_keyboard: false
      };
    } else {
      params.reply_markup = {
        remove_keyboard: true,
        selective: true
      };
    }
    return createTelegramBotAPI(context.SHARE_CONTEXT.botToken).sendMessage(params);
  }
}
class NewCommandHandler extends BaseNewCommandHandler {
  command = "/new";
  scopes = ["all_private_chats", "all_group_chats", "all_chat_administrators"];
  handle = async (message, subcommand, context) => {
    return BaseNewCommandHandler.handle(false, message, subcommand, context);
  };
}
class StartCommandHandler extends BaseNewCommandHandler {
  command = "/start";
  handle = async (message, subcommand, context) => {
    return BaseNewCommandHandler.handle(true, message, subcommand, context);
  };
}
class SetEnvCommandHandler {
  command = "/setenv";
  needAuth = COMMAND_AUTH_CHECKER.shareModeGroup;
  handle = async (message, subcommand, context, sender) => {
    const kv = subcommand.indexOf("=");
    if (kv === -1) {
      return sender.sendPlainText(ENV.I18N.command.help.setenv);
    }
    let key = subcommand.slice(0, kv);
    const value = subcommand.slice(kv + 1);
    key = ENV_KEY_MAPPER[key] || key;
    if (ENV.LOCK_USER_CONFIG_KEYS.includes(key)) {
      return sender.sendPlainText(`Key ${key} is locked`);
    }
    if (!Object.keys(context.USER_CONFIG).includes(key)) {
      return sender.sendPlainText(`Key ${key} not found`);
    }
    try {
      context.USER_CONFIG.DEFINE_KEYS.push(key);
      context.USER_CONFIG.DEFINE_KEYS = Array.from(new Set(context.USER_CONFIG.DEFINE_KEYS));
      ConfigMerger.merge(context.USER_CONFIG, {
        [key]: value
      });
      log.info("Update user config: ", key, context.USER_CONFIG[key]);
      await ENV.DATABASE.put(
        context.SHARE_CONTEXT.configStoreKey,
        JSON.stringify(ConfigMerger.trim(context.USER_CONFIG, ENV.LOCK_USER_CONFIG_KEYS))
      );
      return sender.sendPlainText("Update user config success");
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class SetEnvsCommandHandler {
  command = "/setenvs";
  needAuth = COMMAND_AUTH_CHECKER.shareModeGroup;
  handle = async (message, subcommand, context, sender) => {
    try {
      const values = JSON.parse(subcommand);
      const configKeys = Object.keys(context.USER_CONFIG);
      for (const ent of Object.entries(values)) {
        let [key, value] = ent;
        key = ENV_KEY_MAPPER[key] || key;
        if (ENV.LOCK_USER_CONFIG_KEYS.includes(key)) {
          return sender.sendPlainText(`Key ${key} is locked`);
        }
        if (!configKeys.includes(key)) {
          return sender.sendPlainText(`Key ${key} not found`);
        }
        context.USER_CONFIG.DEFINE_KEYS.push(key);
        ConfigMerger.merge(context.USER_CONFIG, {
          [key]: value
        });
        log.info("Update user config: ", key, context.USER_CONFIG[key]);
      }
      context.USER_CONFIG.DEFINE_KEYS = Array.from(new Set(context.USER_CONFIG.DEFINE_KEYS));
      await ENV.DATABASE.put(
        context.SHARE_CONTEXT.configStoreKey,
        JSON.stringify(ConfigMerger.trim(context.USER_CONFIG, ENV.LOCK_USER_CONFIG_KEYS))
      );
      return sender.sendPlainText("Update user config success");
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class DelEnvCommandHandler {
  command = "/delenv";
  needAuth = COMMAND_AUTH_CHECKER.shareModeGroup;
  handle = async (message, subcommand, context, sender) => {
    if (ENV.LOCK_USER_CONFIG_KEYS.includes(subcommand)) {
      const msg = `Key ${subcommand} is locked`;
      return sender.sendPlainText(msg);
    }
    try {
      context.USER_CONFIG[subcommand] = null;
      context.USER_CONFIG.DEFINE_KEYS = context.USER_CONFIG.DEFINE_KEYS.filter((key) => key !== subcommand);
      await ENV.DATABASE.put(
        context.SHARE_CONTEXT.configStoreKey,
        JSON.stringify(ConfigMerger.trim(context.USER_CONFIG, ENV.LOCK_USER_CONFIG_KEYS))
      );
      return sender.sendPlainText("Delete user config success");
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class ClearEnvCommandHandler {
  command = "/clearenv";
  needAuth = COMMAND_AUTH_CHECKER.shareModeGroup;
  handle = async (message, subcommand, context, sender) => {
    try {
      await ENV.DATABASE.put(
        context.SHARE_CONTEXT.configStoreKey,
        JSON.stringify({})
      );
      return sender.sendPlainText("Clear user config success");
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class VersionCommandHandler {
  command = "/version";
  scopes = ["all_private_chats", "all_chat_administrators"];
  handle = async (message, subcommand, context, sender) => {
    const current = {
      ts: ENV.BUILD_TIMESTAMP,
      sha: ENV.BUILD_VERSION
    };
    try {
      const info = `https://raw.githubusercontent.com/TBXark/ChatGPT-Telegram-Workers/${ENV.UPDATE_BRANCH}/dist/buildinfo.json`;
      const online = await fetch(info).then((r) => r.json());
      const timeFormat = (ts) => {
        return new Date(ts * 1e3).toLocaleString("en-US", {});
      };
      if (current.ts < online.ts) {
        const text = `New version detected: ${online.sha}(${timeFormat(online.ts)})
Current version: ${current.sha}(${timeFormat(current.ts)})`;
        return sender.sendPlainText(text);
      } else {
        const text = `Current version: ${current.sha}(${timeFormat(current.ts)}) is up to date`;
        return sender.sendPlainText(text);
      }
    } catch (e) {
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
}
class SystemCommandHandler {
  command = "/system";
  scopes = ["all_private_chats", "all_chat_administrators"];
  handle = async (message, subcommand, context, sender) => {
    const chatAgent = loadChatLLM(context.USER_CONFIG);
    const imageAgent = loadImageGen(context.USER_CONFIG);
    const agent = {
      AI_PROVIDER: chatAgent?.name,
      [chatAgent?.modelKey || "AI_PROVIDER_NOT_FOUND"]: chatAgent?.model(context.USER_CONFIG),
      AI_IMAGE_PROVIDER: imageAgent?.name,
      [imageAgent?.modelKey || "AI_IMAGE_PROVIDER_NOT_FOUND"]: imageAgent?.model(context.USER_CONFIG),
      STT_MODEL: context.USER_CONFIG.OPENAI_STT_MODEL,
      VISION_MODEL: context.USER_CONFIG.OPENAI_VISION_MODEL,
      IMAGE_MODEL: context.USER_CONFIG.IMAGE_MODEL
    };
    let msg = `<pre>AGENT: ${JSON.stringify(agent, null, 2)}
OTHERS: ${customInfo(context.USER_CONFIG)}
</pre>`;
    if (ENV.DEV_MODE) {
      const shareCtx = { ...context.SHARE_CONTEXT };
      shareCtx.botToken = "******";
      context.USER_CONFIG.OPENAI_API_KEY = ["******"];
      context.USER_CONFIG.AZURE_API_KEY = "******";
      context.USER_CONFIG.AZURE_COMPLETIONS_API = "******";
      context.USER_CONFIG.AZURE_DALLE_API = "******";
      context.USER_CONFIG.CLOUDFLARE_ACCOUNT_ID = "******";
      context.USER_CONFIG.CLOUDFLARE_TOKEN = "******";
      context.USER_CONFIG.GOOGLE_API_KEY = "******";
      context.USER_CONFIG.MISTRAL_API_KEY = "******";
      context.USER_CONFIG.COHERE_API_KEY = "******";
      context.USER_CONFIG.ANTHROPIC_API_KEY = "******";
      const config = ConfigMerger.trim(context.USER_CONFIG, ENV.LOCK_USER_CONFIG_KEYS);
      msg = `<pre>
${msg}`;
      msg += `USER_CONFIG: ${JSON.stringify(config, null, 2)}
`;
      msg += `CHAT_CONTEXT: ${JSON.stringify(sender.context || {}, null, 2)}
`;
      msg += `SHARE_CONTEXT: ${JSON.stringify(shareCtx, null, 2)}
`;
      msg += "</pre>";
    }
    return sender.sendRichText(msg, "HTML", "tip");
  };
}
class RedoCommandHandler {
  command = "/redo";
  scopes = ["all_private_chats", "all_group_chats", "all_chat_administrators"];
  handle = async (message, subcommand, context) => {
    const mf = (history, message2) => {
      let nextMessage = message2;
      if (!(history && Array.isArray(history) && history.length > 0)) {
        throw new Error("History not found");
      }
      const historyCopy = structuredClone(history);
      while (true) {
        const data = historyCopy.pop();
        if (data === void 0 || data === null) {
          break;
        } else if (data.role === "user") {
          nextMessage = data;
          break;
        }
      }
      if (subcommand) {
        nextMessage = {
          role: "user",
          content: subcommand
        };
      }
      if (nextMessage === null) {
        throw new Error("Redo message not found");
      }
      return { history: historyCopy, message: nextMessage };
    };
    return chatWithLLM(message, null, context, mf);
  };
}
class EchoCommandHandler {
  command = "/echo";
  handle = (message, subcommand, context, sender) => {
    let msg = "<pre>";
    msg += JSON.stringify({ message }, null, 2);
    msg += "</pre>";
    return sender.sendRichText(msg, "HTML");
  };
}
class SetCommandHandler {
  command = "/set";
  needAuth = COMMAND_AUTH_CHECKER.shareModeGroup;
  scopes = ["all_private_chats", "all_chat_administrators"];
  relaxAuth = true;
  handle = async (message, subcommand, context, sender) => {
    try {
      if (!subcommand) {
        const detailSet = ENV.I18N.command?.detail?.set || "Have no detailed information in the language";
        return sender.sendRichText(`\`\`\`plaintext
${detailSet}
\`\`\``, "MarkdownV2");
      }
      const { keys, values } = this.parseMappings(context);
      const { flags, remainingText } = this.tokenizeSubcommand(subcommand);
      const needUpdate = remainingText.trim() === "";
      let msg = "";
      const updatedKeys = [];
      if (context.USER_CONFIG.AI_PROVIDER === "auto") {
        context.USER_CONFIG.AI_PROVIDER = "openai";
      }
      for (const { flag, value } of flags) {
        const result2 = await this.processSubcommand(flag, value, keys, values, context, sender);
        if (result2 instanceof Response) {
          return result2;
        }
        updatedKeys.push(result2);
      }
      await this.RelaxAuthCheck(message, context, updatedKeys, needUpdate);
      if (needUpdate && updatedKeys.length > 0 && context.SHARE_CONTEXT?.configStoreKey) {
        context.USER_CONFIG.DEFINE_KEYS = Array.from(new Set(context.USER_CONFIG.DEFINE_KEYS));
        await ENV.DATABASE.put(
          context.SHARE_CONTEXT.configStoreKey,
          JSON.stringify(ConfigMerger.trim(context.USER_CONFIG, ENV.LOCK_USER_CONFIG_KEYS))
        );
        msg += "Update user config successful";
      }
      if (msg) {
        await sender.sendPlainText(msg);
      }
      if (remainingText) {
        message.text = remainingText;
        context.MIDDEL_CONTEXT.originalMessage.text = remainingText;
        return null;
      }
      return new Response("success");
    } catch (e) {
      log.error(`/set error: ${e.message}`);
      return sender.sendPlainText(`ERROR: ${e.message}`);
    }
  };
  parseMappings(context) {
    const parseMapping = (mapping) => {
      if (!mapping) {
        return {};
      }
      const entries = [];
      const pairs = mapping.split("|");
      for (const k of pairs) {
        const [key, ...rest] = k.split(":");
        if (!key) {
          console.warn(`Invalid key in mapping: "${k}"`);
          continue;
        }
        const value = rest.length > 0 ? rest.join(":") : "";
        entries.push([key, value]);
      }
      return Object.fromEntries(entries);
    };
    const keys = parseMapping(context.USER_CONFIG.MAPPING_KEY);
    const values = parseMapping(context.USER_CONFIG.MAPPING_VALUE);
    return { keys, values };
  }
  tokenizeSubcommand(subcommand) {
    const regex = /^\s*(-\w+)\s+(".*?"|'.*?'|\S+|$)/;
    const flags = [];
    let text = subcommand;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const flag = match[1];
      let value = match[2];
      if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      flags.push({ flag, value });
      text = text.slice(match[0].length);
    }
    const remainingText = text.trim();
    log.info(`/set flags: ${JSON.stringify(flags, null, 2)}, remainingText: ${remainingText}`);
    return { flags, remainingText };
  }
  async processSubcommand(flag, value, keys, values, context, sender) {
    let key = keys[flag];
    let mappedValue = values[value] ?? value;
    if (!key) {
      throw new Error(`Mapping Key ${flag} not found`);
    }
    if (ENV.LOCK_USER_CONFIG_KEYS.includes(key) && sender) {
      return sender.sendPlainText(`Key ${key} is locked`);
    }
    switch (key) {
      case "SYSTEM_INIT_MESSAGE":
        mappedValue = context.USER_CONFIG.PROMPT[value] || value;
        break;
      case "CHAT_MODEL":
      case "VISION_MODEL":
      case "STT_MODEL":
        key = context.USER_CONFIG.AI_PROVIDER ? `${context.USER_CONFIG.AI_PROVIDER.toUpperCase()}_${key}` : key;
        break;
      case "CURRENT_MODE":
        if (!Object.keys(context.USER_CONFIG.MODES).includes(value)) {
          return sender.sendPlainText(`mode ${value} not found. Support modes: ${Object.keys(context.USER_CONFIG.MODES).join(", ")}`);
        }
        break;
      case "USE_TOOLS":
        if (value === "on") {
          mappedValue = Object.keys(tools);
        } else if (value === "off") {
          mappedValue = [];
        }
        break;
    }
    if (!(key in context.USER_CONFIG)) {
      return sender.sendPlainText(`Key ${key} not found`);
    }
    if (typeof context.USER_CONFIG[key] === "boolean") {
      mappedValue = typeof mappedValue === "boolean" ? mappedValue : mappedValue === "true";
    }
    context.USER_CONFIG[key] = mappedValue;
    if (!context.USER_CONFIG.DEFINE_KEYS.includes(key)) {
      context.USER_CONFIG.DEFINE_KEYS.push(key);
    }
    log.info(`/set ${key} ${(JSON.stringify(mappedValue) || value).substring(0, 100)}...`);
    return key;
  }
  async RelaxAuthCheck(message, context, keys, needUpdate) {
    if (!this.relaxAuth && ENV.RELAX_AUTH_KEYS.length === 0) {
      return;
    }
    if (needUpdate) {
      await authChecker(this, message, context);
    } else if (keys.length > 0 && keys.some((key) => !ENV.RELAX_AUTH_KEYS.includes(key))) {
      await authChecker(this, message, context);
    }
  }
}
class PerplexityCommandHandler {
  command = "/pplx";
  needAuth = COMMAND_AUTH_CHECKER.shareModeGroup;
  handle = async (message, subcommand, context, sender) => {
    if (isCfWorker) {
      return sender.sendPlainText("Due to the limitation of browser, Perplexity is not supported in worker / browser");
    }
    if (!ENV.PPLX_COOKIE) {
      return sender.sendPlainText("Perplexity cookie is not set");
    }
    const supportedModes = ["internet", "scholar", "writing", "wolfram", "youtube", "reddit"];
    const match = subcommand.split(" ")[0];
    const mode = supportedModes.find((m) => match === m) || "internet";
    if (mode === match) {
      subcommand = subcommand.slice(match.length).trim();
    }
    if (!subcommand) {
      return sender.sendPlainText("Please input your query");
    }
    const perplexityMessageData = {
      version: "2.9",
      source: "default",
      attachments: [],
      language: "en-GB",
      timezone: "Europe/London",
      search_focus: mode,
      frontend_uuid: UUIDv4(),
      mode: "concise",
      is_related_query: false,
      is_default_related_query: false,
      visitor_id: UUIDv4(),
      frontend_context_uuid: UUIDv4(),
      prompt_source: "user",
      query_source: "home"
    };
    const perplexityMessage = [`42["perplexity_ask", "${subcommand}", ${JSON.stringify(perplexityMessageData)}]`];
    const perplexityWsUrl = "wss://www.perplexity.ai/socket.io/?EIO=4&transport=websocket";
    const perplexityWsOptions = {
      headers: {
        "Cookie": ENV.PPLX_COOKIE,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "priority": "u=1, i",
        "Referer": "https://www.perplexity.ai/"
      },
      rejectUnauthorized: false
    };
    await (await sender.sendRichText("Perplexity is asking...")).json();
    const onStream = OnStreamHander(sender, context, subcommand);
    const logs = getLogSingleton(context.USER_CONFIG);
    logs.chat.model.push(`Perplexity ${mode}`);
    const startTime2 = Date.now();
    const result2 = await WssRequest(perplexityWsUrl, null, perplexityWsOptions, perplexityMessage, { onStream }).catch(console.error);
    logs.chat.time.push(((Date.now() - startTime2) / 1e3).toFixed(1));
    await onStream.end?.(result2);
    return new Response("success");
  };
}
class InlineCommandHandler {
  command = "/settings";
  scopes = ["all_private_chats", "all_chat_administrators"];
  needAuth = COMMAND_AUTH_CHECKER.shareModeGroup;
  handle = async (message, subcommand, context, sender) => {
    const defaultInlineKeys = this.defaultInlineKeys(context.USER_CONFIG);
    const currentSettings = this.settingsMessage(context.USER_CONFIG, defaultInlineKeys);
    return createTelegramBotAPI(context.SHARE_CONTEXT.botToken).sendMessage({
      chat_id: message.chat.id,
      ...message.chat.type === "private" ? {} : { reply_to_message_id: message.message_id },
      text: escape(currentSettings.split("\n")),
      parse_mode: "MarkdownV2",
      reply_markup: {
        inline_keyboard: this.inlineKeyboard(context.USER_CONFIG, defaultInlineKeys)
      }
    });
  };
  defaultInlineKeys = (context) => {
    return {
      INLINE_AGENTS: {
        label: "Agent",
        data: "INLINE_AGENTS",
        config_key: "AI_PROVIDER",
        available_values: context.INLINE_AGENTS
      },
      INLINE_IMAGE_AGENTS: {
        label: "Image Agent",
        data: "INLINE_IMAGE_AGENTS",
        config_key: "AI_IMAGE_PROVIDER",
        available_values: context.INLINE_IMAGE_AGENTS
      },
      INLINE_CHAT_MODELS: {
        label: "Chat Model",
        data: "INLINE_CHAT_MODELS",
        config_key: loadChatLLM(context)?.modelKey || "None",
        available_values: context.INLINE_CHAT_MODELS
      },
      INLINE_VISION_MODELS: {
        label: "Vision Model",
        data: "INLINE_VISION_MODELS",
        config_key: loadChatLLM(context)?.name === "OpenAI" ? "OPENAI_VISION_MODEL" : loadChatLLM(context)?.modelKey || "None",
        available_values: context.INLINE_VISION_MODELS
      },
      INLINE_IMAGE_MODELS: {
        label: "Image Model",
        data: "INLINE_IMAGE_MODELS",
        config_key: loadImageGen(context)?.modelKey || "",
        available_values: context.INLINE_IMAGE_MODELS
      },
      INLINE_TOOL_MODELS: {
        label: "Function Model",
        data: "INLINE_TOOL_MODELS",
        config_key: "TOOL_MODEL",
        available_values: context.INLINE_TOOL_MODELS
      },
      INLINE_FUNCTION_CALL_TOOLS: {
        label: "Tools",
        data: "INLINE_FUNCTION_CALL_TOOLS",
        config_key: "USE_TOOLS",
        available_values: context.INLINE_FUNCTION_CALL_TOOLS
      },
      INLINE_FUNCTION_ASAP: {
        label: "Call ASAP",
        data: "INLINE_FUNCTION_ASAP",
        config_key: "FUNCTION_REPLY_ASAP",
        available_values: context.INLINE_FUNCTION_ASAP
      }
    };
  };
  settingsMessage = (context, inlineKeys) => {
    const currentSettings = `Current Settings:
>${"-".repeat(40)}
> 
${Object.entries(inlineKeys).map(([_, { label, config_key }]) => {
      return `>\`${label}: ${context[config_key]}\``;
    }).join("\n")}`;
    return `
${currentSettings}
> 
>${"-".repeat(40)}`;
  };
  inlineKeyboard = (context, inlineKeys) => {
    const inline_keyboard_list = Object.entries(inlineKeys).reduce((acc, [key, { label }]) => {
      if (key in context && context[key].length > 0) {
        acc.push({
          text: label,
          callback_data: key
        });
      }
      return acc;
    }, []);
    inline_keyboard_list.push({
      text: "❌",
      callback_data: "CLOSE"
    });
    return chunckArray(inline_keyboard_list, 3);
  };
}
class KlingAICommandHandler {
  command = "/kling";
  needAuth = COMMAND_AUTH_CHECKER.shareModeGroup;
  handle = async (message, subcommand, context, sender) => {
    if (context.USER_CONFIG.KLINGAI_COOKIE.length === 0) {
      return sender.sendPlainText("KlingAI token is not set");
    }
    if (subcommand.trim() === "") {
      return sender.sendPlainText("Please input your prompt");
    }
    return this.generate(message, subcommand, context, sender);
  };
  generate = async (message, subcommand, context, sender) => {
    let prompt2 = subcommand.trim();
    let number = context.USER_CONFIG.KLINGAI_IMAGE_COUNT;
    const match = /^\d+/.exec(prompt2);
    if (match) {
      number = Number.parseInt(match[0]);
      prompt2 = prompt2.slice(match[0].length);
    }
    const COOKIES = context.USER_CONFIG.KLINGAI_COOKIE;
    let cookie = "";
    if (COOKIES.length > 0) {
      cookie = COOKIES[Math.floor(Math.random() * COOKIES.length)];
    } else {
      throw new Error("No KlingAI cookie found");
    }
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      "Cookie": cookie
    };
    const body = {
      arguments: [
        { name: "prompt", value: prompt2 },
        { name: "style", value: "默认" },
        { name: "aspect_ratio", value: context.USER_CONFIG.KLINGAI_IMAGE_RATIO },
        { name: "imageCount", value: number },
        { name: "biz", value: "klingai" }
      ],
      type: "mmu_txt2img_aiweb",
      inputs: []
    };
    if (context.MIDDEL_CONTEXT.originalMessage?.type === "image" && context.MIDDEL_CONTEXT.originalMessage.id?.[0]) {
      const img_id = context.MIDDEL_CONTEXT.originalMessage.id?.[0];
      const img_url = await this.getFileUrl(img_id, context, headers);
      log.info(`Uploaded image url: ${img_url}`);
      body.inputs.push({ name: "input", url: img_url, inputType: "URL" });
      body.arguments.push({ name: "fidelity", value: 0.5 });
      body.type = "mmu_img2img_aiweb";
    }
    const resp = await fetch(`https://klingai.com/api/task/submit`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then((res) => res.json());
    const taskId = resp.data?.task?.id;
    if (!taskId) {
      console.error(JSON.stringify(resp));
      throw new Error(resp.message || "Failed to get task id, see logs for more details");
    }
    sender.sendRichText("`Please wait a moment...`", "MarkdownV2", "tip");
    return this.handleTask(taskId, headers, sender);
  };
  handleTask = async (taskId, headers, sender) => {
    const MAX_WAIT_TIME = 6e5;
    const startTime2 = Date.now();
    while (true) {
      const resp = await fetch(`https://klingai.com/api/task/status?taskId=${taskId}`, {
        headers
      }).then((res) => res.json());
      if (resp.data?.status === 99) {
        const pics = resp.data.works.map(({ resource }) => ({
          type: "photo",
          media: resource.resource
        })).filter((i) => i.media);
        if (pics.length > 0) {
          log.info(`KlingAI image urls: ${pics.map((i) => i.media).join(", ")}`);
          return sender.sendMediaGroup(pics);
        }
        console.error(JSON.stringify(resp.data, null, 2));
        throw new Error(`KlingAI Task failed, see logs for more details`);
      }
      if (Date.now() - startTime2 > MAX_WAIT_TIME) {
        throw new Error(`KlingAI Task timeout`);
      }
      await new Promise((resolve) => setTimeout(resolve, 1e4));
    }
  };
  getFileUrl = async (file_id, context, headers) => {
    const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
    const img_path = (await api.getFileWithReturns({ file_id }).then((res) => res.result)).file_path;
    const img_blob = await fetch(`https://api.telegram.org/file/bot${context.SHARE_CONTEXT.botToken}/${img_path}`, {}).then((res) => res.blob());
    const { token, domain } = await this.getUploadFileTokenAndEndpoint(headers);
    await fetch(`https://${domain}/api/upload/fragment?upload_token=${token}&fragment_id=0`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/octet-stream"
      },
      body: img_blob
    });
    await fetch(`https://${domain}/api/upload/complete?fragment_count=1&upload_token=${token}`, {
      method: "POST",
      headers
    });
    const url_resp = await fetch(`https://klingai.com/api/upload/verify/token?token=${token}`, {
      headers
    }).then((res) => res.json());
    if (!url_resp.data?.url) {
      throw new Error(url_resp.data.message || "Failed to get file url, see logs for more details");
    }
    return url_resp.data.url;
  };
  getUploadFileTokenAndEndpoint = async (headers) => {
    const resp = await fetch(`https://klingai.com/api/upload/issue/token?filename=image.jpg`, {
      headers
    }).then((res) => res.json());
    if (!resp.data.token || !resp.data?.httpEndpoints?.[0]) {
      throw new Error(`Failed to upload file, see logs for more details`);
    }
    return {
      token: resp.data.token,
      domain: resp.data.httpEndpoints[0]
    };
  };
}
const SYSTEM_COMMANDS = [
  new StartCommandHandler(),
  new NewCommandHandler(),
  new RedoCommandHandler(),
  new ImgCommandHandler(),
  new SetEnvCommandHandler(),
  new SetEnvsCommandHandler(),
  new DelEnvCommandHandler(),
  new ClearEnvCommandHandler(),
  new VersionCommandHandler(),
  new SystemCommandHandler(),
  new HelpCommandHandler(),
  new SetCommandHandler(),
  new PerplexityCommandHandler(),
  new InlineCommandHandler(),
  new KlingAICommandHandler()
];
async function handleSystemCommand(message, raw, command, context) {
  const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
  try {
    if (command.needAuth && !command.relaxAuth) {
      await authChecker(command, message, context);
    }
  } catch (e) {
    return sender.sendPlainText(`ERROR: ${e.message}`);
  }
  const subcommand = raw.substring(command.command.length).trim();
  try {
    return command.handle(message, subcommand, context, sender);
  } catch (e) {
    return sender.sendPlainText(`ERROR: ${e.message}`);
  }
}
async function handlePluginCommand(message, command, raw, template, context) {
  const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
  try {
    const subcommand = raw.substring(command.length).trim();
    if (template.input?.required && !subcommand) {
      throw new Error("Missing required input");
    }
    const DATA = formatInput(subcommand, template.input?.type);
    const { type: type2, content } = await executeRequest(template, {
      DATA,
      ENV: ENV.PLUGINS_ENV
    });
    if (type2 === "image") {
      sendAction(context.SHARE_CONTEXT.botToken, message.chat.id, "upload_photo");
      return sender.sendPhoto(content);
    }
    sendAction(context.SHARE_CONTEXT.botToken, message.chat.id, "typing");
    switch (type2) {
      case "html":
        return sender.sendRichText(content, "HTML");
      case "markdown":
        return sender.sendRichText(content, "Markdown");
      case "markdownV2":
        return sender.sendRichText(content, "MarkdownV2");
      case "text":
      default:
        return sender.sendPlainText(content);
    }
  } catch (e) {
    const help = ENV.PLUGINS_COMMAND[command].description;
    return sender.sendPlainText(`ERROR: ${e.message}${help ? `
${help}` : ""}`);
  }
}
async function handleCommandMessage(message, context) {
  let text = (message.text || message.caption || "").trim();
  if (ENV.CUSTOM_COMMAND[text]) {
    text = ENV.CUSTOM_COMMAND[text].value;
  }
  if (ENV.DEV_MODE) {
    SYSTEM_COMMANDS.push(new EchoCommandHandler());
  }
  for (const key in ENV.PLUGINS_COMMAND) {
    if (text === key || text.startsWith(`${key} `)) {
      let template = ENV.PLUGINS_COMMAND[key].value.trim();
      if (template.startsWith("http")) {
        template = await fetch(template).then((r) => r.text());
      }
      if (key.trim() === text.trim() && template.includes("{{DATA}}")) {
        const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
        return sender.sendPlainText(`Tip: ${ENV.PLUGINS_COMMAND[key].description || "Please input something"}`, "tip");
      }
      return await handlePluginCommand(message, key, text, JSON.parse(template), context);
    }
  }
  for (const cmd of SYSTEM_COMMANDS) {
    if (text === cmd.command || text.startsWith(`${cmd.command} `)) {
      return await handleSystemCommand(message, text, cmd, context);
    }
  }
  return null;
}
function commandsBindScope() {
  const scopeCommandMap = {
    all_private_chats: [],
    all_group_chats: [],
    all_chat_administrators: []
  };
  for (const cmd of SYSTEM_COMMANDS) {
    if (ENV.HIDE_COMMAND_BUTTONS.includes(cmd.command)) {
      continue;
    }
    if (cmd.scopes) {
      for (const scope of cmd.scopes) {
        if (!scopeCommandMap[scope]) {
          scopeCommandMap[scope] = [];
        }
        scopeCommandMap[scope].push({
          command: cmd.command,
          description: ENV.I18N.command.help[cmd.command.substring(1)] || ""
        });
      }
    }
  }
  for (const list of [ENV.CUSTOM_COMMAND, ENV.PLUGINS_COMMAND]) {
    for (const [cmd, config] of Object.entries(list)) {
      if (config.scope) {
        for (const scope of config.scope) {
          if (!scopeCommandMap[scope]) {
            scopeCommandMap[scope] = [];
          }
          scopeCommandMap[scope].push({
            command: cmd,
            description: config.description || ""
          });
        }
      }
    }
  }
  const result2 = {};
  for (const scope in scopeCommandMap) {
    result2[scope] = {
      commands: scopeCommandMap[scope],
      scope: {
        type: scope
      }
    };
  }
  return result2;
}
function commandsDocument() {
  return SYSTEM_COMMANDS.map((command) => {
    return {
      command: command.command,
      description: ENV.I18N.command.help[command.command.substring(1)] || ""
    };
  }).filter((item) => item.description !== "");
}
async function authChecker(command, message, context) {
  const roleList = command.needAuth(message.chat?.type ?? "private");
  if (roleList) {
    const chatRole = await loadChatRoleWithContext(message, context);
    if (chatRole === null) {
      throw new Error("Get chat role failed");
    }
    if (!roleList.includes(chatRole)) {
      throw new Error(`Permission denied, need ${roleList.join(" or ")}`);
    }
  }
}
class ShareContext {
  botId;
  botToken;
  botName = null;
  chatHistoryKey;
  lastMessageKey;
  configStoreKey;
  groupAdminsKey;
  telegraphAccessTokenKey;
  scheduleDeteleKey = "schedule_detele_message";
  storeMessageKey;
  isForwarding = false;
  constructor(token, message) {
    const botId = Number.parseInt(token.split(":")[0]);
    const telegramIndex = ENV.TELEGRAM_AVAILABLE_TOKENS.indexOf(token);
    if (telegramIndex === -1) {
      throw new Error("Token not allowed");
    }
    if (ENV.TELEGRAM_BOT_NAME.length > telegramIndex) {
      this.botName = ENV.TELEGRAM_BOT_NAME[telegramIndex];
    }
    this.botToken = token;
    this.botId = botId;
    const id = message?.chat?.id;
    if (id === void 0 || id === null) {
      throw new Error("Chat id not found");
    }
    let historyKey = `history:${id}`;
    let configStoreKey = `user_config:${id}`;
    if (botId) {
      historyKey += `:${botId}`;
      configStoreKey += `:${botId}`;
    }
    switch (message.chat.type) {
      case "group":
      case "supergroup":
        if (!ENV.GROUP_CHAT_BOT_SHARE_MODE && message.from?.id) {
          historyKey += `:${message.from.id}`;
          configStoreKey += `:${message.from.id}`;
        }
        this.groupAdminsKey = `group_admin:${id}`;
        break;
    }
    if (message?.chat.is_forum && message?.is_topic_message) {
      if (message?.message_thread_id) {
        historyKey += `:${message.message_thread_id}`;
        configStoreKey += `:${message.message_thread_id}`;
      }
    }
    this.chatHistoryKey = historyKey;
    this.lastMessageKey = `last_message_id:${historyKey}`;
    this.configStoreKey = configStoreKey;
    if (message?.from?.id && ENV.STORE_MESSAGE_WHITELIST.includes(message.from.id) && ENV.STORE_MESSAGE_NUM > 0) {
      this.storeMessageKey = `store_message:${message.chat.id}:${message?.from?.id || message.chat.id}`;
    }
    if (ENV.TELEGRAPH_NUM_LIMIT > 0) {
      this.telegraphAccessTokenKey = `telegraph_access_token:${id}`;
    }
  }
}
class MiddleContext {
  originalMessage = { type: "text" };
  history = [];
  logs = null;
  middleResult = [];
  sender = null;
}
class WorkerContextBase {
  SHARE_CONTEXT;
  MIDDEL_CONTEXT = new MiddleContext();
  constructor(token, message) {
    this.SHARE_CONTEXT = new ShareContext(token, message);
  }
}
class WorkerContext {
  USER_CONFIG;
  SHARE_CONTEXT;
  MIDDEL_CONTEXT;
  constructor(USER_CONFIG, SHARE_CONTEXT, MIDDEL_CONTEXT) {
    this.USER_CONFIG = USER_CONFIG;
    this.SHARE_CONTEXT = SHARE_CONTEXT;
    this.MIDDEL_CONTEXT = MIDDEL_CONTEXT;
  }
  static async from(SHARE_CONTEXT, MIDDLE_CONTEXT) {
    const USER_CONFIG = { ...ENV.USER_CONFIG };
    try {
      const userConfig = JSON.parse(await ENV.DATABASE.get(SHARE_CONTEXT.configStoreKey));
      ConfigMerger.merge(USER_CONFIG, ConfigMerger.trim(userConfig, ENV.LOCK_USER_CONFIG_KEYS) || {});
    } catch (e) {
      console.warn(e);
    }
    return new WorkerContext(USER_CONFIG, SHARE_CONTEXT, MIDDLE_CONTEXT);
  }
}
class CallbackQueryContext {
  data;
  query_id;
  from;
  USER_CONFIG;
  SHARE_CONTEXT;
  constructor(callbackQuery, workContext) {
    this.data = callbackQuery.data;
    this.query_id = callbackQuery.id;
    this.from = callbackQuery.from;
    this.USER_CONFIG = workContext.USER_CONFIG;
    this.SHARE_CONTEXT = workContext.SHARE_CONTEXT;
  }
}
class InlineQueryContext {
  token;
  query_id;
  from_id;
  chat_type;
  query;
  constructor(token, inlineQuery) {
    this.token = token;
    this.query_id = inlineQuery.id;
    this.from_id = inlineQuery.from.id;
    this.chat_type = inlineQuery.chat_type;
    this.query = inlineQuery.query;
  }
}
class ChosenInlineWorkerContext {
  USER_CONFIG;
  botToken;
  MIDDEL_CONTEXT;
  SHARE_CONTEXT;
  constructor(chosenInline, token, USER_CONFIG) {
    this.USER_CONFIG = USER_CONFIG;
    this.botToken = token;
    this.MIDDEL_CONTEXT = {
      originalMessage: { type: "text" }
    };
    this.SHARE_CONTEXT = {
      botName: "AI",
      telegraphAccessTokenKey: `telegraph_access_token:${chosenInline.from.id}`
    };
  }
  static async from(token, chosenInline) {
    const USER_CONFIG = { ...ENV.USER_CONFIG };
    let userConfigKey = `user_config:${chosenInline.from.id}`;
    const botId = Number.parseInt(token.split(":")[0]);
    if (botId) {
      userConfigKey += `:${botId}`;
    }
    try {
      const userConfig = JSON.parse(await ENV.DATABASE.get(userConfigKey));
      ConfigMerger.merge(USER_CONFIG, ConfigMerger.trim(userConfig, ENV.LOCK_USER_CONFIG_KEYS) || {});
      USER_CONFIG.ENABLE_SHOWINFO = ENV.INLINE_QUERY_SHOW_INFO;
      ENV.TELEGRAM_MIN_STREAM_INTERVAL = ENV.INLINE_QUERY_SEND_INTERVAL;
    } catch (e) {
      console.warn(e);
    }
    return new ChosenInlineWorkerContext(chosenInline, token, USER_CONFIG);
  }
}
function checkMention(content, entities, botName, botId) {
  let isMention = false;
  for (const entity of entities) {
    const entityStr = content.slice(entity.offset, entity.offset + entity.length);
    switch (entity.type) {
      case "mention":
        if (entityStr === `@${botName}`) {
          isMention = true;
          content = content.slice(0, entity.offset) + content.slice(entity.offset + entity.length);
        }
        break;
      case "text_mention":
        if (`${entity.user?.id}` === `${botId}`) {
          isMention = true;
          content = content.slice(0, entity.offset) + content.slice(entity.offset + entity.length);
        }
        break;
      case "bot_command":
        if (entityStr.endsWith(`@${botName}`)) {
          isMention = true;
          const newEntityStr = entityStr.replace(`@${botName}`, "");
          content = content.slice(0, entity.offset) + newEntityStr + content.slice(entity.offset + entity.length);
        }
        break;
    }
  }
  return {
    isMention,
    content
  };
}
function SubstituteWords(message) {
  const oldTrigger = ENV.CHAT_MESSAGE_TRIGGER;
  if (Object.keys(oldTrigger).length > 0) {
    const triggered = Object.entries(oldTrigger).find(([key, _value]) => message.text?.startsWith(key));
    if (triggered) {
      message.text && (message.text = triggered[1] + message.text.substring(triggered[0].length));
      message.caption && (message.caption = triggered[1] + message.caption.substring(triggered[0].length));
      return true;
    } else {
      return false;
    }
  }
  const replacer = ENV.MESSAGE_REPLACER;
  let replacedString = "";
  const textBefore = message.text || message.caption || "";
  let text = textBefore.replace(new RegExp(`^${ENV.CHAT_TRIGGER_PERFIX}`), "").trim();
  const isTrigger = text !== textBefore;
  do {
    const triggerKey = Object.keys(replacer).find(
      (key) => text.startsWith(`${key} `)
    );
    if (triggerKey) {
      replacedString += `${replacer[triggerKey]} `;
      text = text.substring(triggerKey.length).trim();
    } else {
      break;
    }
  } while (true);
  log.info(`replacedString: ${replacedString}, text: ${text}`);
  message.text ? message.text = replacedString + text : message.caption = replacedString + text;
  return isTrigger;
}
class GroupMention {
  handle = async (message, context) => {
    const substituteMention = SubstituteWords(message);
    if (!isTelegramChatTypeGroup(message.chat.type)) {
      context.MIDDEL_CONTEXT.originalMessage.text = message.text || message.caption || "";
      return null;
    }
    const replyMe = `${message.reply_to_message?.from?.id}` === `${context.SHARE_CONTEXT.botId}`;
    if (replyMe) {
      context.MIDDEL_CONTEXT.originalMessage.text = message.text || message.caption || "";
      return null;
    }
    let botName = context.SHARE_CONTEXT.botName;
    if (!botName) {
      const res = await createTelegramBotAPI(context.SHARE_CONTEXT.botToken).getMeWithReturns();
      botName = res.result.username || null;
      context.SHARE_CONTEXT.botName = botName;
    }
    if (!botName) {
      throw new Error("Not set bot name");
    }
    let isMention = false;
    if (message.text && message.entities) {
      const res = checkMention(message.text, message.entities, botName, context.SHARE_CONTEXT.botId);
      isMention = res.isMention;
      message.text = res.content.trim();
    }
    if (message.caption && message.caption_entities) {
      const res = checkMention(message.caption, message.caption_entities, botName, context.SHARE_CONTEXT.botId);
      isMention = res.isMention || isMention;
      message.caption = res.content.trim();
    }
    if ((substituteMention || context.SHARE_CONTEXT.isForwarding) && !isMention) {
      isMention = true;
    }
    if (!isMention) {
      throw new Error("Not mention");
    }
    if (ENV.EXTRA_MESSAGE_CONTEXT && !replyMe && message.reply_to_message?.text) {
      message.text = `${message.text || message.caption || ""}
> ${message.reply_to_message.text}`;
    }
    context.MIDDEL_CONTEXT.originalMessage.text = message.text;
    return null;
  };
}
class AnswerChatInlineQuery {
  type = ":c";
  handler = async (chosenInline, context) => {
    const sender = ChosenInlineSender.from(context.botToken, chosenInline);
    const question = await this.handlerQuestion(chosenInline, context, sender);
    if (!question) {
      return new Response("ok");
    }
    const agent = new OpenAI();
    const isStream = chosenInline.result_id === ":c stream";
    const OnStream = OnStreamHander(sender, context, question);
    const messages = [{ role: "user", content: question }];
    if (context.USER_CONFIG.SYSTEM_INIT_MESSAGE) {
      messages.unshift({ role: "system", content: context.USER_CONFIG.SYSTEM_INIT_MESSAGE });
    }
    try {
      const resp = await agent.request({
        messages
      }, context.USER_CONFIG, isStream ? OnStream : null);
      const { content: answer } = resp;
      if (answer === "") {
        return OnStream.end?.("No response");
      }
      return OnStream.end?.(answer);
    } catch (error) {
      return OnStream.end?.(`Error: ${error.message.substring(0, 4e3)}`);
    }
  };
  handlerQuestion = async (chosenInline, context, sender) => {
    const question = chosenInline.query.substring(0, chosenInline.query.length - 1).trim();
    const message = { text: question };
    SubstituteWords(message);
    if (message.text?.startsWith("/set ")) {
      const resp = await new SetCommandHandler().handle(message, message.text.substring(5).trim(), context, sender);
      if (resp instanceof Response) {
        return "";
      }
    }
    return message.text || "";
  };
}
class SaveLastMessage {
  handle = async (message, context) => {
    if (!ENV.DEBUG_MODE) {
      return null;
    }
    const lastMessageKey = `last_message:${context.SHARE_CONTEXT.chatHistoryKey}`;
    await ENV.DATABASE.put(lastMessageKey, JSON.stringify(message), { expirationTtl: 3600 });
    return null;
  };
}
class OldMessageFilter {
  handle = async (message, context) => {
    if (!ENV.SAFE_MODE || context.SHARE_CONTEXT.isForwarding) {
      return null;
    }
    let idList = [];
    try {
      idList = JSON.parse(await ENV.DATABASE.get(context.SHARE_CONTEXT.lastMessageKey).catch(() => "[]")) || [];
    } catch (e) {
      console.error(e);
    }
    if (idList.includes(message.message_id)) {
      throw new Error("Ignore old message");
    } else {
      idList.push(message.message_id);
      if (idList.length > 100) {
        idList.shift();
      }
      await ENV.DATABASE.put(context.SHARE_CONTEXT.lastMessageKey, JSON.stringify(idList));
    }
    return null;
  };
}
class EnvChecker {
  handle = async (message, context) => {
    if (!ENV.DATABASE) {
      return MessageSender.from(context.SHARE_CONTEXT.botToken, message).sendPlainText("DATABASE Not Set");
    }
    return null;
  };
}
class WhiteListFilter {
  handle = async (message, context) => {
    if (ENV.I_AM_A_GENEROUS_PERSON) {
      return null;
    }
    const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
    const text = `You are not in the white list, please contact the administrator to add you to the white list. Your chat_id: ${message.chat.id}`;
    if (message.chat.type === "private") {
      if (!ENV.CHAT_WHITE_LIST.includes(`${message.chat.id}`)) {
        return sender.sendPlainText(text);
      }
      return null;
    }
    if (isTelegramChatTypeGroup(message.chat.type)) {
      if (!ENV.GROUP_CHAT_BOT_ENABLE) {
        throw new Error("Not support");
      }
      if (!ENV.CHAT_GROUP_WHITE_LIST.includes(`${message.chat.id}`)) {
        return sender.sendPlainText(text);
      }
      return null;
    }
    return sender.sendPlainText(
      `Not support chat type: ${message.chat.type}`
    );
  };
}
class MessageFilter {
  handle = async (message, context) => {
    if (ENV.IGNORE_TEXT_PERFIX && (message.text || message.caption || "").startsWith(ENV.IGNORE_TEXT_PERFIX)) {
      log.info(`[IGNORE MESSAGE] Ignore message`);
      return new Response("success", { status: 200 });
    }
    const extractMessageData = extractMessage(message, context.SHARE_CONTEXT.botId);
    if (extractMessageData === null) {
      throw new Error("Not supported message type");
    }
    context.MIDDEL_CONTEXT.originalMessage = extractMessageData;
    return null;
  };
}
class CommandHandler {
  handle = async (message, context) => {
    if (message.text || message.caption) {
      return await handleCommandMessage(message, context);
    }
    return null;
  };
}
class InitUserConfig {
  handle = async (message, context) => {
    Object.assign(context, { USER_CONFIG: (await WorkerContext.from(context.SHARE_CONTEXT, context.MIDDEL_CONTEXT)).USER_CONFIG });
    return null;
  };
}
class StoreHistory {
  handle = async (message, context) => {
    const historyDisable = ENV.AUTO_TRIM_HISTORY && ENV.MAX_HISTORY_LENGTH <= 0;
    if (!historyDisable) {
      const historyKey = context.SHARE_CONTEXT.chatHistoryKey;
      const history = context.MIDDEL_CONTEXT.history;
      const userMessage = history.findLast((h) => h.role === "user");
      if (ENV.HISTORY_IMAGE_PLACEHOLDER && Array.isArray(userMessage?.content) && userMessage.content.length > 0) {
        userMessage.content = userMessage.content.map((c) => c.type === "text" ? c.text : `[${c.type}]`).join("\n");
      }
      await ENV.DATABASE.put(historyKey, JSON.stringify(history)).catch(console.error);
    }
    return null;
  };
}
class TagNeedDelete {
  handle = async (message, context) => {
    if ((tagMessageIds.get(message) ?? []).length === 0) {
      log.info(`[TAG MESSAGE] No message id to tag`);
      return new Response("success", { status: 200 });
    }
    const botName = context.SHARE_CONTEXT?.botName;
    if (!botName) {
      throw new Error("未检索到Bot Name, 无法设定定时删除.");
    }
    const chatId = message.chat.id;
    const scheduleDeteleKey = context.SHARE_CONTEXT.scheduleDeteleKey;
    const scheduledData = JSON.parse(await ENV.DATABASE.get(scheduleDeteleKey) || "{}");
    if (!scheduledData[botName]) {
      scheduledData[botName] = {};
    }
    if (!scheduledData[botName][chatId]) {
      scheduledData[botName][chatId] = [];
    }
    const offsetInMillisenconds = ENV.EXPIRED_TIME * 60 * 1e3;
    scheduledData[botName][chatId].push({
      id: tagMessageIds.get(message) || [],
      ttl: Date.now() + offsetInMillisenconds
    });
    await ENV.DATABASE.put(scheduleDeteleKey, JSON.stringify(scheduledData));
    log.info(`[TAG MESSAGE] Record chat ${chatId}, message ids: ${tagMessageIds.get(message) || []}`);
    return new Response("success", { status: 200 });
  };
}
class StoreWhiteListMessage {
  handle = async (message, context) => {
    const storeMessageKey = context.SHARE_CONTEXT?.storeMessageKey;
    if (storeMessageKey) {
      const data = JSON.parse(await ENV.DATABASE.get(storeMessageKey) || "[]");
      data.push(context.MIDDEL_CONTEXT.originalMessage);
      if (data.length > ENV.STORE_MESSAGE_NUM) {
        data.splice(0, data.length - ENV.STORE_MESSAGE_NUM);
      }
      await ENV.DATABASE.put(storeMessageKey, JSON.stringify(data));
    }
    return new Response("ok");
  };
}
class HandlerCallbackQuery {
  handle = async (message, context) => {
    if (!context.data) {
      return new Response("success", { status: 200 });
    }
    const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
    const checkRoleResult = await this.checkWhiteList(message, context, api);
    if (checkRoleResult instanceof Response) {
      return checkRoleResult;
    }
    if (context.data === "CLOSE") {
      await this.closeInlineKeyboard(api, message);
      return null;
    }
    const queryHandler = new InlineCommandHandler();
    const defaultInlineKeys = queryHandler.defaultInlineKeys(context.USER_CONFIG);
    const [inlineKey, option] = context.data.split(".");
    await this.checkInlineKey(api, context, inlineKey, option, defaultInlineKeys);
    let inlineKeyboard = [];
    if (inlineKey === "BACK") {
      inlineKeyboard = queryHandler.inlineKeyboard(context.USER_CONFIG, defaultInlineKeys);
    } else {
      const configKey = defaultInlineKeys[inlineKey].config_key;
      const optionValue = defaultInlineKeys[inlineKey].available_values?.[Number.parseInt(option)];
      if (optionValue) {
        await this.updateConfig(context, api, configKey, optionValue);
      }
      let configValue = context.USER_CONFIG[configKey];
      if (typeof configValue === "boolean") {
        configValue = configValue ? "true" : "false";
      }
      inlineKeyboard = this.updateInlineList(defaultInlineKeys[inlineKey], configValue);
    }
    const settingMessage = queryHandler.settingsMessage(context.USER_CONFIG, defaultInlineKeys);
    await this.sendCallBackMessage(api, message, settingMessage, inlineKeyboard);
    return null;
  };
  async checkInlineKey(api, context, key, index2, inlineKeys) {
    if (key === "BACK") {
      return;
    }
    if (index2 && inlineKeys[key]?.available_values?.[index2] || !index2 && inlineKeys[key]) {
      return;
    }
    this.sendAlert(api, context.query_id, "Not support inline key", false);
    throw new Error("Not support inline key");
  }
  async sendAlert(api, query_id, text, show_alert, cache_time) {
    return api.answerCallbackQuery({
      callback_query_id: query_id,
      text,
      show_alert,
      cache_time
    });
  }
  async checkWhiteList(message, context, api) {
    const roleList = COMMAND_AUTH_CHECKER.shareModeGroup(message.chat.type);
    if (roleList) {
      const chatRole = await loadChatRoleWithContext(message, context, true);
      if (chatRole === null) {
        return this.sendAlert(api, context.query_id, "⚠️ Get chat role failed", false);
      }
      if (!roleList.includes(chatRole)) {
        return this.sendAlert(api, context.query_id, `⚠️ You don't have permission to operate`, true);
      }
    }
    return null;
  }
  async updateConfig(context, api, configKey, newValue) {
    const oldValue = context.USER_CONFIG[configKey];
    const type2 = Array.isArray(oldValue) ? "array" : typeof oldValue;
    switch (type2) {
      case "string":
      case "boolean":
        if (oldValue === newValue) {
          return;
        } else {
          context.USER_CONFIG[configKey] = newValue;
        }
        break;
      case "array":
        if (oldValue.includes(newValue)) {
          oldValue.splice(oldValue.indexOf(newValue), 1);
        } else {
          oldValue.push(newValue);
        }
        break;
      default:
        throw new TypeError("Not support config type");
    }
    log.info(`[CALLBACK QUERY] Update config: ${configKey} = ${context.USER_CONFIG[configKey]}`);
    await ENV.DATABASE.put(context.SHARE_CONTEXT.configStoreKey, JSON.stringify(context.USER_CONFIG)).catch(console.error);
    this.sendAlert(api, context.query_id, "Data update successful", false);
  }
  async closeInlineKeyboard(api, message) {
    const resp = await api.deleteMessage({
      chat_id: message.chat.id,
      message_id: message.message_id
    }).then((r) => r.json());
    return resp;
  }
  async sendCallBackMessage(api, message, text, inline_keyboard) {
    const resp = await api.editMessageText({
      chat_id: message.chat.id,
      message_id: message.message_id,
      ...message.chat.type === "private" ? {} : { reply_to_message_id: message.message_id },
      text: escape(text.split("\n")),
      parse_mode: "MarkdownV2",
      reply_markup: { inline_keyboard }
    }).then((r) => r.json());
    return resp;
  }
  updateInlineList(inline_item, configValue) {
    const inline_list = inline_item.available_values.map((item, index2) => {
      let selected = "";
      if (configValue && item === configValue || Array.isArray(configValue) && configValue?.includes(item)) {
        selected = "✅";
      }
      return {
        text: `${selected}${item}`,
        callback_data: `${inline_item.data}.${index2}`
      };
    });
    inline_list.push({
      text: "↩️",
      callback_data: "BACK"
    }, {
      text: "❌",
      callback_data: "CLOSE"
    });
    return chunckArray(inline_list, 2);
  }
}
class HandlerInlineQuery {
  handle = async (chosenInline, context) => {
    if (!context.query?.endsWith("$")) {
      log.info(`[INLINE QUERY] Not end with $: ${context.query}`);
      return new Response("success", { status: 200 });
    }
    const api = createTelegramBotAPI(context.token);
    const resp = await api.answerInlineQuery({
      inline_query_id: context.query_id,
      results: [{
        type: "article",
        id: ":c stream",
        title: "Stream Mode",
        input_message_content: {
          message_text: `Please wait a moment`
        },
        reply_markup: {
          inline_keyboard: [
            [{
              text: "Thinking...",
              callback_data: ":c stream"
            }]
          ]
        }
      }, {
        type: "article",
        id: ":c full",
        title: "Full Mode",
        input_message_content: {
          message_text: `Please wait a moment`
        },
        reply_markup: {
          inline_keyboard: [
            [{
              text: "Thinking...",
              callback_data: ":c full"
            }]
          ]
        }
      }]
    }).then((r) => r.json());
    log.info(`[INLINE QUERY] Answer inline query: ${JSON.stringify(resp)}`);
    return new Response("success", { status: 200 });
  };
}
class CheckInlineQueryWhiteList {
  handle = async (inlineQuery, context) => {
    if (ENV.CHAT_WHITE_LIST.includes(`${context.from_id}`)) {
      return null;
    }
    log.error(`User ${context.from_id} not in the white list`);
    return new Response(`User ${context.from_id} not in the white list`, { status: 403 });
  };
}
class AnswerInlineQuery {
  handle = async (chosenInline, context) => {
    const answer = new AnswerChatInlineQuery();
    return answer.handler(chosenInline, context);
  };
}
class CheckForwarding {
  handle = async (message, context) => {
    if (ENV.QSTASH_PUBLISH_URL && ENV.QSTASH_TOKEN && ENV.QSTASH_TRIGGER_PREFIX && !context.SHARE_CONTEXT.isForwarding) {
      let text = (message.text || message.caption || "").trim();
      if (text.startsWith(ENV.QSTASH_TRIGGER_PREFIX)) {
        text = text.slice(ENV.QSTASH_TRIGGER_PREFIX.length);
        if (message.text) {
          message.text = text;
        } else {
          message.caption = text;
        }
        const QSTASH_REQUEST_URL = `${ENV.QSTASH_URL}/v2/publish/${ENV.QSTASH_PUBLISH_URL}/telegram/${context.SHARE_CONTEXT.botToken}/webhook`;
        log.info(`[FORWARD] Forward message to Qstash`);
        const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
        await sender.sendRichText("`Forwarding message to Qstash`", "MarkdownV2", "tip");
        return await fetch(QSTASH_REQUEST_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ENV.QSTASH_TOKEN}`,
            "Upstash-Timeout": `${ENV.QSTASH_TIMEOUT}`,
            "Upstash-Retries": "0"
          },
          body: JSON.stringify({
            message
          })
        });
      }
    }
    return null;
  };
}
function loadMessage(body, isForwarding) {
  switch (true) {
    case !!body.message:
      return (token) => handleMessage(token, body.message, isForwarding);
    case !!body.inline_query:
      return (token) => handleInlineQuery(token, body.inline_query);
    case !!body.callback_query:
      return (token) => handleCallbackQuery(token, body.callback_query);
    case !!body.chosen_inline_result:
      return (token) => handleChosenInline(token, body.chosen_inline_result);
    case !!body.edited_message:
      throw new Error("Ignore edited message");
    default:
      log.info(`Not support message type: ${JSON.stringify(body, null, 2)}`);
      throw new Error("Not support message type");
  }
}
const exitHanders = [new TagNeedDelete(), new StoreWhiteListMessage()];
async function handleUpdate(token, update, headers) {
  log.debug(`handleUpdate`, update.message?.chat);
  const isForwarding = headers?.get("User-Agent") === "Upstash-QStash";
  const messageHandler = loadMessage(update, isForwarding);
  return messageHandler(token);
}
async function handleMessage(token, message, isForwarding) {
  const SHARE_HANDLER = [
    new EnvChecker(),
    new WhiteListFilter(),
    new MessageFilter(),
    new GroupMention(),
    new OldMessageFilter(),
    new SaveLastMessage(),
    new InitUserConfig(),
    new CommandHandler(),
    new CheckForwarding(),
    new ChatHandler(),
    new StoreHistory()
  ];
  const context = new WorkerContextBase(token, message);
  context.SHARE_CONTEXT.isForwarding = isForwarding;
  try {
    for (const handler2 of SHARE_HANDLER) {
      const result2 = await handler2.handle(message, context);
      if (result2) {
        break;
      }
    }
    for (const handler2 of exitHanders) {
      const result2 = await handler2.handle(message, context);
      if (result2 && result2 instanceof Response) {
        return result2;
      }
    }
  } catch (e) {
    return catchError(e);
  }
  return null;
}
async function handleCallbackQuery(token, callbackQuery) {
  try {
    log.debug(`handleCallbackQuery`, callbackQuery);
    if (!callbackQuery?.message || !callbackQuery?.data) {
      throw new Error("Not support callback query type");
    }
    const workContext = new WorkerContextBase(token, callbackQuery.message);
    const handlers = [
      new EnvChecker(),
      new WhiteListFilter(),
      new InitUserConfig()
    ];
    for (const handler2 of handlers) {
      const result22 = await handler2.handle(callbackQuery.message, workContext);
      if (result22 instanceof Response) {
        return result22;
      }
    }
    const callbackQueryContext = new CallbackQueryContext(callbackQuery, workContext);
    const result2 = await new HandlerCallbackQuery().handle(callbackQuery.message, callbackQueryContext);
    if (result2 instanceof Response) {
      return result2;
    }
  } catch (e) {
    return catchError(e);
  }
  return null;
}
async function handleInlineQuery(token, inlineQuery) {
  log.info(`handleInlineQuery`, inlineQuery);
  try {
    const context = new InlineQueryContext(token, inlineQuery);
    const handlers = [
      new CheckInlineQueryWhiteList(),
      new HandlerInlineQuery()
    ];
    for (const handler2 of handlers) {
      const result2 = await handler2.handle(inlineQuery, context);
      if (result2 instanceof Response) {
        return result2;
      }
    }
  } catch (error) {
    return catchError(error);
  }
  return null;
}
async function handleChosenInline(token, chosenInlineQuery) {
  log.info(`handleChosenInlineQuery`, chosenInlineQuery);
  try {
    const context = await ChosenInlineWorkerContext.from(token, chosenInlineQuery);
    const handlers = [
      new AnswerInlineQuery()
    ];
    for (const handler2 of handlers) {
      const result2 = await handler2.handle(chosenInlineQuery, context);
      if (result2 instanceof Response) {
        return result2;
      }
    }
  } catch (error) {
    return catchError(error);
  }
  return null;
}
function catchError(e) {
  console.error(e.message);
  return new Response(JSON.stringify({
    message: e.message,
    stack: e.stack
  }), { status: 500 });
}
function renderHTML(body) {
  return `
<html lang="en">  
  <head>
    <title>ChatGPT-Telegram-Workers</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="ChatGPT-Telegram-Workers">
    <meta name="author" content="TBXark">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: left;
        background-color: #fff;
      }
      h1 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }
      p {
        margin-top: 0;
        margin-bottom: 1rem;
      }
      a {
        color: #007bff;
        text-decoration: none;
        background-color: transparent;
      }
      a:hover {
        color: #0056b3;
        text-decoration: underline;
      }
      strong {
        font-weight: bolder;
      }
    </style>
  </head>
  <body>
    ${body}
  </body>
</html>
  `;
}
function errorToString(e) {
  return JSON.stringify({
    message: e.message,
    stack: e.stack
  });
}
function makeResponse200(resp) {
  if (resp === null) {
    return new Response("NOT HANDLED", { status: 200 });
  }
  if (resp.status === 200) {
    return resp;
  } else {
    return new Response(resp.body, {
      status: 200,
      headers: {
        "Original-Status": `${resp.status}`,
        ...resp.headers
      }
    });
  }
}
class Router {
  routes;
  base;
  errorHandler = async (req, error) => new Response(errorToString(error), { status: 500 });
  constructor({ base = "", routes = [], ...other } = {}) {
    this.routes = routes;
    this.base = base;
    Object.assign(this, other);
    this.fetch = this.fetch.bind(this);
    this.route = this.route.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.delete = this.delete.bind(this);
    this.patch = this.patch.bind(this);
    this.head = this.head.bind(this);
    this.options = this.options.bind(this);
    this.all = this.all.bind(this);
  }
  parseQueryParams(searchParams) {
    const query = {};
    searchParams.forEach((v, k) => {
      query[k] = k in query ? [...Array.isArray(query[k]) ? query[k] : [query[k]], v] : v;
    });
    return query;
  }
  normalizePath(path) {
    return path.replace(/\/+(\/|$)/g, "$1");
  }
  createRouteRegex(path) {
    return new RegExp(`^${path.replace(/(\/?\.?):(\w+)\+/g, "($1(?<$2>*))").replace(/(\/?\.?):(\w+)/g, "($1(?<$2>[^$1/]+?))").replace(/\./g, "\\.").replace(/(\/?)\*/g, "($1.*)?")}/*$`);
  }
  async fetch(request, ...args2) {
    try {
      const url = new URL(request.url);
      const reqMethod = request.method.toUpperCase();
      request.query = this.parseQueryParams(url.searchParams);
      for (const [method, regex, handlers, path] of this.routes) {
        let match = null;
        if ((method === reqMethod || method === "ALL") && (match = url.pathname.match(regex))) {
          request.params = match?.groups || {};
          request.route = path;
          for (const handler2 of handlers) {
            const response = await handler2(request, ...args2);
            if (response != null) {
              return response;
            }
          }
        }
      }
      return new Response("Not Found", { status: 404 });
    } catch (e) {
      return this.errorHandler(request, e);
    }
  }
  route(method, path, ...handlers) {
    const route = this.normalizePath(this.base + path);
    const regex = this.createRouteRegex(route);
    this.routes.push([method.toUpperCase(), regex, handlers, route]);
    return this;
  }
  get(path, ...handlers) {
    return this.route("GET", path, ...handlers);
  }
  post(path, ...handlers) {
    return this.route("POST", path, ...handlers);
  }
  put(path, ...handlers) {
    return this.route("PUT", path, ...handlers);
  }
  delete(path, ...handlers) {
    return this.route("DELETE", path, ...handlers);
  }
  patch(path, ...handlers) {
    return this.route("PATCH", path, ...handlers);
  }
  head(path, ...handlers) {
    return this.route("HEAD", path, ...handlers);
  }
  options(path, ...handlers) {
    return this.route("OPTIONS", path, ...handlers);
  }
  all(path, ...handlers) {
    return this.route("ALL", path, ...handlers);
  }
}
const helpLink = "https://github.com/TBXark/ChatGPT-Telegram-Workers/blob/master/doc/en/DEPLOY.md";
const issueLink = "https://github.com/TBXark/ChatGPT-Telegram-Workers/issues";
const initLink = "./init";
const footer = `
<br/>
<p>For more information, please visit <a href="${helpLink}">${helpLink}</a></p>
<p>If you have any questions, please visit <a href="${issueLink}">${issueLink}</a></p>
`;
async function bindWebHookAction(request) {
  const result2 = {};
  const domain = new URL(request.url).host;
  const hookMode = ENV.API_GUARD ? "safehook" : "webhook";
  const scope = commandsBindScope();
  for (const token of ENV.TELEGRAM_AVAILABLE_TOKENS) {
    const api = createTelegramBotAPI(token);
    const url = `https://${domain}/telegram/${token.trim()}/${hookMode}`;
    console.log("webhook url: ", url);
    const id = token.split(":")[0];
    result2[id] = {};
    result2[id].webhook = await api.setWebhook({ url }).then((res) => res.json()).catch((e) => errorToString(e));
    for (const [s, data] of Object.entries(scope)) {
      result2[id][s] = await api.setMyCommands(data).then((res) => res.json()).catch((e) => errorToString(e));
    }
  }
  let html = `<h1>ChatGPT-Telegram-Workers</h1>`;
  html += `<h2>${domain}</h2>`;
  if (ENV.TELEGRAM_AVAILABLE_TOKENS.length === 0) {
    html += `<p style="color: red">Please set the <strong> TELEGRAM_AVAILABLE_TOKENS </strong> environment variable in Cloudflare Workers.</p> `;
  } else {
    for (const [key, res] of Object.entries(result2)) {
      html += `<h3>Bot: ${key}</h3>`;
      for (const [s, data] of Object.entries(res)) {
        html += `<p style="color: ${data.ok ? "green" : "red"}">${s}: ${JSON.stringify(data)}</p>`;
      }
    }
  }
  html += footer;
  const HTML = renderHTML(html);
  return new Response(HTML, { status: 200, headers: { "Content-Type": "text/html" } });
}
async function telegramWebhook(request) {
  try {
    const { token } = request.params;
    const body = await request.json();
    const headers = request.headers;
    return makeResponse200(await handleUpdate(token, body, headers));
  } catch (e) {
    console.error(e);
    return new Response(errorToString(e), { status: 200 });
  }
}
async function telegramSafeHook(request) {
  try {
    if (ENV.API_GUARD === void 0 || ENV.API_GUARD === null) {
      return telegramWebhook(request);
    }
    console.log("API_GUARD is enabled");
    const url = new URL(request.url);
    url.pathname = url.pathname.replace("/safehook", "/webhook");
    const newRequest = new Request(url, request);
    return makeResponse200(await ENV.API_GUARD.fetch(newRequest));
  } catch (e) {
    console.error(e);
    return new Response(errorToString(e), { status: 200 });
  }
}
async function defaultIndexAction() {
  const HTML = renderHTML(`
    <h1>ChatGPT-Telegram-Workers</h1>
    <br/>
    <p>Deployed Successfully!</p>
    <p> Version (ts:${ENV.BUILD_TIMESTAMP},sha:${ENV.BUILD_VERSION})</p>
    <br/>
    <p>You must <strong><a href="${initLink}"> >>>>> click here <<<<< </a></strong> to bind the webhook.</p>
    <br/>
    <p>After binding the webhook, you can use the following commands to control the bot:</p>
    ${commandsDocument().map((item) => `<p><strong>${item.command}</strong> - ${item.description}</p>`).join("")}
    <br/>
    <p>You can get bot information by visiting the following URL:</p>
    <p><strong>/telegram/:token/bot</strong> - Get bot information</p>
    ${footer}
  `);
  return new Response(HTML, { status: 200, headers: { "Content-Type": "text/html" } });
}
function createRouter() {
  const router = new Router();
  router.get("/", defaultIndexAction);
  router.get("/init", bindWebHookAction);
  router.post("/telegram/:token/webhook", telegramWebhook);
  router.post("/telegram/:token/safehook", telegramSafeHook);
  router.all("*", () => new Response("Not Found", { status: 404 }));
  return router;
}
class UpstashRedis {
  baseUrl;
  token;
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }
  async fetchFromRedis(endpoint, method = "GET", body = null) {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`
    };
    const options2 = {
      method,
      headers,
      ...body ? { body } : {}
    };
    const response = await fetch(`${this.baseUrl}/${endpoint}`, options2);
    if (!response.ok) {
      throw new Error(`Failed to fetch from Redis: ${response.statusText}`);
    }
    return response.json();
  }
  async get(key, info) {
    try {
      const raw = await this.fetchFromRedis(`get/${key}`);
      if (!raw) {
        return null;
      }
      switch (info?.type || "string") {
        case "string":
          return raw.result;
        case "json":
          return JSON.parse(raw.result);
        case "arrayBuffer":
          return new Uint8Array(raw).buffer;
        default:
          return raw.result;
      }
    } catch (error) {
      console.error(`Error getting key ${key}:`, error);
      return null;
    }
  }
  async put(key, value, info) {
    let endpoint = `set/${key}`;
    let expiration = -1;
    if (info?.expiration) {
      expiration = Math.round(info.expirationTtl);
    } else if (info?.expirationTtl) {
      expiration = Math.round(Date.now() / 1e3 + info.expirationTtl);
    }
    if (expiration > 0) {
      endpoint += `?exat=${expiration}`;
    }
    await this.fetchFromRedis(endpoint, "POST", value);
  }
  async delete(key) {
    await this.fetchFromRedis(`del/${key}`, "POST");
  }
}
const index = {
  async fetch(request, env) {
    try {
      if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
        env.DATABASE = new UpstashRedis(env.UPSTASH_REDIS_REST_URL, env.UPSTASH_REDIS_REST_TOKEN);
      }
      ENV.merge(env);
      return createRouter().fetch(request);
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify({
        message: e.message,
        stack: e.stack
      }), { status: 500 });
    }
  },
  async scheduled(event, env, ctx) {
    try {
      if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
        env.DATABASE = new UpstashRedis(env.UPSTASH_REDIS_REST_URL, env.UPSTASH_REDIS_REST_TOKEN);
      }
      const promises = [];
      for (const task of Object.values(tasks)) {
        promises.push(task(env));
      }
      await Promise.all(promises);
      console.log("All tasks done.");
    } catch (e) {
      console.error("Error in scheduled tasks:", e);
    }
  }
};
const __viteBrowserExternal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
export {
  index as default
};
