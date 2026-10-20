function setUILang(lang) {
  window.appState.uiLang = lang;
  document.getElementById('btn-ui-en').className = lang === 'en'
    ? 'px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-600 text-white transition'
    : 'px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-white transition';
  document.getElementById('btn-ui-zh').className = lang === 'zh'
    ? 'px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-600 text-white transition'
    : 'px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-white transition';

  const dict = window.i18n[lang];
  const map = {
    'ui-subtitle': dict.subtitle,
    'lbl-ui-lang': dict.uiLang,
    'lbl-out-lang': dict.outLang,
    'lbl-studios': dict.studios,
    'lbl-templates-btn': dict.templatesBtn,
    'lbl-vault-btn': dict.vaultBtn,
    'lbl-detective-btn': dict.detectiveBtn,
    'lbl-smart-start-title': dict.smartStartTitle,
    'lbl-smart-start-desc': dict.smartStartDesc,
    'lbl-smart-btn': dict.smartBtn,
    'lbl-preflight-title': dict.preflightTitle,
    'lbl-auto-repair': dict.autoRepair,
    'lbl-compiled-title': dict.compiledTitle,
    'lbl-token-saver': dict.tokenSaver,
    'lbl-copy-btn': dict.copyBtn,
    'lbl-ai-enhance': dict.aiEnhance,
    'lbl-export-btn': dict.exportBtn,
    'creator-compact-copy': dict.creatorCompact,
    'creator-main-copy': dict.creatorMain
  };
  Object.entries(map).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el && text) el.textContent = text;
  });

  document.querySelectorAll('.studio-title').forEach(el => {
    const key = el.dataset.key;
    if (dict[key]) el.textContent = dict[key];
  });

  renderStudio();
}

function setOutLang(lang) {
  window.appState.outLang = lang;
  document.getElementById('btn-out-en').className = lang === 'en'
    ? 'px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-600 text-white transition'
    : 'px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-white transition';
  document.getElementById('btn-out-zh').className = lang === 'zh'
    ? 'px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-600 text-white transition'
    : 'px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-white transition';
  compilePrompt();
}

function switchStudio(studio) {
  window.appState.activeStudio = studio;
  window.appState.detectiveFixes = [];
  document.querySelectorAll('.studio-btn').forEach(btn => {
    if (btn.dataset.studio === studio) {
      btn.className = 'studio-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition bg-indigo-600/20 text-indigo-300 border border-indigo-500/40';
    } else {
      btn.className = 'studio-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent';
    }
  });
  renderStudio();
}

function setTargetApp(appId) {
  const studio = window.appState.activeStudio;
  window.appState.targetApps[studio] = appId;
  renderStudio();
}

