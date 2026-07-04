# 图片编辑功能完整指南

**更新时间：** 2026-02-23

---

## 快速开始

### 支持的 Agents

| Agent | 生成 | 编辑 | 遮罩 | 编辑模式 | 新功能 | 推荐场景 |
|-------|------|------|------|----------|--------|------------|
| **Google** | ✅ | ✅ | ❌ | 隐式 | 4K分辨率、Google Search | 快速编辑、实时数据可视化 |
| **Vertex** | ✅ | ✅ | ✅ | 6种显式 | - | 专业编辑、精确控制 |
| **OpenAI** | ✅ | ✅ | ✅ | 隐式 | - | 平衡性能、DALL-E 3生成 |
| **xAI** | ✅ | ✅ | ❌ | 隐式 | 视频生成、图生视频、视频编辑 | 图片编辑、视频创作 |
| **BFL (FLUX)** | ✅ | ✅ | ✅ | 隐式 | 多参考图（最多10张）、inpainting | 高质量生成、风格迁移、多参考图编辑 |

### Telegram 使用

```
# 生成图片
/img 一只可爱的小狗在花园里

# 编辑图片（回复图片）
[回复图片] /img 让它更丰富多彩
```

---

## 1. Google Generative AI

### 配置
```env
GOOGLE_API_KEY=your-api-key
GOOGLE_IMAGE_MODEL=gemini-2.5-flash-image

# Gemini 3 Pro Image 新功能（gemini-3-pro-image-preview）
GOOGLE_IMAGE_MODEL=gemini-3-pro-image-preview

# 可选：宽高比设置（"1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"）
GOOGLE_IMAGE_ASPECT_RATIO=16:9

# 可选：分辨率设置（"1K", "2K", "4K"）
GOOGLE_IMAGE_SIZE=4K

# 可选：启用 Google Search grounding（实时数据：天气、股票、新闻）
GOOGLE_IMAGE_ENABLE_GOOGLE_SEARCH=true

# 可选：gemini-3.1-flash-image 的思考深度（默认 "minimal", 或 "high"）
GOOGLE_IMAGE_THINKING_LEVEL=high
```

### 特点
- ✅ 简单快速
- ✅ 对话式迭代编辑
- ✅ 多图合成（最多14张）
- ❌ 不支持遮罩

### Gemini 3 Pro Image 新功能 ⭐
**模型：** `gemini-3-pro-image-preview`

#### 高分辨率输出
- 支持 **1K、2K、4K** 三种分辨率
- 专业资产生产优化
- Token 消耗：1K ≈ 1120 tokens，4K ≈ 2000 tokens

#### 灵活宽高比
支持 10 种宽高比：
- 方形：`1:1`
- 竖屏：`2:3`, `3:4`, `4:5`, `9:16`
- 横屏：`3:2`, `4:3`, `5:4`, `16:9`, `21:9`

#### Google Search Grounding（实时数据）
启用后可生成基于实时信息的图片：
- 📰 当前新闻事件
- 🌤️ 实时天气地图
- 📈 最新股票图表
- 🗺️ 地理数据可视化
- 🖼️ 图片搜索和生成

**基础配置：**
```env
GOOGLE_IMAGE_ENABLE_GOOGLE_SEARCH=true
```

**高级配置：**
```env
# 启用网页搜索（默认：true）
GOOGLE_SEARCH_ENABLE_WEB_SEARCH=true

# 启用图片搜索，仅支持图片模型（默认：false）
GOOGLE_SEARCH_ENABLE_IMAGE_SEARCH=true

# 时间范围过滤（ISO 8601 格式）
GOOGLE_SEARCH_TIME_RANGE_FILTER='{"startTime": "2025-01-01T00:00:00Z", "endTime": "2025-12-31T23:59:59Z"}'
```

**功能特性：**
- **网页搜索**：搜索实时信息以增强图片生成
- **图片搜索**：搜索参考图片并将其融入生成过程
- **时间范围过滤**：将搜索结果限制在特定时间段内

