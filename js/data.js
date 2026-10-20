window.appState = {
  uiLang: 'en',
  outLang: 'en',
  activeStudio: 'text',
  optimizeGoal: 'platform_master',
  previousPromptBackup: null,
  pendingOptimizedPrompt: null,
  detectiveFixes: [],
  targetApps: {
    text: 'universal_text',
    image: 'nano_banana',
    video: 'google_flow',
    i2v: 'google_flow'
  },
  studios: {
    text: {
      role: 'Senior Strategy & Content Architect',
      objective: 'Write a high-converting 60-second short video script explaining why the 5-year Minimum Occupation Period is an asset progression springboard.',
      context: 'Target audience: First-time homeowners and upgraders in Singapore.',
      tone: 'Warm, authoritative, data-grounded, conversational',
      format: 'Hook (0-5s) -> Core Insight (5-40s) -> Numeric Proof (40-50s) -> Call to Action (50-60s)',
      constraints: 'Avoid jargon; keep sentences punchy for spoken delivery; under 160 words.'
    },
    image: {
      subject: '3D isometric cutaway floorplan of a modern luxury 3-bedroom condominium unit with warm oak flooring and marble kitchen island',
      style: 'Architectural visualization, miniature diorama aesthetic, photorealistic materials, crisp global illumination',
      lighting: 'Warm golden hour sunlight streaming through floor-to-ceiling balcony glass, soft natural shadow falloff',
      camera: '45-degree isometric tilt-shift lens, f/5.6 aperture, crisp edge-to-edge clarity',
      ratio: '16:9',
      negative: 'blurry text, warped walls, cluttered furniture, oversaturated neon, watermark'
    },
    video: {
      scene: 'Aerial drone reveal gliding past lush vertical sky gardens toward an infinity pool overlooking the city skyline at dusk',
      cameraMotion: 'Smooth gimbal forward push-in with subtle upward tilt reveal',
      pacing: 'Fluid cinematic slow-motion, natural optical flow',
      atmosphere: 'Warm twilight amber interior glow contrasting with deep sapphire evening sky',
      audio: 'Subtle ambient breeze, gentle water ripples, warm minimalist piano swell',
      specs: '16:9, 8 seconds, 24fps cinematic shutter'
    },
    i2v: {
      anchor: 'High-resolution interior photo of an open-concept marble kitchen and living area',
      subjectMotion: 'Sheer white balcony curtains gently billowing inward in a light breeze; delicate wispy steam rising softly from a ceramic coffee cup on the marble island',
      bgMotion: 'Soft clouds drifting imperceptibly across the skyline outside the window',
      cameraPath: 'Slow, ultra-steady gimbal dolly push-in along the central kitchen island axis',
      consistency: 'All walls, marble cabinetry, island edges, and furniture remain completely rigid, stationary, and structurally locked to the starting frame',
      audio: 'Quiet luxury indoor room tone, faint gentle breeze, no music, no dialogue'
    }
  }
};

