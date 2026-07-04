# Complete Guide to Image Editing Features

**Last Updated:** 2026-02-23

---

## Quick Start

### Supported Agents

| Agent | Generation | Editing | Mask | Edit Mode | New Features | Recommended Use Cases |
|-------|-----------|---------|------|-----------|-------------|---------------------|
| **Google** | ✅ | ✅ | ❌ | Implicit | 4K resolution, Google Search | Quick editing, real-time data visualization |
| **Vertex** | ✅ | ✅ | ✅ | 6 explicit modes | - | Professional editing, precise control |
| **OpenAI** | ✅ | ✅ | ✅ | Implicit | - | Balanced performance, DALL-E 3 generation |
| **xAI** | ✅ | ✅ | ❌ | Implicit | Video generation, I2V, video editing | Image editing, video creation |
| **BFL (FLUX)** | ✅ | ✅ | ✅ | Implicit | Multi-reference (up to 10 images), inpainting | High-quality generation, style transfer, multi-ref editing |

### Telegram Usage

```
# Generate image
/img a cute dog in a garden

# Edit image (reply to an image)
[Reply to image] /img make it more colorful
```

---

## 1. Google Generative AI

### Configuration
```env
GOOGLE_API_KEY=your-api-key
GOOGLE_IMAGE_MODEL=gemini-2.5-flash-image

# Gemini 3 Pro Image new features (gemini-3-pro-image-preview)
GOOGLE_IMAGE_MODEL=gemini-3-pro-image-preview

# Optional: Aspect ratio setting ("1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9")
GOOGLE_IMAGE_ASPECT_RATIO=16:9

# Optional: Resolution setting ("1K", "2K", "4K")
GOOGLE_IMAGE_SIZE=4K

# Optional: Enable Google Search grounding (real-time data: weather, stocks, news)
GOOGLE_IMAGE_ENABLE_GOOGLE_SEARCH=true

# Optional: Thinking depth for gemini-3.1-flash-image ("minimal" default, "high")
GOOGLE_IMAGE_THINKING_LEVEL=high
```

### Features
- ✅ Simple and fast
- ✅ Conversational iterative editing
- ✅ Multi-image composition (up to 14 images)
- ❌ No mask support

### Gemini 3 Pro Image New Features ⭐
**Model:** `gemini-3-pro-image-preview`

#### High-Resolution Output
- Supports **1K, 2K, 4K** three resolutions
- Optimized for professional asset production
- Token consumption: 1K ≈ 1120 tokens, 4K ≈ 2000 tokens

#### Flexible Aspect Ratios
Supports 10 aspect ratios:
- Square: `1:1`
- Portrait: `2:3`, `3:4`, `4:5`, `9:16`
- Landscape: `3:2`, `4:3`, `5:4`, `16:9`, `21:9`

#### Google Search Grounding (Real-time Data)
When enabled, generate images based on real-time information:
- 📰 Current news events
- 🌤️ Real-time weather maps
- 📈 Latest stock charts
- 🗺️ Geographic data visualization
- 🖼️ Image search and generation

**Basic Configuration:**
```env
GOOGLE_IMAGE_ENABLE_GOOGLE_SEARCH=true
```

**Advanced Configuration:**
```env
# Enable web search (default: true)
GOOGLE_SEARCH_ENABLE_WEB_SEARCH=true

# Enable image search for image-capable models (default: false)
GOOGLE_SEARCH_ENABLE_IMAGE_SEARCH=true

# Time range filter (ISO 8601 format)
GOOGLE_SEARCH_TIME_RANGE_FILTER='{"startTime": "2025-01-01T00:00:00Z", "endTime": "2025-12-31T23:59:59Z"}'
```

**Features:**
- **Web Search**: Search for real-time information to enhance image generation
- **Image Search**: Search for reference images and incorporate them into generation
- **Time Range Filter**: Restrict search results to specific time periods

Example prompts:
```
# Basic real-time data
/img Generate an infographic about today's weather forecast in Taipei
/img Create a chart showing Tesla stock prices from the past week

# Image search + generation
/img Search for photos of the 2026 Super Bowl halftime show and create a space-themed version

# Time-filtered search
/img Create an infographic about major tech events in January 2026
```