示例提示词：
```
# 基础实时数据
/img 生成今天台北的天气预报信息图
/img 创建一个展示过去一周特斯拉股价的图表

# 图片搜索 + 生成
/img 搜索2026年超级碗中场秀的照片，并创建一个太空主题版本

# 时间过滤搜索
/img 创建一张关于2026年1月重大科技事件的信息图
```

#### 高级文本渲染
- 生成清晰、风格化的文本
- 适用于：信息图、菜单、图表、营销素材

#### Thinking Mode（推理模式）
- 模型会进行"思考"过程
- 生成中间"思考图像"（后端可见，不计费，已自动从返回结果中排除）
- 优化最终高质量输出
- 可通过 `GOOGLE_IMAGE_THINKING_LEVEL=minimal`（默认，最快）或 `high`（更深推理，延迟更高）控制思考深度，仅 gemini-3.1-flash-image 支持（稳定版，取代此前的 `gemini-3.1-flash-image-preview`）

#### 更多参考图像
- 支持最多 **14 张参考图像**
- 可混合：最多 6 个物体 + 5 个人物图像

### 使用示例
```
# 基础编辑
[回复图片] /img 让颜色更鲜艳
[回复图片] /img 将背景换成海滩

# Gemini 3 Pro Image - 高分辨率 + 宽高比
# 配置：GOOGLE_IMAGE_SIZE=4K, GOOGLE_IMAGE_ASPECT_RATIO=16:9
/img 一个未来科技城市的全景图

# Google Search - 实时数据
# 配置：GOOGLE_IMAGE_ENABLE_GOOGLE_SEARCH=true
/img 制作一张展示今天全球主要股市表现的信息图
/img 生成一个包含最新AI技术趋势的可视化图表
```

### 模型对比

| 功能 | gemini-2.5-flash-image | gemini-3-pro-image-preview |
|------|----------------------|---------------------------|
| 生成/编辑 | ✅ | ✅ |
| 分辨率 | 默认 | 1K/2K/4K 可选 |
| 宽高比 | 有限 | 10 种选择 |
| Google Search | ❌ | ✅ |
| 高级文本 | 基础 | 专业级 |
| Thinking Mode | ❌ | ✅ |
| 参考图像 | 14张 | 14张（6物体+5人物）|
| 推荐场景 | 快速迭代 | 专业资产制作 |

---

## 2. Vertex AI（功能最强大）

### 配置
```env
VERTEX_PROJECT_ID=your-project-id
VERTEX_IMAGE_MODEL=imagen-3.0-capability-001  # 编辑专用
VERTEX_CREDENTIALS={"client_email":"...","private_key":"..."}
```

### 智能模型选择

代码会**自动选择**正确的模型：
- 有引用图片 → 强制使用 `imagen-3.0-capability-001`（唯一支持编辑）
- 纯生成 → 使用配置的模型（可以是 `imagen-4.0-fast-generate-001`）

### 模型对比

| 模型 | 编辑 | 生成 | 推荐用途 |
|------|------|------|---------|
| **imagen-3.0-capability-001** | ✅ | ✅ | **必须用于编辑** |
| imagen-4.0-fast-generate-001 | ❌ | ✅ | 快速生成（不支持编辑） |

### 6种编辑模式

#### 智能默认模式选择
- **有 mask 图片时**：默认使用 `EDIT_MODE_INPAINT_INSERTION`（精确 inpainting）
- **无 mask 图片时**：默认使用 `EDIT_MODE_CONTROLLED_EDITING`（通用受控编辑）

#### 1. EDIT_MODE_CONTROLLED_EDITING（Telegram 默认）
通用受控编辑，不需要 mask
```json
{
  "agent": "vertex",
  "prompts": ["将背景改成蓝色"],
  "referenceImages": ["base64..."],
  "editMode": "EDIT_MODE_CONTROLLED_EDITING"
}
```

#### 2. EDIT_MODE_INPAINT_INSERTION（有 mask 时默认）
插入新对象或内容（需要 mask）
```json
{
  "agent": "vertex",
  "prompts": ["在桌子上添加一个红色的苹果"],
  "referenceImages": ["base64..."],
  "editMode": "EDIT_MODE_INPAINT_INSERTION",
  "mask": "base64_mask"
}
```