// Target Application Profiles (Controls Compiler Rules & Setup Checklists)
window.targetAppCatalog = {
  text: [
    {
      id: 'universal_text',
      name: 'Universal (All LLMs)',
      badge: 'Universal',
      tip: {
        en: 'Structured Markdown prompt compatible with ChatGPT, Claude, Gemini, and DeepSeek.',
        zh: '通用结构化 Markdown 提示词，兼容 ChatGPT、Claude、Gemini 和 DeepSeek。'
      }
    },
    {
      id: 'claude',
      name: 'Anthropic Claude',
      badge: 'XML Structured',
      tip: {
        en: 'Uses semantic XML tags (<role>, <task>, <constraints>) preferred by Claude models.',
        zh: '采用 Claude 偏好的语义化 XML 标签结构 (<role>, <task>, <constraints>)。'
      }
    },
    {
      id: 'chatgpt',
      name: 'OpenAI ChatGPT',
      badge: 'Markdown Directives',
      tip: {
        en: 'Optimized with clear system-style Markdown headers and explicit output formatting.',
        zh: '采用清晰的 Markdown 指令标题与明确的输出格式约束。'
      }
    },
    {
      id: 'gemini_text',
      name: 'Google Gemini',
      badge: 'Context-First',
      tip: {
        en: 'Places context and examples clearly before the core execution directive.',
        zh: '优先铺垫背景与上下文，随后给出核心执行指令。'
      }
    }
  ],
  image: [
    {
      id: 'nano_banana',
      name: 'Google Nano Banana',
      badge: 'Natural Scene Prose',
      tip: {
        en: 'Nano Banana excels at natural descriptive prose, spatial layout clarity, exact text rendering in quotes, and positive exclusions instead of "--no" flags.',
        zh: 'Nano Banana 擅长自然描述性语句、清晰的空间布局说明与正面画质约束（无需使用 --ar 或 --no 代码）。'
      }
    },
    {
      id: 'midjourney',
      name: 'Midjourney (v6.1 / v7)',
      badge: 'Parameter Syntax',
      tip: {
        en: 'Compiles high-density visual descriptors followed by native --ar, --stylize, and --no parameters.',
        zh: '编译高密度视觉描述词，并在末尾自动附加 --ar、--stylize 与 --no 原生参数。'
      }
    },
    {
      id: 'flux',
      name: 'FLUX.1 / Recraft',
      badge: 'Optical & Text Precision',
      tip: {
        en: 'Uses detailed photographic prose, explicit f-stop lens physics, and exact spatial placement.',
        zh: '使用摄影级自然语言、明确的光圈镜头物理参数与空间方位描述。'
      }
    },
    {
      id: 'universal_image',
      name: 'Universal Image Generator',
      badge: 'Balanced Visual',
      tip: {
        en: 'Clean visual description suitable for ChatGPT Image, Ideogram, Leonardo, and Stable Diffusion.',
        zh: '通用高清视觉提示词，适用于各类主流 AI 绘画工具。'
      }
    }
  ],
  video: [
    {
      id: 'google_flow',
      name: 'Google Flow (Veo 3.1)',
      badge: '6-Layer Cinematic + Audio',
      tip: {
        en: 'Flow Setup: Select Text-to-Video, 16:9 or 9:16, 8s duration. Veo 3.1 generates native audio—explicit audio restraint cues are automatically included.',
        zh: 'Google Flow 设置建议：选择文生视频模式，8秒时长。Veo 3.1 支持原生音效，提示词已自动包含环境音控制。'
      }
    },
    {
      id: 'hailuo',
      name: 'Hailuo AI (MiniMax)',
      badge: 'Bracket Camera + Fluid Physics',
      tip: {
        en: 'Hailuo Setup: Uses explicit bracketed camera commands (e.g., [Push in], [Pan right]) and chronological action beats for ultra-smooth physics.',
        zh: '海螺 AI (Hailuo) 设置建议：采用方括号运镜指令（如 [Push in]）与时序动作节拍，发挥其出色的流体与物理动态表现。'
      }
    },
    {
      id: 'kling',
      name: 'Kling AI (1.6 / 2.0)',
      badge: 'Chronological Motion & Lens',
      tip: {
        en: 'Kling Setup: Structures prompt as Subject -> Movement Trajectory -> Environment Physics -> Optical Lens for realistic 5s/10s motion.',
        zh: '可灵 (Kling AI) 设置建议：按“主体 -> 运动轨迹 -> 环境物理 -> 镜头参数”顺序组织，适合 5秒/10秒高真实感生成。'
      }
    },
    {
      id: 'runway',
      name: 'Runway (Gen-3 Alpha / Gen-4)',
      badge: 'Camera-First Prose',
      tip: {
        en: 'Runway Setup: Leads with continuous camera movement terminology followed by single-scene subject motion; avoids conflicting multi-cut instructions.',
        zh: 'Runway 设置建议：以连续镜头运动开篇，紧接单一场景主体动态，避免多镜头切换造成画面崩坏。'
      }
    },
    {
      id: 'universal_video',
      name: 'Universal Video Generator',
      badge: 'Standard Cinematic',
      tip: {
        en: 'Compatible with Pika, Sora, Luma Dream Machine, and general text-to-video platforms.',
        zh: '兼容 Pika、Sora、Luma 等通用视频生成平台。'
      }
    }
  ],
  i2v: [
    {
      id: 'google_flow',
      name: 'Google Flow (Veo 3.1 I2V)',
      badge: 'Starting Frame Lock + Audio',
      tip: {
        en: 'IMPORTANT FOR GOOGLE FLOW: Upload your photo as the "Starting Frame / First Frame" (DO NOT use "Ingredients" mode). Uses positive geometry locks instead of "DO NOT" lists to prevent hallucinations.',
        zh: 'Google Flow 关键提示：请将参考图上传为“首帧 (Starting Frame)”，切勿使用“Ingredients”模式！已采用正向结构锁定语法防止画面变形。'
      }
    },
    {
      id: 'hailuo',
      name: 'Hailuo AI (I2V-01-Live / Director)',
      badge: '[Camera] + Micro-Motion',
      tip: {
        en: 'Hailuo I2V Setup: Attach your reference image, use bracketed camera commands like [Pedestal up] or [Push in], and focus on natural micro-movements.',
        zh: '海螺 AI 图生视频：上传参考图后，使用方括号运镜指令（如 [Push in]）结合局部微动态描述，保持原图高一致性。'
      }
    },
    {
      id: 'kling',
      name: 'Kling AI (Image-to-Video)',
      badge: 'Start Frame + Motion Brush Ready',
      tip: {
        en: 'Kling I2V Setup: Upload image as Start Frame (Creativity 0.3–0.5 for strict preservation). Separates foreground motion from static background geometry.',
        zh: '可灵图生视频：将图片设为首帧（建议创意度 0.3–0.5 以锁定原图结构），清晰分离前景动态与静态背景。'
      }
    },
    {
      id: 'runway',
      name: 'Runway (Gen-3 / Gen-4 I2V)',
      badge: 'Motion Prompt Only',
      tip: {
        en: 'Runway I2V Setup: Runway recommends describing ONLY the desired motion and camera path without re-describing the static image details.',
        zh: 'Runway 图生视频：官方建议仅描述期望的镜头轨迹与主体动作，避免重复描述原图静态细节。'
      }
    },
    {
      id: 'universal_i2v',
      name: 'Universal Image-to-Video',
      badge: 'Balanced I2V Lock',
      tip: {
        en: 'Works across all Image-to-Video tools. Remember to attach your source photo in the destination generator.',
        zh: '适用于所有主流图生视频工具，请在目标平台上传您的原始参考图片。'
      }
    }
  ]
};