#### Advanced Text Rendering
- Generate clear, stylized text
- Suitable for: infographics, menus, charts, marketing materials

#### Thinking Mode
- Model performs a "thinking" process
- Generates intermediate "thinking images" (visible in backend, not billed, automatically excluded from the returned result)
- Optimizes final high-quality output
- Control the depth with `GOOGLE_IMAGE_THINKING_LEVEL=minimal` (default, fastest) or `high` (deeper reasoning, higher latency) — gemini-3.1-flash-image only (stable release, replacing the earlier `gemini-3.1-flash-image-preview`)

#### More Reference Images
- Supports up to **14 reference images**
- Can mix: up to 6 objects + 5 people images

### Usage Examples
```
# Basic editing
[Reply to image] /img make the colors more vibrant
[Reply to image] /img change the background to a beach

# Gemini 3 Pro Image - High resolution + aspect ratio
# Config: GOOGLE_IMAGE_SIZE=4K, GOOGLE_IMAGE_ASPECT_RATIO=16:9
/img a panoramic view of a futuristic tech city

# Google Search - Real-time data
# Config: GOOGLE_IMAGE_ENABLE_GOOGLE_SEARCH=true
/img Create an infographic showing today's global major stock market performance
/img Generate a visualization chart of the latest AI technology trends
```

### Model Comparison

| Feature | gemini-2.5-flash-image | gemini-3-pro-image-preview |
|---------|----------------------|---------------------------|
| Generation/Editing | ✅ | ✅ |
| Resolution | Default | 1K/2K/4K options |
| Aspect Ratio | Limited | 10 choices |
| Google Search | ❌ | ✅ |
| Advanced Text | Basic | Professional |
| Thinking Mode | ❌ | ✅ |
| Reference Images | 14 images | 14 images (6 objects + 5 people) |
| Recommended Scenarios | Quick iteration | Professional asset creation |

---

## 2. Vertex AI (Most Powerful)

### Configuration
```env
VERTEX_PROJECT_ID=your-project-id
VERTEX_IMAGE_MODEL=imagen-3.0-capability-001  # For editing only
VERTEX_CREDENTIALS={"client_email":"...","private_key":"..."}
```

### Smart Model Selection

The code **automatically selects** the correct model:
- Has reference images → Forces `imagen-3.0-capability-001` (only model supporting editing)
- Pure generation → Uses configured model (can be `imagen-4.0-fast-generate-001`)

### Model Comparison

| Model | Editing | Generation | Recommended Use |
|-------|---------|-----------|----------------|
| **imagen-3.0-capability-001** | ✅ | ✅ | **Must use for editing** |
| imagen-4.0-fast-generate-001 | ❌ | ✅ | Fast generation (no editing support) |

### 6 Editing Modes

#### Smart Default Mode Selection
- **With mask image**: Defaults to `EDIT_MODE_INPAINT_INSERTION` (precise inpainting)
- **Without mask image**: Defaults to `EDIT_MODE_CONTROLLED_EDITING` (general controlled editing)

#### 1. EDIT_MODE_CONTROLLED_EDITING (Telegram Default)
General controlled editing, no mask needed
```json
{
  "agent": "vertex",
  "prompts": ["change the background to blue"],
  "referenceImages": ["base64..."],
  "editMode": "EDIT_MODE_CONTROLLED_EDITING"
}
```

#### 2. EDIT_MODE_INPAINT_INSERTION (Default with mask)
Insert new objects or content (requires mask)
```json
{
  "agent": "vertex",
  "prompts": ["add a red apple on the table"],
  "referenceImages": ["base64..."],
  "editMode": "EDIT_MODE_INPAINT_INSERTION",
  "mask": "base64_mask"
}
```

#### 3. EDIT_MODE_INPAINT_REMOVAL
Remove objects
```json
{
  "editMode": "EDIT_MODE_INPAINT_REMOVAL",
  "prompts": ["remove all people from the image"]
}
```