#### 3. EDIT_MODE_INPAINT_REMOVAL
移除对象
```json
{
  "editMode": "EDIT_MODE_INPAINT_REMOVAL",
  "prompts": ["移除图片中的所有人"]
}
```

#### 4. EDIT_MODE_OUTPAINT
扩展图片边界
```json
{
  "editMode": "EDIT_MODE_OUTPAINT",
  "prompts": ["向右扩展，添加更多森林"]
}
```

#### 5. EDIT_MODE_PRODUCT_IMAGE
产品图片优化
```json
{
  "editMode": "EDIT_MODE_PRODUCT_IMAGE",
  "prompts": ["将产品放在白色背景上"]
}
```

#### 6. EDIT_MODE_BGSWAP
背景替换
```json
{
  "editMode": "EDIT_MODE_BGSWAP",
  "prompts": ["将背景换成海滩日落"]
}
```

### 高级参数

#### maskMode（遮罩模式）
- `MASK_MODE_USER_PROVIDED` - 手动提供遮罩
- `MASK_MODE_DETECTION_BOX` - 自动检测边界框
- `MASK_MODE_CLOTHING_AREA` - 服装区域分割
- `MASK_MODE_PARSED_PERSON` - 人体解析

#### maskDilation（遮罩扩张）
```json
{
  "maskDilation": 0.01  // 0-1，推荐 0.01
}
```

#### negativePrompt（负面提示）
```json
{
  "negativePrompt": "模糊、低质量、变形、多余的腿"
}
```

#### baseSteps（生成步数）
```json
{
  "baseSteps": 60  // 35-75，越高质量越好
}
```

### 遮罩制作

遮罩是黑白图片：
- **白色（255,255,255）** = 要编辑的区域
- **黑色（0,0,0）** = 保持不变

---

## 3. OpenAI/DALL-E

### 配置
```env
OPENAI_API_KEY=your-api-key
DALL_E_MODEL=dall-e-2  # 或 dall-e-3, gpt-image-1
```

### 智能模型选择

代码会**自动调整**：
- dall-e-3 编辑时 → 自动降级到 dall-e-2
- 其他模型 → 按配置使用

### 支持的模型

| 模型 | 编辑 | 生成 | 每次最多 | 推荐 |
|------|------|------|----------|------|
| dall-e-2 | ✅ | ✅ | 10张 | ✅ 平衡 |
| dall-e-3 | ❌→✅ | ✅ | 1张 | 高质量生成 |
| gpt-image-1 | ✅ | ✅ | 10张 | ✅ 快速 |
| gpt-image-1-mini | ✅ | ✅ | 10张 | ✅ 最快 |

### 特点
- ✅ 支持遮罩（inpainting）
- ✅ 自动模型降级（dall-e-3→dall-e-2）
- ✅ 双实现（编辑用AI SDK，生成用原API）

---

## 4. xAI (Grok Imagine)

### 配置
```env
XAI_API_KEY=your-api-key
XAI_IMAGE_MODEL=grok-imagine-image  # 新版图片生成和编辑模型
```

### 特点
- ✅ 文本生成图片
- ✅ **图片编辑（Image-to-Image）** - 现已支持！
- ✅ 支持宽高比（aspectRatio）
- ✅ **视频生成（通过 xai_video 工具）**
- ✅ **图生视频（Image-to-Video）**
- ✅ **视频编辑（Video-to-Video）**
- ❌ 无遮罩支持
- ❌ 无显式编辑模式

### 图片功能

#### 模型
- `grok-2-image` - 旧版图片生成模型
- `grok-imagine-image` - **新版图片生成和编辑模型（推荐）**

#### 文本生成图片
```
/img 一只可爱的小狗在花园里
```

#### 图片编辑（现已支持！）
```
# 回复图片进行编辑
[回复图片] /img 把猫变成金毛犬
[回复图片] /img 将背景改成海滩日落
[回复图片] /img 让图片更加色彩鲜艳
```

#### 支持的参数
- `aspectRatio`: 宽高比（如 "16:9", "9:16", "1:1"）
- `n`: 生成数量（1-10张）

### 视频功能 ⭐