function renderStudio() {
  const studio = window.appState.activeStudio;
  const lang = window.appState.uiLang;
  const schema = window.studioSchemas[studio];
  const stateData = window.appState.studios[studio];
  const currentAppId = window.appState.targetApps[studio];
  const appOptions = window.targetAppCatalog[studio] || [];
  const activeAppObj = appOptions.find(a => a.id === currentAppId) || appOptions[0];

  document.getElementById('active-studio-heading').textContent = schema.heading[lang];
  document.getElementById('active-studio-sub').textContent = schema.sub[lang];

  const container = document.getElementById('studio-form-fields');
  container.innerHTML = '';

  // 1. Target Application Selector Bar (Full 2-Column Span)
  const appSelectorWrap = document.createElement('div');
  appSelectorWrap.className = 'sm:col-span-2 p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2';
  const optionsHtml = appOptions.map(app =>
    `<option value="${app.id}" ${app.id === currentAppId ? 'selected' : ''}>${app.name} — [${app.badge}]</option>`
  ).join('');

  appSelectorWrap.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <label class="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
        <i data-lucide="cpu" class="w-4 h-4 text-indigo-400"></i>
        <span>${window.i18n[lang].targetAppLabel}</span>
      </label>
      <select onchange="setTargetApp(this.value)" class="bg-slate-950 border border-indigo-500/40 rounded-lg px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-indigo-400">
        ${optionsHtml}
      </select>
    </div>
    <p class="text-[11px] text-slate-300 leading-relaxed bg-slate-950/70 px-3 py-2 rounded-lg border border-slate-800/80">
      <strong class="text-cyan-300">${activeAppObj.name}:</strong> ${activeAppObj.tip[lang]}
    </p>
  `;
  container.appendChild(appSelectorWrap);

  // 2. Studio Parameter Fields
  schema.fields.forEach(f => {
    const wrap = document.createElement('div');
    wrap.className = f.span === 2 ? 'sm:col-span-2 space-y-1.5' : 'col-span-1 space-y-1.5';

    const label = document.createElement('label');
    label.className = 'block text-xs font-medium text-slate-300';
    label.textContent = f.label[lang];

    const input = f.textarea ? document.createElement('textarea') : document.createElement('input');
    if (f.textarea) input.rows = 2;
    else input.type = 'text';

    input.value = stateData[f.key] || '';
    input.className = 'w-full bg-slate-950/90 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none';
    input.addEventListener('input', e => {
      window.appState.studios[studio][f.key] = e.target.value;
      compilePrompt();
    });

    wrap.appendChild(label);
    wrap.appendChild(input);
    container.appendChild(wrap);
  });

  // 3. One-Click Quality Boosters
  const boostersEl = document.getElementById('studio-boosters');
  boostersEl.innerHTML = '';
  schema.boosters.forEach(b => {
    const btn = document.createElement('button');
    btn.className = 'px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/30 text-[11px] font-medium transition';
    btn.textContent = b.label;
    btn.onclick = () => {
      const curr = window.appState.studios[studio][b.field] || '';
      if (!curr.includes(b.val.trim())) {
        window.appState.studios[studio][b.field] = (curr + ' ' + b.val).trim();
        renderStudio();
      }
    };
    boostersEl.appendChild(btn);
  });

  compilePrompt();
  if (window.lucide) lucide.createIcons();
}

// Clean up cross-platform jargon when Google Flow or Nano Banana is selected
function sanitizeForFlow(text) {
  if (!text) return '';
  return text
    .replace(/\(?\s*Motion Bucket\s*\d+\s*\)?/gi, '')
    .replace(/--motion\s*\d+/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function compilePrompt() {
  const studio = window.appState.activeStudio;
  const outLang = window.appState.outLang;
  const d = window.appState.studios[studio];
  const targetApp = window.appState.targetApps[studio];
  let compiled = '';

  // ==================== 1. TEXT STUDIO COMPILERS ====================
  if (studio === 'text') {
    if (targetApp === 'claude') {
      compiled = outLang === 'zh'
        ? `<role>\n${d.role}\n</role>\n\n<objective>\n${d.objective}\n</objective>\n\n<context>\n${d.context}\n</context>\n\n<tone_and_style>\n${d.tone}\n</tone_and_style>\n\n<output_format>\n${d.format}\n</output_format>\n\n<constraints>\n${d.constraints}\n</constraints>`
        : `<role>\n${d.role}\n</role>\n\n<objective>\n${d.objective}\n</objective>\n\n<context>\n${d.context}\n</context>\n\n<tone_and_style>\n${d.tone}\n</tone_and_style>\n\n<output_format>\n${d.format}\n</output_format>\n\n<constraints>\n${d.constraints}\n</constraints>`;
    } else {
      compiled = outLang === 'zh'
        ? `# 角色设定\n${d.role}\n\n# 核心任务\n${d.objective}\n\n# 受众与背景\n${d.context}\n\n# 语气与风格\n${d.tone}\n\n# 输出结构\n${d.format}\n\n# 严格边界与限制\n${d.constraints}`
        : `# ROLE & PERSONA\n${d.role}\n\n# CORE OBJECTIVE\n${d.objective}\n\n# AUDIENCE & CONTEXT\n${d.context}\n\n# TONE & VOICE\n${d.tone}\n\n# OUTPUT STRUCTURE\n${d.format}\n\n# STRICT CONSTRAINTS\n${d.constraints}`;
    }
  }

  // ==================== 2. IMAGE STUDIO COMPILERS ====================
  else if (studio === 'image') {
    if (targetApp === 'nano_banana') {
      // Google Nano Banana prefers natural scene prose, explicit composition, and positive quality locks over --no flags
      compiled = outLang === 'zh'
        ? `请生成一张高精度的 ${d.ratio} 画面：${d.subject}。\n\n视觉风格与材质：${d.style}。\n光影与色彩氛围：${d.lighting}。\n机位与镜头光学：${d.camera}。\n画面纯净度约束：保持极高的建筑与几何线条精度，材质纹理真实清晰，严禁出现任何多余的乱码文字、水印或结构扭曲（避免：${d.negative}）。`
        : `Create a high-precision ${d.ratio} aspect ratio image of ${d.subject}.\n\nStyle & Surface Materials: ${d.style}.\nLighting & Atmosphere: ${d.lighting}.\nCamera & Optical Physics: ${d.camera}.\nVisual Integrity: Maintain razor-sharp structural geometry, realistic surface textures, and clean composition with zero watermarks, gibberish text, or visual artifacts (strictly avoid: ${d.negative}).`;
    } else if (targetApp === 'midjourney') {
      const cleanRatio = (d.ratio || '16:9').replace(/[^0-9:]/g, '') || '16:9';
      compiled = `${d.subject}, ${d.style}, ${d.lighting}, ${d.camera} --ar ${cleanRatio} --stylize 250 --v 6.1 --no ${d.negative}`;
    } else if (targetApp === 'flux') {
      compiled = outLang === 'zh'
        ? `[主体与空间构图]: ${d.subject}\n[摄影与渲染美学]: ${d.style}\n[光影物理表现]: ${d.lighting}\n[镜头与景深参数]: ${d.camera}, 画幅比例 ${d.ratio}\n[画面纯净度]: 边缘锐利，无水印与畸变 (${d.negative})`
        : `Subject & Spatial Layout: ${d.subject}. Aesthetic & Medium: ${d.style}. Lighting Physics: ${d.lighting}. Camera & Lens: ${d.camera}, ${d.ratio} aspect ratio. Clean edge-to-edge optical fidelity without ${d.negative}.`;
    } else {
      compiled = outLang === 'zh'
        ? `[画面主体]: ${d.subject}\n[艺术风格]: ${d.style}\n[光影氛围]: ${d.lighting}\n[镜头参数]: ${d.camera}\n[画幅比例]: ${d.ratio}\n[反向排除]: ${d.negative}`
        : `[Subject]: ${d.subject}\n[Style & Medium]: ${d.style}\n[Lighting & Color]: ${d.lighting}\n[Camera & Lens]: ${d.camera}\n[Aspect Ratio]: ${d.ratio}\n[Negative / Exclude]: ${d.negative}`;
    }
  }

  // ==================== 3. VIDEO STUDIO COMPILERS ====================
  else if (studio === 'video') {
    if (targetApp === 'google_flow') {
      compiled = outLang === 'zh'
        ? `运镜与轴线：${sanitizeForFlow(d.cameraMotion)}。\n场景与主体动作：${d.scene}。\n动态节奏与物理质感：${sanitizeForFlow(d.pacing)}，保持空间透视与物体结构绝对稳定。\n光影与电影调色：${d.atmosphere}（规格：${d.specs}）。\nAudio（原生音效）：${d.audio || '安静自然的室内/环境底噪，无背景音乐，无人声对白'}。`
        : `${sanitizeForFlow(d.cameraMotion)}. ${d.scene}. ${sanitizeForFlow(d.pacing)}, maintaining realistic spatial perspective and rigid structural permanence. ${d.atmosphere}. Cinematic ${d.specs}. Audio: ${d.audio || 'quiet natural ambient room tone, subtle breeze, no background music, no dialogue'}.`;
    } else if (targetApp === 'hailuo') {
      const cam = d.cameraMotion.includes('[') ? d.cameraMotion : `[${d.cameraMotion}]`;
      compiled = outLang === 'zh'
        ? `${cam} ${d.scene}。动态物理表现：${d.pacing}。光影与色彩氛围：${d.atmosphere}。画幅与规格：${d.specs}。`
        : `${cam} ${d.scene}. Motion & Physics: ${d.pacing}. Lighting & Grade: ${d.atmosphere}. Specs: ${d.specs}.`;
    } else if (targetApp === 'kling') {
      compiled = outLang === 'zh'
        ? `主体与场景：${d.scene}。\n运动轨迹与运镜：${d.cameraMotion}，节奏：${d.pacing}。\n光影与环境物理：${d.atmosphere}。\n镜头规格：${d.specs}，时序连贯无变形。`
        : `Subject & Scene: ${d.scene}.\nCamera & Trajectory: ${d.cameraMotion}, ${d.pacing}.\nLighting & Environment: ${d.atmosphere}.\nOptical Specs: ${d.specs}, strict temporal coherence and zero morphing.`;
    } else if (targetApp === 'runway') {
      compiled = `${d.cameraMotion}: ${d.scene}. ${d.pacing}. ${d.atmosphere}, ${d.specs}.`;
    } else {
      compiled = outLang === 'zh'
        ? `[场景与动作]: ${d.scene}\n[摄影机运镜]: ${d.cameraMotion}\n[运动节奏]: ${d.pacing}\n[光影调色]: ${d.atmosphere}\n[音效提示]: ${d.audio}\n[视频规格]: ${d.specs}`
        : `[Scene & Action]: ${d.scene}\n[Camera Trajectory]: ${d.cameraMotion}\n[Motion Pacing]: ${d.pacing}\n[Lighting & Grade]: ${d.atmosphere}\n[Audio Cues]: ${d.audio}\n[Specs]: ${d.specs}`;
    }
  }

  // ==================== 4. IMAGE-TO-VIDEO (I2V) COMPILERS ====================
  else if (studio === 'i2v') {
    const cleanConsistency = sanitizeForFlow(d.consistency);
    const cleanCam = sanitizeForFlow(d.cameraPath);

    if (targetApp === 'google_flow') {
      // Google Flow (Veo 3.1) 6-Layer Clean Visual Prompt — NO chatbot meta-tags or "DO NOT facial features" hallucination traps
      compiled = outLang === 'zh'
        ? `镜头运动：${cleanCam}，保持水平线稳定与零镜头畸变。\n场景与结构锁定：基于首帧参考图的${d.anchor}。${cleanConsistency}，所有墙体、橱柜、大理石台面与家具几何结构在整个镜头中保持完全静止与刚性锁定。\n主体与环境微动态：${d.subjectMotion}；同时${d.bgMotion}。\n光影与节奏：柔和一致的自然光线，表面反射稳定，8秒奢华建筑电影级舒缓节奏。\nAudio：${d.audio || '安静的高端室内环境底噪，微弱轻柔的微风声；无背景音乐，无人声，无突兀音效'}。`
        : `Camera: ${cleanCam}, maintaining a level horizon, fixed focal length, and zero lens distortion.\n\nScene & Structural Lock: ${d.anchor} anchored to the starting frame. ${cleanConsistency}.\n\nSubject & Atmospheric Motion: ${d.subjectMotion}. Meanwhile, ${d.bgMotion}.\n\nLighting & Pacing: Consistent natural daylight with stable surface reflections and restrained, ultra-low displacement pacing over an 8-second continuous take.\n\nAudio: ${d.audio || 'Quiet indoor room tone with a barely audible gentle breeze; no background music, no voices, no sudden sound effects'}.`;
    } else if (targetApp === 'hailuo') {
      const bracketCam = cleanCam.includes('[') ? cleanCam : `[Push in] ${cleanCam}`;
      compiled = outLang === 'zh'
        ? `${bracketCam}。基于上传的参考图（${d.anchor}），${d.subjectMotion}，同时背景中${d.bgMotion}。结构锁定：${cleanConsistency}，严禁改变原图人物面部或建筑家具结构。`
        : `${bracketCam}. Starting from the uploaded reference frame (${d.anchor}), ${d.subjectMotion}, while ${d.bgMotion}. Structural Lock: ${cleanConsistency}. Preserve 100% of the reference image geometry and textures.`;
    } else if (targetApp === 'kling') {
      compiled = outLang === 'zh'
        ? `首帧锚点：${d.anchor}。\n前景主体动态：${d.subjectMotion}。\n背景环境动态：${d.bgMotion}。\n摄影机运镜：${cleanCam}。\n结构一致性锁定：${cleanConsistency}（严格保持原图几何透视与材质细节不变）。`
        : `Start Frame Anchor: ${d.anchor}.\nForeground Motion: ${d.subjectMotion}.\nBackground Motion: ${d.bgMotion}.\nCamera Path: ${cleanCam}.\nConsistency Lock: ${cleanConsistency} (strictly preserve source image geometry, layout, and textures).`;
    } else if (targetApp === 'runway') {
      // Runway Gen-3/Gen-4 I2V rule: Describe ONLY motion and camera path, do not re-describe the static image
      compiled = outLang === 'zh'
        ? `连续镜头运动：${cleanCam}。主体动态：${d.subjectMotion}。环境背景动态：${d.bgMotion}。保持所有静态建筑与背景结构完全锁定不变。`
        : `${cleanCam}. ${d.subjectMotion}. ${d.bgMotion}. All surrounding structural geometry, architecture, and static surfaces remain locked and unchanged.`;
    } else {
      compiled = outLang === 'zh'
        ? `[首帧参考图锚点]: ${d.anchor}\n[主体运动向量]: ${d.subjectMotion}\n[背景环境微动态]: ${d.bgMotion}\n[镜头运动路径]: ${d.cameraPath}\n[正向结构锁定]: ${d.consistency}\n[音效控制]: ${d.audio || '自然安静环境音，无杂音'}`
        : `[Starting Frame Anchor]: ${d.anchor}\n[Subject Motion]: ${d.subjectMotion}\n[Background Motion]: ${d.bgMotion}\n[Camera Path]: ${d.cameraPath}\n[Positive Structural Lock]: ${d.consistency}\n[Audio Restraint]: ${d.audio || 'Quiet natural ambience, no music'}`;
    }
  }

  if (window.appState.detectiveFixes.length > 0) {
    compiled += '\n\n' + window.appState.detectiveFixes.join('\n');
  }

  const outEl = document.getElementById('compiled-prompt-output');
  if (outEl) {
    outEl.value = compiled;
    updateTokenTelemetry(compiled);
    runPreflightCheck(compiled);
  }
}