#### 4. EDIT_MODE_OUTPAINT
Extend image boundaries
```json
{
  "editMode": "EDIT_MODE_OUTPAINT",
  "prompts": ["extend to the right, add more forest"]
}
```

#### 5. EDIT_MODE_PRODUCT_IMAGE
Product image optimization
```json
{
  "editMode": "EDIT_MODE_PRODUCT_IMAGE",
  "prompts": ["place the product on a white background"]
}
```

#### 6. EDIT_MODE_BGSWAP
Background replacement
```json
{
  "editMode": "EDIT_MODE_BGSWAP",
  "prompts": ["change the background to a beach sunset"]
}
```

### Advanced Parameters

#### maskMode (Mask Mode)
- `MASK_MODE_USER_PROVIDED` - Manually provided mask
- `MASK_MODE_DETECTION_BOX` - Auto-detect bounding box
- `MASK_MODE_CLOTHING_AREA` - Clothing area segmentation
- `MASK_MODE_PARSED_PERSON` - Human parsing

#### maskDilation (Mask Dilation)
```json
{
  "maskDilation": 0.01  // 0-1, recommended 0.01
}
```

#### negativePrompt (Negative Prompt)
```json
{
  "negativePrompt": "blurry, low quality, distorted, extra limbs"
}
```

#### baseSteps (Generation Steps)
```json
{
  "baseSteps": 60  // 35-75, higher is better quality
}
```

### Mask Creation

Mask is a black and white image:
- **White (255,255,255)** = Area to edit
- **Black (0,0,0)** = Keep unchanged

---

## 3. OpenAI/DALL-E

### Configuration
```env
OPENAI_API_KEY=your-api-key
DALL_E_MODEL=dall-e-2  # or dall-e-3, gpt-image-1
```

### Smart Model Selection

The code **automatically adjusts**:
- dall-e-3 editing → Auto-downgrades to dall-e-2
- Other models → Uses as configured

### Supported Models

| Model | Editing | Generation | Max Per Request | Recommended |
|-------|---------|-----------|----------------|------------|
| dall-e-2 | ✅ | ✅ | 10 images | ✅ Balanced |
| dall-e-3 | ❌→✅ | ✅ | 1 image | High-quality generation |
| gpt-image-1 | ✅ | ✅ | 10 images | ✅ Fast |
| gpt-image-1-mini | ✅ | ✅ | 10 images | ✅ Fastest |

### Features
- ✅ Mask support (inpainting)
- ✅ Automatic model downgrade (dall-e-3→dall-e-2)
- ✅ Dual implementation (editing uses AI SDK, generation uses native API)

---

## 4. xAI (Grok Imagine)

### Configuration
```env
XAI_API_KEY=your-api-key
XAI_IMAGE_MODEL=grok-imagine-image  # New image generation and editing model
```

### Features
- ✅ Text-to-image generation
- ✅ **Image editing (Image-to-Image)** - Now supported!
- ✅ Aspect ratio support (aspectRatio)
- ✅ **Video generation (via xai_video tool)**
- ✅ **Image-to-video (I2V)**
- ✅ **Video editing (V2V)**
- ❌ No mask support
- ❌ No explicit edit modes

### Image Features

#### Models
- `grok-2-image` - Legacy image generation model
- `grok-imagine-image` - **New image generation and editing model (Recommended)**

#### Text-to-Image Generation
```
/img a cute dog in the garden
```

#### Image Editing (Now Supported!)
```
# Reply to an image to edit it
[Reply to image] /img turn the cat into a golden retriever
[Reply to image] /img change the background to a beach sunset
[Reply to image] /img make the image more vibrant
```

#### Supported Parameters
- `aspectRatio`: Aspect ratio (e.g., "16:9", "9:16", "1:1")
- `n`: Number of images to generate (1-10)

### Video Features ⭐

xAI provides powerful video generation capabilities through the `xai_video` tool.

#### Model
- `grok-imagine-video` - Video generation, image-to-video, and video editing model