xAI 提供强大的视频生成能力，通过 `xai_video` 工具调用。

#### 模型
- `grok-imagine-video` - 视频生成、图生视频、视频编辑模型

#### 1. 文本生成视频（Text-to-Video）
```json
{
  "name": "xai_video",
  "arguments": {
    "prompt": "一只约克夏在旧金山Crissy Field的蒲公英丛中",
    "mode": "text-to-video",
    "aspectRatio": "16:9",
    "duration": 5,
    "resolution": "720p"
  }
}
```

#### 2. 图生视频（Image-to-Video）
```json
{
  "name": "xai_video",
  "arguments": {
    "prompt": "猫慢慢转头并眨眼",
    "mode": "image-to-video",
    "imageUrl": "https://example.com/cat.png",
    "duration": 5,
    "aspectRatio": "16:9"
  }
}
```

#### 3. 视频编辑（Video-to-Video）
```json
{
  "name": "xai_video",
  "arguments": {
    "prompt": "将这只猫渲染成90年代动漫风格的狗",
    "mode": "video-edit",
    "videoUrl": "https://example.com/video.mp4"
  }
}
```

#### 视频参数说明
- `mode`: 模式
  - `text-to-video` - 文本生成视频
  - `image-to-video` - 图片生成视频
  - `video-edit` - 视频编辑
- `aspectRatio`: 宽高比（仅生成模式）：`16:9`, `9:16`, `1:1`
- `duration`: 时长（仅生成模式）：固定 5 秒
- `resolution`: 分辨率（仅生成模式）：`480p`, `720p`
- `imageUrl`: 图片URL（图生视频模式必需）
- `videoUrl`: 视频URL（视频编辑模式必需）

#### 重要说明
- 视频生成是**异步操作**，需要等待约 1-5 分钟
- 视频编辑模式**不支持** `duration` 和 `aspectRatio` 参数
- 轮询超时时间：10 分钟 / 轮询间隔：5 秒

### 使用示例

#### 图片生成
```
/img a beautiful sunset over the ocean
```

#### 图片编辑
```
[回复图片] /img 把这只猫变成金毛犬
[回复图片] /img 将背景换成未来科技城市
```

#### 视频生成（通过 LLM 工具调用）
```
生成一个5秒的视频：一只约克夏在蒲公英丛中玩耍
```

LLM 会自动调用 `xai_video` 工具：
```json
{
  "name": "xai_video",
  "arguments": {
    "prompt": "一只约克夏在蒲公英丛中玩耍",
    "mode": "text-to-video",
    "duration": 5
  }
}
```

### 限制说明
- 图片编辑：不支持遮罩（mask）
- 视频生成：固定 5 秒时长
- 视频编辑：不支持自定义时长和宽高比
- 每次只能生成 1 个视频

---

## 5. Black Forest Labs (FLUX)

### 配置
```env
BFL_API_KEY=your-api-key
BFL_IMAGE_MODEL=flux-2-klein-9b  # 默认，速度最快（亚秒级）

# 其他选项：见下方模型表格
```

### 模型

#### FLUX.2（最新一代）— 全部支持编辑
| 模型 ID | 生成 | 编辑 | 最多参考图 | 说明 |
|---------|------|------|-----------|------|
| **flux-2-pro** | ✅ | ✅ | 8张 | 生产级，速度/质量平衡 |
| **flux-2-max** | ✅ | ✅ | 8张 | 最高质量 |
| **flux-2-flex** | ✅ | ✅ | 8张 | 可调步数（1-50），排版专用 |
| flux-2-klein-9b | ✅ | ✅ | 4张 | 速度最快（亚秒级）（**默认**） |
| flux-2-klein-4b | ✅ | ✅ | 4张 | 速度最快（亚秒级），质量较低 |