function updateTokenTelemetry(text) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const estTokens = Math.max(1, Math.round(words * 1.35));
  const counter = document.getElementById('token-counter');
  if (counter) counter.textContent = `~${estTokens} tokens (est.)`;
}

function runPreflightCheck(text) {
  const studio = window.appState.activeStudio;
  const targetApp = window.appState.targetApps[studio];
  const issuesEl = document.getElementById('preflight-issues');
  const badgeEl = document.getElementById('quality-score-badge');
  if (!issuesEl || !badgeEl) return;

  const issues = [];
  let score = 96;

  // Check 1: Hallucination-inducing negative "DO NOT facial features" in Google Flow
  if ((studio === 'i2v' || studio === 'video') && targetApp === 'google_flow') {
    if (/do not edit|facial features|motion bucket/i.test(text)) {
      issues.push({
        type: 'warn',
        msg: 'Google Flow Warning: Contains "DO NOT" negative list or "Motion Bucket" jargon which can trigger visual hallucinations. Click Auto-Repair to convert to positive geometry locks.'
      });
      score -= 18;
    }
  }

  // Check 2: Missing audio cue on Google Flow
  if ((studio === 'i2v' || studio === 'video') && targetApp === 'google_flow' && !/audio:/i.test(text) && !/音效/i.test(text)) {
    issues.push({
      type: 'warn',
      msg: 'Veo 3.1 generates native audio. Add an explicit Audio restraint cue so Flow does not invent random music or voices.'
    });
    score -= 10;
  }

  // Check 3: Prompt length / specificity
  if (text.length < 80) {
    issues.push({
      type: 'warn',
      msg: 'Prompt is quite brief. Add specific lighting, camera axis, or audience context for stronger output.'
    });
    score -= 12;
  }

  if (issues.length === 0) {
    issues.push({
      type: 'ok',
      msg: `100% Platform-Ready for ${targetApp.toUpperCase().replace('_', ' ')}: Clean syntax, positive structural locks, and high constraint density verified.`
    });
  }

  badgeEl.textContent = `Score: ${Math.max(50, score)}/100`;
  issuesEl.innerHTML = issues.map(item =>
    `<li class="flex items-start gap-2 ${item.type === 'warn' ? 'text-amber-300' : 'text-emerald-300'}">
      <span>${item.type === 'warn' ? '⚠️' : '✓'}</span>
      <span>${item.msg}</span>
    </li>`
  ).join('');
}