#### 1. Text-to-Video
```json
{
  "name": "xai_video",
  "arguments": {
    "prompt": "A yorkie among dandelions at Crissy Field in San Francisco",
    "mode": "text-to-video",
    "aspectRatio": "16:9",
    "duration": 5,
    "resolution": "720p"
  }
}
```

#### 2. Image-to-Video
```json
{
  "name": "xai_video",
  "arguments": {
    "prompt": "The cat slowly turns its head and blinks",
    "mode": "image-to-video",
    "imageUrl": "https://example.com/cat.png",
    "duration": 5,
    "aspectRatio": "16:9"
  }
}
```

#### 3. Video Editing
```json
{
  "name": "xai_video",
  "arguments": {
    "prompt": "Render this cat as a dog in the style of 90s anime",
    "mode": "video-edit",
    "videoUrl": "https://example.com/video.mp4"
  }
}
```

#### Video Parameters
- `mode`: Generation mode
  - `text-to-video` - Text to video
  - `image-to-video` - Image to video
  - `video-edit` - Video editing
- `aspectRatio`: Aspect ratio (generation mode only)
  - `16:9`, `9:16`, `1:1`
- `duration`: Duration in seconds (generation mode only)
  - Fixed at 5 seconds
- `resolution`: Video resolution (generation mode only)
  - `480p`, `720p`
- `imageUrl`: Image URL (required for image-to-video mode)
- `videoUrl`: Video URL (required for video-edit mode)

#### Important Notes
- Video generation is **asynchronous** and takes approximately 1-5 minutes
- Video editing mode **does not support** `duration` and `aspectRatio` parameters
- Polling timeout: 10 minutes
- Polling interval: 5 seconds

### Usage Examples

#### Image Generation
```
/img a beautiful sunset over the ocean
```

#### Image Editing
```
[Reply to image] /img turn this cat into a golden retriever
[Reply to image] /img change the background to a futuristic city
```

#### Video Generation (via LLM tool call)
```
Generate a 5-second video of a yorkie playing among dandelions
```

The LLM will automatically call the `xai_video` tool:
```json
{
  "name": "xai_video",
  "arguments": {
    "prompt": "A yorkie playing among dandelions",
    "mode": "text-to-video",
    "duration": 5
  }
}
```

### Technical Implementation

#### Image Editing
```typescript
// src/agent/xai.ts
import { createXai } from '@ai-sdk/xai';
import { generateImage } from 'ai';

// Image editing
const { images } = await generateImage({
    model: xaiClient.image('grok-imagine-image'),
    prompt: {
        text: 'turn the cat into a golden retriever',
        images: [imageBuffer], // Reference image
    },
    n: 1,
    aspectRatio: '16:9',
});
```

#### Video Generation
```typescript
// src/tools/internal/xai_video.ts
import { experimental_generateVideo as generateVideo } from 'ai';

// Text-to-video
const { videos } = await generateVideo({
    model: xaiClient.video('grok-imagine-video'),
    prompt: 'A yorkie among dandelions',
    duration: 5,
    aspectRatio: '16:9',
    providerOptions: {
        xai: {
            resolution: '720p',
            pollTimeoutMs: 600000, // 10 minutes
            pollIntervalMs: 5000,
        },
    },
});
```

### Limitations
- Image editing: No mask support
- Video generation: Fixed 5-second duration
- Video editing: No custom duration or aspect ratio
- Only 1 video per request

---

## 5. Black Forest Labs (FLUX)

### Configuration
```env
BFL_API_KEY=your-api-key
BFL_IMAGE_MODEL=flux-2-klein-9b  # Default, fastest (sub-second)

# Other options: see model table below
```

### Models

#### FLUX.2 (Latest Generation) — All support editing
| Model ID | Generation | Editing | Max ref images | Notes |
|----------|-----------|---------|---------------|-------|
| **flux-2-pro** | ✅ | ✅ | 8 | Production-grade, speed/quality balance (Recommended) |
| **flux-2-max** | ✅ | ✅ | 8 | Highest quality |
| **flux-2-flex** | ✅ | ✅ | 8 | Adjustable steps (1-50), typography specialist |
| flux-2-klein-9b | ✅ | ✅ | 4 | Fastest (sub-second), lower quality |
| flux-2-klein-4b | ✅ | ✅ | 4 | Fastest (sub-second), lowest quality |