window.i18n = {
  en: {
    subtitle: 'Intelligent Prompt Studio',
    uiLang: 'Interface Language',
    outLang: 'Prompt Output Language',
    studios: 'Creation Studios',
    studio_text: 'Text Studio',
    studio_image: 'Image Studio',
    studio_video: 'Video Studio',
    studio_i2v: 'Image-to-Video',
    targetAppLabel: 'Target AI Application (Optimizes Syntax & Rules)',
    templatesBtn: 'Starter Templates',
    vaultBtn: 'BYOK API Vault',
    detectiveBtn: 'AI Problem Detective',
    smartStartTitle: 'Smart Start (Beginner Friendly)',
    smartStartDesc: "Describe your rough idea in plain words — we'll pick the right studio, target app & fill the fields.",
    smartBtn: 'Smart Auto-Fill',
    preflightTitle: 'Preflight Intelligence',
    autoRepair: 'Auto-Repair',
    compiledTitle: 'Platform-Compiled Master Prompt',
    tokenSaver: 'Token Saver',
    copyBtn: 'Copy Prompt',
    aiEnhance: 'Optimize with AI',
    exportBtn: 'Export JSON',
    creatorCompact: '"AI should be easier to learn. Prompt Builder helps you ask better questions, avoid wasted tokens and get a stronger start — even if you\'re completely new to AI."',
    creatorMain: '"I created Prompt Builder to help beginners turn rough ideas into clear, effective prompts — without needing technical knowledge. By asking the right questions first, the app aims to reduce trial and error, save unnecessary tokens and help users get better results with confidence."'
  },
  zh: {
    subtitle: '智能提示词创作工坊',
    uiLang: '界面语言',
    outLang: '提示词输出语言',
    studios: '四大创作工坊',
    studio_text: '文本创作工坊 (Text)',
    studio_image: '图像生成工坊 (Image)',
    studio_video: '视频生成工坊 (Video)',
    studio_i2v: '图生视频工坊 (I2V)',
    targetAppLabel: '目标 AI 应用平台 (自动适配专属语法与最优结构)',
    templatesBtn: '精选平台模板库',
    vaultBtn: 'BYOK 密钥保险箱',
    detectiveBtn: 'AI 问题诊断侦探',
    smartStartTitle: '智能起步 (新手友好)',
    smartStartDesc: '用大白话输入你的初步想法——系统将自动匹配工坊、目标平台并填充专业参数。',
    smartBtn: '智能解析填充',
    preflightTitle: '预检智能引擎',
    autoRepair: '一键自动修复',
    compiledTitle: '平台专属编译提示词',
    tokenSaver: 'Token 精简器',
    copyBtn: '复制提示词',
    aiEnhance: 'AI 深度优化',
    exportBtn: '导出 JSON',
    creatorCompact: '“AI 应该更容易上手。Prompt Builder 帮助你提出更好的问题、避免浪费 Token，并获得更强大的起点——即使你完全是 AI 新手。”',
    creatorMain: '“我创建 Prompt Builder 是为了帮助初学者将粗略的想法转化为清晰、高效的提示词——无需任何技术背景。通过先提出正确的问题，本应用旨在减少试错、节省不必要的 Token，并帮助用户满怀信心地获得更好的结果。”'
  }
};