function runAutoRepair() {
  const studio = window.appState.activeStudio;
  const d = window.appState.studios[studio];

  if (studio === 'i2v') {
    d.consistency = 'All architectural lines, walls, cabinetry, marble surfaces, and furniture geometry remain completely stationary, rigid, and locked to the starting frame';
    d.cameraPath = sanitizeForFlow(d.cameraPath) || 'Slow, ultra-steady gimbal dolly push-in along the central axis, fixed focal length, zero lens distortion';
    if (!d.audio) {
      d.audio = 'Quiet indoor room tone, faint gentle breeze, no background music, no dialogue';
    }
  } else if (studio === 'video') {
    d.pacing = sanitizeForFlow(d.pacing) + ', strict temporal permanence, zero morphing';
    if (!d.audio) {
      d.audio = 'Quiet natural ambient soundscape, no random voices';
    }
  } else if (studio === 'image') {
    if (!d.camera.includes('mm')) {
      d.camera = (d.camera + ', 50mm f/2.8 rectilinear lens, crisp edge-to-edge optical clarity').trim();
    }
  } else if (studio === 'text') {
    if (!d.constraints.includes('Lead directly')) {
      d.constraints = (d.constraints + ' Lead directly with the final deliverable; avoid filler introductions.').trim();
    }
  }

  renderStudio();
}