#### FLUX.1 / FLUX Kontext
| Model ID | Generation | Editing | Multi-ref | Inpainting | Notes |
|----------|-----------|---------|-----------|-----------|-------|
| flux-kontext-pro | ✅ | ✅ | ✅(up to 10) | ❌ | In-context editing |
| flux-kontext-max | ✅ | ✅ | ✅(up to 10) | ❌ | Higher quality in-context editing |
| flux-pro-1.1-ultra | ✅ | ❌ | ❌ | ❌ | Ultra high-res (4MP) generation |
| flux-pro-1.1 | ✅ | ❌ | ❌ | ❌ | Fast generation |
| flux-pro | ✅ | ❌ | ❌ | ❌ | FLUX.1 [pro] generation |
| flux-pro-1.0-fill | ❌ | ✅ | ✅ | ✅ | Inpainting/outpainting with mask |
| flux-dev | ✅ | ❌ | ❌ | ❌ | Open-weights, non-commercial |

### Features
- ✅ Text-to-image generation
- ✅ **Image editing (Image-to-Image)** — all FLUX.2 models + flux-kontext-pro/max
- ✅ **Multi-reference images** (up to 8 for FLUX.2, up to 10 for kontext)
- ✅ **Inpainting with mask** (via `flux-pro-1.0-fill`)
- ✅ Aspect ratio support
- ✅ Fine-grained quality controls (steps, guidance, safety tolerance)
- ❌ No explicit edit modes

### Text-to-Image Generation
```
/img a cinematic landscape of a futuristic city at dusk
```

### Image Editing (Reply to image)
```
[Reply to image] /img turn this into an oil painting
[Reply to image] /img change the background to a snowy mountain
[Reply to image] /img make the subject wear a red jacket
```

### Advanced Parameters (via LLM tool call)

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| `steps` | integer | > 0 | Generation steps (higher = better quality) |
| `guidance` | number | ≥ 0 | Guidance scale (prompt adherence) |
| `safetyTolerance` | integer | 0–6 | Safety filter level (0 = strictest) |
| `outputFormat` | string | jpeg/png | Output format |
| `imagePromptStrength` | number | 0–1 | How strongly reference images influence output |
| `aspectRatio` | string | e.g. 16:9 | Output aspect ratio |

### Inpainting with Mask (flux-pro-1.0-fill)
```json
{
  "agent": "bfl",
  "prompts": ["add a glowing neon sign on the wall"],
  "referenceImages": ["base64_image"],
  "mask": "base64_mask_white_area_to_edit"
}
```
Mask convention (same as Vertex):
- **White** = area to edit
- **Black** = keep unchanged

---

## Complete Feature Comparison

### Basic Features
| Feature | Google | Vertex | OpenAI | xAI | BFL |
|---------|--------|--------|--------|-----|-----|
| Text Generation | ✅ | ✅ | ✅ | ✅ | ✅ |
| Image Editing | ✅ | ✅ | ✅ | ✅ | ✅ |
| Mask Support | ❌ | ✅ | ✅ | ❌ | ✅(fill model) |
| Multi-image Input | ✅(14) | ✅ | ❌(1) | ✅(1) | ✅(up to 10) |
| Video Generation | ❌ | ❌ | ❌ | ✅ | ❌ |

### Editing Control
| Feature | Google | Vertex | OpenAI | xAI | BFL |
|---------|--------|--------|--------|-----|-----|
| Explicit Edit Modes | ❌ | ✅(6 modes) | ❌ | ❌ | ❌ |
| Negative Prompt | ❌ | ✅ | ❌ | ❌ | ❌ |
| Quality Control | ❌ | ✅ | ✅ | ❌ | ✅(steps/guidance) |
| Mask Modes | ❌ | ✅(5 modes) | ✅ | ❌ | ✅(fill model) |
| Video Editing | ❌ | ❌ | ❌ | ✅ | ❌ |

