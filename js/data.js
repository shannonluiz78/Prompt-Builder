window.appState = {
  uiLang: 'en',
  outLang: 'en',
  activeStudio: 'text',
  previousPromptBackup: null,
  detectiveFixes: [],
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
      subject: '3D isometric cutaway floorplan of a modern luxury 3-bedroom condominium unit',
      style: 'Architectural visualization, Octane Render, miniature diorama aesthetic',
      lighting: 'Warm golden hour sunlight streaming through floor-to-ceiling balcony glass, soft global illumination',
      camera: '45-degree isometric tilt-shift lens, crisp depth of field, 8k resolution',
      ratio: '16:9',
      negative: 'blurry text, warped walls, cluttered furniture, oversaturated neon, watermark'
    },
    video: {
      scene: 'Aerial drone reveal gliding past lush vertical sky gardens toward an infinity pool overlooking the city skyline at dusk',
      cameraMotion: 'Smooth gimbal forward push-in with subtle upward tilt reveal',
      pacing: 'Fluid cinematic slow-motion (60fps optical flow)',
      atmosphere: 'Warm twilight amber interior glow contrasting with deep sapphire evening sky',
      audio: 'Subtle ambient breeze, gentle water ripples, warm minimalist piano swell',
      specs: '16:9, 5 seconds, 24fps cinematic shutter'
    },
    i2v: {
      anchor: 'High-resolution interior photo of an open-concept marble kitchen and living area',
      subjectMotion: 'Sheer white balcony curtains gently billowing in a light breeze; steam rising softly from a coffee cup on the island',
      bgMotion: 'Clouds moving slowly across the skyline outside the window',
      cameraPath: 'Slow, steady dolly push-in along the kitchen island axis',
      consistency: 'Strict structural lock on walls, cabinetry, and furniture geometry; low motion distortion (Motion Bucket 45)'
    }
  }
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
    vaultBtn: 'BYOK API Vault',
    detectiveBtn: 'AI Problem Detective',
    smartStartTitle: 'Smart Start (Beginner Friendly)',
    smartStartDesc: "Describe your rough idea in plain words — we'll pick the right studio & fill the fields.",
    smartBtn: 'Smart Auto-Fill',
    preflightTitle: 'Preflight Intelligence',
    autoRepair: 'Auto-Repair',
    compiledTitle: 'Compiled Master Prompt',
    tokenSaver: 'Token Saver',
    copyBtn: 'Copy Prompt',
    aiEnhance: 'AI Enhance (BYOK)',
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
    vaultBtn: 'BYOK 密钥保险箱',
    detectiveBtn: 'AI 问题诊断侦探',
    smartStartTitle: '智能起步 (新手友好)',
    smartStartDesc: '用大白话输入你的初步想法——系统将自动匹配工坊并填充专业参数。',
    smartBtn: '智能解析填充',
    preflightTitle: '预检智能引擎',
    autoRepair: '一键自动修复',
    compiledTitle: '编译后的大师提示词',
    tokenSaver: 'Token 精简器',
    copyBtn: '复制提示词',
    aiEnhance: 'AI 润色 (BYOK)',
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
    sub: { en: 'Visual composition, lighting, lens & negative prompts', zh: '视觉构图、光影、镜头语言与反向提示词' },
    fields: [
      { key: 'subject', label: { en: 'Primary Subject & Action', zh: '核心主体与细节' }, span: 2, textarea: true },
      { key: 'style', label: { en: 'Art Medium & Render Style', zh: '艺术媒介与渲染风格' }, span: 1 },
      { key: 'lighting', label: { en: 'Lighting & Color Palette', zh: '光影与色彩氛围' }, span: 1 },
      { key: 'camera', label: { en: 'Camera Angle & Lens', zh: '机位角度与镜头参数' }, span: 1 },
      { key: 'ratio', label: { en: 'Aspect Ratio', zh: '画面比例' }, span: 1 },
      { key: 'negative', label: { en: 'Negative Prompt (Exclude)', zh: '反向提示词 (排除项)' }, span: 2 }
    ],
    boosters: [
      { label: '+ Photorealistic 85mm', field: 'camera', val: ', 85mm f/1.4 prime lens, ultra-detailed skin & texture' },
      { label: '+ Isometric 3D Cutaway', field: 'style', val: ', 3D architectural cutaway floorplan, Octane Render' },
      { label: '+ Anti-Artifact Guard', field: 'negative', val: ', deformed hands, extra fingers, watermark, blurry text' }
    ]
  },
  video: {
    heading: { en: 'Video Studio Parameters', zh: '视频工坊参数配置' },
    sub: { en: 'Temporal motion, camera trajectory, pacing & atmosphere', zh: '时序动态、运镜轨迹、节奏与声画氛围' },
    fields: [
      { key: 'scene', label: { en: 'Scene & Subject Action', zh: '场景与主体动作' }, span: 2, textarea: true },
      { key: 'cameraMotion', label: { en: 'Camera Movement Trajectory', zh: '摄影机运镜轨迹' }, span: 1 },
      { key: 'pacing', label: { en: 'Motion Speed & Pacing', zh: '运动速度与节奏' }, span: 1 },
      { key: 'atmosphere', label: { en: 'Visual Lighting & Grade', zh: '视觉光影与调色' }, span: 1 },
      { key: 'audio', label: { en: 'Audio / SFX Cues', zh: '音效与配乐提示' }, span: 1 },
      { key: 'specs', label: { en: 'Aspect Ratio & Frame Specs', zh: '画幅比例与帧率规格' }, span: 2 }
    ],
    boosters: [
      { label: '+ FPV Drone Glide', field: 'cameraMotion', val: ', seamless FPV drone fly-through with smooth banking' },
      { label: '+ Anamorphic Cinema', field: 'atmosphere', val: ', 35mm anamorphic lens flare, teal and amber color grade' },
      { label: '+ Temporal Physics Lock', field: 'specs', val: ', consistent object permanence, zero morphing' }
    ]
  },
  i2v: {
    heading: { en: 'Image-to-Video (I2V) Studio', zh: '图生视频 (I2V) 工坊参数' },
    sub: { en: 'Preserve source image fidelity while animating targeted vectors', zh: '锁定原图结构一致性，精准控制局部与镜头动态' },
    fields: [
      { key: 'anchor', label: { en: 'Reference Image Anchor Description', zh: '参考原图锚点描述' }, span: 2 },
      { key: 'subjectMotion', label: { en: 'Primary Subject Motion Vector', zh: '主体局部运动向量' }, span: 1, textarea: true },
      { key: 'bgMotion', label: { en: 'Background / Environmental Motion', zh: '背景与环境微动态' }, span: 1, textarea: true },
      { key: 'cameraPath', label: { en: 'Camera Pan / Zoom Path', zh: '镜头推拉摇移路径' }, span: 1 },
      { key: 'consistency', label: { en: 'Consistency Lock & Motion Strength', zh: '结构一致性锁定与运动幅度' }, span: 1 }
    ],
    boosters: [
      { label: '+ Subtle Cinemagraph', field: 'consistency', val: ', locked tripod camera, subtle loopable micro-motion (Motion Bucket 35)' },
      { label: '+ 3D Parallax Push', field: 'cameraPath', val: ', gentle 3D parallax dolly zoom preserving facial/structural geometry' }
    ]
  }
};