#### FLUX.1 / FLUX Kontext
| 模型 ID | 生成 | 编辑 | 多参考图 | Inpainting | 说明 |
|---------|------|------|---------|-----------|------|
| flux-kontext-pro | ✅ | ✅ | ✅(最多10张) | ❌ | 上下文编辑 |
| flux-kontext-max | ✅ | ✅ | ✅(最多10张) | ❌ | 高质量上下文编辑 |
| flux-pro-1.1-ultra | ✅ | ❌ | ❌ | ❌ | 超高分辨率（4MP）生成 |
| flux-pro-1.1 | ✅ | ❌ | ❌ | ❌ | 快速生成 |
| flux-pro | ✅ | ❌ | ❌ | ❌ | FLUX.1 [pro] 生成 |
| flux-pro-1.0-fill | ❌ | ✅ | ✅ | ✅ | 遮罩 inpainting/outpainting |
| flux-dev | ✅ | ❌ | ❌ | ❌ | 开源权重，仅非商业用途 |

### 特点
- ✅ 文本生成图片
- ✅ **图片编辑（Image-to-Image）** — 所有 FLUX.2 + flux-kontext-pro/max
- ✅ **多参考图**（FLUX.2 最多8张，Kontext 最多10张）
- ✅ **遮罩 inpainting**（通过 `flux-pro-1.0-fill`）
- ✅ 支持宽高比
- ✅ 精细质量控制（steps、guidance、safety tolerance）
- ❌ 无显式编辑模式

### 文本生成图片
```
/img 一个宏大的未来都市黄昏风景，电影感光线
```

### 图片编辑（回复图片）
```
[回复图片] /img 将这张变成油画风格
[回复图片] /img 将背景换成雪山
[回复图片] /img 让主体穿上红色夹克
```

### 高级参数（通过 LLM 工具调用）

| 参数 | 类型 | 范围 | 说明 |
|------|------|------|------|
| `steps` | 整数 | > 0 | 生成步数（越高质量越好） |
| `guidance` | 数字 | ≥ 0 | 引导强度（提示词遵循度） |
| `safetyTolerance` | 整数 | 0–6 | 安全过滤级别（0最严格） |
| `outputFormat` | 字符串 | jpeg/png | 输出格式 |
| `imagePromptStrength` | 数字 | 0–1 | 参考图对输出的影响强度 |
| `aspectRatio` | 字符串 | 如 16:9 | 输出宽高比 |

### 遮罩 Inpainting（flux-pro-1.0-fill）
```json
{
  "agent": "bfl",
  "prompts": ["在墙上添加一个发光的霓虹灯牌"],
  "referenceImages": ["base64_image"],
  "mask": "base64_mask_白色区域为编辑区"
}
```
遮罩规范（与 Vertex 相同）：
- **白色** = 要编辑的区域
- **黑色** = 保持不变

---

## 完整功能对比

### 基础功能
| 功能 | Google | Vertex | OpenAI | xAI | BFL |
|------|--------|--------|--------|-----|-----|
| 文本生成 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 图片编辑 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 遮罩支持 | ❌ | ✅ | ✅ | ❌ | ✅(fill模型) |
| 多图输入 | ✅(14) | ✅ | ❌(1) | ✅(1) | ✅(最多10张) |
| 视频生成 | ❌ | ❌ | ❌ | ✅ | ❌ |

### 编辑控制
| 功能 | Google | Vertex | OpenAI | xAI | BFL |
|------|--------|--------|--------|-----|-----|
| 显式编辑模式 | ❌ | ✅(6种) | ❌ | ❌ | ❌ |
| 负面提示 | ❌ | ✅ | ❌ | ❌ | ❌ |
| 质量控制 | ❌ | ✅ | ✅ | ❌ | ✅(steps/guidance) |
| 遮罩模式 | ❌ | ✅(5种) | ✅ | ❌ | ✅(fill模型) |
| 视频编辑 | ❌ | ❌ | ❌ | ✅ | ❌ |

### 性能
| 指标 | Google | Vertex | OpenAI | xAI | BFL |
|------|--------|--------|--------|-----|-----|
| 速度 | 快 | 中 | 快 | 快 | 快（klein）/ 中（pro/max） |
| 质量 | 好 | 很好 | 好-很好 | 好 | 很好 |
| 成本 | 低 | 中 | 中 | 中 | 中 |
| 每次最多 | 4张 | 4张 | 10张 | 10张 | 1张 |

---

## LLM Tool 使用

