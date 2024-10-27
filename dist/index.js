var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decoratorStart = (base) => [, , , __create(base?.[__knownSymbol("metadata")] ?? null)];
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc(k < 4 ? target : { get [name]() {
    return __privateGet(this, extra);
  }, set [name](x) {
    return __privateSet(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _request_dec, _init, _request_dec2, _a, _init2, _request_dec3, _b, _init3, _request_dec4, _c, _init4, _request_dec5, _d, _init5, _request_dec6, _init6, _request_dec7, _init7, _request_dec8, _init8, _request_dec9, _e, _init9, _request_dec10, _f, _init10, _request_dec11, _g, _init11, _request_dec12, _h, _init12, _exec_dec, _init13;
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
const jina_reader = {
  schema: {
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
      required: ["url"],
      additionalProperties: false
    }
  },
  ENV_KEY: "JINA_API_KEY",
  func: async ({ url, JINA_API_KEY: keys }, signal) => {
    if (!url || !keys) {
      throw new Error("params is null");
    }
    if (!Array.isArray(keys) || keys?.length === 0) {
      throw new Error("JINA_API_KEY is null or all keys is expired.");
    }
    const key_length = keys.length;
    const key = keys[Math.floor(Math.random() * key_length)];
    console.log("jina-reader:", url);
    const result = await fetch(`https://r.jina.ai/${url}`, {
      headers: {
        "X-Return-Format": "text",
        "Authorization": `Bearer ${key}`
      },
      ...signal && { signal } || {}
    });
    if (!result.ok) {
      if (result.status.toString().startsWith("4") && key_length > 1) {
        console.error(`jina key: ${`${key.slice(0, 10)} ... ${key.slice(-5)}`} is expired`);
        keys.splice(keys.indexOf(key), 1);
        return jina_reader.func({ url, keys }, signal);
      }
      keys.pop();
      throw new Error(`All keys is unavailable. ${(await result.json()).message}`);
    }
    return await result.text();
  },
  type: "web_crawler",
  prompt: '作为一个高效的内容分析和总结助手，你的任务是对用户提供的网页或PDF内容进行全面而简洁的总结。请遵循以下指南：\n    1. 仔细阅读用户提供的全部内容，确保理解主要观点和关键信息。\n    2. 识别并提炼出内容的核心主题和主要论点。\n    3. 总结时应包括以下要素：\n      • 内容的主要目的或主题\n      • 关键观点或论据\n      • 重要的数据或统计信息（如果有）\n      • 作者的结论或建议（如果适用）\n    4. 保持客观性，准确反映原文的观点，不添加个人解释或评论。\n    5. 使用清晰、简洁的语言，避免使用过于专业或晦涩的术语。\n    6. 总结的长度应该是原文的10-15%，除非用户特别指定其他长度要求。\n    7. 如果内容包含多个部分或章节，可以使用简短的小标题来组织你的总结。\n    8. 如果原文包含图表或图像的重要信息，请在总结中提及这一点。\n    9. 如果内容涉及时间敏感的信息，请在总结中注明内容的发布日期或版本。\n    10. 如果原文存在明显的偏见或争议性观点，请在总结中客观地指出这一点。\n    11. 总结完成后，提供1-3个关键词或短语，概括内容的核心主题。\n    12. 如果用户要求，可以在总结的最后添加一个简短的"进一步阅读建议"部分, 以及必要的引用来源。\n    请记住，你的目标是提供一个全面、准确、易于理解的总结，帮助用户快速把握内容的精髓。如果内容特别长或复杂，你可以询问用户是否需要更详细的总结或特定部分的深入分析。请在最后面标注引用的链接.',
  extra_params: { temperature: 0.7, top_p: 0.4 }
};
const SEARCH_REGEX = /DDG\.pageLayout\.load\('d',(\[.+\])\);DDG\.duckbar\.load\('images'/;
const IMAGES_REGEX = /;DDG\.duckbar\.load\('images', (\{"ads":.+"vqd":\{".+":"\d-\d+-\d+"\}\})\);DDG\.duckbar\.load\('news/;
const NEWS_REGEX = /;DDG\.duckbar\.load\('news', (\{"ads":.+"vqd":\{".+":"\d-\d+-\d+"\}\})\);DDG\.duckbar\.load\('videos/;
const VIDEOS_REGEX = /;DDG\.duckbar\.load\('videos', (\{"ads":.+"vqd":\{".+":"\d-\d+-\d+"\}\})\);DDG\.duckbar\.loadModule\('related_searches/;
const RELATED_SEARCHES_REGEX = /DDG\.duckbar\.loadModule\('related_searches', (\{"ads":.+"vqd":\{".+":"\d-\d+-\d+"\}\})\);DDG\.duckbar\.load\('products/;
const VQD_REGEX = /vqd=['"](\d+-\d+(?:-\d+)?)['"]/;
let SearchTimeType = {};
(function(SearchTimeType2) {
  SearchTimeType2.ALL = "a";
  SearchTimeType2.DAY = "d";
  SearchTimeType2.WEEK = "w";
  SearchTimeType2.MONTH = "m";
  SearchTimeType2.YEAR = "y";
})(SearchTimeType || (SearchTimeType = {}));
let SafeSearchType = {};
(function(SafeSearchType2) {
  SafeSearchType2[SafeSearchType2.STRICT = 0] = "STRICT";
  SafeSearchType2[SafeSearchType2.MODERATE = -1] = "MODERATE";
  SafeSearchType2[SafeSearchType2.OFF = -2] = "OFF";
})(SafeSearchType || (SafeSearchType = {}));
const defaultOptions = {
  safeSearch: SafeSearchType.OFF,
  time: SearchTimeType.ALL,
  locale: "en-us",
  region: "wt-wt",
  offset: 0,
  marketRegion: "us"
};
function decode(text) {
  const entities = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&apos;": "'"
  };
  return text.replace(/&[a-z0-9#]+;/gi, (match) => entities[match] || match);
}
async function search(query, options) {
  if (!query)
    throw new Error("Query cannot be empty!");
  if (!options)
    options = defaultOptions;
  else
    options = sanityCheck(options);
  let vqd = options.vqd;
  if (!vqd)
    vqd = await getVQD(query, "web");
  const queryObject = {
    q: query,
    ...options.safeSearch !== SafeSearchType.STRICT ? { t: "D" } : {},
    l: options.locale,
    ...options.safeSearch === SafeSearchType.STRICT ? { p: "1" } : {},
    kl: options.region || "wt-wt",
    s: String(options.offset),
    dl: "en",
    ct: "US",
    ss_mkt: options.marketRegion,
    df: options.time,
    vqd,
    ...options.safeSearch !== SafeSearchType.STRICT ? { ex: String(options.safeSearch) } : {},
    sp: "1",
    bpa: "1",
    biaexp: "b",
    msvrtexp: "b",
    ...options.safeSearch === SafeSearchType.STRICT ? {
      videxp: "a",
      nadse: "b",
      eclsexp: "a",
      stiaexp: "a",
      tjsexp: "b",
      related: "b",
      msnexp: "a"
    } : {
      nadse: "b",
      eclsexp: "b",
      tjsexp: "b"
    }
  };
  const response = await fetch(`https://links.duckduckgo.com/d.js?${queryString(queryObject)}`);
  const data = await response.text();
  if (data.includes("DDG.deep.is506") || data.includes("DDG.deep.anomalyDetectionBlock"))
    throw new Error("A server error occurred!");
  const searchMatch = SEARCH_REGEX.exec(data);
  if (!searchMatch) {
    throw new Error("未能找到搜索结果！");
  }
  const searchResults = JSON.parse(searchMatch[1].replace(/\t/g, "    "));
  if (searchResults.length === 1 && !("n" in searchResults[0])) {
    const onlyResult = searchResults[0];
    if (!onlyResult.da && onlyResult.t === "EOF" || !onlyResult.a || onlyResult.d === "google.com search") {
      return {
        noResults: true,
        vqd,
        results: []
      };
    }
  }
  const results = {
    noResults: false,
    vqd,
    results: [],
    related: [],
    videos: []
  };
  for (const search2 of searchResults) {
    if ("n" in search2)
      continue;
    let bang;
    if (search2.b) {
      const [prefix, title, domain] = search2.b.split("	");
      bang = { prefix, title, domain };
    }
    results.results.push({
      title: search2.t,
      description: decode(search2.a),
      rawDescription: search2.a,
      hostname: search2.i,
      icon: `https://external-content.duckduckgo.com/ip3/${search2.i}.ico`,
      url: search2.u,
      bang
    });
  }
  const imagesMatch = IMAGES_REGEX.exec(data);
  if (imagesMatch) {
    const imagesResult = JSON.parse(imagesMatch[1].replace(/\t/g, "    "));
    results.images = imagesResult.results.map((i) => {
      i.title = decode(i.title);
      return i;
    });
  }
  const newsMatch = NEWS_REGEX.exec(data);
  if (newsMatch) {
    const newsResult = JSON.parse(newsMatch[1].replace(/\t/g, "    "));
    results.news = newsResult.results.map((article) => ({
      date: article.date,
      excerpt: decode(article.excerpt),
      image: article.image,
      relativeTime: article.relative_time,
      syndicate: article.syndicate,
      title: decode(article.title),
      url: article.url,
      isOld: !!article.is_old
    }));
  }
  const videosMatch = VIDEOS_REGEX.exec(data);
  if (videosMatch) {
    const videoResult = JSON.parse(videosMatch[1].replace(/\t/g, "    "));
    results.videos = [];
    for (const video of videoResult.results) {
      results.videos.push({
        url: video.content,
        title: decode(video.title),
        description: decode(video.description),
        image: video.images.large || video.images.medium || video.images.small || video.images.motion,
        duration: video.duration,
        publishedOn: video.publisher,
        published: video.published,
        publisher: video.uploader,
        viewCount: video.statistics.viewCount || void 0
      });
    }
  }
  const relatedMatch = RELATED_SEARCHES_REGEX.exec(data);
  if (relatedMatch) {
    const relatedResult = JSON.parse(relatedMatch[1].replace(/\t/g, "    "));
    results.related = [];
    for (const related of relatedResult.results) {
      results.related.push({
        text: related.text,
        raw: related.display_text
      });
    }
  }
  return results;
}
function queryString(query) {
  return new URLSearchParams(query).toString();
}
async function getVQD(query, ia = "web") {
  try {
    const response = await fetch(`https://duckduckgo.com/?${queryString({ q: query, ia })}`);
    const data = await response.text();
    const match = VQD_REGEX.exec(data);
    if (!match) {
      throw new Error(`Failed to extract VQD from the response for query "${query}".`);
    }
    return match[1];
  } catch (e) {
    throw new Error(`Failed to get the VQD for query "${query}".`);
  }
}
function sanityCheck(options) {
  options = Object.assign({}, defaultOptions, options);
  if (!(options.safeSearch in SafeSearchType))
    throw new TypeError(`${options.safeSearch} is an invalid safe search type!`);
  if (typeof options.safeSearch === "string")
    options.safeSearch = SafeSearchType[options.safeSearch];
  if (typeof options.offset !== "number")
    throw new TypeError(`Search offset is not a number!`);
  if (options.offset < 0)
    throw new RangeError("Search offset cannot be below zero!");
  if (options.time && !Object.values(SearchTimeType).includes(options.time) && typeof options.time === "string" && !/\d{4}-\d{2}-\d{2}..\d{4}-\d{2}-\d{2}/.test(options.time)) {
    throw new TypeError(`${options.time} is an invalid search time!`);
  }
  if (!options.locale || typeof options.locale !== "string")
    throw new TypeError("Search locale must be a string!");
  if (!options.region || typeof options.region !== "string")
    throw new TypeError("Search region must be a string!");
  if (!options.marketRegion || typeof options.marketRegion !== "string")
    throw new TypeError("Search market region must be a string!");
  if (options.vqd && !/\d-\d+-\d+/.test(options.vqd))
    throw new Error(`${options.vqd} is an invalid VQD!`);
  return options;
}
const duckduckgo_search = {
  schema: {
    name: "duckduckgo_search",
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
  func: async (args) => {
    const { keywords } = args;
    if (!keywords || keywords.length === 0)
      throw new Error("无参数");
    console.log("开始查询: ", keywords);
    const searchResults = await search(keywords.join(" "), {
      safeSearch: SafeSearchType.STRICT,
      offset: 0,
      region: "cn-zh"
    });
    const max_length = 8;
    const content = searchResults.results.slice(0, max_length).map((d) => `title: ${d.title}
description: ${d.description}
url: ${d.url}`).join("\n---\n");
    return content;
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
  extra_params: { temperature: 0.7, top_p: 0.4 }
};
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
      return (...args) => {
        if (typeof prop === "string" && prop.endsWith("WithReturns")) {
          const method = prop.slice(0, -11);
          return Reflect.apply(target.requestJSON, target, [method, ...args]);
        }
        return Reflect.apply(target.request, target, [prop, ...args]);
      };
    }
  });
}
const LOG_LEVEL_PRIORITY = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
};
function LogLevel(level, ...args) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const logParts = args.map((e) => {
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
      return (...args) => LogLevel(level, ...args);
    }
    return () => {
    };
  }
});
const scheduleResp = (ok, reason = "") => {
  const result = {
    ok,
    ...reason && { reason } || {}
  };
  return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
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
const tools_default = { duckduckgo_search, jina_reader };
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
    "GOOGLE_COMPLETIONS_API",
    "MISTRAL_API_BASE",
    "COHERE_API_BASE",
    "ANTHROPIC_API_BASE",
    "AZURE_COMPLETIONS_API",
    "AZURE_DALLE_API"
  ];
  TELEGRAM_BOT_NAME = [];
  CHAT_GROUP_WHITE_LIST = [];
  GROUP_CHAT_BOT_ENABLE = true;
  GROUP_CHAT_BOT_SHARE_MODE = true;
  AUTO_TRIM_HISTORY = true;
  MAX_HISTORY_LENGTH = 20;
  MAX_TOKEN_LENGTH = -1;
  HISTORY_IMAGE_PLACEHOLDER = "[A IMAGE]";
  HIDE_COMMAND_BUTTONS = [];
  SHOW_REPLY_BUTTON = false;
  EXTRA_MESSAGE_CONTEXT = false;
  ENABLE_FILE = true;
  ENABLE_REPLY_TO_MENTION = false;
  IGNORE_TEXT = "";
  HIDE_MIDDLE_MESSAGE = false;
  CHAT_MESSAGE_TRIGGER = {};
  TOOLS = tools_default;
  FUNC_LOOP_TIMES = 1;
  CALL_INFO = true;
  CON_EXEC_FUN_NUM = 1;
  TELEGRAPH_NUM_LIMIT = -1;
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
  QSTASH_TIMEOUT = "5m";
}
class AgentShareConfig {
  AI_PROVIDER = "auto";
  AI_IMAGE_PROVIDER = "auto";
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
  GOOGLE_COMPLETIONS_API = "https://generativelanguage.googleapis.com/v1beta/models/";
  GOOGLE_COMPLETIONS_MODEL = "gemini-pro";
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
class SiliconConfig {
  SILICON_API_KEY = null;
  SILICON_API_BASE = "https://api.siliconflow.cn/v1";
  SILICON_CHAT_MODEL = "deepseek-ai/DeepSeek-V2.5";
  SILICON_IMAGE_MODEL = "black-forest-labs/FLUX.1-schnell";
  SILICON_IMAGE_SIZE = "1024x1024";
  SILICON_EXTRA_PARAMS = {};
}
class DefineKeys {
  DEFINE_KEYS = [];
}
class ExtraUserConfig {
  MAPPING_KEY = "-p:SYSTEM_INIT_MESSAGE|-n:MAX_HISTORY_LENGTH|-a:AI_PROVIDER|-ai:AI_IMAGE_PROVIDER|-m:CHAT_MODEL|-md:CURRENT_MODE|-v:OPENAI_VISION_MODEL|-t:OPENAI_TTS_MODEL|-ex:OPENAI_API_EXTRA_PARAMS|-mk:MAPPING_KEY|-mv:MAPPING_VALUE|-asap:FUNCTION_REPLY_ASAP|-fm:FUNCTION_CALL_MODEL|-tool:USE_TOOLS|-oli:IMAGE_MODEL";
  MAPPING_VALUE = "";
  ENABLE_SHOWINFO = false;
  ENABLE_SHOWTOKEN = false;
  USE_TOOLS = [];
  JINA_API_KEY = [];
  FUNCTION_CALL_MODEL = "gpt-4o-mini";
  FUNCTION_CALL_API_KEY = "";
  FUNCTION_CALL_BASE = "";
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
  INLINE_AGENTS = ["oenai", "claude", "gemini", "cohere", "workersai"];
  INLINE_IMAGE_AGENTS = ["openai", "silicon"];
  INLINE_CHAT_MODELS = ["gpt-4o-mini", "gpt-4o-2024-05-13"];
  INLINE_VISION_MODELS = ["gpt-4o-mini", "gpt-4o-2024-05-13"];
  INLINE_IMAGE_MODELS = ["dall-e-2", "dall-e-3"];
  INLINE_FUNCTION_CALL_TOOLS = ["duckduckgo_search", "jina_reader"];
  INLINE_FUNCTION_ASAP = ["true", "false"];
  KLINGAI_COOKIE = [];
  KLINGAI_IMAGE_COUNT = 4;
  KLINGAI_IMAGE_RATIO = "1:1";
}
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
    new SiliconConfig(),
    new ExtraUserConfig()
  );
}
const ENV_KEY_MAPPER = {
  CHAT_MODEL: "OPENAI_CHAT_MODEL",
  API_KEY: "OPENAI_API_KEY",
  WORKERS_AI_MODEL: "WORKERS_CHAT_MODEL"
};
class Environment extends EnvironmentConfig {
  BUILD_TIMESTAMP = 1730003412;
  BUILD_VERSION = "2eaa595";
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
  }
}
const ENV = new Environment();
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
    const result = evaluateExpression(condition, localData);
    return result ? trueBlock : falseBlock || "";
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
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = interpolateObject(value, data);
    }
    return result;
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
  const renderOutput = async (type, temple, response2) => {
    switch (type) {
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
function formatInput(input, type) {
  if (type === "json") {
    return JSON.parse(input);
  } else if (type === "space-separated") {
    return input.split(/\s+/);
  } else if (type === "comma-separated") {
    return input.split(/\s*,\s*/);
  } else {
    return input;
  }
}
const logSingleton = /* @__PURE__ */ new WeakMap();
const sentMessageIds = /* @__PURE__ */ new WeakMap();
function Log(value, context) {
  if (context.kind === "field") {
    const configIndex = 1;
    return function(initialValue) {
      if (typeof initialValue === "function") {
        return async function(...args) {
          const config = args[configIndex];
          const logs = getLogSingleton(config);
          const startTime = Date.now();
          logs.ongoingFunctions.push({
            name: initialValue.name || "anonymous",
            startTime
          });
          let model;
          try {
            model = args[0]?.model || this.model(config, args[0]);
            if (this.type === "tool") {
              logs.tool.model = model;
            } else {
              logs.chat.model.push(model);
            }
            const result = await initialValue.apply(this, args);
            const endTime = Date.now();
            const elapsed = `${((endTime - startTime) / 1e3).toFixed(1)}s`;
            logs.ongoingFunctions = logs.ongoingFunctions.filter(
              (func) => func.startTime !== startTime
            );
            handleLlmLog(logs, result, elapsed, this.type);
            if (!result.content && !result.tool_calls) {
              return result;
            }
            if (result.usage) {
              logs.tokens.push(`${result.usage.prompt_tokens},${result.usage.completion_tokens}`);
            }
            return { content: result.content, tool_calls: result.tool_calls };
          } catch (error) {
            logs.ongoingFunctions = logs.ongoingFunctions.filter(
              (func) => func.startTime !== startTime
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
    return async function(...args) {
      const config = this.context.USER_CONFIG;
      const logs = getLogSingleton(config);
      const startTime = Date.now();
      try {
        const result = await value.apply(this, args);
        const endTime = Date.now();
        const elapsed = `${((endTime - startTime) / 1e3).toFixed(1)}s`;
        logs.functionTime.push(elapsed);
        return result;
      } catch (error) {
        throw error;
      }
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
      toolsLog += ` c_t: ${logObj.tool.time.join(" ")}`;
    }
    if (logObj.functionTime.length > 0) {
      toolsLog += ` f_t: ${logObj.functionTime.join(" ")}`;
    }
    logList.push(toolsLog);
  }
  if (logObj.functions.length > 0) {
    const functionLogs = logObj.functions.map((log2) => {
      const args = Object.values(log2.arguments).join(", ");
      return `${log2.name}: ${args}`.substring(0, 50);
    });
    logList.push(...functionLogs);
  }
  if (logObj.error) {
    logList.push(`${logObj.error}`);
  }
  if (logObj.chat.model.length > 0) {
    const chatLogs = logObj.chat.model.map((m, i) => {
      const time = logObj.chat.time[i] || "";
      return `${m} ${time}`;
    }).join("|");
    logList.push(chatLogs);
  }
  logObj.ongoingFunctions.forEach((func) => {
    const elapsed = `${((Date.now() - func.startTime) / 1e3).toFixed(1)}s`;
    logList.push(`[ongoing: ${func.name} ${elapsed}]`);
  });
  if (logObj.tokens.length > 0 && showToken) {
    logList.push(`${logObj.tokens.join("|")}`);
  }
  return logList.filter(Boolean).map((entry) => `>\`${entry}\``).join("\n");
}
function clearLog(context) {
  logSingleton.delete(context);
}
function handleLlmLog(logs, result, time, type) {
  if (type === "tool") {
    logs.tool.time.push(time);
  } else {
    logs.chat.time.push(time);
  }
  if (type === "tool" && result.tool_calls && result.tool_calls.length > 0) {
    logs.functions.push(
      ...result.tool_calls.map((tool) => ({
        name: tool.function.name,
        arguments: JSON.parse(tool.function.arguments)
      }))
    );
  }
}
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
function escape(text) {
  const lines = text.split("\n");
  const stack = [];
  const result = [];
  let lineTrim = "";
  for (const [i, line] of lines.entries()) {
    lineTrim = line.trim();
    let startIndex = 0;
    if (/^```.+/.test(lineTrim)) {
      stack.push(i);
    } else if (lineTrim === "```") {
      if (stack.length) {
        startIndex = stack.pop();
        if (!stack.length) {
          const content = lines.slice(startIndex, i + 1).join("\n");
          result.push(handleEscape(content, "code"));
          continue;
        }
      } else {
        stack.push(i);
      }
    }
    if (!stack.length) {
      result.push(handleEscape(line));
    }
  }
  if (stack.length) {
    const last = `${lines.slice(stack[0]).join("\n")}
\`\`\``;
    result.push(handleEscape(last, "code"));
  }
  return result.join("\n");
}
function handleEscape(text, type = "text") {
  if (!text.trim()) {
    return text;
  }
  if (type === "text") {
    text = text.replace(escapeChars, "\\$1").replace(/\\\*\\\*(.*?[^\\])\\\*\\\*/g, "*$1*").replace(/\\_\\_(.*?[^\\])\\_\\_/g, "__$1__").replace(/\\_(.*?[^\\])\\_/g, "_$1_").replace(/\\~(.*?[^\\])\\~/g, "~$1~").replace(/\\\|\\\|(.*?[^\\])\\\|\\\|/g, "||$1||").replace(/\\\[([^\]]+?)\\\]\\\((.+?)\\\)/g, "[$1]($2)").replace(/\\`(.*?[^\\])\\`/g, "`$1`").replace(/\\\\\\([_*[\]()\\~`>#+\-=|{}.!])/g, "\\$1").replace(/^(\s*)\\(>.+\s*)$/gm, "$1$2").replace(/^(\s*)\\-\s*(.+)$/gm, "$1• $2").replace(/^((\\#){1,3}\s)(.+)/gm, "$1*$3*");
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
  constructor(message) {
    this.chat_id = message.chat.id;
    this.chatType = message.chat.type;
    this.message = message;
    if (message.chat.type === "group" || message.chat.type === "supergroup") {
      if (message?.reply_to_message && ENV.EXTRA_MESSAGE_CONTEXT && ENV.ENABLE_REPLY_TO_MENTION && !message.reply_to_message.from?.is_bot) {
        this.reply_to_message_id = message.reply_to_message.message_id;
      } else {
        this.reply_to_message_id = message.message_id;
      }
      this.allow_sending_without_reply = true;
      if (message.message_thread_id) {
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
  renderMessage(parse_mode, message) {
    if (parse_mode === "MarkdownV2") {
      return escape(message);
    }
    return message;
  }
  async sendLongMessage(message, context) {
    const chatContext = { ...context };
    const limit = 4096;
    if (message.length <= limit) {
      const resp = await this.sendMessage(this.renderMessage(context.parse_mode, message), chatContext);
      if (resp.status === 200) {
        return resp;
      }
    }
    chatContext.parse_mode = null;
    let lastMessageResponse = null;
    for (let i = 0; i < message.length; i += limit) {
      const msg = message.slice(i, Math.min(i + limit, message.length));
      if (i > 0) {
        chatContext.message_id = null;
      }
      lastMessageResponse = await this.sendMessage(msg, chatContext);
      if (lastMessageResponse.status !== 200) {
        break;
      }
    }
    if (lastMessageResponse === null) {
      throw new Error("Send message failed");
    }
    return lastMessageResponse;
  }
  sendRichText(message, parseMode = ENV.DEFAULT_PARSE_MODE, type = "chat") {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    const resp = this.sendLongMessage(message, {
      ...this.context,
      parse_mode: parseMode
    });
    return checkIsNeedTagIds(this.context, resp, type);
  }
  sendPlainText(message, type = "tip") {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    const resp = this.sendLongMessage(message, {
      ...this.context,
      parse_mode: null
    });
    return checkIsNeedTagIds(this.context, resp, type);
  }
  sendPhoto(photo, caption, parse_mode) {
    if (!this.context) {
      throw new Error("Message context not set");
    }
    const params = {
      chat_id: this.context.chat_id,
      photo,
      ...caption ? { caption: this.renderMessage(parse_mode || null, caption) } : {},
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
      media,
      message_thread_id: this.context.message_thread_id || void 0
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
      document,
      message_thread_id: this.context.message_thread_id || void 0,
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
}
class TelegraphSender {
  context;
  telegraphAccessTokenKey;
  telegraphAccessToken;
  teleph_path;
  author = {
    short_name: "Mewo",
    author_name: "A Cat",
    author_url: ENV.TELEGRAPH_AUTHOR_URL
  };
  constructor(context, botName, telegraphAccessTokenKey) {
    this.context = context;
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
  let message_id = null;
  const original_resp = await resp;
  do {
    if (ENV.EXPIRED_TIME <= 0 || context.message_id) break;
    const clone_resp = await original_resp.clone().json();
    if (Array.isArray(clone_resp.result)) {
      message_id = clone_resp?.result?.map((i) => i.message_id);
    } else {
      message_id = [clone_resp?.result?.message_id];
    }
    if (message_id.filter(Boolean).length === 0) {
      log.error("Not exist message_id");
      break;
    }
    const isGroup = ["group", "supergroup"].includes(chatType);
    const isNeedTag = isGroup && ENV.SCHEDULE_GROUP_DELETE_TYPE.includes(msgType) || !isGroup && ENV.SCHEDULE_PRIVATE_DELETE_TYPE.includes(msgType);
    if (isNeedTag) {
      if (!sentMessageIds.has(context.message)) {
        sentMessageIds.set(context.message, []);
      }
      message_id.forEach((id) => sentMessageIds.get(context.message)?.push(id));
      log.debug("taged message id", sentMessageIds.get(context.message)?.join(","));
    }
  } while (false);
  return original_resp;
}
class ChosenInlineContext {
  result_id;
  from;
  inline_message_id;
  query;
  parse_mode = null;
  constructor(result) {
    this.result_id = result.result_id;
    this.from = result.from;
    this.inline_message_id = result.inline_message_id;
    this.query = result.query;
  }
}
class ChosenInlineSender {
  api;
  context;
  constructor(token, context) {
    this.api = createTelegramBotAPI(token);
    this.context = context;
  }
  static from(token, result) {
    return new ChosenInlineSender(token, new ChosenInlineContext(result));
  }
  sendRichText(text, parseMode = ENV.DEFAULT_PARSE_MODE, type = "chat") {
    return this.editMessageText(text, parseMode);
  }
  sendPlainText(text) {
    return this.editMessageText(text);
  }
  editMessageText(text, parse_mode) {
    return this.api.editMessageText({
      inline_message_id: this.context.inline_message_id,
      text: this.renderMessage(parse_mode || null, text),
      parse_mode,
      link_preview_options: {
        is_disabled: ENV.DISABLE_WEB_PREVIEW
      }
    });
  }
  editMessageMedia(media, type, caption, parse_mode) {
    return this.api.editMessageMedia({
      inline_message_id: this.context.inline_message_id,
      media: {
        type,
        media,
        ...caption ? { caption: this.renderMessage(parse_mode || null, caption) } : {}
      }
    });
  }
  renderMessage(parse_mode, message) {
    if (parse_mode === "MarkdownV2") {
      return escape(message);
    }
    return message;
  }
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
    const result = await api.getChatAdministratorsWithReturns({ chat_id: chatId });
    if (result == null) {
      return null;
    }
    groupAdmin = result.result;
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
    const { Buffer: Buffer2 } = await import("node:buffer");
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
function fixOpenAICompatibleOptions(options) {
  options = options || {};
  options.streamBuilder = options.streamBuilder || function(r, c) {
    return new Stream(r, c);
  };
  options.contentExtractor = options.contentExtractor || function(d) {
    return d?.choices?.[0]?.delta?.content;
  };
  options.fullContentExtractor = options.fullContentExtractor || function(d) {
    return d.choices?.[0]?.message.content;
  };
  options.functionCallExtractor = options.functionCallExtractor || function(d, call_list) {
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
  options.fullFunctionCallExtractor = options.fullFunctionCallExtractor || function(d) {
    return d?.choices?.[0]?.message?.tool_calls;
  };
  options.errorExtractor = options.errorExtractor || function(d) {
    return d.error?.message;
  };
  return options;
}
function isJsonResponse(resp) {
  return resp.headers.get("content-type")?.includes("json") || false;
}
function isEventStreamResponse(resp) {
  const types = ["application/stream+json", "text/event-stream"];
  const content = resp.headers.get("content-type") || "";
  for (const type of types) {
    if (content.includes(type)) {
      return true;
    }
  }
  return false;
}
async function requestChatCompletions(url, header, body, onStream, onResult = null, options = null) {
  const controller = new AbortController();
  const { signal } = controller;
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
    signal
  });
  clearTimeoutID(timeoutID);
  options = fixOpenAICompatibleOptions(options);
  if (onStream && resp.ok && isEventStreamResponse(resp)) {
    const stream = options.streamBuilder?.(resp, controller);
    if (!stream) {
      throw new Error("Stream builder error");
    }
    return await iterStream(body, stream, options, onStream);
  }
  if (!isJsonResponse(resp)) {
    throw new Error(resp.statusText);
  }
  const result = await resp.json();
  if (!result) {
    throw new Error("Empty response");
  }
  if (options.errorExtractor?.(result)) {
    throw new Error(options.errorExtractor?.(result) || "Unknown error");
  }
  try {
    const usage = result?.usage;
    await onResult?.(result);
    return {
      tool_calls: options.fullFunctionCallExtractor?.(result) || void 0,
      content: options.fullContentExtractor?.(result) || "",
      ...usage && { usage }
    };
  } catch (e) {
    console.error(e);
    throw new Error(JSON.stringify(result));
  }
}
function clearTimeoutID(timeoutID) {
  if (timeoutID)
    clearTimeout(timeoutID);
}
async function iterStream(body, stream, options, onStream) {
  log.info(`start handle stream`);
  let contentFull = "";
  let lengthDelta = 0;
  let updateStep = 0;
  let needSendCallMsg = true;
  const tool_calls = [];
  let msgPromise = null;
  let lastChunk = "";
  let usage = null;
  const immediatePromise = Promise.resolve("[PROMISE DONE]");
  try {
    for await (const data of stream) {
      const c = options.contentExtractor?.(data) || "";
      usage = data?.usage;
      if (body?.tools?.length > 0)
        options.functionCallExtractor?.(data, tool_calls);
      if (c === "" && tool_calls.length === 0) continue;
      if (tool_calls.length > 0) {
        if (needSendCallMsg) {
          msgPromise = onStream(`\`Start call...\``);
          needSendCallMsg = false;
        }
        continue;
      }
      lengthDelta += lastChunk.length;
      contentFull += lastChunk;
      lastChunk = c;
      if (lastChunk && lengthDelta > updateStep) {
        if (msgPromise && await Promise.race([msgPromise, immediatePromise]) === "[PROMISE DONE]") {
          continue;
        }
        lengthDelta = 0;
        updateStep += 20;
        msgPromise = onStream(`${contentFull}●`);
      }
    }
    contentFull += lastChunk;
    log.info("--- contentFull:", contentFull);
  } catch (e) {
    contentFull += `
ERROR: ${e.message}`;
  }
  await msgPromise;
  return {
    ...tool_calls?.length > 0 && { tool_calls },
    content: contentFull,
    ...usage && { usage }
  };
}
_request_dec = [Log];
const _Anthropic = class _Anthropic {
  constructor() {
    __publicField(this, "name", "anthropic");
    __publicField(this, "modelKey", "ANTHROPIC_CHAT_MODEL");
    __publicField(this, "enable", (context) => {
      return !!context.ANTHROPIC_API_KEY;
    });
    __publicField(this, "render", async (item) => {
      const res = {
        role: item.role,
        content: item.content
      };
      if (item.images && item.images.length > 0) {
        res.content = [];
        if (item.content) {
          res.content.push({ type: "text", text: item.content });
        }
        for (const image of item.images) {
          res.content.push(await imageToBase64String(image).then(({ format, data }) => {
            return { type: "image", source: { type: "base64", media_type: format, data } };
          }));
        }
      }
      return res;
    });
    __publicField(this, "model", (ctx) => {
      return ctx.ANTHROPIC_CHAT_MODEL;
    });
    __publicField(this, "request", __runInitializers(_init, 8, this, async (params, context, onStream) => {
      const { prompt, history } = params;
      const url = `${context.ANTHROPIC_API_BASE}/messages`;
      const header = {
        "x-api-key": context.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      };
      const messages = history || [];
      if (messages.length > 0 && messages[0].role === "assistant") {
        messages.shift();
      }
      const body = {
        system: prompt,
        model: context.ANTHROPIC_CHAT_MODEL,
        messages: await Promise.all(messages.map((item) => this.render(item))),
        stream: onStream != null,
        max_tokens: ENV.MAX_TOKEN_LENGTH > 0 ? ENV.MAX_TOKEN_LENGTH : 2048
      };
      if (!body.system) {
        delete body.system;
      }
      const options = {};
      options.streamBuilder = function(r, c) {
        return new Stream(r, c, _Anthropic.parser);
      };
      options.contentExtractor = function(data) {
        return data?.delta?.text;
      };
      options.fullContentExtractor = function(data) {
        return data?.content?.[0].text;
      };
      options.errorExtractor = function(data) {
        return data?.error?.message;
      };
      return requestChatCompletions(url, header, body, onStream, null, options);
    })), __runInitializers(_init, 11, this);
  }
  static parser(sse) {
    switch (sse.event) {
      case "content_block_delta":
        try {
          return { data: JSON.parse(sse.data || "") };
        } catch (e) {
          console.error(e, sse.data);
          return {};
        }
      case "message_start":
      case "content_block_start":
      case "content_block_stop":
        return {};
      case "message_stop":
        return { finish: true };
      default:
        return {};
    }
  }
};
_init = __decoratorStart(null);
__decorateElement(_init, 5, "request", _request_dec, _Anthropic);
__decoratorMetadata(_init, _Anthropic);
let Anthropic = _Anthropic;
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
          length = counter(historyItem.content);
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
  }
  return history;
}
async function requestCompletionsFromLLM(params, context, agent, modifier, onStream) {
  let history = context.MIDDEL_CONTEXT.history;
  if (modifier) {
    const modifierData = modifier(history, params.message || null);
    history = modifierData.history;
    params.message = modifierData.message || "";
  }
  let { message, images, audio, prompt, model, extra_params } = params;
  if (prompt) {
    prompt = context.USER_CONFIG.PROMPT[prompt] || prompt;
  } else {
    prompt = context.USER_CONFIG.SYSTEM_INIT_MESSAGE;
  }
  const llmParams = {
    message,
    images,
    audio,
    prompt,
    model,
    history,
    extra_params
  };
  const answer = await agent.request(llmParams, context.USER_CONFIG, onStream);
  context.MIDDEL_CONTEXT.history.push({ role: "assistant", ...answer });
  return answer;
}
async function requestText2Image(url, headers, body, render) {
  console.log("start generate image.");
  const resp = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });
  const result = await render(resp);
  if (result.message) {
    throw new Error(result.message);
  }
  return result;
}
async function renderOpenAIMessage(item) {
  const res = {
    ...item
  };
  delete res?.images;
  if (item.images && item.images.length > 0) {
    res.content = [];
    if (item.content) {
      res.content.push({ type: "text", text: item.content });
    } else {
      res.content.push({ type: "text", text: "请帮我解读这张图片" });
    }
    for (const image of item.images) {
      switch (ENV.TELEGRAM_IMAGE_TRANSFER_MODE) {
        case "base64":
          res.content.push({
            type: "image_url",
            image_url: {
              url: renderBase64DataURI(await imageToBase64String(image))
            }
          });
          break;
        case "url":
        default:
          res.content.push({ type: "image_url", image_url: { url: image } });
          break;
      }
    }
  }
  return res;
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
class OpenAI extends (_a = OpenAIBase, _request_dec2 = [Log], _a) {
  constructor(type = "chat") {
    super();
    __publicField(this, "modelKey", "OPENAI_CHAT_MODEL");
    __publicField(this, "enable", (context) => {
      return context.OPENAI_API_KEY.length > 0;
    });
    __publicField(this, "model", (ctx, params) => {
      if (this.type === "tool" && ctx.FUNCTION_CALL_MODEL) {
        return ctx.FUNCTION_CALL_MODEL;
      }
      return params?.model || params?.images ? ctx.OPENAI_VISION_MODEL : ctx.OPENAI_CHAT_MODEL;
    });
    __publicField(this, "base_url", (context) => {
      if (this.type === "tool" && context.FUNCTION_CALL_BASE) {
        return context.FUNCTION_CALL_BASE;
      }
      return context.OPENAI_API_BASE;
    });
    __publicField(this, "render", async (item) => {
      return renderOpenAIMessage(item);
    });
    __publicField(this, "request", __runInitializers(_init2, 8, this, async (params, context, onStream) => {
      const { prompt, history, extra_params } = params;
      const url = `${this.base_url(context)}/chat/completions`;
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apikey(context)}`
      };
      const messages = [...history || []];
      if (prompt) {
        for (const message of messages) {
          if (message?.role === "tool") {
            messages.shift();
          } else {
            break;
          }
        }
        messages.unshift({ role: context.SYSTEM_INIT_MESSAGE_ROLE, content: prompt });
      }
      const body = {
        model: this.model(context, params),
        ...context.OPENAI_API_EXTRA_PARAMS,
        messages: await Promise.all(messages.map(this.render)),
        stream: !!onStream,
        ...extra_params,
        ...context.ENABLE_SHOWTOKEN && !!onStream && { stream_options: { include_usage: true } }
      };
      delete body.agent;
      delete body.type;
      const { body: newBody, onStream: newOnStream } = this.extraHandle(body, context, onStream);
      return requestChatCompletions(url, header, newBody, newOnStream);
    })), __runInitializers(_init2, 11, this);
    __publicField(this, "extraHandle", (body, context, onStream) => {
      if (Object.keys(ENV.DROPS_OPENAI_PARAMS).length > 0) {
        for (const [models, params] of Object.entries(ENV.DROPS_OPENAI_PARAMS)) {
          if (models.split(",").includes(body.model)) {
            params.split(",").forEach((p) => delete body[p]);
            break;
          }
        }
        if (!body.stream && onStream) {
          body.stream = false;
          onStream = null;
        }
      }
      if (ENV.COVER_MESSAGE_ROLE) {
        for (const [models, roles] of Object.entries(ENV.COVER_MESSAGE_ROLE)) {
          const [oldRole, newRole] = roles.split(":");
          if (models.split(",").includes(body.model)) {
            body.messages = body.messages.map((m) => {
              m.role = m.role === oldRole ? newRole : m.role;
              return m;
            });
          }
        }
      }
      if (!body.model.includes("gpt") && !ENV.MODEL_COMPATIBLE_OPENAI) {
        body.messages = body.messages.filter((m) => !!m.content).map(
          (m) => {
            if (m.role === "tool") {
              return {
                role: "user",
                content: `${m.name} result:${m.content}`
              };
            }
            return m;
          }
        );
        delete body.tool_choice;
        delete body.tool_calls;
      }
      if (!onStream && body.stream_options) {
        delete body.stream_options;
      }
      return { body, onStream };
    });
    this.type = type;
  }
}
_init2 = __decoratorStart(_a);
__decorateElement(_init2, 5, "request", _request_dec2, OpenAI);
__decoratorMetadata(_init2, OpenAI);
class Dalle extends (_b = OpenAIBase, _request_dec3 = [Log], _b) {
  constructor() {
    super(...arguments);
    __publicField(this, "modelKey", "DALL_E_MODEL");
    __publicField(this, "enable", (context) => {
      return context.OPENAI_API_KEY.length > 0;
    });
    __publicField(this, "model", (ctx) => {
      return ctx.DALL_E_MODEL;
    });
    __publicField(this, "request", __runInitializers(_init3, 8, this, async (prompt, context) => {
      const url = `${context.OPENAI_API_BASE}/images/generations`;
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apikey(context)}`
      };
      const body = {
        prompt,
        n: 1,
        size: context.DALL_E_IMAGE_SIZE,
        model: context.DALL_E_MODEL
      };
      if (body.model === "dall-e-3") {
        body.quality = context.DALL_E_IMAGE_QUALITY;
        body.style = context.DALL_E_IMAGE_STYLE;
      }
      return requestText2Image(url, header, body, this.render);
    })), __runInitializers(_init3, 11, this);
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
_init3 = __decoratorStart(_b);
__decorateElement(_init3, 5, "request", _request_dec3, Dalle);
__decoratorMetadata(_init3, Dalle);
class Transcription extends (_c = OpenAIBase, _request_dec4 = [Log], _c) {
  constructor() {
    super(...arguments);
    __publicField(this, "modelKey", "OPENAI_STT_MODEL");
    __publicField(this, "enable", (context) => {
      return context.OPENAI_API_KEY.length > 0;
    });
    __publicField(this, "model", (ctx) => {
      return ctx.OPENAI_STT_MODEL;
    });
    __publicField(this, "request", __runInitializers(_init4, 8, this, async (audio, context, file_name) => {
      const url = `${context.OPENAI_API_BASE}/audio/transcriptions`;
      const header = {
        Authorization: `Bearer ${this.apikey(context)}`,
        Accept: "application/json"
      };
      const formData = new FormData();
      formData.append("file", audio, file_name);
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
    })), __runInitializers(_init4, 11, this);
  }
}
_init4 = __decoratorStart(_c);
__decorateElement(_init4, 5, "request", _request_dec4, Transcription);
__decoratorMetadata(_init4, Transcription);
class AzureBase {
  name = "azure";
  modelFromURI = (uri) => {
    if (!uri) {
      return "";
    }
    try {
      const url = new URL(uri);
      return url.pathname.split("/")[3];
    } catch {
      return uri;
    }
  };
}
class AzureChatAI extends (_d = AzureBase, _request_dec5 = [Log], _d) {
  constructor() {
    super(...arguments);
    __publicField(this, "modelKey", "AZURE_COMPLETIONS_API");
    __publicField(this, "enable", (context) => {
      return !!(context.AZURE_API_KEY && context.AZURE_COMPLETIONS_API);
    });
    __publicField(this, "model", (ctx) => {
      return this.modelFromURI(ctx.AZURE_COMPLETIONS_API);
    });
    __publicField(this, "request", __runInitializers(_init5, 8, this, async (params, context, onStream) => {
      const { prompt, history } = params;
      const url = context.AZURE_COMPLETIONS_API;
      if (!url || !context.AZURE_API_KEY) {
        throw new Error("Azure Completions API is not set");
      }
      const header = {
        "Content-Type": "application/json",
        "api-key": context.AZURE_API_KEY
      };
      const messages = [...history || []];
      if (prompt) {
        messages.unshift({ role: context.SYSTEM_INIT_MESSAGE_ROLE, content: prompt });
      }
      const body = {
        ...context.OPENAI_API_EXTRA_PARAMS,
        messages: await Promise.all(messages.map(renderOpenAIMessage)),
        stream: onStream != null
      };
      return requestChatCompletions(url, header, body, onStream);
    })), __runInitializers(_init5, 11, this);
  }
}
_init5 = __decoratorStart(_d);
__decorateElement(_init5, 5, "request", _request_dec5, AzureChatAI);
__decoratorMetadata(_init5, AzureChatAI);
class AzureImageAI extends AzureBase {
  modelKey = "AZURE_DALLE_API";
  enable = (context) => {
    return !!(context.AZURE_API_KEY && context.AZURE_DALLE_API);
  };
  model = (ctx) => {
    return this.modelFromURI(ctx.AZURE_DALLE_API);
  };
  request = async (prompt, context) => {
    const url = context.AZURE_DALLE_API;
    if (!url || !context.AZURE_API_KEY) {
      throw new Error("Azure DALL-E API is not set");
    }
    const header = {
      "Content-Type": "application/json",
      "api-key": context.AZURE_API_KEY
    };
    const body = {
      prompt,
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
_request_dec6 = [Log];
const _Cohere = class _Cohere {
  constructor() {
    __publicField(this, "name", "cohere");
    __publicField(this, "modelKey", "COHERE_CHAT_MODEL");
    __publicField(this, "enable", (context) => {
      return !!context.COHERE_API_KEY;
    });
    __publicField(this, "model", (ctx) => {
      return ctx.COHERE_CHAT_MODEL;
    });
    __publicField(this, "render", (item) => {
      return {
        role: _Cohere.COHERE_ROLE_MAP[item.role] || "USER",
        content: item.content
      };
    });
    __publicField(this, "request", __runInitializers(_init6, 8, this, async (params, context, onStream) => {
      const { message, prompt, history } = params;
      const url = `${context.COHERE_API_BASE}/chat`;
      const header = {
        "Authorization": `Bearer ${context.COHERE_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": onStream !== null ? "text/event-stream" : "application/json"
      };
      const body = {
        message,
        model: context.COHERE_CHAT_MODEL,
        stream: onStream != null,
        preamble: prompt,
        chat_history: history?.map(this.render)
      };
      if (!body.preamble) {
        delete body.preamble;
      }
      const options = {};
      options.streamBuilder = function(r, c) {
        return new Stream(r, c, _Cohere.parser);
      };
      options.contentExtractor = function(data) {
        return data?.text;
      };
      options.fullContentExtractor = function(data) {
        return data?.text;
      };
      options.errorExtractor = function(data) {
        return data?.message;
      };
      return requestChatCompletions(url, header, body, onStream, null, options);
    })), __runInitializers(_init6, 11, this);
  }
  static parser(sse) {
    switch (sse.event) {
      case "text-generation":
        try {
          return { data: JSON.parse(sse.data || "") };
        } catch (e) {
          console.error(e, sse.data);
          return {};
        }
      case "stream-start":
        return {};
      case "stream-end":
        return { finish: true };
      default:
        return {};
    }
  }
};
_init6 = __decoratorStart(null);
__decorateElement(_init6, 5, "request", _request_dec6, _Cohere);
__decoratorMetadata(_init6, _Cohere);
__publicField(_Cohere, "COHERE_ROLE_MAP", {
  assistant: "CHATBOT",
  user: "USER"
});
let Cohere = _Cohere;
_request_dec7 = [Log];
const _Gemini = class _Gemini {
  constructor() {
    __publicField(this, "name", "gemini");
    __publicField(this, "modelKey", "GOOGLE_COMPLETIONS_MODEL");
    __publicField(this, "enable", (context) => {
      return !!context.GOOGLE_API_KEY;
    });
    __publicField(this, "model", (ctx) => {
      return ctx.GOOGLE_COMPLETIONS_MODEL;
    });
    __publicField(this, "render", (item) => {
      return {
        role: _Gemini.GEMINI_ROLE_MAP[item.role],
        parts: [
          {
            text: item.content || ""
          }
        ]
      };
    });
    __publicField(this, "request", __runInitializers(_init7, 8, this, async (params, context, onStream) => {
      const { prompt, history } = params;
      if (onStream !== null) {
        console.warn("Stream mode is not supported");
      }
      const mode = "generateContent";
      const url = `${context.GOOGLE_COMPLETIONS_API}${context.GOOGLE_COMPLETIONS_MODEL}:${mode}`;
      const contentsTemp = [...history || []];
      if (prompt) {
        contentsTemp.unshift({ role: "assistant", content: prompt });
      }
      const contents = [];
      for (const msg of contentsTemp) {
        msg.role = _Gemini.GEMINI_ROLE_MAP[msg.role];
        if (contents.length === 0 || contents[contents.length - 1].role !== msg.role) {
          contents.push(this.render(msg));
        } else {
          contents[contents.length - 1].parts[0].text += msg.content;
        }
      }
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": context.GOOGLE_API_KEY
        },
        body: JSON.stringify({ contents })
      });
      const data = await resp.json();
      try {
        return data.candidates[0].content.parts[0].text;
      } catch (e) {
        console.error(e);
        if (!data) {
          throw new Error("Empty response");
        }
        throw new Error(data?.error?.message || JSON.stringify(data));
      }
    })), __runInitializers(_init7, 11, this);
  }
};
_init7 = __decoratorStart(null);
__decorateElement(_init7, 5, "request", _request_dec7, _Gemini);
__decoratorMetadata(_init7, _Gemini);
__publicField(_Gemini, "GEMINI_ROLE_MAP", {
  assistant: "model",
  system: "user",
  user: "user"
});
let Gemini = _Gemini;
_request_dec8 = [Log];
class Mistral {
  constructor() {
    __publicField(this, "name", "mistral");
    __publicField(this, "modelKey", "MISTRAL_CHAT_MODEL");
    __publicField(this, "enable", (context) => {
      return !!context.MISTRAL_API_KEY;
    });
    __publicField(this, "model", (ctx) => {
      return ctx.MISTRAL_CHAT_MODEL;
    });
    __publicField(this, "render", (item) => {
      return {
        role: item.role,
        content: item.content
      };
    });
    __publicField(this, "request", __runInitializers(_init8, 8, this, async (params, context, onStream) => {
      const { prompt, history } = params;
      const url = `${context.MISTRAL_API_BASE}/chat/completions`;
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.MISTRAL_API_KEY}`
      };
      const messages = [...history || []];
      if (prompt) {
        messages.unshift({ role: context.SYSTEM_INIT_MESSAGE_ROLE, content: prompt });
      }
      const body = {
        model: context.MISTRAL_CHAT_MODEL,
        messages: messages.map(this.render),
        stream: onStream != null
      };
      return requestChatCompletions(url, header, body, onStream);
    })), __runInitializers(_init8, 11, this);
  }
}
_init8 = __decoratorStart(null);
__decorateElement(_init8, 5, "request", _request_dec8, Mistral);
__decoratorMetadata(_init8, Mistral);
class SiliconBase {
  name = "silicon";
  enable = (context) => {
    return !!context.MISTRAL_API_KEY;
  };
}
class Silicon extends (_e = SiliconBase, _request_dec9 = [Log], _e) {
  constructor() {
    super(...arguments);
    __publicField(this, "modelKey", "SILICON_CHAT_MODEL");
    __publicField(this, "enable", (context) => {
      return !!context.SILICON_API_KEY;
    });
    __publicField(this, "model", (ctx) => {
      return ctx.SILICON_CHAT_MODEL;
    });
    __publicField(this, "render", async (item) => {
      return renderOpenAIMessage(item);
    });
    __publicField(this, "request", __runInitializers(_init9, 8, this, async (params, context, onStream) => {
      const { prompt, history, extra_params } = params;
      const url = `${context.SILICON_API_BASE}/chat/completions`;
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.SILICON_API_KEY}`
      };
      const messages = [...history || []];
      if (prompt) {
        if (messages[0]?.role === "tool") {
          messages.shift();
        }
        messages.unshift({ role: context.SYSTEM_INIT_MESSAGE_ROLE, content: prompt });
      }
      const body = {
        model: context.SILICON_CHAT_MODEL,
        messages: await Promise.all(messages.map(this.render)),
        stream: !!onStream,
        ...extra_params,
        ...context.ENABLE_SHOWTOKEN && !!onStream && { stream_options: { include_usage: true } }
      };
      return requestChatCompletions(url, header, body, onStream);
    })), __runInitializers(_init9, 11, this);
  }
}
_init9 = __decoratorStart(_e);
__decorateElement(_init9, 5, "request", _request_dec9, Silicon);
__decoratorMetadata(_init9, Silicon);
class SiliconImage extends (_f = SiliconBase, _request_dec10 = [Log], _f) {
  constructor() {
    super(...arguments);
    __publicField(this, "modelKey", "SILICON_IMAGE_MODEL");
    __publicField(this, "model", (ctx) => {
      return ctx.SILICON_IMAGE_MODEL;
    });
    __publicField(this, "request", __runInitializers(_init10, 8, this, async (prompt, context) => {
      const url = `${context.SILICON_API_BASE}/image/generations`;
      const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.SILICON_API_KEY}`
      };
      const body = {
        prompt,
        image_size: context.SILICON_IMAGE_SIZE,
        model: context.SILICON_IMAGE_MODEL,
        batch_size: 4,
        ...context.SILICON_EXTRA_PARAMS
      };
      return requestText2Image(url, header, body, this.render);
    })), __runInitializers(_init10, 11, this);
    __publicField(this, "render", async (response) => {
      if (response.status !== 200)
        return { type: "image", message: await response.text() };
      const resp = await response.json();
      if (resp.message) {
        return { type: "image", message: resp.message };
      }
      return { type: "image", url: (await resp?.images)?.map((i) => i?.url) };
    });
  }
}
_init10 = __decoratorStart(_f);
__decorateElement(_init10, 5, "request", _request_dec10, SiliconImage);
__decoratorMetadata(_init10, SiliconImage);
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
class WorkersChat extends (_g = WorkerBase, _request_dec11 = [Log], _g) {
  constructor() {
    super(...arguments);
    __publicField(this, "modelKey", "WORKERS_CHAT_MODEL");
    __publicField(this, "model", (ctx) => {
      return ctx.WORKERS_CHAT_MODEL;
    });
    __publicField(this, "render", (item) => {
      return {
        role: item.role,
        content: item.content
      };
    });
    __publicField(this, "request", __runInitializers(_init11, 8, this, async (params, context, onStream) => {
      const { prompt, history } = params;
      const id = context.CLOUDFLARE_ACCOUNT_ID;
      const token = context.CLOUDFLARE_TOKEN;
      const model = context.WORKERS_CHAT_MODEL;
      const url = `https://api.cloudflare.com/client/v4/accounts/${id}/ai/run/${model}`;
      const header = {
        Authorization: `Bearer ${token}`
      };
      const messages = [...history || []];
      if (prompt) {
        messages.unshift({ role: context.SYSTEM_INIT_MESSAGE_ROLE, content: prompt });
      }
      const body = {
        messages: messages.map(this.render),
        stream: onStream !== null
      };
      const options = {};
      options.contentExtractor = function(data) {
        return data?.response;
      };
      options.fullContentExtractor = function(data) {
        return data?.result?.response;
      };
      options.errorExtractor = function(data) {
        return data?.errors?.[0]?.message;
      };
      return requestChatCompletions(url, header, body, onStream, null, options);
    })), __runInitializers(_init11, 11, this);
  }
}
_init11 = __decoratorStart(_g);
__decorateElement(_init11, 5, "request", _request_dec11, WorkersChat);
__decoratorMetadata(_init11, WorkersChat);
class WorkersImage extends (_h = WorkerBase, _request_dec12 = [Log], _h) {
  constructor() {
    super(...arguments);
    __publicField(this, "modelKey", "WORKERS_IMAGE_MODEL");
    __publicField(this, "model", (ctx) => {
      return ctx.WORKERS_IMAGE_MODEL;
    });
    __publicField(this, "request", __runInitializers(_init12, 8, this, async (prompt, context) => {
      const id = context.CLOUDFLARE_ACCOUNT_ID;
      const token = context.CLOUDFLARE_TOKEN;
      if (!id || !token) {
        throw new Error("Cloudflare account ID or token is not set");
      }
      const raw = await this.run(context.WORKERS_IMAGE_MODEL, { prompt }, id, token);
      if (isJsonResponse(raw)) {
        const { result } = await raw.json();
        const image = result?.image;
        if (typeof image !== "string") {
          throw new TypeError("Invalid image response");
        }
        return { type: "image", raw: [await base64StringToBlob(image)] };
      }
      return { type: "image", raw: [await raw.blob()] };
    })), __runInitializers(_init12, 11, this);
  }
}
_init12 = __decoratorStart(_h);
__decorateElement(_init12, 5, "request", _request_dec12, WorkersImage);
__decoratorMetadata(_init12, WorkersImage);
async function base64StringToBlob(base64String) {
  try {
    const { Buffer: Buffer2 } = await import("node:buffer");
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
  new Gemini(),
  new Mistral(),
  new OpenAI(),
  new WorkersChat(),
  new Silicon()
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
  new SiliconImage()
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
    FUNCTION_CALL_MODEL: config.FUNCTION_CALL_MODEL,
    FUNCTION_REPLY_ASAP: config.FUNCTION_REPLY_ASAP,
    FUNC_LOOP_TIMES: ENV.FUNC_LOOP_TIMES,
    FUNC_CALL_TIMES: ENV.CON_EXEC_FUN_NUM,
    EXPIRED_TIME: ENV.EXPIRED_TIME,
    CRON_CHECK_TIME: ENV.CRON_CHECK_TIME
  };
  return JSON.stringify(other_info, null, 2);
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
async function WssRequest(url, protocols, options, messages, handlers) {
  const { WebSocket } = await import("ws");
  let { extractor, formatter, onStream } = handlers;
  return new Promise((resolve) => {
    const ws = new WebSocket(url, options);
    let result = {};
    let streamSender;
    extractor = extractor || perplexityExtractor;
    formatter = formatter || perplexityFormatter;
    let streamIter = null;
    if (onStream) {
      streamIter = new AsyncIter();
      streamSender = iterStream(null, streamIter, extractor, onStream);
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
          result = extracted.content;
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
      closeWss(resolve, result, streamIter, streamSender, extractor);
    });
    ws.on("error", async (e) => {
      console.error(e.message);
      if (streamIter) {
        streamIter.return();
      }
      result.message = `Error: ${e.message}`;
    });
  });
}
async function closeWss(resolve, result, streamIter, streamSender, extractor) {
  let data = "";
  if (streamIter) {
    data = (await streamSender)?.content || "";
    data += `

${extractor.finalAdd(result)}`;
    data += result.message ? `
${result.message}` : "";
  } else {
    data = `${extractor.fullContentExtractor(result)}
${result.message || ""}`;
  }
  log.info("Result:", data.trim());
  resolve(data.trim());
}
function getValidToolStructs(tools) {
  return tools.filter((tool) => tool in ENV.TOOLS).reduce((acc, tool) => {
    acc[tool] = {
      type: "function",
      function: ENV.TOOLS[tool].schema,
      strict: true
    };
    return acc;
  }, {});
}
_exec_dec = [Log];
class FunctionCall {
  constructor(context, vaildTools, history = [], sender = null, agent = new OpenAI("tool")) {
    __runInitializers(_init13, 5, this);
    __publicField(this, "context");
    __publicField(this, "vaildTools");
    __publicField(this, "history");
    __publicField(this, "agent");
    __publicField(this, "sender");
    __publicField(this, "prompt");
    __publicField(this, "default_params", {
      prompt: "##TOOLS\n\nYou can use these tools below:\n\n",
      extra_params: { temperature: 0.5, top_p: 0.4, max_tokens: 100 }
    });
    this.context = context;
    this.vaildTools = vaildTools;
    this.history = history;
    this.agent = agent;
    this.sender = sender;
    this.prompt = context.USER_CONFIG.SYSTEM_INIT_MESSAGE || "";
  }
  validCalls(tool_calls) {
    return tool_calls.filter((i) => i.function.name in this.vaildTools).map((func) => ({
      id: func.id,
      name: func.function.name,
      args: JSON.parse(func.function.arguments)
    }));
  }
  async call(params, onStream) {
    return this.agent.request(params, this.context.USER_CONFIG, onStream);
  }
  async exec(func, env) {
    const controller = new AbortController();
    const { signal } = controller;
    const timeoutId = ENV.FUNC_TIMEOUT > 0 ? setTimeout(() => controller.abort(), ENV.FUNC_TIMEOUT * 1e3) : null;
    const { name, args } = func;
    if (ENV.TOOLS[name]?.ENV_KEY) {
      args[ENV.TOOLS[name].ENV_KEY] = env[ENV.TOOLS[name].ENV_KEY];
    }
    const content = await ENV.TOOLS[name].func(args, signal) || "";
    if (timeoutId) clearTimeout(timeoutId);
    return content;
  }
  async run() {
    let FUNC_LOOP_TIMES = ENV.FUNC_LOOP_TIMES;
    const ASAP = this.context.USER_CONFIG.FUNCTION_REPLY_ASAP;
    const onStream = ENV.STREAM_MODE && this.sender ? OnStreamHander(this.sender, this.context) : null;
    const INTERNAL_ENV = this.extractInternalEnv(["JINA_API_KEY"]);
    const params = this.trimParams(ASAP);
    while (FUNC_LOOP_TIMES !== 0) {
      const llm_resp = await this.call(params, onStream);
      let func_params = this.paramsExtract(llm_resp);
      if (func_params.length === 0) {
        if (ASAP && llm_resp) {
          await this.sendLastResponse(llm_resp, onStream);
          this.history.push(...this.trimMessage(llm_resp));
        }
        return {
          isFinished: true,
          extra_params: params.extra_params,
          prompt: this.prompt
        };
      }
      llm_resp.tool_calls = llm_resp.tool_calls.slice(0, ENV.CON_EXEC_FUN_NUM);
      func_params = func_params.slice(0, ENV.CON_EXEC_FUN_NUM);
      const func_result = await Promise.all(func_params.map((i) => this.exec(i, INTERNAL_ENV)));
      log.debug("func_result:", func_result);
      this.history.push(...this.trimMessage(llm_resp, func_result));
      FUNC_LOOP_TIMES--;
    }
    return {
      isFinished: false,
      extra_params: params.extra_params,
      prompt: this.prompt
    };
  }
  trimParams(ASAP) {
    const toolDetails = Object.entries(this.vaildTools);
    const toolPrompts = toolDetails.map(([k, v]) => `##${k}

###${v.function.description}

####${ENV.TOOLS[k]?.prompt || ""}`).join("\n\n");
    this.prompt += `

${this.default_params.prompt}${toolPrompts}`;
    const params = {
      history: this.history,
      prompt: this.prompt,
      extra_params: {
        tools: toolDetails.map(([, v]) => v),
        tool_choice: "auto",
        ...this.default_params.extra_params
      }
    };
    if (ASAP && params.extra_params?.max_tokens) {
      delete params.extra_params.max_tokens;
    }
    log.debug("params:", params);
    return params;
  }
  extractInternalEnv(keys) {
    return keys.reduce((acc, key) => {
      acc[key] = this.context.USER_CONFIG[key];
      return acc;
    }, {});
  }
  async sendLastResponse(llm_resp, onStream) {
    if (onStream) {
      const nextTime = onStream.nextEnableTime?.() ?? 0;
      if (nextTime > Date.now()) {
        await new Promise((resolve) => setTimeout(resolve, nextTime - Date.now()));
      }
      await onStream(llm_resp.content, true);
    } else if (this.sender) {
      await this.sender.sendRichText(`${getLog(this.context.USER_CONFIG)}
${llm_resp.content}`, ENV.DEFAULT_PARSE_MODE, "chat");
    }
  }
  paramsExtract(llm_resp) {
    return this.validCalls(llm_resp?.tool_calls || []);
  }
  trimMessage(llm_content, func_result) {
    const llm_result = [{ role: "assistant", content: llm_content.content, tool_calls: llm_content.tool_calls }];
    if (!func_result) {
      return llm_result;
    }
    log.debug("func_result length:", func_result.length);
    llm_result.push(...func_result.map((content, index2) => ({
      role: "tool",
      content,
      name: llm_content.tool_calls[index2].function.name,
      tool_call_id: llm_content.tool_calls[index2].id
    })));
    return llm_result;
  }
}
_init13 = __decoratorStart(null);
__decorateElement(_init13, 1, "exec", _exec_dec, FunctionCall);
__decoratorMetadata(_init13, FunctionCall);
async function messageInitialize(sender) {
  if (!sender.context.message_id) {
    try {
      setTimeout(() => sendAction(sender.api.token, sender.context.chat_id, "typing"), 0);
      if (!ENV.SEND_INIT_MESSAGE) {
        return;
      }
      log.info(`send init message`);
      const response = await sender.sendPlainText("...", "chat");
      const msg = await response.json();
      log.info(`send init message done`);
      sender.update({
        message_id: msg.result.message_id
      });
    } catch (e) {
      console.error("Failed to initialize message:", e);
    }
  }
}
async function chatWithLLM(message, params, context, modifier) {
  const sender = context.MIDDEL_CONTEXT.sender ?? MessageSender.from(context.SHARE_CONTEXT.botToken, message);
  await messageInitialize(sender);
  let onStream = null;
  if (ENV.STREAM_MODE) {
    onStream = OnStreamHander(sender, context);
  }
  if (params?.extra_params?.agent) {
    context.USER_CONFIG.AI_PROVIDER = params.extra_params.agent;
  }
  const agent = loadChatLLM(context.USER_CONFIG);
  if (!agent) {
    return sender.sendPlainText("LLM is not enabled");
  }
  try {
    log.info(`start chat with LLM`);
    const answer = await requestCompletionsFromLLM(params, context, agent, modifier, onStream);
    log.info(`chat with LLM done`);
    if (onStream) {
      const nextTime = onStream.nextEnableTime?.() ?? 0;
      if (nextTime > Date.now()) {
        await new Promise((resolve) => setTimeout(resolve, nextTime - Date.now()));
      }
      log.info(`send chat end message via stream`);
      await onStream(answer.content, true);
    } else {
      log.info(`send chat end message via rich text`);
      await sender.sendRichText(
        `${getLog(context.USER_CONFIG)}
${answer.content}`,
        ENV.DEFAULT_PARSE_MODE,
        "chat"
      );
    }
    return { type: "text", text: answer.content };
  } catch (e) {
    let errMsg = `Error: `;
    if (e.name === "AbortError") {
      errMsg += "Chat with LLM timeout";
    } else {
      errMsg += e.message.slice(0, 2048);
    }
    return sender.sendRichText(`${getLog(context.USER_CONFIG)}
${errMsg}`);
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
      if (originalType === "text" && !flowDetail?.disableTool) {
        context.MIDDEL_CONTEXT.sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
        try {
          const toolResult = await useTools(context, context.MIDDEL_CONTEXT.history, context.MIDDEL_CONTEXT.sender);
          if (toolResult instanceof Response || toolResult?.isFinished && context.USER_CONFIG.FUNCTION_REPLY_ASAP) {
            return null;
          }
          if (toolResult?.prompt) {
            params.prompt = toolResult.prompt;
          }
          if (toolResult?.extra_params) {
            params.extra_params = {
              ...toolResult.extra_params
            };
          }
        } catch (error) {
          console.error("Error:", error);
          let errMsg = "⚠️";
          if (error.name === "AbortError") {
            errMsg += "Function call timeout";
          } else {
            errMsg += error.message.slice(0, 30);
          }
          getLogSingleton(context.USER_CONFIG).error = errMsg;
        }
      }
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
    const { type, id, text } = context.MIDDEL_CONTEXT.originalMessage;
    const params = {
      message: text || "",
      extra_params: {}
    };
    if ((type === "image" || type === "audio") && id) {
      const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
      const files = await Promise.all(id.map((i) => api.getFileWithReturns({ file_id: i })));
      const paths = files.map((f) => f.result.file_path).filter(Boolean);
      const urls = paths.map((p) => `https://api.telegram.org/file/bot${context.SHARE_CONTEXT.botToken}/${p}`);
      log.info(`File URLs:
${urls.join("\n")}`);
      if (type === "audio") {
        params.audio = [await fetch(urls[0]).then((r) => r.blob())];
        params.message = urls[0].split("/").pop() || "audio.oga";
      } else if (urls.length > 0) {
        params.images = urls;
      }
    }
    if (["text", "image"].includes(type)) {
      context.MIDDEL_CONTEXT.history.push({
        role: "user",
        content: params.message || "",
        ...params.images && { images: params.images }
      });
    }
    return params;
  }
}
function OnStreamHander(sender, context) {
  let nextEnableTime = Date.now();
  async function onStream(text, isEnd = false) {
    try {
      if (isEnd && context && ENV.TELEGRAPH_NUM_LIMIT > 0 && text.length > ENV.TELEGRAPH_NUM_LIMIT && ["group", "supergroup"].includes(sender.context.chatType)) {
        return sendTelegraph(context, sender, context.MIDDEL_CONTEXT.originalMessage.text || "Redo", text);
      }
      if (!isEnd && nextEnableTime && nextEnableTime > Date.now()) {
        log.info(`Need await: ${nextEnableTime - Date.now()}ms`);
        return;
      }
      if (ENV.TELEGRAM_MIN_STREAM_INTERVAL > 0) {
        nextEnableTime = Date.now() + ENV.TELEGRAM_MIN_STREAM_INTERVAL;
      }
      const data = context ? `${getLog(context.USER_CONFIG)}
${text}` : text;
      log.info(`send ${isEnd ? "end" : "stream"} message`);
      const resp = await sender.sendRichText(data, ENV.DEFAULT_PARSE_MODE, "chat");
      if (resp.status === 429) {
        const retryAfter = Number.parseInt(resp.headers.get("Retry-After") || "");
        if (retryAfter) {
          nextEnableTime = Date.now() + retryAfter * 1e3;
          log.info(`Status 429, need wait: ${nextEnableTime - Date.now()}ms`);
          return;
        }
      }
      if (resp.ok && sender instanceof MessageSender) {
        const respJson = await resp.json();
        sender.update({
          message_id: respJson.result.message_id
        });
      } else if (!resp.ok) {
        log.error(`send message failed: ${resp.status} ${resp.statusText}`);
        return sender.sendPlainText(text);
      }
    } catch (e) {
      console.error(e);
    }
  }
  onStream.nextEnableTime = () => nextEnableTime;
  onStream.end = async (text) => {
    if (nextEnableTime > Date.now()) {
      await new Promise((resolve) => setTimeout(resolve, nextEnableTime - Date.now()));
    }
    return sender.sendRichText(text, ENV.DEFAULT_PARSE_MODE);
  };
  return onStream;
}
async function sendTelegraph(context, sender, question, text) {
  log.info(`send telegraph`);
  const prefix = `#Question
\`\`\`
${question.length > 400 ? `${question.slice(0, 200)}...${question.slice(-200)}` : question}
\`\`\`
---`;
  const botName = context.SHARE_CONTEXT.botName;
  const telegraph_prefix = `${prefix}
#Answer
🤖 **${getLog(context.USER_CONFIG, true)}**
`;
  const debug_info = `debug info:
${getLog(context.USER_CONFIG)}`;
  const telegraph_suffix = `
---
\`\`\`
${debug_info}
\`\`\``;
  const telegraphSender = new TelegraphSender(sender.context, botName, context.SHARE_CONTEXT.telegraphAccessTokenKey);
  const resp = await telegraphSender.send(
    "Daily Q&A",
    telegraph_prefix + text + telegraph_suffix
  );
  const url = `https://telegra.ph/${telegraphSender.teleph_path}`;
  const msg = `回答已经转换成完整文章~
[🔗点击进行查看](${url})`;
  await sender.sendRichText(msg);
  return resp;
}
function clearMessageContext(context) {
  clearLog(context.USER_CONFIG);
  context.MIDDEL_CONTEXT.sender = null;
}
async function useTools(context, history, sender) {
  const validTools = getValidToolStructs(context.USER_CONFIG.USE_TOOLS);
  if (Object.keys(validTools).length === 0) {
    return null;
  }
  const ASAP = context.USER_CONFIG.FUNCTION_REPLY_ASAP;
  if (ASAP) {
    await messageInitialize(sender);
  }
  return await new FunctionCall(context, validTools, history, ASAP ? sender : null).run();
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
    if (i > 0) {
      params = {
        extra_params: {}
      };
    }
    for (const key in flows[i]) {
      if (["type", "agent"].includes(key)) {
        continue;
      }
      params[key] = flows[i][key];
    }
    const handlerKey = `${eMsg?.type || "text"}:${flows[i]?.type || "text"}`;
    const handler = workflowHandlers[handlerKey];
    if (!handler) {
      throw new Error(`Unsupported type: ${handlerKey}`);
    }
    const result = await handler(eMsg, message, params, context);
    if (result instanceof Response) {
      return result;
    }
    if (i < flows.length - 1 && ["image", "text"].includes(result?.type)) {
      injectHistory(context, result, flows[i + 1].type);
    }
    MiddleResult.push(result);
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
  const msg = await sender.sendPlainText("Please wait a moment...", "tip").then((r) => r.json());
  const result = await agent.request(eMsg.text, context.USER_CONFIG);
  log.info("imageresult", JSON.stringify(result));
  await sendImages(result, ENV.SEND_IMAGE_FILE, sender, context.USER_CONFIG);
  const api = createTelegramBotAPI(context.SHARE_CONTEXT.botToken);
  await api.deleteMessage({ chat_id: sender.context.chat_id, message_id: msg.result.message_id });
  return result;
}
async function handleAudioToText(eMsg, message, params, context) {
  const agent = loadAudioLLM(context.USER_CONFIG);
  const sender = MessageSender.from(context.SHARE_CONTEXT.botToken, message);
  if (!agent) {
    return sender.sendPlainText("ERROR: Audio agent not found");
  }
  const result = await agent.request(params.audio[0], context.USER_CONFIG, params.message);
  context.MIDDEL_CONTEXT.history.push({ role: "user", content: result.text || "" });
  await sender.sendRichText(`${getLog(context.USER_CONFIG)}
> \`${result.text}\``, "MarkdownV2", "chat");
  return result;
}
async function sendImages(img, SEND_IMAGE_FILE, sender, config) {
  const caption = img.text ? `${getLog(config)}
> \`${img.text}\`` : getLog(config);
  if (img.url && img.url.length > 1) {
    const images = img.url.map((url) => ({
      type: SEND_IMAGE_FILE ? "file" : "photo",
      media: url
    }));
    images[0].caption = caption;
    return await sender.sendMediaGroup(images);
  } else if (img.url || img.raw) {
    return await sender.sendPhoto((img.url || img.raw)[0], caption, "MarkdownV2");
  } else {
    return sender.sendPlainText("ERROR: No image found");
  }
}
function injectHistory(context, result, nextType = "text") {
  if (context.MIDDEL_CONTEXT.history.at(-1)?.role === "user" || nextType !== "text") return;
  context.MIDDEL_CONTEXT.history.push({ role: "user", content: result.text || "", ...result.url && result.url.length > 0 && { images: result.url } });
}
function isTelegramChatTypeGroup(type) {
  return type === "group" || type === "supergroup";
}
function extractMessage(message, currentBotId) {
  const acceptMsgType = ENV.ENABLE_FILE ? ["document", "photo", "voice", "audio", "text"] : ["text"];
  const messageData = extractTypeFromMessage(message, acceptMsgType);
  if (messageData && messageData.type === "text" && isNeedGetReplyMessage(message, currentBotId)) {
    const {
      type,
      id
    } = extractTypeFromMessage(message.reply_to_message, acceptMsgType) || {};
    if (type && type !== "text")
      messageData.type = type;
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
        const type = message.document?.mime_type?.match(/(audio|image)/)?.[1];
        if (!type) {
          return null;
        }
        msgType = type;
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
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
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
    const mf = (history, text) => {
      let nextText = text;
      if (!(history && Array.isArray(history) && history.length > 0)) {
        throw new Error("History not found");
      }
      const historyCopy = structuredClone(history);
      while (true) {
        const data = historyCopy.pop();
        if (data === void 0 || data === null) {
          break;
        } else if (data.role === "user") {
          if (text === "" || text === void 0 || text === null) {
            nextText = data.content || null;
          }
          break;
        }
      }
      if (subcommand) {
        nextText = subcommand;
      }
      return { history: historyCopy, message: nextText };
    };
    if (context.MIDDEL_CONTEXT.history.length === 0) {
      context.MIDDEL_CONTEXT.history = await loadHistory(context.SHARE_CONTEXT.chatHistoryKey);
    }
    return chatWithLLM(message, { message: "" }, context, mf);
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
  handle = async (message, subcommand, context, sender) => {
    try {
      if (!subcommand) {
        const detailSet = ENV.I18N.command?.detail?.set || "Default detailed information";
        return sender.sendRichText(`\`\`\`plaintext
${detailSet}
\`\`\``, "MarkdownV2");
      }
      const { keys, values } = this.parseMappings(context);
      const { flags, remainingText } = this.tokenizeSubcommand(subcommand);
      const needUpdate = !remainingText;
      let msg = "";
      let hasKey = false;
      if (context.USER_CONFIG.AI_PROVIDER === "auto") {
        context.USER_CONFIG.AI_PROVIDER = "openai";
      }
      for (const { flag, value } of flags) {
        const result = await this.processSubcommand(flag, value, keys, values, context, sender);
        if (result instanceof Response) {
          return result;
        }
        if (!hasKey && result) {
          hasKey = true;
        }
      }
      if (needUpdate && hasKey && context.SHARE_CONTEXT?.configStoreKey) {
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
    const regex = /(-\w+)\s+(".*?"|\S+)/g;
    const flags = [];
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(subcommand)) !== null) {
      const flag = match[1];
      let value = match[2];
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      flags.push({ flag, value });
      lastIndex = regex.lastIndex;
    }
    const remainingText = subcommand.slice(lastIndex).trim();
    return { flags, remainingText };
  }
  async processSubcommand(flag, value, keys, values, context, sender) {
    let hasKey = false;
    let key = keys[flag];
    let mappedValue = values[value] ?? value;
    if (!key) {
      return sender.sendPlainText(`Mapping Key ${flag} not found`);
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
          mappedValue = Object.keys(ENV.TOOLS);
        } else if (value === "off") {
          mappedValue = [];
        }
        break;
    }
    if (!(key in context.USER_CONFIG)) {
      return sender.sendPlainText(`Key ${key} not found`);
    }
    context.USER_CONFIG[key] = mappedValue;
    if (!context.USER_CONFIG.DEFINE_KEYS.includes(key)) {
      context.USER_CONFIG.DEFINE_KEYS.push(key);
    }
    log.info(`/set ${key} ${(JSON.stringify(mappedValue) || value).substring(0, 100)}...`);
    hasKey = true;
    return hasKey;
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
    const resp = await (await sender.sendRichText("Perplexity is asking...")).json();
    sender.update({
      message_id: resp.result.message_id
    });
    const onStream = OnStreamHander(sender, context);
    const logs = getLogSingleton(context.USER_CONFIG);
    logs.chat.model.push(`Perplexity ${mode}`);
    const startTime = Date.now();
    const result = await WssRequest(perplexityWsUrl, null, perplexityWsOptions, perplexityMessage, { onStream }).catch(console.error);
    logs.chat.time.push(`${((Date.now() - startTime) / 1e3).toFixed(1)}s`);
    const nextTime = onStream.nextEnableTime?.() ?? 0;
    if (nextTime > Date.now()) {
      await new Promise((resolve) => setTimeout(resolve, nextTime - Date.now()));
    }
    await onStream(result, true);
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
      text: escape(currentSettings),
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
      INLINE_FUNCTION_CALL_MODELS: {
        label: "Function Model",
        data: "INLINE_FUNCTION_CALL_MODELS",
        config_key: "FUNCTION_CALL_MODEL",
        available_values: context.INLINE_FUNCTION_CALL_MODELS
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
    let prompt = subcommand.trim();
    let number = context.USER_CONFIG.KLINGAI_IMAGE_COUNT;
    const match = /^\d+/.exec(prompt);
    if (match) {
      number = Number.parseInt(match[0]);
      prompt = prompt.slice(match[0].length);
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
        { name: "prompt", value: prompt },
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
    const startTime = Date.now();
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
      if (Date.now() - startTime > MAX_WAIT_TIME) {
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
    if (command.needAuth) {
      const roleList = command.needAuth(message.chat.type);
      if (roleList) {
        const chatRole = await loadChatRoleWithContext(message, context);
        if (chatRole === null) {
          return sender.sendPlainText("ERROR: Get chat role failed");
        }
        if (!roleList.includes(chatRole)) {
          return sender.sendPlainText(`ERROR: Permission denied, need ${roleList.join(" or ")}`);
        }
      }
    }
  } catch (e) {
    return sender.sendPlainText(`ERROR: ${e.message}`);
  }
  const subcommand = raw.substring(command.command.length).trim();
  try {
    return await command.handle(message, subcommand, context, sender);
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
    const { type, content } = await executeRequest(template, {
      DATA,
      ENV: ENV.PLUGINS_ENV
    });
    if (type === "image") {
      sendAction(context.SHARE_CONTEXT.botToken, message.chat.id, "upload_photo");
      return sender.sendPhoto(content);
    }
    sendAction(context.SHARE_CONTEXT.botToken, message.chat.id, "typing");
    switch (type) {
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
  const result = {};
  for (const scope in scopeCommandMap) {
    result[scope] = {
      commands: scopeCommandMap[scope],
      scope: {
        type: scope
      }
    };
  }
  return result;
}
function commandsDocument() {
  return SYSTEM_COMMANDS.map((command) => {
    return {
      command: command.command,
      description: ENV.I18N.command.help[command.command.substring(1)] || ""
    };
  }).filter((item) => item.description !== "");
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
  constructor(token, USER_CONFIG) {
    this.USER_CONFIG = USER_CONFIG;
    this.botToken = token;
    this.MIDDEL_CONTEXT = {
      originalMessage: { type: "text" }
    };
  }
  static async from(token, chosenInline) {
    const USER_CONFIG = { ...ENV.USER_CONFIG };
    let userConfigKey = `user_config:${chosenInline.from.id}`;
    const botId = Number.parseInt(token.split(":")[0]);
    if (botId) {
      userConfigKey += `:{botId}`;
    }
    try {
      const userConfig = JSON.parse(await ENV.DATABASE.get(userConfigKey));
      ConfigMerger.merge(USER_CONFIG, ConfigMerger.trim(userConfig, ENV.LOCK_USER_CONFIG_KEYS) || {});
      USER_CONFIG.ENABLE_SHOWINFO = false;
    } catch (e) {
      console.warn(e);
    }
    return new ChosenInlineWorkerContext(token, USER_CONFIG);
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
  if (Object.keys(ENV.CHAT_MESSAGE_TRIGGER).length === 0) {
    return false;
  }
  const triggerKeyValue = Object.entries(ENV.CHAT_MESSAGE_TRIGGER).find(
    ([key]) => (message?.text || message?.caption || "").startsWith(key)
  );
  if (triggerKeyValue) {
    if (message.text) {
      message.text = message.text.replace(...triggerKeyValue);
    } else if (message.caption) {
      message.caption = message.caption.replace(...triggerKeyValue);
    }
  }
  return !!triggerKeyValue;
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
    if (substituteMention && !isMention && !context.SHARE_CONTEXT.isForwarding) {
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
    const OnStream = OnStreamHander(sender, context);
    const resp = await agent.request({
      history: [{ role: "user", content: question }],
      prompt: context.USER_CONFIG.SYSTEM_INIT_MESSAGE
    }, context.USER_CONFIG, isStream ? OnStream : null);
    return OnStream.end?.(resp.content);
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
      if (ENV.HISTORY_IMAGE_PLACEHOLDER && userMessage?.images && userMessage.images.length > 0) {
        delete userMessage.images;
        userMessage.content = `${ENV.HISTORY_IMAGE_PLACEHOLDER}
${userMessage.content}`;
      }
      await ENV.DATABASE.put(historyKey, JSON.stringify(history)).catch(console.error);
    }
    return null;
  };
}
class TagNeedDelete {
  handle = async (message, context) => {
    if (!sentMessageIds.get(message) || sentMessageIds.get(message)?.length === 0) {
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
      id: sentMessageIds.get(message) || [],
      ttl: Date.now() + offsetInMillisenconds
    });
    await ENV.DATABASE.put(scheduleDeteleKey, JSON.stringify(scheduledData));
    log.info(`[TAG MESSAGE] Record chat ${chatId}, message ids: ${sentMessageIds.get(message) || []}`);
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
    const type = Array.isArray(oldValue) ? "array" : typeof oldValue;
    switch (type) {
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
      text: escape(text),
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
        const QSTASH_REQUEST_URL = `${ENV.QSTASH_URL}/v2/publish/${ENV.QSTASH_PUBLISH_URL}`;
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
    for (const handler of SHARE_HANDLER) {
      const result = await handler.handle(message, context);
      if (result) {
        break;
      }
    }
    for (const handler of exitHanders) {
      const result = await handler.handle(message, context);
      if (result && result instanceof Response) {
        return result;
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
    for (const handler of handlers) {
      const result2 = await handler.handle(callbackQuery.message, workContext);
      if (result2 instanceof Response) {
        return result2;
      }
    }
    const callbackQueryContext = new CallbackQueryContext(callbackQuery, workContext);
    const result = await new HandlerCallbackQuery().handle(callbackQuery.message, callbackQueryContext);
    if (result instanceof Response) {
      return result;
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
    for (const handler of handlers) {
      const result = await handler.handle(inlineQuery, context);
      if (result instanceof Response) {
        return result;
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
    for (const handler of handlers) {
      const result = await handler.handle(chosenInlineQuery, context);
      if (result instanceof Response) {
        return result;
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
  async fetch(request, ...args) {
    try {
      const url = new URL(request.url);
      const reqMethod = request.method.toUpperCase();
      request.query = this.parseQueryParams(url.searchParams);
      for (const [method, regex, handlers, path] of this.routes) {
        let match = null;
        if ((method === reqMethod || method === "ALL") && (match = url.pathname.match(regex))) {
          request.params = match?.groups || {};
          request.route = path;
          for (const handler of handlers) {
            const response = await handler(request, ...args);
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
  const result = {};
  const domain = new URL(request.url).host;
  const hookMode = ENV.API_GUARD ? "safehook" : "webhook";
  const scope = commandsBindScope();
  for (const token of ENV.TELEGRAM_AVAILABLE_TOKENS) {
    const api = createTelegramBotAPI(token);
    const url = `https://${domain}/telegram/${token.trim()}/${hookMode}`;
    console.log("webhook url: ", url);
    const id = token.split(":")[0];
    result[id] = {};
    result[id].webhook = await api.setWebhook({ url }).then((res) => res.json()).catch((e) => errorToString(e));
    for (const [s, data] of Object.entries(scope)) {
      result[id][s] = await api.setMyCommands(data).then((res) => res.json()).catch((e) => errorToString(e));
    }
  }
  let html = `<h1>ChatGPT-Telegram-Workers</h1>`;
  html += `<h2>${domain}</h2>`;
  if (ENV.TELEGRAM_AVAILABLE_TOKENS.length === 0) {
    html += `<p style="color: red">Please set the <strong> TELEGRAM_AVAILABLE_TOKENS </strong> environment variable in Cloudflare Workers.</p> `;
  } else {
    for (const [key, res] of Object.entries(result)) {
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
    const options = {
      method,
      headers,
      ...body ? { body } : {}
    };
    const response = await fetch(`${this.baseUrl}/${endpoint}`, options);
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
export {
  index as default
};