### Performance
| Metric | Google | Vertex | OpenAI | xAI | BFL |
|--------|--------|--------|--------|-----|-----|
| Speed | Fast | Medium | Fast | Fast | Medium |
| Quality | Good | Very Good | Good-Very Good | Good | Very Good |
| Cost | Low | Medium | Medium | Medium | Medium |
| Max Per Request | 4 images | 4 images | 10 images | 10 images | 1 image |

---

## LLM Tool Usage

### Generate Image
```json
{
  "agent": "vertex",
  "prompts": ["a cute dog in a garden"]
}
```

### Edit Image (Basic)
```json
{
  "agent": "google",
  "prompts": ["make it more colorful"],
  "referenceImages": ["base64_image"]
}
```

### Edit Image (Advanced - Vertex)
```json
{
  "agent": "vertex",
  "prompts": ["remove the red car from the image"],
  "referenceImages": ["base64_image"],
  "editMode": "EDIT_MODE_INPAINT_REMOVAL",
  "mask": "base64_mask",
  "maskMode": "MASK_MODE_USER_PROVIDED",
  "maskDilation": 0.01,
  "negativePrompt": "blurry, unnatural",
  "baseSteps": 60
}
```

### Style Transfer (xAI - Now Supports Editing!)
```json
{
  "agent": "xai",
  "prompts": ["A beautiful sunset over the ocean with vibrant colors"]
}
```

### Image Editing (xAI)
```json
{
  "agent": "xai",
  "prompts": ["Turn this cat into a golden retriever"],
  "referenceImages": ["base64_image"]
}
```

### Generate Image (BFL)
```json
{
  "agent": "bfl",
  "prompts": ["a cinematic portrait of an astronaut on Mars, dramatic lighting"],
  "radio": "16:9"
}
```

### Edit Image (BFL - fast)
```json
{
  "agent": "bfl",
  "prompts": ["change the background to a snowy mountain"],
  "referenceImages": ["base64_image"]
}
```

### Edit Image (BFL - high quality with controls)
```json
{
  "agent": "bfl",
  "prompts": ["turn this into a Studio Ghibli style illustration"],
  "referenceImages": ["base64_image"],
  "steps": 40,
  "guidance": 7.5,
  "safetyTolerance": 2,
  "imagePromptStrength": 0.8
}
```

### Inpainting (BFL - with mask)
```json
{
  "agent": "bfl",
  "prompts": ["add a glowing neon sign on the wall"],
  "referenceImages": ["base64_image"],
  "mask": "base64_mask_white_area_to_edit"
}
```
> Note: Set `BFL_IMAGE_MODEL=flux-pro-1.0-fill` for inpainting.

---

## Practical Tips

### Choosing the Right Agent

**Google - Daily Quick Editing**
- ✅ Fast iteration
- ✅ Conversational editing
- ✅ Multi-image composition
- ❌ No precise control

**Vertex - Professional Editing**
- ✅ Need precise control
- ✅ Product images
- ✅ Complex editing tasks
- ✅ Background replacement/extension

**OpenAI - Balanced Choice**
- ✅ DALL-E 3 high-quality generation
- ✅ Mask editing support
- ✅ Fast response
- ⚠️ Medium editing capabilities

**xAI - Image Editing and Video Creation**
- ✅ Image generation and editing
- ✅ Text-to-video generation
- ✅ Image-to-video generation
- ✅ Video editing and transformation
- ❌ No mask editing support

**BFL (FLUX) - High Quality Generation & Editing**
- ✅ FLUX.2 generation and editing (up to 8 reference images)
- ✅ FLUX Kontext in-context editing (up to 10 reference images)
- ✅ Inpainting with mask (`flux-pro-1.0-fill`)
- ✅ Fine-grained controls (steps, guidance, safety tolerance)
- ❌ No explicit edit modes

### Prompt Best Practices