### 生成图片
```json
{
  "agent": "vertex",
  "prompts": ["一只可爱的小狗在花园里"]
}
```

### 编辑图片（基础）
```json
{
  "agent": "google",
  "prompts": ["让它更丰富多彩"],
  "referenceImages": ["base64_image"]
}
```

### 编辑图片（高级 - Vertex）
```json
{
  "agent": "vertex",
  "prompts": ["移除图片中的红色汽车"],
  "referenceImages": ["base64_image"],
  "editMode": "EDIT_MODE_INPAINT_REMOVAL",
  "mask": "base64_mask",
  "maskMode": "MASK_MODE_USER_PROVIDED",
  "maskDilation": 0.01,
  "negativePrompt": "模糊、不自然",
  "baseSteps": 60
}
```

### 风格转换（xAI）
```json
{
  "agent": "xai",
  "prompts": ["A beautiful sunset over the ocean with vibrant colors"]
}
```

### 图片编辑（xAI）
```json
{
  "agent": "xai",
  "prompts": ["把这只猫变成金毛犬"],
  "referenceImages": ["base64_image"]
}
```

### 生成图片（BFL）
```json
{
  "agent": "bfl",
  "prompts": ["一幅宇航员在火星上的电影感肖像，戏剧性打光"],
  "radio": "16:9"
}
```

### 编辑图片（BFL - 快速）
```json
{
  "agent": "bfl",
  "prompts": ["将背景换成雪山"],
  "referenceImages": ["base64_image"]
}
```

### 编辑图片（BFL - 高质量精细控制）
```json
{
  "agent": "bfl",
  "prompts": ["将这张图变成吉卜力工作室风格的插画"],
  "referenceImages": ["base64_image"],
  "steps": 40,
  "guidance": 7.5,
  "safetyTolerance": 2,
  "imagePromptStrength": 0.8
}
```

### Inpainting（BFL - 带遮罩）
```json
{
  "agent": "bfl",
  "prompts": ["在墙上添加一个发光的霓虹灯牌"],
  "referenceImages": ["base64_image"],
  "mask": "base64_mask_白色区域为编辑区"
}
```
> 注意：inpainting 需将 `BFL_IMAGE_MODEL` 设置为 `flux-pro-1.0-fill`。

---

## 实用技巧

### 选择合适的 Agent

**Google - 日常快速编辑**
- ✅ 快速迭代
- ✅ 对话式编辑
- ✅ 多图合成
- ❌ 无精确控制

**Vertex - 专业编辑**
- ✅ 需要精确控制
- ✅ 产品图片
- ✅ 复杂编辑任务
- ✅ 背景替换/扩展

**OpenAI - 平衡选择**
- ✅ DALL-E 3 高质量生成
- ✅ 支持遮罩编辑
- ✅ 快速响应
- ⚠️ 编辑功能中等

**xAI - 图片编辑和视频创作**
- ✅ 图片生成和编辑
- ✅ 文本生成视频
- ✅ 图片生成视频
- ✅ 视频编辑转换
- ❌ 不支持遮罩编辑

**BFL (FLUX) - 高质量生成与编辑**
- ✅ FLUX.2 生成和编辑（最多8张参考图）
- ✅ FLUX Kontext 上下文编辑（最多10张参考图）
- ✅ 遮罩 inpainting（`flux-pro-1.0-fill`）
- ✅ 精细控制（steps、guidance、safety tolerance）
- ❌ 无显式编辑模式

### 提示词最佳实践

**好的提示词：**
```
✅ "在桌子中央添加一束鲜艳的玫瑰花，保持原有光线和视角"
✅ "将背景替换为现代办公室环境，专业打光，保持人物不变"
✅ "移除图片右侧的红色汽车，自然填充背景"
```

**差的提示词：**
```
❌ "改一下"
❌ "好看点"
❌ "换背景"
```

### 配置建议

**日常使用（推荐）：**
```env
AI_IMAGE_PROVIDER=google
GOOGLE_IMAGE_MODEL=gemini-2.5-flash-image
```

**专业编辑（推荐）：**
```env
AI_IMAGE_PROVIDER=vertex
VERTEX_IMAGE_MODEL=imagen-3.0-capability-001
```