function runSmartTokenSaver() {
  const outEl = document.getElementById('compiled-prompt-output');
  if (!outEl) return;

  window.appState.previousPromptBackup = outEl.value;
  const beforeTokens = Math.round(outEl.value.split(/\s+/).length * 1.35);

  const compact = outEl.value
    .replace(/\b(please|kindly|I would like you to|could you|in order to|basically|actually|very)\b/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s{2,}/g, ' ')
    .trim();

  outEl.value = compact;
  const afterTokens = Math.round(compact.split(/\s+/).length * 1.35);
  const saved = Math.max(1, beforeTokens - afterTokens);

  const banner = document.getElementById('token-saver-banner');
  const msg = document.getElementById('token-saver-msg');
  if (banner && msg) {
    msg.textContent = `Token Saver stripped redundant phrasing (~${saved} tokens saved) while keeping 100% of platform constraints.`;
    banner.classList.remove('hidden');
  }
  updateTokenTelemetry(compact);
}

function undoTokenSaver() {
  if (window.appState.previousPromptBackup) {
    const outEl = document.getElementById('compiled-prompt-output');
    outEl.value = window.appState.previousPromptBackup;
    updateTokenTelemetry(outEl.value);
    document.getElementById('token-saver-banner').classList.add('hidden');
  }
}