window.studioSchemas = {
  text: {
    heading: { en: 'Text Studio Parameters', zh: '文本工坊参数配置' },
    sub: { en: 'Structured role, objective, and guardrails for LLM precision', zh: '结构化角色、目标与约束，确保大模型精准输出' },
    fields: [
      { key: 'role', label: { en: 'Persona / Expert Role', zh: '专家角色设定' }, span: 1 },
      { key: 'tone', label: { en: 'Tone & Voice', zh: '语气与风格' }, span: 1 },
      { key: 'objective', label: { en: 'Core Task / Objective', zh: '核心任务目标' }, span: 2, textarea: true },
      { key: 'context', label: { en: 'Audience & Background Context', zh: '受众与背景信息' }, span: 2 },
      { key: 'format', label: { en: 'Output Structure / Schema', zh: '输出结构与排版' }, span: 1 },
      { key: 'constraints', label: { en: 'Strict Constraints & Guardrails', zh: '严格限制与边界' }, span: 1 }
    ],
    boosters: [
      { label: '+ Step-by-Step Reasoning', field: 'constraints', val: ' Think step-by-step before answering.' },
      { label: '+ Executive Table', field: 'format', val: ' Include a Markdown comparison table.' },
      { label: '+ Zero Fluff Intro', field: 'constraints', val: ' Lead directly with the answer; no introductory filler.' }
    ]
  },
  image: {
    heading: { en: 'Image Studio Parameters', zh: '图像工坊参数配置' },
    sub: { en: 'Tailored for Nano Banana, Midjourney, FLUX & Universal generators', zh: '针对 Nano Banana、Midjourney、FLUX 等平台深度优化' },
    fields: [
      { key: 'subject', label: { en: 'Primary Subject & Spatial Layout', zh: '核心主体与空间布局细节' }, span: 2, textarea: true },
      { key: 'style', label: { en: 'Art Medium & Render Style', zh: '艺术媒介与渲染风格' }, span: 1 },
      { key: 'lighting', label: { en: 'Lighting & Color Palette', zh: '光影与色彩氛围' }, span: 1 },
      { key: 'camera', label: { en: 'Camera Angle & Lens Physics', zh: '机位角度与镜头光学参数' }, span: 1 },
      { key: 'ratio', label: { en: 'Aspect Ratio', zh: '画面比例' }, span: 1 },
      { key: 'negative', label: { en: 'Elements to Avoid / Negative', zh: '排除项 (自动转化为对应平台语法)' }, span: 2 }
    ],
    boosters: [
      { label: '+ Nano Banana Crisp Text', field: 'style', val: ', ultra-crisp legible typography, clean commercial layout' },
      { label: '+ Photorealistic 85mm', field: 'camera', val: ', 85mm f/1.4 prime lens, natural skin micro-texture, shallow DOF' },
      { label: '+ Isometric 3D Cutaway', field: 'style', val: ', 3D architectural cutaway floorplan, Octane Render, miniature diorama' }
    ]
  },
  video: {
    heading: { en: 'Video Studio Parameters', zh: '视频工坊参数配置' },
    sub: { en: 'Optimized for Google Flow (Veo), Hailuo, Kling & Runway', zh: '针对 Google Flow、海螺 AI、可灵与 Runway 运镜语法优化' },
    fields: [
      { key: 'scene', label: { en: 'Scene & Chronological Action', zh: '场景与时序动作描述' }, span: 2, textarea: true },
      { key: 'cameraMotion', label: { en: 'Camera Movement Trajectory', zh: '摄影机运镜轨迹' }, span: 1 },
      { key: 'pacing', label: { en: 'Motion Speed & Physics Pacing', zh: '运动节奏与物理质感' }, span: 1 },
      { key: 'atmosphere', label: { en: 'Visual Lighting & Color Grade', zh: '视觉光影与电影调色' }, span: 1 },
      { key: 'audio', label: { en: 'Native Audio / Ambience Cues', zh: '原生音效与环境音控制 (Flow/Veo 必备)' }, span: 1 },
      { key: 'specs', label: { en: 'Aspect Ratio, Duration & Frame Specs', zh: '画幅比例、时长与规格' }, span: 2 }
    ],
    boosters: [
      { label: '+ Flow Quiet Ambience', field: 'audio', val: 'Quiet natural room tone, subtle breeze, no background music, no dialogue' },
      { label: '+ Hailuo [Push In] Bracket', field: 'cameraMotion', val: '[Push in] Smooth gimbal dolly forward with [Tilt up] reveal' },
      { label: '+ Temporal Physics Lock', field: 'pacing', val: ', consistent object permanence, zero morphing, natural inertia' }
    ]
  },
  i2v: {
    heading: { en: 'Image-to-Video (I2V) Studio', zh: '图生视频 (I2V) 工坊参数' },
    sub: { en: 'Platform-tuned starting frame locks for Google Flow, Hailuo, Kling & Runway', zh: '针对 Google Flow、海螺、可灵、Runway 的首帧结构锁定与微动态控制' },
    fields: [
      { key: 'anchor', label: { en: 'Starting Frame Scene Anchor', zh: '首帧参考图场景锚点' }, span: 2 },
      { key: 'subjectMotion', label: { en: 'Primary Subject Micro-Motion', zh: '主体局部微动态 (低位移防崩坏)' }, span: 1, textarea: true },
      { key: 'bgMotion', label: { en: 'Background / Atmospheric Motion', zh: '背景与环境缓慢动态' }, span: 1, textarea: true },
      { key: 'cameraPath', label: { en: 'Single-Axis Camera Path', zh: '单轴稳定运镜路径' }, span: 1 },
      { key: 'consistency', label: { en: 'Positive Structural Geometry Lock', zh: '正向几何结构静态锁定' }, span: 1 },
      { key: 'audio', label: { en: 'Native Audio Restraint (Google Flow / Veo)', zh: '原生音效克制指令 (防止乱加音乐/人声)' }, span: 2 }
    ],
    boosters: [
      { label: '+ Flow Positive Architecture Lock', field: 'consistency', val: 'All walls, cabinetry, marble surfaces, and furniture remain completely stationary, rigid, and locked to the starting frame' },
      { label: '+ Subtle Cinemagraph', field: 'cameraPath', val: 'Locked-off tripod frame, zero lens distortion, ultra-subtle loopable micro-motion' },
      { label: '+ Gentle Gimbal Push-In', field: 'cameraPath', val: 'Slow, ultra-steady gimbal dolly push-in along the central axis, fixed focal length' }
    ]
  }
};