**高质量生成+编辑：**
```env
AI_IMAGE_PROVIDER=openai
DALL_E_MODEL=dall-e-2  # 或 gpt-image-1
```

**实验性/风格转换：**
```env
AI_IMAGE_PROVIDER=xai
XAI_IMAGE_MODEL=grok-imagine-image
```

**BFL FLUX.2 生成与编辑：**
```env
AI_IMAGE_PROVIDER=bfl
BFL_IMAGE_MODEL=flux-2-pro
```

**BFL Inpainting（带遮罩）：**
```env
AI_IMAGE_PROVIDER=bfl
BFL_IMAGE_MODEL=flux-pro-1.0-fill
```

**视频生成（xAI）：**
通过 LLM 工具调用 `xai_video`，支持文本生成视频、图生视频、视频编辑。

---

## 故障排除

### Vertex "Mask image is missing" 错误
**问题：** "Image editing failed with the following error: Mask image is missing."
**原因：** 某些编辑模式（如 EDIT_MODE_INPAINT_INSERTION）需要 mask，但 Telegram 命令没有提供
**解决：** 代码已自动处理，无 mask 时使用 EDIT_MODE_CONTROLLED_EDITING

### Vertex 编辑失败
**问题：** "Model does not support editing"
**原因：** 使用了 imagen-4.0（不支持编辑）
**解决：** 代码已自动处理，强制使用 imagen-3.0-capability-001

### OpenAI 编辑失败
**问题：** dall-e-3 编辑报错
**原因：** dall-e-3 不支持编辑
**解决：** 代码已自动降级到 dall-e-2

### Google 遮罩不工作
**问题：** mask 参数无效
**原因：** Google Generative AI 不支持遮罩
**解决：** 使用 Vertex AI 或通过详细提示词描述区域

### xAI 编辑报错
**问题：** "xAI API does not support image editing yet"
**原因：** 使用了旧版 `grok-2-image` 模型
**解决：** 更新配置使用 `grok-imagine-image` 模型

```env
XAI_IMAGE_MODEL=grok-imagine-image
```

### BFL Inpainting 无效
**问题：** 带遮罩编辑不生效
**原因：** 普通 FLUX.2 模型不支持遮罩，需使用专用 fill 模型
**解决：** 将模型切换为 `flux-pro-1.0-fill`

```env
BFL_IMAGE_MODEL=flux-pro-1.0-fill
```

---

## 技术实现细节

### Vertex 智能模式选择
```typescript
// src/agent/vertex.ts
const isEditMode = (referenceImages && referenceImages.length > 0) || mask;
const modelId = isEditMode
    ? 'imagen-3.0-capability-001'  // 编辑：强制
    : this.model(context);          // 生成：配置

// 智能选择编辑模式
const defaultEditMode = mask
    ? 'EDIT_MODE_INPAINT_INSERTION'      // 有 mask：精确 inpainting
    : 'EDIT_MODE_CONTROLLED_EDITING';    // 无 mask：通用编辑
```

### OpenAI 自动降级
```typescript
// src/agent/openai.ts
const isEditMode = (referenceImages && referenceImages.length > 0) || mask;
const actualModel = isEditMode
    ? (modelId === 'dall-e-3' ? 'dall-e-2' : modelId)
    : modelId;
```

### Telegram 命令支持
```typescript
// src/telegram/command/system.ts
// Google、Vertex、OpenAI、xAI、BFL 均支持图片编辑
if (['google', 'vertex', 'openai', 'xai', 'bfl'].includes(agent.name)) {
    extraParams.referenceImages = await getTelegramFile(...);
}
```