**Good prompts:**
```
✅ "Add a bouquet of vibrant roses in the center of the table, maintain original lighting and perspective"
✅ "Replace the background with a modern office environment, professional lighting, keep the person unchanged"
✅ "Remove the red car on the right side of the image, naturally fill the background"
```

**Bad prompts:**
```
❌ "Change it"
❌ "Make it better"
❌ "Change background"
```

### Configuration Recommendations

**Daily Use (Recommended):**
```env
AI_IMAGE_PROVIDER=google
GOOGLE_IMAGE_MODEL=gemini-2.5-flash-image
```

**Professional Editing (Recommended):**
```env
AI_IMAGE_PROVIDER=vertex
VERTEX_IMAGE_MODEL=imagen-3.0-capability-001
```

**High-Quality Generation + Editing:**
```env
AI_IMAGE_PROVIDER=openai
DALL_E_MODEL=dall-e-2  # or gpt-image-1
```

**Experimental/Style Transfer:**
```env
AI_IMAGE_PROVIDER=xai
XAI_IMAGE_MODEL=grok-imagine-image
```

**BFL FLUX.2 Generation & Editing:**
```env
AI_IMAGE_PROVIDER=bfl
BFL_IMAGE_MODEL=flux-2-pro
```

**BFL Inpainting (with mask):**
```env
AI_IMAGE_PROVIDER=bfl
BFL_IMAGE_MODEL=flux-pro-1.0-fill
```

**Video Generation (xAI):**
Call `xai_video` tool via LLM, supports text-to-video, image-to-video, and video editing.

---

## Troubleshooting

### Vertex "Mask image is missing" Error
**Issue:** "Image editing failed with the following error: Mask image is missing."
**Cause:** Some edit modes (like EDIT_MODE_INPAINT_INSERTION) require mask, but Telegram command didn't provide one
**Solution:** Code automatically handles this, uses EDIT_MODE_CONTROLLED_EDITING when no mask