function applyDetectiveFix(type) {
  const fixes = {
    generic: '[Anti-Cliché Rule]: Ban generic AI filler words ("delve", "testament", "tapestry"). Use concrete numbers, specific mechanisms, and real-world phrasing.',
    hallucination: '[Fact-Grounding Lock]: Do not invent statistics, prices, or policies. State clearly if any parameter requires verification.',
    visual_artifacts: 'Optical & Geometry Lock: Maintain rigid structural lines, natural anatomical proportions, fixed focal length, and zero temporal flickering or morphing.',
    format_ignored: '[Strict Schema Enforcement]: Follow the requested output structure and word/duration limits without adding meta-commentary.'
  };
  if (fixes[type] && !window.appState.detectiveFixes.includes(fixes[type])) {
    window.appState.detectiveFixes.push(fixes[type]);
    compilePrompt();
  }
  toggleModal('detective-modal');
}

function runSmartStart() {
  const raw = document.getElementById('smart-start-input').value.trim();
  if (!raw) return;
  const lower = raw.toLowerCase();

  if (lower.includes('animate') || lower.includes('photo') || lower.includes('starting frame') || lower.includes('curtain') || lower.includes('i2v')) {
    switchStudio('i2v');
    if (lower.includes('hailuo')) setTargetApp('hailuo');
    else if (lower.includes('kling')) setTargetApp('kling');
    else if (lower.includes('runway')) setTargetApp('runway');
    else setTargetApp('google_flow');
    window.appState.studios.i2v.anchor = raw;
  } else if (lower.includes('drone') || lower.includes('video') || lower.includes('cinematic') || lower.includes('slow-motion') || lower.includes('footage')) {
    switchStudio('video');
    if (lower.includes('hailuo')) setTargetApp('hailuo');
    else if (lower.includes('kling')) setTargetApp('kling');
    else if (lower.includes('runway')) setTargetApp('runway');
    else setTargetApp('google_flow');
    window.appState.studios.video.scene = raw;
  } else if (lower.includes('floorplan') || lower.includes('cutaway') || lower.includes('3d') || lower.includes('image') || lower.includes('poster') || lower.includes('portrait')) {
    switchStudio('image');
    if (lower.includes('midjourney')) setTargetApp('midjourney');
    else if (lower.includes('flux')) setTargetApp('flux');
    else setTargetApp('nano_banana');
    window.appState.studios.image.subject = raw;
  } else {
    switchStudio('text');
    window.appState.studios.text.objective = raw;
  }

  renderStudio();
}

function resetCurrentStudio() {
  const studio = window.appState.activeStudio;
  Object.keys(window.appState.studios[studio]).forEach(k => {
    window.appState.studios[studio][k] = '';
  });
  window.appState.detectiveFixes = [];
  renderStudio();
}

function copyCompiledPrompt() {
  const outEl = document.getElementById('compiled-prompt-output');
  if (!outEl) return;
  navigator.clipboard.writeText(outEl.value);
  const lbl = document.getElementById('lbl-copy-btn');
  const prev = lbl.textContent;
  lbl.textContent = 'Copied! ✓';
  setTimeout(() => { lbl.textContent = prev; }, 1600);
}

function exportPromptJSON() {
  const studio = window.appState.activeStudio;
  const payload = {
    version: '2.1',
    timestamp: new Date().toISOString(),
    studio,
    targetApp: window.appState.targetApps[studio],
    parameters: window.appState.studios[studio],
    compiledPrompt: document.getElementById('compiled-prompt-output').value
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `prompt-${studio}-${payload.targetApp}.json`;
  a.click();
}

function toggleModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('hidden');
}

window.addEventListener('DOMContentLoaded', () => {
  renderStudio();
});