### BFL 使用 AI SDK
```typescript
// src/agent/blackforestlabs.ts
import { createBlackForestLabs } from '@ai-sdk/black-forest-labs';
import { generateImage } from 'ai';

// 文本生成图片
const { images } = await generateImage({
    model: bflClient.image('flux-2-klein-9b'),
    prompt,
    aspectRatio: '16:9',
    providerOptions: { blackForestLabs: { steps: 30, safetyTolerance: 2 } },
});

// 图片编辑（支持所有 FLUX.2 + kontext 模型）
const { images } = await generateImage({
    model: bflClient.image('flux-2-pro'),
    prompt: {
        text: '把猫变成金毛犬',
        images: ['https://...'],  // URL 或 base64
    },
});

// 带遮罩 inpainting（flux-pro-1.0-fill）
const { images } = await generateImage({
    model: bflClient.image('flux-pro-1.0-fill'),
    prompt: {
        text: '添加一个发光的霓虹灯牌',
        images: ['base64_image'],
        mask: 'base64_mask',
    },
});
```

### xAI 使用 AI SDK
```typescript
// src/agent/xai.ts
import { createXai } from '@ai-sdk/xai';
import { generateImage, experimental_generateVideo as generateVideo } from 'ai';

// 图片生成
const { images } = await generateImage({
    model: xaiClient.image('grok-imagine-image'),
    prompt,
    n,
    aspectRatio,
});

// 图片编辑
const { images } = await generateImage({
    model: xaiClient.image('grok-imagine-image'),
    prompt: {
        text: '把猫变成金毛犬',
        images: [imageBuffer],
    },
});

// 视频生成
const { videos } = await generateVideo({
    model: xaiClient.video('grok-imagine-video'),
    prompt: '一只约克夏在蒲公英丛中',
    duration: 5,
    aspectRatio: '16:9',
    providerOptions: {
        xai: {
            resolution: '720p',
            pollTimeoutMs: 600000,
        },
    },
});
```

---

## 更新日志

### 2026-02-23
- ✅ **新增 Black Forest Labs (BFL / FLUX) 图片 Agent**
- ✅ FLUX.2 系列：flux-2-pro、flux-2-max、flux-2-flex、flux-2-klein-4b/9b — 全部支持编辑（最多8张参考图）
- ✅ FLUX Kontext：flux-kontext-pro/max — 上下文编辑（最多10张参考图）
- ✅ 支持遮罩 inpainting（flux-pro-1.0-fill）
- ✅ 支持 steps、guidance、safetyTolerance、outputFormat、imagePromptStrength、aspectRatio
- ✅ 新增 `BFL_API_KEY`、`BFL_API_BASE`、`BFL_IMAGE_MODEL` 配置项
- ✅ 在 `/img` 命令编辑白名单中注册 `bfl` Agent

### 2025-02-15
- ✅ **xAI 添加图片编辑支持**（grok-imagine-image）
- ✅ **xAI 添加视频生成功能**（grok-imagine-video）
- ✅ 支持文本生成视频（Text-to-Video）
- ✅ 支持图片生成视频（Image-to-Video）
- ✅ 支持视频编辑（Video-to-Video）
- ✅ 新增 `xai_video` 工具
- ✅ 更新默认模型为 `grok-imagine-image`
- ✅ 支持 aspectRatio 参数

### 2025-12-20
- ✅ 升级到新的 AI SDK `generateImage` API
- ✅ Vertex 添加智能模型选择（编辑/生成自动切换）
- ✅ Vertex 添加智能编辑模式选择（有/无 mask）
- ✅ Vertex 支持 6 种编辑模式和高级参数
- ✅ OpenAI 添加图片编辑支持（自动降级）
- ✅ 更新依赖到最新 beta 版本
- ✅ 保留 Google 原有编辑功能
- ✅ 修复 Vertex "Mask image is missing" 错误

---

## 参考资源

- [Google Gemini Image API](https://ai.google.dev/gemini-api/docs/image-generation)
- [Vertex AI Image Editing](https://cloud.google.com/vertex-ai/generative-ai/docs/image/edit-images)
- [Vertex AI Model Versions](https://cloud.google.com/vertex-ai/generative-ai/docs/image/model-versioning)
- [OpenAI Image Generation](https://platform.openai.com/docs/guides/images)
- [xAI API Documentation](https://docs.x.ai/docs/overview)
- [Black Forest Labs API Documentation](https://docs.bfl.ml/quick_start/introduction)
- [AI SDK Documentation](https://sdk.vercel.ai/docs/ai-sdk-core/generating-images)

---

**维护者：** Claude Code
**最后更新：** 2026-02-23