### Vertex Editing Failure
**Issue:** "Model does not support editing"
**Cause:** Used imagen-4.0 (doesn't support editing)
**Solution:** Code automatically handles this, forces imagen-3.0-capability-001

### OpenAI Editing Failure
**Issue:** dall-e-3 editing error
**Cause:** dall-e-3 doesn't support editing
**Solution:** Code automatically downgrades to dall-e-2

### Google Mask Not Working
**Issue:** mask parameter has no effect
**Cause:** Google Generative AI doesn't support masks
**Solution:** Use Vertex AI or describe the area through detailed prompts

### xAI Editing Error
**Issue:** "xAI API does not support image editing yet"
**Cause:** Using legacy `grok-2-image` model
**Solution:** Update configuration to use `grok-imagine-image` model

```env
XAI_IMAGE_MODEL=grok-imagine-image
```

---

## Technical Implementation Details

### Vertex Smart Mode Selection
```typescript
// src/agent/vertex.ts
const isEditMode = (referenceImages && referenceImages.length > 0) || mask;
const modelId = isEditMode
    ? 'imagen-3.0-capability-001'  // Editing: forced
    : this.model(context);          // Generation: configured

// Smart edit mode selection
const defaultEditMode = mask
    ? 'EDIT_MODE_INPAINT_INSERTION'      // With mask: precise inpainting
    : 'EDIT_MODE_CONTROLLED_EDITING';    // Without mask: general editing
```

### OpenAI Auto-Downgrade
```typescript
// src/agent/openai.ts
const isEditMode = (referenceImages && referenceImages.length > 0) || mask;
const actualModel = isEditMode
    ? (modelId === 'dall-e-3' ? 'dall-e-2' : modelId)
    : modelId;
```

### Telegram Command Support
```typescript
// src/telegram/command/system.ts
// Google, Vertex, OpenAI, xAI, BFL all support image editing
if (['google', 'vertex', 'openai', 'xai', 'bfl'].includes(agent.name)) {
    extraParams.referenceImages = await getTelegramFile(...);
}
```

### BFL Using AI SDK
```typescript
// src/agent/blackforestlabs.ts
import { createBlackForestLabs } from '@ai-sdk/black-forest-labs';
import { generateImage } from 'ai';

// Text-to-image generation
const { images } = await generateImage({
    model: bflClient.image('flux-2-pro'),
    prompt,
    aspectRatio: '16:9',
    providerOptions: { blackForestLabs: { steps: 30, safetyTolerance: 2 } },
});

// Image editing (reply to image, supports all FLUX.2 + kontext models)
const { images } = await generateImage({
    model: bflClient.image('flux-2-pro'),
    prompt: {
        text: 'turn the cat into a golden retriever',
        images: ['https://...'],  // URL or base64
    },
});

// Inpainting with mask (flux-pro-1.0-fill)
const { images } = await generateImage({
    model: bflClient.image('flux-pro-1.0-fill'),
    prompt: {
        text: 'add a glowing neon sign',
        images: ['base64_image'],
        mask: 'base64_mask',
    },
});
```

### xAI Using AI SDK
```typescript
// src/agent/xai.ts
import { createXai } from '@ai-sdk/xai';
import { generateImage, experimental_generateVideo as generateVideo } from 'ai';

// Image generation
const { images } = await generateImage({
    model: xaiClient.image('grok-imagine-image'),
    prompt,
    n,
    aspectRatio,
});

// Image editing
const { images } = await generateImage({
    model: xaiClient.image('grok-imagine-image'),
    prompt: {
        text: 'turn the cat into a golden retriever',
        images: [imageBuffer],
    },
});

// Video generation
const { videos } = await generateVideo({
    model: xaiClient.video('grok-imagine-video'),
    prompt: 'A yorkie among dandelions',
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

## Changelog

### 2026-02-23
- ✅ **Added Black Forest Labs (BFL / FLUX) image agent**
- ✅ FLUX.2 series: flux-2-pro, flux-2-max, flux-2-flex, flux-2-klein-4b/9b — all support editing (up to 8 reference images)
- ✅ FLUX Kontext: flux-kontext-pro/max — in-context editing (up to 10 reference images)
- ✅ Inpainting with mask support via `flux-pro-1.0-fill`
- ✅ Supports steps, guidance, safetyTolerance, outputFormat, imagePromptStrength, aspectRatio
- ✅ Added `BFL_API_KEY`, `BFL_API_BASE`, `BFL_IMAGE_MODEL` config keys
- ✅ Registered `bfl` agent in `/img` command editing allowlist

### 2025-02-15
- ✅ **xAI added image editing support** (grok-imagine-image)
- ✅ **xAI added video generation features** (grok-imagine-video)
- ✅ Supports text-to-video (T2V)
- ✅ Supports image-to-video (I2V)
- ✅ Supports video editing (V2V)
- ✅ Added `xai_video` tool
- ✅ Updated default model to `grok-imagine-image`
- ✅ Supports aspectRatio parameter

### 2025-12-20
- ✅ Upgraded to new AI SDK `generateImage` API
- ✅ Vertex added smart model selection (auto-switch between editing/generation)
- ✅ Vertex added smart edit mode selection (with/without mask)
- ✅ Vertex supports 6 edit modes and advanced parameters
- ✅ OpenAI added image editing support (auto-downgrade)
- ✅ Updated dependencies to latest beta versions
- ✅ Preserved Google's original editing functionality
- ✅ Fixed Vertex "Mask image is missing" error

---

## Reference Resources

- [Google Gemini Image API](https://ai.google.dev/gemini-api/docs/image-generation)
- [Vertex AI Image Editing](https://cloud.google.com/vertex-ai/generative-ai/docs/image/edit-images)
- [Vertex AI Model Versions](https://cloud.google.com/vertex-ai/generative-ai/docs/image/model-versioning)
- [OpenAI Image Generation](https://platform.openai.com/docs/guides/images)
- [xAI API Documentation](https://docs.x.ai/docs/overview)
- [Black Forest Labs API Documentation](https://docs.bfl.ml/quick_start/introduction)
- [AI SDK Documentation](https://sdk.vercel.ai/docs/ai-sdk-core/generating-images)

---

**Maintainer:** Claude Code
**Last Updated:** 2026-02-23
